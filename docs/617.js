(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [617, 6934],
  {
    80617: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(91896),
        l = n(12924),
        c = n.n(l),
        r = n(6934),
        u = {
          text: 'Button',
          block: !1,
          danger: !1,
          disabled: !1,
          ghost: !1,
          href: 'xxxx',
          icon: 'SearchOutlined',
          iconLocation: 'left',
          loading: !1,
          shape: 'default',
        };
      t['default'] = () =>
        c().createElement(r.default, (0, a.Z)({ isTpl: !1 }, u));
    },
    6934: function (e, t, n) {
      'use strict';
      n.r(t);
      n(63185);
      var a = n(9676),
        l = (n(12968), n(6122)),
        c = n(57337),
        r = n(93224),
        u = n(12924),
        o = n.n(u),
        s = n(47144),
        d = n.n(s),
        i = ['isTpl'],
        h = (e) => {
          var t = e.isTpl,
            n = (0, r.Z)(e, i),
            s = n.text,
            h = n.autoFocus,
            f = n.defaultChecked,
            p = n.disabled,
            v = (0, u.useState)(f),
            g = (0, c.Z)(v, 2),
            k = g[0],
            m = g[1],
            x = (t) => {
              var n = t.target.checked;
              m(n), e.onChange && e.onChange(n);
            };
          return o().createElement(
            o().Fragment,
            null,
            t &&
              o().createElement(
                'div',
                null,
                o().createElement(l.Z, { src: d(), preview: !1, alt: '' }),
              ),
            !t &&
              o().createElement(
                'div',
                null,
                o().createElement(
                  a.Z,
                  {
                    autoFocus: h,
                    checked: k,
                    disabled: p,
                    onChange: (e) => x(e),
                  },
                  s,
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
