"use client";
import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/signup.css';
import 'bootstrap/dist/css/bootstrap.css';
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

export default function SignupPage() {
    const router=useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        confirmpassword: "",
        phone: ""
    });
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [snackbarVariant, setSnackbarVariant] = useState<"success" | "error">("success");
    const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

    const clear = () => {
        setUser({ username: "", email: "", password: "", confirmpassword: "", phone: "" });
    };

    const [loading, setLoading] = useState<boolean>(false);

    const validateForm = () => {
        let isValid = true;
      
        if (!user.username.trim()) {
          isValid = false;
          handleSnackbarOpen("Username required!", "error");
        } else if (!user.email.trim()) {
          isValid = false;
          handleSnackbarOpen("Email required!", "error");
        } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(user.email)) {
          isValid = false;
          handleSnackbarOpen("Invalid email format", "error");
        } else if (!user.phone.trim()) {
          isValid = false;
          handleSnackbarOpen("Phone required!", "error");
        
        } else if (!user.password.trim()) {
          isValid = false;
          handleSnackbarOpen("Password required!", "error");
        } else if (!user.confirmpassword.trim()) {
          isValid = false;
          handleSnackbarOpen("Confirm Password required!", "error");
        } else if (user.password.trim() !== user.confirmpassword.trim()) {
          isValid = false;
          handleSnackbarOpen("Passwords do not match!", "error");
        } else if (user.password.length < 8) {
          isValid = false;
          handleSnackbarOpen("Password must be at least 8 characters long", "error");
        }
      
        return isValid;
      };

    const onSignup = async (event: SyntheticEvent) => {
        event.preventDefault();
        setFormSubmitted(true);
        if (validateForm()) {
            try {
                handleSnackbarOpen("Successfully Registered!!!", "success");
                clear();
                console.log("Register Success");
                router.push('/login');

            } catch (error:any) {
                // console.error("Signup error:", error);
                handleSnackbarOpen(error.message, "error");

            } finally {
                setLoading(false);
            }
        }
    };

    const handlePhoneChange = (value: string) => {
        setUser({ ...user, phone: value });
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
                <h1>Signup</h1>
                <label htmlFor="username">Username</label>
                <input
                    className="input-field"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                    style={{ borderColor: (formSubmitted && !user.username.trim()) ? "grey" : "" }}
                />
                <label htmlFor="email">Email</label>
                <input
                    className="input-field"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                    style={{ borderColor: (formSubmitted && !user.email.trim()) ? "grey" : "" }}
                />
             
                <label htmlFor="phone">Phone Number</label>
                <PhoneInput
                    className="input-field"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={user.phone}
                    onChange={handlePhoneChange}
                    style={{ borderColor: (formSubmitted && !user.phone.trim()) ? "grey" : "" }}
                />
                
                <label htmlFor="password">Password</label>
                <input
                    className="input-field"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                    style={{ borderColor: (formSubmitted && !user.password.trim()) ? "grey" : "" }}
                />
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                    className="input-field"
                    id="confirmpassword"
                    type="password"
                    value={user.confirmpassword}
                    onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                    placeholder="Confirm your password"
                    style={{ borderColor: (formSubmitted && !user.confirmpassword.trim()) ? "grey" : "" }}
                />
                <button
                    onClick={onSignup}
                    className="button"
                >
                    Signup
                </button>
            </div>
            <div>
                <a href="/login" className="link">Already have an account? Login</a>
            </div>
        </form>
    );
}

