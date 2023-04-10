(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [651, 2966],
  {
    10651: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(91896),
        r = n(12924),
        l = n.n(r),
        i = n(42966),
        d = {
          label: 'CheckBox',
          defaultChecked: !1,
          disabled: !1,
          fitted: !1,
          readOnly: !1,
          type: 'checkbox',
        };
      t['default'] = () =>
        l().createElement(i.default, (0, a.Z)({ isTpl: !1 }, d));
    },
    42966: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(57337),
        r = n(93224),
        l = n(12924),
        i = n.n(l),
        d = n(47144),
        c = n.n(d),
        o = n(31719),
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
            b = (0, l.useState)(h),
            Z = (0, a.Z)(b, 2),
            g = Z[0],
            v = Z[1],
            C = (t) => {
              var n = t.target.checked;
              v(n), e.onChange && e.onChange(t);
            };
          (0, l.useEffect)(() => {
            v(h);
          }, [h]);
          var y = () => {
            switch (k) {
              case 'checkbox':
                return i().createElement(o.Z, {
                  type: 'checkbox',
                  label: d,
                  checked: g,
                  disabled: p,
                  fitted: f,
                  readOnly: m,
                  onChange: (e) => C(e),
                });
              case 'toggle':
                return i().createElement(o.Z, {
                  toggle: !0,
                  label: d,
                  checked: g,
                  disabled: p,
                  fitted: f,
                  readOnly: m,
                  onChange: (e) => C(e),
                });
              case 'slider':
                return i().createElement(o.Z, {
                  slider: !0,
                  label: d,
                  checked: g,
                  disabled: p,
                  fitted: f,
                  readOnly: m,
                  onChange: (e) => C(e),
                });
              default:
                return i().createElement(o.Z, {
                  type: 'checkbox',
                  label: d,
                  checked: g,
                  disabled: p,
                  fitted: f,
                  readOnly: m,
                  onChange: (e) => C(e),
                });
            }
          };
          return i().createElement(
            i().Fragment,
            null,
            t && i().createElement(s.Z, { src: c(), alt: 'CheckBox' }),
            !t && i().createElement('div', null, y()),
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
        l = n(93564),
        i = n(89122),
        d = n(35429);
      function c(e, t, n, c) {
        if (!(0, i.Z)(e)) return e;
        t = (0, r.Z)(t, e);
        var o = -1,
          s = t.length,
          u = s - 1,
          h = e;
        while (null != h && ++o < s) {
          var p = (0, d.Z)(t[o]),
            f = n;
          if ('__proto__' === p || 'constructor' === p || 'prototype' === p)
            return e;
          if (o != u) {
            var m = h[p];
            (f = c ? c(m, p, h) : void 0),
              void 0 === f &&
                (f = (0, i.Z)(m) ? m : (0, l.Z)(t[o + 1]) ? [] : {});
          }
          (0, a.Z)(h, p, f), (h = h[p]);
        }
        return e;
      }
      t['Z'] = c;
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
        l = n(4015);
      function i(e, t, n) {
        return null == e ? e : (0, l.Z)(e, t, n);
      }
      var d = i,
        c = n(23715),
        o = n(55288),
        s = n(31368),
        u = n(86010),
        h = (n(55301), n(12924)),
        p = n.n(h),
        f = n(92063),
        m = n(28935),
        k = n(12519),
        b = n(4394),
        Z = n(93619),
        g = n(90327),
        v = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, r = new Array(n), l = 0;
              l < n;
              l++
            )
              r[l] = arguments[l];
            return (
              (t = e.call.apply(e, [this].concat(r)) || this),
              (t.inputRef = (0, h.createRef)()),
              (t.labelRef = (0, h.createRef)()),
              (t.canToggle = function () {
                var e = t.props,
                  n = e.disabled,
                  a = e.radio,
                  r = e.readOnly,
                  l = t.state.checked;
                return !n && !r && !(a && l);
              }),
              (t.computeTabIndex = function () {
                var e = t.props,
                  n = e.disabled,
                  a = e.tabIndex;
                return (0, o.Z)(a) ? (n ? -1 : 0) : a;
              }),
              (t.handleClick = function (e) {
                var n = t.props.id,
                  r = t.state,
                  l = r.checked,
                  i = r.indeterminate,
                  d = (0, c.Z)(t.inputRef.current, 'contains', e.target),
                  s = (0, c.Z)(t.labelRef.current, 'contains', e.target),
                  u = !s && !d,
                  h = !(0, o.Z)(n),
                  p = s && h;
                p ||
                  (0, c.Z)(
                    t.props,
                    'onClick',
                    e,
                    (0, a.Z)({}, t.props, { checked: !l, indeterminate: !!i }),
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
                  ((0, c.Z)(
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
                  l = n.indeterminate;
                (0, c.Z)(
                  t.props,
                  'onMouseDown',
                  e,
                  (0, a.Z)({}, t.props, { checked: !!r, indeterminate: !!l }),
                ),
                  e.defaultPrevented || (0, c.Z)(t.inputRef.current, 'focus'),
                  e.preventDefault();
              }),
              (t.handleMouseUp = function (e) {
                var n = t.state,
                  r = n.checked,
                  l = n.indeterminate;
                (t.isClickFromMouse = !0),
                  (0, c.Z)(
                    t.props,
                    'onMouseUp',
                    e,
                    (0, a.Z)({}, t.props, { checked: !!r, indeterminate: !!l }),
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
                l = e.label,
                i = e.id,
                d = e.name,
                c = e.radio,
                h = e.readOnly,
                g = e.slider,
                v = e.toggle,
                C = e.type,
                y = e.value,
                x = this.state,
                R = x.checked,
                E = x.indeterminate,
                M = (0, u.default)(
                  'ui',
                  (0, f.lG)(R, 'checked'),
                  (0, f.lG)(r, 'disabled'),
                  (0, f.lG)(E, 'indeterminate'),
                  (0, f.lG)((0, o.Z)(l), 'fitted'),
                  (0, f.lG)(c, 'radio'),
                  (0, f.lG)(h, 'read-only'),
                  (0, f.lG)(g, 'slider'),
                  (0, f.lG)(v, 'toggle'),
                  'checkbox',
                  n,
                ),
                w = (0, m.Z)(t, this.props),
                O = (0, k.Z)(t, this.props),
                G = (0, b.vR)(w, { htmlProps: b._l }),
                I = G[0],
                D = G[1],
                T =
                  (0, Z.i9)(l, {
                    defaultProps: { htmlFor: i },
                    autoGenerateKey: !1,
                  }) || p().createElement('label', { htmlFor: i });
              return p().createElement(
                O,
                (0, a.Z)({}, D, {
                  className: M,
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
                    (0, a.Z)({}, I, {
                      checked: R,
                      className: 'hidden',
                      disabled: r,
                      id: i,
                      name: d,
                      readOnly: !0,
                      tabIndex: this.computeTabIndex(),
                      type: C,
                      value: y,
                    }),
                  ),
                ),
                p().createElement(s.R, { innerRef: this.labelRef }, T),
              );
            }),
            t
          );
        })(g.Z);
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
