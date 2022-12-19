
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../services/store';

import { useState } from "react";
export type TDict = {
    name: string;
    value: string;

};

export const useForm = (inputValues: { email?: string; password?: string; name?: string; token?: string; }) => {
    const [values, setValues] = useState<any>(inputValues);

    const handleChange = (event: { target: TDict }) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
