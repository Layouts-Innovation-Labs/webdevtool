/**
 * This file represents the layout component for the application.
 * It imports necessary dependencies and defines the RootLayout component.
 */
"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/custom.scss';
import {Inter} from 'next/font/google';
import './globals.css';
import {Toaster, toast} from 'sonner';

const inter = Inter({subsets: ['latin']});

/**
 * Represents the root layout component.
 * @param children - The child components to be rendered within the layout.
 * @returns The JSX element representing the root layout.
 */
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className + "container"}>
        <main>{children}</main>
        <Toaster
            duration={5000}
            position={'top-center'}
            expand={false}
            closeButton={true}
            richColors={true}
        />
        </body>
        </html>
    );
}
