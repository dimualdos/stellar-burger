import { FunctionComponent, useMemo } from "react";
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useAppSelector } from "../../hooks/hooks";
import { TStateReducer } from "../../services/reducers";
import subtract from '../../images/subtract.png';
import styles from './order-number.module.css';

type TIngredient = {
    price: number;
    image_mobile: string | undefined;
    name: string | undefined;
}

export const OrderNumber: FunctionComponent = () => {
    const dataOrderNumber: any = useAppSelector((store: TStateReducer) => store.dataNumberCard);
    const items: any = useAppSelector((store: TStateReducer) => store.ingredients);
    const maxIngredients = 6;
    const result = formatRelative(new Date(`${dataOrderNumber.dataOrderNumber.updatedAt}`), new Date(), { locale: ru });

    const orderInfo = useMemo(() => {
        if (!items.length && !dataOrderNumber.dataOrderNumber) return null;
        const count: any = new Map();
        const ingredientsInfo = dataOrderNumber.dataOrderNumber!.ingredients!.reduce((acc: any[], item: any): any => {
            const ingredient = items.items.find((ingr: { _id: number; }) => ingr._id === item);
            if (ingredient) acc.push(ingredient);
            if (ingredient && count.has(ingredient)) {
                let num = 1;
                num = count.get(ingredient);
                num += +1;
                count.delete(ingredient);
                count.set(ingredient, num);
            } else if (ingredient) count.set(ingredient, 1);
            return acc;
        }, []);
        const ingredientArray = [];
        for (let entry of count) {
            ingredientArray.push(entry);
        }
        const totalPriceCard = ingredientsInfo.reduce((acc: any, item: any) => {
            return acc + item.price;
        }, 0);
        const ingredientsShow = ingredientsInfo.slice(0, maxIngredients);
        return {
            ...dataOrderNumber,
            ingredientArray,
            ingredientsInfo,
            ingredientsShow,
            totalPriceCard
        }
    }, [items, dataOrderNumber])

    return (
        <section >
            <header className={styles.orderHeader}>
                <div className={styles.orderTitle}>{dataOrderNumber.dataOrderNumber.name}</div>
                {dataOrderNumber.dataOrderNumber.status === 'done' ? (<p className={styles.orderStatus}>Выполнен</p>) : ((<p className={styles.orderStatus1}>Отменен</p>))}
            </header>
            <main>
                <div className={styles.orderTitle}>
                    Состав:
                </div>
                <section className={styles.scrollDiv} >
                    {orderInfo && orderInfo.ingredientArray.map((item: TIngredient[], i: number) => {
                        return (
                            <li
                                className={styles.ingredientsRow}
                                key={i}>
                                <div className={styles.priceAndImg}>
                                    <img src={item[0].image_mobile}
                                        alt={item[0].name}
                                        className={styles.ingredientsPreview} />
                                    <div className={styles.nameIngredient}>{item[0].name}</div>
                                </div>
                                <div className={styles.priceAndImg}>
                                    <p className={styles.textPrice}>{`${item[1]} × ${item[0].price}`}</p>
                                    <img className={styles.imgCard} src={subtract} alt="money" />
                                </div>
                            </li>
                        )
                    })}
                </section>
                <div className={styles.timeAndPrice}>
                    <p className={styles.timesStamp}>{result}</p>
                    <p className={styles.textPrice}>{orderInfo?.totalPriceCard}</p>
                    <img className={styles.imgCard} src={subtract} alt="money" />
                </div>
            </main>
        </section>
    )
}


