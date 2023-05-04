import mockjs from 'mockjs';

export default {
  'POST /rbac/back/center': mockjs.mock({
    success: true,
    data: {
      userId: '1652319467646234622',
      userAvatar:
        'https://gw.alipayobjects.com/mdn/rms_43231b/afts/img/A*W9g1S7W-TOoAAAAAAAAAAAAAARQnAQ',
      userNickname: '@name',
      userUsername: '@name',
      userPhone: '@id(11)',
      userEmail: '@email',
      userRole: 'admin',
      userDescription: '@cparagraph(3)',
    },
  }),

  'GET /rbac/back/userlist': mockjs.mock({
    success: true,
    'data|100': [
      {
        userId: '@id',
        userUsername: '@name',
        userNickname: '@name',
        pwd: '@string("lower",3,8)',
        userPhone: '@id(11)',
        userEmail: '@email',
        userRole: '@boolean',
        gender: '@boolean',
        createTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
        updateTime: '@datetime("yyyy-MM-dd A HH:mm:ss")',
      },
    ],
  }),
};
