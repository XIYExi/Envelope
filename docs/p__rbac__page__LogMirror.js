(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8458],
  {
    34096: function (e, t, n) {
      'use strict';
      n.r(t);
      n(20228);
      var a,
        r,
        l,
        i = n(11382),
        p = n(2824),
        c = (n(402), n(55672)),
        m = n(20310),
        o = n(12924),
        u = n.n(o),
        s = n(85909),
        d = n(9669),
        h = n.n(d),
        f = n(48091),
        g = n(12788),
        v = g.ZP.div(
          a ||
            (a = (0, m.Z)([
              '\n  display: flex;\n  padding: 0.5em;\n  margin: 0.4em;\n  width: 100% !important;\n  &:hover {\n    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;\n    border-radius: 1.1em;\n  }\n',
            ])),
        ),
        Z = (0, g.ZP)(c.Z.Title)(
          r ||
            (r = (0, m.Z)([
              '\n  width: 2.5em;\n  text-align: center;\n  font-size: 1.5em !important;\n  margin-left: 1em;\n  margin-right: 0.5em;\n',
            ])),
        ),
        b = (0, g.ZP)(s.ZP)(
          l || (l = (0, m.Z)(['\n  width: 100% !important;\n'])),
        ),
        x = 0,
        w = (e) => {
          var t = (0, o.useState)([]),
            n = (0, p.Z)(t, 2),
            a = n[0],
            r = n[1],
            l = (0, o.useState)(!0),
            c = (0, p.Z)(l, 2),
            m = c[0],
            s = c[1];
          return (
            (0, o.useEffect)(() => {
              var e = setInterval(
                () => (
                  h()
                    .get(f.cb + '/log/query')
                    .then((e) => {
                      var t = e.data.data;
                      (x += 5),
                        s(!1),
                        x <= 100 ? r((e) => [...t, ...e]) : (r(t), (x = 0));
                    }),
                  () => {
                    clearInterval(e);
                  }
                ),
                2e3,
              );
            }, []),
            u().createElement(
              u().Fragment,
              null,
              u().createElement(
                i.Z,
                {
                  spinning: m,
                  tip: '\u6b63\u5728\u83b7\u53d6\u670d\u52a1\u5668\u65e5\u5fd7\uff0c\u8bf7\u7a0d\u7b49...',
                  size: 'large',
                  style: { marginTop: '5em' },
                },
                a.map((e, t) =>
                  u().createElement(
                    'div',
                    { style: { display: 'flex' } },
                    u().createElement(
                      v,
                      null,
                      u().createElement(Z, null, t + 1),
                      u().createElement(b, { value: e, key: t }),
                    ),
                  ),
                ),
              ),
            )
          );
        };
      t['default'] = w;
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
      var a = 'http://localhost:8001/api',
        r = 'http://localhost:8001/rbac',
        l = 'http://localhost:8001/templateApi';
    },
  },
]);
