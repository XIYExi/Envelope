(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7852, 420],
  {
    87852: function (e, t, l) {
      'use strict';
      l.r(t);
      var i = l(91896),
        n = l(12924),
        a = l.n(n),
        c = l(70420),
        o = {
          header: 'Select Header',
          icon: 'home',
          text: 'Select',
          basic: !0,
          selection: !0,
          compact: !1,
          deburr: !1,
          defaultOpen: !1,
          direction: 'right',
          disabled: !1,
          error: !1,
          floating: !1,
          fluid: !0,
          inline: !0,
          item: !0,
          labeled: !0,
          lazyLoad: !0,
          dataSource: [
            {
              id: '1',
              key: 'Jenny Hess',
              text: 'Jenny Hess',
              value: 'Jenny Hess',
              flag: '',
              icon: '',
              image: '',
              description: 'ctrl + o',
            },
            {
              id: '2',
              key: 'Elliot Fu',
              text: 'Elliot Fu',
              value: 'Elliot Fu',
              flag: 'cn',
              icon: 'home',
              image: '',
              description: 'ctrl + c',
            },
            {
              id: '3',
              key: 'Stevie Feliciano',
              text: 'Stevie Feliciano',
              value: 'Stevie Feliciano',
              flag: '',
              icon: 'home',
              image: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              description: 'ctrl + c',
            },
            {
              id: '4',
              key: 'Matt',
              text: 'Matt',
              value: 'Matt',
              flag: '',
              icon: 'dropdown',
              image: '',
              description: '',
            },
            {
              id: '5',
              key: 'Justen Kitsune',
              text: 'Justen Kitsune',
              value: 'Justen Kitsune',
              flag: 'af',
              icon: '',
              image: '',
              description: 'Hello',
            },
            {
              id: '6',
              key: 'Xiye',
              text: 'Xiye',
              value: 'Xiye',
              flag: '',
              icon: '',
              image: '',
              description: 'Hello',
            },
            {
              id: '7',
              key: 'Cayon',
              text: 'Cayon',
              value: 'Cayon',
              flag: '',
              icon: 'home',
              image: '',
              description: '',
            },
          ],
        };
      t['default'] = () =>
        a().createElement(c.default, (0, i.Z)({ isTpl: !1 }, o));
    },
    70420: function (e, t, l) {
      'use strict';
      l.r(t);
      var i = l(57337),
        n = l(93224),
        a = l(12924),
        c = l.n(a),
        o = l(27981),
        r = l.n(o),
        d = l(35957),
        u = l(49282),
        s = ['isTpl'],
        m = (e) => {
          var t = e.isTpl,
            l = (0, n.Z)(e, s),
            o = l.header,
            m = l.text,
            p = l.basic,
            g = l.compact,
            f = l.deburr,
            v = l.defaultOpen,
            y = l.direction,
            h = l.disabled,
            k = l.error,
            x = l.floating,
            b = l.fluid,
            E = l.inline,
            Z = l.item,
            C = l.icon,
            S = l.labeled,
            F = l.lazyLoad,
            H = l.selection,
            J = l.dataSource,
            w = (e) => {
              var t = e.key,
                l = e.text,
                i = e.value,
                n = e.flag,
                a = e.icon,
                o = e.image,
                r = e.description;
              return 0 === n.length && 0 === a.length && 0 === o.length
                ? c().createElement(d.Z.Item, {
                    key: t,
                    text: l,
                    value: i,
                    description: r,
                    onClick: (e, t) => L(e, t),
                  })
                : 0 !== n.length && 0 === o.length
                ? c().createElement(d.Z.Item, {
                    key: t,
                    text: l,
                    value: i,
                    flag: n,
                    description: r,
                    onClick: (e, t) => L(e, t),
                  })
                : 0 === n.length && 0 !== o.length
                ? c().createElement(d.Z.Item, {
                    key: t,
                    text: l,
                    value: i,
                    image: o,
                    description: r,
                    onClick: (e, t) => L(e, t),
                  })
                : c().createElement(d.Z.Item, {
                    key: t,
                    text: l,
                    value: i,
                    icon: a,
                    description: r,
                    onClick: (e, t) => L(e, t),
                  });
            },
            I = (0, a.useState)(),
            M = (0, i.Z)(I, 2),
            z = M[0],
            K = M[1],
            L = (t, l) => {
              var i = l.value;
              K(i), e.onChange && e.onChange(i);
            };
          return c().createElement(
            c().Fragment,
            null,
            t && c().createElement(u.Z, { src: r(), alt: 'Dropdown' }),
            !t &&
              c().createElement(
                'div',
                null,
                c().createElement(
                  d.Z,
                  {
                    value: z,
                    placeholder: z || m,
                    basic: p,
                    selection: H,
                    compact: g,
                    deburr: f,
                    defaultOpen: v,
                    direction: y,
                    disabled: h,
                    error: k,
                    floating: x,
                    fluid: b,
                    inline: E,
                    item: Z,
                    labeled: S,
                    lazyLoad: F,
                    multiple: !1,
                  },
                  c().createElement(
                    d.Z.Menu,
                    null,
                    0 !== o.length &&
                      c().createElement(
                        c().Fragment,
                        null,
                        c().createElement(d.Z.Header, { icon: C, content: o }),
                        c().createElement(d.Z.Divider, null),
                      ),
                    J.map((e, t) => w(e)),
                  ),
                ),
              ),
          );
        };
      t['default'] = m;
    },
    27981: function (e, t, l) {
      e.exports = l.p + 'static/Select.e16b64ec.svg';
    },
  },
]);
