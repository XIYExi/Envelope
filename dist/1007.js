(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1007, 7776],
  {
    1007: function (e, t, a) {
      'use strict';
      a.r(t);
      var i = a(91896),
        l = a(12924),
        n = a.n(l),
        r = a(67776),
        o = {
          text: 'Button',
          basic: !0,
          circular: !1,
          color: 'teal',
          compact: !1,
          disabled: !1,
          fluid: !1,
          inverted: !1,
          label: 'Label',
          labelPosition: 'left',
          pointing: 'right',
          loading: !1,
          negative: !1,
          positive: !1,
          size: 'medium',
          toggle: !1,
          type: 'button',
        };
      t['default'] = () =>
        n().createElement(r.default, (0, i.Z)({ isTpl: !1 }, o));
    },
    67776: function (e, t, a) {
      'use strict';
      a.r(t);
      var i = a(93224),
        l = a(12924),
        n = a.n(l),
        r = a(76763),
        o = a(48237),
        c = a(87401),
        s = a(21843),
        d = a.n(s),
        u = ['isTpl'],
        p = (e) => {
          var t = e.isTpl,
            a = (0, i.Z)(e, u),
            l = a.text,
            s = a.basic,
            p = a.circular,
            v = a.color,
            f = a.compact,
            m = a.disabled,
            b = a.fluid,
            h = a.inverted,
            g = a.label,
            Z = a.labelPosition,
            y = a.loading,
            G = a.negative,
            E = a.positive,
            k = a.size,
            N = a.toggle,
            C = a.type,
            x = a.pointing;
          return n().createElement(
            n().Fragment,
            null,
            t && n().createElement(r.Z, { src: d(), size: 'small' }),
            !t &&
              n().createElement(
                'div',
                null,
                0 === g.length &&
                  n().createElement(
                    o.Z,
                    {
                      basic: s,
                      circular: p,
                      color: v,
                      compact: f,
                      disabled: m,
                      fluid: b,
                      inverted: h,
                      loading: y,
                      negative: G,
                      positive: E,
                      size: k,
                      toggle: N,
                      type: C,
                    },
                    l,
                  ),
                0 !== g.length &&
                  n().createElement(
                    o.Z,
                    { as: 'div', labelPosition: Z },
                    n().createElement(c.Z, { pointing: x }, g),
                    n().createElement(
                      o.Z,
                      {
                        basic: s,
                        circular: p,
                        color: v,
                        compact: f,
                        disabled: m,
                        fluid: b,
                        inverted: h,
                        loading: y,
                        negative: G,
                        positive: E,
                        size: k,
                        toggle: N,
                        type: C,
                      },
                      l,
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
      var i = a(22122),
        l = a(41788),
        n = a(23715),
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
          l = e.content,
          n = e.hidden,
          r = e.visible,
          o = (0, c.default)(
            (0, p.lG)(r, 'visible'),
            (0, p.lG)(n, 'hidden'),
            'content',
            a,
          ),
          s = (0, v.Z)(g, e),
          m = (0, f.Z)(g, e);
        return d().createElement(
          m,
          (0, i.Z)({}, s, { className: o }),
          u.kK(t) ? l : t,
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
        y = a(30014);
      function G(e) {
        var t = e.attached,
          a = e.basic,
          l = e.buttons,
          n = e.children,
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
          B = (0, v.Z)(G, e),
          U = (0, f.Z)(G, e);
        return (0, r.Z)(l)
          ? d().createElement(
              U,
              (0, i.Z)({}, B, { className: w }),
              u.kK(n) ? b : n,
            )
          : d().createElement(
              U,
              (0, i.Z)({}, B, { className: w }),
              (0, y.Z)(l, function (e) {
                return x.create(e);
              }),
            );
      }
      (G.handledProps = [
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
        (G.propTypes = {});
      var E = G;
      function k(e) {
        var t = e.className,
          a = e.text,
          l = (0, c.default)('or', t),
          n = (0, v.Z)(k, e),
          r = (0, f.Z)(k, e);
        return d().createElement(
          r,
          (0, i.Z)({}, n, { className: l, 'data-text': a }),
        );
      }
      (k.handledProps = ['as', 'className', 'text']), (k.propTypes = {});
      var N = k,
        C = (function (e) {
          function t() {
            for (
              var t, a = arguments.length, i = new Array(a), l = 0;
              l < a;
              l++
            )
              i[l] = arguments[l];
            return (
              (t = e.call.apply(e, [this].concat(i)) || this),
              (t.ref = (0, s.createRef)()),
              (t.computeElementType = function () {
                var e = t.props,
                  a = e.attached,
                  i = e.label;
                if (!(0, r.Z)(a) || !(0, r.Z)(i)) return 'div';
              }),
              (t.computeTabIndex = function (e) {
                var a = t.props,
                  i = a.disabled,
                  l = a.tabIndex;
                return (0, r.Z)(l) ? (i ? -1 : 'div' === e ? 0 : void 0) : l;
              }),
              (t.focus = function (e) {
                return (0, n.Z)(t.ref.current, 'focus', e);
              }),
              (t.handleClick = function (e) {
                var a = t.props.disabled;
                a
                  ? e.preventDefault()
                  : (0, n.Z)(t.props, 'onClick', e, t.props);
              }),
              (t.hasIconClass = function () {
                var e = t.props,
                  a = e.labelPosition,
                  i = e.children,
                  l = e.content,
                  n = e.icon;
                return !0 === n || (n && (a || (u.kK(i) && (0, r.Z)(l))));
              }),
              t
            );
          }
          (0, l.Z)(t, e);
          var a = t.prototype;
          return (
            (a.computeButtonAriaRole = function (e) {
              var t = this.props.role;
              return (0, r.Z)(t) ? ('button' !== e ? 'button' : void 0) : t;
            }),
            (a.render = function () {
              var e = this.props,
                a = e.active,
                l = e.animated,
                n = e.attached,
                s = e.basic,
                m = e.children,
                g = e.circular,
                Z = e.className,
                y = e.color,
                G = e.compact,
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
                B = e.secondary,
                U = e.size,
                A = e.toggle,
                D = e.type,
                F = (0, c.default)(
                  y,
                  U,
                  (0, p.lG)(a, 'active'),
                  (0, p.lG)(s, 'basic'),
                  (0, p.lG)(g, 'circular'),
                  (0, p.lG)(G, 'compact'),
                  (0, p.lG)(C, 'fluid'),
                  (0, p.lG)(this.hasIconClass(), 'icon'),
                  (0, p.lG)(P, 'inverted'),
                  (0, p.lG)(I, 'loading'),
                  (0, p.lG)(K, 'negative'),
                  (0, p.lG)(R, 'positive'),
                  (0, p.lG)(w, 'primary'),
                  (0, p.lG)(B, 'secondary'),
                  (0, p.lG)(A, 'toggle'),
                  (0, p.sU)(l, 'animated'),
                  (0, p.sU)(n, 'attached'),
                ),
                H = (0, c.default)((0, p.sU)(z || !!T, 'labeled')),
                L = (0, c.default)(
                  (0, p.lG)(k, 'disabled'),
                  (0, p.cD)(N, 'floated'),
                ),
                O = (0, v.Z)(t, this.props),
                j = (0, f.Z)(t, this.props, this.computeElementType),
                q = this.computeTabIndex(j);
              if (!(0, r.Z)(T)) {
                var J = (0, c.default)('ui', F, 'button', Z),
                  M = (0, c.default)('ui', H, 'button', Z, L),
                  Q = h.Z.create(T, {
                    defaultProps: {
                      basic: !0,
                      pointing: 'left' === z ? 'right' : 'left',
                    },
                    autoGenerateKey: !1,
                  });
                return d().createElement(
                  j,
                  (0, i.Z)({}, O, { className: M, onClick: this.handleClick }),
                  'left' === z && Q,
                  d().createElement(
                    o.R,
                    { innerRef: this.ref },
                    d().createElement(
                      'button',
                      {
                        className: J,
                        'aria-pressed': A ? !!a : void 0,
                        disabled: k,
                        type: D,
                        tabIndex: q,
                      },
                      b.Z.create(x, { autoGenerateKey: !1 }),
                      ' ',
                      E,
                    ),
                  ),
                  ('right' === z || !z) && Q,
                );
              }
              var S = (0, c.default)('ui', F, L, H, 'button', Z),
                V = !u.kK(m),
                W = this.computeButtonAriaRole(j);
              return d().createElement(
                o.R,
                { innerRef: this.ref },
                d().createElement(
                  j,
                  (0, i.Z)({}, O, {
                    className: S,
                    'aria-pressed': A ? !!a : void 0,
                    disabled: (k && 'button' === j) || void 0,
                    onClick: this.handleClick,
                    role: W,
                    type: D,
                    tabIndex: q,
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
