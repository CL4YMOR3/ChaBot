export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.text()
    return data
  } catch (error) {
    console.error("Error sending message:", error)
    throw new Error("Failed to send message. Please check if the Flask backend is running.")
  }
}
