"use client";
import React, { useEffect, useState } from 'react';
import Sidebar from "@/app/components/Sidebar";
import { useRouter } from 'next/navigation';
import Loading from '@/app/components/Loading/Loading';
import { toast } from 'sonner';

/**
 * Represents the response object for the getUser function.
 */
interface UserResponse {
    user: string | null;
    error: Error | null;
}

/**
 * Represents the sub layout component.
 * @param children - The child components to render.
 * @returns The rendered sub layout component.
 */
export default function SubLayout({ children }: { children: React.ReactNode }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const { push } = useRouter();

    /**
     * Toggles the sidebar expansion state.
     */
    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        (async () => {
            const { user, error } = await getUser();

            if (error) {
                toast.error('Failed to fetch user', { description: error.message });
                push("/auth/login");
                return;
            }

            setIsSuccess(true);
        })();
    }, [push]);

    if (!isSuccess) {
        return <Loading />;
    }

    return (
        <main className="flex">
            <Sidebar isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
            <div className={`flex-grow transition-all px-auto sm:px-2 md:p-3 lg:px-5 mt-3 duration-300 vh-100 ${isExpanded ? 'ml-64' : 'ml-20'}`}>
                {children}
            </div>
        </main>
    );
}

/**
 * Fetches the user data from the server.
 * @returns A promise that resolves to the user response object.
 */
async function getUser(): Promise<UserResponse> {
    try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors || "Failed to fetch user");
        }

        return {
            user: data,
            error: null,
        };
    } catch (error: any) {
        return {
            user: null,
            error,
        };
    }
}
