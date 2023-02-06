import React, {memo} from 'react';
import ReactGridLayout, { ItemCallback } from 'react-grid-layout';
import DynamicEngine from '@/engine-lib-absolute/core/DynamicEngine';
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
  display: inline-block;
  position: absolute;
  z-index: 2;
  border: 2px solid transparent;
  cursor: move;
  &:hover{
    border: 2px solid #06c;
  }
  :global(a){
    display: block;
    pointer-events: none;
  }
`

const GridLayerWrapper = styled(ReactGridLayout)<{pageData:any}>`
  min-height: 100vh;
  background-size: 100%;
  background-repeat: no-repeat;
`


const ViewRender = memo((props: ViewProps) => {
  const { pointData, pageData, width, dragStop, onDragStart, onResizeStop } = props;

  return (
    <GridLayerWrapper
      cols={24}
      rowHeight={2}
      width={width}
      margin={[0, 0]}
      onDragStart={onDragStart}
      onDragStop={dragStop}
      onResizeStop={onResizeStop}
      pageData={pageData}
      style={{
        backgroundColor: pageData && pageData.bgColor,
        backgroundImage:
          pageData && pageData.bgImage ? `url(${pageData.bgImage[0].url})` : 'initial',
      }}
    >
      {
        pointData.map((value: PointDataItem) => {
          return(
          <ItemWrapper key={value.id} data-grid={value.point}>
            <DynamicEngine isTpl={false} {...(value.item as any)}/>
          </ItemWrapper>
          )
        })
      }

    </GridLayerWrapper>
  )
})

export default ViewRender;
