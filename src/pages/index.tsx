import styles from './index.less';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import React from 'react';
import { ACalendar, schema } from '@/materials/absolute-antd/media/Calendar';

const Head = styled.h2`
  font-size: 50px;
`

export default function IndexPage() {

  return (
    <div>
      <Head>dada</Head>
      <h1 className={styles.title}>Page index</h1>

      <ACalendar isTpl={false}
               {...schema.config}/>

    </div>
  );
}
