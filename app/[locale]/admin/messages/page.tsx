"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Mail, ArrowLeft } from "lucide-react";

interface Message {
    id: string;
    service_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    id_number: string;
    company: string;
    message: string;
    created_at: string;
}

export default function AdminMessages({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [locale, setLocale] = useState<string>("");

    useEffect(() => {
        const getLocale = async () => {
            const { locale } = await params;
            setLocale(locale);
        };
        getLocale();
    }, [params]);

    useEffect(() => {
        if (locale) {
            fetchMessages();
            // Refresh messages every 30 seconds
            const interval = setInterval(fetchMessages, 30000);
            return () => clearInterval(interval);
        }
    }, [locale]);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch("/api/admin/messages");
            if (response.status === 401) {
                router.push(`/${locale}/admin/login`);
                return;
            }

            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }

            const data = await response.json();
            // Data is already sorted by created_at DESC from the API
            if (Array.isArray(data)) {
                setMessages(data);
            } else {
                console.warn("Messages response is not an array:", data);
                setMessages([]);
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Failed to fetch messages";
            setError(errorMsg);
            console.error("Fetch error:", err);
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this message?")) return;

        try {
            setDeleting(id);
            const response = await fetch("/api/admin/messages", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                setMessages(messages.filter((msg) => msg.id !== id));
                setSelectedMessage(null);
            } else {
                setError("Failed to delete message");
            }
        } catch (err) {
            setError("An error occurred");
            console.error(err);
        } finally {
            setDeleting(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => router.push(`/${locale}/admin/dashboard`)}
                            className="flex items-center space-x-2 hover:bg-slate-700 px-3 py-2 rounded-lg transition"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </button>
                        <h1 className="text-3xl font-bold flex items-center space-x-2">
                            <Mail className="w-8 h-8" />
                            <span>Messages ({messages.length})</span>
                        </h1>
                        <div />
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="text-center text-slate-600">Loading messages...</div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Messages List */}
                        <div className="md:col-span-1 space-y-2">
                            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
                                {messages.length === 0 ? (
                                    <div className="text-center text-slate-600 py-8">
                                        No messages
                                    </div>
                                ) : (
                                    messages.map((message) => (
                                        <button
                                            key={message.id}
                                            onClick={() => setSelectedMessage(message)}
                                            className={`w-full text-left p-4 rounded-lg transition cursor-pointer ${selectedMessage?.id === message.id
                                                    ? "bg-yellow-100 border-2 border-yellow-500"
                                                    : "bg-white border border-slate-200 hover:bg-slate-50"
                                                }`}
                                        >
                                            <div className="flex items-start space-x-2">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold truncate text-slate-900">
                                                        {message.first_name} {message.last_name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 truncate">
                                                        {message.email}
                                                    </p>
                                                    <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Message Detail */}
                        <div className="md:col-span-2">
                            {selectedMessage ? (
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div>
                                            <h2 className="text-2xl font-bold text-slate-900">
                                                {selectedMessage.first_name} {selectedMessage.last_name}
                                            </h2>
                                            <p className="text-slate-600 text-sm mt-1">
                                                <strong>Company:</strong> {selectedMessage.company || "N/A"}
                                            </p>
                                            <p className="text-slate-600 text-sm">
                                                <strong>Service:</strong> {selectedMessage.service_id}
                                            </p>
                                            <a
                                                href={`mailto:${selectedMessage.email}`}
                                                className="text-blue-600 hover:text-blue-800 underline text-sm block mt-2"
                                            >
                                                {selectedMessage.email}
                                            </a>
                                            <p className="text-slate-600 text-sm">
                                                <strong>Phone:</strong> {selectedMessage.phone}
                                            </p>
                                            {selectedMessage.id_number && (
                                                <p className="text-slate-600 text-sm">
                                                    <strong>ID Number:</strong> {selectedMessage.id_number}
                                                </p>
                                            )}
                                            <p className="text-sm text-slate-500 mt-2">
                                                {new Date(selectedMessage.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(selectedMessage.id)}
                                            disabled={deleting === selectedMessage.id}
                                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>

                                    <div className="border-t pt-6">
                                        <h3 className="font-semibold text-slate-900 mb-3">Message</h3>
                                        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                                            {selectedMessage.message}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex space-x-4">
                                        <button
                                            onClick={() => {
                                                window.location.href = `mailto:${selectedMessage.email}`;
                                            }}
                                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition"
                                        >
                                            Reply
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg shadow-md p-8 text-center text-slate-600">
                                    <Mail className="w-16 h-16 mx-auto mb-4 opacity-30" />
                                    <p>Select a message to view details</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
