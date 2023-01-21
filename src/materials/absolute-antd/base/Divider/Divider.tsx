import React,{ FC,memo } from 'react';
import { IDividerConfig } from '@/materials/absolute-antd/base/Divider/schema';
import { Divider, Image } from 'antd';
import logo from '../../../../assets/Divider.svg';

interface IDividerPropProps extends IDividerConfig {
  isTpl: boolean;
}

const ADivider:FC<IDividerPropProps> = (props) => {
  const {
    isTpl,
    orientation,
    title,
    dashed,
    plain
  } = props;

  return (
    <React.Fragment>
      {
        isTpl &&
          <div>
            <Image preview={false} src={logo} alt={''}/>
          </div>
      }
      {
        !isTpl && title.length === 0 &&
          <div>
            <Divider
              plain={plain}
              orientation={orientation}
              dashed={dashed}
              />
          </div>
      }
      {
        !isTpl && title.length > 0 &&
          <div>
            <Divider
              plain={plain}
              orientation={orientation}
              dashed={dashed}
            >
              {title}
            </Divider>
          </div>
      }
    </React.Fragment>
  )
}

export default memo(ADivider);
