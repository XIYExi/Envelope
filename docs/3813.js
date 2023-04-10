(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3813, 4312],
  {
    63813: function (e, t, a) {
      'use strict';
      a.r(t);
      var l = a(91896),
        n = a(12924),
        i = a.n(n),
        r = a(74312),
        c = {
          text: 'Divider',
          fitted: !1,
          hidden: !1,
          inverted: !1,
          section: !1,
        };
      t['default'] = () =>
        i().createElement(r.default, (0, l.Z)({ isTpl: !1 }, c));
    },
    74312: function (e, t, a) {
      'use strict';
      a.r(t);
      var l = a(93224),
        n = a(12924),
        i = a.n(n),
        r = a(49282),
        c = a(35766),
        d = a(60345),
        s = a(16907),
        o = a.n(s),
        p = ['isTpl'],
        u = (e) => {
          var t = e.isTpl,
            a = (0, l.Z)(e, p),
            n = a.text,
            s = a.fitted,
            u = a.hidden,
            h = a.inverted,
            v = a.section;
          return i().createElement(
            i().Fragment,
            null,
            t && i().createElement(r.Z, { src: o(), alt: 'Divider' }),
            !t &&
              i().createElement(
                c.Z,
                { basic: !0 },
                0 === n.length
                  ? i().createElement(d.Z, {
                      fitted: s,
                      hidden: u,
                      inverted: h,
                      section: v,
                    })
                  : i().createElement(
                      d.Z,
                      {
                        horizontal: !0,
                        fitted: s,
                        hidden: u,
                        inverted: h,
                        section: v,
                      },
                      n,
                    ),
              ),
          );
        };
      t['default'] = u;
    },
    16907: function (e, t, a) {
      e.exports = a.p + 'static/Divider.9a2cd922.svg';
    },
    60345: function (e, t, a) {
      'use strict';
      var l = a(22122),
        n = a(86010),
        i = (a(55301), a(12924)),
        r = a.n(i),
        c = a(92063),
        d = a(28935),
        s = a(12519),
        o = a(92248);
      function p(e) {
        var t = e.children,
          a = e.className,
          i = e.clearing,
          u = e.content,
          h = e.fitted,
          v = e.hidden,
          m = e.horizontal,
          f = e.inverted,
          G = e.section,
          Z = e.vertical,
          g = (0, n.default)(
            'ui',
            (0, c.lG)(i, 'clearing'),
            (0, c.lG)(h, 'fitted'),
            (0, c.lG)(v, 'hidden'),
            (0, c.lG)(m, 'horizontal'),
            (0, c.lG)(f, 'inverted'),
            (0, c.lG)(G, 'section'),
            (0, c.lG)(Z, 'vertical'),
            'divider',
            a,
          ),
          k = (0, d.Z)(p, e),
          N = (0, s.Z)(p, e);
        return r().createElement(
          N,
          (0, l.Z)({}, k, { className: g }),
          o.kK(t) ? u : t,
        );
      }
      (p.handledProps = [
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
        (p.propTypes = {}),
        (t['Z'] = p);
    },
    35766: function (e, t, a) {
      'use strict';
      a.d(t, {
        Z: function () {
          return f;
        },
      });
      var l = a(22122),
        n = a(86010),
        i = (a(55301), a(12924)),
        r = a.n(i),
        c = a(92063),
        d = a(28935),
        s = a(12519),
        o = a(92248);
      function p(e) {
        var t = e.children,
          a = e.className,
          i = e.compact,
          u = e.content,
          h = e.horizontal,
          v = e.piled,
          m = e.raised,
          f = e.size,
          G = e.stacked,
          Z = (0, n.default)(
            'ui',
            f,
            (0, c.lG)(i, 'compact'),
            (0, c.lG)(h, 'horizontal'),
            (0, c.lG)(v, 'piled'),
            (0, c.lG)(m, 'raised'),
            (0, c.lG)(G, 'stacked'),
            'segments',
            a,
          ),
          g = (0, d.Z)(p, e),
          k = (0, s.Z)(p, e);
        return r().createElement(
          k,
          (0, l.Z)({}, g, { className: Z }),
          o.kK(t) ? u : t,
        );
      }
      (p.handledProps = [
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
        (p.propTypes = {});
      var u = p;
      function h(e) {
        var t = e.children,
          a = e.className,
          i = e.content,
          c = (0, n.default)('inline', a),
          p = (0, d.Z)(h, e),
          u = (0, s.Z)(h, e);
        return r().createElement(
          u,
          (0, l.Z)({}, p, { className: c }),
          o.kK(t) ? i : t,
        );
      }
      (h.handledProps = ['as', 'children', 'className', 'content']),
        (h.propTypes = {});
      var v = h;
      function m(e) {
        var t = e.attached,
          a = e.basic,
          i = e.children,
          p = e.circular,
          u = e.className,
          h = e.clearing,
          v = e.color,
          f = e.compact,
          G = e.content,
          Z = e.disabled,
          g = e.floated,
          k = e.inverted,
          N = e.loading,
          z = e.placeholder,
          y = e.padded,
          E = e.piled,
          b = e.raised,
          T = e.secondary,
          x = e.size,
          D = e.stacked,
          K = e.tertiary,
          P = e.textAlign,
          w = e.vertical,
          A = (0, n.default)(
            'ui',
            v,
            x,
            (0, c.lG)(a, 'basic'),
            (0, c.lG)(p, 'circular'),
            (0, c.lG)(h, 'clearing'),
            (0, c.lG)(f, 'compact'),
            (0, c.lG)(Z, 'disabled'),
            (0, c.lG)(k, 'inverted'),
            (0, c.lG)(N, 'loading'),
            (0, c.lG)(z, 'placeholder'),
            (0, c.lG)(E, 'piled'),
            (0, c.lG)(b, 'raised'),
            (0, c.lG)(T, 'secondary'),
            (0, c.lG)(D, 'stacked'),
            (0, c.lG)(K, 'tertiary'),
            (0, c.lG)(w, 'vertical'),
            (0, c.sU)(t, 'attached'),
            (0, c.sU)(y, 'padded'),
            (0, c.X4)(P),
            (0, c.cD)(g, 'floated'),
            'segment',
            u,
          ),
          C = (0, d.Z)(m, e),
          U = (0, s.Z)(m, e);
        return r().createElement(
          U,
          (0, l.Z)({}, C, { className: A }),
          o.kK(i) ? G : i,
        );
      }
      (m.handledProps = [
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
        (m.Group = u),
        (m.Inline = v),
        (m.propTypes = {});
      var f = m;
    },
  },
]);
