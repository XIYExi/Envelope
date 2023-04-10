(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9518, 3512],
  {
    89518: function (e, a, t) {
      'use strict';
      t.r(a);
      var n = t(91896),
        l = t(12924),
        r = t.n(l),
        s = t(63512),
        c = {
          collapsed: !1,
          minimal: !1,
          size: 'large',
          threaded: !1,
          dataSource: [
            {
              id: '1000',
              avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              author: 'Matt',
              meta: 'Today at 5:42PM',
              content: 'How artistic!',
              actions: 'Reply-Open',
              child: [],
            },
            {
              id: '1001',
              avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              author: 'Elliot Fu',
              meta: 'Yesterday at 12:30AM',
              content:
                'This has been very useful for my research. Thanks as well!',
              actions: 'Reply-Open',
              child: [
                {
                  id: '1002',
                  avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                  author: 'Jenny Hess',
                  meta: 'Just now',
                  content: 'Elliot you are always so right :)',
                  actions: 'Reply-Open',
                  child: [
                    {
                      id: '1005',
                      avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                      author: 'Xiye',
                      meta: 'Just now',
                      content: 'Now xiye will test this System.',
                      actions: 'Reply-Open',
                      child: [],
                    },
                  ],
                },
                {
                  id: '1007',
                  avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                  author: 'Ada Simth',
                  meta: 'Two day ago',
                  content: "I will show you '=v=' too.",
                  actions: 'Reply-Open',
                  child: [],
                },
              ],
            },
            {
              id: '1003',
              avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
              author: 'Joe Henderson',
              meta: '5 days ago',
              content: 'Dude, this is awesome. Thanks so much',
              actions: 'Reply-Open',
              child: [
                {
                  id: '1006',
                  avatar: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
                  author: 'Cayon',
                  meta: 'One hour ago',
                  content: '=v=',
                  actions: 'Reply-Open',
                  child: [],
                },
              ],
            },
          ],
        };
      a['default'] = () =>
        r().createElement(s.default, (0, n.Z)({ isTpl: !1 }, c));
    },
    63512: function (e, a, t) {
      'use strict';
      t.r(a),
        t.d(a, {
          default: function () {
            return z;
          },
        });
      var n = t(93224),
        l = t(12924),
        r = t.n(l),
        s = t(49054),
        c = t.n(s),
        o = t(22122),
        m = t(86010),
        p = (t(55301), t(92063)),
        i = t(28935),
        d = t(12519),
        u = t(92248);
      function h(e) {
        var a = e.active,
          t = e.className,
          n = e.children,
          l = e.content,
          s = (0, m.default)((0, p.lG)(a, 'active'), t),
          c = (0, i.Z)(h, e),
          v = (0, d.Z)(h, e);
        return r().createElement(
          v,
          (0, o.Z)({}, c, { className: s }),
          u.kK(n) ? l : n,
        );
      }
      (h.handledProps = ['active', 'as', 'children', 'className', 'content']),
        (h.defaultProps = { as: 'a' }),
        (h.propTypes = {});
      var v = h;
      function E(e) {
        var a = e.className,
          t = e.children,
          n = e.content,
          l = (0, m.default)('actions', a),
          s = (0, i.Z)(E, e),
          c = (0, d.Z)(E, e);
        return r().createElement(
          c,
          (0, o.Z)({}, s, { className: l }),
          u.kK(t) ? n : t,
        );
      }
      (E.handledProps = ['as', 'children', 'className', 'content']),
        (E.propTypes = {});
      var y = E;
      function f(e) {
        var a = e.className,
          t = e.children,
          n = e.content,
          l = (0, m.default)('author', a),
          s = (0, i.Z)(f, e),
          c = (0, d.Z)(f, e);
        return r().createElement(
          c,
          (0, o.Z)({}, s, { className: l }),
          u.kK(t) ? n : t,
        );
      }
      (f.handledProps = ['as', 'children', 'className', 'content']),
        (f.propTypes = {});
      var Z = f,
        N = t(4394),
        x = t(93619);
      function T(e) {
        var a = e.className,
          t = e.src,
          n = (0, m.default)('avatar', a),
          l = (0, i.Z)(T, e),
          s = (0, N.vR)(l, { htmlProps: N.K2 }),
          c = s[0],
          p = s[1],
          u = (0, d.Z)(T, e);
        return r().createElement(
          u,
          (0, o.Z)({}, p, { className: n }),
          (0, x.Ff)(t, { autoGenerateKey: !1, defaultProps: c }),
        );
      }
      (T.handledProps = ['as', 'className', 'src']), (T.propTypes = {});
      var k = T;
      function g(e) {
        var a = e.className,
          t = e.children,
          n = e.content,
          l = (0, m.default)(a, 'content'),
          s = (0, i.Z)(g, e),
          c = (0, d.Z)(g, e);
        return r().createElement(
          c,
          (0, o.Z)({}, s, { className: l }),
          u.kK(t) ? n : t,
        );
      }
      (g.handledProps = ['as', 'children', 'className', 'content']),
        (g.propTypes = {});
      var A = g;
      function w(e) {
        var a = e.className,
          t = e.children,
          n = e.collapsed,
          l = e.content,
          s = e.minimal,
          c = e.size,
          h = e.threaded,
          v = (0, m.default)(
            'ui',
            c,
            (0, p.lG)(n, 'collapsed'),
            (0, p.lG)(s, 'minimal'),
            (0, p.lG)(h, 'threaded'),
            'comments',
            a,
          ),
          E = (0, i.Z)(w, e),
          y = (0, d.Z)(w, e);
        return r().createElement(
          y,
          (0, o.Z)({}, E, { className: v }),
          u.kK(t) ? l : t,
        );
      }
      (w.handledProps = [
        'as',
        'children',
        'className',
        'collapsed',
        'content',
        'minimal',
        'size',
        'threaded',
      ]),
        (w.propTypes = {});
      var P = w;
      function b(e) {
        var a = e.className,
          t = e.children,
          n = e.content,
          l = (0, m.default)('metadata', a),
          s = (0, i.Z)(b, e),
          c = (0, d.Z)(b, e);
        return r().createElement(
          c,
          (0, o.Z)({}, s, { className: l }),
          u.kK(t) ? n : t,
        );
      }
      (b.handledProps = ['as', 'children', 'className', 'content']),
        (b.propTypes = {});
      var C = b;
      function G(e) {
        var a = e.className,
          t = e.children,
          n = e.content,
          l = (0, m.default)(a, 'text'),
          s = (0, i.Z)(G, e),
          c = (0, d.Z)(G, e);
        return r().createElement(
          c,
          (0, o.Z)({}, s, { className: l }),
          u.kK(t) ? n : t,
        );
      }
      (G.handledProps = ['as', 'children', 'className', 'content']),
        (G.propTypes = {});
      var K = G;
      function O(e) {
        var a = e.className,
          t = e.children,
          n = e.collapsed,
          l = e.content,
          s = (0, m.default)((0, p.lG)(n, 'collapsed'), 'comment', a),
          c = (0, i.Z)(O, e),
          h = (0, d.Z)(O, e);
        return r().createElement(
          h,
          (0, o.Z)({}, c, { className: s }),
          u.kK(t) ? l : t,
        );
      }
      (O.handledProps = [
        'as',
        'children',
        'className',
        'collapsed',
        'content',
      ]),
        (O.propTypes = {}),
        (O.Author = Z),
        (O.Action = v),
        (O.Actions = y),
        (O.Avatar = k),
        (O.Content = A),
        (O.Group = P),
        (O.Metadata = C),
        (O.Text = K);
      var R = O,
        j = t(49282),
        W = ['isTpl'],
        M = (e) => {
          var a = e.isTpl,
            t = (0, n.Z)(e, W),
            l = t.collapsed,
            s = t.minimal,
            o = t.size,
            m = t.threaded,
            p = t.dataSource,
            i = (e) => {
              var a = e.split('-');
              return a;
            },
            d = (e) => {
              var a = e.avatar,
                t = e.author,
                n = e.meta,
                l = e.content,
                s = e.actions,
                c = e.child;
              return r().createElement(
                R,
                null,
                r().createElement(R.Avatar, { src: a, alt: 'Comment-Avatar' }),
                r().createElement(
                  R.Content,
                  null,
                  r().createElement(R.Author, { as: 'a' }, t),
                  r().createElement(
                    R.Metadata,
                    null,
                    r().createElement('div', null, n),
                  ),
                  r().createElement(R.Text, null, l),
                  r().createElement(
                    R.Actions,
                    null,
                    s
                      .split('-')
                      .map((e, a) =>
                        r().createElement(R.Action, { key: a }, e),
                      ),
                  ),
                  0 !== c.length &&
                    r().createElement(
                      R.Group,
                      null,
                      c.map((e) => d(e)),
                    ),
                ),
              );
            };
          return r().createElement(
            r().Fragment,
            null,
            a && r().createElement(j.Z, { src: c(), alt: 'Comment' }),
            !a &&
              r().createElement(
                'div',
                null,
                r().createElement(
                  R.Group,
                  { collapsed: l, minimal: s, size: o, threaded: m },
                  p.map((e, a) => {
                    var t = e.avatar,
                      n = e.author,
                      l = e.meta,
                      s = e.content,
                      c = e.actions,
                      o = e.child;
                    return r().createElement(
                      R,
                      { key: a },
                      r().createElement(R.Avatar, {
                        src: t,
                        alt: 'Comment-Avatar',
                      }),
                      r().createElement(
                        R.Content,
                        null,
                        r().createElement(R.Author, { as: 'a' }, n),
                        r().createElement(
                          R.Metadata,
                          null,
                          r().createElement('div', null, l),
                        ),
                        r().createElement(R.Text, null, s),
                        r().createElement(
                          R.Actions,
                          null,
                          i(c).map((e, a) =>
                            r().createElement(R.Action, { key: a }, e),
                          ),
                        ),
                        0 !== o.length &&
                          r().createElement(
                            R.Group,
                            null,
                            o.map((e) => d(e)),
                          ),
                      ),
                    );
                  }),
                ),
              ),
          );
        },
        z = M;
    },
    49054: function (e, a, t) {
      e.exports = t.p + 'static/Comment.2a143f5c.svg';
    },
  },
]);
