import EditableTable from './index';
import { ComponentMeta, ComponentStory } from '@storybook/react';


export default {
  title: 'core-component / table',
  component: EditableTable
} as ComponentMeta<typeof EditableTable>

const Template: ComponentStory<typeof EditableTable> = (args) => <EditableTable {...args} />

export const SampleEditableTable = Template.bind({});
SampleEditableTable.args = {

}
