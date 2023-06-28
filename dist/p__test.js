(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7357],
  {
    34621: function () {},
    95370: function (e, t, n) {
      'use strict';
      n.d(t, {
        Y: function () {
          return m;
        },
      });
      var r = n(8870),
        a = n(55733),
        c = n.n(a),
        o = n(93162),
        i =
          '# \u5982\u4f55\u4f7f\u7528\uff1a\n\n- umi \u91cc\u5982\u4f55\u4f7f\u7528[\u8bf7\u67e5\u770b](https://landing.ant.design/docs/use/umi)\u3002\n- \u5176\u5b83\u811a\u624b\u67b6\u4f7f\u7528[\u8bf7\u67e5\u770b](https://landing.ant.design/docs/use/getting-started)\u3002\n',
        l = (e) => {
          var t = e,
            n = '',
            r = t.match(/import\s+logo\s+from\s+'(.+?)';/g);
          r && r.length && (n = t.replace(r[0], ''));
          var a = t.match(/import\s+{(.+?)}\s+from\s+'@\/(.+?)';/g);
          a && a.length && (n = n.replace(a[0], ''));
          var c = t.match(
            /\/\*begin\s+to\s+delete\*\/+[^]*;\n+\/\*end\s+to\s+delete\*\//g,
          );
          c && c.length && (n = n.replace(c[0], ''));
          var o = t.match(/:\s+FC<(.+?)>/g);
          return (
            o && o.length && (n = n.replace(o[0], '')),
            (n = n.replace(
              'logo',
              "'https://s1.ax1x.com/2023/03/10/ppnq09s.png'",
            )),
            n
          );
        },
        s = (e) => {
          var t = '',
            n = '',
            r = e,
            a = [];
          r.map((e, r) => {
            var c = e.item,
              o = c.type,
              i = e.id,
              l = c.datasourceName;
            -1 === a.indexOf(o) &&
              ((t += 'import A'.concat(o, " from './").concat(o, "';\n")),
              a.push(o)),
              (n += '<A'
                .concat(o, ' id="')
                .concat(i, '" key="')
                .concat(i, '" isTpl={false} {...')
                .concat(l, '}/>,\n'));
          });
          var c = 'import {\n'.concat(
            r.map((e) => '\t'.concat(e.item.datasourceName)).join(',\n'),
            "\n} from './data.source'",
          );
          return (
            (n = 'const children = ['.concat(n, ']')),
            { childStr: n, dataSourceStr: c, importStr: t }
          );
        },
        p = (e, t, n, r) => {
          var a = new (c())(),
            l = "import React from 'react';\n",
            s = [],
            p = l;
          e.forEach((e) => {
            var t = e.item,
              n = t.type;
            if (-1 === s.indexOf(n)) {
              s.push(n);
              var r = ''.concat(n, '.jsx'),
                c = t.templateStr;
              a.file(r, c), (p += t.props + '\n');
            } else p += t.props + '\n';
          }),
            a.file('data.source.js', p);
          var m = l;
          (m += r + '\n'), (m += n + '\n');
          var u =
            '\nexport default class Home extends React.Component{\n  render(){\n    '.concat(
              t,
              ';\n    return (\n      <div>\n        {children}\n      </div>\n    )\n  }\n}\n',
            );
          (m += u),
            a.file('index.js', m),
            a.file('README.md', i),
            a.generateAsync({ type: 'blob' }).then((e) => {
              (0, o.saveAs)(e, 'Home.zip');
            });
        };
      function m(e, t, n) {
        console.log('\u5f00\u59cb\u5de5\u4f5c', e);
        var a = e,
          c = {};
        e.map((e, t) => {
          var n = e.id,
            o = e.item,
            i = ''.concat(o.type).concat(n, 'DataSource');
          console.log('\u5f53\u524ddatasourceName\uff1a ', i),
            (a[t]['item'] = (0, r.Z)(
              (0, r.Z)({}, a[t]['item']),
              {},
              { datasourceName: i },
            ));
          var s = 'export const '
            .concat(o.type)
            .concat(n, 'DataSource = ')
            .concat(
              JSON.stringify(o.config)
                .replace(/\\n/g, '')
                .replace(/href="(.*?)"/g, 'href=\\"$1\\"')
                .replace(/<br>/g, '<br />')
                .replace(/"(<.*?>)"/g, (e, t) =>
                  ''.concat(
                    t.replace(/\{/g, '&#123;').replace(/\}/g, '&#125;'),
                  ),
                )
                .replace(/\\"/g, '"'),
            );
          (c[''.concat(o.type)] = (0, r.Z)(
            (0, r.Z)({}, c[''.concat(o.type)]),
            {},
            { ['PROPS-'.concat(t)]: s },
          )),
            (a[t]['item'] = (0, r.Z)(
              (0, r.Z)({}, a[t]['item']),
              {},
              { props: s },
            ));
          var p = l(o.templateStr);
          (c[''.concat(o.type)] = (0, r.Z)(
            (0, r.Z)({}, c[''.concat(o.type)]),
            {},
            { ['JS-'.concat(t)]: p },
          )),
            (a[t]['item']['templateStr'] = p);
        }),
          localStorage.setItem('promiseObject', JSON.stringify(a));
        var o = s(a),
          i = o.childStr,
          m = o.dataSourceStr,
          u = o.importStr;
        try {
          p(a, i, m, u);
        } catch (d) {
          console.log('\u4ee3\u7801\u751f\u6210\u5931\u8d25', d);
        }
      }
    },
    98590: function (e, t, n) {
      'use strict';
      n.r(t);
      n(49111);
      var r = n(19650),
        a = (n(57663), n(71577)),
        c = (n(402), n(55672)),
        o = n(12924),
        i = n.n(o),
        l = n(95370),
        s = (e) => {
          var t = () => {
              var e = localStorage.getItem('userData');
              null != e && (e = JSON.parse(e)), (0, l.Y)(e);
            },
            n = () => {
              var e = localStorage.getItem('userData');
              null != e && (e = JSON.parse(e)), (0, l.Y)(e);
            },
            o = () => {
              var e,
                t = '',
                n = '',
                r = localStorage.getItem('promiseObject');
              null != r && (e = JSON.parse(r));
              var a = [];
              e.map((e, r) => {
                var c = e.item,
                  o = c.type,
                  i = e.id,
                  l = c.datasourceName;
                -1 === a.indexOf(o) &&
                  ((t += 'import A'.concat(o, " from './").concat(o, "';\n")),
                  a.push(o)),
                  (n += '<A'
                    .concat(o, ' id="')
                    .concat(i, '" key="')
                    .concat(i, '" isTpl={false} {...')
                    .concat(l, '}/>,\n'));
              });
              var c = 'import {\n'.concat(
                e.map((e) => '\t'.concat(e.item.datasourceName)).join(',\n'),
                "\n} from './data.source'",
              );
              (n = 'const children = ['.concat(n, ']')),
                console.log('importStr:\n', t),
                console.log('childStr:\n', n),
                console.log('dataSourceStr:\n', c);
            };
          return i().createElement(
            'div',
            null,
            i().createElement(c.Z.Title, null, 'This Page is for test'),
            i().createElement(
              r.Z,
              null,
              i().createElement(
                a.Z,
                { onClick: t },
                'Click to show templateStr.',
              ),
              i().createElement(a.Z, { onClick: n }, 'Click to show Data.'),
              i().createElement(a.Z, { onClick: o }, 'Show ImportStr.'),
            ),
          );
        };
      t['default'] = s;
    },
    98082: function (e, t, n) {
      'use strict';
      var r = n(28481),
        a = n(12924),
        c = n(31808);
      t['Z'] = function () {
        var e = a.useState(!1),
          t = (0, r.Z)(e, 2),
          n = t[0],
          o = t[1];
        return (
          a.useEffect(function () {
            o((0, c.fk)());
          }, []),
          n
        );
      };
    },
    31808: function (e, t, n) {
      'use strict';
      n.d(t, {
        jD: function () {
          return c;
        },
        fk: function () {
          return o;
        },
      });
      var r,
        a = n(98924),
        c = function () {
          return (0, a.Z)() && window.document.documentElement;
        },
        o = function () {
          if (!c()) return !1;
          if (void 0 !== r) return r;
          var e = document.createElement('div');
          return (
            (e.style.display = 'flex'),
            (e.style.flexDirection = 'column'),
            (e.style.rowGap = '1px'),
            e.appendChild(document.createElement('div')),
            e.appendChild(document.createElement('div')),
            document.body.appendChild(e),
            (r = 1 === e.scrollHeight),
            document.body.removeChild(e),
            r
          );
        };
    },
    19650: function (e, t, n) {
      'use strict';
      n.d(t, {
        u: function () {
          return v;
        },
        Z: function () {
          return x;
        },
      });
      var r = n(22122),
        a = n(96156),
        c = n(28481),
        o = n(94184),
        i = n.n(o),
        l = n(50344),
        s = n(12924),
        p = n(53124),
        m = n(98082);
      function u(e) {
        var t = e.className,
          n = e.direction,
          c = e.index,
          o = e.marginDirection,
          i = e.children,
          l = e.split,
          p = e.wrap,
          m = s.useContext(v),
          u = m.horizontalSize,
          d = m.verticalSize,
          f = m.latestIndex,
          g = m.supportFlexGap,
          h = {};
        return (
          g ||
            ('vertical' === n
              ? c < f && (h = { marginBottom: u / (l ? 2 : 1) })
              : (h = (0, r.Z)(
                  (0, r.Z)({}, c < f && (0, a.Z)({}, o, u / (l ? 2 : 1))),
                  p && { paddingBottom: d },
                ))),
          null === i || void 0 === i
            ? null
            : s.createElement(
                s.Fragment,
                null,
                s.createElement('div', { className: t, style: h }, i),
                c < f &&
                  l &&
                  s.createElement(
                    'span',
                    { className: ''.concat(t, '-split'), style: h },
                    l,
                  ),
              )
        );
      }
      var d = n(4173),
        f = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var a = 0;
            for (r = Object.getOwnPropertySymbols(e); a < r.length; a++)
              t.indexOf(r[a]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[a]) &&
                (n[r[a]] = e[r[a]]);
          }
          return n;
        },
        v = s.createContext({
          latestIndex: 0,
          horizontalSize: 0,
          verticalSize: 0,
          supportFlexGap: !1,
        }),
        g = { small: 8, middle: 16, large: 24 };
      function h(e) {
        return 'string' === typeof e ? g[e] : e || 0;
      }
      var y = function (e) {
          var t,
            n = s.useContext(p.E_),
            o = n.getPrefixCls,
            d = n.space,
            g = n.direction,
            y = e.size,
            S =
              void 0 === y
                ? (null === d || void 0 === d ? void 0 : d.size) || 'small'
                : y,
            x = e.align,
            Z = e.className,
            E = e.children,
            C = e.direction,
            O = void 0 === C ? 'horizontal' : C,
            b = e.prefixCls,
            w = e.split,
            N = e.style,
            k = e.wrap,
            z = void 0 !== k && k,
            j = f(e, [
              'size',
              'align',
              'className',
              'children',
              'direction',
              'prefixCls',
              'split',
              'style',
              'wrap',
            ]),
            D = (0, m.Z)(),
            A = s.useMemo(
              function () {
                return (Array.isArray(S) ? S : [S, S]).map(function (e) {
                  return h(e);
                });
              },
              [S],
            ),
            I = (0, c.Z)(A, 2),
            P = I[0],
            G = I[1],
            J = (0, l.Z)(E, { keepEmpty: !0 }),
            F = void 0 === x && 'horizontal' === O ? 'center' : x,
            R = o('space', b),
            T = i()(
              R,
              ''.concat(R, '-').concat(O),
              ((t = {}),
              (0, a.Z)(t, ''.concat(R, '-rtl'), 'rtl' === g),
              (0, a.Z)(t, ''.concat(R, '-align-').concat(F), F),
              t),
              Z,
            ),
            B = ''.concat(R, '-item'),
            H = 'rtl' === g ? 'marginLeft' : 'marginRight',
            M = 0,
            Y = J.map(function (e, t) {
              null !== e && void 0 !== e && (M = t);
              var n = (e && e.key) || ''.concat(B, '-').concat(t);
              return s.createElement(
                u,
                {
                  className: B,
                  key: n,
                  direction: O,
                  index: t,
                  marginDirection: H,
                  split: w,
                  wrap: z,
                },
                e,
              );
            }),
            q = s.useMemo(
              function () {
                return {
                  horizontalSize: P,
                  verticalSize: G,
                  latestIndex: M,
                  supportFlexGap: D,
                };
              },
              [P, G, M, D],
            );
          if (0 === J.length) return null;
          var L = {};
          return (
            z && ((L.flexWrap = 'wrap'), D || (L.marginBottom = -G)),
            D && ((L.columnGap = P), (L.rowGap = G)),
            s.createElement(
              'div',
              (0, r.Z)(
                { className: T, style: (0, r.Z)((0, r.Z)({}, L), N) },
                j,
              ),
              s.createElement(v.Provider, { value: q }, Y),
            )
          );
        },
        S = y;
      S.Compact = d.ZP;
      var x = S;
    },
    49111: function (e, t, n) {
      'use strict';
      n(38663), n(34621);
    },
  },
]);
