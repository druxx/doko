import { cloneDeep } from 'lodash';


const initialState = {
    players: Array.from({length: 4}, (_, id) => ({name:'', soli:0 }))
};
  
export default function(state = initialState, action) {
    switch (action.type) {
      case 'SET_PLAYER_NAMES': {
        const playerNames = action.payload;
        let players = cloneDeep(state.players);
        players.forEach( (player,i) => {
          player.name = playerNames[i];
        });

        return {
          ...state,
          players: players
        };
      }        

      case 'INC_PLAYERS': {
        let players = [...state.players];
        players.push({name:'', soli:0});

        return {
          ...state,
          players: players
        };
      }
    
      default:
        return state;
    }
  }