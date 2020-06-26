
import React from 'react';
import cx from '../../utils/css/composeClassNames';

const getDOMBody = () => document.getElementsByTagName("BODY")[0];

interface Props {
  id?: string,
  title?: string,
  isShowing?: boolean,
  closeModal?: () => void,
}
const ModalBootstrap: React.FC<Props> = ({
  id,
  title,
  isShowing = false,
  closeModal,
  children,
}) => {
  const [hasScrollbarOffset, setHasScrollbarOffset] = React.useState<boolean>(false);
  const wasShowing = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (isShowing && !wasShowing.current) {
      getDOMBody().classList.add('modal-open');
    }
    if (!isShowing && wasShowing.current) {
      getDOMBody().classList.remove('modal-open');
    }
    wasShowing.current = isShowing;
  }, [isShowing]);

  const idProp = id ? { id }: {};
  const idPropLabel = id ? { id: `${id}-label` }: {};
  const classNameShowing = isShowing ? 'show' : '';
  const handleCloseModal = () => {
    closeModal && closeModal();
  };
  const handleOutsideClick = (ev: React.MouseEvent) => {
    if (ev && ev.target === ev.currentTarget) {
      closeModal && closeModal();
    }
  };
  const modalStylez = isShowing ? {
    display: 'block',
    paddingRight: 15,
  } : {};

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
      <div className="modal-dialog modal-dialog-scrollable">
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

export default ModalBootstrap;
