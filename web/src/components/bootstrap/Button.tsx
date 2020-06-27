
import React from 'react';
import cx from '../../utils/css/composeClassNames';

export type ButtonType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

type validChild = React.ReactChild | null;
interface Props {
  onClick?: React.ReactEventHandler,
  children?: validChild | validChild[]
  className?: string | object,
  type?: ButtonType,
}

const ButtonBootstrap: React.FC<Props> = ({
  className,
  children,
  onClick,
  type,
}) => {
  const classNameType = type ? `btn-${type}` : '';
  return (
    <button
      className={cx('btn', classNameType, className)}
      tabIndex={0}
      title='Open Nav Menu'
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonBootstrap;
