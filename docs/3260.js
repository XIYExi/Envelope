(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3260],
  {
    93260: function (e, t, r) {
      'use strict';
      r.r(t);
      r(34669);
      var o = r(82833),
        n = (r(12968), r(6122)),
        a = r(93224),
        l = r(12924),
        c = r.n(l),
        s = r(1959),
        i = r.n(s),
        p = ['isTpl'],
        d = (e) => {
          var t = e.isTpl,
            r = (0, a.Z)(e, p),
            l = r.percent,
            s = r.text,
            d = r.showInfo,
            h = r.type,
            k = r.status,
            m = r.strokeColor,
            u = r.strokeLinecap,
            f = r.trailColor,
            v = r.steps,
            C = r.strokeWidth,
            g = r.circleWidth,
            w = r.gapDegree,
            E = r.gapPosition,
            b = r.dashboardWidth;
          return c().createElement(
            c().Fragment,
            null,
            t &&
              c().createElement(
                'div',
                null,
                c().createElement(n.Z, { preview: !1, src: i(), alt: '' }),
              ),
            !t &&
              'line' === h &&
              c().createElement(
                'div',
                null,
                c().createElement(o.Z, {
                  percent: l,
                  type: 'line',
                  format: (e) => ''.concat(e, ' ').concat(s),
                  showInfo: d,
                  status: k,
                  strokeLinecap: u,
                  strokeColor: m,
                  trailColor: f,
                  steps: v,
                  strokeWidth: C,
                }),
              ),
            !t &&
              'circle' === h &&
              c().createElement(
                'div',
                null,
                c().createElement(o.Z, {
                  percent: l,
                  type: 'circle',
                  format: (e) => ''.concat(e, ' ').concat(s),
                  showInfo: d,
                  strokeLinecap: u,
                  strokeColor: m,
                  trailColor: f,
                  strokeWidth: C,
                  width: g,
                }),
              ),
            !t &&
              'dashboard' === h &&
              c().createElement(
                'div',
                null,
                c().createElement(o.Z, {
                  percent: l,
                  type: 'dashboard',
                  format: (e) => ''.concat(e, ' ').concat(s),
                  showInfo: d,
                  strokeLinecap: u,
                  strokeColor: m,
                  trailColor: f,
                  strokeWidth: C,
                  gapDegree: w,
                  gapPosition: E,
                  width: b,
                }),
              ),
          );
        };
      t['default'] = (0, l.memo)(d);
    },
    1959: function (e, t, r) {
      e.exports = r.p + 'static/Progress.abbc69b1.svg';
    },
  },
]);
