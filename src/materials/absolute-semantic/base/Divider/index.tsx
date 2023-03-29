import React, { FC } from 'react';
import { IDividerConfig } from '@/materials/absolute-semantic/base/Divider/schema';
import { Divider, Image, Segment } from 'semantic-ui-react';
import logo from '../../../../assets/absolute/Divider.svg';

/*begin to delete*/
interface IDividerProps extends IDividerConfig {
  isTpl: boolean;
}
/*end to delete*/

const SDivider: FC<IDividerProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { text, fitted, hidden, inverted, section } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Divider" />}
      {!isTpl && (
        <Segment basic>
          {text.length === 0 ? (
            <Divider
              fitted={fitted}
              hidden={hidden}
              inverted={inverted}
              section={section}
            />
          ) : (
            <Divider
              horizontal
              fitted={fitted}
              hidden={hidden}
              inverted={inverted}
              section={section}
            >
              {text}
            </Divider>
          )}
        </Segment>
      )}
    </React.Fragment>
  );
};

export default SDivider;
