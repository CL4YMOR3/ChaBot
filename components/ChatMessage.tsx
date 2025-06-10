interface ChatMessageProps {
  message: string
  isUser: boolean
  timestamp: Date
}

export default function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          isUser
            ? "bg-emerald-500 text-white rounded-br-md"
            : "bg-emerald-50 text-emerald-900 rounded-bl-md border border-emerald-100"
        }`}
      >
        <p className="text-sm leading-relaxed">{message}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-emerald-100" : "text-emerald-400"}`}>
          {timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  )
}
