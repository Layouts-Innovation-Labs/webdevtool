/**
 * Represents the navigation bar component.
 * @component
 */
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPuzzlePiece } from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    const menuItems = [
        { href: "#hero", label: "Home" },
        { href: "#features", label: "Features" },
        { href: "#benefits", label: "Benefits" },
        { href: "#contact", label: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            const handleMenuClick = () => {
                setMobileMenuOpen(false);
                document.body.style.overflow = 'auto';
            };

            const menuLinksElement = document.querySelector('.mobile-menu-links');
            if (menuLinksElement) {
                menuLinksElement.addEventListener('click', handleMenuClick);

                return () => {
                    menuLinksElement.removeEventListener('click', handleMenuClick);
                };
            }
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [mobileMenuOpen]);

    return (
        <nav
            className={`py-3 lg:py-[20px] bg-suc lg:px-5 w-screen fixed top-0 z-50 transition duration-300 ${visible ? 'opacity-100' : 'opacity-0'
                }`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link href={'/'} className="no-underline flex justify-content-center align-items-center">
                    <Image alt='logo' src='/logo.svg' width={40} height={100}/>
                    <h2 className="italic my-auto font-Playwrite ml-2 text-2xl text-sec font-extrabold">
                        Eduamor
                    </h2>
                </Link>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="text-sec focus:outline-none"
                    >
                        <svg
                            className="w-8 h-8 cursor-pointer"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={
                                    mobileMenuOpen
                                        ? 'M6 18L18 6M6 6l12 12'
                                        : 'M4 6h16M4 12h16m-7 6h7'
                                }
                            />
                        </svg>
                    </button>
                </div>

                {/* Desktop Menu Links */}
                <ul className="hidden lg:flex my-auto text-sec font-PolySans">
                    {menuItems.map((item, index) => (
                        <li key={index} className="mr-5">
                            <Link
                                href={item.href}
                                className="text-sec text-xl hover:text-2xl font-bold hover:font-extrabold no-underline"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Links */}
                {mobileMenuOpen && (
                    <div className="lg:hidden transition duration-300 ease-in-out transform animate-slideInLeft fixed top-0 left-0 w-full h-full bg-white z-50">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="position-absolute p-3 m-2 text-2xl right-0"
                        >
                            <svg
                                className="w-8 h-8 cursor-pointer text-2xl"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        mobileMenuOpen
                                            ? 'M6 18L18 6M6 6l12 12'
                                            : 'M6 6l12 12M6 18L18 6'
                                    }
                                />
                            </svg>
                        </button>
                        <ul className="flex flex-col items-center justify-center h-full mobile-menu-links">
                            {menuItems.map((item, index) => (
                                <li key={index} className="my-4">
                                    <Link
                                        href={item.href}
                                        className="text-sec text-xl hover:text-2xl font-bold hover:font-extrabold no-underline"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            <li className="my-4">
                                <Button
                                    onClick={() => router.push("/auth/login")}
                                    color={'pri'}>
                                    Login
                                </Button>
                            </li>
                            <li className="my-4">
                                <Button
                                    onClick={() => router.push("/auth/register")}
                                    color={'sec'}>
                                    Register
                                </Button>
                            </li>
                        </ul>
                    </div>
                )}
                <div className='hidden lg:grid grid-cols-2'>
                    <Button
                        onClick={() => router.push('/auth/login')}
                        color={'pri'} size={'md'}
                    >
                        Login
                    </Button>
                    <Button
                        onClick={() => router.push('/auth/register')}
                        color={'sec'} size={'md'}
                    >
                        Register
                    </Button>
                </div>
            </div>

            {/* <style jsx>{`
                nav {
                    backdrop-filter: blur(20px);
                    background-color: rgba(255, 255, 255, 0.5);
                }
            `}</style> */}
        </nav>
    );
}
