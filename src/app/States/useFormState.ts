import React, {ChangeEvent, useState} from "react";

/**
 * Represents the state of a form.
 */
class FormState {
    private readonly state: { [key: string]: string };
    readonly setState: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;

    /**
     * Creates a new instance of FormState.
     * @param initialState - The initial state of the form.
     * @param setState - The function to update the form state.
     */
    constructor(
        initialState: { [key: string]: string },
        setState: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
    ) {
        this.state = initialState;
        this.setState = setState;
    }

    /**
     * Handles the change event of an input element.
     * @param event - The change event.
     */
    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
        this.setState(
            (prevState) => ({
                ...prevState,
                [name]: value,
            })
        );
    };

    /**
     * Resets the value of a specific input element.
     * @param name - The name of the input element.
     */
    handleReset = (name: string) => {
        this.setState((prevState) => ({
            ...prevState,
            [name]: "",
        }));
    };

    /**
     * Resets the values of all input elements.
     */
    handleResetAll = () => {
        this.setState({});
    };

    /**
     * Gets the current state of the form.
     * @returns The current state of the form.
     */
    getState = () => this.state;
}

/**
 * Custom hook for managing form state.
 * @returns An object containing the form state and form state manager.
 */
const useFormState = () => {
    const [formState, setFormState] = useState<{ [key: string]: string }>({});
    const formStateManager = new FormState(formState, setFormState);

    return {formState, formStateManager};
};

export default useFormState;
