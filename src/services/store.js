import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer }  from './reducers/index';


const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true,
});
export default store;