import EditorModal from './editor-modal';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'core-component / data-list',
  component: EditorModal
}as ComponentMeta<typeof EditorModal>;

const Template:ComponentStory<typeof EditorModal> = (args) => <EditorModal {...args}/>

export const SampleEditorModal = Template.bind({});

SampleEditorModal.args = {
  visible: true,
}
