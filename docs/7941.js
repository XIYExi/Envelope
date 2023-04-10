(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7941, 1057],
  {
    99210: function () {},
    7941: function (e, t, n) {
      'use strict';
      n.r(t);
      var l = n(91896),
        a = n(12924),
        o = n.n(a),
        i = n(41057),
        r = {
          onlyIcon: !1,
          block: !1,
          disabled: !1,
          label: 'a-b-c-d',
          icon: 'BarsOutlined-AppstoreOutlined',
        };
      t['default'] = () =>
        o().createElement(i.default, (0, l.Z)({ isTpl: !1 }, r));
    },
    41057: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return Q;
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
        f = n.n(d),
        v = n(21770),
        m = n(42550),
        p = n(98423),
        b = n(63441),
        h = n(8410),
        Z = function (e) {
          return e
            ? {
                left: e.offsetLeft,
                right:
                  e.parentElement.clientWidth - e.clientWidth - e.offsetLeft,
                width: e.clientWidth,
              }
            : null;
        },
        g = function (e) {
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
          f = e.direction,
          v = d.useRef(null),
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
          y = d.useState(null),
          S = (0, c.Z)(y, 2),
          w = S[0],
          k = S[1],
          O = d.useState(null),
          M = (0, c.Z)(O, 2),
          j = M[0],
          A = M[1];
        (0, h.Z)(
          function () {
            if (C !== l) {
              var e = x(C),
                t = x(l),
                n = Z(e),
                a = Z(t);
              N(l), k(n), A(a), e && t ? i() : u();
            }
          },
          [l],
        );
        var I = d.useMemo(
            function () {
              return g(
                'rtl' === f
                  ? -(null === w || void 0 === w ? void 0 : w.right)
                  : null === w || void 0 === w
                  ? void 0
                  : w.left,
              );
            },
            [f, w],
          ),
          P = d.useMemo(
            function () {
              return g(
                'rtl' === f
                  ? -(null === j || void 0 === j ? void 0 : j.right)
                  : null === j || void 0 === j
                  ? void 0
                  : j.left,
              );
            },
            [f, j],
          ),
          R = function () {
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
          T = function () {
            k(null), A(null), u();
          };
        return w && j
          ? d.createElement(
              b.default,
              {
                visible: !0,
                motionName: o,
                motionAppear: !0,
                onAppearStart: R,
                onAppearActive: V,
                onAppearEnd: T,
              },
              function (e, n) {
                var l = e.className,
                  a = e.style,
                  o = (0, s.Z)(
                    (0, s.Z)({}, a),
                    {},
                    {
                      '--thumb-start-left': I,
                      '--thumb-start-width': g(
                        null === w || void 0 === w ? void 0 : w.width,
                      ),
                      '--thumb-active-left': P,
                      '--thumb-active-width': g(
                        null === j || void 0 === j ? void 0 : j.width,
                      ),
                    },
                  ),
                  i = {
                    ref: (0, m.sQ)(v, n),
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
      var y = function (e) {
          var t = e.prefixCls,
            n = e.className,
            a = e.disabled,
            o = e.checked,
            i = e.label,
            c = e.title,
            u = e.value,
            s = e.onChange,
            f = function (e) {
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
              onChange: f,
            }),
            d.createElement(
              'div',
              { className: ''.concat(t, '-item-label'), title: c },
              i,
            ),
          );
        },
        S = d.forwardRef(function (e, t) {
          var n,
            o,
            i = e.prefixCls,
            s = void 0 === i ? 'rc-segmented' : i,
            f = e.direction,
            b = e.options,
            h = e.disabled,
            Z = e.defaultValue,
            g = e.value,
            N = e.onChange,
            S = e.className,
            w = void 0 === S ? '' : S,
            k = e.motionName,
            O = void 0 === k ? 'thumb-motion' : k,
            M = (0, u.Z)(e, C),
            j = d.useRef(null),
            A = d.useMemo(
              function () {
                return (0, m.sQ)(j, t);
              },
              [j, t],
            ),
            I = d.useMemo(
              function () {
                return x(b);
              },
              [b],
            ),
            P = (0, v.Z)(
              null === (n = I[0]) || void 0 === n ? void 0 : n.value,
              { value: g, defaultValue: Z },
            ),
            R = (0, c.Z)(P, 2),
            V = R[0],
            T = R[1],
            W = d.useState(!1),
            z = (0, c.Z)(W, 2),
            F = z[0],
            L = z[1],
            Q = function (e, t) {
              h || (T(t), null === N || void 0 === N || N(t));
            },
            X = (0, p.Z)(M, ['children']);
          return d.createElement(
            'div',
            (0, a.Z)({}, X, {
              className: r()(
                s,
                ((o = {}),
                (0, l.Z)(o, ''.concat(s, '-rtl'), 'rtl' === f),
                (0, l.Z)(o, ''.concat(s, '-disabled'), h),
                o),
                w,
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
                motionName: ''.concat(s, '-').concat(O),
                direction: f,
                getValueIndex: function (e) {
                  return I.findIndex(function (t) {
                    return t.value === e;
                  });
                },
                onMotionStart: function () {
                  L(!0);
                },
                onMotionEnd: function () {
                  L(!1);
                },
              }),
              I.map(function (e) {
                return d.createElement(
                  y,
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
                          e.value === V && !F,
                        ),
                      ),
                      checked: e.value === V,
                      onChange: Q,
                    },
                    e,
                    { disabled: !!h || !!e.disabled },
                  ),
                );
              }),
            ),
          );
        });
      (S.displayName = 'Segmented'), (S.defaultProps = { options: [] });
      var w = S,
        k = n(53124),
        O = n(97647),
        M = function (e, t) {
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
          f = e.size,
          v = void 0 === f ? 'middle' : f,
          m = M(e, ['prefixCls', 'className', 'block', 'options', 'size']),
          p = d.useContext(k.E_),
          b = p.getPrefixCls,
          h = p.direction,
          Z = b('segmented', o),
          g = d.useContext(O.Z),
          E = v || g,
          C = d.useMemo(
            function () {
              return s.map(function (e) {
                if (j(e)) {
                  var t = e.icon,
                    n = e.label,
                    l = M(e, ['icon', 'label']);
                  return (0, a.Z)((0, a.Z)({}, l), {
                    label: d.createElement(
                      d.Fragment,
                      null,
                      d.createElement(
                        'span',
                        { className: ''.concat(Z, '-item-icon') },
                        t,
                      ),
                      n && d.createElement('span', null, n),
                    ),
                  });
                }
                return e;
              });
            },
            [s, Z],
          );
        return d.createElement(
          w,
          (0, a.Z)({}, m, {
            className: r()(
              i,
              ((n = {}),
              (0, l.Z)(n, ''.concat(Z, '-block'), c),
              (0, l.Z)(n, ''.concat(Z, '-sm'), 'small' === E),
              (0, l.Z)(n, ''.concat(Z, '-lg'), 'large' === E),
              n),
            ),
            options: C,
            ref: t,
            prefixCls: Z,
            direction: h,
          }),
        );
      });
      var I = A,
        P = (n(12968), n(6122)),
        R = n(57337),
        V = n(93224),
        T = n(84917),
        W = n.n(T),
        z = n(86023),
        F = ['isTpl'],
        L = (e) => {
          var t = e.isTpl,
            n = (0, V.Z)(e, F),
            l = n.onlyIcon,
            a = n.block,
            o = n.disabled,
            i = n.label,
            r = n.icon,
            c = (0, d.useState)([]),
            u = (0, R.Z)(c, 2),
            s = u[0],
            v = u[1],
            m = (0, d.useState)([]),
            p = (0, R.Z)(m, 2),
            b = p[0],
            h = p[1],
            Z = (0, d.useState)(),
            g = (0, R.Z)(Z, 2),
            E = g[0],
            C = g[1];
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
                  icon: f().createElement(z[t[l]]),
                };
                n.push(a);
              } else {
                var o = { label: e, value: e };
                n.push(o);
              }
            }),
              v(n);
          }, [i, r]),
            (0, d.useEffect)(() => {
              var e = [],
                t = r.split('-');
              t.map((t, n) => {
                var l = { value: t, icon: f().createElement(z[t]) };
                e.push(l);
              }),
                console.log(e),
                h(e);
            }, [r]);
          var N = (t) => {
            C(t), e.onChange && e.onChange(t);
          };
          return f().createElement(
            f().Fragment,
            null,
            t &&
              f().createElement(
                'div',
                null,
                f().createElement(P.Z, { preview: !1, src: W(), alt: '' }),
              ),
            !t &&
              f().createElement(
                'div',
                null,
                l &&
                  f().createElement(I, {
                    options: b,
                    block: a,
                    disabled: o,
                    onChange: (e) => N(e),
                    value: E,
                  }),
                !l &&
                  f().createElement(I, {
                    options: s,
                    block: a,
                    disabled: o,
                    onChange: (e) => N(e),
                    value: E,
                  }),
              ),
          );
        },
        Q = (0, d.memo)(L);
    },
    84917: function (e, t, n) {
      e.exports = n.p + 'static/Segmented.81a98753.svg';
    },
  },
]);
