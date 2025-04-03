
import React, { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { Equipment } from "@/types/equipment";
import { Button } from "@/components/ui/button";
import { useEquipment } from "@/context/EquipmentContext";
import { toast } from "sonner";

interface EquipmentTableProps {
  equipments: Equipment[];
  onDelete: (id: string) => void;
}

const EquipmentTable: React.FC<EquipmentTableProps> = ({ equipments, onDelete }) => {
  const { updateEquipment } = useEquipment();
  const [movements, setMovements] = useState<{
    [key: string]: number;
  }>({});

  const handleMovementChange = (
    equipment: Equipment,
    value: number
  ) => {
    // Ensure stock doesn't go below 0
    const newValue = Math.max(0, value);
    setMovements((prev) => ({
      ...prev,
      [equipment.id]: newValue,
    }));
    
    // Update equipment in context
    updateEquipment(equipment.id, { initialQuantity: newValue });
  };

  const getMovementValue = (equipmentId: string): number => {
    const equipment = equipments.find(e => e.id === equipmentId);
    return equipment ? equipment.initialQuantity : 0;
  };

  const handleDeleteClick = (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este equipamento?")) {
      onDelete(id);
      toast.success("Equipamento excluído com sucesso!");
    }
  };

  const handleAdd5 = (equipment: Equipment) => {
    const newQuantity = equipment.initialQuantity + 5;
    updateEquipment(equipment.id, { initialQuantity: newQuantity });
    toast.success(`Adicionado +5 unidades de ${equipment.name}`);
  };

  return (
    <div className="bg-white rounded-md shadow overflow-x-auto animate-fade-in">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Equipamentos em Estoque
              <br />
              <span className="font-semibold text-hdgreen-700">SÃO PAULO</span>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Estoque
              <br />
              <span className="font-semibold text-hdgreen-700">Mínimo</span>
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Quantidade
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipments.map((equipment) => {
            const currentStock = equipment.initialQuantity;
            const isLowStock = currentStock < equipment.minStock && currentStock > 0;
            const isOutOfStock = currentStock === 0;
            
            return (
              <tr 
                key={equipment.id} 
                className={`hover:bg-gray-50 ${isLowStock ? 'bg-yellow-50' : ''} ${isOutOfStock ? 'bg-red-50' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {equipment.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                  {equipment.minStock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <div className="flex items-center justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() =>
                        handleMovementChange(
                          equipment,
                          Math.max(0, equipment.initialQuantity - 1)
                        )
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="mx-2 w-6 text-center">
                      {getMovementValue(equipment.id)}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() =>
                        handleMovementChange(
                          equipment,
                          equipment.initialQuantity + 1
                        )
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full ml-1 bg-hdgreen-500 text-white hover:bg-hdgreen-600"
                      onClick={() => handleAdd5(equipment)}
                    >
                      +5
                    </Button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteClick(equipment.id)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
