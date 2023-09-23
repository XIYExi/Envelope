(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [2696],
  {
    44545: function (e, n, t) {
      'use strict';
      t.d(n, {
        Z: function () {
          return c;
        },
      });
      var r = t(28991),
        i = t(12924),
        o = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z',
                },
              },
            ],
          },
          name: 'ellipsis',
          theme: 'outlined',
        },
        a = o,
        l = t(13401),
        u = function (e, n) {
          return i.createElement(
            l.Z,
            (0, r.Z)((0, r.Z)({}, e), {}, { ref: n, icon: a }),
          );
        };
      u.displayName = 'EllipsisOutlined';
      var c = i.forwardRef(u);
    },
    95357: function (e, n, t) {
      'use strict';
      t.d(n, {
        Z: function () {
          return c;
        },
      });
      var r = t(28991),
        i = t(12924),
        o = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z',
                },
              },
            ],
          },
          name: 'eye',
          theme: 'outlined',
        },
        a = o,
        l = t(13401),
        u = function (e, n) {
          return i.createElement(
            l.Z,
            (0, r.Z)((0, r.Z)({}, e), {}, { ref: n, icon: a }),
          );
        };
      u.displayName = 'EyeOutlined';
      var c = i.forwardRef(u);
    },
    24308: function (e, n, t) {
      'use strict';
      t.d(n, {
        c4: function () {
          return o;
        },
      });
      var r = t(96156),
        i = t(22122),
        o = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'],
        a = {
          xs: '(max-width: 575px)',
          sm: '(min-width: 576px)',
          md: '(min-width: 768px)',
          lg: '(min-width: 992px)',
          xl: '(min-width: 1200px)',
          xxl: '(min-width: 1600px)',
        },
        l = new Map(),
        u = -1,
        c = {},
        s = {
          matchHandlers: {},
          dispatch: function (e) {
            return (
              (c = e),
              l.forEach(function (e) {
                return e(c);
              }),
              l.size >= 1
            );
          },
          subscribe: function (e) {
            return l.size || this.register(), (u += 1), l.set(u, e), e(c), u;
          },
          unsubscribe: function (e) {
            l['delete'](e), l.size || this.unregister();
          },
          unregister: function () {
            var e = this;
            Object.keys(a).forEach(function (n) {
              var t = a[n],
                r = e.matchHandlers[t];
              null === r ||
                void 0 === r ||
                r.mql.removeListener(
                  null === r || void 0 === r ? void 0 : r.listener,
                );
            }),
              l.clear();
          },
          register: function () {
            var e = this;
            Object.keys(a).forEach(function (n) {
              var t = a[n],
                o = function (t) {
                  var o = t.matches;
                  e.dispatch((0, i.Z)((0, i.Z)({}, c), (0, r.Z)({}, n, o)));
                },
                l = window.matchMedia(t);
              l.addListener(o),
                (e.matchHandlers[t] = { mql: l, listener: o }),
                o(l);
            });
          },
        };
      n['ZP'] = s;
    },
    94423: function (e, n, t) {
      'use strict';
      t.d(n, {
        iz: function () {
          return nn;
        },
        ck: function () {
          return xe;
        },
        BW: function () {
          return en;
        },
        sN: function () {
          return xe;
        },
        GP: function () {
          return en;
        },
        Wd: function () {
          return Ge;
        },
        ZP: function () {
          return rn;
        },
        Xl: function () {
          return k;
        },
      });
      var r = t(22122),
        i = t(96156),
        o = t(28991),
        a = t(85061),
        l = t(28481),
        u = t(81253),
        c = t(94184),
        s = t.n(c),
        f = t(19214),
        d = t(21770),
        v = t(80334),
        m = t(12924),
        p = t(11092),
        h = t(91881),
        Z = m.createContext(null);
      function y(e, n) {
        return void 0 === e ? null : ''.concat(e, '-').concat(n);
      }
      function b(e) {
        var n = m.useContext(Z);
        return y(n, e);
      }
      var g = t(56982),
        C = ['children', 'locked'],
        E = m.createContext(null);
      function x(e, n) {
        var t = (0, o.Z)({}, e);
        return (
          Object.keys(n).forEach(function (e) {
            var r = n[e];
            void 0 !== r && (t[e] = r);
          }),
          t
        );
      }
      function w(e) {
        var n = e.children,
          t = e.locked,
          r = (0, u.Z)(e, C),
          i = m.useContext(E),
          o = (0, g.Z)(
            function () {
              return x(i, r);
            },
            [i, r],
            function (e, n) {
              return !t && (e[0] !== n[0] || !(0, h.Z)(e[1], n[1], !0));
            },
          );
        return m.createElement(E.Provider, { value: o }, n);
      }
      var M = [],
        N = m.createContext(null);
      function I() {
        return m.useContext(N);
      }
      var S = m.createContext(M);
      function k(e) {
        var n = m.useContext(S);
        return m.useMemo(
          function () {
            return void 0 !== e ? [].concat((0, a.Z)(n), [e]) : n;
          },
          [n, e],
        );
      }
      var R = m.createContext(null),
        K = m.createContext({}),
        P = K,
        A = t(15105),
        O = t(75164),
        D = t(88603),
        z = A.Z.LEFT,
        T = A.Z.RIGHT,
        L = A.Z.UP,
        _ = A.Z.DOWN,
        V = A.Z.ENTER,
        F = A.Z.ESC,
        j = A.Z.HOME,
        W = A.Z.END,
        H = [L, _, z, T];
      function q(e, n, t, r) {
        var o,
          a,
          l,
          u,
          c = 'prev',
          s = 'next',
          f = 'children',
          d = 'parent';
        if ('inline' === e && r === V) return { inlineTrigger: !0 };
        var v = ((o = {}), (0, i.Z)(o, L, c), (0, i.Z)(o, _, s), o),
          m =
            ((a = {}),
            (0, i.Z)(a, z, t ? s : c),
            (0, i.Z)(a, T, t ? c : s),
            (0, i.Z)(a, _, f),
            (0, i.Z)(a, V, f),
            a),
          p =
            ((l = {}),
            (0, i.Z)(l, L, c),
            (0, i.Z)(l, _, s),
            (0, i.Z)(l, V, f),
            (0, i.Z)(l, F, d),
            (0, i.Z)(l, z, t ? f : d),
            (0, i.Z)(l, T, t ? d : f),
            l),
          h = {
            inline: v,
            horizontal: m,
            vertical: p,
            inlineSub: v,
            horizontalSub: p,
            verticalSub: p,
          },
          Z =
            null === (u = h[''.concat(e).concat(n ? '' : 'Sub')]) ||
            void 0 === u
              ? void 0
              : u[r];
        switch (Z) {
          case c:
            return { offset: -1, sibling: !0 };
          case s:
            return { offset: 1, sibling: !0 };
          case d:
            return { offset: -1, sibling: !1 };
          case f:
            return { offset: 1, sibling: !1 };
          default:
            return null;
        }
      }
      function G(e) {
        var n = e;
        while (n) {
          if (n.getAttribute('data-menu-list')) return n;
          n = n.parentElement;
        }
        return null;
      }
      function B(e, n) {
        var t = e || document.activeElement;
        while (t) {
          if (n.has(t)) return t;
          t = t.parentElement;
        }
        return null;
      }
      function X(e, n) {
        var t = (0, D.tS)(e, !0);
        return t.filter(function (e) {
          return n.has(e);
        });
      }
      function U(e, n, t) {
        var r =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1;
        if (!e) return null;
        var i = X(e, n),
          o = i.length,
          a = i.findIndex(function (e) {
            return t === e;
          });
        return (
          r < 0 ? (-1 === a ? (a = o - 1) : (a -= 1)) : r > 0 && (a += 1),
          (a = (a + o) % o),
          i[a]
        );
      }
      function Y(e, n, t, r, i, o, a, l, u, c) {
        var s = m.useRef(),
          f = m.useRef();
        f.current = n;
        var d = function () {
          O.Z.cancel(s.current);
        };
        return (
          m.useEffect(function () {
            return function () {
              d();
            };
          }, []),
          function (v) {
            var m = v.which;
            if ([].concat(H, [V, F, j, W]).includes(m)) {
              var p,
                h,
                Z,
                b = function () {
                  (p = new Set()), (h = new Map()), (Z = new Map());
                  var e = o();
                  return (
                    e.forEach(function (e) {
                      var n = document.querySelector(
                        "[data-menu-id='".concat(y(r, e), "']"),
                      );
                      n && (p.add(n), Z.set(n, e), h.set(e, n));
                    }),
                    p
                  );
                };
              b();
              var g = h.get(n),
                C = B(g, p),
                E = Z.get(C),
                x = q(e, 1 === a(E, !0).length, t, m);
              if (!x && m !== j && m !== W) return;
              (H.includes(m) || [j, W].includes(m)) && v.preventDefault();
              var w = function (e) {
                if (e) {
                  var n = e,
                    t = e.querySelector('a');
                  null !== t &&
                    void 0 !== t &&
                    t.getAttribute('href') &&
                    (n = t);
                  var r = Z.get(e);
                  l(r),
                    d(),
                    (s.current = (0, O.Z)(function () {
                      f.current === r && n.focus();
                    }));
                }
              };
              if ([j, W].includes(m) || x.sibling || !C) {
                var M, N;
                M = C && 'inline' !== e ? G(C) : i.current;
                var I = X(M, p);
                (N =
                  m === j
                    ? I[0]
                    : m === W
                    ? I[I.length - 1]
                    : U(M, p, C, x.offset)),
                  w(N);
              } else if (x.inlineTrigger) u(E);
              else if (x.offset > 0)
                u(E, !0),
                  d(),
                  (s.current = (0, O.Z)(function () {
                    b();
                    var e = C.getAttribute('aria-controls'),
                      n = document.getElementById(e),
                      t = U(n, p);
                    w(t);
                  }, 5));
              else if (x.offset < 0) {
                var S = a(E, !0),
                  k = S[S.length - 2],
                  R = h.get(k);
                u(k, !1), w(R);
              }
            }
            null === c || void 0 === c || c(v);
          }
        );
      }
      function J(e) {
        Promise.resolve().then(e);
      }
      var Q = '__RC_UTIL_PATH_SPLIT__',
        $ = function (e) {
          return e.join(Q);
        },
        ee = function (e) {
          return e.split(Q);
        },
        ne = 'rc-menu-more';
      function te() {
        var e = m.useState({}),
          n = (0, l.Z)(e, 2),
          t = n[1],
          r = (0, m.useRef)(new Map()),
          i = (0, m.useRef)(new Map()),
          o = m.useState([]),
          u = (0, l.Z)(o, 2),
          c = u[0],
          s = u[1],
          f = (0, m.useRef)(0),
          d = (0, m.useRef)(!1),
          v = function () {
            d.current || t({});
          },
          p = (0, m.useCallback)(function (e, n) {
            var t = $(n);
            i.current.set(t, e), r.current.set(e, t), (f.current += 1);
            var o = f.current;
            J(function () {
              o === f.current && v();
            });
          }, []),
          h = (0, m.useCallback)(function (e, n) {
            var t = $(n);
            i.current.delete(t), r.current.delete(e);
          }, []),
          Z = (0, m.useCallback)(function (e) {
            s(e);
          }, []),
          y = (0, m.useCallback)(
            function (e, n) {
              var t = r.current.get(e) || '',
                i = ee(t);
              return n && c.includes(i[0]) && i.unshift(ne), i;
            },
            [c],
          ),
          b = (0, m.useCallback)(
            function (e, n) {
              return e.some(function (e) {
                var t = y(e, !0);
                return t.includes(n);
              });
            },
            [y],
          ),
          g = function () {
            var e = (0, a.Z)(r.current.keys());
            return c.length && e.push(ne), e;
          },
          C = (0, m.useCallback)(function (e) {
            var n = ''.concat(r.current.get(e)).concat(Q),
              t = new Set();
            return (
              (0, a.Z)(i.current.keys()).forEach(function (e) {
                e.startsWith(n) && t.add(i.current.get(e));
              }),
              t
            );
          }, []);
        return (
          m.useEffect(function () {
            return function () {
              d.current = !0;
            };
          }, []),
          {
            registerPath: p,
            unregisterPath: h,
            refreshOverflowKeys: Z,
            isSubPathKey: b,
            getKeyPath: y,
            getKeys: g,
            getSubPathKeys: C,
          }
        );
      }
      function re(e) {
        var n = m.useRef(e);
        n.current = e;
        var t = m.useCallback(function () {
          for (var e, t = arguments.length, r = new Array(t), i = 0; i < t; i++)
            r[i] = arguments[i];
          return null === (e = n.current) || void 0 === e
            ? void 0
            : e.call.apply(e, [n].concat(r));
        }, []);
        return e ? t : void 0;
      }
      var ie = Math.random().toFixed(5).toString().slice(2),
        oe = 0;
      function ae(e) {
        var n = (0, d.Z)(e, { value: e }),
          t = (0, l.Z)(n, 2),
          r = t[0],
          i = t[1];
        return (
          m.useEffect(function () {
            oe += 1;
            var e = ''.concat(ie, '-').concat(oe);
            i('rc-menu-uuid-'.concat(e));
          }, []),
          r
        );
      }
      var le = t(6610),
        ue = t(5991),
        ce = t(10379),
        se = t(54070),
        fe = t(98423);
      function de(e, n, t, r) {
        var i = m.useContext(E),
          o = i.activeKey,
          a = i.onActive,
          l = i.onInactive,
          u = { active: o === e };
        return (
          n ||
            ((u.onMouseEnter = function (n) {
              null === t || void 0 === t || t({ key: e, domEvent: n }), a(e);
            }),
            (u.onMouseLeave = function (n) {
              null === r || void 0 === r || r({ key: e, domEvent: n }), l(e);
            })),
          u
        );
      }
      var ve = ['item'];
      function me(e) {
        var n = e.item,
          t = (0, u.Z)(e, ve);
        return (
          Object.defineProperty(t, 'item', {
            get: function () {
              return (
                (0, v.ZP)(
                  !1,
                  '`info.item` is deprecated since we will move to function component that not provides React Node instance in future.',
                ),
                n
              );
            },
          }),
          t
        );
      }
      function pe(e) {
        var n,
          t = e.icon,
          r = e.props,
          i = e.children;
        return (
          (n =
            'function' === typeof t ? m.createElement(t, (0, o.Z)({}, r)) : t),
          n || i || null
        );
      }
      function he(e) {
        var n = m.useContext(E),
          t = n.mode,
          r = n.rtl,
          i = n.inlineIndent;
        if ('inline' !== t) return null;
        var o = e;
        return r ? { paddingRight: o * i } : { paddingLeft: o * i };
      }
      var Ze = ['title', 'attribute', 'elementRef'],
        ye = [
          'style',
          'className',
          'eventKey',
          'warnKey',
          'disabled',
          'itemIcon',
          'children',
          'role',
          'onMouseEnter',
          'onMouseLeave',
          'onClick',
          'onKeyDown',
          'onFocus',
        ],
        be = ['active'],
        ge = (function (e) {
          (0, ce.Z)(t, e);
          var n = (0, se.Z)(t);
          function t() {
            return (0, le.Z)(this, t), n.apply(this, arguments);
          }
          return (
            (0, ue.Z)(t, [
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    n = e.title,
                    t = e.attribute,
                    i = e.elementRef,
                    o = (0, u.Z)(e, Ze),
                    a = (0, fe.Z)(o, ['eventKey']);
                  return (
                    (0, v.ZP)(
                      !t,
                      '`attribute` of Menu.Item is deprecated. Please pass attribute directly.',
                    ),
                    m.createElement(
                      f.Z.Item,
                      (0, r.Z)(
                        {},
                        t,
                        { title: 'string' === typeof n ? n : void 0 },
                        a,
                        { ref: i },
                      ),
                    )
                  );
                },
              },
            ]),
            t
          );
        })(m.Component),
        Ce = function (e) {
          var n,
            t = e.style,
            l = e.className,
            c = e.eventKey,
            f = (e.warnKey, e.disabled),
            d = e.itemIcon,
            v = e.children,
            p = e.role,
            h = e.onMouseEnter,
            Z = e.onMouseLeave,
            y = e.onClick,
            g = e.onKeyDown,
            C = e.onFocus,
            x = (0, u.Z)(e, ye),
            w = b(c),
            M = m.useContext(E),
            N = M.prefixCls,
            I = M.onItemClick,
            S = M.disabled,
            R = M.overflowDisabled,
            K = M.itemIcon,
            O = M.selectedKeys,
            D = M.onActive,
            z = m.useContext(P),
            T = z._internalRenderMenuItem,
            L = ''.concat(N, '-item'),
            _ = m.useRef(),
            V = m.useRef(),
            F = S || f,
            j = k(c);
          var W = function (e) {
              return {
                key: c,
                keyPath: (0, a.Z)(j).reverse(),
                item: _.current,
                domEvent: e,
              };
            },
            H = d || K,
            q = de(c, F, h, Z),
            G = q.active,
            B = (0, u.Z)(q, be),
            X = O.includes(c),
            U = he(j.length),
            Y = function (e) {
              if (!F) {
                var n = W(e);
                null === y || void 0 === y || y(me(n)), I(n);
              }
            },
            J = function (e) {
              if ((null === g || void 0 === g || g(e), e.which === A.Z.ENTER)) {
                var n = W(e);
                null === y || void 0 === y || y(me(n)), I(n);
              }
            },
            Q = function (e) {
              D(c), null === C || void 0 === C || C(e);
            },
            $ = {};
          'option' === e.role && ($['aria-selected'] = X);
          var ee = m.createElement(
            ge,
            (0, r.Z)(
              {
                ref: _,
                elementRef: V,
                role: null === p ? 'none' : p || 'menuitem',
                tabIndex: f ? null : -1,
                'data-menu-id': R && w ? null : w,
              },
              x,
              B,
              $,
              {
                component: 'li',
                'aria-disabled': f,
                style: (0, o.Z)((0, o.Z)({}, U), t),
                className: s()(
                  L,
                  ((n = {}),
                  (0, i.Z)(n, ''.concat(L, '-active'), G),
                  (0, i.Z)(n, ''.concat(L, '-selected'), X),
                  (0, i.Z)(n, ''.concat(L, '-disabled'), F),
                  n),
                  l,
                ),
                onClick: Y,
                onKeyDown: J,
                onFocus: Q,
              },
            ),
            v,
            m.createElement(pe, {
              props: (0, o.Z)((0, o.Z)({}, e), {}, { isSelected: X }),
              icon: H,
            }),
          );
          return T && (ee = T(ee, e, { selected: X })), ee;
        };
      function Ee(e) {
        var n = e.eventKey,
          t = I(),
          r = k(n);
        return (
          m.useEffect(
            function () {
              if (t)
                return (
                  t.registerPath(n, r),
                  function () {
                    t.unregisterPath(n, r);
                  }
                );
            },
            [r],
          ),
          t ? null : m.createElement(Ce, e)
        );
      }
      var xe = Ee,
        we = ['className', 'children'],
        Me = function (e, n) {
          var t = e.className,
            i = e.children,
            o = (0, u.Z)(e, we),
            a = m.useContext(E),
            l = a.prefixCls,
            c = a.mode,
            f = a.rtl;
          return m.createElement(
            'ul',
            (0, r.Z)(
              {
                className: s()(
                  l,
                  f && ''.concat(l, '-rtl'),
                  ''.concat(l, '-sub'),
                  ''
                    .concat(l, '-')
                    .concat('inline' === c ? 'inline' : 'vertical'),
                  t,
                ),
                role: 'menu',
              },
              o,
              { 'data-menu-list': !0, ref: n },
            ),
            i,
          );
        },
        Ne = m.forwardRef(Me);
      Ne.displayName = 'SubMenuList';
      var Ie = Ne,
        Se = t(90484),
        ke = t(50344),
        Re = ['label', 'children', 'key', 'type'];
      function Ke(e, n) {
        return (0, ke.Z)(e).map(function (e, t) {
          if (m.isValidElement(e)) {
            var r,
              i,
              o = e.key,
              l =
                null !==
                  (r =
                    null === (i = e.props) || void 0 === i
                      ? void 0
                      : i.eventKey) && void 0 !== r
                  ? r
                  : o,
              u = null === l || void 0 === l;
            u && (l = 'tmp_key-'.concat([].concat((0, a.Z)(n), [t]).join('-')));
            var c = { key: l, eventKey: l };
            return m.cloneElement(e, c);
          }
          return e;
        });
      }
      function Pe(e) {
        return (e || [])
          .map(function (e, n) {
            if (e && 'object' === (0, Se.Z)(e)) {
              var t = e,
                i = t.label,
                o = t.children,
                a = t.key,
                l = t.type,
                c = (0, u.Z)(t, Re),
                s = null !== a && void 0 !== a ? a : 'tmp-'.concat(n);
              return o || 'group' === l
                ? 'group' === l
                  ? m.createElement(
                      en,
                      (0, r.Z)({ key: s }, c, { title: i }),
                      Pe(o),
                    )
                  : m.createElement(
                      Ge,
                      (0, r.Z)({ key: s }, c, { title: i }),
                      Pe(o),
                    )
                : 'divider' === l
                ? m.createElement(nn, (0, r.Z)({ key: s }, c))
                : m.createElement(xe, (0, r.Z)({ key: s }, c), i);
            }
            return null;
          })
          .filter(function (e) {
            return e;
          });
      }
      function Ae(e, n, t) {
        var r = e;
        return n && (r = Pe(n)), Ke(r, t);
      }
      var Oe = t(2306),
        De = { adjustX: 1, adjustY: 1 },
        ze = {
          topLeft: { points: ['bl', 'tl'], overflow: De, offset: [0, -7] },
          bottomLeft: { points: ['tl', 'bl'], overflow: De, offset: [0, 7] },
          leftTop: { points: ['tr', 'tl'], overflow: De, offset: [-4, 0] },
          rightTop: { points: ['tl', 'tr'], overflow: De, offset: [4, 0] },
        },
        Te = {
          topLeft: { points: ['bl', 'tl'], overflow: De, offset: [0, -7] },
          bottomLeft: { points: ['tl', 'bl'], overflow: De, offset: [0, 7] },
          rightTop: { points: ['tr', 'tl'], overflow: De, offset: [-4, 0] },
          leftTop: { points: ['tl', 'tr'], overflow: De, offset: [4, 0] },
        };
      function Le(e, n, t) {
        return n || (t ? t[e] || t.other : void 0);
      }
      var _e = {
        horizontal: 'bottomLeft',
        vertical: 'rightTop',
        'vertical-left': 'rightTop',
        'vertical-right': 'leftTop',
      };
      function Ve(e) {
        var n = e.prefixCls,
          t = e.visible,
          r = e.children,
          a = e.popup,
          u = e.popupClassName,
          c = e.popupOffset,
          f = e.disabled,
          d = e.mode,
          v = e.onVisibleChange,
          p = m.useContext(E),
          h = p.getPopupContainer,
          Z = p.rtl,
          y = p.subMenuOpenDelay,
          b = p.subMenuCloseDelay,
          g = p.builtinPlacements,
          C = p.triggerSubMenuAction,
          x = p.forceSubMenuRender,
          w = p.rootClassName,
          M = p.motion,
          N = p.defaultMotions,
          I = m.useState(!1),
          S = (0, l.Z)(I, 2),
          k = S[0],
          R = S[1],
          K = Z ? (0, o.Z)((0, o.Z)({}, Te), g) : (0, o.Z)((0, o.Z)({}, ze), g),
          P = _e[d],
          A = Le(d, M, N),
          D = m.useRef(A);
        'inline' !== d && (D.current = A);
        var z = (0, o.Z)(
            (0, o.Z)({}, D.current),
            {},
            {
              leavedClassName: ''.concat(n, '-hidden'),
              removeOnLeave: !1,
              motionAppear: !0,
            },
          ),
          T = m.useRef();
        return (
          m.useEffect(
            function () {
              return (
                (T.current = (0, O.Z)(function () {
                  R(t);
                })),
                function () {
                  O.Z.cancel(T.current);
                }
              );
            },
            [t],
          ),
          m.createElement(
            Oe.Z,
            {
              prefixCls: n,
              popupClassName: s()(
                ''.concat(n, '-popup'),
                (0, i.Z)({}, ''.concat(n, '-rtl'), Z),
                u,
                w,
              ),
              stretch: 'horizontal' === d ? 'minWidth' : null,
              getPopupContainer: h,
              builtinPlacements: K,
              popupPlacement: P,
              popupVisible: k,
              popup: a,
              popupAlign: c && { offset: c },
              action: f ? [] : [C],
              mouseEnterDelay: y,
              mouseLeaveDelay: b,
              onPopupVisibleChange: v,
              forceRender: x,
              popupMotion: z,
            },
            r,
          )
        );
      }
      var Fe = t(63441);
      function je(e) {
        var n = e.id,
          t = e.open,
          i = e.keyPath,
          a = e.children,
          u = 'inline',
          c = m.useContext(E),
          s = c.prefixCls,
          f = c.forceSubMenuRender,
          d = c.motion,
          v = c.defaultMotions,
          p = c.mode,
          h = m.useRef(!1);
        h.current = p === u;
        var Z = m.useState(!h.current),
          y = (0, l.Z)(Z, 2),
          b = y[0],
          g = y[1],
          C = !!h.current && t;
        m.useEffect(
          function () {
            h.current && g(!1);
          },
          [p],
        );
        var x = (0, o.Z)({}, Le(u, d, v));
        i.length > 1 && (x.motionAppear = !1);
        var M = x.onVisibleChanged;
        return (
          (x.onVisibleChanged = function (e) {
            return (
              h.current || e || g(!0),
              null === M || void 0 === M ? void 0 : M(e)
            );
          }),
          b
            ? null
            : m.createElement(
                w,
                { mode: u, locked: !h.current },
                m.createElement(
                  Fe.default,
                  (0, r.Z)({ visible: C }, x, {
                    forceRender: f,
                    removeOnLeave: !1,
                    leavedClassName: ''.concat(s, '-hidden'),
                  }),
                  function (e) {
                    var t = e.className,
                      r = e.style;
                    return m.createElement(
                      Ie,
                      { id: n, className: t, style: r },
                      a,
                    );
                  },
                ),
              )
        );
      }
      var We = [
          'style',
          'className',
          'title',
          'eventKey',
          'warnKey',
          'disabled',
          'internalPopupClose',
          'children',
          'itemIcon',
          'expandIcon',
          'popupClassName',
          'popupOffset',
          'onClick',
          'onMouseEnter',
          'onMouseLeave',
          'onTitleClick',
          'onTitleMouseEnter',
          'onTitleMouseLeave',
        ],
        He = ['active'],
        qe = function (e) {
          var n,
            t = e.style,
            a = e.className,
            c = e.title,
            d = e.eventKey,
            v = (e.warnKey, e.disabled),
            p = e.internalPopupClose,
            h = e.children,
            Z = e.itemIcon,
            y = e.expandIcon,
            g = e.popupClassName,
            C = e.popupOffset,
            x = e.onClick,
            M = e.onMouseEnter,
            N = e.onMouseLeave,
            I = e.onTitleClick,
            S = e.onTitleMouseEnter,
            K = e.onTitleMouseLeave,
            A = (0, u.Z)(e, We),
            O = b(d),
            D = m.useContext(E),
            z = D.prefixCls,
            T = D.mode,
            L = D.openKeys,
            _ = D.disabled,
            V = D.overflowDisabled,
            F = D.activeKey,
            j = D.selectedKeys,
            W = D.itemIcon,
            H = D.expandIcon,
            q = D.onItemClick,
            G = D.onOpenChange,
            B = D.onActive,
            X = m.useContext(P),
            U = X._internalRenderSubMenuItem,
            Y = m.useContext(R),
            J = Y.isSubPathKey,
            Q = k(),
            $ = ''.concat(z, '-submenu'),
            ee = _ || v,
            ne = m.useRef(),
            te = m.useRef();
          var ie = Z || W,
            oe = y || H,
            ae = L.includes(d),
            le = !V && ae,
            ue = J(j, d),
            ce = de(d, ee, S, K),
            se = ce.active,
            fe = (0, u.Z)(ce, He),
            ve = m.useState(!1),
            Ze = (0, l.Z)(ve, 2),
            ye = Ze[0],
            be = Ze[1],
            ge = function (e) {
              ee || be(e);
            },
            Ce = function (e) {
              ge(!0), null === M || void 0 === M || M({ key: d, domEvent: e });
            },
            Ee = function (e) {
              ge(!1), null === N || void 0 === N || N({ key: d, domEvent: e });
            },
            xe = m.useMemo(
              function () {
                return se || ('inline' !== T && (ye || J([F], d)));
              },
              [T, se, F, ye, d, J],
            ),
            we = he(Q.length),
            Me = function (e) {
              ee ||
                (null === I || void 0 === I || I({ key: d, domEvent: e }),
                'inline' === T && G(d, !ae));
            },
            Ne = re(function (e) {
              null === x || void 0 === x || x(me(e)), q(e);
            }),
            Se = function (e) {
              'inline' !== T && G(d, e);
            },
            ke = function () {
              B(d);
            },
            Re = O && ''.concat(O, '-popup'),
            Ke = m.createElement(
              'div',
              (0, r.Z)(
                {
                  role: 'menuitem',
                  style: we,
                  className: ''.concat($, '-title'),
                  tabIndex: ee ? null : -1,
                  ref: ne,
                  title: 'string' === typeof c ? c : null,
                  'data-menu-id': V && O ? null : O,
                  'aria-expanded': le,
                  'aria-haspopup': !0,
                  'aria-controls': Re,
                  'aria-disabled': ee,
                  onClick: Me,
                  onFocus: ke,
                },
                fe,
              ),
              c,
              m.createElement(
                pe,
                {
                  icon: 'horizontal' !== T ? oe : null,
                  props: (0, o.Z)(
                    (0, o.Z)({}, e),
                    {},
                    { isOpen: le, isSubMenu: !0 },
                  ),
                },
                m.createElement('i', { className: ''.concat($, '-arrow') }),
              ),
            ),
            Pe = m.useRef(T);
          if (
            ('inline' !== T && Q.length > 1
              ? (Pe.current = 'vertical')
              : (Pe.current = T),
            !V)
          ) {
            var Ae = Pe.current;
            Ke = m.createElement(
              Ve,
              {
                mode: Ae,
                prefixCls: $,
                visible: !p && le && 'inline' !== T,
                popupClassName: g,
                popupOffset: C,
                popup: m.createElement(
                  w,
                  { mode: 'horizontal' === Ae ? 'vertical' : Ae },
                  m.createElement(Ie, { id: Re, ref: te }, h),
                ),
                disabled: ee,
                onVisibleChange: Se,
              },
              Ke,
            );
          }
          var Oe = m.createElement(
            f.Z.Item,
            (0, r.Z)({ role: 'none' }, A, {
              component: 'li',
              style: t,
              className: s()(
                $,
                ''.concat($, '-').concat(T),
                a,
                ((n = {}),
                (0, i.Z)(n, ''.concat($, '-open'), le),
                (0, i.Z)(n, ''.concat($, '-active'), xe),
                (0, i.Z)(n, ''.concat($, '-selected'), ue),
                (0, i.Z)(n, ''.concat($, '-disabled'), ee),
                n),
              ),
              onMouseEnter: Ce,
              onMouseLeave: Ee,
            }),
            Ke,
            !V && m.createElement(je, { id: Re, open: le, keyPath: Q }, h),
          );
          return (
            U &&
              (Oe = U(Oe, e, {
                selected: ue,
                active: xe,
                open: le,
                disabled: ee,
              })),
            m.createElement(
              w,
              {
                onItemClick: Ne,
                mode: 'horizontal' === T ? 'vertical' : T,
                itemIcon: ie,
                expandIcon: oe,
              },
              Oe,
            )
          );
        };
      function Ge(e) {
        var n,
          t = e.eventKey,
          r = e.children,
          i = k(t),
          o = Ke(r, i),
          a = I();
        return (
          m.useEffect(
            function () {
              if (a)
                return (
                  a.registerPath(t, i),
                  function () {
                    a.unregisterPath(t, i);
                  }
                );
            },
            [i],
          ),
          (n = a ? o : m.createElement(qe, e, o)),
          m.createElement(S.Provider, { value: i }, n)
        );
      }
      var Be = [
          'prefixCls',
          'rootClassName',
          'style',
          'className',
          'tabIndex',
          'items',
          'children',
          'direction',
          'id',
          'mode',
          'inlineCollapsed',
          'disabled',
          'disabledOverflow',
          'subMenuOpenDelay',
          'subMenuCloseDelay',
          'forceSubMenuRender',
          'defaultOpenKeys',
          'openKeys',
          'activeKey',
          'defaultActiveFirst',
          'selectable',
          'multiple',
          'defaultSelectedKeys',
          'selectedKeys',
          'onSelect',
          'onDeselect',
          'inlineIndent',
          'motion',
          'defaultMotions',
          'triggerSubMenuAction',
          'builtinPlacements',
          'itemIcon',
          'expandIcon',
          'overflowedIndicator',
          'overflowedIndicatorPopupClassName',
          'getPopupContainer',
          'onClick',
          'onOpenChange',
          'onKeyDown',
          'openAnimation',
          'openTransitionName',
          '_internalRenderMenuItem',
          '_internalRenderSubMenuItem',
        ],
        Xe = [],
        Ue = m.forwardRef(function (e, n) {
          var t,
            c,
            v = e,
            b = v.prefixCls,
            g = void 0 === b ? 'rc-menu' : b,
            C = v.rootClassName,
            E = v.style,
            x = v.className,
            M = v.tabIndex,
            I = void 0 === M ? 0 : M,
            S = v.items,
            k = v.children,
            K = v.direction,
            A = v.id,
            O = v.mode,
            D = void 0 === O ? 'vertical' : O,
            z = v.inlineCollapsed,
            T = v.disabled,
            L = v.disabledOverflow,
            _ = v.subMenuOpenDelay,
            V = void 0 === _ ? 0.1 : _,
            F = v.subMenuCloseDelay,
            j = void 0 === F ? 0.1 : F,
            W = v.forceSubMenuRender,
            H = v.defaultOpenKeys,
            q = v.openKeys,
            G = v.activeKey,
            B = v.defaultActiveFirst,
            X = v.selectable,
            U = void 0 === X || X,
            J = v.multiple,
            Q = void 0 !== J && J,
            $ = v.defaultSelectedKeys,
            ee = v.selectedKeys,
            ie = v.onSelect,
            oe = v.onDeselect,
            le = v.inlineIndent,
            ue = void 0 === le ? 24 : le,
            ce = v.motion,
            se = v.defaultMotions,
            fe = v.triggerSubMenuAction,
            de = void 0 === fe ? 'hover' : fe,
            ve = v.builtinPlacements,
            pe = v.itemIcon,
            he = v.expandIcon,
            Ze = v.overflowedIndicator,
            ye = void 0 === Ze ? '...' : Ze,
            be = v.overflowedIndicatorPopupClassName,
            ge = v.getPopupContainer,
            Ce = v.onClick,
            Ee = v.onOpenChange,
            we = v.onKeyDown,
            Me =
              (v.openAnimation,
              v.openTransitionName,
              v._internalRenderMenuItem),
            Ne = v._internalRenderSubMenuItem,
            Ie = (0, u.Z)(v, Be),
            Se = m.useMemo(
              function () {
                return Ae(k, S, Xe);
              },
              [k, S],
            ),
            ke = m.useState(!1),
            Re = (0, l.Z)(ke, 2),
            Ke = Re[0],
            Pe = Re[1],
            Oe = m.useRef(),
            De = ae(A),
            ze = 'rtl' === K;
          var Te = (0, d.Z)(H, {
              value: q,
              postState: function (e) {
                return e || Xe;
              },
            }),
            Le = (0, l.Z)(Te, 2),
            _e = Le[0],
            Ve = Le[1],
            Fe = function (e) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
              function t() {
                Ve(e), null === Ee || void 0 === Ee || Ee(e);
              }
              n ? (0, p.flushSync)(t) : t();
            },
            je = m.useState(_e),
            We = (0, l.Z)(je, 2),
            He = We[0],
            qe = We[1],
            Ue = m.useRef(!1),
            Ye = m.useMemo(
              function () {
                return ('inline' !== D && 'vertical' !== D) || !z
                  ? [D, !1]
                  : ['vertical', z];
              },
              [D, z],
            ),
            Je = (0, l.Z)(Ye, 2),
            Qe = Je[0],
            $e = Je[1],
            en = 'inline' === Qe,
            nn = m.useState(Qe),
            tn = (0, l.Z)(nn, 2),
            rn = tn[0],
            on = tn[1],
            an = m.useState($e),
            ln = (0, l.Z)(an, 2),
            un = ln[0],
            cn = ln[1];
          m.useEffect(
            function () {
              on(Qe), cn($e), Ue.current && (en ? Ve(He) : Fe(Xe));
            },
            [Qe, $e],
          );
          var sn = m.useState(0),
            fn = (0, l.Z)(sn, 2),
            dn = fn[0],
            vn = fn[1],
            mn = dn >= Se.length - 1 || 'horizontal' !== rn || L;
          m.useEffect(
            function () {
              en && qe(_e);
            },
            [_e],
          ),
            m.useEffect(function () {
              return (
                (Ue.current = !0),
                function () {
                  Ue.current = !1;
                }
              );
            }, []);
          var pn = te(),
            hn = pn.registerPath,
            Zn = pn.unregisterPath,
            yn = pn.refreshOverflowKeys,
            bn = pn.isSubPathKey,
            gn = pn.getKeyPath,
            Cn = pn.getKeys,
            En = pn.getSubPathKeys,
            xn = m.useMemo(
              function () {
                return { registerPath: hn, unregisterPath: Zn };
              },
              [hn, Zn],
            ),
            wn = m.useMemo(
              function () {
                return { isSubPathKey: bn };
              },
              [bn],
            );
          m.useEffect(
            function () {
              yn(
                mn
                  ? Xe
                  : Se.slice(dn + 1).map(function (e) {
                      return e.key;
                    }),
              );
            },
            [dn, mn],
          );
          var Mn = (0, d.Z)(
              G ||
                (B && (null === (t = Se[0]) || void 0 === t ? void 0 : t.key)),
              { value: G },
            ),
            Nn = (0, l.Z)(Mn, 2),
            In = Nn[0],
            Sn = Nn[1],
            kn = re(function (e) {
              Sn(e);
            }),
            Rn = re(function () {
              Sn(void 0);
            });
          (0, m.useImperativeHandle)(n, function () {
            return {
              list: Oe.current,
              focus: function (e) {
                var n,
                  t,
                  r,
                  i,
                  o =
                    null !== In && void 0 !== In
                      ? In
                      : null ===
                          (n = Se.find(function (e) {
                            return !e.props.disabled;
                          })) || void 0 === n
                      ? void 0
                      : n.key;
                o &&
                  (null === (t = Oe.current) ||
                    void 0 === t ||
                    null ===
                      (r = t.querySelector(
                        "li[data-menu-id='".concat(y(De, o), "']"),
                      )) ||
                    void 0 === r ||
                    null === (i = r.focus) ||
                    void 0 === i ||
                    i.call(r, e));
              },
            };
          });
          var Kn = (0, d.Z)($ || [], {
              value: ee,
              postState: function (e) {
                return Array.isArray(e)
                  ? e
                  : null === e || void 0 === e
                  ? Xe
                  : [e];
              },
            }),
            Pn = (0, l.Z)(Kn, 2),
            An = Pn[0],
            On = Pn[1],
            Dn = function (e) {
              if (U) {
                var n,
                  t = e.key,
                  r = An.includes(t);
                (n = Q
                  ? r
                    ? An.filter(function (e) {
                        return e !== t;
                      })
                    : [].concat((0, a.Z)(An), [t])
                  : [t]),
                  On(n);
                var i = (0, o.Z)((0, o.Z)({}, e), {}, { selectedKeys: n });
                r
                  ? null === oe || void 0 === oe || oe(i)
                  : null === ie || void 0 === ie || ie(i);
              }
              !Q && _e.length && 'inline' !== rn && Fe(Xe);
            },
            zn = re(function (e) {
              null === Ce || void 0 === Ce || Ce(me(e)), Dn(e);
            }),
            Tn = re(function (e, n) {
              var t = _e.filter(function (n) {
                return n !== e;
              });
              if (n) t.push(e);
              else if ('inline' !== rn) {
                var r = En(e);
                t = t.filter(function (e) {
                  return !r.has(e);
                });
              }
              (0, h.Z)(_e, t, !0) || Fe(t, !0);
            }),
            Ln = re(ge),
            _n = function (e, n) {
              var t = null !== n && void 0 !== n ? n : !_e.includes(e);
              Tn(e, t);
            },
            Vn = Y(rn, In, ze, De, Oe, Cn, gn, Sn, _n, we);
          m.useEffect(function () {
            Pe(!0);
          }, []);
          var Fn = m.useMemo(
              function () {
                return {
                  _internalRenderMenuItem: Me,
                  _internalRenderSubMenuItem: Ne,
                };
              },
              [Me, Ne],
            ),
            jn =
              'horizontal' !== rn || L
                ? Se
                : Se.map(function (e, n) {
                    return m.createElement(
                      w,
                      { key: e.key, overflowDisabled: n > dn },
                      e,
                    );
                  }),
            Wn = m.createElement(
              f.Z,
              (0, r.Z)(
                {
                  id: A,
                  ref: Oe,
                  prefixCls: ''.concat(g, '-overflow'),
                  component: 'ul',
                  itemComponent: xe,
                  className: s()(
                    g,
                    ''.concat(g, '-root'),
                    ''.concat(g, '-').concat(rn),
                    x,
                    ((c = {}),
                    (0, i.Z)(c, ''.concat(g, '-inline-collapsed'), un),
                    (0, i.Z)(c, ''.concat(g, '-rtl'), ze),
                    c),
                    C,
                  ),
                  dir: K,
                  style: E,
                  role: 'menu',
                  tabIndex: I,
                  data: jn,
                  renderRawItem: function (e) {
                    return e;
                  },
                  renderRawRest: function (e) {
                    var n = e.length,
                      t = n ? Se.slice(-n) : null;
                    return m.createElement(
                      Ge,
                      {
                        eventKey: ne,
                        title: ye,
                        disabled: mn,
                        internalPopupClose: 0 === n,
                        popupClassName: be,
                      },
                      t,
                    );
                  },
                  maxCount:
                    'horizontal' !== rn || L ? f.Z.INVALIDATE : f.Z.RESPONSIVE,
                  ssr: 'full',
                  'data-menu-list': !0,
                  onVisibleChange: function (e) {
                    vn(e);
                  },
                  onKeyDown: Vn,
                },
                Ie,
              ),
            );
          return m.createElement(
            P.Provider,
            { value: Fn },
            m.createElement(
              Z.Provider,
              { value: De },
              m.createElement(
                w,
                {
                  prefixCls: g,
                  rootClassName: C,
                  mode: rn,
                  openKeys: _e,
                  rtl: ze,
                  disabled: T,
                  motion: Ke ? ce : null,
                  defaultMotions: Ke ? se : null,
                  activeKey: In,
                  onActive: kn,
                  onInactive: Rn,
                  selectedKeys: An,
                  inlineIndent: ue,
                  subMenuOpenDelay: V,
                  subMenuCloseDelay: j,
                  forceSubMenuRender: W,
                  builtinPlacements: ve,
                  triggerSubMenuAction: de,
                  getPopupContainer: Ln,
                  itemIcon: pe,
                  expandIcon: he,
                  onItemClick: zn,
                  onOpenChange: Tn,
                },
                m.createElement(R.Provider, { value: wn }, Wn),
                m.createElement(
                  'div',
                  { style: { display: 'none' }, 'aria-hidden': !0 },
                  m.createElement(N.Provider, { value: xn }, Se),
                ),
              ),
            ),
          );
        }),
        Ye = Ue,
        Je = ['className', 'title', 'eventKey', 'children'],
        Qe = ['children'],
        $e = function (e) {
          var n = e.className,
            t = e.title,
            i = (e.eventKey, e.children),
            o = (0, u.Z)(e, Je),
            a = m.useContext(E),
            l = a.prefixCls,
            c = ''.concat(l, '-item-group');
          return m.createElement(
            'li',
            (0, r.Z)({ role: 'presentation' }, o, {
              onClick: function (e) {
                return e.stopPropagation();
              },
              className: s()(c, n),
            }),
            m.createElement(
              'div',
              {
                role: 'presentation',
                className: ''.concat(c, '-title'),
                title: 'string' === typeof t ? t : void 0,
              },
              t,
            ),
            m.createElement(
              'ul',
              { role: 'group', className: ''.concat(c, '-list') },
              i,
            ),
          );
        };
      function en(e) {
        var n = e.children,
          t = (0, u.Z)(e, Qe),
          r = k(t.eventKey),
          i = Ke(n, r),
          o = I();
        return o ? i : m.createElement($e, (0, fe.Z)(t, ['warnKey']), i);
      }
      function nn(e) {
        var n = e.className,
          t = e.style,
          r = m.useContext(E),
          i = r.prefixCls,
          o = I();
        return o
          ? null
          : m.createElement('li', {
              className: s()(''.concat(i, '-item-divider'), n),
              style: t,
            });
      }
      var tn = Ye;
      (tn.Item = xe), (tn.SubMenu = Ge), (tn.ItemGroup = en), (tn.Divider = nn);
      var rn = tn;
    },
    19214: function (e, n, t) {
      'use strict';
      t.d(n, {
        Z: function () {
          return O;
        },
      });
      var r = t(22122),
        i = t(28991),
        o = t(28481),
        a = t(81253),
        l = t(12924),
        u = t(94184),
        c = t.n(u),
        s = t(48717),
        f = t(8410),
        d = [
          'prefixCls',
          'invalidate',
          'item',
          'renderItem',
          'responsive',
          'responsiveDisabled',
          'registerSize',
          'itemKey',
          'className',
          'style',
          'children',
          'display',
          'order',
          'component',
        ],
        v = void 0;
      function m(e, n) {
        var t = e.prefixCls,
          o = e.invalidate,
          u = e.item,
          f = e.renderItem,
          m = e.responsive,
          p = e.responsiveDisabled,
          h = e.registerSize,
          Z = e.itemKey,
          y = e.className,
          b = e.style,
          g = e.children,
          C = e.display,
          E = e.order,
          x = e.component,
          w = void 0 === x ? 'div' : x,
          M = (0, a.Z)(e, d),
          N = m && !C;
        function I(e) {
          h(Z, e);
        }
        l.useEffect(function () {
          return function () {
            I(null);
          };
        }, []);
        var S,
          k = f && u !== v ? f(u) : g;
        o ||
          (S = {
            opacity: N ? 0 : 1,
            height: N ? 0 : v,
            overflowY: N ? 'hidden' : v,
            order: m ? E : v,
            pointerEvents: N ? 'none' : v,
            position: N ? 'absolute' : v,
          });
        var R = {};
        N && (R['aria-hidden'] = !0);
        var K = l.createElement(
          w,
          (0, r.Z)(
            { className: c()(!o && t, y), style: (0, i.Z)((0, i.Z)({}, S), b) },
            R,
            M,
            { ref: n },
          ),
          k,
        );
        return (
          m &&
            (K = l.createElement(
              s.Z,
              {
                onResize: function (e) {
                  var n = e.offsetWidth;
                  I(n);
                },
                disabled: p,
              },
              K,
            )),
          K
        );
      }
      var p = l.forwardRef(m);
      p.displayName = 'Item';
      var h = p,
        Z = t(75164),
        y = t(30470);
      function b() {
        var e = (0, y.Z)({}),
          n = (0, o.Z)(e, 2),
          t = n[1],
          r = (0, l.useRef)([]),
          i = 0,
          a = 0;
        function u(e) {
          var n = i;
          (i += 1), r.current.length < n + 1 && (r.current[n] = e);
          var o = r.current[n];
          function l(e) {
            (r.current[n] = 'function' === typeof e ? e(r.current[n]) : e),
              Z.Z.cancel(a),
              (a = (0, Z.Z)(function () {
                t({}, !0);
              }));
          }
          return [o, l];
        }
        return u;
      }
      var g = ['component'],
        C = ['className'],
        E = ['className'],
        x = function (e, n) {
          var t = l.useContext(I);
          if (!t) {
            var i = e.component,
              o = void 0 === i ? 'div' : i,
              u = (0, a.Z)(e, g);
            return l.createElement(o, (0, r.Z)({}, u, { ref: n }));
          }
          var s = t.className,
            f = (0, a.Z)(t, C),
            d = e.className,
            v = (0, a.Z)(e, E);
          return l.createElement(
            I.Provider,
            { value: null },
            l.createElement(
              h,
              (0, r.Z)({ ref: n, className: c()(s, d) }, f, v),
            ),
          );
        },
        w = l.forwardRef(x);
      w.displayName = 'RawItem';
      var M = w,
        N = [
          'prefixCls',
          'data',
          'renderItem',
          'renderRawItem',
          'itemKey',
          'itemWidth',
          'ssr',
          'style',
          'className',
          'maxCount',
          'renderRest',
          'renderRawRest',
          'suffix',
          'component',
          'itemComponent',
          'onVisibleChange',
        ],
        I = l.createContext(null),
        S = 'responsive',
        k = 'invalidate';
      function R(e) {
        return '+ '.concat(e.length, ' ...');
      }
      function K(e, n) {
        var t = e.prefixCls,
          u = void 0 === t ? 'rc-overflow' : t,
          d = e.data,
          v = void 0 === d ? [] : d,
          m = e.renderItem,
          p = e.renderRawItem,
          Z = e.itemKey,
          y = e.itemWidth,
          g = void 0 === y ? 10 : y,
          C = e.ssr,
          E = e.style,
          x = e.className,
          w = e.maxCount,
          M = e.renderRest,
          K = e.renderRawRest,
          P = e.suffix,
          A = e.component,
          O = void 0 === A ? 'div' : A,
          D = e.itemComponent,
          z = e.onVisibleChange,
          T = (0, a.Z)(e, N),
          L = b(),
          _ = 'full' === C,
          V = L(null),
          F = (0, o.Z)(V, 2),
          j = F[0],
          W = F[1],
          H = j || 0,
          q = L(new Map()),
          G = (0, o.Z)(q, 2),
          B = G[0],
          X = G[1],
          U = L(0),
          Y = (0, o.Z)(U, 2),
          J = Y[0],
          Q = Y[1],
          $ = L(0),
          ee = (0, o.Z)($, 2),
          ne = ee[0],
          te = ee[1],
          re = L(0),
          ie = (0, o.Z)(re, 2),
          oe = ie[0],
          ae = ie[1],
          le = (0, l.useState)(null),
          ue = (0, o.Z)(le, 2),
          ce = ue[0],
          se = ue[1],
          fe = (0, l.useState)(null),
          de = (0, o.Z)(fe, 2),
          ve = de[0],
          me = de[1],
          pe = l.useMemo(
            function () {
              return null === ve && _ ? Number.MAX_SAFE_INTEGER : ve || 0;
            },
            [ve, j],
          ),
          he = (0, l.useState)(!1),
          Ze = (0, o.Z)(he, 2),
          ye = Ze[0],
          be = Ze[1],
          ge = ''.concat(u, '-item'),
          Ce = Math.max(J, ne),
          Ee = w === S,
          xe = v.length && Ee,
          we = w === k,
          Me = xe || ('number' === typeof w && v.length > w),
          Ne = (0, l.useMemo)(
            function () {
              var e = v;
              return (
                xe
                  ? (e =
                      null === j && _
                        ? v
                        : v.slice(0, Math.min(v.length, H / g)))
                  : 'number' === typeof w && (e = v.slice(0, w)),
                e
              );
            },
            [v, g, j, w, xe],
          ),
          Ie = (0, l.useMemo)(
            function () {
              return xe ? v.slice(pe + 1) : v.slice(Ne.length);
            },
            [v, Ne, xe, pe],
          ),
          Se = (0, l.useCallback)(
            function (e, n) {
              var t;
              return 'function' === typeof Z
                ? Z(e)
                : null !==
                    (t = Z && (null === e || void 0 === e ? void 0 : e[Z])) &&
                  void 0 !== t
                ? t
                : n;
            },
            [Z],
          ),
          ke = (0, l.useCallback)(
            m ||
              function (e) {
                return e;
              },
            [m],
          );
        function Re(e, n, t) {
          (ve !== e || (void 0 !== n && n !== ce)) &&
            (me(e),
            t || (be(e < v.length - 1), null === z || void 0 === z || z(e)),
            void 0 !== n && se(n));
        }
        function Ke(e, n) {
          W(n.clientWidth);
        }
        function Pe(e, n) {
          X(function (t) {
            var r = new Map(t);
            return null === n ? r.delete(e) : r.set(e, n), r;
          });
        }
        function Ae(e, n) {
          te(n), Q(ne);
        }
        function Oe(e, n) {
          ae(n);
        }
        function De(e) {
          return B.get(Se(Ne[e], e));
        }
        (0, f.Z)(
          function () {
            if (H && Ce && Ne) {
              var e = oe,
                n = Ne.length,
                t = n - 1;
              if (!n) return void Re(0, null);
              for (var r = 0; r < n; r += 1) {
                var i = De(r);
                if ((_ && (i = i || 0), void 0 === i)) {
                  Re(r - 1, void 0, !0);
                  break;
                }
                if (
                  ((e += i),
                  (0 === t && e <= H) || (r === t - 1 && e + De(t) <= H))
                ) {
                  Re(t, null);
                  break;
                }
                if (e + Ce > H) {
                  Re(r - 1, e - i - oe + ne);
                  break;
                }
              }
              P && De(0) + oe > H && se(null);
            }
          },
          [H, B, ne, oe, Se, Ne],
        );
        var ze = ye && !!Ie.length,
          Te = {};
        null !== ce && xe && (Te = { position: 'absolute', left: ce, top: 0 });
        var Le,
          _e = { prefixCls: ge, responsive: xe, component: D, invalidate: we },
          Ve = p
            ? function (e, n) {
                var t = Se(e, n);
                return l.createElement(
                  I.Provider,
                  {
                    key: t,
                    value: (0, i.Z)(
                      (0, i.Z)({}, _e),
                      {},
                      {
                        order: n,
                        item: e,
                        itemKey: t,
                        registerSize: Pe,
                        display: n <= pe,
                      },
                    ),
                  },
                  p(e, n),
                );
              }
            : function (e, n) {
                var t = Se(e, n);
                return l.createElement(
                  h,
                  (0, r.Z)({}, _e, {
                    order: n,
                    key: t,
                    item: e,
                    renderItem: ke,
                    itemKey: t,
                    registerSize: Pe,
                    display: n <= pe,
                  }),
                );
              },
          Fe = {
            order: ze ? pe : Number.MAX_SAFE_INTEGER,
            className: ''.concat(ge, '-rest'),
            registerSize: Ae,
            display: ze,
          };
        if (K)
          K &&
            (Le = l.createElement(
              I.Provider,
              { value: (0, i.Z)((0, i.Z)({}, _e), Fe) },
              K(Ie),
            ));
        else {
          var je = M || R;
          Le = l.createElement(
            h,
            (0, r.Z)({}, _e, Fe),
            'function' === typeof je ? je(Ie) : je,
          );
        }
        var We = l.createElement(
          O,
          (0, r.Z)({ className: c()(!we && u, x), style: E, ref: n }, T),
          Ne.map(Ve),
          Me ? Le : null,
          P &&
            l.createElement(
              h,
              (0, r.Z)({}, _e, {
                responsive: Ee,
                responsiveDisabled: !xe,
                order: pe,
                className: ''.concat(ge, '-suffix'),
                registerSize: Oe,
                display: !0,
                style: Te,
              }),
              P,
            ),
        );
        return (
          Ee &&
            (We = l.createElement(s.Z, { onResize: Ke, disabled: !xe }, We)),
          We
        );
      }
      var P = l.forwardRef(K);
      (P.displayName = 'Overflow'),
        (P.Item = M),
        (P.RESPONSIVE = S),
        (P.INVALIDATE = k);
      var A = P,
        O = A;
    },
    88603: function (e, n, t) {
      'use strict';
      t.d(n, {
        tS: function () {
          return a;
        },
      });
      var r = t(85061),
        i = t(5110);
      function o(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if ((0, i.Z)(e)) {
          var t = e.nodeName.toLowerCase(),
            r =
              ['input', 'select', 'textarea', 'button'].includes(t) ||
              e.isContentEditable ||
              ('a' === t && !!e.getAttribute('href')),
            o = e.getAttribute('tabindex'),
            a = Number(o),
            l = null;
          return (
            o && !Number.isNaN(a) ? (l = a) : r && null === l && (l = 0),
            r && e.disabled && (l = null),
            null !== l && (l >= 0 || (n && l < 0))
          );
        }
        return !1;
      }
      function a(e) {
        var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
          t = (0, r.Z)(e.querySelectorAll('*')).filter(function (e) {
            return o(e, n);
          });
        return o(e, n) && t.unshift(e), t;
      }
    },
  },
]);
