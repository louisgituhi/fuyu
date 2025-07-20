import * as React from "react"
import { 
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
 } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "./ui/dropdown-menu"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Table, TableCell, TableHeader, TableRow, TableBody, TableHead } from "./ui/table"
import { useQuery } from "@tanstack/react-query"
import ExpenseType from "./ExpenseType"

async function fetchExpenses() {
    const res = await fetch("/api/expenses")
    if (!res.ok) 
        throw new Error('Failed to fetch expenses')
        return res.json()
}

export type Transactions = {
  id: number
  budget_id: number
  expenses_type: string
  expenses_category: string
  amount: string
  transaction_cost: string
  created_at: string
}

export const columns: ColumnDef<Transactions>[] = [
    {
        accessorKey: 'created_at',
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Date
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"))
            const day = date.getDate()
            const month = date.toLocaleString("default", { month: "short" })
            const year = date.getFullYear().toString().slice(-2)

            const getOrdinalSuffix = (day: number) => {
                if (day > 3 && day < 21) return "th"
                switch (day % 10) {
                    case 1:
                        return "st"
                    case 2:
                        return "nd"
                    case 3:
                        return "rd"
                    default:
                        return "th"
                }
            }

            return <div className="text-blue-500 font-medium">{`${ day }${ getOrdinalSuffix(day)} ${ month } ${ year }`}</div>
        },
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "desc")}>
                    Amount (ksh) 
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = Number.parseFloat(row.getValue("amount"))
            return <div className=" font-inconsolata">
                { amount }
            </div>
        },
    },
    {
        accessorKey: "transaction_cost",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Trx cost (ksh)
                    <ArrowUpDown className="ml-2 size-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const cost = Number.parseFloat(row.getValue("transaction_cost"))

            return <div className="text-muted-foreground font-inconsolata">{cost}</div>
        }
    },
    {
        accessorKey: "expenses_category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.getValue("expenses_category") as string
            const getCategoryStyle = (cat: string) => {
                switch (cat.toLowerCase()) {
                case "food":
                    return "bg-green-100 text-green-700"
                case "transport":
                    return "bg-orange-100 text-orange-700"
                case "lending":
                    return "bg-blue-100 text-blue-700"
                case  "healthcare":
                    return "bg-pink-100 text-pink-700"
                case "utilities":
                    return "bg-purple-100 text-purple-700"
                case "airtime":
                    return "bg-yellow-100 text-yellow-700"
                case "groceries":
                    return "bg-red-100 text-red-700"
                case "savings":
                    return "bg-teal-100 text-teal-700"
                case "grooming":
                    return "bg-pink-100 text-pink-700"
                default:
                    return "bg-gray-100 text-gray-700"
                }
            }

            return (
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryStyle(category)}`}>{category}</span>
            )
        },
    },
    {
        accessorKey: "expenses_type",
        header: "Expense Type",
        cell: ({ row }) => {
            const type = row.getValue("expenses_type") as string
            const colorClass = type === "Need" ? "bg-green-400" : type === "Want" ? "bg-purple-400" : "bg-orange-300"

            return (
                <div className="flex items-center gap-2">
                    <div className={`size-2 rounded-full ${ colorClass }`} />
                    <span className="capitalize text-sm">{type}</span>
                </div>
            )
        },
    },
    {
        id: "actions",
        enableHiding: true,
        cell: ({ row }) => {
            const transaction = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="size-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="size-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction.id.toString())}>
                            Copy transaction Id
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit transaction</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete transaction</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

export default function TransactionsTable() {
    const { data = [], isLoading } = useQuery({
        queryKey: ['expenses'],
        queryFn: fetchExpenses
    })
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

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
        state: {
        sorting,
        columnFilters,
        columnVisibility,
        },
    })

    return (
        <div className="w-full p-6">
            <ExpenseType />
            <div className="mb-6">
                <h1 className="text-lg font-bold">Transactions</h1>
                <p className="text-muted-foreground text-sm">Manage and view your transaction history</p>
            </div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter category..."
                    value={(table.getColumn("expenses_category")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("expenses_category")?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto bg-transparent">
                        Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                            return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className="capitalize"
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                            >
                                {column.id}
                            </DropdownMenuCheckboxItem>
                            )
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="border">
                <Table className="border-collapse">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id} className="border-b">
                            {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id} className="border-r last:border-r-0 py-2 px-4">
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            )
                            })}
                        </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="border-b">
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id} className="border-r last:border-r-0 py-2 px-4">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            </TableRow>
                        ))
                        ) : (
                        <TableRow className="border-b">
                            <TableCell colSpan={columns.length} className="h-12 text-center border-r last:border-r-0 py-2 px-4">
                            No results.
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredRowModel().rows.length} total row(s).
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}