import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function IaPannel({ onClose }) {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: "Bonjour! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui?",
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: "user", text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/genai/ask", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: input,
                    history: messages, // Envoi de l'historique pour le contexte
                }),
            });

            const data = await response.json();

            if (data.response) {
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", text: data.response },
                ]);
            } else {
                setMessages((prev) => [
                    ...prev,
                    {
                        role: "assistant",
                        text: "Désolé, une erreur est survenue.",
                    },
                ]);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", text: "Erreur de connexion au serveur." },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        setMessages([
            {
                role: "assistant",
                text: "Bonjour! Je suis votre assistant IA. Comment puis-je vous aider aujourd'hui?",
            },
        ]);
    };

    return (
        <div className="absolute right-4 bottom-21 w-100 h-126 flex flex-col bg-[#ECE9D8] border-2 border-[#0058EE] rounded-t-lg shadow-2xl z-50 font-sans overflow-hidden">
            {/* En-tête du panneau IA style XP */}
            <div className="bg-linear-to-r from-[#0058EE] to-[#3A93FF] text-white p-2 flex justify-between items-center select-none rounded-t-md">
                <div className="flex items-center gap-2">
                    <span className="font-bold italic text-shadow-sm">
                        Assistant IA
                    </span>
                </div>
                <div className="flex gap-1">
                    <button
                        onClick={handleNewChat}
                        className="w-5 h-5 bg-[#ECE9D8] border border-white rounded shadow-sm flex items-center justify-center hover:bg-white active:bg-[#D4D0C8] transition-colors cursor-pointer"
                        title="Nouvelle conversation"
                    >
                        <span className="text-black text-xs font-bold leading-none">
                            ⟳
                        </span>
                    </button>
                    <button
                        onClick={onClose}
                        className="w-5 h-5 bg-[#D7402B] border border-white rounded shadow-sm flex items-center justify-center hover:bg-[#FF6050] active:bg-[#B02010] transition-colors cursor-pointer"
                    >
                        <span className="text-white text-xs font-bold leading-none">
                            ✕
                        </span>
                    </button>
                </div>
            </div>

            {/* Contenu principal du panneau IA */}
            <div className="flex-1 p-4 overflow-y-auto bg-white border-2 border-[#D8D8D8] m-2 mb-0 shadow-inner">
                <div className="space-y-4 text-sm">
                    {messages.map((msg, index) => (
                        <div key={index}>
                            <p
                                className={`font-bold ${
                                    msg.role === "user"
                                        ? "text-blue-800"
                                        : "text-green-700"
                                }`}
                            >
                                {msg.role === "user"
                                    ? "Utilisateur:"
                                    : "Assistant IA:"}
                            </p>
                            <div className="text-gray-700">
                                <ReactMarkdown
                                    remarkPlugins={[remarkGfm]}
                                    components={{
                                        ul: ({ node, ...props }) => (
                                            <ul
                                                className="list-disc pl-4"
                                                {...props}
                                            />
                                        ),
                                        ol: ({ node, ...props }) => (
                                            <ol
                                                className="list-decimal pl-4"
                                                {...props}
                                            />
                                        ),
                                        a: ({ node, ...props }) => (
                                            <a
                                                className="text-blue-600 hover:underline"
                                                {...props}
                                            />
                                        ),
                                        p: ({ node, ...props }) => (
                                            <p className="mb-2" {...props} />
                                        ),
                                        code: ({
                                            node,
                                            inline,
                                            className,
                                            children,
                                            ...props
                                        }) => {
                                            return inline ? (
                                                <code
                                                    className="bg-gray-200 px-1 rounded text-xs font-mono"
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            ) : (
                                                <code
                                                    className="block bg-gray-100 p-2 rounded text-xs overflow-x-auto font-mono my-2 border border-gray-300"
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {msg.text}
                                </ReactMarkdown>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div>
                            <p className="font-bold text-green-700">
                                Assistant IA:
                            </p>
                            <p className="text-gray-500 italic">
                                En train d'écrire...
                            </p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Zone de saisie utilisateur */}
            <div className="p-2">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleSendMessage()
                        }
                        placeholder="Tapez votre message ici..."
                        className="flex-1 p-1 border-2 border-[#7F9DB9] rounded-sm text-sm focus:outline-none focus:border-blue-500"
                        disabled={isLoading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={isLoading}
                        className="px-3 py-1 bg-gray-100 border border-gray-400 rounded shadow-sm hover:bg-white active:bg-gray-200 text-sm text-gray-800 disabled:opacity-50"
                    >
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    );
}
