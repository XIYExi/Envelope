import React, { FC } from 'react';
import { IFeedConfig } from '@/materials/absolute-semantic/social/Feed/schema';
import logo from '../../../../assets/absolute/Logo.png';
import { Image, Feed, Icon } from 'semantic-ui-react';

/*begin to delete*/
interface IFeedProps extends IFeedConfig {
  isTpl: boolean;
}
/*end to delete*/

const SFeed: FC<IFeedProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { size, dataSource } = restProps;

  const handleRenderImages = (e: any) => {
    const list = e.split('-');
    const renderList: any = [];
    list.map((item: any, _: number) => {
      const html = (
        <a>
          <img src={item} />
        </a>
      );
      renderList.push(html);
    });
    return <React.Fragment>{renderList}</React.Fragment>;
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Feed" />}
      {!isTpl && (
        <div>
          <Feed size={size}>
            {dataSource.map((e: any, index: number) => {
              const {
                src,
                user,
                action,
                date,
                like,
                extraText,
                extraImages,
                icon = 'like',
              } = e;
              return (
                <Feed.Event key={index}>
                  <Feed.Label image={src} />
                  <Feed.Content>
                    <Feed.Summary>
                      <Feed.User>{user}</Feed.User> {action}
                      <Feed.Date>{date}</Feed.Date>
                    </Feed.Summary>
                    {extraText.length !== 0 && (
                      <Feed.Extra text>{extraText}</Feed.Extra>
                    )}
                    {extraImages.length !== 0 && (
                      <Feed.Extra images>
                        {handleRenderImages(extraImages)}
                      </Feed.Extra>
                    )}
                    <Feed.Meta>
                      <Feed.Like>
                        {/*@ts-ignore*/}
                        <Icon name={icon} />
                        {like}
                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              );
            })}
          </Feed>
        </div>
      )}
    </React.Fragment>
  );
};

export default SFeed;
