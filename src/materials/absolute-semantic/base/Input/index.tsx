import React, { FC, useState } from 'react';
import { IInputConfig } from '@/materials/absolute-semantic/base/Input/schema';
import logo from '../../../../assets/absolute/Logo.png';
import { Image, Input } from 'semantic-ui-react';

/*begin to delete*/
interface IInputProps extends IInputConfig {
  isTpl: boolean;
  onChange?: any;
}
/*end to delete*/

const SInput: FC<IInputProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    placeholder,
    disabled,
    error,
    fluid,
    focus,
    icon,
    iconPosition,
    action,
    inverted,
    label,
    tag,
    labelPosition,
    loading,
    size,
  } = restProps;

  const [value, setValue] = useState('');
  const handleChange = (e: any, data: any) => {
    //console.log(e,data);
    const { value } = data;
    setValue(value);

    props.onChange && props.onChange(value);
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Input" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Input
            value={value}
            onChange={(e, data) => handleChange(e, data)}
            placeholder={placeholder}
            disabled={disabled}
            error={error}
            fluid={fluid}
            focus={focus}
            icon={icon.length === 0 && action.length !== 0 ? undefined : icon}
            iconPosition={iconPosition === 'right' ? undefined : iconPosition}
            action={action.length === 0 ? undefined : action}
            inverted={inverted}
            label={{
              tag: tag,
              content: label.length === 0 ? undefined : label,
            }}
            labelPosition={labelPosition}
            loading={loading}
            size={size}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default SInput;
