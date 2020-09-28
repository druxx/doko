import { createStore } from "redux";
import rootReducer from "./reducers";
import playersReducer from './reducers/playersReducer'

export default createStore(playersReducer);
