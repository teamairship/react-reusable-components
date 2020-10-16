import React from 'react';
import cx from '../../utils/css/composeClassNames';

interface Props {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
}
const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={cx('container', className)}>{children}</div>;
};

export default Container;
