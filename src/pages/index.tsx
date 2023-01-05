import styles from './index.less';
import styled from 'styled-components';
import { FC } from 'react';

const Head = styled.h2`
  font-size: 50px;
`

interface baseProps{
  id:string
}

const TestDiv:FC<baseProps> = (props)=>{
  const {id} = props;
  return(
    <div>{id}</div>
  )
}

export default function IndexPage() {
  return (
    <div>
      <Head>dada</Head>
      <h1 className={styles.title}>Page index</h1>
      <TestDiv  id={'s'}/>
    </div>
  );
}
