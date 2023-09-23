(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8026, 3260],
  {
    8026: function (e, t, r) {
      'use strict';
      r.r(t);
      var o = r(91896),
        a = r(12924),
        n = r.n(a),
        s = r(93260),
        l = {
          text: '%',
          percent: 20,
          showInfo: !0,
          type: 'line',
          status: 'success',
          strokeColor: 'rgb(60,129,239)',
          strokeLinecap: 'round',
          trailColor: 'rgb(201,199,199)',
          steps: 0,
          strokeWidth: 6,
          circleWidth: 132,
          gapDegree: 75,
          gapPosition: 'bottom',
          dashboardWidth: 132,
        };
      t['default'] = () =>
        n().createElement(s.default, (0, o.Z)({ isTpl: !1 }, l));
    },
    93260: function (e, t, r) {
      'use strict';
      r.r(t);
      r(34669);
      var o = r(82833),
        a = (r(12968), r(6122)),
        n = r(93224),
        s = r(12924),
        l = r.n(s),
        c = r(1959),
        i = r.n(c),
        p = ['isTpl'],
        d = (e) => {
          var t = e.isTpl,
            r = (0, n.Z)(e, p),
            s = r.percent,
            c = r.text,
            d = r.showInfo,
            h = r.type,
            u = r.status,
            k = r.strokeColor,
            m = r.strokeLinecap,
            f = r.trailColor,
            g = r.steps,
            b = r.strokeWidth,
            C = r.circleWidth,
            v = r.gapDegree,
            w = r.gapPosition,
            E = r.dashboardWidth;
          return l().createElement(
            l().Fragment,
            null,
            t &&
              l().createElement(
                'div',
                null,
                l().createElement(a.Z, { preview: !1, src: i(), alt: '' }),
              ),
            !t &&
              'line' === h &&
              l().createElement(
                'div',
                null,
                l().createElement(o.Z, {
                  percent: s,
                  type: 'line',
                  format: (e) => ''.concat(e, ' ').concat(c),
                  showInfo: d,
                  status: u,
                  strokeLinecap: m,
                  strokeColor: k,
                  trailColor: f,
                  steps: g,
                  strokeWidth: b,
                }),
              ),
            !t &&
              'circle' === h &&
              l().createElement(
                'div',
                null,
                l().createElement(o.Z, {
                  percent: s,
                  type: 'circle',
                  format: (e) => ''.concat(e, ' ').concat(c),
                  showInfo: d,
                  strokeLinecap: m,
                  strokeColor: k,
                  trailColor: f,
                  strokeWidth: b,
                  width: C,
                }),
              ),
            !t &&
              'dashboard' === h &&
              l().createElement(
                'div',
                null,
                l().createElement(o.Z, {
                  percent: s,
                  type: 'dashboard',
                  format: (e) => ''.concat(e, ' ').concat(c),
                  showInfo: d,
                  strokeLinecap: m,
                  strokeColor: k,
                  trailColor: f,
                  strokeWidth: b,
                  gapDegree: v,
                  gapPosition: w,
                  width: E,
                }),
              ),
          );
        };
      t['default'] = (0, s.memo)(d);
    },
    1959: function (e, t, r) {
      e.exports = r.p + 'static/Progress.abbc69b1.svg';
    },
  },
]);
