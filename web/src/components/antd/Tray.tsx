import React, { useState } from 'react';
import { Drawer, Button } from 'antd';

import './Tray.scss';

type TrayState =  [boolean, () => void, () => void]

export const useTrayState = (initialVal: boolean = false): TrayState => {
  const [visible, setVisible] = useState(initialVal);
  const open = () => {
    setVisible(true);
  };
  const close = () => {
    setVisible(false);
  };
  return [visible, open, close];
};

export const useTrayItemState = (initialVal: any = null) => {
  const [trayItem, setTrayItem] = useState(initialVal);
  return [trayItem, setTrayItem];
};

interface TrayProps {
  title?: string;
  visible?: boolean;
  onClose?: () => void;
}
const Tray: React.FC<TrayProps> = ({ title = '', visible = false, onClose = () => {}, children = null }) => {
  const handleClose = () => {
    if (typeof onClose !== 'function') return;
    onClose();
  };
  return (
    <Drawer
      title={title}
      placement="right"
      closable={true}
      onClose={handleClose}
      visible={visible}
      className="tray"
    >
      {children || ''}
    </Drawer>
  );
};

// TODO: remove this example
export const TrayExample = () => {
  const [visible, open, close] = useTrayState(false);
  return (
    <React.Fragment>
      <Button onClick={() => open()}>Open</Button>
      <Tray title="Test" visible={visible} onClose={() => close()}>
        <h2>test</h2>

        <p>
          Minim nostrud veniam eu cupidatat voluptate ex ipsum esse minim ipsum sunt labore. In
          proident nulla ut ex. Esse culpa aute ipsum eiusmod nulla pariatur et veniam ullamco id
          pariatur. Cupidatat aliquip non fugiat laborum proident cupidatat mollit commodo elit qui
          anim. Sint sint occaecat nisi aute irure laboris fugiat ipsum esse cillum. Velit ullamco
          nisi ipsum deserunt commodo incididunt et Lorem ipsum ipsum exercitation anim sint.
        </p>

        <p>
          Sint nisi sit irure adipisicing eu ea ullamco magna qui ad dolore aute cupidatat. Amet
          nulla adipisicing id non in id nisi incididunt quis ullamco velit sit. Cupidatat occaecat
          aliquip nisi magna irure. Ullamco tempor est pariatur reprehenderit in ea aliquip nulla.
          Mollit eu duis velit officia mollit quis id aute fugiat laborum.
        </p>

        <p>
          Adipisicing labore reprehenderit do non dolore consequat Lorem duis aliquip mollit dolor
          Lorem eiusmod ipsum. Nisi ex velit irure occaecat. Est commodo minim ex laborum deserunt
          quis. Proident dolor ut magna quis et exercitation est ea nulla enim est ullamco sint.
          Culpa eiusmod excepteur nisi et.
        </p>

        <p>
          Veniam fugiat id magna dolor labore irure. Lorem ut tempor tempor irure velit labore id in
          eu ipsum sunt nostrud pariatur. Veniam Lorem proident ullamco incididunt quis voluptate
          elit laboris esse.
        </p>
      </Tray>
    </React.Fragment>
  );
};

export default Tray;
