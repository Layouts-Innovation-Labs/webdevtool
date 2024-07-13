"use client";
import React, {useState, useEffect} from "react";
import Input from "@/app/components/Input/Input";
import Dropdown from "@/app/components/Input/Dropdown";
import useFormState from "@/app/States/useFormState";
import {toast} from "sonner";
import {object} from "prop-types";

const formConfig = [
    {
        name: "firstName",
        id: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "Enter student's first name",
        required: true
    },
    {
        name: "otherNames",
        id: "otherNames",
        type: "text",
        label: "Other Names",
        placeholder: "Enter student's other name",
        required: false
    },
    {
        name: "lastNames",
        id: "lastNames",
        type: "text",
        label: "Last Name",
        placeholder: "Enter student's last name",
        required: true
    },
    {name: "DateOfBirth", id: "DateOfBirth", type: "date", label: "Date of Birth", required: true},
    {
        name: "Gender",
        id: "Gender",
        type: "dropdown",
        label: "Gender",
        options: ["Male", "Female", "Other"],
        required: true
    },
    {
        name: "nationality",
        id: "nationality",
        type: "text",
        label: "Nationality",
        placeholder: "Enter Students Nationality",
        required: true
    },
    {name: "state", id: "state", type: "text", label: "State", placeholder: "Enter Students State", required: true},
    {
        name: "province/LGA",
        id: "province/LGA",
        type: "text",
        label: "Province/LGA",
        placeholder: "Enter Students province/LGA",
        required: true
    },
    {
        name: "address",
        id: "address",
        type: "text",
        label: "Address",
        placeholder: "Enter Students home address",
        required: true
    },
    {
        name: "currentClass",
        id: "currentClass",
        type: "dropdown",
        label: "Current Class",
        options: ["Pre KG", "KG", "KG 1", "KG 2", "KG 3", "Basic 1", "Basic 2", "Basic 3", "Basic 4", "Basic 5", "Basic 6", "JSS 1", "JSS 2", "JSS 3", "SS 1", "SS 2", "SS 3"],
        required: true
    },
    {name: "dateAdmitted", id: "dateAdmitted", type: "date", label: "Date Admitted", required: false},
    {name: "nin", id: "nin", type: "number", label: "NIN", placeholder: "Enter NIN", required: true},
    {
        name: "guardianName",
        id: "guardianName",
        type: "text",
        label: "Guardian Name",
        placeholder: "Enter guardian's full name",
        required: true
    },
    {
        name: "guardianRelationship",
        id: "guardianRelationship",
        type: "text",
        label: "Relationship with Guardian",
        placeholder: "Enter relationship (e.g., Parent, Guardian)",
        required: true
    },
    {
        name: "guardianPhone",
        id: "guardianPhone",
        type: "number",
        label: "Guardian Phone Number",
        placeholder: "Enter guardian's phone number",
        required: true
    },
    {
        name: "guardianEmail",
        id: "guardianEmail",
        type: "email",
        label: "Guardian Email",
        placeholder: "Enter guardian's Email Address",
        required: true
    },
    {name: "Disabilities", id: "Disabilities", type: "checkbox", label: "Disabilities", required: true},
];

const AddStudentForm: React.FC = () => {
    const {formState, formStateManager} = useFormState();
    const [disable, setDisable] = useState(true);

    const handleDisable = () => {
        const isFormEmpty = Object.values(formState).every(
            // @ts-ignore
            value => value === '' || value === false || value === null || value === undefined
        );
        setDisable(isFormEmpty);
    };

    
    useEffect(() => {
        handleDisable();
    }, [formState]);

    
    const user = localStorage.getItem('udat');
    // @ts-ignore
    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const data = formStateManager.getState();
        // @ts-ignore
        const {userData} = JSON.parse(user);
        data.school_id = userData._id;
        try {
            const response = await fetch('/api/students/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...data, school_id: userData._id})
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('Student created successfully:', {description: result.message});
                formStateManager.handleResetAll();
            } else {
                const error = await response.json();
                toast.error('Error creating student:', {description: error.message});
                console.error('Error creating student:', error);
            }
        } catch (error) {
            toast.error('Unexpected error');
            console.error('Unexpected error:', error);
        }
    };

    return (
        <form>
            <div className="py-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {formConfig.map((inputConfig) => {
                    if (inputConfig.type === "dropdown") {
                        return (
                            <Dropdown
                                key={inputConfig.name}
                                label={inputConfig.label}
                                options={inputConfig.options}
                                selectedOption={formState[inputConfig.name] || ""}
                                onOptionSelect={(selectedOption) => {
                                    formStateManager.setState(prevState => ({
                                        ...prevState,
                                        [inputConfig.name]: selectedOption,
                                    }));
                                    handleDisable();
                                }}
                                required={inputConfig.required}
                            />
                        );
                    } else {
                        return (
                            <Input
                                key={inputConfig.name}
                                name={inputConfig.name}
                                inputMode="raw"
                                id={inputConfig.id}
                                type={inputConfig.type}
                                label={inputConfig.label}
                                placeholder={inputConfig.placeholder}
                                value={formState[inputConfig.name] || ''}
                                onChange={(e) => {
                                    formStateManager.handleInputChange(e);
                                    handleDisable();
                                }}
                                onReset={() => {
                                    formStateManager.handleReset(inputConfig.name);
                                    handleDisable();
                                }}
                                required={inputConfig.required}
                            />
                        );
                    }
                })}
                {formState.Disabilities && (
                    <Input
                        key="disabilityDescription"
                        name="disabilityDescription"
                        inputMode="raw"
                        id="disabilityDescription"
                        type="text"
                        label="Disability Description"
                        placeholder="Enter a short description of the disability"
                        value={formState.disabilityDescription || ''}
                        onChange={(e) => {
                            formStateManager.handleInputChange(e);
                            handleDisable();
                        }}
                        onReset={() => {
                            formStateManager.handleReset("disabilityDescription");
                            handleDisable();
                        }}
                        required={true}
                    />
                )}
            </div>
            <div className="mt-3 flex justify-content-between">
                <button type="submit" onClick={handleSubmit} className="btn btn-primary px-5 py-3 rounded-5">Submit
                </button>
                <button type="button" disabled={disable} onClick={() => formStateManager.handleResetAll()}
                        className={`${disable ? 'btn-outline-secondary btn px-4 py-3 rounded-5' : 'btn-secondary btn px-4 py-3 rounded-5'}`}>Reset
                    Form
                </button>
            </div>
        </form>
    );
};

export default AddStudentForm;
