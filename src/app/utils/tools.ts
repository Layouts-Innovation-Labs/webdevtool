// // Type definitions
// interface FormField {
//   name: string;
//   type: 'text' | 'email' | 'tel' | 'password' | 'file';
//   label: string;
//   placeholder: string;
//   required: boolean;
//   accept?: string;
// }

// interface ValidationResult {
//   isValid: boolean;
//   errors: Record<string, string>;
//   statusCode: number;
// }

// const formConfigs: Record<string, FormField[]> = {
//   registration: [
//     { name: 'institutionName', type: 'text', label: 'Institution Name', placeholder: 'Enter institution name', required: true },
//     { name: 'address', type: 'text', label: 'Address', placeholder: 'Enter address', required: true },
//     { name: 'phoneNumber', type: 'tel', label: 'Phone Number', placeholder: 'Enter phone number', required: true },
//     { name: 'emailAddress', type: 'email', label: 'Email Address', placeholder: 'Enter email address', required: true },
//     { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter username', required: true },
//     { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter password', required: true },
//     { name: 'schoolLogo', type: 'file', label: 'School Logo', placeholder: 'Upload school logo', accept: 'image/*', required: true },
//   ],
//   login: [
//     { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter username', required: true },
//     { name: 'password', type: 'password', label: 'Password', placeholder: 'Enter password', required: true },
//   ],
//   parent: [
//     { name: 'wardSurname', type: 'text', label: 'Ward Surname', placeholder: 'Enter ward surname', required: true },
//     { name: 'email', type: 'email', label: 'Your Email', placeholder: 'Enter your email', required: true },
//   ],
// };

// export default function validateForm(data: Record<string, any>, formType: string): ValidationResult {
//   const errors: Record<string, string> = {};

//   const fields = formConfigs[formType];

//   if (!fields) {
//     return {
//       isValid: false,
//       errors: { form: 'Invalid form type specified' },
//       statusCode: 400
//     };
//   }

//   fields.forEach(field => {
//     const value = data[field.name];

//     // Check for required fields
//     if (field.required && !value) {
//       errors[field.name] = `${field.label} is required`;
//       return;
//     }

//     // Type-specific validations
//     if (value) {
//       switch (field.type) {
//         case 'email':
//           if (!/\S+@\S+\.\S+/.test(value)) {
//             errors[field.name] = `${field.label} must be a valid email address`;
//           }
//           break;
//         case 'tel':
//           if (!/^\d{10,15}$/.test(value)) {
//             errors[field.name] = `${field.label} must be a valid phone number`;
//           }
//           break;
//         case 'file':
//           if (field.accept && !new RegExp(field.accept.replace('*', '.*')).test(value.type)) {
//             errors[field.name] = `${field.label} must be a valid file type (${field.accept})`;
//           }
//           break;
//         case 'password':
//           // Custom password validations can be added here
//           break;
//           // Add more cases for other types if needed
//       }
//     }
//   });

//   const isValid = Object.keys(errors).length === 0;

//   return {
//     isValid,
//     errors,
//     statusCode: isValid ? 200 : 400
//   };
// }

// // Usage example
// const registrationData = {
//   institutionName: "Sample Institution",
//   address: "123 Sample Street",
//   phoneNumber: "1234567890",
//   emailAddress: "test@example.com",
//   username: "sampleuser",
//   password: "password123",
//   schoolLogo: { type: "image/png" }, // Simulated file object
// };

// const validationResult = validateForm(registrationData, 'registration');
// if (!validationResult.isValid) {
//   console.log(`Status Code: ${validationResult.statusCode}`);
//   console.log(validationResult.errors);
// } else {
//   console.log("Registration data is valid!");
// }
