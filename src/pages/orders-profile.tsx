import { FunctionComponent, useEffect } from 'react';
import { LeftSectionInProfile } from './profile';
import { ScrollCopmponent } from '../components/scroll-component/scroll-component';
import { OrderCard } from '../components/order-card/orders-card';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { WS_ORDERS_USER } from '../utils/burger-api';
import { Spinner } from '../components/spinner/spinner';
import { AppDispatch } from '../services/store';
import styles from './css/profile.module.css';


export const OrdersProfile: FunctionComponent = () => {

    const dispatch: AppDispatch = useAppDispatch();
    const { messages } = useAppSelector((store) => store.webSocetFeed);
    const cookieData = document.cookie.match(/(accessToken=)(.+)/);

    let webSocketUser = '';
    if (cookieData) {
        const cookieWithoutBearer = cookieData![2].replace('Bearer%20', '');
        webSocketUser = `${WS_ORDERS_USER}?token=${cookieWithoutBearer}`
    }

    useEffect(() => {
        dispatch({
            type: 'WS_CONNECT',
            payload: webSocketUser,
        });
        return () => {
            dispatch({ type: 'WS_CONNECTION_CLOSED', payload: undefined });
        }
    }, [dispatch]);


    return (
        <section className={styles.section}>
            <div className={styles.leftContainer}>
                <LeftSectionInProfile />
            </div>
            <section className={styles.rightContainer}>
                {messages.success && messages.orders!.length ? (
                    <ScrollCopmponent>
                        {messages.orders ? (messages.orders.map((value) => < OrderCard {...value} key={value._id} />).reverse())
                            : (<div className={styles.divSpinner}>
                                <Spinner />
                            </div>)}
                    </ScrollCopmponent>
                ) : (
                    <div className={styles.divSpinner}>
                        <p className={styles.textProfileWhite}>Заказов пока нет</p>
                    </div>
                )
                }

            </section>
        </section>

    )
}
