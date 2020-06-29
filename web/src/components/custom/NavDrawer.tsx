
import React from 'react';

import cx from '../../utils/css/composeClassNames';
import getDOMBody from '../../utils/dom/getDOMBody';

import './NavDrawer.scss';

const CLASSNAME_BODY_NAV_SHOWING = 'nav-drawer-showing';
const CLASSNAME_BODY_NAV_ANIMATE_SLIDE = 'animate-drawer-slide';
const CLASSNAME_NAV_SHOWING = 'show';
const CLASSNAME_NAV_ANIMATE_SLIDE_OVER = 'animate-slide-over';
const ANIMATION_TIME_PRE_SHOW = 50;
const ANIMATION_TIME_FADE = 250;

export type DrawerAnimationType = 'slide' | 'slideOver' | 'none';

interface Props {
  isShowing?: boolean,
  hideNav?: () => void,
  animationType?: DrawerAnimationType,
}
const NavDrawer: React.FC<Props> = ({
  isShowing,
  hideNav,
  children,
  animationType = 'slide',
}) => {
  const [isRendering, setIsRendering] = React.useState<boolean>(false);
  const [isVisible, setIsVisible] = React.useState<boolean>(false);
  const wasShowing = React.useRef<boolean>(false);
  const t = React.useRef<(number)[]>([]);

  const clearAllTimeouts = () => {
    t.current.forEach(timeout => clearTimeout(timeout));
  };
  const addTimeout = (fnc: TimerHandler, time?: number) => {
    t.current.push(
      setTimeout(fnc, time)
    );
    t.current[0] = setTimeout(fnc, time);
  };

  React.useEffect(() => {
    if (animationType === 'slide') {
      getDOMBody().classList.add(CLASSNAME_BODY_NAV_ANIMATE_SLIDE);
    } else {
      getDOMBody().classList.remove(CLASSNAME_BODY_NAV_ANIMATE_SLIDE);
    }
  }, [animationType]);

  React.useEffect(() => {
    clearAllTimeouts();
    if (isShowing && !wasShowing.current) {
      if (animationType === 'slide' || animationType === 'none') {
        getDOMBody().classList.add(CLASSNAME_BODY_NAV_SHOWING);
      }
      setIsRendering(true);
      // modal must first have `display: block` applied
      // before the `show` css-class can activate the
      // fade-in css-transition
      addTimeout(() => {
        setIsVisible(true);
      }, ANIMATION_TIME_PRE_SHOW);
      addTimeout(() => {
        // after show
      }, ANIMATION_TIME_PRE_SHOW + ANIMATION_TIME_FADE);
    } else if (!isShowing && wasShowing.current) {
      if (animationType === 'slide' || animationType === 'none') {
        getDOMBody().classList.remove(CLASSNAME_BODY_NAV_SHOWING);
      }
      setIsVisible(false);
      addTimeout(() => {
        setIsRendering(false);
      }, ANIMATION_TIME_FADE);
    }
    wasShowing.current = !!isShowing;

    return () => {
      clearAllTimeouts();
    }
  }, [isShowing]);

  if (!isRendering) return null;

  const handleHideNav = () => {
    hideNav && hideNav();
  };
  const classNameShow = isVisible ? CLASSNAME_NAV_SHOWING : '';
  const classNameSlideOver = animationType === 'slideOver' ? CLASSNAME_NAV_ANIMATE_SLIDE_OVER : '';

  return (
    <div className={cx('nav-drawer theme-nav theme-nav-bg', classNameSlideOver, classNameShow)}>
      <div className="position-relative d-flex flex-column justify-content-stretch">
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={handleHideNav}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <h2 className="nav-drawer-title">
          NAV
        </h2>
        <hr className="nav-drawer-divider" />
        <div className="nav-drawer-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavDrawer;
