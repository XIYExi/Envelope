(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1021],
  {
    21021: function (e, n, t) {
      'use strict';
      t.r(n);
      t(12968);
      var l,
        r = t(6122),
        o = t(93224),
        a = t(20310),
        c = t(12924),
        d = t.n(c),
        i = t(12788),
        p = t(62090),
        s = t.n(p),
        u = ['isTpl'],
        b = i.ZP.div(
          l ||
            (l = (0, a.Z)([
              '\n  :global(p) {\n    margin-bottom: 0;\n  }\n  :global(img) {\n    max-width: 100%;\n    text-align: center;\n  }\n  :global(blockquote) {\n    margin: 0 0 10px;\n    padding: 12px 20px;\n    background-color: #f1f2f3;\n    border-left: 5px solid #ccc;\n    color: #666;\n    font-style: italic;\n  }\n',
            ])),
        ),
        g = (e) => {
          var n = e.isTpl,
            t = (0, o.Z)(e, u),
            l = t.borderColor,
            a = t.borderWidth,
            c = t.round,
            i = t.padding,
            p = t.content;
          return n
            ? d().createElement(
                'div',
                null,
                d().createElement(r.Z, {
                  preview: !1,
                  style: { width: '100%' },
                  src: s(),
                  alt: '',
                }),
              )
            : d().createElement(
                b,
                {
                  style: {
                    border: ''.concat(a, 'px solid ').concat(l),
                    borderRadius: c + 'px',
                    padding: i + 'px',
                  },
                },
                d().createElement('div', {
                  dangerouslySetInnerHTML: { __html: p },
                }),
              );
        };
      n['default'] = (0, c.memo)(g);
    },
    62090: function (e, n, t) {
      e.exports = t.p + 'static/richText.ea0d0d5c.png';
    },
  },
]);
