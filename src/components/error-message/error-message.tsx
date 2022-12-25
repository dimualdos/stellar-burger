import styles from './error-message.module.css'
import img from './error.gif';

const ErrorMessage = () => {
    return (
        <img className={styles.errorDiv} src={img} alt='img' />
    )
}

export default ErrorMessage;
