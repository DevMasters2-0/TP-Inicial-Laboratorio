import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'; 
import logoApp from '../assets/nms-logo2.png'; 
import axios from "axios";
import { useAuthContext } from "../context/AuthProvider";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, isAuthenticated } = useAuthContext();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { username, password })
            .then(response => {

                if (response.status === 200) {
                    login(response.data.user)
                    navigate('/admin')
                } else {
                    setError("Credenciales incorrectas");
                }
            })
            .catch(error => {
                console.log(error)
                setError("Error al autenticar");
            });
    };

    return (
        <div className="login-container">
            <img id="logoapp" src={logoApp}></img>
            <h2>Iniciar Sesión</h2>

            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p id="msjerror">{error}</p>}
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
