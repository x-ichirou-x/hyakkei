/**
 * PaginationコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - ページナビゲーション用のページネーションコンポーネント
 * - 前のページ、次のページへのリンク
 * - ページ番号の表示とナビゲーション
 * 
 * 主な仕様:
 * - ページ番号の表示
 * - 前のページ/次のページボタン
 * - 省略記号（...）の表示
 * - アクティブページのハイライト
 * - レスポンシブ対応
 * 
 * 制限事項:
 * - Radix UIに依存
 * - Next.jsのLinkコンポーネントとの統合
 */

import type { Meta, StoryObj } from "@storybook/react"
import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

/**
 * Paginationコンポーネントのメタデータ
 */
const meta: Meta<typeof Pagination> = {
  title: "Components/UI/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なPaginationストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Basic Pagination</CardTitle>
          <CardDescription>
            shadcn/ui公式例のPagination
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    )
  },
}

/**
 * シンプルなPaginationストーリー
 */
export const Simple: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Simple Pagination</CardTitle>
          <CardDescription>
            基本的なページネーション
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 大きなページ数のPaginationストーリー
 */
export const LargePageCount: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Large Page Count</CardTitle>
          <CardDescription>
            大きなページ数でのページネーション
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">8</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">9</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  10
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">11</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">12</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">20</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 最初のページのPaginationストーリー
 */
export const FirstPage: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>First Page</CardTitle>
          <CardDescription>
            最初のページでのページネーション
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" className="pointer-events-none opacity-50" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    )
  },
}

/**
 * 最後のページのPaginationストーリー
 */
export const LastPage: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Last Page</CardTitle>
          <CardDescription>
            最後のページでのページネーション
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">8</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">9</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  10
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" className="pointer-events-none opacity-50" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    )
  },
}

/**
 * カスタムアイコンのPaginationストーリー
 */
export const CustomIcons: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Custom Icons</CardTitle>
          <CardDescription>
            カスタムアイコン付きのページネーション
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ArrowLeftIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ArrowRightIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    )
  },
}

/**
 * ページジャンプ機能付きPaginationストーリー
 */
export const WithPageJump: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>With Page Jump</CardTitle>
          <CardDescription>
            ページジャンプ機能付きのページネーション
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="flex items-center gap-2">
            <Label htmlFor="page-jump" className="text-sm">
              Go to page:
            </Label>
            <Input
              id="page-jump"
              type="number"
              min="1"
              max="10"
              className="w-20"
              placeholder="2"
            />
            <Button size="sm">Go</Button>
          </div>
        </CardContent>
      </Card>
    )
  },
}

/**
 * レスポンシブPaginationストーリー
 */
export const Responsive: Story = {
  render: () => {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Responsive Pagination</CardTitle>
          <CardDescription>
            レスポンシブ対応のページネーション
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem className="hidden md:block">
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden md:block">
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden lg:block">
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden lg:block">
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem className="hidden md:block">
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    )
  },
} 