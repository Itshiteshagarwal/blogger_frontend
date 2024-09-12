import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
    const [details, setDetails] = useState({ name: "", email: "", password: "" });
    let navigate = useNavigate();
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const { name, email, password } = details;
        const response = await fetch("https://blogger-ugeq.onrender.com/api/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const json = await response.json();
        if (json.authToken) {
            props.showAlert('Account created successfully', 'success');
            localStorage.setItem('token', json.authToken);
            navigate("/");
        } else {
            props.showAlert('Something went wrong', 'danger');
        }
    } catch (error) {
        console.error('Error:', error.message);
        props.showAlert('Something went wrong', 'danger');
    }
}

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    }

    return (
        <div className='mt-2'>
            <h2 className='my-2'>Are you a new user? Please sign up and enjoy our Blogger app</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name='email' 
                        required 
                        aria-describedby="emailHelp" 
                        onChange={handleChange} 
                        autoComplete="email" 
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        name='name' 
                        required 
                        onChange={handleChange} 
                        autoComplete="name" 
                    />
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
                        autoComplete="new-password" 
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default SignUp;
