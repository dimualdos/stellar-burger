import { FC } from 'react';
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './items-ingredient.module.css';
import { TProductItem } from "../../../utils/types";

type TingredientItem = {
    count: number | null;
}

type TItemsIngredient = TingredientItem & {
    ingredientItem: TProductItem;
    onClick: (arg0: TProductItem) => void;
    count: number | undefined;
}

const ItemsIngredientBurgers: FC<TItemsIngredient> = ({ ingredientItem,
    onClick,
    count }) => {
    const { image, price, name, _id } = ingredientItem;

    const location = useLocation();
    const [{ opacity }, dragRef] = useDrag(() => ({
        type: 'ingredient',
        item: { ...ingredientItem },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    }));

    return (
        <Link
            to={{
                pathname: `/ingredients/${_id}`,
                state: { background: location }
            }}
            className={style.ingridient}
            onClick={() => onClick(ingredientItem)}
            style={{ opacity }}
            ref={dragRef}
            data-testid='link-ingredient'
        >
            <div className={style.counterColumn}>
                <Counter count={count} size="default" />
            </div>
            <div className={style.content}>
                <div className={style.illustration}>
                    <img src={image} alt="бургер" />
                </div>
                <div className={style.price}>
                    <div className={style.textPrice}>{price}</div>
                    <div className={style.icon}><CurrencyIcon type="primary" /></div>
                </div>
                <div className={style.namePrice}>{name}</div>
            </div>
        </Link>
    )
}

export default ItemsIngredientBurgers;
