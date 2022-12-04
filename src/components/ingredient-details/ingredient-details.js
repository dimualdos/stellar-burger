import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
//import { PropTypes } from 'prop-types';
import styles from './ingredient-details.module.css';


const IngredientDetails = () => {
    const ingredients = useSelector(store => store.ingredients.items);
    const { id } = useParams();
    const ingredient = ingredients.find(item =>
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

// IngredientDetails.propTypes = {
//     _id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     proteins: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     carbohydrates: PropTypes.number.isRequired,
//     calories: PropTypes.number.isRequired
// }

export default IngredientDetails;
