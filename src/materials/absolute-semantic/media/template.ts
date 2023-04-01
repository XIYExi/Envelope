import Embed from './Embed/template';
import Image from './Image/template';

const mediaTemplate = [Embed, Image];

const semanticMediaTemplate = mediaTemplate.map((v) => {
  return { ...v, category: 'media' };
});

export default semanticMediaTemplate;
