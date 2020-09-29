import { cloneDeep } from 'lodash';


const initialState = {
    players: Array.from({length: 4}, (_, id) => ({name:'x', points:42, soli:id > 1 ? 1 : 0, rank:4 - id, pos:(id  + 1) % 4}))
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
        players.push({name:'', points:0, soli:0, rank:0, pos:players.length});

        return {
          ...state,
          players: players
        };
      }
    
      default:
        return state;
    }
  }