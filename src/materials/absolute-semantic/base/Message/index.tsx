import React, { FC } from 'react';
import { IMessageConfig } from '@/materials/absolute-semantic/base/Message/schema';
import logo from '../../../../assets/absolute/Logo.png';
import { Icon, Image, Message } from 'semantic-ui-react';

/*begin to delete*/
interface IMessageProps extends IMessageConfig {
  isTpl: boolean;
}
/*end to delete*/

const SMessage: FC<IMessageProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    header,
    content,
    color,
    compact,
    error,
    floating,
    hidden,
    icon,
    info,
    negative,
    positive,
    success,
    visible,
    warning,
    size,
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Message" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Message
            color={color}
            compact={compact}
            error={error}
            floating={floating}
            hidden={hidden}
            info={info}
            negative={negative}
            positive={positive}
            success={success}
            visible={visible}
            warning={warning}
            size={size}
          >
            <Message.Header>
              {icon.length !== 0 && (
                /*@ts-ignore*/
                <Icon name={icon} />
              )}
              {header}
            </Message.Header>
            <Message.Content>{content}</Message.Content>
          </Message>
        </div>
      )}
    </React.Fragment>
  );
};

export default SMessage;
