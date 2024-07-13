import React, { ChangeEvent } from 'react';

interface InputProps {
    name: string,
    id: string,
    type: string,
    label: string,
    placeholder: string | undefined,
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    readOnly?: boolean,
    showButtons?: boolean,
    onReset?: () => void,
    inputSize?: string,
    inputFontSize?: string,
    labelFontSize?: string,
    pattern?: string,
    maxLength?: number,
    accept?: string,
    maxDate?: string,
    required?: boolean,
    inputMode?: string,
    className?: string
}

const Input: React.FC<InputProps> = ({
    name,
    id,
    type,
    label,
    placeholder,
    value,
    onChange,
    readOnly = false,
    showButtons = false,
    onReset,
    inputSize,
    inputFontSize,
    labelFontSize,
    pattern,
    maxLength,
    accept,
    maxDate,
    required,
    inputMode,
    className
}) => {
    const isEmpty = !value;
    const isDateType = type === 'date';
    const isFileType = type === 'file';
    const isCheckbox = type === 'checkbox';

    // Handle change for checkbox inputs
    const handleCheckboxChange = () => {
        const updatedValue = !value; // Toggle between true and false
        onChange({
            target: {
                name,
                value: updatedValue,
                type: 'checkbox',
                checked: updatedValue,
            }
        } as unknown as ChangeEvent<HTMLInputElement>);
    };


    return (
        <div id={id} className="form-floating mb-3 position-relative">
            {isFileType ? (
                <input
                    className={"form-control "  + className}
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    readOnly={readOnly}
                    style={{ height: inputSize, fontSize: inputFontSize }}
                    accept={accept}
                />
            ) : isCheckbox ? (
                <div className="form-check">
                    <input
                        className={"form-check-input bg-secondary border-primary border-2 border-light p-4 rounded-circle " + className}
                        id={name}
                        name={name}
                        type="checkbox"
                        checked={value as unknown as boolean}
                        onChange={handleCheckboxChange}
                        readOnly={readOnly}
                        required={required}
                    />
                    <label className="form-check-label text-xl flex align-items-center p-3" htmlFor={name} style={{ fontSize: labelFontSize }}>
                        {label}
                    </label>
                </div>
            ) : (
                <input
                    className={"form-control " + className}
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    value={isCheckbox ? (value === 'true' ? 'true' : 'false') : value}
                    checked={isCheckbox ? value === 'true' : undefined}
                    onChange={onChange}
                    readOnly={readOnly}
                    style={{ height: inputSize, fontSize: inputFontSize }}
                    pattern={pattern}
                    maxLength={maxLength}
                    {...(isDateType && { max: maxDate })}
                />
            )}
            {!isCheckbox && <label htmlFor={name} style={{ fontSize: labelFontSize }}>{label}</label>}
            {!isDateType && showButtons && (
                <button
                    type="button"
                    className={`btn btn-sm position-absolute ${isEmpty ? 'btn-secondary' : 'btn-success'}`}
                    style={{ right: '10px', top: '15px' }}
                    onClick={onReset}
                    disabled={isEmpty}
                >
                    Reset
                </button>
            )}
            <div className="invalid-feedback">{label} required.</div>
        </div>
    );
};

export default Input;
