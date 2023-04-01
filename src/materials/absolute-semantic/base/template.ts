import Advertisement from './Ad/template';
import Divider from './Divider/template';
import Header from './Header/template';
import Input from './Input/template';
import Label from './Label/template';
import Message from './Message/template';
import Placeholder from './Placeholder/template';
import Search from './Search/template';
import Statistic from './Staistic/template';
import Text from './Text/template';
import TextArea from './TextArea/template';

const baseTemplate = [
  Advertisement,
  Divider,
  Header,
  Input,
  Label,
  Message,
  Placeholder,
  Search,
  Statistic,
  Text,
  TextArea,
];

const semanticBaseTemplate = baseTemplate.map((v) => {
  return { ...v, category: 'base' };
});

export default semanticBaseTemplate;
