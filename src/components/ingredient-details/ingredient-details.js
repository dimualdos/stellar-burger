import { Link, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import styles from './ingredient-details.module.css';


const IngredientDetails = () => {
    const { _id, image, name, proteins, fat, carbohydrates, calories } = useSelector(state => state.ingredientsModal.ingredientModal);
    const location = useLocation();

    return (
        <Link
            to={{
                pathname: `/ingredients/${_id}`,
            }}

            className={styles.article}
            key={_id}>
            <img className={styles.img} src={image} alt='Картинка ингредиента' />
            <div className={styles.frame2}>
                <p className={styles.frame2Text}>{name}</p>
            </div>
            <div className={styles.nutrionValues}>
                <div className={styles.valueDiv}>
                    <p className={styles.textValue}>Калории ккал</p>
                    <p className={styles.value}>{calories}</p>
                </div>
                <div className={styles.valueDiv}>
                    <p className={styles.textValue}>Белки, г</p>
                    <p className={styles.value}>{proteins}</p>
                </div>
                <div className={styles.valueDiv}>
                    <p className={styles.textValue}>Жиры, г</p>
                    <p className={styles.value}>{fat}</p>
                </div>
                <div className={styles.valueDiv}>
                    <p className={styles.textValue}>Углеводы, г</p>
                    <p className={styles.value}>{carbohydrates}</p>
                </div>
            </div>
        </Link>
    )
}

// IngidientDetails.propTypes = {
//     itemBurger: PropTypes.object.isRequired

// }

export default IngredientDetails;
