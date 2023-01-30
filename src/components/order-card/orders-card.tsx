import { FunctionComponent, useMemo } from 'react';
import subtract from '../../images/subtract.png';
import { TengToRusStatus, TProductItem, TWSOrder } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Link, useLocation } from 'react-router-dom';
import { SET_INGREDIENT_MODAL } from '../../services/actions/ingredient-detail-modal';
import styles from './order-card.module.css';



export const OrderCard: FunctionComponent = (value: any) => {
    const { name, number, updatedAt, ingredients, status }: TWSOrder = value;
    const { items } = useAppSelector((store) => store.ingredients);
    const maxIngredients = 6;
    const location = useLocation();
    const dispatch = useAppDispatch();

    const result = formatRelative(new Date(`${updatedAt}`), new Date(), { locale: ru });

    const orderInfo = useMemo(() => {
        if (!items.length) return null;

        const ingredientsInfo = ingredients!.reduce((acc: TProductItem[], item: {}) => {
            const ingredient = items.find((ingr) => ingr._id === item);
            if (ingredient) acc.push(ingredient);
            return acc;
        }, []);

        const totalPriceCard = ingredientsInfo.reduce((acc: number, item: TProductItem) => {
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

    const onIngredientClick = (value: TWSOrder) => {
        dispatch({ type: SET_INGREDIENT_MODAL, payload: orderInfo })

    }

    const engToRusStatus: TengToRusStatus = {
        done: 'Выполнен',
        pending: 'Готовится',
        created: 'Создан'
    }

    return (
        <Link to={{
            pathname: `${location.pathname}/${number}`,
            state: { background: location }
        }}
            onClick={() => onIngredientClick(value)}>

            <div className={styles.containerRibbon}>
                <div className={styles.cardOrdersContainer}>
                    <div className={styles.cardOrderIDDiv}>
                        <div className={styles.idDiv}>
                            #{number}
                        </div>
                        <div className={styles.timeDiv}>
                            {result}
                        </div>
                    </div>
                    <p className={styles.burgerName}>
                        {name}
                    </p>
                    {status === 'done' ? (<p className={styles.orderStatus}>{engToRusStatus.done}</p>) : <p className={styles.orderStatus1}>{engToRusStatus.pending}</p>}
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

