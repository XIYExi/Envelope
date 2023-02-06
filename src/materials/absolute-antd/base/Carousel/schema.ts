import {
  IDataListConfigType,
  IRadioConfigType,
  ISwitchConfigType,
  INumberConfigType,
  TDataListDefaultType,
  TRadioDefaultType,
  TSwitchDefaultType,
  TNumberDefaultType,
} from '../../../../engine-lib-absolute/core-component/type';

export type CarouselDirectionKeyType = 'top' | 'bottom' | 'left' | 'right';


export type CarouselEffectType = 'scrollx' | 'fade';

export type TCarouselEditData = Array<
  | IRadioConfigType<CarouselDirectionKeyType>
  | IRadioConfigType<CarouselEffectType>
  | IDataListConfigType
  | ISwitchConfigType
  | INumberConfigType
  >;

export interface ICarouselConfig {
  direction: TRadioDefaultType<CarouselDirectionKeyType>;
  effect: TRadioDefaultType<CarouselEffectType>;
  autoPlay: TSwitchDefaultType;
  imgList: TDataListDefaultType;
  tplImg: string;
  round: TNumberDefaultType;
}

export interface ICarouselSchema {
  editData: TCarouselEditData;
  config: ICarouselConfig;
}

const Carousel: ICarouselSchema = {
  editData: [
    {
      key: 'direction',
      name: '滑动条位置',
      type: 'Radio',
      range: [
        {
          key: 'bottom',
          text: '底部',
        },
        {
          key: 'top',
          text: '顶部',
        },
        {
          key: 'right',
          text: '右侧',
        },
        {
          key: 'left',
          text: '左侧',
        },
      ],
    },
    {
      key: 'effect',
      name: '动画效果',
      type: 'Radio',
      range: [
        {
          key: 'scrollx',
          text: '滑动'
        },
        {
          key: 'fade',
          text: '消失'
        }
      ]
    },
    {
      key: 'round',
      name: '圆角',
      type: 'Number',
    },
    {
      key: 'autoPlay',
      name: '是否自动切换',
      type: 'Switch',
    },
    {
      key: 'imgList',
      name: '图片列表',
      type: 'DataList',
    },
  ],
  config: {
    direction: 'bottom',
    effect: 'scrollx',
    round: 0,
    autoPlay: true,
    imgList: [
      {
        id: '1',
        title: '趣谈小课1',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
          },
        ],
      },
      {
        id: '2',
        title: '趣谈小课1',
        desc: '致力于打造优质小课程',
        link: 'xxxxx',
        imgUrl: [
          {
            uid: '001',
            name: 'image.png',
            status: 'done',
            url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
          },
        ],
      },
    ],
    tplImg: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
  },
};
export default Carousel;



