import { useState } from 'react';
import { validateQueryForm } from '../utils/validation';
import queryService from '../services/n8n/queryService';
import apiConfig from '../services/apiConfig';

const initialFields = {
  name: '',
  email: '',
  phone: '',
  category: '',
  message: ''
};

export const useQueryForm = () => {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    const validationErrors = validateQueryForm(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      if (!apiConfig.n8n.isQueryAvailable) {
        // Fallback for demo mode
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setFields(initialFields);
        setSubmitStatus('success');
        return;
      }

      await queryService.submitQuery(fields);
      setFields(initialFields);
      setSubmitStatus('success');
    } catch (e) {
      console.error('Customer query submission error:', e);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFields(initialFields);
    setErrors({});
    setSubmitStatus(null);
  };

  return {
    fields,
    errors,
    isSubmitting,
    submitStatus,
    handleChange,
    handleSubmit,
    resetForm
  };
};

export default useQueryForm;
