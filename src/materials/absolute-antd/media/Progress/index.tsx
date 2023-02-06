import React, { FC, memo, useCallback, useState } from 'react';
import logo from '../../../../assets/absolute/Progress.svg';
import {Image,Progress} from 'antd';
import { IProgressConfig } from '@/materials/absolute-antd/media/Progress/schema';

interface IProgressProProps extends IProgressConfig{
  isTpl: boolean;
}

const AProgress:FC<IProgressProProps> = (props) => {

  const {
    isTpl,
    percent,
    text,
    showInfo,
    type,
    status,
    strokeColor,
    strokeLinecap,
    trailColor,
    steps,
    strokeWidth,
    circleWidth,
    gapDegree,
    gapPosition,
    dashboardWidth
  } = props;


  return(
    <React.Fragment>
      {
        isTpl &&
          <div>
            <Image preview={false} src={logo} alt={''}/>
          </div>
      }
      {
        !isTpl && type === 'line' &&
          <div>
            <Progress
              percent={percent}
              type='line'
              format={(percent)=>`${percent} ${text}`}
              showInfo={showInfo}
              status={status}
              strokeLinecap={strokeLinecap}
              strokeColor={strokeColor}
              trailColor={trailColor}
              steps={steps}
              strokeWidth={strokeWidth}
            />
          </div>
      }
      {
        !isTpl && type === 'circle' &&
        <div>
          <Progress
            percent={percent}
            type='circle'
            format={(percent)=>`${percent} ${text}`}
            showInfo={showInfo}
            strokeLinecap={strokeLinecap}
            strokeColor={strokeColor}
            trailColor={trailColor}
            strokeWidth={strokeWidth}
            width={circleWidth}
          />
        </div>
      }
      {
        !isTpl && type === 'dashboard' &&
        <div>
          <Progress
            percent={percent}
            type='dashboard'
            format={(percent)=>`${percent} ${text}`}
            showInfo={showInfo}
            strokeLinecap={strokeLinecap}
            strokeColor={strokeColor}
            trailColor={trailColor}
            strokeWidth={strokeWidth}
            gapDegree={gapDegree}
            gapPosition={gapPosition}
            width={dashboardWidth}
          />
        </div>
      }

    </React.Fragment>
  )
}

export default memo(AProgress);
