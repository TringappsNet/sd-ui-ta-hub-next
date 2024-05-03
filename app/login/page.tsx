"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import "../styles/login.css";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import 'bootstrap/dist/css/bootstrap.css';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarVariant, setSnackbarVariant] = useState<"success" | "error">("success");
 const clear=()=>{
  user.email="",
  user.password=""

 }
 
  const validateForm = () => {
    let isValid = true;

    if (!user.email.trim()) {
      handleSnackbarOpen("Email is required", "error");
      isValid = false;
    } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(user.email)) {
      handleSnackbarOpen("Invalid email format", "error");
      isValid = false;
    } else if (!user.password.trim()) {
      handleSnackbarOpen("Password is required", "error");
      isValid = false;
    } else if (user.password.length < 8) {
      handleSnackbarOpen("Password must be at least 8 characters long", "error");
      isValid = false;
    }

    return isValid;
  };
  const onLogin = async (event: any) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        // const response = await axios.post("/api/users/login", user);
        // console.log("Login success", response.data);
        handleSnackbarOpen("Succesfully Login!!","success");
        toast.success("Login success");
        router.push("/navbar");
        clear();
      } catch (error: any) { 
        handleSnackbarOpen(error.message, "error");
      }
    }
  };
  ;

  const handleSnackbarOpen = (message: string, variant: "success" | "error") => {
    setSnackbarMessage(message);
    setSnackbarVariant(variant);
    setOpenSnackbar(true);
  };
  

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleEmailChange = (e: any) => {
    setUser({ ...user, email: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setUser({ ...user, password: e.target.value });
  };

  return (
    <div role="form" onKeyPress={(e) => { if (e.key === 'Enter') onLogin(e); }}>

    <form>
      <CustomSnackbar
        open={openSnackbar}
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        variant={snackbarVariant}
      />

      <div className="card1">
        <h1>Login</h1>

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
          placeholder="Email"
        />

        <label htmlFor="password">Password</label>
        <input
          className="input-field"
          id="password"
          type="password"
          value={user.password}
          onChange={handlePasswordChange}
          placeholder="Password"
        />

        <a href="/forget" className="forget">
          Forget password?
        </a>

        
        <button onClick={onLogin} className="button">
          Sign In
        </button>
      </div>

      <div className="login-secondary">
        <div className="text-center">
          <a href="#">Don’t have an employee account?</a>
          <div>
            <a href="/signup" className="signup">
              Want to sign your company up with TOPS?
            </a>
          </div>
        </div>
      </div>
    </form>
    </div>

  );
}
