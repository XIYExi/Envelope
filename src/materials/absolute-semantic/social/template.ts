import Accordion from './Accordion/template';
import Card from './Card/template';
import Comment from './Comment/template';
import Feed from './Feed/template';
import Item from './Item/template';
import Rating from './Rate/template';

const socialTemplate = [Accordion, Card, Comment, Feed, Item, Rating];

const semanticSocialTemplate = socialTemplate.map((v) => {
  return { ...v, category: 'social' };
});

export default semanticSocialTemplate;
