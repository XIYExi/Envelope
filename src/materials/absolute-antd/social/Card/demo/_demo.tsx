import React from 'react';
import ACard from '@/materials/absolute-antd/social/Card';

const attr = {
  actions: 'SettingOutlined-EditOutlined-EllipsisOutlined',
  width: 300,
  bordered: true,
  coverUrl:
    'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  hoverable: false,
  loading: false,
  title: 'Card Title',
  avatarUrl: 'https://joeschmoe.io/api/v1/random',
  description: 'This is the description',
};
export default () => <ACard isTpl={false} {...attr} />;
