(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [4117, 6464],
  {
    14117: function (e, t, a) {
      'use strict';
      a.r(t);
      var n = a(91896),
        r = a(12924),
        s = a.n(r),
        l = a(26464),
        c = {
          size: 'small',
          dataSource: [
            {
              id: '100',
              src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              user: 'Elliot Fu',
              action: 'added you as a friend',
              date: '1 Hour Ago',
              like: '4 Likes',
              extraText: '',
              extraImages: '',
              icon: 'like',
            },
            {
              id: '101',
              src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              user: 'Cayon',
              action: 'posted on his page',
              date: '1 Hour Ago',
              like: '4 Likes',
              extraText:
                "Ours is a life of constant reruns. We're always circling back to where\n          we'd we started, then starting all over again. Even if we don't run\n          extra laps that day, we surely will come back for more of the same\n          another day soon.",
              extraImages: '',
              icon: 'like',
            },
            {
              id: '102',
              src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              user: 'Xiye',
              action: 'Publish a group of pictures',
              date: '1 Hour Ago',
              like: '14 Likes',
              extraText: 'Pictures is beautiful~',
              extraImages:
                'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              icon: 'like',
            },
            {
              id: '102',
              src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              user: 'Xiye',
              action: 'added 2 new illustrations',
              date: '1 Hour Ago',
              like: '14 Likes',
              extraText:
                "Ours is a life of constant reruns. We're always circling back to where we'd we started.",
              extraImages:
                'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg-https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              icon: 'like',
            },
          ],
        };
      t['default'] = () =>
        s().createElement(l.default, (0, n.Z)({ isTpl: !1 }, c));
    },
    26464: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return T;
          },
        });
      var n = a(93224),
        r = a(12924),
        s = a.n(r),
        l = a(74086),
        c = a.n(l),
        o = a(19756),
        m = a(22122),
        i = a(30014),
        u = a(86010),
        A = (a(55301), a(28935)),
        p = a(12519),
        g = a(92248),
        d = a(93619);
      function E(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = (0, u.default)('date', a),
          l = (0, A.Z)(E, e),
          c = (0, p.Z)(E, e);
        return s().createElement(
          c,
          (0, m.Z)({}, l, { className: r }),
          g.kK(t) ? n : t,
        );
      }
      (E.handledProps = ['as', 'children', 'className', 'content']),
        (E.propTypes = {});
      var I = E,
        h = a(92063);
      function C(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.images,
          l = e.text,
          c = (0, u.default)(
            (0, h.lG)(r, 'images'),
            (0, h.lG)(n || l, 'text'),
            'extra',
            a,
          ),
          o = (0, A.Z)(C, e),
          E = (0, p.Z)(C, e);
        if (!g.kK(t))
          return s().createElement(E, (0, m.Z)({}, o, { className: c }), t);
        var I = (0, i.Z)(r, function (e, t) {
          var a = [t, e].join('-');
          return (0, d.Ff)(e, { key: a });
        });
        return s().createElement(E, (0, m.Z)({}, o, { className: c }), n, I);
      }
      (C.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'images',
        'text',
      ]),
        (C.propTypes = {});
      var f = C,
        G = a(65382);
      function B(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.icon,
          l = (0, u.default)('like', a),
          c = (0, A.Z)(B, e),
          o = (0, p.Z)(B, e);
        return g.kK(t)
          ? s().createElement(
              o,
              (0, m.Z)({}, c, { className: l }),
              G.Z.create(r, { autoGenerateKey: !1 }),
              n,
            )
          : s().createElement(o, (0, m.Z)({}, c, { className: l }), t);
      }
      (B.handledProps = ['as', 'children', 'className', 'content', 'icon']),
        (B.defaultProps = { as: 'a' }),
        (B.propTypes = {});
      var k = B;
      function x(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.like,
          l = (0, u.default)('meta', a),
          c = (0, A.Z)(x, e),
          o = (0, p.Z)(x, e);
        return g.kK(t)
          ? s().createElement(
              o,
              (0, m.Z)({}, c, { className: l }),
              (0, d.Go)(
                k,
                function (e) {
                  return { content: e };
                },
                r,
                { autoGenerateKey: !1 },
              ),
              n,
            )
          : s().createElement(o, (0, m.Z)({}, c, { className: l }), t);
      }
      (x.handledProps = ['as', 'children', 'className', 'content', 'like']),
        (x.propTypes = {});
      var y = x;
      function Q(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = (0, u.default)('user', a),
          l = (0, A.Z)(Q, e),
          c = (0, p.Z)(Q, e);
        return s().createElement(
          c,
          (0, m.Z)({}, l, { className: r }),
          g.kK(t) ? n : t,
        );
      }
      (Q.handledProps = ['as', 'children', 'className', 'content']),
        (Q.propTypes = {}),
        (Q.defaultProps = { as: 'a' });
      var Z = Q;
      function U(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.date,
          l = e.user,
          c = (0, u.default)('summary', a),
          o = (0, A.Z)(U, e),
          i = (0, p.Z)(U, e);
        return g.kK(t)
          ? s().createElement(
              i,
              (0, m.Z)({}, o, { className: c }),
              (0, d.Go)(
                Z,
                function (e) {
                  return { content: e };
                },
                l,
                { autoGenerateKey: !1 },
              ),
              n && ' ',
              n,
              n && ' ',
              (0, d.Go)(
                I,
                function (e) {
                  return { content: e };
                },
                r,
                { autoGenerateKey: !1 },
              ),
            )
          : s().createElement(i, (0, m.Z)({}, o, { className: c }), t);
      }
      (U.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'date',
        'user',
      ]),
        (U.propTypes = {});
      var N = U;
      function K(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.extraImages,
          l = e.extraText,
          c = e.date,
          o = e.meta,
          i = e.summary,
          E = (0, u.default)('content', a),
          h = (0, A.Z)(K, e),
          C = (0, p.Z)(K, e);
        return g.kK(t)
          ? s().createElement(
              C,
              (0, m.Z)({}, h, { className: E }),
              (0, d.Go)(
                I,
                function (e) {
                  return { content: e };
                },
                c,
                { autoGenerateKey: !1 },
              ),
              (0, d.Go)(
                N,
                function (e) {
                  return { content: e };
                },
                i,
                { autoGenerateKey: !1 },
              ),
              n,
              (0, d.Go)(
                f,
                function (e) {
                  return { text: !0, content: e };
                },
                l,
                { autoGenerateKey: !1 },
              ),
              (0, d.Go)(
                f,
                function (e) {
                  return { images: e };
                },
                r,
                { autoGenerateKey: !1 },
              ),
              (0, d.Go)(
                y,
                function (e) {
                  return { content: e };
                },
                o,
                { autoGenerateKey: !1 },
              ),
            )
          : s().createElement(C, (0, m.Z)({}, h, { className: E }), t);
      }
      (K.handledProps = [
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
        (K.propTypes = {});
      var F = K;
      function J(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.icon,
          l = e.image,
          c = (0, u.default)('label', a),
          o = (0, A.Z)(J, e),
          i = (0, p.Z)(J, e);
        return g.kK(t)
          ? s().createElement(
              i,
              (0, m.Z)({}, o, { className: c }),
              n,
              G.Z.create(r, { autoGenerateKey: !1 }),
              (0, d.Ff)(l),
            )
          : s().createElement(i, (0, m.Z)({}, o, { className: c }), t);
      }
      (J.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'icon',
        'image',
      ]),
        (J.propTypes = {});
      var b = J;
      function v(e) {
        var t = e.content,
          a = e.children,
          n = e.className,
          r = e.date,
          l = e.extraImages,
          c = e.extraText,
          o = e.image,
          i = e.icon,
          g = e.meta,
          E = e.summary,
          I = (0, u.default)('event', n),
          h = (0, A.Z)(v, e),
          C = (0, p.Z)(v, e),
          f = t || r || l || c || g || E,
          G = {
            content: t,
            date: r,
            extraImages: l,
            extraText: c,
            meta: g,
            summary: E,
          };
        return s().createElement(
          C,
          (0, m.Z)({}, h, { className: I }),
          (0, d.Go)(
            b,
            function (e) {
              return { icon: e };
            },
            i,
            { autoGenerateKey: !1 },
          ),
          (0, d.Go)(
            b,
            function (e) {
              return { image: e };
            },
            o,
            { autoGenerateKey: !1 },
          ),
          f && s().createElement(F, G),
          a,
        );
      }
      (v.handledProps = [
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
        (v.propTypes = {});
      var w = v;
      function M(e) {
        var t = e.children,
          a = e.className,
          n = e.events,
          r = e.size,
          l = (0, u.default)('ui', r, 'feed', a),
          c = (0, A.Z)(M, e),
          d = (0, p.Z)(M, e);
        if (!g.kK(t))
          return s().createElement(d, (0, m.Z)({}, c, { className: l }), t);
        var E = (0, i.Z)(n, function (e) {
          var t = e.childKey,
            a = e.date,
            n = e.meta,
            r = e.summary,
            l = (0, o.Z)(e, ['childKey', 'date', 'meta', 'summary']),
            c = null != t ? t : [a, n, r].join('-');
          return s().createElement(
            w,
            (0, m.Z)({ date: a, key: c, meta: n, summary: r }, l),
          );
        });
        return s().createElement(d, (0, m.Z)({}, c, { className: l }), E);
      }
      (M.handledProps = ['as', 'children', 'className', 'events', 'size']),
        (M.propTypes = {}),
        (M.Content = F),
        (M.Date = I),
        (M.Event = w),
        (M.Extra = f),
        (M.Label = b),
        (M.Like = k),
        (M.Meta = y),
        (M.Summary = N),
        (M.User = Z);
      var S = M,
        X = a(49282),
        D = ['isTpl'],
        R = (e) => {
          var t = e.isTpl,
            a = (0, n.Z)(e, D),
            r = a.size,
            l = a.dataSource,
            o = (e) => {
              var t = e.split('-'),
                a = [];
              return (
                t.map((e, t) => {
                  var n = s().createElement(
                    'a',
                    null,
                    s().createElement('img', { src: e }),
                  );
                  a.push(n);
                }),
                s().createElement(s().Fragment, null, a)
              );
            };
          return s().createElement(
            s().Fragment,
            null,
            t && s().createElement(X.Z, { src: c(), alt: 'Feed' }),
            !t &&
              s().createElement(
                'div',
                null,
                s().createElement(
                  S,
                  { size: r },
                  l.map((e, t) => {
                    var a = e.src,
                      n = e.user,
                      r = e.action,
                      l = e.date,
                      c = e.like,
                      m = e.extraText,
                      i = e.extraImages,
                      u = e.icon,
                      A = void 0 === u ? 'like' : u;
                    return s().createElement(
                      S.Event,
                      { key: t },
                      s().createElement(S.Label, { image: a }),
                      s().createElement(
                        S.Content,
                        null,
                        s().createElement(
                          S.Summary,
                          null,
                          s().createElement(S.User, null, n),
                          ' ',
                          r,
                          s().createElement(S.Date, null, l),
                        ),
                        0 !== m.length &&
                          s().createElement(S.Extra, { text: !0 }, m),
                        0 !== i.length &&
                          s().createElement(S.Extra, { images: !0 }, o(i)),
                        s().createElement(
                          S.Meta,
                          null,
                          s().createElement(
                            S.Like,
                            null,
                            s().createElement(G.Z, { name: A }),
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
        T = R;
    },
    74086: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
