(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1595],
  {
    71595: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return T;
          },
        });
      var n = a(93224),
        l = a(12924),
        r = a.n(l),
        c = a(22122),
        s = a(86010),
        o = (a(55301), a(92063)),
        i = a(28935),
        u = a(12519),
        d = a(92248),
        m = a(93619),
        p = a(30014);
      function v(e) {
        var t = e.children,
          a = e.className,
          n = e.color,
          l = e.content,
          m = e.horizontal,
          h = e.inverted,
          f = e.items,
          Z = e.size,
          N = e.widths,
          z = (0, s.default)(
            'ui',
            n,
            Z,
            (0, o.lG)(m, 'horizontal'),
            (0, o.lG)(h, 'inverted'),
            (0, o.H0)(N),
            'statistics',
            a,
          ),
          E = (0, i.Z)(v, e),
          b = (0, u.Z)(v, e);
        return d.kK(t)
          ? d.kK(l)
            ? r().createElement(
                b,
                (0, c.Z)({}, E, { className: z }),
                (0, p.Z)(f, function (e) {
                  return k.create(e);
                }),
              )
            : r().createElement(b, (0, c.Z)({}, E, { className: z }), l)
          : r().createElement(b, (0, c.Z)({}, E, { className: z }), t);
      }
      (v.handledProps = [
        'as',
        'children',
        'className',
        'color',
        'content',
        'horizontal',
        'inverted',
        'items',
        'size',
        'widths',
      ]),
        (v.propTypes = {});
      var h = v;
      function f(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          l = (0, s.default)('label', a),
          o = (0, i.Z)(f, e),
          m = (0, u.Z)(f, e);
        return r().createElement(
          m,
          (0, c.Z)({}, o, { className: l }),
          d.kK(t) ? n : t,
        );
      }
      (f.handledProps = ['as', 'children', 'className', 'content']),
        (f.propTypes = {}),
        (f.create = (0, m.u5)(f, function (e) {
          return { content: e };
        }));
      var Z = f;
      function N(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          l = e.text,
          m = (0, s.default)((0, o.lG)(l, 'text'), 'value', a),
          p = (0, i.Z)(N, e),
          v = (0, u.Z)(N, e);
        return r().createElement(
          v,
          (0, c.Z)({}, p, { className: m }),
          d.kK(t) ? n : t,
        );
      }
      (N.handledProps = ['as', 'children', 'className', 'content', 'text']),
        (N.propTypes = {}),
        (N.create = (0, m.u5)(N, function (e) {
          return { content: e };
        }));
      var z = N;
      function E(e) {
        var t = e.children,
          a = e.className,
          n = e.color,
          l = e.content,
          m = e.floated,
          p = e.horizontal,
          v = e.inverted,
          h = e.label,
          f = e.size,
          N = e.text,
          k = e.value,
          b = (0, s.default)(
            'ui',
            n,
            f,
            (0, o.cD)(m, 'floated'),
            (0, o.lG)(p, 'horizontal'),
            (0, o.lG)(v, 'inverted'),
            'statistic',
            a,
          ),
          G = (0, i.Z)(E, e),
          K = (0, u.Z)(E, e);
        return d.kK(t)
          ? d.kK(l)
            ? r().createElement(
                K,
                (0, c.Z)({}, G, { className: b }),
                z.create(k, { defaultProps: { text: N }, autoGenerateKey: !1 }),
                Z.create(h, { autoGenerateKey: !1 }),
              )
            : r().createElement(K, (0, c.Z)({}, G, { className: b }), l)
          : r().createElement(K, (0, c.Z)({}, G, { className: b }), t);
      }
      (E.handledProps = [
        'as',
        'children',
        'className',
        'color',
        'content',
        'floated',
        'horizontal',
        'inverted',
        'label',
        'size',
        'text',
        'value',
      ]),
        (E.propTypes = {}),
        (E.Group = h),
        (E.Label = Z),
        (E.Value = z),
        (E.create = (0, m.u5)(E, function (e) {
          return { content: e };
        }));
      var k = E,
        b = a(76763),
        G = a(40539),
        K = a.n(G),
        x = ['isTpl'],
        y = (e) => {
          var t = e.isTpl,
            a = (0, n.Z)(e, x),
            l = a.label,
            c = a.value,
            s = a.color,
            o = a.horizontal,
            i = a.inverted,
            u = a.size;
          return r().createElement(
            r().Fragment,
            null,
            t && r().createElement(b.Z, { src: K(), alt: 'Statistic' }),
            !t &&
              r().createElement(
                'div',
                null,
                r().createElement(
                  k,
                  { color: s, size: u, horizontal: o, inverted: i },
                  r().createElement(k.Value, null, c),
                  r().createElement(k.Label, null, l),
                ),
              ),
          );
        },
        T = y;
    },
    40539: function (e, t, a) {
      e.exports = a.p + 'static/Statistic.b5719031.svg';
    },
  },
]);
