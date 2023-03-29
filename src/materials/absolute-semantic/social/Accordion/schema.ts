import templateStr from '!raw-loader!./index';
import {
  IDataListConfigType,
  ISwitchConfigType,
  TDataListAccordionType,
} from '@/engine-lib-absolute/core-component/type';

type TAccordionEditData = Array<IDataListConfigType | ISwitchConfigType>;

export interface IAccordionConfig {
  exclusive: true;
  fluid: false;
  styled: false;
  dataSource: TDataListAccordionType;
}

interface IAccordionSchema {
  editData: TAccordionEditData;
  config: IAccordionConfig;
  [key: string]: any;
}

const Accordion: IAccordionSchema = {
  editData: [
    {
      key: 'exclusive',
      name: '只允许展开一个项目',
      type: 'Switch',
    },
    {
      key: 'fluid',
      name: '与父元素同宽',
      type: 'Switch',
    },
    {
      key: 'styled',
      name: '添加边框',
      type: 'Switch',
    },
    {
      key: 'dataSource',
      name: '数据源',
      type: 'DataList',
    },
  ],
  config: {
    exclusive: true,
    fluid: false,
    styled: false,
    dataSource: [
      {
        id: '100',
        title: 'What is a dog?',
        content:
          'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
      },
      {
        id: '101',
        title: 'What kinds of dogs are there?',
        content:
          'There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.',
      },
      {
        id: '102',
        title: 'How do you acquire a dog?',
        content:
          'Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n' +
          '\n' +
          'A pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.',
      },
    ],
  },
  templateStr,
};

export default Accordion;
