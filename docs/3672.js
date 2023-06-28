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
        d = n(71706),
        p = ['isTpl'],
        u = (e) => {
          var t = e.isTpl,
            n = (0, o.Z)(e, p),
            c = n.text,
            i = n.block,
            u = n.danger,
            g = n.disabled,
            h = n.ghost,
            k = (n.href, n.iconLocation),
            m = n.icon,
            b = n.loading,
            f = n.shape;
          return r().createElement(
            r().Fragment,
            null,
            t &&
              r().createElement(a.Z, {
                preview: !1,
                src: s(),
                alt: 'Antd Button',
              }),
            !t &&
              r().createElement(
                l.Z,
                {
                  id: 'antd button',
                  block: i,
                  ghost: h,
                  danger: u,
                  disabled: g,
                  loading: b,
                  shape: f,
                  onClick: e.onClick,
                },
                m.length > 0 && 'left' === k && r().createElement(d[m]),
                c,
                m.length > 0 && 'right' === k && r().createElement(d[m]),
              ),
          );
        };
      t['default'] = (0, c.memo)(u);
    },
    21843: function (e, t, n) {
      e.exports = n.p + 'static/Button.299612d5.svg';
    },
  },
]);
