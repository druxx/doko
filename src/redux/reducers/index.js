import { combineReducers } from "redux";
import playersReducer from './playersReducer'
import gamesReducer from './gamesReducer'

export default combineReducers({ games: gamesReducer, players: playersReducer});