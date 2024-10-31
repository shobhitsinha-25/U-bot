import { SignIn } from "@clerk/clerk-react"
import "./SignInpage.css"
import React from 'react'

const SignInpage = () => {
  return (
    <div className="signInPage">
      <SignIn path="/sign-in" signUpUrl="/sign-up" forceRedirectUrl="/dashboard"/>
      </div>
  )
}

export default SignInpage