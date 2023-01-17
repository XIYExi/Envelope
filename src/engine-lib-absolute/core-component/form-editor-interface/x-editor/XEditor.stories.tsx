import XEditor from './index';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import ex from 'umi/dist';


export default {
  title: 'core-component / x-editor',
  component: XEditor
} as ComponentMeta<typeof XEditor>

const Template:ComponentStory<typeof XEditor> = (args) => <XEditor {...args} />

export const SampleXEditor = Template.bind({});
SampleXEditor.args = {

}
