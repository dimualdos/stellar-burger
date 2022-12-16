import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../services/store';
import { useState } from "react";


export function useForm(inputValues: { value: string; name: string; }) {
    const [values, setValues] = useState(inputValues);

    const handleChange = (event: { target: { value: string; name: string; }; }) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
