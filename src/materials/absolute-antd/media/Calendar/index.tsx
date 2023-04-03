import React, { FC, memo, useEffect, useRef, useState } from 'react';
import { Calendar, Image } from 'antd';
import styled from 'styled-components';
import { ICalendarConfig } from '@/materials/absolute-antd/media/Calendar/schema';
import logo from '../../../../assets/absolute/calend.png';
import moment, { Moment } from 'moment';

/*begin to delete*/
interface ICalendarPropProps extends ICalendarConfig {
  isTpl: boolean;
}
/*end to delete*/

const CalendarWrapper = styled.div`
  position: relative;
  // height: 100%;
  overflow: hidden;
  background-color: #fff;
  :global(.za-calendar__month) {
    color: var(--color) !important;
  }
  :global(.za-calendar__day--today .za-calendar__day__content) {
    color: var(--selectColor);
    background-color: rgba(255, 255, 255, 0.3);
  }
  :global(.za-calendar__day--selected .za-calendar__day__content) {
    background-color: var(--selectColor) !important;
  }
  :global(.za-calendar__day--range .za-calendar__day__content),
  :global(.za-calendar__day--range),
  :global(.za-calendar__day--selected .za-calendar__day__content) {
    background-color: var(--selectBgColor) !important;
    background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 50%,
      var(--selectBgColor) 0
    ) !important;
  }
  :global(.za-calendar__day--range) {
    color: rgba(255, 255, 255, 0.7) !important;
    :global(.za-calendar__day__content) {
      color: rgba(255, 255, 255, 0.7) !important;
    }
  }
  :global(.za-calendar__day.range-start),
  :global(.za-calendar__day.range-end) {
    :global(.za-calendar__day__content) {
      color: rgba(255, 255, 255, 1) !important;
    }
  }
  :global(
      .za-calendar__day.range-start:not(.range-end):not(.d6):not(:last-child)
    ) {
    background-image: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 50%,
      var(--selectBgColor) 0
    ) !important;
  }
  :global(
      .za-calendar__day.range-end:not(.range-start):not(.d7):not(:first-child)
    ) {
    background-image: linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0) 0,
      rgba(0, 0, 0, 0) 50%,
      var(--selectBgColor) 0
    ) !important;
  }
`;

const ACalendar: FC<ICalendarPropProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { time, range, color, fullscreen, selectedColor, round, width } =
    restProps;

  const [value, setValue] = useState<Moment>(() => moment(time));
  const [dRange, setDRange] = useState<[Moment, Moment]>();
  const boxRef = useRef<any>(null);

  useEffect(() => {
    const realRange: string[] = range.split(',');
    const min: Moment = moment(realRange[0]);
    const max: Moment = moment(realRange[1]);
    setDRange([min, max]);
  }, [range]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.setProperty('--color', color);
      boxRef.current.style.setProperty('--selectColor', selectedColor);
      boxRef.current.style.setProperty('--selectBgColor', selectedColor);
    }
  }, []);

  const isEditorPage = window.location.pathname.indexOf('editor') > -1;

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image preview={false} src={logo} alt={''} />
        </div>
      )}
      {!isTpl && (
        <CalendarWrapper
          style={{
            pointerEvents: isEditorPage ? 'none' : 'initial',
            width: width === 0 ? '100%' : width + 'px',
            border: '1px solid #f0f0f0',
            borderRadius: round + 'px',
          }}
          ref={boxRef}
        >
          <Calendar
            value={value}
            validRange={dRange}
            fullscreen={fullscreen}
            onChange={(value: Moment) => {
              setValue(value);
            }}
          />
        </CalendarWrapper>
      )}
    </React.Fragment>
  );
};

export default memo(ACalendar);
