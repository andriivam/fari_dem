
import React, { createContext, useState } from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
    const [isFormSubmitted, setFormSubmitted] = useState(false);

    const handleSubmitForm = () => {
        setFormSubmitted(true);
    };

    return (
        <FormContext.Provider value={{ isFormSubmitted, handleSubmitForm }}>
            {children}
        </FormContext.Provider>
    );
}

export { FormProvider, FormContext };