(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [2966],
  {
    42966: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(57337),
        r = n(93224),
        i = n(12924),
        l = n.n(i),
        d = n(47144),
        o = n.n(d),
        c = n(31719),
        s = n(49282),
        u = ['isTpl'],
        h = (e) => {
          var t = e.isTpl,
            n = (0, r.Z)(e, u),
            d = n.label,
            h = n.defaultChecked,
            p = n.disabled,
            f = n.fitted,
            m = n.readOnly,
            k = n.type,
            Z = (0, i.useState)(h),
            g = (0, a.Z)(Z, 2),
            b = g[0],
            v = g[1],
            C = (t) => {
              var n = t.target.checked;
              v(n), e.onChange && e.onChange(t);
            };
          (0, i.useEffect)(() => {
            v(h);
          }, [h]);
          var y = () => {
            switch (k) {
              case 'checkbox':
                return l().createElement(c.Z, {
                  type: 'checkbox',
                  label: d,
                  checked: b,
                  disabled: p,
                  fitted: f,
                  readOnly: m,
                  onChange: (e) => C(e),
                });
              case 'toggle':
                return l().createElement(c.Z, {
                  toggle: !0,
                  label: d,
                  checked: b,
                  disabled: p,
                  fitted: f,
                  readOnly: m,
                  onChange: (e) => C(e),
                });
              case 'slider':
                return l().createElement(c.Z, {
                  slider: !0,
                  label: d,
                  checked: b,
                  disabled: p,
                  fitted: f,
                  readOnly: m,
                  onChange: (e) => C(e),
                });
              default:
                return l().createElement(c.Z, {
                  type: 'checkbox',
                  label: d,
                  checked: b,
                  disabled: p,
                  fitted: f,
                  readOnly: m,
                  onChange: (e) => C(e),
                });
            }
          };
          return l().createElement(
            l().Fragment,
            null,
            t && l().createElement(s.Z, { src: o(), alt: 'CheckBox' }),
            !t && l().createElement('div', null, y()),
          );
        };
      t['default'] = h;
    },
    47144: function (e, t, n) {
      e.exports = n.p + 'static/CheckBox.68c6da25.svg';
    },
    4015: function (e, t, n) {
      'use strict';
      var a = n(47701),
        r = n(11855),
        i = n(93564),
        l = n(89122),
        d = n(35429);
      function o(e, t, n, o) {
        if (!(0, l.Z)(e)) return e;
        t = (0, r.Z)(t, e);
        var c = -1,
          s = t.length,
          u = s - 1,
          h = e;
        while (null != h && ++c < s) {
          var p = (0, d.Z)(t[c]),
            f = n;
          if ('__proto__' === p || 'constructor' === p || 'prototype' === p)
            return e;
          if (c != u) {
            var m = h[p];
            (f = o ? o(m, p, h) : void 0),
              void 0 === f &&
                (f = (0, l.Z)(m) ? m : (0, i.Z)(t[c + 1]) ? [] : {});
          }
          (0, a.Z)(h, p, f), (h = h[p]);
        }
        return e;
      }
      t['Z'] = o;
    },
    31719: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return v;
        },
      });
      var a = n(22122),
        r = n(41788),
        i = n(4015);
      function l(e, t, n) {
        return null == e ? e : (0, i.Z)(e, t, n);
      }
      var d = l,
        o = n(23715),
        c = n(55288),
        s = n(31368),
        u = n(86010),
        h = (n(55301), n(12924)),
        p = n.n(h),
        f = n(92063),
        m = n(28935),
        k = n(12519),
        Z = n(4394),
        g = n(93619),
        b = n(90327),
        v = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, r = new Array(n), i = 0;
              i < n;
              i++
            )
              r[i] = arguments[i];
            return (
              (t = e.call.apply(e, [this].concat(r)) || this),
              (t.inputRef = (0, h.createRef)()),
              (t.labelRef = (0, h.createRef)()),
              (t.canToggle = function () {
                var e = t.props,
                  n = e.disabled,
                  a = e.radio,
                  r = e.readOnly,
                  i = t.state.checked;
                return !n && !r && !(a && i);
              }),
              (t.computeTabIndex = function () {
                var e = t.props,
                  n = e.disabled,
                  a = e.tabIndex;
                return (0, c.Z)(a) ? (n ? -1 : 0) : a;
              }),
              (t.handleClick = function (e) {
                var n = t.props.id,
                  r = t.state,
                  i = r.checked,
                  l = r.indeterminate,
                  d = (0, o.Z)(t.inputRef.current, 'contains', e.target),
                  s = (0, o.Z)(t.labelRef.current, 'contains', e.target),
                  u = !s && !d,
                  h = !(0, c.Z)(n),
                  p = s && h;
                p ||
                  (0, o.Z)(
                    t.props,
                    'onClick',
                    e,
                    (0, a.Z)({}, t.props, { checked: !i, indeterminate: !!l }),
                  ),
                  t.isClickFromMouse &&
                    ((t.isClickFromMouse = !1),
                    s && !h && t.handleChange(e),
                    u && t.handleChange(e),
                    s && h && e.stopPropagation());
              }),
              (t.handleChange = function (e) {
                var n = t.state.checked;
                t.canToggle() &&
                  ((0, o.Z)(
                    t.props,
                    'onChange',
                    e,
                    (0, a.Z)({}, t.props, { checked: !n, indeterminate: !1 }),
                  ),
                  t.setState({ checked: !n, indeterminate: !1 }));
              }),
              (t.handleMouseDown = function (e) {
                var n = t.state,
                  r = n.checked,
                  i = n.indeterminate;
                (0, o.Z)(
                  t.props,
                  'onMouseDown',
                  e,
                  (0, a.Z)({}, t.props, { checked: !!r, indeterminate: !!i }),
                ),
                  e.defaultPrevented || (0, o.Z)(t.inputRef.current, 'focus'),
                  e.preventDefault();
              }),
              (t.handleMouseUp = function (e) {
                var n = t.state,
                  r = n.checked,
                  i = n.indeterminate;
                (t.isClickFromMouse = !0),
                  (0, o.Z)(
                    t.props,
                    'onMouseUp',
                    e,
                    (0, a.Z)({}, t.props, { checked: !!r, indeterminate: !!i }),
                  );
              }),
              (t.setIndeterminate = function () {
                var e = t.state.indeterminate;
                d(t.inputRef, 'current.indeterminate', !!e);
              }),
              t
            );
          }
          (0, r.Z)(t, e);
          var n = t.prototype;
          return (
            (n.componentDidMount = function () {
              this.setIndeterminate();
            }),
            (n.componentDidUpdate = function () {
              this.setIndeterminate();
            }),
            (n.render = function () {
              var e = this.props,
                n = e.className,
                r = e.disabled,
                i = e.label,
                l = e.id,
                d = e.name,
                o = e.radio,
                h = e.readOnly,
                b = e.slider,
                v = e.toggle,
                C = e.type,
                y = e.value,
                R = this.state,
                M = R.checked,
                x = R.indeterminate,
                E = (0, u.default)(
                  'ui',
                  (0, f.lG)(M, 'checked'),
                  (0, f.lG)(r, 'disabled'),
                  (0, f.lG)(x, 'indeterminate'),
                  (0, f.lG)((0, c.Z)(i), 'fitted'),
                  (0, f.lG)(o, 'radio'),
                  (0, f.lG)(h, 'read-only'),
                  (0, f.lG)(b, 'slider'),
                  (0, f.lG)(v, 'toggle'),
                  'checkbox',
                  n,
                ),
                w = (0, m.Z)(t, this.props),
                G = (0, k.Z)(t, this.props),
                I = (0, Z.vR)(w, { htmlProps: Z._l }),
                O = I[0],
                D = I[1],
                P =
                  (0, g.i9)(i, {
                    defaultProps: { htmlFor: l },
                    autoGenerateKey: !1,
                  }) || p().createElement('label', { htmlFor: l });
              return p().createElement(
                G,
                (0, a.Z)({}, D, {
                  className: E,
                  onClick: this.handleClick,
                  onChange: this.handleChange,
                  onMouseDown: this.handleMouseDown,
                  onMouseUp: this.handleMouseUp,
                }),
                p().createElement(
                  s.R,
                  { innerRef: this.inputRef },
                  p().createElement(
                    'input',
                    (0, a.Z)({}, O, {
                      checked: M,
                      className: 'hidden',
                      disabled: r,
                      id: l,
                      name: d,
                      readOnly: !0,
                      tabIndex: this.computeTabIndex(),
                      type: C,
                      value: y,
                    }),
                  ),
                ),
                p().createElement(s.R, { innerRef: this.labelRef }, P),
              );
            }),
            t
          );
        })(b.Z);
      (v.handledProps = [
        'as',
        'checked',
        'className',
        'defaultChecked',
        'defaultIndeterminate',
        'disabled',
        'fitted',
        'id',
        'indeterminate',
        'label',
        'name',
        'onChange',
        'onClick',
        'onMouseDown',
        'onMouseUp',
        'radio',
        'readOnly',
        'slider',
        'tabIndex',
        'toggle',
        'type',
        'value',
      ]),
        (v.propTypes = {}),
        (v.defaultProps = { type: 'checkbox' }),
        (v.autoControlledProps = ['checked', 'indeterminate']);
    },
  },
]);
