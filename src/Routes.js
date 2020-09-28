import Home from './components/Home';
import SessionsTable from './components/SessionsTable'
import Players from './components/Players'
import GamesTable from './components/GamesTable'

  const Routes = [
    {
      path: '/',
      sidebarName: 'Home',
      component: Home
    },
    {
      path: '/sessions',
      sidebarName: 'Spiele-Abende',
      component: SessionsTable
    },
    {
      path: '/players',
      sidebarName: 'Spieler',
      component: Players
    },
    {
        path: '/games',
        sidebarName: 'Spiele Liste',
        component: GamesTable
    }
  ];
  
  export default Routes;