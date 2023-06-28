(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3390],
  {
    52683: function () {},
    57998: function (e, t, r) {
      'use strict';
      r.r(t);
      r(94233);
      var n = r(51890),
        a = (r(12968), r(6122)),
        c = r(2824),
        l = r(93224),
        s = (r(58024), r(91894)),
        o = r(12924),
        i = r.n(o),
        u = r(94701),
        f = r.n(u),
        m = r(71706),
        p = ['isTpl'],
        v = s.Z.Meta,
        d = (e) => {
          var t = e.isTpl,
            r = (0, l.Z)(e, p),
            u = r.actions,
            d = r.width,
            g = r.bordered,
            E = r.coverUrl,
            h = r.hoverable,
            y = r.loading,
            Z = r.title,
            b = r.avatarUrl,
            x = r.description,
            C = (0, o.useState)(),
            O = (0, c.Z)(C, 2),
            S = O[0],
            w = O[1];
          return (
            (0, o.useEffect)(() => {
              var e = u.split('-'),
                t = [];
              e.map((e) => {
                t.push(i().createElement(m[e]));
              }),
                w(t);
            }, []),
            i().createElement(
              i().Fragment,
              null,
              t &&
                i().createElement(
                  'div',
                  null,
                  i().createElement(a.Z, { preview: !1, src: f(), alt: '' }),
                ),
              !t &&
                i().createElement(
                  'div',
                  null,
                  i().createElement(
                    s.Z,
                    {
                      actions: S,
                      hoverable: h,
                      loading: y,
                      bordered: g,
                      style: { width: d },
                      cover: i().createElement('img', { alt: '', src: E }),
                    },
                    i().createElement(v, {
                      title: Z,
                      description: x,
                      avatar: i().createElement(n.C, { src: b }),
                    }),
                  ),
                ),
            )
          );
        };
      t['default'] = (0, o.memo)(d);
    },
    51890: function (e, t, r) {
      'use strict';
      r.d(t, {
        C: function () {
          return z;
        },
      });
      var n = r(22122),
        a = r(96156),
        c = r(90484),
        l = r(28481),
        s = r(94184),
        o = r.n(s),
        i = r(48717),
        u = r(42550),
        f = r(12924),
        m = r(53124),
        p = r(25378),
        v = r(24308),
        d = f.createContext('default'),
        g = function (e) {
          var t = e.children,
            r = e.size;
          return f.createElement(d.Consumer, null, function (e) {
            return f.createElement(d.Provider, { value: r || e }, t);
          });
        },
        E = d,
        h = function (e, t) {
          var r = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (r[n] = e[n]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (n = Object.getOwnPropertySymbols(e); a < n.length; a++)
              t.indexOf(n[a]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, n[a]) &&
                (r[n[a]] = e[n[a]]);
          }
          return r;
        },
        y = function (e, t) {
          var r,
            s,
            d = f.useContext(E),
            g = f.useState(1),
            y = (0, l.Z)(g, 2),
            Z = y[0],
            b = y[1],
            x = f.useState(!1),
            C = (0, l.Z)(x, 2),
            O = C[0],
            S = C[1],
            w = f.useState(!0),
            k = (0, l.Z)(w, 2),
            z = k[0],
            N = k[1],
            P = f.useRef(null),
            j = f.useRef(null),
            T = (0, u.sQ)(t, P),
            R = f.useContext(m.E_),
            H = R.getPrefixCls,
            W = function () {
              if (j.current && P.current) {
                var t = j.current.offsetWidth,
                  r = P.current.offsetWidth;
                if (0 !== t && 0 !== r) {
                  var n = e.gap,
                    a = void 0 === n ? 4 : n;
                  2 * a < r && b(r - 2 * a < t ? (r - 2 * a) / t : 1);
                }
              }
            };
          f.useEffect(function () {
            S(!0);
          }, []),
            f.useEffect(
              function () {
                N(!0), b(1);
              },
              [e.src],
            ),
            f.useEffect(
              function () {
                W();
              },
              [e.gap],
            );
          var M,
            U = function () {
              var t = e.onError,
                r = t ? t() : void 0;
              !1 !== r && N(!1);
            },
            _ = e.prefixCls,
            F = e.shape,
            G = void 0 === F ? 'circle' : F,
            I = e.size,
            Q = void 0 === I ? 'default' : I,
            V = e.src,
            X = e.srcSet,
            q = e.icon,
            A = e.className,
            B = e.alt,
            D = e.draggable,
            J = e.children,
            K = e.crossOrigin,
            L = h(e, [
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
            Y = 'default' === Q ? d : Q,
            $ = Object.keys(('object' === (0, c.Z)(Y) && Y) || {}).some(
              function (e) {
                return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(e);
              },
            ),
            ee = (0, p.Z)($),
            te = f.useMemo(
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
                      fontSize: q ? t / 2 : 18,
                    }
                  : {};
              },
              [ee, Y],
            ),
            re = H('avatar', _),
            ne = o()(
              ((r = {}),
              (0, a.Z)(r, ''.concat(re, '-lg'), 'large' === Y),
              (0, a.Z)(r, ''.concat(re, '-sm'), 'small' === Y),
              r),
            ),
            ae = f.isValidElement(V),
            ce = o()(
              re,
              ne,
              ((s = {}),
              (0, a.Z)(s, ''.concat(re, '-').concat(G), !!G),
              (0, a.Z)(s, ''.concat(re, '-image'), ae || (V && z)),
              (0, a.Z)(s, ''.concat(re, '-icon'), !!q),
              s),
              A,
            ),
            le =
              'number' === typeof Y
                ? {
                    width: Y,
                    height: Y,
                    lineHeight: ''.concat(Y, 'px'),
                    fontSize: q ? Y / 2 : 18,
                  }
                : {};
          if ('string' === typeof V && z)
            M = f.createElement('img', {
              src: V,
              draggable: D,
              srcSet: X,
              onError: U,
              alt: B,
              crossOrigin: K,
            });
          else if (ae) M = V;
          else if (q) M = q;
          else if (O || 1 !== Z) {
            var se = 'scale('.concat(Z, ') translateX(-50%)'),
              oe = { msTransform: se, WebkitTransform: se, transform: se },
              ie =
                'number' === typeof Y ? { lineHeight: ''.concat(Y, 'px') } : {};
            M = f.createElement(
              i.Z,
              { onResize: W },
              f.createElement(
                'span',
                {
                  className: ''.concat(re, '-string'),
                  ref: j,
                  style: (0, n.Z)((0, n.Z)({}, ie), oe),
                },
                J,
              ),
            );
          } else
            M = f.createElement(
              'span',
              {
                className: ''.concat(re, '-string'),
                style: { opacity: 0 },
                ref: j,
              },
              J,
            );
          return (
            delete L.onError,
            delete L.gap,
            f.createElement(
              'span',
              (0, n.Z)({}, L, {
                style: (0, n.Z)((0, n.Z)((0, n.Z)({}, le), te), L.style),
                className: ce,
                ref: T,
              }),
              M,
            )
          );
        },
        Z = f.forwardRef(y);
      var b = Z,
        x = r(50344),
        C = r(55241),
        O = r(96159),
        S = function (e) {
          var t = f.useContext(m.E_),
            r = t.getPrefixCls,
            n = t.direction,
            c = e.prefixCls,
            l = e.className,
            s = void 0 === l ? '' : l,
            i = e.maxCount,
            u = e.maxStyle,
            p = e.size,
            v = r('avatar-group', c),
            d = o()(v, (0, a.Z)({}, ''.concat(v, '-rtl'), 'rtl' === n), s),
            E = e.children,
            h = e.maxPopoverPlacement,
            y = void 0 === h ? 'top' : h,
            Z = e.maxPopoverTrigger,
            S = void 0 === Z ? 'hover' : Z,
            w = (0, x.Z)(E).map(function (e, t) {
              return (0, O.Tm)(e, { key: 'avatar-key-'.concat(t) });
            }),
            k = w.length;
          if (i && i < k) {
            var z = w.slice(0, i),
              N = w.slice(i, k);
            return (
              z.push(
                f.createElement(
                  C.Z,
                  {
                    key: 'avatar-popover-key',
                    content: N,
                    trigger: S,
                    placement: y,
                    overlayClassName: ''.concat(v, '-popover'),
                  },
                  f.createElement(b, { style: u }, '+'.concat(k - i)),
                ),
              ),
              f.createElement(
                g,
                { size: p },
                f.createElement('div', { className: d, style: e.style }, z),
              )
            );
          }
          return f.createElement(
            g,
            { size: p },
            f.createElement('div', { className: d, style: e.style }, w),
          );
        },
        w = S,
        k = b;
      k.Group = w;
      var z = k;
    },
    94233: function (e, t, r) {
      'use strict';
      r(38663), r(52683), r(20136);
    },
  },
]);
