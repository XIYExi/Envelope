import React, { FC } from 'react';
import { IHeaderConfig } from '@/materials/absolute-semantic/base/Header/schema';
import logo from '../../../../assets/absolute/Logo.png';
import { Header, Image } from 'semantic-ui-react';

interface IHeaderProps extends IHeaderConfig {
  isTpl: boolean;
}

const SHeader: FC<IHeaderProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    title,
    block,
    color,
    disabled,
    dividing,
    inverted,
    subHeader,
    size,
    textAlign,
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Header" />}
      {!isTpl && (
        <div>
          <Header
            block={block}
            color={color}
            disabled={disabled}
            dividing={dividing}
            inverted={inverted}
            size={size}
            textAlign={textAlign}
          >
            <Header.Content>{title}</Header.Content>
            {subHeader.length !== 0 && (
              <Header.Subheader>{subHeader}</Header.Subheader>
            )}
          </Header>
        </div>
      )}
    </React.Fragment>
  );
};

export default SHeader;
