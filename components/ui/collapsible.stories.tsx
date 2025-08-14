/**
 * CollapsibleコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - パネルを展開/折りたたみするインタラクティブコンポーネント
 * - コンテンツの表示/非表示を制御
 * - アニメーション付きの展開/折りたたみ
 * 
 * 主な仕様:
 * - トリガーボタンによる制御
 * - スムーズなアニメーション
 * - 状態管理（open/closed）
 * - カスタマイズ可能なトリガー
 * - アクセシビリティ対応
 * 
 * 制限事項:
 * - Radix UIに依存
 * - クライアントサイドでの状態管理が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ChevronsUpDownIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlusIcon,
  MinusIcon,
  EyeIcon,
  EyeOffIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  SettingsIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  StarIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  DownloadIcon,
  UploadIcon,
  EditIcon,
  TrashIcon,
  CopyIcon,
  LinkIcon,
  ExternalLinkIcon,
  InfoIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  HelpCircleIcon,
  SearchIcon,
  FilterIcon,
  SortAscIcon,
  SortDescIcon,
  GridIcon,
  ListIcon,
  ColumnsIcon,
  LayersIcon,
  DatabaseIcon,
  ServerIcon,
  CloudIcon,
  WifiIcon,
  BluetoothIcon,
  BatteryIcon,
  PowerIcon,
  LockIcon,
  UnlockIcon,
  ShieldIcon,
  KeyIcon,
  FingerprintIcon,
  UsersIcon,
  UserPlusIcon,
  UserMinusIcon,
  UserCheckIcon,
  UserXIcon,
  UserCogIcon,
  UserSearchIcon,
  UserCircleIcon,
  CircleIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleXIcon,
  SquareIcon,
  SquareCheckIcon,
  SquareXIcon,
  TriangleIcon,
  TriangleAlertIcon,
  HexagonIcon,
  OctagonIcon,
  DiamondIcon,
  ZapIcon,
  FlameIcon,
  DropletsIcon,
  SunIcon,
  MoonIcon,
  CloudRainIcon,
  CloudSnowIcon,
  CloudLightningIcon,
  WindIcon,
  UmbrellaIcon,
  SnowflakeIcon,
  ThermometerIcon,
  GaugeIcon,
  ActivityIcon,
  BarChartIcon,
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  DollarSignIcon,
  CreditCardIcon,
  ReceiptIcon,
  WalletIcon,
  PiggyBankIcon,
  CoinsIcon,
  BanknoteIcon,
  CalculatorIcon,
  PercentIcon,
  HashIcon,
  AtSignIcon,
} from "lucide-react"

/**
 * Collapsibleコンポーネントのメタデータ
 */
const meta: Meta<typeof Collapsible> = {
  title: "Components/UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = {
  render: (args?: any) => JSX.Element
  args?: Record<string, any>
  [key: string]: any
}

/**
 * 基本的なCollapsibleストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Basic Collapsible</CardTitle>
          <CardDescription>
            shadcn/ui公式例のCollapsible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="flex w-full max-w-[350px] flex-col gap-2"
          >
            <div className="flex items-center justify-between gap-4 px-4">
              <h4 className="text-sm font-semibold">
                @peduarte starred 3 repositories
              </h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <ChevronsUpDownIcon />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
            <div className="rounded-md border px-4 py-2 font-mono text-sm">
              @radix-ui/primitives
            </div>
            <CollapsibleContent className="flex flex-col gap-2">
              <div className="rounded-md border px-4 py-2 font-mono text-sm">
                @radix-ui/colors
              </div>
              <div className="rounded-md border px-4 py-2 font-mono text-sm">
                @stitches/react
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    )
  },
}

/**
 * シンプルなCollapsibleストーリー
 */
export const Simple: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Collapsible</CardTitle>
          <CardDescription>
            基本的な折りたたみコンポーネント
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between min-h-[48px]">
                <span className="flex-1 text-left">Can I use this in my project?</span>
                <ChevronDownIcon className={`h-4 w-4 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 rounded-md border p-4 w-full">
              <p className="text-sm text-muted-foreground">
                Yes. Free to use for personal and commercial projects. No attribution required.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    )
  },
}

/**
 * FAQ形式のCollapsibleストーリー
 */
export const FAQ: Story = {
  render: () => {
    const [openItems, setOpenItems] = React.useState<number[]>([])

    const toggleItem = (index: number) => {
      setOpenItems(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      )
    }

    const faqItems = [
      {
        question: "What is shadcn/ui?",
        answer: "shadcn/ui is a collection of reusable components built using Radix UI and Tailwind CSS. It provides a set of accessible, customizable, and beautiful components for building modern web applications."
      },
      {
        question: "Is it free to use?",
        answer: "Yes, shadcn/ui is completely free to use for both personal and commercial projects. No attribution is required."
      },
      {
        question: "How do I install components?",
        answer: "You can install components using the CLI command: npx shadcn@latest add [component-name]. This will add the component to your project with all necessary dependencies."
      },
      {
        question: "Can I customize the styling?",
        answer: "Absolutely! All components are built with Tailwind CSS and can be easily customized by modifying the component files or extending the Tailwind classes."
      }
    ]

    return (
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>FAQ Collapsible</CardTitle>
          <CardDescription>
            FAQ形式の折りたたみコンポーネント
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 w-full">
          {faqItems.map((item, index) => (
            <Collapsible 
              key={index}
              open={openItems.includes(index)}
              onOpenChange={() => toggleItem(index)}
              className="w-full"
            >
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-4 h-auto min-h-[60px]"
                >
                  <span className="text-left font-medium flex-1">{item.question}</span>
                  <ChevronDownIcon 
                    className={`h-4 w-4 transition-transform flex-shrink-0 ${openItems.includes(index) ? "rotate-180" : ""}`} 
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-4 pb-4 w-full">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.answer}
                </p>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CardContent>
      </Card>
    )
  },
}

/**
 * ファイルエクスプローラー風Collapsibleストーリー
 */
export const FileExplorer: Story = {
  render: () => {
    const [openFolders, setOpenFolders] = React.useState<string[]>([])

    const toggleFolder = (folderName: string) => {
      setOpenFolders(prev => 
        prev.includes(folderName) 
          ? prev.filter(f => f !== folderName)
          : [...prev, folderName]
      )
    }

    const fileStructure = [
      {
        name: "src",
        type: "folder",
        children: [
          { name: "components", type: "folder", children: [
            { name: "ui", type: "folder", children: [
              { name: "button.tsx", type: "file" },
              { name: "input.tsx", type: "file" },
              { name: "card.tsx", type: "file" }
            ]},
            { name: "layout", type: "folder", children: [
              { name: "header.tsx", type: "file" },
              { name: "footer.tsx", type: "file" }
            ]}
          ]},
          { name: "pages", type: "folder", children: [
            { name: "index.tsx", type: "file" },
            { name: "about.tsx", type: "file" }
          ]},
          { name: "utils", type: "folder", children: [
            { name: "helpers.ts", type: "file" }
          ]}
        ]
      },
      {
        name: "public",
        type: "folder",
        children: [
          { name: "images", type: "folder", children: [
            { name: "logo.png", type: "file" },
            { name: "icon.svg", type: "file" }
          ]}
        ]
      }
    ]

    const renderFileItem = (item: any, path: string = "") => {
      const fullPath = path ? `${path}/${item.name}` : item.name
      const isOpen = openFolders.includes(fullPath)

      if (item.type === "folder") {
        return (
          <div key={fullPath} className="ml-4">
            <Collapsible open={isOpen} onOpenChange={() => toggleFolder(fullPath)} className="w-full">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start h-8 px-2"
                >
                  {isOpen ? (
                    <FolderOpenIcon className="h-4 w-4 mr-2 text-blue-500" />
                  ) : (
                    <FolderIcon className="h-4 w-4 mr-2 text-blue-500" />
                  )}
                  <span className="text-sm">{item.name}</span>
                  <ChevronRightIcon 
                    className={`h-3 w-3 ml-auto transition-transform ${isOpen ? "rotate-90" : ""}`} 
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="ml-4 w-full">
                {item.children?.map((child: any) => renderFileItem(child, fullPath))}
              </CollapsibleContent>
            </Collapsible>
          </div>
        )
      } else {
        return (
          <div key={fullPath} className="ml-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start h-8 px-2"
            >
              <FileIcon className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{item.name}</span>
            </Button>
          </div>
        )
      }
    }

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>File Explorer</CardTitle>
          <CardDescription>
            ファイルエクスプローラー風の折りたたみコンポーネント
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {fileStructure.map(item => renderFileItem(item))}
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 設定パネル風Collapsibleストーリー
 */
export const SettingsPanel: Story = {
  render: () => {
    const [openSections, setOpenSections] = React.useState<string[]>([])

    const toggleSection = (sectionName: string) => {
      setOpenSections(prev => 
        prev.includes(sectionName) 
          ? prev.filter(s => s !== sectionName)
          : [...prev, sectionName]
      )
    }

    const settingsSections = [
      {
        name: "Profile",
        icon: UserIcon,
        items: [
          { label: "Display Name", value: "John Doe" },
          { label: "Email", value: "john@example.com" },
          { label: "Phone", value: "+1 (555) 123-4567" }
        ]
      },
      {
        name: "Preferences",
        icon: SettingsIcon,
        items: [
          { label: "Theme", value: "Dark" },
          { label: "Language", value: "English" },
          { label: "Timezone", value: "UTC-5" }
        ]
      },
      {
        name: "Security",
        icon: ShieldIcon,
        items: [
          { label: "Two-Factor Auth", value: "Enabled" },
          { label: "Last Login", value: "2 hours ago" },
          { label: "Active Sessions", value: "3 devices" }
        ]
      }
    ]

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Settings Panel</CardTitle>
          <CardDescription>
            設定パネル風の折りたたみコンポーネント
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {settingsSections.map((section) => {
            const IconComponent = section.icon
            const isOpen = openSections.includes(section.name)

            return (
              <Collapsible 
                key={section.name}
                open={isOpen}
                onOpenChange={() => toggleSection(section.name)}
                className="w-full"
              >
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between p-3 h-auto"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4" />
                      <span className="font-medium">{section.name}</span>
                    </div>
                    <ChevronDownIcon 
                      className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} 
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-3 pb-3 w-full">
                  <div className="space-y-2">
                    {section.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                        <span className="text-sm font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </CardContent>
      </Card>
    )
  },
}

/**
 * カスタムアイコン付きCollapsibleストーリー
 */
export const CustomIcons: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Custom Icons</CardTitle>
          <CardDescription>
            カスタムアイコン付きの折りたたみコンポーネント
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between min-h-[48px]">
                <div className="flex items-center gap-2 flex-1">
                  {isOpen ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
                  <span>Show Details</span>
                </div>
                <div className="flex-shrink-0">
                  {isOpen ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 rounded-md border p-4 w-full">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  This is some additional information that can be shown or hidden.
                </p>
                <div className="flex gap-2">
                  <Badge variant="secondary">Info</Badge>
                  <Badge variant="outline">Details</Badge>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>
    )
  },
} 