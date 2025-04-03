
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PlusCircle, ClipboardList } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-hdgreen-500 text-white py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4">HD EquipManager</h1>
          
          <nav className="flex space-x-1 w-full max-w-md">
            <Link
              to="/"
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-t-lg transition-colors ${
                isActive("/") ? "bg-white text-hdgreen-600 font-semibold" : "bg-hdgreen-600 text-white hover:bg-hdgreen-700"
              }`}
            >
              <ClipboardList className="mr-2 h-5 w-5" />
              <span>Equipamentos</span>
            </Link>
            
            <Link
              to="/add"
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-t-lg transition-colors ${
                isActive("/add") ? "bg-white text-hdgreen-600 font-semibold" : "bg-hdgreen-600 text-white hover:bg-hdgreen-700"
              }`}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              <span>Novo Ativo</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
