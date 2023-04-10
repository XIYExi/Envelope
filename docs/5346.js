(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [5346],
  {
    19919: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return D;
          },
        });
      var r = n(57337),
        a = n(93224),
        c = n(12924),
        i = n.n(c),
        l = n(23400),
        o = n.n(l),
        s = n(22122),
        u = n(86010),
        p = (n(55301), n(92063)),
        d = n(28935),
        v = n(41788),
        f = n(30014),
        h = n(23715),
        Z = n(31231),
        m = n(81927),
        x = n(12519),
        C = n(92248),
        k = n(90327),
        y = n(93619),
        T = n(55288),
        N = n(65382),
        E = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, r = new Array(n), a = 0;
              a < n;
              a++
            )
              r[a] = arguments[a];
            return (
              (t = e.call.apply(e, [this].concat(r)) || this),
              (t.handleClick = function (e) {
                return (0, h.Z)(t.props, 'onClick', e, t.props);
              }),
              t
            );
          }
          (0, v.Z)(t, e);
          var n = t.prototype;
          return (
            (n.render = function () {
              var e = this.props,
                n = e.active,
                r = e.children,
                a = e.className,
                c = e.content,
                l = e.icon,
                o = (0, u.default)((0, p.lG)(n, 'active'), 'title', a),
                v = (0, d.Z)(t, this.props),
                f = (0, x.Z)(t, this.props),
                h = (0, T.Z)(l) ? 'dropdown' : l;
              return C.kK(r)
                ? i().createElement(
                    f,
                    (0, s.Z)({}, v, {
                      className: o,
                      onClick: this.handleClick,
                    }),
                    N.Z.create(h, { autoGenerateKey: !1 }),
                    c,
                  )
                : i().createElement(
                    f,
                    (0, s.Z)({}, v, {
                      className: o,
                      onClick: this.handleClick,
                    }),
                    r,
                  );
            }),
            t
          );
        })(c.Component);
      function w(e) {
        var t = e.active,
          n = e.children,
          r = e.className,
          a = e.content,
          c = (0, u.default)('content', (0, p.lG)(t, 'active'), r),
          l = (0, d.Z)(w, e),
          o = (0, x.Z)(w, e);
        return i().createElement(
          o,
          (0, s.Z)({}, l, { className: c }),
          C.kK(n) ? a : n,
        );
      }
      (E.handledProps = [
        'active',
        'as',
        'children',
        'className',
        'content',
        'icon',
        'index',
        'onClick',
      ]),
        (E.propTypes = {}),
        (E.create = (0, y.u5)(E, function (e) {
          return { content: e };
        })),
        (w.handledProps = ['active', 'as', 'children', 'className', 'content']),
        (w.propTypes = {}),
        (w.create = (0, y.u5)(w, function (e) {
          return { content: e };
        }));
      var I = w,
        P = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, r = new Array(n), a = 0;
              a < n;
              a++
            )
              r[a] = arguments[a];
            return (
              (t = e.call.apply(e, [this].concat(r)) || this),
              (t.handleTitleOverrides = function (e) {
                return {
                  onClick: function (n, r) {
                    (0, h.Z)(e, 'onClick', n, r),
                      (0, h.Z)(t.props, 'onTitleClick', n, r);
                  },
                };
              }),
              t
            );
          }
          (0, v.Z)(t, e);
          var n = t.prototype;
          return (
            (n.render = function () {
              var e = this.props,
                t = e.active,
                n = e.content,
                r = e.index,
                a = e.title;
              return i().createElement(
                i().Fragment,
                null,
                E.create(a, {
                  autoGenerateKey: !1,
                  defaultProps: { active: t, index: r },
                  overrideProps: this.handleTitleOverrides,
                }),
                I.create(n, {
                  autoGenerateKey: !1,
                  defaultProps: { active: t },
                }),
              );
            }),
            t
          );
        })(c.Component);
      (P.handledProps = [
        'active',
        'content',
        'index',
        'onTitleClick',
        'title',
      ]),
        (P.propTypes = {}),
        (P.create = (0, y.u5)(P, null));
      var g = P,
        A = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, r = new Array(n), a = 0;
              a < n;
              a++
            )
              r[a] = arguments[a];
            return (
              (t = e.call.apply(e, [this].concat(r)) || this),
              (t.computeNewIndex = function (e) {
                var n = t.props.exclusive,
                  r = t.state.activeIndex;
                return n
                  ? e === r
                    ? -1
                    : e
                  : (0, m.Z)(r, e)
                  ? (0, Z.Z)(r, e)
                  : [].concat(r, [e]);
              }),
              (t.handleTitleClick = function (e, n) {
                var r = n.index;
                t.setState({ activeIndex: t.computeNewIndex(r) }),
                  (0, h.Z)(t.props, 'onTitleClick', e, n);
              }),
              (t.isIndexActive = function (e) {
                var n = t.props.exclusive,
                  r = t.state.activeIndex;
                return n ? r === e : (0, m.Z)(r, e);
              }),
              t
            );
          }
          (0, v.Z)(t, e);
          var n = t.prototype;
          return (
            (n.getInitialAutoControlledState = function (e) {
              var t = e.exclusive;
              return { activeIndex: t ? -1 : [] };
            }),
            (n.componentDidMount = function () {
              0;
            }),
            (n.componentDidUpdate = function () {
              0;
            }),
            (n.render = function () {
              var e = this,
                n = this.props,
                r = n.className,
                a = n.children,
                c = n.panels,
                l = (0, u.default)('accordion', r),
                o = (0, d.Z)(t, this.props),
                p = (0, x.Z)(t, this.props);
              return i().createElement(
                p,
                (0, s.Z)({}, o, { className: l }),
                C.kK(a)
                  ? (0, f.Z)(c, function (t, n) {
                      return g.create(t, {
                        defaultProps: {
                          active: e.isIndexActive(n),
                          index: n,
                          onTitleClick: e.handleTitleClick,
                        },
                      });
                    })
                  : a,
              );
            }),
            t
          );
        })(k.Z);
      function G(e) {
        var t = e.className,
          n = e.fluid,
          r = e.inverted,
          a = e.styled,
          c = (0, u.default)(
            'ui',
            (0, p.lG)(n, 'fluid'),
            (0, p.lG)(r, 'inverted'),
            (0, p.lG)(a, 'styled'),
            t,
          ),
          l = (0, d.Z)(G, e);
        return i().createElement(A, (0, s.Z)({}, l, { className: c }));
      }
      (A.handledProps = [
        'activeIndex',
        'as',
        'children',
        'className',
        'defaultActiveIndex',
        'exclusive',
        'onTitleClick',
        'panels',
      ]),
        (A.propTypes = {}),
        (A.defaultProps = { exclusive: !0 }),
        (A.autoControlledProps = ['activeIndex']),
        (A.create = (0, y.u5)(A, function (e) {
          return { content: e };
        })),
        (G.handledProps = ['className', 'fluid', 'inverted', 'styled']),
        (G.propTypes = {}),
        (G.Accordion = A),
        (G.Content = I),
        (G.Panel = g),
        (G.Title = E);
      var K = G,
        S = n(49282),
        b = ['isTpl'],
        F = (e) => {
          var t = e.isTpl,
            n = (0, a.Z)(e, b),
            l = n.exclusive,
            s = n.fluid,
            u = n.styled,
            p = n.dataSource,
            d = (0, c.useState)(0),
            v = (0, r.Z)(d, 2),
            f = v[0],
            h = v[1],
            Z = (e, t) => {
              var n = t.index,
                r = f === n ? -1 : n;
              h(r);
            };
          return i().createElement(
            i().Fragment,
            null,
            t && i().createElement(S.Z, { src: o(), alt: 'Accordion' }),
            !t &&
              i().createElement(
                'div',
                null,
                i().createElement(
                  K,
                  { fluid: s, styled: u, exclusive: l },
                  p.map((e, t) => {
                    var n = e.title,
                      r = e.content;
                    return i().createElement(
                      i().Fragment,
                      null,
                      i().createElement(
                        K.Title,
                        {
                          active: f === t,
                          index: t,
                          onClick: (e, t) => Z(e, t),
                        },
                        i().createElement(N.Z, { name: 'dropdown' }),
                        n,
                      ),
                      i().createElement(K.Content, { active: f === t }, r),
                    );
                  }),
                ),
              ),
          );
        },
        D = F;
    },
    23400: function (e, t, n) {
      e.exports = n.p + 'static/Collapse.b22f4c51.svg';
    },
    3605: function (e, t, n) {
      'use strict';
      var r = n(41597),
        a = n(60665),
        c = n(72563),
        i = n(80758),
        l = n(4827),
        o = n(76273),
        s = 200;
      function u(e, t, n, u) {
        var p = -1,
          d = a.Z,
          v = !0,
          f = e.length,
          h = [],
          Z = t.length;
        if (!f) return h;
        n && (t = (0, i.Z)(t, (0, l.Z)(n))),
          u
            ? ((d = c.Z), (v = !1))
            : t.length >= s && ((d = o.Z), (v = !1), (t = new r.Z(t)));
        e: while (++p < f) {
          var m = e[p],
            x = null == n ? m : n(m);
          if (((m = u || 0 !== m ? m : 0), v && x === x)) {
            var C = Z;
            while (C--) if (t[C] === x) continue e;
            h.push(m);
          } else d(t, x, u) || h.push(m);
        }
        return h;
      }
      t['Z'] = u;
    },
    31231: function (e, t, n) {
      'use strict';
      var r = n(3605),
        a = n(8901),
        c = n(34096),
        i = (0, a.Z)(function (e, t) {
          return (0, c.Z)(e) ? (0, r.Z)(e, t) : [];
        });
      t['Z'] = i;
    },
  },
]);
