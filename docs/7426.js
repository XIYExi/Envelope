(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [7426],
  {
    50596: function () {},
    87426: function (e, n, t) {
      'use strict';
      t.r(n),
        t.d(n, {
          default: function () {
            return J;
          },
        });
      t(12968);
      var r = t(6122),
        a = t(93224),
        o = (t(38663), t(50596), t(22122)),
        c = t(96156),
        l = t(8812),
        i = t(94184),
        s = t.n(i),
        d = t(85061),
        p = t(6610),
        u = t(5991),
        v = t(10379),
        f = t(54070),
        m = t(90484),
        h = t(50344),
        y = t(12924),
        C = t.n(y),
        Z = t(96774),
        b = t.n(Z),
        x = t(81253),
        I = t(63441),
        k = t(28481),
        E = y.forwardRef(function (e, n) {
          var t,
            r = e.prefixCls,
            a = e.forceRender,
            o = e.className,
            l = e.style,
            i = e.children,
            d = e.isActive,
            p = e.role,
            u = y.useState(d || a),
            v = (0, k.Z)(u, 2),
            f = v[0],
            m = v[1];
          return (
            y.useEffect(
              function () {
                (a || d) && m(!0);
              },
              [a, d],
            ),
            f
              ? y.createElement(
                  'div',
                  {
                    ref: n,
                    className: s()(
                      ''.concat(r, '-content'),
                      ((t = {}),
                      (0, c.Z)(t, ''.concat(r, '-content-active'), d),
                      (0, c.Z)(t, ''.concat(r, '-content-inactive'), !d),
                      t),
                      o,
                    ),
                    style: l,
                    role: p,
                  },
                  y.createElement(
                    'div',
                    { className: ''.concat(r, '-content-box') },
                    i,
                  ),
                )
              : null
          );
        });
      E.displayName = 'PanelContent';
      var N = E,
        P = [
          'className',
          'id',
          'style',
          'prefixCls',
          'headerClass',
          'children',
          'isActive',
          'destroyInactivePanel',
          'accordion',
          'forceRender',
          'openMotion',
          'extra',
          'collapsible',
        ],
        g = (function (e) {
          (0, v.Z)(t, e);
          var n = (0, f.Z)(t);
          function t() {
            var e;
            (0, p.Z)(this, t);
            for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++)
              a[o] = arguments[o];
            return (
              (e = n.call.apply(n, [this].concat(a))),
              (e.onItemClick = function () {
                var n = e.props,
                  t = n.onItemClick,
                  r = n.panelKey;
                'function' === typeof t && t(r);
              }),
              (e.handleKeyPress = function (n) {
                ('Enter' !== n.key && 13 !== n.keyCode && 13 !== n.which) ||
                  e.onItemClick();
              }),
              (e.renderIcon = function () {
                var n = e.props,
                  t = n.showArrow,
                  r = n.expandIcon,
                  a = n.prefixCls,
                  o = n.collapsible;
                if (!t) return null;
                var c =
                  'function' === typeof r
                    ? r(e.props)
                    : y.createElement('i', { className: 'arrow' });
                return (
                  c &&
                  y.createElement(
                    'div',
                    {
                      className: ''.concat(a, '-expand-icon'),
                      onClick:
                        'header' === o || 'icon' === o ? e.onItemClick : null,
                    },
                    c,
                  )
                );
              }),
              (e.renderTitle = function () {
                var n = e.props,
                  t = n.header,
                  r = n.prefixCls,
                  a = n.collapsible;
                return y.createElement(
                  'span',
                  {
                    className: ''.concat(r, '-header-text'),
                    onClick: 'header' === a ? e.onItemClick : null,
                  },
                  t,
                );
              }),
              e
            );
          }
          return (
            (0, u.Z)(t, [
              {
                key: 'shouldComponentUpdate',
                value: function (e) {
                  return !b()(this.props, e);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e,
                    n,
                    t = this.props,
                    r = t.className,
                    a = t.id,
                    l = t.style,
                    i = t.prefixCls,
                    d = t.headerClass,
                    p = t.children,
                    u = t.isActive,
                    v = t.destroyInactivePanel,
                    f = t.accordion,
                    m = t.forceRender,
                    h = t.openMotion,
                    C = t.extra,
                    Z = t.collapsible,
                    b = (0, x.Z)(t, P),
                    k = 'disabled' === Z,
                    E = 'header' === Z,
                    g = 'icon' === Z,
                    w = s()(
                      ((e = {}),
                      (0, c.Z)(e, ''.concat(i, '-item'), !0),
                      (0, c.Z)(e, ''.concat(i, '-item-active'), u),
                      (0, c.Z)(e, ''.concat(i, '-item-disabled'), k),
                      e),
                      r,
                    ),
                    A = s()(
                      ''.concat(i, '-header'),
                      ((n = {}),
                      (0, c.Z)(n, d, d),
                      (0, c.Z)(n, ''.concat(i, '-header-collapsible-only'), E),
                      (0, c.Z)(n, ''.concat(i, '-icon-collapsible-only'), g),
                      n),
                    ),
                    K = {
                      className: A,
                      'aria-expanded': u,
                      'aria-disabled': k,
                      onKeyPress: this.handleKeyPress,
                    };
                  E ||
                    g ||
                    ((K.onClick = this.onItemClick),
                    (K.role = f ? 'tab' : 'button'),
                    (K.tabIndex = k ? -1 : 0));
                  var R = null !== C && void 0 !== C && 'boolean' !== typeof C;
                  return (
                    delete b.header,
                    delete b.panelKey,
                    delete b.onItemClick,
                    delete b.showArrow,
                    delete b.expandIcon,
                    y.createElement(
                      'div',
                      (0, o.Z)({}, b, { className: w, style: l, id: a }),
                      y.createElement(
                        'div',
                        K,
                        this.renderIcon(),
                        this.renderTitle(),
                        R &&
                          y.createElement(
                            'div',
                            { className: ''.concat(i, '-extra') },
                            C,
                          ),
                      ),
                      y.createElement(
                        I.default,
                        (0, o.Z)(
                          {
                            visible: u,
                            leavedClassName: ''.concat(i, '-content-hidden'),
                          },
                          h,
                          { forceRender: m, removeOnLeave: v },
                        ),
                        function (e, n) {
                          var t = e.className,
                            r = e.style;
                          return y.createElement(
                            N,
                            {
                              ref: n,
                              prefixCls: i,
                              className: t,
                              style: r,
                              isActive: u,
                              forceRender: m,
                              role: f ? 'tabpanel' : null,
                            },
                            p,
                          );
                        },
                      ),
                    )
                  );
                },
              },
            ]),
            t
          );
        })(y.Component);
      g.defaultProps = {
        showArrow: !0,
        isActive: !1,
        onItemClick: function () {},
        headerClass: '',
        forceRender: !1,
      };
      var w = g;
      function A(e) {
        var n = e;
        if (!Array.isArray(n)) {
          var t = (0, m.Z)(n);
          n = 'number' === t || 'string' === t ? [n] : [];
        }
        return n.map(function (e) {
          return String(e);
        });
      }
      var K = (function (e) {
        (0, v.Z)(t, e);
        var n = (0, f.Z)(t);
        function t(e) {
          var r;
          (0, p.Z)(this, t),
            (r = n.call(this, e)),
            (r.onClickItem = function (e) {
              var n = r.state.activeKey;
              if (r.props.accordion) n = n[0] === e ? [] : [e];
              else {
                n = (0, d.Z)(n);
                var t = n.indexOf(e),
                  a = t > -1;
                a ? n.splice(t, 1) : n.push(e);
              }
              r.setActiveKey(n);
            }),
            (r.getNewChild = function (e, n) {
              if (!e) return null;
              var t = r.state.activeKey,
                a = r.props,
                o = a.prefixCls,
                c = a.openMotion,
                l = a.accordion,
                i = a.destroyInactivePanel,
                s = a.expandIcon,
                d = a.collapsible,
                p = e.key || String(n),
                u = e.props,
                v = u.header,
                f = u.headerClass,
                m = u.destroyInactivePanel,
                h = u.collapsible,
                C = !1;
              C = l ? t[0] === p : t.indexOf(p) > -1;
              var Z = null !== h && void 0 !== h ? h : d,
                b = {
                  key: p,
                  panelKey: p,
                  header: v,
                  headerClass: f,
                  isActive: C,
                  prefixCls: o,
                  destroyInactivePanel: null !== m && void 0 !== m ? m : i,
                  openMotion: c,
                  accordion: l,
                  children: e.props.children,
                  onItemClick: 'disabled' === Z ? null : r.onClickItem,
                  expandIcon: s,
                  collapsible: Z,
                };
              return 'string' === typeof e.type
                ? e
                : (Object.keys(b).forEach(function (e) {
                    'undefined' === typeof b[e] && delete b[e];
                  }),
                  y.cloneElement(e, b));
            }),
            (r.getItems = function () {
              var e = r.props.children;
              return (0, h.Z)(e).map(r.getNewChild);
            }),
            (r.setActiveKey = function (e) {
              'activeKey' in r.props || r.setState({ activeKey: e }),
                r.props.onChange(r.props.accordion ? e[0] : e);
            });
          var a = e.activeKey,
            o = e.defaultActiveKey,
            c = o;
          return (
            'activeKey' in e && (c = a), (r.state = { activeKey: A(c) }), r
          );
        }
        return (
          (0, u.Z)(
            t,
            [
              {
                key: 'shouldComponentUpdate',
                value: function (e, n) {
                  return !b()(this.props, e) || !b()(this.state, n);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e,
                    n = this.props,
                    t = n.prefixCls,
                    r = n.className,
                    a = n.style,
                    o = n.accordion,
                    l = s()(
                      ((e = {}), (0, c.Z)(e, t, !0), (0, c.Z)(e, r, !!r), e),
                    );
                  return y.createElement(
                    'div',
                    { className: l, style: a, role: o ? 'tablist' : null },
                    this.getItems(),
                  );
                },
              },
            ],
            [
              {
                key: 'getDerivedStateFromProps',
                value: function (e) {
                  var n = {};
                  return 'activeKey' in e && (n.activeKey = A(e.activeKey)), n;
                },
              },
            ],
          ),
          t
        );
      })(y.Component);
      (K.defaultProps = {
        prefixCls: 'rc-collapse',
        onChange: function () {},
        accordion: !1,
        destroyInactivePanel: !1,
      }),
        (K.Panel = w);
      var R = K,
        M = R,
        S = (R.Panel, t(98423)),
        T = t(53124),
        O = t(33603),
        F = t(96159),
        L = function (e) {
          var n = y.useContext(T.E_),
            t = n.getPrefixCls,
            r = e.prefixCls,
            a = e.className,
            l = void 0 === a ? '' : a,
            i = e.showArrow,
            d = void 0 === i || i,
            p = t('collapse', r),
            u = s()((0, c.Z)({}, ''.concat(p, '-no-arrow'), !d), l);
          return y.createElement(
            M.Panel,
            (0, o.Z)({}, e, { prefixCls: p, className: u }),
          );
        },
        U = L,
        _ = function (e) {
          var n,
            t = y.useContext(T.E_),
            r = t.getPrefixCls,
            a = t.direction,
            i = e.prefixCls,
            d = e.className,
            p = void 0 === d ? '' : d,
            u = e.bordered,
            v = void 0 === u || u,
            f = e.ghost,
            m = e.expandIconPosition,
            C = void 0 === m ? 'start' : m,
            Z = r('collapse', i),
            b = y.useMemo(
              function () {
                return 'left' === C ? 'start' : 'right' === C ? 'end' : C;
              },
              [C],
            ),
            x = function () {
              var n =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                t = e.expandIcon,
                r = t
                  ? t(n)
                  : y.createElement(l.Z, { rotate: n.isActive ? 90 : void 0 });
              return (0, F.Tm)(r, function () {
                return {
                  className: s()(r.props.className, ''.concat(Z, '-arrow')),
                };
              });
            },
            I = s()(
              ''.concat(Z, '-icon-position-').concat(b),
              ((n = {}),
              (0, c.Z)(n, ''.concat(Z, '-borderless'), !v),
              (0, c.Z)(n, ''.concat(Z, '-rtl'), 'rtl' === a),
              (0, c.Z)(n, ''.concat(Z, '-ghost'), !!f),
              n),
              p,
            ),
            k = (0, o.Z)((0, o.Z)({}, O.ZP), {
              motionAppear: !1,
              leavedClassName: ''.concat(Z, '-content-hidden'),
            }),
            E = function () {
              var n = e.children;
              return (0, h.Z)(n).map(function (e, n) {
                var t;
                if (
                  null === (t = e.props) || void 0 === t ? void 0 : t.disabled
                ) {
                  var r = e.key || String(n),
                    a = e.props,
                    c = a.disabled,
                    l = a.collapsible,
                    i = (0, o.Z)(
                      (0, o.Z)({}, (0, S.Z)(e.props, ['disabled'])),
                      {
                        key: r,
                        collapsible:
                          null !== l && void 0 !== l
                            ? l
                            : c
                            ? 'disabled'
                            : void 0,
                      },
                    );
                  return (0, F.Tm)(e, i);
                }
                return e;
              });
            };
          return y.createElement(
            M,
            (0, o.Z)({ openMotion: k }, e, {
              expandIcon: x,
              prefixCls: Z,
              className: I,
            }),
            E(),
          );
        };
      _.Panel = U;
      var j = _,
        D = j,
        q = t(23400),
        z = t.n(q),
        B = ['isTpl'],
        G = D.Panel,
        H = (e) => {
          var n = e.isTpl,
            t = (0, a.Z)(e, B),
            o = t.accordion,
            c = t.bordered,
            l = t.collapsible,
            i = t.destroyInactivePanel,
            s = t.expandIconPosition,
            d = t.ghost,
            p = t.forceRender,
            u = t.showArrow,
            v = t.panelList;
          return C().createElement(
            C().Fragment,
            null,
            n &&
              C().createElement(
                'div',
                null,
                C().createElement(r.Z, { preview: !1, src: z(), alt: '' }),
              ),
            !n &&
              C().createElement(
                'div',
                null,
                C().createElement(
                  D,
                  {
                    accordion: o,
                    bordered: c,
                    collapsible: l,
                    destroyInactivePanel: i,
                    expandIconPosition: s,
                    ghost: d,
                  },
                  v.map((e, n) =>
                    C().createElement(
                      G,
                      { header: e.title, key: n, forceRender: p, showArrow: u },
                      e.desc,
                    ),
                  ),
                ),
              ),
          );
        },
        J = (0, y.memo)(H);
    },
    23400: function (e, n, t) {
      e.exports = t.p + 'static/Collapse.b22f4c51.svg';
    },
  },
]);
