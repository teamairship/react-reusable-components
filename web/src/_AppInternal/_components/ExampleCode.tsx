
import React from 'react';
// @ts-ignore
// import jsxToString from 'jsx-to-string';
import jsxToString from './_jsxToString';

interface Props {};
const ExampleCode: React.FC<Props> = ({
  children,
}) => {
  return (
    <div>
      <div className="row">
        <div className="col-12 col-md">
          {children}
        </div>
        <div className="col-12 col-md bg-dark pt-3">
          <p>
            <pre>
              <code className="text-light">
                {jsxToString(children)}
              </code>
            </pre>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExampleCode;
