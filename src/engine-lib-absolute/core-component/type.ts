import { ReactNode } from 'react';

export type TMutiTextDefaultType = Array<string>;

export type TUploadDefaultType = Array<{
  uid: string;
  name: string;
  status: string;
  url: string;
}>;

export interface ITextAreaConfigType {
  key: string;
  name: string;
  type: 'TextArea';
}

export type TTextAreaDefaultType = string;

export type TDataListDefaultTypeItem = {
  id: string;
  title: string;
  desc: string;
  link: string;
  imgUrl: TUploadDefaultType;
  content?: string;
  type?: number;
  price?: string;
  html?: string;
};


export type TDataListDefaultType = Array<TDataListDefaultTypeItem>;

export interface ICardPickerConfigType<T> {
  key: string;
  name: string;
  type: 'CardPicker';
  icons: Array<T>;
}
export interface INumberConfigType {
  key: string;
  name: string;
  type: 'Number';
  range?: [number, number];
  step?: number;
}


export type TCardPickerDefaultType<T> = T;

export interface IPosProps {
  key:string;
  name: string;
  type: 'Pos';
  placeObj: {
    text: string;
    link: string;
  }
}

export type TNumberDefaultType = number;

export interface IDataListConfigType {
  key: string;
  name: string;
  type: 'DataList';
  cropRate?: number;
}

////////////////////
export interface IColorConfigType {
  key: string;
  name: string;
  type: 'Color';
}

export interface IUploadConfigType {
  key: string;
  name: string;
  type: 'Upload';
  isCrop?: boolean;
  cropRate?: number;
}

export type TColorDefaultType = string;

/////////////////
export interface IRichTextConfigType {
  key: string;
  name: string;
  type: 'RichText';
}
export type TRichTextDefaultType = string;

export interface IMutiTextConfigType {
  key: string;
  name: string;
  type: 'MutiText';
}


/////////////////////////////////
export interface ISelectConfigType<KeyType> {
  key: string;
  name: string;
  type: 'Select';
  range: Array<{
    key: KeyType;
    text: string;
  }>;
}
export type TSelectDefaultType<KeyType> = KeyType;

/////////////////////////
export interface IRadioConfigType<KeyType> {
  key: string;
  name: string;
  type: 'Radio';
  range: Array<{
    key: KeyType;
    text: string;
  }>;
}
export type TRadioDefaultType<KeyType> = KeyType;

export type TTextDefaultType = string;

///////////////

export interface ISwitchConfigType {
  key: string;
  name: string;
  type: 'Switch';
}
export type TSwitchDefaultType = boolean;

/////////////////////////////
export interface ICardPickerConfigType<T> {
  key: string;
  name: string;
  type: 'CardPicker';
  icons: Array<T>;
}


/////////////

export interface ITableConfigType {
  key: string;
  name: string;
  type: 'Table';
}
export type TTableDefaultType = Array<{
  name: string;
  value: number;
}>;

// position input control
export interface IPosConfigType {
  key: string;
  name: string;
  type: 'Pos';
  placeObj?: {
    text: string;
    link: string;
  };
}

export type TPosItem = number | undefined;

export type TPosDefaultType = [TPosItem, TPosItem];

export type TPosType = [TPosItem, TPosItem];

export type baseFormOptionsType = {
  label: string;
  value: string;
};

export type baseFormTextTpl = {
  id: string;
  type: 'Text';
  label: string;
  placeholder: string;
};

export type baseFormTextTipTpl = {
  id: string;
  type: 'MyTextTip';
  label: string;
  color: string;
  fontSize: number;
};

export type baseFormNumberTpl = {
  id: string;
  type: 'Number';
  label: string;
  placeholder: string;
};

export type baseFormTextAreaTpl = {
  id: string;
  type: 'Textarea';
  label: string;
  placeholder: string;
};

export type baseFormMyRadioTpl = {
  id: string;
  type: 'MyRadio';
  label: string;
  options: baseFormOptionsType[];
};

export type baseFormMyCheckboxTpl = {
  id: string;
  type: 'MyCheckbox';
  label: string;
  options: baseFormOptionsType[];
};

export type baseFormMySelectTpl = {
  id: string;
  type: 'MySelect';
  label: string;
  options: baseFormOptionsType[];
};

export type baseFormDateTpl = {
  id: string;
  type: 'Date';
  label: string;
  placeholder: string;
};

export interface ITextConfigType {
  key: string;
  name: string;
  type: 'Text';
  placeholder?: string;
}

export interface IFormItemsConfigType {
  key: string;
  name: string;
  type: 'FormItems';
}

export type baseFormUnion =
  | baseFormTextTpl
  | baseFormTextTipTpl
  | baseFormNumberTpl
  | baseFormTextAreaTpl
  | baseFormMyRadioTpl
  | baseFormMyCheckboxTpl
  | baseFormMySelectTpl
  | baseFormDateTpl;
export type baseFormUnionType =
  | baseFormTextTpl['type']
  | baseFormTextTipTpl['type']
  | baseFormNumberTpl['type']
  | baseFormTextAreaTpl['type']
  | baseFormMyRadioTpl['type']
  | baseFormMyCheckboxTpl['type']
  | baseFormMySelectTpl['type']
  | baseFormDateTpl['type'];

export type TFormItemsDefaultType = Array<baseFormUnion>;
