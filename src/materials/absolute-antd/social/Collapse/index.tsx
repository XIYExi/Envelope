import React, { FC, memo } from 'react';
import logo from '../../../../assets/absolute/Collapse.svg';
import { Collapse, Image } from 'antd';
import { ICollapseConfig } from '@/materials/absolute-antd/social/Collapse/schema';

const { Panel } = Collapse;

interface ICollapseProProps extends ICollapseConfig {
  isTpl: boolean;
}

const ACollapse: FC<ICollapseProProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    accordion,
    bordered,
    collapsible,
    destroyInactivePanel,
    expandIconPosition,
    ghost,
    forceRender,
    showArrow,
    panelList,
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image preview={false} src={logo} alt={''} />
        </div>
      )}
      {!isTpl && (
        <div>
          <Collapse
            accordion={accordion}
            bordered={bordered}
            collapsible={collapsible}
            destroyInactivePanel={destroyInactivePanel}
            expandIconPosition={expandIconPosition}
            ghost={ghost}
          >
            {panelList.map((item, i) => {
              return (
                <Panel
                  header={item.title}
                  key={i}
                  forceRender={forceRender}
                  showArrow={showArrow}
                >
                  {item.desc}
                </Panel>
              );
            })}
          </Collapse>
        </div>
      )}
    </React.Fragment>
  );
};

export default memo(ACollapse);
