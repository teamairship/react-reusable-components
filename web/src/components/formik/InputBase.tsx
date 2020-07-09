
import React from 'react'
import useUuid from '../../hooks/useUuid';
import cx, { ClassName } from '../../utils/css/composeClassNames';

interface InputBaseProps {
  id?: string,
  label?: string,
  name: string,
  placeholder?: string,
  value: number | string | undefined,
  onChange?: React.ChangeEventHandler,
  onFocus?: React.FocusEventHandler,
  onKeyUp?: React.KeyboardEventHandler,
  errorComponent?: React.ReactChild,
  inline?: boolean,
  classNameInput?: ClassName,
  classNameInputContainer?: ClassName,
  classNameLabel?: ClassName,
  classNameLabelContainer?: ClassName,
  classNameContainer?: ClassName,
  styleInput?: React.StyleHTMLAttributes<any>,
  styleInputContainer?: React.StyleHTMLAttributes<any>,
  styleLabel?: React.StyleHTMLAttributes<any>,
  styleLabelContainer?: React.StyleHTMLAttributes<any>,
  styleContainer?: React.StyleHTMLAttributes<any>,
}
const InputBase = React.forwardRef(({
  id,
  label,
  placeholder,
  value,
  onChange,
  onFocus,
  onKeyUp,
  errorComponent,
  inline,
  classNameInput,
  classNameInputContainer,
  classNameLabel,
  classNameLabelContainer,
  classNameContainer,
  styleInput = {},
  styleInputContainer = {},
  styleLabel = {},
  styleLabelContainer = {},
  styleContainer = {},
}: InputBaseProps, ref?: React.Ref<any>) => {
  const uuid = useUuid(id);
  const valueProp = onChange ? { value } : { defaultValue: value };
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
      className: cx(classNameInput),
      style: styleInput,
    },
    inputContainer: {
      className: cx(classNameInputContainer),
      style: { ...inlineStyle, ...styleInputContainer }
    },
  }

  const inner = (
    <>
      <span {...styling.labelContainer}>
        <strong {...styling.label}>
          {label}
        </strong>
      </span>
      <span {...styling.inputContainer}>
        <input
          id={uuid}
          ref={ref}
          onChange={onChange}
          onFocus={onFocus}
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
      {
        label ? (
          <label htmlFor={uuid} style={{ display: 'block', marginBottom: 10 }}>
            {inner}
          </label>
        ) : (
          inner
        )
      }
      {errorComponent}
    </p>
  );
});

export default InputBase;
