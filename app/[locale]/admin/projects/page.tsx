"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Edit2, Plus, ArrowLeft } from "lucide-react";

interface Project {
    id: string;
    title: string;
    titleAr?: string;
    desc: string;
    descAr?: string;
    image: string;
    category: string[] | string;
    link?: string;
    details?: string;
    detailsAr?: string;
    images?: string[];
    technologies?: string[];
    role?: string;
    duration?: string;
    challenges?: string;
    keyLearnings?: string;
}

export default function AdminProjects({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const router = useRouter();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editing, setEditing] = useState<Project | null>(null);
    const [deleting, setDeleting] = useState<string | null>(null);
    const [locale, setLocale] = useState<string>("");

    const [formData, setFormData] = useState({
        id: "",
        title: "",
        titleAr: "",
        desc: "",
        descAr: "",
        image: "",
        category: "software",
        link: "",
        details: "",
        detailsAr: "",
        role: "",
        duration: "",
        challenges: "",
        keyLearnings: "",
        technologies: "",
    });

    useEffect(() => {
        const getLocale = async () => {
            const { locale } = await params;
            setLocale(locale);
        };
        getLocale();
    }, [params]);

    const fetchProjects = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const response = await fetch("/api/admin/projects");
            if (response.status === 401) {
                router.push(`/${locale}/admin/login`);
                return;
            }

            if (!response.ok) {
                throw new Error(`API returned ${response.status}`);
            }

            const data = await response.json();
            if (!data.projects) {
                console.warn("No projects in response:", data);
                setProjects([]);
            } else {
                setProjects(data.projects);
            }
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : "Failed to fetch projects";
            setError(errorMsg);
            console.error("Fetch error:", err);
            setProjects([]);
        } finally {
            setLoading(false);
        }
    }, [locale, router]);

    useEffect(() => {
        if (locale) {
            fetchProjects();
        }
    }, [locale, fetchProjects]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const payload = {
                ...formData,
                technologies: formData.technologies
                    .split(",")
                    .map((t) => t.trim())
                    .filter(Boolean),
            };

            const method = editing ? "PUT" : "POST";
            const body = payload;

            const response = await fetch("/api/admin/projects", {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                setShowForm(false);
                setEditing(null);
                setFormData({
                    id: "",
                    title: "",
                    titleAr: "",
                    desc: "",
                    descAr: "",
                    image: "",
                    category: "software",
                    link: "",
                    details: "",
                    detailsAr: "",
                    role: "",
                    duration: "",
                    challenges: "",
                    keyLearnings: "",
                    technologies: "",
                });
                await fetchProjects();
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Failed to save project");
            }
        } catch (err) {
            setError("An error occurred");
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            setDeleting(id);
            const response = await fetch("/api/admin/projects", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (response.ok) {
                await fetchProjects();
            } else {
                setError("Failed to delete project");
            }
        } catch (err) {
            setError("An error occurred");
            console.error(err);
        } finally {
            setDeleting(null);
        }
    };

    const handleEdit = (project: Project) => {
        setEditing(project);
        setFormData({
            id: project.id,
            title: project.title,
            titleAr: project.titleAr || "",
            desc: project.desc,
            descAr: project.descAr || "",
            image: project.image,
            category: Array.isArray(project.category)
                ? project.category[0]
                : project.category,
            link: project.link || "",
            details: project.details || "",
            detailsAr: project.detailsAr || "",
            role: project.role || "",
            duration: project.duration || "",
            challenges: project.challenges || "",
            keyLearnings: project.keyLearnings || "",
            technologies: (project.technologies || []).join(", "),
        });
        setShowForm(true);
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
                        <h1 className="text-3xl font-bold">Manage Projects</h1>
                        <button
                            onClick={() => {
                                setEditing(null);
                                setShowForm(!showForm);
                            }}
                            className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg transition"
                        >
                            <Plus className="w-5 h-5" />
                            <span>{showForm ? "Cancel" : "Add Project"}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                        {error}
                    </div>
                )}

                {showForm && (
                    <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-black">
                        <h2 className="text-2xl font-bold mb-6">
                            {editing ? "Edit Project" : "Add New Project"}
                        </h2>
                        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 text-black">
                            <input
                                type="text"
                                placeholder="Project ID (auto-generated if empty)"
                                value={formData.id}
                                onChange={(e) =>
                                    setFormData({ ...formData, id: e.target.value })
                                }
                                className="col-span-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <input
                                type="text"
                                placeholder="Title (English)"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                required
                                className="col-span-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <input
                                type="text"
                                placeholder="Title (Arabic)"
                                value={formData.titleAr}
                                onChange={(e) =>
                                    setFormData({ ...formData, titleAr: e.target.value })
                                }
                                className="col-span-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <input
                                type="text"
                                placeholder="Description (English)"
                                value={formData.desc}
                                onChange={(e) =>
                                    setFormData({ ...formData, desc: e.target.value })
                                }
                                required
                                className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <input
                                type="text"
                                placeholder="Description (Arabic)"
                                value={formData.descAr}
                                onChange={(e) =>
                                    setFormData({ ...formData, descAr: e.target.value })
                                }
                                className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <input
                                type="text"
                                placeholder="Image URL"
                                value={formData.image}
                                onChange={(e) =>
                                    setFormData({ ...formData, image: e.target.value })
                                }
                                required
                                className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({ ...formData, category: e.target.value })
                                }
                                className="col-span-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="software">Software</option>
                                <option value="webDevelopment">Web Development</option>
                                <option value="mobile">Mobile</option>
                                <option value="other">Other</option>
                            </select>

                            <input
                                type="text"
                                placeholder="Project Link"
                                value={formData.link}
                                onChange={(e) =>
                                    setFormData({ ...formData, link: e.target.value })
                                }
                                className="col-span-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <textarea
                                placeholder="Details (English)"
                                value={formData.details}
                                onChange={(e) =>
                                    setFormData({ ...formData, details: e.target.value })
                                }
                                className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-24"
                            />

                            <textarea
                                placeholder="Details (Arabic)"
                                value={formData.detailsAr}
                                onChange={(e) =>
                                    setFormData({ ...formData, detailsAr: e.target.value })
                                }
                                className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-24"
                            />

                            <input
                                type="text"
                                placeholder="Your Role"
                                value={formData.role}
                                onChange={(e) =>
                                    setFormData({ ...formData, role: e.target.value })
                                }
                                className="col-span-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <input
                                type="text"
                                placeholder="Duration (e.g., 3 months)"
                                value={formData.duration}
                                onChange={(e) =>
                                    setFormData({ ...formData, duration: e.target.value })
                                }
                                className="col-span-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <textarea
                                placeholder="Challenges Faced"
                                value={formData.challenges}
                                onChange={(e) =>
                                    setFormData({ ...formData, challenges: e.target.value })
                                }
                                className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-20"
                            />

                            <textarea
                                placeholder="Key Learnings"
                                value={formData.keyLearnings}
                                onChange={(e) =>
                                    setFormData({ ...formData, keyLearnings: e.target.value })
                                }
                                className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 h-20"
                            />

                            <input
                                type="text"
                                placeholder="Technologies (comma-separated)"
                                value={formData.technologies}
                                onChange={(e) =>
                                    setFormData({ ...formData, technologies: e.target.value })
                                }
                                className="col-span-2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />

                            <button
                                type="submit"
                                className="col-span-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition"
                            >
                                {editing ? "Update Project" : "Add Project"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Projects List */}
                {loading ? (
                    <div className="text-center text-slate-600">Loading...</div>
                ) : projects.length === 0 ? (
                    <div className="text-center text-slate-600 p-8">
                        No projects found. Add your first project!
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {project.title}
                                        </h3>
                                        <p className="text-slate-600 mt-1">{project.desc}</p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {project.technologies?.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(project)}
                                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(project.id)}
                                            disabled={deleting === project.id}
                                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition disabled:opacity-50"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
