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
      var a = n(28991),
        r = n(12924),
        c = {
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
        i = c,
        o = n(13401),
        s = function (e, t) {
          return r.createElement(
            o.Z,
            (0, a.Z)((0, a.Z)({}, e), {}, { ref: t, icon: i }),
          );
        };
      s.displayName = 'CustomerServiceOutlined';
      var l = r.forwardRef(s);
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
      var a = n(71577),
        r = n(57337),
        c = n(12924),
        i = n.n(c),
        o = n(33040),
        s = n(61193),
        l = n.n(s),
        u = n(36404),
        d = n.n(u),
        m = (n(60674), (0, c.createContext)(!1));
      function v(e) {
        var t = e.children,
          n = (0, c.useState)(!1),
          s = (0, r.Z)(n, 2),
          u = s[0],
          v = s[1],
          f = (0, c.useState)(!1),
          h = (0, r.Z)(f, 2),
          p = h[0],
          E = h[1];
        (0, c.useEffect)(() => {
          setTimeout(() => {
            E(!0);
          }, 5e3);
        }, []);
        var _ =
          window.location.pathname.indexOf('preview') < 0
            ? { height: '100%' }
            : { height: '100%', overflow: 'auto' };
        return i().createElement(
          'div',
          { style: _ },
          i().createElement(
            'div',
            {
              style: {
                position: 'fixed',
                right: ''.concat(u ? '-100%' : '10px'),
                bottom: '16px',
                transition: 'all 0.5s ease-in-out',
                zIndex: 2,
              },
            },
            i().createElement(
              a.Z,
              {
                type: 'primary',
                style: { padding: '0 6px' },
                onClick: () => v(!u),
              },
              i().createElement(o.Z, null),
            ),
          ),
          i().createElement(m.Provider, { value: p }, t),
          window.location.pathname.indexOf('editor') > -1 &&
            i().createElement(
              l(),
              null,
              i().createElement(
                'div',
                { className: d().dragPay },
                i().createElement(
                  'div',
                  { className: d().crouseBtn },
                  '\u642d\u5efa\u6280\u5de7(\u53ef\u62d6\u52a8)',
                ),
                i().createElement('div', { className: d().mask }),
              ),
            ),
        );
      }
    },
  },
]);
