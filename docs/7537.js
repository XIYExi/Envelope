(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7537],
  {
    57551: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return u;
        },
      });
      var r = n(28991),
        o = n(12924),
        a = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '0 0 1024 1024', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z',
                },
              },
            ],
          },
          name: 'bars',
          theme: 'outlined',
        },
        i = a,
        l = n(13401),
        c = function (e, t) {
          return o.createElement(
            l.Z,
            (0, r.Z)((0, r.Z)({}, e), {}, { ref: t, icon: i }),
          );
        };
      c.displayName = 'BarsOutlined';
      var u = o.forwardRef(c);
    },
    67724: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return u;
        },
      });
      var r = n(28991),
        o = n(12924),
        a = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z',
                },
              },
            ],
          },
          name: 'left',
          theme: 'outlined',
        },
        i = a,
        l = n(13401),
        c = function (e, t) {
          return o.createElement(
            l.Z,
            (0, r.Z)((0, r.Z)({}, e), {}, { ref: t, icon: i }),
          );
        };
      c.displayName = 'LeftOutlined';
      var u = o.forwardRef(c);
    },
    8812: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return u;
        },
      });
      var r = n(28991),
        o = n(12924),
        a = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z',
                },
              },
            ],
          },
          name: 'right',
          theme: 'outlined',
        },
        i = a,
        l = n(13401),
        c = function (e, t) {
          return o.createElement(
            l.Z,
            (0, r.Z)((0, r.Z)({}, e), {}, { ref: t, icon: i }),
          );
        };
      c.displayName = 'RightOutlined';
      var u = o.forwardRef(c);
    },
    38475: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return N;
        },
      });
      var r = n(28481),
        o = n(12924),
        a = n(11092),
        i = n(98924),
        l = n(42550),
        c = o.createContext(null),
        u = c,
        s = n(85061),
        d = n(8410),
        f = [];
      function m(e, t) {
        var n = o.useState(function () {
            if (!(0, i.Z)()) return null;
            var e = document.createElement('div');
            return e;
          }),
          a = (0, r.Z)(n, 1),
          l = a[0],
          c = o.useRef(!1),
          m = o.useContext(u),
          p = o.useState(f),
          v = (0, r.Z)(p, 2),
          h = v[0],
          y = v[1],
          g =
            m ||
            (c.current
              ? void 0
              : function (e) {
                  y(function (t) {
                    var n = [e].concat((0, s.Z)(t));
                    return n;
                  });
                });
        function C() {
          l.parentElement || document.body.appendChild(l), (c.current = !0);
        }
        function b() {
          var e;
          null === (e = l.parentElement) || void 0 === e || e.removeChild(l),
            (c.current = !1);
        }
        return (
          (0, d.Z)(
            function () {
              return e ? (m ? m(C) : C()) : b(), b;
            },
            [e],
          ),
          (0, d.Z)(
            function () {
              h.length &&
                (h.forEach(function (e) {
                  return e();
                }),
                y(f));
            },
            [h],
          ),
          [l, g]
        );
      }
      var p = n(44958),
        v = n(74204);
      function h() {
        return (
          document.body.scrollHeight >
            (window.innerHeight || document.documentElement.clientHeight) &&
          window.innerWidth > document.body.offsetWidth
        );
      }
      var y = 'rc-util-locker-'.concat(Date.now()),
        g = 0;
      function C(e) {
        var t = !!e,
          n = o.useState(function () {
            return (g += 1), ''.concat(y, '_').concat(g);
          }),
          a = (0, r.Z)(n, 1),
          i = a[0];
        (0, d.Z)(
          function () {
            if (t) {
              var e = (0, v.Z)(),
                n = h();
              (0, p.hq)(
                '\nhtml body {\n  overflow-y: hidden;\n  '.concat(
                  n ? 'width: calc(100% - '.concat(e, 'px);') : '',
                  '\n}',
                ),
                i,
              );
            } else (0, p.jL)(i);
            return function () {
              (0, p.jL)(i);
            };
          },
          [t, i],
        );
      }
      var b = !1;
      function Z(e) {
        return 'boolean' === typeof e && (b = e), b;
      }
      var E = function (e) {
          return (
            !1 !== e &&
            ((0, i.Z)() && e
              ? 'string' === typeof e
                ? document.querySelector(e)
                : 'function' === typeof e
                ? e()
                : e
              : null)
          );
        },
        x = o.forwardRef(function (e, t) {
          var n = e.open,
            c = e.autoLock,
            s = e.getContainer,
            d = e.debug,
            f = e.autoDestroy,
            p = void 0 === f || f,
            v = e.children,
            h = o.useState(n),
            y = (0, r.Z)(h, 2),
            g = y[0],
            b = y[1],
            x = g || n;
          o.useEffect(
            function () {
              (p || n) && b(n);
            },
            [n, p],
          );
          var w = o.useState(function () {
              return E(s);
            }),
            N = (0, r.Z)(w, 2),
            O = N[0],
            S = N[1];
          o.useEffect(function () {
            var e = E(s);
            S(null !== e && void 0 !== e ? e : null);
          });
          var P = m(x && !O, d),
            k = (0, r.Z)(P, 2),
            M = k[0],
            I = k[1],
            T = null !== O && void 0 !== O ? O : M;
          C(c && n && (0, i.Z)() && (T === M || T === document.body));
          var R = null;
          if (v && (0, l.Yr)(v) && t) {
            var j = v;
            R = j.ref;
          }
          var L = (0, l.x1)(R, t);
          if (!x || !(0, i.Z)() || void 0 === O) return null;
          var D = !1 === T || Z(),
            z = v;
          return (
            t && (z = o.cloneElement(v, { ref: L })),
            o.createElement(
              u.Provider,
              { value: I },
              D ? z : (0, a.createPortal)(z, T),
            )
          );
        });
      var w = x,
        N = w;
    },
    8116: function () {},
    57838: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return a;
        },
      });
      var r = n(28481),
        o = n(12924);
      function a() {
        var e = o.useReducer(function (e) {
            return e + 1;
          }, 0),
          t = (0, r.Z)(e, 2),
          n = t[1];
        return n;
      }
    },
    25378: function (e, t, n) {
      'use strict';
      var r = n(12924),
        o = n(57838),
        a = n(24308);
      function i() {
        var e =
            !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
          t = (0, r.useRef)({}),
          n = (0, o.Z)();
        return (
          (0, r.useEffect)(function () {
            var r = a.ZP.subscribe(function (r) {
              (t.current = r), e && n();
            });
            return function () {
              return a.ZP.unsubscribe(r);
            };
          }, []),
          t.current
        );
      }
      t['Z'] = i;
    },
    38407: function (e, t, n) {
      'use strict';
      n.d(t, {
        D: function () {
          return C;
        },
        Z: function () {
          return E;
        },
      });
      var r = n(96156),
        o = n(22122),
        a = n(28481),
        i = n(57551),
        l = n(67724),
        c = n(8812),
        u = n(94184),
        s = n.n(u),
        d = n(98423),
        f = n(12924),
        m = n(53124),
        p = function (e) {
          return !isNaN(parseFloat(e)) && isFinite(e);
        },
        v = p,
        h = n(2897),
        y = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        g = {
          xs: '479.98px',
          sm: '575.98px',
          md: '767.98px',
          lg: '991.98px',
          xl: '1199.98px',
          xxl: '1599.98px',
        },
        C = f.createContext({}),
        b = (function () {
          var e = 0;
          return function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : '';
            return (e += 1), ''.concat(t).concat(e);
          };
        })(),
        Z = f.forwardRef(function (e, t) {
          var n = e.prefixCls,
            u = e.className,
            p = e.trigger,
            Z = e.children,
            E = e.defaultCollapsed,
            x = void 0 !== E && E,
            w = e.theme,
            N = void 0 === w ? 'dark' : w,
            O = e.style,
            S = void 0 === O ? {} : O,
            P = e.collapsible,
            k = void 0 !== P && P,
            M = e.reverseArrow,
            I = void 0 !== M && M,
            T = e.width,
            R = void 0 === T ? 200 : T,
            j = e.collapsedWidth,
            L = void 0 === j ? 80 : j,
            D = e.zeroWidthTriggerStyle,
            z = e.breakpoint,
            W = e.onCollapse,
            H = e.onBreakpoint,
            A = y(e, [
              'prefixCls',
              'className',
              'trigger',
              'children',
              'defaultCollapsed',
              'theme',
              'style',
              'collapsible',
              'reverseArrow',
              'width',
              'collapsedWidth',
              'zeroWidthTriggerStyle',
              'breakpoint',
              'onCollapse',
              'onBreakpoint',
            ]),
            B = (0, f.useContext)(h.Gs),
            _ = B.siderHook,
            F = (0, f.useState)('collapsed' in A ? A.collapsed : x),
            V = (0, a.Z)(F, 2),
            U = V[0],
            K = V[1],
            $ = (0, f.useState)(!1),
            q = (0, a.Z)($, 2),
            G = q[0],
            Y = q[1];
          (0, f.useEffect)(
            function () {
              'collapsed' in A && K(A.collapsed);
            },
            [A.collapsed],
          );
          var X = function (e, t) {
              'collapsed' in A || K(e), null === W || void 0 === W || W(e, t);
            },
            J = (0, f.useRef)();
          (J.current = function (e) {
            Y(e.matches),
              null === H || void 0 === H || H(e.matches),
              U !== e.matches && X(e.matches, 'responsive');
          }),
            (0, f.useEffect)(
              function () {
                function e(e) {
                  return J.current(e);
                }
                var t;
                if ('undefined' !== typeof window) {
                  var n = window,
                    r = n.matchMedia;
                  if (r && z && z in g) {
                    t = r('(max-width: '.concat(g[z], ')'));
                    try {
                      t.addEventListener('change', e);
                    } catch (o) {
                      t.addListener(e);
                    }
                    e(t);
                  }
                }
                return function () {
                  try {
                    null === t ||
                      void 0 === t ||
                      t.removeEventListener('change', e);
                  } catch (o) {
                    null === t || void 0 === t || t.removeListener(e);
                  }
                };
              },
              [z],
            ),
            (0, f.useEffect)(function () {
              var e = b('ant-sider-');
              return (
                _.addSider(e),
                function () {
                  return _.removeSider(e);
                }
              );
            }, []);
          var Q = function () {
              X(!U, 'clickTrigger');
            },
            ee = (0, f.useContext)(m.E_),
            te = ee.getPrefixCls,
            ne = function () {
              var e,
                a = te('layout-sider', n),
                m = (0, d.Z)(A, ['collapsed']),
                h = U ? L : R,
                y = v(h) ? ''.concat(h, 'px') : String(h),
                g =
                  0 === parseFloat(String(L || 0))
                    ? f.createElement(
                        'span',
                        {
                          onClick: Q,
                          className: s()(
                            ''.concat(a, '-zero-width-trigger'),
                            ''
                              .concat(a, '-zero-width-trigger-')
                              .concat(I ? 'right' : 'left'),
                          ),
                          style: D,
                        },
                        p || f.createElement(i.Z, null),
                      )
                    : null,
                C = {
                  expanded: I
                    ? f.createElement(c.Z, null)
                    : f.createElement(l.Z, null),
                  collapsed: I
                    ? f.createElement(l.Z, null)
                    : f.createElement(c.Z, null),
                },
                b = U ? 'collapsed' : 'expanded',
                E = C[b],
                x =
                  null !== p
                    ? g ||
                      f.createElement(
                        'div',
                        {
                          className: ''.concat(a, '-trigger'),
                          onClick: Q,
                          style: { width: y },
                        },
                        p || E,
                      )
                    : null,
                w = (0, o.Z)((0, o.Z)({}, S), {
                  flex: '0 0 '.concat(y),
                  maxWidth: y,
                  minWidth: y,
                  width: y,
                }),
                O = s()(
                  a,
                  ''.concat(a, '-').concat(N),
                  ((e = {}),
                  (0, r.Z)(e, ''.concat(a, '-collapsed'), !!U),
                  (0, r.Z)(
                    e,
                    ''.concat(a, '-has-trigger'),
                    k && null !== p && !g,
                  ),
                  (0, r.Z)(e, ''.concat(a, '-below'), !!G),
                  (0, r.Z)(e, ''.concat(a, '-zero-width'), 0 === parseFloat(y)),
                  e),
                  u,
                );
              return f.createElement(
                'aside',
                (0, o.Z)({ className: O }, m, { style: w, ref: t }),
                f.createElement(
                  'div',
                  { className: ''.concat(a, '-children') },
                  Z,
                ),
                k || (G && g) ? x : null,
              );
            },
            re = f.useMemo(
              function () {
                return { siderCollapsed: U };
              },
              [U],
            );
          return f.createElement(C.Provider, { value: re }, ne());
        });
      var E = Z;
    },
    2897: function (e, t, n) {
      'use strict';
      n.d(t, {
        Gs: function () {
          return f;
        },
        h4: function () {
          return y;
        },
        $_: function () {
          return g;
        },
        VY: function () {
          return C;
        },
      });
      var r = n(85061),
        o = n(96156),
        a = n(28481),
        i = n(22122),
        l = n(94184),
        c = n.n(l),
        u = n(12924),
        s = n(53124),
        d = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        f = u.createContext({
          siderHook: {
            addSider: function () {
              return null;
            },
            removeSider: function () {
              return null;
            },
          },
        });
      function m(e) {
        var t = e.suffixCls,
          n = e.tagName;
        e.displayName;
        return function (e) {
          var r = u.forwardRef(function (r, o) {
            var a = u.useContext(s.E_),
              l = a.getPrefixCls,
              c = r.prefixCls,
              d = l(t, c);
            return u.createElement(
              e,
              (0, i.Z)({ ref: o, prefixCls: d, tagName: n }, r),
            );
          });
          return r;
        };
      }
      var p = u.forwardRef(function (e, t) {
          var n = e.prefixCls,
            r = e.className,
            o = e.children,
            a = e.tagName,
            l = d(e, ['prefixCls', 'className', 'children', 'tagName']),
            s = c()(n, r);
          return u.createElement(
            a,
            (0, i.Z)((0, i.Z)({ className: s }, l), { ref: t }),
            o,
          );
        }),
        v = u.forwardRef(function (e, t) {
          var n,
            l = u.useContext(s.E_),
            m = l.direction,
            p = u.useState([]),
            v = (0, a.Z)(p, 2),
            h = v[0],
            y = v[1],
            g = e.prefixCls,
            C = e.className,
            b = e.children,
            Z = e.hasSider,
            E = e.tagName,
            x = d(e, [
              'prefixCls',
              'className',
              'children',
              'hasSider',
              'tagName',
            ]),
            w = c()(
              g,
              ((n = {}),
              (0, o.Z)(
                n,
                ''.concat(g, '-has-sider'),
                'boolean' === typeof Z ? Z : h.length > 0,
              ),
              (0, o.Z)(n, ''.concat(g, '-rtl'), 'rtl' === m),
              n),
              C,
            ),
            N = u.useMemo(function () {
              return {
                siderHook: {
                  addSider: function (e) {
                    y(function (t) {
                      return [].concat((0, r.Z)(t), [e]);
                    });
                  },
                  removeSider: function (e) {
                    y(function (t) {
                      return t.filter(function (t) {
                        return t !== e;
                      });
                    });
                  },
                },
              };
            }, []);
          return u.createElement(
            f.Provider,
            { value: N },
            u.createElement(E, (0, i.Z)({ ref: t, className: w }, x), b),
          );
        }),
        h = m({
          suffixCls: 'layout',
          tagName: 'section',
          displayName: 'Layout',
        })(v),
        y = m({
          suffixCls: 'layout-header',
          tagName: 'header',
          displayName: 'Header',
        })(p),
        g = m({
          suffixCls: 'layout-footer',
          tagName: 'footer',
          displayName: 'Footer',
        })(p),
        C = m({
          suffixCls: 'layout-content',
          tagName: 'main',
          displayName: 'Content',
        })(p);
      t['ZP'] = h;
    },
    40378: function (e, t, n) {
      'use strict';
      var r = n(7734);
      t['Z'] = r.Z;
    },
    76529: function (e, t, n) {
      'use strict';
      n.d(t, {
        J: function () {
          return l;
        },
      });
      var r = n(22122),
        o = n(12924),
        a = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        i = o.createContext(null),
        l = function (e) {
          var t = e.children,
            n = a(e, ['children']),
            l = o.useContext(i),
            c = o.useMemo(
              function () {
                return (0, r.Z)((0, r.Z)({}, l), n);
              },
              [l, n.prefixCls, n.mode, n.selectable],
            );
          return o.createElement(i.Provider, { value: c }, t);
        };
      t['Z'] = i;
    },
    28682: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return H;
        },
      });
      var r = n(6610),
        o = n(5991),
        a = n(10379),
        i = n(54070),
        l = n(22122),
        c = n(44545),
        u = n(94184),
        s = n.n(u),
        d = n(94423),
        f = n(66680),
        m = n(98423),
        p = n(12924),
        v = n(53124),
        h = n(38407),
        y = n(33603),
        g = n(96159),
        C = n(90484),
        b = n(96156),
        Z = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        E = function (e) {
          var t = e.prefixCls,
            n = e.className,
            r = e.dashed,
            o = Z(e, ['prefixCls', 'className', 'dashed']),
            a = p.useContext(v.E_),
            i = a.getPrefixCls,
            c = i('menu', t),
            u = s()((0, b.Z)({}, ''.concat(c, '-item-divider-dashed'), !!r), n);
          return p.createElement(d.iz, (0, l.Z)({ className: u }, o));
        },
        x = E,
        w = n(50344),
        N = n(94199),
        O = (0, p.createContext)({
          prefixCls: '',
          firstLevel: !0,
          inlineCollapsed: !1,
        }),
        S = O,
        P = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        k = (function (e) {
          (0, a.Z)(n, e);
          var t = (0, i.Z)(n);
          function n() {
            var e;
            return (
              (0, r.Z)(this, n),
              (e = t.apply(this, arguments)),
              (e.renderItem = function (t) {
                var n,
                  r,
                  o = t.siderCollapsed,
                  a = e.context,
                  i = a.prefixCls,
                  c = a.firstLevel,
                  u = a.inlineCollapsed,
                  f = a.direction,
                  m = a.disableMenuItemTitleTooltip,
                  v = e.props,
                  h = v.className,
                  y = v.children,
                  C = e.props,
                  Z = C.title,
                  E = C.icon,
                  x = C.danger,
                  O = P(C, ['title', 'icon', 'danger']),
                  S = Z;
                'undefined' === typeof Z
                  ? (S = c ? y : '')
                  : !1 === Z && (S = '');
                var k = { title: S };
                o || u || ((k.title = null), (k.open = !1));
                var M = (0, w.Z)(y).length,
                  I = p.createElement(
                    d.ck,
                    (0, l.Z)({}, O, {
                      className: s()(
                        ((n = {}),
                        (0, b.Z)(n, ''.concat(i, '-item-danger'), x),
                        (0, b.Z)(
                          n,
                          ''.concat(i, '-item-only-child'),
                          1 === (E ? M + 1 : M),
                        ),
                        n),
                        h,
                      ),
                      title: 'string' === typeof Z ? Z : void 0,
                    }),
                    (0, g.Tm)(E, {
                      className: s()(
                        (0, g.l$)(E)
                          ? null === (r = E.props) || void 0 === r
                            ? void 0
                            : r.className
                          : '',
                        ''.concat(i, '-item-icon'),
                      ),
                    }),
                    e.renderItemChildren(u),
                  );
                return (
                  m ||
                    (I = p.createElement(
                      N.Z,
                      (0, l.Z)({}, k, {
                        placement: 'rtl' === f ? 'left' : 'right',
                        overlayClassName: ''.concat(
                          i,
                          '-inline-collapsed-tooltip',
                        ),
                      }),
                      I,
                    )),
                  I
                );
              }),
              e
            );
          }
          return (
            (0, o.Z)(n, [
              {
                key: 'renderItemChildren',
                value: function (e) {
                  var t = this.context,
                    n = t.prefixCls,
                    r = t.firstLevel,
                    o = this.props,
                    a = o.icon,
                    i = o.children,
                    l = p.createElement(
                      'span',
                      { className: ''.concat(n, '-title-content') },
                      i,
                    );
                  return (!a || ((0, g.l$)(i) && 'span' === i.type)) &&
                    i &&
                    e &&
                    r &&
                    'string' === typeof i
                    ? p.createElement(
                        'div',
                        { className: ''.concat(n, '-inline-collapsed-noicon') },
                        i.charAt(0),
                      )
                    : l;
                },
              },
              {
                key: 'render',
                value: function () {
                  return p.createElement(h.D.Consumer, null, this.renderItem);
                },
              },
            ]),
            n
          );
        })(p.Component);
      function M(e) {
        var t,
          n,
          r = e.popupClassName,
          o = e.icon,
          a = e.title,
          i = e.theme,
          c = p.useContext(S),
          u = c.prefixCls,
          f = c.inlineCollapsed,
          v = c.antdMenuTheme,
          h = (0, d.Xl)();
        if (o) {
          var y = (0, g.l$)(a) && 'span' === a.type;
          n = p.createElement(
            p.Fragment,
            null,
            (0, g.Tm)(o, {
              className: s()(
                (0, g.l$)(o)
                  ? null === (t = o.props) || void 0 === t
                    ? void 0
                    : t.className
                  : '',
                ''.concat(u, '-item-icon'),
              ),
            }),
            y
              ? a
              : p.createElement(
                  'span',
                  { className: ''.concat(u, '-title-content') },
                  a,
                ),
          );
        } else
          n =
            f && !h.length && a && 'string' === typeof a
              ? p.createElement(
                  'div',
                  { className: ''.concat(u, '-inline-collapsed-noicon') },
                  a.charAt(0),
                )
              : p.createElement(
                  'span',
                  { className: ''.concat(u, '-title-content') },
                  a,
                );
        var C = p.useMemo(
          function () {
            return (0, l.Z)((0, l.Z)({}, c), { firstLevel: !1 });
          },
          [c],
        );
        return p.createElement(
          S.Provider,
          { value: C },
          p.createElement(
            d.Wd,
            (0, l.Z)({}, (0, m.Z)(e, ['icon']), {
              title: n,
              popupClassName: s()(u, ''.concat(u, '-').concat(i || v), r),
            }),
          ),
        );
      }
      k.contextType = S;
      var I = M,
        T = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        };
      function R(e) {
        return (e || [])
          .map(function (e, t) {
            if (e && 'object' === (0, C.Z)(e)) {
              var n = e,
                r = n.label,
                o = n.children,
                a = n.key,
                i = n.type,
                c = T(n, ['label', 'children', 'key', 'type']),
                u = null !== a && void 0 !== a ? a : 'tmp-'.concat(t);
              return o || 'group' === i
                ? 'group' === i
                  ? p.createElement(
                      d.BW,
                      (0, l.Z)({ key: u }, c, { title: r }),
                      R(o),
                    )
                  : p.createElement(
                      I,
                      (0, l.Z)({ key: u }, c, { title: r }),
                      R(o),
                    )
                : 'divider' === i
                ? p.createElement(x, (0, l.Z)({ key: u }, c))
                : p.createElement(k, (0, l.Z)({ key: u }, c), r);
            }
            return null;
          })
          .filter(function (e) {
            return e;
          });
      }
      function j(e) {
        return p.useMemo(
          function () {
            return e ? R(e) : e;
          },
          [e],
        );
      }
      var L = n(76529),
        D = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        z = (0, p.forwardRef)(function (e, t) {
          var n,
            r = p.useContext(L.Z) || {},
            o = p.useContext(v.E_),
            a = o.getPrefixCls,
            i = o.getPopupContainer,
            u = o.direction,
            h = a(),
            C = e.prefixCls,
            b = e.className,
            Z = e.theme,
            E = void 0 === Z ? 'light' : Z,
            x = e.expandIcon,
            w = e._internalDisableMenuItemTitleTooltip,
            N = e.inlineCollapsed,
            O = e.siderCollapsed,
            P = e.items,
            k = e.children,
            M = e.mode,
            I = e.selectable,
            T = e.onClick,
            R = D(e, [
              'prefixCls',
              'className',
              'theme',
              'expandIcon',
              '_internalDisableMenuItemTitleTooltip',
              'inlineCollapsed',
              'siderCollapsed',
              'items',
              'children',
              'mode',
              'selectable',
              'onClick',
            ]),
            z = (0, m.Z)(R, ['collapsedWidth']),
            W = j(P) || k;
          null === (n = r.validator) || void 0 === n || n.call(r, { mode: M });
          var H,
            A = (0, f.Z)(function () {
              var e;
              null === T || void 0 === T || T.apply(void 0, arguments),
                null ===
                  (e = null === r || void 0 === r ? void 0 : r.onClick) ||
                  void 0 === e ||
                  e.call(r);
            }),
            B = r.mode || M,
            _ = null !== I && void 0 !== I ? I : r.selectable,
            F = p.useMemo(
              function () {
                return void 0 !== O ? O : N;
              },
              [N, O],
            ),
            V = {
              horizontal: { motionName: ''.concat(h, '-slide-up') },
              inline: y.ZP,
              other: { motionName: ''.concat(h, '-zoom-big') },
            },
            U = a('menu', C || r.prefixCls),
            K = s()(''.concat(U, '-').concat(E), b);
          H =
            'function' === typeof x
              ? x
              : (0, g.Tm)(x || r.expandIcon, {
                  className: ''.concat(U, '-submenu-expand-icon'),
                });
          var $ = p.useMemo(
            function () {
              return {
                prefixCls: U,
                inlineCollapsed: F || !1,
                antdMenuTheme: E,
                direction: u,
                firstLevel: !0,
                disableMenuItemTitleTooltip: w,
              };
            },
            [U, F, E, u, w],
          );
          return p.createElement(
            L.Z.Provider,
            { value: null },
            p.createElement(
              S.Provider,
              { value: $ },
              p.createElement(
                d.ZP,
                (0, l.Z)(
                  {
                    getPopupContainer: i,
                    overflowedIndicator: p.createElement(c.Z, null),
                    overflowedIndicatorPopupClassName: ''
                      .concat(U, '-')
                      .concat(E),
                    mode: B,
                    selectable: _,
                    onClick: A,
                  },
                  z,
                  {
                    inlineCollapsed: F,
                    className: K,
                    prefixCls: U,
                    direction: u,
                    defaultMotions: V,
                    expandIcon: H,
                    ref: t,
                  },
                ),
                W,
              ),
            ),
          );
        }),
        W = (function (e) {
          (0, a.Z)(n, e);
          var t = (0, i.Z)(n);
          function n() {
            var e;
            return (
              (0, r.Z)(this, n),
              (e = t.apply(this, arguments)),
              (e.focus = function (t) {
                var n;
                null === (n = e.menu) || void 0 === n || n.focus(t);
              }),
              e
            );
          }
          return (
            (0, o.Z)(n, [
              {
                key: 'render',
                value: function () {
                  var e = this;
                  return p.createElement(h.D.Consumer, null, function (t) {
                    return p.createElement(
                      z,
                      (0, l.Z)(
                        {
                          ref: function (t) {
                            e.menu = t;
                          },
                        },
                        e.props,
                        t,
                      ),
                    );
                  });
                },
              },
            ]),
            n
          );
        })(p.Component);
      (W.Divider = x), (W.Item = k), (W.SubMenu = I), (W.ItemGroup = d.BW);
      var H = W;
    },
    30887: function (e, t, n) {
      'use strict';
      n(38663), n(8116), n(22385);
    },
    57315: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          Panel: function () {
            return N;
          },
          default: function () {
            return I;
          },
        });
      var r = n(22122),
        o = n(28481),
        a = n(12924),
        i = n.n(a),
        l = n(38475),
        c = n(28991),
        u = n(94184),
        s = n.n(u),
        d = n(15105);
      function f() {
        var e = (0, c.Z)({}, a);
        return e.useId;
      }
      var m = 0;
      function p(e) {
        var t = a.useState('ssr-id'),
          n = (0, o.Z)(t, 2),
          r = n[0],
          i = n[1],
          l = f(),
          c = null === l || void 0 === l ? void 0 : l();
        return (
          a.useEffect(function () {
            if (!l) {
              var e = m;
              (m += 1), i('rc_unique_'.concat(e));
            }
          }, []),
          e || c || r
        );
      }
      var v = n(94999),
        h = n(64217),
        y = n(63441);
      function g(e) {
        var t = e.prefixCls,
          n = e.style,
          o = e.visible,
          i = e.maskProps,
          l = e.motionName;
        return a.createElement(
          y.default,
          {
            key: 'mask',
            visible: o,
            motionName: l,
            leavedClassName: ''.concat(t, '-mask-hidden'),
          },
          function (e, o) {
            var l = e.className,
              u = e.style;
            return a.createElement(
              'div',
              (0, r.Z)(
                {
                  ref: o,
                  style: (0, c.Z)((0, c.Z)({}, u), n),
                  className: s()(''.concat(t, '-mask'), l),
                },
                i,
              ),
            );
          },
        );
      }
      function C(e, t, n) {
        var r = t;
        return !r && n && (r = ''.concat(e, '-').concat(n)), r;
      }
      function b(e, t) {
        var n = e['page'.concat(t ? 'Y' : 'X', 'Offset')],
          r = 'scroll'.concat(t ? 'Top' : 'Left');
        if ('number' !== typeof n) {
          var o = e.document;
          (n = o.documentElement[r]), 'number' !== typeof n && (n = o.body[r]);
        }
        return n;
      }
      function Z(e) {
        var t = e.getBoundingClientRect(),
          n = { left: t.left, top: t.top },
          r = e.ownerDocument,
          o = r.defaultView || r.parentWindow;
        return (n.left += b(o)), (n.top += b(o, !0)), n;
      }
      var E = a.memo(
          function (e) {
            var t = e.children;
            return t;
          },
          function (e, t) {
            var n = t.shouldUpdate;
            return !n;
          },
        ),
        x = { width: 0, height: 0, overflow: 'hidden', outline: 'none' },
        w = i().forwardRef(function (e, t) {
          var n = e.prefixCls,
            o = e.className,
            l = e.style,
            u = e.title,
            d = e.ariaId,
            f = e.footer,
            m = e.closable,
            p = e.closeIcon,
            v = e.onClose,
            h = e.children,
            y = e.bodyStyle,
            g = e.bodyProps,
            C = e.modalRender,
            b = e.onMouseDown,
            Z = e.onMouseUp,
            w = e.holderRef,
            N = e.visible,
            O = e.forceRender,
            S = e.width,
            P = e.height,
            k = (0, a.useRef)(),
            M = (0, a.useRef)();
          i().useImperativeHandle(t, function () {
            return {
              focus: function () {
                var e;
                null === (e = k.current) || void 0 === e || e.focus();
              },
              changeActive: function (e) {
                var t = document,
                  n = t.activeElement;
                e && n === M.current
                  ? k.current.focus()
                  : e || n !== k.current || M.current.focus();
              },
            };
          });
          var I,
            T,
            R,
            j = {};
          void 0 !== S && (j.width = S),
            void 0 !== P && (j.height = P),
            f &&
              (I = i().createElement(
                'div',
                { className: ''.concat(n, '-footer') },
                f,
              )),
            u &&
              (T = i().createElement(
                'div',
                { className: ''.concat(n, '-header') },
                i().createElement(
                  'div',
                  { className: ''.concat(n, '-title'), id: d },
                  u,
                ),
              )),
            m &&
              (R = i().createElement(
                'button',
                {
                  type: 'button',
                  onClick: v,
                  'aria-label': 'Close',
                  className: ''.concat(n, '-close'),
                },
                p ||
                  i().createElement('span', {
                    className: ''.concat(n, '-close-x'),
                  }),
              ));
          var L = i().createElement(
            'div',
            { className: ''.concat(n, '-content') },
            R,
            T,
            i().createElement(
              'div',
              (0, r.Z)({ className: ''.concat(n, '-body'), style: y }, g),
              h,
            ),
            I,
          );
          return i().createElement(
            'div',
            {
              key: 'dialog-element',
              role: 'dialog',
              'aria-labelledby': u ? d : null,
              'aria-modal': 'true',
              ref: w,
              style: (0, c.Z)((0, c.Z)({}, l), j),
              className: s()(n, o),
              onMouseDown: b,
              onMouseUp: Z,
            },
            i().createElement('div', {
              tabIndex: 0,
              ref: k,
              style: x,
              'aria-hidden': 'true',
            }),
            i().createElement(E, { shouldUpdate: N || O }, C ? C(L) : L),
            i().createElement('div', {
              tabIndex: 0,
              ref: M,
              style: x,
              'aria-hidden': 'true',
            }),
          );
        });
      var N = w,
        O = a.forwardRef(function (e, t) {
          var n = e.prefixCls,
            i = e.title,
            l = e.style,
            u = e.className,
            d = e.visible,
            f = e.forceRender,
            m = e.destroyOnClose,
            p = e.motionName,
            v = e.ariaId,
            h = e.onVisibleChanged,
            g = e.mousePosition,
            C = (0, a.useRef)(),
            b = a.useState(),
            E = (0, o.Z)(b, 2),
            x = E[0],
            w = E[1],
            O = {};
          function S() {
            var e = Z(C.current);
            w(
              g ? ''.concat(g.x - e.left, 'px ').concat(g.y - e.top, 'px') : '',
            );
          }
          return (
            x && (O.transformOrigin = x),
            a.createElement(
              y.default,
              {
                visible: d,
                onVisibleChanged: h,
                onAppearPrepare: S,
                onEnterPrepare: S,
                forceRender: f,
                motionName: p,
                removeOnLeave: m,
                ref: C,
              },
              function (o, d) {
                var f = o.className,
                  m = o.style;
                return a.createElement(
                  N,
                  (0, r.Z)({}, e, {
                    ref: t,
                    title: i,
                    ariaId: v,
                    prefixCls: n,
                    holderRef: d,
                    style: (0, c.Z)((0, c.Z)((0, c.Z)({}, m), l), O),
                    className: s()(u, f),
                  }),
                );
              },
            )
          );
        });
      O.displayName = 'Content';
      var S = O;
      function P(e) {
        var t = e.prefixCls,
          n = void 0 === t ? 'rc-dialog' : t,
          i = e.zIndex,
          l = e.visible,
          u = void 0 !== l && l,
          f = e.keyboard,
          m = void 0 === f || f,
          y = e.focusTriggerAfterClose,
          b = void 0 === y || y,
          Z = e.wrapStyle,
          E = e.wrapClassName,
          x = e.wrapProps,
          w = e.onClose,
          N = e.afterClose,
          O = e.transitionName,
          P = e.animation,
          k = e.closable,
          M = void 0 === k || k,
          I = e.mask,
          T = void 0 === I || I,
          R = e.maskTransitionName,
          j = e.maskAnimation,
          L = e.maskClosable,
          D = void 0 === L || L,
          z = e.maskStyle,
          W = e.maskProps,
          H = e.rootClassName,
          A = (0, a.useRef)(),
          B = (0, a.useRef)(),
          _ = (0, a.useRef)(),
          F = a.useState(u),
          V = (0, o.Z)(F, 2),
          U = V[0],
          K = V[1],
          $ = p();
        function q() {
          (0, v.Z)(B.current, document.activeElement) ||
            (A.current = document.activeElement);
        }
        function G() {
          var e;
          (0, v.Z)(B.current, document.activeElement) ||
            null === (e = _.current) ||
            void 0 === e ||
            e.focus();
        }
        function Y(e) {
          if (e) G();
          else {
            if ((K(!1), T && A.current && b)) {
              try {
                A.current.focus({ preventScroll: !0 });
              } catch (t) {}
              A.current = null;
            }
            U && (null === N || void 0 === N || N());
          }
        }
        function X(e) {
          null === w || void 0 === w || w(e);
        }
        var J = (0, a.useRef)(!1),
          Q = (0, a.useRef)(),
          ee = function () {
            clearTimeout(Q.current), (J.current = !0);
          },
          te = function () {
            Q.current = setTimeout(function () {
              J.current = !1;
            });
          },
          ne = null;
        function re(e) {
          if (m && e.keyCode === d.Z.ESC) return e.stopPropagation(), void X(e);
          u && e.keyCode === d.Z.TAB && _.current.changeActive(!e.shiftKey);
        }
        return (
          D &&
            (ne = function (e) {
              J.current ? (J.current = !1) : B.current === e.target && X(e);
            }),
          (0, a.useEffect)(
            function () {
              u && (K(!0), q());
            },
            [u],
          ),
          (0, a.useEffect)(function () {
            return function () {
              clearTimeout(Q.current);
            };
          }, []),
          a.createElement(
            'div',
            (0, r.Z)(
              { className: s()(''.concat(n, '-root'), H) },
              (0, h.Z)(e, { data: !0 }),
            ),
            a.createElement(g, {
              prefixCls: n,
              visible: T && u,
              motionName: C(n, R, j),
              style: (0, c.Z)({ zIndex: i }, z),
              maskProps: W,
            }),
            a.createElement(
              'div',
              (0, r.Z)(
                {
                  tabIndex: -1,
                  onKeyDown: re,
                  className: s()(''.concat(n, '-wrap'), E),
                  ref: B,
                  onClick: ne,
                  style: (0, c.Z)(
                    (0, c.Z)({ zIndex: i }, Z),
                    {},
                    { display: U ? null : 'none' },
                  ),
                },
                x,
              ),
              a.createElement(
                S,
                (0, r.Z)({}, e, {
                  onMouseDown: ee,
                  onMouseUp: te,
                  ref: _,
                  closable: M,
                  ariaId: $,
                  prefixCls: n,
                  visible: u && U,
                  onClose: X,
                  onVisibleChanged: Y,
                  motionName: C(n, O, P),
                }),
              ),
            ),
          )
        );
      }
      var k = function (e) {
        var t = e.visible,
          n = e.getContainer,
          i = e.forceRender,
          c = e.destroyOnClose,
          u = void 0 !== c && c,
          s = e.afterClose,
          d = a.useState(t),
          f = (0, o.Z)(d, 2),
          m = f[0],
          p = f[1];
        return (
          a.useEffect(
            function () {
              t && p(!0);
            },
            [t],
          ),
          i || !u || m
            ? a.createElement(
                l.Z,
                {
                  open: t || i || m,
                  autoDestroy: !1,
                  getContainer: n,
                  autoLock: t || m,
                },
                a.createElement(
                  P,
                  (0, r.Z)({}, e, {
                    destroyOnClose: u,
                    afterClose: function () {
                      null === s || void 0 === s || s(), p(!1);
                    },
                  }),
                ),
              )
            : null
        );
      };
      k.displayName = 'Dialog';
      var M = k,
        I = M;
    },
    27678: function (e, t, n) {
      'use strict';
      n.d(t, {
        g1: function () {
          return r;
        },
        os: function () {
          return o;
        },
      });
      function r() {
        var e = document.documentElement.clientWidth,
          t = window.innerHeight || document.documentElement.clientHeight;
        return { width: e, height: t };
      }
      function o(e) {
        var t = e.getBoundingClientRect(),
          n = document.documentElement;
        return {
          left:
            t.left +
            (window.pageXOffset || n.scrollLeft) -
            (n.clientLeft || document.body.clientLeft || 0),
          top:
            t.top +
            (window.pageYOffset || n.scrollTop) -
            (n.clientTop || document.body.clientTop || 0),
        };
      }
    },
    74204: function (e, t, n) {
      'use strict';
      var r;
      function o(e) {
        if ('undefined' === typeof document) return 0;
        if (e || void 0 === r) {
          var t = document.createElement('div');
          (t.style.width = '100%'), (t.style.height = '200px');
          var n = document.createElement('div'),
            o = n.style;
          (o.position = 'absolute'),
            (o.top = '0'),
            (o.left = '0'),
            (o.pointerEvents = 'none'),
            (o.visibility = 'hidden'),
            (o.width = '200px'),
            (o.height = '150px'),
            (o.overflow = 'hidden'),
            n.appendChild(t),
            document.body.appendChild(n);
          var a = t.offsetWidth;
          n.style.overflow = 'scroll';
          var i = t.offsetWidth;
          a === i && (i = n.clientWidth),
            document.body.removeChild(n),
            (r = a - i);
        }
        return r;
      }
      function a(e) {
        var t = e.match(/^(.*)px$/),
          n = Number(null === t || void 0 === t ? void 0 : t[1]);
        return Number.isNaN(n) ? o() : n;
      }
      function i(e) {
        if ('undefined' === typeof document || !e || !(e instanceof Element))
          return { width: 0, height: 0 };
        var t = getComputedStyle(e, '::-webkit-scrollbar'),
          n = t.width,
          r = t.height;
        return { width: a(n), height: a(r) };
      }
      n.d(t, {
        Z: function () {
          return o;
        },
        o: function () {
          return i;
        },
      });
    },
    64217: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return s;
        },
      });
      var r = n(28991),
        o =
          'accept acceptCharset accessKey action allowFullScreen allowTransparency\n    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge\n    charSet checked classID className colSpan cols content contentEditable contextMenu\n    controls coords crossOrigin data dateTime default defer dir disabled download draggable\n    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder\n    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity\n    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media\n    mediaGroup method min minLength multiple muted name noValidate nonce open\n    optimum pattern placeholder poster preload radioGroup readOnly rel required\n    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected\n    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style\n    summary tabIndex target title type useMap value width wmode wrap',
        a =
          'onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown\n    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick\n    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown\n    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel\n    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough\n    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata\n    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError',
        i = ''
          .concat(o, ' ')
          .concat(a)
          .split(/[\s\n]+/),
        l = 'aria-',
        c = 'data-';
      function u(e, t) {
        return 0 === e.indexOf(t);
      }
      function s(e) {
        var t,
          n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        t =
          !1 === n
            ? { aria: !0, data: !0, attr: !0 }
            : !0 === n
            ? { aria: !0 }
            : (0, r.Z)({}, n);
        var o = {};
        return (
          Object.keys(e).forEach(function (n) {
            ((t.aria && ('role' === n || u(n, l))) ||
              (t.data && u(n, c)) ||
              (t.attr && i.includes(n))) &&
              (o[n] = e[n]);
          }),
          o
        );
      }
    },
  },
]);
