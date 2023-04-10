(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9396],
  {
    70347: function () {},
    18067: function () {},
    91894: function (e, t, a) {
      'use strict';
      a.d(t, {
        Z: function () {
          return N;
        },
      });
      var n = a(96156),
        c = a(22122),
        r = a(94184),
        l = a.n(r),
        i = a(98423),
        o = a(12924),
        s = a(53124),
        u = a(97647),
        v = a(19586),
        m = a(86629),
        d = function (e, t) {
          var a = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (a[n] = e[n]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var c = 0;
            for (n = Object.getOwnPropertySymbols(e); c < n.length; c++)
              t.indexOf(n[c]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, n[c]) &&
                (a[n[c]] = e[n[c]]);
          }
          return a;
        },
        f = function (e) {
          var t = e.prefixCls,
            a = e.className,
            r = e.hoverable,
            i = void 0 === r || r,
            u = d(e, ['prefixCls', 'className', 'hoverable']);
          return o.createElement(s.C, null, function (e) {
            var r = e.getPrefixCls,
              s = r('card', t),
              v = l()(
                ''.concat(s, '-grid'),
                a,
                (0, n.Z)({}, ''.concat(s, '-grid-hoverable'), i),
              );
            return o.createElement('div', (0, c.Z)({}, u, { className: v }));
          });
        },
        p = f,
        y = function (e, t) {
          var a = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (a[n] = e[n]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var c = 0;
            for (n = Object.getOwnPropertySymbols(e); c < n.length; c++)
              t.indexOf(n[c]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, n[c]) &&
                (a[n[c]] = e[n[c]]);
          }
          return a;
        };
      function b(e) {
        var t = e.map(function (t, a) {
          return o.createElement(
            'li',
            {
              style: { width: ''.concat(100 / e.length, '%') },
              key: 'action-'.concat(a),
            },
            o.createElement('span', null, t),
          );
        });
        return t;
      }
      var h = o.forwardRef(function (e, t) {
          var a,
            r,
            d,
            f = o.useContext(s.E_),
            h = f.getPrefixCls,
            Z = f.direction,
            E = o.useContext(u.Z),
            x = function (t) {
              var a;
              null === (a = e.onTabChange) || void 0 === a || a.call(e, t);
            },
            g = function () {
              var t;
              return (
                o.Children.forEach(e.children, function (e) {
                  e && e.type && e.type === p && (t = !0);
                }),
                t
              );
            },
            C = e.prefixCls,
            N = e.className,
            w = e.extra,
            O = e.headStyle,
            P = void 0 === O ? {} : O,
            k = e.bodyStyle,
            z = void 0 === k ? {} : k,
            j = e.title,
            q = e.loading,
            S = e.bordered,
            A = void 0 === S || S,
            _ = e.size,
            K = e.type,
            M = e.cover,
            T = e.actions,
            B = e.tabList,
            I = e.children,
            L = e.activeTabKey,
            G = e.defaultActiveTabKey,
            H = e.tabBarExtraContent,
            R = e.hoverable,
            D = e.tabProps,
            F = void 0 === D ? {} : D,
            J = y(e, [
              'prefixCls',
              'className',
              'extra',
              'headStyle',
              'bodyStyle',
              'title',
              'loading',
              'bordered',
              'size',
              'type',
              'cover',
              'actions',
              'tabList',
              'children',
              'activeTabKey',
              'defaultActiveTabKey',
              'tabBarExtraContent',
              'hoverable',
              'tabProps',
            ]),
            Q = h('card', C),
            U = o.createElement(
              v.Z,
              { loading: !0, active: !0, paragraph: { rows: 4 }, title: !1 },
              I,
            ),
            V = void 0 !== L,
            W = (0, c.Z)(
              (0, c.Z)({}, F),
              ((a = {}),
              (0, n.Z)(a, V ? 'activeKey' : 'defaultActiveKey', V ? L : G),
              (0, n.Z)(a, 'tabBarExtraContent', H),
              a),
            ),
            X =
              B && B.length
                ? o.createElement(
                    m.Z,
                    (0, c.Z)({ size: 'large' }, W, {
                      className: ''.concat(Q, '-head-tabs'),
                      onChange: x,
                      items: B.map(function (e) {
                        var t;
                        return {
                          label: e.tab,
                          key: e.key,
                          disabled:
                            null !== (t = e.disabled) && void 0 !== t && t,
                        };
                      }),
                    }),
                  )
                : null;
          (j || w || X) &&
            (d = o.createElement(
              'div',
              { className: ''.concat(Q, '-head'), style: P },
              o.createElement(
                'div',
                { className: ''.concat(Q, '-head-wrapper') },
                j &&
                  o.createElement(
                    'div',
                    { className: ''.concat(Q, '-head-title') },
                    j,
                  ),
                w &&
                  o.createElement(
                    'div',
                    { className: ''.concat(Q, '-extra') },
                    w,
                  ),
              ),
              X,
            ));
          var Y = M
              ? o.createElement('div', { className: ''.concat(Q, '-cover') }, M)
              : null,
            $ = o.createElement(
              'div',
              { className: ''.concat(Q, '-body'), style: z },
              q ? U : I,
            ),
            ee =
              T && T.length
                ? o.createElement(
                    'ul',
                    { className: ''.concat(Q, '-actions') },
                    b(T),
                  )
                : null,
            te = (0, i.Z)(J, ['onTabChange']),
            ae = _ || E,
            ne = l()(
              Q,
              ((r = {}),
              (0, n.Z)(r, ''.concat(Q, '-loading'), q),
              (0, n.Z)(r, ''.concat(Q, '-bordered'), A),
              (0, n.Z)(r, ''.concat(Q, '-hoverable'), R),
              (0, n.Z)(r, ''.concat(Q, '-contain-grid'), g()),
              (0, n.Z)(r, ''.concat(Q, '-contain-tabs'), B && B.length),
              (0, n.Z)(r, ''.concat(Q, '-').concat(ae), ae),
              (0, n.Z)(r, ''.concat(Q, '-type-').concat(K), !!K),
              (0, n.Z)(r, ''.concat(Q, '-rtl'), 'rtl' === Z),
              r),
              N,
            );
          return o.createElement(
            'div',
            (0, c.Z)({ ref: t }, te, { className: ne }),
            d,
            Y,
            $,
            ee,
          );
        }),
        Z = h,
        E = function (e, t) {
          var a = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (a[n] = e[n]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var c = 0;
            for (n = Object.getOwnPropertySymbols(e); c < n.length; c++)
              t.indexOf(n[c]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, n[c]) &&
                (a[n[c]] = e[n[c]]);
          }
          return a;
        },
        x = function (e) {
          return o.createElement(s.C, null, function (t) {
            var a = t.getPrefixCls,
              n = e.prefixCls,
              r = e.className,
              i = e.avatar,
              s = e.title,
              u = e.description,
              v = E(e, [
                'prefixCls',
                'className',
                'avatar',
                'title',
                'description',
              ]),
              m = a('card', n),
              d = l()(''.concat(m, '-meta'), r),
              f = i
                ? o.createElement(
                    'div',
                    { className: ''.concat(m, '-meta-avatar') },
                    i,
                  )
                : null,
              p = s
                ? o.createElement(
                    'div',
                    { className: ''.concat(m, '-meta-title') },
                    s,
                  )
                : null,
              y = u
                ? o.createElement(
                    'div',
                    { className: ''.concat(m, '-meta-description') },
                    u,
                  )
                : null,
              b =
                p || y
                  ? o.createElement(
                      'div',
                      { className: ''.concat(m, '-meta-detail') },
                      p,
                      y,
                    )
                  : null;
            return o.createElement(
              'div',
              (0, c.Z)({}, v, { className: d }),
              f,
              b,
            );
          });
        },
        g = x,
        C = Z;
      (C.Grid = p), (C.Meta = g);
      var N = C;
    },
    58024: function (e, t, a) {
      'use strict';
      a(38663), a(70347), a(18446), a(18106);
    },
    19586: function (e, t, a) {
      'use strict';
      a.d(t, {
        Z: function () {
          return M;
        },
      });
      var n = a(96156),
        c = a(22122),
        r = a(90484),
        l = a(94184),
        i = a.n(l),
        o = a(12924),
        s = a(53124),
        u = a(98423),
        v = function (e) {
          var t,
            a,
            r = e.prefixCls,
            l = e.className,
            s = e.style,
            u = e.size,
            v = e.shape,
            m = i()(
              ((t = {}),
              (0, n.Z)(t, ''.concat(r, '-lg'), 'large' === u),
              (0, n.Z)(t, ''.concat(r, '-sm'), 'small' === u),
              t),
            ),
            d = i()(
              ((a = {}),
              (0, n.Z)(a, ''.concat(r, '-circle'), 'circle' === v),
              (0, n.Z)(a, ''.concat(r, '-square'), 'square' === v),
              (0, n.Z)(a, ''.concat(r, '-round'), 'round' === v),
              a),
            ),
            f = o.useMemo(
              function () {
                return 'number' === typeof u
                  ? { width: u, height: u, lineHeight: ''.concat(u, 'px') }
                  : {};
              },
              [u],
            );
          return o.createElement('span', {
            className: i()(r, m, d, l),
            style: (0, c.Z)((0, c.Z)({}, f), s),
          });
        },
        m = v,
        d = function (e) {
          var t = e.prefixCls,
            a = e.className,
            r = e.active,
            l = e.shape,
            v = void 0 === l ? 'circle' : l,
            d = e.size,
            f = void 0 === d ? 'default' : d,
            p = o.useContext(s.E_),
            y = p.getPrefixCls,
            b = y('skeleton', t),
            h = (0, u.Z)(e, ['prefixCls', 'className']),
            Z = i()(
              b,
              ''.concat(b, '-element'),
              (0, n.Z)({}, ''.concat(b, '-active'), r),
              a,
            );
          return o.createElement(
            'div',
            { className: Z },
            o.createElement(
              m,
              (0, c.Z)(
                { prefixCls: ''.concat(b, '-avatar'), shape: v, size: f },
                h,
              ),
            ),
          );
        },
        f = d,
        p = function (e) {
          var t,
            a = e.prefixCls,
            r = e.className,
            l = e.active,
            v = e.block,
            d = void 0 !== v && v,
            f = e.size,
            p = void 0 === f ? 'default' : f,
            y = o.useContext(s.E_),
            b = y.getPrefixCls,
            h = b('skeleton', a),
            Z = (0, u.Z)(e, ['prefixCls']),
            E = i()(
              h,
              ''.concat(h, '-element'),
              ((t = {}),
              (0, n.Z)(t, ''.concat(h, '-active'), l),
              (0, n.Z)(t, ''.concat(h, '-block'), d),
              t),
              r,
            );
          return o.createElement(
            'div',
            { className: E },
            o.createElement(
              m,
              (0, c.Z)({ prefixCls: ''.concat(h, '-button'), size: p }, Z),
            ),
          );
        },
        y = p,
        b = a(93181),
        h = function (e) {
          var t = e.prefixCls,
            a = e.className,
            c = e.style,
            r = e.active,
            l = e.children,
            u = o.useContext(s.E_),
            v = u.getPrefixCls,
            m = v('skeleton', t),
            d = i()(
              m,
              ''.concat(m, '-element'),
              (0, n.Z)({}, ''.concat(m, '-active'), r),
              a,
            ),
            f = null !== l && void 0 !== l ? l : o.createElement(b.Z, null);
          return o.createElement(
            'div',
            { className: d },
            o.createElement(
              'div',
              { className: i()(''.concat(m, '-image'), a), style: c },
              f,
            ),
          );
        },
        Z = h,
        E =
          'M365.714286 329.142857q0 45.714286-32.036571 77.677714t-77.677714 32.036571-77.677714-32.036571-32.036571-77.677714 32.036571-77.677714 77.677714-32.036571 77.677714 32.036571 32.036571 77.677714zM950.857143 548.571429l0 256-804.571429 0 0-109.714286 182.857143-182.857143 91.428571 91.428571 292.571429-292.571429zM1005.714286 146.285714l-914.285714 0q-7.460571 0-12.873143 5.412571t-5.412571 12.873143l0 694.857143q0 7.460571 5.412571 12.873143t12.873143 5.412571l914.285714 0q7.460571 0 12.873143-5.412571t5.412571-12.873143l0-694.857143q0-7.460571-5.412571-12.873143t-12.873143-5.412571zM1097.142857 164.571429l0 694.857143q0 37.741714-26.843429 64.585143t-64.585143 26.843429l-914.285714 0q-37.741714 0-64.585143-26.843429t-26.843429-64.585143l0-694.857143q0-37.741714 26.843429-64.585143t64.585143-26.843429l914.285714 0q37.741714 0 64.585143 26.843429t26.843429 64.585143z',
        x = function (e) {
          var t = e.prefixCls,
            a = e.className,
            c = e.style,
            r = e.active,
            l = o.useContext(s.E_),
            u = l.getPrefixCls,
            v = u('skeleton', t),
            m = i()(
              v,
              ''.concat(v, '-element'),
              (0, n.Z)({}, ''.concat(v, '-active'), r),
              a,
            );
          return o.createElement(
            'div',
            { className: m },
            o.createElement(
              'div',
              { className: i()(''.concat(v, '-image'), a), style: c },
              o.createElement(
                'svg',
                {
                  viewBox: '0 0 1098 1024',
                  xmlns: 'http://www.w3.org/2000/svg',
                  className: ''.concat(v, '-image-svg'),
                },
                o.createElement('path', {
                  d: E,
                  className: ''.concat(v, '-image-path'),
                }),
              ),
            ),
          );
        },
        g = x,
        C = function (e) {
          var t,
            a = e.prefixCls,
            r = e.className,
            l = e.active,
            v = e.block,
            d = e.size,
            f = void 0 === d ? 'default' : d,
            p = o.useContext(s.E_),
            y = p.getPrefixCls,
            b = y('skeleton', a),
            h = (0, u.Z)(e, ['prefixCls']),
            Z = i()(
              b,
              ''.concat(b, '-element'),
              ((t = {}),
              (0, n.Z)(t, ''.concat(b, '-active'), l),
              (0, n.Z)(t, ''.concat(b, '-block'), v),
              t),
              r,
            );
          return o.createElement(
            'div',
            { className: Z },
            o.createElement(
              m,
              (0, c.Z)({ prefixCls: ''.concat(b, '-input'), size: f }, h),
            ),
          );
        },
        N = C,
        w = a(85061),
        O = function (e) {
          var t = function (t) {
              var a = e.width,
                n = e.rows,
                c = void 0 === n ? 2 : n;
              return Array.isArray(a) ? a[t] : c - 1 === t ? a : void 0;
            },
            a = e.prefixCls,
            n = e.className,
            c = e.style,
            r = e.rows,
            l = (0, w.Z)(Array(r)).map(function (e, a) {
              return o.createElement('li', { key: a, style: { width: t(a) } });
            });
          return o.createElement('ul', { className: i()(a, n), style: c }, l);
        },
        P = O,
        k = function (e) {
          var t = e.prefixCls,
            a = e.className,
            n = e.width,
            r = e.style;
          return o.createElement('h3', {
            className: i()(t, a),
            style: (0, c.Z)({ width: n }, r),
          });
        },
        z = k;
      function j(e) {
        return e && 'object' === (0, r.Z)(e) ? e : {};
      }
      function q(e, t) {
        return e && !t
          ? { size: 'large', shape: 'square' }
          : { size: 'large', shape: 'circle' };
      }
      function S(e, t) {
        return !e && t ? { width: '38%' } : e && t ? { width: '50%' } : {};
      }
      function A(e, t) {
        var a = {};
        return (e && t) || (a.width = '61%'), (a.rows = !e && t ? 3 : 2), a;
      }
      var _ = function (e) {
        var t = e.prefixCls,
          a = e.loading,
          r = e.className,
          l = e.style,
          u = e.children,
          v = e.avatar,
          d = void 0 !== v && v,
          f = e.title,
          p = void 0 === f || f,
          y = e.paragraph,
          b = void 0 === y || y,
          h = e.active,
          Z = e.round,
          E = o.useContext(s.E_),
          x = E.getPrefixCls,
          g = E.direction,
          C = x('skeleton', t);
        if (a || !('loading' in e)) {
          var N,
            w,
            O,
            k = !!d,
            _ = !!p,
            K = !!b;
          if (k) {
            var M = (0, c.Z)(
              (0, c.Z)({ prefixCls: ''.concat(C, '-avatar') }, q(_, K)),
              j(d),
            );
            w = o.createElement(
              'div',
              { className: ''.concat(C, '-header') },
              o.createElement(m, (0, c.Z)({}, M)),
            );
          }
          if (_ || K) {
            var T, B;
            if (_) {
              var I = (0, c.Z)(
                (0, c.Z)({ prefixCls: ''.concat(C, '-title') }, S(k, K)),
                j(p),
              );
              T = o.createElement(z, (0, c.Z)({}, I));
            }
            if (K) {
              var L = (0, c.Z)(
                (0, c.Z)({ prefixCls: ''.concat(C, '-paragraph') }, A(k, _)),
                j(b),
              );
              B = o.createElement(P, (0, c.Z)({}, L));
            }
            O = o.createElement(
              'div',
              { className: ''.concat(C, '-content') },
              T,
              B,
            );
          }
          var G = i()(
            C,
            ((N = {}),
            (0, n.Z)(N, ''.concat(C, '-with-avatar'), k),
            (0, n.Z)(N, ''.concat(C, '-active'), h),
            (0, n.Z)(N, ''.concat(C, '-rtl'), 'rtl' === g),
            (0, n.Z)(N, ''.concat(C, '-round'), Z),
            N),
            r,
          );
          return o.createElement('div', { className: G, style: l }, w, O);
        }
        return 'undefined' !== typeof u ? u : null;
      };
      (_.Button = y),
        (_.Avatar = f),
        (_.Input = N),
        (_.Image = g),
        (_.Node = Z);
      var K = _,
        M = K;
    },
    18446: function (e, t, a) {
      'use strict';
      a(38663), a(18067);
    },
  },
]);
