import { useState, useMemo, FunctionComponent } from 'react';
import { useDrop } from "react-dnd";
import { useHistory } from 'react-router-dom';
import { ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ComponentsContructor from './components-constructor/components-constructor';
import OrderDetails from '../order-details/order-details';
import { addToConstructor } from '../../services/actions/constructor';
import Modal from '../modal/modal';
import { orderBurder } from '../../services/actions/order';
import { ORDER_RESET } from '../../services/constants/orders'
import { Spinner } from '../spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { TProductItem } from '../../utils/types';
import { AppDispatch } from '../../services/store';
import { CONSTRUCTOR_RESET } from '../../services/constants/constructor-constant';
import styles from './burger-constructor.module.css';




const BurgerConstructor: FunctionComponent = () => {
    const dispatch: AppDispatch = useAppDispatch();
    const { bun, ingredients } = useAppSelector((state) => state.burgerConstructorItem);
    const { orderRequest, order } = useAppSelector((state) => state.order)
    const user = useAppSelector((state) => state.user.data);
    const [open, setOpen] = useState<any>(false);
    const history = useHistory();

    const [{ isHover }, dropTargerRef] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
        drop(dragItem: unknown) {
            dispatch(addToConstructor(dragItem));
        }
    });
    function dataPostId() {
        if (bun && ingredients) {
            const data = { ingredients: [bun!, ...ingredients!.map((item) => item)].map((value) => value._id) };
            return data;
        }
    }

    const handleClick = () => {
        if (!bun || orderRequest) return;
        if (!user) {
            history.push('/login');
        }
        else {
            dispatch(orderBurder(dataPostId()));
            setOpen({ open: true });
        }
    };

    const closeModal = () => {
        dispatch({ type: ORDER_RESET })
        dispatch({
            type: CONSTRUCTOR_RESET
        })
        setOpen(null)
    };

    const orderData = useMemo(
        () => {
            return order ? order.order.number : <Spinner />;
        },
        [order]);


    const totalPrice = useMemo(() => {
        return ((bun ? bun.price * 2 : 0)
            + ingredients.reduce((a: number, b: { price: number; }) => a + b.price, 0))
    }, [bun, ingredients])




    return (
        <section className={styles.burgerConstructor} ref={dropTargerRef}
            data-testid="constructor">
            {bun ? (
                <div className={styles.constructorElement} >
                    <div className={styles.constructorElemTopBottom}
                    >
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>

                    <div className={styles.constructorComponents}
                        data-testid="constructor-item"
                    >
                        <div className={styles.constructorElemScroll}>

                            {ingredients.map((itemIngredient: TProductItem, index: number) =>
                                <ComponentsContructor
                                    item={itemIngredient}
                                    key={itemIngredient.id}
                                    index={index} />
                            )}


                        </div>
                    </div>

                    <div className={styles.constructorElemTopBottom}
                        data-testid="constructor">
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                </div>
            ) : (
                <div
                    className={styles.noBuns}>
                    <p className={styles.buttonText}>Кидай сюда сначала булки, а потом начинки с соусами</p>
                </div>
            )}

            <div className={styles.constructorInfo}>
                <div className={styles.constructorPrice}>
                    <div className={styles.constructorText}>{totalPrice}</div>
                    <div><CurrencyIcon type="primary" /></div>
                </div>
                <button
                    type='button'
                    onClick={() => handleClick()}
                    className={styles.buttonConstructor}>
                    <p className={styles.buttonText}>Оформить заказ</p>
                </button>
            </div>
            {open ?
                (<Modal onClose={closeModal} smallTitle={false} title='Детали заказа' overlay={true}>
                    <OrderDetails numberOrder={orderData} />
                </Modal>) : null
            }

        </section>
    )
}

export default BurgerConstructor;
