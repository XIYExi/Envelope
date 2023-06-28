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
        l = n(27049),
        i = (n(54421), n(38272)),
        o = (n(94233), n(51890)),
        c = (n(12968), n(6122)),
        s = n(2824),
        u = n(93224),
        m = n(20310),
        p = n(12924),
        d = n.n(p),
        f = n(12788),
        g = n(57510),
        h = n.n(g),
        E = ['isTpl'],
        v =
          (f.ZP.div(
            r ||
              (r = (0, m.Z)([
                '\n  display: flex;\n  align-items: center;\n  margin-bottom: 16px;\n',
              ])),
          ),
          f.ZP.div(
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
        b = (e) => {
          var t = e.isTpl,
            n = (0, u.Z)(e, E),
            r = n.bordered,
            a = n.header,
            m = void 0 === a ? '' : a,
            f = n.footer,
            g = void 0 === f ? '' : f,
            b = n.sourceData,
            x = n.itemLayout,
            y = n.loading,
            Z = n.size,
            C = n.split,
            w = n.pagination,
            z = n.grid,
            O = (0, p.useState)({}),
            A = (0, s.Z)(O, 2),
            N = A[0],
            S = A[1];
          return (
            (0, p.useEffect)(() => {
              var e = {};
              z.map((t, n) => {
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
                S(e);
            }, [z]),
            d().createElement(
              d().Fragment,
              null,
              t &&
                d().createElement(
                  'div',
                  null,
                  d().createElement(c.Z, { preview: !1, src: h(), alt: '' }),
                ),
              !t &&
                d().createElement(
                  v,
                  { props: e },
                  d().createElement(
                    i.ZP,
                    {
                      bordered: r,
                      header:
                        m.length > 0
                          ? m
                          : d().createElement(d().Fragment, null),
                      footer:
                        g.length > 0
                          ? g
                          : d().createElement(d().Fragment, null),
                      itemLayout: x,
                      loading: y,
                      size: Z,
                      split: C,
                      pagination: w,
                      grid: N,
                    },
                    b.map((e, t) =>
                      d().createElement(
                        i.ZP.Item,
                        { key: t },
                        e.imgUrl.length > 0
                          ? d().createElement(
                              d().Fragment,
                              null,
                              d().createElement(i.ZP.Item.Meta, {
                                avatar: d().createElement(o.C, {
                                  src: e.imgUrl[0].url,
                                }),
                                title: d().createElement(
                                  'a',
                                  { href: e.link },
                                  e.title,
                                ),
                                description: e.desc,
                              }),
                              e.content,
                            )
                          : d().createElement(
                              d().Fragment,
                              null,
                              d().createElement(i.ZP.Item.Meta, {
                                title: d().createElement(
                                  'a',
                                  { href: e.link },
                                  e.title,
                                ),
                                description: e.desc,
                              }),
                              e.content,
                            ),
                        C && d().createElement(l.Z, null),
                      ),
                    ),
                  ),
                ),
            )
          );
        };
      t['default'] = (0, p.memo)(b);
    },
    57510: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABeCAYAAADBuu07AAACB0lEQVR4Xu3bQYrbQBRFUe883qbB4AV47LHS0SCDrxKoFD0rlM6B14MMvy60O1i3x+NxNzt6t58fU/1Hs3/cdJt/wIGERYSwiBAWEcIiojus9/t9v/LqPWjbE9Z05dV70CasztV70CasztV70CasztV70CasztV70CasztV70CasztV70CasztV70CasztV70LYnrMX/Rl9p9R60dYcFWwiLCGERISwihEWEsIiYm3o+n9Pr9bqbHbU/TQnLDt8cll+FHM1nLCKERYSwiBAWEcIiQlhEdIf1+Xzudt3VHtbsCWuy6672sEZY1rXawxphWddqD2uEZV2rPawRlnWt9rBmT1iLvxTsOqs9rOkOC7YQFhHCIkJYRAiLCGERISwi5qa8pWNHz+tfFpnXv4jwGYsIYREhLCKERYSwiBAWEd1h1S9+2f+x+pzOtiesxddV7fzV53Q2YQ2y+pzOJqxBVp/T2YQ1yOpzOpuwBll9TmfbE9biLxI7f/U5na07LNhCWEQIiwhhESEsIoRFhLCImJvylo4dPa9/WWRe/yLCZywihEWEsIgQFhHCIkJYRHSHVb9gZn2r9xzVnrAWX4u17av3HJWwvrx6z1EJ68ur9xyVsL68es9RCevLq/cc1Z6wFn/p2PbVe46qOyzYQlhECIsIYREhLCKERcTfsH72y+zAzWHdzY7eb+HKFZcw0nU0AAAAAElFTkSuQmCC';
    },
    51890: function (e, t, n) {
      'use strict';
      n.d(t, {
        C: function () {
          return N;
        },
      });
      var r = n(22122),
        a = n(96156),
        l = n(90484),
        i = n(28481),
        o = n(94184),
        c = n.n(o),
        s = n(48717),
        u = n(42550),
        m = n(12924),
        p = n(53124),
        d = n(25378),
        f = n(24308),
        g = m.createContext('default'),
        h = function (e) {
          var t = e.children,
            n = e.size;
          return m.createElement(g.Consumer, null, function (e) {
            return m.createElement(g.Provider, { value: n || e }, t);
          });
        },
        E = g,
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
        b = function (e, t) {
          var n,
            o,
            g = m.useContext(E),
            h = m.useState(1),
            b = (0, i.Z)(h, 2),
            x = b[0],
            y = b[1],
            Z = m.useState(!1),
            C = (0, i.Z)(Z, 2),
            w = C[0],
            z = C[1],
            O = m.useState(!0),
            A = (0, i.Z)(O, 2),
            N = A[0],
            S = A[1],
            R = m.useRef(null),
            P = m.useRef(null),
            I = (0, u.sQ)(t, R),
            V = m.useContext(p.E_),
            W = V.getPrefixCls,
            L = function () {
              if (P.current && R.current) {
                var t = P.current.offsetWidth,
                  n = R.current.offsetWidth;
                if (0 !== t && 0 !== n) {
                  var r = e.gap,
                    a = void 0 === r ? 4 : r;
                  2 * a < n && y(n - 2 * a < t ? (n - 2 * a) / t : 1);
                }
              }
            };
          m.useEffect(function () {
            z(!0);
          }, []),
            m.useEffect(
              function () {
                S(!0), y(1);
              },
              [e.src],
            ),
            m.useEffect(
              function () {
                L();
              },
              [e.gap],
            );
          var Y,
            H = function () {
              var t = e.onError,
                n = t ? t() : void 0;
              !1 !== n && S(!1);
            },
            k = e.prefixCls,
            F = e.shape,
            j = void 0 === F ? 'circle' : F,
            Q = e.size,
            T = void 0 === Q ? 'default' : Q,
            B = e.src,
            M = e.srcSet,
            q = e.icon,
            U = e.className,
            J = e.alt,
            X = e.draggable,
            D = e.children,
            G = e.crossOrigin,
            K = v(e, [
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
            _ = 'default' === T ? g : T,
            $ = Object.keys(('object' === (0, l.Z)(_) && _) || {}).some(
              function (e) {
                return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(e);
              },
            ),
            ee = (0, d.Z)($),
            te = m.useMemo(
              function () {
                if ('object' !== (0, l.Z)(_)) return {};
                var e = f.c4.find(function (e) {
                    return ee[e];
                  }),
                  t = _[e];
                return t
                  ? {
                      width: t,
                      height: t,
                      lineHeight: ''.concat(t, 'px'),
                      fontSize: q ? t / 2 : 18,
                    }
                  : {};
              },
              [ee, _],
            ),
            ne = W('avatar', k),
            re = c()(
              ((n = {}),
              (0, a.Z)(n, ''.concat(ne, '-lg'), 'large' === _),
              (0, a.Z)(n, ''.concat(ne, '-sm'), 'small' === _),
              n),
            ),
            ae = m.isValidElement(B),
            le = c()(
              ne,
              re,
              ((o = {}),
              (0, a.Z)(o, ''.concat(ne, '-').concat(j), !!j),
              (0, a.Z)(o, ''.concat(ne, '-image'), ae || (B && N)),
              (0, a.Z)(o, ''.concat(ne, '-icon'), !!q),
              o),
              U,
            ),
            ie =
              'number' === typeof _
                ? {
                    width: _,
                    height: _,
                    lineHeight: ''.concat(_, 'px'),
                    fontSize: q ? _ / 2 : 18,
                  }
                : {};
          if ('string' === typeof B && N)
            Y = m.createElement('img', {
              src: B,
              draggable: X,
              srcSet: M,
              onError: H,
              alt: J,
              crossOrigin: G,
            });
          else if (ae) Y = B;
          else if (q) Y = q;
          else if (w || 1 !== x) {
            var oe = 'scale('.concat(x, ') translateX(-50%)'),
              ce = { msTransform: oe, WebkitTransform: oe, transform: oe },
              se =
                'number' === typeof _ ? { lineHeight: ''.concat(_, 'px') } : {};
            Y = m.createElement(
              s.Z,
              { onResize: L },
              m.createElement(
                'span',
                {
                  className: ''.concat(ne, '-string'),
                  ref: P,
                  style: (0, r.Z)((0, r.Z)({}, se), ce),
                },
                D,
              ),
            );
          } else
            Y = m.createElement(
              'span',
              {
                className: ''.concat(ne, '-string'),
                style: { opacity: 0 },
                ref: P,
              },
              D,
            );
          return (
            delete K.onError,
            delete K.gap,
            m.createElement(
              'span',
              (0, r.Z)({}, K, {
                style: (0, r.Z)((0, r.Z)((0, r.Z)({}, ie), te), K.style),
                className: le,
                ref: I,
              }),
              Y,
            )
          );
        },
        x = m.forwardRef(b);
      var y = x,
        Z = n(50344),
        C = n(55241),
        w = n(96159),
        z = function (e) {
          var t = m.useContext(p.E_),
            n = t.getPrefixCls,
            r = t.direction,
            l = e.prefixCls,
            i = e.className,
            o = void 0 === i ? '' : i,
            s = e.maxCount,
            u = e.maxStyle,
            d = e.size,
            f = n('avatar-group', l),
            g = c()(f, (0, a.Z)({}, ''.concat(f, '-rtl'), 'rtl' === r), o),
            E = e.children,
            v = e.maxPopoverPlacement,
            b = void 0 === v ? 'top' : v,
            x = e.maxPopoverTrigger,
            z = void 0 === x ? 'hover' : x,
            O = (0, Z.Z)(E).map(function (e, t) {
              return (0, w.Tm)(e, { key: 'avatar-key-'.concat(t) });
            }),
            A = O.length;
          if (s && s < A) {
            var N = O.slice(0, s),
              S = O.slice(s, A);
            return (
              N.push(
                m.createElement(
                  C.Z,
                  {
                    key: 'avatar-popover-key',
                    content: S,
                    trigger: z,
                    placement: b,
                    overlayClassName: ''.concat(f, '-popover'),
                  },
                  m.createElement(y, { style: u }, '+'.concat(A - s)),
                ),
              ),
              m.createElement(
                h,
                { size: d },
                m.createElement('div', { className: g, style: e.style }, N),
              )
            );
          }
          return m.createElement(
            h,
            { size: d },
            m.createElement('div', { className: g, style: e.style }, O),
          );
        },
        O = z,
        A = y;
      A.Group = O;
      var N = A;
    },
    94233: function (e, t, n) {
      'use strict';
      n(38663), n(52683), n(20136);
    },
    27049: function (e, t, n) {
      'use strict';
      var r = n(22122),
        a = n(96156),
        l = n(94184),
        i = n.n(l),
        o = n(12924),
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
            n = o.useContext(c.E_),
            l = n.getPrefixCls,
            u = n.direction,
            m = e.prefixCls,
            p = e.type,
            d = void 0 === p ? 'horizontal' : p,
            f = e.orientation,
            g = void 0 === f ? 'center' : f,
            h = e.orientationMargin,
            E = e.className,
            v = e.children,
            b = e.dashed,
            x = e.plain,
            y = s(e, [
              'prefixCls',
              'type',
              'orientation',
              'orientationMargin',
              'className',
              'children',
              'dashed',
              'plain',
            ]),
            Z = l('divider', m),
            C = g.length > 0 ? '-'.concat(g) : g,
            w = !!v,
            z = 'left' === g && null != h,
            O = 'right' === g && null != h,
            A = i()(
              Z,
              ''.concat(Z, '-').concat(d),
              ((t = {}),
              (0, a.Z)(t, ''.concat(Z, '-with-text'), w),
              (0, a.Z)(t, ''.concat(Z, '-with-text').concat(C), w),
              (0, a.Z)(t, ''.concat(Z, '-dashed'), !!b),
              (0, a.Z)(t, ''.concat(Z, '-plain'), !!x),
              (0, a.Z)(t, ''.concat(Z, '-rtl'), 'rtl' === u),
              (0, a.Z)(
                t,
                ''.concat(Z, '-no-default-orientation-margin-left'),
                z,
              ),
              (0, a.Z)(
                t,
                ''.concat(Z, '-no-default-orientation-margin-right'),
                O,
              ),
              t),
              E,
            ),
            N = (0, r.Z)(
              (0, r.Z)({}, z && { marginLeft: h }),
              O && { marginRight: h },
            );
          return o.createElement(
            'div',
            (0, r.Z)({ className: A }, y, { role: 'separator' }),
            v &&
              'vertical' !== d &&
              o.createElement(
                'span',
                { className: ''.concat(Z, '-inner-text'), style: N },
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
