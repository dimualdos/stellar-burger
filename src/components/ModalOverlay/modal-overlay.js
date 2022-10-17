import { PropTypes } from "prop-types";
import styles from './modal-overlay.module.css';

const ModalOverlay = ({data}) => {
    return (
        
        <div  className={styles.modalOverLay} onClick={data}></div> 
    )
}
ModalOverlay.propTypes = {
    data: PropTypes.func
}

export default ModalOverlay;