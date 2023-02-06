import { EditorModal } from './index';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'core-component / data-list',
  component: EditorModal
}as ComponentMeta<typeof EditorModal>;

const Template:ComponentStory<typeof EditorModal> = (args) => (
  <div>
    <EditorModal {...args}/>
  </div>

)

export const SampleEditorModal = Template.bind({});

SampleEditorModal.args = {
  visible: true,
}
