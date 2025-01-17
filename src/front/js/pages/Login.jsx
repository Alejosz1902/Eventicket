import React, { useContext, useEffect, useState } from "react";
import logo from "../../img/logito.png";
import people from "../../img/people.png";
import fondo from "../../img/fondoazul.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; // Importar el contexto global
import "../../styles/login.css";
import Swal from "sweetalert2";


export const Login = () => {
    const { actions,store } = useContext(Context); // Acceder a las acciones del flux
    const [email, setEmail] = useState(""); // Estado para el email
    const [password, setPassword] = useState(""); // Estado para la contraseña
    const navigate = useNavigate(); // Para redirigir después del login

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.loginUser(email, password);
        if (success) {
            Swal.fire({
                icon: 'success',
                title: success,
                confirmButtonText: 'Ok'
            });
                navigate("/");
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: 'Verifica tus credenciales.',
                confirmButtonText: 'Ok'
            });
        }
    };

    useEffect(()=>{
        if(store.admin!==false){navigate("/demo");}
        if(store.currentUser!==false){navigate("/");}
    },[store.admin,store.currentUser])


    return (
        <div
            style={{
                backgroundImage: `url(${fondo})`,
                backgroundColor: "#4038E6",
                height: "100vh",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <div className="container w-75 mt-5 shadow">
                <div className="row align-items-stretch">
                    <div
                        className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded"
                        style={{
                            backgroundImage: `url(${people})`,
                            height: "90vh"
                        }}
                    ></div>

                    <div className="col bg-white p-5 rounded-end">
                        <div className="text-end">
                            <img src={logo} className="rounded-pill" width="40" alt="" />
                        </div>

                        <h2 className="fw-bold text-center py-3 text-primary text-info-emphasis fw-light display-6">
                            Bienvenidos a Eventicket
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control login"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Actualizar estado de email
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control login"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Actualizar estado de contraseña
                                    required
                                />
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                            </div>
                            <div className="my-3">
                                <Link to="/registro">
                                    Aún no tienes cuenta? Regístrate aqui.
                                </Link>
                                <br />
                                <Link to="/login-admin">Ingresar como Administrador</Link>
                                <br />
                                <Link to="/contrasena">¿Olvidaste tu contraseña?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
