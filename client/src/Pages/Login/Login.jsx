import React, {useEffect, useState} from "react";
import "./Login.css";
import Button from "../../Components/Button";
import Footer from "../../Sections/Footer/Footer";
import Navbar from "../../Sections/Navbar/Navbar";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function Login() {

    const navigate = useNavigate();

    const [activeTabLogin, setActiveTabLogin] = useState(true);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [confirmPw, setConfirmPw] = useState('');

    const [pwdMatching, setPwdMatching] = useState(true);

    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await axios.post('https://flix-server.vercel.app/login', {email: formData.email, password: formData.password})
                .then((res) => {
                    const token = res.data.token;
                    localStorage.setItem('jwtToken', token);
                    setError('')
                    const decoded = jwtDecode(token);

                    if (decoded.role === 'admin') navigate('/admin')
                    else navigate('/')

                })
                .catch((error) => {
                    if (error.response) setError(error.response.data.message)
                    else setError(error.message)
                })
        } catch (error) {
            if (error.response) setError(error.response.data.message)
            else setError(error.message)
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        if (confirmPw === formData.password) {
            try {
                await axios.post('https://flix-server.vercel.app/register', formData)
                    .then((res) => {
                        const token = res.data.token;
                        localStorage.setItem('jwtToken', token);
                        setError('')
                        navigate('/')
                    })
                    .catch((error) => {
                        if (error.response) setError(error.response.data.message)
                        else setError(error.message)
                    })

            } catch (error) {
                if (error.response) setError(error.response.data.message)
                else setError(error.message)
            }
        } else {
            setError('Password does not match!')
        }
    }

    const handleChange = (e) => {
        setError('')
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    };

    useEffect(() => {
        setPwdMatching(formData.password === confirmPw)
    }, [confirmPw]);

    return (
        <React.Fragment>
            <Navbar/>
            <div className="login-page-wrapper">
                <div className="login-page-container">
                    <div className="switch-tabs">
                        <div
                            className="sign-in switch-tab"
                            onClick={() => setActiveTabLogin(true)}
                            style={activeTabLogin ? {borderBottom: "1px solid #000000"} : {borderBottom: "none"}}>
                            <p>Sign In</p>
                        </div>
                        <div
                            className="sign-up switch-tab"
                            onClick={() => setActiveTabLogin(false)}
                            style={activeTabLogin ? {borderBottom: "none"} : {borderBottom: "1px solid #000000"}}>
                            <p>Sign Up</p>
                        </div>
                    </div>
                    <div className="login-form-container">
                        {
                            activeTabLogin ?
                                <form className="login-form" onSubmit={handleLogin}>
                                    <div className="input-container">
                                        <label>Email</label>
                                        <input
                                            onChange={handleChange}
                                            name="email"
                                            type="text"
                                            placeholder="Enter your email"
                                            required/>
                                    </div>
                                    <div className="input-container">
                                        <label>Password</label>
                                        <input
                                            onChange={handleChange}
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            required/>
                                    </div>
                                    <Button type="submit">Login</Button>
                                    {error && <p style={{color: "rgb(220,0,0)", textAlign: "center"}}>{error}</p>}
                                </form>
                                :
                                <form className="login-form" onSubmit={handleRegister}>
                                    <div className="input-container">
                                        <label>Name</label>
                                        <input
                                            onChange={handleChange}
                                            name="name"
                                            type="text"
                                            placeholder="Enter your name"
                                            required/>
                                    </div>
                                    <div className="input-container">
                                        <label>Email</label>
                                        <input
                                            onChange={handleChange}
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required/>
                                    </div>
                                    <div className="input-container">
                                        <label
                                            style={pwdMatching ? {color: "rgb(15,200,15)"} : {color: "rgb(220,0,0)"}}
                                        >Password</label>
                                        <input
                                            style={pwdMatching ? {borderBottom: "1px solid rgb(15,200,15)"} : {borderBottom: "1px solid rgb(220,0,0)"}}
                                            onChange={handleChange}
                                            name="password"
                                            type="password"
                                            placeholder="Enter your password"
                                            required/>
                                    </div>
                                    <div className="input-container">
                                        <label
                                            style={pwdMatching ? {color: "rgb(15,200,15)"} : {color: "rgb(220,0,0)"}}
                                        >Password</label>
                                        <input
                                            style={pwdMatching ? {borderBottom: "1px solid rgb(15,200,15)"} : {borderBottom: "1px solid rgb(220,0,0)"}}
                                            onChange={(e) => {
                                                setConfirmPw(e.target.value)
                                                setError('')
                                            }}
                                            type="password"
                                            placeholder="Re enter your password"
                                            required/>
                                    </div>
                                    <Button type="submit">Create an Account</Button>
                                    {error && <p style={{color: "rgb(220,0,0)", textAlign: "center"}}>{error}</p>}
                                </form>
                        }
                    </div>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}