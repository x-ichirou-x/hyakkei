# コンポーネントパーツ集ガイド

## 概要
このガイドでは、`@components/`ディレクトリに配置されている再利用可能なUIコンポーネントパーツ集について説明します。これらのコンポーネントは、医療保険申込システムのUI構築に使用され、一貫性のあるデザインシステムを提供します。

**技術スタック**: このコンポーネントライブラリは[shadcn/ui](https://ui.shadcn.com/)をベースとして構築されており、Radix UIのプリミティブコンポーネントとTailwind CSSを活用しています。

## 主な仕様
- **shadcn/uiベース**: 高品質でアクセシブルなUIコンポーネントライブラリ
- **Radix UIプリミティブ**: アクセシビリティとキーボードナビゲーションを保証
- **Tailwind CSS**: 一貫性のあるデザインシステムとユーティリティファーストのスタイリング
- **再利用性**: 共通のUIパターンを標準化し、開発効率を向上
- **アクセシビリティ**: WAI-ARIA準拠のセマンティックなマークアップ
- **レスポンシブ対応**: モバイルファーストの設計思想
- **TypeScript対応**: 型安全性を保証する型定義
- **Storybook対応**: 各コンポーネントの使用方法とバリエーションを確認可能

## 制限事項
- 独自のスタイリングは禁止。既存のデザイントークンのみ使用
- コンポーネントの内部実装は変更不可。必要に応じて新規作成
- 医療保険システム専用のコンポーネントは他プロジェクトでの使用不可
- shadcn/uiのコンポーネント構造を変更しない（カスタマイズはpropsとclassName経由でのみ）

## ディレクトリ構造

### 1. UIコンポーネント (`components/ui/`)
shadcn/uiをベースとした汎用的なUI要素を提供する基本コンポーネント群。すべてのコンポーネントはRadix UIのプリミティブを活用し、アクセシビリティとキーボードナビゲーションを保証しています。

#### 1.1 フォーム要素
| コンポーネント | 用途 | 主要機能 |
|---|---|---|
| `Button` | ボタン | 7種類のバリエーション（default, destructive, outline, secondary, ghost, link, icon） |
| `Input` | テキスト入力 | 標準的なテキストフィールド、バリデーション対応 |
| `Textarea` | 複数行テキスト入力 | リサイズ可能、プレースホルダー対応 |
| `Select` | セレクトボックス | オプション選択、検索機能付き |
| `Checkbox` | チェックボックス | 単一・複数選択対応 |
| `RadioGroup` | ラジオボタン | 排他的選択、グループ化対応 |
| `Switch` | トグルスイッチ | ON/OFF状態の切り替え |
| `Toggle` | トグルボタン | 押下状態の管理 |
| `ToggleGroup` | トグルグループ | 複数のトグルボタンをグループ化 |
| `InputOTP` | OTP入力 | ワンタイムパスワード用の分割入力フィールド |
| `DatePicker` | 日付選択 | カレンダーUI、範囲選択対応 |
| `Slider` | スライダー | 数値範囲の選択、連続値・離散値対応 |

#### 1.2 レイアウト要素
| コンポーネント | 用途 | 主要機能 |
|---|---|---|
| `Card` | カード | コンテンツのグループ化、ヘッダー・フッター対応 |
| `Separator` | 区切り線 | 水平・垂直の区切り表示 |
| `ScrollArea` | スクロール領域 | カスタムスクロールバー、タッチ対応 |
| `Resizable` | リサイズ可能領域 | ドラッグによるサイズ変更 |
| `Collapsible` | 折りたたみ可能 | アコーディオン形式の表示切り替え |
| `Accordion` | アコーディオン | 複数セクションの折りたたみ管理 |
| `Tabs` | タブ | コンテンツの切り替え表示 |
| `NavigationMenu` | ナビゲーションメニュー | ドロップダウン形式のナビゲーション |
| `Sidebar` | サイドバー | レスポンシブ対応のサイドナビゲーション |
| `Sheet` | シート | サイドから表示されるオーバーレイ |
| `Drawer` | ドロワー | 上下左右から表示されるオーバーレイ |

#### 1.3 データ表示要素
| コンポーネント | 用途 | 主要機能 |
|---|---|---|
| `Table` | テーブル | データの表形式表示、ソート・フィルタ対応 |
| `DataTable` | データテーブル | 高度なテーブル機能、ページネーション対応 |
| `Badge` | バッジ | ステータス・ラベルの表示 |
| `Avatar` | アバター | ユーザー画像・イニシャル表示 |
| `Progress` | プログレスバー | 進捗状況の表示、アニメーション対応 |
| `Skeleton` | スケルトン | ローディング中のプレースホルダー |
| `Stepper` | ステッパー | 段階的なプロセスの表示 |
| `Breadcrumb` | パンくずリスト | ナビゲーション階層の表示 |
| `Pagination` | ページネーション | ページ番号のナビゲーション |

#### 1.4 オーバーレイ要素
| コンポーネント | 用途 | 主要機能 |
|---|---|---|
| `Dialog` | ダイアログ | モーダル形式のポップアップ |
| `AlertDialog` | アラートダイアログ | 確認・警告用のダイアログ |
| `Popover` | ポップオーバー | 要素に関連する情報の表示 |
| `HoverCard` | ホバーカード | マウスオーバー時の情報表示 |
| `Tooltip` | ツールチップ | 要素の説明・補足情報 |
| `ContextMenu` | コンテキストメニュー | 右クリック時のメニュー |
| `DropdownMenu` | ドロップダウンメニュー | クリック時のドロップダウン |
| `Menubar` | メニューバー | 水平配置のメニュー |
| `Command` | コマンドパレット | キーボード操作による検索・実行 |
| `Combobox` | コンボボックス | 検索可能なセレクトボックス |

#### 1.5 その他の要素
| コンポーネント | 用途 | 主要機能 |
|---|---|---|
| `Alert` | アラート | 情報・警告・エラーメッセージの表示 |
| `Calendar` | カレンダー | 日付選択・表示 |
| `Carousel` | カルーセル | 画像・コンテンツのスライド表示 |
| `Sonner` | トースト通知 | 一時的な通知メッセージ |
| `Form` | フォーム | フォームの状態管理・バリデーション |
| `Label` | ラベル | フォーム要素の説明ラベル |
| `Typography` | タイポグラフィ | 見出し・本文のスタイリング |
| `SectionHeading` | セクション見出し | セクション区切りの見出し |
| `HelpTip` | ヘルプチップ | ヘルプ情報の表示 |

### 2. レイアウトコンポーネント (`components/layout/`)
ページ全体の構造を定義するレイアウトコンポーネント

| コンポーネント | 用途 | 主要機能 |
|---|---|---|
| `MedicalHeader` | 医療フローヘッダー | ブランドロゴ・コンタクトロゴの表示 |
| `MedicalFooter` | 医療フローフッター | フッター情報の表示 |

### 3. 医療専用コンポーネント (`components/medical/`)
医療保険システム専用のビジネスロジックコンポーネント

| コンポーネント | 用途 | 主要機能 |
|---|---|---|
| `PlanCard` | プランカード | 保険プランの表示・選択管理 |
| `RiderCard` | 特約カード | 特約の表示・選択管理 |
| `SelectionSummary` | 選択サマリー | 選択内容の要約表示 |

## 使用方法

### 技術スタックの理解
このコンポーネントライブラリは以下の技術スタックで構築されています：

- **shadcn/ui**: 高品質なUIコンポーネントのコピー&ペースト可能なライブラリ
- **Radix UI**: アクセシビリティを重視したプリミティブコンポーネント
- **Tailwind CSS**: ユーティリティファーストのCSSフレームワーク
- **class-variance-authority (cva)**: コンポーネントのバリエーション管理

### 基本的なインポート
```typescript
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
```

### コンポーネントの組み合わせ例
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          プラン選択
          <Badge variant="secondary">必須</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button>選択する</Button>
      </CardContent>
    </Card>
  )
}
```

## 関連ドキュメント

- [CSSデザイン・トンマナガイド](./toneAndMannerCssDesign.md)
- [サービス・トンマナガイド](./toneAndMannerService.md)
- [Storybook](http://localhost:6006) - コンポーネントの詳細確認
- [shadcn/ui公式ドキュメント](https://ui.shadcn.com/) - ベースとなるコンポーネントライブラリ
- [Radix UI公式ドキュメント](https://www.radix-ui.com/) - プリミティブコンポーネント
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/) - CSSフレームワーク

## サポート

コンポーネントの使用方法やカスタマイズについて質問がある場合は、開発チームまでお問い合わせください。

## 更新履歴

### v1.0.0 (2024-01-XX)
- 初期リリース
- shadcn/uiベースの基本UIコンポーネントの提供
- 医療専用コンポーネントの実装
- Radix UIとTailwind CSSの統合
