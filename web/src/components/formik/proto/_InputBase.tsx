import React from 'react';
import useUuid from '../../../hooks/useUuid';
import cx, { ClassName } from '../../../utils/css/composeClassNames';

interface InputBaseProps {
  id?: string;
  label?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  value: number | string | undefined;
  onChange?: React.ChangeEventHandler;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onKeyUp?: React.KeyboardEventHandler;
  errorComponent?: React.ReactChild;
  inline?: boolean;
  classNameInput?: ClassName;
  classNameInputError?: ClassName;
  classNameInputContainer?: ClassName;
  classNameLabel?: ClassName;
  classNameLabelContainer?: ClassName;
  classNameContainer?: ClassName;
  styleInput?: React.CSSProperties;
  styleInputError?: React.CSSProperties;
  styleInputContainer?: React.CSSProperties;
  styleLabel?: React.CSSProperties;
  styleLabelContainer?: React.CSSProperties;
  styleContainer?: React.CSSProperties;
  hasError?: boolean;
  inputRef?: React.RefObject<any>;
}

export const InputBase: React.FC<InputBaseProps> = ({
  id,
  name,
  label,
  placeholder,
  required,
  value,
  onChange,
  onFocus,
  onBlur,
  onKeyUp,
  errorComponent,
  inline,
  classNameInput,
  classNameInputError,
  classNameInputContainer,
  classNameLabel,
  classNameLabelContainer,
  classNameContainer,
  styleInput = { border: '1px solid lightgray' },
  styleInputError = { borderColor: 'red', color: 'red' },
  styleInputContainer = {},
  styleLabel = {},
  styleLabelContainer = {},
  styleContainer = {},
  hasError,
  inputRef,
}) => {
  const uuid = useUuid(id);
  const idProp = uuid ? { id: uuid } : {};
  const valueProp = onChange ? { value: value || '' } : { defaultValue: value };
  const inlineStyle = inline ? { display: 'inline-block' } : { display: 'block' };

  const styling = {
    container: {
      className: cx(classNameContainer),
      style: { marginTop: 0, marginBottom: 20, ...styleContainer },
    },
    label: {
      className: cx(classNameLabel),
      style: styleLabel,
    },
    labelContainer: {
      className: cx(classNameLabelContainer),
      style: { ...inlineStyle, ...styleLabelContainer },
    },
    input: {
      className: cx(classNameInput, hasError ? classNameInputError : null),
      style: { ...styleInput, ...(hasError ? styleInputError : {}) },
    },
    inputContainer: {
      className: cx(classNameInputContainer),
      style: { ...inlineStyle, ...styleInputContainer },
    },
  };

  const inner = (
    <>
      {label ? (
        <span {...styling.labelContainer}>
          <strong {...styling.label}>
            {label}
            {required ? <span>*</span> : null}
          </strong>
        </span>
      ) : null}
      <span {...styling.inputContainer}>
        <input
          {...idProp}
          required={required}
          name={name}
          ref={inputRef}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyUp={onKeyUp}
          placeholder={placeholder}
          {...styling.input}
          {...valueProp}
        />
      </span>
    </>
  );

  return (
    <p {...styling.container}>
      {label ? (
        <label htmlFor={uuid} style={{ display: 'block', marginBottom: 10 }}>
          {inner}
        </label>
      ) : (
        inner
      )}
      {errorComponent}
    </p>
  );
};
