import PropTypes from 'prop-types';
import { useContext, useEffect, useMemo } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerContext } from '../../../services/burger-context';
import { TotalPriceContext, OrderPostId } from '../../../services/burger-context';
import styles from './components-constructor.module.css';




const ComponentsContructor = () => {
  const burger = useContext(BurgerContext);
  const { setTotalPrice } = useContext(TotalPriceContext);
  const { dataId, setDataId } = useContext(OrderPostId);

  const ingr = useMemo(
    () =>
      burger.data.filter(item => item.type !== 'bun'),
    [burger]);

  const bread = useMemo(
    () =>
      burger.data.filter(item => item.type === "bun"),
    [burger]);

  useEffect(() => {
    let id1 = bread[0]._id;
    let id = ingr.map(item => item._id)
    if (bread && ingr) {
      setDataId([...dataId, id1, ...id])
    }
  }, []);

  useEffect(
    () => {
      let total = 0;
      total += bread[0].price * 2;
      total += ingr.map(item => item.price).reduce((prevous, next) => prevous + next, 0);
      setTotalPrice(total);
    },
    [bread, ingr, setTotalPrice]
  );

  const ingrItem = ingr.map(value => {
    return (
      <div className={styles.constructorCenterElem} key={value._id}>
        <div className={styles.constructorIcon}>
          <DragIcon type="primary" />
        </div>
        <ConstructorElement
          text={value.name}
          price={value.price}
          thumbnail={value.image}
        />
      </div>
    )
  });

  return (
    <div className={styles.constructorElement}>
      <div className={styles.constructorElemTopBottom}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bread[0].name} (верх)`}
          price={bread[0].price}
          thumbnail={bread[0].image}
        />
      </div>

      <div className={styles.constructorElemScroll}>
        {ingrItem}
      </div>
      <div className={styles.constructorElemTopBottom}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bread[0].name} (низ)`}
          price={bread[0].price}
          thumbnail={bread[0].image}
        />
      </div>

    </div>
  )
}

ConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
}

export default ComponentsContructor;