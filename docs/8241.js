(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8241],
  {
    38241: function (e, t, n) {
      'use strict';
      n.r(t);
      n(12968);
      var a,
        i,
        l,
        r = n(6122),
        s = n(57337),
        o = n(93224),
        c = n(20310),
        d = n(12924),
        b = n.n(d),
        u = n(12788),
        p = n(28716),
        h = n.n(p),
        m = ['isTpl'],
        g = u.ZP.div(
          a ||
            (a = (0, c.Z)([
              '\n  overflow: hidden;\n  position: absolute;\n  width: ',
              ';\n  height: ',
              ';\n  border-radius: ',
              ';\n  transform: ',
              ';\n',
            ])),
          (e) => e.$baseWidth + '%',
          (e) => e.$baseHeight + '%',
          (e) => e.$borderRadius,
          (e) =>
            'translate('
              .concat(e.$baseLeft, 'px,')
              .concat(e.$baseTop, 'px)\n      scale(')
              .concat(e.$baseScale / 100, ')\n      rotate(')
              .concat(e.$baseRotate, 'deg)'),
        ),
        v = u.ZP.div(
          i ||
            (i = (0, c.Z)([
              '\n  border-radius: ',
              ';\n  width: 100%;\n  text-align: center;\n  overflow: hidden;\n  position: relative;\n',
            ])),
          (e) => e.round,
        ),
        f = u.ZP.div(
          l ||
            (l = (0, c.Z)([
              '\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin-left: ',
              ';\n  margin-top: ',
              ';\n  text-align: ',
              ';\n',
            ])),
          (e) => e.translate && e.translate[0],
          (e) => e.translate && e.translate[1],
          (e) => e.$textAlign,
        ),
        $ = (e) => {
          e.isTpl;
          var t = (0, o.Z)(e, m),
            n = t.imgUrl,
            a = t.round,
            i = void 0 === a ? 0 : a,
            l = t.translate,
            c = t.align,
            u = t.titText,
            p = t.titFontSize,
            $ = t.titColor,
            E = t.titFontWeight,
            w = t.subTitText,
            T = t.subTitFontSize,
            Z = t.subTitColor,
            x = t.subTitFontWeight,
            y = (0, d.useState)(!1),
            S = (0, s.Z)(y, 2),
            W = S[0],
            k = S[1];
          return b().createElement(
            b().Fragment,
            null,
            e.isTpl &&
              b().createElement(
                'div',
                null,
                b().createElement('img', { src: h(), alt: '' }),
              ),
            !e.isTpl &&
              b().createElement(
                g,
                {
                  $baseWidth: e.baseWidth,
                  $baseHeight: e.baseHeight,
                  $borderRadius: e.baseRadius,
                  $baseLeft: e.baseLeft,
                  $baseRotate: e.baseLeft,
                  $baseScale: e.baseScale,
                  $baseTop: e.baseTop,
                },
                b().createElement(
                  v,
                  { round: i },
                  b().createElement(
                    f,
                    { $textAlign: c, $translate: l },
                    b().createElement(
                      'div',
                      { style: { fontSize: p, color: $, fontWeight: +E } },
                      u,
                    ),
                    b().createElement(
                      'div',
                      {
                        style: {
                          fontSize: T,
                          color: Z,
                          fontWeight: +x,
                          lineHeight: 2.6,
                        },
                      },
                      w,
                    ),
                  ),
                  n.length <= 1
                    ? b().createElement(r.Z, {
                        src: n && n[0].url,
                        alt: '',
                        style: { width: '100%' },
                      })
                    : b().createElement(
                        b().Fragment,
                        null,
                        b().createElement(r.Z, {
                          preview: { visible: !1 },
                          style: { width: '100%' },
                          src: n && n[0].url,
                          onClick: () => k(!0),
                        }),
                        b().createElement(
                          'div',
                          { style: { display: 'none' } },
                          b().createElement(
                            r.Z.PreviewGroup,
                            {
                              preview: {
                                visible: W,
                                onVisibleChange: (e) => k(e),
                              },
                            },
                            n.map((e, t) =>
                              b().createElement(r.Z, {
                                src: e.url,
                                key: t,
                                style: { width: '100%' },
                              }),
                            ),
                          ),
                        ),
                      ),
                ),
              ),
          );
        };
      t['default'] = (0, d.memo)($);
    },
    28716: function (e, t, n) {
      e.exports = n.p + 'static/img.d2dc592b.png';
    },
  },
]);
