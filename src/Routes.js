import Home from './components/Home';
import SessionsTable from './components/SessionsTable'
import StyledPlayers from './components/Players'
import GamesTable from './components/GamesTable'
import GameScore from './components/GameScore';

  const Routes = [
    {
      path: '/',
      sidebarName: 'Home',
      component: Home
    },
    {
      path: '/score',
      sidebarName: 'neues  Spiel-Ergebnis',
      component: GameScore
    },
    {
      path: '/sessions',
      sidebarName: 'Spiele-Abende',
      component: SessionsTable
    },
    {
      path: '/players',
      sidebarName: 'Spieler',
      component: StyledPlayers
    },
    {
        path: '/games',
        sidebarName: 'Spiele Liste',
        component: GamesTable
    }
  ];
  
  export default Routes;