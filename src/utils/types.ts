import { ReactNode } from 'react';
import { Location } from 'history';
import { Key } from 'react';

export interface IProps {
    children?: ReactNode;
}

export type TItem = {
    item: TItemConstructor;
}

export type TItemConstructor = {
    name?: string;
    price?: number;
    image?: string;
}

export type TWSOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    owner: string;
    status: string;
    updatedAt: string;
    _id: string;
    __v: number;

};

export type TwsOrdersList = {
    success?: boolean;
    orders?: Array<TWSOrder>;
    total?: number;
    totalToday?: number;
}




export type TDataOrderNumberObject = {
    itemsFailed: boolean;
    itemsRequest: boolean;
    dataOrderNumber: TWSOrder;
}



export type TProductItem = {
    //reduce(arg0: (a: number, b: { price: number; }) => number, arg1: number): unknown;
    id?: string;
    _id: string;
    calories: number;
    fat: number;
    carbohydrates: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
};

export type TLocationState = {
    from?: string;
    background: Location;
}

export type TUserData = {
    name: string;
    email: string;
    login?: string;
    password?: string;
    newPassword?: string;
}

export type TLoginData = {
    name: string;
    password?: string;
    email: string;

}

export type TResetPassMessage = {
    message: string
}

export type TengToRusStatus = {
    done: string,
    pending: string,
    created: string
}

