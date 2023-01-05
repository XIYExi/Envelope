import styles from './index.less';
import styled from 'styled-components';

const Head = styled.h2`
  font-size: 50px;
`

export default function IndexPage() {
  return (
    <div>
      <Head>dada</Head>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}
