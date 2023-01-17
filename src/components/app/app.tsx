import { useEffect, FunctionComponent } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { getItems } from "../../services/actions/ingredients";
import { updateToken } from "../../services/actions/auth";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from "../modal/modal";
import AppHeader from '../app-header/header';
import { ProtectedRoute } from "../protected-route/protected-route";
import { Profile, LoginPage, ResetPass, Register, ForgotPass, NotFound404, MainPage, OrdersProfile, FeedPage } from "../../pages";
import styles from './app.module.css';
import { TLocationState } from '../../utils/types';
import { OrderID } from "../../pages/order-id";
import { TStateReducer } from "../../services/reducers";
import { Spinner } from "../spinner/spinner";

const App: FunctionComponent = () => {
  const dispatch: any = useAppDispatch();
  const dataOrderNumber: any = useAppSelector((store: TStateReducer) => store.dataNumberCard);
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const backgroundApp = location.state && location.state.background;

  const handleModalClose = () => history.goBack();

  useEffect(() => {
    dispatch(getItems());
    dispatch(updateToken());
  }, [dispatch])

  return (
    <>
      <div className={styles.page}>
        <AppHeader />
        <Switch location={backgroundApp || location}>
          <ProtectedRoute path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <OrdersProfile />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders/:number' exact  >
            {dataOrderNumber ? (
              <div className={styles.ingredientWrapper}>
                <div className={styles.orderID}>
                  {`#${dataOrderNumber.number}`}
                </div>
                <OrderID />
              </div>) : (<div className={styles.spinner}><Spinner /></div>)}
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth={true} path="/login" exact>
            <LoginPage />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth={true} path="/register" exact>
            <Register />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact>
            <ForgotPass />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact>
            <ResetPass />
          </ProtectedRoute>
          <Route path={'/feed/:number'} exact>
            {dataOrderNumber ? (
              <div className={styles.ingredientWrapper}>
                <div className={styles.orderID}>
                  {`#${dataOrderNumber.number}`}
                </div>
                <OrderID />
              </div>
            ) : <Spinner />}

          </Route>
          <Route path={`/ingredients/:id`} exact>
            <div className={styles.ingredientWrapper}>
              <p className={styles.ingredientTitle}>Детали ингредиента</p>
              <IngredientDetails />
            </div>
          </Route>

          <Route path="/feed" exact>
            <FeedPage />
          </Route>

          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route >
            <NotFound404 />
          </Route>
        </Switch>
      </div>
      {backgroundApp && (
        <>
          <Route path="/ingredients/:id" exact>
            <div className={styles.ingredientWrapper} >
              <Modal onClose={handleModalClose} title={'Детали ингредиента'} overlay={true}>
                <IngredientDetails />
              </Modal>
            </div>
          </Route>
          <ProtectedRoute path='/profile/orders/:number' exact >
            {dataOrderNumber && (
              <Modal onClose={handleModalClose} title={dataOrderNumber.number} overlay={true}>
                <OrderID />
              </Modal>
            )}

          </ProtectedRoute>
          <Route path='/feed/:number' exact >
            {dataOrderNumber && (
              <Modal onClose={handleModalClose} title={dataOrderNumber.number} overlay={true}>
                <OrderID />
              </Modal>
            )

            }

          </Route>
        </>
      )
      }
    </>
  );

}

export default App;
