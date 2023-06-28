(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3649],
  {
    93649: function (e, n, t) {
      'use strict';
      t.r(n);
      t(12968);
      var l,
        a,
        r = t(6122),
        i = t(93224),
        o = t(20310),
        c = t(12924),
        p = t.n(c),
        m = t(13516),
        s = t(12788),
        u = t(63157),
        d = t.n(u),
        g = ['isTpl'],
        v = s.ZP.div(
          l ||
            (l = (0, o.Z)([
              '\n  height: 100%;\n  display: flex;\n  align-items: center;\n  & > div {\n    width: 100%;\n  }\n',
            ])),
        ),
        b = (0, s.ZP)(m.__)(
          a ||
            (a = (0, o.Z)([
              '\n  color: #000;\n  border-color: #06c;\n  padding: 3px 10px;\n  border-radius: 6px;\n',
            ])),
        ),
        E = (e) => {
          var n = e.isTpl,
            t = (0, i.Z)(e, g),
            l = t.ak,
            a = t.location,
            o = t.position;
          return p().createElement(
            p().Fragment,
            null,
            n &&
              p().createElement(
                'div',
                null,
                p().createElement(r.Z, {
                  preview: !1,
                  src: d(),
                  style: { width: '100%' },
                  alt: '\u5730\u56fe\u7ec4\u4ef6',
                }),
              ),
            !n &&
              p().createElement(
                v,
                null,
                p().createElement(
                  m._F,
                  { akay: l },
                  p().createElement(
                    m.D5,
                    { widget: ['NavigationControl'], zoom: 13 },
                    p().createElement(m.Jx, {
                      animation: 2,
                      position: { lng: Number(o[0]), lat: Number(o[1]) },
                    }),
                    p().createElement(b, {
                      content: a,
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
