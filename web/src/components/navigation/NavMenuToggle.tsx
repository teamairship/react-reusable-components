
import React from 'react';
import Button, { ButtonType } from '../ui/Button';

interface Props {
  className?: string | object,
  onClick?: React.ReactEventHandler,
  title?: string,
  type?: ButtonType,
};

const NavMenuToggle: React.FC<Props> = ({
  className,
  onClick,
  title,
  type,
}) => {
  return (
    <Button
      type={type} className={className}
      onClick={onClick}
    >
      {title ? (
        <>{title}&nbsp;&nbsp;</>
      ) : null}
      <i className="fas fa-bars" />
    </Button>
  );
};

export default NavMenuToggle;
