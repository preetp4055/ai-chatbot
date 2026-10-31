import { Router,  Request, Response } from "express";
import { chatWithAI } from "../services/chatservice.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages) {
       res.status(400).json({ error: "Messages required" });
       return
    }

    const reply = await chatWithAI(messages);

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error chatting with AI" });
  }
});

export default router;