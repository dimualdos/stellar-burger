import { ReactNode } from 'react';
import { Location } from 'history';
import { Key } from 'react';

export interface IProps {
    children?: ReactNode;
}

export type TProductItem = {
    id?: Key | null | undefined | number;
    _id: any;
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