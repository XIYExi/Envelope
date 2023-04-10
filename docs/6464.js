(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [6464],
  {
    26464: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return P;
          },
        });
      var n = a(93224),
        r = a(12924),
        l = a.n(r),
        s = a(74086),
        c = a.n(s),
        m = a(19756),
        o = a(22122),
        u = a(30014),
        A = a(86010),
        i = (a(55301), a(28935)),
        g = a(12519),
        E = a(92248),
        d = a(93619);
      function I(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = (0, A.default)('date', a),
          s = (0, i.Z)(I, e),
          c = (0, g.Z)(I, e);
        return l().createElement(
          c,
          (0, o.Z)({}, s, { className: r }),
          E.kK(t) ? n : t,
        );
      }
      (I.handledProps = ['as', 'children', 'className', 'content']),
        (I.propTypes = {});
      var C = I,
        p = a(92063);
      function G(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.images,
          s = e.text,
          c = (0, A.default)(
            (0, p.lG)(r, 'images'),
            (0, p.lG)(n || s, 'text'),
            'extra',
            a,
          ),
          m = (0, i.Z)(G, e),
          I = (0, g.Z)(G, e);
        if (!E.kK(t))
          return l().createElement(I, (0, o.Z)({}, m, { className: c }), t);
        var C = (0, u.Z)(r, function (e, t) {
          var a = [t, e].join('-');
          return (0, d.Ff)(e, { key: a });
        });
        return l().createElement(I, (0, o.Z)({}, m, { className: c }), n, C);
      }
      (G.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'images',
        'text',
      ]),
        (G.propTypes = {});
      var B = G,
        h = a(65382);
      function Q(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.icon,
          s = (0, A.default)('like', a),
          c = (0, i.Z)(Q, e),
          m = (0, g.Z)(Q, e);
        return E.kK(t)
          ? l().createElement(
              m,
              (0, o.Z)({}, c, { className: s }),
              h.Z.create(r, { autoGenerateKey: !1 }),
              n,
            )
          : l().createElement(m, (0, o.Z)({}, c, { className: s }), t);
      }
      (Q.handledProps = ['as', 'children', 'className', 'content', 'icon']),
        (Q.defaultProps = { as: 'a' }),
        (Q.propTypes = {});
      var f = Q;
      function Z(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.like,
          s = (0, A.default)('meta', a),
          c = (0, i.Z)(Z, e),
          m = (0, g.Z)(Z, e);
        return E.kK(t)
          ? l().createElement(
              m,
              (0, o.Z)({}, c, { className: s }),
              (0, d.Go)(
                f,
                function (e) {
                  return { content: e };
                },
                r,
                { autoGenerateKey: !1 },
              ),
              n,
            )
          : l().createElement(m, (0, o.Z)({}, c, { className: s }), t);
      }
      (Z.handledProps = ['as', 'children', 'className', 'content', 'like']),
        (Z.propTypes = {});
      var U = Z;
      function N(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = (0, A.default)('user', a),
          s = (0, i.Z)(N, e),
          c = (0, g.Z)(N, e);
        return l().createElement(
          c,
          (0, o.Z)({}, s, { className: r }),
          E.kK(t) ? n : t,
        );
      }
      (N.handledProps = ['as', 'children', 'className', 'content']),
        (N.propTypes = {}),
        (N.defaultProps = { as: 'a' });
      var y = N;
      function K(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.date,
          s = e.user,
          c = (0, A.default)('summary', a),
          m = (0, i.Z)(K, e),
          u = (0, g.Z)(K, e);
        return E.kK(t)
          ? l().createElement(
              u,
              (0, o.Z)({}, m, { className: c }),
              (0, d.Go)(
                y,
                function (e) {
                  return { content: e };
                },
                s,
                { autoGenerateKey: !1 },
              ),
              n && ' ',
              n,
              n && ' ',
              (0, d.Go)(
                C,
                function (e) {
                  return { content: e };
                },
                r,
                { autoGenerateKey: !1 },
              ),
            )
          : l().createElement(u, (0, o.Z)({}, m, { className: c }), t);
      }
      (K.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'date',
        'user',
      ]),
        (K.propTypes = {});
      var k = K;
      function F(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.extraImages,
          s = e.extraText,
          c = e.date,
          m = e.meta,
          u = e.summary,
          I = (0, A.default)('content', a),
          p = (0, i.Z)(F, e),
          G = (0, g.Z)(F, e);
        return E.kK(t)
          ? l().createElement(
              G,
              (0, o.Z)({}, p, { className: I }),
              (0, d.Go)(
                C,
                function (e) {
                  return { content: e };
                },
                c,
                { autoGenerateKey: !1 },
              ),
              (0, d.Go)(
                k,
                function (e) {
                  return { content: e };
                },
                u,
                { autoGenerateKey: !1 },
              ),
              n,
              (0, d.Go)(
                B,
                function (e) {
                  return { text: !0, content: e };
                },
                s,
                { autoGenerateKey: !1 },
              ),
              (0, d.Go)(
                B,
                function (e) {
                  return { images: e };
                },
                r,
                { autoGenerateKey: !1 },
              ),
              (0, d.Go)(
                U,
                function (e) {
                  return { content: e };
                },
                m,
                { autoGenerateKey: !1 },
              ),
            )
          : l().createElement(G, (0, o.Z)({}, p, { className: I }), t);
      }
      (F.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'date',
        'extraImages',
        'extraText',
        'meta',
        'summary',
      ]),
        (F.propTypes = {});
      var J = F;
      function v(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.icon,
          s = e.image,
          c = (0, A.default)('label', a),
          m = (0, i.Z)(v, e),
          u = (0, g.Z)(v, e);
        return E.kK(t)
          ? l().createElement(
              u,
              (0, o.Z)({}, m, { className: c }),
              n,
              h.Z.create(r, { autoGenerateKey: !1 }),
              (0, d.Ff)(s),
            )
          : l().createElement(u, (0, o.Z)({}, m, { className: c }), t);
      }
      (v.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'icon',
        'image',
      ]),
        (v.propTypes = {});
      var M = v;
      function S(e) {
        var t = e.content,
          a = e.children,
          n = e.className,
          r = e.date,
          s = e.extraImages,
          c = e.extraText,
          m = e.image,
          u = e.icon,
          E = e.meta,
          I = e.summary,
          C = (0, A.default)('event', n),
          p = (0, i.Z)(S, e),
          G = (0, g.Z)(S, e),
          B = t || r || s || c || E || I,
          h = {
            content: t,
            date: r,
            extraImages: s,
            extraText: c,
            meta: E,
            summary: I,
          };
        return l().createElement(
          G,
          (0, o.Z)({}, p, { className: C }),
          (0, d.Go)(
            M,
            function (e) {
              return { icon: e };
            },
            u,
            { autoGenerateKey: !1 },
          ),
          (0, d.Go)(
            M,
            function (e) {
              return { image: e };
            },
            m,
            { autoGenerateKey: !1 },
          ),
          B && l().createElement(J, h),
          a,
        );
      }
      (S.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'date',
        'extraImages',
        'extraText',
        'icon',
        'image',
        'meta',
        'summary',
      ]),
        (S.propTypes = {});
      var x = S;
      function D(e) {
        var t = e.children,
          a = e.className,
          n = e.events,
          r = e.size,
          s = (0, A.default)('ui', r, 'feed', a),
          c = (0, i.Z)(D, e),
          d = (0, g.Z)(D, e);
        if (!E.kK(t))
          return l().createElement(d, (0, o.Z)({}, c, { className: s }), t);
        var I = (0, u.Z)(n, function (e) {
          var t = e.childKey,
            a = e.date,
            n = e.meta,
            r = e.summary,
            s = (0, m.Z)(e, ['childKey', 'date', 'meta', 'summary']),
            c = null != t ? t : [a, n, r].join('-');
          return l().createElement(
            x,
            (0, o.Z)({ date: a, key: c, meta: n, summary: r }, s),
          );
        });
        return l().createElement(d, (0, o.Z)({}, c, { className: s }), I);
      }
      (D.handledProps = ['as', 'children', 'className', 'events', 'size']),
        (D.propTypes = {}),
        (D.Content = J),
        (D.Date = C),
        (D.Event = x),
        (D.Extra = B),
        (D.Label = M),
        (D.Like = f),
        (D.Meta = U),
        (D.Summary = k),
        (D.User = y);
      var X = D,
        R = a(49282),
        b = ['isTpl'],
        w = (e) => {
          var t = e.isTpl,
            a = (0, n.Z)(e, b),
            r = a.size,
            s = a.dataSource,
            m = (e) => {
              var t = e.split('-'),
                a = [];
              return (
                t.map((e, t) => {
                  var n = l().createElement(
                    'a',
                    null,
                    l().createElement('img', { src: e }),
                  );
                  a.push(n);
                }),
                l().createElement(l().Fragment, null, a)
              );
            };
          return l().createElement(
            l().Fragment,
            null,
            t && l().createElement(R.Z, { src: c(), alt: 'Feed' }),
            !t &&
              l().createElement(
                'div',
                null,
                l().createElement(
                  X,
                  { size: r },
                  s.map((e, t) => {
                    var a = e.src,
                      n = e.user,
                      r = e.action,
                      s = e.date,
                      c = e.like,
                      o = e.extraText,
                      u = e.extraImages,
                      A = e.icon,
                      i = void 0 === A ? 'like' : A;
                    return l().createElement(
                      X.Event,
                      { key: t },
                      l().createElement(X.Label, { image: a }),
                      l().createElement(
                        X.Content,
                        null,
                        l().createElement(
                          X.Summary,
                          null,
                          l().createElement(X.User, null, n),
                          ' ',
                          r,
                          l().createElement(X.Date, null, s),
                        ),
                        0 !== o.length &&
                          l().createElement(X.Extra, { text: !0 }, o),
                        0 !== u.length &&
                          l().createElement(X.Extra, { images: !0 }, m(u)),
                        l().createElement(
                          X.Meta,
                          null,
                          l().createElement(
                            X.Like,
                            null,
                            l().createElement(h.Z, { name: i }),
                            c,
                          ),
                        ),
                      ),
                    );
                  }),
                ),
              ),
          );
        },
        P = w;
    },
    74086: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
