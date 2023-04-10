import { render } from '@testing-library/react';
import AButton from '@/materials/absolute-antd/control/Button';
import userEvent from '@testing-library/user-event';

/*默认参数*/
const attr = {
  text: 'Button',
  block: false,
  danger: false,
  disabled: false,
  ghost: false,
  href: 'xxxx',
  icon: `SearchOutlined`,
  iconLocation: 'left',
  loading: false,
  shape: 'default',
};

describe('测试Antd Button', () => {
  it('侧边栏显示为图片', () => {
    // @ts-ignore
    const { container } = render(AButton, { isTpl: true, ...attr });
    const img = container.querySelector('img');
    expect(img?.src).toBe('Antd Button');
  });
  it('画布渲染组件', () => {
    // @ts-ignore
    const { container } = render(AButton, { isTpl: false, ...attr });
    const button = container.querySelector('button');
    expect(button?.id).toBe('antd button');
    expect(button?.textContent).toBe('Button');
    // @ts-ignore
    userEvent.hover(button);
    expect(button?.className).toBe('hovered');
    // @ts-ignore
    userEvent.unhover(button);
    expect(button?.className).toBe('normal');
  });
});
