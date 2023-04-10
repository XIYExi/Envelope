(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3058],
  {
    53058: function (e, n, t) {
      'use strict';
      t.r(n);
      var l = t(57337),
        a = t(93224),
        r = t(12924),
        c = t.n(r),
        s = t(62090),
        u = t.n(s),
        o = t(49282),
        p = t(31223),
        h = t(416),
        i = ['isTpl'],
        v = (e) => {
          var n = e.isTpl,
            t = (0, a.Z)(e, i),
            s = t.placeholder,
            v = t.rows,
            d = (0, r.useState)(s),
            m = (0, l.Z)(d, 2),
            f = m[0],
            g = m[1],
            C = (n, t) => {
              var l = t;
              g(l), e.onChange && e.onChange(l);
            };
          return c().createElement(
            c().Fragment,
            null,
            n && c().createElement(o.Z, { src: u(), alt: 'TextArea' }),
            !n &&
              c().createElement(
                'div',
                null,
                c().createElement(
                  p.Z,
                  null,
                  c().createElement(h.Z, {
                    rows: v,
                    placeholder: s,
                    value: f,
                    onChange: (e, n) => C(e, n),
                  }),
                ),
              ),
          );
        };
      n['default'] = v;
    },
    62090: function (e, n, t) {
      e.exports = t.p + 'static/richText.ea0d0d5c.png';
    },
  },
]);
