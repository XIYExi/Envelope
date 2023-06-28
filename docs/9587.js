(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9587, 3672],
  {
    49587: function (e, t, n) {
      'use strict';
      n.r(t);
      var l = n(91896),
        a = n(12924),
        o = n.n(a),
        c = n(13672),
        i = {
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
        o().createElement(c.default, (0, l.Z)({ isTpl: !1 }, i));
    },
    13672: function (e, t, n) {
      'use strict';
      n.r(t);
      n(57663);
      var l = n(71577),
        a = (n(12968), n(6122)),
        o = n(93224),
        c = n(12924),
        i = n.n(c),
        r = n(21843),
        s = n.n(r),
        d = n(71706),
        u = ['isTpl'],
        h = (e) => {
          var t = e.isTpl,
            n = (0, o.Z)(e, u),
            c = n.text,
            r = n.block,
            h = n.danger,
            g = n.disabled,
            p = n.ghost,
            f = (n.href, n.iconLocation),
            b = n.icon,
            k = n.loading,
            m = n.shape;
          return i().createElement(
            i().Fragment,
            null,
            t &&
              i().createElement(a.Z, {
                preview: !1,
                src: s(),
                alt: 'Antd Button',
              }),
            !t &&
              i().createElement(
                l.Z,
                {
                  id: 'antd button',
                  block: r,
                  ghost: p,
                  danger: h,
                  disabled: g,
                  loading: k,
                  shape: m,
                  onClick: e.onClick,
                },
                b.length > 0 && 'left' === f && i().createElement(d[b]),
                c,
                b.length > 0 && 'right' === f && i().createElement(d[b]),
              ),
          );
        };
      t['default'] = (0, c.memo)(h);
    },
    21843: function (e, t, n) {
      e.exports = n.p + 'static/Button.299612d5.svg';
    },
  },
]);
