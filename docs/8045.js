(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8045, 3649],
  {
    58045: function (e, n, t) {
      'use strict';
      t.r(n);
      var a = t(91896),
        l = t(12924),
        i = t.n(l),
        r = t(93649),
        o = {
          ak: '\u4f60\u7684\u767e\u5ea6\u5730\u56feak',
          position: [121.444017, 31.237787],
          location: '\u4e0a\u6d77\u5e02',
        };
      n['default'] = () =>
        i().createElement(r.default, (0, a.Z)({ isTpl: !1 }, o));
    },
    93649: function (e, n, t) {
      'use strict';
      t.r(n);
      t(12968);
      var a,
        l,
        i = t(6122),
        r = t(93224),
        o = t(20310),
        c = t(12924),
        p = t.n(c),
        s = t(13516),
        m = t(12788),
        u = t(63157),
        d = t.n(u),
        v = ['isTpl'],
        f = m.ZP.div(
          a ||
            (a = (0, o.Z)([
              '\n  height: 100%;\n  display: flex;\n  align-items: center;\n  & > div {\n    width: 100%;\n  }\n',
            ])),
        ),
        g = (0, m.ZP)(s.__)(
          l ||
            (l = (0, o.Z)([
              '\n  color: #000;\n  border-color: #06c;\n  padding: 3px 10px;\n  border-radius: 6px;\n',
            ])),
        ),
        E = (e) => {
          var n = e.isTpl,
            t = (0, r.Z)(e, v),
            a = t.ak,
            l = t.location,
            o = t.position;
          return p().createElement(
            p().Fragment,
            null,
            n &&
              p().createElement(
                'div',
                null,
                p().createElement(i.Z, {
                  preview: !1,
                  src: d(),
                  style: { width: '100%' },
                  alt: '\u5730\u56fe\u7ec4\u4ef6',
                }),
              ),
            !n &&
              p().createElement(
                f,
                null,
                p().createElement(
                  s._F,
                  { akay: a },
                  p().createElement(
                    s.D5,
                    { widget: ['NavigationControl'], zoom: 13 },
                    p().createElement(s.Jx, {
                      animation: 2,
                      position: { lng: Number(o[0]), lat: Number(o[1]) },
                    }),
                    p().createElement(g, {
                      content: l,
                      position: { lng: Number(o[0]), lat: Number(o[1]) },
                    }),
                  ),
                ),
              ),
          );
        };
      n['default'] = (0, c.memo)(E);
    },
    63157: function (e, n, t) {
      e.exports = t.p + 'static/map@2x.09a4014c.png';
    },
  },
]);
