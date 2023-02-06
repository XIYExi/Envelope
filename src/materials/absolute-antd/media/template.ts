import Audio from './Audio/template';
import Calendar from './Calendar/template';
import Map from './Map/template';
import Progress from './Progress/template';
import Video from './Video/template';

const mediaTemplate = [
  Audio,
  Calendar,
  Map,
  Progress,
  Video
]

const antdMediaTemplate = mediaTemplate.map(v => {
  return {...v, category: 'media'}
})

export default antdMediaTemplate;
