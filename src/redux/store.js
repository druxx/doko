import { createStore } from "redux";
import rootReducer from "./reducers";

const createDokoStore = () => {
    
    const persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {};
    const store = createStore(rootReducer, persistedState);
    store.subscribe(()=>{
        localStorage.setItem('reduxState', JSON.stringify(store.getState()))
      });
    return store;
}


export default createDokoStore();
