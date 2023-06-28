(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [6257],
  {
    80214: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return y;
          },
        });
      a(17462);
      var n = a(76772),
        l = a(12924),
        r = a.n(l),
        o = (a(85539), a(3437)),
        i = a(8870),
        c = (a(402), a(55672)),
        d = (a(71153), a(60331)),
        m = (a(71194), a(50146)),
        u = a(2824),
        p = a(9669),
        s = a.n(p),
        g = a(48091),
        Z = a(55171),
        E = a.n(Z),
        h = (e) => {
          var t = (0, l.useState)(!1),
            a = (0, u.Z)(t, 2),
            n = a[0],
            o = a[1],
            i = (0, l.useState)('{}'),
            c = (0, u.Z)(i, 2),
            d = c[0],
            p = c[1];
          return (
            (0, l.useEffect)(() => {
              0 === e.editingKey.length
                ? (o(!1),
                  s()
                    .get(g.iB + '/template/queryById')
                    .then((e) => {
                      var t = e.data.data;
                      p(t.content);
                    }))
                : o(!0);
            }, [e.editingKey]),
            r().createElement(
              r().Fragment,
              null,
              r().createElement(
                m.Z,
                {
                  title: '\u4fee\u6539\u7528\u6237\u4fe1\u606f',
                  open: n,
                  onCancel: e.ok,
                  onOk: e.ok,
                  width: '60%',
                },
                r().createElement(E(), { src: JSON.parse(d), collapsed: !0 }),
              ),
            )
          );
        },
        f = (e) => {
          var t = (0, l.useState)(''),
            a = (0, u.Z)(t, 2),
            n = a[0],
            m = a[1],
            p = (0, l.useState)([]),
            Z = (0, u.Z)(p, 2),
            E = Z[0],
            f = Z[1],
            I = (0, l.useState)(!1),
            k = (0, u.Z)(I, 2),
            y = k[0],
            w = k[1],
            S = (0, l.useState)({ pagination: { current: 1, pageSize: 10 } }),
            b = (0, u.Z)(S, 2),
            v = b[0],
            x = b[1],
            C = [
              { title: '\u6a21\u677f\u540d', dataIndex: 'templateTitle' },
              {
                title: 'UI',
                dataIndex: 'templateUi',
                render: (e) =>
                  r().createElement(
                    r().Fragment,
                    null,
                    1 === e &&
                      r().createElement(d.Z, { color: 'blue' }, 'antd'),
                    2 === e &&
                      r().createElement(d.Z, { color: 'green' }, 'semantic'),
                    3 === e &&
                      r().createElement(d.Z, { color: 'pink' }, 'lole'),
                  ),
              },
              {
                title: '\u7b80\u4ecb',
                dataIndex: 'templateDesc',
                render: (e) => r().createElement(c.Z.Paragraph, null, e),
                width: '20%',
              },
              {
                title: '\u7c7b\u578b',
                dataIndex: 'templateType',
                render: (e) =>
                  r().createElement(
                    r().Fragment,
                    null,
                    1 === e &&
                      r().createElement(
                        d.Z,
                        { color: 'yellow' },
                        '\u539f\u751f\u5f15\u64ce',
                      ),
                    2 === e &&
                      r().createElement(d.Z, { color: 'blue' }, 'Lowcode'),
                    3 === e &&
                      r().createElement(
                        d.Z,
                        { color: 'red' },
                        '\u6d41\u7a0b\u56fe',
                      ),
                  ),
              },
              { title: '\u521b\u5efa\u65f6\u95f4', dataIndex: 'createTime' },
              { title: '\u4fee\u6539\u65f6\u95f4', dataIndex: 'updateTime' },
              {
                title: '\u64cd\u4f5c',
                dataIndex: 'operation',
                render: (e, t) =>
                  r().createElement(
                    c.Z.Link,
                    {
                      onClick: () => {
                        m(t.templateId);
                      },
                    },
                    '\u67e5\u770b\u8be6\u7ec6\u6a21\u677f',
                  ),
              },
            ],
            F = () => {
              m('');
            },
            B = (e, t, a) => {
              x((0, i.Z)({ pagination: e, filters: t }, a));
            },
            K = () => {
              w(!0),
                s()
                  .get(g.iB + '/template/list')
                  .then((e) => {
                    var t = e.data.data;
                    f(t),
                      w(!1),
                      x(
                        (0, i.Z)(
                          (0, i.Z)({}, v),
                          {},
                          {
                            pagination: (0, i.Z)(
                              (0, i.Z)({}, v.pagination),
                              {},
                              { total: 20 },
                            ),
                          },
                        ),
                      );
                  });
            };
          return (
            (0, l.useEffect)(() => {
              K();
            }, []),
            r().createElement(
              r().Fragment,
              null,
              r().createElement(o.Z, {
                rowKey: (e) => e.templateId,
                columns: C,
                pagination: v.pagination,
                loading: y,
                onChange: B,
                dataSource: E,
              }),
              r().createElement(h, { editingKey: n, ok: F }),
            )
          );
        },
        I = f,
        k = (e) =>
          r().createElement(
            r().Fragment,
            null,
            r().createElement(n.Z, {
              style: { margin: '1em', borderRadius: '0.4em' },
              message: '\u6a21\u677f\u7ba1\u7406\u9875\u9762',
              description:
                '\u6b64\u9875\u9762\u4ec5\u5141\u8bb8\u7ba1\u7406\u5458\u67e5\u770b\u3001\u7f16\u8f91\u548c\u53d1\u5e03\u901a\u7528\u6a21\u677f\uff0c\u4e0d\u5141\u8bb8\u67e5\u770b\u7528\u6237\u79c1\u4eba\u521b\u5efa\u7684\u6a21\u677f',
              type: 'info',
              showIcon: !0,
              closable: !0,
            }),
            r().createElement(I, null),
          ),
        y = k;
    },
    48091: function (e, t, a) {
      'use strict';
      a.d(t, {
        ow: function () {
          return n;
        },
        cb: function () {
          return l;
        },
        iB: function () {
          return r;
        },
      });
      var n = 'http://localhost:8001/api',
        l = 'http://localhost:8001/rbac',
        r = 'http://localhost:8001/templateApi';
    },
  },
]);
