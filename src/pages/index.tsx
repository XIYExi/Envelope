import styles from './index.less';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import AImage from '@/materials/absolute-antd/base/Image/Image';
import schema from '@/materials/absolute-antd/base/Image/schema';


const Head = styled.h2`
  font-size: 50px;
`

interface baseProps{
  id:string
}

export default function IndexPage() {
  return (
    <div style={{width:'50vmin'}}>
      <Head>dada</Head>
      <h1 className={styles.title}>Page index</h1>
      <AImage {...schema.config} />
    </div>
  );
}
