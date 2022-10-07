import AppHeader from '../AppHeader/header';
import Burger from '../BurgerIngredients/burger';
import BurgerConstructor from '../BurgerConstructor/burgerConstructor';


import './App.css';

function App() {


  return (
    <div className="App">
      <AppHeader />

        <Burger />
        <BurgerConstructor />
     

    </div>
  );
}

export default App;
