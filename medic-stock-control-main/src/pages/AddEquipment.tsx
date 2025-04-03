
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import AddEquipmentForm from "@/components/AddEquipmentForm";
import { useEquipment } from "@/context/EquipmentContext";
import { Equipment } from "@/types/equipment";

const AddEquipment = () => {
  const { addEquipment } = useEquipment();
  const navigate = useNavigate();

  const handleSubmit = (equipment: Equipment) => {
    addEquipment(equipment);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <AddEquipmentForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; 2025 HD EquipManager - HomeDoctor
        </div>
      </footer>
    </div>
  );
};

export default AddEquipment;
