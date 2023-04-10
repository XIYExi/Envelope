(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [567],
  {
    80567: function (e, t, n) {
      'use strict';
      n.r(t);
      n(18106);
      var i,
        a,
        l,
        r,
        A,
        s = n(86629),
        g = (n(12968), n(6122)),
        d = n(93224),
        c = n(20310),
        m = n(12924),
        u = n.n(m),
        Z = n(16849),
        w = n.n(Z),
        I = n(12788),
        p = ['isTpl'],
        o = ['tabs', 'sourceData'],
        x = I.ZP.div(
          i ||
            (i = (0, c.Z)([
              '\n  padding-top: 16px;\n  padding-bottom: 16px;\n  position: relative;\n',
            ])),
        ),
        L = I.ZP.div(a || (a = (0, c.Z)(['\n  line-height: 2.4;\n']))),
        E = I.ZP.a(
          l ||
            (l = (0, c.Z)([
              '\n  display: inline-block;\n  width: 80%;\n  img {\n    border-radius: 6px;\n    width: 120px;\n    height: 120px;\n    object-fit: cover;\n  }\n',
            ])),
        ),
        k = I.ZP.div(
          r ||
            (r = (0, c.Z)([
              '\n  padding: 20px 20px 0;\n  width: 50%;\n  text-align: center;\n  justify-content: center;\n',
            ])),
        ),
        B = I.ZP.div(
          A || (A = (0, c.Z)(['\n  display: flex;\n  flex-wrap: wrap;\n'])),
        ),
        N = (e) => {
          var t = e.isTpl,
            n = (0, d.Z)(e, p),
            i = n.tabs,
            a = void 0 === i ? ['\u5206\u7c7b\u4e00', '\u5206\u7c7b\u4e8c'] : i,
            l = n.sourceData,
            r = (0, d.Z)(n, o);
          return u().createElement(
            u().Fragment,
            null,
            t &&
              u().createElement(
                'div',
                null,
                u().createElement(g.Z, { src: w(), alt: '' }),
              ),
            !t &&
              u().createElement(
                x,
                null,
                u().createElement(
                  s.Z,
                  r,
                  a.map((e, t) =>
                    u().createElement(
                      s.Z.TabPane,
                      { tab: e, key: t },
                      u().createElement(
                        B,
                        null,
                        l
                          .filter((e) => e.type === t)
                          .map((e, t) =>
                            u().createElement(
                              u().Fragment,
                              { key: t },
                              e.imgUrl.length >= 1
                                ? u().createElement(
                                    k,
                                    { key: t },
                                    u().createElement(
                                      E,
                                      { href: e.link, title: e.desc },
                                      u().createElement(g.Z, {
                                        preview: !1,
                                        src: e.imgUrl[0]
                                          ? e.imgUrl[0].url
                                          : 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
                                        alt: e.title,
                                      }),
                                      u().createElement(L, null, e.title),
                                    ),
                                  )
                                : u().createElement('div', {
                                    key: t,
                                    dangerouslySetInnerHTML: {
                                      __html: e.html ? e.html : '<div></div>',
                                    },
                                  }),
                            ),
                          ),
                      ),
                    ),
                  ),
                ),
              ),
          );
        };
      t['default'] = (0, m.memo)(N);
    },
    16849: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
