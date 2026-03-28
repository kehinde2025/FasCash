import { NextRequest, NextResponse } from "next/server";

// Telegram API URLs
const TELEGRAM_API = "https://api.telegram.org";

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      throw new Error("Bot token or chat ID not set in environment variables");
    }

    // First, send text message with all non-file fields
    const textEntries: string[] = [];
    const files: { key: string; file: Blob }[] = [];

    data.forEach((value, key) => {
      if (value instanceof Blob) {
        files.push({ key, file: value });
      } else {
        textEntries.push(`${key}: ${value}`);
      }
    });

    if (textEntries.length > 0) {
      const text = textEntries.join("\n");
      await fetch(`${TELEGRAM_API}/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      });
    }

    // Then, send uploaded files one by one
    for (const { key, file } of files) {
      const formData = new FormData();
      formData.append("chat_id", chatId);
      // Convert Blob to File-like object for Telegram
      formData.append("document", file, key + ".jpg");

      await fetch(`${TELEGRAM_API}/bot${botToken}/sendDocument`, {
        method: "POST",
        body: formData,
      });
    }

    return NextResponse.json({ ok: true, message: "All data sent to Telegram" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}