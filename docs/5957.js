(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [5957],
  {
    64803: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return u;
        },
      });
      var r = n(77299),
        a = n(77974),
        o = n(71650);
      function l(e, t, n, r, a) {
        return (
          a(e, function (e, a, o) {
            n = r ? ((r = !1), e) : t(n, e, a, o);
          }),
          n
        );
      }
      var s = l,
        i = n(39350);
      function c(e, t, n) {
        var l = (0, i.Z)(e) ? r.Z : s,
          c = arguments.length < 3;
        return l(e, (0, o.Z)(t, 4), n, c, a.Z);
      }
      var u = c;
    },
    31231: function (e, t, n) {
      'use strict';
      var r = n(3605),
        a = n(8901),
        o = n(34096),
        l = (0, a.Z)(function (e, t) {
          return (0, o.Z)(e) ? (0, r.Z)(e, t) : [];
        });
      t['Z'] = l;
    },
    35957: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return Xe;
        },
      });
      var r = n(22122),
        a = n(41788),
        o = n(81927);
      function l(e) {
        var t = -1,
          n = null == e ? 0 : e.length,
          r = 0,
          a = [];
        while (++t < n) {
          var o = e[t];
          o && (a[r++] = o);
        }
        return a;
      }
      var s = l,
        i = n(30014);
      function c(e, t) {
        var n = -1,
          r = null == e ? 0 : e.length;
        while (++n < r) if (!t(e[n], n, e)) return !1;
        return !0;
      }
      var u = c,
        p = n(77974);
      function d(e, t) {
        var n = !0;
        return (
          (0, p.Z)(e, function (e, r, a) {
            return (n = !!t(e, r, a)), n;
          }),
          n
        );
      }
      var h = d,
        f = n(71650),
        v = n(39350),
        m = n(40185);
      function Z(e, t, n) {
        var r = (0, v.Z)(e) ? u : h;
        return n && (0, m.Z)(e, t, n) && (t = void 0), r(e, (0, f.Z)(t, 3));
      }
      var g = Z,
        b = n(31231),
        y = n(5710),
        C = n(88130);
      function I(e) {
        return function (t, n, r) {
          var a = Object(t);
          if (!(0, y.Z)(t)) {
            var o = (0, f.Z)(n, 3);
            (t = (0, C.Z)(t)),
              (n = function (e) {
                return o(a[e], e, a);
              });
          }
          var l = e(t, n, r);
          return l > -1 ? a[o ? t[l] : l] : void 0;
        };
      }
      var w = I,
        S = n(2619),
        k = n(98392),
        x = Math.max;
      function O(e, t, n) {
        var r = null == e ? 0 : e.length;
        if (!r) return -1;
        var a = null == n ? 0 : (0, k.Z)(n);
        return a < 0 && (a = x(r + a, 0)), (0, S.Z)(e, (0, f.Z)(t, 3), a);
      }
      var P = O,
        E = w(P),
        A = E,
        N = n(94591);
      function D(e, t, n) {
        var r = null == e ? 0 : e.length;
        return r
          ? ((t = n || void 0 === t ? 1 : (0, k.Z)(t)),
            (t = r - t),
            (0, N.Z)(e, 0, t < 0 ? 0 : t))
          : [];
      }
      var L = D,
        G = n(12964),
        R = n(9169),
        Q = n(49550),
        M = n(11279),
        T = n(99493),
        K = '[object Map]',
        B = '[object Set]';
      function V(e) {
        if (null == e) return 0;
        if ((0, y.Z)(e)) return (0, M.Z)(e) ? (0, T.Z)(e) : e.length;
        var t = (0, Q.Z)(e);
        return t == K || t == B ? e.size : (0, R.Z)(e).length;
      }
      var z = V,
        F = n(75637),
        U = n(20511),
        _ = n(77398),
        H = n(89555),
        q = n(99250),
        j = n(23715),
        W = n(65741),
        $ = n(25069),
        X = n(4112),
        J = n(55288),
        Y = n(9695),
        ee = n.n(Y),
        te = n(31368),
        ne = n(86010),
        re = n(47630),
        ae = n.n(re),
        oe = (n(55301), n(12924)),
        le = n.n(oe),
        se = n(96774),
        ie = n.n(se),
        ce = n(69577),
        ue = n(92248),
        pe = n(92063),
        de = n(28935),
        he = n(12519),
        fe = n(90327),
        ve = n(65382),
        me = n(87401),
        Ze = n(93619),
        ge = (function (e) {
          function t() {
            return e.apply(this, arguments) || this;
          }
          (0, a.Z)(t, e);
          var n = t.prototype;
          return (
            (n.render = function () {
              var e = this.props,
                n = e.className,
                a = e.name,
                o = (0, ne.default)(a, 'flag', n),
                l = (0, de.Z)(t, this.props),
                s = (0, he.Z)(t, this.props);
              return le().createElement(s, (0, r.Z)({}, l, { className: o }));
            }),
            t
          );
        })(oe.PureComponent);
      (ge.handledProps = ['as', 'className', 'name']),
        (ge.propTypes = {}),
        (ge.defaultProps = { as: 'i' }),
        (ge.create = (0, Ze.u5)(ge, function (e) {
          return { name: e };
        }));
      var be = ge,
        ye = n(49282);
      function Ce(e) {
        var t = e.className,
          n = (0, ne.default)('divider', t),
          a = (0, de.Z)(Ce, e),
          o = (0, he.Z)(Ce, e);
        return le().createElement(o, (0, r.Z)({}, a, { className: n }));
      }
      (Ce.handledProps = ['as', 'className']), (Ce.propTypes = {});
      var Ie = Ce,
        we = (function (e) {
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
                (0, j.Z)(t.props, 'onClick', e, t.props);
              }),
              t
            );
          }
          (0, a.Z)(t, e);
          var n = t.prototype;
          return (
            (n.render = function () {
              var e = this.props,
                n = e.active,
                a = e.children,
                o = e.className,
                l = e.content,
                s = e.disabled,
                i = e.description,
                c = e.flag,
                u = e.icon,
                p = e.image,
                d = e.label,
                h = e.selected,
                f = e.text,
                v = (0, ne.default)(
                  (0, pe.lG)(n, 'active'),
                  (0, pe.lG)(s, 'disabled'),
                  (0, pe.lG)(h, 'selected'),
                  'item',
                  o,
                ),
                m = (0, J.Z)(u) ? ue.tQ(a, 'DropdownMenu') && 'dropdown' : u,
                Z = (0, de.Z)(t, this.props),
                g = (0, he.Z)(t, this.props),
                b = {
                  role: 'option',
                  'aria-disabled': s,
                  'aria-checked': n,
                  'aria-selected': h,
                };
              if (!ue.kK(a))
                return le().createElement(
                  g,
                  (0, r.Z)({}, Z, b, {
                    className: v,
                    onClick: this.handleClick,
                  }),
                  a,
                );
              var y = be.create(c, { autoGenerateKey: !1 }),
                C = ve.Z.create(m, { autoGenerateKey: !1 }),
                I = ye.Z.create(p, { autoGenerateKey: !1 }),
                w = me.Z.create(d, { autoGenerateKey: !1 }),
                S = (0, Ze.Go)(
                  'span',
                  function (e) {
                    return { children: e };
                  },
                  i,
                  {
                    defaultProps: { className: 'description' },
                    autoGenerateKey: !1,
                  },
                ),
                k = (0, Ze.Go)(
                  'span',
                  function (e) {
                    return { children: e };
                  },
                  ue.kK(l) ? f : l,
                  { defaultProps: { className: 'text' }, autoGenerateKey: !1 },
                );
              return le().createElement(
                g,
                (0, r.Z)({}, Z, b, { className: v, onClick: this.handleClick }),
                I,
                C,
                y,
                w,
                S,
                k,
              );
            }),
            t
          );
        })(oe.Component);
      (we.handledProps = [
        'active',
        'as',
        'children',
        'className',
        'content',
        'description',
        'disabled',
        'flag',
        'icon',
        'image',
        'label',
        'onClick',
        'selected',
        'text',
        'value',
      ]),
        (we.propTypes = {}),
        (we.create = (0, Ze.u5)(we, function (e) {
          return e;
        }));
      var Se = we;
      function ke(e) {
        var t = e.children,
          n = e.className,
          a = e.content,
          o = e.icon,
          l = (0, ne.default)('header', n),
          s = (0, de.Z)(ke, e),
          i = (0, he.Z)(ke, e);
        return ue.kK(t)
          ? le().createElement(
              i,
              (0, r.Z)({}, s, { className: l }),
              ve.Z.create(o, { autoGenerateKey: !1 }),
              a,
            )
          : le().createElement(i, (0, r.Z)({}, s, { className: l }), t);
      }
      (ke.handledProps = ['as', 'children', 'className', 'content', 'icon']),
        (ke.propTypes = {}),
        (ke.create = (0, Ze.u5)(ke, function (e) {
          return { content: e };
        }));
      var xe = ke;
      function Oe(e) {
        var t = e.children,
          n = e.className,
          a = e.content,
          o = e.direction,
          l = e.open,
          s = e.scrolling,
          i = (0, ne.default)(
            o,
            (0, pe.lG)(l, 'visible'),
            (0, pe.lG)(s, 'scrolling'),
            'menu transition',
            n,
          ),
          c = (0, de.Z)(Oe, e),
          u = (0, he.Z)(Oe, e);
        return le().createElement(
          u,
          (0, r.Z)({}, c, { className: i }),
          ue.kK(t) ? a : t,
        );
      }
      (Oe.handledProps = [
        'as',
        'children',
        'className',
        'content',
        'direction',
        'open',
        'scrolling',
      ]),
        (Oe.propTypes = {});
      var Pe = Oe,
        Ee = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, a = new Array(n), o = 0;
              o < n;
              o++
            )
              a[o] = arguments[o];
            return (
              (t = e.call.apply(e, [this].concat(a)) || this),
              (t.handleChange = function (e) {
                var n = (0, _.Z)(e, 'target.value');
                (0, j.Z)(
                  t.props,
                  'onChange',
                  e,
                  (0, r.Z)({}, t.props, { value: n }),
                );
              }),
              t
            );
          }
          (0, a.Z)(t, e);
          var n = t.prototype;
          return (
            (n.render = function () {
              var e = this.props,
                n = e.autoComplete,
                a = e.className,
                o = e.tabIndex,
                l = e.type,
                s = e.value,
                i = (0, ne.default)('search', a),
                c = (0, de.Z)(t, this.props);
              return le().createElement(
                'input',
                (0, r.Z)({}, c, {
                  'aria-autocomplete': 'list',
                  autoComplete: n,
                  className: i,
                  onChange: this.handleChange,
                  tabIndex: o,
                  type: l,
                  value: s,
                }),
              );
            }),
            t
          );
        })(oe.Component);
      (Ee.handledProps = [
        'as',
        'autoComplete',
        'className',
        'tabIndex',
        'type',
        'value',
      ]),
        (Ee.propTypes = {}),
        (Ee.defaultProps = { autoComplete: 'off', type: 'text' }),
        (Ee.create = (0, Ze.u5)(Ee, function (e) {
          return { type: e };
        }));
      var Ae = Ee;
      function Ne(e) {
        var t = e.children,
          n = e.className,
          a = e.content,
          o = (0, ne.default)('divider', n),
          l = (0, de.Z)(Ne, e),
          s = (0, he.Z)(Ne, e);
        return le().createElement(
          s,
          (0, r.Z)(
            { 'aria-atomic': !0, 'aria-live': 'polite', role: 'alert' },
            l,
            { className: o },
          ),
          ue.kK(t) ? a : t,
        );
      }
      (Ne.handledProps = ['as', 'children', 'className', 'content']),
        (Ne.propTypes = {}),
        (Ne.create = (0, Ze.u5)(Ne, function (e) {
          return { content: e };
        }));
      var De = Ne,
        Le = n(1429),
        Ge = n(13633),
        Re = /[\\^$.*+?()[\]{}|]/g,
        Qe = RegExp(Re.source);
      function Me(e) {
        return (e = (0, Ge.Z)(e)), e && Qe.test(e) ? e.replace(Re, '\\$&') : e;
      }
      var Te = Me,
        Ke = n(23182),
        Be = n(64513);
      function Ve(e, t) {
        var n = [];
        return (
          (0, p.Z)(e, function (e, r, a) {
            t(e, r, a) && n.push(e);
          }),
          n
        );
      }
      var ze = Ve;
      function Fe(e, t) {
        var n = (0, v.Z)(e) ? Be.Z : ze;
        return n(e, (0, f.Z)(t, 3));
      }
      var Ue = Fe;
      function _e(e) {
        var t = e.additionLabel,
          n = e.additionPosition,
          r = e.allowAdditions,
          a = e.deburr,
          l = e.multiple,
          s = e.options,
          i = e.search,
          c = e.searchQuery,
          u = e.value,
          p = s;
        if (
          (l &&
            (p = Ue(p, function (e) {
              return !(0, o.Z)(u, e.value);
            })),
          i && c)
        )
          if ((0, $.Z)(i)) p = i(p, c);
          else {
            var d = a ? (0, Ke.Z)(c) : c,
              h = new RegExp(Te(d), 'i');
            p = Ue(p, function (e) {
              return h.test(a ? (0, Ke.Z)(e.text) : e.text);
            });
          }
        if (r && i && c && !(0, Le.Z)(p, { text: c })) {
          var f = le().isValidElement(t)
              ? le().cloneElement(t, { key: 'addition-label' })
              : t || '',
            v = {
              key: 'addition',
              text: [f, le().createElement('b', { key: 'addition-query' }, c)],
              value: c,
              className: 'addition',
              'data-additional': !0,
            };
          'top' === n ? p.unshift(v) : p.push(v);
        }
        return p;
      }
      _e.handledProps = [];
      var He = n(64803);
      function qe(e) {
        var t,
          n = e.additionLabel,
          r = e.additionPosition,
          a = e.allowAdditions,
          l = e.deburr,
          s = e.multiple,
          i = e.options,
          c = e.search,
          u = e.searchQuery,
          p = e.selectedIndex,
          d = e.value,
          h = _e({
            value: d,
            options: i,
            searchQuery: u,
            additionLabel: n,
            additionPosition: r,
            allowAdditions: a,
            deburr: l,
            multiple: s,
            search: c,
          }),
          f = (0, He.Z)(
            h,
            function (e, t, n) {
              return t.disabled || e.push(n), e;
            },
            [],
          );
        if (!p || p < 0) {
          var v = f[0];
          t = s ? v : P(h, ['value', d]) || f[0];
        } else if (s)
          (t = A(f, function (e) {
            return e >= p;
          })),
            p >= h.length - 1 && (t = f[f.length - 1]);
        else {
          var m = P(h, ['value', d]);
          t = (0, o.Z)(f, m) ? m : void 0;
        }
        return (!t || t < 0) && (t = f[0]), t;
      }
      var je = function (e, t) {
          return (0, J.Z)(e) ? t : e;
        },
        We = function (e) {
          return e
            ? e.map(function (e) {
                return (0, X.Z)(e, ['key', 'value']);
              })
            : e;
        };
      function $e(e) {
        var t = e.flag,
          n = e.image,
          r = e.text;
        return (0, $.Z)(r)
          ? r
          : {
              content: le().createElement(
                le().Fragment,
                null,
                be.create(t),
                ye.Z.create(n),
                r,
              ),
            };
      }
      var Xe = (function (e) {
        function t() {
          for (var t, n = arguments.length, a = new Array(n), l = 0; l < n; l++)
            a[l] = arguments[l];
          return (
            (t = e.call.apply(e, [this].concat(a)) || this),
            (t.searchRef = (0, oe.createRef)()),
            (t.sizerRef = (0, oe.createRef)()),
            (t.ref = (0, oe.createRef)()),
            (t.handleChange = function (e, n) {
              (0, j.Z)(
                t.props,
                'onChange',
                e,
                (0, r.Z)({}, t.props, { value: n }),
              );
            }),
            (t.closeOnChange = function (e) {
              var n = t.props,
                r = n.closeOnChange,
                a = n.multiple,
                o = (0, q.Z)(r) ? !a : r;
              o && t.close(e, H.Z);
            }),
            (t.closeOnEscape = function (e) {
              t.props.closeOnEscape &&
                ae().getCode(e) === ae().Escape &&
                (e.preventDefault(), t.close(e));
            }),
            (t.moveSelectionOnKeyDown = function (e) {
              var n,
                r = t.props,
                a = r.multiple,
                o = r.selectOnNavigation,
                l = t.state.open;
              if (l) {
                var s =
                    ((n = {}),
                    (n[ae().ArrowDown] = 1),
                    (n[ae().ArrowUp] = -1),
                    n),
                  i = s[ae().getCode(e)];
                if (void 0 !== i) {
                  e.preventDefault();
                  var c = t.getSelectedIndexAfterMove(i);
                  !a && o && t.makeSelectedItemActive(e, c),
                    t.setState({ selectedIndex: c });
                }
              }
            }),
            (t.openOnSpace = function (e) {
              var n,
                r,
                a,
                o =
                  t.state.focus &&
                  !t.state.open &&
                  ae().getCode(e) === ae().Spacebar,
                l =
                  'INPUT' !== (null == (n = e.target) ? void 0 : n.tagName) &&
                  'TEXTAREA' !==
                    (null == (r = e.target) ? void 0 : r.tagName) &&
                  !0 !==
                    (null == (a = e.target) ? void 0 : a.isContentEditable);
              o && (l && e.preventDefault(), t.open(e));
            }),
            (t.openOnArrow = function (e) {
              var n = t.state,
                r = n.focus,
                a = n.open;
              if (r && !a) {
                var o = ae().getCode(e);
                (o !== ae().ArrowDown && o !== ae().ArrowUp) ||
                  (e.preventDefault(), t.open(e));
              }
            }),
            (t.makeSelectedItemActive = function (e, n) {
              var a = t.state,
                o = a.open,
                l = a.value,
                s = t.props.multiple,
                i = t.getSelectedItem(n),
                c = (0, _.Z)(i, 'value'),
                u = (0, _.Z)(i, 'disabled');
              if ((0, J.Z)(c) || !o || u) return l;
              var p = s ? (0, U.Z)(l, [c]) : c,
                d = s ? !!(0, F.Z)(p, l).length : p !== l;
              return (
                d &&
                  (t.setState({ value: p }),
                  t.handleChange(e, p),
                  i['data-additional'] &&
                    (0, j.Z)(
                      t.props,
                      'onAddItem',
                      e,
                      (0, r.Z)({}, t.props, { value: c }),
                    )),
                l
              );
            }),
            (t.selectItemOnEnter = function (e) {
              var n = t.props.search,
                r = t.state,
                a = r.open,
                o = r.selectedIndex;
              if (a) {
                var l =
                  ae().getCode(e) === ae().Enter ||
                  (!n && ae().getCode(e) === ae().Spacebar);
                if (l) {
                  e.preventDefault();
                  var s = z(
                    _e({
                      value: t.state.value,
                      options: t.props.options,
                      searchQuery: t.state.searchQuery,
                      additionLabel: t.props.additionLabel,
                      additionPosition: t.props.additionPosition,
                      allowAdditions: t.props.allowAdditions,
                      deburr: t.props.deburr,
                      multiple: t.props.multiple,
                      search: t.props.search,
                    }),
                  );
                  if (!n || 0 !== s) {
                    var i = t.makeSelectedItemActive(e, o);
                    t.setState({
                      selectedIndex: qe({
                        additionLabel: t.props.additionLabel,
                        additionPosition: t.props.additionPosition,
                        allowAdditions: t.props.allowAdditions,
                        deburr: t.props.deburr,
                        multiple: t.props.multiple,
                        search: t.props.search,
                        selectedIndex: o,
                        value: i,
                        options: t.props.options,
                        searchQuery: '',
                      }),
                    }),
                      t.closeOnChange(e),
                      t.clearSearchQuery(),
                      n && (0, j.Z)(t.searchRef.current, 'focus');
                  }
                }
              }
            }),
            (t.removeItemOnBackspace = function (e) {
              var n = t.props,
                r = n.multiple,
                a = n.search,
                o = t.state,
                l = o.searchQuery,
                s = o.value;
              if (
                ae().getCode(e) === ae().Backspace &&
                !l &&
                a &&
                r &&
                !(0, G.Z)(s)
              ) {
                e.preventDefault();
                var i = L(s);
                t.setState({ value: i }), t.handleChange(e, i);
              }
            }),
            (t.closeOnDocumentClick = function (e) {
              t.props.closeOnBlur &&
                ((t.ref.current && (0, ce.Z)(t.ref.current, e)) || t.close());
            }),
            (t.handleMouseDown = function (e) {
              (t.isMouseDown = !0),
                (0, j.Z)(t.props, 'onMouseDown', e, t.props),
                document.addEventListener('mouseup', t.handleDocumentMouseUp);
            }),
            (t.handleDocumentMouseUp = function () {
              (t.isMouseDown = !1),
                document.removeEventListener(
                  'mouseup',
                  t.handleDocumentMouseUp,
                );
            }),
            (t.handleClick = function (e) {
              var n = t.props,
                r = n.minCharacters,
                a = n.search,
                o = t.state,
                l = o.open,
                s = o.searchQuery;
              if (
                ((0, j.Z)(t.props, 'onClick', e, t.props),
                e.stopPropagation(),
                !a)
              )
                return t.toggle(e);
              l
                ? (0, j.Z)(t.searchRef.current, 'focus')
                : s.length >= r || 1 === r
                ? t.open(e)
                : (0, j.Z)(t.searchRef.current, 'focus');
            }),
            (t.handleIconClick = function (e) {
              var n = t.props.clearable,
                r = t.hasValue();
              (0, j.Z)(t.props, 'onClick', e, t.props),
                e.stopPropagation(),
                n && r ? t.clearValue(e) : t.toggle(e);
            }),
            (t.handleItemClick = function (e, n) {
              var a = t.props,
                o = a.multiple,
                l = a.search,
                s = t.state.value,
                i = n.value;
              if (
                (e.stopPropagation(),
                (o || n.disabled) && e.nativeEvent.stopImmediatePropagation(),
                !n.disabled)
              ) {
                var c = n['data-additional'],
                  u = o ? (0, U.Z)(t.state.value, [i]) : i,
                  p = o ? !!(0, F.Z)(u, s).length : u !== s;
                p && (t.setState({ value: u }), t.handleChange(e, u)),
                  t.clearSearchQuery(),
                  l
                    ? (0, j.Z)(t.searchRef.current, 'focus')
                    : (0, j.Z)(t.ref.current, 'focus'),
                  t.closeOnChange(e),
                  c &&
                    (0, j.Z)(
                      t.props,
                      'onAddItem',
                      e,
                      (0, r.Z)({}, t.props, { value: i }),
                    );
              }
            }),
            (t.handleFocus = function (e) {
              var n = t.state.focus;
              n ||
                ((0, j.Z)(t.props, 'onFocus', e, t.props),
                t.setState({ focus: !0 }));
            }),
            (t.handleBlur = function (e) {
              var n = (0, _.Z)(e, 'currentTarget');
              if (!n || !n.contains(document.activeElement)) {
                var r = t.props,
                  a = r.closeOnBlur,
                  o = r.multiple,
                  l = r.selectOnBlur;
                t.isMouseDown ||
                  ((0, j.Z)(t.props, 'onBlur', e, t.props),
                  l &&
                    !o &&
                    (t.makeSelectedItemActive(e, t.state.selectedIndex),
                    a && t.close()),
                  t.setState({ focus: !1 }),
                  t.clearSearchQuery());
              }
            }),
            (t.handleSearchChange = function (e, n) {
              var a = n.value;
              e.stopPropagation();
              var o = t.props.minCharacters,
                l = t.state.open,
                s = a;
              (0, j.Z)(
                t.props,
                'onSearchChange',
                e,
                (0, r.Z)({}, t.props, { searchQuery: s }),
              ),
                t.setState({ searchQuery: s, selectedIndex: 0 }),
                !l && s.length >= o
                  ? t.open()
                  : l && 1 !== o && s.length < o && t.close();
            }),
            (t.handleKeyDown = function (e) {
              t.moveSelectionOnKeyDown(e),
                t.openOnArrow(e),
                t.openOnSpace(e),
                t.selectItemOnEnter(e),
                (0, j.Z)(t.props, 'onKeyDown', e);
            }),
            (t.getSelectedItem = function (e) {
              var n = _e({
                value: t.state.value,
                options: t.props.options,
                searchQuery: t.state.searchQuery,
                additionLabel: t.props.additionLabel,
                additionPosition: t.props.additionPosition,
                allowAdditions: t.props.allowAdditions,
                deburr: t.props.deburr,
                multiple: t.props.multiple,
                search: t.props.search,
              });
              return (0, _.Z)(n, '[' + e + ']');
            }),
            (t.getItemByValue = function (e) {
              var n = t.props.options;
              return A(n, { value: e });
            }),
            (t.getDropdownAriaOptions = function () {
              var e = t.props,
                n = e.loading,
                r = e.disabled,
                a = e.search,
                o = e.multiple,
                l = t.state.open,
                s = {
                  role: a ? 'combobox' : 'listbox',
                  'aria-busy': n,
                  'aria-disabled': r,
                  'aria-expanded': !!l,
                };
              return 'listbox' === s.role && (s['aria-multiselectable'] = o), s;
            }),
            (t.clearSearchQuery = function () {
              var e = t.state.searchQuery;
              void 0 !== e && '' !== e && t.setState({ searchQuery: '' });
            }),
            (t.handleLabelClick = function (e, n) {
              e.stopPropagation(),
                t.setState({ selectedLabel: n.value }),
                (0, j.Z)(t.props, 'onLabelClick', e, n);
            }),
            (t.handleLabelRemove = function (e, n) {
              e.stopPropagation();
              var r = t.state.value,
                a = (0, b.Z)(r, n.value);
              t.setState({ value: a }), t.handleChange(e, a);
            }),
            (t.getSelectedIndexAfterMove = function (e, n) {
              void 0 === n && (n = t.state.selectedIndex);
              var r = _e({
                value: t.state.value,
                options: t.props.options,
                searchQuery: t.state.searchQuery,
                additionLabel: t.props.additionLabel,
                additionPosition: t.props.additionPosition,
                allowAdditions: t.props.allowAdditions,
                deburr: t.props.deburr,
                multiple: t.props.multiple,
                search: t.props.search,
              });
              if (void 0 !== r && !g(r, 'disabled')) {
                var a = r.length - 1,
                  o = t.props.wrapSelection,
                  l = n + e;
                return (
                  !o && (l > a || l < 0)
                    ? (l = n)
                    : l > a
                    ? (l = 0)
                    : l < 0 && (l = a),
                  r[l].disabled ? t.getSelectedIndexAfterMove(e, l) : l
                );
              }
            }),
            (t.handleIconOverrides = function (e) {
              var n = t.props.clearable,
                r = (0, ne.default)(n && t.hasValue() && 'clear', e.className);
              return {
                className: r,
                onClick: function (n) {
                  (0, j.Z)(e, 'onClick', n, e), t.handleIconClick(n);
                },
              };
            }),
            (t.clearValue = function (e) {
              var n = t.props.multiple,
                r = n ? [] : '';
              t.setState({ value: r }), t.handleChange(e, r);
            }),
            (t.computeSearchInputTabIndex = function () {
              var e = t.props,
                n = e.disabled,
                r = e.tabIndex;
              return (0, J.Z)(r) ? (n ? -1 : 0) : r;
            }),
            (t.computeSearchInputWidth = function () {
              var e = t.state.searchQuery;
              if (t.sizerRef.current && e) {
                (t.sizerRef.current.style.display = 'inline'),
                  (t.sizerRef.current.textContent = e);
                var n = Math.ceil(
                  t.sizerRef.current.getBoundingClientRect().width,
                );
                return t.sizerRef.current.style.removeProperty('display'), n;
              }
            }),
            (t.computeTabIndex = function () {
              var e = t.props,
                n = e.disabled,
                r = e.search,
                a = e.tabIndex;
              if (!r) return n ? -1 : (0, J.Z)(a) ? 0 : a;
            }),
            (t.handleSearchInputOverrides = function (e) {
              return {
                onChange: function (n, r) {
                  (0, j.Z)(e, 'onChange', n, r), t.handleSearchChange(n, r);
                },
              };
            }),
            (t.hasValue = function () {
              var e = t.props.multiple,
                n = t.state.value;
              return e ? !(0, G.Z)(n) : !(0, J.Z)(n) && '' !== n;
            }),
            (t.scrollSelectedItemIntoView = function () {
              if (t.ref.current) {
                var e = t.ref.current.querySelector('.menu.visible');
                if (e) {
                  var n = e.querySelector('.item.selected');
                  if (n) {
                    var r = n.offsetTop < e.scrollTop,
                      a =
                        n.offsetTop + n.clientHeight >
                        e.scrollTop + e.clientHeight;
                    r
                      ? (e.scrollTop = n.offsetTop)
                      : a &&
                        (e.scrollTop =
                          n.offsetTop + n.clientHeight - e.clientHeight);
                  }
                }
              }
            }),
            (t.setOpenDirection = function () {
              if (t.ref.current) {
                var e = t.ref.current.querySelector('.menu.visible');
                if (e) {
                  var n = t.ref.current.getBoundingClientRect(),
                    r = e.clientHeight,
                    a =
                      document.documentElement.clientHeight -
                      n.top -
                      n.height -
                      r,
                    o = n.top - r,
                    l = a < 0 && o > a;
                  !l !== !t.state.upward && t.setState({ upward: l });
                }
              }
            }),
            (t.open = function (e, n) {
              void 0 === e && (e = null), void 0 === n && (n = !0);
              var r = t.props,
                a = r.disabled,
                o = r.search;
              a ||
                (o && (0, j.Z)(t.searchRef.current, 'focus'),
                (0, j.Z)(t.props, 'onOpen', e, t.props),
                n && t.setState({ open: !0 }),
                t.scrollSelectedItemIntoView());
            }),
            (t.close = function (e, n) {
              void 0 === n && (n = t.handleClose),
                t.state.open &&
                  ((0, j.Z)(t.props, 'onClose', e, t.props),
                  t.setState({ open: !1 }, n));
            }),
            (t.handleClose = function () {
              var e = document.activeElement === t.searchRef.current;
              !e && t.ref.current && t.ref.current.blur();
              var n = document.activeElement === t.ref.current,
                r = e || n;
              t.setState({ focus: r });
            }),
            (t.toggle = function (e) {
              return t.state.open ? t.close(e) : t.open(e);
            }),
            (t.renderText = function () {
              var e,
                n = t.props,
                r = n.multiple,
                a = n.placeholder,
                o = n.search,
                l = n.text,
                s = t.state,
                i = s.searchQuery,
                c = s.selectedIndex,
                u = s.value,
                p = s.open,
                d = t.hasValue(),
                h = (0, ne.default)(
                  a && !d && 'default',
                  'text',
                  o && i && 'filtered',
                ),
                f = a;
              return (
                l
                  ? (f = l)
                  : p && !r
                  ? (e = t.getSelectedItem(c))
                  : d && (e = t.getItemByValue(u)),
                De.create(e ? $e(e) : f, { defaultProps: { className: h } })
              );
            }),
            (t.renderSearchInput = function () {
              var e = t.props,
                n = e.search,
                r = e.searchInput,
                a = t.state.searchQuery;
              return (
                n &&
                le().createElement(
                  te.R,
                  { innerRef: t.searchRef },
                  Ae.create(r, {
                    defaultProps: {
                      style: { width: t.computeSearchInputWidth() },
                      tabIndex: t.computeSearchInputTabIndex(),
                      value: a,
                    },
                    overrideProps: t.handleSearchInputOverrides,
                  }),
                )
              );
            }),
            (t.renderSearchSizer = function () {
              var e = t.props,
                n = e.search,
                r = e.multiple;
              return (
                n &&
                r &&
                le().createElement('span', {
                  className: 'sizer',
                  ref: t.sizerRef,
                })
              );
            }),
            (t.renderLabels = function () {
              var e = t.props,
                n = e.multiple,
                r = e.renderLabel,
                a = t.state,
                o = a.selectedLabel,
                l = a.value;
              if (n && !(0, G.Z)(l)) {
                var c = (0, i.Z)(l, t.getItemByValue);
                return (0, i.Z)(s(c), function (e, n) {
                  var a = {
                    active: e.value === o,
                    as: 'a',
                    key: je(e.key, e.value),
                    onClick: t.handleLabelClick,
                    onRemove: t.handleLabelRemove,
                    value: e.value,
                  };
                  return me.Z.create(r(e, n, a), { defaultProps: a });
                });
              }
            }),
            (t.renderOptions = function () {
              var e = t.props,
                n = e.lazyLoad,
                a = e.multiple,
                l = e.search,
                s = e.noResultsMessage,
                c = t.state,
                u = c.open,
                p = c.selectedIndex,
                d = c.value;
              if (n && !u) return null;
              var h = _e({
                value: t.state.value,
                options: t.props.options,
                searchQuery: t.state.searchQuery,
                additionLabel: t.props.additionLabel,
                additionPosition: t.props.additionPosition,
                allowAdditions: t.props.allowAdditions,
                deburr: t.props.deburr,
                multiple: t.props.multiple,
                search: t.props.search,
              });
              if (null !== s && l && (0, G.Z)(h))
                return le().createElement('div', { className: 'message' }, s);
              var f = a
                ? function (e) {
                    return (0, o.Z)(d, e);
                  }
                : function (e) {
                    return e === d;
                  };
              return (0, i.Z)(h, function (e, n) {
                return Se.create(
                  (0, r.Z)({ active: f(e.value), selected: p === n }, e, {
                    key: je(e.key, e.value),
                    style: (0, r.Z)({}, e.style, { pointerEvents: 'all' }),
                  }),
                  {
                    generateKey: !1,
                    overrideProps: function (e) {
                      return {
                        onClick: function (n, r) {
                          null == e.onClick || e.onClick(n, r),
                            t.handleItemClick(n, r);
                        },
                      };
                    },
                  },
                );
              });
            }),
            (t.renderMenu = function () {
              var e = t.props,
                n = e.children,
                a = e.direction,
                o = e.header,
                l = t.state.open,
                s = t.getDropdownMenuAriaOptions();
              if (!ue.kK(n)) {
                var i = oe.Children.only(n),
                  c = (0, ne.default)(
                    a,
                    (0, pe.lG)(l, 'visible'),
                    i.props.className,
                  );
                return (0, oe.cloneElement)(i, (0, r.Z)({ className: c }, s));
              }
              return le().createElement(
                Pe,
                (0, r.Z)({}, s, { direction: a, open: l }),
                xe.create(o, { autoGenerateKey: !1 }),
                t.renderOptions(),
              );
            }),
            t
          );
        }
        (0, a.Z)(t, e);
        var n = t.prototype;
        return (
          (n.getInitialAutoControlledState = function () {
            return { focus: !1, searchQuery: '' };
          }),
          (t.getAutoControlledStateFromProps = function (e, t, n) {
            var r = { __options: e.options, __value: t.value },
              a =
                !ie()(n.__value, t.value) ||
                !(0, W.Z)(We(e.options), We(n.__options));
            return (
              a &&
                (r.selectedIndex = qe({
                  additionLabel: e.additionLabel,
                  additionPosition: e.additionPosition,
                  allowAdditions: e.allowAdditions,
                  deburr: e.deburr,
                  multiple: e.multiple,
                  search: e.search,
                  selectedIndex: t.selectedIndex,
                  value: t.value,
                  options: e.options,
                  searchQuery: t.searchQuery,
                })),
              r
            );
          }),
          (n.componentDidMount = function () {
            var e = this.state.open;
            e && this.open(null, !1);
          }),
          (n.shouldComponentUpdate = function (e, t) {
            return !ie()(e, this.props) || !ie()(t, this.state);
          }),
          (n.componentDidUpdate = function (e, t) {
            var n = this.props,
              r = n.closeOnBlur,
              a = n.minCharacters,
              o = n.openOnFocus,
              l = n.search;
            if (!t.focus && this.state.focus) {
              if (!this.isMouseDown) {
                var s = !l || (l && 1 === a && !this.state.open);
                o && s && this.open();
              }
            } else
              t.focus &&
                !this.state.focus &&
                !this.isMouseDown &&
                r &&
                this.close();
            !t.open && this.state.open
              ? (this.setOpenDirection(), this.scrollSelectedItemIntoView())
              : t.open && this.state.open,
              t.selectedIndex !== this.state.selectedIndex &&
                this.scrollSelectedItemIntoView();
          }),
          (n.getDropdownMenuAriaOptions = function () {
            var e = this.props,
              t = e.search,
              n = e.multiple,
              r = {};
            return (
              t && ((r['aria-multiselectable'] = n), (r.role = 'listbox')), r
            );
          }),
          (n.render = function () {
            var e = this.props,
              n = e.basic,
              a = e.button,
              o = e.className,
              l = e.compact,
              s = e.disabled,
              i = e.error,
              c = e.fluid,
              u = e.floating,
              p = e.icon,
              d = e.inline,
              h = e.item,
              f = e.labeled,
              v = e.loading,
              m = e.multiple,
              Z = e.pointing,
              g = e.search,
              b = e.selection,
              y = e.scrolling,
              C = e.simple,
              I = e.trigger,
              w = this.state,
              S = w.focus,
              k = w.open,
              x = w.upward,
              O = (0, ne.default)(
                'ui',
                (0, pe.lG)(k, 'active visible'),
                (0, pe.lG)(s, 'disabled'),
                (0, pe.lG)(i, 'error'),
                (0, pe.lG)(v, 'loading'),
                (0, pe.lG)(n, 'basic'),
                (0, pe.lG)(a, 'button'),
                (0, pe.lG)(l, 'compact'),
                (0, pe.lG)(c, 'fluid'),
                (0, pe.lG)(u, 'floating'),
                (0, pe.lG)(d, 'inline'),
                (0, pe.lG)(f, 'labeled'),
                (0, pe.lG)(h, 'item'),
                (0, pe.lG)(m, 'multiple'),
                (0, pe.lG)(g, 'search'),
                (0, pe.lG)(b, 'selection'),
                (0, pe.lG)(C, 'simple'),
                (0, pe.lG)(y, 'scrolling'),
                (0, pe.lG)(x, 'upward'),
                (0, pe.sU)(Z, 'pointing'),
                'dropdown',
                o,
              ),
              P = (0, de.Z)(t, this.props),
              E = (0, he.Z)(t, this.props),
              A = this.getDropdownAriaOptions(E, this.props);
            return le().createElement(
              te.R,
              { innerRef: this.ref },
              le().createElement(
                E,
                (0, r.Z)({}, P, A, {
                  className: O,
                  onBlur: this.handleBlur,
                  onClick: this.handleClick,
                  onKeyDown: this.handleKeyDown,
                  onMouseDown: this.handleMouseDown,
                  onFocus: this.handleFocus,
                  onChange: this.handleChange,
                  tabIndex: this.computeTabIndex(),
                }),
                this.renderLabels(),
                this.renderSearchInput(),
                this.renderSearchSizer(),
                I || this.renderText(),
                ve.Z.create(p, {
                  overrideProps: this.handleIconOverrides,
                  autoGenerateKey: !1,
                }),
                this.renderMenu(),
                k &&
                  le().createElement(ee(), {
                    name: 'keydown',
                    on: this.closeOnEscape,
                  }),
                k &&
                  le().createElement(ee(), {
                    name: 'click',
                    on: this.closeOnDocumentClick,
                  }),
                S &&
                  le().createElement(ee(), {
                    name: 'keydown',
                    on: this.removeItemOnBackspace,
                  }),
              ),
            );
          }),
          t
        );
      })(fe.Z);
      (Xe.handledProps = [
        'additionLabel',
        'additionPosition',
        'allowAdditions',
        'as',
        'basic',
        'button',
        'children',
        'className',
        'clearable',
        'closeOnBlur',
        'closeOnChange',
        'closeOnEscape',
        'compact',
        'deburr',
        'defaultOpen',
        'defaultSearchQuery',
        'defaultSelectedLabel',
        'defaultUpward',
        'defaultValue',
        'direction',
        'disabled',
        'error',
        'floating',
        'fluid',
        'header',
        'icon',
        'inline',
        'item',
        'labeled',
        'lazyLoad',
        'loading',
        'minCharacters',
        'multiple',
        'noResultsMessage',
        'onAddItem',
        'onBlur',
        'onChange',
        'onClick',
        'onClose',
        'onFocus',
        'onLabelClick',
        'onMouseDown',
        'onOpen',
        'onSearchChange',
        'open',
        'openOnFocus',
        'options',
        'placeholder',
        'pointing',
        'renderLabel',
        'scrolling',
        'search',
        'searchInput',
        'searchQuery',
        'selectOnBlur',
        'selectOnNavigation',
        'selectedLabel',
        'selection',
        'simple',
        'tabIndex',
        'text',
        'trigger',
        'upward',
        'value',
        'wrapSelection',
      ]),
        (Xe.propTypes = {}),
        (Xe.defaultProps = {
          additionLabel: 'Add ',
          additionPosition: 'top',
          closeOnBlur: !0,
          closeOnEscape: !0,
          deburr: !1,
          icon: 'dropdown',
          minCharacters: 1,
          noResultsMessage: 'No results found.',
          openOnFocus: !0,
          renderLabel: $e,
          searchInput: 'text',
          selectOnBlur: !0,
          selectOnNavigation: !0,
          wrapSelection: !0,
        }),
        (Xe.autoControlledProps = [
          'open',
          'searchQuery',
          'selectedLabel',
          'value',
          'upward',
        ]),
        (Xe.Divider = Ie),
        (Xe.Header = xe),
        (Xe.Item = Se),
        (Xe.Menu = Pe),
        (Xe.SearchInput = Ae),
        (Xe.Text = De);
    },
  },
]);
