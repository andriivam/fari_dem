import React, { createContext, useState } from 'react';

// Create the context
const GlobalInputContext = createContext();

// Create a provider component
const GlobalInputProvider = ({ children }) => {

    const [globalInput, setGlobalInput] = useState({ "prompt": null, "image": null, "input_image": null });

    console.log({ globalInput }, 'from global input type context')

    return (
        <GlobalInputContext.Provider value={{ globalInput, setGlobalInput }}>
            {children}
        </GlobalInputContext.Provider>
    );
};

export { GlobalInputProvider, GlobalInputContext };