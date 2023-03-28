import React, { FC } from 'react';
import { ICommentConfig } from '@/materials/absolute-semantic/social/Comment/schema';
import logo from '../../../../assets/absolute/Comment.svg';
import { Image, Comment } from 'semantic-ui-react';

/*begin to delete*/
interface ICommentProps extends ICommentConfig {
  isTpl: boolean;
}
/*end to delete*/

const SComment: FC<ICommentProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { collapsed, minimal, size, threaded, dataSource } = restProps;

  const handleActions = (actions: string) => {
    const actionList = actions.split('-');
    return actionList;
  };

  const handleChildToRender = (e: any) => {
    const { avatar, author, meta, content, actions, child } = e;

    return (
      <Comment>
        <Comment.Avatar src={avatar} alt="Comment-Avatar" />
        <Comment.Content>
          <Comment.Author as="a">{author}</Comment.Author>
          <Comment.Metadata>
            <div>{meta}</div>
          </Comment.Metadata>
          <Comment.Text>{content}</Comment.Text>
          <Comment.Actions>
            {actions.split('-').map((e: string, _: number) => (
              /*@ts-ignore*/
              <Comment.Action key={_}>{e}</Comment.Action>
            ))}
          </Comment.Actions>

          {child.length !== 0 && (
            <Comment.Group>
              {child.map((e: any) => handleChildToRender(e))}
            </Comment.Group>
          )}
        </Comment.Content>
      </Comment>
    );
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Comment" />}
      {!isTpl && (
        <div>
          <Comment.Group
            collapsed={collapsed}
            minimal={minimal}
            size={size}
            threaded={threaded}
          >
            {dataSource.map((item: any, index: number) => {
              const { avatar, author, meta, content, actions, child } = item;

              return (
                <Comment key={index}>
                  <Comment.Avatar src={avatar} alt="Comment-Avatar" />
                  <Comment.Content>
                    <Comment.Author as="a">{author}</Comment.Author>
                    <Comment.Metadata>
                      <div>{meta}</div>
                    </Comment.Metadata>
                    <Comment.Text>{content}</Comment.Text>
                    <Comment.Actions>
                      {handleActions(actions).map((e, _) => (
                        /*@ts-ignore*/
                        <Comment.Action key={_}>{e}</Comment.Action>
                      ))}
                    </Comment.Actions>

                    {child.length !== 0 && (
                      <Comment.Group>
                        {child.map((e: any) => handleChildToRender(e))}
                      </Comment.Group>
                    )}
                  </Comment.Content>
                </Comment>
              );
            })}
          </Comment.Group>
        </div>
      )}
    </React.Fragment>
  );
};

export default SComment;
