import React from 'react';
import SComment from '@/materials/absolute-semantic/social/Comment';

const attr = {
  collapsed: false,
  minimal: false,
  size: 'large',
  threaded: false,
  dataSource: [
    {
      id: '1000',
      avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
      author: 'Matt',
      meta: 'Today at 5:42PM',
      content: 'How artistic!',
      actions: 'Reply-Open',
      child: [],
    },
    {
      id: '1001',
      avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
      author: 'Elliot Fu',
      meta: 'Yesterday at 12:30AM',
      content: 'This has been very useful for my research. Thanks as well!',
      actions: 'Reply-Open',
      child: [
        {
          id: '1002',
          avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
          author: 'Jenny Hess',
          meta: 'Just now',
          content: 'Elliot you are always so right :)',
          actions: 'Reply-Open',
          child: [
            {
              id: '1005',
              avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              author: 'Xiye',
              meta: 'Just now',
              content: 'Now xiye will test this System.',
              actions: 'Reply-Open',
              child: [],
            },
          ],
        },
        {
          id: '1007',
          avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
          author: 'Ada Simth',
          meta: 'Two day ago',
          content: "I will show you '=v=' too.",
          actions: 'Reply-Open',
          child: [],
        },
      ],
    },
    {
      id: '1003',
      avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
      author: 'Joe Henderson',
      meta: '5 days ago',
      content: 'Dude, this is awesome. Thanks so much',
      actions: 'Reply-Open',
      child: [
        {
          id: '1006',
          avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
          author: 'Cayon',
          meta: 'One hour ago',
          content: '=v=',
          actions: 'Reply-Open',
          child: [],
        },
      ],
    },
  ],
};

export default () => (
  /*@ts-ignore*/
  <SComment isTpl={false} {...attr} />
);
