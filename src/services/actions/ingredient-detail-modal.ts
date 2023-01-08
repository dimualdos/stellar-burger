export const SET_INGREDIENT_MODAL: 'SET/INGREDIENT_MODAL' = 'SET/INGREDIENT_MODAL';
export const RESET_INGREDIENT_MODAL: 'RESET/INGREDIENT_MODAL' = 'RESET/INGREDIENT_MODAL';

export interface ISetIngredientModalAction {
    readonly payload: Object;
    readonly type: typeof SET_INGREDIENT_MODAL;
}
export interface IResetIngredientModalAction {
    readonly type: typeof RESET_INGREDIENT_MODAL;
}

export type TIngredientDetailModalActions =
    | ISetIngredientModalAction
    | IResetIngredientModalAction;


// export const addToModal = (ingredient) => {
//     return function (dispatch) {
//         dispatch({
//             type: SET_INGREDIENT_MODAL,
//             payload: {
//                 ...ingredient
//             }
//         })

//     }
// }