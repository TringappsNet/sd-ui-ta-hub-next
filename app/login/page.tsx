"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
// import { toast } from "react-hot-toast";
import '../styles/page.css';




export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            // toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            // toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
    
        <form >
        <div className="card1">
          <h1>Login</h1>
          
          <label htmlFor="email" className="Email">Email</label>
          <input 
            className="input-field"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="Email"
          />
          
          <label htmlFor="password">Password</label>
          <input 
            className="input-field"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="Password"
          />
         <a href="/signup" className="forget">Forget password?</a>
 
         <div className="checkbox">
         <input type="checkbox"/>
          <p> Remember this device </p>

         </div>
          <button
            onClick={onLogin}
            className="button"
          > 
            Sign In
          </button>
          
        </div>  


        <div className="login-secondary">
          <div className="text-center">
          <a href="#">Don’t have an employee account?</a>
          <div >
        <a href="/signup" className="signup">Want to sign your company up with TOPS? </a>

        </div>
          </div>
        </div>
       
      </form>
      
    )

}