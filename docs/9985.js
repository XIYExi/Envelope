(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9985, 3390],
  {
    52683: function () {},
    74317: function (e, t, r) {
      'use strict';
      r.r(t);
      var n = r(91896),
        a = r(12924),
        c = r.n(a),
        l = r(57998),
        i = {
          actions: 'SettingOutlined-EditOutlined-EllipsisOutlined',
          width: 300,
          bordered: !0,
          coverUrl:
            'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
          hoverable: !1,
          loading: !1,
          title: 'Card Title',
          avatarUrl: 'https://joeschmoe.io/api/v1/random',
          description: 'This is the description',
        };
      t['default'] = () =>
        c().createElement(l.default, (0, n.Z)({ isTpl: !1 }, i));
    },
    57998: function (e, t, r) {
      'use strict';
      r.r(t);
      r(94233);
      var n = r(51890),
        a = (r(12968), r(6122)),
        c = r(2824),
        l = r(93224),
        i = (r(58024), r(91894)),
        s = r(12924),
        o = r.n(s),
        u = r(94701),
        f = r.n(u),
        m = r(71706),
        p = ['isTpl'],
        d = i.Z.Meta,
        v = (e) => {
          var t = e.isTpl,
            r = (0, l.Z)(e, p),
            u = r.actions,
            v = r.width,
            g = r.bordered,
            h = r.coverUrl,
            E = r.hoverable,
            y = r.loading,
            Z = r.title,
            b = r.avatarUrl,
            x = r.description,
            C = (0, s.useState)(),
            O = (0, c.Z)(C, 2),
            w = O[0],
            S = O[1];
          return (
            (0, s.useEffect)(() => {
              var e = u.split('-'),
                t = [];
              e.map((e) => {
                t.push(o().createElement(m[e]));
              }),
                S(t);
            }, []),
            o().createElement(
              o().Fragment,
              null,
              t &&
                o().createElement(
                  'div',
                  null,
                  o().createElement(a.Z, { preview: !1, src: f(), alt: '' }),
                ),
              !t &&
                o().createElement(
                  'div',
                  null,
                  o().createElement(
                    i.Z,
                    {
                      actions: w,
                      hoverable: E,
                      loading: y,
                      bordered: g,
                      style: { width: v },
                      cover: o().createElement('img', { alt: '', src: h }),
                    },
                    o().createElement(d, {
                      title: Z,
                      description: x,
                      avatar: o().createElement(n.C, { src: b }),
                    }),
                  ),
                ),
            )
          );
        };
      t['default'] = (0, s.memo)(v);
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
        i = r(94184),
        s = r.n(i),
        o = r(48717),
        u = r(42550),
        f = r(12924),
        m = r(53124),
        p = r(25378),
        d = r(24308),
        v = f.createContext('default'),
        g = function (e) {
          var t = e.children,
            r = e.size;
          return f.createElement(v.Consumer, null, function (e) {
            return f.createElement(v.Provider, { value: r || e }, t);
          });
        },
        h = v,
        E = function (e, t) {
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
            i,
            v = f.useContext(h),
            g = f.useState(1),
            y = (0, l.Z)(g, 2),
            Z = y[0],
            b = y[1],
            x = f.useState(!1),
            C = (0, l.Z)(x, 2),
            O = C[0],
            w = C[1],
            S = f.useState(!0),
            k = (0, l.Z)(S, 2),
            z = k[0],
            T = k[1],
            j = f.useRef(null),
            N = f.useRef(null),
            P = (0, u.sQ)(t, j),
            H = f.useContext(m.E_),
            R = H.getPrefixCls,
            U = function () {
              if (N.current && j.current) {
                var t = N.current.offsetWidth,
                  r = j.current.offsetWidth;
                if (0 !== t && 0 !== r) {
                  var n = e.gap,
                    a = void 0 === n ? 4 : n;
                  2 * a < r && b(r - 2 * a < t ? (r - 2 * a) / t : 1);
                }
              }
            };
          f.useEffect(function () {
            w(!0);
          }, []),
            f.useEffect(
              function () {
                T(!0), b(1);
              },
              [e.src],
            ),
            f.useEffect(
              function () {
                U();
              },
              [e.gap],
            );
          var W,
            q = function () {
              var t = e.onError,
                r = t ? t() : void 0;
              !1 !== r && T(!1);
            },
            G = e.prefixCls,
            M = e.shape,
            _ = void 0 === M ? 'circle' : M,
            A = e.size,
            F = void 0 === A ? 'default' : A,
            I = e.src,
            J = e.srcSet,
            Q = e.icon,
            V = e.className,
            X = e.alt,
            B = e.draggable,
            D = e.children,
            K = e.crossOrigin,
            L = E(e, [
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
            Y = 'default' === F ? v : F,
            $ = Object.keys(('object' === (0, c.Z)(Y) && Y) || {}).some(
              function (e) {
                return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(e);
              },
            ),
            ee = (0, p.Z)($),
            te = f.useMemo(
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
                      fontSize: Q ? t / 2 : 18,
                    }
                  : {};
              },
              [ee, Y],
            ),
            re = R('avatar', G),
            ne = s()(
              ((r = {}),
              (0, a.Z)(r, ''.concat(re, '-lg'), 'large' === Y),
              (0, a.Z)(r, ''.concat(re, '-sm'), 'small' === Y),
              r),
            ),
            ae = f.isValidElement(I),
            ce = s()(
              re,
              ne,
              ((i = {}),
              (0, a.Z)(i, ''.concat(re, '-').concat(_), !!_),
              (0, a.Z)(i, ''.concat(re, '-image'), ae || (I && z)),
              (0, a.Z)(i, ''.concat(re, '-icon'), !!Q),
              i),
              V,
            ),
            le =
              'number' === typeof Y
                ? {
                    width: Y,
                    height: Y,
                    lineHeight: ''.concat(Y, 'px'),
                    fontSize: Q ? Y / 2 : 18,
                  }
                : {};
          if ('string' === typeof I && z)
            W = f.createElement('img', {
              src: I,
              draggable: B,
              srcSet: J,
              onError: q,
              alt: X,
              crossOrigin: K,
            });
          else if (ae) W = I;
          else if (Q) W = Q;
          else if (O || 1 !== Z) {
            var ie = 'scale('.concat(Z, ') translateX(-50%)'),
              se = { msTransform: ie, WebkitTransform: ie, transform: ie },
              oe =
                'number' === typeof Y ? { lineHeight: ''.concat(Y, 'px') } : {};
            W = f.createElement(
              o.Z,
              { onResize: U },
              f.createElement(
                'span',
                {
                  className: ''.concat(re, '-string'),
                  ref: N,
                  style: (0, n.Z)((0, n.Z)({}, oe), se),
                },
                D,
              ),
            );
          } else
            W = f.createElement(
              'span',
              {
                className: ''.concat(re, '-string'),
                style: { opacity: 0 },
                ref: N,
              },
              D,
            );
          return (
            delete L.onError,
            delete L.gap,
            f.createElement(
              'span',
              (0, n.Z)({}, L, {
                style: (0, n.Z)((0, n.Z)((0, n.Z)({}, le), te), L.style),
                className: ce,
                ref: P,
              }),
              W,
            )
          );
        },
        Z = f.forwardRef(y);
      var b = Z,
        x = r(50344),
        C = r(55241),
        O = r(96159),
        w = function (e) {
          var t = f.useContext(m.E_),
            r = t.getPrefixCls,
            n = t.direction,
            c = e.prefixCls,
            l = e.className,
            i = void 0 === l ? '' : l,
            o = e.maxCount,
            u = e.maxStyle,
            p = e.size,
            d = r('avatar-group', c),
            v = s()(d, (0, a.Z)({}, ''.concat(d, '-rtl'), 'rtl' === n), i),
            h = e.children,
            E = e.maxPopoverPlacement,
            y = void 0 === E ? 'top' : E,
            Z = e.maxPopoverTrigger,
            w = void 0 === Z ? 'hover' : Z,
            S = (0, x.Z)(h).map(function (e, t) {
              return (0, O.Tm)(e, { key: 'avatar-key-'.concat(t) });
            }),
            k = S.length;
          if (o && o < k) {
            var z = S.slice(0, o),
              T = S.slice(o, k);
            return (
              z.push(
                f.createElement(
                  C.Z,
                  {
                    key: 'avatar-popover-key',
                    content: T,
                    trigger: w,
                    placement: y,
                    overlayClassName: ''.concat(d, '-popover'),
                  },
                  f.createElement(b, { style: u }, '+'.concat(k - o)),
                ),
              ),
              f.createElement(
                g,
                { size: p },
                f.createElement('div', { className: v, style: e.style }, z),
              )
            );
          }
          return f.createElement(
            g,
            { size: p },
            f.createElement('div', { className: v, style: e.style }, S),
          );
        },
        S = w,
        k = b;
      k.Group = S;
      var z = k;
    },
    94233: function (e, t, r) {
      'use strict';
      r(38663), r(52683), r(20136);
    },
  },
]);
