/**
 * BreadcrumbコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - 現在のリソースへのパスを階層リンクで表示
 * - ナビゲーションの補助として使用
 * - ユーザーの現在位置を明確に示す
 * 
 * 主な仕様:
 * - 階層構造の表示
 * - カスタムセパレーター
 * - ドロップダウンメニュー統合
 * - レスポンシブ対応
 * - 省略表示機能
 * 
 * 制限事項:
 * - リンクコンポーネントとの統合が必要
 * - 階層データの管理が必要
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChevronDownIcon, 
  SlashIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  HomeIcon,
  FolderIcon,
  FileIcon,
} from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

/**
 * Breadcrumbコンポーネントのメタデータ
 */
const meta: Meta<typeof Breadcrumb> = {
  title: "Components/UI/Breadcrumb",
  component: Breadcrumb,
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
 * 基本的なBreadcrumbストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Basic Breadcrumb</CardTitle>
          <CardDescription>
            Simple navigation breadcrumb
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1">
                    <BreadcrumbEllipsis className="size-4" />
                    <span className="sr-only">Toggle menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Themes</DropdownMenuItem>
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/docs/components">Components</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>
    )
  },
}

/**
 * カスタムセパレーターBreadcrumbストーリー
 */
export const CustomSeparator: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Custom Separator</CardTitle>
          <CardDescription>
            Using custom separator icons
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <HomeIcon className="h-4 w-4" />
                    Home
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/components" className="flex items-center gap-1">
                    <FolderIcon className="h-4 w-4" />
                    Components
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1">
                  <FileIcon className="h-4 w-4" />
                  Breadcrumb
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ドロップダウンメニュー付きBreadcrumbストーリー
 */
export const WithDropdown: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>With Dropdown</CardTitle>
          <CardDescription>
            Breadcrumb with dropdown menu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                    Components
                    <ChevronDownIcon />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Documentation</DropdownMenuItem>
                    <DropdownMenuItem>Themes</DropdownMenuItem>
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                    <DropdownMenuItem>Examples</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 省略表示Breadcrumbストーリー
 */
export const Collapsed: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Collapsed Breadcrumb</CardTitle>
          <CardDescription>
            Using ellipsis for long paths
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/docs/components">Components</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ファイルシステム風Breadcrumbストーリー
 */
export const FileSystem: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>File System</CardTitle>
          <CardDescription>
            File path navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="flex items-center gap-1">
                    <HomeIcon className="h-4 w-4" />
                    Root
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/users" className="flex items-center gap-1">
                    <FolderIcon className="h-4 w-4" />
                    Users
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/users/john" className="flex items-center gap-1">
                    <FolderIcon className="h-4 w-4" />
                    john
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRightIcon className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="flex items-center gap-1">
                  <FileIcon className="h-4 w-4" />
                  profile.json
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>
    )
  },
}

/**
 * レスポンシブBreadcrumbストーリー
 */
export const Responsive: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const items = [
      { href: "#", label: "Home" },
      { href: "#", label: "Documentation" },
      { href: "#", label: "Building Your Application" },
      { href: "#", label: "Data Fetching" },
      { label: "Caching and Revalidating" },
    ]

    const ITEMS_TO_DISPLAY = 3

    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Responsive Breadcrumb</CardTitle>
          <CardDescription>
            Dropdown on desktop, drawer on mobile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={items[0].href ?? "/"}>{items[0].label}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              {items.length > ITEMS_TO_DISPLAY ? (
                <>
                  <BreadcrumbItem>
                    {isDesktop ? (
                      <DropdownMenu open={open} onOpenChange={setOpen}>
                        <DropdownMenuTrigger
                          className="flex items-center gap-1"
                          aria-label="Toggle menu"
                        >
                          <BreadcrumbEllipsis className="size-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          {items.slice(1, -2).map((item, index) => (
                            <DropdownMenuItem key={index}>
                              <Link href={item.href ? item.href : "#"}>
                                {item.label}
                              </Link>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Drawer open={open} onOpenChange={setOpen}>
                        <DrawerTrigger aria-label="Toggle Menu">
                          <BreadcrumbEllipsis className="h-4 w-4" />
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader className="text-left">
                            <DrawerTitle>Navigate to</DrawerTitle>
                            <DrawerDescription>
                              Select a page to navigate to.
                            </DrawerDescription>
                          </DrawerHeader>
                          <div className="grid gap-1 px-4">
                            {items.slice(1, -2).map((item, index) => (
                              <Link
                                key={index}
                                href={item.href ? item.href : "#"}
                                className="py-1 text-sm"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                          <DrawerFooter className="pt-4">
                            <DrawerClose asChild>
                              <Button variant="outline">Close</Button>
                            </DrawerClose>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    )}
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </>
              ) : null}
              {items.slice(-ITEMS_TO_DISPLAY + 1).map((item, index) => (
                <BreadcrumbItem key={index}>
                  {item.href ? (
                    <>
                      <BreadcrumbLink
                        asChild
                        className="max-w-20 truncate md:max-w-none"
                      >
                        <Link href={item.href}>{item.label}</Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                    </>
                  ) : (
                    <BreadcrumbPage className="max-w-20 truncate md:max-w-none">
                      {item.label}
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>
    )
  },
}

/**
 * シンプルBreadcrumbストーリー
 */
export const Simple: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Breadcrumb</CardTitle>
          <CardDescription>
            Basic navigation without dropdowns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/components">Components</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </CardContent>
      </Card>
    )
  },
} 