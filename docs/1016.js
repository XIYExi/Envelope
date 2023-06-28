(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1016, 3297],
  {
    34294: function () {},
    41016: function (e, t, n) {
      'use strict';
      n.r(t);
      var r = n(91896),
        l = n(12924),
        a = n.n(l),
        o = n(43297),
        u = {
          allowClear: !0,
          defaultValue: [20, 50],
          disabled: !1,
          dots: !0,
          included: !0,
          marks: '0-26-37-80',
          min: 0,
          max: 100,
          range: !0,
          reverse: !1,
          step: 0,
        };
      t['default'] = () =>
        a().createElement(o.default, (0, r.Z)({ isTpl: !1 }, u));
    },
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
        l = n(96156),
        a = n(22122),
        o = n(28481),
        u = n(94184),
        i = n.n(u),
        c = n(86928),
        s = n(12924),
        p = n.n(s),
        f = n(53124),
        d = n(75164),
        m = n(42550),
        v = n(94199),
        g = s.forwardRef(function (e, t) {
          var n = e.open,
            r = (0, s.useRef)(null),
            l = (0, s.useRef)(null);
          function o() {
            d.Z.cancel(l.current), (l.current = null);
          }
          function u() {
            l.current = (0, d.Z)(function () {
              var e;
              null === (e = r.current) || void 0 === e || e.forcePopupAlign(),
                (l.current = null);
            });
          }
          return (
            s.useEffect(
              function () {
                return n ? u() : o(), o;
              },
              [n, e.title],
            ),
            s.createElement(v.Z, (0, a.Z)({ ref: (0, m.sQ)(r, t) }, e))
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
            var l = 0;
            for (r = Object.getOwnPropertySymbols(e); l < r.length; l++)
              t.indexOf(r[l]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[l]) &&
                (n[r[l]] = e[r[l]]);
          }
          return n;
        },
        Z = s.forwardRef(function (e, t) {
          var n = s.useContext(f.E_),
            u = n.getPrefixCls,
            p = n.direction,
            d = n.getPopupContainer,
            m = s.useState({}),
            v = (0, o.Z)(m, 2),
            g = v[0],
            Z = v[1],
            E = function (e, t) {
              Z(function (n) {
                return (0, a.Z)((0, a.Z)({}, n), (0, l.Z)({}, e, t));
              });
            },
            x = function (e, t) {
              return e || (t ? ('rtl' === p ? 'left' : 'right') : 'top');
            },
            y = e.prefixCls,
            k = e.range,
            w = e.className,
            P = b(e, ['prefixCls', 'range', 'className']),
            h = u('slider', y),
            O = i()(w, (0, l.Z)({}, ''.concat(h, '-rtl'), 'rtl' === p));
          'rtl' !== p || P.vertical || (P.reverse = !P.reverse);
          var S = s.useMemo(
              function () {
                return k
                  ? 'object' === (0, r.Z)(k)
                    ? [!0, k.draggableTrack]
                    : [!0, !1]
                  : [!1];
              },
              [k],
            ),
            N = (0, o.Z)(S, 2),
            T = N[0],
            j = N[1];
          var R = function (t, n) {
            var r,
              l = n.index,
              o = n.dragging,
              i = u(),
              c = e.tooltip,
              p = void 0 === c ? {} : c,
              f = e.vertical,
              m = (0, a.Z)(
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
              v = m.open,
              b = m.placement,
              Z = m.getPopupContainer,
              y = m.prefixCls,
              k = m.formatter,
              w = !!k && (g[l] || o),
              P = v || (void 0 === v && w),
              O = (0, a.Z)((0, a.Z)({}, t.props), {
                onMouseEnter: function () {
                  return E(l, !0);
                },
                onMouseLeave: function () {
                  return E(l, !1);
                },
              }),
              S = u('tooltip', y);
            return s.createElement(
              C,
              {
                prefixCls: S,
                title: k ? k(n.value) : '',
                open: P,
                placement: x(b, f),
                transitionName: ''.concat(i, '-zoom-down'),
                key: l,
                overlayClassName: ''.concat(h, '-tooltip'),
                getPopupContainer: Z || d,
              },
              s.cloneElement(t, O),
            );
          };
          return s.createElement(
            c.default,
            (0, a.Z)({}, P, {
              step: P.step,
              range: T,
              draggableTrack: j,
              className: O,
              ref: t,
              prefixCls: h,
              handleRender: R,
            }),
          );
        });
      var E = Z,
        x = (n(12968), n(6122)),
        y = n(2824),
        k = n(93224),
        w = n(78702),
        P = n.n(w),
        h = ['isTpl'],
        O = (e) => {
          var t = e.isTpl,
            n = (0, k.Z)(e, h),
            r = (n.allowClear, n.defaultValue),
            l = n.disabled,
            a = n.dots,
            o = n.included,
            u = n.marks,
            i = void 0 === u ? '0-26-37-80' : u,
            c = n.min,
            f = n.max,
            d = n.range,
            m = n.reverse,
            v = n.step,
            g = (0, s.useState)(),
            C = (0, y.Z)(g, 2),
            b = C[0],
            Z = C[1],
            w = (0, s.useState)(),
            O = (0, y.Z)(w, 2),
            S = O[0],
            N = O[1];
          (0, s.useEffect)(() => {
            Z(d ? [r[0], r[1]] : r[0]);
          }, [d, r]);
          var T = (0, s.useCallback)((t) => {
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
                  p().createElement(x.Z, { preview: !1, src: P(), alt: '' }),
                ),
              !t &&
                p().createElement(
                  'div',
                  null,
                  p().createElement(E, {
                    value: b,
                    disabled: l,
                    dots: a,
                    included: o,
                    marks: S,
                    min: c,
                    max: f,
                    range: d,
                    reverse: m,
                    step: 0 === v ? null : v,
                    onChange: T,
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
