(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [4696, 1021],
  {
    34696: function (e, n, t) {
      'use strict';
      t.r(n);
      var r = t(91896),
        o = t(12924),
        l = t.n(o),
        a = t(21021),
        d = {
          round: 0,
          borderWidth: 0,
          borderColor: 'rgba(255,255,255,1)',
          padding: 0,
          content: '',
        };
      n['default'] = () =>
        l().createElement(a.default, (0, r.Z)({ isTpl: !1 }, d));
    },
    21021: function (e, n, t) {
      'use strict';
      t.r(n);
      t(12968);
      var r,
        o = t(6122),
        l = t(93224),
        a = t(20310),
        d = t(12924),
        c = t.n(d),
        i = t(12788),
        p = t(62090),
        s = t.n(p),
        u = ['isTpl'],
        b = i.ZP.div(
          r ||
            (r = (0, a.Z)([
              '\n  :global(p) {\n    margin-bottom: 0;\n  }\n  :global(img) {\n    max-width: 100%;\n    text-align: center;\n  }\n  :global(blockquote) {\n    margin: 0 0 10px;\n    padding: 12px 20px;\n    background-color: #f1f2f3;\n    border-left: 5px solid #ccc;\n    color: #666;\n    font-style: italic;\n  }\n',
            ])),
        ),
        g = (e) => {
          var n = e.isTpl,
            t = (0, l.Z)(e, u),
            r = t.borderColor,
            a = t.borderWidth,
            d = t.round,
            i = t.padding,
            p = t.content;
          return n
            ? c().createElement(
                'div',
                null,
                c().createElement(o.Z, {
                  preview: !1,
                  style: { width: '100%' },
                  src: s(),
                  alt: '',
                }),
              )
            : c().createElement(
                b,
                {
                  style: {
                    border: ''.concat(a, 'px solid ').concat(r),
                    borderRadius: d + 'px',
                    padding: i + 'px',
                  },
                },
                c().createElement('div', {
                  dangerouslySetInnerHTML: { __html: p },
                }),
              );
        };
      n['default'] = (0, d.memo)(g);
    },
    62090: function (e, n, t) {
      e.exports = t.p + 'static/richText.ea0d0d5c.png';
    },
  },
]);
