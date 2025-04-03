
import React, { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEquipment } from "@/context/EquipmentContext";
import { toast } from "sonner";
import { exportToExcel, exportToPDF } from "@/utils/exportUtils";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  onExportPDF: () => void;
  onExportExcel: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onFilterChange,
  onExportPDF,
  onExportExcel
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { equipments } = useEquipment();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleExportExcel = () => {
    try {
      exportToExcel(equipments, `equipamentos_${new Date().toISOString().split('T')[0]}`);
      toast.success("Exportação para Excel concluída com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar para Excel:", error);
      toast.error("Erro ao exportar para Excel. Tente novamente.");
    }
  };

  const handleExportPDF = () => {
    try {
      exportToPDF(equipments, `equipamentos_${new Date().toISOString().split('T')[0]}`);
      toast.success("Exportação para PDF concluída com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar para PDF:", error);
      toast.error("Erro ao exportar para PDF. Tente novamente.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm mb-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-end">
        <div className="flex-1">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Buscar equipamento
          </label>
          <form onSubmit={handleSearchSubmit} className="relative">
            <Input
              id="search"
              type="text"
              placeholder="Buscar por nome, modelo ou fabricante"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
            <Search 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
              aria-hidden="true" 
            />
          </form>
        </div>
        
        <div className="w-full lg:w-56">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select 
            id="filter"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hdgreen-400"
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="Próprio">Próprio</option>
            <option value="Comodato">Comodato</option>
          </select>
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto">
          <Button
            variant="outline"
            onClick={handleExportExcel}
            className="flex-1 lg:flex-none justify-center bg-white hover:bg-gray-50 border border-gray-300 text-gray-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Excel
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExportPDF}
            className="flex-1 lg:flex-none justify-center bg-white hover:bg-gray-50 border border-gray-300 text-gray-700"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
