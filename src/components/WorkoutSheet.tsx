import React, { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { v4 as uuidv4 } from "uuid";
import { WorkoutSet } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Definir columnas con ayuda de columnHelper
const columnHelper = createColumnHelper<WorkoutSet>();

export default function WorkoutSheet() {
  const [data, setData] = useLocalStorage<WorkoutSet[]>("workout-sets", []);

  // Tabla react-table
  const columns = [
    columnHelper.accessor("exercise", {
      header: "Ejercicio",
      cell: (info) => (
        <input
          type="text"
          value={info.getValue()}
          onChange={(e) => updateCell(info.row.index, "exercise", e.target.value)}
          className="border p-1 w-full"
        />
      ),
    }),
    columnHelper.accessor("targetWeight", {
      header: "Peso objetivo",
      cell: (info) => (
        <input
          type="number"
          value={info.getValue()}
          onChange={(e) =>
            updateCell(info.row.index, "targetWeight", Number(e.target.value))
          }
          className="border p-1 w-full"
        />
      ),
    }),
    columnHelper.accessor("actualReps", {
      header: "Reps reales",
      cell: (info) => (
        <input
          type="number"
          value={info.getValue()}
          onChange={(e) =>
            updateCell(info.row.index, "actualReps", Number(e.target.value))
          }
          className="border p-1 w-full"
        />
      ),
    }),
    columnHelper.accessor("actualWeight", {
      header: "Peso real",
      cell: (info) => (
        <input
          type="number"
          value={info.getValue()}
          onChange={(e) =>
            updateCell(info.row.index, "actualWeight", Number(e.target.value))
          }
          className="border p-1 w-full"
        />
      ),
    }),
    columnHelper.accessor("timestamp", {
      header: "Fecha",
      cell: (info) => <span>{new Date(info.getValue()).toLocaleString()}</span>,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  function updateCell(rowIndex: number, key: keyof WorkoutSet, value: any) {
    setData((old) => {
      const newData = [...old];
      newData[rowIndex] = { ...newData[rowIndex], [key]: value };
      return newData;
    });
  }

  function addSet() {
    const newSet: WorkoutSet = {
      id: uuidv4(),
      exercise: "",
      targetWeight: 0,
      actualReps: 0,
      actualWeight: 0,
      timestamp: new Date().toISOString(),
    };
    setData((old) => [...old, newSet]);
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Hoja de Rutinas</h2>
      <button
        onClick={addSet}
        className="bg-blue-500 text-white px-3 py-1 rounded mb-4"
      >
        + Agregar Set
      </button>

      <table className="table-auto border-collapse border w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border p-2">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
