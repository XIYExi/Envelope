import { uuid } from '@/engine-lib-absolute/core-utils/tool';

const pointData = localStorage.getItem('userPcData') || '[]';


const overSave = (name: string, data: any) => {
  localStorage.setItem(name, JSON.stringify(data));
}

export default {
  namespace: 'editorPcModal',
  state: {
    pointData: JSON.parse(pointData),
    curPoint: null
  },
  reducers: {
    addPointData(state: any, {payload}: any){
      let pointData = [...state.pointData, payload];
      overSave('userData', pointData);
      return{
        ...state,
        pointData,
        curPoint: payload
      }
    },
    modPointData(state: any, {payload}: any){
      const {id} = payload;
      const pointData = state.pointData.map((item: any) => {
        if (item.id === id)
          return payload;
        return {...item};
      })
      overSave('userData', pointData);
      return {
        ...state,
        pointData,
        curPoint: payload
      }
    },
    delPointData(state: any, {payload}:any){
      const {id} = payload;
      const pointData = state.pointData.filter((item:any) => item.id !== id);
      overSave('userData', pointData);

      return {
        ...state,
        pointData,
        curPoint: null
      }
    },
    clearAll(state:any) {
      overSave('userData', []);
      return {
        ...state,
        pointData: [],
        curPoint: null,
      };
    }
  },
  effects:{}
}
