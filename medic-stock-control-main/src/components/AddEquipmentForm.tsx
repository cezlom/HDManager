
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Equipment } from "@/types/equipment";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  model: z.string().min(1, "Modelo é obrigatório"),
  manufacturer: z.string().min(1, "Fabricante é obrigatório"),
  type: z.enum(["Próprio", "Comodato"]),
  minStock: z.coerce.number().min(0, "Estoque mínimo não pode ser negativo"),
});

interface AddEquipmentFormProps {
  onSubmit: (equipment: Equipment) => void;
  onCancel: () => void;
}

const AddEquipmentForm: React.FC<AddEquipmentFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      model: "",
      manufacturer: "",
      type: "Próprio",
      minStock: 0,
    },
  });

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    const newEquipment: Equipment = {
      id: `equip-${Date.now()}`,
      name: data.name,
      model: data.model,
      manufacturer: data.manufacturer,
      status: "Disponível", // Default status
      type: data.type,
      initialQuantity: 0, // Default to 0
      minStock: data.minStock,
    };
    
    onSubmit(newEquipment);
    toast.success("Equipamento cadastrado com sucesso!");
    form.reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-semibold text-hdgreen-700 mb-6">
        Cadastro de Novo Ativo
      </h2>
      <p className="text-gray-600 mb-6">
        Preencha os dados para adicionar um novo equipamento ao sistema.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">
                  Nome do Equipamento *
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ex: Concentrador de Oxigênio"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Modelo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Everflo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manufacturer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Fabricante *
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Philips" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Tipo</FormLabel>
                  <FormControl>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-hdgreen-400"
                      {...field}
                    >
                      <option value="Próprio">Próprio</option>
                      <option value="Comodato">Comodato</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    Estoque Mínimo
                  </FormLabel>
                  <FormControl>
                    <Input type="number" min="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-hdgreen-500 text-hdgreen-600 hover:bg-hdgreen-50"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-hdgreen-500 hover:bg-hdgreen-600 text-white"
            >
              Cadastrar Equipamento
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEquipmentForm;
