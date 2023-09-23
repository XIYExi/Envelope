(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [552, 901],
  {
    26052: function (i, e, o) {
      'use strict';
      o.r(e);
      var t = o(91896),
        n = o(12924),
        a = o.n(n),
        l = o(82118),
        m = {
          direction: 'bottom',
          effect: 'scrollx',
          round: 0,
          autoPlay: !0,
          imgList: [
            {
              id: '1',
              title: '\u8da3\u8c08\u5c0f\u8bfe1',
              desc: '\u81f4\u529b\u4e8e\u6253\u9020\u4f18\u8d28\u5c0f\u8bfe\u7a0b',
              link: 'xxxxx',
              imgUrl: [
                {
                  uid: '001',
                  name: 'image.png',
                  status: 'done',
                  url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
                },
              ],
            },
            {
              id: '2',
              title: '\u8da3\u8c08\u5c0f\u8bfe1',
              desc: '\u81f4\u529b\u4e8e\u6253\u9020\u4f18\u8d28\u5c0f\u8bfe\u7a0b',
              link: 'xxxxx',
              imgUrl: [
                {
                  uid: '001',
                  name: 'image.png',
                  status: 'done',
                  url: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
                },
              ],
            },
          ],
          tplImg: 'http://h5.dooring.cn/uploads/1_1740bd7c3dc.png',
        };
      e['default'] = () =>
        a().createElement(l.default, (0, t.Z)({ isTpl: !1 }, m));
    },
    82118: function (i, e, o) {
      'use strict';
      o.r(e);
      o(38979);
      var t,
        n,
        a = o(59466),
        l = o(93224),
        m = o(20310),
        g = o(12924),
        d = o.n(g),
        r = o(12788),
        u = o(53909),
        c = o.n(u),
        I = ['isTpl'],
        p = r.ZP.div(
          t ||
            (t = (0, m.Z)([
              '\n  display: inline-block;\n  width: 100%;\n  max-height: 220px;\n  overflow: hidden;\n  vertical-align: top;\n  img {\n    width: 100%;\n  }\n',
            ])),
        ),
        s = r.ZP.div(
          n || (n = (0, m.Z)(['\n  width: 100%;\n  overflow: hidden;\n'])),
        ),
        A = (i) => {
          var e = i.isTpl,
            o = (0, l.Z)(i, I),
            t = o.direction,
            n = o.effect,
            m = o.autoPlay,
            g = o.imgList,
            r = o.round,
            u = () =>
              g.map((i, e) =>
                d().createElement(
                  p,
                  { key: +e, style: { borderRadius: r + 'px' } },
                  d().createElement(
                    'a',
                    null,
                    d().createElement('img', {
                      src: i.imgUrl.length > 0 ? i.imgUrl[0].url : '',
                      alt: '',
                    }),
                  ),
                ),
              );
          return d().createElement(
            s,
            null,
            e
              ? d().createElement(
                  p,
                  null,
                  d().createElement('img', { src: c(), alt: '?' }),
                )
              : d().createElement(
                  a.Z,
                  { dotPosition: t, effect: n, autoplay: m },
                  u(),
                ),
          );
        };
      e['default'] = (0, g.memo)(A);
    },
    53909: function (i) {
      i.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAYAAAARg3zAAAACLUlEQVR4Xu3WsYrUUBiG4XSbuQKxEO9JkERhwUpEBMHK2/AavA0LsbBQ0AULE5FZQWELRYsVtrCImYFZh6wsFuNh8+1z4CmSPyekeDmkqjbrzmG913QP66ZfLtp+gItu1epe0z84bXizFu3Ha3Xbv59ugDmom+5ddePT1T9BN/3b6UMwJ3XbPV/HPB7Z96dDmKWmb6vVcX1mADM0/lM/q8Z/55PpAOap+1advQnzJWiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSLoAvZf/RqGH8fD/l9m7Jag/6vvw8EwDEeHJ8ORoIsQdAlPjgVdiKBLEHQxgi5B0MUIugRBFyPoEgRdjKBLEHQxgiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiZKVbfdz+nNdLtYm3c9fvr1n21/w3R2nl3suwzqpjseT+ju9XSQbhdr865pROfZ/obp7Dy72HcZjIfzy6pu+rvTAcxR3fb71WqNF2+mQ5iTMeYX65hXq769vD7+f/TTh2AWmv6gurW8chr0et38vBgHj0ZfzmyAC2h1CO+1H+5tZ/wbRrH/a+5U6l0AAAAASUVORK5CYII=';
    },
  },
]);
