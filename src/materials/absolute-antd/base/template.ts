import Alert from './Alert/template';
import Carousel from './Carousel/template';
import Divider from './Divider/template';
import Empty from './Empty/template';
import Form from './Form/template';
import Header from './Header/template';
import Image from './Image/template';
import List from './List/template';
import Paragraph from './Paragraph/template';
import Qrcode from './Qrcode/template';
import RichText from './RichText/template';
import Tabs from './Tabs/template';
import Text from './Text/template';

const baseTemplate = [
  Alert,
  Carousel,
  Divider,
  Empty,
  Form,
  Header,
  Image,
  List,
  Paragraph,
  Qrcode,
  RichText,
  Tabs,
  Text
]

const antdBaseTemplate = baseTemplate.map(v => {
  return {...v, category: 'base'}
});

export default antdBaseTemplate;
