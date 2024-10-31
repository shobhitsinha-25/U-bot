import { Link } from "react-router-dom"
import "./Homepage.css"
import React, { useState } from 'react'
import { TypeAnimation } from "react-type-animation"

const Homepage = () => {
  const [typingstatus,settypingstatus]=useState("human1");
  return (
    <div className="homepage">
      <img src="/orbital.png" alt="" className="orbital"/>

  {/*left part of the homepage... */}
      <div className="left">
        <h1>U-BOT</h1>
        <h2>Inchance your productivity with your personalised Chat-Bot</h2>
        <h3>
          Hello this is your Mini Problem Solver😊
        </h3>
        <Link className="getstarted" to="/dashboard">Get Started</Link>
      </div>

{/* right part of the homepage ....*/}
      <div className="right">
        <div className="imagecontainer">
          <div className="bgcontainer">
              <div className="bg"></div>
          </div>
          <img src="./bot.png" alt="" className="bot"/>
        
        </div>
      </div>

{/* terms and condition part of the homepage... */}
      <div className="terms">
        <img src="/logo.png" alt="" />
        <div className="Link">
            <Link to="/">Terms of service</Link>
            <span>|</span>
            <Link to="/">Privacy Policies</Link>
        </div>
      </div>
      
    </div>
  )
}

export default Homepage