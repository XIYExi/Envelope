import Card from './Card/template';
import Collapse from './Collapse/template';
import Comment from './Comment/template';
import Rate from './Rate/template';
import Statistic from './Statistic/template';

const socialTemplate = [
  Card,
  Collapse,
  Comment,
  Rate,
  Statistic
]

const antdSocialTemplate = socialTemplate.map(v => {
  return {...v, category: 'social'}
})

export default antdSocialTemplate;
