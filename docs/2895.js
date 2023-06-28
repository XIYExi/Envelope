(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [2895, 581],
  {
    44408: function () {},
    92895: function (e, t, a) {
      'use strict';
      a.r(t);
      var n = a(91896),
        r = a(12924),
        o = a.n(r),
        l = a(60581),
        c = {
          allowClear: !1,
          allowHalf: !1,
          autoFocus: !1,
          character: 'StarFilled',
          count: 5,
          defaultValue: 0,
          disabled: !1,
        };
      t['default'] = () =>
        o().createElement(l.default, (0, n.Z)({ isTpl: !1 }, c));
    },
    60581: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return N;
          },
        });
      a(38663), a(44408), a(22385);
      var n = a(22122),
        r = a(51120),
        o = a(28991),
        l = a(96156),
        c = a(6610),
        u = a(5991),
        i = a(10379),
        s = a(54070),
        f = a(12924),
        v = a.n(f),
        d = a(34203),
        p = a(94184),
        h = a.n(p),
        m = a(15105);
      function y(e) {
        var t = e.pageXOffset,
          a = 'scrollLeft';
        if ('number' !== typeof t) {
          var n = e.document;
          (t = n.documentElement[a]), 'number' !== typeof t && (t = n.body[a]);
        }
        return t;
      }
      function C(e) {
        var t,
          a,
          n = e.ownerDocument,
          r = n.body,
          o = n && n.documentElement,
          l = e.getBoundingClientRect();
        return (
          (t = l.left),
          (a = l.top),
          (t -= o.clientLeft || r.clientLeft || 0),
          (a -= o.clientTop || r.clientTop || 0),
          { left: t, top: a }
        );
      }
      function g(e) {
        var t = C(e),
          a = e.ownerDocument,
          n = a.defaultView || a.parentWindow;
        return (t.left += y(n)), t.left;
      }
      var w = (function (e) {
        (0, i.Z)(a, e);
        var t = (0, s.Z)(a);
        function a() {
          var e;
          (0, c.Z)(this, a);
          for (var n = arguments.length, r = new Array(n), o = 0; o < n; o++)
            r[o] = arguments[o];
          return (
            (e = t.call.apply(t, [this].concat(r))),
            (e.onHover = function (t) {
              var a = e.props,
                n = a.onHover,
                r = a.index;
              n(t, r);
            }),
            (e.onClick = function (t) {
              var a = e.props,
                n = a.onClick,
                r = a.index;
              n(t, r);
            }),
            (e.onKeyDown = function (t) {
              var a = e.props,
                n = a.onClick,
                r = a.index;
              13 === t.keyCode && n(t, r);
            }),
            e
          );
        }
        return (
          (0, u.Z)(a, [
            {
              key: 'getClassName',
              value: function () {
                var e = this.props,
                  t = e.prefixCls,
                  a = e.index,
                  n = e.value,
                  r = e.allowHalf,
                  o = e.focused,
                  l = a + 1,
                  c = t;
                return (
                  0 === n && 0 === a && o
                    ? (c += ' '.concat(t, '-focused'))
                    : r && n + 0.5 >= l && n < l
                    ? ((c += ' '.concat(t, '-half ').concat(t, '-active')),
                      o && (c += ' '.concat(t, '-focused')))
                    : ((c += ' '.concat(t, l <= n ? '-full' : '-zero')),
                      l === n && o && (c += ' '.concat(t, '-focused'))),
                  c
                );
              },
            },
            {
              key: 'render',
              value: function () {
                var e = this.onHover,
                  t = this.onClick,
                  a = this.onKeyDown,
                  n = this.props,
                  r = n.disabled,
                  o = n.prefixCls,
                  l = n.character,
                  c = n.characterRender,
                  u = n.index,
                  i = n.count,
                  s = n.value,
                  f = 'function' === typeof l ? l(this.props) : l,
                  d = v().createElement(
                    'li',
                    { className: this.getClassName() },
                    v().createElement(
                      'div',
                      {
                        onClick: r ? null : t,
                        onKeyDown: r ? null : a,
                        onMouseMove: r ? null : e,
                        role: 'radio',
                        'aria-checked': s > u ? 'true' : 'false',
                        'aria-posinset': u + 1,
                        'aria-setsize': i,
                        tabIndex: r ? -1 : 0,
                      },
                      v().createElement(
                        'div',
                        { className: ''.concat(o, '-first') },
                        f,
                      ),
                      v().createElement(
                        'div',
                        { className: ''.concat(o, '-second') },
                        f,
                      ),
                    ),
                  );
                return c && (d = c(d, this.props)), d;
              },
            },
          ]),
          a
        );
      })(v().Component);
      function b() {}
      var k = (function (e) {
        (0, i.Z)(a, e);
        var t = (0, s.Z)(a);
        function a(e) {
          var n;
          (0, c.Z)(this, a),
            (n = t.call(this, e)),
            (n.stars = void 0),
            (n.rate = void 0),
            (n.onHover = function (e, t) {
              var a = n.props.onHoverChange,
                r = n.getStarValue(t, e.pageX),
                o = n.state.cleanedValue;
              r !== o && n.setState({ hoverValue: r, cleanedValue: null }),
                a(r);
            }),
            (n.onMouseLeave = function () {
              var e = n.props.onHoverChange;
              n.setState({ hoverValue: void 0, cleanedValue: null }), e(void 0);
            }),
            (n.onClick = function (e, t) {
              var a = n.props.allowClear,
                r = n.state.value,
                o = n.getStarValue(t, e.pageX),
                l = !1;
              a && (l = o === r),
                n.onMouseLeave(),
                n.changeValue(l ? 0 : o),
                n.setState({ cleanedValue: l ? o : null });
            }),
            (n.onFocus = function () {
              var e = n.props.onFocus;
              n.setState({ focused: !0 }), e && e();
            }),
            (n.onBlur = function () {
              var e = n.props.onBlur;
              n.setState({ focused: !1 }), e && e();
            }),
            (n.onKeyDown = function (e) {
              var t = e.keyCode,
                a = n.props,
                r = a.count,
                o = a.allowHalf,
                l = a.onKeyDown,
                c = a.direction,
                u = 'rtl' === c,
                i = n.state.value;
              t === m.Z.RIGHT && i < r && !u
                ? ((i += o ? 0.5 : 1), n.changeValue(i), e.preventDefault())
                : (t === m.Z.LEFT && i > 0 && !u) ||
                  (t === m.Z.RIGHT && i > 0 && u)
                ? ((i -= o ? 0.5 : 1), n.changeValue(i), e.preventDefault())
                : t === m.Z.LEFT &&
                  i < r &&
                  u &&
                  ((i += o ? 0.5 : 1), n.changeValue(i), e.preventDefault()),
                l && l(e);
            }),
            (n.saveRef = function (e) {
              return function (t) {
                n.stars[e] = t;
              };
            }),
            (n.saveRate = function (e) {
              n.rate = e;
            });
          var r = e.value;
          return (
            void 0 === r && (r = e.defaultValue),
            (n.stars = {}),
            (n.state = { value: r, focused: !1, cleanedValue: null }),
            n
          );
        }
        return (
          (0, u.Z)(
            a,
            [
              {
                key: 'componentDidMount',
                value: function () {
                  var e = this.props,
                    t = e.autoFocus,
                    a = e.disabled;
                  t && !a && this.focus();
                },
              },
              {
                key: 'getStarDOM',
                value: function (e) {
                  return (0, d.Z)(this.stars[e]);
                },
              },
              {
                key: 'getStarValue',
                value: function (e, t) {
                  var a = this.props,
                    n = a.allowHalf,
                    r = a.direction,
                    o = 'rtl' === r,
                    l = e + 1;
                  if (n) {
                    var c = this.getStarDOM(e),
                      u = g(c),
                      i = c.clientWidth;
                    ((o && t - u > i / 2) || (!o && t - u < i / 2)) &&
                      (l -= 0.5);
                  }
                  return l;
                },
              },
              {
                key: 'focus',
                value: function () {
                  var e = this.props.disabled;
                  e || this.rate.focus();
                },
              },
              {
                key: 'blur',
                value: function () {
                  var e = this.props.disabled;
                  e || this.rate.blur();
                },
              },
              {
                key: 'changeValue',
                value: function (e) {
                  var t = this.props.onChange;
                  'value' in this.props || this.setState({ value: e }), t(e);
                },
              },
              {
                key: 'render',
                value: function () {
                  for (
                    var e = this.props,
                      t = e.count,
                      a = e.allowHalf,
                      n = e.style,
                      r = e.prefixCls,
                      o = e.disabled,
                      c = e.className,
                      u = e.character,
                      i = e.characterRender,
                      s = e.tabIndex,
                      f = e.direction,
                      d = this.state,
                      p = d.value,
                      m = d.hoverValue,
                      y = d.focused,
                      C = [],
                      g = o ? ''.concat(r, '-disabled') : '',
                      b = 0;
                    b < t;
                    b += 1
                  )
                    C.push(
                      v().createElement(w, {
                        ref: this.saveRef(b),
                        index: b,
                        count: t,
                        disabled: o,
                        prefixCls: ''.concat(r, '-star'),
                        allowHalf: a,
                        value: void 0 === m ? p : m,
                        onClick: this.onClick,
                        onHover: this.onHover,
                        key: b,
                        character: u,
                        characterRender: i,
                        focused: y,
                      }),
                    );
                  var k = h()(
                    r,
                    g,
                    c,
                    (0, l.Z)({}, ''.concat(r, '-rtl'), 'rtl' === f),
                  );
                  return v().createElement(
                    'ul',
                    {
                      className: k,
                      style: n,
                      onMouseLeave: o ? null : this.onMouseLeave,
                      tabIndex: o ? -1 : s,
                      onFocus: o ? null : this.onFocus,
                      onBlur: o ? null : this.onBlur,
                      onKeyDown: o ? null : this.onKeyDown,
                      ref: this.saveRate,
                      role: 'radiogroup',
                    },
                    C,
                  );
                },
              },
            ],
            [
              {
                key: 'getDerivedStateFromProps',
                value: function (e, t) {
                  return 'value' in e && void 0 !== e.value
                    ? (0, o.Z)((0, o.Z)({}, t), {}, { value: e.value })
                    : t;
                },
              },
            ],
          ),
          a
        );
      })(v().Component);
      k.defaultProps = {
        defaultValue: 0,
        count: 5,
        allowHalf: !1,
        allowClear: !0,
        style: {},
        prefixCls: 'rc-rate',
        onChange: b,
        character: '\u2605',
        onHoverChange: b,
        tabIndex: 0,
        direction: 'ltr',
      };
      var x = k,
        Z = x,
        E = a(53124),
        V = a(94199),
        H = function (e, t) {
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
        D = f.forwardRef(function (e, t) {
          var a = e.prefixCls,
            o = e.tooltips,
            l = e.character,
            c = void 0 === l ? f.createElement(r.Z, null) : l,
            u = H(e, ['prefixCls', 'tooltips', 'character']),
            i = function (e, t) {
              var a = t.index;
              return o ? f.createElement(V.Z, { title: o[a] }, e) : e;
            },
            s = f.useContext(E.E_),
            v = s.getPrefixCls,
            d = s.direction,
            p = v('rate', a);
          return f.createElement(
            Z,
            (0, n.Z)({ ref: t, character: c, characterRender: i }, u, {
              prefixCls: p,
              direction: d,
            }),
          );
        });
      var S = D,
        F = (a(12968), a(6122)),
        R = a(2824),
        O = a(93224),
        L = a(71706),
        M = a(72052),
        T = a.n(M),
        I = ['isTpl'],
        K = (e) => {
          var t = e.isTpl,
            a = (0, O.Z)(e, I),
            n = a.onChange,
            r = a.allowClear,
            o = a.allowHalf,
            l = a.autoFocus,
            c = a.character,
            u = a.count,
            i = a.defaultValue,
            s = a.disabled,
            d = (0, f.useState)(i),
            p = (0, R.Z)(d, 2),
            h = p[0],
            m = p[1],
            y = (e) => {
              m(e), n && n(e);
            };
          return v().createElement(
            v().Fragment,
            null,
            t &&
              v().createElement(
                'div',
                null,
                v().createElement(F.Z, { preview: !1, src: T(), alt: '' }),
              ),
            !t &&
              v().createElement(
                'div',
                null,
                v().createElement(S, {
                  allowClear: r,
                  allowHalf: o,
                  autoFocus: l,
                  character: v().createElement(L[c]),
                  count: u,
                  value: h,
                  disabled: s,
                  onChange: (e) => y(e),
                }),
              ),
          );
        },
        N = (0, f.memo)(K);
    },
    72052: function (e, t, a) {
      e.exports = a.p + 'static/Rate.bbec1895.svg';
    },
  },
]);
