(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7357],
  {
    79662: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return S;
          },
        });
      n(49111);
      var o = n(19650),
        a = (n(57663), n(71577)),
        r = (n(402), n(55672)),
        c = n(12924),
        i = n.n(c),
        l = n(8870),
        s = n(55733),
        p = n.n(s),
        u = n(93162),
        d =
          '# \u5982\u4f55\u4f7f\u7528\uff1a\n\n- umi \u91cc\u5982\u4f55\u4f7f\u7528[\u8bf7\u67e5\u770b](https://landing.ant.design/docs/use/umi)\u3002\n- \u5176\u5b83\u811a\u624b\u67b6\u4f7f\u7528[\u8bf7\u67e5\u770b](https://landing.ant.design/docs/use/getting-started)\u3002\n',
        m = (e) => {
          var t = e,
            n = '',
            o = t.match(/import\s+logo\s+from\s+'(.+?)';/g);
          o && o.length && (n = t.replace(o[0], ''));
          var a = t.match(/import\s+{(.+?)}\s+from\s+'@\/(.+?)';/g);
          a && a.length && (n = n.replace(a[0], ''));
          var r = t.match(
            /\/\*begin\s+to\s+delete\*\/+[^]*;\n+\/\*end\s+to\s+delete\*\//g,
          );
          r && r.length && (n = n.replace(r[0], ''));
          var c = t.match(/:\s+FC<(.+?)>/g);
          return (
            c && c.length && (n = n.replace(c[0], '')),
            (n = n.replace(
              'logo',
              "'https://s1.ax1x.com/2023/03/10/ppnq09s.png'",
            )),
            n
          );
        },
        f = (e) => {
          var t = '',
            n = '',
            o = e,
            a = [];
          o.map((e, o) => {
            var r = e.item,
              c = r.type,
              i = e.id,
              l = r.datasourceName;
            -1 === a.indexOf(c) &&
              ((t += 'import A'.concat(c, " from './").concat(c, "';\n")),
              a.push(c)),
              (n += '<A'
                .concat(c, ' id="')
                .concat(i, '" key="')
                .concat(i, '" isTpl={false} {...')
                .concat(l, '}/>,\n'));
          });
          var r = 'import {\n'.concat(
            o.map((e) => '\t'.concat(e.item.datasourceName)).join(',\n'),
            "\n} from './data.source'",
          );
          return (
            (n = 'const children = ['.concat(n, ']')),
            { childStr: n, dataSourceStr: r, importStr: t }
          );
        },
        g = (e, t, n, o) => {
          var a = new (p())(),
            r = "import React from 'react';\n",
            c = [],
            i = r;
          e.forEach((e) => {
            var t = e.item,
              n = t.type;
            if (-1 === c.indexOf(n)) {
              c.push(n);
              var o = ''.concat(n, '.jsx'),
                r = t.templateStr;
              a.file(o, r), (i += t.props + '\n');
            } else i += t.props + '\n';
          }),
            a.file('data.source.js', i);
          var l = r;
          (l += o + '\n'), (l += n + '\n');
          var s =
            '\nexport default class Home extends React.Component{\n  render(){\n    '.concat(
              t,
              ';\n    return (\n      <div>\n        {children}\n      </div>\n    )\n  }\n}\n',
            );
          (l += s),
            a.file('index.js', l),
            a.file('README.md', d),
            a.generateAsync({ type: 'blob' }).then((e) => {
              (0, u.saveAs)(e, 'Home.zip');
            });
        };
      function v(e, t, n) {
        var o = e,
          a = {};
        e.map((e, t) => {
          var n = e.id,
            r = e.item,
            c = ''.concat(r.type).concat(n, 'DataSource');
          o[t]['item']['datasourceName'] = c;
          var i = 'export const '
            .concat(r.type)
            .concat(n, 'DataSource = ')
            .concat(
              JSON.stringify(r.config)
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
          (a[''.concat(r.type)] = (0, l.Z)(
            (0, l.Z)({}, a[''.concat(r.type)]),
            {},
            { ['PROPS-'.concat(t)]: i },
          )),
            (o[t]['item'] = (0, l.Z)(
              (0, l.Z)({}, o[t]['item']),
              {},
              { props: i },
            ));
          var s = m(r.templateStr);
          (a[''.concat(r.type)] = (0, l.Z)(
            (0, l.Z)({}, a[''.concat(r.type)]),
            {},
            { ['JS-'.concat(t)]: s },
          )),
            (o[t]['item']['templateStr'] = s);
        }),
          localStorage.setItem('promiseObject', JSON.stringify(o));
        var r = f(o),
          c = r.childStr,
          i = r.dataSourceStr,
          s = r.importStr;
        try {
          g(o, c, i, s);
        } catch (p) {
          console.log('\u4ee3\u7801\u751f\u6210\u5931\u8d25', p);
        }
      }
      var h = (e) => {
          var t = () => {
              var e = localStorage.getItem('userData');
              null != e && (e = JSON.parse(e)), v(e);
            },
            n = () => {
              var e = localStorage.getItem('userData');
              null != e && (e = JSON.parse(e)), v(e);
            },
            c = () => {
              var e,
                t = '',
                n = '',
                o = localStorage.getItem('promiseObject');
              null != o && (e = JSON.parse(o));
              var a = [];
              e.map((e, o) => {
                var r = e.item,
                  c = r.type,
                  i = e.id,
                  l = r.datasourceName;
                -1 === a.indexOf(c) &&
                  ((t += 'import A'.concat(c, " from './").concat(c, "';\n")),
                  a.push(c)),
                  (n += '<A'
                    .concat(c, ' id="')
                    .concat(i, '" key="')
                    .concat(i, '" isTpl={false} {...')
                    .concat(l, '}/>,\n'));
              });
              var r = 'import {\n'.concat(
                e.map((e) => '\t'.concat(e.item.datasourceName)).join(',\n'),
                "\n} from './data.source'",
              );
              (n = 'const children = ['.concat(n, ']')),
                console.log('importStr:\n', t),
                console.log('childStr:\n', n),
                console.log('dataSourceStr:\n', r);
            };
          return i().createElement(
            'div',
            null,
            i().createElement(r.Z.Title, null, 'This Page is for test'),
            i().createElement(
              o.Z,
              null,
              i().createElement(
                a.Z,
                { onClick: t },
                'Click to show templateStr.',
              ),
              i().createElement(a.Z, { onClick: n }, 'Click to show Data.'),
              i().createElement(a.Z, { onClick: c }, 'Show ImportStr.'),
            ),
          );
        },
        S = h;
    },
    93162: function (e, t, n) {
      var o, a, r;
      (function (n, c) {
        (a = []),
          (o = c),
          (r = 'function' === typeof o ? o.apply(t, a) : o),
          void 0 === r || (e.exports = r);
      })(0, function () {
        'use strict';
        function t(e, t) {
          return (
            'undefined' == typeof t
              ? (t = { autoBom: !1 })
              : 'object' != typeof t &&
                (console.warn(
                  'Deprecated: Expected third argument to be a object',
                ),
                (t = { autoBom: !t })),
            t.autoBom &&
            /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(
              e.type,
            )
              ? new Blob(['\ufeff', e], { type: e.type })
              : e
          );
        }
        function o(e, t, n) {
          var o = new XMLHttpRequest();
          o.open('GET', e),
            (o.responseType = 'blob'),
            (o.onload = function () {
              l(o.response, t, n);
            }),
            (o.onerror = function () {
              console.error('could not download file');
            }),
            o.send();
        }
        function a(e) {
          var t = new XMLHttpRequest();
          t.open('HEAD', e, !1);
          try {
            t.send();
          } catch (e) {}
          return 200 <= t.status && 299 >= t.status;
        }
        function r(e) {
          try {
            e.dispatchEvent(new MouseEvent('click'));
          } catch (o) {
            var t = document.createEvent('MouseEvents');
            t.initMouseEvent(
              'click',
              !0,
              !0,
              window,
              0,
              0,
              0,
              80,
              20,
              !1,
              !1,
              !1,
              !1,
              0,
              null,
            ),
              e.dispatchEvent(t);
          }
        }
        var c =
            'object' == typeof window && window.window === window
              ? window
              : 'object' == typeof self && self.self === self
              ? self
              : 'object' == typeof n.g && n.g.global === n.g
              ? n.g
              : void 0,
          i =
            c.navigator &&
            /Macintosh/.test(navigator.userAgent) &&
            /AppleWebKit/.test(navigator.userAgent) &&
            !/Safari/.test(navigator.userAgent),
          l =
            c.saveAs ||
            ('object' != typeof window || window !== c
              ? function () {}
              : 'download' in HTMLAnchorElement.prototype && !i
              ? function (e, t, n) {
                  var i = c.URL || c.webkitURL,
                    l = document.createElement('a');
                  (t = t || e.name || 'download'),
                    (l.download = t),
                    (l.rel = 'noopener'),
                    'string' == typeof e
                      ? ((l.href = e),
                        l.origin === location.origin
                          ? r(l)
                          : a(l.href)
                          ? o(e, t, n)
                          : r(l, (l.target = '_blank')))
                      : ((l.href = i.createObjectURL(e)),
                        setTimeout(function () {
                          i.revokeObjectURL(l.href);
                        }, 4e4),
                        setTimeout(function () {
                          r(l);
                        }, 0));
                }
              : 'msSaveOrOpenBlob' in navigator
              ? function (e, n, c) {
                  if (((n = n || e.name || 'download'), 'string' != typeof e))
                    navigator.msSaveOrOpenBlob(t(e, c), n);
                  else if (a(e)) o(e, n, c);
                  else {
                    var i = document.createElement('a');
                    (i.href = e),
                      (i.target = '_blank'),
                      setTimeout(function () {
                        r(i);
                      });
                  }
                }
              : function (e, t, n, a) {
                  if (
                    ((a = a || open('', '_blank')),
                    a &&
                      (a.document.title = a.document.body.innerText =
                        'downloading...'),
                    'string' == typeof e)
                  )
                    return o(e, t, n);
                  var r = 'application/octet-stream' === e.type,
                    l = /constructor/i.test(c.HTMLElement) || c.safari,
                    s = /CriOS\/[\d]+/.test(navigator.userAgent);
                  if (
                    (s || (r && l) || i) &&
                    'undefined' != typeof FileReader
                  ) {
                    var p = new FileReader();
                    (p.onloadend = function () {
                      var e = p.result;
                      (e = s
                        ? e
                        : e.replace(/^data:[^;]*;/, 'data:attachment/file;')),
                        a ? (a.location.href = e) : (location = e),
                        (a = null);
                    }),
                      p.readAsDataURL(e);
                  } else {
                    var u = c.URL || c.webkitURL,
                      d = u.createObjectURL(e);
                    a ? (a.location = d) : (location.href = d),
                      (a = null),
                      setTimeout(function () {
                        u.revokeObjectURL(d);
                      }, 4e4);
                  }
                });
        (c.saveAs = l.saveAs = l), (e.exports = l);
      });
    },
  },
]);
