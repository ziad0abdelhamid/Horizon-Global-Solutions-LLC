"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRoute({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const router = useRouter();

    useEffect(() => {
        const redirect = async () => {
            const { locale } = await params;
            router.push(`/${locale}/admin/dashboard`);
        };
        redirect();
    }, [params, router]);

    return null;
}
