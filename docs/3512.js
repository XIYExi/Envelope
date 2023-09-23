(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3512],
  {
    63512: function (e, a, t) {
      'use strict';
      t.r(a),
        t.d(a, {
          default: function () {
            return j;
          },
        });
      var n = t(93224),
        l = t(12924),
        r = t.n(l),
        c = t(49054),
        s = t.n(c),
        o = t(22122),
        m = t(86010),
        d = (t(55301), t(92063)),
        u = t(28935),
        p = t(12519),
        i = t(92248);
      function h(e) {
        var a = e.active,
          t = e.className,
          n = e.children,
          l = e.content,
          c = (0, m.default)((0, d.lG)(a, 'active'), t),
          s = (0, u.Z)(h, e),
          v = (0, p.Z)(h, e);
        return r().createElement(
          v,
          (0, o.Z)({}, s, { className: c }),
          i.kK(n) ? l : n,
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
          c = (0, u.Z)(E, e),
          s = (0, p.Z)(E, e);
        return r().createElement(
          s,
          (0, o.Z)({}, c, { className: l }),
          i.kK(t) ? n : t,
        );
      }
      (E.handledProps = ['as', 'children', 'className', 'content']),
        (E.propTypes = {});
      var Z = E;
      function f(e) {
        var a = e.className,
          t = e.children,
          n = e.content,
          l = (0, m.default)('author', a),
          c = (0, u.Z)(f, e),
          s = (0, p.Z)(f, e);
        return r().createElement(
          s,
          (0, o.Z)({}, c, { className: l }),
          i.kK(t) ? n : t,
        );
      }
      (f.handledProps = ['as', 'children', 'className', 'content']),
        (f.propTypes = {});
      var N = f,
        k = t(4394),
        A = t(93619);
      function T(e) {
        var a = e.className,
          t = e.src,
          n = (0, m.default)('avatar', a),
          l = (0, u.Z)(T, e),
          c = (0, k.vR)(l, { htmlProps: k.K2 }),
          s = c[0],
          d = c[1],
          i = (0, p.Z)(T, e);
        return r().createElement(
          i,
          (0, o.Z)({}, d, { className: n }),
          (0, A.Ff)(t, { autoGenerateKey: !1, defaultProps: s }),
        );
      }
      (T.handledProps = ['as', 'className', 'src']), (T.propTypes = {});
      var y = T;
      function P(e) {
        var a = e.className,
          t = e.children,
          n = e.content,
          l = (0, m.default)(a, 'content'),
          c = (0, u.Z)(P, e),
          s = (0, p.Z)(P, e);
        return r().createElement(
          s,
          (0, o.Z)({}, c, { className: l }),
          i.kK(t) ? n : t,
        );
      }
      (P.handledProps = ['as', 'children', 'className', 'content']),
        (P.propTypes = {});
      var G = P;
      function K(e) {
        var a = e.className,
          t = e.children,
          n = e.collapsed,
          l = e.content,
          c = e.minimal,
          s = e.size,
          h = e.threaded,
          v = (0, m.default)(
            'ui',
            s,
            (0, d.lG)(n, 'collapsed'),
            (0, d.lG)(c, 'minimal'),
            (0, d.lG)(h, 'threaded'),
            'comments',
            a,
          ),
          E = (0, u.Z)(K, e),
          Z = (0, p.Z)(K, e);
        return r().createElement(
          Z,
          (0, o.Z)({}, E, { className: v }),
          i.kK(t) ? l : t,
        );
      }
      (K.handledProps = [
        'as',
        'children',
        'className',
        'collapsed',
        'content',
        'minimal',
        'size',
        'threaded',
      ]),
        (K.propTypes = {});
      var C = K;
      function x(e) {
        var a = e.className,
          t = e.children,
          n = e.content,
          l = (0, m.default)('metadata', a),
          c = (0, u.Z)(x, e),
          s = (0, p.Z)(x, e);
        return r().createElement(
          s,
          (0, o.Z)({}, c, { className: l }),
          i.kK(t) ? n : t,
        );
      }
      (x.handledProps = ['as', 'children', 'className', 'content']),
        (x.propTypes = {});
      var g = x;
      function z(e) {
        var a = e.className,
          t = e.children,
          n = e.content,
          l = (0, m.default)(a, 'text'),
          c = (0, u.Z)(z, e),
          s = (0, p.Z)(z, e);
        return r().createElement(
          s,
          (0, o.Z)({}, c, { className: l }),
          i.kK(t) ? n : t,
        );
      }
      (z.handledProps = ['as', 'children', 'className', 'content']),
        (z.propTypes = {});
      var M = z;
      function b(e) {
        var a = e.className,
          t = e.children,
          n = e.collapsed,
          l = e.content,
          c = (0, m.default)((0, d.lG)(n, 'collapsed'), 'comment', a),
          s = (0, u.Z)(b, e),
          h = (0, p.Z)(b, e);
        return r().createElement(
          h,
          (0, o.Z)({}, s, { className: c }),
          i.kK(t) ? l : t,
        );
      }
      (b.handledProps = [
        'as',
        'children',
        'className',
        'collapsed',
        'content',
      ]),
        (b.propTypes = {}),
        (b.Author = N),
        (b.Action = v),
        (b.Actions = Z),
        (b.Avatar = y),
        (b.Content = G),
        (b.Group = C),
        (b.Metadata = g),
        (b.Text = M);
      var w = b,
        F = t(76763),
        R = ['isTpl'],
        S = (e) => {
          var a = e.isTpl,
            t = (0, n.Z)(e, R),
            l = t.collapsed,
            c = t.minimal,
            o = t.size,
            m = t.threaded,
            d = t.dataSource,
            u = (e) => {
              var a = e.split('-');
              return a;
            },
            p = (e) => {
              var a = e.avatar,
                t = e.author,
                n = e.meta,
                l = e.content,
                c = e.actions,
                s = e.child;
              return r().createElement(
                w,
                null,
                r().createElement(w.Avatar, { src: a, alt: 'Comment-Avatar' }),
                r().createElement(
                  w.Content,
                  null,
                  r().createElement(w.Author, { as: 'a' }, t),
                  r().createElement(
                    w.Metadata,
                    null,
                    r().createElement('div', null, n),
                  ),
                  r().createElement(w.Text, null, l),
                  r().createElement(
                    w.Actions,
                    null,
                    c
                      .split('-')
                      .map((e, a) =>
                        r().createElement(w.Action, { key: a }, e),
                      ),
                  ),
                  0 !== s.length &&
                    r().createElement(
                      w.Group,
                      null,
                      s.map((e) => p(e)),
                    ),
                ),
              );
            };
          return r().createElement(
            r().Fragment,
            null,
            a && r().createElement(F.Z, { src: s(), alt: 'Comment' }),
            !a &&
              r().createElement(
                'div',
                null,
                r().createElement(
                  w.Group,
                  { collapsed: l, minimal: c, size: o, threaded: m },
                  d.map((e, a) => {
                    var t = e.avatar,
                      n = e.author,
                      l = e.meta,
                      c = e.content,
                      s = e.actions,
                      o = e.child;
                    return r().createElement(
                      w,
                      { key: a },
                      r().createElement(w.Avatar, {
                        src: t,
                        alt: 'Comment-Avatar',
                      }),
                      r().createElement(
                        w.Content,
                        null,
                        r().createElement(w.Author, { as: 'a' }, n),
                        r().createElement(
                          w.Metadata,
                          null,
                          r().createElement('div', null, l),
                        ),
                        r().createElement(w.Text, null, c),
                        r().createElement(
                          w.Actions,
                          null,
                          u(s).map((e, a) =>
                            r().createElement(w.Action, { key: a }, e),
                          ),
                        ),
                        0 !== o.length &&
                          r().createElement(
                            w.Group,
                            null,
                            o.map((e) => p(e)),
                          ),
                      ),
                    );
                  }),
                ),
              ),
          );
        },
        j = S;
    },
    49054: function (e, a, t) {
      e.exports = t.p + 'static/Comment.2a143f5c.svg';
    },
  },
]);
