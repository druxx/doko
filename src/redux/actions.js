

export const setPlayerNames = names => ({
    type: 'SET_PLAYER_NAMES',
    payload: names
})

export const incrementNumberOfPlayers = () => ({
  type: 'INC_PLAYERS',
  payload: {}
});

export const addGameResult = gameResult => ({
  type: 'ADD_GAME_RESULT',
  payload: gameResult
})