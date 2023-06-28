(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [5218, 862],
  {
    52683: function () {},
    64139: function () {},
    5218: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(91896),
        r = n(12924),
        c = n.n(r),
        l = n(40862),
        o = {
          actions: 'LikeFilled-DislikeFilled',
          author: 'xiye',
          avatar: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
          content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure).',
          datetime: '8 hours ago',
        };
      t['default'] = () =>
        c().createElement(l.default, (0, a.Z)({ isTpl: !1 }, o));
    },
    40862: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return b;
          },
        });
      n(38663), n(64139);
      var a = n(22122),
        r = n(96156),
        c = n(94184),
        l = n.n(c),
        o = n(12924),
        s = n.n(o),
        i = n(53124),
        u = function (e, t) {
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
        m = function (e) {
          var t = e.actions,
            n = e.author,
            c = e.avatar,
            s = e.children,
            m = e.className,
            f = e.content,
            p = e.prefixCls,
            d = e.datetime,
            v = u(e, [
              'actions',
              'author',
              'avatar',
              'children',
              'className',
              'content',
              'prefixCls',
              'datetime',
            ]),
            g = o.useContext(i.E_),
            E = g.getPrefixCls,
            h = g.direction,
            y = function (e, t) {
              return o.createElement(
                'div',
                { className: l()(''.concat(e, '-nested')) },
                t,
              );
            },
            x = E('comment', p),
            Z = c
              ? o.createElement(
                  'div',
                  { className: ''.concat(x, '-avatar') },
                  'string' === typeof c
                    ? o.createElement('img', { src: c, alt: 'comment-avatar' })
                    : c,
                )
              : null,
            b =
              t && t.length
                ? o.createElement(
                    'ul',
                    { className: ''.concat(x, '-actions') },
                    t.map(function (e, t) {
                      return o.createElement(
                        'li',
                        { key: 'action-'.concat(t) },
                        e,
                      );
                    }),
                  )
                : null,
            O =
              (n || d) &&
              o.createElement(
                'div',
                { className: ''.concat(x, '-content-author') },
                n &&
                  o.createElement(
                    'span',
                    { className: ''.concat(x, '-content-author-name') },
                    n,
                  ),
                d &&
                  o.createElement(
                    'span',
                    { className: ''.concat(x, '-content-author-time') },
                    d,
                  ),
              ),
            C = o.createElement(
              'div',
              { className: ''.concat(x, '-content') },
              O,
              o.createElement(
                'div',
                { className: ''.concat(x, '-content-detail') },
                f,
              ),
              b,
            ),
            N = l()(x, (0, r.Z)({}, ''.concat(x, '-rtl'), 'rtl' === h), m);
          return o.createElement(
            'div',
            (0, a.Z)({}, v, { className: N }),
            o.createElement('div', { className: ''.concat(x, '-inner') }, Z, C),
            s ? y(x, s) : null,
          );
        },
        f = m,
        p = (n(94233), n(51890)),
        d = (n(12968), n(6122)),
        v = n(2824),
        g = n(93224),
        E = n(49054),
        h = n.n(E),
        y = n(71706),
        x = ['isTpl'],
        Z = (e) => {
          var t = e.isTpl,
            n = (0, g.Z)(e, x),
            a = n.actions,
            r = n.author,
            c = n.avatar,
            l = n.content,
            i = n.datetime,
            u = (0, o.useState)(),
            m = (0, v.Z)(u, 2),
            E = m[0],
            Z = m[1];
          return (
            (0, o.useEffect)(() => {
              var e = a.split('-'),
                t = [];
              e.map((e) => {
                t.push(s().createElement(y[e]));
              }),
                Z(t);
            }, [a]),
            s().createElement(
              s().Fragment,
              null,
              t &&
                s().createElement(
                  'div',
                  null,
                  s().createElement(d.Z, { preview: !1, src: h(), alt: '' }),
                ),
              !t &&
                s().createElement(
                  'div',
                  null,
                  s().createElement(f, {
                    content: s().createElement('p', null, l),
                    actions: E,
                    author: r,
                    avatar: s().createElement(p.C, { src: c }),
                    datetime: i,
                  }),
                ),
            )
          );
        },
        b = (0, o.memo)(Z);
    },
    49054: function (e, t, n) {
      e.exports = n.p + 'static/Comment.2a143f5c.svg';
    },
    51890: function (e, t, n) {
      'use strict';
      n.d(t, {
        C: function () {
          return P;
        },
      });
      var a = n(22122),
        r = n(96156),
        c = n(90484),
        l = n(28481),
        o = n(94184),
        s = n.n(o),
        i = n(48717),
        u = n(42550),
        m = n(12924),
        f = n(53124),
        p = n(25378),
        d = n(24308),
        v = m.createContext('default'),
        g = function (e) {
          var t = e.children,
            n = e.size;
          return m.createElement(v.Consumer, null, function (e) {
            return m.createElement(v.Provider, { value: n || e }, t);
          });
        },
        E = v,
        h = function (e, t) {
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
        y = function (e, t) {
          var n,
            o,
            v = m.useContext(E),
            g = m.useState(1),
            y = (0, l.Z)(g, 2),
            x = y[0],
            Z = y[1],
            b = m.useState(!1),
            O = (0, l.Z)(b, 2),
            C = O[0],
            N = O[1],
            S = m.useState(!0),
            k = (0, l.Z)(S, 2),
            P = k[0],
            w = k[1],
            j = m.useRef(null),
            z = m.useRef(null),
            T = (0, u.sQ)(t, j),
            H = m.useContext(f.E_),
            R = H.getPrefixCls,
            W = function () {
              if (z.current && j.current) {
                var t = z.current.offsetWidth,
                  n = j.current.offsetWidth;
                if (0 !== t && 0 !== n) {
                  var a = e.gap,
                    r = void 0 === a ? 4 : a;
                  2 * r < n && Z(n - 2 * r < t ? (n - 2 * r) / t : 1);
                }
              }
            };
          m.useEffect(function () {
            N(!0);
          }, []),
            m.useEffect(
              function () {
                w(!0), Z(1);
              },
              [e.src],
            ),
            m.useEffect(
              function () {
                W();
              },
              [e.gap],
            );
          var F,
            _ = function () {
              var t = e.onError,
                n = t ? t() : void 0;
              !1 !== n && w(!1);
            },
            I = e.prefixCls,
            Q = e.shape,
            q = void 0 === Q ? 'circle' : Q,
            A = e.size,
            D = void 0 === A ? 'default' : A,
            G = e.src,
            K = e.srcSet,
            L = e.icon,
            M = e.className,
            V = e.alt,
            X = e.draggable,
            B = e.children,
            J = e.crossOrigin,
            U = h(e, [
              'prefixCls',
              'shape',
              'size',
              'src',
              'srcSet',
              'icon',
              'className',
              'alt',
              'draggable',
              'children',
              'crossOrigin',
            ]),
            Y = 'default' === D ? v : D,
            $ = Object.keys(('object' === (0, c.Z)(Y) && Y) || {}).some(
              function (e) {
                return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(e);
              },
            ),
            ee = (0, p.Z)($),
            te = m.useMemo(
              function () {
                if ('object' !== (0, c.Z)(Y)) return {};
                var e = d.c4.find(function (e) {
                    return ee[e];
                  }),
                  t = Y[e];
                return t
                  ? {
                      width: t,
                      height: t,
                      lineHeight: ''.concat(t, 'px'),
                      fontSize: L ? t / 2 : 18,
                    }
                  : {};
              },
              [ee, Y],
            ),
            ne = R('avatar', I),
            ae = s()(
              ((n = {}),
              (0, r.Z)(n, ''.concat(ne, '-lg'), 'large' === Y),
              (0, r.Z)(n, ''.concat(ne, '-sm'), 'small' === Y),
              n),
            ),
            re = m.isValidElement(G),
            ce = s()(
              ne,
              ae,
              ((o = {}),
              (0, r.Z)(o, ''.concat(ne, '-').concat(q), !!q),
              (0, r.Z)(o, ''.concat(ne, '-image'), re || (G && P)),
              (0, r.Z)(o, ''.concat(ne, '-icon'), !!L),
              o),
              M,
            ),
            le =
              'number' === typeof Y
                ? {
                    width: Y,
                    height: Y,
                    lineHeight: ''.concat(Y, 'px'),
                    fontSize: L ? Y / 2 : 18,
                  }
                : {};
          if ('string' === typeof G && P)
            F = m.createElement('img', {
              src: G,
              draggable: X,
              srcSet: K,
              onError: _,
              alt: V,
              crossOrigin: J,
            });
          else if (re) F = G;
          else if (L) F = L;
          else if (C || 1 !== x) {
            var oe = 'scale('.concat(x, ') translateX(-50%)'),
              se = { msTransform: oe, WebkitTransform: oe, transform: oe },
              ie =
                'number' === typeof Y ? { lineHeight: ''.concat(Y, 'px') } : {};
            F = m.createElement(
              i.Z,
              { onResize: W },
              m.createElement(
                'span',
                {
                  className: ''.concat(ne, '-string'),
                  ref: z,
                  style: (0, a.Z)((0, a.Z)({}, ie), se),
                },
                B,
              ),
            );
          } else
            F = m.createElement(
              'span',
              {
                className: ''.concat(ne, '-string'),
                style: { opacity: 0 },
                ref: z,
              },
              B,
            );
          return (
            delete U.onError,
            delete U.gap,
            m.createElement(
              'span',
              (0, a.Z)({}, U, {
                style: (0, a.Z)((0, a.Z)((0, a.Z)({}, le), te), U.style),
                className: ce,
                ref: T,
              }),
              F,
            )
          );
        },
        x = m.forwardRef(y);
      var Z = x,
        b = n(50344),
        O = n(55241),
        C = n(96159),
        N = function (e) {
          var t = m.useContext(f.E_),
            n = t.getPrefixCls,
            a = t.direction,
            c = e.prefixCls,
            l = e.className,
            o = void 0 === l ? '' : l,
            i = e.maxCount,
            u = e.maxStyle,
            p = e.size,
            d = n('avatar-group', c),
            v = s()(d, (0, r.Z)({}, ''.concat(d, '-rtl'), 'rtl' === a), o),
            E = e.children,
            h = e.maxPopoverPlacement,
            y = void 0 === h ? 'top' : h,
            x = e.maxPopoverTrigger,
            N = void 0 === x ? 'hover' : x,
            S = (0, b.Z)(E).map(function (e, t) {
              return (0, C.Tm)(e, { key: 'avatar-key-'.concat(t) });
            }),
            k = S.length;
          if (i && i < k) {
            var P = S.slice(0, i),
              w = S.slice(i, k);
            return (
              P.push(
                m.createElement(
                  O.Z,
                  {
                    key: 'avatar-popover-key',
                    content: w,
                    trigger: N,
                    placement: y,
                    overlayClassName: ''.concat(d, '-popover'),
                  },
                  m.createElement(Z, { style: u }, '+'.concat(k - i)),
                ),
              ),
              m.createElement(
                g,
                { size: p },
                m.createElement('div', { className: v, style: e.style }, P),
              )
            );
          }
          return m.createElement(
            g,
            { size: p },
            m.createElement('div', { className: v, style: e.style }, S),
          );
        },
        S = N,
        k = Z;
      k.Group = S;
      var P = k;
    },
    94233: function (e, t, n) {
      'use strict';
      n(38663), n(52683), n(20136);
    },
  },
]);
