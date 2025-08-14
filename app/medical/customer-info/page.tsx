/**
 * 個人情報入力画面
 * 
 * 保険プラン選択後の個人情報登録画面
 * 氏名、住所、連絡先、メールアドレス、パスワードの入力
 * ソーシャルログイン機能付き
 * 
 * @author Medical Insurance System
 * @version 1.0.0
 */

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Stepper from "@/components/ui/stepper"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import SectionHeading from "@/components/ui/section-heading"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Phone, 
  Mail, 
  Eye, 
  EyeOff,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  User,
  MapPin,
  Calendar,
  Lock
} from "lucide-react"
import Image from "next/image"
import MedicalHeader from "@/components/layout/medical-header"
import MedicalFooter from "@/components/layout/medical-footer"

/**
 * 個人情報の型定義
 */
interface CustomerInfo {
  // 氏名（漢字）
  lastName: string
  firstName: string
  // 氏名（カナ）
  lastNameKana: string
  firstNameKana: string
  // 生年月日
  dateOfBirth: string
  // 性別
  gender: string
  // 住所
  postalCode: string
  prefecture: string
  city: string
  address: string
  building: string
  // 電話番号
  mobilePhone1: string
  mobilePhone2: string
  mobilePhone3: string
  homePhone1: string
  homePhone2: string
  homePhone3: string
  // メールアドレス
  email: string
  emailConfirm: string
  // パスワード
  password: string
  passwordConfirm: string
}

/**
 * 都道府県データ
 */
const prefectures = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
]

export default function CustomerInfoPage() {
  // 個人情報の状態管理
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    dateOfBirth: "",
    gender: "",
    postalCode: "",
    prefecture: "",
    city: "",
    address: "",
    building: "",
    mobilePhone1: "",
    mobilePhone2: "",
    mobilePhone3: "",
    homePhone1: "",
    homePhone2: "",
    homePhone3: "",
    email: "",
    emailConfirm: "",
    password: "",
    passwordConfirm: ""
  })

  // パスワード表示/非表示の状態
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  // バリデーションエラーの状態
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  
  // バリデーション成功の状態
  const [validFields, setValidFields] = useState<{ [key: string]: boolean }>({})

  /**
   * 入力値の更新処理
   * @param field 更新するフィールド
   * @param value 新しい値
   */
  const updateField = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }))
    
    // リアルタイムバリデーション
    validateField(field, value)
  }

  /**
   * 個別フィールドのバリデーション
   * @param field バリデーション対象フィールド
   * @param value 入力値
   */
  const validateField = (field: keyof CustomerInfo, value: string) => {
    let errorMessage = ""

    switch (field) {
      case 'lastName':
        if (!value) {
          errorMessage = "姓を入力してください"
        } else if (value.length < 1 || value.length > 20) {
          errorMessage = "姓は1文字以上20文字以下で入力してください"
        } else if (!/^[\u4e00-\u9faf]+$/.test(value)) {
          errorMessage = "姓は漢字で入力してください"
        }
        break

      case 'firstName':
        if (!value) {
          errorMessage = "名を入力してください"
        } else if (value.length < 1 || value.length > 20) {
          errorMessage = "名は1文字以上20文字以下で入力してください"
        } else if (!/^[\u4e00-\u9faf]+$/.test(value)) {
          errorMessage = "名は漢字で入力してください"
        }
        break

      case 'lastNameKana':
        if (!value) {
          errorMessage = "セイを入力してください"
        } else if (value.length < 1 || value.length > 20) {
          errorMessage = "セイは1文字以上20文字以下で入力してください"
        } else if (!/^[\u30a0-\u30ff]+$/.test(value)) {
          errorMessage = "セイはカタカナで入力してください"
        }
        break

      case 'firstNameKana':
        if (!value) {
          errorMessage = "メイを入力してください"
        } else if (value.length < 1 || value.length > 20) {
          errorMessage = "メイは1文字以上20文字以下で入力してください"
        } else if (!/^[\u30a0-\u30ff]+$/.test(value)) {
          errorMessage = "メイはカタカナで入力してください"
        }
        break

      case 'dateOfBirth':
        if (!value) {
          errorMessage = "生年月日を入力してください"
        } else {
          const birthDate = new Date(value)
          const today = new Date()
          let age = today.getFullYear() - birthDate.getFullYear()
          const monthDiff = today.getMonth() - birthDate.getMonth()
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
          }
          
          if (age < 0) {
            errorMessage = "生年月日が未来の日付になっています"
          } else if (age > 120) {
            errorMessage = "生年月日が正しくありません"
          } else if (age < 18) {
            errorMessage = "18歳未満の方は申込みできません"
          }
        }
        break

      case 'postalCode':
        if (!value) {
          errorMessage = "郵便番号を入力してください"
        } else if (!/^\d{7}$/.test(value)) {
          errorMessage = "郵便番号は7桁の数字で入力してください"
        }
        break

      case 'city':
        if (!value) {
          errorMessage = "市区郡・町村を入力してください"
        } else if (value.length < 1 || value.length > 50) {
          errorMessage = "市区郡・町村は1文字以上50文字以下で入力してください"
        }
        break

      case 'address':
        if (!value) {
          errorMessage = "丁目・番地を入力してください"
        } else if (value.length < 1 || value.length > 100) {
          errorMessage = "丁目・番地は1文字以上100文字以下で入力してください"
        }
        break

      case 'building':
        if (value && value.length > 100) {
          errorMessage = "建物名・部屋番号は100文字以下で入力してください"
        }
        break

      case 'mobilePhone1':
      case 'mobilePhone2':
      case 'mobilePhone3':
        // 携帯電話番号の全体バリデーション
        const mobilePhone = customerInfo.mobilePhone1 + customerInfo.mobilePhone2 + customerInfo.mobilePhone3
        if (!customerInfo.mobilePhone1 || !customerInfo.mobilePhone2 || !customerInfo.mobilePhone3) {
          errorMessage = "携帯電話番号を入力してください"
        } else if (!/^\d{10,11}$/.test(mobilePhone)) {
          errorMessage = "携帯電話番号は10桁または11桁の数字で入力してください"
        } else if (!/^0[789]0/.test(mobilePhone)) {
          errorMessage = "携帯電話番号は070、080、090で始まる番号を入力してください"
        }
        break

      case 'homePhone1':
      case 'homePhone2':
      case 'homePhone3':
        // 自宅電話番号の全体バリデーション（任意項目）
        const homePhone = customerInfo.homePhone1 + customerInfo.homePhone2 + customerInfo.homePhone3
        if (customerInfo.homePhone1 || customerInfo.homePhone2 || customerInfo.homePhone3) {
          if (!/^\d{10,11}$/.test(homePhone)) {
            errorMessage = "自宅電話番号は10桁または11桁の数字で入力してください"
          } else if (!/^0\d{1,4}/.test(homePhone)) {
            errorMessage = "自宅電話番号は0で始まる番号を入力してください"
          }
        }
        break

      case 'email':
        if (!value) {
          errorMessage = "メールアドレスを入力してください"
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          errorMessage = "正しいメールアドレスの形式で入力してください"
        } else if (value.length > 254) {
          errorMessage = "メールアドレスが長すぎます"
        } else if (value.includes('..') || value.includes('--')) {
          errorMessage = "メールアドレスに連続した記号が含まれています"
        }
        break

      case 'emailConfirm':
        if (customerInfo.email && value !== customerInfo.email) {
          errorMessage = "メールアドレスが一致しません"
        }
        break

      case 'password':
        if (!value) {
          errorMessage = "パスワードを入力してください"
        } else if (value.length < 6) {
          errorMessage = "パスワードは6文字以上で入力してください"
        } else if (value.length > 128) {
          errorMessage = "パスワードは128文字以下で入力してください"
        } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(value)) {
          errorMessage = "パスワードは半角のアルファベットと数字を組み合わせて入力してください"
        } else if (/(.)\1{2,}/.test(value)) {
          errorMessage = "パスワードに同じ文字が3回以上連続して使用されています"
        }
        break

      case 'passwordConfirm':
        if (customerInfo.password && value !== customerInfo.password) {
          errorMessage = "パスワードが一致しません"
        }
        break
    }

    // エラー状態とバリデーション成功状態を更新
    setErrors(prev => {
      const newErrors = { ...prev }
      if (errorMessage) {
        newErrors[field] = errorMessage
      } else {
        delete newErrors[field]
      }
      return newErrors
    })

    setValidFields(prev => {
      const newValidFields = { ...prev }
      if (!errorMessage && value) {
        newValidFields[field] = true
      } else {
        delete newValidFields[field]
      }
      return newValidFields
    })
  }

  /**
   * 詳細なバリデーション
   * @returns バリデーション結果
   */
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {}

    // 氏名（漢字）のバリデーション
    if (!customerInfo.lastName) {
      newErrors.lastName = "姓を入力してください"
    } else if (customerInfo.lastName.length < 1 || customerInfo.lastName.length > 20) {
      newErrors.lastName = "姓は1文字以上20文字以下で入力してください"
    } else if (!/^[\u4e00-\u9faf]+$/.test(customerInfo.lastName)) {
      newErrors.lastName = "姓は漢字で入力してください"
    }

    if (!customerInfo.firstName) {
      newErrors.firstName = "名を入力してください"
    } else if (customerInfo.firstName.length < 1 || customerInfo.firstName.length > 20) {
      newErrors.firstName = "名は1文字以上20文字以下で入力してください"
    } else if (!/^[\u4e00-\u9faf]+$/.test(customerInfo.firstName)) {
      newErrors.firstName = "名は漢字で入力してください"
    }
    
    // 氏名（カナ）のバリデーション
    if (!customerInfo.lastNameKana) {
      newErrors.lastNameKana = "セイを入力してください"
    } else if (customerInfo.lastNameKana.length < 1 || customerInfo.lastNameKana.length > 20) {
      newErrors.lastNameKana = "セイは1文字以上20文字以下で入力してください"
    } else if (!/^[\u30a0-\u30ff]+$/.test(customerInfo.lastNameKana)) {
      newErrors.lastNameKana = "セイはカタカナで入力してください"
    }

    if (!customerInfo.firstNameKana) {
      newErrors.firstNameKana = "メイを入力してください"
    } else if (customerInfo.firstNameKana.length < 1 || customerInfo.firstNameKana.length > 20) {
      newErrors.firstNameKana = "メイは1文字以上20文字以下で入力してください"
    } else if (!/^[\u30a0-\u30ff]+$/.test(customerInfo.firstNameKana)) {
      newErrors.firstNameKana = "メイはカタカナで入力してください"
    }
    
    // 生年月日のバリデーション
    if (!customerInfo.dateOfBirth) {
      newErrors.dateOfBirth = "生年月日を入力してください"
    } else {
      const birthDate = new Date(customerInfo.dateOfBirth)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      if (age < 0) {
        newErrors.dateOfBirth = "生年月日が未来の日付になっています"
      } else if (age > 120) {
        newErrors.dateOfBirth = "生年月日が正しくありません"
      } else if (age < 18) {
        newErrors.dateOfBirth = "18歳未満の方は申込みできません"
      }
    }
    
    // 性別のバリデーション
    if (!customerInfo.gender) {
      newErrors.gender = "性別を選択してください"
    }
    
    // 郵便番号のバリデーション
    if (!customerInfo.postalCode) {
      newErrors.postalCode = "郵便番号を入力してください"
    } else if (!/^\d{7}$/.test(customerInfo.postalCode)) {
      newErrors.postalCode = "郵便番号は7桁の数字で入力してください"
    }
    
    // 都道府県のバリデーション
    if (!customerInfo.prefecture) {
      newErrors.prefecture = "都道府県を選択してください"
    }
    
    // 市区郡・町村のバリデーション
    if (!customerInfo.city) {
      newErrors.city = "市区郡・町村を入力してください"
    } else if (customerInfo.city.length < 1 || customerInfo.city.length > 50) {
      newErrors.city = "市区郡・町村は1文字以上50文字以下で入力してください"
    }
    
    // 丁目・番地のバリデーション
    if (!customerInfo.address) {
      newErrors.address = "丁目・番地を入力してください"
    } else if (customerInfo.address.length < 1 || customerInfo.address.length > 100) {
      newErrors.address = "丁目・番地は1文字以上100文字以下で入力してください"
    }
    
    // 建物名・部屋番号のバリデーション
    if (customerInfo.building && customerInfo.building.length > 100) {
      newErrors.building = "建物名・部屋番号は100文字以下で入力してください"
    }
    
    // 携帯電話番号のバリデーション
    if (!customerInfo.mobilePhone1 || !customerInfo.mobilePhone2 || !customerInfo.mobilePhone3) {
      newErrors.mobilePhone1 = "携帯電話番号を入力してください"
    } else {
      const mobilePhone = customerInfo.mobilePhone1 + customerInfo.mobilePhone2 + customerInfo.mobilePhone3
      if (!/^\d{10,11}$/.test(mobilePhone)) {
        newErrors.mobilePhone1 = "携帯電話番号は10桁または11桁の数字で入力してください"
      } else if (!/^0[789]0/.test(mobilePhone)) {
        newErrors.mobilePhone1 = "携帯電話番号は070、080、090で始まる番号を入力してください"
      }
    }
    
    // 自宅電話番号のバリデーション（任意項目）
    if (customerInfo.homePhone1 || customerInfo.homePhone2 || customerInfo.homePhone3) {
      const homePhone = customerInfo.homePhone1 + customerInfo.homePhone2 + customerInfo.homePhone3
      if (!/^\d{10,11}$/.test(homePhone)) {
        newErrors.homePhone1 = "自宅電話番号は10桁または11桁の数字で入力してください"
      } else if (!/^0\d{1,4}/.test(homePhone)) {
        newErrors.homePhone1 = "自宅電話番号は0で始まる番号を入力してください"
      }
    }
    
    // メールアドレスのバリデーション
    if (!customerInfo.email) {
      newErrors.email = "メールアドレスを入力してください"
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(customerInfo.email)) {
      newErrors.email = "正しいメールアドレスの形式で入力してください"
    } else if (customerInfo.email.length > 254) {
      newErrors.email = "メールアドレスが長すぎます"
    } else if (customerInfo.email.includes('..') || customerInfo.email.includes('--')) {
      newErrors.email = "メールアドレスに連続した記号が含まれています"
    }
    
    if (customerInfo.email && customerInfo.email !== customerInfo.emailConfirm) {
      newErrors.emailConfirm = "メールアドレスが一致しません"
    }
    
    // パスワードのバリデーション
    if (!customerInfo.password) {
      newErrors.password = "パスワードを入力してください"
    } else if (customerInfo.password.length < 6) {
      newErrors.password = "パスワードは6文字以上で入力してください"
    } else if (customerInfo.password.length > 128) {
      newErrors.password = "パスワードは128文字以下で入力してください"
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(customerInfo.password)) {
      newErrors.password = "パスワードは半角のアルファベットと数字を組み合わせて入力してください"
    } else if (/(.)\1{2,}/.test(customerInfo.password)) {
      newErrors.password = "パスワードに同じ文字が3回以上連続して使用されています"
    }
    
    if (customerInfo.password && customerInfo.password !== customerInfo.passwordConfirm) {
      newErrors.passwordConfirm = "パスワードが一致しません"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * フォーム送信処理
   */
  const handleSubmit = () => {
    if (validateForm()) {
      // バリデーション成功時の処理
      console.log("個人情報送信:", customerInfo)
      // 次の画面へ遷移（重要事項確認）
      window.location.href = "/medical/important"
    }
  }

  /**
   * 前の画面に戻る処理
   */
  const handleBack = () => {
    // 前の画面（プラン選択）に戻る
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-semantic-bg">
      {/* 共通ヘッダー */}
      <MedicalHeader />
      <div className="bg-white border-t"></div>

      {/* ステップバー */}
      <Stepper
        currentStep={1}
        totalSteps={6}
        stepLabels={[
          "お客様\n情報登録",
          "重要事項\n確認",
          "告知",
          "受取人\n登録",
          "支払方法\n登録",
          "本人確認",
        ]}
      />

      <div className="container-responsive pt-2 pb-8">
        {/* セクションタイトル */}
        <div className="mb-8">
          <SectionHeading title="お客様情報の入力" className="mb-4" />
          <div className="space-y-2 text-body text-semantic-fg-subtle">
            <p>契約者（被保険者）の情報を入力してください。</p>
            {/* 外部サービスログインの案内は削除 */}
          </div>
        </div>

        {/* ソーシャルログインボタンは削除 */}

        {/* 個人情報入力フォーム */}
        <Card className="card-standard">
          <CardHeader>
            <CardTitle className="text-h2 text-semantic-fg">個人情報入力</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 氏名（漢字） */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Label className="text-body font-medium">氏名（漢字）</Label>
                <Badge className="text-caption bg-semantic-danger text-semantic-bg">必須</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <Input
                      placeholder="例) 保険"
                      value={customerInfo.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      className={`input-standard text-body ${errors.lastName ? 'border-semantic-danger' : ''} ${validFields.lastName ? 'border-semantic-success' : ''}`}
                    />
                    {validFields.lastName && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-semantic-success" />
                    )}
                  </div>
                  {errors.lastName && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <Input
                      placeholder="例) 花子"
                      value={customerInfo.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      className={`input-standard text-body ${errors.firstName ? 'border-semantic-danger' : ''} ${validFields.firstName ? 'border-semantic-success' : ''}`}
                    />
                    {validFields.firstName && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-semantic-success" />
                    )}
                  </div>
                  {errors.firstName && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.firstName}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 氏名（カナ） */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Label className="text-base font-medium">氏名（カナ）</Label>
                <Badge className="text-caption bg-semantic-danger text-semantic-bg">必須</Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="relative">
                    <Input
                      placeholder="例) ホケン"
                      value={customerInfo.lastNameKana}
                      onChange={(e) => updateField('lastNameKana', e.target.value)}
                      className={`input-standard text-body ${errors.lastNameKana ? 'border-semantic-danger' : ''} ${validFields.lastNameKana ? 'border-semantic-success' : ''}`}
                    />
                    {validFields.lastNameKana && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-semantic-success" />
                    )}
                  </div>
                  {errors.lastNameKana && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.lastNameKana}</p>
                  )}
                </div>
                <div>
                  <div className="relative">
                    <Input
                      placeholder="例) ハナコ"
                      value={customerInfo.firstNameKana}
                      onChange={(e) => updateField('firstNameKana', e.target.value)}
                      className={`input-standard text-body ${errors.firstNameKana ? 'border-semantic-danger' : ''} ${validFields.firstNameKana ? 'border-semantic-success' : ''}`}
                    />
                    {validFields.firstNameKana && (
                      <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-semantic-success" />
                    )}
                  </div>
                  {errors.firstNameKana && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.firstNameKana}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 生年月日 */}
            <div>
              <Label className="text-base font-medium">生年月日</Label>
              <div className="relative">
                <Input
                  type="date"
                  value={customerInfo.dateOfBirth}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  className={`input-standard text-body ${errors.dateOfBirth ? 'border-semantic-danger' : ''} ${validFields.dateOfBirth ? 'border-semantic-success' : ''}`}
                />
                {validFields.dateOfBirth && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-semantic-success" />
                )}
              </div>
              {errors.dateOfBirth && (
                <p className="text-semantic-danger text-caption mt-1">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* 性別 */}
            <div>
              <Label className="text-body font-medium">性別</Label>
              <div className="relative">
                <Select value={customerInfo.gender} onValueChange={(value) => updateField('gender', value)}>
                  <SelectTrigger className={`input-standard text-body ${errors.gender ? 'border-semantic-danger' : ''} ${validFields.gender ? 'border-semantic-success' : ''}`}> 
                    <SelectValue placeholder="性別を選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">男性</SelectItem>
                    <SelectItem value="female">女性</SelectItem>
                  </SelectContent>
                </Select>
                {validFields.gender && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-semantic-success" />
                )}
              </div>
              {errors.gender && (
                <p className="text-semantic-danger text-caption mt-1">{errors.gender}</p>
              )}
            </div>

            {/* 自宅住所 */}
            <div>
               <Label className="text-body font-medium">自宅住所</Label>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Label className="text-caption">郵便番号</Label>
                    <Badge className="text-caption bg-semantic-danger text-semantic-bg">必須</Badge>
                  </div>
                  <Input
                    placeholder="例) 1000001"
                    value={customerInfo.postalCode}
                    onChange={(e) => updateField('postalCode', e.target.value)}
                    className={`input-standard text-body ${errors.postalCode ? 'border-semantic-danger' : ''}`}
                  />
                  <p className="text-caption text-semantic-fg-subtle mt-1">ハイフン(-)は入力しないで下さい。</p>
                  {errors.postalCode && (
                  <p className="text-semantic-danger text-caption mt-1">{errors.postalCode}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Label className="text-caption">都道府県</Label>
                    <Badge className="text-caption bg-semantic-danger text-semantic-bg">必須</Badge>
                  </div>
                  <Select value={customerInfo.prefecture} onValueChange={(value) => updateField('prefecture', value)}>
                     <SelectTrigger className={`input-standard text-body ${errors.prefecture ? 'border-semantic-danger' : ''}`}>
                      <SelectValue placeholder="都道府県" />
                    </SelectTrigger>
                    <SelectContent>
                      {prefectures.map((pref) => (
                         <SelectItem key={pref} value={pref} className="text-body">{pref}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.prefecture && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.prefecture}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Label className="text-caption">市区郡・町村</Label>
                    <Badge className="text-caption bg-semantic-danger text-semantic-bg">必須</Badge>
                  </div>
                  <Input
                    placeholder="例) 千代田区"
                    value={customerInfo.city}
                    onChange={(e) => updateField('city', e.target.value)}
                     className={`input-standard text-body ${errors.city ? 'border-semantic-danger' : ''}`}
                  />
                  {errors.city && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Label className="text-caption">丁目・番地</Label>
                    <Badge className="text-caption bg-semantic-danger text-semantic-bg">必須</Badge>
                  </div>
                  <Input
                    placeholder="例) 千代田1-1-1"
                    value={customerInfo.address}
                    onChange={(e) => updateField('address', e.target.value)}
                     className={`input-standard text-body ${errors.address ? 'border-semantic-danger' : ''}`}
                  />
                  {errors.address && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.address}</p>
                  )}
                </div>

                <div>
                  <Label className="text-caption">建物名・部屋番号</Label>
                   <Input
                    placeholder="例) ○○マンション101号室"
                    value={customerInfo.building}
                    onChange={(e) => updateField('building', e.target.value)}
                     className="input-standard text-body"
                  />
                </div>
              </div>
            </div>

            {/* 携帯電話番号 */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Label className="text-body font-medium">携帯電話番号</Label>
                <Badge className="text-caption bg-semantic-danger text-semantic-bg">必須</Badge>
              </div>
              <div className="flex items-center space-x-2">
                 <Input
                  placeholder="090"
                  value={customerInfo.mobilePhone1}
                  onChange={(e) => updateField('mobilePhone1', e.target.value)}
                   className="w-20 input-standard text-body"
                />
                <span>-</span>
                 <Input
                  placeholder="1234"
                  value={customerInfo.mobilePhone2}
                  onChange={(e) => updateField('mobilePhone2', e.target.value)}
                   className="w-20 input-standard text-body"
                />
                <span>-</span>
                 <Input
                  placeholder="5678"
                  value={customerInfo.mobilePhone3}
                  onChange={(e) => updateField('mobilePhone3', e.target.value)}
                   className="w-20 input-standard text-body"
                />
              </div>
               {errors.mobilePhone1 && (
                <p className="text-semantic-danger text-caption mt-1">{errors.mobilePhone1}</p>
               )}
            </div>

            {/* 自宅電話番号 */}
            <div>
              <Label className="text-body font-medium">自宅電話番号</Label>
              <div className="flex items-center space-x-2">
                 <Input
                  placeholder="03"
                  value={customerInfo.homePhone1}
                  onChange={(e) => updateField('homePhone1', e.target.value)}
                   className="w-20 input-standard text-body"
                />
                <span>-</span>
                 <Input
                  placeholder="1234"
                  value={customerInfo.homePhone2}
                  onChange={(e) => updateField('homePhone2', e.target.value)}
                   className="w-20 input-standard text-body"
                />
                <span>-</span>
                 <Input
                  placeholder="5678"
                  value={customerInfo.homePhone3}
                  onChange={(e) => updateField('homePhone3', e.target.value)}
                   className="w-20 input-standard text-body"
                />
              </div>
            </div>

            {/* メールアドレス */}
            <div>
              <div className="mb-4">
                <p className="text-caption text-semantic-fg-subtle">
                  ※メールアドレスは、Web申込み専用ページログイン時のIDとなります。
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Label className="text-body font-medium">Web申込み専用ページID</Label>
                    <Badge className="text-caption bg-semantic-danger text-semantic-bg">必須</Badge>
                  </div>
                  <Input
                    type="email"
                    placeholder="例) hoken@gmail.com"
                    value={customerInfo.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className={`input-standard text-body ${errors.email ? 'border-semantic-danger' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label className="text-body font-medium">確認のため再度入力してください</Label>
                  <Input
                    type="email"
                    placeholder="例) hoken@gmail.com"
                    value={customerInfo.emailConfirm}
                    onChange={(e) => updateField('emailConfirm', e.target.value)}
                    className={`input-standard text-body ${errors.emailConfirm ? 'border-semantic-danger' : ''}`}
                  />
                  {errors.emailConfirm && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.emailConfirm}</p>
                  )}
                </div>
              </div>
            </div>

            {/* パスワード */}
            <div>
              <div className="mb-4">
                <p className="text-caption text-semantic-fg-subtle">
                  半角のアルファベットと数字を組み合わせて6文字以上で入力してください。
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Label className="text-body font-medium">パスワード</Label>
                    <Badge className="text-caption bg-semantic-danger text-semantic-bg">必須</Badge>
                  </div>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={customerInfo.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className={`input-standard text-body pr-10 ${errors.password ? 'border-semantic-danger' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <Label className="text-body font-medium">確認のため再度入力してください</Label>
                  <div className="relative">
                    <Input
                      type={showPasswordConfirm ? "text" : "password"}
                      value={customerInfo.passwordConfirm}
                      onChange={(e) => updateField('passwordConfirm', e.target.value)}
                      className={`input-standard text-body pr-10 ${errors.passwordConfirm ? 'border-semantic-danger' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPasswordConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.passwordConfirm && (
                    <p className="text-semantic-danger text-caption mt-1">{errors.passwordConfirm}</p>
                  )}
                </div>
              </div>

              {/* パスワードセキュリティ注意事項 */}
              <div className="mt-4 p-4 rounded-lg border border-semantic-border bg-semantic-bg">
                <p className="text-body font-medium mb-2">
                  以下の点に留意いただき、より安全なパスワードの設定・管理をお願いします。
                </p>
                <ul className="text-caption text-semantic-fg-subtle space-y-1">
                  <li>・電話番号や誕生日など推測されやすいパスワードの設定はお控えください</li>
                  <li>・他サービスとは異なるパスワードの設定をお願いします</li>
                  <li>・パスワードを適切に管理し、漏洩しないようにご注意ください</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 注意事項 */}
        <div className="mt-6 space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-caption text-semantic-fg-subtle">
              当社のシステム上登録できない字体については、登録可能な漢字かカタカナでの登録となることをご了承ください(保障内容やご契約後の諸手続き等に影響はありません)。
            </AlertDescription>
          </Alert>
          
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-caption text-semantic-fg-subtle">
              ご選択いただいたお申込みプランは、お客様情報の登録後にご確認・ご変更いただけます。
            </AlertDescription>
          </Alert>
        </div>

        {/* アクションボタン */}
        <div className="mt-8 space-y-4">
          <Button 
            onClick={handleSubmit}
            className="w-full py-4 text-body button-standard focus-ring transition-normal bg-semantic-accent text-semantic-bg"
            size="lg"
          >
            お客様情報の確認へ進む
          </Button>
          
          {Object.keys(errors).length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                入力内容に誤りがあります。上記のエラーメッセージをご確認ください。
              </AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={handleBack}
            variant="outline" 
            className="w-full button-standard focus-ring transition-normal"
            size="lg"
          >
            戻る
          </Button>
        </div>
      </div>

      {/* 旧フッター余白・罫線を削除 */}
      <div className="bg-white border-t"></div>
      <MedicalFooter />
    </div>
  )
} 