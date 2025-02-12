import { createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({token: null, email: ''});
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        if (password.length < 6) {
            setMensaje('La contraseña debe tener al menos 6 caracteres');
            alert('La contraseña debe tener al menos 6 caracteres');
            return;
        }
        try{
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });

            const token = response.data.token;

            setUser({token, email});

            localStorage.setItem('token', token);
            localStorage.setItem('email', email);

            alert('Ingreso exitoso.');
            navigate('/');

        }catch(error) {
            console.error('Error en el inicio de sesión.', error.response.data);
            alert('Error en el inicio de sesión.')
        }

    };

    const handleRegister = async (email, password) => {
        if (!email || !password) {
            alert('Email y contraseña son requeridos.');
            return;
          }

        try{
            const response = await axios.post('http://localhost:5000/api/auth/register', {
                email,
                password,
            });

            const token = response.data.token;

            handleLogin(token, email);

            alert('Registro exitoso.');
            navigate('/')

        }catch (error) {
            console.error('Error en el registro.', error.response.data);
            alert('Error en el registro.');
        }
    }

    const handleLogout = () => {
        setUser({token: null, email: ''});

        localStorage.removeItem('token');
        localStorage.removeItem('email');

        alert('Sesión cerrada exitosamente.');
        navigate('/login')
    };

    const userProfile = async () => {
        try{
            const response = await axios.get('http://localhost:5000/api/auth/me', {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            });

            setProfile(response.data);
        }catch(error) {
            console.error('Error al obtener el perfil del usuario.', error.response.data);
            alert('No se pudo obtener el perfil.');
        }
    };

    return(
        <UserContext.Provider value={{user, profile, handleLogin, handleRegister, handleLogout, userProfile}}>
            {children}
        </UserContext.Provider>
    )
}