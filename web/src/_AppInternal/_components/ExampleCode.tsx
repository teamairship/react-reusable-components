import React from 'react';
// import jsxToString from 'jsx-to-string';
import jsxToString from './_jsxToString';

interface Props {
  code?: string;
}
const ExampleCode: React.FC<Props> = ({ children, code }) => {
  if (!children && code) {
    return (
      <div className="bg-dark pt-3 pb-3 px-3 mb-0">
        <pre className="m-0">
          <code className="text-light">{code}</code>
        </pre>
      </div>
    );
  }
  return (
    <div>
      <div className="row mb-1">
        <div className="col-12 col-md pt-3 mb-2 mb-md-0">{children}</div>
        <div className="col-12 col-md">
          <div className="bg-dark pt-3 pb-3 px-3 mb-0">
            <pre className="m-0">
              <code className="text-light">{code || jsxToString(children)}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleCode;
