"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from "@/app/components/Input/Input";
import { toast } from "sonner";
import Button from "@/app/components/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleList, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const Login: React.FC = () => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const { push } = useRouter();

    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/auth/me");
            const data = await response.json();

            if (response.ok) {
                push('/app/admin/dashboard');
                toast.info('User Already logged in!', { description: 'Redirecting to dashboard' });
                return;
            }

            setIsSuccess(true);
        })();
    }, [push]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const apiUrl = '/api/auth/login';
        const body = {
            type: 'school',
            ...formState
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Login successful!');
                localStorage.setItem('udat', JSON.stringify(result));
                push('/app/admin/dashboard');
            } else {
                toast.error('Login unsuccessful!', { description: result.message });
            }
        } catch (error) {
            console.error('Error during login', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (!isSuccess) {
        return null;
    }

    return (
        <section className='bg-sec vh-100 flex justify-center align-items-center'>
            <form onSubmit={handleSubmit}
                className="p-4 m-2 w-full md:max-w-3xl md:mx-auto bg-white rounded drop-shadow-lg border-pri border-4">
                <h1 className="text-5xl font-bold my-[50px] text-center">Login</h1>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <div className="form-group">
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            label="Username"
                            placeholder="Enter username"
                            value={formState.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="Enter password"
                            value={formState.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div
                    className='flex flex-col mt-5 mb-3 md:flex-row md:justify-between gap-14 md:gap-24 align-items-center'>
                    <span>
                        <Button icon={<FontAwesomeIcon icon={faRightToBracket} />} type='submit' size={'md'} color={'pri'}>
                            Login
                        </Button>
                    </span>
                    <span className='text-center justify-self-end'>Don&apos;t have an account?
                        &nbsp; <Button icon={<FontAwesomeIcon icon={faRectangleList} />} className='justify-self-end mx-0' color={'sec'} size={'md'}
                            variant={'outline'} onClick={() => push('/auth/register')}>
                            Register
                        </Button>
                    </span>


                </div>
            </form>
        </section>
    );
};

export default Login;
