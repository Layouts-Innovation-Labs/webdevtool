import React, {ReactNode} from 'react';
import Link from 'next/link';

type ButtonProps = {
    type?: 'button' | 'link' | 'submit';
    color: 'pri' | 'sec' | 'gray' | 'suc' | 'inf';
    variant?: 'normal' | 'outline';
    href?: string;
    children: React.ReactNode;
    onClick?: (e: any) => void;
    onSubmit?: (e: any) => void;
    icon?: ReactNode;
    className?: string;
    size?: 'xl' | 'lg' | 'md' | 'sm';
};

const buttonStyles = {
    pri: {
        normal: 'bg-pri text-sec hover:bg-pri-dark',
        outline: 'border border-2 border-primary text-pri hover:bg-pri hover:text-sec',
    },
    sec: {
        normal: 'bg-sec text-white hover:bg-sec-dark',
        outline: 'border border-2 border-secondary text-sec hover:bg-sec hover:text-white',
    },
    gray: {
        normal: 'bg-gray-900 text-light hover:bg-gray-700',
        outline: 'border border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-light',
    },
    suc: {
        normal: 'bg-suc text-white hover:bg-suc-dark',
        outline: 'border border-2 border-success text-suc hover:bg-suc hover:text-white',
    },
    inf: {
        normal: 'bg-inf text-black hover:bg-inf-dark',
        outline: 'border border-2 border-inf text-inf hover:bg-inf hover:text-black',
    },
};

const sizeStyles = {
    xl: 'py-3 text-lg',
    lg: 'mx-auto px-[60px] py-[20px] text-lg',
    md: 'mx-auto px-5 py-3 text-md',
    sm: 'mx-auto px-2 py-2 text-sm',
};

const Button: React.FC<ButtonProps> = ({
                                           className,
                                           type = 'button',
                                           color,
                                           variant = 'normal',
                                           href,
                                           icon,
                                           children,
                                           onClick,
                                           onSubmit,
                                           size = 'lg',
                                       }) => {
    const defaultClass = `rounded-5 btn-3d transition duration-300 ease-in-out transform hover:scale-110 hover:shadow-xl ${buttonStyles[color][variant]} ${sizeStyles[size]}`;

    const handleClick = (e: any) => {
        if (onClick) {
            onClick(e);
        }
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(e);
        }
    };

    if (type === 'link' && href) {
        return (
            <span>
                <Link href={href} className={`${defaultClass} ${className} no-underline`}>
                    {children}
                    {icon && <>&nbsp; | &nbsp;{icon}</>}
                </Link>
            </span>

        );
    }

    return (
        <span>
            <button type={type === 'submit' ? 'submit' : 'button'} className={`${defaultClass} ${className}`}
                    onClick={handleClick}>
                {children}
                {icon && <>&nbsp; | &nbsp;{icon}</>}
            </button>
        </span>

    );
};

export default Button;
