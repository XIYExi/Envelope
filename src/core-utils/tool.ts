import { RGBColor } from 'react-color';


export const isDev = process.env.NODE_ENV === 'development';

// 生成uuid
export function uuid(len: number, radix: number) {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  let uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    let r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}


export function getBase64(file: File | Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}


// 将rgba字符串对象转化为rgba对象
export function rgba2Obj(rgba = '') {
  let reg = /rgba\((\d+),(\d+),(\d+),(\d+)\)/g;
  let rgbaObj: RGBColor = { r: 0, g: 0, b: 0, a: 0 };

  rgba.replace(reg, (_m, r, g, b, a) => {
    rgbaObj = { r, g, b, a };
    return rgba;
  });
  return rgbaObj;
}







