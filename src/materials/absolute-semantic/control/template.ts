import Button from './Button/template';
import CheckBox from './CheckBox/template';
import Dropdown from './Dropdown/template';
import Pagination from './Pagination/template';
import Progress from './Progress/template';
import Radio from './Radio/template';

const controlTemplate = [
  Button,
  CheckBox,
  Dropdown,
  Pagination,
  Progress,
  Radio,
];

const semanticControlTemplate = controlTemplate.map((v) => {
  return { ...v, category: 'control' };
});

export default semanticControlTemplate;
