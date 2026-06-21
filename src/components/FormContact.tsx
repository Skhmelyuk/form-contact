import { useForm } from "react-hook-form"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface Form {
  name: string
  email: string
  message: string
}

export const FormContact = () => {
  const { register, watch } = useForm<Form>()

  console.log(register)
  console.log(register("email"))

  return (
    <>
      <form>
        <Input type="text" {...register("name")} />
        <Input type="email" {...register("email")} />
        <Textarea {...register("message")} />
        <Button>Відправити</Button>
      </form>
      <div className="absolute bottom-5 left-5 flex flex-col gap-2 border-2 border-amber-600 p-5">
        <p className="text-red-600">{watch("name")}</p>
        <p className="text-green-600">{watch("email")}</p>
        <p className="text-blue-700">{watch("message")}</p>
      </div>
    </>
  )
}
