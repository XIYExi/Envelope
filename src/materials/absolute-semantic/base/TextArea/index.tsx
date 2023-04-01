import React, { FC, useState } from 'react';
import { ITextAreaConfig } from '@/materials/absolute-semantic/base/TextArea/schema';
import logo from '../../../../assets/absolute/richText.png';
import { Form, Image, TextArea } from 'semantic-ui-react';

/*begin to delete*/
interface ITextAreaProps extends ITextAreaConfig {
  isTpl: boolean;
  onChange?: any;
}
/*end to delete*/

const STextArea: FC<ITextAreaProps> = (props) => {
  const { isTpl, ...restProps } = props;

  const { placeholder, rows } = restProps;

  const [value, setValue] = useState(placeholder);
  const handleChange = (e: any, data: any) => {
    const value = data;
    setValue(value);

    props.onChange && props.onChange(value);
  };

  return (
    <React.Fragment>
      {isTpl && <Image src={logo} alt="TextArea" />}
      {!isTpl && (
        <div>
          <Form>
            {/*@ts-ignore*/}
            <TextArea
              rows={rows}
              placeholder={placeholder}
              value={value}
              onChange={(e, data) => handleChange(e, data)}
            />
          </Form>
        </div>
      )}
    </React.Fragment>
  );
};

export default STextArea;
