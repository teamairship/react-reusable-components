
import React from 'react';
import cx from '../../utils/css/composeClassNames';

export type ButtonType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

type validChild = React.ReactChild | null;
interface Props {
  onClick?: React.ReactEventHandler | undefined,
  children?: validChild | validChild[],
  className?: string | object | undefined,
  type?: ButtonType | undefined,
  submit?: boolean,
}

const Button = React.forwardRef(function Button({
  className,
  children,
  onClick,
  type = 'secondary',
  submit,
}: Props, ref?: React.Ref<any>) {
  const classNameType = type ? `btn-${type}` : '';
  return (
    <button
      className={cx('btn', classNameType, className)}
      tabIndex={0}
      title='Open Nav Menu'
      onClick={onClick}
      ref={ref}
      {...(submit ? { type: 'submit' } : {})}
    >
      {children}
    </button>
  );
});

export default Button;
