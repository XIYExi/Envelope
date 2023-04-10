(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [124, 1595],
  {
    70124: function (e, t, a) {
      'use strict';
      a.r(t);
      var n = a(91896),
        l = a(12924),
        r = a.n(l),
        c = a(71595),
        s = {
          label: 'Label',
          value: '50,000',
          color: 'black',
          horizontal: !1,
          inverted: !1,
          size: 'small',
        };
      t['default'] = () =>
        r().createElement(c.default, (0, n.Z)({ isTpl: !1 }, s));
    },
    71595: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return y;
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
        v = a(30014);
      function p(e) {
        var t = e.children,
          a = e.className,
          n = e.color,
          l = e.content,
          m = e.horizontal,
          h = e.inverted,
          f = e.items,
          Z = e.size,
          z = e.widths,
          N = (0, s.default)(
            'ui',
            n,
            Z,
            (0, o.lG)(m, 'horizontal'),
            (0, o.lG)(h, 'inverted'),
            (0, o.H0)(z),
            'statistics',
            a,
          ),
          E = (0, i.Z)(p, e),
          k = (0, u.Z)(p, e);
        return d.kK(t)
          ? d.kK(l)
            ? r().createElement(
                k,
                (0, c.Z)({}, E, { className: N }),
                (0, v.Z)(f, function (e) {
                  return b.create(e);
                }),
              )
            : r().createElement(k, (0, c.Z)({}, E, { className: N }), l)
          : r().createElement(k, (0, c.Z)({}, E, { className: N }), t);
      }
      (p.handledProps = [
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
        (p.propTypes = {});
      var h = p;
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
      function z(e) {
        var t = e.children,
          a = e.className,
          n = e.content,
          l = e.text,
          m = (0, s.default)((0, o.lG)(l, 'text'), 'value', a),
          v = (0, i.Z)(z, e),
          p = (0, u.Z)(z, e);
        return r().createElement(
          p,
          (0, c.Z)({}, v, { className: m }),
          d.kK(t) ? n : t,
        );
      }
      (z.handledProps = ['as', 'children', 'className', 'content', 'text']),
        (z.propTypes = {}),
        (z.create = (0, m.u5)(z, function (e) {
          return { content: e };
        }));
      var N = z;
      function E(e) {
        var t = e.children,
          a = e.className,
          n = e.color,
          l = e.content,
          m = e.floated,
          v = e.horizontal,
          p = e.inverted,
          h = e.label,
          f = e.size,
          z = e.text,
          b = e.value,
          k = (0, s.default)(
            'ui',
            n,
            f,
            (0, o.cD)(m, 'floated'),
            (0, o.lG)(v, 'horizontal'),
            (0, o.lG)(p, 'inverted'),
            'statistic',
            a,
          ),
          G = (0, i.Z)(E, e),
          K = (0, u.Z)(E, e);
        return d.kK(t)
          ? d.kK(l)
            ? r().createElement(
                K,
                (0, c.Z)({}, G, { className: k }),
                N.create(b, { defaultProps: { text: z }, autoGenerateKey: !1 }),
                Z.create(h, { autoGenerateKey: !1 }),
              )
            : r().createElement(K, (0, c.Z)({}, G, { className: k }), l)
          : r().createElement(K, (0, c.Z)({}, G, { className: k }), t);
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
        (E.Value = N),
        (E.create = (0, m.u5)(E, function (e) {
          return { content: e };
        }));
      var b = E,
        k = a(49282),
        G = a(40539),
        K = a.n(G),
        x = ['isTpl'],
        T = (e) => {
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
            t && r().createElement(k.Z, { src: K(), alt: 'Statistic' }),
            !t &&
              r().createElement(
                'div',
                null,
                r().createElement(
                  b,
                  { color: s, size: u, horizontal: o, inverted: i },
                  r().createElement(b.Value, null, c),
                  r().createElement(b.Label, null, l),
                ),
              ),
          );
        },
        y = T;
    },
    40539: function (e, t, a) {
      e.exports = a.p + 'static/Statistic.b5719031.svg';
    },
  },
]);
