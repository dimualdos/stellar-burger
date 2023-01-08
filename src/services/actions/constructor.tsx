import { v4 as uuid } from 'uuid';

import { CONSTRUCTOR_ADD, CONSTRUCTOR_DELETE, CONSTRUCTOR_REORDER, CONSTRUCTOR_RESET } from '../constants/constructor-constant';

export type TPayloadConstructor = {
    type: string;
    id: number;
}

export interface IConstructorAddAction {
    readonly type: typeof CONSTRUCTOR_ADD;
    readonly payload: TPayloadConstructor;
}
export interface IConstructorResetAction {
    readonly type: typeof CONSTRUCTOR_RESET;
}
export interface IConstructorReorderAction {
    [x: string]: any;
    readonly type: typeof CONSTRUCTOR_REORDER;

}
export interface IConstructorDeleteAction {
    payload: number;
    readonly type: typeof CONSTRUCTOR_DELETE;

}

export type TConstructorActions =
    | IConstructorAddAction
    | IConstructorResetAction
    | IConstructorReorderAction
    | IConstructorDeleteAction;

export const addToConstructor = (ingredient: any): TConstructorActions => {
    return {
        type: CONSTRUCTOR_ADD,
        payload: {
            ...ingredient,
            id: uuid()
        }
    }
}
