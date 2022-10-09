import AppHeader from '../AppHeader/header';
import BurgerIngredients from '../BurgerIngredients/burger-ingridients';
import BurgerConstructor from '../BurgerConstructor/burger-constructor';


import styles from './app.module.css';

function App() {


  return (
    <div className={styles.page}>
      <AppHeader />
      <BurgerIngredients />
      <BurgerConstructor />
 </div>
  );
}

export default App;
