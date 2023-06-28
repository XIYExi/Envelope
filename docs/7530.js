(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7530],
  {
    70350: function () {},
    82833: function (e, t, r) {
      'use strict';
      r.d(t, {
        Z: function () {
          return S;
        },
      });
      var o = r(96156),
        n = r(22122),
        c = r(38819),
        s = r(79508),
        a = r(43061),
        i = r(54549),
        l = r(94184),
        u = r.n(l),
        p = r(98423),
        d = r(12924),
        f = r(53124),
        v = r(93355),
        k = r(92138),
        y = r(43094);
      function m(e) {
        return !e || e < 0 ? 0 : e > 100 ? 100 : e;
      }
      function h(e) {
        var t = e.success,
          r = e.successPercent,
          o = r;
        return (
          t && 'progress' in t && (o = t.progress),
          t && 'percent' in t && (o = t.percent),
          o
        );
      }
      function g(e) {
        var t = e.percent,
          r = e.success,
          o = e.successPercent,
          n = m(h({ success: r, successPercent: o }));
        return [n, m(m(t) - n)];
      }
      function C(e) {
        var t = e.success,
          r = void 0 === t ? {} : t,
          o = e.strokeColor,
          n = r.strokeColor;
        return [n || k.presetPrimaryColors.green, o || null];
      }
      var b = function (e) {
          var t = e.prefixCls,
            r = e.width,
            n = e.strokeWidth,
            c = e.trailColor,
            s = void 0 === c ? null : c,
            a = e.strokeLinecap,
            i = void 0 === a ? 'round' : a,
            l = e.gapPosition,
            p = e.gapDegree,
            f = e.type,
            v = e.children,
            k = e.success,
            m = r || 120,
            h = { width: m, height: m, fontSize: 0.15 * m + 6 },
            b = n || 6,
            E = l || ('dashboard' === f && 'bottom') || void 0,
            x = function () {
              return p || 0 === p ? p : 'dashboard' === f ? 75 : void 0;
            },
            O =
              '[object Object]' ===
              Object.prototype.toString.call(e.strokeColor),
            Z = C({ success: k, strokeColor: e.strokeColor }),
            N = u()(
              ''.concat(t, '-inner'),
              (0, o.Z)({}, ''.concat(t, '-circle-gradient'), O),
            );
          return d.createElement(
            'div',
            { className: N, style: h },
            d.createElement(y.Circle, {
              percent: g(e),
              strokeWidth: b,
              trailWidth: b,
              strokeColor: Z,
              strokeLinecap: i,
              trailColor: s,
              prefixCls: t,
              gapDegree: x(),
              gapPosition: E,
            }),
            v,
          );
        },
        E = b,
        x = function (e, t) {
          var r = {};
          for (var o in e)
            Object.prototype.hasOwnProperty.call(e, o) &&
              t.indexOf(o) < 0 &&
              (r[o] = e[o]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var n = 0;
            for (o = Object.getOwnPropertySymbols(e); n < o.length; n++)
              t.indexOf(o[n]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, o[n]) &&
                (r[o[n]] = e[o[n]]);
          }
          return r;
        },
        O = function (e) {
          var t = [];
          return (
            Object.keys(e).forEach(function (r) {
              var o = parseFloat(r.replace(/%/g, ''));
              isNaN(o) || t.push({ key: o, value: e[r] });
            }),
            (t = t.sort(function (e, t) {
              return e.key - t.key;
            })),
            t
              .map(function (e) {
                var t = e.key,
                  r = e.value;
                return ''.concat(r, ' ').concat(t, '%');
              })
              .join(', ')
          );
        },
        Z = function (e, t) {
          var r = e.from,
            o = void 0 === r ? k.presetPrimaryColors.blue : r,
            n = e.to,
            c = void 0 === n ? k.presetPrimaryColors.blue : n,
            s = e.direction,
            a = void 0 === s ? ('rtl' === t ? 'to left' : 'to right') : s,
            i = x(e, ['from', 'to', 'direction']);
          if (0 !== Object.keys(i).length) {
            var l = O(i);
            return {
              backgroundImage: 'linear-gradient('
                .concat(a, ', ')
                .concat(l, ')'),
            };
          }
          return {
            backgroundImage: 'linear-gradient('
              .concat(a, ', ')
              .concat(o, ', ')
              .concat(c, ')'),
          };
        },
        N = function (e) {
          var t = e.prefixCls,
            r = e.direction,
            o = e.percent,
            c = e.strokeWidth,
            s = e.size,
            a = e.strokeColor,
            i = e.strokeLinecap,
            l = void 0 === i ? 'round' : i,
            u = e.children,
            p = e.trailColor,
            f = void 0 === p ? null : p,
            v = e.success,
            k = a && 'string' !== typeof a ? Z(a, r) : { background: a },
            y = 'square' === l || 'butt' === l ? 0 : void 0,
            g = { backgroundColor: f || void 0, borderRadius: y },
            C = (0, n.Z)(
              {
                width: ''.concat(m(o), '%'),
                height: c || ('small' === s ? 6 : 8),
                borderRadius: y,
              },
              k,
            ),
            b = h(e),
            E = {
              width: ''.concat(m(b), '%'),
              height: c || ('small' === s ? 6 : 8),
              borderRadius: y,
              backgroundColor:
                null === v || void 0 === v ? void 0 : v.strokeColor,
            },
            x =
              void 0 !== b
                ? d.createElement('div', {
                    className: ''.concat(t, '-success-bg'),
                    style: E,
                  })
                : null;
          return d.createElement(
            d.Fragment,
            null,
            d.createElement(
              'div',
              { className: ''.concat(t, '-outer') },
              d.createElement(
                'div',
                { className: ''.concat(t, '-inner'), style: g },
                d.createElement('div', {
                  className: ''.concat(t, '-bg'),
                  style: C,
                }),
                x,
              ),
            ),
            u,
          );
        },
        w = N,
        P = function (e) {
          for (
            var t = e.size,
              r = e.steps,
              n = e.percent,
              c = void 0 === n ? 0 : n,
              s = e.strokeWidth,
              a = void 0 === s ? 8 : s,
              i = e.strokeColor,
              l = e.trailColor,
              p = void 0 === l ? null : l,
              f = e.prefixCls,
              v = e.children,
              k = Math.round(r * (c / 100)),
              y = 'small' === t ? 2 : 14,
              m = new Array(r),
              h = 0;
            h < r;
            h++
          ) {
            var g = Array.isArray(i) ? i[h] : i;
            m[h] = d.createElement('div', {
              key: h,
              className: u()(
                ''.concat(f, '-steps-item'),
                (0, o.Z)({}, ''.concat(f, '-steps-item-active'), h <= k - 1),
              ),
              style: {
                backgroundColor: h <= k - 1 ? g : p,
                width: y,
                height: a,
              },
            });
          }
          return d.createElement(
            'div',
            { className: ''.concat(f, '-steps-outer') },
            m,
            v,
          );
        },
        W = P,
        j = function (e, t) {
          var r = {};
          for (var o in e)
            Object.prototype.hasOwnProperty.call(e, o) &&
              t.indexOf(o) < 0 &&
              (r[o] = e[o]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var n = 0;
            for (o = Object.getOwnPropertySymbols(e); n < o.length; n++)
              t.indexOf(o[n]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, o[n]) &&
                (r[o[n]] = e[o[n]]);
          }
          return r;
        },
        D =
          ((0, v.b)('line', 'circle', 'dashboard'),
          (0, v.b)('normal', 'exception', 'active', 'success')),
        L = function (e) {
          var t,
            r = e.prefixCls,
            l = e.className,
            v = e.steps,
            k = e.strokeColor,
            y = e.percent,
            g = void 0 === y ? 0 : y,
            C = e.size,
            b = void 0 === C ? 'default' : C,
            x = e.showInfo,
            O = void 0 === x || x,
            Z = e.type,
            N = void 0 === Z ? 'line' : Z,
            P = j(e, [
              'prefixCls',
              'className',
              'steps',
              'strokeColor',
              'percent',
              'size',
              'showInfo',
              'type',
            ]);
          function L() {
            var t = h(e);
            return parseInt(void 0 !== t ? t.toString() : g.toString(), 10);
          }
          function A() {
            var t = e.status;
            return !D.includes(t) && L() >= 100 ? 'success' : t || 'normal';
          }
          function S(t, r) {
            var o,
              n = e.format,
              l = h(e);
            if (!O) return null;
            var u =
                n ||
                function (e) {
                  return ''.concat(e, '%');
                },
              p = 'line' === N;
            return (
              n || ('exception' !== r && 'success' !== r)
                ? (o = u(m(g), m(l)))
                : 'exception' === r
                ? (o = p
                    ? d.createElement(a.Z, null)
                    : d.createElement(i.Z, null))
                : 'success' === r &&
                  (o = p
                    ? d.createElement(c.Z, null)
                    : d.createElement(s.Z, null)),
              d.createElement(
                'span',
                {
                  className: ''.concat(t, '-text'),
                  title: 'string' === typeof o ? o : void 0,
                },
                o,
              )
            );
          }
          var I,
            R = d.useContext(f.E_),
            z = R.getPrefixCls,
            _ = R.direction,
            M = z('progress', r),
            q = A(),
            B = S(M, q),
            F = Array.isArray(k) ? k[0] : k,
            T = 'string' === typeof k || Array.isArray(k) ? k : void 0;
          'line' === N
            ? (I = v
                ? d.createElement(
                    W,
                    (0, n.Z)({}, e, { strokeColor: T, prefixCls: M, steps: v }),
                    B,
                  )
                : d.createElement(
                    w,
                    (0, n.Z)({}, e, {
                      strokeColor: F,
                      prefixCls: M,
                      direction: _,
                    }),
                    B,
                  ))
            : ('circle' !== N && 'dashboard' !== N) ||
              (I = d.createElement(
                E,
                (0, n.Z)({}, e, {
                  strokeColor: F,
                  prefixCls: M,
                  progressStatus: q,
                }),
                B,
              ));
          var G = u()(
            M,
            ((t = {}),
            (0, o.Z)(
              t,
              ''
                .concat(M, '-')
                .concat(('dashboard' === N ? 'circle' : v && 'steps') || N),
              !0,
            ),
            (0, o.Z)(t, ''.concat(M, '-status-').concat(q), !0),
            (0, o.Z)(t, ''.concat(M, '-show-info'), O),
            (0, o.Z)(t, ''.concat(M, '-').concat(b), b),
            (0, o.Z)(t, ''.concat(M, '-rtl'), 'rtl' === _),
            t),
            l,
          );
          return d.createElement(
            'div',
            (0, n.Z)(
              {},
              (0, p.Z)(P, [
                'status',
                'format',
                'trailColor',
                'strokeWidth',
                'width',
                'gapDegree',
                'gapPosition',
                'strokeLinecap',
                'success',
                'successPercent',
              ]),
              { className: G, role: 'progressbar' },
            ),
            I,
          );
        },
        A = L,
        S = A;
    },
    34669: function (e, t, r) {
      'use strict';
      r(38663), r(70350);
    },
    43094: function (e, t, r) {
      'use strict';
      r.r(t),
        r.d(t, {
          Circle: function () {
            return N;
          },
          Line: function () {
            return d;
          },
          default: function () {
            return w;
          },
        });
      var o = r(22122),
        n = r(81253),
        c = r(12924),
        s = r(94184),
        a = r.n(s),
        i = {
          className: '',
          percent: 0,
          prefixCls: 'rc-progress',
          strokeColor: '#2db7f5',
          strokeLinecap: 'round',
          strokeWidth: 1,
          style: {},
          trailColor: '#D9D9D9',
          trailWidth: 1,
          gapPosition: 'bottom',
        },
        l = function () {
          var e = (0, c.useRef)([]),
            t = (0, c.useRef)(null);
          return (
            (0, c.useEffect)(function () {
              var r = Date.now(),
                o = !1;
              e.current.forEach(function (e) {
                if (e) {
                  o = !0;
                  var n = e.style;
                  (n.transitionDuration = '.3s, .3s, .3s, .06s'),
                    t.current &&
                      r - t.current < 100 &&
                      (n.transitionDuration = '0s, 0s');
                }
              }),
                o && (t.current = Date.now());
            }),
            e.current
          );
        },
        u = [
          'className',
          'percent',
          'prefixCls',
          'strokeColor',
          'strokeLinecap',
          'strokeWidth',
          'style',
          'trailColor',
          'trailWidth',
          'transition',
        ],
        p = function (e) {
          var t = e.className,
            r = e.percent,
            s = e.prefixCls,
            i = e.strokeColor,
            p = e.strokeLinecap,
            d = e.strokeWidth,
            f = e.style,
            v = e.trailColor,
            k = e.trailWidth,
            y = e.transition,
            m = (0, n.Z)(e, u);
          delete m.gapPosition;
          var h = Array.isArray(r) ? r : [r],
            g = Array.isArray(i) ? i : [i],
            C = l(),
            b = d / 2,
            E = 100 - d / 2,
            x = 'M '
              .concat('round' === p ? b : 0, ',')
              .concat(b, '\n         L ')
              .concat('round' === p ? E : 100, ',')
              .concat(b),
            O = '0 0 100 '.concat(d),
            Z = 0;
          return c.createElement(
            'svg',
            (0, o.Z)(
              {
                className: a()(''.concat(s, '-line'), t),
                viewBox: O,
                preserveAspectRatio: 'none',
                style: f,
              },
              m,
            ),
            c.createElement('path', {
              className: ''.concat(s, '-line-trail'),
              d: x,
              strokeLinecap: p,
              stroke: v,
              strokeWidth: k || d,
              fillOpacity: '0',
            }),
            h.map(function (e, t) {
              var r = 1;
              switch (p) {
                case 'round':
                  r = 1 - d / 100;
                  break;
                case 'square':
                  r = 1 - d / 2 / 100;
                  break;
                default:
                  r = 1;
                  break;
              }
              var o = {
                  strokeDasharray: ''.concat(e * r, 'px, 100px'),
                  strokeDashoffset: '-'.concat(Z, 'px'),
                  transition:
                    y ||
                    'stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear',
                },
                n = g[t] || g[g.length - 1];
              return (
                (Z += e),
                c.createElement('path', {
                  key: t,
                  className: ''.concat(s, '-line-path'),
                  d: x,
                  strokeLinecap: p,
                  stroke: n,
                  strokeWidth: d,
                  fillOpacity: '0',
                  ref: function (e) {
                    C[t] = e;
                  },
                  style: o,
                })
              );
            }),
          );
        };
      (p.defaultProps = i), (p.displayName = 'Line');
      var d = p,
        f = r(90484),
        v = r(28481),
        k = r(98924),
        y = 0,
        m = (0, k.Z)();
      function h() {
        var e;
        return m ? ((e = y), (y += 1)) : (e = 'TEST_OR_SSR'), e;
      }
      var g = function (e) {
          var t = c.useState(),
            r = (0, v.Z)(t, 2),
            o = r[0],
            n = r[1];
          return (
            c.useEffect(function () {
              n('rc_progress_'.concat(h()));
            }, []),
            e || o
          );
        },
        C = [
          'id',
          'prefixCls',
          'steps',
          'strokeWidth',
          'trailWidth',
          'gapDegree',
          'gapPosition',
          'trailColor',
          'strokeLinecap',
          'style',
          'className',
          'strokeColor',
          'percent',
        ];
      function b(e) {
        return +e.replace('%', '');
      }
      function E(e) {
        var t = null !== e && void 0 !== e ? e : [];
        return Array.isArray(t) ? t : [t];
      }
      var x = 100,
        O = function (e, t, r, o, n, c, s, a, i, l) {
          var u =
              arguments.length > 10 && void 0 !== arguments[10]
                ? arguments[10]
                : 0,
            p = (r / 100) * 360 * ((360 - c) / 360),
            d = 0 === c ? 0 : { bottom: 0, top: 180, left: 90, right: -90 }[s],
            f = ((100 - o) / 100) * t;
          return (
            'round' === i &&
              100 !== o &&
              ((f += l / 2), f >= t && (f = t - 0.01)),
            {
              stroke: 'string' === typeof a ? a : void 0,
              strokeDasharray: ''.concat(t, 'px ').concat(e),
              strokeDashoffset: f + u,
              transform: 'rotate('.concat(n + p + d, 'deg)'),
              transformOrigin: '0 0',
              transition:
                'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s',
              fillOpacity: 0,
            }
          );
        },
        Z = function (e) {
          var t = e.id,
            r = e.prefixCls,
            s = e.steps,
            i = e.strokeWidth,
            u = e.trailWidth,
            p = e.gapDegree,
            d = void 0 === p ? 0 : p,
            v = e.gapPosition,
            k = e.trailColor,
            y = e.strokeLinecap,
            m = e.style,
            h = e.className,
            Z = e.strokeColor,
            N = e.percent,
            w = (0, n.Z)(e, C),
            P = g(t),
            W = ''.concat(P, '-gradient'),
            j = x / 2 - i / 2,
            D = 2 * Math.PI * j,
            L = d > 0 ? 90 + d / 2 : -90,
            A = D * ((360 - d) / 360),
            S = 'object' === (0, f.Z)(s) ? s : { count: s, space: 2 },
            I = S.count,
            R = S.space,
            z = O(D, A, 0, 100, L, d, v, k, y, i),
            _ = E(N),
            M = E(Z),
            q = M.find(function (e) {
              return e && 'object' === (0, f.Z)(e);
            }),
            B = l(),
            F = function () {
              var e = 0;
              return _.map(function (t, o) {
                var n = M[o] || M[M.length - 1],
                  s =
                    n && 'object' === (0, f.Z)(n)
                      ? 'url(#'.concat(W, ')')
                      : void 0,
                  a = O(D, A, e, t, L, d, v, n, y, i);
                return (
                  (e += t),
                  c.createElement('circle', {
                    key: o,
                    className: ''.concat(r, '-circle-path'),
                    r: j,
                    cx: 0,
                    cy: 0,
                    stroke: s,
                    strokeLinecap: y,
                    strokeWidth: i,
                    opacity: 0 === t ? 0 : 1,
                    style: a,
                    ref: function (e) {
                      B[o] = e;
                    },
                  })
                );
              }).reverse();
            },
            T = function () {
              var e = Math.round(I * (_[0] / 100)),
                t = 100 / I,
                o = 0;
              return new Array(I).fill(null).map(function (n, s) {
                var a = s <= e - 1 ? M[0] : k,
                  l =
                    a && 'object' === (0, f.Z)(a)
                      ? 'url(#'.concat(W, ')')
                      : void 0,
                  u = O(D, A, o, t, L, d, v, a, 'butt', i, R);
                return (
                  (o += (100 * (A - u.strokeDashoffset + R)) / A),
                  c.createElement('circle', {
                    key: s,
                    className: ''.concat(r, '-circle-path'),
                    r: j,
                    cx: 0,
                    cy: 0,
                    stroke: l,
                    strokeWidth: i,
                    opacity: 1,
                    style: u,
                    ref: function (e) {
                      B[s] = e;
                    },
                  })
                );
              });
            };
          return c.createElement(
            'svg',
            (0, o.Z)(
              {
                className: a()(''.concat(r, '-circle'), h),
                viewBox: ''
                  .concat(-x / 2, ' ')
                  .concat(-x / 2, ' ')
                  .concat(x, ' ')
                  .concat(x),
                style: m,
                id: t,
                role: 'presentation',
              },
              w,
            ),
            q &&
              c.createElement(
                'defs',
                null,
                c.createElement(
                  'linearGradient',
                  { id: W, x1: '100%', y1: '0%', x2: '0%', y2: '0%' },
                  Object.keys(q)
                    .sort(function (e, t) {
                      return b(e) - b(t);
                    })
                    .map(function (e, t) {
                      return c.createElement('stop', {
                        key: t,
                        offset: e,
                        stopColor: q[e],
                      });
                    }),
                ),
              ),
            !I &&
              c.createElement('circle', {
                className: ''.concat(r, '-circle-trail'),
                r: j,
                cx: 0,
                cy: 0,
                stroke: k,
                strokeLinecap: y,
                strokeWidth: u || i,
                style: z,
              }),
            I ? T() : F(),
          );
        };
      (Z.defaultProps = i), (Z.displayName = 'Circle');
      var N = Z,
        w = { Line: d, Circle: N };
    },
  },
]);
