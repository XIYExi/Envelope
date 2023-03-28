import React, { FC } from 'react';
import { IItemConfig } from '@/materials/absolute-semantic/base/Item/schema';
import { Image, Item } from 'semantic-ui-react';
import logo from '../../../../assets/absolute/Logo.png';

/*begin to delete*/
interface IItemProps extends IItemConfig {
  isTpl: boolean;
}
/*end to delete*/

const SItem: FC<IItemProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { dataSource, divided, unstackable } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Item" />}
      {!isTpl && (
        <div>
          <Item.Group divided={divided} unstackable={unstackable}>
            {dataSource.map((item: any) => {
              const { src, imageSize, title, meta, desc, extra } = item;
              return (
                <Item>
                  {src.length !== 0 && (
                    <Item.Image size={imageSize} src={src} alt="Item-Image" />
                  )}
                  {/*@ts-ignore*/}
                  <Item.Content>
                    <Item.Header>{title}</Item.Header>
                    <Item.Meta>{meta}</Item.Meta>
                    <Item.Description>{desc}</Item.Description>
                    <Item.Extra>{extra}</Item.Extra>
                  </Item.Content>
                </Item>
              );
            })}
          </Item.Group>
        </div>
      )}
    </React.Fragment>
  );
};

export default SItem;
