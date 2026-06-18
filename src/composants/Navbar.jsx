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
        <div className='w-full h-[10vh] bg-slate-950 flex items-center justify-between px-12 border-b border-slate-800'>

            {/* Logo */}
            <NavLink
                to="/"
                className='text-3xl font-bold text-white'
            >
                Dev<span className='text-cyan-400'>bocar</span>
            </NavLink>

            {/* Menu */}
            <div className='flex items-center gap-10'>

                <NavLink
                    to="/"
                    className='text-slate-300 font-medium hover:text-cyan-400 duration-300'
                >
                    Accueil
                </NavLink>

                <NavLink
                    to="/profil"
                    className='text-slate-300 font-medium hover:text-cyan-400 duration-300'
                >
                    Profil
                </NavLink>

            </div>

            {/* Boutons */}
            <div className="flex items-center gap-4">

                {
                    token ? (

                        <button
                            onClick={() => Deconnexion()}
                            className="bg-red-600 px-6 py-3 rounded-full text-white font-semibold hover:bg-red-700 duration-300"
                        >
                            Se déconnecter
                        </button>

                    ) : (

                        <>
                            <NavLink
                                to="/connexion"
                                className="text-white border border-slate-700 px-6 py-3 rounded-full hover:bg-slate-800 duration-300"
                            >
                                Connexion
                            </NavLink>

                            <NavLink
                                to="/inscription"
                                className="bg-cyan-500 px-6 py-3 rounded-full text-white font-semibold hover:bg-cyan-600 duration-300"
                            >
                                Inscription
                            </NavLink>
                        </>

                    )
                }

            </div>

        </div>
    )
}

export default Navbar