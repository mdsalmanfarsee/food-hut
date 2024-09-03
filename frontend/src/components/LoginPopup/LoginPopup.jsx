import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios"
import { toast } from 'react-toastify'



const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    }

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            toast.success(response.data.msg);
            setTimeout(() => {
                setShowLogin(false);
            }, 1100);
        }
        else {
            toast.error(response.data.msg);
        }
    }




    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-input">
                    {
                        currState === "Login" ? <></> : <input onChange={onChangeHandler} name='name' value={data.name} type="text" placeholder='Your name' required />
                    }

                    <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Your email' required />
                    <input onChange={onChangeHandler} name='password' value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit'>{currState === "Sign up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, i agree to the term of use and Privacy Policy</p>


                </div>
                <div>
                    {
                        currState === "Login" ? <p><span>Forgot password?</span></p> : <></>
                    }
                </div>
                {
                    currState === "Login" ? <p>Create a new account?<span onClick={() => setCurrState("Sign up")}>Click here</span></p>
                        : <p>Already have an account?<span onClick={() => setCurrState("Login")}>Login</span></p>
                }


            </form>
        </div>
    )
}
//2:19:00

export default LoginPopup;