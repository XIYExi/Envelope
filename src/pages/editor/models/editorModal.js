import {uuid} from '../../../engine-lib-absolute/core-utils/tool';
import key from 'keymaster';

const pointData = localStorage.getItem('userData') || '[]';

const overSave = (name, data) => {
  localStorage.setItem(name, JSON.stringify(data));
}

export default {
  namespace: 'editorModal',
  state: {
    pointData: JSON.parse(pointData),
    curPoint: null
  },

}
