import { v4 as uuid } from 'uuid';


export const CONSTRUCTOR_ADD = 'CONSTRUCTOR/ADD';
export const CONSTRUCTOR_DELETE = 'CONSTRUCTOR/DELETE';
export const CONSTRUCTOR_REORDER = 'CONSTRUCTOR/REORDER';
export const CONSTRUCTOR_RESET = 'CONSTRUCTOR/RESET';



export const addToConstructor = (ingredient) => {
    return {
        type: CONSTRUCTOR_ADD,
        payload: {
            ...ingredient,
            id: uuid()
        }
    }
}
