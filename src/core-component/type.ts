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
