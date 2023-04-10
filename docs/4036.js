(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [4036],
  {
    2925: function (e, t, r) {
      'use strict';
      r.r(t);
      r(95300);
      var a = r(7277),
        l = (r(12968), r(6122)),
        n = r(57337),
        i = r(93224),
        p = r(12924),
        u = r.n(p),
        c = r(40539),
        o = r.n(c),
        s = r(86023),
        m = ['isTpl'],
        v = (e) => {
          var t = e.isTpl,
            r = (0, i.Z)(e, m),
            c = r.title,
            v = r.valueType,
            f = r.value,
            d = r.decimalSeparator,
            E = r.groupSeparator,
            g = r.loading,
            S = r.precision,
            b = r.prefix,
            k = (0, p.useState)(),
            Z = (0, n.Z)(k, 2),
            h = Z[0],
            w = Z[1];
          return (
            (0, p.useEffect)(() => {
              w('number' === v ? Number(f) : f);
            }, [f, v]),
            u().createElement(
              u().Fragment,
              null,
              t &&
                u().createElement(
                  'div',
                  null,
                  u().createElement(l.Z, { preview: !1, src: o(), alt: '' }),
                ),
              !t &&
                u().createElement(
                  'div',
                  null,
                  u().createElement(a.Z, {
                    title: c,
                    value: h,
                    decimalSeparator: d,
                    groupSeparator: E,
                    loading: g,
                    precision: S,
                    prefix: u().createElement(s[b]),
                  }),
                ),
            )
          );
        };
      t['default'] = (0, p.memo)(v);
    },
    40539: function (e, t, r) {
      e.exports = r.p + 'static/Statistic.b5719031.svg';
    },
  },
]);
