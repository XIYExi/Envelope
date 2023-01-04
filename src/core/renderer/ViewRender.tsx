import React, {memo} from 'react';
import ReactGridLayout, { ItemCallback } from 'react-grid-layout';
import DynamicEngine from '@/core/DynamicEngine';
import styled from 'styled-components';

interface PointDataItem {
  id: string;
  item: Record<string, any>;
  point: Record<string, any>;
}


interface ViewProps {
  pointData: Array<PointDataItem>;
  pageData?: any;
  width?: number;
  dragStop?: ItemCallback;
  onDragStart?: ItemCallback;
  onResizeStop?: ItemCallback;
}


const ItemWrapper = styled.div`

`


const ViewRender = memo((props: ViewProps) => {
  const { pointData, pageData, width, dragStop, onDragStart, onResizeStop } = props;

  return (
    <ReactGridLayout
      cols={24}
      rowHeight={2}
      width={width}
      margin={[0, 0]}
      onDragStart={onDragStart}
      onDragStop={dragStop}
      onResizeStop={onResizeStop}

    >
      {
        pointData.map((value: PointDataItem) => {
          return(
          <ItemWrapper>
            <DynamicEngine isTpl={false} {...(value.item as any)}/>
          </ItemWrapper>
          )
        })
      }

    </ReactGridLayout>
  )
})

export default ViewRender;
