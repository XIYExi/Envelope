(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7181, 8869],
  {
    77181: function (e, t, o) {
      'use strict';
      o.r(t);
      var l = o(91896),
        n = o(12924),
        a = o.n(n),
        r = o(28869),
        i = {
          title: '\u8868\u5355\u5b9a\u5236\u7ec4\u4ef6',
          fontSize: 18,
          titColor: 'rgba(60, 60, 60, 1)',
          titWeight: '400',
          bgColor: 'rgba(255, 255, 255, 1)',
          btnColor: 'rgba(20, 54, 226, 100)',
          btnTextColor: 'rgba(255, 255, 255, 1)',
          api: '',
          formControls: [
            {
              id: '1',
              type: 'Text',
              label: '\u59d3\u540d',
              placeholder: '\u8bf7\u8f93\u5165\u59d3\u540d',
            },
            {
              id: '2',
              type: 'Number',
              label: '\u5e74\u9f84',
              placeholder: ' \u8bf7\u8f93\u5165\u5e74\u9f84',
            },
            {
              id: '4',
              type: 'MySelect',
              label: '\u7231\u597d',
              options: [
                { label: '\u7bee\u7403', value: '1' },
                { label: '\u4e52\u4e53\u7403', value: '2' },
                { label: '\u5065\u8eab', value: '3' },
              ],
            },
          ],
        };
      t['default'] = () =>
        a().createElement(r.default, (0, l.Z)({ isTpl: !1 }, i));
    },
    28869: function (e, t, o) {
      'use strict';
      o.r(t);
      var l,
        n,
        a,
        r = o(91896),
        i = o(93224),
        c = (o(57663), o(71577)),
        p = o(20310),
        g = o(12924),
        u = o.n(g),
        d = o(6350),
        A = o(12788),
        h = o(9845),
        f = o.n(h),
        b = ['isTpl'],
        Q = A.ZP.div(
          l ||
            (l = (0, p.Z)([
              '\n  padding-bottom: 20px;\n  text-align: center;\n',
            ])),
        ),
        m = A.ZP.div(
          n ||
            (n = (0, p.Z)([
              '\n  margin: 10px;\n  padding: 20px 16px;\n  border-radius: 6px;\n  box-shadow: 0 2px 6px #f0f0f0;\n  width: calc(100% - 20px);\n  overflow: hidden;\n  position: absolute;\n  background-color: ',
              ';\n  pointer-events: ',
              ';\n',
            ])),
          (e) => e.$bgColor,
          (e) => (e.$pointer ? 'none' : 'initial'),
        ),
        s = (0, A.ZP)(c.Z)(
          a ||
            (a = (0, p.Z)([
              '\n  background-color: ',
              ';\n  border-color: ',
              ';\n  color: ',
              ';\n',
            ])),
          (e) => e.$bgColor,
          (e) => e.$bdColor,
          (e) => e.$textCol,
        ),
        C = (e) => {
          e.isTpl;
          var t = (0, i.Z)(e, b),
            o = t.title,
            l = t.bgColor,
            n = t.fontSize,
            a = t.titColor,
            c = t.btnColor,
            p = t.titWeight,
            A = t.btnTextColor,
            h = t.api,
            C = t.formControls,
            y = {},
            N = (0, g.useCallback)(
              (e, t) => {
                y[e.label] = t;
              },
              [y],
            ),
            k = () => {
              h &&
                fetch(h, {
                  body: JSON.stringify(y),
                  cache: 'no-cache',
                  headers: { 'content-type': 'application/json' },
                  method: 'POST',
                  mode: 'cors',
                });
            },
            B = window.location.pathname.indexOf('editor') > -1;
          return u().createElement(
            u().Fragment,
            null,
            e.isTpl &&
              u().createElement(
                'div',
                null,
                u().createElement('img', { src: f(), alt: '' }),
              ),
            !e.isTpl &&
              u().createElement(
                m,
                { $bgColor: l, $pointer: B },
                o &&
                  u().createElement(
                    Q,
                    { style: { fontSize: n, fontWeight: +p, color: a } },
                    o,
                  ),
                u().createElement(
                  'div',
                  null,
                  C.map((e) => {
                    var t = d.Z[e.type];
                    return u().createElement(
                      t,
                      (0, r.Z)({ onChange: (t) => N(e, t) }, e, { key: e.id }),
                    );
                  }),
                  u().createElement(
                    'div',
                    { style: { textAlign: 'center', padding: '16px 0' } },
                    u().createElement(
                      s,
                      {
                        type: 'primary',
                        size: 'small',
                        block: !0,
                        onClick: k,
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
      t['default'] = (0, g.memo)(C);
    },
    9845: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
