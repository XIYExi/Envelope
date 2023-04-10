(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8065, 6163],
  {
    78065: function (e, t, a) {
      'use strict';
      a.r(t);
      var n = a(91896),
        r = a(12924),
        i = a.n(r),
        s = a(76163),
        o = {
          defaultRating: '3',
          disabled: !1,
          maxRating: '5',
          size: 'large',
          icon: 'heart',
          onRate: (e) => {
            console.log(e);
          },
        };
      t['default'] = () =>
        i().createElement(s.default, (0, n.Z)({ isTpl: !1 }, o));
    },
    76163: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return K;
          },
        });
      var n = a(57337),
        r = a(93224),
        i = a(12924),
        s = a.n(i),
        o = a(72052),
        l = a.n(o),
        c = a(22122),
        p = a(41788),
        d = a(47754),
        u = a(27373),
        h = a(98392),
        g = 9007199254740991,
        f = 4294967295,
        v = Math.min;
      function m(e, t) {
        if (((e = (0, h.Z)(e)), e < 1 || e > g)) return [];
        var a = f,
          n = v(e, f);
        (t = (0, u.Z)(t)), (e -= f);
        var r = (0, d.Z)(n, t);
        while (++a < e) t(a);
        return r;
      }
      var R = m,
        Z = a(23715),
        x = a(86010),
        b = (a(55301), a(92063)),
        E = a(28935),
        k = a(12519),
        y = a(90327),
        C = a(47630),
        M = a.n(C),
        I = (function (e) {
          function t() {
            for (
              var t, a = arguments.length, n = new Array(a), r = 0;
              r < a;
              r++
            )
              n[r] = arguments[r];
            return (
              (t = e.call.apply(e, [this].concat(n)) || this),
              (t.handleClick = function (e) {
                (0, Z.Z)(t.props, 'onClick', e, t.props);
              }),
              (t.handleKeyUp = function (e) {
                switch (
                  ((0, Z.Z)(t.props, 'onKeyUp', e, t.props), M().getCode(e))
                ) {
                  case M().Enter:
                  case M().Spacebar:
                    e.preventDefault(),
                      (0, Z.Z)(t.props, 'onClick', e, t.props);
                    break;
                  default:
                }
              }),
              (t.handleMouseEnter = function (e) {
                (0, Z.Z)(t.props, 'onMouseEnter', e, t.props);
              }),
              t
            );
          }
          (0, p.Z)(t, e);
          var a = t.prototype;
          return (
            (a.render = function () {
              var e = this.props,
                a = e.active,
                n = e.className,
                r = e.selected,
                i = (0, x.default)(
                  (0, b.lG)(a, 'active'),
                  (0, b.lG)(r, 'selected'),
                  'icon',
                  n,
                ),
                o = (0, E.Z)(t, this.props),
                l = (0, k.Z)(t, this.props);
              return s().createElement(
                l,
                (0, c.Z)({}, o, {
                  className: i,
                  onClick: this.handleClick,
                  onKeyUp: this.handleKeyUp,
                  onMouseEnter: this.handleMouseEnter,
                  role: 'radio',
                }),
              );
            }),
            t
          );
        })(i.Component);
      (I.handledProps = [
        'active',
        'as',
        'className',
        'index',
        'onClick',
        'onKeyUp',
        'onMouseEnter',
        'selected',
      ]),
        (I.propTypes = {}),
        (I.defaultProps = { as: 'i' });
      var S = (function (e) {
        function t() {
          for (var t, a = arguments.length, n = new Array(a), r = 0; r < a; r++)
            n[r] = arguments[r];
          return (
            (t = e.call.apply(e, [this].concat(n)) || this),
            (t.handleIconClick = function (e, a) {
              var n = a.index,
                r = t.props,
                i = r.clearable,
                s = r.disabled,
                o = r.maxRating,
                l = r.onRate,
                p = t.state.rating;
              if (!s) {
                var d = n + 1;
                'auto' === i && 1 === o
                  ? (d = +!p)
                  : !0 === i && d === p && (d = 0),
                  t.setState({ rating: d, isSelecting: !1 }),
                  l && l(e, (0, c.Z)({}, t.props, { rating: d }));
              }
            }),
            (t.handleIconMouseEnter = function (e, a) {
              var n = a.index;
              t.props.disabled ||
                t.setState({ selectedIndex: n, isSelecting: !0 });
            }),
            (t.handleMouseLeave = function () {
              for (
                var e = arguments.length, a = new Array(e), n = 0;
                n < e;
                n++
              )
                a[n] = arguments[n];
              Z.Z.apply(void 0, [t.props, 'onMouseLeave'].concat(a)),
                t.props.disabled ||
                  t.setState({ selectedIndex: -1, isSelecting: !1 });
            }),
            t
          );
        }
        (0, p.Z)(t, e);
        var a = t.prototype;
        return (
          (a.render = function () {
            var e = this,
              a = this.props,
              n = a.className,
              r = a.disabled,
              i = a.icon,
              o = a.maxRating,
              l = a.size,
              p = this.state,
              d = p.rating,
              u = p.selectedIndex,
              h = p.isSelecting,
              g = (0, x.default)(
                'ui',
                i,
                l,
                (0, b.lG)(r, 'disabled'),
                (0, b.lG)(h && !r && u >= 0, 'selected'),
                'rating',
                n,
              ),
              f = (0, E.Z)(t, this.props),
              v = (0, k.Z)(t, this.props);
            return s().createElement(
              v,
              (0, c.Z)({}, f, {
                className: g,
                role: 'radiogroup',
                onMouseLeave: this.handleMouseLeave,
                tabIndex: r ? 0 : -1,
              }),
              R(o, function (t) {
                return s().createElement(I, {
                  tabIndex: r ? -1 : 0,
                  active: d >= t + 1,
                  'aria-checked': d === t + 1,
                  'aria-posinset': t + 1,
                  'aria-setsize': o,
                  index: t,
                  key: t,
                  onClick: e.handleIconClick,
                  onMouseEnter: e.handleIconMouseEnter,
                  selected: u >= t && h,
                });
              }),
            );
          }),
          t
        );
      })(y.Z);
      (S.handledProps = [
        'as',
        'className',
        'clearable',
        'defaultRating',
        'disabled',
        'icon',
        'maxRating',
        'onRate',
        'rating',
        'size',
      ]),
        (S.propTypes = {}),
        (S.autoControlledProps = ['rating']),
        (S.defaultProps = { clearable: 'auto', maxRating: 1 }),
        (S.Icon = I);
      var w = a(49282),
        z = ['isTpl'],
        N = (e) => {
          var t = e.isTpl,
            a = (0, r.Z)(e, z),
            o = a.defaultRating,
            c = a.disabled,
            p = a.maxRating,
            d = a.size,
            u = a.icon,
            h = (0, i.useState)(o),
            g = (0, n.Z)(h, 2),
            f = g[0],
            v = g[1],
            m = (t, a) => {
              var n = a.rating,
                r = a.maxRating;
              v(n), e.onRate && e.onRate({ rating: n, maxRating: r });
            };
          return s().createElement(
            s().Fragment,
            null,
            t && s().createElement(w.Z, { src: l(), alt: 'Rating' }),
            !t &&
              s().createElement(
                'div',
                null,
                s().createElement(S, {
                  rating: f,
                  maxRating: p,
                  size: d,
                  icon: u,
                  disabled: c,
                  onRate: (e, t) => {
                    var a = t.rating,
                      n = t.maxRating;
                    return m(e, { rating: a, maxRating: n });
                  },
                }),
              ),
          );
        },
        K = N;
    },
    72052: function (e, t, a) {
      e.exports = a.p + 'static/Rate.bbec1895.svg';
    },
  },
]);
