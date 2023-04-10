(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1057],
  {
    99210: function () {},
    41057: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return T;
          },
        });
      n(38663), n(99210);
      var l = n(96156),
        a = n(22122),
        o = n(90484),
        i = n(94184),
        r = n.n(i),
        c = n(28481),
        u = n(81253),
        s = n(28991),
        d = n(12924),
        v = n.n(d),
        f = n(21770),
        m = n(42550),
        p = n(98423),
        b = n(63441),
        h = n(8410),
        g = function (e) {
          return e
            ? {
                left: e.offsetLeft,
                right:
                  e.parentElement.clientWidth - e.clientWidth - e.offsetLeft,
                width: e.clientWidth,
              }
            : null;
        },
        Z = function (e) {
          return void 0 !== e ? ''.concat(e, 'px') : void 0;
        };
      function E(e) {
        var t = e.prefixCls,
          n = e.containerRef,
          l = e.value,
          a = e.getValueIndex,
          o = e.motionName,
          i = e.onMotionStart,
          u = e.onMotionEnd,
          v = e.direction,
          f = d.useRef(null),
          p = d.useState(l),
          E = (0, c.Z)(p, 2),
          C = E[0],
          N = E[1],
          x = function (e) {
            var l,
              o = a(e),
              i =
                null === (l = n.current) || void 0 === l
                  ? void 0
                  : l.querySelectorAll('.'.concat(t, '-item'))[o];
            return (null === i || void 0 === i ? void 0 : i.offsetParent) && i;
          },
          S = d.useState(null),
          w = (0, c.Z)(S, 2),
          y = w[0],
          k = w[1],
          M = d.useState(null),
          O = (0, c.Z)(M, 2),
          j = O[0],
          A = O[1];
        (0, h.Z)(
          function () {
            if (C !== l) {
              var e = x(C),
                t = x(l),
                n = g(e),
                a = g(t);
              N(l), k(n), A(a), e && t ? i() : u();
            }
          },
          [l],
        );
        var P = d.useMemo(
            function () {
              return Z(
                'rtl' === v
                  ? -(null === y || void 0 === y ? void 0 : y.right)
                  : null === y || void 0 === y
                  ? void 0
                  : y.left,
              );
            },
            [v, y],
          ),
          R = d.useMemo(
            function () {
              return Z(
                'rtl' === v
                  ? -(null === j || void 0 === j ? void 0 : j.right)
                  : null === j || void 0 === j
                  ? void 0
                  : j.left,
              );
            },
            [v, j],
          ),
          I = function () {
            return {
              transform: 'translateX(var(--thumb-start-left))',
              width: 'var(--thumb-start-width)',
            };
          },
          V = function () {
            return {
              transform: 'translateX(var(--thumb-active-left))',
              width: 'var(--thumb-active-width)',
            };
          },
          W = function () {
            k(null), A(null), u();
          };
        return y && j
          ? d.createElement(
              b.default,
              {
                visible: !0,
                motionName: o,
                motionAppear: !0,
                onAppearStart: I,
                onAppearActive: V,
                onAppearEnd: W,
              },
              function (e, n) {
                var l = e.className,
                  a = e.style,
                  o = (0, s.Z)(
                    (0, s.Z)({}, a),
                    {},
                    {
                      '--thumb-start-left': P,
                      '--thumb-start-width': Z(
                        null === y || void 0 === y ? void 0 : y.width,
                      ),
                      '--thumb-active-left': R,
                      '--thumb-active-width': Z(
                        null === j || void 0 === j ? void 0 : j.width,
                      ),
                    },
                  ),
                  i = {
                    ref: (0, m.sQ)(f, n),
                    style: o,
                    className: r()(''.concat(t, '-thumb'), l),
                  };
                return d.createElement('div', i);
              },
            )
          : null;
      }
      var C = [
        'prefixCls',
        'direction',
        'options',
        'disabled',
        'defaultValue',
        'value',
        'onChange',
        'className',
        'motionName',
      ];
      function N(e) {
        return 'undefined' !== typeof e.title
          ? e.title
          : 'object' !== (0, o.Z)(e.label)
          ? null === (t = e.label) || void 0 === t
            ? void 0
            : t.toString()
          : void 0;
        var t;
      }
      function x(e) {
        return e.map(function (e) {
          if ('object' === (0, o.Z)(e) && null !== e) {
            var t = N(e);
            return (0, s.Z)((0, s.Z)({}, e), {}, { title: t });
          }
          return {
            label: null === e || void 0 === e ? void 0 : e.toString(),
            title: null === e || void 0 === e ? void 0 : e.toString(),
            value: e,
          };
        });
      }
      var S = function (e) {
          var t = e.prefixCls,
            n = e.className,
            a = e.disabled,
            o = e.checked,
            i = e.label,
            c = e.title,
            u = e.value,
            s = e.onChange,
            v = function (e) {
              a || s(e, u);
            };
          return d.createElement(
            'label',
            {
              className: r()(
                n,
                (0, l.Z)({}, ''.concat(t, '-item-disabled'), a),
              ),
            },
            d.createElement('input', {
              className: ''.concat(t, '-item-input'),
              type: 'radio',
              disabled: a,
              checked: o,
              onChange: v,
            }),
            d.createElement(
              'div',
              { className: ''.concat(t, '-item-label'), title: c },
              i,
            ),
          );
        },
        w = d.forwardRef(function (e, t) {
          var n,
            o,
            i = e.prefixCls,
            s = void 0 === i ? 'rc-segmented' : i,
            v = e.direction,
            b = e.options,
            h = e.disabled,
            g = e.defaultValue,
            Z = e.value,
            N = e.onChange,
            w = e.className,
            y = void 0 === w ? '' : w,
            k = e.motionName,
            M = void 0 === k ? 'thumb-motion' : k,
            O = (0, u.Z)(e, C),
            j = d.useRef(null),
            A = d.useMemo(
              function () {
                return (0, m.sQ)(j, t);
              },
              [j, t],
            ),
            P = d.useMemo(
              function () {
                return x(b);
              },
              [b],
            ),
            R = (0, f.Z)(
              null === (n = P[0]) || void 0 === n ? void 0 : n.value,
              { value: Z, defaultValue: g },
            ),
            I = (0, c.Z)(R, 2),
            V = I[0],
            W = I[1],
            z = d.useState(!1),
            F = (0, c.Z)(z, 2),
            L = F[0],
            Q = F[1],
            T = function (e, t) {
              h || (W(t), null === N || void 0 === N || N(t));
            },
            X = (0, p.Z)(O, ['children']);
          return d.createElement(
            'div',
            (0, a.Z)({}, X, {
              className: r()(
                s,
                ((o = {}),
                (0, l.Z)(o, ''.concat(s, '-rtl'), 'rtl' === v),
                (0, l.Z)(o, ''.concat(s, '-disabled'), h),
                o),
                y,
              ),
              ref: A,
            }),
            d.createElement(
              'div',
              { className: ''.concat(s, '-group') },
              d.createElement(E, {
                prefixCls: s,
                value: V,
                containerRef: j,
                motionName: ''.concat(s, '-').concat(M),
                direction: v,
                getValueIndex: function (e) {
                  return P.findIndex(function (t) {
                    return t.value === e;
                  });
                },
                onMotionStart: function () {
                  Q(!0);
                },
                onMotionEnd: function () {
                  Q(!1);
                },
              }),
              P.map(function (e) {
                return d.createElement(
                  S,
                  (0, a.Z)(
                    {
                      key: e.value,
                      prefixCls: s,
                      className: r()(
                        e.className,
                        ''.concat(s, '-item'),
                        (0, l.Z)(
                          {},
                          ''.concat(s, '-item-selected'),
                          e.value === V && !L,
                        ),
                      ),
                      checked: e.value === V,
                      onChange: T,
                    },
                    e,
                    { disabled: !!h || !!e.disabled },
                  ),
                );
              }),
            ),
          );
        });
      (w.displayName = 'Segmented'), (w.defaultProps = { options: [] });
      var y = w,
        k = n(53124),
        M = n(97647),
        O = function (e, t) {
          var n = {};
          for (var l in e)
            Object.prototype.hasOwnProperty.call(e, l) &&
              t.indexOf(l) < 0 &&
              (n[l] = e[l]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (l = Object.getOwnPropertySymbols(e); a < l.length; a++)
              t.indexOf(l[a]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, l[a]) &&
                (n[l[a]] = e[l[a]]);
          }
          return n;
        };
      function j(e) {
        return (
          'object' === (0, o.Z)(e) &&
          !!(null === e || void 0 === e ? void 0 : e.icon)
        );
      }
      var A = d.forwardRef(function (e, t) {
        var n,
          o = e.prefixCls,
          i = e.className,
          c = e.block,
          u = e.options,
          s = void 0 === u ? [] : u,
          v = e.size,
          f = void 0 === v ? 'middle' : v,
          m = O(e, ['prefixCls', 'className', 'block', 'options', 'size']),
          p = d.useContext(k.E_),
          b = p.getPrefixCls,
          h = p.direction,
          g = b('segmented', o),
          Z = d.useContext(M.Z),
          E = f || Z,
          C = d.useMemo(
            function () {
              return s.map(function (e) {
                if (j(e)) {
                  var t = e.icon,
                    n = e.label,
                    l = O(e, ['icon', 'label']);
                  return (0, a.Z)((0, a.Z)({}, l), {
                    label: d.createElement(
                      d.Fragment,
                      null,
                      d.createElement(
                        'span',
                        { className: ''.concat(g, '-item-icon') },
                        t,
                      ),
                      n && d.createElement('span', null, n),
                    ),
                  });
                }
                return e;
              });
            },
            [s, g],
          );
        return d.createElement(
          y,
          (0, a.Z)({}, m, {
            className: r()(
              i,
              ((n = {}),
              (0, l.Z)(n, ''.concat(g, '-block'), c),
              (0, l.Z)(n, ''.concat(g, '-sm'), 'small' === E),
              (0, l.Z)(n, ''.concat(g, '-lg'), 'large' === E),
              n),
            ),
            options: C,
            ref: t,
            prefixCls: g,
            direction: h,
          }),
        );
      });
      var P = A,
        R = (n(12968), n(6122)),
        I = n(57337),
        V = n(93224),
        W = n(84917),
        z = n.n(W),
        F = n(86023),
        L = ['isTpl'],
        Q = (e) => {
          var t = e.isTpl,
            n = (0, V.Z)(e, L),
            l = n.onlyIcon,
            a = n.block,
            o = n.disabled,
            i = n.label,
            r = n.icon,
            c = (0, d.useState)([]),
            u = (0, I.Z)(c, 2),
            s = u[0],
            f = u[1],
            m = (0, d.useState)([]),
            p = (0, I.Z)(m, 2),
            b = p[0],
            h = p[1],
            g = (0, d.useState)(),
            Z = (0, I.Z)(g, 2),
            E = Z[0],
            C = Z[1];
          (0, d.useEffect)(() => {
            var e = i.split('-'),
              t = r.split('-'),
              n = [];
            e.map((e, l) => {
              if (l + 1 <= t.length) {
                console.log(t[l]);
                var a = {
                  label: e,
                  value: e,
                  icon: v().createElement(F[t[l]]),
                };
                n.push(a);
              } else {
                var o = { label: e, value: e };
                n.push(o);
              }
            }),
              f(n);
          }, [i, r]),
            (0, d.useEffect)(() => {
              var e = [],
                t = r.split('-');
              t.map((t, n) => {
                var l = { value: t, icon: v().createElement(F[t]) };
                e.push(l);
              }),
                console.log(e),
                h(e);
            }, [r]);
          var N = (t) => {
            C(t), e.onChange && e.onChange(t);
          };
          return v().createElement(
            v().Fragment,
            null,
            t &&
              v().createElement(
                'div',
                null,
                v().createElement(R.Z, { preview: !1, src: z(), alt: '' }),
              ),
            !t &&
              v().createElement(
                'div',
                null,
                l &&
                  v().createElement(P, {
                    options: b,
                    block: a,
                    disabled: o,
                    onChange: (e) => N(e),
                    value: E,
                  }),
                !l &&
                  v().createElement(P, {
                    options: s,
                    block: a,
                    disabled: o,
                    onChange: (e) => N(e),
                    value: E,
                  }),
              ),
          );
        },
        T = (0, d.memo)(Q);
    },
    84917: function (e, t, n) {
      e.exports = n.p + 'static/Segmented.81a98753.svg';
    },
  },
]);
