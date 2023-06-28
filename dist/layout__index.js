(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [2608],
  {
    33040: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return l;
        },
      });
      var r = n(28991),
        c = n(12924),
        i = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M512 128c-212.1 0-384 171.9-384 384v360c0 13.3 10.7 24 24 24h184c35.3 0 64-28.7 64-64V624c0-35.3-28.7-64-64-64H200v-48c0-172.3 139.7-312 312-312s312 139.7 312 312v48H688c-35.3 0-64 28.7-64 64v208c0 35.3 28.7 64 64 64h184c13.3 0 24-10.7 24-24V512c0-212.1-171.9-384-384-384zM328 632v192H200V632h128zm496 192H696V632h128v192z',
                },
              },
            ],
          },
          name: 'customer-service',
          theme: 'outlined',
        },
        o = i,
        a = n(13401),
        u = function (e, t) {
          return c.createElement(
            a.Z,
            (0, r.Z)((0, r.Z)({}, e), {}, { ref: t, icon: o }),
          );
        };
      u.displayName = 'CustomerServiceOutlined';
      var l = c.forwardRef(u);
    },
    60674: function () {},
    36404: function (e) {
      e.exports = {
        dragPay: 'dragPay___7nb7P',
        crouseBtn: 'crouseBtn___2EAeE',
        mask: 'mask___3FkXr',
        toShake: 'toShake___32M5a',
      };
    },
    9683: function () {},
    14777: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          ctx: function () {
            return m;
          },
          default: function () {
            return v;
          },
        });
      n(57663);
      var r = n(71577),
        c = n(2824),
        i = n(12924),
        o = n.n(i),
        a = n(33040),
        u = n(61193),
        l = n.n(u),
        s = n(36404),
        f = n.n(s),
        m = (n(60674), (0, i.createContext)(!1));
      function v(e) {
        var t = e.children,
          n = (0, i.useState)(!1),
          u = (0, c.Z)(n, 2),
          s = u[0],
          v = u[1],
          d = (0, i.useState)(!1),
          p = (0, c.Z)(d, 2),
          h = p[0],
          y = p[1];
        (0, i.useEffect)(() => {
          setTimeout(() => {
            y(!0);
          }, 5e3);
        }, []);
        var g =
          window.location.pathname.indexOf('preview') < 0
            ? { height: '100%' }
            : { height: '100%', overflow: 'auto' };
        return o().createElement(
          'div',
          { style: g },
          o().createElement(
            'div',
            {
              style: {
                position: 'fixed',
                right: ''.concat(s ? '-100%' : '10px'),
                bottom: '16px',
                transition: 'all 0.5s ease-in-out',
                zIndex: 2,
              },
            },
            o().createElement(
              r.Z,
              {
                type: 'primary',
                style: { padding: '0 6px' },
                onClick: () => v(!s),
              },
              o().createElement(a.Z, null),
            ),
          ),
          o().createElement(m.Provider, { value: h }, t),
          window.location.pathname.indexOf('editor') > -1 &&
            o().createElement(
              l(),
              null,
              o().createElement(
                'div',
                { className: f().dragPay },
                o().createElement(
                  'div',
                  { className: f().crouseBtn },
                  '\u642d\u5efa\u6280\u5de7(\u53ef\u62d6\u52a8)',
                ),
                o().createElement('div', { className: f().mask }),
              ),
            ),
        );
      }
    },
    96159: function (e, t, n) {
      'use strict';
      n.d(t, {
        l$: function () {
          return c;
        },
        M2: function () {
          return i;
        },
        wm: function () {
          return o;
        },
        Tm: function () {
          return a;
        },
      });
      var r = n(12924),
        c = r.isValidElement;
      function i(e) {
        return e && c(e) && e.type === r.Fragment;
      }
      function o(e, t, n) {
        return c(e)
          ? r.cloneElement(e, 'function' === typeof n ? n(e.props || {}) : n)
          : t;
      }
      function a(e, t) {
        return o(e, e, t);
      }
    },
    93355: function (e, t, n) {
      'use strict';
      n.d(t, {
        b: function () {
          return r;
        },
        a: function () {
          return c;
        },
      });
      var r = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return t;
        },
        c = function () {
          for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n];
          return t;
        };
    },
    57663: function (e, t, n) {
      'use strict';
      n(38663), n(9683);
    },
    4173: function (e, t, n) {
      'use strict';
      n.d(t, {
        ri: function () {
          return m;
        },
        BR: function () {
          return v;
        },
      });
      var r = n(22122),
        c = n(96156),
        i = n(94184),
        o = n.n(i),
        a = n(50344),
        u = n(12924),
        l = n(53124),
        s = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var c = 0;
            for (r = Object.getOwnPropertySymbols(e); c < r.length; c++)
              t.indexOf(r[c]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[c]) &&
                (n[r[c]] = e[r[c]]);
          }
          return n;
        },
        f = u.createContext(null),
        m = function (e, t) {
          var n = u.useContext(f),
            r = u.useMemo(
              function () {
                var r;
                if (!n) return '';
                var i = n.compactDirection,
                  a = n.isFirstItem,
                  u = n.isLastItem,
                  l = 'vertical' === i ? '-vertical-' : '-';
                return o()(
                  ((r = {}),
                  (0, c.Z)(r, ''.concat(e, '-compact').concat(l, 'item'), !0),
                  (0, c.Z)(
                    r,
                    ''.concat(e, '-compact').concat(l, 'first-item'),
                    a,
                  ),
                  (0, c.Z)(
                    r,
                    ''.concat(e, '-compact').concat(l, 'last-item'),
                    u,
                  ),
                  (0, c.Z)(
                    r,
                    ''.concat(e, '-compact').concat(l, 'item-rtl'),
                    'rtl' === t,
                  ),
                  r),
                );
              },
              [e, t, n],
            );
          return {
            compactSize: null === n || void 0 === n ? void 0 : n.compactSize,
            compactDirection:
              null === n || void 0 === n ? void 0 : n.compactDirection,
            compactItemClassnames: r,
          };
        },
        v = function (e) {
          var t = e.children;
          return u.createElement(f.Provider, { value: null }, t);
        },
        d = function (e) {
          var t = e.children,
            n = s(e, ['children']);
          return u.createElement(f.Provider, { value: n }, t);
        },
        p = function (e) {
          var t,
            n = u.useContext(l.E_),
            i = n.getPrefixCls,
            m = n.direction,
            v = e.size,
            p = void 0 === v ? 'middle' : v,
            h = e.direction,
            y = e.block,
            g = e.prefixCls,
            E = e.className,
            x = e.children,
            Z = s(e, [
              'size',
              'direction',
              'block',
              'prefixCls',
              'className',
              'children',
            ]),
            b = i('space-compact', g),
            k = o()(
              b,
              ((t = {}),
              (0, c.Z)(t, ''.concat(b, '-rtl'), 'rtl' === m),
              (0, c.Z)(t, ''.concat(b, '-block'), y),
              (0, c.Z)(t, ''.concat(b, '-vertical'), 'vertical' === h),
              t),
              E,
            ),
            w = u.useContext(f),
            C = (0, a.Z)(x),
            _ = u.useMemo(
              function () {
                return C.map(function (e, t) {
                  var n = (e && e.key) || ''.concat(b, '-item-').concat(t);
                  return u.createElement(
                    d,
                    {
                      key: n,
                      compactSize: p,
                      compactDirection: h,
                      isFirstItem:
                        0 === t &&
                        (!w ||
                          (null === w || void 0 === w
                            ? void 0
                            : w.isFirstItem)),
                      isLastItem:
                        t === C.length - 1 &&
                        (!w ||
                          (null === w || void 0 === w ? void 0 : w.isLastItem)),
                    },
                    e,
                  );
                });
              },
              [p, C, w],
            );
          return 0 === C.length
            ? null
            : u.createElement('div', (0, r.Z)({ className: k }, Z), _);
        };
      t['ZP'] = p;
    },
    86010: function (e, t, n) {
      'use strict';
      function r(e) {
        var t,
          n,
          c = '';
        if ('string' == typeof e || 'number' == typeof e) c += e;
        else if ('object' == typeof e)
          if (Array.isArray(e))
            for (t = 0; t < e.length; t++)
              e[t] && (n = r(e[t])) && (c && (c += ' '), (c += n));
          else for (t in e) e[t] && (c && (c += ' '), (c += t));
        return c;
      }
      function c() {
        for (var e, t, n = 0, c = ''; n < arguments.length; )
          (e = arguments[n++]) && (t = r(e)) && (c && (c += ' '), (c += t));
        return c;
      }
      n.r(t),
        n.d(t, {
          clsx: function () {
            return c;
          },
        }),
        (t['default'] = c);
    },
    98423: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return c;
        },
      });
      var r = n(28991);
      function c(e, t) {
        var n = (0, r.Z)({}, e);
        return (
          Array.isArray(t) &&
            t.forEach(function (e) {
              delete n[e];
            }),
          n
        );
      }
    },
  },
]);
