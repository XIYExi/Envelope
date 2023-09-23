(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8447, 567],
  {
    58447: function (e, t, n) {
      'use strict';
      n.r(t);
      var i = n(91896),
        a = n(12924),
        l = n.n(a),
        s = n(80567),
        r = {
          tabs: ['Tab 1', 'Tab 2'],
          centered: !1,
          size: 'middle',
          tabBarGutter: 30,
          tabPosition: 'top',
          destroyInactiveTabPane: !1,
          type: 'line',
          hideAdd: !1,
          sourceData: [
            {
              id: '1',
              title: 'Panel 1',
              desc: 'Panel Desc 1',
              link: 'xxxxx',
              type: 0,
              imgUrl: [
                {
                  uid: '001',
                  name: 'image.png',
                  status: 'done',
                  url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
                },
              ],
            },
            {
              id: '2',
              title: 'Panel 2',
              desc: 'Panel Desc 2',
              link: 'xxxxx',
              type: 0,
              imgUrl: [
                {
                  uid: '001',
                  name: 'image.png',
                  status: 'done',
                  url: 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
                },
              ],
            },
            {
              id: '3',
              title: 'Panel 3',
              desc: 'Panel Desc 3',
              link: 'xxxxx',
              type: 1,
              imgUrl: [
                {
                  uid: '001',
                  name: 'image.png',
                  status: 'done',
                  url: 'https://s1.ax1x.com/2023/01/15/pSQdf8U.png',
                },
              ],
              html: '<button>Button</button>',
            },
          ],
        };
      t['default'] = () =>
        l().createElement(s.default, (0, i.Z)({ isTpl: !1 }, r));
    },
    80567: function (e, t, n) {
      'use strict';
      n.r(t);
      n(18106);
      var i,
        a,
        l,
        s,
        r,
        d = n(86629),
        g = (n(12968), n(6122)),
        u = n(93224),
        c = n(20310),
        m = n(12924),
        x = n.n(m),
        p = n(16849),
        A = n.n(p),
        o = n(12788),
        Z = ['isTpl'],
        I = ['tabs', 'sourceData'],
        w = o.ZP.div(
          i ||
            (i = (0, c.Z)([
              '\n  padding-top: 16px;\n  padding-bottom: 16px;\n  position: relative;\n',
            ])),
        ),
        E = o.ZP.div(a || (a = (0, c.Z)(['\n  line-height: 2.4;\n']))),
        L = o.ZP.a(
          l ||
            (l = (0, c.Z)([
              '\n  display: inline-block;\n  width: 80%;\n  img {\n    border-radius: 6px;\n    width: 120px;\n    height: 120px;\n    object-fit: cover;\n  }\n',
            ])),
        ),
        k = o.ZP.div(
          s ||
            (s = (0, c.Z)([
              '\n  padding: 20px 20px 0;\n  width: 50%;\n  text-align: center;\n  justify-content: center;\n',
            ])),
        ),
        y = o.ZP.div(
          r || (r = (0, c.Z)(['\n  display: flex;\n  flex-wrap: wrap;\n'])),
        ),
        P = (e) => {
          var t = e.isTpl,
            n = (0, u.Z)(e, Z),
            i = n.tabs,
            a = void 0 === i ? ['\u5206\u7c7b\u4e00', '\u5206\u7c7b\u4e8c'] : i,
            l = n.sourceData,
            s = (0, u.Z)(n, I);
          return x().createElement(
            x().Fragment,
            null,
            t &&
              x().createElement(
                'div',
                null,
                x().createElement(g.Z, { src: A(), alt: '' }),
              ),
            !t &&
              x().createElement(
                w,
                null,
                x().createElement(
                  d.Z,
                  s,
                  a.map((e, t) =>
                    x().createElement(
                      d.Z.TabPane,
                      { tab: e, key: t },
                      x().createElement(
                        y,
                        null,
                        l
                          .filter((e) => e.type === t)
                          .map((e, t) =>
                            x().createElement(
                              x().Fragment,
                              { key: t },
                              e.imgUrl.length >= 1
                                ? x().createElement(
                                    k,
                                    { key: t },
                                    x().createElement(
                                      L,
                                      { href: e.link, title: e.desc },
                                      x().createElement(g.Z, {
                                        preview: !1,
                                        src: e.imgUrl[0]
                                          ? e.imgUrl[0].url
                                          : 'https://s1.ax1x.com/2023/01/15/pSQ7EKH.png',
                                        alt: e.title,
                                      }),
                                      x().createElement(E, null, e.title),
                                    ),
                                  )
                                : x().createElement('div', {
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
      t['default'] = (0, m.memo)(P);
    },
    16849: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
