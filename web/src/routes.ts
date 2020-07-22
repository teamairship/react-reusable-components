
import HomePage from './pages/HomePage';
import ModalsPage from './pages/ModalsPage';
import InteractablesPage from './pages/InteractablesPage';
import FormsPage from './pages/FormsPage';

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
  {
    path: '/forms',
    name: 'Forms',
    component: FormsPage,
  },
];
