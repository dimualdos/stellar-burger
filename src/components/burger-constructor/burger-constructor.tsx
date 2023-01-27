import { useState, useMemo, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { useHistory, useLocation } from 'react-router-dom';
import { ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ComponentsContructor from './components-constructor/components-constructor';
import OrderDetails from '../order-details/order-details';
import { addToConstructor } from '../../services/actions/constructor';
import styles from './burger-constructor.module.css';
import Modal from '../modal/modal';
import { orderBurder } from '../../services/actions/order';
import { ORDER_RESET } from '../../services/constants/orders'
import { Spinner } from '../spinner/spinner';
import { TStateReducer } from '../../services/reducers';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { TProductItem } from '../../utils/types';

type TburgerConstructor = {
    state: TProductItem;
    burgerConstructorItem: any;
}


const BurgerConstructor: FunctionComponent = () => {
    const dispatch: any = useAppDispatch();
    const { bun, ingredients } = useSelector((state: TburgerConstructor) => state.burgerConstructorItem);
    const { orderRequest, order } = useAppSelector((state: TStateReducer) => state.order)
    const user = useAppSelector((state: TStateReducer) => state.user.data);
    const [open, setOpen] = useState<any>(false);
    const history = useHistory();
    const location = useLocation();


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
            const data = { ingredients: [bun, ...ingredients.map((item: TProductItem) => item)].map((value) => value._id) };
            return data;
        }
    }

    const handleClick = () => {
        if (!bun || orderRequest) return;
        if (!user) {
            history.replace({
                pathname: '/login',
                state: { background: location }
            });
            history.push('/login');
        }
        else {
            dispatch(orderBurder(dataPostId()));
            setOpen({ open: true });
        }
    };

    const closeModal = () => {
        dispatch({ type: ORDER_RESET })
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
        <section className={styles.burgerConstructor} ref={dropTargerRef}>
            {bun ? (
                <div className={styles.constructorElement} >
                    <div className={styles.constructorElemTopBottom}
                        data-testid="constructor">

                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>

                    <div className={styles.constructorComponents} >
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
                (<Modal onClose={closeModal} title='Детали заказа' overlay={false}>
                    <OrderDetails numberOrder={orderData} />
                </Modal>) : null
            }

        </section>
    )
}

export default BurgerConstructor;
