import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 50px;
  width: 75%;
  display: flex;
  user-select: none;
  background-color: #ff8228;
  border: 2px solid rgba(58, 184, 129, 0.5);
  background-color: rgba(58, 184, 129, 0.5);
  border-radius: 4px;
  color: rgb(125, 118, 113);
  display: flex;
  justify-content: center;
  font-size: 13px;
  align-items: center;
`;

const ReactNode: FC<any> = (props) => {
  return (
    <React.Fragment>
      <Container className="container">React-Node</Container>
    </React.Fragment>
  );
};

export default ReactNode;
