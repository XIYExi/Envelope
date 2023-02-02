import React, { FC } from 'react';
import styles from '@/pages/home/index.less';
import { MobileOutlined } from '@ant-design/icons';
import { Image } from 'semantic-ui-react';



const UISystem:FC<{
  ui: string;
  chooseUI: (e:string)=>void;
}> = props => {

  const {ui, chooseUI} = props;

  return(
    <>
      <div >
        <div className={styles.operation}>
          <div onClick={()=>chooseUI('antd')}
               style={{marginBottom: '15px'}}
          >
            <div className={styles.card}
                 style={{
                   borderColor: ui === 'antd' ? '#8db8ee' : ''
                 }}
            >
              <Image />
              <div>Ant Design</div>
            </div>
          </div>

          <div onClick={()=>chooseUI('semantic')}
               style={{marginBottom: '15px'}}
          >
            <div className={styles.card}
                 style={{
                   borderColor: ui === 'semantic' ? '#8db8ee' : ''
                 }}
            >
              <MobileOutlined />
              <div>Semantic UI</div>
            </div>
          </div>

          <div onClick={()=>chooseUI('lole')}
               style={{marginBottom: '15px'}}
          >
            <div className={styles.card}
                 style={{
                   borderColor: ui === 'lole' ? '#8db8ee' : ''
                 }}
            >
              <MobileOutlined />
              <div>Love Letter UI</div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default UISystem;
