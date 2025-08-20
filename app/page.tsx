/**
 * 保険サービス総合トップページ
 * 
 * 医療保険、外貨建て、変額、年金などの各種保険サービスの紹介
 * 既存のデザイントークンとコンポーネントを使用した統一感のあるデザイン
 * 
 * @author Medical Insurance System
 * @version 2.0.0
 */

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Heart, 
  TrendingUp, 
  Globe, 
  Calculator, 
  ArrowRight,
  CheckCircle
} from "lucide-react"

export default function Home() {
  const [activeService, setActiveService] = useState<string | null>(null)

  /**
   * サービス一覧の定義
   * 現在実装済みの医療保険と将来実装予定のサービスを含む
   */
  const services = [
    {
      id: "medical",
      title: "医療保険",
      description: "入院・手術・通院時の医療費をサポートする保険",
      icon: Heart,
      status: "available",
      features: ["入院給付金", "手術給付金", "通院給付金", "特約選択可能"],
      path: "/medical",
      color: "text-semantic-success"
    },
    {
      id: "medical-plan-advisor",
      title: "医療保険アドバイザー",
      description: "基礎情報とニーズからプラン提案→該当商品の推薦を行うデモ",
      icon: Shield,
      status: "available",
      features: ["ニーズ入力", "プラン提案", "商品推薦", "説明表示"],
      path: "/medicalPlanAdvisor",
      color: "text-semantic-brand"
    },
    {
      id: "foreign",
      title: "外貨建て保険",
      description: "為替変動を活用した資産形成と保障の両立",
      icon: Globe,
      status: "coming-soon",
      features: ["為替変動活用", "資産形成", "死亡保障", "満期保険金"],
      path: "#",
      color: "text-semantic-accent"
    },
    {
      id: "variable",
      title: "変額保険",
      description: "投資成果に応じて保険金額が変動する保険",
      icon: TrendingUp,
      status: "coming-soon",
      features: ["投資連動", "保険金額変動", "死亡保障", "運用成果"],
      path: "#",
      color: "text-semantic-warning"
    },
    {
      id: "annuity",
      title: "年金保険",
      description: "老後の生活を支える安定した年金収入",
      icon: Calculator,
      status: "coming-soon",
      features: ["老後保障", "年金収入", "積立運用", "税制優遇"],
      path: "#",
      color: "text-semantic-brand"
    }
  ]

  /**
   * サービスカードのクリックハンドラー
   * @param serviceId サービスID
   */
  const handleServiceClick = (serviceId: string) => {
    if (serviceId === "medical") {
      window.location.href = "/medical"
    } else if (serviceId === "medical-plan-advisor") {
      window.location.href = "/medicalPlanAdvisor"
    } else {
      setActiveService(serviceId)
    }
  }

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* ヘッダーセクション */}
      <header className="border-b border-semantic-border bg-semantic-bg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-h1 font-semibold text-semantic-fg">サービスのデモ</h1>
          </div>
        </div>
      </header>

      {/* サービス一覧セクション */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-h2 font-semibold text-semantic-fg mb-4">
              提供サービス
            </h3>
            <p className="text-body text-semantic-fg-subtle max-w-2xl mx-auto">
              お客様のニーズに合わせて、様々な保険サービスをご用意しております。
              現在は医療保険のWeb申込がご利用いただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Card 
                  key={service.id}
                  className="hover:shadow-lg transition-normal cursor-pointer border-semantic-border"
                  onClick={() => handleServiceClick(service.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <IconComponent className={`h-8 w-8 ${service.color}`} />
                      {service.status === "available" ? (
                        <Badge variant="secondary" className="bg-semantic-success/10 text-semantic-success">
                          利用可能
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-semantic-warning/10 text-semantic-warning">
                          準備中
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-h3 text-semantic-fg">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-body text-semantic-fg-subtle">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-caption text-semantic-fg-subtle">
                          <CheckCircle className="h-4 w-4 text-semantic-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {service.status === "available" ? (
                      <Button className="w-full" onClick={() => window.location.href = service.path}>
                        詳細を見る
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        準備中
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
