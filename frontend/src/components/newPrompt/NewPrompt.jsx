import React, { useEffect, useRef, useState } from 'react';
import "./NewPrompt.css";
import Upload from '../Upload/Upload';
import { IKImage } from 'imagekitio-react';
import model from '../../lib/gemini';
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [img, setimg] = useState({
    isLoaded: false,
    error: "",
    dbData: {},
    aiData: {}
  });

  const chat = model.startChat({
  history: data?.history
    ? data.history.map(({ role, parts }) => ({
        role,
        parts: [{ text: parts[0].text }],
      }))
    : [{ role: "user", parts: [{ text: "Hello!" }] }], 
  generationConfig: {},
});

  const endRef = useRef(null);
  const forRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data,question, answer, img.dbData]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => {
      console.log("Updating chat with ID:", data._id);
      return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        })
      }).then((res) => res.json());
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["chat", data._id] }).then(() => {
        forRef.current.reset();
        setQuestion("");
        setAnswer("");
        setimg({
          isLoaded: false,
          error: "",
          dbData: {},
          aiData: {}
        });
        console.log("Chat data reset after successful mutation:", { question, answer, img });
      });
    },
    onError: (err) => {
      console.log("Error during mutation:", err);
    }
  });

  const add = async (text,isInitial) => {
    if(!isInitial)setQuestion(text);

    try {
      const result = await model.generateContentStream(
        img.aiData.inlineData ? [img.aiData, text] : [text]
      );
      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log("Received chunk:", chunkText);
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }
      mutation.mutate();
    } catch (err) {
      console.log("Error in content generation:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const text = e.target.text.value;

    if (!text) return;
    add(text,false);
  };

  const hasRun=useRef(false);

  useEffect(()=>{
    if(!hasRun.current){
      if(data?.history?.length===1){
      add(data.history[0].parts[0].text,true);
    }
  }
  },[]);

  return (
    <>
      
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_KIT_ENDPOINT}
          path={img.dbData?.filePath}
          width="300px"
          transformation={[{ width: 300 }]}
        />
      )}

      {/* User question */}
      {question && <div className='message user'>{question}</div>}

      {/* Model's answer */}
      {answer && (
        <div className='message'>
          <Markdown>{answer}</Markdown>
        </div>
      )}

      <div className='endchat' ref={endRef}></div>

      {/* Form for new question */}
      <form className='newform' onSubmit={handleSubmit} ref={forRef}>
        <Upload setimg={setimg} />
        <input id='file' type="file" multiple={false} hidden />
        <input type="text" name='text' placeholder='Ask Me Anything...' />
        <button>
          <img src="/arrow.png" alt="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
