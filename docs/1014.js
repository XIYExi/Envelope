(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1014, 4589],
  {
    41014: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(91896),
        r = n(12924),
        l = n.n(r),
        c = n(74589),
        i = {
          src: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
          color: 'grey',
          title: '\u5361\u7247\u6807\u9898',
          titleTextAlign: 'left',
          meta: '\u7b80\u5355\u63cf\u8ff0',
          metaTextAlign: 'left',
          desc: '\u5173\u4e8e\u5361\u7247\u5185\u5bb9\u7684\u8be6\u7ec6\u8868\u8ff0',
          descTextAlign: 'left',
          extra: '\u989d\u5916\u5185\u5bb9',
          fluid: !1,
          raised: !1,
        };
      t['default'] = () =>
        l().createElement(c.default, (0, a.Z)({ isTpl: !1 }, i));
    },
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
            f = n.metaTextAlign,
            h = n.desc,
            Z = n.descTextAlign,
            k = n.extra,
            x = n.fluid,
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
                  { fluid: x, raised: g, color: c },
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
                    l().createElement(o.Z.Meta, { textAlign: f }, p),
                    l().createElement(o.Z.Description, { textAlign: Z }, h),
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
          return y;
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
      function f(e) {
        var t = e.children,
          n = e.className,
          r = e.content,
          c = e.textAlign,
          m = (0, l.default)((0, s.X4)(c), 'description', n),
          p = (0, o.Z)(f, e),
          h = (0, d.Z)(f, e);
        return i().createElement(
          h,
          (0, a.Z)({}, p, { className: m }),
          u.kK(t) ? r : t,
        );
      }
      (f.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'textAlign',
      ]),
        (f.propTypes = {});
      var h = f;
      function Z(e) {
        var t = e.children,
          n = e.className,
          r = e.content,
          c = e.textAlign,
          m = (0, l.default)((0, s.X4)(c), 'header', n),
          p = (0, o.Z)(Z, e),
          f = (0, d.Z)(Z, e);
        return i().createElement(
          f,
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
      function x(e) {
        var t = e.children,
          n = e.className,
          r = e.content,
          c = e.textAlign,
          m = (0, l.default)((0, s.X4)(c), 'meta', n),
          p = (0, o.Z)(x, e),
          f = (0, d.Z)(x, e);
        return i().createElement(
          f,
          (0, a.Z)({}, p, { className: m }),
          u.kK(t) ? r : t,
        );
      }
      (x.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'textAlign',
      ]),
        (x.propTypes = {});
      var g = x;
      function E(e) {
        var t = e.children,
          n = e.className,
          r = e.content,
          c = e.description,
          m = e.extra,
          f = e.header,
          Z = e.meta,
          x = e.textAlign,
          N = (0, l.default)((0, s.lG)(m, 'extra'), (0, s.X4)(x), 'content', n),
          v = (0, o.Z)(E, e),
          A = (0, d.Z)(E, e);
        return u.kK(t)
          ? u.kK(r)
            ? i().createElement(
                A,
                (0, a.Z)({}, v, { className: N }),
                (0, p.Go)(
                  k,
                  function (e) {
                    return { content: e };
                  },
                  f,
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
                  h,
                  function (e) {
                    return { content: e };
                  },
                  c,
                  { autoGenerateKey: !1 },
                ),
              )
            : i().createElement(A, (0, a.Z)({}, v, { className: N }), r)
          : i().createElement(A, (0, a.Z)({}, v, { className: N }), t);
      }
      (E.handledProps = [
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
        (E.propTypes = {});
      var N = E,
        v = n(30014);
      function A(e) {
        var t = e.centered,
          n = e.children,
          r = e.className,
          c = e.content,
          m = e.doubling,
          p = e.items,
          f = e.itemsPerRow,
          h = e.stackable,
          Z = e.textAlign,
          k = (0, l.default)(
            'ui',
            (0, s.lG)(t, 'centered'),
            (0, s.lG)(m, 'doubling'),
            (0, s.lG)(h, 'stackable'),
            (0, s.X4)(Z),
            (0, s.H0)(f),
            'cards',
            r,
          ),
          x = (0, o.Z)(A, e),
          g = (0, d.Z)(A, e);
        if (!u.kK(n))
          return i().createElement(g, (0, a.Z)({}, x, { className: k }), n);
        if (!u.kK(c))
          return i().createElement(g, (0, a.Z)({}, x, { className: k }), c);
        var E = (0, v.Z)(p, function (e) {
          var t,
            n = null != (t = e.key) ? t : [e.header, e.description].join('-');
          return i().createElement(y, (0, a.Z)({ key: n }, e));
        });
        return i().createElement(g, (0, a.Z)({}, x, { className: k }), E);
      }
      (A.handledProps = [
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
        (A.propTypes = {});
      var C = A,
        y = (function (e) {
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
                f = e.content,
                h = e.description,
                Z = e.extra,
                k = e.fluid,
                x = e.header,
                g = e.href,
                E = e.image,
                v = e.link,
                A = e.meta,
                C = e.onClick,
                y = e.raised,
                G = (0, l.default)(
                  'ui',
                  p,
                  (0, s.lG)(n, 'centered'),
                  (0, s.lG)(k, 'fluid'),
                  (0, s.lG)(v, 'link'),
                  (0, s.lG)(y, 'raised'),
                  'card',
                  c,
                ),
                T = (0, o.Z)(t, this.props),
                K = (0, d.Z)(t, this.props, function () {
                  if (C) return 'a';
                });
              return u.kK(r)
                ? u.kK(f)
                  ? i().createElement(
                      K,
                      (0, a.Z)({}, T, {
                        className: G,
                        href: g,
                        onClick: this.handleClick,
                      }),
                      m.Z.create(E, {
                        autoGenerateKey: !1,
                        defaultProps: { ui: !1, wrapped: !0 },
                      }),
                      (h || x || A) &&
                        i().createElement(N, {
                          description: h,
                          header: x,
                          meta: A,
                        }),
                      Z && i().createElement(N, { extra: !0 }, Z),
                    )
                  : i().createElement(
                      K,
                      (0, a.Z)({}, T, {
                        className: G,
                        href: g,
                        onClick: this.handleClick,
                      }),
                      f,
                    )
                : i().createElement(
                    K,
                    (0, a.Z)({}, T, {
                      className: G,
                      href: g,
                      onClick: this.handleClick,
                    }),
                    r,
                  );
            }),
            t
          );
        })(c.Component);
      (y.handledProps = [
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
        (y.propTypes = {}),
        (y.Content = N),
        (y.Description = h),
        (y.Group = C),
        (y.Header = k),
        (y.Meta = g);
    },
  },
]);
