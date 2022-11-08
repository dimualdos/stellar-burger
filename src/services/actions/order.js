import { postOrder } from '../../utils/burger-api';

export const ORDER_REQUEST = 'ORDER/REQUEST';
export const ORDER_SUCCESS = 'ORDER/SUCCESS';
export const ORDER_FAILED = 'ORDER/FAILED';
export const ORDER_RESET = 'ORDER/RESET';

export function orderBurder(orderData) {
    // Воспользуемся первым аргументом из усилителя redux-thunk - dispatch
    return function (dispatch) {
        // Проставим флаг в хранилище о том, что мы начали выполнять запрос
        // Это нужно, чтоб отрисовать в интерфейсе лоудер или заблокировать 
        // ввод на время выполнения запроса
        dispatch({
            type: ORDER_REQUEST
        })
        // Запрашиваем данные у сервера
        postOrder(orderData).then(res => {
            if (res && res.success) {
                // В случае успешного получения данных вызываем экшен
                // для записи полученных данных в хранилище
               
                dispatch({
                    type: ORDER_SUCCESS,
                    payload: res
                })
            } else {
                // Если произошла ошибка, отправляем соотвтествующий экшен
                dispatch({
                    type: ORDER_FAILED
                    //payload: err
                })
            }
        })
    }
} 
