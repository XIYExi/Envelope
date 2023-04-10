(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [411],
  {
    70411: function (e, a, r) {
      'use strict';
      r.r(a),
        r.d(a, {
          default: function () {
            return b;
          },
        });
      var l = r(57337),
        n = r(93224),
        t = r(12924),
        s = r.n(t),
        c = r(87754),
        u = r.n(c),
        i = r(22122),
        p = r(86010),
        m = (r(55301), r(92063)),
        g = r(28935),
        h = r(12519),
        d = r(92248);
      function E(e) {
        var a = e.children,
          r = e.className,
          l = e.content,
          n = e.image,
          t = (0, p.default)((0, m.lG)(n, 'image'), 'header', r),
          c = (0, g.Z)(E, e),
          u = (0, h.Z)(E, e);
        return s().createElement(
          u,
          (0, i.Z)({}, c, { className: t }),
          d.kK(a) ? l : a,
        );
      }
      (E.handledProps = ['as', 'children', 'className', 'content', 'image']),
        (E.propTypes = {});
      var o = E;
      function A(e) {
        var a = e.className,
          r = e.square,
          l = e.rectangular,
          n = (0, p.default)(
            (0, m.lG)(r, 'square'),
            (0, m.lG)(l, 'rectangular'),
            'image',
            a,
          ),
          t = (0, g.Z)(A, e),
          c = (0, h.Z)(A, e);
        return s().createElement(c, (0, i.Z)({}, t, { className: n }));
      }
      (A.handledProps = ['as', 'className', 'rectangular', 'square']),
        (A.propTypes = {});
      var k = A;
      function B(e) {
        var a = e.className,
          r = e.length,
          l = (0, p.default)('line', r, a),
          n = (0, g.Z)(B, e),
          t = (0, h.Z)(B, e);
        return s().createElement(t, (0, i.Z)({}, n, { className: l }));
      }
      (B.handledProps = ['as', 'className', 'length']), (B.propTypes = {});
      var f = B;
      function v(e) {
        var a = e.children,
          r = e.className,
          l = e.content,
          n = (0, p.default)('paragraph', r),
          t = (0, g.Z)(v, e),
          c = (0, h.Z)(v, e);
        return s().createElement(
          c,
          (0, i.Z)({}, t, { className: n }),
          d.kK(a) ? l : a,
        );
      }
      (v.handledProps = ['as', 'children', 'className', 'content']),
        (v.propTypes = {});
      var I = v;
      function Q(e) {
        var a = e.children,
          r = e.className,
          l = e.content,
          n = e.fluid,
          t = e.inverted,
          c = (0, p.default)(
            'ui',
            (0, m.lG)(n, 'fluid'),
            (0, m.lG)(t, 'inverted'),
            'placeholder',
            r,
          ),
          u = (0, g.Z)(Q, e),
          E = (0, h.Z)(Q, e);
        return s().createElement(
          E,
          (0, i.Z)({}, u, { className: c }),
          d.kK(a) ? l : a,
        );
      }
      (Q.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'fluid',
        'inverted',
      ]),
        (Q.propTypes = {}),
        (Q.Header = o),
        (Q.Image = k),
        (Q.Line = f),
        (Q.Paragraph = I);
      var N = Q,
        F = r(49282),
        G = ['isTpl'],
        Y = (e) => {
          var a = e.isTpl,
            r = (0, n.Z)(e, G),
            c = r.renderHeader,
            i = r.renderParagraph,
            p = r.fluid,
            m = r.inverted,
            g = (0, t.useState)([s().createElement(s().Fragment, null)]),
            h = (0, l.Z)(g, 2),
            d = h[0],
            E = h[1],
            o = (0, t.useState)([s().createElement(s().Fragment, null)]),
            A = (0, l.Z)(o, 2),
            k = A[0],
            B = A[1];
          return (
            (0, t.useEffect)(() => {
              for (var e = c.split(','), a = [], r = 0; r < e.length; ++r)
                switch (e[r]) {
                  case 'Header':
                    a.push(s().createElement(N.Header, null));
                    break;
                  case 'Image':
                    a.push(s().createElement(N.Image, null));
                    break;
                  case 'Line':
                    a.push(s().createElement(N.Line, null));
                    break;
                  case 'Paragraph':
                    a.push(s().createElement(N.Paragraph, null));
                    break;
                  default:
                    break;
                }
              E(a);
            }, [c]),
            (0, t.useEffect)(() => {
              for (var e = i.split(','), a = [], r = 0; r < e.length; ++r)
                switch (e[r]) {
                  case 'Header':
                    a.push(s().createElement(N.Header, null));
                    break;
                  case 'Image':
                    a.push(s().createElement(N.Image, null));
                    break;
                  case 'Line':
                    a.push(s().createElement(N.Line, null));
                    break;
                  case 'Paragraph':
                    a.push(s().createElement(N.Paragraph, null));
                    break;
                  default:
                    break;
                }
              B(a);
            }, [i]),
            s().createElement(
              s().Fragment,
              null,
              a && s().createElement(F.Z, { src: u(), alt: 'Placeholder' }),
              !a &&
                s().createElement(
                  'div',
                  null,
                  s().createElement(
                    N,
                    { fluid: p, inverted: m },
                    s().createElement(N.Header, null, d),
                    s().createElement(N.Paragraph, null, k),
                  ),
                ),
            )
          );
        },
        b = Y;
    },
    87754: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
