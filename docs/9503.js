(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9503, 3610],
  {
    25038: function (e, t, a) {
      'use strict';
      a.r(t);
      var l = a(91896),
        n = a(12924),
        c = a.n(n),
        u = a(73610),
        s = { autoFocus: !1, defaultChecked: !1, disabled: !1, loading: !1 };
      t['default'] = () =>
        c().createElement(u.default, (0, l.Z)({ isTpl: !1 }, s));
    },
    73610: function (e, t, a) {
      'use strict';
      a.r(t);
      a(77576);
      var l = a(12028),
        n = (a(12968), a(6122)),
        c = a(57337),
        u = a(93224),
        s = a(12924),
        d = a.n(s),
        i = a(43841),
        o = a.n(i),
        r = ['isTpl'],
        f = (e) => {
          var t = e.isTpl,
            a = (0, u.Z)(e, r),
            i = a.autoFocus,
            f = a.defaultChecked,
            p = a.disabled,
            h = a.loading,
            m = (0, s.useState)(f),
            v = (0, c.Z)(m, 2),
            g = v[0],
            k = v[1],
            C = (0, s.useCallback)((t) => {
              k(t), e.onChange && e.onChange(t);
            }, []);
          return d().createElement(
            d().Fragment,
            null,
            t &&
              d().createElement(
                'div',
                null,
                d().createElement(n.Z, { preview: !1, src: o(), alt: '' }),
              ),
            !t &&
              d().createElement(
                'div',
                null,
                d().createElement(l.Z, {
                  autoFocus: i,
                  disabled: p,
                  loading: h,
                  checked: g,
                  onChange: C,
                }),
              ),
          );
        };
      t['default'] = (0, s.memo)(f);
    },
    43841: function (e, t, a) {
      e.exports = a.p + 'static/Switch.acf3b36d.svg';
    },
  },
]);
