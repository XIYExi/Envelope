import Button from './Button/template';
import CheckBox from './CheckBox/template';
import Radio from './Radio/template';
import Segmented from './Segmented/template';
import Select from './Select/template';
import Slider from './Slider/template';
import Switch from './Switch/template';

const controlTemplate = [
  Button,
  CheckBox,
  Radio,
  Segmented,
  Select,
  Slider,
  Switch
]

const antdControlTemplate = controlTemplate.map(v => {
  return {...v, category: 'control'}
})

export default antdControlTemplate;
