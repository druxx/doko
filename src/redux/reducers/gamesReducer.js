import { cloneDeep } from 'lodash';

const initialState = {
  games: [],
  lead: 0
};
  
export default function(state = initialState, action) {
    switch (action.type) {
      case 'ADD_GAME_RESULT': {
        const game = cloneDeep(action.payload);
        const games = cloneDeep(state.games);
        const players = game.winningPlayers.length;
        const dealer = state.lead - 1 >= 0 ? state.lead - 1 : players - 1;
        const winners = game.winningPlayers.reduce((accumulator, item) => accumulator + item);
        const points =  game.winningPlayers.map( (winner,index) => {
          let lastRow = null;
          if (games.length !== 0)
            lastRow = games[games.length - 1];
          else
            lastRow = {points: Array(players).fill(0)};
          if (winner) {
            if (winners > 1)
              return lastRow.points[index] + game.result;
            else
              return lastRow.points[index] + 3 * game.result;
          } 
          else {
            if (players > 4 && index === dealer) 
              return lastRow.points[index];
            else if (winners < 3)
              return lastRow.points[index] - game.result;
            else
              return lastRow.points[index] - 3 * game.result;
          } 
        });
        game.points = points;
        games.push(game);
        return {
          ...state,
          lead: winners !== 2 ? state.lead : (state.lead + 1) % players, 
          games: games
        };
      }        

      default:
        return state;
    }
  }