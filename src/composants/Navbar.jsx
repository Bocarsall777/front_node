import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const Deconnexion = () => {
        localStorage.removeItem("token");
        alert('Déconnexion réussie');
        navigate('/');
    }

    return (
        <div className='w-full h-[10vh] flex items-center justify-between px-10 bg-slate-900 shadow-lg'>

            <NavLink
                to="/"
                className='text-3xl font-bold text-white'
            >
                Logo
            </NavLink>

            <div className="flex items-center gap-5">

                <NavLink
                    to="/profil"
                    className='text-white font-medium hover:text-yellow-400 transition duration-300'
                >
                    Profil
                </NavLink>

                {
                    token ? (

                        <button
                            onClick={() => Deconnexion()}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition duration-300"
                        >
                            Se déconnecter
                        </button>

                    ) : (
                        <div className="flex items-center gap-3">

                            <NavLink
                                to="/connexion"
                                className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-yellow-600 transition duration-300"
                            >
                                Connexion
                            </NavLink>

                            <NavLink
                                to="/inscription"
                                className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition duration-300"
                            >
                                Inscription
                            </NavLink>

                        </div>
                    )
                }

            </div>

        </div>
    )
}

export default Navbar