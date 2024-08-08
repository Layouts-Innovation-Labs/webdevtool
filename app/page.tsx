import React from 'react';
import DynamicForm from 'ui/DynamicForm';
import { FormConfig } from 'config/FormConfig';
import { SimpleGrid } from '@chakra-ui/react'

const formConfig: FormConfig = {
  fields: [
    { id: 'name', label: 'Name', type: 'text', isRequired: true, placeholder: 'Enter your name' },
    { id: 'age', label: 'Age', type: 'number', validation: { min: 1, max: 120 }, placeholder: 'Enter your age' },
    { id: 'gender', label: 'Gender', type: 'radio', options: ['Male', 'Female'], isRequired: true },
    { id: 'newsletter', label: 'Subscribe to Newsletter', type: 'checkbox' },
    { id: 'birthdate', label: 'Birthdate', type: 'date' },
    { id: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell us about yourself' },
    { id: 'terms', label: 'Accept Terms and Conditions', type: 'switch' },
  ],
};
const userRegistrationFormConfig: FormConfig = {
  fields: [
    { id: 'username', label: 'Username', type: 'text', isRequired: true, placeholder: 'Choose a username' },
    { id: 'email', label: 'Email', type: 'text', isRequired: true, placeholder: 'Enter your email' },
    { id: 'password', label: 'Password', type: 'text', isRequired: true, placeholder: 'Enter your password' },
    { id: 'confirmPassword', label: 'Confirm Password', type: 'text', isRequired: true, placeholder: 'Re-enter your password' },
    { id: 'birthdate', label: 'Birthdate', type: 'date' },
    { id: 'newsletter', label: 'Subscribe to Newsletter', type: 'checkbox' },
  ],
};
const contactFormConfig: FormConfig = {
  fields: [
    { id: 'name', label: 'Name', type: 'text', isRequired: true, placeholder: 'Enter your name' },
    { id: 'email', label: 'Email', type: 'text', isRequired: true, placeholder: 'Enter your email' },
    { id: 'message', label: 'Message', type: 'textarea', isRequired: true, placeholder: 'Your message' },
  ],
};
const jobApplicationFormConfig: FormConfig = {
  fields: [
    { id: 'fullName', label: 'Full Name', type: 'text', isRequired: true, placeholder: 'Enter your full name' },
    { id: 'email', label: 'Email', type: 'text', isRequired: true, placeholder: 'Enter your email' },
    { id: 'phoneNumber', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number' },
    { id: 'resume', label: 'Upload Resume', type: 'file' },
    { id: 'coverLetter', label: 'Cover Letter', type: 'textarea', placeholder: 'Write your cover letter' },
    { id: 'experience', label: 'Years of Experience', type: 'number', validation: { min: 0 }, placeholder: 'Enter years of experience' },
  ],
};
const eventRegistrationFormConfig: FormConfig = {
  fields: [
    { id: 'name', label: 'Name', type: 'text', isRequired: true, placeholder: 'Enter your name' },
    { id: 'email', label: 'Email', type: 'text', isRequired: true, placeholder: 'Enter your email' },
    { id: 'phone', label: 'Phone Number', type: 'text', placeholder: 'Enter your phone number' },
    { id: 'eventDate', label: 'Event Date', type: 'date', isRequired: true },
    { id: 'attendees', label: 'Number of Attendees', type: 'number', validation: { min: 1 }, placeholder: 'Enter number of attendees' },
    { id: 'specialRequests', label: 'Special Requests', type: 'textarea', placeholder: 'Any special requests or dietary restrictions?' },
  ],
};
const surveyFormConfig: FormConfig = {
  fields: [
    { id: 'age', label: 'Age', type: 'number', validation: { min: 0, max: 120 }, placeholder: 'Enter your age' },
    { id: 'gender', label: 'Gender', type: 'radio', options: ['Male', 'Female', 'Other'], isRequired: true },
    { id: 'feedback', label: 'Feedback', type: 'textarea', isRequired: true, placeholder: 'Your feedback' },
    { id: 'satisfaction', label: 'Satisfaction Level', type: 'select', options: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'] },
  ],
};
const form: FormConfig = {
  fields: [
    { id: 'name', label: 'Name', type: 'text', isRequired: true, placeholder: 'Enter your name' },
    { id: 'age', label: 'Age', type: 'number', validation: { min: 1, max: 120 }, placeholder: 'Enter your age' },
    { id: 'gender', label: 'Gender', type: 'radio', options: ['Male', 'Female'], isRequired: true },
    { id: 'newsletter', label: 'Subscribe to Newsletter', type: 'checkbox' },
    { id: 'birthdate', label: 'Birthdate', type: 'date' },
    { id: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell us about yourself' },
    { id: 'terms', label: 'Accept Terms and Conditions', type: 'switch' },
  ],
};
const Config: FormConfig = {
  fields: [
    { id: 'name', label: 'Name', type: 'text', isRequired: true, placeholder: 'Enter your name' },
    { id: 'age', label: 'Age', type: 'number', validation: { min: 1, max: 120 }, placeholder: 'Enter your age' },
    { id: 'gender', label: 'Gender', type: 'radio', options: ['Male', 'Female'], isRequired: true },
    { id: 'newsletter', label: 'Subscribe to Newsletter', type: 'checkbox' },
    { id: 'birthdate', label: 'Birthdate', type: 'date' },
    { id: 'bio', label: 'Bio', type: 'textarea', placeholder: 'Tell us about yourself' },
    { id: 'terms', label: 'Accept Terms and Conditions', type: 'switch' },
  ],
};

const App = () => (
  <SimpleGrid p={5} columns={{base: 1, md: 2, lg: 3}} spacing={{base: 5, md: 7, lg: 10, xl: 15}}>
    <DynamicForm config={formConfig} />
    <DynamicForm config={userRegistrationFormConfig} />
    <DynamicForm config={contactFormConfig} />
    <DynamicForm config={jobApplicationFormConfig} />
    <DynamicForm config={eventRegistrationFormConfig} />
    <DynamicForm config={surveyFormConfig} />
    <DynamicForm config={form} />
    <DynamicForm config={Config} />
  </SimpleGrid>
);

export default App;
