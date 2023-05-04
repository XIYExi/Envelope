export default {
  'POST /api/user/login': { username: 'xiye' },

  'POST /api/user/signup': {
    username: '1',
    pwd: '123123',
    nickname: '11',
    tel: '18115773800',
  },

  'POST /api/user/fresh': (req, res) => {
    res.end('ok');
  },
};
