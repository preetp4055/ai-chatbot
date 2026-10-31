export const chatWithAI = async (messages: any[]) => {
  const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3",
      messages: messages,
      stream: false,
    }),
  });

  const data = await response.json();
  return data.message.content;
};