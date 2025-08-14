/**
 * Navigation MenuコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - ウェブサイトのナビゲーション用のリンクコレクション
 * - ドロップダウンメニュー付きのナビゲーション
 * - レスポンシブ対応のナビゲーション構造
 * 
 * 主な仕様:
 * - ホバー/クリックでドロップダウン表示
 * - グリッドレイアウトのコンテンツ
 * - アイコン付きメニューアイテム
 * - アクセシビリティ対応
 * 
 * 制限事項:
 * - Radix UIに依存
 * - Next.jsのLinkコンポーネントとの統合
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  HomeIcon,
  FileTextIcon,
  BookOpenIcon,
  SettingsIcon,
  UserIcon,
  ShoppingCartIcon,
  HeartIcon,
  StarIcon,
  SearchIcon,
  MailIcon,
  PhoneIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  HelpCircleIcon,
  InfoIcon,
  AlertCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  MinusIcon,
  EditIcon,
  TrashIcon,
  DownloadIcon,
  UploadIcon,
  ShareIcon,
  CopyIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  MenuIcon,
  GridIcon,
  ListIcon,
  ImageIcon,
  VideoIcon,
  MusicIcon,
  ArchiveIcon,
  FolderIcon,
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
 * Navigation Menuコンポーネントのメタデータ
 */
const meta: Meta<typeof NavigationMenu> = {
  title: "Components/UI/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なNavigation Menuストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    const components: { title: string; href: string; description: string }[] = [
      {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
          "A modal dialog that interrupts the user with important content and expects a response.",
      },
      {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
          "For sighted users to preview content available behind a link.",
      },
      {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
          "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      },
      {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
      },
      {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
          "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
      },
      {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
          "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
      },
    ]

    return (
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle>Basic Navigation Menu</CardTitle>
          <CardDescription>
            shadcn/ui公式例のNavigation Menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Beautifully designed components built with Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem href="/docs/primitives/typography" title="Typography">
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/docs">Docs</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>List</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Components</div>
                          <div className="text-muted-foreground">
                            Browse all components in the library.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Documentation</div>
                          <div className="text-muted-foreground">
                            Learn how to use the library.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">
                          <div className="font-medium">Blog</div>
                          <div className="text-muted-foreground">
                            Read our latest blog posts.
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#">Components</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">Documentation</Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#">Blocks</Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          <CircleHelpIcon />
                          Backlog
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          <CircleIcon />
                          To Do
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink asChild>
                        <Link href="#" className="flex-row items-center gap-2">
                          <CircleCheckIcon />
                          Done
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * シンプルなNavigation Menuストーリー
 */
export const Simple: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Simple Navigation Menu</CardTitle>
          <CardDescription>
            基本的なナビゲーションメニュー
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/services">Services</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ドロップダウン付きNavigation Menuストーリー
 */
export const WithDropdown: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Navigation Menu with Dropdown</CardTitle>
          <CardDescription>
            ドロップダウンメニュー付きのナビゲーション
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/products/software" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Software</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Enterprise software solutions for your business needs.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/products/hardware" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Hardware</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            High-quality hardware components and devices.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/products/cloud" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Cloud Services</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Scalable cloud infrastructure and services.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/products/consulting" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Consulting</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Expert consulting services for digital transformation.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/services/development" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <FileTextIcon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Development</div>
                            <div className="text-sm text-muted-foreground">Custom software development</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/services/design" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <ImageIcon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Design</div>
                            <div className="text-sm text-muted-foreground">UI/UX design services</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/services/support" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <HelpCircleIcon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Support</div>
                            <div className="text-sm text-muted-foreground">24/7 technical support</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/about">About</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * アイコン付きNavigation Menuストーリー
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Navigation Menu with Icons</CardTitle>
          <CardDescription>
            アイコン付きのナビゲーションメニュー
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  Home
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <BarChart3Icon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Dashboard</div>
                            <div className="text-sm text-muted-foreground">View your analytics</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/profile" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <UserIcon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Profile</div>
                            <div className="text-sm text-muted-foreground">Manage your account</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/settings" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <SettingsIcon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Settings</div>
                            <div className="text-sm text-muted-foreground">Configure preferences</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-2">
                  <ShoppingCartIcon className="h-4 w-4" />
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:grid-cols-2">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/shop/electronics" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <PhoneIcon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Electronics</div>
                            <div className="text-sm text-muted-foreground">Phones, laptops, tablets</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/shop/clothing" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <UserIcon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Clothing</div>
                            <div className="text-sm text-muted-foreground">Fashion and accessories</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/shop/books" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <BookOpenIcon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Books</div>
                            <div className="text-sm text-muted-foreground">Books and publications</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/shop/sports" className="flex items-center gap-2 p-3 rounded-md hover:bg-accent">
                          <ActivityIcon className="h-4 w-4" />
                          <div>
                            <div className="font-medium">Sports</div>
                            <div className="text-sm text-muted-foreground">Sports equipment</div>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/help" className="flex items-center gap-2">
                    <HelpCircleIcon className="h-4 w-4" />
                    Help
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * レスポンシブNavigation Menuストーリー
 */
export const Responsive: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <CardTitle>Responsive Navigation Menu</CardTitle>
          <CardDescription>
            レスポンシブ対応のナビゲーションメニュー
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/company"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            Our Company
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            Building the future with innovative technology solutions.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/company/about" title="About Us">
                      Learn about our mission, vision, and values.
                    </ListItem>
                    <ListItem href="/company/team" title="Our Team">
                      Meet the talented people behind our success.
                    </ListItem>
                    <ListItem href="/company/careers" title="Careers">
                      Join our team and grow with us.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/solutions/enterprise" title="Enterprise">
                      Comprehensive solutions for large organizations.
                    </ListItem>
                    <ListItem href="/solutions/small-business" title="Small Business">
                      Tailored solutions for growing businesses.
                    </ListItem>
                    <ListItem href="/solutions/startup" title="Startup">
                      Accelerate your startup with our tools.
                    </ListItem>
                    <ListItem href="/solutions/education" title="Education">
                      Transform education with technology.
                    </ListItem>
                    <ListItem href="/solutions/healthcare" title="Healthcare">
                      Improve patient care with digital solutions.
                    </ListItem>
                    <ListItem href="/solutions/finance" title="Finance">
                      Secure and scalable financial technology.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/blog">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/contact">Contact</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ListItemコンポーネント（公式例と同じ）
 */
function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
} 