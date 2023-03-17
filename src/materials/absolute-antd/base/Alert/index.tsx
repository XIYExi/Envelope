import React, { FC, memo } from 'react';
import { IAlertConfig } from '@/materials/absolute-antd/base/Alert/schema';
import { Alert, Image } from 'antd';
import logo from '../../../../assets/absolute/Logo.png';

/*begin to delete*/
export type IAlertPrpConfig = IAlertConfig & {
  isTpl: boolean;
};
/*end to delete*/

const AAlert: FC<IAlertPrpConfig> = (props) => {
  const { message, isTpl, ...restProps } = props;

  return (
    <React.Fragment>
      {isTpl && (
        <div>
          <Image src={logo} alt="" />
        </div>
      )}
      {!isTpl && <Alert message={message} {...restProps} />}
    </React.Fragment>
  );
};

export default memo(AAlert);
