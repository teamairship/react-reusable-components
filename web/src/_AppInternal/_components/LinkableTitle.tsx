
import React from 'react';
import cx from '../../utils/css/composeClassNames';

const sluggify = (text: any) => {
  if (!text || typeof text !== 'string') return '';
  return text.toLowerCase().replace(/\s/gi, '-');
};

const H1: React.FC<any> = ({ children, ...props }) => {
  return (
    <h1 {...props}>{children}</h1>
  );
};

const H2: React.FC<any> = ({ children, ...props }) => {
  return (
    <h2 {...props}>{children}</h2>
  );
};

const H3: React.FC<any> = ({ children, ...props }) => {
  return (
    <h3 {...props}>{children}</h3>
  );
};

const H4: React.FC<any> = ({ children, ...props }) => {
  return (
    <h4 {...props}>{children}</h4>
  );
};

const H5: React.FC<any> = ({ children, ...props }) => {
  return (
    <h5 {...props}>{children}</h5>
  );
};

const H6: React.FC<any> = ({ children, ...props }) => {
  return (
    <h6 {...props}>{children}</h6>
  );
};

interface LinkableTitleProps {
  className?: string | object,
  children?: React.ReactChild,
  title?: string,
  h1?: boolean,
  h2?: boolean,
  h3?: boolean,
  h4?: boolean,
  h5?: boolean,
  h6?: boolean,
};
const LinkableTitle: React.FC<LinkableTitleProps> = ({
  className,
  title,
  children,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
}) => {
  const content: string = title || children?.toString() || '';
  const slug = sluggify(content);
  const isActive = window.location.hash === `#${slug}`;
  const handleClick = (ev: any) => {
    ev.preventDefault();
    window.location.hash = slug;
  };

  let Heading: React.FC<any> = H1;
  if (h1) Heading = H1;
  else if (h2) Heading = H2;
  else if (h3) Heading = H3;
  else if (h4) Heading = H4;
  else if (h5) Heading = H5;
  else if (h6) Heading = H6;

  return (
    <Heading id={slug} style={{ marginBottom: 30 }} className={cx(className, isActive ? 'theme-accent' : null)}>
      {slug ? (
        <a onClick={handleClick} href={slug} className="text-reset position-relative">
          <small style={{ position: 'absolute', right: '100%', marginRight: 5 }}>
            <i className="fas fa-link" style={{ color: '#c0cad4' }}></i>
          </small>
          {content}
        </a>
      ) : (
        content
      )}
    </Heading>
  );
}

export default LinkableTitle;
