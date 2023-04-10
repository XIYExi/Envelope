(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8357, 411],
  {
    78357: function (e, a, r) {
      'use strict';
      r.r(a);
      var n = r(91896),
        l = r(12924),
        t = r.n(l),
        s = r(70411),
        c = {
          renderHeader: 'Line,Line,Line',
          renderParagraph: 'Image,Line,,Line',
          fluid: !1,
          inverted: !1,
        };
      a['default'] = () =>
        t().createElement(s.default, (0, n.Z)({ isTpl: !1 }, c));
    },
    70411: function (e, a, r) {
      'use strict';
      r.r(a),
        r.d(a, {
          default: function () {
            return Y;
          },
        });
      var n = r(57337),
        l = r(93224),
        t = r(12924),
        s = r.n(t),
        c = r(87754),
        i = r.n(c),
        u = r(22122),
        p = r(86010),
        m = (r(55301), r(92063)),
        g = r(28935),
        d = r(12519),
        h = r(92248);
      function E(e) {
        var a = e.children,
          r = e.className,
          n = e.content,
          l = e.image,
          t = (0, p.default)((0, m.lG)(l, 'image'), 'header', r),
          c = (0, g.Z)(E, e),
          i = (0, d.Z)(E, e);
        return s().createElement(
          i,
          (0, u.Z)({}, c, { className: t }),
          h.kK(a) ? n : a,
        );
      }
      (E.handledProps = ['as', 'children', 'className', 'content', 'image']),
        (E.propTypes = {});
      var o = E;
      function A(e) {
        var a = e.className,
          r = e.square,
          n = e.rectangular,
          l = (0, p.default)(
            (0, m.lG)(r, 'square'),
            (0, m.lG)(n, 'rectangular'),
            'image',
            a,
          ),
          t = (0, g.Z)(A, e),
          c = (0, d.Z)(A, e);
        return s().createElement(c, (0, u.Z)({}, t, { className: l }));
      }
      (A.handledProps = ['as', 'className', 'rectangular', 'square']),
        (A.propTypes = {});
      var f = A;
      function k(e) {
        var a = e.className,
          r = e.length,
          n = (0, p.default)('line', r, a),
          l = (0, g.Z)(k, e),
          t = (0, d.Z)(k, e);
        return s().createElement(t, (0, u.Z)({}, l, { className: n }));
      }
      (k.handledProps = ['as', 'className', 'length']), (k.propTypes = {});
      var v = k;
      function B(e) {
        var a = e.children,
          r = e.className,
          n = e.content,
          l = (0, p.default)('paragraph', r),
          t = (0, g.Z)(B, e),
          c = (0, d.Z)(B, e);
        return s().createElement(
          c,
          (0, u.Z)({}, t, { className: l }),
          h.kK(a) ? n : a,
        );
      }
      (B.handledProps = ['as', 'children', 'className', 'content']),
        (B.propTypes = {});
      var I = B;
      function Q(e) {
        var a = e.children,
          r = e.className,
          n = e.content,
          l = e.fluid,
          t = e.inverted,
          c = (0, p.default)(
            'ui',
            (0, m.lG)(l, 'fluid'),
            (0, m.lG)(t, 'inverted'),
            'placeholder',
            r,
          ),
          i = (0, g.Z)(Q, e),
          E = (0, d.Z)(Q, e);
        return s().createElement(
          E,
          (0, u.Z)({}, i, { className: c }),
          h.kK(a) ? n : a,
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
        (Q.Image = f),
        (Q.Line = v),
        (Q.Paragraph = I);
      var N = Q,
        F = r(49282),
        L = ['isTpl'],
        G = (e) => {
          var a = e.isTpl,
            r = (0, l.Z)(e, L),
            c = r.renderHeader,
            u = r.renderParagraph,
            p = r.fluid,
            m = r.inverted,
            g = (0, t.useState)([s().createElement(s().Fragment, null)]),
            d = (0, n.Z)(g, 2),
            h = d[0],
            E = d[1],
            o = (0, t.useState)([s().createElement(s().Fragment, null)]),
            A = (0, n.Z)(o, 2),
            f = A[0],
            k = A[1];
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
              for (var e = u.split(','), a = [], r = 0; r < e.length; ++r)
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
              k(a);
            }, [u]),
            s().createElement(
              s().Fragment,
              null,
              a && s().createElement(F.Z, { src: i(), alt: 'Placeholder' }),
              !a &&
                s().createElement(
                  'div',
                  null,
                  s().createElement(
                    N,
                    { fluid: p, inverted: m },
                    s().createElement(N.Header, null, h),
                    s().createElement(N.Paragraph, null, f),
                  ),
                ),
            )
          );
        },
        Y = G;
    },
    87754: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
