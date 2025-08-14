import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DataTable } from "./data-table"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const meta: Meta<typeof DataTable> = {
  title: "Components/UI/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    searchKey: {
      control: "text",
      description: "Column key to enable search functionality",
    },
    searchPlaceholder: {
      control: "text",
      description: "Placeholder text for search input",
    },
    showColumnToggle: {
      control: "boolean",
      description: "Whether to show column visibility toggle",
    },
    showPagination: {
      control: "boolean",
      description: "Whether to show pagination controls",
    },
  },
}

export default meta
type Story = {
  render: (args?: any) => JSX.Element
  args?: Record<string, any>
  [key: string]: any
}

// サンプルデータ型定義
type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

type User = {
  id: string
  name: string
  email: string
  role: string
  status: "active" | "inactive"
}

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

// サンプルデータ
const paymentData: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
]

const userData: User[] = [
  {
    id: "1",
    name: "田中太郎",
    email: "tanaka@example.com",
    role: "管理者",
    status: "active",
  },
  {
    id: "2",
    name: "佐藤花子",
    email: "sato@example.com",
    role: "編集者",
    status: "active",
  },
  {
    id: "3",
    name: "鈴木一郎",
    email: "suzuki@example.com",
    role: "閲覧者",
    status: "inactive",
  },
  {
    id: "4",
    name: "高橋美咲",
    email: "takahashi@example.com",
    role: "編集者",
    status: "active",
  },
]

const productData: Product[] = [
  {
    id: "1",
    name: "ノートパソコン",
    category: "電子機器",
    price: 120000,
    stock: 15,
  },
  {
    id: "2",
    name: "ワイヤレスマウス",
    category: "アクセサリー",
    price: 3500,
    stock: 42,
  },
  {
    id: "3",
    name: "USBケーブル",
    category: "アクセサリー",
    price: 800,
    stock: 128,
  },
  {
    id: "4",
    name: "モニター",
    category: "電子機器",
    price: 45000,
    stock: 8,
  },
]

// 支払いデータのカラム定義（公式サイトと同じ）
const paymentColumns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

// ユーザーデータのカラム定義
const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "名前",
  },
  {
    accessorKey: "email",
    header: "メールアドレス",
  },
  {
    accessorKey: "role",
    header: "役割",
  },
  {
    accessorKey: "status",
    header: "ステータス",
    cell: ({ row }) => (
      <div className={`capitalize ${
        row.getValue("status") === "active" 
          ? "text-semantic-success" 
          : "text-semantic-fg-subtle"
      }`}>
        {row.getValue("status") === "active" ? "アクティブ" : "非アクティブ"}
      </div>
    ),
  },
]

// 商品データのカラム定義
const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "商品名",
  },
  {
    accessorKey: "category",
    header: "カテゴリ",
  },
  {
    accessorKey: "price",
    header: "価格",
    cell: ({ row }) => {
      const price = row.getValue("price") as number
      return <div className="text-right">¥{price.toLocaleString()}</div>
    },
  },
  {
    accessorKey: "stock",
    header: "在庫数",
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number
      return (
        <div className={`text-right ${
          stock < 10 ? "text-semantic-danger" : "text-semantic-success"
        }`}>
          {stock}
        </div>
      )
    },
  },
]

/**
 * 基本的なData Table（公式サイトと同じ）
 */
export const Default: Story = {
  render: () => (
    <DataTable
      columns={paymentColumns}
      data={paymentData}
      searchKey="email"
      searchPlaceholder="Filter emails..."
    />
  ),
}

/**
 * ユーザー管理テーブル
 */
export const UserManagement: Story = {
  render: () => (
    <DataTable
      columns={userColumns}
      data={userData}
      searchKey="name"
      searchPlaceholder="ユーザー名で検索..."
    />
  ),
}

/**
 * 商品在庫テーブル
 */
export const ProductInventory: Story = {
  render: () => (
    <DataTable
      columns={productColumns}
      data={productData}
      searchKey="name"
      searchPlaceholder="商品名で検索..."
    />
  ),
}

/**
 * 検索機能なしのテーブル
 */
export const WithoutSearch: Story = {
  render: () => (
    <DataTable
      columns={userColumns}
      data={userData}
      showColumnToggle={false}
    />
  ),
}

/**
 * ページネーションなしのテーブル
 */
export const WithoutPagination: Story = {
  render: () => (
    <DataTable
      columns={productColumns}
      data={productData}
      showPagination={false}
    />
  ),
}

/**
 * 最小限のテーブル
 */
export const Minimal: Story = {
  render: () => (
    <DataTable
      columns={userColumns}
      data={userData}
      showColumnToggle={false}
      showPagination={false}
    />
  ),
} 