import { useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export const FormContactRef = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    const name = nameRef.current?.value || ""
    const email = emailRef.current?.value || ""
    const message = messageRef.current?.value || ""

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
      console.log({
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        message: messageRef.current?.value,
      })
    }
  }

  return (
    <div className="w-full min-w-md rounded-3xl border border-border bg-amber-700 p-6 text-blue-600 dark:bg-green-700 dark:text-fuchsia-800">
      <h1 className="mb-4 text-xl font-bold">Форма зворотнього зв'язку (Ref)</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label>Вашу ім'я</Label>
          <Input 
            ref={nameRef}
            className="bg-white" 
            type="text" 
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
            ref={emailRef}
            className="bg-white" 
            type="email" 
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
            ref={messageRef}
            className="bg-white" 
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
      
      <div className="absolute bottom-5 left-5 flex flex-col gap-2 border-2 border-amber-600 p-5 bg-card/10 backdrop-blur-md">
        <p className="text-xs font-semibold text-amber-900 dark:text-amber-100">
          Примітка: useRef не викликає ререндер при введенні, тому значення з'являться в консолі при сабміті.
        </p>
      </div>
    </div>
  )
}
