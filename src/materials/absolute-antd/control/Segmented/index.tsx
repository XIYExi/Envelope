import React, { FC, memo, useEffect, useState } from 'react';
import { Image, Segmented } from 'antd';
import { ISegmentedConfig } from '@/materials/absolute-antd/control/Segmented/schema';
import logo from '../../../../assets/absolute/Segmented.svg';
import * as Icon from '@ant-design/icons';

interface ISegmentedProProps extends ISegmentedConfig {
  isTpl: boolean;
  onChange?: (e: any) => void;
}

const ASegmented: FC<ISegmentedProProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { onlyIcon, block, disabled, label, icon } = restProps;

  const [arr, setArr] = useState<any[]>([]);
  const [icons, setIcons] = useState<any[]>([]);
  const [value, setValue] = useState<string | number>();

  useEffect(() => {
    const labelArr = label.split('-');
    const iconArr = icon.split('-');
    //setIcons(iconArr);

    const arr: any[] = [];
    labelArr.map((item, i) => {
      if (i + 1 <= iconArr.length) {
        console.log(iconArr[i]);

        const json = {
          label: item,
          value: item,
          // @ts-ignore
          icon: React.createElement(Icon[iconArr[i]]),
        };
        arr.push(json);
      } else {
        const json = {
          label: item,
          value: item,
        };
        arr.push(json);
      }
    });
    //console.log(arr);
    setArr(arr);
  }, [label, icon]);

  useEffect(() => {
    const arr: any[] = [];
    const iconArr = icon.split('-');
    iconArr.map((item, i) => {
      const json = {
        value: item,
        // @ts-ignore
        icon: React.createElement(Icon[item]),
      };
      arr.push(json);
    });
    console.log(arr);
    setIcons(arr);
  }, [icon]);

  const handleChange = (e: string | number) => {
    //console.log(e)
    setValue(e);

    props.onChange && props.onChange(e);
  };

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image preview={false} src={logo} alt={''} />
        </div>
      )}
      {!isTpl && (
        <div>
          {onlyIcon && (
            //@ts-ignore
            <Segmented
              options={icons}
              block={block}
              disabled={disabled}
              onChange={(e) => handleChange(e)}
              value={value}
            />
          )}
          {!onlyIcon && (
            //@ts-ignore
            <Segmented
              options={arr}
              block={block}
              disabled={disabled}
              onChange={(e) => handleChange(e)}
              value={value}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default memo(ASegmented);
