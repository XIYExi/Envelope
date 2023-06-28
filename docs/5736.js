(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [5736, 1822],
  {
    26934: function (e, t, a) {
      'use strict';
      a.r(t);
      var l = a(91896),
        n = a(12924),
        u = a.n(n),
        o = a(21822),
        s = {
          type: 'default',
          buttonStyle: 'outline',
          disabled: !1,
          options: 'a-b-c-d-e',
          autoFocus: !1,
        };
      t['default'] = () =>
        u().createElement(o.default, (0, l.Z)({ isTpl: !1 }, s));
    },
    21822: function (e, t, a) {
      'use strict';
      a.r(t);
      a(88983);
      var l = a(55742),
        n = (a(12968), a(6122)),
        u = a(2824),
        o = a(93224),
        s = a(12924),
        r = a.n(s),
        c = a(18698),
        i = a.n(c),
        p = ['isTpl'],
        v = (e) => {
          var t = e.isTpl,
            a = (0, o.Z)(e, p),
            c = a.type,
            v = a.buttonStyle,
            d = a.disabled,
            f = a.options,
            m = a.autoFocus,
            b = (0, s.useState)([]),
            E = (0, u.Z)(b, 2),
            Z = E[0],
            y = E[1],
            g = (0, s.useState)(0),
            h = (0, u.Z)(g, 2),
            k = h[0],
            C = h[1];
          (0, s.useEffect)(() => {
            var e = f.split('-');
            y(e);
          }, [f]);
          var F = (t) => {
            var a = t.target.value;
            C(a), e.onChange && e.onChange(a);
          };
          return r().createElement(
            r().Fragment,
            null,
            t &&
              r().createElement(
                'div',
                null,
                r().createElement(n.Z, { preview: !1, src: i(), alt: '' }),
              ),
            !t &&
              r().createElement(
                'div',
                null,
                r().createElement(
                  l.ZP.Group,
                  {
                    buttonStyle: v,
                    disabled: d,
                    onChange: (e) => F(e),
                    value: k,
                  },
                  'default' === c
                    ? Z.map((e, t) =>
                        r().createElement(
                          l.ZP,
                          { value: t, key: t, autoFocus: m },
                          e,
                        ),
                      )
                    : Z.map((e, t) =>
                        r().createElement(
                          l.ZP.Button,
                          { value: t, key: t, autoFocus: m },
                          e,
                        ),
                      ),
                ),
              ),
          );
        };
      t['default'] = (0, s.memo)(v);
    },
    18698: function (e, t, a) {
      e.exports = a.p + 'static/Radio.9f92eb3a.svg';
    },
  },
]);
