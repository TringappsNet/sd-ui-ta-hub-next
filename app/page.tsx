import React from "react";
import LoginPage from "./login/page";
import SignupPage from "./signup/signup";
import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {
  return (
    <div>
      <LoginPage /> 
      <SignupPage />
    </div>
  );
}
