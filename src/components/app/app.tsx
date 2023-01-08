import { useEffect, FunctionComponent } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from '../../hooks/hooks';
import { getItems } from "../../services/actions/ingredients";
import { updateToken } from "../../services/actions/auth";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from "../modal/modal";
import AppHeader from '../app-header/header';
import { ProtectedRoute } from "../protected-route/protected-route";
import { Profile, LoginPage, ResetPass, Register, ForgotPass, NotFound404, MainPage, OrdersProfile, FeedPage } from "../../pages";
import styles from './app.module.css';
import { TLocationState } from '../../utils/types';

const App: FunctionComponent = () => {
  const dispatch: any = useAppDispatch();
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const backgroundApp = location.state && location.state.background;
  // const orderNum = useRouteMatch([
  //   '/profile/orders/:number',
  //   '/feed/:number',
  // ])?.params?.number;

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
          {/* <ProtectedRoute  path='/profile/orders/:id' exact >
              <Modal onClose={handleModalClose}>
                <OrderID />
              </Modal>
            </ProtectedRoute>
            <Route
              path='/feed/:id'
              exact >
              <Modal onClose={handleModalClose}>
                <OrderID />
              </Modal>
            </Route> */}
        </>
      )
      }
    </>
  );

}

export default App;
