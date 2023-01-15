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
    createdAt?: string;
    ingredients?: string[];
    name?: string;
    number?: number;
    status?: string;
    updatedAt?: string | number;
    _id?: string;
};

export type TwsOrdersList = {
    success?: boolean;
    orders?: Array<TWSOrder>;
    total?: number;
    totalToday?: number;
}


export type TProductItem = {
    // map(arg0?: (item: any) => void): ReactNode;
    // length?: number;
    // slice(arg0?: number, arg1?: number): unknown;
    // reduce(arg0?: any, arg1?: any): unknown;
    // push(ingredient?: TProductItem): unknown;
    id?: Key | null | number;
    _id?: any;
    calories?: number;
    fat?: number;
    carbohydrates?: number;
    image?: string;
    image_large?: string;
    image_mobile?: string;
    name?: string;
    price?: number;
    proteins?: number;
    type?: string;
    __v?: number;
};


// export type TLocation = {
//     hash: string;
//     key?: string;
//     pathname: string;
//     search: string;
//     state: TLocationState;
// };
export type TLocationState = {
    from?: string;
    background: Location;
}