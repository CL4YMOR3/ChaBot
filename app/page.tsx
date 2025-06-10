"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import ChatMessage from "@/components/ChatMessage"
import { sendMessage } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Loader2 } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm ChaBot ☕ Welcome to our tea-themed chat experience. How can I help you with your reports or questions today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const botResponse = await sendMessage(inputValue)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble connecting to my backend. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">🍵</span>
            <h1 className="text-2xl font-bold text-emerald-800">ChaBot ☕</h1>
          </div>
          <p className="text-center text-emerald-600 text-sm mt-1">
            Your assistant for reports and queries
          </p>
        </div>
      </header>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 h-[calc(100vh-200px)] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl rounded-bl-md px-4 py-2 max-w-xs">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-500" />
                    <span className="text-emerald-700 text-sm">ChaBot is brewing a response...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-emerald-100 p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me about your reports or any questions..."
                disabled={isLoading}
                className="flex-1 border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400"
              />
              <Button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-emerald-500 mt-2 text-center">Crafted with Love and Chai • Press Enter to send</p>
          </div>
        </div>
      </div>
    </div>
  )
}
