import React, { FC } from 'react';
import styled from 'styled-components';

/**此节点用于展示自定义节点的预览图*/

const Container = styled.div`
  height: 65px;
  width: 100%;
  user-select: none;
  color: rgb(125, 118, 113);
  font-size: 13px;
  align-items: center;
  & img {
    padding: 5px;
    height: 60px;
  }
`;

const ReactNode: FC<any> = (props) => {
  return (
    <React.Fragment>
      <Container className="container">
        <img src={props.src} />
      </Container>
    </React.Fragment>
  );
};

export default ReactNode;
