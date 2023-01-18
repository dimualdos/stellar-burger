import { Dispatch, Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../store';
import { TUserActions } from '../actions/auth';
import { TConstructorActions } from '../actions/constructor';
import { TIngredientDetailModalActions } from '../actions/ingredient-detail-modal';
import { TIngredientsActions } from '../actions/ingredients';
import { TOrderActions } from '../actions/order';
import { TDataOrderActions } from '../actions/order-card-number';
import { TWSConnectActions, TWSConnectActionsProfileOrders } from '../actions/ws-actions';




export type TApplicationActions = TUserActions
    | TConstructorActions
    | TIngredientDetailModalActions
    | TIngredientsActions
    | TOrderActions
    | TDataOrderActions
    | TWSConnectActions
    | TWSConnectActionsProfileOrders;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = Dispatch<TApplicationActions>;

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;  