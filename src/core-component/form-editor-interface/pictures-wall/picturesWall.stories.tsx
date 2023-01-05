import PicturesWall from './pictures-wall';
import { ComponentMeta, ComponentStory } from '@storybook/react';
//TODO...
import 'antd/dist/antd.css';

export default {
  title: 'core-component / pictures-wall',
  component: PicturesWall
} as ComponentMeta<typeof PicturesWall>;

const Template:ComponentStory<typeof PicturesWall> = (args) => <PicturesWall {...args} />

export const SamplePicturesWall = Template.bind({});
SamplePicturesWall.args = {

}
