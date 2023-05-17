import React, { useReducer } from "react";

// Initial state
const initialState = {
    version: "version1",
    inputs: {
        prompt: "",
        image: "",
    },
};

// Reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_VERSION":
            return {
                ...state,
                version: action.payload,
                inputs: {
                    prompt: "",
                    image: "",
                },
            };

        case "SET_PROMPT":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    prompt: action.payload,
                },
            };

        case "SET_IMAGE":
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    image: action.payload,
                },
            };

        default:
            return state;
    }
};