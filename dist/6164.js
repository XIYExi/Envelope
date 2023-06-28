(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [6164, 170],
  {
    68179: function () {},
    66164: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(91896),
        r = n(12924),
        i = n.n(r),
        l = n(10170),
        c = {
          title: '\u5d4c\u5957\u7684\u6807\u9898',
          dashed: !1,
          orientation: 'center',
          plain: !1,
        };
      t['default'] = () =>
        i().createElement(l.default, (0, a.Z)({ isTpl: !1 }, c));
    },
    10170: function (e, t, n) {
      'use strict';
      n.r(t);
      n(48736);
      var a = n(27049),
        r = (n(12968), n(6122)),
        i = n(93224),
        l = n(12924),
        c = n.n(l),
        o = n(16907),
        s = n.n(o),
        d = ['isTpl'],
        p = (e) => {
          var t = e.isTpl,
            n = (0, i.Z)(e, d),
            l = n.orientation,
            o = n.title,
            p = n.dashed,
            u = n.plain;
          return c().createElement(
            c().Fragment,
            null,
            t &&
              c().createElement(
                'div',
                null,
                c().createElement(r.Z, { preview: !1, src: s(), alt: '' }),
              ),
            !t &&
              0 === o.length &&
              c().createElement(
                'div',
                null,
                c().createElement(a.Z, { plain: u, orientation: l, dashed: p }),
              ),
            !t &&
              o.length > 0 &&
              c().createElement(
                'div',
                null,
                c().createElement(
                  a.Z,
                  { plain: u, orientation: l, dashed: p },
                  o,
                ),
              ),
          );
        };
      t['default'] = (0, l.memo)(p);
    },
    16907: function (e, t, n) {
      e.exports = n.p + 'static/Divider.9a2cd922.svg';
    },
    27049: function (e, t, n) {
      'use strict';
      var a = n(22122),
        r = n(96156),
        i = n(94184),
        l = n.n(i),
        c = n(12924),
        o = n(53124),
        s = function (e, t) {
          var n = {};
          for (var a in e)
            Object.prototype.hasOwnProperty.call(e, a) &&
              t.indexOf(a) < 0 &&
              (n[a] = e[a]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (a = Object.getOwnPropertySymbols(e); r < a.length; r++)
              t.indexOf(a[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, a[r]) &&
                (n[a[r]] = e[a[r]]);
          }
          return n;
        },
        d = function (e) {
          var t,
            n = c.useContext(o.E_),
            i = n.getPrefixCls,
            d = n.direction,
            p = e.prefixCls,
            u = e.type,
            f = void 0 === u ? 'horizontal' : u,
            m = e.orientation,
            h = void 0 === m ? 'center' : m,
            v = e.orientationMargin,
            g = e.className,
            Z = e.children,
            y = e.dashed,
            E = e.plain,
            x = s(e, [
              'prefixCls',
              'type',
              'orientation',
              'orientationMargin',
              'className',
              'children',
              'dashed',
              'plain',
            ]),
            b = i('divider', p),
            O = h.length > 0 ? '-'.concat(h) : h,
            w = !!Z,
            C = 'left' === h && null != v,
            j = 'right' === h && null != v,
            k = l()(
              b,
              ''.concat(b, '-').concat(f),
              ((t = {}),
              (0, r.Z)(t, ''.concat(b, '-with-text'), w),
              (0, r.Z)(t, ''.concat(b, '-with-text').concat(O), w),
              (0, r.Z)(t, ''.concat(b, '-dashed'), !!y),
              (0, r.Z)(t, ''.concat(b, '-plain'), !!E),
              (0, r.Z)(t, ''.concat(b, '-rtl'), 'rtl' === d),
              (0, r.Z)(
                t,
                ''.concat(b, '-no-default-orientation-margin-left'),
                C,
              ),
              (0, r.Z)(
                t,
                ''.concat(b, '-no-default-orientation-margin-right'),
                j,
              ),
              t),
              g,
            ),
            N = (0, a.Z)(
              (0, a.Z)({}, C && { marginLeft: v }),
              j && { marginRight: v },
            );
          return c.createElement(
            'div',
            (0, a.Z)({ className: k }, x, { role: 'separator' }),
            Z &&
              'vertical' !== f &&
              c.createElement(
                'span',
                { className: ''.concat(b, '-inner-text'), style: N },
                Z,
              ),
          );
        };
      t['Z'] = d;
    },
    48736: function (e, t, n) {
      'use strict';
      n(38663), n(68179);
    },
  },
]);
