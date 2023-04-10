(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [2060],
  {
    52683: function () {},
    68179: function () {},
    32060: function (e, t, n) {
      'use strict';
      n.r(t);
      n(48736);
      var r,
        a,
        o = n(27049),
        i = (n(54421), n(38272)),
        l = (n(94233), n(51890)),
        c = (n(12968), n(6122)),
        s = n(57337),
        u = n(93224),
        m = n(20310),
        p = n(12924),
        f = n.n(p),
        g = n(12788),
        d = n(99677),
        h = n.n(d),
        E = ['isTpl'],
        v =
          (g.ZP.div(
            r ||
              (r = (0, m.Z)([
                '\n  display: flex;\n  align-items: center;\n  margin-bottom: 16px;\n',
              ])),
          ),
          g.ZP.div(
            a ||
              (a = (0, m.Z)([
                '\n  margin: 10px auto;\n  width: 100%;\n  overflow: hidden;\n  position: absolute;\n  width: ',
                ';\n  height: ',
                ';\n  border-radius: ',
                ';\n  transform: translate(\n      ',
                'px,\n      ',
                'px\n    )\n    scale(',
                ')\n    rotate(',
                'deg);\n',
              ])),
            (e) => e.props.baseWidth,
            (e) => e.props.baseHeight,
            (e) => e.props.baseRadius,
            (e) => e.props.baseLeft,
            (e) => e.props.baseTop,
            (e) => e.props.baseScale / 100,
            (e) => e.props.baseRotate,
          )),
        A = (e) => {
          var t = e.isTpl,
            n = (0, u.Z)(e, E),
            r = n.bordered,
            a = n.header,
            m = void 0 === a ? '' : a,
            g = n.footer,
            d = void 0 === g ? '' : g,
            A = n.sourceData,
            y = n.itemLayout,
            x = n.loading,
            b = n.size,
            Z = n.split,
            B = n.pagination,
            N = n.grid,
            P = (0, p.useState)({}),
            Q = (0, s.Z)(P, 2),
            T = Q[0],
            R = Q[1];
          return (
            (0, p.useEffect)(() => {
              var e = {};
              N.map((t, n) => {
                'Number' === t.type &&
                  ('column' === t.id && (e['column'] = Number(t.placeholder)),
                  'gutter' === t.id && (e['gutter'] = Number(t.placeholder)),
                  'xs' === t.id && (e['xs'] = Number(t.placeholder)),
                  'sm' === t.id && (e['sm'] = Number(t.placeholder)),
                  'md' === t.id && (e['md'] = Number(t.placeholder)),
                  'lg' === t.id && (e['lg'] = Number(t.placeholder)),
                  'xl' === t.id && (e['xl'] = Number(t.placeholder)),
                  'xxl' === t.id && (e['xxl'] = Number(t.placeholder)));
              }),
                console.log(e),
                R(e);
            }, [N]),
            f().createElement(
              f().Fragment,
              null,
              t &&
                f().createElement(
                  'div',
                  null,
                  f().createElement(c.Z, { preview: !1, src: h(), alt: '' }),
                ),
              !t &&
                f().createElement(
                  v,
                  { props: e },
                  f().createElement(
                    i.ZP,
                    {
                      bordered: r,
                      header:
                        m.length > 0
                          ? m
                          : f().createElement(f().Fragment, null),
                      footer:
                        d.length > 0
                          ? d
                          : f().createElement(f().Fragment, null),
                      itemLayout: y,
                      loading: x,
                      size: b,
                      split: Z,
                      pagination: B,
                      grid: T,
                    },
                    A.map((e, t) =>
                      f().createElement(
                        i.ZP.Item,
                        { key: t },
                        e.imgUrl.length > 0
                          ? f().createElement(
                              f().Fragment,
                              null,
                              f().createElement(i.ZP.Item.Meta, {
                                avatar: f().createElement(l.C, {
                                  src: e.imgUrl[0].url,
                                }),
                                title: f().createElement(
                                  'a',
                                  { href: e.link },
                                  e.title,
                                ),
                                description: e.desc,
                              }),
                              e.content,
                            )
                          : f().createElement(
                              f().Fragment,
                              null,
                              f().createElement(i.ZP.Item.Meta, {
                                title: f().createElement(
                                  'a',
                                  { href: e.link },
                                  e.title,
                                ),
                                description: e.desc,
                              }),
                              e.content,
                            ),
                        Z && f().createElement(o.Z, null),
                      ),
                    ),
                  ),
                ),
            )
          );
        };
      t['default'] = (0, p.memo)(A);
    },
    99677: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
    51890: function (e, t, n) {
      'use strict';
      n.d(t, {
        C: function () {
          return T;
        },
      });
      var r = n(22122),
        a = n(96156),
        o = n(90484),
        i = n(28481),
        l = n(94184),
        c = n.n(l),
        s = n(48717),
        u = n(42550),
        m = n(12924),
        p = n(53124),
        f = n(25378),
        g = n(24308),
        d = m.createContext('default'),
        h = function (e) {
          var t = e.children,
            n = e.size;
          return m.createElement(d.Consumer, null, function (e) {
            return m.createElement(d.Provider, { value: n || e }, t);
          });
        },
        E = d,
        v = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
              t.indexOf(r[a]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
                (n[r[a]] = e[r[a]]);
          }
          return n;
        },
        A = function (e, t) {
          var n,
            l,
            d = m.useContext(E),
            h = m.useState(1),
            A = (0, i.Z)(h, 2),
            y = A[0],
            x = A[1],
            b = m.useState(!1),
            Z = (0, i.Z)(b, 2),
            B = Z[0],
            N = Z[1],
            P = m.useState(!0),
            Q = (0, i.Z)(P, 2),
            T = Q[0],
            R = Q[1],
            S = m.useRef(null),
            k = m.useRef(null),
            w = (0, u.sQ)(t, S),
            O = m.useContext(p.E_),
            U = O.getPrefixCls,
            I = function () {
              if (k.current && S.current) {
                var t = k.current.offsetWidth,
                  n = S.current.offsetWidth;
                if (0 !== t && 0 !== n) {
                  var r = e.gap,
                    a = void 0 === r ? 4 : r;
                  2 * a < n && x(n - 2 * a < t ? (n - 2 * a) / t : 1);
                }
              }
            };
          m.useEffect(function () {
            N(!0);
          }, []),
            m.useEffect(
              function () {
                R(!0), x(1);
              },
              [e.src],
            ),
            m.useEffect(
              function () {
                I();
              },
              [e.gap],
            );
          var Y,
            C = function () {
              var t = e.onError,
                n = t ? t() : void 0;
              !1 !== n && R(!1);
            },
            D = e.prefixCls,
            G = e.shape,
            F = void 0 === G ? 'circle' : G,
            z = e.size,
            M = void 0 === z ? 'default' : z,
            K = e.src,
            V = e.srcSet,
            L = e.icon,
            H = e.className,
            j = e.alt,
            X = e.draggable,
            W = e.children,
            J = e.crossOrigin,
            q = v(e, [
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
            _ = 'default' === M ? d : M,
            $ = Object.keys(('object' === (0, o.Z)(_) && _) || {}).some(
              function (e) {
                return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(e);
              },
            ),
            ee = (0, f.Z)($),
            te = m.useMemo(
              function () {
                if ('object' !== (0, o.Z)(_)) return {};
                var e = g.c4.find(function (e) {
                    return ee[e];
                  }),
                  t = _[e];
                return t
                  ? {
                      width: t,
                      height: t,
                      lineHeight: ''.concat(t, 'px'),
                      fontSize: L ? t / 2 : 18,
                    }
                  : {};
              },
              [ee, _],
            ),
            ne = U('avatar', D),
            re = c()(
              ((n = {}),
              (0, a.Z)(n, ''.concat(ne, '-lg'), 'large' === _),
              (0, a.Z)(n, ''.concat(ne, '-sm'), 'small' === _),
              n),
            ),
            ae = m.isValidElement(K),
            oe = c()(
              ne,
              re,
              ((l = {}),
              (0, a.Z)(l, ''.concat(ne, '-').concat(F), !!F),
              (0, a.Z)(l, ''.concat(ne, '-image'), ae || (K && T)),
              (0, a.Z)(l, ''.concat(ne, '-icon'), !!L),
              l),
              H,
            ),
            ie =
              'number' === typeof _
                ? {
                    width: _,
                    height: _,
                    lineHeight: ''.concat(_, 'px'),
                    fontSize: L ? _ / 2 : 18,
                  }
                : {};
          if ('string' === typeof K && T)
            Y = m.createElement('img', {
              src: K,
              draggable: X,
              srcSet: V,
              onError: C,
              alt: j,
              crossOrigin: J,
            });
          else if (ae) Y = K;
          else if (L) Y = L;
          else if (B || 1 !== y) {
            var le = 'scale('.concat(y, ') translateX(-50%)'),
              ce = { msTransform: le, WebkitTransform: le, transform: le },
              se =
                'number' === typeof _ ? { lineHeight: ''.concat(_, 'px') } : {};
            Y = m.createElement(
              s.Z,
              { onResize: I },
              m.createElement(
                'span',
                {
                  className: ''.concat(ne, '-string'),
                  ref: k,
                  style: (0, r.Z)((0, r.Z)({}, se), ce),
                },
                W,
              ),
            );
          } else
            Y = m.createElement(
              'span',
              {
                className: ''.concat(ne, '-string'),
                style: { opacity: 0 },
                ref: k,
              },
              W,
            );
          return (
            delete q.onError,
            delete q.gap,
            m.createElement(
              'span',
              (0, r.Z)({}, q, {
                style: (0, r.Z)((0, r.Z)((0, r.Z)({}, ie), te), q.style),
                className: oe,
                ref: w,
              }),
              Y,
            )
          );
        },
        y = m.forwardRef(A);
      var x = y,
        b = n(50344),
        Z = n(55241),
        B = n(96159),
        N = function (e) {
          var t = m.useContext(p.E_),
            n = t.getPrefixCls,
            r = t.direction,
            o = e.prefixCls,
            i = e.className,
            l = void 0 === i ? '' : i,
            s = e.maxCount,
            u = e.maxStyle,
            f = e.size,
            g = n('avatar-group', o),
            d = c()(g, (0, a.Z)({}, ''.concat(g, '-rtl'), 'rtl' === r), l),
            E = e.children,
            v = e.maxPopoverPlacement,
            A = void 0 === v ? 'top' : v,
            y = e.maxPopoverTrigger,
            N = void 0 === y ? 'hover' : y,
            P = (0, b.Z)(E).map(function (e, t) {
              return (0, B.Tm)(e, { key: 'avatar-key-'.concat(t) });
            }),
            Q = P.length;
          if (s && s < Q) {
            var T = P.slice(0, s),
              R = P.slice(s, Q);
            return (
              T.push(
                m.createElement(
                  Z.Z,
                  {
                    key: 'avatar-popover-key',
                    content: R,
                    trigger: N,
                    placement: A,
                    overlayClassName: ''.concat(g, '-popover'),
                  },
                  m.createElement(x, { style: u }, '+'.concat(Q - s)),
                ),
              ),
              m.createElement(
                h,
                { size: f },
                m.createElement('div', { className: d, style: e.style }, T),
              )
            );
          }
          return m.createElement(
            h,
            { size: f },
            m.createElement('div', { className: d, style: e.style }, P),
          );
        },
        P = N,
        Q = x;
      Q.Group = P;
      var T = Q;
    },
    94233: function (e, t, n) {
      'use strict';
      n(38663), n(52683), n(20136);
    },
    27049: function (e, t, n) {
      'use strict';
      var r = n(22122),
        a = n(96156),
        o = n(94184),
        i = n.n(o),
        l = n(12924),
        c = n(53124),
        s = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
              t.indexOf(r[a]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
                (n[r[a]] = e[r[a]]);
          }
          return n;
        },
        u = function (e) {
          var t,
            n = l.useContext(c.E_),
            o = n.getPrefixCls,
            u = n.direction,
            m = e.prefixCls,
            p = e.type,
            f = void 0 === p ? 'horizontal' : p,
            g = e.orientation,
            d = void 0 === g ? 'center' : g,
            h = e.orientationMargin,
            E = e.className,
            v = e.children,
            A = e.dashed,
            y = e.plain,
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
            b = o('divider', m),
            Z = d.length > 0 ? '-'.concat(d) : d,
            B = !!v,
            N = 'left' === d && null != h,
            P = 'right' === d && null != h,
            Q = i()(
              b,
              ''.concat(b, '-').concat(f),
              ((t = {}),
              (0, a.Z)(t, ''.concat(b, '-with-text'), B),
              (0, a.Z)(t, ''.concat(b, '-with-text').concat(Z), B),
              (0, a.Z)(t, ''.concat(b, '-dashed'), !!A),
              (0, a.Z)(t, ''.concat(b, '-plain'), !!y),
              (0, a.Z)(t, ''.concat(b, '-rtl'), 'rtl' === u),
              (0, a.Z)(
                t,
                ''.concat(b, '-no-default-orientation-margin-left'),
                N,
              ),
              (0, a.Z)(
                t,
                ''.concat(b, '-no-default-orientation-margin-right'),
                P,
              ),
              t),
              E,
            ),
            T = (0, r.Z)(
              (0, r.Z)({}, N && { marginLeft: h }),
              P && { marginRight: h },
            );
          return l.createElement(
            'div',
            (0, r.Z)({ className: Q }, x, { role: 'separator' }),
            v &&
              'vertical' !== f &&
              l.createElement(
                'span',
                { className: ''.concat(b, '-inner-text'), style: T },
                v,
              ),
          );
        };
      t['Z'] = u;
    },
    48736: function (e, t, n) {
      'use strict';
      n(38663), n(68179);
    },
  },
]);
