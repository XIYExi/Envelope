import React, { FC } from 'react';
import { IStatisticConfig } from '@/materials/absolute-semantic/base/Staistic/schema';
import { Image, Statistic } from 'semantic-ui-react';
import logo from '../../../../assets/absolute/Statistic.svg';

/*begin to delete*/
interface IStatisticProps extends IStatisticConfig {
  isTpl: boolean;
}
/*end to delete*/

const SStatistic: FC<IStatisticProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { label, value, color, horizontal, inverted, size } = restProps;

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="Statistic" />}
      {!isTpl && (
        <div>
          <Statistic
            color={color}
            size={size}
            horizontal={horizontal}
            inverted={inverted}
          >
            <Statistic.Value>{value}</Statistic.Value>
            <Statistic.Label>{label}</Statistic.Label>
          </Statistic>
        </div>
      )}
    </React.Fragment>
  );
};

export default SStatistic;
