import { useSelector } from 'react-redux';
import React, { useMemo, RefObject } from 'react';
import styles from './template-burgers.module.css';
import ItemsIngredientBurgers from '../items-ingredient/items-ingredient';
import { TProductItem } from '../../../utils/types';


type TTemplateProps = {
    ingredientsItems: Array<TProductItem>;
    headlineText: string;
    titleId: string;
    onIngredientClick: (arg0: TProductItem) => void;
    ref: RefObject<HTMLElement>
}

const TemlateBurger = React.forwardRef<HTMLHeadingElement, TTemplateProps>(({
    onIngredientClick, ingredientsItems, headlineText, titleId
}, ref) => {
    const { bun, ingredients } = useSelector((state: any) => state.burgerConstructorItem);

    const ingredientCount = useMemo(() => {
        let countObj: any = {};
        ingredients.forEach((element: { _id: number; }) => {
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
                    {ingredientsItems.map((value: TProductItem) => {

                        return (
                            <ItemsIngredientBurgers
                                ingredientItem={value}
                                onClick={onIngredientClick}
                                key={value._id}
                                count={ingredientCount[value._id]}
                            />
                        )
                    })}
                </div>
            </div>

        </section>
    )
});

export default TemlateBurger;
