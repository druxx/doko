const initialState = {
    players: Array(4).fill({name:'', points:0, soli:0, rank:0, pos:0})
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case 'SET_PLAYER_NAMES': {
        const playerNames = action.payload;
        let players = state.players;
        if (playerNames.length > state.players.length) {
            players = [];
            playerNames.forEach(player => {
                players.push({name: player});                
            });
        } else {
            players.forEach( (player,index) => {
                player.name = playerNames[index];
            });
        }

        return {
          ...state,
          players: players
        };
      }
    
      default:
        return state;
    }
  }