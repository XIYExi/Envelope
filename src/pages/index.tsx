import styles from './index.less';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import React from 'react';
import { ASegmented, schema } from '@/materials/absolute-antd/control/Segmented';

const Head = styled.h2`
  font-size: 50px;
`

export default function IndexPage() {

  return (
    <div>
      <Head>dada</Head>
      <h1 className={styles.title}>Page index</h1>

      <ASegmented isTpl={false}
               {...schema.config}
        onChange={e=>console.log(e)}
      />

    </div>
  );
}
