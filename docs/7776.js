(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7776],
  {
    67776: function (e, t, a) {
      'use strict';
      a.r(t);
      var n = a(93224),
        i = a(12924),
        l = a.n(i),
        r = a(76763),
        o = a(48237),
        c = a(87401),
        s = a(21843),
        d = a.n(s),
        u = ['isTpl'],
        p = (e) => {
          var t = e.isTpl,
            a = (0, n.Z)(e, u),
            i = a.text,
            s = a.basic,
            p = a.circular,
            v = a.color,
            f = a.compact,
            m = a.disabled,
            b = a.fluid,
            h = a.inverted,
            g = a.label,
            Z = a.labelPosition,
            G = a.loading,
            y = a.negative,
            E = a.positive,
            k = a.size,
            N = a.toggle,
            C = a.type,
            x = a.pointing;
          return l().createElement(
            l().Fragment,
            null,
            t && l().createElement(r.Z, { src: d(), size: 'small' }),
            !t &&
              l().createElement(
                'div',
                null,
                0 === g.length &&
                  l().createElement(
                    o.Z,
                    {
                      basic: s,
                      circular: p,
                      color: v,
                      compact: f,
                      disabled: m,
                      fluid: b,
                      inverted: h,
                      loading: G,
                      negative: y,
                      positive: E,
                      size: k,
                      toggle: N,
                      type: C,
                    },
                    i,
                  ),
                0 !== g.length &&
                  l().createElement(
                    o.Z,
                    { as: 'div', labelPosition: Z },
                    l().createElement(c.Z, { pointing: x }, g),
                    l().createElement(
                      o.Z,
                      {
                        basic: s,
                        circular: p,
                        color: v,
                        compact: f,
                        disabled: m,
                        fluid: b,
                        inverted: h,
                        loading: G,
                        negative: y,
                        positive: E,
                        size: k,
                        toggle: N,
                        type: C,
                      },
                      i,
                    ),
                  ),
              ),
          );
        };
      t['default'] = p;
    },
    21843: function (e, t, a) {
      e.exports = a.p + 'static/Button.299612d5.svg';
    },
    48237: function (e, t, a) {
      'use strict';
      a.d(t, {
        Z: function () {
          return x;
        },
      });
      var n = a(22122),
        i = a(41788),
        l = a(23715),
        r = a(55288),
        o = a(31368),
        c = a(86010),
        s = (a(55301), a(12924)),
        d = a.n(s),
        u = a(92248),
        p = a(92063),
        v = a(28935),
        f = a(12519),
        m = a(93619),
        b = a(65382),
        h = a(87401);
      function g(e) {
        var t = e.children,
          a = e.className,
          i = e.content,
          l = e.hidden,
          r = e.visible,
          o = (0, c.default)(
            (0, p.lG)(r, 'visible'),
            (0, p.lG)(l, 'hidden'),
            'content',
            a,
          ),
          s = (0, v.Z)(g, e),
          m = (0, f.Z)(g, e);
        return d().createElement(
          m,
          (0, n.Z)({}, s, { className: o }),
          u.kK(t) ? i : t,
        );
      }
      (g.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'hidden',
        'visible',
      ]),
        (g.propTypes = {});
      var Z = g,
        G = a(30014);
      function y(e) {
        var t = e.attached,
          a = e.basic,
          i = e.buttons,
          l = e.children,
          o = e.className,
          s = e.color,
          m = e.compact,
          b = e.content,
          h = e.floated,
          g = e.fluid,
          Z = e.icon,
          E = e.inverted,
          k = e.labeled,
          N = e.negative,
          C = e.positive,
          P = e.primary,
          T = e.secondary,
          z = e.size,
          I = e.toggle,
          K = e.vertical,
          R = e.widths,
          w = (0, c.default)(
            'ui',
            s,
            z,
            (0, p.lG)(a, 'basic'),
            (0, p.lG)(m, 'compact'),
            (0, p.lG)(g, 'fluid'),
            (0, p.lG)(Z, 'icon'),
            (0, p.lG)(E, 'inverted'),
            (0, p.lG)(k, 'labeled'),
            (0, p.lG)(N, 'negative'),
            (0, p.lG)(C, 'positive'),
            (0, p.lG)(P, 'primary'),
            (0, p.lG)(T, 'secondary'),
            (0, p.lG)(I, 'toggle'),
            (0, p.lG)(K, 'vertical'),
            (0, p.sU)(t, 'attached'),
            (0, p.cD)(h, 'floated'),
            (0, p.H0)(R),
            'buttons',
            o,
          ),
          U = (0, v.Z)(y, e),
          A = (0, f.Z)(y, e);
        return (0, r.Z)(i)
          ? d().createElement(
              A,
              (0, n.Z)({}, U, { className: w }),
              u.kK(l) ? b : l,
            )
          : d().createElement(
              A,
              (0, n.Z)({}, U, { className: w }),
              (0, G.Z)(i, function (e) {
                return x.create(e);
              }),
            );
      }
      (y.handledProps = [
        'as',
        'attached',
        'basic',
        'buttons',
        'children',
        'className',
        'color',
        'compact',
        'content',
        'floated',
        'fluid',
        'icon',
        'inverted',
        'labeled',
        'negative',
        'positive',
        'primary',
        'secondary',
        'size',
        'toggle',
        'vertical',
        'widths',
      ]),
        (y.propTypes = {});
      var E = y;
      function k(e) {
        var t = e.className,
          a = e.text,
          i = (0, c.default)('or', t),
          l = (0, v.Z)(k, e),
          r = (0, f.Z)(k, e);
        return d().createElement(
          r,
          (0, n.Z)({}, l, { className: i, 'data-text': a }),
        );
      }
      (k.handledProps = ['as', 'className', 'text']), (k.propTypes = {});
      var N = k,
        C = (function (e) {
          function t() {
            for (
              var t, a = arguments.length, n = new Array(a), i = 0;
              i < a;
              i++
            )
              n[i] = arguments[i];
            return (
              (t = e.call.apply(e, [this].concat(n)) || this),
              (t.ref = (0, s.createRef)()),
              (t.computeElementType = function () {
                var e = t.props,
                  a = e.attached,
                  n = e.label;
                if (!(0, r.Z)(a) || !(0, r.Z)(n)) return 'div';
              }),
              (t.computeTabIndex = function (e) {
                var a = t.props,
                  n = a.disabled,
                  i = a.tabIndex;
                return (0, r.Z)(i) ? (n ? -1 : 'div' === e ? 0 : void 0) : i;
              }),
              (t.focus = function (e) {
                return (0, l.Z)(t.ref.current, 'focus', e);
              }),
              (t.handleClick = function (e) {
                var a = t.props.disabled;
                a
                  ? e.preventDefault()
                  : (0, l.Z)(t.props, 'onClick', e, t.props);
              }),
              (t.hasIconClass = function () {
                var e = t.props,
                  a = e.labelPosition,
                  n = e.children,
                  i = e.content,
                  l = e.icon;
                return !0 === l || (l && (a || (u.kK(n) && (0, r.Z)(i))));
              }),
              t
            );
          }
          (0, i.Z)(t, e);
          var a = t.prototype;
          return (
            (a.computeButtonAriaRole = function (e) {
              var t = this.props.role;
              return (0, r.Z)(t) ? ('button' !== e ? 'button' : void 0) : t;
            }),
            (a.render = function () {
              var e = this.props,
                a = e.active,
                i = e.animated,
                l = e.attached,
                s = e.basic,
                m = e.children,
                g = e.circular,
                Z = e.className,
                G = e.color,
                y = e.compact,
                E = e.content,
                k = e.disabled,
                N = e.floated,
                C = e.fluid,
                x = e.icon,
                P = e.inverted,
                T = e.label,
                z = e.labelPosition,
                I = e.loading,
                K = e.negative,
                R = e.positive,
                w = e.primary,
                U = e.secondary,
                A = e.size,
                B = e.toggle,
                D = e.type,
                F = (0, c.default)(
                  G,
                  A,
                  (0, p.lG)(a, 'active'),
                  (0, p.lG)(s, 'basic'),
                  (0, p.lG)(g, 'circular'),
                  (0, p.lG)(y, 'compact'),
                  (0, p.lG)(C, 'fluid'),
                  (0, p.lG)(this.hasIconClass(), 'icon'),
                  (0, p.lG)(P, 'inverted'),
                  (0, p.lG)(I, 'loading'),
                  (0, p.lG)(K, 'negative'),
                  (0, p.lG)(R, 'positive'),
                  (0, p.lG)(w, 'primary'),
                  (0, p.lG)(U, 'secondary'),
                  (0, p.lG)(B, 'toggle'),
                  (0, p.sU)(i, 'animated'),
                  (0, p.sU)(l, 'attached'),
                ),
                H = (0, c.default)((0, p.sU)(z || !!T, 'labeled')),
                O = (0, c.default)(
                  (0, p.lG)(k, 'disabled'),
                  (0, p.cD)(N, 'floated'),
                ),
                j = (0, v.Z)(t, this.props),
                q = (0, f.Z)(t, this.props, this.computeElementType),
                J = this.computeTabIndex(q);
              if (!(0, r.Z)(T)) {
                var L = (0, c.default)('ui', F, 'button', Z),
                  M = (0, c.default)('ui', H, 'button', Z, O),
                  Q = h.Z.create(T, {
                    defaultProps: {
                      basic: !0,
                      pointing: 'left' === z ? 'right' : 'left',
                    },
                    autoGenerateKey: !1,
                  });
                return d().createElement(
                  q,
                  (0, n.Z)({}, j, { className: M, onClick: this.handleClick }),
                  'left' === z && Q,
                  d().createElement(
                    o.R,
                    { innerRef: this.ref },
                    d().createElement(
                      'button',
                      {
                        className: L,
                        'aria-pressed': B ? !!a : void 0,
                        disabled: k,
                        type: D,
                        tabIndex: J,
                      },
                      b.Z.create(x, { autoGenerateKey: !1 }),
                      ' ',
                      E,
                    ),
                  ),
                  ('right' === z || !z) && Q,
                );
              }
              var S = (0, c.default)('ui', F, O, H, 'button', Z),
                V = !u.kK(m),
                W = this.computeButtonAriaRole(q);
              return d().createElement(
                o.R,
                { innerRef: this.ref },
                d().createElement(
                  q,
                  (0, n.Z)({}, j, {
                    className: S,
                    'aria-pressed': B ? !!a : void 0,
                    disabled: (k && 'button' === q) || void 0,
                    onClick: this.handleClick,
                    role: W,
                    type: D,
                    tabIndex: J,
                  }),
                  V && m,
                  !V && b.Z.create(x, { autoGenerateKey: !1 }),
                  !V && E,
                ),
              );
            }),
            t
          );
        })(s.Component);
      (C.handledProps = [
        'active',
        'animated',
        'as',
        'attached',
        'basic',
        'children',
        'circular',
        'className',
        'color',
        'compact',
        'content',
        'disabled',
        'floated',
        'fluid',
        'icon',
        'inverted',
        'label',
        'labelPosition',
        'loading',
        'negative',
        'onClick',
        'positive',
        'primary',
        'role',
        'secondary',
        'size',
        'tabIndex',
        'toggle',
        'type',
      ]),
        (C.propTypes = {}),
        (C.defaultProps = { as: 'button' }),
        (C.Content = Z),
        (C.Group = E),
        (C.Or = N),
        (C.create = (0, m.u5)(C, function (e) {
          return { content: e };
        }));
      var x = C;
    },
  },
]);
