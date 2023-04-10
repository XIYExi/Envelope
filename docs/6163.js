(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [6163],
  {
    76163: function (e, n, t) {
      'use strict';
      t.r(n),
        t.d(n, {
          default: function () {
            return K;
          },
        });
      var a = t(57337),
        r = t(93224),
        i = t(12924),
        s = t.n(i),
        o = t(72052),
        l = t.n(o),
        c = t(22122),
        p = t(41788),
        d = t(47754),
        u = t(27373),
        h = t(98392),
        g = 9007199254740991,
        f = 4294967295,
        v = Math.min;
      function m(e, n) {
        if (((e = (0, h.Z)(e)), e < 1 || e > g)) return [];
        var t = f,
          a = v(e, f);
        (n = (0, u.Z)(n)), (e -= f);
        var r = (0, d.Z)(a, n);
        while (++t < e) n(t);
        return r;
      }
      var Z = m,
        x = t(23715),
        b = t(86010),
        R = (t(55301), t(92063)),
        k = t(28935),
        y = t(12519),
        E = t(90327),
        C = t(47630),
        M = t.n(C),
        I = (function (e) {
          function n() {
            for (
              var n, t = arguments.length, a = new Array(t), r = 0;
              r < t;
              r++
            )
              a[r] = arguments[r];
            return (
              (n = e.call.apply(e, [this].concat(a)) || this),
              (n.handleClick = function (e) {
                (0, x.Z)(n.props, 'onClick', e, n.props);
              }),
              (n.handleKeyUp = function (e) {
                switch (
                  ((0, x.Z)(n.props, 'onKeyUp', e, n.props), M().getCode(e))
                ) {
                  case M().Enter:
                  case M().Spacebar:
                    e.preventDefault(),
                      (0, x.Z)(n.props, 'onClick', e, n.props);
                    break;
                  default:
                }
              }),
              (n.handleMouseEnter = function (e) {
                (0, x.Z)(n.props, 'onMouseEnter', e, n.props);
              }),
              n
            );
          }
          (0, p.Z)(n, e);
          var t = n.prototype;
          return (
            (t.render = function () {
              var e = this.props,
                t = e.active,
                a = e.className,
                r = e.selected,
                i = (0, b.default)(
                  (0, R.lG)(t, 'active'),
                  (0, R.lG)(r, 'selected'),
                  'icon',
                  a,
                ),
                o = (0, k.Z)(n, this.props),
                l = (0, y.Z)(n, this.props);
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
            n
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
        function n() {
          for (var n, t = arguments.length, a = new Array(t), r = 0; r < t; r++)
            a[r] = arguments[r];
          return (
            (n = e.call.apply(e, [this].concat(a)) || this),
            (n.handleIconClick = function (e, t) {
              var a = t.index,
                r = n.props,
                i = r.clearable,
                s = r.disabled,
                o = r.maxRating,
                l = r.onRate,
                p = n.state.rating;
              if (!s) {
                var d = a + 1;
                'auto' === i && 1 === o
                  ? (d = +!p)
                  : !0 === i && d === p && (d = 0),
                  n.setState({ rating: d, isSelecting: !1 }),
                  l && l(e, (0, c.Z)({}, n.props, { rating: d }));
              }
            }),
            (n.handleIconMouseEnter = function (e, t) {
              var a = t.index;
              n.props.disabled ||
                n.setState({ selectedIndex: a, isSelecting: !0 });
            }),
            (n.handleMouseLeave = function () {
              for (
                var e = arguments.length, t = new Array(e), a = 0;
                a < e;
                a++
              )
                t[a] = arguments[a];
              x.Z.apply(void 0, [n.props, 'onMouseLeave'].concat(t)),
                n.props.disabled ||
                  n.setState({ selectedIndex: -1, isSelecting: !1 });
            }),
            n
          );
        }
        (0, p.Z)(n, e);
        var t = n.prototype;
        return (
          (t.render = function () {
            var e = this,
              t = this.props,
              a = t.className,
              r = t.disabled,
              i = t.icon,
              o = t.maxRating,
              l = t.size,
              p = this.state,
              d = p.rating,
              u = p.selectedIndex,
              h = p.isSelecting,
              g = (0, b.default)(
                'ui',
                i,
                l,
                (0, R.lG)(r, 'disabled'),
                (0, R.lG)(h && !r && u >= 0, 'selected'),
                'rating',
                a,
              ),
              f = (0, k.Z)(n, this.props),
              v = (0, y.Z)(n, this.props);
            return s().createElement(
              v,
              (0, c.Z)({}, f, {
                className: g,
                role: 'radiogroup',
                onMouseLeave: this.handleMouseLeave,
                tabIndex: r ? 0 : -1,
              }),
              Z(o, function (n) {
                return s().createElement(I, {
                  tabIndex: r ? -1 : 0,
                  active: d >= n + 1,
                  'aria-checked': d === n + 1,
                  'aria-posinset': n + 1,
                  'aria-setsize': o,
                  index: n,
                  key: n,
                  onClick: e.handleIconClick,
                  onMouseEnter: e.handleIconMouseEnter,
                  selected: u >= n && h,
                });
              }),
            );
          }),
          n
        );
      })(E.Z);
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
      var w = t(49282),
        N = ['isTpl'],
        z = (e) => {
          var n = e.isTpl,
            t = (0, r.Z)(e, N),
            o = t.defaultRating,
            c = t.disabled,
            p = t.maxRating,
            d = t.size,
            u = t.icon,
            h = (0, i.useState)(o),
            g = (0, a.Z)(h, 2),
            f = g[0],
            v = g[1],
            m = (n, t) => {
              var a = t.rating,
                r = t.maxRating;
              v(a), e.onRate && e.onRate({ rating: a, maxRating: r });
            };
          return s().createElement(
            s().Fragment,
            null,
            n && s().createElement(w.Z, { src: l(), alt: 'Rating' }),
            !n &&
              s().createElement(
                'div',
                null,
                s().createElement(S, {
                  rating: f,
                  maxRating: p,
                  size: d,
                  icon: u,
                  disabled: c,
                  onRate: (e, n) => {
                    var t = n.rating,
                      a = n.maxRating;
                    return m(e, { rating: t, maxRating: a });
                  },
                }),
              ),
          );
        },
        K = z;
    },
    72052: function (e, n, t) {
      e.exports = t.p + 'static/Rate.bbec1895.svg';
    },
  },
]);
