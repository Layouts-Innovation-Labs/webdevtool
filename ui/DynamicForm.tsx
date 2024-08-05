"use client";
import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Checkbox, Switch, Textarea, FormErrorMessage } from '@chakra-ui/react';
import { FormConfig, FormFieldConfig } from 'config/FormConfig';

interface DynamicFormProps {
    config: FormConfig;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config }) => {

    const [formData, setFormData] = useState<any>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, type, value } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' || type === 'switch' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation example
        const newErrors: { [key: string]: string } = {};
        config.fields.forEach(field => {
            if (field.isRequired && !formData[field.id]) {
                newErrors[field.id] = `${field.label} is required`;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log(data);
    };

    const renderField = (field: FormFieldConfig) => {
        switch (field.type) {
            case 'text':
            case 'number':
                return (
                    <FormControl isRequired={field.isRequired} isInvalid={!!errors[field.id]} key={field.id}>
                        <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                        <Input
                            id={field.id}
                            name={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ''}
                            onChange={handleChange}
                        />
                        {errors[field.id] && <FormErrorMessage>{errors[field.id]}</FormErrorMessage>}
                    </FormControl>
                );
            case 'textarea':
                return (
                    <FormControl isRequired={field.isRequired} isInvalid={!!errors[field.id]} key={field.id}>
                        <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                        <Textarea
                            id={field.id}
                            name={field.id}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ''}
                            onChange={handleChange}
                        />
                        {errors[field.id] && <FormErrorMessage>{errors[field.id]}</FormErrorMessage>}
                    </FormControl>
                );
            case 'select':
                return (
                    <FormControl isRequired={field.isRequired} isInvalid={!!errors[field.id]} key={field.id}>
                        <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                        <Select
                            id={field.id}
                            name={field.id}
                            placeholder={field.placeholder}
                            value={formData[field.id] || ''}
                            onChange={handleChange}
                        >
                            {field.options?.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Select>
                        {errors[field.id] && <FormErrorMessage>{errors[field.id]}</FormErrorMessage>}
                    </FormControl>
                );
            case 'checkbox':
                return (
                    <FormControl key={field.id}>
                        <Checkbox
                            id={field.id}
                            name={field.id}
                            isChecked={!!formData[field.id]}
                            onChange={handleChange}
                        >
                            {field.label}
                        </Checkbox>
                    </FormControl>
                );
            case 'switch':
                return (
                    <FormControl key={field.id}>
                        <FormLabel htmlFor={field.id}>{field.label}</FormLabel>
                        <Switch
                            id={field.id}
                            name={field.id}
                            isChecked={!!formData[field.id]}
                            onChange={handleChange}
                            size={'lg'}
                        />
                    </FormControl>
                );
            default:
                return null;
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit} p={4}>
            {config.fields.map(field => renderField(field))}
            <Button mt={4} colorScheme="teal" type="submit">
                Submit
            </Button>
        </Box>
    );
};

export default DynamicForm;
