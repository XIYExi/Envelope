(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [4589],
  {
    74589: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(93224),
        r = n(12924),
        l = n.n(r),
        c = n(94701),
        i = n.n(c),
        s = n(76763),
        o = n(73626),
        d = ['isTpl'],
        u = (e) => {
          var t = e.isTpl,
            n = (0, a.Z)(e, d),
            r = n.src,
            c = n.color,
            u = n.title,
            m = n.titleTextAlign,
            p = n.meta,
            h = n.metaTextAlign,
            f = n.desc,
            Z = n.descTextAlign,
            k = n.extra,
            E = n.fluid,
            g = n.raised;
          return l().createElement(
            l().Fragment,
            null,
            t && l().createElement(s.Z, { src: i(), alt: 'Card' }),
            !t &&
              l().createElement(
                'div',
                null,
                l().createElement(
                  o.Z,
                  { fluid: E, raised: g, color: c },
                  l().createElement(s.Z, {
                    src: r,
                    alt: 'Card-Image',
                    ui: !1,
                    wrapped: !0,
                  }),
                  l().createElement(
                    o.Z.Content,
                    null,
                    l().createElement(o.Z.Header, { textAlign: m }, u),
                    l().createElement(o.Z.Meta, { textAlign: h }, p),
                    l().createElement(o.Z.Description, { textAlign: Z }, f),
                    l().createElement(o.Z.Content, { extra: !0 }, k),
                  ),
                ),
              ),
          );
        };
      t['default'] = u;
    },
    73626: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return G;
        },
      });
      var a = n(22122),
        r = n(41788),
        l = n(86010),
        c = (n(55301), n(12924)),
        i = n.n(c),
        s = n(92063),
        o = n(28935),
        d = n(12519),
        u = n(92248),
        m = n(76763),
        p = n(93619);
      function h(e) {
        var t = e.children,
          n = e.className,
          r = e.content,
          c = e.textAlign,
          m = (0, l.default)((0, s.X4)(c), 'description', n),
          p = (0, o.Z)(h, e),
          f = (0, d.Z)(h, e);
        return i().createElement(
          f,
          (0, a.Z)({}, p, { className: m }),
          u.kK(t) ? r : t,
        );
      }
      (h.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'textAlign',
      ]),
        (h.propTypes = {});
      var f = h;
      function Z(e) {
        var t = e.children,
          n = e.className,
          r = e.content,
          c = e.textAlign,
          m = (0, l.default)((0, s.X4)(c), 'header', n),
          p = (0, o.Z)(Z, e),
          h = (0, d.Z)(Z, e);
        return i().createElement(
          h,
          (0, a.Z)({}, p, { className: m }),
          u.kK(t) ? r : t,
        );
      }
      (Z.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'textAlign',
      ]),
        (Z.propTypes = {});
      var k = Z;
      function E(e) {
        var t = e.children,
          n = e.className,
          r = e.content,
          c = e.textAlign,
          m = (0, l.default)((0, s.X4)(c), 'meta', n),
          p = (0, o.Z)(E, e),
          h = (0, d.Z)(E, e);
        return i().createElement(
          h,
          (0, a.Z)({}, p, { className: m }),
          u.kK(t) ? r : t,
        );
      }
      (E.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'textAlign',
      ]),
        (E.propTypes = {});
      var g = E;
      function x(e) {
        var t = e.children,
          n = e.className,
          r = e.content,
          c = e.description,
          m = e.extra,
          h = e.header,
          Z = e.meta,
          E = e.textAlign,
          N = (0, l.default)((0, s.lG)(m, 'extra'), (0, s.X4)(E), 'content', n),
          v = (0, o.Z)(x, e),
          C = (0, d.Z)(x, e);
        return u.kK(t)
          ? u.kK(r)
            ? i().createElement(
                C,
                (0, a.Z)({}, v, { className: N }),
                (0, p.Go)(
                  k,
                  function (e) {
                    return { content: e };
                  },
                  h,
                  { autoGenerateKey: !1 },
                ),
                (0, p.Go)(
                  g,
                  function (e) {
                    return { content: e };
                  },
                  Z,
                  { autoGenerateKey: !1 },
                ),
                (0, p.Go)(
                  f,
                  function (e) {
                    return { content: e };
                  },
                  c,
                  { autoGenerateKey: !1 },
                ),
              )
            : i().createElement(C, (0, a.Z)({}, v, { className: N }), r)
          : i().createElement(C, (0, a.Z)({}, v, { className: N }), t);
      }
      (x.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'description',
        'extra',
        'header',
        'meta',
        'textAlign',
      ]),
        (x.propTypes = {});
      var N = x,
        v = n(30014);
      function C(e) {
        var t = e.centered,
          n = e.children,
          r = e.className,
          c = e.content,
          m = e.doubling,
          p = e.items,
          h = e.itemsPerRow,
          f = e.stackable,
          Z = e.textAlign,
          k = (0, l.default)(
            'ui',
            (0, s.lG)(t, 'centered'),
            (0, s.lG)(m, 'doubling'),
            (0, s.lG)(f, 'stackable'),
            (0, s.X4)(Z),
            (0, s.H0)(h),
            'cards',
            r,
          ),
          E = (0, o.Z)(C, e),
          g = (0, d.Z)(C, e);
        if (!u.kK(n))
          return i().createElement(g, (0, a.Z)({}, E, { className: k }), n);
        if (!u.kK(c))
          return i().createElement(g, (0, a.Z)({}, E, { className: k }), c);
        var x = (0, v.Z)(p, function (e) {
          var t,
            n = null != (t = e.key) ? t : [e.header, e.description].join('-');
          return i().createElement(G, (0, a.Z)({ key: n }, e));
        });
        return i().createElement(g, (0, a.Z)({}, E, { className: k }), x);
      }
      (C.handledProps = [
        'as',
        'centered',
        'children',
        'className',
        'content',
        'doubling',
        'items',
        'itemsPerRow',
        'stackable',
        'textAlign',
      ]),
        (C.propTypes = {});
      var A = C,
        G = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, a = new Array(n), r = 0;
              r < n;
              r++
            )
              a[r] = arguments[r];
            return (
              (t = e.call.apply(e, [this].concat(a)) || this),
              (t.handleClick = function (e) {
                var n = t.props.onClick;
                n && n(e, t.props);
              }),
              t
            );
          }
          (0, r.Z)(t, e);
          var n = t.prototype;
          return (
            (n.render = function () {
              var e = this.props,
                n = e.centered,
                r = e.children,
                c = e.className,
                p = e.color,
                h = e.content,
                f = e.description,
                Z = e.extra,
                k = e.fluid,
                E = e.header,
                g = e.href,
                x = e.image,
                v = e.link,
                C = e.meta,
                A = e.onClick,
                G = e.raised,
                y = (0, l.default)(
                  'ui',
                  p,
                  (0, s.lG)(n, 'centered'),
                  (0, s.lG)(k, 'fluid'),
                  (0, s.lG)(v, 'link'),
                  (0, s.lG)(G, 'raised'),
                  'card',
                  c,
                ),
                K = (0, o.Z)(t, this.props),
                T = (0, d.Z)(t, this.props, function () {
                  if (A) return 'a';
                });
              return u.kK(r)
                ? u.kK(h)
                  ? i().createElement(
                      T,
                      (0, a.Z)({}, K, {
                        className: y,
                        href: g,
                        onClick: this.handleClick,
                      }),
                      m.Z.create(x, {
                        autoGenerateKey: !1,
                        defaultProps: { ui: !1, wrapped: !0 },
                      }),
                      (f || E || C) &&
                        i().createElement(N, {
                          description: f,
                          header: E,
                          meta: C,
                        }),
                      Z && i().createElement(N, { extra: !0 }, Z),
                    )
                  : i().createElement(
                      T,
                      (0, a.Z)({}, K, {
                        className: y,
                        href: g,
                        onClick: this.handleClick,
                      }),
                      h,
                    )
                : i().createElement(
                    T,
                    (0, a.Z)({}, K, {
                      className: y,
                      href: g,
                      onClick: this.handleClick,
                    }),
                    r,
                  );
            }),
            t
          );
        })(c.Component);
      (G.handledProps = [
        'as',
        'centered',
        'children',
        'className',
        'color',
        'content',
        'description',
        'extra',
        'fluid',
        'header',
        'href',
        'image',
        'link',
        'meta',
        'onClick',
        'raised',
      ]),
        (G.propTypes = {}),
        (G.Content = N),
        (G.Description = f),
        (G.Group = A),
        (G.Header = k),
        (G.Meta = g);
    },
  },
]);
