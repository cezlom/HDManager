
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import SearchFilters from "@/components/SearchFilters";
import EquipmentTable from "@/components/EquipmentTable";
import { useEquipment } from "@/context/EquipmentContext";
import { toast } from "sonner";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";

const Index = () => {
  const { equipments, deleteEquipment } = useEquipment();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const navigate = useNavigate();

  const filteredEquipments = equipments.filter(equipment => {
    const matchesSearch = searchQuery
      ? equipment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        equipment.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        equipment.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    
    const matchesType = selectedType 
      ? equipment.type === selectedType
      : true;
    
    return matchesSearch && matchesType;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedType(filter);
  };

  const handleExportPDF = () => {
    try {
      exportToPDF(filteredEquipments, `estoque_atual_${new Date().toISOString().split('T')[0]}`);
      toast.success("Relatório PDF gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar para PDF:", error);
      toast.error("Erro ao gerar PDF. Tente novamente.");
    }
  };

  const handleExportExcel = () => {
    try {
      exportToExcel(filteredEquipments, `estoque_atual_${new Date().toISOString().split('T')[0]}`);
      toast.success("Relatório Excel gerado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar para Excel:", error);
      toast.error("Erro ao gerar Excel. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6">
        <SearchFilters 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
          onExportPDF={handleExportPDF}
          onExportExcel={handleExportExcel}
        />
        
        <EquipmentTable 
          equipments={filteredEquipments}
          onDelete={deleteEquipment}
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

export default Index;
