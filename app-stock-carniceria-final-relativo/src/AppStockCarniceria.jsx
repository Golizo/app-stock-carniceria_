
import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "./components/ui/table";

export default function AppStockCarniceria() {
  const [unidad, setUnidad] = useState("cajas");
  const [inventario, setInventario] = useState([]);
  const [productos, setProductos] = useState([]);
  const [ordenCompra, setOrdenCompra] = useState([]);

  const convertirACajas = (kg, cajasMin) => {
    if (unidad === "kg") return kg;
    return Math.ceil(kg / (cajasMin || 20));
  };

  const handleArchivo = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").filter(Boolean);
      const headers = rows[0].split(",").map(h => h.trim());
      const data = rows.slice(1).map(row => {
        const values = row.split(",");
        return Object.fromEntries(headers.map((h, i) => [h, values[i]?.trim()]));
      });
      setInventario(data);
    };
    reader.readAsText(file);
  };

  const generarOrden = () => {
    const orden = productos.map(p => {
      const stockActual = inventario.find(i => i.codigo === p.codigo);
      const actual = parseFloat(stockActual?.stock || 0);
      const minimo = parseFloat(p.stockMinimoKg || 0);
      const cajasMin = parseFloat(p.cajasMin || 20);
      const faltanteKg = Math.max(minimo - actual, 0);
      const faltanteCajas = convertirACajas(faltanteKg, cajasMin);
      return {
        ...p,
        actual,
        faltanteKg: unidad === "kg" ? faltanteKg : faltanteCajas,
        unidad,
      };
    }).filter(p => p.faltanteKg > 0);
    setOrdenCompra(orden);
  };

  const cargarProductos = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split("\n").filter(Boolean);
      const headers = rows[0].split(",").map(h => h.trim());
      const data = rows.slice(1).map(row => {
        const values = row.split(",");
        return Object.fromEntries(headers.map((h, i) => [h, values[i]?.trim()]));
      });
      setProductos(data);
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Gestión de Inventario y Stock Mínimo</h1>

      <div className="flex gap-4 items-center">
        <label>Unidad:</label>
        <select value={unidad} onChange={e => setUnidad(e.target.value)} className="border p-1 rounded">
          <option value="cajas">Cajas</option>
          <option value="kg">Kilos</option>
        </select>
        <Input type="file" accept=".csv,.xlsx" onChange={handleArchivo} />
        <Input type="file" accept=".csv,.xlsx" onChange={cargarProductos} />
        <Button onClick={generarOrden}>Generar Orden de Compra</Button>
      </div>

      {ordenCompra.length > 0 && (
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead>Actual</TableHead>
                  <TableHead>Faltante</TableHead>
                  <TableHead>Unidad</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ordenCompra.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>{p.nombre}</TableCell>
                    <TableCell>{p.actual}</TableCell>
                    <TableCell>{p.faltanteKg}</TableCell>
                    <TableCell>{unidad}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
