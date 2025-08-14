/**
 * Story: SectionHeading（セクション見出し）
 *
 * 左側の縦ライン＋見出しテキストの統一デザインを提供する `SectionHeading` のStory。
 */

import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import SectionHeading from "./section-heading"

const meta: Meta<typeof SectionHeading> = {
  title: "UI/SectionHeading",
  component: SectionHeading,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text", description: "見出しテキスト" },
    as: { control: "inline-radio", options: ["h2", "h3", "h4"], description: "見出しレベル" },
    className: { control: "text" },
  },
}

export default meta
type Story = StoryObj<typeof SectionHeading>

export const H2: Story = {
  name: "H2 見出し",
  args: {
    title: "お客様情報の入力",
    as: "h2",
  },
}

export const H3: Story = {
  name: "H3 見出し",
  args: {
    title: "小見出し（H3）",
    as: "h3",
  },
}

export const LongTitle: Story = {
  name: "長いタイトル",
  args: {
    title: "これはとても長い見出しテキストの例です。レスポンシブでも折り返し表示されます。",
    as: "h2",
  },
}


