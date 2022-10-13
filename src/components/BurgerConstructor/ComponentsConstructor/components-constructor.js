import PropTypes from 'prop-types';


import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import img from '../../../images/burgerComponent/bun-02.png';
import meat from '../../../images/burgerComponent/meat-02.png';
import sause from '../../../images/burgerComponent/sauce-03.png';

import styles from './components-constructor.module.css'

const ComponentsContructor = () => {



  return (
    <div className={styles.constructorElement}>

      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={img}
      />

      <div className={styles.constructorElemScroll}>
        <div className={styles.constructorCenterElem}>
          <div className={styles.constructorIcon}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text="Соус галактический"
            price={50}
            thumbnail={sause}
          />
        </div>

        <div className={styles.constructorCenterElem}>
          <div className={styles.constructorIcon}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            text="Мясо бессмертных моллюсков"
            price={300}
            thumbnail={meat}
          />
        </div>
      </div>

      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={img}
      />
    </div>
  )
}
ConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
}

export default ComponentsContructor;