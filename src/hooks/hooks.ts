import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../services/types/index';


// import type { } from "redux-thunk/extend-redux";

import { useState } from "react";
export type TDict = {
    name: string;
    value: string;

};

export type TUseForm = {
    email?: string;
    name?: string;
    password?: string;
    token?: string;
}

export const useForm = (inputValues: TUseForm) => {
    const [values, setValues] = useState<any>(inputValues);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
