(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7327],
  {
    70792: function () {},
    22832: function (e, n, t) {
      'use strict';
      t.d(n, {
        Z: function () {
          return D;
        },
      });
      var a = t(66674),
        r = t(96156),
        o = t(22122),
        u = t(28481),
        l = t(94184),
        c = t.n(l),
        f = t(32475),
        i = t.n(f),
        d = t(31878),
        s = t(21770),
        v = t(12924),
        g = t(53124),
        h = t(42051),
        m = t(65223),
        p = t(99692),
        C = t(16984),
        Z = t(9e3),
        x = 10,
        M = 20;
      function E(e) {
        var n = e.fullscreen,
          t = e.validRange,
          a = e.generateConfig,
          r = e.locale,
          o = e.prefixCls,
          l = e.value,
          c = e.onChange,
          f = e.divRef,
          i = a.getYear(l || a.getNow()),
          d = i - x,
          s = d + M;
        t && ((d = a.getYear(t[0])), (s = a.getYear(t[1]) + 1));
        for (
          var g = r && '\u5e74' === r.year ? '\u5e74' : '', h = [], m = d;
          m < s;
          m++
        )
          h.push({ label: ''.concat(m).concat(g), value: m });
        return v.createElement(Z.Z, {
          size: n ? void 0 : 'small',
          options: h,
          value: i,
          className: ''.concat(o, '-year-select'),
          onChange: function (e) {
            var n = a.setYear(l, e);
            if (t) {
              var r = (0, u.Z)(t, 2),
                o = r[0],
                f = r[1],
                i = a.getYear(n),
                d = a.getMonth(n);
              i === a.getYear(f) &&
                d > a.getMonth(f) &&
                (n = a.setMonth(n, a.getMonth(f))),
                i === a.getYear(o) &&
                  d < a.getMonth(o) &&
                  (n = a.setMonth(n, a.getMonth(o)));
            }
            c(n);
          },
          getPopupContainer: function () {
            return f.current;
          },
        });
      }
      function N(e) {
        var n = e.prefixCls,
          t = e.fullscreen,
          a = e.validRange,
          r = e.value,
          o = e.generateConfig,
          l = e.locale,
          c = e.onChange,
          f = e.divRef,
          i = o.getMonth(r || o.getNow()),
          d = 0,
          s = 11;
        if (a) {
          var g = (0, u.Z)(a, 2),
            h = g[0],
            m = g[1],
            p = o.getYear(r);
          o.getYear(m) === p && (s = o.getMonth(m)),
            o.getYear(h) === p && (d = o.getMonth(h));
        }
        for (
          var C = l.shortMonths || o.locale.getShortMonths(l.locale),
            x = [],
            M = d;
          M <= s;
          M += 1
        )
          x.push({ label: C[M], value: M });
        return v.createElement(Z.Z, {
          size: t ? void 0 : 'small',
          className: ''.concat(n, '-month-select'),
          value: i,
          options: x,
          onChange: function (e) {
            c(o.setMonth(r, e));
          },
          getPopupContainer: function () {
            return f.current;
          },
        });
      }
      function R(e) {
        var n = e.prefixCls,
          t = e.locale,
          a = e.mode,
          r = e.fullscreen,
          o = e.onModeChange;
        return v.createElement(
          p.Z,
          {
            onChange: function (e) {
              var n = e.target.value;
              o(n);
            },
            value: a,
            size: r ? void 0 : 'small',
            className: ''.concat(n, '-mode-switch'),
          },
          v.createElement(C.Z, { value: 'month' }, t.month),
          v.createElement(C.Z, { value: 'year' }, t.year),
        );
      }
      function b(e) {
        var n = e.prefixCls,
          t = e.fullscreen,
          a = e.mode,
          r = e.onChange,
          u = e.onModeChange,
          l = v.useRef(null),
          c = (0, v.useContext)(m.aM),
          f = (0, v.useMemo)(
            function () {
              return (0, o.Z)((0, o.Z)({}, c), { isFormItemInput: !1 });
            },
            [c],
          ),
          i = (0, o.Z)((0, o.Z)({}, e), {
            onChange: r,
            fullscreen: t,
            divRef: l,
          });
        return v.createElement(
          'div',
          { className: ''.concat(n, '-header'), ref: l },
          v.createElement(
            m.aM.Provider,
            { value: f },
            v.createElement(E, (0, o.Z)({}, i)),
            'month' === a && v.createElement(N, (0, o.Z)({}, i)),
          ),
          v.createElement(R, (0, o.Z)({}, i, { onModeChange: u })),
        );
      }
      var y = b,
        Y = t(74228);
      function w(e) {
        function n(n, t) {
          return n && t && e.getYear(n) === e.getYear(t);
        }
        function t(t, a) {
          return n(t, a) && e.getMonth(t) === e.getMonth(a);
        }
        function a(n, a) {
          return t(n, a) && e.getDate(n) === e.getDate(a);
        }
        var l = function (l) {
          var f = l.prefixCls,
            m = l.className,
            p = l.style,
            C = l.dateFullCellRender,
            Z = l.dateCellRender,
            x = l.monthFullCellRender,
            M = l.monthCellRender,
            E = l.headerRender,
            N = l.value,
            R = l.defaultValue,
            b = l.disabledDate,
            w = l.mode,
            k = l.validRange,
            j = l.fullscreen,
            D = void 0 === j || j,
            P = l.onChange,
            S = l.onPanelChange,
            z = l.onSelect,
            A = v.useContext(g.E_),
            F = A.getPrefixCls,
            I = A.direction,
            V = F('picker', f),
            H = ''.concat(V, '-calendar'),
            L = e.getNow(),
            T = (0, s.Z)(
              function () {
                return N || e.getNow();
              },
              { defaultValue: R, value: N },
            ),
            _ = (0, u.Z)(T, 2),
            q = _[0],
            B = _[1],
            G = (0, s.Z)('month', { value: w }),
            J = (0, u.Z)(G, 2),
            K = J[0],
            O = J[1],
            Q = v.useMemo(
              function () {
                return 'year' === K ? 'month' : 'date';
              },
              [K],
            ),
            U = v.useCallback(
              function (n) {
                var t = !!k && (e.isAfter(k[0], n) || e.isAfter(n, k[1]));
                return t || !!(null === b || void 0 === b ? void 0 : b(n));
              },
              [b, k],
            ),
            W = function (e, n) {
              null === S || void 0 === S || S(e, n);
            },
            X = function (e) {
              B(e),
                a(e, q) ||
                  ((('date' === Q && !t(e, q)) ||
                    ('month' === Q && !n(e, q))) &&
                    W(e, K),
                  null === P || void 0 === P || P(e));
            },
            $ = function (e) {
              O(e), W(q, e);
            },
            ee = function (e) {
              X(e), null === z || void 0 === z || z(e);
            },
            ne = function () {
              var e = l.locale,
                n = (0, o.Z)((0, o.Z)({}, Y.Z), e);
              return (
                (n.lang = (0, o.Z)((0, o.Z)({}, n.lang), (e || {}).lang)), n
              );
            },
            te = v.useCallback(
              function (n) {
                return C
                  ? C(n)
                  : v.createElement(
                      'div',
                      {
                        className: c()(
                          ''.concat(V, '-cell-inner'),
                          ''.concat(H, '-date'),
                          (0, r.Z)({}, ''.concat(H, '-date-today'), a(L, n)),
                        ),
                      },
                      v.createElement(
                        'div',
                        { className: ''.concat(H, '-date-value') },
                        i()(String(e.getDate(n)), 2, '0'),
                      ),
                      v.createElement(
                        'div',
                        { className: ''.concat(H, '-date-content') },
                        Z && Z(n),
                      ),
                    );
              },
              [C, Z],
            ),
            ae = v.useCallback(
              function (n, a) {
                if (x) return x(n);
                var o = a.shortMonths || e.locale.getShortMonths(a.locale);
                return v.createElement(
                  'div',
                  {
                    className: c()(
                      ''.concat(V, '-cell-inner'),
                      ''.concat(H, '-date'),
                      (0, r.Z)({}, ''.concat(H, '-date-today'), t(L, n)),
                    ),
                  },
                  v.createElement(
                    'div',
                    { className: ''.concat(H, '-date-value') },
                    o[e.getMonth(n)],
                  ),
                  v.createElement(
                    'div',
                    { className: ''.concat(H, '-date-content') },
                    M && M(n),
                  ),
                );
              },
              [x, M],
            );
          return v.createElement(
            h.Z,
            { componentName: 'Calendar', defaultLocale: ne },
            function (n) {
              var t;
              return v.createElement(
                'div',
                {
                  className: c()(
                    H,
                    ((t = {}),
                    (0, r.Z)(t, ''.concat(H, '-full'), D),
                    (0, r.Z)(t, ''.concat(H, '-mini'), !D),
                    (0, r.Z)(t, ''.concat(H, '-rtl'), 'rtl' === I),
                    t),
                    m,
                  ),
                  style: p,
                },
                E
                  ? E({ value: q, type: K, onChange: ee, onTypeChange: $ })
                  : v.createElement(y, {
                      prefixCls: H,
                      value: q,
                      generateConfig: e,
                      mode: K,
                      fullscreen: D,
                      locale: n.lang,
                      validRange: k,
                      onChange: ee,
                      onModeChange: $,
                    }),
                v.createElement(d.N4, {
                  value: q,
                  prefixCls: V,
                  locale: n.lang,
                  generateConfig: e,
                  dateRender: te,
                  monthCellRender: function (e) {
                    return ae(e, n.lang);
                  },
                  onSelect: ee,
                  mode: Q,
                  picker: Q,
                  disabledDate: U,
                  hideHeader: !0,
                }),
              );
            },
          );
        };
        return l;
      }
      var k = w,
        j = k(a.Z),
        D = j;
    },
    31903: function (e, n, t) {
      'use strict';
      t(38663), t(70792), t(14965), t(88983), t(43358);
    },
    48983: function (e, n, t) {
      var a = t(40371),
        r = a('length');
      e.exports = r;
    },
    44286: function (e) {
      function n(e) {
        return e.split('');
      }
      e.exports = n;
    },
    18190: function (e) {
      var n = 9007199254740991,
        t = Math.floor;
      function a(e, a) {
        var r = '';
        if (!e || a < 1 || a > n) return r;
        do {
          a % 2 && (r += e), (a = t(a / 2)), a && (e += e);
        } while (a);
        return r;
      }
      e.exports = a;
    },
    14259: function (e) {
      function n(e, n, t) {
        var a = -1,
          r = e.length;
        n < 0 && (n = -n > r ? 0 : r + n),
          (t = t > r ? r : t),
          t < 0 && (t += r),
          (r = n > t ? 0 : (t - n) >>> 0),
          (n >>>= 0);
        var o = Array(r);
        while (++a < r) o[a] = e[a + n];
        return o;
      }
      e.exports = n;
    },
    40180: function (e, n, t) {
      var a = t(14259);
      function r(e, n, t) {
        var r = e.length;
        return (t = void 0 === t ? r : t), !n && t >= r ? e : a(e, n, t);
      }
      e.exports = r;
    },
    78302: function (e, n, t) {
      var a = t(18190),
        r = t(80531),
        o = t(40180),
        u = t(62689),
        l = t(88016),
        c = t(83140),
        f = Math.ceil;
      function i(e, n) {
        n = void 0 === n ? ' ' : r(n);
        var t = n.length;
        if (t < 2) return t ? a(n, e) : n;
        var i = a(n, f(e / l(n)));
        return u(n) ? o(c(i), 0, e).join('') : i.slice(0, e);
      }
      e.exports = i;
    },
    62689: function (e) {
      var n = '\\ud800-\\udfff',
        t = '\\u0300-\\u036f',
        a = '\\ufe20-\\ufe2f',
        r = '\\u20d0-\\u20ff',
        o = t + a + r,
        u = '\\ufe0e\\ufe0f',
        l = '\\u200d',
        c = RegExp('[' + l + n + o + u + ']');
      function f(e) {
        return c.test(e);
      }
      e.exports = f;
    },
    88016: function (e, n, t) {
      var a = t(48983),
        r = t(62689),
        o = t(21903);
      function u(e) {
        return r(e) ? o(e) : a(e);
      }
      e.exports = u;
    },
    83140: function (e, n, t) {
      var a = t(44286),
        r = t(62689),
        o = t(676);
      function u(e) {
        return r(e) ? o(e) : a(e);
      }
      e.exports = u;
    },
    21903: function (e) {
      var n = '\\ud800-\\udfff',
        t = '\\u0300-\\u036f',
        a = '\\ufe20-\\ufe2f',
        r = '\\u20d0-\\u20ff',
        o = t + a + r,
        u = '\\ufe0e\\ufe0f',
        l = '[' + n + ']',
        c = '[' + o + ']',
        f = '\\ud83c[\\udffb-\\udfff]',
        i = '(?:' + c + '|' + f + ')',
        d = '[^' + n + ']',
        s = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        v = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        g = '\\u200d',
        h = i + '?',
        m = '[' + u + ']?',
        p = '(?:' + g + '(?:' + [d, s, v].join('|') + ')' + m + h + ')*',
        C = m + h + p,
        Z = '(?:' + [d + c + '?', c, s, v, l].join('|') + ')',
        x = RegExp(f + '(?=' + f + ')|' + Z + C, 'g');
      function M(e) {
        var n = (x.lastIndex = 0);
        while (x.test(e)) ++n;
        return n;
      }
      e.exports = M;
    },
    676: function (e) {
      var n = '\\ud800-\\udfff',
        t = '\\u0300-\\u036f',
        a = '\\ufe20-\\ufe2f',
        r = '\\u20d0-\\u20ff',
        o = t + a + r,
        u = '\\ufe0e\\ufe0f',
        l = '[' + n + ']',
        c = '[' + o + ']',
        f = '\\ud83c[\\udffb-\\udfff]',
        i = '(?:' + c + '|' + f + ')',
        d = '[^' + n + ']',
        s = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        v = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        g = '\\u200d',
        h = i + '?',
        m = '[' + u + ']?',
        p = '(?:' + g + '(?:' + [d, s, v].join('|') + ')' + m + h + ')*',
        C = m + h + p,
        Z = '(?:' + [d + c + '?', c, s, v, l].join('|') + ')',
        x = RegExp(f + '(?=' + f + ')|' + Z + C, 'g');
      function M(e) {
        return e.match(x) || [];
      }
      e.exports = M;
    },
    32475: function (e, n, t) {
      var a = t(78302),
        r = t(88016),
        o = t(40554),
        u = t(79833);
      function l(e, n, t) {
        (e = u(e)), (n = o(n));
        var l = n ? r(e) : 0;
        return n && l < n ? a(n - l, t) + e : e;
      }
      e.exports = l;
    },
    18601: function (e, n, t) {
      var a = t(14841),
        r = 1 / 0,
        o = 17976931348623157e292;
      function u(e) {
        if (!e) return 0 === e ? e : 0;
        if (((e = a(e)), e === r || e === -r)) {
          var n = e < 0 ? -1 : 1;
          return n * o;
        }
        return e === e ? e : 0;
      }
      e.exports = u;
    },
    40554: function (e, n, t) {
      var a = t(18601);
      function r(e) {
        var n = a(e),
          t = n % 1;
        return n === n ? (t ? n - t : n) : 0;
      }
      e.exports = r;
    },
  },
]);
