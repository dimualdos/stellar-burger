import { FunctionComponent, useMemo } from "react";
import { formatRelative } from 'date-fns';
import { ru } from 'date-fns/locale';
import { useAppSelector } from "../../hooks/hooks";
import { TStateReducer } from "../../services/reducers";
import subtract from '../../images/subtract.png';
import styles from './order-number.module.css';

type TDict = {
    [key: string]: string;
};

type TIngredient = {
    price: number;
    image_mobile: string | undefined;
    name: string | undefined;
}

export const OrderNumber: FunctionComponent = () => {
    const { dataOrderNumber }: any = useAppSelector((store: TStateReducer) => store.dataNumberCard);
    const { items }: any = useAppSelector((store: TStateReducer) => store.ingredients);
    const maxIngredients = 6;
    const result = formatRelative(new Date(`${dataOrderNumber.updatedAt}`), new Date(), { locale: ru });
    // let { number }: { number: string } = useParams();
    //console.log(number)
    const orderInfo = useMemo(() => {
        if (!items.length && !dataOrderNumber) return null;

        const ingredientsInfo = dataOrderNumber.ingredients!.reduce((acc: any[], item: any): any => {
            const ingredient = items.find((ingr: { _id: number; }) => ingr._id === item);
            if (ingredient) acc.push(ingredient);
            console.log(acc)
            return acc;
        }, []);
        // console.log(ingredientsInfo)
        const totalPriceCard = ingredientsInfo.reduce((acc: any, item: any) => {
            return acc + item.price;
        }, 0);
        const ingredientsShow = ingredientsInfo.slice(0, maxIngredients);
        const scrapIngr = ingredientsInfo.length > maxIngredients
            ? ingredientsInfo.length - maxIngredients : ingredientsInfo;
        return {
            ...dataOrderNumber,
            ingredientsInfo,
            ingredientsShow,
            scrapIngr,
            totalPriceCard
        }
    }, [items, dataOrderNumber])


    return (

        <section >
            <header className={styles.orderHeader}>
                <div className={styles.orderTitle}>{dataOrderNumber.name}</div>
                {dataOrderNumber.status === 'done' ? (<p className={styles.orderStatus}>Выполнен</p>) : ((<p className={styles.orderStatus1}>Отменен</p>))}

            </header>
            <main>
                <div className={styles.orderTitle}>
                    Состав:
                </div>
                <section className={styles.scrollDiv} >
                    {orderInfo && orderInfo.ingredientsInfo.map((item: TIngredient, i: number) => {
                        return (
                            <li
                                className={styles.ingredientsRow}
                                key={i}>
                                <div className={styles.priceAndImg}>
                                    <img src={item.image_mobile}
                                        alt={item.name}
                                        className={styles.ingredientsPreview} />
                                    <div className={styles.nameIngredient}>{item.name}</div>
                                </div>

                                <div className={styles.priceAndImg}>
                                    <p className={styles.textPrice}>{item.price}</p>
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


