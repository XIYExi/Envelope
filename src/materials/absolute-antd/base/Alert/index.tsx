import React, { FC, memo } from 'react';
import { IAlertConfig } from '@/materials/absolute-antd/base/Alert/schema';
import { Alert, Image } from 'antd';
import logo from '../../../../assets/absolute/alertImage.png';

/*begin to delete*/
export type IAlertPrpConfig = IAlertConfig & {
  isTpl: boolean;
};
/*end to delete*/

const AAlert: FC<IAlertPrpConfig> = (props) => {
  const { isTpl, ...restProps } = props;

  const { message } = props;

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image src={logo} alt="" />
        </div>
      )}
      {!isTpl && (
        // @ts-ignore
        <Alert message={message} {...restProps} />
      )}
    </React.Fragment>
  );
};

export default memo(AAlert);
