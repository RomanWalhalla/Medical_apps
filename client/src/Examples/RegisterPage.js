import React, { useEffect, useState } from 'react';
// import { API_URL } from '../config';
import { NavLink/* , useNavigate */ } from 'react-router-dom'
import chalk from "chalk"
import { toast } from 'react-toastify';

import "../styles/RegisterPage.css"
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

const Register = () => {
    const notifySuccess = (message) => toast.success(message)
    const notifyError = (message) => toast.error(message)
    const notifyWarn = (message) => toast.warn(message)

    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    // const [showerr, setShowerr] = useState('');
    // const navigate = useNavigate();
    const { name, phone, email, password } = formData;
    const [role, setRole] = useState('')

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const registerHandler = async () => {
        try {
            await request("/api/auth/register", "POST", { ...formData })
            console.log(chalk.red("formData", JSON.stringify(formData, null, 2)))
            notifySuccess("Registration successful!")
        } catch (error) {
            // notifyError("Registration failed!")
            notifyError("Registration failed!")
            notifyWarn("Email o Phone already in use!")
        }
    }

    // const register = async (e) => {
    //     e.preventDefault();
    //     // API Call
    //     const response = await fetch(`${API_URL}/api/auth/register`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ formData }),
    //     });

    // const json = await response.json();
    // if (json.authtoken) {
    //     sessionStorage.setItem("auth-token", json.authtoken);
    //     sessionStorage.setItem("name", name);
    //     // phone and email
    //     sessionStorage.setItem("phone", phone);
    //     sessionStorage.setItem("email", email);
    //     // Redirect to home page
    //     navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
    //     window.location.reload();
    // } else {
    //     if (json.errors) {
    //         for (const error of json.errors) {
    //             setShowerr(error.msg);
    //         }
    //     } else {
    //         setShowerr(json.error);
    //     }
    // }
    // };

    return (
        <>
            <div className="container_signup">
                <div className="sign_up_grid">
                    <div className="sign_up_text">
                        <h1 className="h1_register">Sign Up</h1>
                    </div>
                    <div className="selected_div">{role ? (<>You register as <span className="role_register" > {role} </span></>) : ''}
                    </div>
                    <div className="sign_up_text">
                        Already member? <span><NavLink to="/Login">Login</NavLink></span>
                    </div>
                    <div className="sign_up-form">
                        <form method='POST' action="" /* onSubmit={register} */>
                            <div className="form-group_signup">
                                <fieldset>
                                    <legend>Role</legend>
                                    <select id="mySelect" value={role} onChange={(e) => setRole(e.target.value)} required>
                                        <option value='' disabled>------</option>
                                        <option value="Doctor">Doctor</option>
                                        <option value="Patient">Patient</option>
                                    </select>
                                </fieldset>
                            </div>
                            <div className="form-group_signup">
                                <fieldset>
                                    <legend>Name</legend>
                                    <input
                                        type="text"
                                        name='name'
                                        id='name'
                                        value={name}
                                        onChange={onChange}
                                        className="form-control_register"
                                        required placeholder="Enter your name"
                                        aria-describedby='helpId' />
                                </fieldset>
                            </div>
                            <div className="form-group_signup">
                                <fieldset>
                                    <legend>Phone</legend>
                                    <input
                                        type="tel"
                                        name='phone'
                                        id='phone'
                                        value={phone}
                                        onChange={onChange}
                                        className="form-control_register"
                                        required
                                        placeholder="Enter your phone"
                                        aria-describedby='helpId'
                                    />
                                </fieldset>
                            </div>
                            <div className="form-group_signup">
                                <fieldset>
                                    <legend>Email</legend>
                                    <input
                                        type="email"
                                        name='email'
                                        id='email'
                                        value={email}
                                        onChange={onChange}
                                        className="form-control_register"
                                        required
                                        placeholder="Enter your email"
                                        aria-describedby='helpId' />
                                    {/* {showerr && <div className='err' style={{ color: 'red' }}>{showerr}</div>} */}
                                </fieldset>
                            </div>
                            <div className="form-group_signup">
                                <fieldset>
                                    <legend>Password</legend>
                                    <input
                                        type="password"
                                        name='password'
                                        id='password'
                                        value={password}
                                        onChange={onChange}
                                        className="form-control_register"
                                        required
                                        placeholder="Enter your password"
                                        aria-describedby='helpId' />
                                </fieldset>
                            </div>
                            <div className="btn_group_signup">
                                <button
                                    type="submit"
                                    className="btn btn_primary"
                                    onClick={registerHandler}
                                    disabled={loading}
                                >
                                    Submit
                                </button>
                                <button
                                    type="reset"
                                    className="btn btn_danger"
                                >
                                    Reset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;

// style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif

// const SignUp = () => {
//     // const [name, setName] = useState('');
//     // const [email, setEmail] = useState('');
//     // const [phone, setPhone] = useState('');
//     // const [password, setPassword] = useState('');
//     // const [showerr, setShowerr] = useState('');

//     const navigate = useNavigate();
//     const register = async (e) => {
//         e.preventDefault();
//         // API Call
//         const response = await fetch(`${API_URL}/api/auth/register`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 name: name,
//                 phone: phone,
//                 email: email,
//                 password: password,
//             }),
//         });
//         const json = await response.json();
//         if (json.authtoken) {
//             sessionStorage.setItem("auth-token", json.authtoken);
//             sessionStorage.setItem("name", name);
//             // phone and email
//             sessionStorage.setItem("phone", phone);
//             sessionStorage.setItem("email", email);
//             // Redirect to home page
//             navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
//             window.location.reload();
//         } else {
//             if (json.errors) {
//                 for (const error of json.errors) {
//                     setShowerr(error.msg);
//                 }
//             } else {
//                 setShowerr(json.error);
//             }
//         }
//     };