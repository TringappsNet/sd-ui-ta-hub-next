"use client";
import React, { useState } from "react";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import '../styles/forget.css';

interface User {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState<"success" | "error">("success");
  const [user, setUser] = useState<User>({ email: "" });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: e.target.value });
  };

  const clear=()=>{
    user.email="";
  }
  const validateForm = () => {
    let isValid = true;
    if (!user.email.trim()) {
      handleSnackbarOpen("Please enter your email address.", "error");
      isValid = false;
    }
    return isValid;
  };

  const onForgotPassword = async(event:any) => {
    event.preventDefault();
    if (validateForm()) {
        try{
            handleSnackbarOpen("Link send Succesfully!", "success");
            clear();
        } catch(error:any) {
            handleSnackbarOpen(error.message, "error");

        }
    }
  };

  const handleSnackbarOpen = (message: string, variant: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarVariant(variant);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <form>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        variant={snackbarVariant}
      />

      <div className="card1">
        <h2>Forgot Password</h2>

        <label htmlFor="email" className="Email">
          Email
        </label>
        <input
          className="input-field"
          id="email"
          type="text"
          name="email"
          value={user.email}
          onChange={handleEmailChange}
          placeholder="Enter your Email"
        />

        <button onClick={onForgotPassword} className="button">
          Send Reset Link
        </button>

      </div>
      <div className="text-center">
        <a href="/login" className="forget">
          Back to Login
        </a>
      </div>

    </form>
  );
};

export default ForgotPassword;
