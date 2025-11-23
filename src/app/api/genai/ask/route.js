import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "@/data/aiContext";

// Initialisation du client Gemini avec la clé API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req) {
    try {
        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        // Préparation de l'historique pour Gemini (limité aux 10 derniers échanges)
        // Format attendu par le SDK : { role: 'user' | 'model', parts: [{ text: string }] }
        const formattedHistory = (history || [])
            .slice(-10) // Garde les 10 derniers messages
            .map((msg) => ({
                role: msg.role === "assistant" ? "model" : "user",
                parts: [{ text: msg.text }],
            }));

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Utilisation de 2.5-flash
            config: {
                systemInstruction: {
                    parts: [{ text: SYSTEM_INSTRUCTION }],
                },
            },
            contents: [
                ...formattedHistory,
                {
                    role: "user",
                    parts: [{ text: message }],
                },
            ],
        });

        // Vérification de la structure de la réponse selon le SDK utilisé
        const text =
            typeof response.text === "function"
                ? response.text()
                : response.text;

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error.message },
            { status: 500 }
        );
    }
}
