import React, { ChangeEvent } from 'react';

interface TextareaProps {
	name: string;
	label: string;
	placeholder: string;
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	onReset: () => void;
	showButtons?: boolean;
}

const Textarea: React.FC<TextareaProps> = ({ name, label, placeholder, value, onChange, onReset, showButtons = false }) => {
	const isEmpty = !value;

	return (
		<div className="form-floating mb-3 position-relative">
      <textarea
				className="form-control"
				id={name}
				name={name}
				placeholder={placeholder}
				required
				value={value}
				onChange={onChange}
				style={{ height: '100px' }}
			/>
			<label htmlFor={name} className='m-3 mt-0'>{label}</label>
			<div className="invalid-feedback">{label} required.</div>
			{showButtons && (
				<button
					type="button"
					className={`btn btn-sm position-absolute ${isEmpty ? 'btn-secondary' : 'btn-success'}`}
					style={{ right: '20px', bottom: '10px' }}
					onClick={onReset}
					disabled={isEmpty}
				>
					Reset
				</button>
			)}
		</div>
	);
};

export default Textarea;
