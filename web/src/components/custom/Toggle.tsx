
import React from 'react';
import { v4 as uuid } from 'uuid';

import cx from '../../utils/css/composeClassNames';

import './Toggle.scss';

const NBSP = () => {
  return (
    <>&nbsp;&nbsp;</>
  )
}

interface Props {
  id?: string | number,
  className?: string | object,
  checked?: boolean,
  onClick?: React.EventHandler<any>,
  label?: string,
  labelPosition?: 'before' | 'after',
};
const Toggle: React.FC<Props> = ({
  id,
  className,
  checked = false,
  onClick,
  label,
  labelPosition = 'before',
}) => {
  const [_checked, _setChecked] = React.useState<boolean>(checked || false);
  const [_id, _setId] = React.useState<string>();

  React.useEffect(() => {
    _setId((id || uuid()).toString());
  }, []);

  const handleClick = (ev: any) => {
    ev.persist();
    if (onClick) {
      onClick(ev);
    } else {
      _setChecked(ev.target.checked);
    }
  };

  return (
    <span className={cx("switch-container d-inline-flex align-items-center", className)}>
      {label && labelPosition === 'before' ? (
        <label htmlFor={_id}>{label}<NBSP /></label>
      ) : null}
      <label className="switch" htmlFor={_id}>
        <input id={_id} type="checkbox" checked={_checked || checked} onClick={handleClick} />
        <span className="slider round"></span>
      </label>
      {label && labelPosition === 'after' ? (
        <label htmlFor={_id}><NBSP />{label}</label>
      ) : null}
    </span>
  );
};

export default Toggle;
