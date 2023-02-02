import React,{FC} from 'react';
import { Button, Typography } from 'antd';

const ConfirmSystem:FC<{
  ui: string;
  template: string;
  done: () => void;
  prev: () => void;
}> = props => {

  const {ui, template, done, prev} = props;

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

      <Typography.Paragraph>
        <Button
          size={'large'}
          style={{width: '120px',
            borderRadius: '20px',
            marginTop: '50px',
            marginRight: '30px'
          }}
          onClick={()=>prev()}
        >Previous</Button>

        <Button
          type={'primary'}
          size={'large'}
          style={{width: '120px', borderRadius: '20px', marginTop: '50px'}}
          onClick={()=>done()}
        >Next</Button>
      </Typography.Paragraph>

    </div>
  )
}

export default ConfirmSystem;
