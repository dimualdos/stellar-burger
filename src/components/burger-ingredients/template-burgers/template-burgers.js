import { useSelector } from 'react-redux';
import React, { useMemo } from 'react';
import { PropTypes } from "prop-types";
import styles from './template-burgers.module.css';
import ItemsIngredientBurgers from '../items-ingredient/items-ingredient';




const TemlateBurger = React.forwardRef(({
    onIngredientClick, ingredientsItems, headlineText, titleId
}, ref) => {
    const { bun, ingredients } = useSelector(state => state.burgerConstructorItem);

    const ingredientCount = useMemo(() => {
        let countObj = {};
        ingredients.forEach(element => {
            if (!countObj[element._id]) countObj[element._id] = 0;
            countObj[element._id]++;
        });
        if (bun) countObj[bun._id] = 2;
        return countObj;
    }, [bun, ingredients]);

    return (
        <section className={styles.mainBurgerColumn} >
            <div className={styles.headlineBurger}>
                <div className={styles.headlineText} id={titleId}>
                    {headlineText}
                </div>
            </div>
            <div className={styles.mainColumn}  >
                <div className={styles.columnBurgeres} ref={ref}>
                    {ingredientsItems.map((value) => {
                        return (
                            <ItemsIngredientBurgers
                                ingredientItem={value}
                                onClick={onIngredientClick}
                                key={value._id}
                                count={ingredientCount[value._id]}
                                id={value._id}
                            />
                        )
                    })}
                </div>
            </div>

        </section>
    )
});

TemlateBurger.propTypes = {
    ingredientsItems: PropTypes.array.isRequired,
    headlineText: PropTypes.string.isRequired,
    titleId: PropTypes.string.isRequired,
    onIngredientClick: PropTypes.func
}


export default TemlateBurger;
