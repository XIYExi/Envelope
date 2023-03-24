import React, { FC, useEffect, useState } from 'react';
import { ICheckBoxConfig } from '@/materials/absolute-semantic/control/CheckBox/schema';
import logo from '../../../../assets/absolute/CheckBox.svg';
import { Checkbox, Image } from 'semantic-ui-react';

interface ICheckBoxProps extends ICheckBoxConfig {
  isTpl: boolean;
  onChange?: (e: any) => void;
}

const SCheckBox: FC<ICheckBoxProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { label, defaultChecked, disabled, fitted, readOnly, type } = restProps;

  const [checked, setChecked] = useState<boolean>(defaultChecked);

  const handleChange = (e: any) => {
    const check = e.target.checked;
    setChecked(check);

    props.onChange && props.onChange(e);
  };

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked]);

  const renderType = () => {
    switch (type) {
      case 'checkbox':
        return (
          /*@ts-ignore*/
          <Checkbox
            type="checkbox"
            label={label}
            checked={checked}
            disabled={disabled}
            fitted={fitted}
            readOnly={readOnly}
            onChange={(e) => handleChange(e)}
          />
        );
      case 'toggle':
        return (
          /*@ts-ignore*/
          <Checkbox
            toggle
            label={label}
            checked={checked}
            disabled={disabled}
            fitted={fitted}
            readOnly={readOnly}
            onChange={(e) => handleChange(e)}
          />
        );
      case 'slider':
        return (
          /*@ts-ignore*/
          <Checkbox
            slider
            label={label}
            checked={checked}
            disabled={disabled}
            fitted={fitted}
            readOnly={readOnly}
            onChange={(e) => handleChange(e)}
          />
        );
      default:
        return (
          /*@ts-ignore*/
          <Checkbox
            type="checkbox"
            label={label}
            checked={checked}
            disabled={disabled}
            fitted={fitted}
            readOnly={readOnly}
            onChange={(e) => handleChange(e)}
          />
        );
    }
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="CheckBox" />}
      {!isTpl && <div>{renderType()}</div>}
    </React.Fragment>
  );
};

export default SCheckBox;
