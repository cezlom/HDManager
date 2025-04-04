import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusCircle, ClipboardList } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-[#016f52] text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        {/* LINHA SUPERIOR: LOGO À ESQUERDA, TÍTULO CENTRALIZADO */}
        <div className="flex items-center justify-between mb-4">
          {/* LOGO GRANDE À ESQUERDA */}
          <img
            src="/src/homedoctorbrasil_logo.jpg"
            alt="Logo Home Doctor"
            className="w-20 h-20"
          />

          {/* TÍTULO CENTRALIZADO EM BRANCO */}
          <h1 className="text-2xl font-bold text-center flex-1 text-white">
            HD EquipManager
          </h1>

          {/* Espaço vazio para alinhar o título no centro */}
          <div className="w-16" />
        </div>

        {/* MENU */}
        <nav className="flex space-x-1 w-full max-w-md mx-auto">
          <Link
            to="/"
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-t-lg transition-colors ${
              isActive("/")
                ? "bg-white text-[#016f52] font-semibold"
                : "bg-[#016f52] text-white hover:bg-[#015a43]"
            }`}
          >
            <ClipboardList className="mr-2 h-5 w-5" />
            <span>Equipamentos</span>
          </Link>

          <Link
            to="/add"
            className={`flex-1 flex items-center justify-center py-2 px-3 rounded-t-lg transition-colors ${
              isActive("/add")
                ? "bg-white text-[#016f52] font-semibold"
                : "bg-[#016f52] text-white hover:bg-[#015a43]"
            }`}
          >
            <PlusCircle className="mr-2 h-5 w-5" />
            <span>Novo Ativo</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
