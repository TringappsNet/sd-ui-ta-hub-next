"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import axios from "axios";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../styles/signup.css';
import 'bootstrap/dist/css/bootstrap.css';


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
        confirmpassword:"",
        phone: "" 

    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error) {
          
        } finally {
            setLoading(false);
        }
    }
    const handlePhoneChange = (value) => {
      setUser({...user, phone: value});
  }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0 && user.confirmpassword.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <form>
            <div className="card1">
                <h1>Signup</h1>
                <label htmlFor="username">Username</label>
                <input 
                    className="input-field"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({...user, username: e.target.value})}
                    placeholder="Enter your username"
                />
                <label htmlFor="email">Email</label>
                <input 
                    className="input-field"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    placeholder="Enter your email"
                />
                 <label htmlFor="phone">Phone Number</label>
                <PhoneInput
                    className="input-field"
                    id="phone"
                    placeholder="Enter your phone number"
                    value={user.phone}
                    onChange={handlePhoneChange} 
                />
                <label htmlFor="password">Password</label>
                <input 
                    className="input-field"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({...user, password: e.target.value})}
                    placeholder="Enter your password"
                />
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input 
                    className="input-field"
                    id="confirmpassword"
                    type="password"
                    value={user.confirmpassword}
                    onChange={(e) => setUser({...user, confirmpassword: e.target.value})}
                    placeholder="Confirm your password"
                />
                <button
                    onClick={onSignup}
                    className="button"
                    disabled={buttonDisabled}
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
