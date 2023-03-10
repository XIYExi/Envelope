

import React, { useMemo, memo, ReactNode, useContext, CSSProperties } from 'react';
import { useDrag } from 'react-dnd';
import antdSchema from '@/materials/absolute-antd/schema';
import styles from './Container.less';

interface TargetBoxProps {
  item: any;
  children: ReactNode;
  canvasId: string;
}

const SourceBox = memo((props: TargetBoxProps) => {
  const {item} = props;

  const [{isDragging}, drag] = useDrag({
    item: {
      type: item.type,
      // @ts-ignore
      config: antdSchema[item.type as keyof typeof antdSchema].config,
      h: item.h,
      // @ts-ignore
      editableEl: antdSchema[item.type as keyof typeof antdSchema].editData,
      category: item.category,
      x: item.x || 0,
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  })

  const containerStyle: CSSProperties = useMemo(
    () => ({
      opacity: isDragging ? 0.4 : 1,
      cursor: 'move',
      height: '140px',
    }),
    [isDragging],
  );

  return (
    <>
      <div className={styles.listWrap}>
        <div className={styles.module} style={{ ...containerStyle }} ref={drag}>
          <div
            style={{
              height: '110px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {props.children}
          </div>
          <div
            style={{
              height: '30px',
              lineHeight: '30px',
              textAlign: 'center',
              backgroundColor: 'rgba(245, 245, 245, 1)',
              color: 'rgba(118, 118, 118, 1)',
            }}
          >
            {props.item.displayName}
          </div>
        </div>
      </div>
    </>
  );
})

export default SourceBox;
