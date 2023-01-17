import CardPicker from './index';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';

export default {
  title: 'core-component / card-picker',
  component: CardPicker
} as ComponentMeta<typeof CardPicker>;

const Template:ComponentStory<typeof CardPicker> = (args) => <CardPicker {...args} />

export const SampleCardPicker = Template.bind({});
SampleCardPicker.args = {
  icons: ['users', 'home', 'spinner'],
  type: 'users'
}
