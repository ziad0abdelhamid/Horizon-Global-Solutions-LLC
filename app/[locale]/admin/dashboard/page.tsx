"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Layout, LogOut, Home } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [locale, setLocale] = useState<string>("");

    useEffect(() => {
        // Check if user has a valid token
        const checkAuth = async () => {
            const { locale } = await params;
            setLocale(locale);
            try {
                const response = await fetch("/api/admin/messages");
                if (response.status === 401) {
                    router.push(`/${locale}/admin/login`);
                } else {
                    setIsAuthenticated(true);
                }
            } catch {
                router.push(`/${locale}/admin/login`);
            }
        };

        checkAuth();
    }, [params, router]);

    const handleLogout = () => {
        // Clear the token cookie by setting it to empty
        document.cookie =
            "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        router.push(`/${locale}/admin/login`);
    };

    if (!isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-right justify-between">
                        <div className="flex items-center space-x-3">
                            <Layout className="w-8 h-8" />
                            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        </div>
                        <div>
                            <Link
                                href={`/${locale}`}
                                className="flex cursor-pointer items-center space-x-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                            >
                                <Home className="w-5 h-5" />Back To Website
                            </Link>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex cursor-pointer items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>

                    </div>
                </div>
            </header>

            {/* Navigation */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8" aria-label="Admin Navigation">
                        <a
                            href={`/${locale}/admin/projects`}
                            className="py-4 px-1 border-b-2 border-yellow-500 font-medium text-slate-900 hover:border-yellow-600"
                        >
                            Projects
                        </a>
                        <a
                            href={`/${locale}/admin/messages`}
                            className="py-4 px-1 border-b-2 border-transparent font-medium text-slate-600 hover:text-slate-900 hover:border-slate-300"
                        >
                            Messages
                        </a>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Projects Card */}
                    <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Projects</h2>
                        <p className="text-slate-600 mb-6">
                            Manage your portfolio projects. Add, edit, or delete projects.
                        </p>
                        <a
                            href={`/${locale}/admin/projects`}
                            className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition"
                        >
                            Manage Projects
                        </a>
                    </div>

                    {/* Messages Card */}
                    <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition">
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Messages</h2>
                        <p className="text-slate-600 mb-6">
                            View all messages sent through the contact form.
                        </p>
                        <a
                            href={`/${locale}/admin/messages`}
                            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg hover:shadow-lg transition"
                        >
                            View Messages
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
