import React, { useEffect } from 'react';

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import Container from './Container';

import SemanticContainer from './SemanticContainer';

import styles from './Container.less';

function BasicLayout(props) {
  useEffect(() => {
    console.log(props.location.query.ui);
  }, []);

  const uiSys = props.location.query.ui ? props.location.query.ui : 'antd';

  return (
    <div className={styles.layout}>
      <DndProvider backend={HTML5Backend}>
        {uiSys === 'antd' && <Container {...props} />}
        {uiSys === 'semantic' && <SemanticContainer {...props} />}
      </DndProvider>
    </div>
  );
}

export default BasicLayout;
