(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [681],
  {
    14309: function (e, t, a) {
      'use strict';
      a.d(t, {
        Z: function () {
          return G;
        },
      });
      var l = a(22122),
        r = a(86010),
        n = (a(55301), a(12924)),
        c = a.n(n),
        d = a(92063),
        i = a(28935),
        s = a(12519),
        o = a(93619);
      function u(e) {
        var t = e.children,
          a = e.className,
          n = e.computer,
          o = e.color,
          m = e.floated,
          p = e.largeScreen,
          h = e.mobile,
          v = e.only,
          G = e.stretched,
          f = e.tablet,
          g = e.textAlign,
          Z = e.verticalAlign,
          b = e.widescreen,
          N = e.width,
          k = (0, r.default)(
            o,
            (0, d.lG)(G, 'stretched'),
            (0, d.MR)(v, 'only'),
            (0, d.X4)(g),
            (0, d.cD)(m, 'floated'),
            (0, d.Ok)(Z),
            (0, d.H0)(n, 'wide computer'),
            (0, d.H0)(p, 'wide large screen'),
            (0, d.H0)(h, 'wide mobile'),
            (0, d.H0)(f, 'wide tablet'),
            (0, d.H0)(b, 'wide widescreen'),
            (0, d.H0)(N, 'wide'),
            'column',
            a,
          ),
          y = (0, i.Z)(u, e),
          A = (0, s.Z)(u, e);
        return c().createElement(A, (0, l.Z)({}, y, { className: k }), t);
      }
      (u.handledProps = [
        'as',
        'children',
        'className',
        'color',
        'computer',
        'floated',
        'largeScreen',
        'mobile',
        'only',
        'stretched',
        'tablet',
        'textAlign',
        'verticalAlign',
        'widescreen',
        'width',
      ]),
        (u.propTypes = {}),
        (u.create = (0, o.u5)(u, function (e) {
          return { children: e };
        }));
      var m = u;
      function p(e) {
        var t = e.centered,
          a = e.children,
          n = e.className,
          o = e.color,
          u = e.columns,
          m = e.divided,
          h = e.only,
          v = e.reversed,
          G = e.stretched,
          f = e.textAlign,
          g = e.verticalAlign,
          Z = (0, r.default)(
            o,
            (0, d.lG)(t, 'centered'),
            (0, d.lG)(m, 'divided'),
            (0, d.lG)(G, 'stretched'),
            (0, d.MR)(h, 'only'),
            (0, d.MR)(v, 'reversed'),
            (0, d.X4)(f),
            (0, d.Ok)(g),
            (0, d.H0)(u, 'column', !0),
            'row',
            n,
          ),
          b = (0, i.Z)(p, e),
          N = (0, s.Z)(p, e);
        return c().createElement(N, (0, l.Z)({}, b, { className: Z }), a);
      }
      (p.handledProps = [
        'as',
        'centered',
        'children',
        'className',
        'color',
        'columns',
        'divided',
        'only',
        'reversed',
        'stretched',
        'textAlign',
        'verticalAlign',
      ]),
        (p.propTypes = {});
      var h = p;
      function v(e) {
        var t = e.celled,
          a = e.centered,
          n = e.children,
          o = e.className,
          u = e.columns,
          m = e.container,
          p = e.divided,
          h = e.doubling,
          G = e.inverted,
          f = e.padded,
          g = e.relaxed,
          Z = e.reversed,
          b = e.stackable,
          N = e.stretched,
          k = e.textAlign,
          y = e.verticalAlign,
          A = (0, r.default)(
            'ui',
            (0, d.lG)(a, 'centered'),
            (0, d.lG)(m, 'container'),
            (0, d.lG)(h, 'doubling'),
            (0, d.lG)(G, 'inverted'),
            (0, d.lG)(b, 'stackable'),
            (0, d.lG)(N, 'stretched'),
            (0, d.sU)(t, 'celled'),
            (0, d.sU)(p, 'divided'),
            (0, d.sU)(f, 'padded'),
            (0, d.sU)(g, 'relaxed'),
            (0, d.MR)(Z, 'reversed'),
            (0, d.X4)(k),
            (0, d.Ok)(y),
            (0, d.H0)(u, 'column', !0),
            'grid',
            o,
          ),
          w = (0, i.Z)(v, e),
          x = (0, s.Z)(v, e);
        return c().createElement(x, (0, l.Z)({}, w, { className: A }), n);
      }
      (v.handledProps = [
        'as',
        'celled',
        'centered',
        'children',
        'className',
        'columns',
        'container',
        'divided',
        'doubling',
        'inverted',
        'padded',
        'relaxed',
        'reversed',
        'stackable',
        'stretched',
        'textAlign',
        'verticalAlign',
      ]),
        (v.Column = m),
        (v.Row = h),
        (v.propTypes = {});
      var G = v;
    },
    60345: function (e, t, a) {
      'use strict';
      var l = a(22122),
        r = a(86010),
        n = (a(55301), a(12924)),
        c = a.n(n),
        d = a(92063),
        i = a(28935),
        s = a(12519),
        o = a(92248);
      function u(e) {
        var t = e.children,
          a = e.className,
          n = e.clearing,
          m = e.content,
          p = e.fitted,
          h = e.hidden,
          v = e.horizontal,
          G = e.inverted,
          f = e.section,
          g = e.vertical,
          Z = (0, r.default)(
            'ui',
            (0, d.lG)(n, 'clearing'),
            (0, d.lG)(p, 'fitted'),
            (0, d.lG)(h, 'hidden'),
            (0, d.lG)(v, 'horizontal'),
            (0, d.lG)(G, 'inverted'),
            (0, d.lG)(f, 'section'),
            (0, d.lG)(g, 'vertical'),
            'divider',
            a,
          ),
          b = (0, i.Z)(u, e),
          N = (0, s.Z)(u, e);
        return c().createElement(
          N,
          (0, l.Z)({}, b, { className: Z }),
          o.kK(t) ? m : t,
        );
      }
      (u.handledProps = [
        'as',
        'children',
        'className',
        'clearing',
        'content',
        'fitted',
        'hidden',
        'horizontal',
        'inverted',
        'section',
        'vertical',
      ]),
        (u.propTypes = {}),
        (t['Z'] = u);
    },
    39445: function (e, t, a) {
      'use strict';
      a.d(t, {
        Z: function () {
          return Z;
        },
      });
      var l = a(22122),
        r = a(86010),
        n = (a(55301), a(12924)),
        c = a.n(n),
        d = a(92063),
        i = a(28935),
        s = a(12519),
        o = a(92248),
        u = a(65382),
        m = a(76763),
        p = a(93619);
      function h(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          d = (0, r.default)('sub header', a),
          u = (0, i.Z)(h, e),
          m = (0, s.Z)(h, e);
        return c().createElement(
          m,
          (0, l.Z)({}, u, { className: d }),
          o.kK(t) ? n : t,
        );
      }
      (h.handledProps = ['as', 'children', 'className', 'content']),
        (h.propTypes = {}),
        (h.create = (0, p.u5)(h, function (e) {
          return { content: e };
        }));
      var v = h;
      function G(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          d = (0, r.default)('content', a),
          u = (0, i.Z)(G, e),
          m = (0, s.Z)(G, e);
        return c().createElement(
          m,
          (0, l.Z)({}, u, { className: d }),
          o.kK(t) ? n : t,
        );
      }
      (G.handledProps = ['as', 'children', 'className', 'content']),
        (G.propTypes = {});
      var f = G;
      function g(e) {
        var t = e.attached,
          a = e.block,
          n = e.children,
          p = e.className,
          h = e.color,
          G = e.content,
          Z = e.disabled,
          b = e.dividing,
          N = e.floated,
          k = e.icon,
          y = e.image,
          A = e.inverted,
          w = e.size,
          x = e.sub,
          E = e.subheader,
          z = e.textAlign,
          K = (0, r.default)(
            'ui',
            h,
            w,
            (0, d.lG)(a, 'block'),
            (0, d.lG)(Z, 'disabled'),
            (0, d.lG)(b, 'dividing'),
            (0, d.cD)(N, 'floated'),
            (0, d.lG)(!0 === k, 'icon'),
            (0, d.lG)(!0 === y, 'image'),
            (0, d.lG)(A, 'inverted'),
            (0, d.lG)(x, 'sub'),
            (0, d.sU)(t, 'attached'),
            (0, d.X4)(z),
            'header',
            p,
          ),
          P = (0, i.Z)(g, e),
          T = (0, s.Z)(g, e);
        if (!o.kK(n))
          return c().createElement(T, (0, l.Z)({}, P, { className: K }), n);
        var H = u.Z.create(k, { autoGenerateKey: !1 }),
          U = m.Z.create(y, { autoGenerateKey: !1 }),
          R = v.create(E, { autoGenerateKey: !1 });
        return H || U
          ? c().createElement(
              T,
              (0, l.Z)({}, P, { className: K }),
              H || U,
              (G || R) && c().createElement(f, null, G, R),
            )
          : c().createElement(T, (0, l.Z)({}, P, { className: K }), G, R);
      }
      (g.handledProps = [
        'as',
        'attached',
        'block',
        'children',
        'className',
        'color',
        'content',
        'disabled',
        'dividing',
        'floated',
        'icon',
        'image',
        'inverted',
        'size',
        'sub',
        'subheader',
        'textAlign',
      ]),
        (g.propTypes = {}),
        (g.Content = f),
        (g.Subheader = v);
      var Z = g;
    },
    35766: function (e, t, a) {
      'use strict';
      a.d(t, {
        Z: function () {
          return G;
        },
      });
      var l = a(22122),
        r = a(86010),
        n = (a(55301), a(12924)),
        c = a.n(n),
        d = a(92063),
        i = a(28935),
        s = a(12519),
        o = a(92248);
      function u(e) {
        var t = e.children,
          a = e.className,
          n = e.compact,
          m = e.content,
          p = e.horizontal,
          h = e.piled,
          v = e.raised,
          G = e.size,
          f = e.stacked,
          g = (0, r.default)(
            'ui',
            G,
            (0, d.lG)(n, 'compact'),
            (0, d.lG)(p, 'horizontal'),
            (0, d.lG)(h, 'piled'),
            (0, d.lG)(v, 'raised'),
            (0, d.lG)(f, 'stacked'),
            'segments',
            a,
          ),
          Z = (0, i.Z)(u, e),
          b = (0, s.Z)(u, e);
        return c().createElement(
          b,
          (0, l.Z)({}, Z, { className: g }),
          o.kK(t) ? m : t,
        );
      }
      (u.handledProps = [
        'as',
        'children',
        'className',
        'compact',
        'content',
        'horizontal',
        'piled',
        'raised',
        'size',
        'stacked',
      ]),
        (u.propTypes = {});
      var m = u;
      function p(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          d = (0, r.default)('inline', a),
          u = (0, i.Z)(p, e),
          m = (0, s.Z)(p, e);
        return c().createElement(
          m,
          (0, l.Z)({}, u, { className: d }),
          o.kK(t) ? n : t,
        );
      }
      (p.handledProps = ['as', 'children', 'className', 'content']),
        (p.propTypes = {});
      var h = p;
      function v(e) {
        var t = e.attached,
          a = e.basic,
          n = e.children,
          u = e.circular,
          m = e.className,
          p = e.clearing,
          h = e.color,
          G = e.compact,
          f = e.content,
          g = e.disabled,
          Z = e.floated,
          b = e.inverted,
          N = e.loading,
          k = e.placeholder,
          y = e.padded,
          A = e.piled,
          w = e.raised,
          x = e.secondary,
          E = e.size,
          z = e.stacked,
          K = e.tertiary,
          P = e.textAlign,
          T = e.vertical,
          H = (0, r.default)(
            'ui',
            h,
            E,
            (0, d.lG)(a, 'basic'),
            (0, d.lG)(u, 'circular'),
            (0, d.lG)(p, 'clearing'),
            (0, d.lG)(G, 'compact'),
            (0, d.lG)(g, 'disabled'),
            (0, d.lG)(b, 'inverted'),
            (0, d.lG)(N, 'loading'),
            (0, d.lG)(k, 'placeholder'),
            (0, d.lG)(A, 'piled'),
            (0, d.lG)(w, 'raised'),
            (0, d.lG)(x, 'secondary'),
            (0, d.lG)(z, 'stacked'),
            (0, d.lG)(K, 'tertiary'),
            (0, d.lG)(T, 'vertical'),
            (0, d.sU)(t, 'attached'),
            (0, d.sU)(y, 'padded'),
            (0, d.X4)(P),
            (0, d.cD)(Z, 'floated'),
            'segment',
            m,
          ),
          U = (0, i.Z)(v, e),
          R = (0, s.Z)(v, e);
        return c().createElement(
          R,
          (0, l.Z)({}, U, { className: H }),
          o.kK(n) ? f : n,
        );
      }
      (v.handledProps = [
        'as',
        'attached',
        'basic',
        'children',
        'circular',
        'className',
        'clearing',
        'color',
        'compact',
        'content',
        'disabled',
        'floated',
        'inverted',
        'loading',
        'padded',
        'piled',
        'placeholder',
        'raised',
        'secondary',
        'size',
        'stacked',
        'tertiary',
        'textAlign',
        'vertical',
      ]),
        (v.Group = m),
        (v.Inline = h),
        (v.propTypes = {});
      var G = v;
    },
  },
]);
