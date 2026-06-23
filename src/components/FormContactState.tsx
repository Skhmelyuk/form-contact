import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export const FormContactState = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    // Валідація імені
    if (!name) {
      newErrors.name = "Довжина має бути більше 3 символів"
    } else if (name.length < 3) {
      newErrors.name = "Довжина має бути більше 3 символів"
    } else if (name.length > 25) {
      newErrors.name = "Довжина має бути не більша 25 символів"
    }

    // Валідація email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      newErrors.email = "Поле має бути обов'язковим"
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Некоректний email"
    }

    // Валідація повідомлення
    if (!message || message.length < 10) {
      newErrors.message = "Повідомлення має містити більше 10 символів"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log({ name, email, message })
    }
  }

  return (
    <div className="w-full min-w-md rounded-3xl border border-border bg-amber-700 p-6 text-blue-600 dark:bg-green-700 dark:text-fuchsia-800">
      <h1 className="mb-4 text-xl font-bold">Форма зворотнього зв'язку (State)</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label>Вашу ім'я</Label>
          <Input 
            className="bg-white" 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
          {errors.name ? (
            <p className="text-sm text-red-700">{errors.name}</p>
          ) : (
            ""
          )}
        </div>
        
        <div className="flex flex-col gap-1.5">
          <Label>Електрона пошта</Label>
          <Input 
            className="bg-white" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          {errors.email ? (
            <p className="text-sm text-red-700">{errors.email}</p>
          ) : (
            ""
          )}
        </div>
        
        <div className="flex flex-col gap-1.5">
          <Label>Повідомлення</Label>
          <Textarea 
            className="bg-white" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
          />
          {errors.message ? (
            <p className="text-sm text-red-700">{errors.message}</p>
          ) : (
            ""
          )}
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Відправити
        </Button>
      </form>
      <div className="absolute bottom-5 left-5 flex flex-col gap-2 border-2 border-amber-600 p-5">
        <p className="text-red-600">{name}</p>
        <p className="text-green-600">{email}</p>
        <p className="text-blue-700">{message}</p>
      </div>
    </div>
  )
}
