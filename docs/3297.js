(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3297],
  {
    34294: function () {},
    43297: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return S;
          },
        });
      n(38663), n(34294), n(22385);
      var r = n(90484),
        o = n(96156),
        l = n(22122),
        a = n(28481),
        u = n(94184),
        i = n.n(u),
        c = n(86928),
        s = n(12924),
        p = n.n(s),
        f = n(53124),
        m = n(75164),
        d = n(42550),
        v = n(94199),
        g = s.forwardRef(function (e, t) {
          var n = e.open,
            r = (0, s.useRef)(null),
            o = (0, s.useRef)(null);
          function a() {
            m.Z.cancel(o.current), (o.current = null);
          }
          function u() {
            o.current = (0, m.Z)(function () {
              var e;
              null === (e = r.current) || void 0 === e || e.forcePopupAlign(),
                (o.current = null);
            });
          }
          return (
            s.useEffect(
              function () {
                return n ? u() : a(), a;
              },
              [n, e.title],
            ),
            s.createElement(v.Z, (0, l.Z)({ ref: (0, d.sQ)(r, t) }, e))
          );
        }),
        C = g,
        b = function (e, t) {
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
        Z = s.forwardRef(function (e, t) {
          var n = s.useContext(f.E_),
            u = n.getPrefixCls,
            p = n.direction,
            m = n.getPopupContainer,
            d = s.useState({}),
            v = (0, a.Z)(d, 2),
            g = v[0],
            Z = v[1],
            E = function (e, t) {
              Z(function (n) {
                return (0, l.Z)((0, l.Z)({}, n), (0, o.Z)({}, e, t));
              });
            },
            x = function (e, t) {
              return e || (t ? ('rtl' === p ? 'left' : 'right') : 'top');
            },
            y = e.prefixCls,
            P = e.range,
            h = e.className,
            k = b(e, ['prefixCls', 'range', 'className']),
            w = u('slider', y),
            O = i()(h, (0, o.Z)({}, ''.concat(w, '-rtl'), 'rtl' === p));
          'rtl' !== p || k.vertical || (k.reverse = !k.reverse);
          var S = s.useMemo(
              function () {
                return P
                  ? 'object' === (0, r.Z)(P)
                    ? [!0, P.draggableTrack]
                    : [!0, !1]
                  : [!1];
              },
              [P],
            ),
            N = (0, a.Z)(S, 2),
            j = N[0],
            R = N[1];
          var T = function (t, n) {
            var r,
              o = n.index,
              a = n.dragging,
              i = u(),
              c = e.tooltip,
              p = void 0 === c ? {} : c,
              f = e.vertical,
              d = (0, l.Z)(
                {
                  formatter:
                    null !== (r = e.tipFormatter) && void 0 !== r
                      ? r
                      : function (e) {
                          return 'number' === typeof e ? e.toString() : '';
                        },
                  open: e.tooltipVisible,
                  placement: e.tooltipPlacement,
                  getPopupContainer: e.getTooltipPopupContainer,
                },
                p,
              ),
              v = d.open,
              b = d.placement,
              Z = d.getPopupContainer,
              y = d.prefixCls,
              P = d.formatter,
              h = !!P && (g[o] || a),
              k = v || (void 0 === v && h),
              O = (0, l.Z)((0, l.Z)({}, t.props), {
                onMouseEnter: function () {
                  return E(o, !0);
                },
                onMouseLeave: function () {
                  return E(o, !1);
                },
              }),
              S = u('tooltip', y);
            return s.createElement(
              C,
              {
                prefixCls: S,
                title: P ? P(n.value) : '',
                open: k,
                placement: x(b, f),
                transitionName: ''.concat(i, '-zoom-down'),
                key: o,
                overlayClassName: ''.concat(w, '-tooltip'),
                getPopupContainer: Z || m,
              },
              s.cloneElement(t, O),
            );
          };
          return s.createElement(
            c.default,
            (0, l.Z)({}, k, {
              step: k.step,
              range: j,
              draggableTrack: R,
              className: O,
              ref: t,
              prefixCls: w,
              handleRender: T,
            }),
          );
        });
      var E = Z,
        x = (n(12968), n(6122)),
        y = n(57337),
        P = n(93224),
        h = n(78702),
        k = n.n(h),
        w = ['isTpl'],
        O = (e) => {
          var t = e.isTpl,
            n = (0, P.Z)(e, w),
            r = (n.allowClear, n.defaultValue),
            o = n.disabled,
            l = n.dots,
            a = n.included,
            u = n.marks,
            i = void 0 === u ? '0-26-37-80' : u,
            c = n.min,
            f = n.max,
            m = n.range,
            d = n.reverse,
            v = n.step,
            g = (0, s.useState)(),
            C = (0, y.Z)(g, 2),
            b = C[0],
            Z = C[1],
            h = (0, s.useState)(),
            O = (0, y.Z)(h, 2),
            S = O[0],
            N = O[1];
          (0, s.useEffect)(() => {
            Z(m ? [r[0], r[1]] : r[0]);
          }, [m, r]);
          var j = (0, s.useCallback)((t) => {
            Z(t), e.onChange && e.onChange(t);
          }, []);
          return (
            (0, s.useEffect)(() => {
              var e = i.split('-'),
                t = {};
              e.map((e, n) => {
                t[Number(e)] = e;
              }),
                N(t);
            }, [i]),
            p().createElement(
              p().Fragment,
              null,
              t &&
                p().createElement(
                  'div',
                  null,
                  p().createElement(x.Z, { preview: !1, src: k(), alt: '' }),
                ),
              !t &&
                p().createElement(
                  'div',
                  null,
                  p().createElement(E, {
                    value: b,
                    disabled: o,
                    dots: l,
                    included: a,
                    marks: S,
                    min: c,
                    max: f,
                    range: m,
                    reverse: d,
                    step: 0 === v ? null : v,
                    onChange: j,
                  }),
                ),
            )
          );
        },
        S = (0, s.memo)(O);
    },
    78702: function (e, t, n) {
      e.exports = n.p + 'static/Silder.b78de77e.svg';
    },
  },
]);
