
import React from 'react';

import cx from '../../utils/css/composeClassNames';
import routes from '../../routes';
import focusElement from '../../utils/dom/focusElement';

interface NavItemProps {
  route: any,
  hideNav: () => void,
  history: any,
  refNavToggle: React.Ref<any>,
}
const NavItem: React.FC<NavItemProps> = ({
  route,
  hideNav,
  history,
  refNavToggle,
}) => {
  return (
    <li>
      <a
        href={route.path}
        className={cx('nav-menu-link', {
          active: route.path === history.location.pathname,
          'theme-accent': route.path !== history.location.pathname,
          'theme-nav': route.path === history.location.pathname,
        })}
        onClick={(ev) => {
          ev.preventDefault();
          hideNav();
          history.push(route.path);
          // @ts-ignore
          focusElement(refNavToggle.current);
        }}
      >
        {route.name}
      </a>
    </li>
  );
};

interface NavMenuProps {
  hideNav: () => void,
  history: any,
  refNavToggle: React.Ref<any>,
}
const NavMenu: React.FC<NavMenuProps> = ({
  history,
  hideNav,
  refNavToggle,
}) => {
  return (
    <ul className="nav-menu">
      {routes.map(route => (
        <NavItem
          route={route}
          history={history}
          hideNav={hideNav}
          refNavToggle={refNavToggle}
        />
      ))}
    </ul>
  );
};

export default NavMenu;
