import { DataList } from './index';
import { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'core-component / data-list',
  component: DataList
} as ComponentMeta<typeof DataList>;

const Template:ComponentStory<typeof DataList> = (args) => <DataList {...args}/>

export const SampleDataList = Template.bind({});
SampleDataList.args = {

}
