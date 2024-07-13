// import React, { useState, useEffect, useCallback } from "react";

// const DefineSchema: React.FC = () => {
//     const { formStateManager } = useFormState();
//     const [forms, setForms] = useState<Form[]>([{ id: Date.now(), formState: {}, errors: {} }]);
//     const [notification, setNotification] = useState<string | null>(null);

//     const isFormEmpty = (formState: FormState) => {
//         return Object.values(formState).every(
//             (value) =>
//                 value === "" ||
//                 value === false ||
//                 value === null ||
//                 value === undefined
//         );
//     };

//     const addForm = useCallback(() => {
//         setForms((prevForms) => [...prevForms, { id: Date.now(), formState: {}, errors: {} }]);
//     }, []);

//     const removeForm = useCallback((index: number) => {
//         setForms((prevForms) => {
//             const newForms = [...prevForms];
//             newForms.splice(index, 1);
//             return newForms;
//         });
//     }, []);

//     const resetAllForms = () => {
//         setForms([{ id: Date.now(), formState: {}, errors: {} }]);
//     };

//     useEffect(() => {
//         const lastForm = forms[forms.length - 1].formState;
//         if (!isFormEmpty(lastForm)) {
//             addForm();
//         } else if (forms.length > 1) {
//             const secondToLastForm = forms[forms.length - 2].formState;
//             if (isFormEmpty(secondToLastForm) && isFormEmpty(lastForm)) {
//                 removeForm(forms.length - 1);
//             }
//         }
//     }, [forms, addForm, removeForm]);

//     const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = event.target;
//         setForms((prevForms) => {
//             const newForms = [...prevForms];
//             newForms[index].formState[name] = value;
//             newForms[index].errors[name] = value === "" ? "This field is required" : "";
//             return newForms;
//         });
//     };

//     const validateForms = () => {
//         let isValid = true;
//         const updatedForms = forms.map((form, index) => {
//             const errors: FormState = {};
//             if (index === forms.length - 1 && isFormEmpty(form.formState)) {
//                 return form;
//             }
//             formFields.forEach((field: { required: any; name: string | number; }) => {
//                 if (field.required && !form.formState[field.name]) {
//                     errors[field.name] = "This field is required";
//                     isValid = false;
//                 }
//             });
//             return { ...form, errors };
//         });
//         setForms(updatedForms);
//         return isValid;
//     };

//     const handleSave = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//         event.preventDefault();
//         setNotification(null);

//         if (!validateForms()) {
//             setNotification("Please complete all required fields or remove incomplete rows.");
//             return;
//         }

//         const validForms = forms.filter(
//             (form, index) => index !== forms.length - 1 || !isFormEmpty(form.formState)
//         );
//         console.log(validForms);
//     };

//     return (
//         <>
//             {notification && <div className="alert alert-warning">{notification}</div>}
//             <form>
//                 {forms.map((form, formIndex) => (
//                     <div
//                         key={form.id}
//                         className="py-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 relative"
//                     >
//                         {formFields.map((formConf: { type: string; label: any; options: any; name: string | number; id: any; placeholder: any; required: any; }, index: any) => {
//                             if (formConf.type === "dropdown") {
//                                 return (
//                                     <Dropdown
//                                         key={index}
//                                         label={formConf.label}
//                                         options={formConf.options}
//                                         selectedOption={
//                                             form.formState[formConf.name] || ""
//                                         }
//                                         onOptionSelect={(selectedOption: any) => {
//                                             handleInputChange(formIndex, {
//                                                 target: {
//                                                     name: formConf.name,
//                                                     value: selectedOption,
//                                                 },
//                                             } as React.ChangeEvent<HTMLSelectElement>);
//                                         }}
//                                         error={form.errors[formConf.name]}
//                                     />
//                                 );
//                             } else {
//                                 return (
//                                     <Input
//                                         key={index}
//                                         name={formConf.name}
//                                         inputMode="raw"
//                                         id={`${formConf.id}-${formIndex}`}
//                                         type={formConf.type}
//                                         label={formConf.label}
//                                         placeholder={formConf.placeholder}
//                                         value={form.formState[formConf.name] || ""}
//                                         onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//                                             handleInputChange(formIndex, e);
//                                         }}
//                                         required={formConf.required}
//                                         error={form.errors[formConf.name]}
//                                     />
//                                 );
//                             }
//                         })}
//                         {!isFormEmpty(form.formState) && forms.length > 1 && (
//                             <button
//                                 type="button"
//                                 onClick={() => removeForm(formIndex)}
//                                 className="absolute top-0 right-0 mt-2 mr-2 bg-red-500 text-white px-2 py-1 rounded"
//                             >
//                                 Remove
//                             </button>
//                         )}
//                     </div>
//                 ))}
//                 <div className="mt-3 flex justify-between">
//                     <button
//                         type="submit"
//                         onClick={handleSave}
//                         className="btn btn-primary px-5 py-3 rounded-5"
//                     >
//                         Save
//                     </button>
//                     <button
//                         type="button"
//                         onClick={resetAllForms}
//                         className="btn btn-secondary px-4 py-3 rounded-5"
//                     >
//                         Reset Form
//                     </button>
//                 </div>
//             </form>
//         </>
//     );
// };

// export default DefineSchema;
export default function DefineSchema() {
    return <></>
}