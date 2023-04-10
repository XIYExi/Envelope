(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [862, 3809],
  {
    52683: function () {},
    64139: function () {},
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
            v = e.datetime,
            d = u(e, [
              'actions',
              'author',
              'avatar',
              'children',
              'className',
              'content',
              'prefixCls',
              'datetime',
            ]),
            E = o.useContext(i.E_),
            g = E.getPrefixCls,
            y = E.direction,
            h = function (e, t) {
              return o.createElement(
                'div',
                { className: l()(''.concat(e, '-nested')) },
                t,
              );
            },
            x = g('comment', p),
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
              (n || v) &&
              o.createElement(
                'div',
                { className: ''.concat(x, '-content-author') },
                n &&
                  o.createElement(
                    'span',
                    { className: ''.concat(x, '-content-author-name') },
                    n,
                  ),
                v &&
                  o.createElement(
                    'span',
                    { className: ''.concat(x, '-content-author-time') },
                    v,
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
            N = l()(x, (0, r.Z)({}, ''.concat(x, '-rtl'), 'rtl' === y), m);
          return o.createElement(
            'div',
            (0, a.Z)({}, d, { className: N }),
            o.createElement('div', { className: ''.concat(x, '-inner') }, Z, C),
            s ? h(x, s) : null,
          );
        },
        f = m,
        p = (n(94233), n(51890)),
        v = (n(12968), n(6122)),
        d = n(57337),
        E = n(93224),
        g = n(49054),
        y = n.n(g),
        h = n(86023),
        x = ['isTpl'],
        Z = (e) => {
          var t = e.isTpl,
            n = (0, E.Z)(e, x),
            a = n.actions,
            r = n.author,
            c = n.avatar,
            l = n.content,
            i = n.datetime,
            u = (0, o.useState)(),
            m = (0, d.Z)(u, 2),
            g = m[0],
            Z = m[1];
          return (
            (0, o.useEffect)(() => {
              var e = a.split('-'),
                t = [];
              e.map((e) => {
                t.push(s().createElement(h[e]));
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
                  s().createElement(v.Z, { preview: !1, src: y(), alt: '' }),
                ),
              !t &&
                s().createElement(
                  'div',
                  null,
                  s().createElement(f, {
                    content: s().createElement('p', null, l),
                    actions: g,
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
          return w;
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
        v = n(24308),
        d = m.createContext('default'),
        E = function (e) {
          var t = e.children,
            n = e.size;
          return m.createElement(d.Consumer, null, function (e) {
            return m.createElement(d.Provider, { value: n || e }, t);
          });
        },
        g = d,
        y = function (e, t) {
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
        h = function (e, t) {
          var n,
            o,
            d = m.useContext(g),
            E = m.useState(1),
            h = (0, l.Z)(E, 2),
            x = h[0],
            Z = h[1],
            b = m.useState(!1),
            O = (0, l.Z)(b, 2),
            C = O[0],
            N = O[1],
            S = m.useState(!0),
            P = (0, l.Z)(S, 2),
            w = P[0],
            j = P[1],
            k = m.useRef(null),
            z = m.useRef(null),
            T = (0, u.sQ)(t, k),
            R = m.useContext(f.E_),
            H = R.getPrefixCls,
            W = function () {
              if (z.current && k.current) {
                var t = z.current.offsetWidth,
                  n = k.current.offsetWidth;
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
                j(!0), Z(1);
              },
              [e.src],
            ),
            m.useEffect(
              function () {
                W();
              },
              [e.gap],
            );
          var _,
            I = function () {
              var t = e.onError,
                n = t ? t() : void 0;
              !1 !== n && j(!1);
            },
            F = e.prefixCls,
            G = e.shape,
            M = void 0 === G ? 'circle' : G,
            Q = e.size,
            V = void 0 === Q ? 'default' : Q,
            X = e.src,
            q = e.srcSet,
            A = e.icon,
            B = e.className,
            D = e.alt,
            J = e.draggable,
            K = e.children,
            L = e.crossOrigin,
            U = y(e, [
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
            Y = 'default' === V ? d : V,
            $ = Object.keys(('object' === (0, c.Z)(Y) && Y) || {}).some(
              function (e) {
                return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(e);
              },
            ),
            ee = (0, p.Z)($),
            te = m.useMemo(
              function () {
                if ('object' !== (0, c.Z)(Y)) return {};
                var e = v.c4.find(function (e) {
                    return ee[e];
                  }),
                  t = Y[e];
                return t
                  ? {
                      width: t,
                      height: t,
                      lineHeight: ''.concat(t, 'px'),
                      fontSize: A ? t / 2 : 18,
                    }
                  : {};
              },
              [ee, Y],
            ),
            ne = H('avatar', F),
            ae = s()(
              ((n = {}),
              (0, r.Z)(n, ''.concat(ne, '-lg'), 'large' === Y),
              (0, r.Z)(n, ''.concat(ne, '-sm'), 'small' === Y),
              n),
            ),
            re = m.isValidElement(X),
            ce = s()(
              ne,
              ae,
              ((o = {}),
              (0, r.Z)(o, ''.concat(ne, '-').concat(M), !!M),
              (0, r.Z)(o, ''.concat(ne, '-image'), re || (X && w)),
              (0, r.Z)(o, ''.concat(ne, '-icon'), !!A),
              o),
              B,
            ),
            le =
              'number' === typeof Y
                ? {
                    width: Y,
                    height: Y,
                    lineHeight: ''.concat(Y, 'px'),
                    fontSize: A ? Y / 2 : 18,
                  }
                : {};
          if ('string' === typeof X && w)
            _ = m.createElement('img', {
              src: X,
              draggable: J,
              srcSet: q,
              onError: I,
              alt: D,
              crossOrigin: L,
            });
          else if (re) _ = X;
          else if (A) _ = A;
          else if (C || 1 !== x) {
            var oe = 'scale('.concat(x, ') translateX(-50%)'),
              se = { msTransform: oe, WebkitTransform: oe, transform: oe },
              ie =
                'number' === typeof Y ? { lineHeight: ''.concat(Y, 'px') } : {};
            _ = m.createElement(
              i.Z,
              { onResize: W },
              m.createElement(
                'span',
                {
                  className: ''.concat(ne, '-string'),
                  ref: z,
                  style: (0, a.Z)((0, a.Z)({}, ie), se),
                },
                K,
              ),
            );
          } else
            _ = m.createElement(
              'span',
              {
                className: ''.concat(ne, '-string'),
                style: { opacity: 0 },
                ref: z,
              },
              K,
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
              _,
            )
          );
        },
        x = m.forwardRef(h);
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
            v = n('avatar-group', c),
            d = s()(v, (0, r.Z)({}, ''.concat(v, '-rtl'), 'rtl' === a), o),
            g = e.children,
            y = e.maxPopoverPlacement,
            h = void 0 === y ? 'top' : y,
            x = e.maxPopoverTrigger,
            N = void 0 === x ? 'hover' : x,
            S = (0, b.Z)(g).map(function (e, t) {
              return (0, C.Tm)(e, { key: 'avatar-key-'.concat(t) });
            }),
            P = S.length;
          if (i && i < P) {
            var w = S.slice(0, i),
              j = S.slice(i, P);
            return (
              w.push(
                m.createElement(
                  O.Z,
                  {
                    key: 'avatar-popover-key',
                    content: j,
                    trigger: N,
                    placement: h,
                    overlayClassName: ''.concat(v, '-popover'),
                  },
                  m.createElement(Z, { style: u }, '+'.concat(P - i)),
                ),
              ),
              m.createElement(
                E,
                { size: p },
                m.createElement('div', { className: d, style: e.style }, w),
              )
            );
          }
          return m.createElement(
            E,
            { size: p },
            m.createElement('div', { className: d, style: e.style }, S),
          );
        },
        S = N,
        P = Z;
      P.Group = S;
      var w = P;
    },
    94233: function (e, t, n) {
      'use strict';
      n(38663), n(52683), n(20136);
    },
  },
]);
