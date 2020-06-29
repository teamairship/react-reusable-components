
import React from 'react';
import LinkableTitle from './LinkableTitle';

interface Props {
  title?: React.ReactChild,
};
const ExampleSection: React.FC<Props> = ({
  title,
  children,
}) => {
  return (
    <div style={{ marginBottom: 60, marginTop: 60 }}>
      {!!title && (
        <LinkableTitle h3>
          {title}
        </LinkableTitle>
      )}
      {children}
    </div>
  );
};

export default ExampleSection;
