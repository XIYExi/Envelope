(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [4312],
  {
    74312: function (e, t, a) {
      'use strict';
      a.r(t);
      var l = a(93224),
        n = a(12924),
        i = a.n(n),
        r = a(76763),
        c = a(35766),
        d = a(60345),
        s = a(16907),
        o = a.n(s),
        p = ['isTpl'],
        h = (e) => {
          var t = e.isTpl,
            a = (0, l.Z)(e, p),
            n = a.text,
            s = a.fitted,
            h = a.hidden,
            u = a.inverted,
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
                      hidden: h,
                      inverted: u,
                      section: v,
                    })
                  : i().createElement(
                      d.Z,
                      {
                        horizontal: !0,
                        fitted: s,
                        hidden: h,
                        inverted: u,
                        section: v,
                      },
                      n,
                    ),
              ),
          );
        };
      t['default'] = h;
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
          h = e.content,
          u = e.fitted,
          v = e.hidden,
          m = e.horizontal,
          G = e.inverted,
          f = e.section,
          Z = e.vertical,
          g = (0, n.default)(
            'ui',
            (0, c.lG)(i, 'clearing'),
            (0, c.lG)(u, 'fitted'),
            (0, c.lG)(v, 'hidden'),
            (0, c.lG)(m, 'horizontal'),
            (0, c.lG)(G, 'inverted'),
            (0, c.lG)(f, 'section'),
            (0, c.lG)(Z, 'vertical'),
            'divider',
            a,
          ),
          k = (0, d.Z)(p, e),
          N = (0, s.Z)(p, e);
        return r().createElement(
          N,
          (0, l.Z)({}, k, { className: g }),
          o.kK(t) ? h : t,
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
          return G;
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
          h = e.content,
          u = e.horizontal,
          v = e.piled,
          m = e.raised,
          G = e.size,
          f = e.stacked,
          Z = (0, n.default)(
            'ui',
            G,
            (0, c.lG)(i, 'compact'),
            (0, c.lG)(u, 'horizontal'),
            (0, c.lG)(v, 'piled'),
            (0, c.lG)(m, 'raised'),
            (0, c.lG)(f, 'stacked'),
            'segments',
            a,
          ),
          g = (0, d.Z)(p, e),
          k = (0, s.Z)(p, e);
        return r().createElement(
          k,
          (0, l.Z)({}, g, { className: Z }),
          o.kK(t) ? h : t,
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
      var h = p;
      function u(e) {
        var t = e.children,
          a = e.className,
          i = e.content,
          c = (0, n.default)('inline', a),
          p = (0, d.Z)(u, e),
          h = (0, s.Z)(u, e);
        return r().createElement(
          h,
          (0, l.Z)({}, p, { className: c }),
          o.kK(t) ? i : t,
        );
      }
      (u.handledProps = ['as', 'children', 'className', 'content']),
        (u.propTypes = {});
      var v = u;
      function m(e) {
        var t = e.attached,
          a = e.basic,
          i = e.children,
          p = e.circular,
          h = e.className,
          u = e.clearing,
          v = e.color,
          G = e.compact,
          f = e.content,
          Z = e.disabled,
          g = e.floated,
          k = e.inverted,
          N = e.loading,
          z = e.placeholder,
          y = e.padded,
          b = e.piled,
          E = e.raised,
          T = e.secondary,
          x = e.size,
          K = e.stacked,
          P = e.tertiary,
          D = e.textAlign,
          w = e.vertical,
          A = (0, n.default)(
            'ui',
            v,
            x,
            (0, c.lG)(a, 'basic'),
            (0, c.lG)(p, 'circular'),
            (0, c.lG)(u, 'clearing'),
            (0, c.lG)(G, 'compact'),
            (0, c.lG)(Z, 'disabled'),
            (0, c.lG)(k, 'inverted'),
            (0, c.lG)(N, 'loading'),
            (0, c.lG)(z, 'placeholder'),
            (0, c.lG)(b, 'piled'),
            (0, c.lG)(E, 'raised'),
            (0, c.lG)(T, 'secondary'),
            (0, c.lG)(K, 'stacked'),
            (0, c.lG)(P, 'tertiary'),
            (0, c.lG)(w, 'vertical'),
            (0, c.sU)(t, 'attached'),
            (0, c.sU)(y, 'padded'),
            (0, c.X4)(D),
            (0, c.cD)(g, 'floated'),
            'segment',
            h,
          ),
          C = (0, d.Z)(m, e),
          U = (0, s.Z)(m, e);
        return r().createElement(
          U,
          (0, l.Z)({}, C, { className: A }),
          o.kK(i) ? f : i,
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
        (m.Group = h),
        (m.Inline = v),
        (m.propTypes = {});
      var G = m;
    },
  },
]);
