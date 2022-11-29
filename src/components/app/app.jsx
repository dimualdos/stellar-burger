import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
//import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { getItems } from "../../services/actions/ingredients";
import { checkUserAuth } from "../../services/actions/auth";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from "../modal/modal";
import AppHeader from '../app-header/header';
import { ProtectedRoute } from "../protected-route/protected-route";
import { Profile, LoginPage, ResetPass, Register, ForgotPass, NotFound404, MainPage } from "../../pages";
import styles from './app.module.css';


function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state && location.state.background;

  // const orderNum = useRouteMatch([
  //   '/profile/orders/:number',
  //   '/feed/:number',
  // ])?.params?.number;

  const handleModalClose = () => history.goBack();

  useEffect(() => {
    dispatch(getItems());
    dispatch(checkUserAuth());
  }, [dispatch])

  return (
    <>
      <div className={styles.page}>
        <AppHeader />
        <Switch location={background || location}>
          <ProtectedRoute path="/profile" exact={true}>
            <Profile />
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
          <Route path="/ingredients/:id" exact>
            <div className={styles.ingredientWrapper}>
              <p className={styles.ingredientTitle}>Детали ингредиента</p>
              <IngredientDetails />
            </div>
          </Route>
          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route >
            <NotFound404 />
          </Route>
        </Switch>
      </div>
      {background && (
        <>
          <Route path="/ingredients/:id" exact>
            <div className={styles.ingredientWrapper} >
              <Modal onClose={handleModalClose} >
                <IngredientDetails className={styles.ingredientItem} />
              </Modal>
            </div>
          </Route>
          {/* <ProtectedRoute
              path='/profile/orders/:orderNumber'
              exact >
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
            <Route
              path='/feed/number'
              exact >
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            </Route> */}
        </>
      )
      }
    </>
  );

}

export default App;
