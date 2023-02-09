import { FunctionComponent, useEffect } from "react";
import { ScrollCopmponent } from "../components/scroll-component/scroll-component";
import { OrderCard } from "../components/order-card/orders-card";
import { WS_ORDERS_FEED } from "../utils/burger-api";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Spinner } from "../components/spinner/spinner";
import styles from './css/feed.module.css';
import { AppDispatch } from "../services/store";



export const FeedPage: FunctionComponent = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const messagesFeed = useAppSelector((store) => store.webSocetFeed.messages);

    useEffect(() => {
        dispatch({
            type: 'WS_CONNECT',
            payload: WS_ORDERS_FEED
        });
        return () => {
            dispatch({ type: 'WS_CONNECTION_CLOSED' });
        }
    }, [dispatch]);

    return (
        <main className={styles.mainContainer}>
            <section className={styles.leftContainer}>
                <h1 className={styles.header}>
                    Лента заказов
                </h1>
                <ScrollCopmponent>
                    {messagesFeed.orders ? (messagesFeed.orders.map((value) => < OrderCard {...value} key={value._id} />))
                        : (<div className={styles.divSpinner}>
                            <Spinner />
                        </div>)}
                </ScrollCopmponent>
            </section>
            <section className={styles.rightConainer}>
                <section className={styles.orderBoard}>
                    <div className={styles.doneBoard}>
                        <p className={styles.headerDone}>Готовы:</p>
                        <ul className={styles.doneBoardUL}>
                            {messagesFeed.orders && (messagesFeed!.orders.map((value, i: number) => {
                                return (
                                    value.status === 'done' ? <li key={i} className={styles.listDone}>{value.number}</li> : null
                                )
                            }
                            ))}
                        </ul>
                    </div>
                    <div className={styles.doneBoard}>
                        <p className={styles.headerDone}>В работе:</p>
                        <ul className={styles.doneBoardUL}>
                            {messagesFeed.orders && (messagesFeed!.orders.map((value, i: number) => {
                                return (
                                    value.status === 'pending' ? <li key={i} className={styles.listWork}>{value.number}</li> : null
                                )
                            }
                            ))}
                        </ul>
                    </div>
                </section>
                <section className={styles.comletedRow}>
                    <p className={styles.headerOrdersBoard}>Выполнено за всё время:</p>
                    <p className={styles.textComletedRow}>{messagesFeed && messagesFeed.total}</p>
                </section>
                <section className={styles.comletedRow}>
                    <p className={styles.headerOrdersBoard}>Выполнено за сегодня:</p>
                    <p className={styles.textComletedRow}>{messagesFeed && messagesFeed.totalToday}</p>
                </section>
            </section>
        </main>
    )
}
