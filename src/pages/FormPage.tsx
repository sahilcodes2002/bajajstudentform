import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

interface FormStructure {
  formTitle: string;
  formId: string;
  version: string;
  sections: FormSection[];
}

interface FormSection {
  sectionId: number;
  title: string;
  description: string;
  fields: FormField[];
}

interface FormField {
  fieldId: string;
  type: "text" | "tel" | "email" | "textarea" | "date" | "dropdown" | "radio" | "checkbox";
  label: string;
  placeholder?: string;
  required: boolean;
  dataTestId: string;
  validation?: { message: string };
  options?: Array<{ value: string; label: string; dataTestId?: string }>;
  maxLength?: number;
  minLength?: number;
}

type FormData = Record<string, string | string[]>;

export default function FormPage(){
  const location = useLocation();
  const rollNumber = "RA2211032010010";
  const [formStructure, setFormStructure] = useState<FormStructure | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await axios.get(
          `https://dynamic-form-generator-9rl7.onrender.com/get-form?rollNumber=${rollNumber}`
        );
        setFormStructure(response.data.form);
      } catch (err) {
        setError('Failed to load form.');
      } finally {
        setLoading(false);
      }
    };
    rollNumber ? fetchForm() : setError('Roll number not provided');
  }, [rollNumber]);

  const handleInputChange = (fieldId: string, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const validateSection = (section: FormSection) => {
    const newErrors: Record<string, string> = {};
    section.fields.forEach(field => {
      const value = formData[field.fieldId];
      if (field.required) {
        if (field.type === 'checkbox' && (!value || (value as string[]).length === 0)) {
          newErrors[field.fieldId] = field.validation?.message || 'Required field';
        } else if (!value) {
          newErrors[field.fieldId] = field.validation?.message || 'Required field';
        }
      }
      if (typeof value === 'string') {
        if (field.minLength && value.length < field.minLength) {
          newErrors[field.fieldId] = field.validation?.message || `Minimum ${field.minLength} characters`;
        }
        if (field.maxLength && value.length > field.maxLength) {
          newErrors[field.fieldId] = field.validation?.message || `Maximum ${field.maxLength} characters`;
        }
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!formStructure) return;
    validateSection(formStructure.sections[currentSection]) && 
      setCurrentSection(prev => prev + 1);
  };

  const handleSubmit = () => console.log('Form Data:', formData);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!formStructure) return <div className="text-center p-8">Form not found</div>;

  const { sections, formTitle } = formStructure;
  const currentSectionData = sections[currentSection];
  const isLastSection = currentSection === sections.length - 1;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{formTitle}</h1>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{currentSectionData.title}</h2>
          <p className="text-gray-600 mb-4">{currentSectionData.description}</p>
          <div className="space-y-4">
            {currentSectionData.fields.map((field) => (
              <div key={field.fieldId} className="mb-4">
                <label className="block text-sm font-medium mb-2">{field.label}</label>
                {renderField(field)}
                {errors[field.fieldId] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field.fieldId]}</p>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          {currentSection > 0 && (
            <button
              onClick={() => setCurrentSection(prev => prev - 1)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Previous
            </button>
          )}
          <button
            onClick={isLastSection ? handleSubmit : handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-auto"
          >
            {isLastSection ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );

  function renderField(field: FormField) {
    switch (field.type) {
      case 'text':
      case 'tel':
      case 'email':
      case 'date':
        return (
          <input
            type={field.type}
            value={(formData[field.fieldId] as string) || ''}
            onChange={(e) => handleInputChange(field.fieldId, e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder={field.placeholder}
            data-testid={field.dataTestId}
          />
        );
      case 'textarea':
        return (
          <textarea
            value={(formData[field.fieldId] as string) || ''}
            onChange={(e) => handleInputChange(field.fieldId, e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder={field.placeholder}
            data-testid={field.dataTestId}
            rows={4}
          />
        );
      case 'dropdown':
        return (
          <select
            value={(formData[field.fieldId] as string) || ''}
            onChange={(e) => handleInputChange(field.fieldId, e.target.value)}
            className="w-full p-2 border rounded-md"
            data-testid={field.dataTestId}
          >
            <option value="">Select...</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={field.fieldId}
                  value={option.value}
                  checked={(formData[field.fieldId] as string) === option.value}
                  onChange={(e) => handleInputChange(field.fieldId, e.target.value)}
                  className="form-radio"
                  data-testid={option.dataTestId}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="space-y-2">
            {field.options?.map(option => (
              <label key={option.value} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={option.value}
                  checked={(formData[field.fieldId] as string[] || []).includes(option.value)}
                  onChange={(e) => {
                    const selected = formData[field.fieldId] as string[] || [];
                    const newSelected = e.target.checked
                      ? [...selected, option.value]
                      : selected.filter(v => v !== option.value);
                    handleInputChange(field.fieldId, newSelected);
                  }}
                  className="form-checkbox"
                  data-testid={option.dataTestId}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  }
};
