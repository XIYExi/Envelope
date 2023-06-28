(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8140, 1961],
  {
    48140: function (e, t, a) {
      'use strict';
      a.r(t);
      var n = a(91896),
        r = a(12924),
        c = a.n(r),
        l = a(93427),
        s = {
          divided: !0,
          unstackable: !1,
          dataSource: [
            {
              id: '12345',
              src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              imageSize: 'tiny',
              title: 'Item\u6807\u9898 1',
              meta: 'Meta-Data,\u5173\u4e8eItem 1\u5185\u5bb9\u7684\u7b80\u77ed\u63cf\u8ff0',
              desc: '\u8fd9\u662fItem\u9700\u8981\u6e32\u67d3\u7684\u5177\u4f53\u5185\u5bb9\uff0c\u867d\u7136\u662f\u957f\u6587\u672c\uff0c\u4f46\u662f\u4e0d\u5efa\u8bae\u8fc7\u957f\u3002',
              extra: '\u5176\u4f59\u4fe1\u606f',
            },
            {
              id: '12346',
              src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              imageSize: 'tiny',
              title: 'Item\u6807\u9898 2',
              meta: 'Meta-Data,\u5173\u4e8eItem 2\u5185\u5bb9\u7684\u7b80\u77ed\u63cf\u8ff0',
              desc: '\u8fd9\u662fItem\u9700\u8981\u6e32\u67d3\u7684\u5177\u4f53\u5185\u5bb9\uff0c\u867d\u7136\u662f\u957f\u6587\u672c\uff0c\u4f46\u662f\u4e0d\u5efa\u8bae\u8fc7\u957f\u3002',
              extra: '\u5176\u4f59\u4fe1\u606f',
            },
          ],
        };
      t['default'] = () =>
        c().createElement(l.default, (0, n.Z)({ isTpl: !1 }, s));
    },
    93427: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return v;
          },
        });
      var n = a(93224),
        r = a(12924),
        c = a.n(r),
        l = a(22122),
        s = a(86010),
        A = (a(55301), a(28935)),
        m = a(12519),
        i = a(92248),
        o = a(92063),
        d = a(93619);
      function u(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = (0, s.default)('header', a),
          o = (0, A.Z)(u, e),
          d = (0, m.Z)(u, e);
        return c().createElement(
          d,
          (0, l.Z)({}, o, { className: r }),
          i.kK(t) ? n : t,
        );
      }
      (u.handledProps = ['as', 'children', 'className', 'content']),
        (u.propTypes = {}),
        (u.create = (0, d.u5)(u, function (e) {
          return { content: e };
        }));
      var I = u;
      function g(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = (0, s.default)('description', a),
          o = (0, A.Z)(g, e),
          d = (0, m.Z)(g, e);
        return c().createElement(
          d,
          (0, l.Z)({}, o, { className: r }),
          i.kK(t) ? n : t,
        );
      }
      (g.handledProps = ['as', 'children', 'className', 'content']),
        (g.propTypes = {}),
        (g.create = (0, d.u5)(g, function (e) {
          return { content: e };
        }));
      var p = g;
      function C(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = (0, s.default)('extra', a),
          o = (0, A.Z)(C, e),
          d = (0, m.Z)(C, e);
        return c().createElement(
          d,
          (0, l.Z)({}, o, { className: r }),
          i.kK(t) ? n : t,
        );
      }
      (C.handledProps = ['as', 'children', 'className', 'content']),
        (C.propTypes = {}),
        (C.create = (0, d.u5)(C, function (e) {
          return { content: e };
        }));
      var E = C;
      function B(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = (0, s.default)('meta', a),
          o = (0, A.Z)(B, e),
          d = (0, m.Z)(B, e);
        return c().createElement(
          d,
          (0, l.Z)({}, o, { className: r }),
          i.kK(t) ? n : t,
        );
      }
      (B.handledProps = ['as', 'children', 'className', 'content']),
        (B.propTypes = {}),
        (B.create = (0, d.u5)(B, function (e) {
          return { content: e };
        }));
      var h = B;
      function Q(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.description,
          d = e.extra,
          u = e.header,
          g = e.meta,
          C = e.verticalAlign,
          B = (0, s.default)((0, o.Ok)(C), 'content', a),
          G = (0, A.Z)(Q, e),
          U = (0, m.Z)(Q, e);
        return i.kK(t)
          ? c().createElement(
              U,
              (0, l.Z)({}, G, { className: B }),
              I.create(u, { autoGenerateKey: !1 }),
              h.create(g, { autoGenerateKey: !1 }),
              p.create(r, { autoGenerateKey: !1 }),
              E.create(d, { autoGenerateKey: !1 }),
              n,
            )
          : c().createElement(U, (0, l.Z)({}, G, { className: B }), t);
      }
      (Q.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'description',
        'extra',
        'header',
        'meta',
        'verticalAlign',
      ]),
        (Q.propTypes = {});
      var G = Q,
        U = a(19756),
        k = a(30014);
      function f(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.divided,
          d = e.items,
          u = e.link,
          I = e.relaxed,
          g = e.unstackable,
          p = (0, s.default)(
            'ui',
            (0, o.lG)(r, 'divided'),
            (0, o.lG)(u, 'link'),
            (0, o.lG)(g, 'unstackable'),
            (0, o.sU)(I, 'relaxed'),
            'items',
            a,
          ),
          C = (0, A.Z)(f, e),
          E = (0, m.Z)(f, e);
        if (!i.kK(t))
          return c().createElement(E, (0, l.Z)({}, C, { className: p }), t);
        if (!i.kK(n))
          return c().createElement(E, (0, l.Z)({}, C, { className: p }), n);
        var B = (0, k.Z)(d, function (e) {
          var t = e.childKey,
            a = (0, U.Z)(e, ['childKey']),
            n =
              null != t
                ? t
                : [a.content, a.description, a.header, a.meta].join('-');
          return c().createElement(M, (0, l.Z)({}, a, { key: n }));
        });
        return c().createElement(E, (0, l.Z)({}, C, { className: p }), B);
      }
      (f.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'divided',
        'items',
        'link',
        'relaxed',
        'unstackable',
      ]),
        (f.propTypes = {});
      var Z = f,
        K = a(76763);
      function J(e) {
        var t = e.size,
          a = (0, A.Z)(J, e);
        return c().createElement(
          K.Z,
          (0, l.Z)({}, a, { size: t, ui: !!t, wrapped: !0 }),
        );
      }
      (J.handledProps = ['size']),
        (J.propTypes = {}),
        (J.create = (0, d.u5)(J, function (e) {
          return { src: e };
        }));
      var N = J;
      function F(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          r = e.description,
          o = e.extra,
          d = e.header,
          u = e.image,
          I = e.meta,
          g = (0, s.default)('item', a),
          p = (0, A.Z)(F, e),
          C = (0, m.Z)(F, e);
        return i.kK(t)
          ? c().createElement(
              C,
              (0, l.Z)({}, p, { className: g }),
              N.create(u, { autoGenerateKey: !1 }),
              c().createElement(G, {
                content: n,
                description: r,
                extra: o,
                header: d,
                meta: I,
              }),
            )
          : c().createElement(C, (0, l.Z)({}, p, { className: g }), t);
      }
      (F.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'description',
        'extra',
        'header',
        'image',
        'meta',
      ]),
        (F.Content = G),
        (F.Description = p),
        (F.Extra = E),
        (F.Group = Z),
        (F.Header = I),
        (F.Image = N),
        (F.Meta = h),
        (F.propTypes = {});
      var M = F,
        S = a(74086),
        y = a.n(S),
        b = ['isTpl'],
        D = (e) => {
          var t = e.isTpl,
            a = (0, n.Z)(e, b),
            r = a.dataSource,
            l = a.divided,
            s = a.unstackable;
          return c().createElement(
            c().Fragment,
            null,
            t && c().createElement(K.Z, { src: y(), alt: 'Item' }),
            !t &&
              c().createElement(
                'div',
                null,
                c().createElement(
                  M.Group,
                  { divided: l, unstackable: s },
                  r.map((e) => {
                    var t = e.src,
                      a = e.imageSize,
                      n = e.title,
                      r = e.meta,
                      l = e.desc,
                      s = e.extra;
                    return c().createElement(
                      M,
                      null,
                      0 !== t.length &&
                        c().createElement(M.Image, {
                          size: a,
                          src: t,
                          alt: 'Item-Image',
                        }),
                      c().createElement(
                        M.Content,
                        null,
                        c().createElement(M.Header, null, n),
                        c().createElement(M.Meta, null, r),
                        c().createElement(M.Description, null, l),
                        c().createElement(M.Extra, null, s),
                      ),
                    );
                  }),
                ),
              ),
          );
        },
        v = D;
    },
    74086: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
