import { useForm, type SubmitHandler } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const FormShema = z.object({
  name: z
    .string()
    .min(3, "Довжина має бути більше 3 символів")
    .max(25, "Довжина має бути не більша 25 символів"),
  email: z
    .string()
    .min(1, "Поле має бути обов'язковим")
    .email("Некоректний email"),
  message: z.string().min(10, "Повідомлення має містити більше 10 символів"),
})

type Form = z.infer<typeof FormShema>

export const FormContact = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(FormShema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data)
  }

  return (
    <div className="w-full min-w-md rounded-3xl border border-border bg-amber-700 p-6 text-blue-600 dark:bg-green-700 dark:text-fuchsia-800">
      <h1 className="mb-4 text-xl font-bold">Форма зворотнього зв'язку</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <Label>Вашу ім'я</Label>
          <Input className="bg-white" type="text" {...register("name")} />
          {errors.name ? (
            <p className="text-sm text-red-700">{errors.name.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Електрона пошта</Label>
          <Input className="bg-white" type="email" {...register("email")} />
          {errors.email ? (
            <p className="text-sm text-red-700">{errors.email.message}</p>
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Повідомлення</Label>
          <Textarea className="bg-white" {...register("message")} />
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
