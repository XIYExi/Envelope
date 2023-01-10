import Pos from './index';
import { ComponentMeta, ComponentStory } from '@storybook/react';


export default {
  title: 'core-component / pos',
  component: Pos
} as ComponentMeta<typeof Pos>;

const Template:ComponentStory<typeof Pos>  = (args) => (<Pos {...args} />)

export const SamplePos = Template.bind({});
SamplePos.args = {
  value: [0, 0],
  onChange:(v)=>console.log(v)
}
