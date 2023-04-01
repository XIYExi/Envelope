import React, { FC } from 'react';
import { ITextConfig } from '@/materials/absolute-semantic/base/Text/schema';
import logo from '../../../../assets/absolute/text.png';
import { Image, Segment } from 'semantic-ui-react';

/*begin to delete*/
interface ITextProps extends ITextConfig {
  isTpl: boolean;
}
/*end to delete*/

const SText: FC<ITextProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    text,
    basic,
    circular,
    color,
    compact,
    disabled,
    inverted,
    piled,
    placeholder,
    raised,
    size,
    stacked,
    textAlign,
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Text" />}
      {!isTpl && (
        <div>
          <Segment
            basic={basic}
            circular={circular}
            color={color}
            compact={compact}
            disabled={disabled}
            inverted={inverted}
            piled={piled}
            placeholder={placeholder}
            raised={raised}
            size={size}
            stacked={stacked}
            textAlign={textAlign}
          >
            {text}
          </Segment>
        </div>
      )}
    </React.Fragment>
  );
};

export default SText;
