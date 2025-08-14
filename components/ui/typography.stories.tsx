import type { Meta, StoryObj } from "@storybook/react"
import {
  H1,
  H2,
  H3,
  H4,
  P,
  Blockquote,
  Table,
  Th,
  Td,
  Tr,
  Ul,
  Code,
  Lead,
  Large,
  Small,
  Muted,
} from "./typography"

const meta: Meta<typeof H1> = {
  title: "Components/UI/Typography",
  component: H1,
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

/**
 * 完全なTypographyデモ（公式サイトと同じ）
 */
export const Complete: Story = {
  render: () => (
    <div className="max-w-4xl space-y-6">
      <H1>笑いの税金: ジョーク税の年代記</H1>
      <Lead>
        昔々、遠い国の怠惰な王様が、一日中玉座でくつろいでいました。ある日、王様の顧問たちが問題を持ってやってきました：王国のお金が底をついていました。
      </Lead>
      
      <H2>王様の計画</H2>
      <P>
        王様は長い間考え、ついに素晴らしい計画を思いつきました：王国のジョークに税金をかけることでした。
      </P>
      
      <Blockquote>
        「結局のところ」と王様は言いました、「誰もが良いジョークを楽しむのだから、その特権に対して支払うのは当然だ」
      </Blockquote>
      
      <H3>ジョーク税</H3>
      <P>
        王様の臣民たちは面白がりませんでした。彼らは不平を言い、文句を言いましたが、王様は断固としていました：
      </P>
      <Ul>
        <li>1レベルのダジャレ: 5金貨</li>
        <li>2レベルのジョーク: 10金貨</li>
        <li>3レベルのワンライナー: 20金貨</li>
      </Ul>
      
      <P>
        その結果、人々はジョークを言うのをやめ、王国は暗い雰囲気に包まれました。しかし、王様の愚かさに屈しない一人の人物がいました：ジョクスターという宮廷道化師です。
      </P>
      
      <H3>ジョクスターの反乱</H3>
      <P>
        ジョクスターは夜中に城に忍び込み、いたるところにジョークを残し始めました：王様の枕の下、スープの中、そして王室のトイレにまで。
      </P>
      
      <H3>人々の反乱</H3>
      <P>
        王国の人々は、ジョクスターが残したジョークがとても面白いことに気づき、笑わずにはいられませんでした。
      </P>
      
      <Table>
        <thead>
          <Tr>
            <Th>王様の財宝</Th>
            <Th>人々の幸福</Th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>空</Td>
            <Td>溢れるほど</Td>
          </Tr>
          <Tr>
            <Td>控えめ</Td>
            <Td>満足</Td>
          </Tr>
          <Tr>
            <Td>満杯</Td>
            <Td>有頂天</Td>
          </Tr>
        </tbody>
      </Table>
      
      <P>
        王様は、臣民たちがどれほど幸せになったかを見て、自分の過ちを悟り、ジョーク税を廃止しました。
      </P>
      
      <P>
        この物語の教訓は：良い笑いの力を過小評価してはいけない、そして悪いアイデアには常に注意しなさいということです。
      </P>
    </div>
  ),
}

/**
 * H1見出し
 */
export const Heading1: Story = {
  render: () => (
    <H1>笑いの税金: ジョーク税の年代記</H1>
  ),
}

/**
 * H2見出し
 */
export const Heading2: Story = {
  render: () => (
    <H2>王国の人々</H2>
  ),
}

/**
 * H3見出し
 */
export const Heading3: Story = {
  render: () => (
    <H3>ジョーク税</H3>
  ),
}

/**
 * H4見出し
 */
export const Heading4: Story = {
  render: () => (
    <H4>人々はジョークを言うのをやめた</H4>
  ),
}

/**
 * 段落
 */
export const Paragraph: Story = {
  render: () => (
    <P>
      王様は、臣民たちがどれほど幸せになったかを見て、自分の過ちを悟り、ジョーク税を廃止しました。
    </P>
  ),
}

/**
 * 引用
 */
export const Quote: Story = {
  render: () => (
    <Blockquote>
      「結局のところ」と王様は言いました、「誰もが良いジョークを楽しむのだから、その特権に対して支払うのは当然だ」
    </Blockquote>
  ),
}

/**
 * テーブル
 */
export const TableDemo: Story = {
  render: () => (
    <Table>
      <thead>
        <Tr>
          <Th>王様の財宝</Th>
          <Th>人々の幸福</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td>空</Td>
          <Td>溢れるほど</Td>
        </Tr>
        <Tr>
          <Td>控えめ</Td>
          <Td>満足</Td>
        </Tr>
        <Tr>
          <Td>満杯</Td>
          <Td>有頂天</Td>
        </Tr>
      </tbody>
    </Table>
  ),
}

/**
 * リスト
 */
export const List: Story = {
  render: () => (
    <Ul>
      <li>1レベルのダジャレ: 5金貨</li>
      <li>2レベルのジョーク: 10金貨</li>
      <li>3レベルのワンライナー: 20金貨</li>
    </Ul>
  ),
}

/**
 * インラインコード
 */
export const InlineCode: Story = {
  render: () => (
    <P>
      このコンポーネントは <Code>@radix-ui/react-alert-dialog</Code> を使用しています。
    </P>
  ),
}

/**
 * リード文
 */
export const LeadText: Story = {
  render: () => (
    <Lead>
      重要なコンテンツでユーザーを中断し、応答を期待するモーダルダイアログです。
    </Lead>
  ),
}

/**
 * 大きなテキスト
 */
export const LargeText: Story = {
  render: () => (
    <Large>本当に確実ですか？</Large>
  ),
}

/**
 * 小さなテキスト
 */
export const SmallText: Story = {
  render: () => (
    <Small>メールアドレス</Small>
  ),
}

/**
 * ミュートテキスト
 */
export const MutedText: Story = {
  render: () => (
    <Muted>メールアドレスを入力してください。</Muted>
  ),
}

/**
 * 組み合わせ例
 */
export const Combination: Story = {
  render: () => (
    <div className="space-y-4">
      <H2>フォーム例</H2>
      <div className="space-y-2">
        <Small>メールアドレス</Small>
        <input 
          type="email" 
          placeholder="example@email.com"
          className="w-full p-2 border rounded"
        />
        <Muted>有効なメールアドレスを入力してください</Muted>
      </div>
      
      <div className="space-y-2">
        <Small>パスワード</Small>
        <input 
          type="password" 
          placeholder="パスワードを入力"
          className="w-full p-2 border rounded"
        />
        <Muted>8文字以上で入力してください</Muted>
      </div>
      
      <Large>本当に送信しますか？</Large>
    </div>
  ),
} 