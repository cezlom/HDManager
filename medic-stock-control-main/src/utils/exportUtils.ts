
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Equipment } from '@/types/equipment';

// Função para exportar para Excel
export const exportToExcel = (equipments: Equipment[], fileName: string = 'equipamentos') => {
  // Preparar os dados para o Excel
  const excelData = equipments.map(equip => ({
    'Nome': equip.name,
    'Modelo': equip.model,
    'Fabricante': equip.manufacturer,
    'Tipo': equip.type,
    'Estoque Atual': equip.initialQuantity,
    'Estoque Mínimo': equip.minStock
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Definir estilos para cabeçalho
  const headerStyle = {
    font: { bold: true, color: { rgb: "FFFFFF" } },
    fill: { fgColor: { rgb: "00B15F" } }, // Verde HD
    alignment: { horizontal: "center", vertical: "center" }
  };

  // Definir largura das colunas
  const columnsWidth = [
    { wch: 30 }, // Nome
    { wch: 20 }, // Modelo
    { wch: 20 }, // Fabricante
    { wch: 15 }, // Tipo
    { wch: 15 }, // Estoque Atual
    { wch: 15 }, // Estoque Mínimo
  ];
  
  worksheet['!cols'] = columnsWidth;

  // Aplicar estilos condicionais - destaque para estoque baixo e zero
  const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:F1');
  for (let row = range.s.r + 1; row <= range.e.r; row++) {
    const currentStock = excelData[row - 1]['Estoque Atual'];
    const minStock = excelData[row - 1]['Estoque Mínimo'];
    
    if (currentStock === 0) {
      // Estoque Zero - Vermelho
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
        if (!worksheet[cellRef]) worksheet[cellRef] = { t: 's', v: '' };
        worksheet[cellRef].s = { fill: { fgColor: { rgb: "FFCCCC" } } }; // Vermelho claro
      }
    } else if (currentStock < minStock) {
      // Estoque Baixo - Amarelo
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: row, c: col });
        if (!worksheet[cellRef]) worksheet[cellRef] = { t: 's', v: '' };
        worksheet[cellRef].s = { fill: { fgColor: { rgb: "FFFFCC" } } }; // Amarelo claro
      }
    }
  }

  // Criar o workbook e adicionar a planilha
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Estoque Atual');

  // Exportar o arquivo
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

// Função para exportar para PDF
export const exportToPDF = (equipments: Equipment[], fileName: string = 'equipamentos') => {
  // Criar um novo documento PDF
  const doc = new jsPDF();
  
  // Adicionar um título
  doc.setFontSize(16);
  doc.setTextColor(0, 177, 95); // Verde HD
  doc.text('HD EquipManager - Estoque Atual', 14, 15);
  
  // Adicionar a data do relatório
  doc.setFontSize(10);
  doc.setTextColor(100);
  const date = new Date().toLocaleDateString('pt-BR');
  doc.text(`Gerado em: ${date}`, 14, 22);
  
  // Preparar os dados para a tabela
  const tableData = equipments.map(equip => [
    equip.name,
    equip.model,
    equip.manufacturer,
    equip.type,
    equip.initialQuantity.toString(),
    equip.minStock.toString()
  ]);
  
  // Cores para destaque
  const lowStockColor = [255, 255, 204]; // Amarelo claro
  const zeroStockColor = [255, 204, 204]; // Vermelho claro
  
  // Configurar e gerar a tabela
  autoTable(doc, {
    head: [['Nome', 'Modelo', 'Fabricante', 'Tipo', 'Estoque Atual', 'Estoque Mínimo']],
    body: tableData,
    startY: 30,
    theme: 'grid',
    headStyles: {
      fillColor: [0, 177, 95], // Verde HD
      textColor: 255,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240]
    },
    margin: { top: 30 },
    styles: {
      overflow: 'linebreak',
      cellWidth: 'auto',
      fontSize: 8
    },
    columnStyles: {
      0: { cellWidth: 40 }, // Nome
      1: { cellWidth: 30 }, // Modelo
      2: { cellWidth: 30 }, // Fabricante
      3: { cellWidth: 25 }, // Tipo
      4: { cellWidth: 20 }, // Estoque Atual
      5: { cellWidth: 20 }  // Estoque Mínimo
    },
    // Aplicar cores condicionais com base no estoque
    didDrawCell: (data) => {
      if (data.section === 'body' && data.column.index === 4) {
        const currentStock = parseInt(data.cell.text as string || '0');
        const minStock = parseInt(tableData[data.row.index][5] || '0');
        
        if (currentStock === 0) {
          // Estoque Zero - Vermelho
          data.row.cells.forEach(cell => {
            doc.setFillColor(zeroStockColor[0], zeroStockColor[1], zeroStockColor[2]);
            doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
            doc.setTextColor(0);
            // Safely access text as string
            const text = typeof cell.text === 'string' ? cell.text : 
                          Array.isArray(cell.text) && cell.text.length > 0 ? String(cell.text[0]) : '';
            doc.text(text, cell.x + cell.width / 2, cell.y + cell.height / 2, { 
              align: 'center', 
              baseline: 'middle' 
            });
          });
        } else if (currentStock < minStock) {
          // Estoque Baixo - Amarelo
          data.row.cells.forEach(cell => {
            doc.setFillColor(lowStockColor[0], lowStockColor[1], lowStockColor[2]);
            doc.rect(cell.x, cell.y, cell.width, cell.height, 'F');
            doc.setTextColor(0);
            // Safely access text as string
            const text = typeof cell.text === 'string' ? cell.text : 
                          Array.isArray(cell.text) && cell.text.length > 0 ? String(cell.text[0]) : '';
            doc.text(text, cell.x + cell.width / 2, cell.y + cell.height / 2, { 
              align: 'center', 
              baseline: 'middle' 
            });
          });
        }
      }
    }
  });
  
  // Adicionar rodapé
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.getWidth() - 25, doc.internal.pageSize.getHeight() - 10);
    doc.text('© 2025 HD EquipManager - HomeDoctor', 14, doc.internal.pageSize.getHeight() - 10);
  }
  
  // Salvar o arquivo
  doc.save(`${fileName}.pdf`);
};
