import React from 'react';

/**
 * Dropdown component for selecting an option from a list.
 */
interface DropdownProps {
    /**
     * The label for the dropdown.
     */
    label: string,
    /**
     * The options to be displayed in the dropdown.
     */
    options: string[] | undefined,
    /**
     * The currently selected option.
     */
    selectedOption: string,
    /**
     * Callback function to be called when an option is selected.
     * @param option - The selected option.
     */
    onOptionSelect: (option: string) => void,
    /**
     * Whether the dropdown is required or not.
     */
    required?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({label, options, selectedOption, onOptionSelect, required}) => {
    const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        onOptionSelect(selectedValue);
    };

    return (
        <div className="dropdown-container relative mb-3">
            <div className="border-pri border-2 rounded-3 w-full p-3 text-sec bg-light">
                <div className="relative">
                    <span className="block">{selectedOption ? selectedOption : `Select ${label}`}</span>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <svg
                            className="h-5 w-5 text-sec"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.293 13.707a1 1 0 001.414 0l3-3a1 1 0 10-1.414-1.414L11 11.586V2a1 1 0 10-2 0v9.586l-2.293-2.293a1 1 0 10-1.414 1.414l3 3z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
                <select
                    required={required}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer p-4 space-y-5 max"
                    value={selectedOption}
                    onChange={handleOptionSelect}
                >
                    <option value="" disabled={selectedOption !== ''}>
                        {selectedOption ? selectedOption : `Select ${label}`}
                    </option>
                    {options?.map((option, index) => (
                        <option
                            key={index}
                            value={option}
                            className="text-sec py-5 bg-light hover:bg-pri-200"
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Dropdown;
