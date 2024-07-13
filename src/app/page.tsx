/**
 * This file contains the code for the Home page component of the Eduamor web application.
 * The Home component displays the hero section, features section, and about section of the page.
 * It also includes form handling functionality for user input.
 */

"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAnglesRight,
    faChalkboardTeacher,
    faChalkboardUser,
    faClock,
    faGlobe,
    faHourglassStart,
    faLock,
    faPaperPlane,
    faSchoolFlag,
    faShieldAlt,
    faUser,
    faUserGraduate
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/app/components/Navbar";
import BenefitCard from "@/app/components/Cards/BenefitCard";
import AppReport from "@/app/components/AppReport";
import Input from "@/app/components/Input/Input";
import Textarea from "@/app/components/Input/TextArea";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "@/app/components/Button";
import { useRouter } from "next/navigation";

/**
 * The Home component is the main page of the Eduamor web application.
 * It displays the hero section, features section, and about section of the page.
 * It also includes form handling functionality for user input.
 */
export default function Home() {

    const router = useRouter()

    const features = [
        {
            icon: faUserGraduate,
            title: 'Feature 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod.',
        },
        {
            icon: faChalkboardUser,
            title: 'Feature 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod.',
        },
        {
            icon: faSchoolFlag,
            title: 'Feature 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod.',
        },
        {
            icon: faUserGraduate,
            title: 'Feature 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod.',
        },
        {
            icon: faChalkboardUser,
            title: 'Feature 5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod.',
        },
        {
            icon: faSchoolFlag,
            title: 'Feature 6',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quod.',
        },
    ];

    const benefitsData = [
        {
            title: 'Centralized Management',
            description: 'Streamline academic and financial records in one platform.',
            icon: faGlobe,
        },
        {
            title: 'Real-Time Updates',
            description: 'Get instant updates on academic performance and financial status.',
            icon: faClock,
        },
        {
            title: 'User-Friendly Interface',
            description: 'Easy navigation for students, parents, and administrators.',
            icon: faUser,
        },
        {
            title: 'Enhanced Communication',
            description: 'Efficient communication channels between all stakeholders.',
            icon: faChalkboardTeacher,
        },
        {
            title: 'Advanced Security',
            description: 'Protect sensitive data with robust security measures.',
            icon: faShieldAlt,
        },
        {
            title: 'Tailored Solutions',
            description: 'Designed specifically for the unique requirements of Nigerian high schools.',
            icon: faLock,
        },
    ];

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    /**
     * Handles the change event for input fields and updates the form data state.
     * @param e - The change event object
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    /**
     * Handles the form submission event and logs the form data to the console.
     * @param e - The form submission event object
     */
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };

    /**
     * Resets the form data state to empty values.
     */
    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            message: ''
        });
    };


    return (
        <>
            <Navbar />
            <section id='hero' className='position-relative bg-gradient-to-r from-pri via-inf to-inf-500  h-screen'>
                <div className='h-screen flex flex-col z-10 justify-center items-center font-PolySans relative'>
                    <h1 className='text-center animate-slideInTop my-7 text-4xl md:text-8xl font-extrabold leading-normal'>
                        Welcome to <span className='font-Playwrite italic text-pri'>Eduamor</span>
                    </h1>
                    <h3 className='animate-slideInBottom text-center font-light lg:font-bold text-xl lg:text-3xl font-Fira italic text-muted'>
                        Empowering educators with seamless management tools
                    </h3>
                    <div className='flex md:flex-wrap py-4 md:p-5 gap-6 justify-center items-center'>
                        <Button icon={<FontAwesomeIcon icon={faAnglesRight} />} className='animate-slideInRight' onClick={() => router.push('#about')} variant={'outline'} color={'sec'}
                            size={'md'}>Learn
                            more...
                        </Button>
                        <Button icon={<FontAwesomeIcon icon={faHourglassStart} />} className='animate-slideInLeft' onClick={() => router.push('/auth/register')} color={'pri'} size={'md'}
                        >Get Started
                        </Button>
                    </div>
                    <AppReport />
                </div>

                <div
                    className="shadow-sec-glow border-4 border-sec-200 container mx-auto absolute bottom-[-145px] left-1/2 transform -translate-x-1/2 bg-light text-sec p-4 lg:p-5 rounded-5 text-center">
                    <h2 className="text-xl lg:text-5xl font-PolySans text-dark">Transforming Learning with Passion</h2>
                    <p className="mt-4 lg:text-2xl">
                        Eduamor is a comprehensive web application designed to streamline the management of high school
                        data in
                        Nigeria. It offers a centralized platform for managing academic and financial records, catering
                        to the needs
                        of students,
                        parents, and school administrators.
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section id='features' className='bg-sec-200 text-white'>
                <article className='container py-[100px] pb-[200px]'>
                    <div className='my-5 pt-5'>
                        <h3 className='text-center my-7 text-5xl font-extrabold leading-normal'>Features</h3>
                        <div className='lg:grid xl:grid-cols-3 lg:grid-cols-2'>
                            {features.map((feature, index) => (
                                <div key={index} className='p-3'>
                                    <div
                                        className='flex flex-row justify-between rounded-5 border-dashed shadow-sec border-2 border-pri-300 w-full h-full'>
                                        <div className='p-5 rounded-5 w-100 m-3 bg-sec'>
                                            <FontAwesomeIcon icon={feature.icon} className='text-pri w-full h-full' />
                                        </div>
                                        <div className='p-2 text-white'>
                                            <h3 className='text-white text-3xl font-extrabold leading-normal'>{feature.title}</h3>
                                            <p className='text-white text-lg font-Fira italic'>{feature.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </article>
            </section>

            {/* About Section */}
            <section id='about'
                className='container my-52 flex flex-col md:grid md:grid-cols-2 rounded-5 md:gap-14 bg-sec-900 text-light p-5'>
                <section id="about" className=" text-justify ">
                    <h3 className="text-5xl font-Playwrite text-pri-600">About Eduamor</h3>
                    <p className="mt-5 text-xl leading-loose">
                        Eduamor enables students to access and update their academic performance results in real time,
                        view their
                        financial records,
                        and receive timely notifications. Parents can stay informed about their child&apos;s progress
                        and financial
                        status,
                        while school administrators benefit from an efficient system for managing student data,
                        generating
                        reports,
                        and facilitating communication between all stakeholders.
                    </p>
                </section>
                <section className=' text-justify'>
                    <section id="solutions" className="container rounded-top-5 bg-suc-800 p-5">
                        <h3 className="text-3xl font-Playwrite text-pri-600">Solutions</h3>
                        <p className="mt-4 text-justify">
                            Eduamor addresses the lack of centralized and efficient management of student academic and
                            financial
                            records,
                            and facilitates effective communication between students, parents, and school
                            administration.
                        </p>
                    </section>
                    <section id="value" className="container rounded-bottom-5 bg-sec-200 p-5">
                        <h3 className="text-3xl font-Playwrite text-pri-600">Unique Value Proposition</h3>
                        <ul className="list-none pl-0 text-start list-inside mt-4">
                            <li className='flex items-center my-3'>
                                <svg className="w-10 h-10 me-2 text-pri dark:text-green-400 flex-shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                Comprehensive data management for Nigerian high schools.
                            </li>
                            <li className='flex items-center my-3'>
                                <svg className="w-10 h-10 me-2 text-pri dark:text-green-400 flex-shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                User-friendly interface for students, parents, and administrators.
                            </li>
                            <li className='flex items-center my-3'>
                                <svg className="w-10 h-10 me-2 text-pri dark:text-green-400 flex-shrink-0"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                </svg>
                                Real-time updates and access to academic and financial records.
                            </li>
                        </ul>
                    </section>
                </section>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="container mb-5 pb-5 pt-5">
                <h3 className="text-3xl font-Playwrite text-center font-bold text-pri-600 mt-5">Benefits and Why Choose
                    Us</h3>
                <div className="text-center m-5">
                    <p className="text-2xl mb-5">EduAmor offers unparalleled advantages that make it the ideal choice
                        for managing
                        high
                        school data</p>
                </div>
                <div
                    className="flex flex-col mx-5 md:mx-0 md:grid md:grid-cols-2 xl:grid-cols-3 gap-28 justify-content-center align-items-center">
                    {benefitsData.map((benefit, index) => (
                        <BenefitCard key={index} title={benefit.title} description={benefit.description}
                            icon={benefit.icon} />
                    ))}
                </div>
            </section>

            {/* Call to action */}
            <section id="cta" className="my-12 bg-pri-500 text-dark py-24 px-3 md:px-0 text-center">
                <h3 className="text-3xl font-Playwrite">Join the EduAmor Revolution</h3>
                <p className="my-5 text-lg">Transform the way you manage high school data. Join us today and experience
                    the
                    future of educational management in Nigeria.</p>
                <Button icon={<FontAwesomeIcon icon={faHourglassStart} />} onClick={() => router.push("/auth/register")} color={'sec'}>
                    Get Started
                </Button>
            </section>

            {/* Contact Section */}
            <section id="contact" className="container py-12">
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg px-6 py-8">
                    <h3 className="text-3xl font-Playwrite text-pri-600 mb-6">Contact Us</h3>

                    <form onSubmit={handleSubmit}>
                        <Input
                            name="name"
                            type="text"
                            label="Full Name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            id={'name'} />

                        <Input
                            id={'email'}
                            name="email"
                            type="email"
                            label="Email Address"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Textarea
                            name="message"
                            label="Message"
                            placeholder="Enter your message"
                            value={formData.message}
                            onChange={handleChange}
                            onReset={handleReset}
                        />

                        <Button icon={<FontAwesomeIcon icon={faPaperPlane} />} color={'sec'} variant={'outline'} size={'md'} type="submit"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-10">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-3xl font-Playwrite text-pri-600">Eduamor</h3>
                        <p className="mt-4">
                            Empowering educators with seamless management tools. Our mission is to enhance the
                            educational experience
                            through innovative technology.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-Playwrite text-pri-600">Contact Us</h3>
                        <p className="mt-4">
                            For more information, please reach out to us at <a href="mailto:info@eduamor.com"
                                className="text-pri-400">info@eduamor.com</a>.
                        </p>
                        <p className="mt-4">Phone: +234 123 456 7890</p>
                        <p className="mt-2">Address: 123 Eduamor Street, Lagos, Nigeria</p>
                    </div>

                    <div>
                        <h3 className="text-2xl font-Playwrite text-pri-600">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            <li><a href="/#about" className="text-pri-400 hover:text-pri-600">About Us</a></li>
                            <li><a href="/#features" className="text-pri-400 hover:text-pri-600">Features</a></li>
                            <li><a href="/#benefits" className="text-pri-400 hover:text-pri-600">Benefits</a></li>
                            <li><a href="/#contact" className="text-pri-400 hover:text-pri-600">Contact</a></li>
                            <li><a href="/faq" className="text-pri-400 hover:text-pri-600">FAQ</a></li>
                        </ul>
                    </div>
                </div>

                <div className="container mx-auto mt-8 border-t border-gray-700 pt-8">
                    <div className="flex justify-center space-x-6">
                        <a href="https://facebook.com" className="text-pri-400 hover:text-pri-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M22.675 0h-21.35C.599 0 0 .6 0 1.325v21.351C0 23.4.599 24 1.325 24h11.495V14.709h-3.13v-3.631h3.13V8.154c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.465.098 2.796.142v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.313h3.587l-.468 3.631h-3.119V24h6.116C23.4 24 24 23.4 24 22.675V1.325C24 .6 23.4 0 22.675 0z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com" className="text-pri-400 hover:text-pri-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M23.954 4.569c-.885.39-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.724-.951.555-2.005.959-3.127 1.184-.897-.959-2.173-1.559-3.59-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.125C7.691 8.094 4.066 6.13 1.64 3.161c-.427.721-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.099-.807-.026-1.566-.248-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.317 0-.626-.03-.927-.086.631 1.953 2.445 3.376 4.604 3.417-1.68 1.318-3.809 2.105-6.102 2.105-.396 0-.79-.023-1.175-.068 2.179 1.396 4.768 2.213 7.557 2.213 9.054 0 14.002-7.496 14.002-13.986 0-.21 0-.423-.015-.635.961-.695 1.8-1.562 2.462-2.548l-.047-.02z" />
                            </svg>
                        </a>
                        <a href="https://linkedin.com" className="text-pri-400 hover:text-pri-600">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M19.016 3H4.985C3.889 3 3 3.889 3 4.985v14.03C3 20.111 3.889 21 4.985 21h14.03C20.111 21 21 20.111 21 19.015V4.985C21 3.889 20.111 3 19.016 3zM8.538 18.188H5.947v-8.188h2.591v8.188zM7.242 8.451c-.838 0-1.516-.678-1.516-1.516 0-.838.678-1.516 1.516-1.516.838 0 1.516.678 1.516 1.516s-.678 1.516-1.516 1.516zM18.188 18.188h-2.591v-4.42c0-1.123-.024-2.565-1.562-2.565-1.563 0-1.801 1.221-1.801 2.484v4.5h-2.592v-8.188h2.492v1.119h.035c.347-.655 1.2-1.343 2.468-1.343 2.638 0 3.125 1.735 3.125 3.992v4.42z" />
                            </svg>
                        </a>
                    </div>
                    <p className="text-center text-sm text-gray-400 mt-4">© 2024 Eduamor. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
}
