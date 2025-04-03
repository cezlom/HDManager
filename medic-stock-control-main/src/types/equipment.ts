
export interface Equipment {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  status: 'Disponível' | 'Em uso' | 'Em manutenção' | 'Desativado';
  type: 'Próprio' | 'Comodato';
  initialQuantity: number;
  minStock: number;
  photo?: string;
}

export interface InventoryMovement {
  id: string;
  equipmentId: string;
  date: Date;
  quantity: number;
  type: 'Entrada' | 'Saída';
  description: string;
}
