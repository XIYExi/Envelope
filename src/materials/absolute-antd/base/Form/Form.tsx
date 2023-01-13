import React, { FC, memo, useCallback } from 'react';
import {Button} from 'antd';
import BaseForm from '@/core-component/antd-base-assembly/base-form/base-form';
import styled from 'styled-components';
import {IFormConfig} from './schema';
import { TColorDefaultType, TTextDefaultType } from '@/core-component/type';
import logo from '../../../../assets/form.png';


export interface IFormConfigProps extends IFormConfig {
  isTpl: boolean;
}


const AFormTitle = styled.div`
  padding-bottom: 20px;
  text-align: center;
`


const AFormWrapper = styled.div<{
  $bgColor: TColorDefaultType;
  $pointer: boolean;
}>`
  margin: 10px;
  padding: 20px 16px;
  border-radius: 6px;
  box-shadow: 0 2px 6px #f0f0f0;
  width: calc(100% - 20px);
  overflow: hidden;
  position: absolute;
  background-color: ${props => props.$bgColor};
  pointer-events: ${props => props.$pointer ? 'none' : 'initial'},
`


const AButton = styled(Button)<{
  $bgColor: TColorDefaultType;
  $bdColor: TColorDefaultType;
  $textCol: TTextDefaultType;
}>`
  background-color: ${props=>props.$bgColor};
  border-color: ${props=>props.$bdColor};
  color:${props=>props.$textCol};
`


const AForm:FC<IFormConfigProps> = (props) => {
  const {
    title,
    bgColor,
    fontSize,
    titColor,
    btnColor,
    titWeight,
    btnTextColor,
    api,
    formControls,
  } = props;

  const formData: Record<string, any> = {};

  const handleChange = useCallback(
    (item, v) => {
      formData[item.label] = v;
    },
    [formData],
  );

  const handleSubmit = () => {
    if (api) {
      fetch(api, {
        body: JSON.stringify(formData),
        cache: 'no-cache',
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        mode: 'cors',
      });
    }
  };

  const isEditorPage = window.location.pathname.indexOf('editor') > -1;

  return (
    <React.Fragment>
      {
        props.isTpl && (
          <div>
            <img src={logo} alt="" />
          </div>
        )
      }
      {
        !props.isTpl && (
          <AFormWrapper
            $bgColor={bgColor}
            $pointer={isEditorPage}
          >
            {
              title && (
                <AFormTitle
                  style={{ fontSize, fontWeight: +titWeight, color: titColor }}
                >
                  {title}
                </AFormTitle>
              )
            }
            <div>
              {
                formControls.map(item => {
                  const FormItem = BaseForm[item.type];
                  return (
                    <FormItem onChange={(v: string) => handleChange(item, v)} {...item} key={item.id} />
                  );
                })
              }
              <div style={{ textAlign: 'center', padding: '16px 0' }}>
                <AButton
                  type="primary"
                  size="small"
                  block
                  onClick={handleSubmit}
                  $bgColor={btnColor}
                  $bdColor={btnColor}
                  $textCol={btnTextColor}
                >
                  提交
                </AButton>
              </div>
            </div>
          </AFormWrapper>
        )
      }
    </React.Fragment>
  )

}


export default memo(AForm);
