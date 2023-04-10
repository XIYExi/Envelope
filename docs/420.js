(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [420],
  {
    70420: function (e, t, l) {
      'use strict';
      l.r(t);
      var n = l(57337),
        a = l(93224),
        i = l(12924),
        r = l.n(i),
        c = l(27981),
        o = l.n(c),
        u = l(35957),
        d = l(49282),
        m = ['isTpl'],
        s = (e) => {
          var t = e.isTpl,
            l = (0, a.Z)(e, m),
            c = l.header,
            s = l.text,
            p = l.basic,
            g = l.compact,
            v = l.deburr,
            h = l.defaultOpen,
            f = l.direction,
            k = l.disabled,
            E = l.error,
            b = l.floating,
            Z = l.fluid,
            C = l.inline,
            x = l.item,
            y = l.icon,
            I = l.labeled,
            w = l.lazyLoad,
            S = l.selection,
            z = l.dataSource,
            D = (e) => {
              var t = e.key,
                l = e.text,
                n = e.value,
                a = e.flag,
                i = e.icon,
                c = e.image,
                o = e.description;
              return 0 === a.length && 0 === i.length && 0 === c.length
                ? r().createElement(u.Z.Item, {
                    key: t,
                    text: l,
                    value: n,
                    description: o,
                    onClick: (e, t) => H(e, t),
                  })
                : 0 !== a.length && 0 === c.length
                ? r().createElement(u.Z.Item, {
                    key: t,
                    text: l,
                    value: n,
                    flag: a,
                    description: o,
                    onClick: (e, t) => H(e, t),
                  })
                : 0 === a.length && 0 !== c.length
                ? r().createElement(u.Z.Item, {
                    key: t,
                    text: l,
                    value: n,
                    image: c,
                    description: o,
                    onClick: (e, t) => H(e, t),
                  })
                : r().createElement(u.Z.Item, {
                    key: t,
                    text: l,
                    value: n,
                    icon: i,
                    description: o,
                    onClick: (e, t) => H(e, t),
                  });
            },
            F = (0, i.useState)(),
            L = (0, n.Z)(F, 2),
            O = L[0],
            T = L[1],
            H = (t, l) => {
              var n = l.value;
              T(n), e.onChange && e.onChange(n);
            };
          return r().createElement(
            r().Fragment,
            null,
            t && r().createElement(d.Z, { src: o(), alt: 'Dropdown' }),
            !t &&
              r().createElement(
                'div',
                null,
                r().createElement(
                  u.Z,
                  {
                    value: O,
                    placeholder: O || s,
                    basic: p,
                    selection: S,
                    compact: g,
                    deburr: v,
                    defaultOpen: h,
                    direction: f,
                    disabled: k,
                    error: E,
                    floating: b,
                    fluid: Z,
                    inline: C,
                    item: x,
                    labeled: I,
                    lazyLoad: w,
                    multiple: !1,
                  },
                  r().createElement(
                    u.Z.Menu,
                    null,
                    0 !== c.length &&
                      r().createElement(
                        r().Fragment,
                        null,
                        r().createElement(u.Z.Header, { icon: y, content: c }),
                        r().createElement(u.Z.Divider, null),
                      ),
                    z.map((e, t) => D(e)),
                  ),
                ),
              ),
          );
        };
      t['default'] = s;
    },
    27981: function (e, t, l) {
      e.exports = l.p + 'static/Select.e16b64ec.svg';
    },
  },
]);
