import React,{FC} from 'react';
import { Typography } from 'antd';

const ConfirmSystem:FC<{
  ui: string;
  template: string;
}> = props => {

  const {ui, template} = props;

  return(
    <div>
      <Typography>
        <Typography.Paragraph>
          <Typography.Text>UI系统:
            <Typography.Text code>{ui}</Typography.Text>
          </Typography.Text>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <Typography.Text>模板:
            <Typography.Text code>{template}</Typography.Text>
          </Typography.Text>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <Typography.Text>布局方式:
            <Typography.Text code>静态布局</Typography.Text>
          </Typography.Text>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <Typography.Text>平台:
            <Typography.Text code>移动端</Typography.Text>
          </Typography.Text>
        </Typography.Paragraph>

        <Typography.Paragraph>
          <Typography.Text>画布大小:
            <Typography.Text code>375 * 684</Typography.Text>
          </Typography.Text>
        </Typography.Paragraph>
      </Typography>
    </div>
  )
}

export default ConfirmSystem;
