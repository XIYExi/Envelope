import React, { FC, useState } from 'react';
import { IRouteComponentProps, history } from 'umi';
import { Button } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import styles from './index.less';


export default function Layout(
  {children}: IRouteComponentProps
){
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  return(
    <div>
      <div
        style={{
          position: 'fixed',
          right: `${modalOpen ? '-100%' : '10px'}`,
          bottom: '16px',
          transition: 'all 0.5s ease-in-out',
          zIndex: 2,
        }}
      >
        <Button
          type="primary"
          style={{ padding: '0 6px' }}
          onClick={() => setModalOpen(!modalOpen)}
        >
          <CustomerServiceOutlined />
        </Button>
      </div>
      {/*TODO 添加 modal*/}
      {children}
      {
        window.location.pathname.indexOf('editor') > -1 && (
          <Draggable>
            <div className={styles.dragPay}>
              <div className={styles.crouseBtn}>搭建技巧(可拖动)</div>
              <div className={styles.mask} >
                {/*<img src={Dooring} alt="sda" />*/}
              </div>
            </div>
          </Draggable>
        )
      }
    </div>
  )
}
