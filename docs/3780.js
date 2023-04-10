(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3780, 7811],
  {
    3178: function () {},
    3780: function (e, n, t) {
      'use strict';
      t.r(n);
      var o = t(91896),
        s = t(12924),
        a = t.n(s),
        c = t(77811),
        r = {
          message: 'Alert',
          type: 'success',
          closable: !0,
          banner: !1,
          showIcon: !1,
        };
      n['default'] = () =>
        a().createElement(c.default, (0, o.Z)({ isTpl: !1 }, r));
    },
    77811: function (e, n, t) {
      'use strict';
      t.r(n),
        t.d(n, {
          default: function () {
            return P;
          },
        });
      t(38663), t(3178);
      var o = t(22122),
        s = t(28481),
        a = t(96156),
        c = t(38819),
        r = t(15873),
        l = t(43061),
        A = t(73218),
        i = t(54549),
        m = t(68855),
        C = t(57119),
        u = t(40847),
        g = t(68628),
        I = t(94184),
        p = t.n(I),
        E = t(63441),
        B = t(12924),
        f = t.n(B),
        Q = t(53124),
        U = t(5467),
        d = t(96159),
        h = t(6610),
        G = t(5991),
        b = t(10379),
        J = t(54070),
        k = (function (e) {
          (0, b.Z)(t, e);
          var n = (0, J.Z)(t);
          function t() {
            var e;
            return (
              (0, h.Z)(this, t),
              (e = n.apply(this, arguments)),
              (e.state = { error: void 0, info: { componentStack: '' } }),
              e
            );
          }
          return (
            (0, G.Z)(t, [
              {
                key: 'componentDidCatch',
                value: function (e, n) {
                  this.setState({ error: e, info: n });
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    n = e.message,
                    t = e.description,
                    o = e.children,
                    s = this.state,
                    a = s.error,
                    c = s.info,
                    r = c && c.componentStack ? c.componentStack : null,
                    l = 'undefined' === typeof n ? (a || '').toString() : n,
                    A = 'undefined' === typeof t ? r : t;
                  return a
                    ? B.createElement(N, {
                        type: 'error',
                        message: l,
                        description: B.createElement('pre', null, A),
                      })
                    : o;
                },
              },
            ]),
            t
          );
        })(B.Component),
        y = k,
        F = function (e, n) {
          var t = {};
          for (var o in e)
            Object.prototype.hasOwnProperty.call(e, o) &&
              n.indexOf(o) < 0 &&
              (t[o] = e[o]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var s = 0;
            for (o = Object.getOwnPropertySymbols(e); s < o.length; s++)
              n.indexOf(o[s]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, o[s]) &&
                (t[o[s]] = e[o[s]]);
          }
          return t;
        },
        M = { success: c.Z, info: u.Z, error: l.Z, warning: m.Z },
        Z = { success: r.Z, info: g.Z, error: A.Z, warning: C.Z },
        w = function (e) {
          var n = e.description,
            t = e.icon,
            o = e.prefixCls,
            s = e.type,
            c = (n ? Z : M)[s] || null;
          return t
            ? (0, d.wm)(
                t,
                B.createElement(
                  'span',
                  { className: ''.concat(o, '-icon') },
                  t,
                ),
                function () {
                  return {
                    className: p()(
                      ''.concat(o, '-icon'),
                      (0, a.Z)({}, t.props.className, t.props.className),
                    ),
                  };
                },
              )
            : B.createElement(c, { className: ''.concat(o, '-icon') });
        },
        S = function (e) {
          var n = e.isClosable,
            t = e.closeText,
            o = e.prefixCls,
            s = e.closeIcon,
            a = e.handleClose;
          return n
            ? B.createElement(
                'button',
                {
                  type: 'button',
                  onClick: a,
                  className: ''.concat(o, '-close-icon'),
                  tabIndex: 0,
                },
                t
                  ? B.createElement(
                      'span',
                      { className: ''.concat(o, '-close-text') },
                      t,
                    )
                  : s,
              )
            : null;
        },
        v = function (e) {
          var n,
            t = e.description,
            c = e.prefixCls,
            r = e.message,
            l = e.banner,
            A = e.className,
            m = void 0 === A ? '' : A,
            C = e.style,
            u = e.onMouseEnter,
            g = e.onMouseLeave,
            I = e.onClick,
            f = e.afterClose,
            d = e.showIcon,
            h = e.closable,
            G = e.closeText,
            b = e.closeIcon,
            J = void 0 === b ? B.createElement(i.Z, null) : b,
            k = e.action,
            y = F(e, [
              'description',
              'prefixCls',
              'message',
              'banner',
              'className',
              'style',
              'onMouseEnter',
              'onMouseLeave',
              'onClick',
              'afterClose',
              'showIcon',
              'closable',
              'closeText',
              'closeIcon',
              'action',
            ]),
            M = B.useState(!1),
            Z = (0, s.Z)(M, 2),
            v = Z[0],
            N = Z[1],
            K = B.useRef(),
            R = B.useContext(Q.E_),
            X = R.getPrefixCls,
            D = R.direction,
            q = X('alert', c),
            x = function (e) {
              var n;
              N(!0), null === (n = y.onClose) || void 0 === n || n.call(y, e);
            },
            L = function () {
              var e = y.type;
              return void 0 !== e ? e : l ? 'warning' : 'info';
            },
            P = !!G || h,
            j = L(),
            T = !(!l || void 0 !== d) || d,
            Y = p()(
              q,
              ''.concat(q, '-').concat(j),
              ((n = {}),
              (0, a.Z)(n, ''.concat(q, '-with-description'), !!t),
              (0, a.Z)(n, ''.concat(q, '-no-icon'), !T),
              (0, a.Z)(n, ''.concat(q, '-banner'), !!l),
              (0, a.Z)(n, ''.concat(q, '-rtl'), 'rtl' === D),
              n),
              m,
            ),
            O = (0, U.Z)(y);
          return B.createElement(
            E.default,
            {
              visible: !v,
              motionName: ''.concat(q, '-motion'),
              motionAppear: !1,
              motionEnter: !1,
              onLeaveStart: function (e) {
                return { maxHeight: e.offsetHeight };
              },
              onLeaveEnd: f,
            },
            function (e) {
              var n = e.className,
                s = e.style;
              return B.createElement(
                'div',
                (0, o.Z)(
                  {
                    ref: K,
                    'data-show': !v,
                    className: p()(Y, n),
                    style: (0, o.Z)((0, o.Z)({}, C), s),
                    onMouseEnter: u,
                    onMouseLeave: g,
                    onClick: I,
                    role: 'alert',
                  },
                  O,
                ),
                T
                  ? B.createElement(w, {
                      description: t,
                      icon: y.icon,
                      prefixCls: q,
                      type: j,
                    })
                  : null,
                B.createElement(
                  'div',
                  { className: ''.concat(q, '-content') },
                  r
                    ? B.createElement(
                        'div',
                        { className: ''.concat(q, '-message') },
                        r,
                      )
                    : null,
                  t
                    ? B.createElement(
                        'div',
                        { className: ''.concat(q, '-description') },
                        t,
                      )
                    : null,
                ),
                k
                  ? B.createElement(
                      'div',
                      { className: ''.concat(q, '-action') },
                      k,
                    )
                  : null,
                B.createElement(S, {
                  isClosable: !!P,
                  closeText: G,
                  prefixCls: q,
                  closeIcon: J,
                  handleClose: x,
                }),
              );
            },
          );
        };
      v.ErrorBoundary = y;
      var N = v,
        K = t(91896),
        R = (t(12968), t(6122)),
        X = t(93224),
        D = t(74086),
        q = t.n(D),
        x = ['isTpl'],
        L = (e) => {
          var n = e.isTpl,
            t = (0, X.Z)(e, x),
            o = e.message;
          return f().createElement(
            f().Fragment,
            null,
            n &&
              f().createElement(
                'div',
                null,
                f().createElement(R.Z, { src: q(), alt: '' }),
              ),
            !n && f().createElement(N, (0, K.Z)({ message: o }, t)),
          );
        },
        P = (0, B.memo)(L);
    },
    74086: function (e) {
      e.exports =
        'data:image/png;base64,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';
    },
  },
]);
