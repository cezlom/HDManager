
import React, { createContext, useState, useContext, useEffect } from "react";
import { Equipment, InventoryMovement } from "@/types/equipment";

interface EquipmentContextType {
  equipments: Equipment[];
  movements: InventoryMovement[];
  addEquipment: (equipment: Equipment) => void;
  updateEquipment: (id: string, equipment: Partial<Equipment>) => void;
  deleteEquipment: (id: string) => void;
  addMovement: (movement: InventoryMovement) => void;
  getMovementsForEquipment: (equipmentId: string) => InventoryMovement[];
  getEquipmentById: (id: string) => Equipment | undefined;
}

// Sample data com base na lista fornecida
const initialEquipments: Equipment[] = [
  {
    id: "1",
    name: "Aspirador Cirúrgico Nevoni",
    model: "3003PO",
    manufacturer: "Nevoni",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 4,
    minStock: 4
  },
  {
    id: "2",
    name: "Aspirador Elétrico",
    model: "N/A",
    manufacturer: "Onrom/Medicate/Nevoni",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 4,
    minStock: 4
  },
  {
    id: "3",
    name: "Astral 100",
    model: "100",
    manufacturer: "Resmed",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 1,
    minStock: 1
  },
  {
    id: "4",
    name: "Base de Umidificação",
    model: "GT 2000 / GT 5000",
    manufacturer: "GlobalTec",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 3,
    minStock: 3
  },
  {
    id: "5",
    name: "BIPAP A40",
    model: "A40",
    manufacturer: "Philips",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 2,
    minStock: 2
  },
  {
    id: "6",
    name: "BIPAP Simples",
    model: "DreamStation",
    manufacturer: "Philips",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 3,
    minStock: 2
  },
  {
    id: "7",
    name: "Bomba Infusão Terumo",
    model: "135 -TE",
    manufacturer: "Politec",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 2,
    minStock: 1
  },
  {
    id: "8",
    name: "Bomba Vac KCI",
    model: "ULTA",
    manufacturer: "KCI",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 1,
    minStock: 1
  },
  {
    id: "9",
    name: "Cabo Extensor Oxímetro Nellcor",
    model: "N/A",
    manufacturer: "N/A",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 5,
    minStock: 3
  },
  {
    id: "10",
    name: "Concentrador de oxigenio 5L",
    model: "Everflo",
    manufacturer: "Philips",
    status: "Disponível",
    type: "Próprio",
    initialQuantity: 10,
    minStock: 5
  }
];

const EquipmentContext = createContext<EquipmentContextType>({
  equipments: [],
  movements: [],
  addEquipment: () => {},
  updateEquipment: () => {},
  deleteEquipment: () => {},
  addMovement: () => {},
  getMovementsForEquipment: () => [],
  getEquipmentById: () => undefined
});

export const useEquipment = () => useContext(EquipmentContext);

export const EquipmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [movements, setMovements] = useState<InventoryMovement[]>([]);

  useEffect(() => {
    // Inicializa com dados de exemplo
    setEquipments(initialEquipments);
    
    // Gera alguns movimentos fictícios para exemplo
    const sampleMovements: InventoryMovement[] = initialEquipments.slice(0, 5).map((equip, idx) => ({
      id: `mov-${idx}`,
      equipmentId: equip.id,
      date: new Date(2025, 3, idx + 1),
      quantity: idx + 1,
      type: idx % 2 === 0 ? 'Entrada' : 'Saída',
      description: `Movimento de ${idx % 2 === 0 ? 'entrada' : 'saída'} de exemplo`
    }));
    
    setMovements(sampleMovements);
  }, []);

  const addEquipment = (equipment: Equipment) => {
    setEquipments(prev => [...prev, equipment]);
  };

  const updateEquipment = (id: string, updatedEquipment: Partial<Equipment>) => {
    setEquipments(prev => 
      prev.map(equipment => 
        equipment.id === id ? { ...equipment, ...updatedEquipment } : equipment
      )
    );
  };

  const deleteEquipment = (id: string) => {
    setEquipments(prev => prev.filter(equipment => equipment.id !== id));
  };

  const addMovement = (movement: InventoryMovement) => {
    setMovements(prev => [...prev, movement]);
  };

  const getMovementsForEquipment = (equipmentId: string): InventoryMovement[] => {
    return movements.filter(movement => movement.equipmentId === equipmentId);
  };

  const getEquipmentById = (id: string): Equipment | undefined => {
    return equipments.find(equipment => equipment.id === id);
  };

  return (
    <EquipmentContext.Provider value={{
      equipments,
      movements,
      addEquipment,
      updateEquipment,
      deleteEquipment,
      addMovement,
      getMovementsForEquipment,
      getEquipmentById
    }}>
      {children}
    </EquipmentContext.Provider>
  );
};
