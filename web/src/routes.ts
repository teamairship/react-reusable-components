
import HomePage from './pages/HomePage';
import ModalsPage from './pages/ModalsPage';
import InteractablesPage from './pages/InteractablesPage';

export default [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/modals',
    name: 'Modals',
    component: ModalsPage,
  },
  {
    path: '/interactables',
    name: 'Interactables',
    component: InteractablesPage,
  },
];
