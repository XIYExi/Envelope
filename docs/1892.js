(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1892, 4036],
  {
    63: function (e, t, a) {
      'use strict';
      a.r(t);
      var r = a(91896),
        l = a(12924),
        i = a.n(l),
        n = a(2925),
        u = {
          title: 'Feedback',
          valueType: 'number',
          value: '99999.9',
          decimalSeparator: '.',
          groupSeparator: ',',
          loading: !1,
          precision: 4,
          prefix: 'LikeOutlined',
        };
      t['default'] = () =>
        i().createElement(n.default, (0, r.Z)({ isTpl: !1 }, u));
    },
    2925: function (e, t, a) {
      'use strict';
      a.r(t);
      a(95300);
      var r = a(7277),
        l = (a(12968), a(6122)),
        i = a(57337),
        n = a(93224),
        u = a(12924),
        p = a.n(u),
        c = a(40539),
        o = a.n(c),
        s = a(86023),
        m = ['isTpl'],
        v = (e) => {
          var t = e.isTpl,
            a = (0, n.Z)(e, m),
            c = a.title,
            v = a.valueType,
            d = a.value,
            f = a.decimalSeparator,
            g = a.groupSeparator,
            E = a.loading,
            S = a.precision,
            b = a.prefix,
            k = (0, u.useState)(),
            T = (0, i.Z)(k, 2),
            Z = T[0],
            x = T[1];
          return (
            (0, u.useEffect)(() => {
              x('number' === v ? Number(d) : d);
            }, [d, v]),
            p().createElement(
              p().Fragment,
              null,
              t &&
                p().createElement(
                  'div',
                  null,
                  p().createElement(l.Z, { preview: !1, src: o(), alt: '' }),
                ),
              !t &&
                p().createElement(
                  'div',
                  null,
                  p().createElement(r.Z, {
                    title: c,
                    value: Z,
                    decimalSeparator: f,
                    groupSeparator: g,
                    loading: E,
                    precision: S,
                    prefix: p().createElement(s[b]),
                  }),
                ),
            )
          );
        };
      t['default'] = (0, u.memo)(v);
    },
    40539: function (e, t, a) {
      e.exports = a.p + 'static/Statistic.b5719031.svg';
    },
  },
]);
