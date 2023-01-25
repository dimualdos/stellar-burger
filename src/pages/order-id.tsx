import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { TStateReducer } from "../services/reducers";
import { OrderNumber } from "../components/order-number/order-number";
import { getDataOrderCard } from "../services/actions/order-card-number";


export const OrderID: FunctionComponent = () => {
    const dispatch: any = useAppDispatch();
    const dataOrderNumber: any = useAppSelector((store: TStateReducer) => store.dataNumberCard);

    let numberPage: { number: string } = useParams();
    useEffect(() => {
        if (numberPage) dispatch(getDataOrderCard(numberPage.number));
    }, [dispatch]);



    return (
        <div>
            {dataOrderNumber.dataOrderNumber !== null && dataOrderNumber.dataOrderNumber.ingredients && (
                <OrderNumber />
            )}
        </div>
    )
}


