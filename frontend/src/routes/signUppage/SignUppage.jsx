import { SignUp } from "@clerk/clerk-react"
import "./SignUppage.css"
import React from 'react'

const SignUppage = () => {
  return (
    <div className="signUpPage">
      <SignUp path="/sign-up" signInUrl="/sign-in" />
      </div>
  )
}

export default SignUppage