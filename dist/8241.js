(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8241],
  {
    38241: function (e, t, n) {
      'use strict';
      n.r(t);
      n(12968);
      var i,
        l,
        a,
        s = n(6122),
        o = n(2824),
        r = n(93224),
        c = n(20310),
        U = n(12924),
        h = n.n(U),
        b = n(12788),
        p = n(27919),
        S = n.n(p),
        d = ['isTpl'],
        u = b.ZP.div(
          i ||
            (i = (0, c.Z)([
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
        m = b.ZP.div(
          l ||
            (l = (0, c.Z)([
              '\n  border-radius: ',
              ';\n  width: 100%;\n  text-align: center;\n  overflow: hidden;\n  position: relative;\n',
            ])),
          (e) => e.round,
        ),
        F = b.ZP.div(
          a ||
            (a = (0, c.Z)([
              '\n  position: absolute;\n  width: 100%;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  margin-left: ',
              ';\n  margin-top: ',
              ';\n  text-align: ',
              ';\n',
            ])),
          (e) => e.translate && e.translate[0],
          (e) => e.translate && e.translate[1],
          (e) => e.$textAlign,
        ),
        g = (e) => {
          e.isTpl;
          var t = (0, r.Z)(e, d),
            n = t.imgUrl,
            i = t.round,
            l = void 0 === i ? 0 : i,
            a = t.translate,
            c = t.align,
            b = t.titText,
            p = t.titFontSize,
            g = t.titColor,
            E = t.titFontWeight,
            A = t.subTitText,
            k = t.subTitFontSize,
            R = t.subTitColor,
            f = t.subTitFontWeight,
            w = (0, U.useState)(!1),
            v = (0, o.Z)(w, 2),
            C = v[0],
            K = v[1];
          return h().createElement(
            h().Fragment,
            null,
            e.isTpl &&
              h().createElement(
                'div',
                null,
                h().createElement(s.Z, { preview: !1, src: S(), alt: '' }),
              ),
            !e.isTpl &&
              h().createElement(
                u,
                {
                  $baseWidth: e.baseWidth,
                  $baseHeight: e.baseHeight,
                  $borderRadius: e.baseRadius,
                  $baseLeft: e.baseLeft,
                  $baseRotate: e.baseLeft,
                  $baseScale: e.baseScale,
                  $baseTop: e.baseTop,
                },
                h().createElement(
                  m,
                  { round: l },
                  h().createElement(
                    F,
                    { $textAlign: c, $translate: a },
                    h().createElement(
                      'div',
                      { style: { fontSize: p, color: g, fontWeight: +E } },
                      b,
                    ),
                    h().createElement(
                      'div',
                      {
                        style: {
                          fontSize: k,
                          color: R,
                          fontWeight: +f,
                          lineHeight: 2.6,
                        },
                      },
                      A,
                    ),
                  ),
                  n.length <= 1
                    ? h().createElement(s.Z, {
                        src: n && n[0].url,
                        alt: '',
                        style: { width: '100%' },
                      })
                    : h().createElement(
                        h().Fragment,
                        null,
                        h().createElement(s.Z, {
                          preview: { visible: !1 },
                          style: { width: '100%' },
                          src: n && n[0].url,
                          onClick: () => K(!0),
                        }),
                        h().createElement(
                          'div',
                          { style: { display: 'none' } },
                          h().createElement(
                            s.Z.PreviewGroup,
                            {
                              preview: {
                                visible: C,
                                onVisibleChange: (e) => K(e),
                              },
                            },
                            n.map((e, t) =>
                              h().createElement(s.Z, {
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
      t['default'] = (0, U.memo)(g);
    },
    27919: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIUAAABgCAYAAAAzU7ENAAAEj0lEQVR4Xu2da5PTNhhG35aSsrS0lMvQC5dQWj7wHT7y/38WPiRhWSnZlWy9utjPM3NmdhJHsp0TR5KlrJnZ1cRTIY7gw9c/Xp55UmyPkwffHlCUby5ICuUUSaFEkRRKFEmhRJEUShRJoUSRFEoUSaFEkRRKFEmhRJEUShRJoUSRFEoUSaFEeWeSQvkujyc+maRQjkGI91ZZil/sUMc/E/8e+fv4GM8p7fK7HYSoJsX9iVd2Xekl2IZtlbr5XogqUvw28Z/FAlyCbXmNUiec6/A9cJUiNDAHieEfzvH/Fp97Nyl+srwrRAjdIspQfPLIzgsBblLQgAwry4UylPK5TQhwkYJPeFjRXHS1KJtf7XYhwEUKTAwrmgtlKWWSIgS4SPHc4ormQlnK8jAOlCIEuEiRMiaRCmUpy/LQ0oUAFynoOYQVzYWylPnJFQJcpNhbXNFc9qbMDSvHc4UAFyn+sriiuVCWkh+EmDtO5CLFHxZXNBfKUvKyRAhwkYLvsbCiuVCWkp6lQoCLFD9MvLG4slwog7KUtDyw5UKAixRkZ8t2kNdShpKWUkKAmxRkyV1SXquk5WcrJwS4SkF4c3N2mG2ZFqakBSFKjguBuxRkN/Ha4spD2IZtlbRwrkoLAVWkOGVnhyvHnxNvj/A3j/Gckh7Ol4cQUFUKpUx25icESIrBwsRmZsGHb2RJJMVAqSEEbF6KH+3wC7O04nsOM9BqCAGblmJnh8YuJ4ITfu/m090EIU77WYPNSsFMpHD8hC5xb8PqtYWATUrxxC7PM+jpVn0LIWBTUnAVSJnrgTStw1dZCyFgM1JwklNGVYGrSMsFz+zr3uL9qsUmpKBnkdtyb3WXtrUQsHopWOsQNihT4fJds0fSgxCwaik4nvCAc+Erp0YYL9lbXH8LVikFDcoSa1lPcNPOMwhRYqZaKVYnBd04jxPsNYG4NyFgVVIwJc3r7iE9ktKTiLmipfaIarIaKe5aXl+Ckj0ShCi5vLIkq5DimcUH5gU9Ei75S9KzEDC0FJxcfmkvPChvlix67l0IGFYKGpR7iw+oFnN6JCMIAUNK4dmgzCFn1jlCMG8jLKNHhpPi0i+6tYD9+Po/we/ISELAUFKU/IWcUnDFYprcpbRq9yxhCClo7fd8Ym/rkfS835foXgo+hXuLd7w3zvVISg6116RrKfi+7qFBmcoLu86oQkC3Upz+zcBosN8ps7t6pksp+MSFOyrq0ZUUNNZGGNxZO91IsbN2E1XFTbqQglvSc6fMifI0l4LJK72MUIoDzaRgpI+bSuEOifY0kYIGZY8zjsSB6lLsTA3K3qkqxblFvaI/qklx26Je0RfuUtCgHH3Yd2u4SpGzqFf0g5sUcxb1ij5wkWLJol7RnuJSUEZYiRiLYlLQoBx5Yom4pogUXot6RRsWS8EaDDUo18UiKWos6hX1mS1FzUW9oi7ZUoy4uEXkkSVF60W9og7JUvSyqFf4kyRFT4t6hT93StHjol7hy0Upel/UK/w4K8Uoi3qFD5EUoy3qFeW5IcWHiY/HB8V2+WxHKbhCnK4WQlx9AWhOXwKkLKI6AAAAAElFTkSuQmCC';
    },
  },
]);
