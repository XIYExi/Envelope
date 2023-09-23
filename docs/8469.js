(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8469],
  {
    21214: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return u;
        },
      });
      var r = n(28991),
        o = n(12924),
        a = {
          icon: {
            tag: 'svg',
            attrs: { viewBox: '64 64 896 896', focusable: 'false' },
            children: [
              {
                tag: 'path',
                attrs: {
                  d: 'M864 170h-60c-4.4 0-8 3.6-8 8v518H310v-73c0-6.7-7.8-10.5-13-6.3l-141.9 112a8 8 0 000 12.6l141.9 112c5.3 4.2 13 .4 13-6.3v-75h498c35.3 0 64-28.7 64-64V178c0-4.4-3.6-8-8-8z',
                },
              },
            ],
          },
          name: 'enter',
          theme: 'outlined',
        },
        l = a,
        i = n(13401),
        c = function (e, t) {
          return o.createElement(
            i.Z,
            (0, r.Z)((0, r.Z)({}, e), {}, { ref: t, icon: l }),
          );
        };
      c.displayName = 'EnterOutlined';
      var u = o.forwardRef(c);
    },
    47828: function () {},
    55672: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return he;
        },
      });
      var r = n(22122),
        o = n(12924),
        a = n(96156),
        l = n(90484),
        i = n(28481),
        c = n(79508),
        u = n(99165),
        s = n(8212),
        f = n(94184),
        p = n.n(f),
        d = n(20640),
        v = n.n(d),
        m = n(48717),
        y = n(50344),
        b = n(8410),
        g = n(21770),
        E = n(98423),
        h = n(42550),
        Z = n(53124),
        w = n(42051),
        x = n(15105),
        O = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        S = {
          border: 0,
          background: 'transparent',
          padding: 0,
          lineHeight: 'inherit',
          display: 'inline-block',
        },
        C = o.forwardRef(function (e, t) {
          var n = function (e) {
              var t = e.keyCode;
              t === x.Z.ENTER && e.preventDefault();
            },
            a = function (t) {
              var n = t.keyCode,
                r = e.onClick;
              n === x.Z.ENTER && r && r();
            },
            l = e.style,
            i = e.noStyle,
            c = e.disabled,
            u = O(e, ['style', 'noStyle', 'disabled']),
            s = {};
          return (
            i || (s = (0, r.Z)({}, S)),
            c && (s.pointerEvents = 'none'),
            (s = (0, r.Z)((0, r.Z)({}, s), l)),
            o.createElement(
              'div',
              (0, r.Z)({ role: 'button', tabIndex: 0, ref: t }, u, {
                onKeyDown: n,
                onKeyUp: a,
                style: s,
              }),
            )
          );
        }),
        k = C,
        R = n(79370),
        j = n(94199),
        P = n(21214),
        D = n(94418),
        N = n(96159),
        I = function (e) {
          var t = e.prefixCls,
            n = e['aria-label'],
            r = e.className,
            l = e.style,
            c = e.direction,
            u = e.maxLength,
            s = e.autoSize,
            f = void 0 === s || s,
            d = e.value,
            v = e.onSave,
            m = e.onCancel,
            y = e.onEnd,
            b = e.component,
            g = e.enterIcon,
            E = void 0 === g ? o.createElement(P.Z, null) : g,
            h = o.useRef(null),
            Z = o.useRef(!1),
            w = o.useRef(),
            O = o.useState(d),
            S = (0, i.Z)(O, 2),
            C = S[0],
            k = S[1];
          o.useEffect(
            function () {
              k(d);
            },
            [d],
          ),
            o.useEffect(function () {
              if (h.current && h.current.resizableTextArea) {
                var e = h.current.resizableTextArea.textArea;
                e.focus();
                var t = e.value.length;
                e.setSelectionRange(t, t);
              }
            }, []);
          var R = function (e) {
              var t = e.target;
              k(t.value.replace(/[\n\r]/g, ''));
            },
            j = function () {
              Z.current = !0;
            },
            I = function () {
              Z.current = !1;
            },
            T = function (e) {
              var t = e.keyCode;
              Z.current || (w.current = t);
            },
            M = function () {
              v(C.trim());
            },
            z = function (e) {
              var t = e.keyCode,
                n = e.ctrlKey,
                r = e.altKey,
                o = e.metaKey,
                a = e.shiftKey;
              w.current !== t ||
                Z.current ||
                n ||
                r ||
                o ||
                a ||
                (t === x.Z.ENTER
                  ? (M(), null === y || void 0 === y || y())
                  : t === x.Z.ESC && m());
            },
            A = function () {
              M();
            },
            H = b ? ''.concat(t, '-').concat(b) : '',
            K = p()(
              t,
              ''.concat(t, '-edit-content'),
              (0, a.Z)({}, ''.concat(t, '-rtl'), 'rtl' === c),
              r,
              H,
            );
          return o.createElement(
            'div',
            { className: K, style: l },
            o.createElement(D.Z, {
              ref: h,
              maxLength: u,
              value: C,
              onChange: R,
              onKeyDown: T,
              onKeyUp: z,
              onCompositionStart: j,
              onCompositionEnd: I,
              onBlur: A,
              'aria-label': n,
              rows: 1,
              autoSize: f,
            }),
            null !== E
              ? (0, N.Tm)(E, {
                  className: ''.concat(t, '-edit-content-confirm'),
                })
              : null,
          );
        },
        T = I;
      function M(e, t) {
        return o.useMemo(
          function () {
            var n = !!e;
            return [
              n,
              (0, r.Z)(
                (0, r.Z)({}, t),
                n && 'object' === (0, l.Z)(e) ? e : null,
              ),
            ];
          },
          [e],
        );
      }
      var z = function (e, t) {
          var n = o.useRef(!1);
          o.useEffect(function () {
            n.current ? e() : (n.current = !0);
          }, t);
        },
        A = z,
        H = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        K = o.forwardRef(function (e, t) {
          var n = e.prefixCls,
            l = e.component,
            i = void 0 === l ? 'article' : l,
            c = e.className,
            u = e.setContentRef,
            s = e.children,
            f = e.direction,
            d = H(e, [
              'prefixCls',
              'component',
              'className',
              'setContentRef',
              'children',
              'direction',
            ]),
            v = o.useContext(Z.E_),
            m = v.getPrefixCls,
            y = v.direction,
            b = null !== f && void 0 !== f ? f : y,
            g = t;
          u && (g = (0, h.sQ)(t, u));
          var E = m('typography', n),
            w = p()(E, (0, a.Z)({}, ''.concat(E, '-rtl'), 'rtl' === b), c);
          return o.createElement(i, (0, r.Z)({ className: w, ref: g }, d), s);
        });
      var L = K;
      function U(e) {
        var t = (0, l.Z)(e);
        return 'string' === t || 'number' === t;
      }
      function W(e) {
        var t = 0;
        return (
          e.forEach(function (e) {
            U(e) ? (t += String(e).length) : (t += 1);
          }),
          t
        );
      }
      function B(e, t) {
        for (var n = 0, r = [], o = 0; o < e.length; o += 1) {
          if (n === t) return r;
          var a = e[o],
            l = U(a),
            i = l ? String(a).length : 1,
            c = n + i;
          if (c > t) {
            var u = t - n;
            return r.push(String(a).slice(0, u)), r;
          }
          r.push(a), (n = c);
        }
        return e;
      }
      var F = 0,
        _ = 1,
        G = 2,
        Q = 3,
        V = 4,
        X = function (e) {
          var t = e.enabledMeasure,
            n = e.children,
            a = e.text,
            l = e.width,
            c = e.fontSize,
            u = e.rows,
            s = e.onEllipsis,
            f = o.useState([0, 0, 0]),
            p = (0, i.Z)(f, 2),
            d = (0, i.Z)(p[0], 3),
            v = d[0],
            m = d[1],
            g = d[2],
            E = p[1],
            h = o.useState(F),
            Z = (0, i.Z)(h, 2),
            w = Z[0],
            x = Z[1],
            O = o.useState(0),
            S = (0, i.Z)(O, 2),
            C = S[0],
            k = S[1],
            R = o.useRef(null),
            j = o.useRef(null),
            P = o.useMemo(
              function () {
                return (0, y.Z)(a);
              },
              [a],
            ),
            D = o.useMemo(
              function () {
                return W(P);
              },
              [P],
            ),
            N = o.useMemo(
              function () {
                return t && w === Q ? n(B(P, m), m < D) : n(P, !1);
              },
              [t, w, n, P, m, D],
            );
          (0, b.Z)(
            function () {
              t && l && c && D && (x(_), E([0, Math.ceil(D / 2), D]));
            },
            [t, l, c, a, D, u],
          ),
            (0, b.Z)(
              function () {
                var e;
                w === _ &&
                  k(
                    (null === (e = R.current) || void 0 === e
                      ? void 0
                      : e.offsetHeight) || 0,
                  );
              },
              [w],
            ),
            (0, b.Z)(
              function () {
                var e, t;
                if (C)
                  if (w === _) {
                    var n =
                        (null === (e = j.current) || void 0 === e
                          ? void 0
                          : e.offsetHeight) || 0,
                      r = u * C;
                    n <= r ? (x(V), s(!1)) : x(G);
                  } else if (w === G)
                    if (v !== g) {
                      var o =
                          (null === (t = j.current) || void 0 === t
                            ? void 0
                            : t.offsetHeight) || 0,
                        a = u * C,
                        l = v,
                        i = g;
                      v === g - 1 ? (i = v) : o <= a ? (l = m) : (i = m);
                      var c = Math.ceil((l + i) / 2);
                      E([l, c, i]);
                    } else x(Q), s(!0);
              },
              [w, v, g, u, C],
            );
          var I = { width: l, whiteSpace: 'normal', margin: 0, padding: 0 },
            T = function (e, t, n) {
              return o.createElement(
                'span',
                {
                  'aria-hidden': !0,
                  ref: t,
                  style: (0, r.Z)(
                    {
                      position: 'fixed',
                      display: 'block',
                      left: 0,
                      top: 0,
                      zIndex: -9999,
                      visibility: 'hidden',
                      pointerEvents: 'none',
                      fontSize: 2 * Math.floor(c / 2),
                    },
                    n,
                  ),
                },
                e,
              );
            },
            M = function (e, t) {
              var r = B(P, e);
              return T(n(r, !0), t, I);
            };
          return o.createElement(
            o.Fragment,
            null,
            N,
            t &&
              w !== Q &&
              w !== V &&
              o.createElement(
                o.Fragment,
                null,
                T('lg', R, { wordBreak: 'keep-all', whiteSpace: 'nowrap' }),
                w === _ ? T(n(P, !1), j, I) : M(m, j),
              ),
          );
        };
      var q = X,
        J = function (e) {
          var t = e.enabledEllipsis,
            n = e.isEllipsis,
            a = e.children,
            l = e.tooltipProps;
          return (null === l || void 0 === l ? void 0 : l.title) && t
            ? o.createElement(j.Z, (0, r.Z)({ open: !!n && void 0 }, l), a)
            : a;
        };
      var Y = J,
        $ = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        };
      function ee(e, t) {
        var n = e.mark,
          r = e.code,
          a = e.underline,
          l = e['delete'],
          i = e.strong,
          c = e.keyboard,
          u = e.italic,
          s = t;
        function f(e, t) {
          e && (s = o.createElement(t, {}, s));
        }
        return (
          f(i, 'strong'),
          f(a, 'u'),
          f(l, 'del'),
          f(r, 'code'),
          f(n, 'mark'),
          f(c, 'kbd'),
          f(u, 'i'),
          s
        );
      }
      function te(e, t, n) {
        return !0 === e || void 0 === e ? t : e || (n && t);
      }
      function ne(e) {
        return !1 === e ? [!1, !1] : Array.isArray(e) ? e : [e];
      }
      var re = '...',
        oe = o.forwardRef(function (e, t) {
          var n,
            f,
            d,
            x = e.prefixCls,
            O = e.className,
            S = e.style,
            C = e.type,
            P = e.disabled,
            D = e.children,
            N = e.ellipsis,
            I = e.editable,
            z = e.copyable,
            H = e.component,
            K = e.title,
            U = $(e, [
              'prefixCls',
              'className',
              'style',
              'type',
              'disabled',
              'children',
              'ellipsis',
              'editable',
              'copyable',
              'component',
              'title',
            ]),
            W = o.useContext(Z.E_),
            B = W.getPrefixCls,
            F = W.direction,
            _ = (0, w.E)('Text')[0],
            G = o.useRef(null),
            Q = o.useRef(null),
            V = B('typography', x),
            X = (0, E.Z)(U, [
              'mark',
              'code',
              'delete',
              'underline',
              'strong',
              'keyboard',
              'italic',
            ]),
            J = M(I),
            oe = (0, i.Z)(J, 2),
            ae = oe[0],
            le = oe[1],
            ie = (0, g.Z)(!1, { value: le.editing }),
            ce = (0, i.Z)(ie, 2),
            ue = ce[0],
            se = ce[1],
            fe = le.triggerType,
            pe = void 0 === fe ? ['icon'] : fe,
            de = function (e) {
              var t;
              e && (null === (t = le.onStart) || void 0 === t || t.call(le)),
                se(e);
            };
          A(
            function () {
              var e;
              ue || null === (e = Q.current) || void 0 === e || e.focus();
            },
            [ue],
          );
          var ve = function (e) {
              null === e || void 0 === e || e.preventDefault(), de(!0);
            },
            me = function (e) {
              var t;
              null === (t = le.onChange) || void 0 === t || t.call(le, e),
                de(!1);
            },
            ye = function () {
              var e;
              null === (e = le.onCancel) || void 0 === e || e.call(le), de(!1);
            },
            be = M(z),
            ge = (0, i.Z)(be, 2),
            Ee = ge[0],
            he = ge[1],
            Ze = o.useState(!1),
            we = (0, i.Z)(Ze, 2),
            xe = we[0],
            Oe = we[1],
            Se = o.useRef(),
            Ce = {};
          he.format && (Ce.format = he.format);
          var ke = function () {
              window.clearTimeout(Se.current);
            },
            Re = function (e) {
              var t;
              null === e || void 0 === e || e.preventDefault(),
                null === e || void 0 === e || e.stopPropagation(),
                v()(he.text || String(D) || '', Ce),
                Oe(!0),
                ke(),
                (Se.current = window.setTimeout(function () {
                  Oe(!1);
                }, 3e3)),
                null === (t = he.onCopy) || void 0 === t || t.call(he, e);
            };
          o.useEffect(function () {
            return ke;
          }, []);
          var je = o.useState(!1),
            Pe = (0, i.Z)(je, 2),
            De = Pe[0],
            Ne = Pe[1],
            Ie = o.useState(!1),
            Te = (0, i.Z)(Ie, 2),
            Me = Te[0],
            ze = Te[1],
            Ae = o.useState(!1),
            He = (0, i.Z)(Ae, 2),
            Ke = He[0],
            Le = He[1],
            Ue = o.useState(!1),
            We = (0, i.Z)(Ue, 2),
            Be = We[0],
            Fe = We[1],
            _e = o.useState(!1),
            Ge = (0, i.Z)(_e, 2),
            Qe = Ge[0],
            Ve = Ge[1],
            Xe = o.useState(!0),
            qe = (0, i.Z)(Xe, 2),
            Je = qe[0],
            Ye = qe[1],
            $e = M(N, { expandable: !1 }),
            et = (0, i.Z)($e, 2),
            tt = et[0],
            nt = et[1],
            rt = tt && !Ke,
            ot = nt.rows,
            at = void 0 === ot ? 1 : ot,
            lt = o.useMemo(
              function () {
                return (
                  !rt ||
                  void 0 !== nt.suffix ||
                  nt.onEllipsis ||
                  nt.expandable ||
                  ae ||
                  Ee
                );
              },
              [rt, nt, ae, Ee],
            );
          (0, b.Z)(
            function () {
              tt &&
                !lt &&
                (Ne((0, R.G)('webkitLineClamp')), ze((0, R.G)('textOverflow')));
            },
            [lt, tt],
          );
          var it = o.useMemo(
              function () {
                return !lt && (1 === at ? Me : De);
              },
              [lt, Me, De],
            ),
            ct = rt && (it ? Qe : Be),
            ut = rt && 1 === at && it,
            st = rt && at > 1 && it,
            ft = function (e) {
              var t;
              Le(!0),
                null === (t = nt.onExpand) || void 0 === t || t.call(nt, e);
            },
            pt = o.useState(0),
            dt = (0, i.Z)(pt, 2),
            vt = dt[0],
            mt = dt[1],
            yt = o.useState(0),
            bt = (0, i.Z)(yt, 2),
            gt = bt[0],
            Et = bt[1],
            ht = function (e, t) {
              var n,
                r = e.offsetWidth;
              mt(r),
                Et(
                  parseInt(
                    null === (n = window.getComputedStyle) || void 0 === n
                      ? void 0
                      : n.call(window, t).fontSize,
                    10,
                  ) || 0,
                );
            },
            Zt = function (e) {
              var t;
              Fe(e),
                Be !== e &&
                  (null === (t = nt.onEllipsis) ||
                    void 0 === t ||
                    t.call(nt, e));
            };
          o.useEffect(
            function () {
              var e = G.current;
              if (tt && it && e) {
                var t = st
                  ? e.offsetHeight < e.scrollHeight
                  : e.offsetWidth < e.scrollWidth;
                Qe !== t && Ve(t);
              }
            },
            [tt, it, D, st, Je],
          ),
            o.useEffect(
              function () {
                var e = G.current;
                if (
                  'undefined' !== typeof IntersectionObserver &&
                  e &&
                  it &&
                  rt
                ) {
                  var t = new IntersectionObserver(function () {
                    Ye(!!e.offsetParent);
                  });
                  return (
                    t.observe(e),
                    function () {
                      t.disconnect();
                    }
                  );
                }
              },
              [it, rt],
            );
          var wt = {};
          wt =
            !0 === nt.tooltip
              ? { title: null !== (n = le.text) && void 0 !== n ? n : D }
              : o.isValidElement(nt.tooltip)
              ? { title: nt.tooltip }
              : 'object' === (0, l.Z)(nt.tooltip)
              ? (0, r.Z)(
                  { title: null !== (f = le.text) && void 0 !== f ? f : D },
                  nt.tooltip,
                )
              : { title: nt.tooltip };
          var xt = o.useMemo(
            function () {
              var e = function (e) {
                return ['string', 'number'].includes((0, l.Z)(e));
              };
              if (tt && !it)
                return e(le.text)
                  ? le.text
                  : e(D)
                  ? D
                  : e(K)
                  ? K
                  : e(wt.title)
                  ? wt.title
                  : void 0;
            },
            [tt, it, K, wt.title, ct],
          );
          if (ue)
            return o.createElement(T, {
              value:
                null !== (d = le.text) && void 0 !== d
                  ? d
                  : 'string' === typeof D
                  ? D
                  : '',
              onSave: me,
              onCancel: ye,
              onEnd: le.onEnd,
              prefixCls: V,
              className: O,
              style: S,
              direction: F,
              component: H,
              maxLength: le.maxLength,
              autoSize: le.autoSize,
              enterIcon: le.enterIcon,
            });
          var Ot = function () {
              var e,
                t = nt.expandable,
                n = nt.symbol;
              return t
                ? ((e = n || _.expand),
                  o.createElement(
                    'a',
                    {
                      key: 'expand',
                      className: ''.concat(V, '-expand'),
                      onClick: ft,
                      'aria-label': _.expand,
                    },
                    e,
                  ))
                : null;
            },
            St = function () {
              if (ae) {
                var e = le.icon,
                  t = le.tooltip,
                  n = (0, y.Z)(t)[0] || _.edit,
                  r = 'string' === typeof n ? n : '';
                return pe.includes('icon')
                  ? o.createElement(
                      j.Z,
                      { key: 'edit', title: !1 === t ? '' : n },
                      o.createElement(
                        k,
                        {
                          ref: Q,
                          className: ''.concat(V, '-edit'),
                          onClick: ve,
                          'aria-label': r,
                        },
                        e || o.createElement(s.Z, { role: 'button' }),
                      ),
                    )
                  : null;
              }
            },
            Ct = function () {
              if (Ee) {
                var e = he.tooltips,
                  t = he.icon,
                  n = ne(e),
                  r = ne(t),
                  a = xe ? te(n[1], _.copied) : te(n[0], _.copy),
                  l = xe ? _.copied : _.copy,
                  i = 'string' === typeof a ? a : l;
                return o.createElement(
                  j.Z,
                  { key: 'copy', title: a },
                  o.createElement(
                    k,
                    {
                      className: p()(
                        ''.concat(V, '-copy'),
                        xe && ''.concat(V, '-copy-success'),
                      ),
                      onClick: Re,
                      'aria-label': i,
                    },
                    xe
                      ? te(r[1], o.createElement(c.Z, null), !0)
                      : te(r[0], o.createElement(u.Z, null), !0),
                  ),
                );
              }
            },
            kt = function (e) {
              return [e && Ot(), St(), Ct()];
            },
            Rt = function (e) {
              return [
                e &&
                  o.createElement(
                    'span',
                    { 'aria-hidden': !0, key: 'ellipsis' },
                    re,
                  ),
                nt.suffix,
                kt(e),
              ];
            };
          return o.createElement(
            m.Z,
            { onResize: ht, disabled: !rt || it },
            function (n) {
              var l;
              return o.createElement(
                Y,
                { tooltipProps: wt, enabledEllipsis: rt, isEllipsis: ct },
                o.createElement(
                  L,
                  (0, r.Z)(
                    {
                      className: p()(
                        ((l = {}),
                        (0, a.Z)(l, ''.concat(V, '-').concat(C), C),
                        (0, a.Z)(l, ''.concat(V, '-disabled'), P),
                        (0, a.Z)(l, ''.concat(V, '-ellipsis'), tt),
                        (0, a.Z)(
                          l,
                          ''.concat(V, '-single-line'),
                          rt && 1 === at,
                        ),
                        (0, a.Z)(l, ''.concat(V, '-ellipsis-single-line'), ut),
                        (0, a.Z)(
                          l,
                          ''.concat(V, '-ellipsis-multiple-line'),
                          st,
                        ),
                        l),
                        O,
                      ),
                      prefixCls: x,
                      style: (0, r.Z)((0, r.Z)({}, S), {
                        WebkitLineClamp: st ? at : void 0,
                      }),
                      component: H,
                      ref: (0, h.sQ)(n, G, t),
                      direction: F,
                      onClick: pe.includes('text') ? ve : void 0,
                      'aria-label':
                        null === xt || void 0 === xt ? void 0 : xt.toString(),
                      title: K,
                    },
                    X,
                  ),
                  o.createElement(
                    q,
                    {
                      enabledMeasure: rt && !it,
                      text: D,
                      rows: at,
                      width: vt,
                      fontSize: gt,
                      onEllipsis: Zt,
                    },
                    function (t, n) {
                      var r = t;
                      t.length &&
                        n &&
                        xt &&
                        (r = o.createElement(
                          'span',
                          { key: 'show-content', 'aria-hidden': !0 },
                          r,
                        ));
                      var a = ee(
                        e,
                        o.createElement(o.Fragment, null, r, Rt(n)),
                      );
                      return a;
                    },
                  ),
                ),
              );
            },
          );
        }),
        ae = oe,
        le = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        ie = o.forwardRef(function (e, t) {
          var n = e.ellipsis,
            a = e.rel,
            l = le(e, ['ellipsis', 'rel']),
            i = (0, r.Z)((0, r.Z)({}, l), {
              rel:
                void 0 === a && '_blank' === l.target
                  ? 'noopener noreferrer'
                  : a,
            });
          return (
            delete i.navigate,
            o.createElement(
              ae,
              (0, r.Z)({}, i, { ref: t, ellipsis: !!n, component: 'a' }),
            )
          );
        }),
        ce = ie,
        ue = o.forwardRef(function (e, t) {
          return o.createElement(
            ae,
            (0, r.Z)({ ref: t }, e, { component: 'div' }),
          );
        }),
        se = ue,
        fe = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        pe = function (e, t) {
          var n = e.ellipsis,
            a = fe(e, ['ellipsis']),
            i = o.useMemo(
              function () {
                return n && 'object' === (0, l.Z)(n)
                  ? (0, E.Z)(n, ['expandable', 'rows'])
                  : n;
              },
              [n],
            );
          return o.createElement(
            ae,
            (0, r.Z)({ ref: t }, a, { ellipsis: i, component: 'span' }),
          );
        },
        de = o.forwardRef(pe),
        ve = n(93355),
        me = function (e, t) {
          var n = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              t.indexOf(r) < 0 &&
              (n[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              t.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (n[r[o]] = e[r[o]]);
          }
          return n;
        },
        ye = (0, ve.a)(1, 2, 3, 4, 5),
        be = o.forwardRef(function (e, t) {
          var n,
            a = e.level,
            l = void 0 === a ? 1 : a,
            i = me(e, ['level']);
          return (
            (n = ye.includes(l) ? 'h'.concat(l) : 'h1'),
            o.createElement(ae, (0, r.Z)({ ref: t }, i, { component: n }))
          );
        }),
        ge = be,
        Ee = L;
      (Ee.Text = de), (Ee.Link = ce), (Ee.Title = ge), (Ee.Paragraph = se);
      var he = Ee;
    },
    402: function (e, t, n) {
      'use strict';
      n(38663), n(47828), n(47673), n(22385);
    },
    20640: function (e, t, n) {
      'use strict';
      var r = n(11742),
        o = { 'text/plain': 'Text', 'text/html': 'Url', default: 'Text' },
        a = 'Copy to clipboard: #{key}, Enter';
      function l(e) {
        var t =
          (/mac os x/i.test(navigator.userAgent) ? '\u2318' : 'Ctrl') + '+C';
        return e.replace(/#{\s*key\s*}/g, t);
      }
      function i(e, t) {
        var n,
          i,
          c,
          u,
          s,
          f,
          p = !1;
        t || (t = {}), (n = t.debug || !1);
        try {
          (c = r()),
            (u = document.createRange()),
            (s = document.getSelection()),
            (f = document.createElement('span')),
            (f.textContent = e),
            (f.ariaHidden = 'true'),
            (f.style.all = 'unset'),
            (f.style.position = 'fixed'),
            (f.style.top = 0),
            (f.style.clip = 'rect(0, 0, 0, 0)'),
            (f.style.whiteSpace = 'pre'),
            (f.style.webkitUserSelect = 'text'),
            (f.style.MozUserSelect = 'text'),
            (f.style.msUserSelect = 'text'),
            (f.style.userSelect = 'text'),
            f.addEventListener('copy', function (r) {
              if ((r.stopPropagation(), t.format))
                if (
                  (r.preventDefault(), 'undefined' === typeof r.clipboardData)
                ) {
                  n && console.warn('unable to use e.clipboardData'),
                    n && console.warn('trying IE specific stuff'),
                    window.clipboardData.clearData();
                  var a = o[t.format] || o['default'];
                  window.clipboardData.setData(a, e);
                } else
                  r.clipboardData.clearData(),
                    r.clipboardData.setData(t.format, e);
              t.onCopy && (r.preventDefault(), t.onCopy(r.clipboardData));
            }),
            document.body.appendChild(f),
            u.selectNodeContents(f),
            s.addRange(u);
          var d = document.execCommand('copy');
          if (!d) throw new Error('copy command was unsuccessful');
          p = !0;
        } catch (v) {
          n && console.error('unable to copy using execCommand: ', v),
            n && console.warn('trying IE specific stuff');
          try {
            window.clipboardData.setData(t.format || 'text', e),
              t.onCopy && t.onCopy(window.clipboardData),
              (p = !0);
          } catch (v) {
            n && console.error('unable to copy using clipboardData: ', v),
              n && console.error('falling back to prompt'),
              (i = l('message' in t ? t.message : a)),
              window.prompt(i, e);
          }
        } finally {
          s &&
            ('function' == typeof s.removeRange
              ? s.removeRange(u)
              : s.removeAllRanges()),
            f && document.body.removeChild(f),
            c();
        }
        return p;
      }
      e.exports = i;
    },
    11742: function (e) {
      e.exports = function () {
        var e = document.getSelection();
        if (!e.rangeCount) return function () {};
        for (
          var t = document.activeElement, n = [], r = 0;
          r < e.rangeCount;
          r++
        )
          n.push(e.getRangeAt(r));
        switch (t.tagName.toUpperCase()) {
          case 'INPUT':
          case 'TEXTAREA':
            t.blur();
            break;
          default:
            t = null;
            break;
        }
        return (
          e.removeAllRanges(),
          function () {
            'Caret' === e.type && e.removeAllRanges(),
              e.rangeCount ||
                n.forEach(function (t) {
                  e.addRange(t);
                }),
              t && t.focus();
          }
        );
      };
    },
  },
]);
