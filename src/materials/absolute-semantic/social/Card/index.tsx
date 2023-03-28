import React, { FC } from 'react';
import { ICardConfig } from '@/materials/absolute-semantic/social/Card/schema';
import logo from '../../../../assets/absolute/Card.svg';
import { Image, Card } from 'semantic-ui-react';

/*begin to delete*/
interface ICardProps extends ICardConfig {
  isTpl: boolean;
}
/*end to delete*/

const SCard: FC<ICardProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    src,
    color,
    title,
    titleTextAlign,
    meta,
    metaTextAlign,
    desc,
    descTextAlign,
    extra,
    fluid,
    raised,
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Card" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Card fluid={fluid} raised={raised} color={color}>
            <Image src={src} alt="Card-Image" ui={false} wrapped />
            <Card.Content>
              <Card.Header textAlign={titleTextAlign}>{title}</Card.Header>
              <Card.Meta textAlign={metaTextAlign}>{meta}</Card.Meta>
              <Card.Description textAlign={descTextAlign}>
                {desc}
              </Card.Description>
              <Card.Content extra>{extra}</Card.Content>
            </Card.Content>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default SCard;
