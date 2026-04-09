import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      className="toaster group font-segoe"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#1f1f1f] group-[.toaster]:text-white group-[.toaster]:border-[#333] group-[.toaster]:border group-[.toaster]:shadow-2xl group-[.toaster]:rounded-none group-[.toaster]:p-0 group-[.toaster]:w-[360px] group-[.toaster]:overflow-hidden",
          description: "group-[.toast]:text-gray-400 group-[.toast]:text-xs group-[.toast]:px-4 group-[.toast]:pb-4",
          actionButton:
            "group-[.toast]:bg-[#333] group-[.toast]:text-white group-[.toast]:rounded-none",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-none",
          title: "group-[.toast]:text-sm group-[.toast]:font-semibold group-[.toast]:px-4 group-[.toast]:pt-3 group-[.toast]:mb-1",
          icon: "group-[.toast]:text-win-accent group-[.toast]:ml-4 group-[.toast]:mt-3",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
