(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [983],
  {
    18067: function () {},
    81903: function () {},
    19586: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return _;
        },
      });
      var r = n(96156),
        a = n(22122),
        c = n(90484),
        o = n(94184),
        i = n.n(o),
        u = n(12924),
        l = n(53124),
        s = n(98423),
        f = function (e) {
          var t,
            n,
            c = e.prefixCls,
            o = e.className,
            l = e.style,
            s = e.size,
            f = e.shape,
            v = i()(
              ((t = {}),
              (0, r.Z)(t, ''.concat(c, '-lg'), 'large' === s),
              (0, r.Z)(t, ''.concat(c, '-sm'), 'small' === s),
              t),
            ),
            d = i()(
              ((n = {}),
              (0, r.Z)(n, ''.concat(c, '-circle'), 'circle' === f),
              (0, r.Z)(n, ''.concat(c, '-square'), 'square' === f),
              (0, r.Z)(n, ''.concat(c, '-round'), 'round' === f),
              n),
            ),
            m = u.useMemo(
              function () {
                return 'number' === typeof s
                  ? { width: s, height: s, lineHeight: ''.concat(s, 'px') }
                  : {};
              },
              [s],
            );
          return u.createElement('span', {
            className: i()(c, v, d, o),
            style: (0, a.Z)((0, a.Z)({}, m), l),
          });
        },
        v = f,
        d = function (e) {
          var t = e.prefixCls,
            n = e.className,
            c = e.active,
            o = e.shape,
            f = void 0 === o ? 'circle' : o,
            d = e.size,
            m = void 0 === d ? 'default' : d,
            p = u.useContext(l.E_),
            x = p.getPrefixCls,
            g = x('skeleton', t),
            h = (0, s.Z)(e, ['prefixCls', 'className']),
            E = i()(
              g,
              ''.concat(g, '-element'),
              (0, r.Z)({}, ''.concat(g, '-active'), c),
              n,
            );
          return u.createElement(
            'div',
            { className: E },
            u.createElement(
              v,
              (0, a.Z)(
                { prefixCls: ''.concat(g, '-avatar'), shape: f, size: m },
                h,
              ),
            ),
          );
        },
        m = d,
        p = function (e) {
          var t,
            n = e.prefixCls,
            c = e.className,
            o = e.active,
            f = e.block,
            d = void 0 !== f && f,
            m = e.size,
            p = void 0 === m ? 'default' : m,
            x = u.useContext(l.E_),
            g = x.getPrefixCls,
            h = g('skeleton', n),
            E = (0, s.Z)(e, ['prefixCls']),
            Z = i()(
              h,
              ''.concat(h, '-element'),
              ((t = {}),
              (0, r.Z)(t, ''.concat(h, '-active'), o),
              (0, r.Z)(t, ''.concat(h, '-block'), d),
              t),
              c,
            );
          return u.createElement(
            'div',
            { className: Z },
            u.createElement(
              v,
              (0, a.Z)({ prefixCls: ''.concat(h, '-button'), size: p }, E),
            ),
          );
        },
        x = p,
        g = n(93181),
        h = function (e) {
          var t = e.prefixCls,
            n = e.className,
            a = e.style,
            c = e.active,
            o = e.children,
            s = u.useContext(l.E_),
            f = s.getPrefixCls,
            v = f('skeleton', t),
            d = i()(
              v,
              ''.concat(v, '-element'),
              (0, r.Z)({}, ''.concat(v, '-active'), c),
              n,
            ),
            m = null !== o && void 0 !== o ? o : u.createElement(g.Z, null);
          return u.createElement(
            'div',
            { className: d },
            u.createElement(
              'div',
              { className: i()(''.concat(v, '-image'), n), style: a },
              m,
            ),
          );
        },
        E = h,
        Z =
          'M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z',
        C = function (e) {
          var t = e.prefixCls,
            n = e.className,
            a = e.style,
            c = e.active,
            o = u.useContext(l.E_),
            s = o.getPrefixCls,
            f = s('skeleton', t),
            v = i()(
              f,
              ''.concat(f, '-element'),
              (0, r.Z)({}, ''.concat(f, '-active'), c),
              n,
            );
          return u.createElement(
            'div',
            { className: v },
            u.createElement(
              'div',
              { className: i()(''.concat(f, '-image'), n), style: a },
              u.createElement(
                'svg',
                {
                  viewBox: '0 0 1098 1024',
                  xmlns: 'http://www.w3.org/2000/svg',
                  className: ''.concat(f, '-image-svg'),
                },
                u.createElement('path', {
                  d: Z,
                  className: ''.concat(f, '-image-path'),
                }),
              ),
            ),
          );
        },
        N = C,
        w = function (e) {
          var t,
            n = e.prefixCls,
            c = e.className,
            o = e.active,
            f = e.block,
            d = e.size,
            m = void 0 === d ? 'default' : d,
            p = u.useContext(l.E_),
            x = p.getPrefixCls,
            g = x('skeleton', n),
            h = (0, s.Z)(e, ['prefixCls']),
            E = i()(
              g,
              ''.concat(g, '-element'),
              ((t = {}),
              (0, r.Z)(t, ''.concat(g, '-active'), o),
              (0, r.Z)(t, ''.concat(g, '-block'), f),
              t),
              c,
            );
          return u.createElement(
            'div',
            { className: E },
            u.createElement(
              v,
              (0, a.Z)({ prefixCls: ''.concat(g, '-input'), size: m }, h),
            ),
          );
        },
        y = w,
        k = n(85061),
        b = function (e) {
          var t = function (t) {
              var n = e.width,
                r = e.rows,
                a = void 0 === r ? 2 : r;
              return Array.isArray(n) ? n[t] : a - 1 === t ? n : void 0;
            },
            n = e.prefixCls,
            r = e.className,
            a = e.style,
            c = e.rows,
            o = (0, k.Z)(Array(c)).map(function (e, n) {
              return u.createElement('li', { key: n, style: { width: t(n) } });
            });
          return u.createElement('ul', { className: i()(n, r), style: a }, o);
        },
        M = b,
        z = function (e) {
          var t = e.prefixCls,
            n = e.className,
            r = e.width,
            c = e.style;
          return u.createElement('h3', {
            className: i()(t, n),
            style: (0, a.Z)({ width: r }, c),
          });
        },
        q = z;
      function S(e) {
        return e && 'object' === (0, c.Z)(e) ? e : {};
      }
      function D(e, t) {
        return e && !t
          ? { size: 'large', shape: 'square' }
          : { size: 'large', shape: 'circle' };
      }
      function P(e, t) {
        return !e && t ? { width: '38%' } : e && t ? { width: '50%' } : {};
      }
      function R(e, t) {
        var n = {};
        return (e && t) || (n.width = '61%'), (n.rows = !e && t ? 3 : 2), n;
      }
      var j = function (e) {
        var t = e.prefixCls,
          n = e.loading,
          c = e.className,
          o = e.style,
          s = e.children,
          f = e.avatar,
          d = void 0 !== f && f,
          m = e.title,
          p = void 0 === m || m,
          x = e.paragraph,
          g = void 0 === x || x,
          h = e.active,
          E = e.round,
          Z = u.useContext(l.E_),
          C = Z.getPrefixCls,
          N = Z.direction,
          w = C('skeleton', t);
        if (n || !('loading' in e)) {
          var y,
            k,
            b,
            z = !!d,
            j = !!p,
            I = !!g;
          if (z) {
            var _ = (0, a.Z)(
              (0, a.Z)({ prefixCls: ''.concat(w, '-avatar') }, D(j, I)),
              S(d),
            );
            k = u.createElement(
              'div',
              { className: ''.concat(w, '-header') },
              u.createElement(v, (0, a.Z)({}, _)),
            );
          }
          if (j || I) {
            var A, H;
            if (j) {
              var B = (0, a.Z)(
                (0, a.Z)({ prefixCls: ''.concat(w, '-title') }, P(z, I)),
                S(p),
              );
              A = u.createElement(q, (0, a.Z)({}, B));
            }
            if (I) {
              var T = (0, a.Z)(
                (0, a.Z)({ prefixCls: ''.concat(w, '-paragraph') }, R(z, j)),
                S(g),
              );
              H = u.createElement(M, (0, a.Z)({}, T));
            }
            b = u.createElement(
              'div',
              { className: ''.concat(w, '-content') },
              A,
              H,
            );
          }
          var L = i()(
            w,
            ((y = {}),
            (0, r.Z)(y, ''.concat(w, '-with-avatar'), z),
            (0, r.Z)(y, ''.concat(w, '-active'), h),
            (0, r.Z)(y, ''.concat(w, '-rtl'), 'rtl' === N),
            (0, r.Z)(y, ''.concat(w, '-round'), E),
            y),
            c,
          );
          return u.createElement('div', { className: L, style: o }, k, b);
        }
        return 'undefined' !== typeof s ? s : null;
      };
      (j.Button = x),
        (j.Avatar = m),
        (j.Input = y),
        (j.Image = N),
        (j.Node = E);
      var I = j,
        _ = I;
    },
    71748: function (e, t, n) {
      'use strict';
      n(38663), n(18067);
    },
    7277: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return q;
        },
      });
      var r = n(22122),
        a = n(12924),
        c = n(57838),
        o = n(96159),
        i = n(96156),
        u = n(94184),
        l = n.n(u),
        s = n(53124),
        f = n(19586),
        v = n(11726),
        d = n.n(v),
        m = function (e) {
          var t,
            n = e.value,
            r = e.formatter,
            c = e.precision,
            o = e.decimalSeparator,
            i = e.groupSeparator,
            u = void 0 === i ? '' : i,
            l = e.prefixCls;
          if ('function' === typeof r) t = r(n);
          else {
            var s = String(n),
              f = s.match(/^(-?)(\d*)(\.(\d+))?$/);
            if (f && '-' !== s) {
              var v = f[1],
                m = f[2] || '0',
                p = f[4] || '';
              (m = m.replace(/\B(?=(\d{3})+(?!\d))/g, u)),
                'number' === typeof c &&
                  (p = d()(p, c, '0').slice(0, c > 0 ? c : 0)),
                p && (p = ''.concat(o).concat(p)),
                (t = [
                  a.createElement(
                    'span',
                    {
                      key: 'int',
                      className: ''.concat(l, '-content-value-int'),
                    },
                    v,
                    m,
                  ),
                  p &&
                    a.createElement(
                      'span',
                      {
                        key: 'decimal',
                        className: ''.concat(l, '-content-value-decimal'),
                      },
                      p,
                    ),
                ]);
            } else t = s;
          }
          return a.createElement(
            'span',
            { className: ''.concat(l, '-content-value') },
            t,
          );
        },
        p = m,
        x = function (e) {
          var t = e.prefixCls,
            n = e.className,
            c = e.style,
            o = e.valueStyle,
            u = e.value,
            s = void 0 === u ? 0 : u,
            v = e.title,
            d = e.valueRender,
            m = e.prefix,
            x = e.suffix,
            g = e.loading,
            h = void 0 !== g && g,
            E = e.direction,
            Z = e.onMouseEnter,
            C = e.onMouseLeave,
            N = e.decimalSeparator,
            w = void 0 === N ? '.' : N,
            y = e.groupSeparator,
            k = void 0 === y ? ',' : y,
            b = a.createElement(
              p,
              (0, r.Z)({ decimalSeparator: w, groupSeparator: k }, e, {
                value: s,
              }),
            ),
            M = l()(t, (0, i.Z)({}, ''.concat(t, '-rtl'), 'rtl' === E), n);
          return a.createElement(
            'div',
            { className: M, style: c, onMouseEnter: Z, onMouseLeave: C },
            v &&
              a.createElement('div', { className: ''.concat(t, '-title') }, v),
            a.createElement(
              f.Z,
              {
                paragraph: !1,
                loading: h,
                className: ''.concat(t, '-skeleton'),
              },
              a.createElement(
                'div',
                { style: o, className: ''.concat(t, '-content') },
                m &&
                  a.createElement(
                    'span',
                    { className: ''.concat(t, '-content-prefix') },
                    m,
                  ),
                d ? d(b) : b,
                x &&
                  a.createElement(
                    'span',
                    { className: ''.concat(t, '-content-suffix') },
                    x,
                  ),
              ),
            ),
          );
        },
        g = (0, s.PG)({ prefixCls: 'statistic' })(x),
        h = g,
        E = n(28481),
        Z = n(32475),
        C = n.n(Z),
        N = [
          ['Y', 31536e6],
          ['M', 2592e6],
          ['D', 864e5],
          ['H', 36e5],
          ['m', 6e4],
          ['s', 1e3],
          ['S', 1],
        ];
      function w(e, t) {
        var n = e,
          r = /\[[^\]]*]/g,
          a = (t.match(r) || []).map(function (e) {
            return e.slice(1, -1);
          }),
          c = t.replace(r, '[]'),
          o = N.reduce(function (e, t) {
            var r = (0, E.Z)(t, 2),
              a = r[0],
              c = r[1];
            if (e.includes(a)) {
              var o = Math.floor(n / c);
              return (
                (n -= o * c),
                e.replace(new RegExp(''.concat(a, '+'), 'g'), function (e) {
                  var t = e.length;
                  return C()(o.toString(), t, '0');
                })
              );
            }
            return e;
          }, c),
          i = 0;
        return o.replace(r, function () {
          var e = a[i];
          return (i += 1), e;
        });
      }
      function y(e, t) {
        var n = t.format,
          r = void 0 === n ? '' : n,
          a = new Date(e).getTime(),
          c = Date.now(),
          o = Math.max(a - c, 0);
        return w(o, r);
      }
      var k = 1e3 / 30;
      function b(e) {
        return new Date(e).getTime();
      }
      var M = function (e) {
          var t = e.value,
            n = e.format,
            i = void 0 === n ? 'HH:mm:ss' : n,
            u = e.onChange,
            l = e.onFinish,
            s = (0, c.Z)(),
            f = a.useRef(null),
            v = function () {
              null === l || void 0 === l || l(),
                f.current && (clearInterval(f.current), (f.current = null));
            },
            d = function () {
              var e = b(t);
              e >= Date.now() &&
                (f.current = setInterval(function () {
                  s(),
                    null === u || void 0 === u || u(e - Date.now()),
                    e < Date.now() && v();
                }, k));
            };
          a.useEffect(
            function () {
              return (
                d(),
                function () {
                  f.current && (clearInterval(f.current), (f.current = null));
                }
              );
            },
            [t],
          );
          var m = function (e, t) {
              return y(e, (0, r.Z)((0, r.Z)({}, t), { format: i }));
            },
            p = function (e) {
              return (0, o.Tm)(e, { title: void 0 });
            };
          return a.createElement(
            h,
            (0, r.Z)({}, e, { valueRender: p, formatter: m }),
          );
        },
        z = a.memo(M);
      h.Countdown = z;
      var q = h;
    },
    95300: function (e, t, n) {
      'use strict';
      n(38663), n(81903), n(71748);
    },
    48983: function (e, t, n) {
      var r = n(40371),
        a = r('length');
      e.exports = a;
    },
    44286: function (e) {
      function t(e) {
        return e.split('');
      }
      e.exports = t;
    },
    18190: function (e) {
      var t = 9007199254740991,
        n = Math.floor;
      function r(e, r) {
        var a = '';
        if (!e || r < 1 || r > t) return a;
        do {
          r % 2 && (a += e), (r = n(r / 2)), r && (e += e);
        } while (r);
        return a;
      }
      e.exports = r;
    },
    14259: function (e) {
      function t(e, t, n) {
        var r = -1,
          a = e.length;
        t < 0 && (t = -t > a ? 0 : a + t),
          (n = n > a ? a : n),
          n < 0 && (n += a),
          (a = t > n ? 0 : (n - t) >>> 0),
          (t >>>= 0);
        var c = Array(a);
        while (++r < a) c[r] = e[r + t];
        return c;
      }
      e.exports = t;
    },
    40180: function (e, t, n) {
      var r = n(14259);
      function a(e, t, n) {
        var a = e.length;
        return (n = void 0 === n ? a : n), !t && n >= a ? e : r(e, t, n);
      }
      e.exports = a;
    },
    78302: function (e, t, n) {
      var r = n(18190),
        a = n(80531),
        c = n(40180),
        o = n(62689),
        i = n(88016),
        u = n(83140),
        l = Math.ceil;
      function s(e, t) {
        t = void 0 === t ? ' ' : a(t);
        var n = t.length;
        if (n < 2) return n ? r(t, e) : t;
        var s = r(t, l(e / i(t)));
        return o(t) ? c(u(s), 0, e).join('') : s.slice(0, e);
      }
      e.exports = s;
    },
    62689: function (e) {
      var t = '\\ud800-\\udfff',
        n = '\\u0300-\\u036f',
        r = '\\ufe20-\\ufe2f',
        a = '\\u20d0-\\u20ff',
        c = n + r + a,
        o = '\\ufe0e\\ufe0f',
        i = '\\u200d',
        u = RegExp('[' + i + t + c + o + ']');
      function l(e) {
        return u.test(e);
      }
      e.exports = l;
    },
    88016: function (e, t, n) {
      var r = n(48983),
        a = n(62689),
        c = n(21903);
      function o(e) {
        return a(e) ? c(e) : r(e);
      }
      e.exports = o;
    },
    83140: function (e, t, n) {
      var r = n(44286),
        a = n(62689),
        c = n(676);
      function o(e) {
        return a(e) ? c(e) : r(e);
      }
      e.exports = o;
    },
    21903: function (e) {
      var t = '\\ud800-\\udfff',
        n = '\\u0300-\\u036f',
        r = '\\ufe20-\\ufe2f',
        a = '\\u20d0-\\u20ff',
        c = n + r + a,
        o = '\\ufe0e\\ufe0f',
        i = '[' + t + ']',
        u = '[' + c + ']',
        l = '\\ud83c[\\udffb-\\udfff]',
        s = '(?:' + u + '|' + l + ')',
        f = '[^' + t + ']',
        v = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        d = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        m = '\\u200d',
        p = s + '?',
        x = '[' + o + ']?',
        g = '(?:' + m + '(?:' + [f, v, d].join('|') + ')' + x + p + ')*',
        h = x + p + g,
        E = '(?:' + [f + u + '?', u, v, d, i].join('|') + ')',
        Z = RegExp(l + '(?=' + l + ')|' + E + h, 'g');
      function C(e) {
        var t = (Z.lastIndex = 0);
        while (Z.test(e)) ++t;
        return t;
      }
      e.exports = C;
    },
    676: function (e) {
      var t = '\\ud800-\\udfff',
        n = '\\u0300-\\u036f',
        r = '\\ufe20-\\ufe2f',
        a = '\\u20d0-\\u20ff',
        c = n + r + a,
        o = '\\ufe0e\\ufe0f',
        i = '[' + t + ']',
        u = '[' + c + ']',
        l = '\\ud83c[\\udffb-\\udfff]',
        s = '(?:' + u + '|' + l + ')',
        f = '[^' + t + ']',
        v = '(?:\\ud83c[\\udde6-\\uddff]){2}',
        d = '[\\ud800-\\udbff][\\udc00-\\udfff]',
        m = '\\u200d',
        p = s + '?',
        x = '[' + o + ']?',
        g = '(?:' + m + '(?:' + [f, v, d].join('|') + ')' + x + p + ')*',
        h = x + p + g,
        E = '(?:' + [f + u + '?', u, v, d, i].join('|') + ')',
        Z = RegExp(l + '(?=' + l + ')|' + E + h, 'g');
      function C(e) {
        return e.match(Z) || [];
      }
      e.exports = C;
    },
    11726: function (e, t, n) {
      var r = n(78302),
        a = n(88016),
        c = n(40554),
        o = n(79833);
      function i(e, t, n) {
        (e = o(e)), (t = c(t));
        var i = t ? a(e) : 0;
        return t && i < t ? e + r(t - i, n) : e;
      }
      e.exports = i;
    },
    32475: function (e, t, n) {
      var r = n(78302),
        a = n(88016),
        c = n(40554),
        o = n(79833);
      function i(e, t, n) {
        (e = o(e)), (t = c(t));
        var i = t ? a(e) : 0;
        return t && i < t ? r(t - i, n) + e : e;
      }
      e.exports = i;
    },
    18601: function (e, t, n) {
      var r = n(14841),
        a = 1 / 0,
        c = 17976931348623157e292;
      function o(e) {
        if (!e) return 0 === e ? e : 0;
        if (((e = r(e)), e === a || e === -a)) {
          var t = e < 0 ? -1 : 1;
          return t * c;
        }
        return e === e ? e : 0;
      }
      e.exports = o;
    },
    40554: function (e, t, n) {
      var r = n(18601);
      function a(e) {
        var t = r(e),
          n = t % 1;
        return t === t ? (n ? t - n : t) : 0;
      }
      e.exports = a;
    },
  },
]);
