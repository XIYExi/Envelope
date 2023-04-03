import React, { FC, memo } from 'react';
import { Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';

const GitHubButton: FC<{ url: string }> = (props) => {
  const { url } = props;

  return (
    <Button
      style={{
        float: 'right',
        marginRight: '20px',
        marginBottom: '10px',
        width: '50px',
        borderRadius: '8px',
      }}
      icon={<GithubOutlined />}
      href={url}
    />
  );
};

export default memo(GitHubButton);
