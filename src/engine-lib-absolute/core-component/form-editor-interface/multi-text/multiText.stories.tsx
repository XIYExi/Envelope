import { ComponentMeta, ComponentStory } from '@storybook/react';
import MultiText from './index';
// TODO 之后统一移走，测试用
import 'antd/dist/antd.css'


export default {
  title: 'core-component / multi-text',
  component: MultiText
} as ComponentMeta<typeof MultiText>;

const Template:ComponentStory<typeof MultiText> = (args) => <MultiText {...args}/>;


export const SampleMultiText = Template.bind({});
SampleMultiText.args = {
  value: ['a','b'],
  onChange: (e)=>console.log(e)
}
