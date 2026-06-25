import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

        {/* gauche */}
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Mini StackOverflow. Tous droits réservés.
        </p>

        {/* droite */}
        <div className="flex gap-4 mt-3 md:mt-0 text-sm">
          <a href="#" className="hover:text-green-400 transition">
            Accueil
          </a>
          <a href="#" className="hover:text-green-400 transition">
            Questions
          </a>
          <a href="#" className="hover:text-green-400 transition">
            Profil
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;