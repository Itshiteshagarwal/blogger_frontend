import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [details, setDetails] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = details;
        try {
            const response = await fetch("https://blogger-ugeq.onrender.com/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();

            if (response.ok) {
                props.showAlert('Login successful', 'success');
                localStorage.setItem('token', json.authToken);
                navigate("/");
            } else {
                props.showAlert('Invalid credentials', 'danger');
            }
        } catch (error) {
            props.showAlert('Server error, please try again later', 'danger');
            console.error('Error during login:', error);
        }
    }

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    return (
        <div className='mt-2'>
            <h2 className='my-2'>Login to continue to Blogger</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        required 
                        onChange={handleChange} 
                        aria-describedby="emailHelp" 
                        autoComplete="email" 
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password" 
                        required 
                        onChange={handleChange} 
                        autoComplete="current-password" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Login;
