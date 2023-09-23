(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [901],
  {
    82118: function (i, e, o) {
      'use strict';
      o.r(e);
      o(38979);
      var a,
        m,
        n = o(59466),
        t = o(93224),
        l = o(20310),
        g = o(12924),
        I = o.n(g),
        r = o(12788),
        A = o(53909),
        d = o.n(A),
        u = ['isTpl'],
        J = r.ZP.div(
          a ||
            (a = (0, l.Z)([
              '\n  display: inline-block;\n  width: 100%;\n  max-height: 220px;\n  overflow: hidden;\n  vertical-align: top;\n  img {\n    width: 100%;\n  }\n',
            ])),
        ),
        C = r.ZP.div(
          m || (m = (0, l.Z)(['\n  width: 100%;\n  overflow: hidden;\n'])),
        ),
        K = (i) => {
          var e = i.isTpl,
            o = (0, t.Z)(i, u),
            a = o.direction,
            m = o.effect,
            l = o.autoPlay,
            g = o.imgList,
            r = o.round,
            A = () =>
              g.map((i, e) =>
                I().createElement(
                  J,
                  { key: +e, style: { borderRadius: r + 'px' } },
                  I().createElement(
                    'a',
                    null,
                    I().createElement('img', {
                      src: i.imgUrl.length > 0 ? i.imgUrl[0].url : '',
                      alt: '',
                    }),
                  ),
                ),
              );
          return I().createElement(
            C,
            null,
            e
              ? I().createElement(
                  J,
                  null,
                  I().createElement('img', { src: d(), alt: '?' }),
                )
              : I().createElement(
                  n.Z,
                  { dotPosition: a, effect: m, autoplay: l },
                  A(),
                ),
          );
        };
      e['default'] = (0, g.memo)(K);
    },
    53909: function (i) {
      i.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAABaCAYAAAARg3zAAAACLUlEQVR4Xu3WsYrUUBiG4XSbuQKxEO9JkERhwUpEBMHK2/AavA0LsbBQ0AULE5FZQWELRYsVtrCImYFZh6wsFuNh8+1z4CmSPyekeDmkqjbrzmG913QP66ZfLtp+gItu1epe0z84bXizFu3Ha3Xbv59ugDmom+5ddePT1T9BN/3b6UMwJ3XbPV/HPB7Z96dDmKWmb6vVcX1mADM0/lM/q8Z/55PpAOap+1advQnzJWiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSLoAvZf/RqGH8fD/l9m7Jag/6vvw8EwDEeHJ8ORoIsQdAlPjgVdiKBLEHQxgi5B0MUIugRBFyPoEgRdjKBLEHQxgiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiaKoIkiaKIImiiCJoqgiSJoogiaKIImiqCJImiiCJoogiZKVbfdz+nNdLtYm3c9fvr1n21/w3R2nl3suwzqpjseT+ju9XSQbhdr865pROfZ/obp7Dy72HcZjIfzy6pu+rvTAcxR3fb71WqNF2+mQ5iTMeYX65hXq769vD7+f/TTh2AWmv6gurW8chr0et38vBgHj0ZfzmyAC2h1CO+1H+5tZ/wbRrH/a+5U6l0AAAAASUVORK5CYII=';
    },
  },
]);
