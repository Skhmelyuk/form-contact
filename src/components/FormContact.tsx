import { useForm, type SubmitHandler } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"

interface Form {
  name: string
  email: string
  message: string
}

export const FormContact = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>()

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full min-w-md rounded-3xl border border-border bg-amber-700 p-6 text-blue-600 dark:bg-green-700 dark:text-fuchsia-800">
      <h1 className="mb-4 text-xl font-bold">Форма зворотнього зв'язку</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label>Вашу ім'я</Label>
          <Input
            className="bg-white"
            type="text"
            {...register("name", {
              required: "Ім'я є обов'язковим",
              minLength: {
                value: 5,
                message: "довжина має бути більше 5 символів",
              },
              maxLength: {
                value: 25,
                message: "довжина має бути не більша 25 символів",
              },
            })}
          />
          {errors.name ? (
            <p className="text-sm text-red-700">{errors.name.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Електрона пошта</Label>
          <Input
            className="bg-white"
            type="email"
            {...register("email", {
              required: "Електрона почта є обов'язкова",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Некоректний формат почти",
              },
            })}
          />
          {errors.email ? (
            <p className="text-sm text-red-700">{errors.email.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Повідомлення</Label>
          <Textarea
            className="bg-white"
            {...register("message", {
              required: "Повідомлення є обов'язкова",
            })}
          />
          {errors.message ? (
            <p className="text-sm text-red-700">{errors.message.message}</p>
          ) : (
            ""
          )}
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Відправити
        </Button>
      </form>
      <div className="absolute bottom-5 left-5 flex flex-col gap-2 border-2 border-amber-600 p-5">
        <p className="text-red-600">{watch("name")}</p>
        <p className="text-green-600">{watch("email")}</p>
        <p className="text-blue-700">{watch("message")}</p>
      </div>
    </div>
  )
}
