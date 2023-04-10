(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7540],
  {
    99165: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return s;
        },
      });
      var o = n(28991),
        i = n(12924),
        r = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z',
                },
              },
            ],
          },
          name: 'copy',
          theme: 'outlined',
        },
        u = r,
        a = n(13401),
        c = function (e, t) {
          return i.createElement(
            a.Z,
            (0, o.Z)((0, o.Z)({}, e), {}, { ref: t, icon: u }),
          );
        };
      c.displayName = 'CopyOutlined';
      var s = i.forwardRef(c);
    },
    33603: function (e, t, n) {
      'use strict';
      n.d(t, {
        mL: function () {
          return l;
        },
        q0: function () {
          return s;
        },
      });
      var o = n(93355),
        i = function () {
          return { height: 0, opacity: 0 };
        },
        r = function (e) {
          var t = e.scrollHeight;
          return { height: t, opacity: 1 };
        },
        u = function (e) {
          return { height: e ? e.offsetHeight : 0 };
        },
        a = function (e, t) {
          return (
            !0 === (null === t || void 0 === t ? void 0 : t.deadline) ||
            'height' === t.propertyName
          );
        },
        c = {
          motionName: 'ant-motion-collapse',
          onAppearStart: i,
          onEnterStart: i,
          onAppearActive: r,
          onEnterActive: r,
          onLeaveStart: u,
          onLeaveActive: i,
          onAppearEnd: a,
          onEnterEnd: a,
          onLeaveEnd: a,
          motionDeadline: 500,
        },
        s =
          ((0, o.b)('bottomLeft', 'bottomRight', 'topLeft', 'topRight'),
          function (e) {
            return void 0 === e || ('topLeft' !== e && 'topRight' !== e)
              ? 'slide-up'
              : 'slide-down';
          }),
        l = function (e, t, n) {
          return void 0 !== n ? n : ''.concat(e, '-').concat(t);
        };
      t['ZP'] = c;
    },
    48717: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return O;
        },
      });
      var o = n(22122),
        i = n(12924),
        r = n(50344),
        u = (n(80334), n(28991)),
        a = n(42550),
        c = n(34203),
        s = n(91033),
        l = new Map();
      function f(e) {
        e.forEach(function (e) {
          var t,
            n = e.target;
          null === (t = l.get(n)) ||
            void 0 === t ||
            t.forEach(function (e) {
              return e(n);
            });
        });
      }
      var p = new s.default(f);
      function d(e, t) {
        l.has(e) || (l.set(e, new Set()), p.observe(e)), l.get(e).add(t);
      }
      function h(e, t) {
        l.has(e) &&
          (l.get(e).delete(t), l.get(e).size || (p.unobserve(e), l.delete(e)));
      }
      var v = n(6610),
        m = n(5991),
        g = n(10379),
        w = n(54070),
        y = (function (e) {
          (0, g.Z)(n, e);
          var t = (0, w.Z)(n);
          function n() {
            return (0, v.Z)(this, n), t.apply(this, arguments);
          }
          return (
            (0, m.Z)(n, [
              {
                key: 'render',
                value: function () {
                  return this.props.children;
                },
              },
            ]),
            n
          );
        })(i.Component),
        b = i.createContext(null);
      function E(e) {
        var t = e.children,
          n = e.onBatchResize,
          o = i.useRef(0),
          r = i.useRef([]),
          u = i.useContext(b),
          a = i.useCallback(
            function (e, t, i) {
              o.current += 1;
              var a = o.current;
              r.current.push({ size: e, element: t, data: i }),
                Promise.resolve().then(function () {
                  a === o.current &&
                    (null === n || void 0 === n || n(r.current),
                    (r.current = []));
                }),
                null === u || void 0 === u || u(e, t, i);
            },
            [n, u],
          );
        return i.createElement(b.Provider, { value: a }, t);
      }
      function M(e, t) {
        var n = e.children,
          o = e.disabled,
          r = i.useRef(null),
          s = i.useRef(null),
          l = i.useContext(b),
          f = 'function' === typeof n,
          p = f ? n(r) : n,
          v = i.useRef({
            width: -1,
            height: -1,
            offsetWidth: -1,
            offsetHeight: -1,
          }),
          m = !f && i.isValidElement(p) && (0, a.Yr)(p),
          g = m ? p.ref : null,
          w = i.useMemo(
            function () {
              return (0, a.sQ)(g, r);
            },
            [g, r],
          ),
          E = function () {
            return (0, c.Z)(r.current) || (0, c.Z)(s.current);
          };
        i.useImperativeHandle(t, function () {
          return E();
        });
        var M = i.useRef(e);
        M.current = e;
        var C = i.useCallback(function (e) {
          var t = M.current,
            n = t.onResize,
            o = t.data,
            i = e.getBoundingClientRect(),
            r = i.width,
            a = i.height,
            c = e.offsetWidth,
            s = e.offsetHeight,
            f = Math.floor(r),
            p = Math.floor(a);
          if (
            v.current.width !== f ||
            v.current.height !== p ||
            v.current.offsetWidth !== c ||
            v.current.offsetHeight !== s
          ) {
            var d = { width: f, height: p, offsetWidth: c, offsetHeight: s };
            v.current = d;
            var h = c === Math.round(r) ? r : c,
              m = s === Math.round(a) ? a : s,
              g = (0, u.Z)(
                (0, u.Z)({}, d),
                {},
                { offsetWidth: h, offsetHeight: m },
              );
            null === l || void 0 === l || l(g, e, o),
              n &&
                Promise.resolve().then(function () {
                  n(g, e);
                });
          }
        }, []);
        return (
          i.useEffect(
            function () {
              var e = E();
              return (
                e && !o && d(e, C),
                function () {
                  return h(e, C);
                }
              );
            },
            [r.current, o],
          ),
          i.createElement(y, { ref: s }, m ? i.cloneElement(p, { ref: w }) : p)
        );
      }
      var C = i.forwardRef(M);
      var T = C,
        Z = 'rc-observer-key';
      function P(e, t) {
        var n = e.children,
          u = 'function' === typeof n ? [n] : (0, r.Z)(n);
        return u.map(function (n, r) {
          var u =
            (null === n || void 0 === n ? void 0 : n.key) ||
            ''.concat(Z, '-').concat(r);
          return i.createElement(
            T,
            (0, o.Z)({}, e, { key: u, ref: 0 === r ? t : void 0 }),
            n,
          );
        });
      }
      var x = i.forwardRef(P);
      x.Collection = E;
      var O = x;
    },
    2306: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return Vt;
        },
      });
      var o = n(28991),
        i = n(22122),
        r = n(6610),
        u = n(5991),
        a = n(63349),
        c = n(10379),
        s = n(54070),
        l = n(96156),
        f = n(12924),
        p = n.n(f),
        d = n(11092),
        h = n.n(d),
        v = n(75164),
        m = n(94999),
        g = n(34203),
        w = n(42550),
        y = n(64019),
        b = n(98924),
        E = (0, f.forwardRef)(function (e, t) {
          var n = e.didUpdate,
            o = e.getContainer,
            i = e.children,
            r = (0, f.useRef)(),
            u = (0, f.useRef)();
          (0, f.useImperativeHandle)(t, function () {
            return {};
          });
          var a = (0, f.useRef)(!1);
          return (
            !a.current &&
              (0, b.Z)() &&
              ((u.current = o()),
              (r.current = u.current.parentNode),
              (a.current = !0)),
            (0, f.useEffect)(function () {
              null === n || void 0 === n || n(e);
            }),
            (0, f.useEffect)(function () {
              return (
                null === u.current.parentNode &&
                  null !== r.current &&
                  r.current.appendChild(u.current),
                function () {
                  var e, t;
                  null === (e = u.current) ||
                    void 0 === e ||
                    null === (t = e.parentNode) ||
                    void 0 === t ||
                    t.removeChild(u.current);
                }
              );
            }, []),
            u.current ? h().createPortal(i, u.current) : null
          );
        }),
        M = E,
        C = n(94184),
        T = n.n(C);
      function Z(e, t, n) {
        return n ? e[0] === t[0] : e[0] === t[0] && e[1] === t[1];
      }
      function P(e, t, n) {
        var i = e[t] || {};
        return (0, o.Z)((0, o.Z)({}, i), n);
      }
      function x(e, t, n, o) {
        for (
          var i = n.points, r = Object.keys(e), u = 0;
          u < r.length;
          u += 1
        ) {
          var a = r[u];
          if (Z(e[a].points, i, o))
            return ''.concat(t, '-placement-').concat(a);
        }
        return '';
      }
      var O = n(28481),
        k = n(81253),
        N = n(31131),
        S = n(63441);
      function R(e) {
        var t = e.prefixCls,
          n = e.motion,
          o = e.animation,
          i = e.transitionName;
        return (
          n ||
          (o
            ? { motionName: ''.concat(t, '-').concat(o) }
            : i
            ? { motionName: i }
            : null)
        );
      }
      function D(e) {
        var t = e.prefixCls,
          n = e.visible,
          r = e.zIndex,
          u = e.mask,
          a = e.maskMotion,
          c = e.maskAnimation,
          s = e.maskTransitionName;
        if (!u) return null;
        var l = {};
        return (
          (a || s || c) &&
            (l = (0, o.Z)(
              { motionAppear: !0 },
              R({ motion: a, prefixCls: t, transitionName: s, animation: c }),
            )),
          f.createElement(
            S.default,
            (0, i.Z)({}, l, { visible: n, removeOnLeave: !0 }),
            function (e) {
              var n = e.className;
              return f.createElement('div', {
                style: { zIndex: r },
                className: T()(''.concat(t, '-mask'), n),
              });
            },
          )
        );
      }
      var A,
        H = n(90484);
      function L(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var o = Object.getOwnPropertySymbols(e);
          t &&
            (o = o.filter(function (t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, o);
        }
        return n;
      }
      function V(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? L(Object(n), !0).forEach(function (t) {
                _(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : L(Object(n)).forEach(function (t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
        }
        return e;
      }
      function I(e) {
        return (
          (I =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e;
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e;
                }),
          I(e)
        );
      }
      function _(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      var U = { Webkit: '-webkit-', Moz: '-moz-', ms: '-ms-', O: '-o-' };
      function W() {
        if (void 0 !== A) return A;
        A = '';
        var e = document.createElement('p').style,
          t = 'Transform';
        for (var n in U) n + t in e && (A = n);
        return A;
      }
      function F() {
        return W()
          ? ''.concat(W(), 'TransitionProperty')
          : 'transitionProperty';
      }
      function B() {
        return W() ? ''.concat(W(), 'Transform') : 'transform';
      }
      function j(e, t) {
        var n = F();
        n &&
          ((e.style[n] = t),
          'transitionProperty' !== n && (e.style.transitionProperty = t));
      }
      function z(e, t) {
        var n = B();
        n && ((e.style[n] = t), 'transform' !== n && (e.style.transform = t));
      }
      function Y(e) {
        return e.style.transitionProperty || e.style[F()];
      }
      function X(e) {
        var t = window.getComputedStyle(e, null),
          n = t.getPropertyValue('transform') || t.getPropertyValue(B());
        if (n && 'none' !== n) {
          var o = n.replace(/[^0-9\-.,]/g, '').split(',');
          return {
            x: parseFloat(o[12] || o[4], 0),
            y: parseFloat(o[13] || o[5], 0),
          };
        }
        return { x: 0, y: 0 };
      }
      var K = /matrix\((.*)\)/,
        G = /matrix3d\((.*)\)/;
      function Q(e, t) {
        var n = window.getComputedStyle(e, null),
          o = n.getPropertyValue('transform') || n.getPropertyValue(B());
        if (o && 'none' !== o) {
          var i,
            r = o.match(K);
          if (r)
            (r = r[1]),
              (i = r.split(',').map(function (e) {
                return parseFloat(e, 10);
              })),
              (i[4] = t.x),
              (i[5] = t.y),
              z(e, 'matrix('.concat(i.join(','), ')'));
          else {
            var u = o.match(G)[1];
            (i = u.split(',').map(function (e) {
              return parseFloat(e, 10);
            })),
              (i[12] = t.x),
              (i[13] = t.y),
              z(e, 'matrix3d('.concat(i.join(','), ')'));
          }
        } else
          z(
            e,
            'translateX('
              .concat(t.x, 'px) translateY(')
              .concat(t.y, 'px) translateZ(0)'),
          );
      }
      var q,
        $ = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source;
      function J(e) {
        var t = e.style.display;
        (e.style.display = 'none'), e.offsetHeight, (e.style.display = t);
      }
      function ee(e, t, n) {
        var o = n;
        if ('object' !== I(t))
          return 'undefined' !== typeof o
            ? ('number' === typeof o && (o = ''.concat(o, 'px')),
              void (e.style[t] = o))
            : q(e, t);
        for (var i in t) t.hasOwnProperty(i) && ee(e, i, t[i]);
      }
      function te(e) {
        var t,
          n,
          o,
          i = e.ownerDocument,
          r = i.body,
          u = i && i.documentElement;
        return (
          (t = e.getBoundingClientRect()),
          (n = Math.floor(t.left)),
          (o = Math.floor(t.top)),
          (n -= u.clientLeft || r.clientLeft || 0),
          (o -= u.clientTop || r.clientTop || 0),
          { left: n, top: o }
        );
      }
      function ne(e, t) {
        var n = e['page'.concat(t ? 'Y' : 'X', 'Offset')],
          o = 'scroll'.concat(t ? 'Top' : 'Left');
        if ('number' !== typeof n) {
          var i = e.document;
          (n = i.documentElement[o]), 'number' !== typeof n && (n = i.body[o]);
        }
        return n;
      }
      function oe(e) {
        return ne(e);
      }
      function ie(e) {
        return ne(e, !0);
      }
      function re(e) {
        var t = te(e),
          n = e.ownerDocument,
          o = n.defaultView || n.parentWindow;
        return (t.left += oe(o)), (t.top += ie(o)), t;
      }
      function ue(e) {
        return null !== e && void 0 !== e && e == e.window;
      }
      function ae(e) {
        return ue(e) ? e.document : 9 === e.nodeType ? e : e.ownerDocument;
      }
      function ce(e, t, n) {
        var o = n,
          i = '',
          r = ae(e);
        return (
          (o = o || r.defaultView.getComputedStyle(e, null)),
          o && (i = o.getPropertyValue(t) || o[t]),
          i
        );
      }
      var se = new RegExp('^('.concat($, ')(?!px)[a-z%]+$'), 'i'),
        le = /^(top|right|bottom|left)$/,
        fe = 'currentStyle',
        pe = 'runtimeStyle',
        de = 'left',
        he = 'px';
      function ve(e, t) {
        var n = e[fe] && e[fe][t];
        if (se.test(n) && !le.test(t)) {
          var o = e.style,
            i = o[de],
            r = e[pe][de];
          (e[pe][de] = e[fe][de]),
            (o[de] = 'fontSize' === t ? '1em' : n || 0),
            (n = o.pixelLeft + he),
            (o[de] = i),
            (e[pe][de] = r);
        }
        return '' === n ? 'auto' : n;
      }
      function me(e, t) {
        return 'left' === e
          ? t.useCssRight
            ? 'right'
            : e
          : t.useCssBottom
          ? 'bottom'
          : e;
      }
      function ge(e) {
        return 'left' === e
          ? 'right'
          : 'right' === e
          ? 'left'
          : 'top' === e
          ? 'bottom'
          : 'bottom' === e
          ? 'top'
          : void 0;
      }
      function we(e, t, n) {
        'static' === ee(e, 'position') && (e.style.position = 'relative');
        var o = -999,
          i = -999,
          r = me('left', n),
          u = me('top', n),
          a = ge(r),
          c = ge(u);
        'left' !== r && (o = 999), 'top' !== u && (i = 999);
        var s = '',
          l = re(e);
        ('left' in t || 'top' in t) && ((s = Y(e) || ''), j(e, 'none')),
          'left' in t && ((e.style[a] = ''), (e.style[r] = ''.concat(o, 'px'))),
          'top' in t && ((e.style[c] = ''), (e.style[u] = ''.concat(i, 'px'))),
          J(e);
        var f = re(e),
          p = {};
        for (var d in t)
          if (t.hasOwnProperty(d)) {
            var h = me(d, n),
              v = 'left' === d ? o : i,
              m = l[d] - f[d];
            p[h] = h === d ? v + m : v - m;
          }
        ee(e, p), J(e), ('left' in t || 'top' in t) && j(e, s);
        var g = {};
        for (var w in t)
          if (t.hasOwnProperty(w)) {
            var y = me(w, n),
              b = t[w] - l[w];
            g[y] = w === y ? p[y] + b : p[y] - b;
          }
        ee(e, g);
      }
      function ye(e, t) {
        var n = re(e),
          o = X(e),
          i = { x: o.x, y: o.y };
        'left' in t && (i.x = o.x + t.left - n.left),
          'top' in t && (i.y = o.y + t.top - n.top),
          Q(e, i);
      }
      function be(e, t, n) {
        if (n.ignoreShake) {
          var o = re(e),
            i = o.left.toFixed(0),
            r = o.top.toFixed(0),
            u = t.left.toFixed(0),
            a = t.top.toFixed(0);
          if (i === u && r === a) return;
        }
        n.useCssRight || n.useCssBottom
          ? we(e, t, n)
          : n.useCssTransform && B() in document.body.style
          ? ye(e, t)
          : we(e, t, n);
      }
      function Ee(e, t) {
        for (var n = 0; n < e.length; n++) t(e[n]);
      }
      function Me(e) {
        return 'border-box' === q(e, 'boxSizing');
      }
      'undefined' !== typeof window && (q = window.getComputedStyle ? ce : ve);
      var Ce = ['margin', 'border', 'padding'],
        Te = -1,
        Ze = 2,
        Pe = 1,
        xe = 0;
      function Oe(e, t, n) {
        var o,
          i = {},
          r = e.style;
        for (o in t) t.hasOwnProperty(o) && ((i[o] = r[o]), (r[o] = t[o]));
        for (o in (n.call(e), t)) t.hasOwnProperty(o) && (r[o] = i[o]);
      }
      function ke(e, t, n) {
        var o,
          i,
          r,
          u = 0;
        for (i = 0; i < t.length; i++)
          if (((o = t[i]), o))
            for (r = 0; r < n.length; r++) {
              var a = void 0;
              (a =
                'border' === o ? ''.concat(o).concat(n[r], 'Width') : o + n[r]),
                (u += parseFloat(q(e, a)) || 0);
            }
        return u;
      }
      var Ne = {
        getParent: function (e) {
          var t = e;
          do {
            t = 11 === t.nodeType && t.host ? t.host : t.parentNode;
          } while (t && 1 !== t.nodeType && 9 !== t.nodeType);
          return t;
        },
      };
      function Se(e, t, n) {
        var o = n;
        if (ue(e))
          return 'width' === t ? Ne.viewportWidth(e) : Ne.viewportHeight(e);
        if (9 === e.nodeType)
          return 'width' === t ? Ne.docWidth(e) : Ne.docHeight(e);
        var i = 'width' === t ? ['Left', 'Right'] : ['Top', 'Bottom'],
          r =
            'width' === t
              ? Math.floor(e.getBoundingClientRect().width)
              : Math.floor(e.getBoundingClientRect().height),
          u = Me(e),
          a = 0;
        (null === r || void 0 === r || r <= 0) &&
          ((r = void 0),
          (a = q(e, t)),
          (null === a || void 0 === a || Number(a) < 0) &&
            (a = e.style[t] || 0),
          (a = Math.floor(parseFloat(a)) || 0)),
          void 0 === o && (o = u ? Pe : Te);
        var c = void 0 !== r || u,
          s = r || a;
        return o === Te
          ? c
            ? s - ke(e, ['border', 'padding'], i)
            : a
          : c
          ? o === Pe
            ? s
            : s + (o === Ze ? -ke(e, ['border'], i) : ke(e, ['margin'], i))
          : a + ke(e, Ce.slice(o), i);
      }
      Ee(['Width', 'Height'], function (e) {
        (Ne['doc'.concat(e)] = function (t) {
          var n = t.document;
          return Math.max(
            n.documentElement['scroll'.concat(e)],
            n.body['scroll'.concat(e)],
            Ne['viewport'.concat(e)](n),
          );
        }),
          (Ne['viewport'.concat(e)] = function (t) {
            var n = 'client'.concat(e),
              o = t.document,
              i = o.body,
              r = o.documentElement,
              u = r[n];
            return ('CSS1Compat' === o.compatMode && u) || (i && i[n]) || u;
          });
      });
      var Re = { position: 'absolute', visibility: 'hidden', display: 'block' };
      function De() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        var o,
          i = t[0];
        return (
          0 !== i.offsetWidth
            ? (o = Se.apply(void 0, t))
            : Oe(i, Re, function () {
                o = Se.apply(void 0, t);
              }),
          o
        );
      }
      function Ae(e, t) {
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
      }
      Ee(['width', 'height'], function (e) {
        var t = e.charAt(0).toUpperCase() + e.slice(1);
        Ne['outer'.concat(t)] = function (t, n) {
          return t && De(t, e, n ? xe : Pe);
        };
        var n = 'width' === e ? ['Left', 'Right'] : ['Top', 'Bottom'];
        Ne[e] = function (t, o) {
          var i = o;
          if (void 0 === i) return t && De(t, e, Te);
          if (t) {
            var r = Me(t);
            return r && (i += ke(t, ['padding', 'border'], n)), ee(t, e, i);
          }
        };
      });
      var He = {
        getWindow: function (e) {
          if (e && e.document && e.setTimeout) return e;
          var t = e.ownerDocument || e;
          return t.defaultView || t.parentWindow;
        },
        getDocument: ae,
        offset: function (e, t, n) {
          if ('undefined' === typeof t) return re(e);
          be(e, t, n || {});
        },
        isWindow: ue,
        each: Ee,
        css: ee,
        clone: function (e) {
          var t,
            n = {};
          for (t in e) e.hasOwnProperty(t) && (n[t] = e[t]);
          var o = e.overflow;
          if (o)
            for (t in e) e.hasOwnProperty(t) && (n.overflow[t] = e.overflow[t]);
          return n;
        },
        mix: Ae,
        getWindowScrollLeft: function (e) {
          return oe(e);
        },
        getWindowScrollTop: function (e) {
          return ie(e);
        },
        merge: function () {
          for (var e = {}, t = 0; t < arguments.length; t++)
            He.mix(e, t < 0 || arguments.length <= t ? void 0 : arguments[t]);
          return e;
        },
        viewportWidth: 0,
        viewportHeight: 0,
      };
      Ae(He, Ne);
      var Le = He.getParent;
      function Ve(e) {
        if (He.isWindow(e) || 9 === e.nodeType) return null;
        var t,
          n = He.getDocument(e),
          o = n.body,
          i = He.css(e, 'position'),
          r = 'fixed' === i || 'absolute' === i;
        if (!r) return 'html' === e.nodeName.toLowerCase() ? null : Le(e);
        for (t = Le(e); t && t !== o && 9 !== t.nodeType; t = Le(t))
          if (((i = He.css(t, 'position')), 'static' !== i)) return t;
        return null;
      }
      var Ie = He.getParent;
      function _e(e) {
        if (He.isWindow(e) || 9 === e.nodeType) return !1;
        var t = He.getDocument(e),
          n = t.body,
          o = null;
        for (o = Ie(e); o && o !== n && o !== t; o = Ie(o)) {
          var i = He.css(o, 'position');
          if ('fixed' === i) return !0;
        }
        return !1;
      }
      function Ue(e, t) {
        var n = { left: 0, right: 1 / 0, top: 0, bottom: 1 / 0 },
          o = Ve(e),
          i = He.getDocument(e),
          r = i.defaultView || i.parentWindow,
          u = i.body,
          a = i.documentElement;
        while (o) {
          if (
            (-1 !== navigator.userAgent.indexOf('MSIE') &&
              0 === o.clientWidth) ||
            o === u ||
            o === a ||
            'visible' === He.css(o, 'overflow')
          ) {
            if (o === u || o === a) break;
          } else {
            var c = He.offset(o);
            (c.left += o.clientLeft),
              (c.top += o.clientTop),
              (n.top = Math.max(n.top, c.top)),
              (n.right = Math.min(n.right, c.left + o.clientWidth)),
              (n.bottom = Math.min(n.bottom, c.top + o.clientHeight)),
              (n.left = Math.max(n.left, c.left));
          }
          o = Ve(o);
        }
        var s = null;
        if (!He.isWindow(e) && 9 !== e.nodeType) {
          s = e.style.position;
          var l = He.css(e, 'position');
          'absolute' === l && (e.style.position = 'fixed');
        }
        var f = He.getWindowScrollLeft(r),
          p = He.getWindowScrollTop(r),
          d = He.viewportWidth(r),
          h = He.viewportHeight(r),
          v = a.scrollWidth,
          m = a.scrollHeight,
          g = window.getComputedStyle(u);
        if (
          ('hidden' === g.overflowX && (v = r.innerWidth),
          'hidden' === g.overflowY && (m = r.innerHeight),
          e.style && (e.style.position = s),
          t || _e(e))
        )
          (n.left = Math.max(n.left, f)),
            (n.top = Math.max(n.top, p)),
            (n.right = Math.min(n.right, f + d)),
            (n.bottom = Math.min(n.bottom, p + h));
        else {
          var w = Math.max(v, f + d);
          n.right = Math.min(n.right, w);
          var y = Math.max(m, p + h);
          n.bottom = Math.min(n.bottom, y);
        }
        return n.top >= 0 && n.left >= 0 && n.bottom > n.top && n.right > n.left
          ? n
          : null;
      }
      function We(e, t, n, o) {
        var i = He.clone(e),
          r = { width: t.width, height: t.height };
        return (
          o.adjustX && i.left < n.left && (i.left = n.left),
          o.resizeWidth &&
            i.left >= n.left &&
            i.left + r.width > n.right &&
            (r.width -= i.left + r.width - n.right),
          o.adjustX &&
            i.left + r.width > n.right &&
            (i.left = Math.max(n.right - r.width, n.left)),
          o.adjustY && i.top < n.top && (i.top = n.top),
          o.resizeHeight &&
            i.top >= n.top &&
            i.top + r.height > n.bottom &&
            (r.height -= i.top + r.height - n.bottom),
          o.adjustY &&
            i.top + r.height > n.bottom &&
            (i.top = Math.max(n.bottom - r.height, n.top)),
          He.mix(i, r)
        );
      }
      function Fe(e) {
        var t, n, o;
        if (He.isWindow(e) || 9 === e.nodeType) {
          var i = He.getWindow(e);
          (t = {
            left: He.getWindowScrollLeft(i),
            top: He.getWindowScrollTop(i),
          }),
            (n = He.viewportWidth(i)),
            (o = He.viewportHeight(i));
        } else
          (t = He.offset(e)), (n = He.outerWidth(e)), (o = He.outerHeight(e));
        return (t.width = n), (t.height = o), t;
      }
      function Be(e, t) {
        var n = t.charAt(0),
          o = t.charAt(1),
          i = e.width,
          r = e.height,
          u = e.left,
          a = e.top;
        return (
          'c' === n ? (a += r / 2) : 'b' === n && (a += r),
          'c' === o ? (u += i / 2) : 'r' === o && (u += i),
          { left: u, top: a }
        );
      }
      function je(e, t, n, o, i) {
        var r = Be(t, n[1]),
          u = Be(e, n[0]),
          a = [u.left - r.left, u.top - r.top];
        return {
          left: Math.round(e.left - a[0] + o[0] - i[0]),
          top: Math.round(e.top - a[1] + o[1] - i[1]),
        };
      }
      function ze(e, t, n) {
        return e.left < n.left || e.left + t.width > n.right;
      }
      function Ye(e, t, n) {
        return e.top < n.top || e.top + t.height > n.bottom;
      }
      function Xe(e, t, n) {
        return e.left > n.right || e.left + t.width < n.left;
      }
      function Ke(e, t, n) {
        return e.top > n.bottom || e.top + t.height < n.top;
      }
      function Ge(e, t, n) {
        var o = [];
        return (
          He.each(e, function (e) {
            o.push(
              e.replace(t, function (e) {
                return n[e];
              }),
            );
          }),
          o
        );
      }
      function Qe(e, t) {
        return (e[t] = -e[t]), e;
      }
      function qe(e, t) {
        var n;
        return (
          (n = /%$/.test(e)
            ? (parseInt(e.substring(0, e.length - 1), 10) / 100) * t
            : parseInt(e, 10)),
          n || 0
        );
      }
      function $e(e, t) {
        (e[0] = qe(e[0], t.width)), (e[1] = qe(e[1], t.height));
      }
      function Je(e, t, n, o) {
        var i = n.points,
          r = n.offset || [0, 0],
          u = n.targetOffset || [0, 0],
          a = n.overflow,
          c = n.source || e;
        (r = [].concat(r)), (u = [].concat(u)), (a = a || {});
        var s = {},
          l = 0,
          f = !(!a || !a.alwaysByViewport),
          p = Ue(c, f),
          d = Fe(c);
        $e(r, d), $e(u, t);
        var h = je(d, t, i, r, u),
          v = He.merge(d, h);
        if (p && (a.adjustX || a.adjustY) && o) {
          if (a.adjustX && ze(h, d, p)) {
            var m = Ge(i, /[lr]/gi, { l: 'r', r: 'l' }),
              g = Qe(r, 0),
              w = Qe(u, 0),
              y = je(d, t, m, g, w);
            Xe(y, d, p) || ((l = 1), (i = m), (r = g), (u = w));
          }
          if (a.adjustY && Ye(h, d, p)) {
            var b = Ge(i, /[tb]/gi, { t: 'b', b: 't' }),
              E = Qe(r, 1),
              M = Qe(u, 1),
              C = je(d, t, b, E, M);
            Ke(C, d, p) || ((l = 1), (i = b), (r = E), (u = M));
          }
          l && ((h = je(d, t, i, r, u)), He.mix(v, h));
          var T = ze(h, d, p),
            Z = Ye(h, d, p);
          if (T || Z) {
            var P = i;
            T && (P = Ge(i, /[lr]/gi, { l: 'r', r: 'l' })),
              Z && (P = Ge(i, /[tb]/gi, { t: 'b', b: 't' })),
              (i = P),
              (r = n.offset || [0, 0]),
              (u = n.targetOffset || [0, 0]);
          }
          (s.adjustX = a.adjustX && T),
            (s.adjustY = a.adjustY && Z),
            (s.adjustX || s.adjustY) && (v = We(h, d, p, s));
        }
        return (
          v.width !== d.width &&
            He.css(c, 'width', He.width(c) + v.width - d.width),
          v.height !== d.height &&
            He.css(c, 'height', He.height(c) + v.height - d.height),
          He.offset(
            c,
            { left: v.left, top: v.top },
            {
              useCssRight: n.useCssRight,
              useCssBottom: n.useCssBottom,
              useCssTransform: n.useCssTransform,
              ignoreShake: n.ignoreShake,
            },
          ),
          { points: i, offset: r, targetOffset: u, overflow: s }
        );
      }
      function et(e, t) {
        var n = Ue(e, t),
          o = Fe(e);
        return (
          !n ||
          o.left + o.width <= n.left ||
          o.top + o.height <= n.top ||
          o.left >= n.right ||
          o.top >= n.bottom
        );
      }
      function tt(e, t, n) {
        var o = n.target || t,
          i = Fe(o),
          r = !et(o, n.overflow && n.overflow.alwaysByViewport);
        return Je(e, i, n, r);
      }
      function nt(e, t, n) {
        var o,
          i,
          r = He.getDocument(e),
          u = r.defaultView || r.parentWindow,
          a = He.getWindowScrollLeft(u),
          c = He.getWindowScrollTop(u),
          s = He.viewportWidth(u),
          l = He.viewportHeight(u);
        (o = 'pageX' in t ? t.pageX : a + t.clientX),
          (i = 'pageY' in t ? t.pageY : c + t.clientY);
        var f = { left: o, top: i, width: 0, height: 0 },
          p = o >= 0 && o <= a + s && i >= 0 && i <= c + l,
          d = [n.points[0], 'cc'];
        return Je(e, f, V(V({}, n), {}, { points: d }), p);
      }
      (tt.__getOffsetParent = Ve), (tt.__getVisibleRectForElement = Ue);
      var ot = n(91881),
        it = n(5110),
        rt = n(8410),
        ut = function (e, t) {
          var n = p().useRef(!1),
            o = p().useRef(null);
          function i() {
            window.clearTimeout(o.current);
          }
          function r(u) {
            if ((i(), n.current && !0 !== u))
              o.current = window.setTimeout(function () {
                (n.current = !1), r();
              }, t);
            else {
              if (!1 === e(u)) return;
              (n.current = !0),
                (o.current = window.setTimeout(function () {
                  n.current = !1;
                }, t));
            }
          }
          return [
            r,
            function () {
              (n.current = !1), i();
            },
          ];
        },
        at = n(91033);
      function ct(e, t) {
        return (
          e === t ||
          (!(!e || !t) &&
            ('pageX' in t && 'pageY' in t
              ? e.pageX === t.pageX && e.pageY === t.pageY
              : 'clientX' in t &&
                'clientY' in t &&
                e.clientX === t.clientX &&
                e.clientY === t.clientY))
        );
      }
      function st(e, t) {
        e !== document.activeElement &&
          (0, m.Z)(t, e) &&
          'function' === typeof e.focus &&
          e.focus();
      }
      function lt(e, t) {
        var n = null,
          o = null;
        function i(e) {
          var i = (0, O.Z)(e, 1),
            r = i[0].target;
          if (document.documentElement.contains(r)) {
            var u = r.getBoundingClientRect(),
              a = u.width,
              c = u.height,
              s = Math.floor(a),
              l = Math.floor(c);
            (n === s && o === l) ||
              Promise.resolve().then(function () {
                t({ width: s, height: l });
              }),
              (n = s),
              (o = l);
          }
        }
        var r = new at.default(i);
        return (
          e && r.observe(e),
          function () {
            r.disconnect();
          }
        );
      }
      function ft(e) {
        return 'function' !== typeof e ? null : e();
      }
      function pt(e) {
        return 'object' === (0, H.Z)(e) && e ? e : null;
      }
      var dt = function (e, t) {
          var n = e.children,
            o = e.disabled,
            i = e.target,
            r = e.align,
            u = e.onAlign,
            a = e.monitorWindowResize,
            c = e.monitorBufferTime,
            s = void 0 === c ? 0 : c,
            l = p().useRef({}),
            f = p().useRef(),
            d = p().Children.only(n),
            h = p().useRef({});
          (h.current.disabled = o),
            (h.current.target = i),
            (h.current.align = r),
            (h.current.onAlign = u);
          var v = ut(function () {
              var e = h.current,
                t = e.disabled,
                n = e.target,
                o = e.align,
                i = e.onAlign,
                r = f.current;
              if (!t && n && r) {
                var u,
                  a = ft(n),
                  c = pt(n);
                (l.current.element = a),
                  (l.current.point = c),
                  (l.current.align = o);
                var s = document,
                  p = s.activeElement;
                return (
                  a && (0, it.Z)(a)
                    ? (u = tt(r, a, o))
                    : c && (u = nt(r, c, o)),
                  st(p, r),
                  i && u && i(r, u),
                  !0
                );
              }
              return !1;
            }, s),
            m = (0, O.Z)(v, 2),
            g = m[0],
            b = m[1],
            E = p().useState(),
            M = (0, O.Z)(E, 2),
            C = M[0],
            T = M[1],
            Z = p().useState(),
            P = (0, O.Z)(Z, 2),
            x = P[0],
            k = P[1];
          return (
            (0, rt.Z)(function () {
              T(ft(i)), k(pt(i));
            }),
            p().useEffect(function () {
              (l.current.element === C &&
                ct(l.current.point, x) &&
                (0, ot.Z)(l.current.align, r)) ||
                g();
            }),
            p().useEffect(
              function () {
                var e = lt(f.current, g);
                return e;
              },
              [f.current],
            ),
            p().useEffect(
              function () {
                var e = lt(C, g);
                return e;
              },
              [C],
            ),
            p().useEffect(
              function () {
                o ? b() : g();
              },
              [o],
            ),
            p().useEffect(
              function () {
                if (a) {
                  var e = (0, y.Z)(window, 'resize', g);
                  return e.remove;
                }
              },
              [a],
            ),
            p().useEffect(function () {
              return function () {
                b();
              };
            }, []),
            p().useImperativeHandle(t, function () {
              return {
                forceAlign: function () {
                  return g(!0);
                },
              };
            }),
            p().isValidElement(d) &&
              (d = p().cloneElement(d, { ref: (0, w.sQ)(d.ref, f) })),
            d
          );
        },
        ht = p().forwardRef(dt);
      ht.displayName = 'Align';
      var vt = ht,
        mt = vt,
        gt = n(55507),
        wt = n(92137),
        yt = n(30470),
        bt = ['measure', 'alignPre', 'align', null, 'motion'],
        Et = function (e, t) {
          var n = (0, yt.Z)(null),
            o = (0, O.Z)(n, 2),
            i = o[0],
            r = o[1],
            u = (0, f.useRef)();
          function a(e) {
            r(e, !0);
          }
          function c() {
            v.Z.cancel(u.current);
          }
          function s(e) {
            c(),
              (u.current = (0, v.Z)(function () {
                a(function (e) {
                  switch (i) {
                    case 'align':
                      return 'motion';
                    case 'motion':
                      return 'stable';
                    default:
                  }
                  return e;
                }),
                  null === e || void 0 === e || e();
              }));
          }
          return (
            (0, f.useEffect)(
              function () {
                a('measure');
              },
              [e],
            ),
            (0, f.useEffect)(
              function () {
                switch (i) {
                  case 'measure':
                    t();
                    break;
                  default:
                }
                i &&
                  (u.current = (0, v.Z)(
                    (0, wt.Z)(
                      (0, gt.Z)().mark(function e() {
                        var t, n;
                        return (0, gt.Z)().wrap(function (e) {
                          while (1)
                            switch ((e.prev = e.next)) {
                              case 0:
                                (t = bt.indexOf(i)),
                                  (n = bt[t + 1]),
                                  n && -1 !== t && a(n);
                              case 3:
                              case 'end':
                                return e.stop();
                            }
                        }, e);
                      }),
                    ),
                  ));
              },
              [i],
            ),
            (0, f.useEffect)(function () {
              return function () {
                c();
              };
            }, []),
            [i, s]
          );
        },
        Mt = function (e) {
          var t = f.useState({ width: 0, height: 0 }),
            n = (0, O.Z)(t, 2),
            o = n[0],
            i = n[1];
          function r(e) {
            var t = e.offsetWidth,
              n = e.offsetHeight,
              o = e.getBoundingClientRect(),
              r = o.width,
              u = o.height;
            Math.abs(t - r) < 1 && Math.abs(n - u) < 1 && ((t = r), (n = u)),
              i({ width: t, height: n });
          }
          var u = f.useMemo(
            function () {
              var t = {};
              if (e) {
                var n = o.width,
                  i = o.height;
                -1 !== e.indexOf('height') && i
                  ? (t.height = i)
                  : -1 !== e.indexOf('minHeight') && i && (t.minHeight = i),
                  -1 !== e.indexOf('width') && n
                    ? (t.width = n)
                    : -1 !== e.indexOf('minWidth') && n && (t.minWidth = n);
              }
              return t;
            },
            [e, o],
          );
          return [u, r];
        },
        Ct = f.forwardRef(function (e, t) {
          var n = e.visible,
            r = e.prefixCls,
            u = e.className,
            a = e.style,
            c = e.children,
            s = e.zIndex,
            l = e.stretch,
            p = e.destroyPopupOnHide,
            d = e.forceRender,
            h = e.align,
            v = e.point,
            m = e.getRootDomNode,
            g = e.getClassNameFromAlign,
            w = e.onAlign,
            y = e.onMouseEnter,
            b = e.onMouseLeave,
            E = e.onMouseDown,
            M = e.onTouchStart,
            C = e.onClick,
            Z = (0, f.useRef)(),
            P = (0, f.useRef)(),
            x = (0, f.useState)(),
            k = (0, O.Z)(x, 2),
            N = k[0],
            D = k[1],
            A = Mt(l),
            H = (0, O.Z)(A, 2),
            L = H[0],
            V = H[1];
          function I() {
            l && V(m());
          }
          var _ = Et(n, I),
            U = (0, O.Z)(_, 2),
            W = U[0],
            F = U[1],
            B = (0, f.useState)(0),
            j = (0, O.Z)(B, 2),
            z = j[0],
            Y = j[1],
            X = (0, f.useRef)();
          function K() {
            return v || m;
          }
          function G() {
            var e;
            null === (e = Z.current) || void 0 === e || e.forceAlign();
          }
          function Q(e, t) {
            var n = g(t);
            N !== n && D(n),
              Y(function (e) {
                return e + 1;
              }),
              'align' === W && (null === w || void 0 === w || w(e, t));
          }
          (0, rt.Z)(
            function () {
              'alignPre' === W && Y(0);
            },
            [W],
          ),
            (0, rt.Z)(
              function () {
                'align' === W &&
                  (z < 3
                    ? G()
                    : F(function () {
                        var e;
                        null === (e = X.current) || void 0 === e || e.call(X);
                      }));
              },
              [z],
            );
          var q = (0, o.Z)({}, R(e));
          function $() {
            return new Promise(function (e) {
              X.current = e;
            });
          }
          ['onAppearEnd', 'onEnterEnd', 'onLeaveEnd'].forEach(function (e) {
            var t = q[e];
            q[e] = function (e, n) {
              return F(), null === t || void 0 === t ? void 0 : t(e, n);
            };
          }),
            f.useEffect(
              function () {
                q.motionName || 'motion' !== W || F();
              },
              [q.motionName, W],
            ),
            f.useImperativeHandle(t, function () {
              return {
                forceAlign: G,
                getElement: function () {
                  return P.current;
                },
              };
            });
          var J = (0, o.Z)(
              (0, o.Z)({}, L),
              {},
              {
                zIndex: s,
                opacity: 'motion' !== W && 'stable' !== W && n ? 0 : void 0,
                pointerEvents: n || 'stable' === W ? void 0 : 'none',
              },
              a,
            ),
            ee = !0;
          null === h ||
            void 0 === h ||
            !h.points ||
            ('align' !== W && 'stable' !== W) ||
            (ee = !1);
          var te = c;
          return (
            f.Children.count(c) > 1 &&
              (te = f.createElement(
                'div',
                { className: ''.concat(r, '-content') },
                c,
              )),
            f.createElement(
              S.default,
              (0, i.Z)(
                {
                  visible: n,
                  ref: P,
                  leavedClassName: ''.concat(r, '-hidden'),
                },
                q,
                {
                  onAppearPrepare: $,
                  onEnterPrepare: $,
                  removeOnLeave: p,
                  forceRender: d,
                },
              ),
              function (e, t) {
                var n = e.className,
                  i = e.style,
                  a = T()(r, u, N, n);
                return f.createElement(
                  mt,
                  {
                    target: K(),
                    key: 'popup',
                    ref: Z,
                    monitorWindowResize: !0,
                    disabled: ee,
                    align: h,
                    onAlign: Q,
                  },
                  f.createElement(
                    'div',
                    {
                      ref: t,
                      className: a,
                      onMouseEnter: y,
                      onMouseLeave: b,
                      onMouseDownCapture: E,
                      onTouchStartCapture: M,
                      onClick: C,
                      style: (0, o.Z)((0, o.Z)({}, i), J),
                    },
                    te,
                  ),
                );
              },
            )
          );
        });
      Ct.displayName = 'PopupInner';
      var Tt = Ct,
        Zt = f.forwardRef(function (e, t) {
          var n = e.prefixCls,
            r = e.visible,
            u = e.zIndex,
            a = e.children,
            c = e.mobile;
          c = void 0 === c ? {} : c;
          var s = c.popupClassName,
            l = c.popupStyle,
            p = c.popupMotion,
            d = void 0 === p ? {} : p,
            h = c.popupRender,
            v = e.onClick,
            m = f.useRef();
          f.useImperativeHandle(t, function () {
            return {
              forceAlign: function () {},
              getElement: function () {
                return m.current;
              },
            };
          });
          var g = (0, o.Z)({ zIndex: u }, l),
            w = a;
          return (
            f.Children.count(a) > 1 &&
              (w = f.createElement(
                'div',
                { className: ''.concat(n, '-content') },
                a,
              )),
            h && (w = h(w)),
            f.createElement(
              S.default,
              (0, i.Z)({ visible: r, ref: m, removeOnLeave: !0 }, d),
              function (e, t) {
                var i = e.className,
                  r = e.style,
                  u = T()(n, s, i);
                return f.createElement(
                  'div',
                  {
                    ref: t,
                    className: u,
                    onClick: v,
                    style: (0, o.Z)((0, o.Z)({}, r), g),
                  },
                  w,
                );
              },
            )
          );
        });
      Zt.displayName = 'MobilePopupInner';
      var Pt = Zt,
        xt = ['visible', 'mobile'],
        Ot = f.forwardRef(function (e, t) {
          var n = e.visible,
            r = e.mobile,
            u = (0, k.Z)(e, xt),
            a = (0, f.useState)(n),
            c = (0, O.Z)(a, 2),
            s = c[0],
            l = c[1],
            p = (0, f.useState)(!1),
            d = (0, O.Z)(p, 2),
            h = d[0],
            v = d[1],
            m = (0, o.Z)((0, o.Z)({}, u), {}, { visible: s });
          (0, f.useEffect)(
            function () {
              l(n), n && r && v((0, N.Z)());
            },
            [n, r],
          );
          var g = h
            ? f.createElement(Pt, (0, i.Z)({}, m, { mobile: r, ref: t }))
            : f.createElement(Tt, (0, i.Z)({}, m, { ref: t }));
          return f.createElement('div', null, f.createElement(D, m), g);
        });
      Ot.displayName = 'Popup';
      var kt = Ot,
        Nt = f.createContext(null),
        St = Nt;
      function Rt() {}
      function Dt() {
        return '';
      }
      function At(e) {
        return e ? e.ownerDocument : window.document;
      }
      var Ht = [
        'onClick',
        'onMouseDown',
        'onTouchStart',
        'onMouseEnter',
        'onMouseLeave',
        'onFocus',
        'onBlur',
        'onContextMenu',
      ];
      function Lt(e) {
        var t = (function (t) {
          (0, c.Z)(p, t);
          var n = (0, s.Z)(p);
          function p(e) {
            var t, o;
            return (
              (0, r.Z)(this, p),
              (t = n.call(this, e)),
              (0, l.Z)((0, a.Z)(t), 'popupRef', f.createRef()),
              (0, l.Z)((0, a.Z)(t), 'triggerRef', f.createRef()),
              (0, l.Z)((0, a.Z)(t), 'portalContainer', void 0),
              (0, l.Z)((0, a.Z)(t), 'attachId', void 0),
              (0, l.Z)((0, a.Z)(t), 'clickOutsideHandler', void 0),
              (0, l.Z)((0, a.Z)(t), 'touchOutsideHandler', void 0),
              (0, l.Z)((0, a.Z)(t), 'contextMenuOutsideHandler1', void 0),
              (0, l.Z)((0, a.Z)(t), 'contextMenuOutsideHandler2', void 0),
              (0, l.Z)((0, a.Z)(t), 'mouseDownTimeout', void 0),
              (0, l.Z)((0, a.Z)(t), 'focusTime', void 0),
              (0, l.Z)((0, a.Z)(t), 'preClickTime', void 0),
              (0, l.Z)((0, a.Z)(t), 'preTouchTime', void 0),
              (0, l.Z)((0, a.Z)(t), 'delayTimer', void 0),
              (0, l.Z)((0, a.Z)(t), 'hasPopupMouseDown', void 0),
              (0, l.Z)((0, a.Z)(t), 'onMouseEnter', function (e) {
                var n = t.props.mouseEnterDelay;
                t.fireEvents('onMouseEnter', e),
                  t.delaySetPopupVisible(!0, n, n ? null : e);
              }),
              (0, l.Z)((0, a.Z)(t), 'onMouseMove', function (e) {
                t.fireEvents('onMouseMove', e), t.setPoint(e);
              }),
              (0, l.Z)((0, a.Z)(t), 'onMouseLeave', function (e) {
                t.fireEvents('onMouseLeave', e),
                  t.delaySetPopupVisible(!1, t.props.mouseLeaveDelay);
              }),
              (0, l.Z)((0, a.Z)(t), 'onPopupMouseEnter', function () {
                t.clearDelayTimer();
              }),
              (0, l.Z)((0, a.Z)(t), 'onPopupMouseLeave', function (e) {
                var n;
                (e.relatedTarget &&
                  !e.relatedTarget.setTimeout &&
                  (0, m.Z)(
                    null === (n = t.popupRef.current) || void 0 === n
                      ? void 0
                      : n.getElement(),
                    e.relatedTarget,
                  )) ||
                  t.delaySetPopupVisible(!1, t.props.mouseLeaveDelay);
              }),
              (0, l.Z)((0, a.Z)(t), 'onFocus', function (e) {
                t.fireEvents('onFocus', e),
                  t.clearDelayTimer(),
                  t.isFocusToShow() &&
                    ((t.focusTime = Date.now()),
                    t.delaySetPopupVisible(!0, t.props.focusDelay));
              }),
              (0, l.Z)((0, a.Z)(t), 'onMouseDown', function (e) {
                t.fireEvents('onMouseDown', e), (t.preClickTime = Date.now());
              }),
              (0, l.Z)((0, a.Z)(t), 'onTouchStart', function (e) {
                t.fireEvents('onTouchStart', e), (t.preTouchTime = Date.now());
              }),
              (0, l.Z)((0, a.Z)(t), 'onBlur', function (e) {
                t.fireEvents('onBlur', e),
                  t.clearDelayTimer(),
                  t.isBlurToHide() &&
                    t.delaySetPopupVisible(!1, t.props.blurDelay);
              }),
              (0, l.Z)((0, a.Z)(t), 'onContextMenu', function (e) {
                e.preventDefault(),
                  t.fireEvents('onContextMenu', e),
                  t.setPopupVisible(!0, e);
              }),
              (0, l.Z)((0, a.Z)(t), 'onContextMenuClose', function () {
                t.isContextMenuToShow() && t.close();
              }),
              (0, l.Z)((0, a.Z)(t), 'onClick', function (e) {
                if ((t.fireEvents('onClick', e), t.focusTime)) {
                  var n;
                  if (
                    (t.preClickTime && t.preTouchTime
                      ? (n = Math.min(t.preClickTime, t.preTouchTime))
                      : t.preClickTime
                      ? (n = t.preClickTime)
                      : t.preTouchTime && (n = t.preTouchTime),
                    Math.abs(n - t.focusTime) < 20)
                  )
                    return;
                  t.focusTime = 0;
                }
                (t.preClickTime = 0),
                  (t.preTouchTime = 0),
                  t.isClickToShow() &&
                    (t.isClickToHide() || t.isBlurToHide()) &&
                    e &&
                    e.preventDefault &&
                    e.preventDefault();
                var o = !t.state.popupVisible;
                ((t.isClickToHide() && !o) || (o && t.isClickToShow())) &&
                  t.setPopupVisible(!t.state.popupVisible, e);
              }),
              (0, l.Z)((0, a.Z)(t), 'onPopupMouseDown', function () {
                var e;
                ((t.hasPopupMouseDown = !0),
                clearTimeout(t.mouseDownTimeout),
                (t.mouseDownTimeout = window.setTimeout(function () {
                  t.hasPopupMouseDown = !1;
                }, 0)),
                t.context) &&
                  (e = t.context).onPopupMouseDown.apply(e, arguments);
              }),
              (0, l.Z)((0, a.Z)(t), 'onDocumentClick', function (e) {
                if (!t.props.mask || t.props.maskClosable) {
                  var n = e.target,
                    o = t.getRootDomNode(),
                    i = t.getPopupDomNode();
                  ((0, m.Z)(o, n) && !t.isContextMenuOnly()) ||
                    (0, m.Z)(i, n) ||
                    t.hasPopupMouseDown ||
                    t.close();
                }
              }),
              (0, l.Z)((0, a.Z)(t), 'getRootDomNode', function () {
                var e = t.props.getTriggerDOMNode;
                if (e) return e(t.triggerRef.current);
                try {
                  var n = (0, g.Z)(t.triggerRef.current);
                  if (n) return n;
                } catch (o) {}
                return h().findDOMNode((0, a.Z)(t));
              }),
              (0, l.Z)((0, a.Z)(t), 'getPopupClassNameFromAlign', function (e) {
                var n = [],
                  o = t.props,
                  i = o.popupPlacement,
                  r = o.builtinPlacements,
                  u = o.prefixCls,
                  a = o.alignPoint,
                  c = o.getPopupClassNameFromAlign;
                return (
                  i && r && n.push(x(r, u, e, a)),
                  c && n.push(c(e)),
                  n.join(' ')
                );
              }),
              (0, l.Z)((0, a.Z)(t), 'getComponent', function () {
                var e = t.props,
                  n = e.prefixCls,
                  o = e.destroyPopupOnHide,
                  r = e.popupClassName,
                  u = e.onPopupAlign,
                  a = e.popupMotion,
                  c = e.popupAnimation,
                  s = e.popupTransitionName,
                  l = e.popupStyle,
                  p = e.mask,
                  d = e.maskAnimation,
                  h = e.maskTransitionName,
                  v = e.maskMotion,
                  m = e.zIndex,
                  g = e.popup,
                  w = e.stretch,
                  y = e.alignPoint,
                  b = e.mobile,
                  E = e.forceRender,
                  M = e.onPopupClick,
                  C = t.state,
                  T = C.popupVisible,
                  Z = C.point,
                  P = t.getPopupAlign(),
                  x = {};
                return (
                  t.isMouseEnterToShow() &&
                    (x.onMouseEnter = t.onPopupMouseEnter),
                  t.isMouseLeaveToHide() &&
                    (x.onMouseLeave = t.onPopupMouseLeave),
                  (x.onMouseDown = t.onPopupMouseDown),
                  (x.onTouchStart = t.onPopupMouseDown),
                  f.createElement(
                    kt,
                    (0, i.Z)(
                      {
                        prefixCls: n,
                        destroyPopupOnHide: o,
                        visible: T,
                        point: y && Z,
                        className: r,
                        align: P,
                        onAlign: u,
                        animation: c,
                        getClassNameFromAlign: t.getPopupClassNameFromAlign,
                      },
                      x,
                      {
                        stretch: w,
                        getRootDomNode: t.getRootDomNode,
                        style: l,
                        mask: p,
                        zIndex: m,
                        transitionName: s,
                        maskAnimation: d,
                        maskTransitionName: h,
                        maskMotion: v,
                        ref: t.popupRef,
                        motion: a,
                        mobile: b,
                        forceRender: E,
                        onClick: M,
                      },
                    ),
                    'function' === typeof g ? g() : g,
                  )
                );
              }),
              (0, l.Z)((0, a.Z)(t), 'attachParent', function (e) {
                v.Z.cancel(t.attachId);
                var n,
                  o = t.props,
                  i = o.getPopupContainer,
                  r = o.getDocument,
                  u = t.getRootDomNode();
                i
                  ? (u || 0 === i.length) && (n = i(u))
                  : (n = r(t.getRootDomNode()).body),
                  n
                    ? n.appendChild(e)
                    : (t.attachId = (0, v.Z)(function () {
                        t.attachParent(e);
                      }));
              }),
              (0, l.Z)((0, a.Z)(t), 'getContainer', function () {
                if (!t.portalContainer) {
                  var e = t.props.getDocument,
                    n = e(t.getRootDomNode()).createElement('div');
                  (n.style.position = 'absolute'),
                    (n.style.top = '0'),
                    (n.style.left = '0'),
                    (n.style.width = '100%'),
                    (t.portalContainer = n);
                }
                return t.attachParent(t.portalContainer), t.portalContainer;
              }),
              (0, l.Z)((0, a.Z)(t), 'setPoint', function (e) {
                var n = t.props.alignPoint;
                n &&
                  e &&
                  t.setState({ point: { pageX: e.pageX, pageY: e.pageY } });
              }),
              (0, l.Z)((0, a.Z)(t), 'handlePortalUpdate', function () {
                t.state.prevPopupVisible !== t.state.popupVisible &&
                  t.props.afterPopupVisibleChange(t.state.popupVisible);
              }),
              (0, l.Z)((0, a.Z)(t), 'triggerContextValue', {
                onPopupMouseDown: t.onPopupMouseDown,
              }),
              (o =
                'popupVisible' in e
                  ? !!e.popupVisible
                  : !!e.defaultPopupVisible),
              (t.state = { prevPopupVisible: o, popupVisible: o }),
              Ht.forEach(function (e) {
                t['fire'.concat(e)] = function (n) {
                  t.fireEvents(e, n);
                };
              }),
              t
            );
          }
          return (
            (0, u.Z)(
              p,
              [
                {
                  key: 'componentDidMount',
                  value: function () {
                    this.componentDidUpdate();
                  },
                },
                {
                  key: 'componentDidUpdate',
                  value: function () {
                    var e,
                      t = this.props,
                      n = this.state;
                    if (n.popupVisible)
                      return (
                        this.clickOutsideHandler ||
                          (!this.isClickToHide() &&
                            !this.isContextMenuToShow()) ||
                          ((e = t.getDocument(this.getRootDomNode())),
                          (this.clickOutsideHandler = (0, y.Z)(
                            e,
                            'mousedown',
                            this.onDocumentClick,
                          ))),
                        this.touchOutsideHandler ||
                          ((e = e || t.getDocument(this.getRootDomNode())),
                          (this.touchOutsideHandler = (0, y.Z)(
                            e,
                            'touchstart',
                            this.onDocumentClick,
                          ))),
                        !this.contextMenuOutsideHandler1 &&
                          this.isContextMenuToShow() &&
                          ((e = e || t.getDocument(this.getRootDomNode())),
                          (this.contextMenuOutsideHandler1 = (0, y.Z)(
                            e,
                            'scroll',
                            this.onContextMenuClose,
                          ))),
                        void (
                          !this.contextMenuOutsideHandler2 &&
                          this.isContextMenuToShow() &&
                          (this.contextMenuOutsideHandler2 = (0, y.Z)(
                            window,
                            'blur',
                            this.onContextMenuClose,
                          ))
                        )
                      );
                    this.clearOutsideHandler();
                  },
                },
                {
                  key: 'componentWillUnmount',
                  value: function () {
                    this.clearDelayTimer(),
                      this.clearOutsideHandler(),
                      clearTimeout(this.mouseDownTimeout),
                      v.Z.cancel(this.attachId);
                  },
                },
                {
                  key: 'getPopupDomNode',
                  value: function () {
                    var e;
                    return (
                      (null === (e = this.popupRef.current) || void 0 === e
                        ? void 0
                        : e.getElement()) || null
                    );
                  },
                },
                {
                  key: 'getPopupAlign',
                  value: function () {
                    var e = this.props,
                      t = e.popupPlacement,
                      n = e.popupAlign,
                      o = e.builtinPlacements;
                    return t && o ? P(o, t, n) : n;
                  },
                },
                {
                  key: 'setPopupVisible',
                  value: function (e, t) {
                    var n = this.props.alignPoint,
                      o = this.state.popupVisible;
                    this.clearDelayTimer(),
                      o !== e &&
                        ('popupVisible' in this.props ||
                          this.setState({
                            popupVisible: e,
                            prevPopupVisible: o,
                          }),
                        this.props.onPopupVisibleChange(e)),
                      n && t && e && this.setPoint(t);
                  },
                },
                {
                  key: 'delaySetPopupVisible',
                  value: function (e, t, n) {
                    var o = this,
                      i = 1e3 * t;
                    if ((this.clearDelayTimer(), i)) {
                      var r = n ? { pageX: n.pageX, pageY: n.pageY } : null;
                      this.delayTimer = window.setTimeout(function () {
                        o.setPopupVisible(e, r), o.clearDelayTimer();
                      }, i);
                    } else this.setPopupVisible(e, n);
                  },
                },
                {
                  key: 'clearDelayTimer',
                  value: function () {
                    this.delayTimer &&
                      (clearTimeout(this.delayTimer), (this.delayTimer = null));
                  },
                },
                {
                  key: 'clearOutsideHandler',
                  value: function () {
                    this.clickOutsideHandler &&
                      (this.clickOutsideHandler.remove(),
                      (this.clickOutsideHandler = null)),
                      this.contextMenuOutsideHandler1 &&
                        (this.contextMenuOutsideHandler1.remove(),
                        (this.contextMenuOutsideHandler1 = null)),
                      this.contextMenuOutsideHandler2 &&
                        (this.contextMenuOutsideHandler2.remove(),
                        (this.contextMenuOutsideHandler2 = null)),
                      this.touchOutsideHandler &&
                        (this.touchOutsideHandler.remove(),
                        (this.touchOutsideHandler = null));
                  },
                },
                {
                  key: 'createTwoChains',
                  value: function (e) {
                    var t = this.props.children.props,
                      n = this.props;
                    return t[e] && n[e] ? this['fire'.concat(e)] : t[e] || n[e];
                  },
                },
                {
                  key: 'isClickToShow',
                  value: function () {
                    var e = this.props,
                      t = e.action,
                      n = e.showAction;
                    return (
                      -1 !== t.indexOf('click') || -1 !== n.indexOf('click')
                    );
                  },
                },
                {
                  key: 'isContextMenuOnly',
                  value: function () {
                    var e = this.props.action;
                    return (
                      'contextMenu' === e ||
                      (1 === e.length && 'contextMenu' === e[0])
                    );
                  },
                },
                {
                  key: 'isContextMenuToShow',
                  value: function () {
                    var e = this.props,
                      t = e.action,
                      n = e.showAction;
                    return (
                      -1 !== t.indexOf('contextMenu') ||
                      -1 !== n.indexOf('contextMenu')
                    );
                  },
                },
                {
                  key: 'isClickToHide',
                  value: function () {
                    var e = this.props,
                      t = e.action,
                      n = e.hideAction;
                    return (
                      -1 !== t.indexOf('click') || -1 !== n.indexOf('click')
                    );
                  },
                },
                {
                  key: 'isMouseEnterToShow',
                  value: function () {
                    var e = this.props,
                      t = e.action,
                      n = e.showAction;
                    return (
                      -1 !== t.indexOf('hover') ||
                      -1 !== n.indexOf('mouseEnter')
                    );
                  },
                },
                {
                  key: 'isMouseLeaveToHide',
                  value: function () {
                    var e = this.props,
                      t = e.action,
                      n = e.hideAction;
                    return (
                      -1 !== t.indexOf('hover') ||
                      -1 !== n.indexOf('mouseLeave')
                    );
                  },
                },
                {
                  key: 'isFocusToShow',
                  value: function () {
                    var e = this.props,
                      t = e.action,
                      n = e.showAction;
                    return (
                      -1 !== t.indexOf('focus') || -1 !== n.indexOf('focus')
                    );
                  },
                },
                {
                  key: 'isBlurToHide',
                  value: function () {
                    var e = this.props,
                      t = e.action,
                      n = e.hideAction;
                    return (
                      -1 !== t.indexOf('focus') || -1 !== n.indexOf('blur')
                    );
                  },
                },
                {
                  key: 'forcePopupAlign',
                  value: function () {
                    var e;
                    this.state.popupVisible &&
                      (null === (e = this.popupRef.current) ||
                        void 0 === e ||
                        e.forceAlign());
                  },
                },
                {
                  key: 'fireEvents',
                  value: function (e, t) {
                    var n = this.props.children.props[e];
                    n && n(t);
                    var o = this.props[e];
                    o && o(t);
                  },
                },
                {
                  key: 'close',
                  value: function () {
                    this.setPopupVisible(!1);
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    var t = this.state.popupVisible,
                      n = this.props,
                      i = n.children,
                      r = n.forceRender,
                      u = n.alignPoint,
                      a = n.className,
                      c = n.autoDestroy,
                      s = f.Children.only(i),
                      l = { key: 'trigger' };
                    this.isContextMenuToShow()
                      ? (l.onContextMenu = this.onContextMenu)
                      : (l.onContextMenu =
                          this.createTwoChains('onContextMenu')),
                      this.isClickToHide() || this.isClickToShow()
                        ? ((l.onClick = this.onClick),
                          (l.onMouseDown = this.onMouseDown),
                          (l.onTouchStart = this.onTouchStart))
                        : ((l.onClick = this.createTwoChains('onClick')),
                          (l.onMouseDown = this.createTwoChains('onMouseDown')),
                          (l.onTouchStart =
                            this.createTwoChains('onTouchStart'))),
                      this.isMouseEnterToShow()
                        ? ((l.onMouseEnter = this.onMouseEnter),
                          u && (l.onMouseMove = this.onMouseMove))
                        : (l.onMouseEnter =
                            this.createTwoChains('onMouseEnter')),
                      this.isMouseLeaveToHide()
                        ? (l.onMouseLeave = this.onMouseLeave)
                        : (l.onMouseLeave =
                            this.createTwoChains('onMouseLeave')),
                      this.isFocusToShow() || this.isBlurToHide()
                        ? ((l.onFocus = this.onFocus), (l.onBlur = this.onBlur))
                        : ((l.onFocus = this.createTwoChains('onFocus')),
                          (l.onBlur = this.createTwoChains('onBlur')));
                    var p = T()(s && s.props && s.props.className, a);
                    p && (l.className = p);
                    var d = (0, o.Z)({}, l);
                    (0, w.Yr)(s) && (d.ref = (0, w.sQ)(this.triggerRef, s.ref));
                    var h,
                      v = f.cloneElement(s, d);
                    return (
                      (t || this.popupRef.current || r) &&
                        (h = f.createElement(
                          e,
                          {
                            key: 'portal',
                            getContainer: this.getContainer,
                            didUpdate: this.handlePortalUpdate,
                          },
                          this.getComponent(),
                        )),
                      !t && c && (h = null),
                      f.createElement(
                        St.Provider,
                        { value: this.triggerContextValue },
                        v,
                        h,
                      )
                    );
                  },
                },
              ],
              [
                {
                  key: 'getDerivedStateFromProps',
                  value: function (e, t) {
                    var n = e.popupVisible,
                      o = {};
                    return (
                      void 0 !== n &&
                        t.popupVisible !== n &&
                        ((o.popupVisible = n),
                        (o.prevPopupVisible = t.popupVisible)),
                      o
                    );
                  },
                },
              ],
            ),
            p
          );
        })(f.Component);
        return (
          (0, l.Z)(t, 'contextType', St),
          (0, l.Z)(t, 'defaultProps', {
            prefixCls: 'rc-trigger-popup',
            getPopupClassNameFromAlign: Dt,
            getDocument: At,
            onPopupVisibleChange: Rt,
            afterPopupVisibleChange: Rt,
            onPopupAlign: Rt,
            popupClassName: '',
            mouseEnterDelay: 0,
            mouseLeaveDelay: 0.1,
            focusDelay: 0,
            blurDelay: 0.15,
            popupStyle: {},
            destroyPopupOnHide: !1,
            popupAlign: {},
            defaultPopupVisible: !1,
            mask: !1,
            maskClosable: !0,
            action: [],
            showAction: [],
            hideAction: [],
            autoDestroy: !1,
          }),
          t
        );
      }
      var Vt = Lt(M);
    },
    64019: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return r;
        },
      });
      var o = n(11092),
        i = n.n(o);
      function r(e, t, n, o) {
        var r = i().unstable_batchedUpdates
          ? function (e) {
              i().unstable_batchedUpdates(n, e);
            }
          : n;
        return (
          e.addEventListener && e.addEventListener(t, r, o),
          {
            remove: function () {
              e.removeEventListener && e.removeEventListener(t, r, o);
            },
          }
        );
      }
    },
    5110: function (e, t) {
      'use strict';
      t['Z'] = function (e) {
        if (!e) return !1;
        if (e instanceof HTMLElement && e.offsetParent) return !0;
        if (e instanceof SVGGraphicsElement && e.getBBox) {
          var t = e.getBBox(),
            n = t.width,
            o = t.height;
          if (n || o) return !0;
        }
        if (e instanceof HTMLElement && e.getBoundingClientRect) {
          var i = e.getBoundingClientRect(),
            r = i.width,
            u = i.height;
          if (r || u) return !0;
        }
        return !1;
      };
    },
    15105: function (e, t) {
      'use strict';
      var n = {
        MAC_ENTER: 3,
        BACKSPACE: 8,
        TAB: 9,
        NUM_CENTER: 12,
        ENTER: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PRINT_SCREEN: 44,
        INSERT: 45,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        QUESTION_MARK: 63,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        META: 91,
        WIN_KEY_RIGHT: 92,
        CONTEXT_MENU: 93,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        NUMLOCK: 144,
        SEMICOLON: 186,
        DASH: 189,
        EQUALS: 187,
        COMMA: 188,
        PERIOD: 190,
        SLASH: 191,
        APOSTROPHE: 192,
        SINGLE_QUOTE: 222,
        OPEN_SQUARE_BRACKET: 219,
        BACKSLASH: 220,
        CLOSE_SQUARE_BRACKET: 221,
        WIN_KEY: 224,
        MAC_FF_META: 224,
        WIN_IME: 229,
        isTextModifyingKeyEvent: function (e) {
          var t = e.keyCode;
          if (
            (e.altKey && !e.ctrlKey) ||
            e.metaKey ||
            (t >= n.F1 && t <= n.F12)
          )
            return !1;
          switch (t) {
            case n.ALT:
            case n.CAPS_LOCK:
            case n.CONTEXT_MENU:
            case n.CTRL:
            case n.DOWN:
            case n.END:
            case n.ESC:
            case n.HOME:
            case n.INSERT:
            case n.LEFT:
            case n.MAC_FF_META:
            case n.META:
            case n.NUMLOCK:
            case n.NUM_CENTER:
            case n.PAGE_DOWN:
            case n.PAGE_UP:
            case n.PAUSE:
            case n.PRINT_SCREEN:
            case n.RIGHT:
            case n.SHIFT:
            case n.UP:
            case n.WIN_KEY:
            case n.WIN_KEY_RIGHT:
              return !1;
            default:
              return !0;
          }
        },
        isCharacterKey: function (e) {
          if (e >= n.ZERO && e <= n.NINE) return !0;
          if (e >= n.NUM_ZERO && e <= n.NUM_MULTIPLY) return !0;
          if (e >= n.A && e <= n.Z) return !0;
          if (-1 !== window.navigator.userAgent.indexOf('WebKit') && 0 === e)
            return !0;
          switch (e) {
            case n.SPACE:
            case n.QUESTION_MARK:
            case n.NUM_PLUS:
            case n.NUM_MINUS:
            case n.NUM_PERIOD:
            case n.NUM_DIVISION:
            case n.SEMICOLON:
            case n.DASH:
            case n.EQUALS:
            case n.COMMA:
            case n.PERIOD:
            case n.SLASH:
            case n.APOSTROPHE:
            case n.SINGLE_QUOTE:
            case n.OPEN_SQUARE_BRACKET:
            case n.BACKSLASH:
            case n.CLOSE_SQUARE_BRACKET:
              return !0;
            default:
              return !1;
          }
        },
      };
      t['Z'] = n;
    },
    66680: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return i;
        },
      });
      var o = n(12924);
      function i(e) {
        var t = o.useRef();
        t.current = e;
        var n = o.useCallback(function () {
          for (var e, n = arguments.length, o = new Array(n), i = 0; i < n; i++)
            o[i] = arguments[i];
          return null === (e = t.current) || void 0 === e
            ? void 0
            : e.call.apply(e, [t].concat(o));
        }, []);
        return n;
      }
    },
    8410: function (e, t, n) {
      'use strict';
      n.d(t, {
        o: function () {
          return u;
        },
      });
      var o = n(12924),
        i = n(98924),
        r = (0, i.Z)() ? o.useLayoutEffect : o.useEffect;
      t['Z'] = r;
      var u = function (e, t) {
        var n = o.useRef(!0);
        r(function () {
          if (!n.current) return e();
        }, t),
          r(function () {
            return (
              (n.current = !1),
              function () {
                n.current = !0;
              }
            );
          }, []);
      };
    },
    21770: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return c;
        },
      });
      var o = n(28481),
        i = n(66680),
        r = n(8410),
        u = n(30470);
      function a(e) {
        return void 0 !== e;
      }
      function c(e, t) {
        var n = t || {},
          c = n.defaultValue,
          s = n.value,
          l = n.onChange,
          f = n.postState,
          p = (0, u.Z)(function () {
            return a(s)
              ? s
              : a(c)
              ? 'function' === typeof c
                ? c()
                : c
              : 'function' === typeof e
              ? e()
              : e;
          }),
          d = (0, o.Z)(p, 2),
          h = d[0],
          v = d[1],
          m = void 0 !== s ? s : h,
          g = f ? f(m) : m,
          w = (0, i.Z)(l),
          y = (0, u.Z)([m]),
          b = (0, o.Z)(y, 2),
          E = b[0],
          M = b[1];
        (0, r.o)(
          function () {
            var e = E[0];
            h !== e && w(h, e);
          },
          [E],
        ),
          (0, r.o)(
            function () {
              a(s) || v(s);
            },
            [s],
          );
        var C = (0, i.Z)(function (e, t) {
          v(e, t), M([m], t);
        });
        return [g, C];
      }
    },
    91881: function (e, t, n) {
      'use strict';
      var o = n(90484),
        i = n(80334);
      function r(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          r = new Set();
        function u(e, t) {
          var a =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 1,
            c = r.has(e);
          if (((0, i.ZP)(!c, 'Warning: There may be circular references'), c))
            return !1;
          if (e === t) return !0;
          if (n && a > 1) return !1;
          r.add(e);
          var s = a + 1;
          if (Array.isArray(e)) {
            if (!Array.isArray(t) || e.length !== t.length) return !1;
            for (var l = 0; l < e.length; l++) if (!u(e[l], t[l], s)) return !1;
            return !0;
          }
          if (e && t && 'object' === (0, o.Z)(e) && 'object' === (0, o.Z)(t)) {
            var f = Object.keys(e);
            return (
              f.length === Object.keys(t).length &&
              f.every(function (n) {
                return u(e[n], t[n], s);
              })
            );
          }
          return !1;
        }
        return u(e, t);
      }
      t['Z'] = r;
    },
    31131: function (e, t) {
      'use strict';
      t['Z'] = function () {
        if ('undefined' === typeof navigator || 'undefined' === typeof window)
          return !1;
        var e = navigator.userAgent || navigator.vendor || window.opera;
        return (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
            e,
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
            null === e || void 0 === e ? void 0 : e.substr(0, 4),
          )
        );
      };
    },
  },
]);
