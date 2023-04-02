import React from 'react';
import './index.scss';

const PanelArea = (props: any) => {
  return (
    <React.Fragment>
      <div className="panel-area-container">
        <div id="minimap">{props.children}</div>
      </div>
    </React.Fragment>
  );
};

export default PanelArea;
