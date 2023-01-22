import styles from './index.less';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import React from 'react';
import { ASwitch, schema } from '@/materials/absolute-antd/control/Switch';

const Head = styled.h2`
  font-size: 50px;
`

export default function IndexPage() {

  return (
    <div>
      <Head>dada</Head>
      <h1 className={styles.title}>Page index</h1>

      <ASwitch isTpl={false}
               {...schema.config}
        onChange={e=>console.log('index: '+e)}
      />

    </div>
  );
}
