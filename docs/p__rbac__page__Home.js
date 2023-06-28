(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9363],
  {
    3178: function () {},
    13277: function () {},
    15894: function (e, t, n) {
      'use strict';
      n.r(t);
      n(71153);
      var r,
        a,
        o = n(60331),
        c = (n(17462), n(76772)),
        i = (n(402), n(55672)),
        l = n(20310),
        s = n(12924),
        u = n.n(s),
        d = n(12788),
        f = n(60345),
        p = n(35766),
        m = n(57119),
        v = d.ZP.div(
          r ||
            (r = (0, l.Z)([
              '\n  padding: 1.6em;\n  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;\n',
            ])),
        ),
        h = d.ZP.div(
          a || (a = (0, l.Z)(['\n  margin: 2em;\n  padding: 1em;\n'])),
        ),
        g = (e) =>
          u().createElement(
            u().Fragment,
            null,
            u().createElement(
              v,
              null,
              u().createElement(
                i.Z.Title,
                { level: 2 },
                'Envelope \u7ba1\u7406\u9875',
              ),
            ),
            u().createElement(
              h,
              null,
              u().createElement(c.Z, {
                type: 'success',
                message:
                  '\u6b22\u8fce\u56de\u6765\uff0c\u7ba1\u7406\u5458 xiye',
                closable: !0,
              }),
              u().createElement(f.Z, { hidden: !0 }),
              u().createElement(
                p.Z,
                null,
                u().createElement(
                  i.Z.Title,
                  { level: 5 },
                  u().createElement(
                    o.Z,
                    { icon: u().createElement(m.Z, null), color: 'warning' },
                    'warning',
                  ),
                  '\u8bf7\u81ea\u89c9\u9075\u5b88\u64cd\u4f5c\u89c4\u8303',
                ),
              ),
              u().createElement(
                p.Z,
                null,
                u().createElement(
                  i.Z.Title,
                  { level: 5 },
                  u().createElement(
                    o.Z,
                    { icon: u().createElement(m.Z, null), color: 'warning' },
                    'warning',
                  ),
                  '\u7ba1\u7406\u8d23\u4efb\u91cd\u5927\uff0c\u4fee\u6539\u6570\u636e\u8bf7\u8c28\u614e\uff01',
                ),
              ),
            ),
          );
      t['default'] = g;
    },
    5467: function (e, t, n) {
      'use strict';
      function r(e) {
        return Object.keys(e).reduce(function (t, n) {
          return (
            (!n.startsWith('data-') &&
              !n.startsWith('aria-') &&
              'role' !== n) ||
              n.startsWith('data-__') ||
              (t[n] = e[n]),
            t
          );
        }, {});
      }
      n.d(t, {
        Z: function () {
          return r;
        },
      });
    },
    21790: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return N;
        },
      });
      var r = n(6610),
        a = n(5991),
        o = n(63349),
        c = n(10379),
        i = n(54070),
        l = n(44958),
        s = n(42550),
        u = n(12924),
        d = n(53124),
        f = n(75164),
        p = 0,
        m = {};
      function v(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
          n = p++,
          r = t;
        function a() {
          (r -= 1), r <= 0 ? (e(), delete m[n]) : (m[n] = (0, f.Z)(a));
        }
        return (m[n] = (0, f.Z)(a)), n;
      }
      (v.cancel = function (e) {
        void 0 !== e && (f.Z.cancel(m[e]), delete m[e]);
      }),
        (v.ids = m);
      var h,
        g = n(96159);
      function y(e) {
        return !e || null === e.offsetParent || e.hidden;
      }
      function E(e) {
        return e instanceof Document
          ? e.body
          : Array.from(e.childNodes).find(function (e) {
              return (
                (null === e || void 0 === e ? void 0 : e.nodeType) ===
                Node.ELEMENT_NODE
              );
            });
      }
      function Z(e) {
        var t = (e || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
        return (
          !(t && t[1] && t[2] && t[3]) || !(t[1] === t[2] && t[2] === t[3])
        );
      }
      var b = (function (e) {
        (0, c.Z)(n, e);
        var t = (0, i.Z)(n);
        function n() {
          var e;
          return (
            (0, r.Z)(this, n),
            (e = t.apply(this, arguments)),
            (e.containerRef = u.createRef()),
            (e.animationStart = !1),
            (e.destroyed = !1),
            (e.onClick = function (t, n) {
              var r,
                a,
                c = e.props,
                i = c.insertExtraNode,
                s = c.disabled;
              if (!s && t && !y(t) && !t.className.includes('-leave')) {
                e.extraNode = document.createElement('div');
                var u = (0, o.Z)(e),
                  d = u.extraNode,
                  f = e.context.getPrefixCls;
                d.className = ''.concat(f(''), '-click-animating-node');
                var p = e.getAttributeName();
                if (
                  (t.setAttribute(p, 'true'),
                  n &&
                    '#fff' !== n &&
                    '#ffffff' !== n &&
                    'rgb(255, 255, 255)' !== n &&
                    'rgba(255, 255, 255, 1)' !== n &&
                    Z(n) &&
                    !/rgba\((?:\d*, ){3}0\)/.test(n) &&
                    'transparent' !== n)
                ) {
                  d.style.borderColor = n;
                  var m =
                      (null === (r = t.getRootNode) || void 0 === r
                        ? void 0
                        : r.call(t)) || t.ownerDocument,
                    v = null !== (a = E(m)) && void 0 !== a ? a : m;
                  h = (0, l.hq)(
                    '\n      ['
                      .concat(
                        f(''),
                        "-click-animating-without-extra-node='true']::after, .",
                      )
                      .concat(
                        f(''),
                        '-click-animating-node {\n        --antd-wave-shadow-color: ',
                      )
                      .concat(n, ';\n      }'),
                    'antd-wave',
                    { csp: e.csp, attachTo: v },
                  );
                }
                i && t.appendChild(d),
                  ['transition', 'animation'].forEach(function (n) {
                    t.addEventListener(
                      ''.concat(n, 'start'),
                      e.onTransitionStart,
                    ),
                      t.addEventListener(
                        ''.concat(n, 'end'),
                        e.onTransitionEnd,
                      );
                  });
              }
            }),
            (e.onTransitionStart = function (t) {
              if (!e.destroyed) {
                var n = e.containerRef.current;
                t && t.target === n && !e.animationStart && e.resetEffect(n);
              }
            }),
            (e.onTransitionEnd = function (t) {
              t && 'fadeEffect' === t.animationName && e.resetEffect(t.target);
            }),
            (e.bindAnimationEvent = function (t) {
              if (
                t &&
                t.getAttribute &&
                !t.getAttribute('disabled') &&
                !t.className.includes('disabled')
              ) {
                var n = function (n) {
                  if ('INPUT' !== n.target.tagName && !y(n.target)) {
                    e.resetEffect(t);
                    var r =
                      getComputedStyle(t).getPropertyValue(
                        'border-top-color',
                      ) ||
                      getComputedStyle(t).getPropertyValue('border-color') ||
                      getComputedStyle(t).getPropertyValue('background-color');
                    (e.clickWaveTimeoutId = window.setTimeout(function () {
                      return e.onClick(t, r);
                    }, 0)),
                      v.cancel(e.animationStartId),
                      (e.animationStart = !0),
                      (e.animationStartId = v(function () {
                        e.animationStart = !1;
                      }, 10));
                  }
                };
                return (
                  t.addEventListener('click', n, !0),
                  {
                    cancel: function () {
                      t.removeEventListener('click', n, !0);
                    },
                  }
                );
              }
            }),
            (e.renderWave = function (t) {
              var n = t.csp,
                r = e.props.children;
              if (((e.csp = n), !u.isValidElement(r))) return r;
              var a = e.containerRef;
              return (
                (0, s.Yr)(r) && (a = (0, s.sQ)(r.ref, e.containerRef)),
                (0, g.Tm)(r, { ref: a })
              );
            }),
            e
          );
        }
        return (
          (0, a.Z)(n, [
            {
              key: 'componentDidMount',
              value: function () {
                this.destroyed = !1;
                var e = this.containerRef.current;
                e &&
                  1 === e.nodeType &&
                  (this.instance = this.bindAnimationEvent(e));
              },
            },
            {
              key: 'componentWillUnmount',
              value: function () {
                this.instance && this.instance.cancel(),
                  this.clickWaveTimeoutId &&
                    clearTimeout(this.clickWaveTimeoutId),
                  (this.destroyed = !0);
              },
            },
            {
              key: 'getAttributeName',
              value: function () {
                var e = this.context.getPrefixCls,
                  t = this.props.insertExtraNode;
                return ''.concat(
                  e(''),
                  t
                    ? '-click-animating'
                    : '-click-animating-without-extra-node',
                );
              },
            },
            {
              key: 'resetEffect',
              value: function (e) {
                var t = this;
                if (e && e !== this.extraNode && e instanceof Element) {
                  var n = this.props.insertExtraNode,
                    r = this.getAttributeName();
                  e.setAttribute(r, 'false'),
                    h && (h.innerHTML = ''),
                    n &&
                      this.extraNode &&
                      e.contains(this.extraNode) &&
                      e.removeChild(this.extraNode),
                    ['transition', 'animation'].forEach(function (n) {
                      e.removeEventListener(
                        ''.concat(n, 'start'),
                        t.onTransitionStart,
                      ),
                        e.removeEventListener(
                          ''.concat(n, 'end'),
                          t.onTransitionEnd,
                        );
                    });
                }
              },
            },
            {
              key: 'render',
              value: function () {
                return u.createElement(d.C, null, this.renderWave);
              },
            },
          ]),
          n
        );
      })(u.Component);
      b.contextType = d.E_;
      var N = b;
    },
    76772: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return A;
        },
      });
      var r = n(22122),
        a = n(28481),
        o = n(96156),
        c = n(38819),
        i = n(15873),
        l = n(43061),
        s = n(73218),
        u = n(54549),
        d = n(68855),
        f = n(57119),
        p = n(40847),
        m = n(68628),
        v = n(94184),
        h = n.n(v),
        g = n(63441),
        y = n(12924),
        E = n(53124),
        Z = n(5467),
        b = n(96159),
        N = n(6610),
        k = n(5991),
        x = n(10379),
        C = n(54070),
        w = (function (e) {
          (0, x.Z)(n, e);
          var t = (0, C.Z)(n);
          function n() {
            var e;
            return (
              (0, N.Z)(this, n),
              (e = t.apply(this, arguments)),
              (e.state = { error: void 0, info: { componentStack: '' } }),
              e
            );
          }
          return (
            (0, k.Z)(n, [
              {
                key: 'componentDidCatch',
                value: function (e, t) {
                  this.setState({ error: e, info: t });
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    t = e.message,
                    n = e.description,
                    r = e.children,
                    a = this.state,
                    o = a.error,
                    c = a.info,
                    i = c && c.componentStack ? c.componentStack : null,
                    l = 'undefined' === typeof t ? (o || '').toString() : t,
                    s = 'undefined' === typeof n ? i : n;
                  return o
                    ? y.createElement(A, {
                        type: 'error',
                        message: l,
                        description: y.createElement('pre', null, s),
                      })
                    : r;
                },
              },
            ]),
            n
          );
        })(y.Component),
        O = w,
        T = function (e, t) {
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
        P = { success: c.Z, info: p.Z, error: l.Z, warning: d.Z },
        G = { success: i.Z, info: m.Z, error: s.Z, warning: f.Z },
        S = function (e) {
          var t = e.description,
            n = e.icon,
            r = e.prefixCls,
            a = e.type,
            c = (t ? G : P)[a] || null;
          return n
            ? (0, b.wm)(
                n,
                y.createElement(
                  'span',
                  { className: ''.concat(r, '-icon') },
                  n,
                ),
                function () {
                  return {
                    className: h()(
                      ''.concat(r, '-icon'),
                      (0, o.Z)({}, n.props.className, n.props.className),
                    ),
                  };
                },
              )
            : y.createElement(c, { className: ''.concat(r, '-icon') });
        },
        j = function (e) {
          var t = e.isClosable,
            n = e.closeText,
            r = e.prefixCls,
            a = e.closeIcon,
            o = e.handleClose;
          return t
            ? y.createElement(
                'button',
                {
                  type: 'button',
                  onClick: o,
                  className: ''.concat(r, '-close-icon'),
                  tabIndex: 0,
                },
                n
                  ? y.createElement(
                      'span',
                      { className: ''.concat(r, '-close-text') },
                      n,
                    )
                  : a,
              )
            : null;
        },
        I = function (e) {
          var t,
            n = e.description,
            c = e.prefixCls,
            i = e.message,
            l = e.banner,
            s = e.className,
            d = void 0 === s ? '' : s,
            f = e.style,
            p = e.onMouseEnter,
            m = e.onMouseLeave,
            v = e.onClick,
            b = e.afterClose,
            N = e.showIcon,
            k = e.closable,
            x = e.closeText,
            C = e.closeIcon,
            w = void 0 === C ? y.createElement(u.Z, null) : C,
            O = e.action,
            P = T(e, [
              'description',
              'prefixCls',
              'message',
              'banner',
              'className',
              'style',
              'onMouseEnter',
              'onMouseLeave',
              'onClick',
              'afterClose',
              'showIcon',
              'closable',
              'closeText',
              'closeIcon',
              'action',
            ]),
            G = y.useState(!1),
            I = (0, a.Z)(G, 2),
            A = I[0],
            L = I[1],
            R = y.useRef(),
            z = y.useContext(E.E_),
            M = z.getPrefixCls,
            W = z.direction,
            D = M('alert', c),
            _ = function (e) {
              var t;
              L(!0), null === (t = P.onClose) || void 0 === t || t.call(P, e);
            },
            K = function () {
              var e = P.type;
              return void 0 !== e ? e : l ? 'warning' : 'info';
            },
            U = !!x || k,
            H = K(),
            V = !(!l || void 0 !== N) || N,
            q = h()(
              D,
              ''.concat(D, '-').concat(H),
              ((t = {}),
              (0, o.Z)(t, ''.concat(D, '-with-description'), !!n),
              (0, o.Z)(t, ''.concat(D, '-no-icon'), !V),
              (0, o.Z)(t, ''.concat(D, '-banner'), !!l),
              (0, o.Z)(t, ''.concat(D, '-rtl'), 'rtl' === W),
              t),
              d,
            ),
            F = (0, Z.Z)(P);
          return y.createElement(
            g.default,
            {
              visible: !A,
              motionName: ''.concat(D, '-motion'),
              motionAppear: !1,
              motionEnter: !1,
              onLeaveStart: function (e) {
                return { maxHeight: e.offsetHeight };
              },
              onLeaveEnd: b,
            },
            function (e) {
              var t = e.className,
                a = e.style;
              return y.createElement(
                'div',
                (0, r.Z)(
                  {
                    ref: R,
                    'data-show': !A,
                    className: h()(q, t),
                    style: (0, r.Z)((0, r.Z)({}, f), a),
                    onMouseEnter: p,
                    onMouseLeave: m,
                    onClick: v,
                    role: 'alert',
                  },
                  F,
                ),
                V
                  ? y.createElement(S, {
                      description: n,
                      icon: P.icon,
                      prefixCls: D,
                      type: H,
                    })
                  : null,
                y.createElement(
                  'div',
                  { className: ''.concat(D, '-content') },
                  i
                    ? y.createElement(
                        'div',
                        { className: ''.concat(D, '-message') },
                        i,
                      )
                    : null,
                  n
                    ? y.createElement(
                        'div',
                        { className: ''.concat(D, '-description') },
                        n,
                      )
                    : null,
                ),
                O
                  ? y.createElement(
                      'div',
                      { className: ''.concat(D, '-action') },
                      O,
                    )
                  : null,
                y.createElement(j, {
                  isClosable: !!U,
                  closeText: x,
                  prefixCls: D,
                  closeIcon: w,
                  handleClose: _,
                }),
              );
            },
          );
        };
      I.ErrorBoundary = O;
      var A = I;
    },
    17462: function (e, t, n) {
      'use strict';
      n(38663), n(3178);
    },
    60331: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return N;
        },
      });
      var r = n(96156),
        a = n(22122),
        o = n(28481),
        c = n(54549),
        i = n(94184),
        l = n.n(i),
        s = n(98423),
        u = n(12924),
        d = n(53124),
        f = n(98787),
        p = n(21790),
        m = function (e, t) {
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
        v = function (e) {
          var t,
            n = e.prefixCls,
            o = e.className,
            c = e.checked,
            i = e.onChange,
            s = e.onClick,
            f = m(e, [
              'prefixCls',
              'className',
              'checked',
              'onChange',
              'onClick',
            ]),
            p = u.useContext(d.E_),
            v = p.getPrefixCls,
            h = function (e) {
              null === i || void 0 === i || i(!c),
                null === s || void 0 === s || s(e);
            },
            g = v('tag', n),
            y = l()(
              g,
              ((t = {}),
              (0, r.Z)(t, ''.concat(g, '-checkable'), !0),
              (0, r.Z)(t, ''.concat(g, '-checkable-checked'), c),
              t),
              o,
            );
          return u.createElement(
            'span',
            (0, a.Z)({}, f, { className: y, onClick: h }),
          );
        },
        h = v,
        g = function (e, t) {
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
        y = new RegExp('^('.concat(f.Y.join('|'), ')(-inverse)?$')),
        E = new RegExp('^('.concat(f.E.join('|'), ')$')),
        Z = function (e, t) {
          var n,
            i = e.prefixCls,
            f = e.className,
            m = e.style,
            v = e.children,
            h = e.icon,
            Z = e.color,
            b = e.onClose,
            N = e.closeIcon,
            k = e.closable,
            x = void 0 !== k && k,
            C = g(e, [
              'prefixCls',
              'className',
              'style',
              'children',
              'icon',
              'color',
              'onClose',
              'closeIcon',
              'closable',
            ]),
            w = u.useContext(d.E_),
            O = w.getPrefixCls,
            T = w.direction,
            P = u.useState(!0),
            G = (0, o.Z)(P, 2),
            S = G[0],
            j = G[1];
          u.useEffect(
            function () {
              'visible' in C && j(C.visible);
            },
            [C.visible],
          );
          var I = function () {
              return !!Z && (y.test(Z) || E.test(Z));
            },
            A = (0, a.Z)({ backgroundColor: Z && !I() ? Z : void 0 }, m),
            L = I(),
            R = O('tag', i),
            z = l()(
              R,
              ((n = {}),
              (0, r.Z)(n, ''.concat(R, '-').concat(Z), L),
              (0, r.Z)(n, ''.concat(R, '-has-color'), Z && !L),
              (0, r.Z)(n, ''.concat(R, '-hidden'), !S),
              (0, r.Z)(n, ''.concat(R, '-rtl'), 'rtl' === T),
              n),
              f,
            ),
            M = function (e) {
              e.stopPropagation(),
                null === b || void 0 === b || b(e),
                e.defaultPrevented || 'visible' in C || j(!1);
            },
            W = function () {
              return x
                ? N
                  ? u.createElement(
                      'span',
                      { className: ''.concat(R, '-close-icon'), onClick: M },
                      N,
                    )
                  : u.createElement(c.Z, {
                      className: ''.concat(R, '-close-icon'),
                      onClick: M,
                    })
                : null;
            },
            D = 'onClick' in C || (v && 'a' === v.type),
            _ = (0, s.Z)(C, ['visible']),
            K = h || null,
            U = K
              ? u.createElement(
                  u.Fragment,
                  null,
                  K,
                  u.createElement('span', null, v),
                )
              : v,
            H = u.createElement(
              'span',
              (0, a.Z)({}, _, { ref: t, className: z, style: A }),
              U,
              W(),
            );
          return D ? u.createElement(p.Z, null, H) : H;
        },
        b = u.forwardRef(Z);
      b.CheckableTag = h;
      var N = b;
    },
    71153: function (e, t, n) {
      'use strict';
      n(38663), n(13277);
    },
    86010: function (e, t, n) {
      'use strict';
      function r(e) {
        var t,
          n,
          a = '';
        if ('string' == typeof e || 'number' == typeof e) a += e;
        else if ('object' == typeof e)
          if (Array.isArray(e))
            for (t = 0; t < e.length; t++)
              e[t] && (n = r(e[t])) && (a && (a += ' '), (a += n));
          else for (t in e) e[t] && (a && (a += ' '), (a += t));
        return a;
      }
      function a() {
        for (var e, t, n = 0, a = ''; n < arguments.length; )
          (e = arguments[n++]) && (t = r(e)) && (a && (a += ' '), (a += t));
        return a;
      }
      n.r(t),
        n.d(t, {
          clsx: function () {
            return a;
          },
        }),
        (t['default'] = a);
    },
    1429: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return d;
        },
      });
      var r = n(93585),
        a = n(71650),
        o = n(19934);
      function c(e, t) {
        var n;
        return (
          (0, o.Z)(e, function (e, r, a) {
            return (n = t(e, r, a)), !n;
          }),
          !!n
        );
      }
      var i = c,
        l = n(39350),
        s = n(40185);
      function u(e, t, n) {
        var o = (0, l.Z)(e) ? r.Z : i;
        return n && (0, s.Z)(e, t, n) && (t = void 0), o(e, (0, a.Z)(t, 3));
      }
      var d = u;
    },
    60345: function (e, t, n) {
      'use strict';
      var r = n(22122),
        a = n(86010),
        o = (n(55301), n(12924)),
        c = n.n(o),
        i = n(92063),
        l = n(28935),
        s = n(12519),
        u = n(92248);
      function d(e) {
        var t = e.children,
          n = e.className,
          o = e.clearing,
          f = e.content,
          p = e.fitted,
          m = e.hidden,
          v = e.horizontal,
          h = e.inverted,
          g = e.section,
          y = e.vertical,
          E = (0, a.default)(
            'ui',
            (0, i.lG)(o, 'clearing'),
            (0, i.lG)(p, 'fitted'),
            (0, i.lG)(m, 'hidden'),
            (0, i.lG)(v, 'horizontal'),
            (0, i.lG)(h, 'inverted'),
            (0, i.lG)(g, 'section'),
            (0, i.lG)(y, 'vertical'),
            'divider',
            n,
          ),
          Z = (0, l.Z)(d, e),
          b = (0, s.Z)(d, e);
        return c().createElement(
          b,
          (0, r.Z)({}, Z, { className: E }),
          u.kK(t) ? f : t,
        );
      }
      (d.handledProps = [
        'as',
        'children',
        'className',
        'clearing',
        'content',
        'fitted',
        'hidden',
        'horizontal',
        'inverted',
        'section',
        'vertical',
      ]),
        (d.propTypes = {}),
        (t['Z'] = d);
    },
    35766: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return h;
        },
      });
      var r = n(22122),
        a = n(86010),
        o = (n(55301), n(12924)),
        c = n.n(o),
        i = n(92063),
        l = n(28935),
        s = n(12519),
        u = n(92248);
      function d(e) {
        var t = e.children,
          n = e.className,
          o = e.compact,
          f = e.content,
          p = e.horizontal,
          m = e.piled,
          v = e.raised,
          h = e.size,
          g = e.stacked,
          y = (0, a.default)(
            'ui',
            h,
            (0, i.lG)(o, 'compact'),
            (0, i.lG)(p, 'horizontal'),
            (0, i.lG)(m, 'piled'),
            (0, i.lG)(v, 'raised'),
            (0, i.lG)(g, 'stacked'),
            'segments',
            n,
          ),
          E = (0, l.Z)(d, e),
          Z = (0, s.Z)(d, e);
        return c().createElement(
          Z,
          (0, r.Z)({}, E, { className: y }),
          u.kK(t) ? f : t,
        );
      }
      (d.handledProps = [
        'as',
        'children',
        'className',
        'compact',
        'content',
        'horizontal',
        'piled',
        'raised',
        'size',
        'stacked',
      ]),
        (d.propTypes = {});
      var f = d;
      function p(e) {
        var t = e.children,
          n = e.className,
          o = e.content,
          i = (0, a.default)('inline', n),
          d = (0, l.Z)(p, e),
          f = (0, s.Z)(p, e);
        return c().createElement(
          f,
          (0, r.Z)({}, d, { className: i }),
          u.kK(t) ? o : t,
        );
      }
      (p.handledProps = ['as', 'children', 'className', 'content']),
        (p.propTypes = {});
      var m = p;
      function v(e) {
        var t = e.attached,
          n = e.basic,
          o = e.children,
          d = e.circular,
          f = e.className,
          p = e.clearing,
          m = e.color,
          h = e.compact,
          g = e.content,
          y = e.disabled,
          E = e.floated,
          Z = e.inverted,
          b = e.loading,
          N = e.placeholder,
          k = e.padded,
          x = e.piled,
          C = e.raised,
          w = e.secondary,
          O = e.size,
          T = e.stacked,
          P = e.tertiary,
          G = e.textAlign,
          S = e.vertical,
          j = (0, a.default)(
            'ui',
            m,
            O,
            (0, i.lG)(n, 'basic'),
            (0, i.lG)(d, 'circular'),
            (0, i.lG)(p, 'clearing'),
            (0, i.lG)(h, 'compact'),
            (0, i.lG)(y, 'disabled'),
            (0, i.lG)(Z, 'inverted'),
            (0, i.lG)(b, 'loading'),
            (0, i.lG)(N, 'placeholder'),
            (0, i.lG)(x, 'piled'),
            (0, i.lG)(C, 'raised'),
            (0, i.lG)(w, 'secondary'),
            (0, i.lG)(T, 'stacked'),
            (0, i.lG)(P, 'tertiary'),
            (0, i.lG)(S, 'vertical'),
            (0, i.sU)(t, 'attached'),
            (0, i.sU)(k, 'padded'),
            (0, i.X4)(G),
            (0, i.cD)(E, 'floated'),
            'segment',
            f,
          ),
          I = (0, l.Z)(v, e),
          A = (0, s.Z)(v, e);
        return c().createElement(
          A,
          (0, r.Z)({}, I, { className: j }),
          u.kK(o) ? g : o,
        );
      }
      (v.handledProps = [
        'as',
        'attached',
        'basic',
        'children',
        'circular',
        'className',
        'clearing',
        'color',
        'compact',
        'content',
        'disabled',
        'floated',
        'inverted',
        'loading',
        'padded',
        'piled',
        'placeholder',
        'raised',
        'secondary',
        'size',
        'stacked',
        'tertiary',
        'textAlign',
        'vertical',
      ]),
        (v.Group = f),
        (v.Inline = m),
        (v.propTypes = {});
      var h = v;
    },
    92248: function (e, t, n) {
      'use strict';
      n.d(t, {
        tQ: function () {
          return o;
        },
        kK: function () {
          return c;
        },
      });
      var r = n(1429),
        a = n(12924),
        o = function (e, t) {
          return (0, r.Z)(a.Children.toArray(e), { type: t });
        },
        c = function (e) {
          return (
            null === e || void 0 === e || (Array.isArray(e) && 0 === e.length)
          );
        };
    },
    92063: function (e, t, n) {
      'use strict';
      n.d(t, {
        lG: function () {
          return o;
        },
        sU: function () {
          return i;
        },
        MR: function () {
          return l;
        },
        X4: function () {
          return s;
        },
        cD: function () {
          return c;
        },
        Ok: function () {
          return u;
        },
        H0: function () {
          return d;
        },
      });
      var r = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
      };
      function a(e) {
        var t = typeof e;
        return 'string' === t || 'number' === t ? r[e] || e : '';
      }
      var o = function (e, t) {
          return e && t;
        },
        c = function (e, t) {
          return e && !0 !== e && e + ' ' + t;
        },
        i = function (e, t) {
          return e && (!0 === e ? t : e + ' ' + t);
        },
        l = function (e, t) {
          return e && !0 !== e
            ? e
                .replace('large screen', 'large-screen')
                .replace(/ vertically/g, '-vertically')
                .split(' ')
                .map(function (e) {
                  return e.replace('-', ' ') + ' ' + t;
                })
                .join(' ')
            : null;
        },
        s = function (e) {
          return 'justified' === e ? 'justified' : c(e, 'aligned');
        },
        u = function (e) {
          return c(e, 'aligned');
        },
        d = function (e, t, n) {
          if (
            (void 0 === t && (t = ''),
            void 0 === n && (n = !1),
            n && 'equal' === e)
          )
            return 'equal width';
          var r = typeof e;
          return ('string' !== r && 'number' !== r) || !t
            ? a(e)
            : a(e) + ' ' + t;
        };
    },
    12519: function (e, t) {
      'use strict';
      function n(e, t, n) {
        var r = e.defaultProps,
          a = void 0 === r ? {} : r;
        if (t.as && t.as !== a.as) return t.as;
        if (n) {
          var o = n();
          if (o) return o;
        }
        return t.href ? 'a' : a.as || 'div';
      }
      t['Z'] = n;
    },
    28935: function (e, t) {
      'use strict';
      var n = function (e, t) {
        var n = e.handledProps,
          r = void 0 === n ? [] : n;
        return Object.keys(t).reduce(function (e, n) {
          return 'childKey' === n || (-1 === r.indexOf(n) && (e[n] = t[n])), e;
        }, {});
      };
      t['Z'] = n;
    },
  },
]);
