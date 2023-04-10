(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [832],
  {
    20832: function (e, t, n) {
      'use strict';
      n.r(t);
      var a = n(57337),
        r = n(93224),
        i = n(12924),
        o = n.n(i),
        l = n(18698),
        d = n.n(l),
        s = n(49282),
        c = n(16973),
        u = ['isTpl'],
        p = (e) => {
          var t = e.isTpl,
            n = (0, r.Z)(e, u),
            l = n.label,
            p = n.defaultChecked,
            h = n.disabled,
            f = n.readOnly,
            m = n.fitted,
            Z = (0, i.useState)(p),
            v = (0, a.Z)(Z, 2),
            g = v[0],
            k = v[1],
            b = (t) => {
              var n = !g;
              k(n), e.onChange && e.onChange(n);
            };
          return o().createElement(
            o().Fragment,
            null,
            t && o().createElement(s.Z, { src: d(), alt: 'Radio' }),
            !t &&
              o().createElement(
                'div',
                null,
                o().createElement(c.Z, {
                  label: l,
                  checked: g,
                  onChange: (e) => b(e),
                  disabled: h,
                  readOnly: f,
                  fitted: m,
                }),
              ),
          );
        };
      t['default'] = p;
    },
    18698: function (e, t, n) {
      e.exports = n.p + 'static/Radio.9f92eb3a.svg';
    },
    4015: function (e, t, n) {
      'use strict';
      var a = n(47701),
        r = n(11855),
        i = n(93564),
        o = n(89122),
        l = n(35429);
      function d(e, t, n, d) {
        if (!(0, o.Z)(e)) return e;
        t = (0, r.Z)(t, e);
        var s = -1,
          c = t.length,
          u = c - 1,
          p = e;
        while (null != p && ++s < c) {
          var h = (0, l.Z)(t[s]),
            f = n;
          if ('__proto__' === h || 'constructor' === h || 'prototype' === h)
            return e;
          if (s != u) {
            var m = p[h];
            (f = d ? d(m, h, p) : void 0),
              void 0 === f &&
                (f = (0, o.Z)(m) ? m : (0, i.Z)(t[s + 1]) ? [] : {});
          }
          (0, a.Z)(p, h, f), (p = p[h]);
        }
        return e;
      }
      t['Z'] = d;
    },
    16973: function (e, t, n) {
      'use strict';
      var a = n(22122),
        r = n(12924),
        i = n.n(r),
        o = n(28935),
        l = n(31719);
      function d(e) {
        var t = e.slider,
          n = e.toggle,
          r = e.type,
          s = (0, o.Z)(d, e),
          c = !(t || n) || void 0;
        return i().createElement(
          l.Z,
          (0, a.Z)({}, s, { type: r, radio: c, slider: t, toggle: n }),
        );
      }
      (d.handledProps = ['slider', 'toggle', 'type']),
        (d.propTypes = {}),
        (d.defaultProps = { type: 'radio' }),
        (t['Z'] = d);
    },
    31719: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return b;
        },
      });
      var a = n(22122),
        r = n(41788),
        i = n(4015);
      function o(e, t, n) {
        return null == e ? e : (0, i.Z)(e, t, n);
      }
      var l = o,
        d = n(23715),
        s = n(55288),
        c = n(31368),
        u = n(86010),
        p = (n(55301), n(12924)),
        h = n.n(p),
        f = n(92063),
        m = n(28935),
        Z = n(12519),
        v = n(4394),
        g = n(93619),
        k = n(90327),
        b = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, r = new Array(n), i = 0;
              i < n;
              i++
            )
              r[i] = arguments[i];
            return (
              (t = e.call.apply(e, [this].concat(r)) || this),
              (t.inputRef = (0, p.createRef)()),
              (t.labelRef = (0, p.createRef)()),
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
                return (0, s.Z)(a) ? (n ? -1 : 0) : a;
              }),
              (t.handleClick = function (e) {
                var n = t.props.id,
                  r = t.state,
                  i = r.checked,
                  o = r.indeterminate,
                  l = (0, d.Z)(t.inputRef.current, 'contains', e.target),
                  c = (0, d.Z)(t.labelRef.current, 'contains', e.target),
                  u = !c && !l,
                  p = !(0, s.Z)(n),
                  h = c && p;
                h ||
                  (0, d.Z)(
                    t.props,
                    'onClick',
                    e,
                    (0, a.Z)({}, t.props, { checked: !i, indeterminate: !!o }),
                  ),
                  t.isClickFromMouse &&
                    ((t.isClickFromMouse = !1),
                    c && !p && t.handleChange(e),
                    u && t.handleChange(e),
                    c && p && e.stopPropagation());
              }),
              (t.handleChange = function (e) {
                var n = t.state.checked;
                t.canToggle() &&
                  ((0, d.Z)(
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
                (0, d.Z)(
                  t.props,
                  'onMouseDown',
                  e,
                  (0, a.Z)({}, t.props, { checked: !!r, indeterminate: !!i }),
                ),
                  e.defaultPrevented || (0, d.Z)(t.inputRef.current, 'focus'),
                  e.preventDefault();
              }),
              (t.handleMouseUp = function (e) {
                var n = t.state,
                  r = n.checked,
                  i = n.indeterminate;
                (t.isClickFromMouse = !0),
                  (0, d.Z)(
                    t.props,
                    'onMouseUp',
                    e,
                    (0, a.Z)({}, t.props, { checked: !!r, indeterminate: !!i }),
                  );
              }),
              (t.setIndeterminate = function () {
                var e = t.state.indeterminate;
                l(t.inputRef, 'current.indeterminate', !!e);
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
                o = e.id,
                l = e.name,
                d = e.radio,
                p = e.readOnly,
                k = e.slider,
                b = e.toggle,
                C = e.type,
                y = e.value,
                R = this.state,
                M = R.checked,
                E = R.indeterminate,
                w = (0, u.default)(
                  'ui',
                  (0, f.lG)(M, 'checked'),
                  (0, f.lG)(r, 'disabled'),
                  (0, f.lG)(E, 'indeterminate'),
                  (0, f.lG)((0, s.Z)(i), 'fitted'),
                  (0, f.lG)(d, 'radio'),
                  (0, f.lG)(p, 'read-only'),
                  (0, f.lG)(k, 'slider'),
                  (0, f.lG)(b, 'toggle'),
                  'checkbox',
                  n,
                ),
                G = (0, m.Z)(t, this.props),
                I = (0, Z.Z)(t, this.props),
                P = (0, v.vR)(G, { htmlProps: v._l }),
                x = P[0],
                D = P[1],
                T =
                  (0, g.i9)(i, {
                    defaultProps: { htmlFor: o },
                    autoGenerateKey: !1,
                  }) || h().createElement('label', { htmlFor: o });
              return h().createElement(
                I,
                (0, a.Z)({}, D, {
                  className: w,
                  onClick: this.handleClick,
                  onChange: this.handleChange,
                  onMouseDown: this.handleMouseDown,
                  onMouseUp: this.handleMouseUp,
                }),
                h().createElement(
                  c.R,
                  { innerRef: this.inputRef },
                  h().createElement(
                    'input',
                    (0, a.Z)({}, x, {
                      checked: M,
                      className: 'hidden',
                      disabled: r,
                      id: o,
                      name: l,
                      readOnly: !0,
                      tabIndex: this.computeTabIndex(),
                      type: C,
                      value: y,
                    }),
                  ),
                ),
                h().createElement(c.R, { innerRef: this.labelRef }, T),
              );
            }),
            t
          );
        })(k.Z);
      (b.handledProps = [
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
        (b.propTypes = {}),
        (b.defaultProps = { type: 'checkbox' }),
        (b.autoControlledProps = ['checked', 'indeterminate']);
    },
  },
]);
