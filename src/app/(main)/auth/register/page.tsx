/**
 * This file contains the code for the Institution Registration page component.
 * The component handles the registration form for institutions.
 * It includes form fields for institution name, address, phone number, email address, username, and password.
 * The component makes use of various utility functions and components such as Input, Dropdown, useRouter, useFormState, toast, hashPassword, and Button.
 * The form fields are defined in the `formFields` array.
 * The component checks the availability of the username and email address using the `checkAvailability` function.
 * The `handleInputChange` function handles the input change event and updates the form state accordingly.
 * The `handleSubmit` function handles the form submission event and sends a request to the server to register the institution.
 * If the registration is successful, the user is redirected to the login page.
 * If there are any errors during the registration process, error messages are displayed and the user is notified using toast messages.
 * The component also includes conditional rendering based on the `isSuccess` state.
 */
"use client";
import React, { useState, useEffect } from 'react';
import Input from "@/app/components/Input/Input";
import Dropdown from "@/app/components/Input/Dropdown";
import { useRouter } from 'next/navigation';
import useFormState from "@/app/States/useFormState";
import { toast } from 'sonner';
import { hashPassword } from '@/app/utils/hash';
import Button from '@/app/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleList, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const formFields = [
	{ name: 'institutionName', type: 'text', label: 'Institution Name', placeholder: 'Enter institution name', required: true },
	{ name: 'address', type: 'text', label: 'Address', placeholder: 'Enter address', required: true },
	{ name: 'phoneNumber', type: 'tel', label: 'Phone Number', placeholder: 'Enter phone number', required: true },
	{ name: 'emailAddress', type: 'email', label: 'Email Address', placeholder: 'Enter email address', required: true },
	{ name: 'username', type: 'text', label: 'Username', placeholder: 'Enter username', required: true },
	{ name: 'password', type: 'password', label: 'Password', placeholder: 'Enter password', required: true },
	{ name: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: 'Confirm password', required: true, options: [] },
];

const InstitutionRegistration: React.FC = () => {
	const router = useRouter();
	const { formState, formStateManager } = useFormState();
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [usernameCheck, setUsernameCheck] = useState('');
	const [emailCheck, setEmailCheck] = useState('');

	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			const response = await fetch("/api/auth/me");
			const data = await response.json();

			if (response.ok) {
				router.push('/app/admin/dashboard');
				toast.info('Session active!', { description: 'Redirecting to dashboard' });
				return;
			}

			setIsSuccess(true);
		})();
	}, [router]);

	const checkAvailability = async (field: string, value: string) => {
		try {
			const response = await fetch('/api/checkUser', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ [field]: value }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				setErrors(prevErrors => ({ ...prevErrors, [field]: errorData.message }));
			} else {
				setErrors(prevErrors => {
					const newErrors = { ...prevErrors };
					delete newErrors[field];
					return newErrors;
				});
			}
		} catch (error) {
			console.error('Error checking availability:', error);
		}
	};

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			if (usernameCheck) checkAvailability('username', usernameCheck);
			if (emailCheck) checkAvailability('emailAddress', emailCheck);
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [usernameCheck, emailCheck]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		formStateManager.handleInputChange(e);
		const { name, value } = e.target;

		if (name === 'username') {
			setUsernameCheck(value);
		} else if (name === 'emailAddress') {
			setEmailCheck(value);
		}
	};

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setErrors({});

		const { password, confirmPassword, ...data } = formStateManager.getState();
		if (password !== confirmPassword) {
			setErrors(prevErrors => ({
				...prevErrors,
				confirmPassword: 'Passwords do not match',
			}));
			toast.error('Passwords mismatch');
			return;
		}

		try {
			const response = await fetch("/api/auth/register", {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					password: await hashPassword(password),
					...data
				}),
			});

			if (response.ok) {
				const responseData = await response.json();
				toast.success('Account created successfully!', { description: responseData.message });
				router.push('/auth/login');
			} else {
				const errorData = await response.json();
				toast.error('Oops! Something went wrong!', { description: errorData.message });
				if (errorData.errors) {
					setErrors(errorData.errors);
				}
				console.error(errorData);
			}
		} catch (error) {
			console.error(error);
			toast.error('An error occurred. Please try again later.');
		}
	};

	if (!isSuccess) {
		return null;
	}

	return (
		<section className='bg-sec vh-100 flex justify-center align-items-center'>
			<div className='md:container mt-[300px] md:mt-[0px]'>
				<form onSubmit={handleSubmit} className="p-4 max-w-7xl mx-auto bg-white rounded shadow">
					<h1 className="text-5xl font-bold my-[50px] text-center">Institution Registration</h1>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						{formFields.map((field) => (
							<div key={field.name} className="form-group">
								{field.type === 'dropdown' ? (
									<Dropdown
										label={field.label}
										options={field.options || []}
										selectedOption={formState[field.name] || ''}
										// @ts-ignore
										onOptionSelect={(option: string) => formStateManager.handleInputChange({ target: { name: field.name, value: option } })}
									/>
								) : (
									<Input
										id={field.name}
										name={field.name}
										type={field.type}
										label={field.label}
										placeholder={field.placeholder}
										value={formState[field.name] || ''}
										onChange={handleInputChange}
										required={field.required}
									/>
								)}
								{errors[field.name] && (
									<p className="text-red-500 text-xs mt-1">{errors[field.name]}</p>
								)}
							</div>
						))}
					</div>
					<div className='flex mt-5 mb-3 flex-col lg:flex-row justify-between gap-5 md:gap-0 align-items-center'>
						<span>
							<Button icon={<FontAwesomeIcon icon={faRectangleList} />} type="submit" size='md' color='pri'>
								Register
							</Button>
						</span>
						<span>
							<Button icon={<FontAwesomeIcon icon={faRightToBracket} />} size='md' onClick={() => router.push('/auth/login')} color='sec' variant='outline'>
								Login instead
							</Button>
						</span>
					</div>
				</form>
			</div>
		</section>
	);
};

export default InstitutionRegistration;
