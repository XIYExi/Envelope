export type TMutiTextDefaultType = Array<string>;

export type TUploadDefaultType = Array<{
  uid: string;
  name: string;
  status: string;
  url: string;
}>;

export type TDataListDefaultTypeItem = {
  id: string;
  title: string;
  desc: string;
  link: string;
  imgUrl: TUploadDefaultType;
  type?: number;
  price?: string;
};

export type TDataListDefaultType = Array<TDataListDefaultTypeItem>;

export interface ICardPickerConfigType<T> {
  key: string;
  name: string;
  type: 'CardPicker';
  icons: Array<T>;
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

export type TPosItem = number | undefined;

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
