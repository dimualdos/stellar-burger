
import { FunctionComponent, useMemo } from 'react';
import subtract from '../../images/subtract.png';
import { TWSOrder } from '../../utils/types';
import { useAppSelector } from '../../hooks/hooks';
import { TStateReducer } from '../../services/reducers';
import styles from './order-card.module.css';
import { Link, useLocation } from 'react-router-dom';

export const OrderCard: FunctionComponent = (value) => {
    const { name, number, updatedAt, ingredients }: TWSOrder = value;
    // const { messages }: { messages: TWSOrder[] } = useAppSelector((store: any) => store.webSocet);
    const { items }: any = useAppSelector((store: TStateReducer) => store.ingredients);
    const maxIngredients = 6;
    const location = useLocation();

    const orderInfo = useMemo(() => {
        if (!items.length) return null;

        const ingredientsInfo = ingredients!.reduce((acc: any[], item: any): any => {
            const ingredient = items.find((ingr: { _id: number; }) => ingr._id === item);
            if (ingredient) acc.push(ingredient);
            return acc;
        }, []);
        console.log(ingredientsInfo)
        const totalPriceCard = ingredientsInfo.reduce((acc: any, item: any) => {
            return acc + item.price;
        }, 0);
        const ingredientsShow = ingredientsInfo.slice(0, maxIngredients);
        const scrapIngr = ingredientsInfo.length > maxIngredients
            ? ingredientsInfo.length - maxIngredients : ingredientsInfo;
        return {
            ...value,
            ingredientsInfo,
            ingredientsShow,
            scrapIngr,
            totalPriceCard
        }
    }, [ingredients, items, value])

    if (!orderInfo) return null;

    return (
        <Link to={{
            pathname: `${location.pathname}/${number}`
        }}>
            <div className={styles.containerRibbon}>
                <div className={styles.cardOrdersContainer}>
                    <div className={styles.cardOrderIDDiv}>
                        <div className={styles.idDiv}>
                            #{number}
                        </div>
                        <div className={styles.timeDiv}>
                            {updatedAt}
                        </div>
                    </div>
                    <p className={styles.burgerName}>
                        {name}
                    </p>
                    <div className={styles.componentsBurger}>
                        <div className={styles.ingredientsRow}>
                            {orderInfo && orderInfo.ingredientsShow.map((item: any, i: number) => {
                                let zIndex = maxIngredients - i;
                                let right = -2 * 10;
                                return (
                                    <li
                                        key={i}
                                        style={{ zIndex: zIndex, marginRight: right }}
                                        className={styles.ingredientsPreview}>
                                        <img
                                            style={{
                                                opacity: orderInfo.scrapIngr && maxIngredients === i + 1
                                                    ? '0.4'
                                                    : '1'
                                            }}
                                            src={item.image_mobile}
                                            alt={item.name}
                                            className={styles.imgCard} />
                                        {maxIngredients === i + 1 ? (
                                            <span className={styles.spanOrders}>
                                                {orderInfo.scrapIngr > 0 ? `+${orderInfo.scrapIngr}` : null}
                                            </span>
                                        ) : null}
                                    </li>
                                )
                            }
                            )}

                        </div>
                        <div className={styles.priceContainer}>
                            <p className={styles.textPrice}>
                                {orderInfo && orderInfo.totalPriceCard}
                            </p>
                            <img src={subtract} alt="money" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}

