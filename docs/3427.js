(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3427, 8241],
  {
    13427: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(91896),
        i = n(12924),
        l = n.n(i),
        s = n(38241),
        r = {
          translate: [0, 0],
          align: 'center',
          titText: '',
          titFontSize: 20,
          titColor: 'rgba(0,0,0,1)',
          titFontWeight: '400',
          subTitText: '',
          subTitFontSize: 16,
          subTitColor: 'rgba(0,0,0,1)',
          subTitFontWeight: '400',
          imgUrl: [
            {
              uid: '001',
              name: 'image.png',
              status: 'done',
              url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
            },
            {
              uid: '002',
              name: 'image.png2',
              status: 'done',
              url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
            },
            {
              uid: '003',
              name: 'image.png3',
              status: 'done',
              url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
            },
            {
              uid: '004',
              name: 'image.png4',
              status: 'done',
              url: 'http://49.234.61.19/uploads/bg_174e470dc22.png',
            },
          ],
          round: 0,
        };
      t['default'] = () =>
        l().createElement(s.default, (0, a.Z)({ isTpl: !1 }, r));
    },
    38241: function (e, t, n) {
      'use strict';
      n.r(t);
      n(12968);
      var a,
        i,
        l,
        s = n(6122),
        r = n(57337),
        o = n(93224),
        d = n(20310),
        u = n(12924),
        c = n.n(u),
        g = n(12788),
        b = n(28716),
        p = n.n(b),
        m = ['isTpl'],
        h = g.ZP.div(
          a ||
            (a = (0, d.Z)([
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
        f = g.ZP.div(
          i ||
            (i = (0, d.Z)([
              '\n  border-radius: ',
              ';\n  width: 100%;\n  text-align: center;\n  overflow: hidden;\n  position: relative;\n',
            ])),
          (e) => e.round,
        ),
        v = g.ZP.div(
          l ||
            (l = (0, d.Z)([
              '\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin-left: ',
              ';\n  margin-top: ',
              ';\n  text-align: ',
              ';\n',
            ])),
          (e) => e.translate && e.translate[0],
          (e) => e.translate && e.translate[1],
          (e) => e.$textAlign,
        ),
        T = (e) => {
          e.isTpl;
          var t = (0, o.Z)(e, m),
            n = t.imgUrl,
            a = t.round,
            i = void 0 === a ? 0 : a,
            l = t.translate,
            d = t.align,
            g = t.titText,
            b = t.titFontSize,
            T = t.titColor,
            $ = t.titFontWeight,
            E = t.subTitText,
            w = t.subTitFontSize,
            Z = t.subTitColor,
            x = t.subTitFontWeight,
            F = (0, u.useState)(!1),
            S = (0, r.Z)(F, 2),
            W = S[0],
            y = S[1];
          return c().createElement(
            c().Fragment,
            null,
            e.isTpl &&
              c().createElement(
                'div',
                null,
                c().createElement('img', { src: p(), alt: '' }),
              ),
            !e.isTpl &&
              c().createElement(
                h,
                {
                  $baseWidth: e.baseWidth,
                  $baseHeight: e.baseHeight,
                  $borderRadius: e.baseRadius,
                  $baseLeft: e.baseLeft,
                  $baseRotate: e.baseLeft,
                  $baseScale: e.baseScale,
                  $baseTop: e.baseTop,
                },
                c().createElement(
                  f,
                  { round: i },
                  c().createElement(
                    v,
                    { $textAlign: d, $translate: l },
                    c().createElement(
                      'div',
                      { style: { fontSize: b, color: T, fontWeight: +$ } },
                      g,
                    ),
                    c().createElement(
                      'div',
                      {
                        style: {
                          fontSize: w,
                          color: Z,
                          fontWeight: +x,
                          lineHeight: 2.6,
                        },
                      },
                      E,
                    ),
                  ),
                  n.length <= 1
                    ? c().createElement(s.Z, {
                        src: n && n[0].url,
                        alt: '',
                        style: { width: '100%' },
                      })
                    : c().createElement(
                        c().Fragment,
                        null,
                        c().createElement(s.Z, {
                          preview: { visible: !1 },
                          style: { width: '100%' },
                          src: n && n[0].url,
                          onClick: () => y(!0),
                        }),
                        c().createElement(
                          'div',
                          { style: { display: 'none' } },
                          c().createElement(
                            s.Z.PreviewGroup,
                            {
                              preview: {
                                visible: W,
                                onVisibleChange: (e) => y(e),
                              },
                            },
                            n.map((e, t) =>
                              c().createElement(s.Z, {
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
      t['default'] = (0, u.memo)(T);
    },
    28716: function (e, t, n) {
      e.exports = n.p + 'static/img.d2dc592b.png';
    },
  },
]);
