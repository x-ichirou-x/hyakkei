import type { Meta, StoryObj } from "@storybook/react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

const meta: Meta<typeof Table> = {
  title: "Components/UI/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const users = [
  {
    name: "田中太郎",
    email: "tanaka@example.com",
    role: "管理者",
    status: "アクティブ",
  },
  {
    name: "佐藤花子",
    email: "sato@example.com",
    role: "編集者",
    status: "アクティブ",
  },
  {
    name: "鈴木一郎",
    email: "suzuki@example.com",
    role: "閲覧者",
    status: "非アクティブ",
  },
  {
    name: "高橋美咲",
    email: "takahashi@example.com",
    role: "編集者",
    status: "アクティブ",
  },
]

const products = [
  {
    name: "ノートパソコン",
    category: "電子機器",
    price: "¥120,000",
    stock: "15",
  },
  {
    name: "ワイヤレスマウス",
    category: "アクセサリー",
    price: "¥3,500",
    stock: "42",
  },
  {
    name: "USBケーブル",
    category: "アクセサリー",
    price: "¥800",
    stock: "128",
  },
  {
    name: "モニター",
    category: "電子機器",
    price: "¥45,000",
    stock: "8",
  },
]

/**
 * 基本的なテーブル（公式サイトと同じ）
 */
export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,250.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

/**
 * ユーザー管理テーブル
 */
export const UserManagement: Story = {
  render: () => (
    <Table>
      <TableCaption>ユーザー一覧</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>名前</TableHead>
          <TableHead>メールアドレス</TableHead>
          <TableHead>役割</TableHead>
          <TableHead>ステータス</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.status === "アクティブ"
                    ? "bg-semantic-success/10 text-semantic-success"
                    : "bg-semantic-border/50 text-semantic-fg"
                }`}
              >
                {user.status}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

/**
 * 商品在庫テーブル
 */
export const ProductInventory: Story = {
  render: () => (
    <Table>
      <TableCaption>商品在庫状況</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>商品名</TableHead>
          <TableHead>カテゴリ</TableHead>
          <TableHead className="text-right">価格</TableHead>
          <TableHead className="text-right">在庫数</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell className="text-right">{product.price}</TableCell>
            <TableCell className="text-right">{product.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>合計商品数</TableCell>
          <TableCell className="text-right" colSpan={2}>
            {products.length}個
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

/**
 * シンプルなテーブル（キャプションなし）
 */
export const Simple: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>項目</TableHead>
          <TableHead>値</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">名前</TableCell>
          <TableCell>山田太郎</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">年齢</TableCell>
          <TableCell>25歳</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">職業</TableCell>
          <TableCell>エンジニア</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">所在地</TableCell>
          <TableCell>東京都</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

/**
 * 空のテーブル
 */
export const Empty: Story = {
  render: () => (
    <Table>
      <TableCaption>検索結果</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>名前</TableHead>
          <TableHead>メール</TableHead>
          <TableHead>ステータス</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={3} className="text-center text-muted-foreground">
            データが見つかりませんでした
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

/**
 * レスポンシブテーブル
 */
export const Responsive: Story = {
  render: () => (
    <div className="w-full overflow-auto">
      <Table>
        <TableCaption>レスポンシブ対応テーブル</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>名前</TableHead>
            <TableHead>メールアドレス</TableHead>
            <TableHead>電話番号</TableHead>
            <TableHead>住所</TableHead>
            <TableHead>登録日</TableHead>
            <TableHead>ステータス</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">001</TableCell>
            <TableCell>田中太郎</TableCell>
            <TableCell>tanaka@example.com</TableCell>
            <TableCell>090-1234-5678</TableCell>
            <TableCell>東京都渋谷区...</TableCell>
            <TableCell>2024-01-15</TableCell>
            <TableCell>アクティブ</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">002</TableCell>
            <TableCell>佐藤花子</TableCell>
            <TableCell>sato@example.com</TableCell>
            <TableCell>090-8765-4321</TableCell>
            <TableCell>大阪府大阪市...</TableCell>
            <TableCell>2024-01-20</TableCell>
            <TableCell>アクティブ</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
} 