(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [5878],
  {
    81277: function (n, r, e) {
      'use strict';
      var t = e(85241),
        i = e(77974),
        u = e(27373),
        o = e(39350);
      function a(n, r) {
        var e = (0, o.Z)(n) ? t.Z : i.Z;
        return e(n, (0, u.Z)(r));
      }
      r['Z'] = a;
    },
    23715: function (n, r, e) {
      'use strict';
      e.d(r, {
        Z: function () {
          return h;
        },
      });
      var t = e(84370),
        i = e(11855);
      function u(n) {
        var r = null == n ? 0 : n.length;
        return r ? n[r - 1] : void 0;
      }
      var o = u,
        a = e(23791),
        c = e(94591);
      function l(n, r) {
        return r.length < 2 ? n : (0, a.Z)(n, (0, c.Z)(r, 0, -1));
      }
      var s = l,
        f = e(35429);
      function d(n, r, e) {
        (r = (0, i.Z)(r, n)), (n = s(n, r));
        var u = null == n ? n : n[(0, f.Z)(o(r))];
        return null == u ? void 0 : (0, t.Z)(u, n, e);
      }
      var p = d,
        v = e(8901),
        Z = (0, v.Z)(p),
        h = Z;
    },
    30014: function (n, r, e) {
      'use strict';
      var t = e(80758),
        i = e(71650),
        u = e(89143),
        o = e(39350);
      function a(n, r) {
        var e = (0, o.Z)(n) ? t.Z : u.Z;
        return e(n, (0, i.Z)(r, 3));
      }
      r['Z'] = a;
    },
    1429: function (n, r, e) {
      'use strict';
      e.d(r, {
        Z: function () {
          return f;
        },
      });
      var t = e(93585),
        i = e(71650),
        u = e(77974);
      function o(n, r) {
        var e;
        return (
          (0, u.Z)(n, function (n, t, i) {
            return (e = r(n, t, i)), !e;
          }),
          !!e
        );
      }
      var a = o,
        c = e(39350),
        l = e(40185);
      function s(n, r, e) {
        var u = (0, c.Z)(n) ? t.Z : a;
        return e && (0, l.Z)(n, r, e) && (r = void 0), u(n, (0, i.Z)(r, 3));
      }
      var f = s;
    },
    65382: function (n, r, e) {
      'use strict';
      e.d(r, {
        Z: function () {
          return m;
        },
      });
      var t = e(22122),
        i = e(41788),
        u = e(23715),
        o = e(55288),
        a = e(86010),
        c = (e(55301), e(12924)),
        l = e.n(c),
        s = e(92063),
        f = e(28935),
        d = e(12519),
        p = e(93619),
        v = e(92248);
      function Z(n) {
        var r = n.children,
          e = n.className,
          i = n.content,
          u = n.size,
          o = (0, a.default)(u, 'icons', e),
          c = (0, f.Z)(Z, n),
          s = (0, d.Z)(Z, n);
        return l().createElement(
          s,
          (0, t.Z)({}, c, { className: o }),
          v.kK(r) ? i : r,
        );
      }
      (Z.handledProps = ['as', 'children', 'className', 'content', 'size']),
        (Z.propTypes = {}),
        (Z.defaultProps = { as: 'i' });
      var h = Z,
        y = (function (n) {
          function r() {
            for (
              var r, e = arguments.length, t = new Array(e), i = 0;
              i < e;
              i++
            )
              t[i] = arguments[i];
            return (
              (r = n.call.apply(n, [this].concat(t)) || this),
              (r.handleClick = function (n) {
                var e = r.props.disabled;
                e
                  ? n.preventDefault()
                  : (0, u.Z)(r.props, 'onClick', n, r.props);
              }),
              r
            );
          }
          (0, i.Z)(r, n);
          var e = r.prototype;
          return (
            (e.getIconAriaOptions = function () {
              var n = {},
                r = this.props,
                e = r['aria-label'],
                t = r['aria-hidden'];
              return (
                (0, o.Z)(e)
                  ? (n['aria-hidden'] = 'true')
                  : (n['aria-label'] = e),
                (0, o.Z)(t) || (n['aria-hidden'] = t),
                n
              );
            }),
            (e.render = function () {
              var n = this.props,
                e = n.bordered,
                i = n.circular,
                u = n.className,
                o = n.color,
                c = n.corner,
                p = n.disabled,
                v = n.fitted,
                Z = n.flipped,
                h = n.inverted,
                y = n.link,
                m = n.loading,
                g = n.name,
                b = n.rotated,
                k = n.size,
                N = (0, a.default)(
                  o,
                  g,
                  k,
                  (0, s.lG)(e, 'bordered'),
                  (0, s.lG)(i, 'circular'),
                  (0, s.lG)(p, 'disabled'),
                  (0, s.lG)(v, 'fitted'),
                  (0, s.lG)(h, 'inverted'),
                  (0, s.lG)(y, 'link'),
                  (0, s.lG)(m, 'loading'),
                  (0, s.sU)(c, 'corner'),
                  (0, s.cD)(Z, 'flipped'),
                  (0, s.cD)(b, 'rotated'),
                  'icon',
                  u,
                ),
                G = (0, f.Z)(r, this.props),
                w = (0, d.Z)(r, this.props),
                C = this.getIconAriaOptions();
              return l().createElement(
                w,
                (0, t.Z)({}, G, C, { className: N, onClick: this.handleClick }),
              );
            }),
            r
          );
        })(c.PureComponent);
      (y.handledProps = [
        'aria-hidden',
        'aria-label',
        'as',
        'bordered',
        'circular',
        'className',
        'color',
        'corner',
        'disabled',
        'fitted',
        'flipped',
        'inverted',
        'link',
        'loading',
        'name',
        'rotated',
        'size',
      ]),
        (y.propTypes = {}),
        (y.defaultProps = { as: 'i' }),
        (y.Group = h),
        (y.create = (0, p.u5)(y, function (n) {
          return { name: n };
        }));
      var m = y;
    },
    92248: function (n, r, e) {
      'use strict';
      e.d(r, {
        tQ: function () {
          return u;
        },
        kK: function () {
          return o;
        },
      });
      var t = e(1429),
        i = e(12924),
        u = function (n, r) {
          return (0, t.Z)(i.Children.toArray(n), { type: r });
        },
        o = function (n) {
          return (
            null === n || void 0 === n || (Array.isArray(n) && 0 === n.length)
          );
        };
    },
    92063: function (n, r, e) {
      'use strict';
      e.d(r, {
        lG: function () {
          return u;
        },
        sU: function () {
          return a;
        },
        MR: function () {
          return c;
        },
        X4: function () {
          return l;
        },
        cD: function () {
          return o;
        },
        Ok: function () {
          return s;
        },
        H0: function () {
          return f;
        },
      });
      var t = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
        10: 'ten',
        11: 'eleven',
        12: 'twelve',
        13: 'thirteen',
        14: 'fourteen',
        15: 'fifteen',
        16: 'sixteen',
      };
      function i(n) {
        var r = typeof n;
        return 'string' === r || 'number' === r ? t[n] || n : '';
      }
      var u = function (n, r) {
          return n && r;
        },
        o = function (n, r) {
          return n && !0 !== n && n + ' ' + r;
        },
        a = function (n, r) {
          return n && (!0 === n ? r : n + ' ' + r);
        },
        c = function (n, r) {
          return n && !0 !== n
            ? n
                .replace('large screen', 'large-screen')
                .replace(/ vertically/g, '-vertically')
                .split(' ')
                .map(function (n) {
                  return n.replace('-', ' ') + ' ' + r;
                })
                .join(' ')
            : null;
        },
        l = function (n) {
          return 'justified' === n ? 'justified' : o(n, 'aligned');
        },
        s = function (n) {
          return o(n, 'aligned');
        },
        f = function (n, r, e) {
          if (
            (void 0 === r && (r = ''),
            void 0 === e && (e = !1),
            e && 'equal' === n)
          )
            return 'equal width';
          var t = typeof n;
          return ('string' !== t && 'number' !== t) || !r
            ? i(n)
            : i(n) + ' ' + r;
        };
    },
    93619: function (n, r, e) {
      'use strict';
      e.d(r, {
        Go: function () {
          return v;
        },
        u5: function () {
          return Z;
        },
        DE: function () {
          return h;
        },
        PI: function () {
          return y;
        },
        Ff: function () {
          return m;
        },
        MO: function () {
          return g;
        },
        i9: function () {
          return b;
        },
        BU: function () {
          return k;
        },
      });
      var t = e(22122),
        i = e(96405),
        u = e(39350),
        o = e(30353),
        a = e(25069),
        c = e(81296),
        l = e(11279),
        s = e(5846),
        f = e(55288),
        d = e(86010),
        p = e(12924);
      function v(n, r, e, v) {
        if (
          (void 0 === v && (v = {}),
          'function' !== typeof n && 'string' !== typeof n)
        )
          throw new Error(
            'createShorthand() Component must be a string or function.',
          );
        if ((0, f.Z)(e) || (0, s.Z)(e)) return null;
        var Z = (0, l.Z)(e),
          h = (0, c.Z)(e),
          y = (0, a.Z)(e),
          m = p.isValidElement(e),
          g = (0, o.Z)(e),
          b = Z || h || (0, u.Z)(e);
        if (!y && !m && !g && !b) return null;
        var k = v,
          N = k.defaultProps,
          G = void 0 === N ? {} : N,
          w = (m && e.props) || (g && e) || (b && r(e)),
          C = v,
          P = C.overrideProps,
          E = void 0 === P ? {} : P;
        E = (0, a.Z)(E) ? E((0, t.Z)({}, G, w)) : E;
        var A = (0, t.Z)({}, G, w, E);
        if (G.className || E.className || w.className) {
          var K = (0, d.default)(G.className, E.className, w.className);
          A.className = (0, i.Z)(K.split(' ')).join(' ');
        }
        if (
          ((G.style || E.style || w.style) &&
            (A.style = (0, t.Z)({}, G.style, w.style, E.style)),
          (0, f.Z)(A.key))
        ) {
          var O = A.childKey,
            j = v,
            D = j.autoGenerateKey,
            z = void 0 === D || D;
          (0, f.Z)(O)
            ? z && (Z || h) && (A.key = e)
            : ((A.key = 'function' === typeof O ? O(A) : O), delete A.childKey);
        }
        return m
          ? p.cloneElement(e, A)
          : 'function' === typeof A.children
          ? A.children(n, (0, t.Z)({}, A, { children: void 0 }))
          : b || g
          ? p.createElement(n, A)
          : y
          ? e(n, A, A.children)
          : void 0;
      }
      function Z(n, r) {
        if ('function' !== typeof n && 'string' !== typeof n)
          throw new Error(
            'createShorthandFactory() Component must be a string or function.',
          );
        return function (e, t) {
          return v(n, r, e, t);
        };
      }
      var h = Z('div', function (n) {
          return { children: n };
        }),
        y = Z('iframe', function (n) {
          return { src: n };
        }),
        m = Z('img', function (n) {
          return { src: n };
        }),
        g = Z('input', function (n) {
          return { type: n };
        }),
        b = Z('label', function (n) {
          return { children: n };
        }),
        k = Z('p', function (n) {
          return { children: n };
        });
    },
    12519: function (n, r) {
      'use strict';
      function e(n, r, e) {
        var t = n.defaultProps,
          i = void 0 === t ? {} : t;
        if (r.as && r.as !== i.as) return r.as;
        if (e) {
          var u = e();
          if (u) return u;
        }
        return r.href ? 'a' : i.as || 'div';
      }
      r['Z'] = e;
    },
    28935: function (n, r) {
      'use strict';
      var e = function (n, r) {
        var e = n.handledProps,
          t = void 0 === e ? [] : e;
        return Object.keys(r).reduce(function (n, e) {
          return 'childKey' === e || (-1 === t.indexOf(e) && (n[e] = r[e])), n;
        }, {});
      };
      r['Z'] = e;
    },
  },
]);
