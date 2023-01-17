import { FunctionComponent, useEffect } from 'react';
import { LeftSectionInProfile } from './profile';
import { ScrollCopmponent } from '../components/scroll-component/scroll-component';
import { OrderCard } from '../components/order-card/orders-card';
import styles from './css/profile.module.css';
import { cookieWithoutBearer } from '../utils/cooke';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { TStateReducer } from '../services/reducers';
import { WS_ORDERS_USER } from '../utils/burger-api';
import { Spinner } from '../components/spinner/spinner';




export const OrdersProfile: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const { messages1 }: any = useAppSelector((store: TStateReducer) => store.webSocetProfile);

    useEffect(() => {
        if (cookieWithoutBearer) dispatch({
            type: 'WS_CONNECT_PROFILE',
            payload: WS_ORDERS_USER,
        });
        return () => {
            dispatch({ type: 'WS_CONNECTION_CLOSED_PROFILE', payload: undefined });
        }
    }, [dispatch]);


    return (
        <section className={styles.section}>
            <div className={styles.leftContainer}>
                <LeftSectionInProfile />
            </div>
            <section className={styles.rightContainer}>
                <ScrollCopmponent>
                    {messages1.orders ? (messages1.orders.map((value: any) => < OrderCard {...value} key={value._id} />).reverse())
                        : (<div className={styles.divSpinner}>
                            <Spinner />
                        </div>)}
                </ScrollCopmponent>
            </section>
        </section>

    )
}
