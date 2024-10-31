import React from 'react'
import "./Chatlist.css"
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';



const Chatlist = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatlist">
      <span className="title">Dashboard Page</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/">Explore U-Bot</Link>
      <Link to="/">Contact</Link>

      <hr />
      <span className="title">Recent Chats</span>
      <div className="lists">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                {chat.title}
              </Link>
            ))
        }
      </div>

      <hr />
      <div className="upgrades">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to U-Bot premium.</span>
          <span>Get ultimate features of U-Bot.</span>
        </div>
      </div>
    </div>
  );
};

export default Chatlist;
