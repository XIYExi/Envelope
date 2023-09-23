(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7987],
  {
    2347: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return q;
          },
        });
      n(38663), n(6999);
      var a = n(92820),
        r = a.Z,
        l = (n(49111), n(19650)),
        o = (n(57663), n(71577)),
        d = (n(71153), n(60331)),
        i = n(21584),
        c = i.Z,
        m = (n(47673), n(4107)),
        s = n(90636),
        u = (n(34792), n(48086)),
        p = n(3182),
        g = (n(9715), n(55843)),
        y = n(2824),
        Z = (n(43358), n(9e3)),
        E = n(12924),
        f = n.n(E),
        v = (n(85539), n(3437)),
        h = n(8870),
        b = (n(402), n(55672)),
        k = (n(71194), n(50146)),
        I = n(91896),
        w = n(95357),
        x = n(9669),
        B = n.n(x),
        C = n(48091),
        N = n(11092),
        O = n.n(N),
        R = (e) => {
          var t = (0, E.useState)(!1),
            n = (0, y.Z)(t, 2),
            a = n[0],
            r = n[1];
          (0, E.useEffect)(() => {
            0 !== e.editingKey.length ? r(!0) : r(!1);
          }, [e.editingKey]);
          var l = { labelCol: { span: 6 }, wrapperCol: { span: 12 } };
          return f().createElement(
            f().Fragment,
            null,
            f().createElement(
              k.Z,
              {
                title: '\u4fee\u6539\u7528\u6237\u4fe1\u606f',
                open: a,
                onOk: e.save,
                onCancel: e.cancel,
                width: '60%',
              },
              f().createElement(
                g.Z,
                (0, I.Z)({}, l, { form: e.form }),
                f().createElement(
                  g.Z.Item,
                  {
                    label: '\u7528\u6237Id',
                    name: 'userId',
                    style: {
                      margin: 0,
                      paddingTop: '1em',
                      paddingBottom: '1em',
                    },
                  },
                  f().createElement(m.Z, {
                    placeholder: e.editingKey,
                    disabled: !0,
                  }),
                ),
                f().createElement(
                  g.Z.Item,
                  {
                    label: '\u7528\u6237\u540d',
                    name: 'userUsername',
                    style: {
                      margin: 0,
                      paddingTop: '1em',
                      paddingBottom: '1em',
                    },
                  },
                  f().createElement(m.Z, {
                    placeholder:
                      '\u8bf7\u5f55\u5165\u65b0\u7684\u7528\u6237\u540d',
                  }),
                ),
                f().createElement(
                  g.Z.Item,
                  {
                    label: '\u7528\u6237\u6635\u79f0',
                    name: 'userNickname',
                    style: {
                      margin: 0,
                      paddingTop: '1em',
                      paddingBottom: '1em',
                    },
                  },
                  f().createElement(m.Z, {
                    placeholder:
                      '\u8bf7\u5f55\u5165\u65b0\u7684\u7528\u6237\u6635\u79f0',
                  }),
                ),
                f().createElement(
                  g.Z.Item,
                  {
                    label: '\u7528\u6237\u5bc6\u7801',
                    name: 'pwd',
                    style: {
                      margin: 0,
                      paddingTop: '1em',
                      paddingBottom: '1em',
                    },
                  },
                  f().createElement(m.Z, {
                    placeholder:
                      '\u8bf7\u5f55\u5165\u65b0\u7684\u7528\u6237\u540d\u5bc6\u7801',
                  }),
                ),
                f().createElement(
                  g.Z.Item,
                  {
                    label: '\u7528\u6237\u89d2\u8272',
                    name: 'userRole',
                    style: {
                      margin: 0,
                      paddingTop: '1em',
                      paddingBottom: '1em',
                    },
                  },
                  f().createElement(m.Z, {
                    placeholder:
                      '\u8bf7\u5f55\u5165\u65b0\u7684\u7528\u6237\u89d2\u8272',
                  }),
                ),
              ),
            ),
          );
        },
        T = (e) => {
          var t = g.Z.useForm(),
            n = (0, y.Z)(t, 1),
            a = n[0],
            r = (0, E.useState)(''),
            l = (0, y.Z)(r, 2),
            o = l[0],
            i = l[1],
            c = (0, E.useState)([]),
            m = (0, y.Z)(c, 2),
            u = m[0],
            Z = m[1],
            k = (0, E.useState)(!1),
            I = (0, y.Z)(k, 2),
            x = I[0],
            N = I[1],
            T = (0, E.useState)({ pagination: { current: 1, pageSize: 10 } }),
            F = (0, y.Z)(T, 2),
            S = F[0],
            U = F[1],
            q = [
              { title: '\u7528\u6237\u540d', dataIndex: 'userUsername' },
              { title: '\u6635\u79f0', dataIndex: 'userNickname' },
              {
                title: '\u5bc6\u7801',
                dataIndex: 'pwd',
                render: (e) =>
                  f().createElement(
                    'div',
                    { id: e },
                    f().createElement(
                      b.Z.Text,
                      { id: e + '-1', style: { display: 'block' } },
                      f().createElement('span', null, '******'),
                      f().createElement(w.Z, {
                        onClick: () => {
                          var t = document.getElementById(e + '-1'),
                            n = document.getElementById(e + '-2');
                          (O().findDOMNode(t).style.display = 'none'),
                            (O().findDOMNode(n).style.display = 'block');
                        },
                      }),
                    ),
                    f().createElement(
                      b.Z.Text,
                      { id: e + '-2', style: { display: 'none' } },
                      f().createElement('span', null, e),
                      f().createElement(w.Z, {
                        onClick: () => {
                          var t = document.getElementById(e + '-1'),
                            n = document.getElementById(e + '-2');
                          (O().findDOMNode(t).style.display = 'block'),
                            (O().findDOMNode(n).style.display = 'none');
                        },
                      }),
                    ),
                  ),
                width: '10%',
              },
              { title: '\u8054\u7cfb\u65b9\u5f0f', dataIndex: 'userPhone' },
              { title: '\u90ae\u7bb1', dataIndex: 'userEmail' },
              {
                title: '\u89d2\u8272',
                dataIndex: 'userRole',
                render: (e) =>
                  f().createElement(
                    d.Z,
                    { color: e ? 'magenta' : 'green' },
                    e ? '\u7ba1\u7406\u5458' : '\u7528\u6237',
                  ),
              },
              {
                title: '\u6027\u522b',
                dataIndex: 'gender',
                render: (e) =>
                  f().createElement(
                    d.Z,
                    { color: e ? 'cyan' : 'purple' },
                    e ? '\u7537' : '\u5973',
                  ),
              },
              { title: '\u521b\u5efa\u65f6\u95f4', dataIndex: 'createTime' },
              { title: '\u4fee\u6539\u65f6\u95f4', dataIndex: 'updateTime' },
              {
                title: '\u64cd\u4f5c',
                dataIndex: 'operation',
                render: (e, t) =>
                  f().createElement(
                    b.Z.Link,
                    {
                      onClick: () => {
                        i(t.userId);
                      },
                    },
                    '\u4fee\u6539',
                  ),
              },
            ],
            j = (e, t, n) => {
              U((0, h.Z)({ pagination: e, filters: t }, n));
            },
            K = () => {
              N(!0),
                B()
                  .get(C.cb + '/back/userlist')
                  .then((e) => {
                    var t = e.data.data;
                    Z(t),
                      N(!1),
                      U(
                        (0, h.Z)(
                          (0, h.Z)({}, S),
                          {},
                          {
                            pagination: (0, h.Z)(
                              (0, h.Z)({}, S.pagination),
                              {},
                              { total: 100 },
                            ),
                          },
                        ),
                      );
                  });
            },
            D = () => {
              i(''), a.resetFields();
            },
            L = (function () {
              var e = (0, p.Z)(
                (0, s.Z)().mark(function e() {
                  var t, n;
                  return (0, s.Z)().wrap(function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), a.validateFields();
                        case 2:
                          return (
                            (t = e.sent),
                            console.log('data', t),
                            (n = {
                              userId: o,
                              userUsername:
                                void 0 === t.userUsername ? '' : t.userUsername,
                              userNickname:
                                void 0 === t.userNickname ? '' : t.userNickname,
                              pwd: void 0 === t.pwd ? '' : t.pwd,
                              userRole: void 0 === t.userRole ? '' : t.userRole,
                            }),
                            (e.next = 7),
                            B()
                              .post(
                                C.ow +
                                  '/back/update?\n      userId='
                                    .concat(n.userId, '\n      &userUsername=')
                                    .concat(
                                      n.userUsername,
                                      '\n      &userNickname=',
                                    )
                                    .concat(n.userNickname, '\n      &pwd=')
                                    .concat(n.pwd, '\n      &userRole=')
                                    .concat(n.userRole),
                              )
                              .then((e) => {
                                var t = e.data.data;
                                console.log(t), a.resetFields(), i('');
                              })
                          );
                        case 7:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function () {
                return e.apply(this, arguments);
              };
            })();
          return (
            (0, E.useEffect)(() => {
              0 === e.query.length && K(), 0 !== e.query.length && Z(e.query);
            }, [JSON.stringify(S), e.query]),
            f().createElement(
              f().Fragment,
              null,
              f().createElement(v.Z, {
                rowKey: (e) => e.userId,
                columns: q,
                pagination: S.pagination,
                loading: x,
                onChange: j,
                dataSource: u,
              }),
              f().createElement(R, {
                editingKey: o,
                form: a,
                cancel: D,
                save: L,
              }),
            )
          );
        },
        F = T,
        S = Z.Z.Option,
        U = (e) => {
          var t = g.Z.useForm(),
            n = (0, y.Z)(t, 1),
            a = n[0],
            i = (0, E.useState)([]),
            v = (0, y.Z)(i, 2),
            h = v[0],
            b = v[1],
            k = (function () {
              var e = (0, p.Z)(
                (0, s.Z)().mark(function e() {
                  var t, n, r, l;
                  return (0, s.Z)().wrap(function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), a.validateFields();
                        case 2:
                          (t = e.sent),
                            (n = t.username),
                            (r = t.role),
                            (l = void 0 === n || 0 === n.length),
                            l || void 0 === r
                              ? l || void 0 !== r
                                ? l && void 0 !== r
                                  ? B()
                                      .get(C.cb + '/back/queryByRole')
                                      .then((e) => {
                                        var t = e.data.data;
                                        console.log('by role'), b(t);
                                      })
                                  : l &&
                                    void 0 === r &&
                                    u.default.error(
                                      '\u8bf7\u81f3\u5c11\u67e5\u8be2\u4e00\u4e2a\u4fe1\u606f',
                                    )
                                : B()
                                    .get(C.cb + '/back/queryByUsername')
                                    .then((e) => {
                                      var t = e.data.data;
                                      b(t);
                                    })
                              : B()
                                  .get(C.cb + '/back/queryByUsernameAndRole')
                                  .then((e) => {
                                    var t = e.data.data;
                                    b(t);
                                  });
                        case 6:
                        case 'end':
                          return e.stop();
                      }
                  }, e);
                }),
              );
              return function () {
                return e.apply(this, arguments);
              };
            })(),
            I = () => {
              b([]);
            };
          return f().createElement(
            f().Fragment,
            null,
            f().createElement(
              'div',
              null,
              f().createElement(
                g.Z,
                { style: { marginTop: '2em' }, layout: 'horizontal', form: a },
                f().createElement(
                  r,
                  { gutter: 24 },
                  f().createElement(
                    c,
                    { span: 9 },
                    f().createElement(
                      g.Z.Item,
                      {
                        label: '\u7528\u6237\u540d',
                        name: 'username',
                        style: { paddingLeft: '1em' },
                      },
                      f().createElement(m.Z, {
                        allowClear: !0,
                        placeholder:
                          '\u8bf7\u8f93\u5165\u9700\u8981\u67e5\u8be2\u7684\u7528\u6237\u540d',
                      }),
                    ),
                  ),
                  f().createElement(
                    c,
                    { span: 9 },
                    f().createElement(
                      g.Z.Item,
                      {
                        label: '\u89d2\u8272',
                        name: 'role',
                        style: { paddingLeft: '1.5em' },
                      },
                      f().createElement(
                        Z.Z,
                        { allowClear: !0, style: { width: '300px' } },
                        f().createElement(
                          S,
                          { key: 'admin' },
                          f().createElement(
                            d.Z,
                            { color: 'magenta' },
                            '\u7ba1\u7406\u5458',
                          ),
                        ),
                        f().createElement(
                          S,
                          { key: 'user' },
                          f().createElement(
                            d.Z,
                            { color: 'green' },
                            '\u7528\u6237',
                          ),
                        ),
                      ),
                    ),
                  ),
                  f().createElement(
                    c,
                    { span: 6 },
                    f().createElement(
                      l.Z,
                      { style: { paddingLeft: '1em', paddingRight: '1em' } },
                      f().createElement(
                        o.Z,
                        {
                          style: { width: '90px' },
                          type: 'primary',
                          onClick: k,
                        },
                        '\u67e5\u8be2',
                      ),
                      f().createElement(
                        o.Z,
                        { style: { width: '90px' }, onClick: I },
                        '\u91cd\u7f6e',
                      ),
                    ),
                  ),
                ),
              ),
            ),
            f().createElement(F, { query: h }),
          );
        },
        q = U;
    },
    48091: function (e, t, n) {
      'use strict';
      n.d(t, {
        ow: function () {
          return a;
        },
        cb: function () {
          return r;
        },
        iB: function () {
          return l;
        },
      });
      var a = 'http://localhost:8000/api',
        r = 'http://localhost:8000/rbac',
        l = 'http://localhost:8000/templateApi';
    },
    96774: function (e) {
      e.exports = function (e, t, n, a) {
        var r = n ? n.call(a, e, t) : void 0;
        if (void 0 !== r) return !!r;
        if (e === t) return !0;
        if ('object' !== typeof e || !e || 'object' !== typeof t || !t)
          return !1;
        var l = Object.keys(e),
          o = Object.keys(t);
        if (l.length !== o.length) return !1;
        for (
          var d = Object.prototype.hasOwnProperty.bind(t), i = 0;
          i < l.length;
          i++
        ) {
          var c = l[i];
          if (!d(c)) return !1;
          var m = e[c],
            s = t[c];
          if (
            ((r = n ? n.call(a, m, s, c) : void 0),
            !1 === r || (void 0 === r && m !== s))
          )
            return !1;
        }
        return !0;
      };
    },
  },
]);
