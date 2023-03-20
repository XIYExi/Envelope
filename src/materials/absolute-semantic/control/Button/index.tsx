import React, { FC } from 'react';
import { ISButtonConfig } from '@/materials/absolute-semantic/control/Button/schema';
import { Button, Image, Label } from 'semantic-ui-react';
import logo from '../../../../assets/absolute/Button.svg';

/*begin to delete*/
interface IButtonProps extends ISButtonConfig {
  isTpl: boolean;
}
/*end to delete*/

const SButton: FC<IButtonProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    text,
    basic,
    circular,
    color,
    compact,
    disabled,
    fluid,
    inverted,
    label,
    labelPosition,
    loading,
    negative,
    positive,
    size,
    toggle,
    type,
    pointing,
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} size="small" />}
      {!isTpl && (
        <div>
          {label.length === 0 && (
            // @ts-ignore
            <Button
              basic={basic}
              circular={circular}
              color={color}
              compact={compact}
              disabled={disabled}
              fluid={fluid}
              inverted={inverted}
              loading={loading}
              negative={negative}
              positive={positive}
              size={size}
              toggle={toggle}
              type={type}
            >
              {text}
            </Button>
          )}
          {label.length !== 0 && (
            // @ts-ignore
            <Button as="div" labelPosition={labelPosition}>
              {/*@ts-ignore*/}
              <Label pointing={pointing}>{label}</Label>
              {/*@ts-ignore*/}
              <Button
                basic={basic}
                circular={circular}
                color={color}
                compact={compact}
                disabled={disabled}
                fluid={fluid}
                inverted={inverted}
                loading={loading}
                negative={negative}
                positive={positive}
                size={size}
                toggle={toggle}
                type={type}
              >
                {text}
              </Button>
            </Button>
          )}
        </div>
      )}
    </React.Fragment>
  );
};

export default SButton;
