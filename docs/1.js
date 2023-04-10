(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1, 5346],
  {
    20001: function (e, t, n) {
      'use strict';
      n.r(t);
      var r = n(91896),
        a = n(12924),
        o = n.n(a),
        i = n(19919),
        c = {
          exclusive: !0,
          fluid: !1,
          styled: !0,
          dataSource: [
            {
              id: '100',
              title: 'What is a dog?',
              content:
                'A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.',
            },
            {
              id: '101',
              title: 'What kinds of dogs are there?',
              content:
                'There are many breeds of dogs. Each breed varies in size and temperament. Owners often select a breed of dog that they find to be compatible with their own lifestyle and desires from a companion.',
            },
            {
              id: '102',
              title: 'How do you acquire a dog?',
              content:
                'Three common ways for a prospective owner to acquire a dog is from pet shops, private owners, or shelters.\n\nA pet shop may be the most convenient way to buy a dog. Buying a dog from a private owner allows you to assess the pedigree and upbringing of your dog before choosing to take it home. Lastly, finding your dog from a shelter, helps give a good home to a dog who may not find one so readily.',
            },
          ],
        };
      t['default'] = () =>
        o().createElement(i.default, (0, r.Z)({ isTpl: !1 }, c));
    },
    19919: function (e, t, n) {
      'use strict';
      n.r(t),
        n.d(t, {
          default: function () {
            return O;
          },
        });
      var r = n(57337),
        a = n(93224),
        o = n(12924),
        i = n.n(o),
        c = n(23400),
        l = n.n(c),
        s = n(22122),
        u = n(86010),
        d = (n(55301), n(92063)),
        p = n(28935),
        f = n(41788),
        v = n(30014),
        h = n(23715),
        m = n(31231),
        y = n(81927),
        Z = n(12519),
        g = n(92248),
        x = n(90327),
        k = n(93619),
        w = n(55288),
        C = n(65382),
        T = (function (e) {
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
          (0, f.Z)(t, e);
          var n = t.prototype;
          return (
            (n.render = function () {
              var e = this.props,
                n = e.active,
                r = e.children,
                a = e.className,
                o = e.content,
                c = e.icon,
                l = (0, u.default)((0, d.lG)(n, 'active'), 'title', a),
                f = (0, p.Z)(t, this.props),
                v = (0, Z.Z)(t, this.props),
                h = (0, w.Z)(c) ? 'dropdown' : c;
              return g.kK(r)
                ? i().createElement(
                    v,
                    (0, s.Z)({}, f, {
                      className: l,
                      onClick: this.handleClick,
                    }),
                    C.Z.create(h, { autoGenerateKey: !1 }),
                    o,
                  )
                : i().createElement(
                    v,
                    (0, s.Z)({}, f, {
                      className: l,
                      onClick: this.handleClick,
                    }),
                    r,
                  );
            }),
            t
          );
        })(o.Component);
      function E(e) {
        var t = e.active,
          n = e.children,
          r = e.className,
          a = e.content,
          o = (0, u.default)('content', (0, d.lG)(t, 'active'), r),
          c = (0, p.Z)(E, e),
          l = (0, Z.Z)(E, e);
        return i().createElement(
          l,
          (0, s.Z)({}, c, { className: o }),
          g.kK(n) ? a : n,
        );
      }
      (T.handledProps = [
        'active',
        'as',
        'children',
        'className',
        'content',
        'icon',
        'index',
        'onClick',
      ]),
        (T.propTypes = {}),
        (T.create = (0, k.u5)(T, function (e) {
          return { content: e };
        })),
        (E.handledProps = ['active', 'as', 'children', 'className', 'content']),
        (E.propTypes = {}),
        (E.create = (0, k.u5)(E, function (e) {
          return { content: e };
        }));
      var N = E,
        b = (function (e) {
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
          (0, f.Z)(t, e);
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
                T.create(a, {
                  autoGenerateKey: !1,
                  defaultProps: { active: t, index: r },
                  overrideProps: this.handleTitleOverrides,
                }),
                N.create(n, {
                  autoGenerateKey: !1,
                  defaultProps: { active: t },
                }),
              );
            }),
            t
          );
        })(o.Component);
      (b.handledProps = [
        'active',
        'content',
        'index',
        'onTitleClick',
        'title',
      ]),
        (b.propTypes = {}),
        (b.create = (0, k.u5)(b, null));
      var I = b,
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
              (t.computeNewIndex = function (e) {
                var n = t.props.exclusive,
                  r = t.state.activeIndex;
                return n
                  ? e === r
                    ? -1
                    : e
                  : (0, y.Z)(r, e)
                  ? (0, m.Z)(r, e)
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
                return n ? r === e : (0, y.Z)(r, e);
              }),
              t
            );
          }
          (0, f.Z)(t, e);
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
                o = n.panels,
                c = (0, u.default)('accordion', r),
                l = (0, p.Z)(t, this.props),
                d = (0, Z.Z)(t, this.props);
              return i().createElement(
                d,
                (0, s.Z)({}, l, { className: c }),
                g.kK(a)
                  ? (0, v.Z)(o, function (t, n) {
                      return I.create(t, {
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
        })(x.Z);
      function A(e) {
        var t = e.className,
          n = e.fluid,
          r = e.inverted,
          a = e.styled,
          o = (0, u.default)(
            'ui',
            (0, d.lG)(n, 'fluid'),
            (0, d.lG)(r, 'inverted'),
            (0, d.lG)(a, 'styled'),
            t,
          ),
          c = (0, p.Z)(A, e);
        return i().createElement(P, (0, s.Z)({}, c, { className: o }));
      }
      (P.handledProps = [
        'activeIndex',
        'as',
        'children',
        'className',
        'defaultActiveIndex',
        'exclusive',
        'onTitleClick',
        'panels',
      ]),
        (P.propTypes = {}),
        (P.defaultProps = { exclusive: !0 }),
        (P.autoControlledProps = ['activeIndex']),
        (P.create = (0, k.u5)(P, function (e) {
          return { content: e };
        })),
        (A.handledProps = ['className', 'fluid', 'inverted', 'styled']),
        (A.propTypes = {}),
        (A.Accordion = P),
        (A.Content = N),
        (A.Panel = I),
        (A.Title = T);
      var G = A,
        K = n(49282),
        S = ['isTpl'],
        F = (e) => {
          var t = e.isTpl,
            n = (0, a.Z)(e, S),
            c = n.exclusive,
            s = n.fluid,
            u = n.styled,
            d = n.dataSource,
            p = (0, o.useState)(0),
            f = (0, r.Z)(p, 2),
            v = f[0],
            h = f[1],
            m = (e, t) => {
              var n = t.index,
                r = v === n ? -1 : n;
              h(r);
            };
          return i().createElement(
            i().Fragment,
            null,
            t && i().createElement(K.Z, { src: l(), alt: 'Accordion' }),
            !t &&
              i().createElement(
                'div',
                null,
                i().createElement(
                  G,
                  { fluid: s, styled: u, exclusive: c },
                  d.map((e, t) => {
                    var n = e.title,
                      r = e.content;
                    return i().createElement(
                      i().Fragment,
                      null,
                      i().createElement(
                        G.Title,
                        {
                          active: v === t,
                          index: t,
                          onClick: (e, t) => m(e, t),
                        },
                        i().createElement(C.Z, { name: 'dropdown' }),
                        n,
                      ),
                      i().createElement(G.Content, { active: v === t }, r),
                    );
                  }),
                ),
              ),
          );
        },
        O = F;
    },
    23400: function (e, t, n) {
      e.exports = n.p + 'static/Collapse.b22f4c51.svg';
    },
    3605: function (e, t, n) {
      'use strict';
      var r = n(41597),
        a = n(60665),
        o = n(72563),
        i = n(80758),
        c = n(4827),
        l = n(76273),
        s = 200;
      function u(e, t, n, u) {
        var d = -1,
          p = a.Z,
          f = !0,
          v = e.length,
          h = [],
          m = t.length;
        if (!v) return h;
        n && (t = (0, i.Z)(t, (0, c.Z)(n))),
          u
            ? ((p = o.Z), (f = !1))
            : t.length >= s && ((p = l.Z), (f = !1), (t = new r.Z(t)));
        e: while (++d < v) {
          var y = e[d],
            Z = null == n ? y : n(y);
          if (((y = u || 0 !== y ? y : 0), f && Z === Z)) {
            var g = m;
            while (g--) if (t[g] === Z) continue e;
            h.push(y);
          } else p(t, Z, u) || h.push(y);
        }
        return h;
      }
      t['Z'] = u;
    },
    31231: function (e, t, n) {
      'use strict';
      var r = n(3605),
        a = n(8901),
        o = n(34096),
        i = (0, a.Z)(function (e, t) {
          return (0, o.Z)(e) ? (0, r.Z)(e, t) : [];
        });
      t['Z'] = i;
    },
  },
]);
