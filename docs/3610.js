(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3610],
  {
    73610: function (e, n, a) {
      'use strict';
      a.r(n);
      a(77576);
      var t = a(12028),
        l = (a(12968), a(6122)),
        c = a(57337),
        u = a(93224),
        s = a(12924),
        o = a.n(s),
        r = a(43841),
        i = a.n(r),
        d = ['isTpl'],
        p = (e) => {
          var n = e.isTpl,
            a = (0, u.Z)(e, d),
            r = a.autoFocus,
            p = a.defaultChecked,
            h = a.disabled,
            m = a.loading,
            v = (0, s.useState)(p),
            f = (0, c.Z)(v, 2),
            g = f[0],
            k = f[1],
            C = (0, s.useCallback)((n) => {
              k(n), e.onChange && e.onChange(n);
            }, []);
          return o().createElement(
            o().Fragment,
            null,
            n &&
              o().createElement(
                'div',
                null,
                o().createElement(l.Z, { preview: !1, src: i(), alt: '' }),
              ),
            !n &&
              o().createElement(
                'div',
                null,
                o().createElement(t.Z, {
                  autoFocus: r,
                  disabled: h,
                  loading: m,
                  checked: g,
                  onChange: C,
                }),
              ),
          );
        };
      n['default'] = (0, s.memo)(p);
    },
    43841: function (e, n, a) {
      e.exports = a.p + 'static/Switch.acf3b36d.svg';
    },
  },
]);
