(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3447],
  {
    68179: function () {},
    27049: function (e, t, a) {
      'use strict';
      var n = a(22122),
        r = a(96156),
        l = a(94184),
        c = a.n(l),
        i = a(12924),
        d = a(53124),
        s = function (e, t) {
          var a = {};
          for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) &&
              t.indexOf(n) < 0 &&
              (a[n] = e[n]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var r = 0;
            for (n = Object.getOwnPropertySymbols(e); r < n.length; r++)
              t.indexOf(n[r]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, n[r]) &&
                (a[n[r]] = e[n[r]]);
          }
          return a;
        },
        o = function (e) {
          var t,
            a = i.useContext(d.E_),
            l = a.getPrefixCls,
            o = a.direction,
            u = e.prefixCls,
            p = e.type,
            m = void 0 === p ? 'horizontal' : p,
            h = e.orientation,
            v = void 0 === h ? 'center' : h,
            f = e.orientationMargin,
            g = e.className,
            Z = e.children,
            G = e.dashed,
            b = e.plain,
            y = s(e, [
              'prefixCls',
              'type',
              'orientation',
              'orientationMargin',
              'className',
              'children',
              'dashed',
              'plain',
            ]),
            N = l('divider', u),
            k = v.length > 0 ? '-'.concat(v) : v,
            x = !!Z,
            w = 'left' === v && null != f,
            E = 'right' === v && null != f,
            A = c()(
              N,
              ''.concat(N, '-').concat(m),
              ((t = {}),
              (0, r.Z)(t, ''.concat(N, '-with-text'), x),
              (0, r.Z)(t, ''.concat(N, '-with-text').concat(k), x),
              (0, r.Z)(t, ''.concat(N, '-dashed'), !!G),
              (0, r.Z)(t, ''.concat(N, '-plain'), !!b),
              (0, r.Z)(t, ''.concat(N, '-rtl'), 'rtl' === o),
              (0, r.Z)(
                t,
                ''.concat(N, '-no-default-orientation-margin-left'),
                w,
              ),
              (0, r.Z)(
                t,
                ''.concat(N, '-no-default-orientation-margin-right'),
                E,
              ),
              t),
              g,
            ),
            P = (0, n.Z)(
              (0, n.Z)({}, w && { marginLeft: f }),
              E && { marginRight: f },
            );
          return i.createElement(
            'div',
            (0, n.Z)({ className: A }, y, { role: 'separator' }),
            Z &&
              'vertical' !== m &&
              i.createElement(
                'span',
                { className: ''.concat(N, '-inner-text'), style: P },
                Z,
              ),
          );
        };
      t['Z'] = o;
    },
    48736: function (e, t, a) {
      'use strict';
      a(38663), a(68179);
    },
    14309: function (e, t, a) {
      'use strict';
      a.d(t, {
        Z: function () {
          return f;
        },
      });
      var n = a(22122),
        r = a(86010),
        l = (a(55301), a(12924)),
        c = a.n(l),
        i = a(92063),
        d = a(28935),
        s = a(12519),
        o = a(93619);
      function u(e) {
        var t = e.children,
          a = e.className,
          l = e.computer,
          o = e.color,
          p = e.floated,
          m = e.largeScreen,
          h = e.mobile,
          v = e.only,
          f = e.stretched,
          g = e.tablet,
          Z = e.textAlign,
          G = e.verticalAlign,
          b = e.widescreen,
          y = e.width,
          N = (0, r.default)(
            o,
            (0, i.lG)(f, 'stretched'),
            (0, i.MR)(v, 'only'),
            (0, i.X4)(Z),
            (0, i.cD)(p, 'floated'),
            (0, i.Ok)(G),
            (0, i.H0)(l, 'wide computer'),
            (0, i.H0)(m, 'wide large screen'),
            (0, i.H0)(h, 'wide mobile'),
            (0, i.H0)(g, 'wide tablet'),
            (0, i.H0)(b, 'wide widescreen'),
            (0, i.H0)(y, 'wide'),
            'column',
            a,
          ),
          k = (0, d.Z)(u, e),
          x = (0, s.Z)(u, e);
        return c().createElement(x, (0, n.Z)({}, k, { className: N }), t);
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
      var p = u;
      function m(e) {
        var t = e.centered,
          a = e.children,
          l = e.className,
          o = e.color,
          u = e.columns,
          p = e.divided,
          h = e.only,
          v = e.reversed,
          f = e.stretched,
          g = e.textAlign,
          Z = e.verticalAlign,
          G = (0, r.default)(
            o,
            (0, i.lG)(t, 'centered'),
            (0, i.lG)(p, 'divided'),
            (0, i.lG)(f, 'stretched'),
            (0, i.MR)(h, 'only'),
            (0, i.MR)(v, 'reversed'),
            (0, i.X4)(g),
            (0, i.Ok)(Z),
            (0, i.H0)(u, 'column', !0),
            'row',
            l,
          ),
          b = (0, d.Z)(m, e),
          y = (0, s.Z)(m, e);
        return c().createElement(y, (0, n.Z)({}, b, { className: G }), a);
      }
      (m.handledProps = [
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
        (m.propTypes = {});
      var h = m;
      function v(e) {
        var t = e.celled,
          a = e.centered,
          l = e.children,
          o = e.className,
          u = e.columns,
          p = e.container,
          m = e.divided,
          h = e.doubling,
          f = e.inverted,
          g = e.padded,
          Z = e.relaxed,
          G = e.reversed,
          b = e.stackable,
          y = e.stretched,
          N = e.textAlign,
          k = e.verticalAlign,
          x = (0, r.default)(
            'ui',
            (0, i.lG)(a, 'centered'),
            (0, i.lG)(p, 'container'),
            (0, i.lG)(h, 'doubling'),
            (0, i.lG)(f, 'inverted'),
            (0, i.lG)(b, 'stackable'),
            (0, i.lG)(y, 'stretched'),
            (0, i.sU)(t, 'celled'),
            (0, i.sU)(m, 'divided'),
            (0, i.sU)(g, 'padded'),
            (0, i.sU)(Z, 'relaxed'),
            (0, i.MR)(G, 'reversed'),
            (0, i.X4)(N),
            (0, i.Ok)(k),
            (0, i.H0)(u, 'column', !0),
            'grid',
            o,
          ),
          w = (0, d.Z)(v, e),
          E = (0, s.Z)(v, e);
        return c().createElement(E, (0, n.Z)({}, w, { className: x }), l);
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
        (v.Column = p),
        (v.Row = h),
        (v.propTypes = {});
      var f = v;
    },
    60345: function (e, t, a) {
      'use strict';
      var n = a(22122),
        r = a(86010),
        l = (a(55301), a(12924)),
        c = a.n(l),
        i = a(92063),
        d = a(28935),
        s = a(12519),
        o = a(92248);
      function u(e) {
        var t = e.children,
          a = e.className,
          l = e.clearing,
          p = e.content,
          m = e.fitted,
          h = e.hidden,
          v = e.horizontal,
          f = e.inverted,
          g = e.section,
          Z = e.vertical,
          G = (0, r.default)(
            'ui',
            (0, i.lG)(l, 'clearing'),
            (0, i.lG)(m, 'fitted'),
            (0, i.lG)(h, 'hidden'),
            (0, i.lG)(v, 'horizontal'),
            (0, i.lG)(f, 'inverted'),
            (0, i.lG)(g, 'section'),
            (0, i.lG)(Z, 'vertical'),
            'divider',
            a,
          ),
          b = (0, d.Z)(u, e),
          y = (0, s.Z)(u, e);
        return c().createElement(
          y,
          (0, n.Z)({}, b, { className: G }),
          o.kK(t) ? p : t,
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
          return G;
        },
      });
      var n = a(22122),
        r = a(86010),
        l = (a(55301), a(12924)),
        c = a.n(l),
        i = a(92063),
        d = a(28935),
        s = a(12519),
        o = a(92248),
        u = a(65382),
        p = a(49282),
        m = a(93619);
      function h(e) {
        var t = e.children,
          a = e.className,
          l = e.content,
          i = (0, r.default)('sub header', a),
          u = (0, d.Z)(h, e),
          p = (0, s.Z)(h, e);
        return c().createElement(
          p,
          (0, n.Z)({}, u, { className: i }),
          o.kK(t) ? l : t,
        );
      }
      (h.handledProps = ['as', 'children', 'className', 'content']),
        (h.propTypes = {}),
        (h.create = (0, m.u5)(h, function (e) {
          return { content: e };
        }));
      var v = h;
      function f(e) {
        var t = e.children,
          a = e.className,
          l = e.content,
          i = (0, r.default)('content', a),
          u = (0, d.Z)(f, e),
          p = (0, s.Z)(f, e);
        return c().createElement(
          p,
          (0, n.Z)({}, u, { className: i }),
          o.kK(t) ? l : t,
        );
      }
      (f.handledProps = ['as', 'children', 'className', 'content']),
        (f.propTypes = {});
      var g = f;
      function Z(e) {
        var t = e.attached,
          a = e.block,
          l = e.children,
          m = e.className,
          h = e.color,
          f = e.content,
          G = e.disabled,
          b = e.dividing,
          y = e.floated,
          N = e.icon,
          k = e.image,
          x = e.inverted,
          w = e.size,
          E = e.sub,
          A = e.subheader,
          P = e.textAlign,
          z = (0, r.default)(
            'ui',
            h,
            w,
            (0, i.lG)(a, 'block'),
            (0, i.lG)(G, 'disabled'),
            (0, i.lG)(b, 'dividing'),
            (0, i.cD)(y, 'floated'),
            (0, i.lG)(!0 === N, 'icon'),
            (0, i.lG)(!0 === k, 'image'),
            (0, i.lG)(x, 'inverted'),
            (0, i.lG)(E, 'sub'),
            (0, i.sU)(t, 'attached'),
            (0, i.X4)(P),
            'header',
            m,
          ),
          O = (0, d.Z)(Z, e),
          K = (0, s.Z)(Z, e);
        if (!o.kK(l))
          return c().createElement(K, (0, n.Z)({}, O, { className: z }), l);
        var T = u.Z.create(N, { autoGenerateKey: !1 }),
          C = p.Z.create(k, { autoGenerateKey: !1 }),
          H = v.create(A, { autoGenerateKey: !1 });
        return T || C
          ? c().createElement(
              K,
              (0, n.Z)({}, O, { className: z }),
              T || C,
              (f || H) && c().createElement(g, null, f, H),
            )
          : c().createElement(K, (0, n.Z)({}, O, { className: z }), f, H);
      }
      (Z.handledProps = [
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
        (Z.propTypes = {}),
        (Z.Content = g),
        (Z.Subheader = v);
      var G = Z;
    },
    35766: function (e, t, a) {
      'use strict';
      a.d(t, {
        Z: function () {
          return f;
        },
      });
      var n = a(22122),
        r = a(86010),
        l = (a(55301), a(12924)),
        c = a.n(l),
        i = a(92063),
        d = a(28935),
        s = a(12519),
        o = a(92248);
      function u(e) {
        var t = e.children,
          a = e.className,
          l = e.compact,
          p = e.content,
          m = e.horizontal,
          h = e.piled,
          v = e.raised,
          f = e.size,
          g = e.stacked,
          Z = (0, r.default)(
            'ui',
            f,
            (0, i.lG)(l, 'compact'),
            (0, i.lG)(m, 'horizontal'),
            (0, i.lG)(h, 'piled'),
            (0, i.lG)(v, 'raised'),
            (0, i.lG)(g, 'stacked'),
            'segments',
            a,
          ),
          G = (0, d.Z)(u, e),
          b = (0, s.Z)(u, e);
        return c().createElement(
          b,
          (0, n.Z)({}, G, { className: Z }),
          o.kK(t) ? p : t,
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
      var p = u;
      function m(e) {
        var t = e.children,
          a = e.className,
          l = e.content,
          i = (0, r.default)('inline', a),
          u = (0, d.Z)(m, e),
          p = (0, s.Z)(m, e);
        return c().createElement(
          p,
          (0, n.Z)({}, u, { className: i }),
          o.kK(t) ? l : t,
        );
      }
      (m.handledProps = ['as', 'children', 'className', 'content']),
        (m.propTypes = {});
      var h = m;
      function v(e) {
        var t = e.attached,
          a = e.basic,
          l = e.children,
          u = e.circular,
          p = e.className,
          m = e.clearing,
          h = e.color,
          f = e.compact,
          g = e.content,
          Z = e.disabled,
          G = e.floated,
          b = e.inverted,
          y = e.loading,
          N = e.placeholder,
          k = e.padded,
          x = e.piled,
          w = e.raised,
          E = e.secondary,
          A = e.size,
          P = e.stacked,
          z = e.tertiary,
          O = e.textAlign,
          K = e.vertical,
          T = (0, r.default)(
            'ui',
            h,
            A,
            (0, i.lG)(a, 'basic'),
            (0, i.lG)(u, 'circular'),
            (0, i.lG)(m, 'clearing'),
            (0, i.lG)(f, 'compact'),
            (0, i.lG)(Z, 'disabled'),
            (0, i.lG)(b, 'inverted'),
            (0, i.lG)(y, 'loading'),
            (0, i.lG)(N, 'placeholder'),
            (0, i.lG)(x, 'piled'),
            (0, i.lG)(w, 'raised'),
            (0, i.lG)(E, 'secondary'),
            (0, i.lG)(P, 'stacked'),
            (0, i.lG)(z, 'tertiary'),
            (0, i.lG)(K, 'vertical'),
            (0, i.sU)(t, 'attached'),
            (0, i.sU)(k, 'padded'),
            (0, i.X4)(O),
            (0, i.cD)(G, 'floated'),
            'segment',
            p,
          ),
          C = (0, d.Z)(v, e),
          H = (0, s.Z)(v, e);
        return c().createElement(
          H,
          (0, n.Z)({}, C, { className: T }),
          o.kK(l) ? g : l,
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
        (v.Group = p),
        (v.Inline = h),
        (v.propTypes = {});
      var f = v;
    },
  },
]);
