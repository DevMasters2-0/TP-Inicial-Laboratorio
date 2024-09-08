import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [usuario, setUsuario] = useState(null); // Inicializa como null para una mejor verificación

    useEffect(() => {
        const storedIsAuth = localStorage.getItem('isAuth');
        const storedUsuario = localStorage.getItem('usuario');

        if (storedIsAuth === 'true') {
            setIsAuthenticated(true);
        }

        try {
            if (storedUsuario) {
                setUsuario(JSON.parse(storedUsuario));
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            localStorage.removeItem('usuario');
        }
    }, []); 

    const login = (user) => {
        localStorage.setItem('isAuth', 'true'); 
        localStorage.setItem('usuario', JSON.stringify(user));
        setIsAuthenticated(true);
        setUsuario(user);
    };

    const logout = () => {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('usuario');
        setIsAuthenticated(false);
        setUsuario(null); 
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, usuario }}>
            {children}
        </AuthContext.Provider>
    );
};
