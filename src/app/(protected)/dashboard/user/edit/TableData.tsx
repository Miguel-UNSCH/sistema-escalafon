"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IPersonal } from "@/interfaces";

export const columns: ColumnDef<IPersonal>[] = [
  {
    accessorKey: "dni",
    header: "DNI",
    cell: ({ row }) => <div>{row.getValue("dni")}</div>,
  },
  {
    accessorKey: "user.nombres",
    header: "Nombres",
    cell: ({ row }) => <div>{row.original.user.nombres}</div>,
  },
  {
    accessorKey: "user.apellidos",
    header: "Apellidos",
    cell: ({ row }) => <div>{row.original.user.apellidos}</div>,
  },
  {
    accessorKey: "user.email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.original.user.email}</div>,
  },
  {
    accessorKey: "cargo.nombre",
    header: "Cargo",
    cell: ({ row }) => <div>{row.original.cargo.nombre}</div>,
  },
  {
    accessorKey: "dependencia.nombre",
    header: "Dependencia",
    cell: ({ row }) => <div>{row.original.dependencia.nombre}</div>,
  },
  {
    accessorKey: "situacionLaboral",
    header: "Situación Laboral",
    cell: ({ row }) => <div>{row.getValue("situacionLaboral")}</div>,
  },
  {
    accessorKey: "nAutogenerado",
    header: "N° Autogenerado",
    cell: ({ row }) => <div>{row.getValue("nAutogenerado")}</div>,
  },
  {
    accessorKey: "celular",
    header: "Celular",
    cell: ({ row }) => <div>{row.getValue("celular")}</div>,
  },
  {
    accessorKey: "regimenPensionario",
    header: "Régimen Pensionario",
    cell: ({ row }) => <div>{row.getValue("regimenPensionario")}</div>,
  },
];

const campos = {
  dni: "dni",
  user_nombres: "nombres",
  user_apellidos: "apellidos",
  user_email: "email",
  cargo_nombre: "cargo",
  dependencia_nombre: "dependencia",
  situacionLaboral: "situacion laboral",
  nAutogenerado: "n° autogenerado",
  celular: "celular",
  regimenPensionario: "regimen pensionario",
};

export const TableData = ({ data }: TableDataProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    situacionLaboral: false,
    nAutogenerado: false,
    celular: false,
    regimenPensionario: false,
  });
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    globalFilterFn: (row, columnId, filterValue) => {
      const dni = row.original.dni.toLowerCase();
      const nombres = row.original.user.nombres.toLowerCase();
      const apellidos = row.original.user.apellidos.toLowerCase();
      return dni.includes(filterValue.toLowerCase()) || nombres.includes(filterValue.toLowerCase()) || apellidos.includes(filterValue.toLowerCase());
    },
  });
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por DNI, nombres o apellidos"
          value={globalFilter}
          onChange={(event) => {
            setGlobalFilter(event.target.value);
            table.setGlobalFilter(event.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Campos <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {campos[`${column.id}`]}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sin resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end items-center space-x-2 py-4">
        <div className="flex-1 text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de {table.getFilteredRowModel().rows.length} filas(s) seleccionadas.
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            Anterior
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
};

interface TableDataProps {
  data: IPersonal[];
}
