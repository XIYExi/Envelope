(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9882, 3058],
  {
    89882: function (e, l, t) {
      'use strict';
      t.r(l);
      var n = t(91896),
        a = t(12924),
        r = t.n(a),
        c = t(53058),
        s = { rows: '3', placeholder: 'Tell use more.' };
      l['default'] = () =>
        r().createElement(c.default, (0, n.Z)({ isTpl: !1 }, s));
    },
    53058: function (e, l, t) {
      'use strict';
      t.r(l);
      var n = t(57337),
        a = t(93224),
        r = t(12924),
        c = t.n(r),
        s = t(62090),
        u = t.n(s),
        o = t(49282),
        p = t(31223),
        i = t(416),
        h = ['isTpl'],
        d = (e) => {
          var l = e.isTpl,
            t = (0, a.Z)(e, h),
            s = t.placeholder,
            d = t.rows,
            f = (0, r.useState)(s),
            m = (0, n.Z)(f, 2),
            v = m[0],
            E = m[1],
            T = (l, t) => {
              var n = t;
              E(n), e.onChange && e.onChange(n);
            };
          return c().createElement(
            c().Fragment,
            null,
            l && c().createElement(o.Z, { src: u(), alt: 'TextArea' }),
            !l &&
              c().createElement(
                'div',
                null,
                c().createElement(
                  p.Z,
                  null,
                  c().createElement(i.Z, {
                    rows: d,
                    placeholder: s,
                    value: v,
                    onChange: (e, l) => T(e, l),
                  }),
                ),
              ),
          );
        };
      l['default'] = d;
    },
    62090: function (e, l, t) {
      e.exports = t.p + 'static/richText.ea0d0d5c.png';
    },
  },
]);
