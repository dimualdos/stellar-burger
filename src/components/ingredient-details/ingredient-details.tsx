import { FunctionComponent } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { TStateReducer } from '../../services/reducers';
import styles from './ingredient-details.module.css';



const IngredientDetails: FunctionComponent = () => {
    const ingredients = useSelector((store: TStateReducer) => store.ingredients.items);
    const { id } = useParams<any>();
    const ingredient = ingredients.find((item: { _id: string; }) =>
        item._id === id);

    return (
        <>
            {ingredient && (
                <div
                    className={styles.article}
                    key={ingredient._id}>
                    <img className={styles.img} src={ingredient.image} alt='Картинка ингредиента' />
                    <div className={styles.frame2}>
                        <p className={styles.frame2Text}>{ingredient.name}</p>
                    </div>
                    <div className={styles.nutrionValues}>
                        <div className={styles.valueDiv}>
                            <p className={styles.textValue}>Калории ккал</p>
                            <p className={styles.value}>{ingredient.calories}</p>
                        </div>
                        <div className={styles.valueDiv}>
                            <p className={styles.textValue}>Белки, г</p>
                            <p className={styles.value}>{ingredient.proteins}</p>
                        </div>
                        <div className={styles.valueDiv}>
                            <p className={styles.textValue}>Жиры, г</p>
                            <p className={styles.value}>{ingredient.fat}</p>
                        </div>
                        <div className={styles.valueDiv}>
                            <p className={styles.textValue}>Углеводы, г</p>
                            <p className={styles.value}>{ingredient.carbohydrates}</p>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default IngredientDetails;
