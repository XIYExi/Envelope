(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [946, 2376],
  {
    80946: function (e, t, n) {
      'use strict';
      n.r(t);
      var l = n(91896),
        r = n(12924),
        s = n.n(r),
        a = n(92376),
        c = {
          poster: [
            {
              uid: '001',
              name: 'image.png',
              status: 'done',
              url: 'http://49.234.61.19/uploads/1_1740c6fbcd9.png',
            },
          ],
          url: '',
        };
      t['default'] = () =>
        s().createElement(a.default, (0, l.Z)({ isTpl: !1 }, c));
    },
    92376: function (e, t, n) {
      'use strict';
      n.r(t);
      n(12968);
      var l = n(6122),
        r = n(93224),
        s = n(12924),
        a = n.n(s),
        c = n(88330),
        p = n(72624),
        u = n.n(p),
        i = ['isTpl'],
        o = (e) => {
          var t = e.isTpl,
            n = (0, r.Z)(e, i),
            s = n.poster,
            p = n.url;
          return a().createElement(
            a().Fragment,
            null,
            t &&
              a().createElement(
                'div',
                null,
                a().createElement(l.Z, { src: u(), alt: '', preview: !1 }),
              ),
            !t &&
              a().createElement(
                'div',
                null,
                a().createElement(
                  c.J5,
                  {
                    playsInline: !0,
                    poster: s[0].url,
                    src:
                      p ||
                      'https://gossv.vcg.com/cmsUploadVideo/creative/1\u79fb\u8f74/7\u6708\u79fb\u8f74.mp4',
                  },
                  a().createElement(c.sT, { position: 'center' }),
                ),
              ),
          );
        };
      t['default'] = (0, s.memo)(o);
    },
    72624: function (e, t, n) {
      e.exports = n.p + 'static/video.33b88ab5.png';
    },
  },
]);
