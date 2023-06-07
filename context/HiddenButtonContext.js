import React, { createContext, useState } from 'react';

const HiddenButtonContext = createContext();

const HiddenButtonProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const [buttonClickEvent, setButtonClickEvent] = useState(null);

    const setButtonClickHandler = (callback) => {
        setHidden(false);
        setButtonClickEvent(() => callback);
    };

    const fireButtonClickEvent = () => {
        if (buttonClickEvent) {
            buttonClickEvent();
        }
    };

    return (
        <HiddenButtonContext.Provider
            value={{ hidden, setButtonClickHandler, fireButtonClickEvent }}
        >
            {children}
        </HiddenButtonContext.Provider>
    );
};

export { HiddenButtonProvider, HiddenButtonContext };