import React, { useState } from 'react';

const initialUserState = {
    username: "",
    email: "",
    password: ""
}

export default function Register() {
    const [userData, setUserData] = useState(initialUserState);
    const [user, setUser] = useState(null);

    const handleChange = event => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = event => {
        event.prevenDefault();
        setUser(userData);
        setUserData(initialUserState);
    }
    return (
        <div
            style={{
                textAlign: 'center'
            }}
        >
            <h2>Register</h2>
            <form
                style={{
                    display: 'grid',
                    alignItems: 'center',
                    justifyItems: 'center'
                }}
                onSubmit={handleSubmit}
            >
                <input type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                    value={userData.username}
                />
                <input type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={handleChange}
                    value={userData.email}
                />
                <input type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={userData.password}
                />
                <button type="submit" >Submit</button>
            </form>
            {user && JSON.stringify(user, null, 2)}
        </div>
    );
}