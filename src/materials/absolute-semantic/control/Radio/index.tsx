import React, { FC, useEffect, useState } from 'react';
import { IRadioConfig } from '@/materials/absolute-semantic/control/Radio/schema';
import logo from '../../../../assets/absolute/Radio.svg';
import { Image, Radio } from 'semantic-ui-react';

/*begin to delete*/
interface IRadioProps extends IRadioConfig {
  isTpl: boolean;
  onChange?: any;
}
/*end to delete*/

const SRadio: FC<IRadioProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { label, defaultChecked, disabled, readOnly, fitted } = restProps;

  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (e: any) => {
    const check = !checked;
    setChecked(check);

    props.onChange && props.onChange(check);
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Radio" />}
      {!isTpl && (
        <div>
          <Radio
            label={label}
            checked={checked}
            onChange={(e) => handleChange(e)}
            disabled={disabled}
            readOnly={readOnly}
            fitted={fitted}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default SRadio;
