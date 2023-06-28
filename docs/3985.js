(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3985, 1535],
  {
    98220: function (n, a, e) {
      'use strict';
      e.r(a);
      var r = e(91896),
        l = e(12924),
        t = e.n(l),
        o = e(64188),
        c = {
          time: '2023-01-21',
          range: '2022-01-01,2023-12-30',
          width: 300,
          color: 'rgba(0,0,0,1)',
          selectedColor: 'rgba(22,40,212,1)',
          fullscreen: !1,
          round: 10,
        };
      a['default'] = () =>
        t().createElement(o.default, (0, r.Z)({ isTpl: !1 }, c));
    },
    64188: function (n, a, e) {
      'use strict';
      e.r(a);
      e(31903);
      var r,
        l = e(22832),
        t = (e(12968), e(6122)),
        o = e(2824),
        c = e(93224),
        d = e(20310),
        g = e(12924),
        i = e.n(g),
        s = e(12788),
        _ = e(32528),
        u = e.n(_),
        b = e(78138),
        p = e.n(b),
        f = ['isTpl'],
        m = s.ZP.div(
          r ||
            (r = (0, d.Z)([
              '\n  position: relative;\n  // height: 100%;\n  overflow: hidden;\n  background-color: #fff;\n  :global(.za-calendar__month) {\n    color: var(--color) !important;\n  }\n  :global(.za-calendar__day--today .za-calendar__day__content) {\n    color: var(--selectColor);\n    background-color: rgba(255, 255, 255, 0.3);\n  }\n  :global(.za-calendar__day--selected .za-calendar__day__content) {\n    background-color: var(--selectColor) !important;\n  }\n  :global(.za-calendar__day--range .za-calendar__day__content),\n  :global(.za-calendar__day--range),\n  :global(.za-calendar__day--selected .za-calendar__day__content) {\n    background-color: var(--selectBgColor) !important;\n    background-image: linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0) 0,\n      rgba(0, 0, 0, 0) 50%,\n      var(--selectBgColor) 0\n    ) !important;\n  }\n  :global(.za-calendar__day--range) {\n    color: rgba(255, 255, 255, 0.7) !important;\n    :global(.za-calendar__day__content) {\n      color: rgba(255, 255, 255, 0.7) !important;\n    }\n  }\n  :global(.za-calendar__day.range-start),\n  :global(.za-calendar__day.range-end) {\n    :global(.za-calendar__day__content) {\n      color: rgba(255, 255, 255, 1) !important;\n    }\n  }\n  :global(\n      .za-calendar__day.range-start:not(.range-end):not(.d6):not(:last-child)\n    ) {\n    background-image: linear-gradient(\n      90deg,\n      rgba(0, 0, 0, 0) 0,\n      rgba(0, 0, 0, 0) 50%,\n      var(--selectBgColor) 0\n    ) !important;\n  }\n  :global(\n      .za-calendar__day.range-end:not(.range-start):not(.d7):not(:first-child)\n    ) {\n    background-image: linear-gradient(\n      -90deg,\n      rgba(0, 0, 0, 0) 0,\n      rgba(0, 0, 0, 0) 50%,\n      var(--selectBgColor) 0\n    ) !important;\n  }\n',
            ])),
        ),
        y = (n) => {
          var a = n.isTpl,
            e = (0, c.Z)(n, f),
            r = e.time,
            d = e.range,
            s = e.color,
            _ = e.fullscreen,
            b = e.selectedColor,
            y = e.round,
            v = e.width,
            z = (0, g.useState)(() => p()(r)),
            h = (0, o.Z)(z, 2),
            C = h[0],
            k = h[1],
            w = (0, g.useState)(),
            E = (0, o.Z)(w, 2),
            Z = E[0],
            x = E[1],
            B = (0, g.useRef)(null);
          (0, g.useEffect)(() => {
            var n = d.split(','),
              a = p()(n[0]),
              e = p()(n[1]);
            x([a, e]);
          }, [d]),
            (0, g.useEffect)(() => {
              B.current &&
                (B.current.style.setProperty('--color', s),
                B.current.style.setProperty('--selectColor', b),
                B.current.style.setProperty('--selectBgColor', b));
            }, []);
          var P = window.location.pathname.indexOf('editor') > -1;
          return i().createElement(
            i().Fragment,
            null,
            a &&
              i().createElement(
                'div',
                null,
                i().createElement(t.Z, { preview: !1, src: u(), alt: '' }),
              ),
            !a &&
              i().createElement(
                m,
                {
                  style: {
                    pointerEvents: P ? 'none' : 'initial',
                    width: 0 === v ? '100%' : v + 'px',
                    border: '1px solid #f0f0f0',
                    borderRadius: y + 'px',
                  },
                  ref: B,
                },
                i().createElement(l.Z, {
                  value: C,
                  validRange: Z,
                  fullscreen: _,
                  onChange: (n) => {
                    k(n);
                  },
                }),
              ),
          );
        };
      a['default'] = (0, g.memo)(y);
    },
    32528: function (n, a, e) {
      n.exports = e.p + 'static/calend.2ecbca3d.png';
    },
  },
]);
