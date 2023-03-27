import React, { FC } from 'react';
import { ILabelConfig } from '@/materials/absolute-semantic/base/Label/schema';
import logo from '../../../../assets/absolute/Logo.png';
import { Icon, Image, Label } from 'semantic-ui-react';

/*begin to delete*/
interface ILabelProps extends ILabelConfig {
  isTpl: boolean;
}
/*end to delete*/

const SLabel: FC<ILabelProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    title,
    active,
    basic,
    circular,
    color,
    empty,
    floating,
    horizontal,
    icon,
    size,
    tag,
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Label" />}
      {!isTpl && (
        <div>
          {icon.length !== 0 ? (
            /*@ts-ignore*/
            <Label
              active={active}
              basic={basic}
              circular={circular}
              color={color}
              empty={empty}
              floating={floating}
              horizontal={horizontal}
              size={size}
              tag={tag}
            >
              {/*@ts-ignore*/}
              <Icon name={icon} />
              {title}
            </Label>
          ) : (
            /*@ts-ignore*/
            <Label
              active={active}
              basic={basic}
              circular={circular}
              color={color}
              empty={empty}
              floating={floating}
              horizontal={horizontal}
              size={size}
              tag={tag}
            >
              {title}
            </Label>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default SLabel;
