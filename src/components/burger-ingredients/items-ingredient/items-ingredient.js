import { useDrag } from "react-dnd";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './items-ingredient.module.css';
import { PropTypes } from "prop-types";

const ItemsIngredientBurgers = ({ ingredientItem,
    onClick,
    count }) => {

    const [{ opacity }, dragRef] = useDrag(() => ({
        type: 'ingredient',
        item: { ...ingredientItem },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    }));


    return (
        <div
            className={style.ingridient}
            onClick={() => onClick(ingredientItem)}
            style={{ opacity }}
            ref={dragRef}
        >
            <div className={style.counterColumn}>
                <Counter count={count} size="default" />
            </div>
            <div className={style.content}>
                <div className={style.illustration}>
                    <img src={ingredientItem.image} alt="бургер" />
                </div>
                <div className={style.price}>
                    <div className={style.textPrice}>{ingredientItem.price}</div>
                    <div className={style.icon}><CurrencyIcon type="primary" /></div>
                </div>
                <div className={style.namePrice}>{ingredientItem.name}</div>
            </div>
        </div>
    )
}

ItemsIngredientBurgers.propTypes = {
    ingredientItem: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    count: PropTypes.number
}


export default ItemsIngredientBurgers;