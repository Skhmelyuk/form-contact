import { Button } from "@/components/ui/button"
import { useTheme } from "./components/theme-provider"
import { Sun, Moon } from "lucide-react"
import { FormContact } from "./components/FormContact"

export function App() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="absolute top-5 right-5 flex items-center gap-4">
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </div>
      <div>
        <FormContact />
      </div>
    </div>
  )
}

export default App
