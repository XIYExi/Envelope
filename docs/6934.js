(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [6934],
  {
    6934: function (e, t, n) {
      'use strict';
      n.r(t);
      n(63185);
      var a = n(9676),
        l = (n(12968), n(6122)),
        c = n(57337),
        r = n(93224),
        u = n(12924),
        s = n.n(u),
        o = n(47144),
        d = n.n(o),
        i = ['isTpl'],
        h = (e) => {
          var t = e.isTpl,
            n = (0, r.Z)(e, i),
            o = n.text,
            h = n.autoFocus,
            p = n.defaultChecked,
            v = n.disabled,
            k = (0, u.useState)(p),
            m = (0, c.Z)(k, 2),
            C = m[0],
            f = m[1],
            g = (t) => {
              var n = t.target.checked;
              f(n), e.onChange && e.onChange(n);
            };
          return s().createElement(
            s().Fragment,
            null,
            t &&
              s().createElement(
                'div',
                null,
                s().createElement(l.Z, { src: d(), preview: !1, alt: '' }),
              ),
            !t &&
              s().createElement(
                'div',
                null,
                s().createElement(
                  a.Z,
                  {
                    autoFocus: h,
                    checked: C,
                    disabled: v,
                    onChange: (e) => g(e),
                  },
                  o,
                ),
              ),
          );
        };
      t['default'] = (0, u.memo)(h);
    },
    47144: function (e, t, n) {
      e.exports = n.p + 'static/CheckBox.68c6da25.svg';
    },
  },
]);
