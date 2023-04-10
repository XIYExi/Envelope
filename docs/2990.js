(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [2990, 736],
  {
    82990: function (e, r, t) {
      'use strict';
      t.r(r);
      var n = t(91896),
        a = t(12924),
        s = t.n(a),
        i = t(736),
        l = {
          defaultValue: '77',
          total: '100',
          color: 'teal',
          disabled: !1,
          indicating: !0,
          inverted: !1,
          label: '\u8fd9\u662f\u4e00\u4e2a\u8fdb\u5ea6\u6761',
          progress: 'progress',
          size: 'medium',
          error: !1,
          success: !1,
          warning: !1,
        };
      r['default'] = () =>
        s().createElement(i.default, (0, n.Z)({ isTpl: !1 }, l));
    },
    736: function (e, r, t) {
      'use strict';
      t.r(r);
      var n = t(93224),
        a = t(12924),
        s = t.n(a),
        i = t(1959),
        l = t.n(i),
        c = t(49282),
        o = t(44165),
        u = ['isTpl'],
        d = (e) => {
          var r = e.isTpl,
            t = (0, n.Z)(e, u),
            a = t.defaultValue,
            i = t.total,
            d = t.color,
            p = t.disabled,
            v = t.indicating,
            f = t.inverted,
            g = t.label,
            Z = t.progress,
            m = t.size,
            h = t.error,
            b = t.success,
            E = t.warning;
          return s().createElement(
            s().Fragment,
            null,
            r && s().createElement(c.Z, { src: l(), alt: 'Progress' }),
            !r &&
              s().createElement(
                'div',
                null,
                s().createElement(o.Z, {
                  percent: a,
                  value: a,
                  total: i,
                  indicating: v,
                  color: d,
                  disabled: p,
                  inverted: f,
                  label: g,
                  progress: Z,
                  size: m,
                  error: h,
                  success: b,
                  warning: E,
                }),
              ),
          );
        };
      r['default'] = d;
    },
    1959: function (e, r, t) {
      e.exports = t.p + 'static/Progress.abbc69b1.svg';
    },
    23274: function (e, r) {
      'use strict';
      function t(e, r, t) {
        return (
          e === e &&
            (void 0 !== t && (e = e <= t ? e : t),
            void 0 !== r && (e = e >= r ? e : r)),
          e
        );
      }
      r['Z'] = t;
    },
    40037: function (e, r, t) {
      'use strict';
      var n = t(23274),
        a = t(66279);
      function s(e, r, t) {
        return (
          void 0 === t && ((t = r), (r = void 0)),
          void 0 !== t && ((t = (0, a.Z)(t)), (t = t === t ? t : 0)),
          void 0 !== r && ((r = (0, a.Z)(r)), (r = r === r ? r : 0)),
          (0, n.Z)((0, a.Z)(e), r, t)
        );
      }
      r['Z'] = s;
    },
    44165: function (e, r, t) {
      'use strict';
      t.d(r, {
        Z: function () {
          return y;
        },
      });
      var n = t(22122),
        a = t(41788),
        s = t(56169),
        i = t(98392),
        l = t(66279),
        c = t(13633),
        o = s.Z.isFinite,
        u = Math.min;
      function d(e) {
        var r = Math[e];
        return function (e, t) {
          if (
            ((e = (0, l.Z)(e)),
            (t = null == t ? 0 : u((0, i.Z)(t), 292)),
            t && o(e))
          ) {
            var n = ((0, c.Z)(e) + 'e').split('e'),
              a = r(n[0] + 'e' + (+n[1] + t));
            return (
              (n = ((0, c.Z)(a) + 'e').split('e')), +(n[0] + 'e' + (+n[1] - t))
            );
          }
          return r(e);
        };
      }
      var p = d,
        v = p('round'),
        f = v,
        g = t(40037),
        Z = t(99250),
        m = t(86010),
        h = (t(55301), t(12924)),
        b = t.n(h),
        E = t(92248),
        w = t(93619),
        P = t(92063),
        G = t(28935),
        N = t(12519),
        k = (function (e) {
          function r() {
            for (
              var r, t = arguments.length, n = new Array(t), a = 0;
              a < t;
              a++
            )
              n[a] = arguments[a];
            return (
              (r = e.call.apply(e, [this].concat(n)) || this),
              (r.calculatePercent = function () {
                var e = r.props,
                  t = e.percent,
                  n = e.total,
                  a = e.value;
                return (0, Z.Z)(t)
                  ? (0, Z.Z)(n) || (0, Z.Z)(a)
                    ? void 0
                    : (a / n) * 100
                  : t;
              }),
              (r.computeValueText = function (e) {
                var t = r.props,
                  n = t.progress,
                  a = t.total,
                  s = t.value;
                return 'value' === n
                  ? s
                  : 'ratio' === n
                  ? s + '/' + a
                  : e + '%';
              }),
              (r.getPercent = function () {
                var e = r.props,
                  t = e.precision,
                  n = e.progress,
                  a = e.total,
                  s = e.value,
                  i = (0, g.Z)(r.calculatePercent(), 0, 100);
                return (0, Z.Z)(a) || (0, Z.Z)(s) || 'value' !== n
                  ? 'value' === n
                    ? s
                    : (0, Z.Z)(t)
                    ? i
                    : f(i, t)
                  : (s / a) * 100;
              }),
              (r.isAutoSuccess = function () {
                var e = r.props,
                  t = e.autoSuccess,
                  n = e.percent,
                  a = e.total,
                  s = e.value;
                return t && (n >= 100 || s >= a);
              }),
              (r.renderLabel = function () {
                var e = r.props,
                  t = e.children,
                  n = e.content,
                  a = e.label;
                return E.kK(t)
                  ? E.kK(n)
                    ? (0, w.DE)(a, {
                        autoGenerateKey: !1,
                        defaultProps: { className: 'label' },
                      })
                    : b().createElement('div', { className: 'label' }, n)
                  : b().createElement('div', { className: 'label' }, t);
              }),
              (r.renderProgress = function (e) {
                var t = r.props,
                  n = t.precision,
                  a = t.progress;
                if (a || !(0, Z.Z)(n))
                  return b().createElement(
                    'div',
                    { className: 'progress' },
                    r.computeValueText(e),
                  );
              }),
              r
            );
          }
          (0, a.Z)(r, e);
          var t = r.prototype;
          return (
            (t.render = function () {
              var e = this.props,
                t = e.active,
                a = e.attached,
                s = e.className,
                i = e.color,
                l = e.disabled,
                c = e.error,
                o = e.indicating,
                u = e.inverted,
                d = e.size,
                p = e.success,
                v = e.warning,
                f = (0, m.default)(
                  'ui',
                  i,
                  d,
                  (0, P.lG)(t || o, 'active'),
                  (0, P.lG)(l, 'disabled'),
                  (0, P.lG)(c, 'error'),
                  (0, P.lG)(o, 'indicating'),
                  (0, P.lG)(u, 'inverted'),
                  (0, P.lG)(p || this.isAutoSuccess(), 'success'),
                  (0, P.lG)(v, 'warning'),
                  (0, P.cD)(a, 'attached'),
                  'progress',
                  s,
                ),
                g = (0, G.Z)(r, this.props),
                Z = (0, N.Z)(r, this.props),
                h = this.getPercent() || 0;
              return b().createElement(
                Z,
                (0, n.Z)({}, g, {
                  className: f,
                  'data-percent': Math.floor(h),
                }),
                b().createElement(
                  'div',
                  { className: 'bar', style: { width: h + '%' } },
                  this.renderProgress(h),
                ),
                this.renderLabel(),
              );
            }),
            r
          );
        })(h.Component);
      (k.handledProps = [
        'active',
        'as',
        'attached',
        'autoSuccess',
        'children',
        'className',
        'color',
        'content',
        'disabled',
        'error',
        'indicating',
        'inverted',
        'label',
        'percent',
        'precision',
        'progress',
        'size',
        'success',
        'total',
        'value',
        'warning',
      ]),
        (k.propTypes = {});
      var y = k;
    },
  },
]);
