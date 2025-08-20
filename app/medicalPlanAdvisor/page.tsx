/**
 * 医療保険プランアドバイザー エントリページ
 *
 * 概要:
 * - ユーザーの基礎情報とニーズに基づき、医療保険のプラン提案を行い、
 *   そのプラン条件を満たす該当商品の提案へつなげるデモの起点となるページ。
 *
 * 主な仕様:
 * - ルーティング: /medicalPlanAdvisor
 * - 現段階ではプレースホルダー表示のみ（今後、入力→プラン→商品推薦のフローを実装）
 * - 既存のデザイントークン/コンポーネントとの整合を前提にUIを拡張予定
 *
 * 制限事項:
 * - デモ用途のため、実販売情報/募集資料とは異なる可能性があります。
 * - 推薦ロジックは未実装のため、現時点では静的な表示のみを行います。
 */

/**
 * ページコンポーネント
 * @returns {JSX.Element} 画面要素
 */
export default function medicalPlanAdvisorPage(): JSX.Element {
  return (
    <div className="min-h-screen bg-semantic-bg">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-h1 font-semibold text-semantic-fg mb-4">医療保険プランアドバイザー（デモ）</h1>
        <p className="text-body text-semantic-fg-subtle mb-8">
          入力フォーム、プラン提案、商品推薦のフローを順次実装します。このページはエントリポイントです。
        </p>
        <div className="rounded-lg border border-semantic-border p-6 bg-semantic-bg">
          <p className="text-body text-semantic-fg">
            近日中に「ユーザー入力 → プラン提案 → 該当商品の推薦」機能を公開予定です。
          </p>
        </div>
      </div>
    </div>
  )
}


