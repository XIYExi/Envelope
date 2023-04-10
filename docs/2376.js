(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [2376],
  {
    92376: function (e, t, n) {
      'use strict';
      n.r(t);
      n(12968);
      var l = n(6122),
        r = n(93224),
        s = n(12924),
        c = n.n(s),
        a = n(88330),
        p = n(72624),
        i = n.n(p),
        o = ['isTpl'],
        u = (e) => {
          var t = e.isTpl,
            n = (0, r.Z)(e, o),
            s = n.poster,
            p = n.url;
          return c().createElement(
            c().Fragment,
            null,
            t &&
              c().createElement(
                'div',
                null,
                c().createElement(l.Z, { src: i(), alt: '', preview: !1 }),
              ),
            !t &&
              c().createElement(
                'div',
                null,
                c().createElement(
                  a.J5,
                  {
                    playsInline: !0,
                    poster: s[0].url,
                    src:
                      p ||
                      'https://gossv.vcg.com/cmsUploadVideo/creative/1\u79fb\u8f74/7\u6708\u79fb\u8f74.mp4',
                  },
                  c().createElement(a.sT, { position: 'center' }),
                ),
              ),
          );
        };
      t['default'] = (0, s.memo)(u);
    },
    72624: function (e, t, n) {
      e.exports = n.p + 'static/video.33b88ab5.png';
    },
  },
]);
