

export const setPlayerNames = names => ({
    type: 'SET_PLAYER_NAMES',
    payload: names
})

export const incrementNumberOfPlayers = () => ({
  type: 'INC_PLAYERS',
  payload: {}
});