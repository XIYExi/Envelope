(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3672],
  {
    13672: function (e, t, n) {
      'use strict';
      n.r(t);
      n(57663);
      var l = n(71577),
        a = (n(12968), n(6122)),
        o = n(93224),
        c = n(12924),
        r = n.n(c),
        i = n(21843),
        s = n.n(i),
        d = n(86023),
        u = ['isTpl'],
        p = (e) => {
          var t = e.isTpl,
            n = (0, o.Z)(e, u),
            c = n.text,
            i = n.block,
            p = n.danger,
            g = n.disabled,
            h = n.ghost,
            m = (n.href, n.iconLocation),
            k = n.icon,
            b = n.loading,
            f = n.shape;
          return r().createElement(
            r().Fragment,
            null,
            t &&
              r().createElement(
                'div',
                null,
                r().createElement(a.Z, {
                  preview: !1,
                  src: s(),
                  alt: 'Antd Button',
                }),
              ),
            !t &&
              r().createElement(
                l.Z,
                {
                  id: 'antd button',
                  block: i,
                  ghost: h,
                  danger: p,
                  disabled: g,
                  loading: b,
                  shape: f,
                  onClick: e.onClick,
                },
                k.length > 0 && 'left' === m && r().createElement(d[k]),
                c,
                k.length > 0 && 'right' === m && r().createElement(d[k]),
              ),
          );
        };
      t['default'] = (0, c.memo)(p);
    },
    21843: function (e, t, n) {
      e.exports = n.p + 'static/Button.299612d5.svg';
    },
  },
]);
