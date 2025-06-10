// Your Render backend URL
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://chabot-backend-qdhz.onrender.com'
  : 'http://localhost:5000';

export async function sendMessage(message: string): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      // Try to get error message from response
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        }
      } catch {
        // If response is not JSON, use default error message
      }
      throw new Error(errorMessage);
    }

    // Handle both JSON and text responses
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return data.message || JSON.stringify(data);
    } else {
      const data = await response.text();
      return data;
    }
  } catch (error) {
    console.error("Error sending message:", error);
    
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error("Network error. Please check your internet connection and try again.");
    }
    
    throw new Error(error instanceof Error ? error.message : "Failed to send message. Please try again.");
  }
}

// Health check function (optional)
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("Backend health check failed:", error);
    return false;
  }
}