(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1822],
  {
    21822: function (e, t, a) {
      'use strict';
      a.r(t);
      a(88983);
      var n = a(55742),
        l = (a(12968), a(6122)),
        u = a(2824),
        o = a(93224),
        r = a(12924),
        s = a.n(r),
        c = a(18698),
        p = a.n(c),
        v = ['isTpl'],
        i = (e) => {
          var t = e.isTpl,
            a = (0, o.Z)(e, v),
            c = a.type,
            i = a.buttonStyle,
            m = a.disabled,
            d = a.options,
            f = a.autoFocus,
            E = (0, r.useState)([]),
            b = (0, u.Z)(E, 2),
            Z = b[0],
            g = b[1],
            h = (0, r.useState)(0),
            k = (0, u.Z)(h, 2),
            y = k[0],
            C = k[1];
          (0, r.useEffect)(() => {
            var e = d.split('-');
            g(e);
          }, [d]);
          var F = (t) => {
            var a = t.target.value;
            C(a), e.onChange && e.onChange(a);
          };
          return s().createElement(
            s().Fragment,
            null,
            t &&
              s().createElement(
                'div',
                null,
                s().createElement(l.Z, { preview: !1, src: p(), alt: '' }),
              ),
            !t &&
              s().createElement(
                'div',
                null,
                s().createElement(
                  n.ZP.Group,
                  {
                    buttonStyle: i,
                    disabled: m,
                    onChange: (e) => F(e),
                    value: y,
                  },
                  'default' === c
                    ? Z.map((e, t) =>
                        s().createElement(
                          n.ZP,
                          { value: t, key: t, autoFocus: f },
                          e,
                        ),
                      )
                    : Z.map((e, t) =>
                        s().createElement(
                          n.ZP.Button,
                          { value: t, key: t, autoFocus: f },
                          e,
                        ),
                      ),
                ),
              ),
          );
        };
      t['default'] = (0, r.memo)(i);
    },
    18698: function (e, t, a) {
      e.exports = a.p + 'static/Radio.9f92eb3a.svg';
    },
  },
]);
