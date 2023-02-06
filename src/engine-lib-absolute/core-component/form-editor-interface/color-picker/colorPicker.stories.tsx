import ColorPicker from './index';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'core-component / color-picker',
  component: ColorPicker
} as ComponentMeta<typeof ColorPicker>;

const Template: ComponentStory<typeof ColorPicker> = (args) => <ColorPicker {...args} />

export const SampleColorPicker = Template.bind({});
SampleColorPicker.args = {
  onChange: (e) => console.log(e)
}
