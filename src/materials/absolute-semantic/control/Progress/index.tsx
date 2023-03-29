import React, { FC } from 'react';
import { IProgressConfig } from '@/materials/absolute-semantic/control/Progress/schema';
import logo from '../../../../assets/absolute/Progress.svg';
import { Image, Progress } from 'semantic-ui-react';

/*begin to delete*/
interface IProgressProps extends IProgressConfig {
  isTpl: boolean;
}
/*end to delete*/

const SProgress: FC<IProgressProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const {
    defaultValue,
    total,
    color,
    disabled,
    indicating,
    inverted,
    label,
    progress,
    size,
    error,
    success,
    warning,
  } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Progress" />}
      {!isTpl && (
        <div>
          {/*@ts-ignore*/}
          <Progress
            percent={defaultValue}
            value={defaultValue}
            total={total}
            indicating={indicating}
            color={color}
            disabled={disabled}
            inverted={inverted}
            label={label}
            progress={progress}
            size={size}
            error={error}
            success={success}
            warning={warning}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default SProgress;
