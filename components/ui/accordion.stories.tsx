/**
 * AccordionコンポーネントのStorybookストーリー
 * 
 * 概要:
 * - 垂直に積み重ねられたインタラクティブな見出しのセット
 * - 各見出しがクリックされると、対応するコンテンツセクションが表示される
 * - アクセシビリティに配慮された設計（WAI-ARIA準拠）
 * 
 * 主な仕様:
 * - type: "single" | "multiple" - アコーディオンのタイプ
 * - collapsible: boolean - すべてのアイテムを閉じることができるかどうか
 * - defaultValue: string | string[] - デフォルトで開いているアイテム
 * - value: string - 各アイテムの一意の値
 * 
 * 制限事項:
 * - 各AccordionItemには一意のvalueが必要
 * - type="single"の場合、一度に1つのアイテムのみ開くことができる
 */

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

/**
 * Accordionコンポーネントのメタデータ
 */
const meta: Meta<typeof Accordion> = {
  title: "Components/UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      description: "アコーディオンのタイプ",
      options: ["single", "multiple"],
    },
    collapsible: {
      control: "boolean",
      description: "すべてのアイテムを閉じることができるかどうか",
    },
    defaultValue: {
      control: "text",
      description: "デフォルトで開いているアイテムの値",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * 基本的なアコーディオンストーリー（shadcn/ui公式例）
 */
export const Default: Story = {
  render: () => {
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Product Information</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Our flagship product combines cutting-edge technology with sleek
              design. Built with premium materials, it offers unparalleled
              performance and reliability.
            </p>
            <p>
              Key features include advanced processing capabilities, and an
              intuitive user interface designed for both beginners and experts.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Shipping Details</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We offer worldwide shipping through trusted courier partners.
              Standard delivery takes 3-5 business days, while express shipping
              ensures delivery within 1-2 business days.
            </p>
            <p>
              All orders are carefully packaged and fully insured. Track your
              shipment in real-time through our dedicated tracking portal.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Return Policy</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              We stand behind our products with a comprehensive 30-day return
              policy. If you&apos;re not completely satisfied, simply return the
              item in its original condition.
            </p>
            <p>
              Our hassle-free return process includes free return shipping and
              full refunds processed within 48 hours of receiving the returned
              item.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
}

/**
 * 複数選択可能なアコーディオンストーリー
 */
export const Multiple: Story = {
  render: () => {
    return (
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>よくある質問</AccordionTrigger>
          <AccordionContent>
            これは複数選択可能なアコーディオンの例です。複数のアイテムを同時に開くことができます。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>技術仕様</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc list-inside space-y-2">
              <li>React 18対応</li>
              <li>TypeScript完全サポート</li>
              <li>アクセシビリティ準拠</li>
              <li>カスタマイズ可能なスタイル</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>サポート情報</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>サポートチームへの連絡方法：</p>
              <p>📧 Email: support@example.com</p>
              <p>📞 Phone: 1-800-123-4567</p>
              <p>💬 Chat: 24/7 オンラインサポート</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
}

/**
 * 非折りたたみ可能なアコーディオンストーリー
 */
export const NonCollapsible: Story = {
  render: () => {
    return (
      <Accordion type="single" className="w-full" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>セキュリティ設定</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <h4 className="font-semibold">パスワードポリシー</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>最低8文字以上</li>
                <li>大文字・小文字・数字を含む</li>
                <li>特殊文字を含む</li>
                <li>90日ごとに更新</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>プライバシー設定</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <h4 className="font-semibold">データ共有設定</h4>
              <p className="text-sm text-muted-foreground">
                お客様のプライバシーを保護するため、データの使用と共有について透明性を保っています。
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
}

/**
 * カスタムスタイルのアコーディオンストーリー
 */
export const CustomStyle: Story = {
  render: () => {
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full border-2 border-semantic-accent/30 rounded-lg"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="border-b border-semantic-accent/30">
          <AccordionTrigger className="hover:bg-semantic-border/20 px-4">
            <span className="text-semantic-accent font-semibold">カスタムスタイル</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2 bg-semantic-bg">
            <p className="text-semantic-fg">
              このアコーディオンはカスタムスタイルが適用されています。
              青いボーダーと背景色を使用しています。
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b border-semantic-accent/30">
          <AccordionTrigger className="hover:bg-semantic-border/20 px-4">
            <span className="text-semantic-accent font-semibold">アイコン付き</span>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2 bg-semantic-bg">
            <div className="flex items-center space-x-2">
              <span>✅</span>
              <span>カスタムアイコンも追加できます</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
}

/**
 * 動的コンテンツのアコーディオンストーリー
 */
export const DynamicContent: Story = {
  render: () => {
    const [activeItems, setActiveItems] = useState<string[]>([])

    const items = [
      {
        id: "item-1",
        title: "動的コンテンツ 1",
        content: `このアイテムは ${new Date().toLocaleTimeString()} に更新されました。`,
      },
      {
        id: "item-2",
        title: "動的コンテンツ 2",
        content: `アクティブなアイテム数: ${activeItems.length}`,
      },
      {
        id: "item-3",
        title: "動的コンテンツ 3",
        content: "リアルタイムで更新されるコンテンツの例です。",
      },
    ]

    return (
      <div className="space-y-4">
        <Accordion
          type="multiple"
          className="w-full"
          value={activeItems}
          onValueChange={setActiveItems}
        >
          {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger>{item.title}</AccordionTrigger>
              <AccordionContent>
                <p>{item.content}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-sm text-muted-foreground">
          アクティブなアイテム: {activeItems.join(", ") || "なし"}
        </div>
      </div>
    )
  },
}

/**
 * ネストしたアコーディオンストーリー
 */
export const Nested: Story = {
  render: () => {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="main-1">
          <AccordionTrigger>メインカテゴリ 1</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <p>メインカテゴリの説明...</p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="sub-1-1">
                  <AccordionTrigger>サブカテゴリ 1.1</AccordionTrigger>
                  <AccordionContent>
                    サブカテゴリの詳細情報...
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="sub-1-2">
                  <AccordionTrigger>サブカテゴリ 1.2</AccordionTrigger>
                  <AccordionContent>
                    サブカテゴリの詳細情報...
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="main-2">
          <AccordionTrigger>メインカテゴリ 2</AccordionTrigger>
          <AccordionContent>
            <p>メインカテゴリ 2の説明...</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
}

/**
 * FAQ形式のアコーディオンストーリー
 */
export const FAQ: Story = {
  args: {},
  render: () => {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="faq-1">
          <AccordionTrigger>アコーディオンはアクセシブルですか？</AccordionTrigger>
          <AccordionContent>
            はい。WAI-ARIAデザインパターンに準拠しており、スクリーンリーダーやキーボードナビゲーションを完全にサポートしています。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-2">
          <AccordionTrigger>複数のアイテムを同時に開くことはできますか？</AccordionTrigger>
          <AccordionContent>
            type="multiple"を設定することで、複数のアイテムを同時に開くことができます。type="single"の場合は、一度に1つのアイテムのみ開くことができます。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-3">
          <AccordionTrigger>カスタマイズは可能ですか？</AccordionTrigger>
          <AccordionContent>
            はい。Tailwind CSSクラスを使用して、色、サイズ、アニメーションなど、あらゆる側面をカスタマイズできます。
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="faq-4">
          <AccordionTrigger>どのようなコンテンツを含めることができますか？</AccordionTrigger>
          <AccordionContent>
            テキスト、画像、フォーム、さらには他のアコーディオンなど、あらゆる種類のコンテンツを含めることができます。
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  },
} 