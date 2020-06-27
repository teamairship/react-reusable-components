
import React from 'react';

import cx from '../../utils/css/composeClassNames';
import getDOMBody from '../../utils/dom/getDOMBody';
import hasScrollbars from '../../utils/dom/hasScrollbars';

const CLASSNAME_BODY_MODAL_OPEN = 'modal-open';
const ANIMATION_TIME_PRE_SHOW = 50;
const ANIMATION_TIME_FADE = 150;

interface Props {
  id?: string,
  title?: string,
  overlayColor?: string,
  isShowing?: boolean,
  scrollable?: boolean,
  centered?: boolean,
  restrictBodyScroll?: boolean,
  closeModal?: () => void,
  onAfterShow?: () => void,
}

/**
 * BOOTSTRAP MODAL
 */
const Modal: React.FC<Props> = ({
  id,
  title,
  overlayColor = 'rgba(0,0,0,0.7)',
  isShowing = false,
  restrictBodyScroll = false,
  scrollable = true,
  centered = true,
  closeModal,
  onAfterShow,
  children,
}) => {
  const [hasScrollbarOffset, setHasScrollbarOffset] = React.useState<boolean>(false);
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
    clearAllTimeouts();
    if (isShowing && !wasShowing.current) {
      restrictBodyScroll && getDOMBody().classList.add(CLASSNAME_BODY_MODAL_OPEN);
      setHasScrollbarOffset(hasScrollbars());
      setIsRendering(true);
      // modal must first have `display: block` applied
      // before the `show` css-class can activate the
      // fade-in css-transition
      addTimeout(() => {
        setIsVisible(true);
      }, ANIMATION_TIME_PRE_SHOW);
      addTimeout(() => {
        onAfterShow && onAfterShow();
      }, ANIMATION_TIME_PRE_SHOW + ANIMATION_TIME_FADE);
    } else if (!isShowing && wasShowing.current) {
      restrictBodyScroll && getDOMBody().classList.remove(CLASSNAME_BODY_MODAL_OPEN);
      setIsVisible(false);
      addTimeout(() => {
        setIsRendering(false);
      }, ANIMATION_TIME_FADE);
    }
    wasShowing.current = isShowing;

    return () => {
      clearAllTimeouts();
    }
  }, [isShowing]);

  if (!isRendering) return null;

  const idProp = id ? { id }: {};
  const idPropLabel = id ? { id: `${id}-label` }: {};
  const handleCloseModal = () => {
    closeModal && closeModal();
  };
  const handleOutsideClick = (ev: React.MouseEvent) => {
    if (ev && ev.target === ev.currentTarget) {
      closeModal && closeModal();
    }
  };
  const modalStylez = {
    display: isRendering ? 'block' : 'none',
    paddingRight: hasScrollbarOffset ? 15 : 0,
    backgroundColor: overlayColor,
  };
  const classNameShowing = isVisible ? 'show' : '';
  const classNameScrollable = scrollable ? 'modal-dialog-scrollable' : '';
  const classNameCentered = centered ? 'modal-dialog-centered' : '';

  return (
    <div
      {...idProp}
      className={cx('modal fade', classNameShowing)}
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      onClick={handleOutsideClick}
      style={modalStylez}
    >
      <div className={cx('modal-dialog', classNameScrollable, classNameCentered)}>
        <div className="modal-content">
          <div className="modal-header">
            {!!title && (
              <h5 className="modal-title" {...idPropLabel}>{title}</h5>
            )}
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
