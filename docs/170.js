(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [170],
  {
    68179: function () {},
    10170: function (e, t, n) {
      'use strict';
      n.r(t);
      n(48736);
      var a = n(27049),
        r = (n(12968), n(6122)),
        i = n(93224),
        l = n(12924),
        o = n.n(l),
        c = n(16907),
        s = n.n(c),
        p = ['isTpl'],
        d = (e) => {
          var t = e.isTpl,
            n = (0, i.Z)(e, p),
            l = n.orientation,
            c = n.title,
            d = n.dashed,
            u = n.plain;
          return o().createElement(
            o().Fragment,
            null,
            t &&
              o().createElement(
                'div',
                null,
                o().createElement(r.Z, { preview: !1, src: s(), alt: '' }),
              ),
            !t &&
              0 === c.length &&
              o().createElement(
                'div',
                null,
                o().createElement(a.Z, { plain: u, orientation: l, dashed: d }),
              ),
            !t &&
              c.length > 0 &&
              o().createElement(
                'div',
                null,
                o().createElement(
                  a.Z,
                  { plain: u, orientation: l, dashed: d },
                  c,
                ),
              ),
          );
        };
      t['default'] = (0, l.memo)(d);
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
        o = n(12924),
        c = n(53124),
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
        p = function (e) {
          var t,
            n = o.useContext(c.E_),
            i = n.getPrefixCls,
            p = n.direction,
            d = e.prefixCls,
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
            b = i('divider', d),
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
              (0, r.Z)(t, ''.concat(b, '-rtl'), 'rtl' === p),
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
          return o.createElement(
            'div',
            (0, a.Z)({ className: k }, x, { role: 'separator' }),
            Z &&
              'vertical' !== f &&
              o.createElement(
                'span',
                { className: ''.concat(b, '-inner-text'), style: N },
                Z,
              ),
          );
        };
      t['Z'] = p;
    },
    48736: function (e, t, n) {
      'use strict';
      n(38663), n(68179);
    },
  },
]);
