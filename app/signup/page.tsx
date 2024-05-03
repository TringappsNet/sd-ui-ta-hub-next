"use client";
import React, { useState, SyntheticEvent, ChangeEvent } from "react";
import axios from "axios";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/signup.css';
import 'bootstrap/dist/css/bootstrap.css';
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";

export default function SignupPage() {
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
            handleSnackbarOpen("Username cannot be empty!", "error");
        }
        else if (!user.email.trim()) {
            isValid = false;
            handleSnackbarOpen("Email cannot be empty!", "error");

        }
        else if (!user.phone.trim()) {
            isValid = false;
            handleSnackbarOpen("Phone cannot be empty!", "error");

        }
        else if (!user.password.trim()) {
            isValid = false;
            handleSnackbarOpen("Password cannot be empty!", "error");

        }
        else if (!user.confirmpassword.trim()) {
            isValid = false;
            handleSnackbarOpen("Confirmpassword cannot be empty!", "error");

        }
        else if (user.password.trim() !== user.confirmpassword.trim()) {
            isValid = false;
            handleSnackbarOpen("Password cannot be match!", "error");

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
            } catch (error) {
                console.error("Signup error:", error);
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
                    style={{ borderColor: (formSubmitted && !user.username.trim()) ? "red" : "" }}
                />
                <label htmlFor="email">Email</label>
                <input
                    className="input-field"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                    style={{ borderColor: (formSubmitted && !user.email.trim()) ? "red" : "" }}
                />
             
                <label htmlFor="phone">Phone Number</label>
                <PhoneInput
                    className="input-field"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={user.phone}
                    onChange={handlePhoneChange}
                    style={{ borderColor: (formSubmitted && !user.phone.trim()) ? "red" : "" }}
                />
                
                <label htmlFor="password">Password</label>
                <input
                    className="input-field"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                    style={{ borderColor: (formSubmitted && !user.password.trim()) ? "red" : "" }}
                />
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input
                    className="input-field"
                    id="confirmpassword"
                    type="password"
                    value={user.confirmpassword}
                    onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
                    placeholder="Confirm your password"
                    style={{ borderColor: (formSubmitted && !user.confirmpassword.trim()) ? "red" : "" }}
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

