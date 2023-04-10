(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8626],
  {
    9683: function () {},
    96159: function (t, e, n) {
      'use strict';
      n.d(e, {
        l$: function () {
          return o;
        },
        M2: function () {
          return i;
        },
        wm: function () {
          return a;
        },
        Tm: function () {
          return c;
        },
      });
      var r = n(12924),
        o = r.isValidElement;
      function i(t) {
        return t && o(t) && t.type === r.Fragment;
      }
      function a(t, e, n) {
        return o(t)
          ? r.cloneElement(t, 'function' === typeof n ? n(t.props || {}) : n)
          : e;
      }
      function c(t, e) {
        return a(t, t, e);
      }
    },
    93355: function (t, e, n) {
      'use strict';
      n.d(e, {
        b: function () {
          return r;
        },
        a: function () {
          return o;
        },
      });
      var r = function () {
          for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
          return e;
        },
        o = function () {
          for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
          return e;
        };
    },
    21790: function (t, e, n) {
      'use strict';
      n.d(e, {
        Z: function () {
          return x;
        },
      });
      var r = n(6610),
        o = n(5991),
        i = n(63349),
        a = n(10379),
        c = n(54070),
        l = n(44958),
        u = n(42550),
        s = n(12924),
        d = n(53124),
        f = n(75164),
        m = 0,
        v = {};
      function p(t) {
        var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
          n = m++,
          r = e;
        function o() {
          (r -= 1), r <= 0 ? (t(), delete v[n]) : (v[n] = (0, f.Z)(o));
        }
        return (v[n] = (0, f.Z)(o)), n;
      }
      (p.cancel = function (t) {
        void 0 !== t && (f.Z.cancel(v[t]), delete v[t]);
      }),
        (p.ids = v);
      var h,
        g = n(96159);
      function y(t) {
        return !t || null === t.offsetParent || t.hidden;
      }
      function b(t) {
        return t instanceof Document
          ? t.body
          : Array.from(t.childNodes).find(function (t) {
              return (
                (null === t || void 0 === t ? void 0 : t.nodeType) ===
                Node.ELEMENT_NODE
              );
            });
      }
      function E(t) {
        var e = (t || '').match(/rgba?\((\d*), (\d*), (\d*)(, [\d.]*)?\)/);
        return (
          !(e && e[1] && e[2] && e[3]) || !(e[1] === e[2] && e[2] === e[3])
        );
      }
      var Z = (function (t) {
        (0, a.Z)(n, t);
        var e = (0, c.Z)(n);
        function n() {
          var t;
          return (
            (0, r.Z)(this, n),
            (t = e.apply(this, arguments)),
            (t.containerRef = s.createRef()),
            (t.animationStart = !1),
            (t.destroyed = !1),
            (t.onClick = function (e, n) {
              var r,
                o,
                a = t.props,
                c = a.insertExtraNode,
                u = a.disabled;
              if (!u && e && !y(e) && !e.className.includes('-leave')) {
                t.extraNode = document.createElement('div');
                var s = (0, i.Z)(t),
                  d = s.extraNode,
                  f = t.context.getPrefixCls;
                d.className = ''.concat(f(''), '-click-animating-node');
                var m = t.getAttributeName();
                if (
                  (e.setAttribute(m, 'true'),
                  n &&
                    '#fff' !== n &&
                    '#ffffff' !== n &&
                    'rgb(255, 255, 255)' !== n &&
                    'rgba(255, 255, 255, 1)' !== n &&
                    E(n) &&
                    !/rgba\((?:\d*, ){3}0\)/.test(n) &&
                    'transparent' !== n)
                ) {
                  d.style.borderColor = n;
                  var v =
                      (null === (r = e.getRootNode) || void 0 === r
                        ? void 0
                        : r.call(e)) || e.ownerDocument,
                    p = null !== (o = b(v)) && void 0 !== o ? o : v;
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
                    { csp: t.csp, attachTo: p },
                  );
                }
                c && e.appendChild(d),
                  ['transition', 'animation'].forEach(function (n) {
                    e.addEventListener(
                      ''.concat(n, 'start'),
                      t.onTransitionStart,
                    ),
                      e.addEventListener(
                        ''.concat(n, 'end'),
                        t.onTransitionEnd,
                      );
                  });
              }
            }),
            (t.onTransitionStart = function (e) {
              if (!t.destroyed) {
                var n = t.containerRef.current;
                e && e.target === n && !t.animationStart && t.resetEffect(n);
              }
            }),
            (t.onTransitionEnd = function (e) {
              e && 'fadeEffect' === e.animationName && t.resetEffect(e.target);
            }),
            (t.bindAnimationEvent = function (e) {
              if (
                e &&
                e.getAttribute &&
                !e.getAttribute('disabled') &&
                !e.className.includes('disabled')
              ) {
                var n = function (n) {
                  if ('INPUT' !== n.target.tagName && !y(n.target)) {
                    t.resetEffect(e);
                    var r =
                      getComputedStyle(e).getPropertyValue(
                        'border-top-color',
                      ) ||
                      getComputedStyle(e).getPropertyValue('border-color') ||
                      getComputedStyle(e).getPropertyValue('background-color');
                    (t.clickWaveTimeoutId = window.setTimeout(function () {
                      return t.onClick(e, r);
                    }, 0)),
                      p.cancel(t.animationStartId),
                      (t.animationStart = !0),
                      (t.animationStartId = p(function () {
                        t.animationStart = !1;
                      }, 10));
                  }
                };
                return (
                  e.addEventListener('click', n, !0),
                  {
                    cancel: function () {
                      e.removeEventListener('click', n, !0);
                    },
                  }
                );
              }
            }),
            (t.renderWave = function (e) {
              var n = e.csp,
                r = t.props.children;
              if (((t.csp = n), !s.isValidElement(r))) return r;
              var o = t.containerRef;
              return (
                (0, u.Yr)(r) && (o = (0, u.sQ)(r.ref, t.containerRef)),
                (0, g.Tm)(r, { ref: o })
              );
            }),
            t
          );
        }
        return (
          (0, o.Z)(n, [
            {
              key: 'componentDidMount',
              value: function () {
                this.destroyed = !1;
                var t = this.containerRef.current;
                t &&
                  1 === t.nodeType &&
                  (this.instance = this.bindAnimationEvent(t));
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
                var t = this.context.getPrefixCls,
                  e = this.props.insertExtraNode;
                return ''.concat(
                  t(''),
                  e
                    ? '-click-animating'
                    : '-click-animating-without-extra-node',
                );
              },
            },
            {
              key: 'resetEffect',
              value: function (t) {
                var e = this;
                if (t && t !== this.extraNode && t instanceof Element) {
                  var n = this.props.insertExtraNode,
                    r = this.getAttributeName();
                  t.setAttribute(r, 'false'),
                    h && (h.innerHTML = ''),
                    n &&
                      this.extraNode &&
                      t.contains(this.extraNode) &&
                      t.removeChild(this.extraNode),
                    ['transition', 'animation'].forEach(function (n) {
                      t.removeEventListener(
                        ''.concat(n, 'start'),
                        e.onTransitionStart,
                      ),
                        t.removeEventListener(
                          ''.concat(n, 'end'),
                          e.onTransitionEnd,
                        );
                    });
                }
              },
            },
            {
              key: 'render',
              value: function () {
                return s.createElement(d.C, null, this.renderWave);
              },
            },
          ]),
          n
        );
      })(s.Component);
      Z.contextType = d.E_;
      var x = Z;
    },
    73839: function (t, e, n) {
      'use strict';
      n.d(e, {
        n: function () {
          return R;
        },
        Z: function () {
          return M;
        },
      });
      var r = n(22122),
        o = n(96156),
        i = n(28481),
        a = n(90484),
        c = n(94184),
        l = n.n(c),
        u = n(98423),
        s = n(12924),
        d = n.n(s),
        f = n(53124),
        m = n(98866),
        v = n(97647),
        p = n(4173),
        h = n(96159),
        g = n(93355),
        y = n(21790),
        b = function (t, e) {
          var n = {};
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) &&
              e.indexOf(r) < 0 &&
              (n[r] = t[r]);
          if (null != t && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(t); o < r.length; o++)
              e.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(t, r[o]) &&
                (n[r[o]] = t[r[o]]);
          }
          return n;
        },
        E = s.createContext(void 0),
        Z = function (t) {
          var e,
            n = s.useContext(f.E_),
            i = n.getPrefixCls,
            a = n.direction,
            c = t.prefixCls,
            u = t.size,
            d = t.className,
            m = b(t, ['prefixCls', 'size', 'className']),
            v = i('btn-group', c),
            p = '';
          switch (u) {
            case 'large':
              p = 'lg';
              break;
            case 'small':
              p = 'sm';
              break;
            case 'middle':
            case void 0:
              break;
            default:
          }
          var h = l()(
            v,
            ((e = {}),
            (0, o.Z)(e, ''.concat(v, '-').concat(p), p),
            (0, o.Z)(e, ''.concat(v, '-rtl'), 'rtl' === a),
            e),
            d,
          );
          return s.createElement(
            E.Provider,
            { value: u },
            s.createElement('div', (0, r.Z)({}, m, { className: h })),
          );
        },
        x = Z,
        C = n(7085),
        N = n(63441),
        k = function () {
          return { width: 0, opacity: 0, transform: 'scale(0)' };
        },
        w = function (t) {
          return { width: t.scrollWidth, opacity: 1, transform: 'scale(1)' };
        },
        O = function (t) {
          var e = t.prefixCls,
            n = t.loading,
            r = t.existIcon,
            o = !!n;
          return r
            ? d().createElement(
                'span',
                { className: ''.concat(e, '-loading-icon') },
                d().createElement(C.Z, null),
              )
            : d().createElement(
                N.default,
                {
                  visible: o,
                  motionName: ''.concat(e, '-loading-icon-motion'),
                  removeOnLeave: !0,
                  onAppearStart: k,
                  onAppearActive: w,
                  onEnterStart: k,
                  onEnterActive: w,
                  onLeaveStart: w,
                  onLeaveActive: k,
                },
                function (t, n) {
                  var r = t.className,
                    o = t.style;
                  return d().createElement(
                    'span',
                    {
                      className: ''.concat(e, '-loading-icon'),
                      style: o,
                      ref: n,
                    },
                    d().createElement(C.Z, { className: r }),
                  );
                },
              );
        },
        S = O,
        T = function (t, e) {
          var n = {};
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) &&
              e.indexOf(r) < 0 &&
              (n[r] = t[r]);
          if (null != t && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(t); o < r.length; o++)
              e.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(t, r[o]) &&
                (n[r[o]] = t[r[o]]);
          }
          return n;
        },
        P = /^[\u4e00-\u9fa5]{2}$/,
        I = P.test.bind(P);
      function A(t) {
        return 'string' === typeof t;
      }
      function j(t) {
        return 'text' === t || 'link' === t;
      }
      function L(t, e) {
        if (null !== t && void 0 !== t) {
          var n = e ? ' ' : '';
          return 'string' !== typeof t &&
            'number' !== typeof t &&
            A(t.type) &&
            I(t.props.children)
            ? (0, h.Tm)(t, { children: t.props.children.split('').join(n) })
            : 'string' === typeof t
            ? I(t)
              ? s.createElement('span', null, t.split('').join(n))
              : s.createElement('span', null, t)
            : (0, h.M2)(t)
            ? s.createElement('span', null, t)
            : t;
        }
      }
      function z(t, e) {
        var n = !1,
          r = [];
        return (
          s.Children.forEach(t, function (t) {
            var e = (0, a.Z)(t),
              o = 'string' === e || 'number' === e;
            if (n && o) {
              var i = r.length - 1,
                c = r[i];
              r[i] = ''.concat(c).concat(t);
            } else r.push(t);
            n = o;
          }),
          s.Children.map(r, function (t) {
            return L(t, e);
          })
        );
      }
      (0, g.b)('default', 'primary', 'ghost', 'dashed', 'link', 'text'),
        (0, g.b)('default', 'circle', 'round'),
        (0, g.b)('submit', 'button', 'reset');
      function R(t) {
        return 'danger' === t ? { danger: !0 } : { type: t };
      }
      var D = function (t, e) {
          var n,
            a = t.loading,
            c = void 0 !== a && a,
            d = t.prefixCls,
            h = t.type,
            g = void 0 === h ? 'default' : h,
            b = t.danger,
            Z = t.shape,
            x = void 0 === Z ? 'default' : Z,
            C = t.size,
            N = t.disabled,
            k = t.className,
            w = t.children,
            O = t.icon,
            P = t.ghost,
            A = void 0 !== P && P,
            L = t.block,
            R = void 0 !== L && L,
            D = t.htmlType,
            _ = void 0 === D ? 'button' : D,
            M = T(t, [
              'loading',
              'prefixCls',
              'type',
              'danger',
              'shape',
              'size',
              'disabled',
              'className',
              'children',
              'icon',
              'ghost',
              'block',
              'htmlType',
            ]),
            W = s.useContext(v.Z),
            V = s.useContext(m.Z),
            F = null !== N && void 0 !== N ? N : V,
            B = s.useContext(E),
            U = s.useState(!!c),
            $ = (0, i.Z)(U, 2),
            q = $[0],
            G = $[1],
            H = s.useState(!1),
            Q = (0, i.Z)(H, 2),
            Y = Q[0],
            J = Q[1],
            K = s.useContext(f.E_),
            X = K.getPrefixCls,
            tt = K.autoInsertSpaceInButton,
            et = K.direction,
            nt = e || s.createRef(),
            rt = function () {
              return 1 === s.Children.count(w) && !O && !j(g);
            },
            ot = function () {
              if (nt && nt.current && !1 !== tt) {
                var t = nt.current.textContent;
                rt() && I(t) ? Y || J(!0) : Y && J(!1);
              }
            },
            it =
              'boolean' === typeof c
                ? c
                : (null === c || void 0 === c ? void 0 : c.delay) || !0;
          s.useEffect(
            function () {
              var t = null;
              return (
                'number' === typeof it
                  ? (t = window.setTimeout(function () {
                      (t = null), G(it);
                    }, it))
                  : G(it),
                function () {
                  t && (window.clearTimeout(t), (t = null));
                }
              );
            },
            [it],
          ),
            s.useEffect(ot, [nt]);
          var at = function (e) {
              var n = t.onClick;
              q || F ? e.preventDefault() : null === n || void 0 === n || n(e);
            },
            ct = X('btn', d),
            lt = !1 !== tt,
            ut = (0, p.ri)(ct, et),
            st = ut.compactSize,
            dt = ut.compactItemClassnames,
            ft = { large: 'lg', small: 'sm', middle: void 0 },
            mt = st || B || C || W,
            vt = (mt && ft[mt]) || '',
            pt = q ? 'loading' : O,
            ht = (0, u.Z)(M, ['navigate']),
            gt = l()(
              ct,
              ((n = {}),
              (0, o.Z)(n, ''.concat(ct, '-').concat(x), 'default' !== x && x),
              (0, o.Z)(n, ''.concat(ct, '-').concat(g), g),
              (0, o.Z)(n, ''.concat(ct, '-').concat(vt), vt),
              (0, o.Z)(n, ''.concat(ct, '-icon-only'), !w && 0 !== w && !!pt),
              (0, o.Z)(n, ''.concat(ct, '-background-ghost'), A && !j(g)),
              (0, o.Z)(n, ''.concat(ct, '-loading'), q),
              (0, o.Z)(n, ''.concat(ct, '-two-chinese-chars'), Y && lt && !q),
              (0, o.Z)(n, ''.concat(ct, '-block'), R),
              (0, o.Z)(n, ''.concat(ct, '-dangerous'), !!b),
              (0, o.Z)(n, ''.concat(ct, '-rtl'), 'rtl' === et),
              (0, o.Z)(n, ''.concat(ct, '-disabled'), void 0 !== ht.href && F),
              n),
              dt,
              k,
            ),
            yt =
              O && !q
                ? O
                : s.createElement(S, {
                    existIcon: !!O,
                    prefixCls: ct,
                    loading: !!q,
                  }),
            bt = w || 0 === w ? z(w, rt() && lt) : null;
          if (void 0 !== ht.href)
            return s.createElement(
              'a',
              (0, r.Z)({}, ht, { className: gt, onClick: at, ref: nt }),
              yt,
              bt,
            );
          var Et = s.createElement(
            'button',
            (0, r.Z)({}, M, {
              type: _,
              className: gt,
              onClick: at,
              disabled: F,
              ref: nt,
            }),
            yt,
            bt,
          );
          return j(g) ? Et : s.createElement(y.Z, { disabled: !!q }, Et);
        },
        _ = s.forwardRef(D);
      (_.Group = x), (_.__ANT_BUTTON = !0);
      var M = _;
    },
    71577: function (t, e, n) {
      'use strict';
      var r = n(73839);
      e['Z'] = r.Z;
    },
    57663: function (t, e, n) {
      'use strict';
      n(38663), n(9683);
    },
    4173: function (t, e, n) {
      'use strict';
      n.d(e, {
        ri: function () {
          return f;
        },
        BR: function () {
          return m;
        },
      });
      var r = n(22122),
        o = n(96156),
        i = n(94184),
        a = n.n(i),
        c = n(50344),
        l = n(12924),
        u = n(53124),
        s = function (t, e) {
          var n = {};
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) &&
              e.indexOf(r) < 0 &&
              (n[r] = t[r]);
          if (null != t && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(t); o < r.length; o++)
              e.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(t, r[o]) &&
                (n[r[o]] = t[r[o]]);
          }
          return n;
        },
        d = l.createContext(null),
        f = function (t, e) {
          var n = l.useContext(d),
            r = l.useMemo(
              function () {
                var r;
                if (!n) return '';
                var i = n.compactDirection,
                  c = n.isFirstItem,
                  l = n.isLastItem,
                  u = 'vertical' === i ? '-vertical-' : '-';
                return a()(
                  ((r = {}),
                  (0, o.Z)(r, ''.concat(t, '-compact').concat(u, 'item'), !0),
                  (0, o.Z)(
                    r,
                    ''.concat(t, '-compact').concat(u, 'first-item'),
                    c,
                  ),
                  (0, o.Z)(
                    r,
                    ''.concat(t, '-compact').concat(u, 'last-item'),
                    l,
                  ),
                  (0, o.Z)(
                    r,
                    ''.concat(t, '-compact').concat(u, 'item-rtl'),
                    'rtl' === e,
                  ),
                  r),
                );
              },
              [t, e, n],
            );
          return {
            compactSize: null === n || void 0 === n ? void 0 : n.compactSize,
            compactDirection:
              null === n || void 0 === n ? void 0 : n.compactDirection,
            compactItemClassnames: r,
          };
        },
        m = function (t) {
          var e = t.children;
          return l.createElement(d.Provider, { value: null }, e);
        },
        v = function (t) {
          var e = t.children,
            n = s(t, ['children']);
          return l.createElement(d.Provider, { value: n }, e);
        },
        p = function (t) {
          var e,
            n = l.useContext(u.E_),
            i = n.getPrefixCls,
            f = n.direction,
            m = t.size,
            p = void 0 === m ? 'middle' : m,
            h = t.direction,
            g = t.block,
            y = t.prefixCls,
            b = t.className,
            E = t.children,
            Z = s(t, [
              'size',
              'direction',
              'block',
              'prefixCls',
              'className',
              'children',
            ]),
            x = i('space-compact', y),
            C = a()(
              x,
              ((e = {}),
              (0, o.Z)(e, ''.concat(x, '-rtl'), 'rtl' === f),
              (0, o.Z)(e, ''.concat(x, '-block'), g),
              (0, o.Z)(e, ''.concat(x, '-vertical'), 'vertical' === h),
              e),
              b,
            ),
            N = l.useContext(d),
            k = (0, c.Z)(E),
            w = l.useMemo(
              function () {
                return k.map(function (t, e) {
                  var n = (t && t.key) || ''.concat(x, '-item-').concat(e);
                  return l.createElement(
                    v,
                    {
                      key: n,
                      compactSize: p,
                      compactDirection: h,
                      isFirstItem:
                        0 === e &&
                        (!N ||
                          (null === N || void 0 === N
                            ? void 0
                            : N.isFirstItem)),
                      isLastItem:
                        e === k.length - 1 &&
                        (!N ||
                          (null === N || void 0 === N ? void 0 : N.isLastItem)),
                    },
                    t,
                  );
                });
              },
              [p, k, N],
            );
          return 0 === k.length
            ? null
            : l.createElement('div', (0, r.Z)({ className: C }, Z), w);
        };
      e['ZP'] = p;
    },
    98423: function (t, e, n) {
      'use strict';
      n.d(e, {
        Z: function () {
          return o;
        },
      });
      var r = n(28991);
      function o(t, e) {
        var n = (0, r.Z)({}, t);
        return (
          Array.isArray(e) &&
            e.forEach(function (t) {
              delete n[t];
            }),
          n
        );
      }
    },
  },
]);
