(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8869],
  {
    28869: function (e, o, n) {
      'use strict';
      n.r(o);
      var t,
        a,
        l,
        r = n(91896),
        i = n(93224),
        c = (n(57663), n(71577)),
        g = n(20310),
        p = n(12924),
        u = n.n(p),
        d = n(6350),
        A = n(12788),
        Q = n(9845),
        h = n.n(Q),
        f = ['isTpl'],
        m = A.ZP.div(
          t ||
            (t = (0, g.Z)([
              '\n  padding-bottom: 20px;\n  text-align: center;\n',
            ])),
        ),
        s = A.ZP.div(
          a ||
            (a = (0, g.Z)([
              '\n  margin: 10px;\n  padding: 20px 16px;\n  border-radius: 6px;\n  box-shadow: 0 2px 6px #f0f0f0;\n  width: calc(100% - 20px);\n  overflow: hidden;\n  position: absolute;\n  background-color: ',
              ';\n  pointer-events: ',
              ';\n',
            ])),
          (e) => e.$bgColor,
          (e) => (e.$pointer ? 'none' : 'initial'),
        ),
        k = (0, A.ZP)(c.Z)(
          l ||
            (l = (0, g.Z)([
              '\n  background-color: ',
              ';\n  border-color: ',
              ';\n  color: ',
              ';\n',
            ])),
          (e) => e.$bgColor,
          (e) => e.$bdColor,
          (e) => e.$textCol,
        ),
        B = (e) => {
          e.isTpl;
          var o = (0, i.Z)(e, f),
            n = o.title,
            t = o.bgColor,
            a = o.fontSize,
            l = o.titColor,
            c = o.btnColor,
            g = o.titWeight,
            A = o.btnTextColor,
            Q = o.api,
            B = o.formControls,
            C = {},
            N = (0, p.useCallback)(
              (e, o) => {
                C[e.label] = o;
              },
              [C],
            ),
            R = () => {
              Q &&
                fetch(Q, {
                  body: JSON.stringify(C),
                  cache: 'no-cache',
                  headers: { 'content-type': 'application/json' },
                  method: 'POST',
                  mode: 'cors',
                });
            },
            y = window.location.pathname.indexOf('editor') > -1;
          return u().createElement(
            u().Fragment,
            null,
            e.isTpl &&
              u().createElement(
                'div',
                null,
                u().createElement('img', { src: h(), alt: '' }),
              ),
            !e.isTpl &&
              u().createElement(
                s,
                { $bgColor: t, $pointer: y },
                n &&
                  u().createElement(
                    m,
                    { style: { fontSize: a, fontWeight: +g, color: l } },
                    n,
                  ),
                u().createElement(
                  'div',
                  null,
                  B.map((e) => {
                    var o = d.Z[e.type];
                    return u().createElement(
                      o,
                      (0, r.Z)({ onChange: (o) => N(e, o) }, e, { key: e.id }),
                    );
                  }),
                  u().createElement(
                    'div',
                    { style: { textAlign: 'center', padding: '16px 0' } },
                    u().createElement(
                      k,
                      {
                        type: 'primary',
                        size: 'small',
                        block: !0,
                        onClick: R,
                        $bgColor: c,
                        $bdColor: c,
                        $textCol: A,
                      },
                      '\u63d0\u4ea4',
                    ),
                  ),
                ),
              ),
          );
        };
      o['default'] = (0, p.memo)(B);
    },
    9845: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
