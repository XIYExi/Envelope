import FormItems from './index';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';

export default{
  title:'core-component / form-items',
  component: FormItems
} as ComponentMeta<typeof FormItems>;


const Template:ComponentStory<typeof FormItems> = (args) => <FormItems {...args}/>

export const SampleFormItems = Template.bind({});
SampleFormItems.args = {

}
