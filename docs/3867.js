(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [3867],
  {
    77299: function (e, t) {
      'use strict';
      function n(e, t, n, r) {
        var o = -1,
          a = null == e ? 0 : e.length;
        r && a && (n = e[++o]);
        while (++o < a) n = t(n, e[o], o, e);
        return n;
      }
      t['Z'] = n;
    },
    12964: function (e, t, n) {
      'use strict';
      var r = n(9169),
        o = n(49550),
        a = n(56986),
        s = n(39350),
        l = n(5710),
        i = n(29710),
        u = n(9794),
        c = n(40760),
        p = '[object Map]',
        h = '[object Set]',
        d = Object.prototype,
        v = d.hasOwnProperty;
      function f(e) {
        if (null == e) return !0;
        if (
          (0, l.Z)(e) &&
          ((0, s.Z)(e) ||
            'string' == typeof e ||
            'function' == typeof e.splice ||
            (0, i.Z)(e) ||
            (0, c.Z)(e) ||
            (0, a.Z)(e))
        )
          return !e.length;
        var t = (0, o.Z)(e);
        if (t == p || t == h) return !e.size;
        if ((0, u.Z)(e)) return !(0, r.Z)(e).length;
        for (var n in e) if (v.call(e, n)) return !1;
        return !0;
      }
      t['Z'] = f;
    },
    64803: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return c;
        },
      });
      var r = n(77299),
        o = n(77974),
        a = n(71650);
      function s(e, t, n, r, o) {
        return (
          o(e, function (e, o, a) {
            n = r ? ((r = !1), e) : t(n, e, o, a);
          }),
          n
        );
      }
      var l = s,
        i = n(39350);
      function u(e, t, n) {
        var s = (0, i.Z)(e) ? r.Z : l,
          u = arguments.length < 3;
        return s(e, (0, a.Z)(t, 4), n, u, o.Z);
      }
      var c = u;
    },
    73867: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return hn;
        },
      });
      var r = n(19756),
        o = n(41788),
        a = n(22122),
        s = n(12964),
        l = n(8901),
        i = n(63305),
        u = n(41743),
        c = u.Z && new u.Z(),
        p = c,
        h = p
          ? function (e, t) {
              return p.set(e, t), e;
            }
          : i.Z,
        d = h,
        v = n(27569),
        f = n(89122);
      function m(e) {
        return function () {
          var t = arguments;
          switch (t.length) {
            case 0:
              return new e();
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3]);
            case 5:
              return new e(t[0], t[1], t[2], t[3], t[4]);
            case 6:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
            case 7:
              return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
          }
          var n = (0, v.Z)(e.prototype),
            r = e.apply(n, t);
          return (0, f.Z)(r) ? r : n;
        };
      }
      var g = m,
        y = n(56169),
        _ = 1;
      function Z(e, t, n) {
        var r = t & _,
          o = g(e);
        function a() {
          var t = this && this !== y.Z && this instanceof a ? o : e;
          return t.apply(r ? n : this, arguments);
        }
        return a;
      }
      var w = Z,
        C = n(84370),
        R = Math.max;
      function S(e, t, n, r) {
        var o = -1,
          a = e.length,
          s = n.length,
          l = -1,
          i = t.length,
          u = R(a - s, 0),
          c = Array(i + u),
          p = !r;
        while (++l < i) c[l] = t[l];
        while (++o < s) (p || o < a) && (c[n[o]] = e[o]);
        while (u--) c[l++] = e[o++];
        return c;
      }
      var k = S,
        D = Math.max;
      function E(e, t, n, r) {
        var o = -1,
          a = e.length,
          s = -1,
          l = n.length,
          i = -1,
          u = t.length,
          c = D(a - l, 0),
          p = Array(c + u),
          h = !r;
        while (++o < c) p[o] = e[o];
        var d = o;
        while (++i < u) p[d + i] = t[i];
        while (++s < l) (h || o < a) && (p[d + n[s]] = e[o++]);
        return p;
      }
      var N = E;
      function O(e, t) {
        var n = e.length,
          r = 0;
        while (n--) e[n] === t && ++r;
        return r;
      }
      var I = O;
      function M() {}
      var b = M,
        P = 4294967295;
      function x(e) {
        (this.__wrapped__ = e),
          (this.__actions__ = []),
          (this.__dir__ = 1),
          (this.__filtered__ = !1),
          (this.__iteratees__ = []),
          (this.__takeCount__ = P),
          (this.__views__ = []);
      }
      (x.prototype = (0, v.Z)(b.prototype)), (x.prototype.constructor = x);
      var K = x,
        F = n(89555),
        T = p
          ? function (e) {
              return p.get(e);
            }
          : F.Z,
        V = T,
        A = {},
        B = A,
        G = Object.prototype,
        U = G.hasOwnProperty;
      function j(e) {
        var t = e.name + '',
          n = B[t],
          r = U.call(B, t) ? n.length : 0;
        while (r--) {
          var o = n[r],
            a = o.func;
          if (null == a || a == e) return o.name;
        }
        return t;
      }
      var H = j;
      function z(e, t) {
        (this.__wrapped__ = e),
          (this.__actions__ = []),
          (this.__chain__ = !!t),
          (this.__index__ = 0),
          (this.__values__ = void 0);
      }
      (z.prototype = (0, v.Z)(b.prototype)), (z.prototype.constructor = z);
      var q = z,
        L = n(39350),
        W = n(23195),
        J = n(65935);
      function Q(e) {
        if (e instanceof K) return e.clone();
        var t = new q(e.__wrapped__, e.__chain__);
        return (
          (t.__actions__ = (0, J.Z)(e.__actions__)),
          (t.__index__ = e.__index__),
          (t.__values__ = e.__values__),
          t
        );
      }
      var X = Q,
        Y = Object.prototype,
        $ = Y.hasOwnProperty;
      function ee(e) {
        if ((0, W.Z)(e) && !(0, L.Z)(e) && !(e instanceof K)) {
          if (e instanceof q) return e;
          if ($.call(e, '__wrapped__')) return X(e);
        }
        return new q(e);
      }
      (ee.prototype = b.prototype), (ee.prototype.constructor = ee);
      var te = ee;
      function ne(e) {
        var t = H(e),
          n = te[t];
        if ('function' != typeof n || !(t in K.prototype)) return !1;
        if (e === n) return !0;
        var r = V(n);
        return !!r && e === r[0];
      }
      var re = ne,
        oe = n(7402),
        ae = (0, oe.Z)(d),
        se = ae,
        le = /\{\n\/\* \[wrapped with (.+)\] \*/,
        ie = /,? & /;
      function ue(e) {
        var t = e.match(le);
        return t ? t[1].split(ie) : [];
      }
      var ce = ue,
        pe = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/;
      function he(e, t) {
        var n = t.length;
        if (!n) return e;
        var r = n - 1;
        return (
          (t[r] = (n > 1 ? '& ' : '') + t[r]),
          (t = t.join(n > 2 ? ', ' : ' ')),
          e.replace(pe, '{\n/* [wrapped with ' + t + '] */\n')
        );
      }
      var de = he,
        ve = n(84649),
        fe = n(85241),
        me = n(60665),
        ge = 1,
        ye = 2,
        _e = 8,
        Ze = 16,
        we = 32,
        Ce = 64,
        Re = 128,
        Se = 256,
        ke = 512,
        De = [
          ['ary', Re],
          ['bind', ge],
          ['bindKey', ye],
          ['curry', _e],
          ['curryRight', Ze],
          ['flip', ke],
          ['partial', we],
          ['partialRight', Ce],
          ['rearg', Se],
        ];
      function Ee(e, t) {
        return (
          (0, fe.Z)(De, function (n) {
            var r = '_.' + n[0];
            t & n[1] && !(0, me.Z)(e, r) && e.push(r);
          }),
          e.sort()
        );
      }
      var Ne = Ee;
      function Oe(e, t, n) {
        var r = t + '';
        return (0, ve.Z)(e, de(r, Ne(ce(r), n)));
      }
      var Ie = Oe,
        Me = 1,
        be = 2,
        Pe = 4,
        xe = 8,
        Ke = 32,
        Fe = 64;
      function Te(e, t, n, r, o, a, s, l, i, u) {
        var c = t & xe,
          p = c ? s : void 0,
          h = c ? void 0 : s,
          d = c ? a : void 0,
          v = c ? void 0 : a;
        (t |= c ? Ke : Fe), (t &= ~(c ? Fe : Ke)), t & Pe || (t &= ~(Me | be));
        var f = [e, t, o, d, p, v, h, l, i, u],
          m = n.apply(void 0, f);
        return re(e) && se(m, f), (m.placeholder = r), Ie(m, e, t);
      }
      var Ve = Te;
      function Ae(e) {
        var t = e;
        return t.placeholder;
      }
      var Be = Ae,
        Ge = n(93564),
        Ue = Math.min;
      function je(e, t) {
        var n = e.length,
          r = Ue(t.length, n),
          o = (0, J.Z)(e);
        while (r--) {
          var a = t[r];
          e[r] = (0, Ge.Z)(a, n) ? o[a] : void 0;
        }
        return e;
      }
      var He = je,
        ze = '__lodash_placeholder__';
      function qe(e, t) {
        var n = -1,
          r = e.length,
          o = 0,
          a = [];
        while (++n < r) {
          var s = e[n];
          (s !== t && s !== ze) || ((e[n] = ze), (a[o++] = n));
        }
        return a;
      }
      var Le = qe,
        We = 1,
        Je = 2,
        Qe = 8,
        Xe = 16,
        Ye = 128,
        $e = 512;
      function et(e, t, n, r, o, a, s, l, i, u) {
        var c = t & Ye,
          p = t & We,
          h = t & Je,
          d = t & (Qe | Xe),
          v = t & $e,
          f = h ? void 0 : g(e);
        function m() {
          var _ = arguments.length,
            Z = Array(_),
            w = _;
          while (w--) Z[w] = arguments[w];
          if (d)
            var C = Be(m),
              R = I(Z, C);
          if (
            (r && (Z = k(Z, r, o, d)),
            a && (Z = N(Z, a, s, d)),
            (_ -= R),
            d && _ < u)
          ) {
            var S = Le(Z, C);
            return Ve(e, t, et, m.placeholder, n, Z, S, l, i, u - _);
          }
          var D = p ? n : this,
            E = h ? D[e] : e;
          return (
            (_ = Z.length),
            l ? (Z = He(Z, l)) : v && _ > 1 && Z.reverse(),
            c && i < _ && (Z.length = i),
            this && this !== y.Z && this instanceof m && (E = f || g(E)),
            E.apply(D, Z)
          );
        }
        return m;
      }
      var tt = et;
      function nt(e, t, n) {
        var r = g(e);
        function o() {
          var a = arguments.length,
            s = Array(a),
            l = a,
            i = Be(o);
          while (l--) s[l] = arguments[l];
          var u = a < 3 && s[0] !== i && s[a - 1] !== i ? [] : Le(s, i);
          if (((a -= u.length), a < n))
            return Ve(
              e,
              t,
              tt,
              o.placeholder,
              void 0,
              s,
              u,
              void 0,
              void 0,
              n - a,
            );
          var c = this && this !== y.Z && this instanceof o ? r : e;
          return (0, C.Z)(c, this, s);
        }
        return o;
      }
      var rt = nt,
        ot = 1;
      function at(e, t, n, r) {
        var o = t & ot,
          a = g(e);
        function s() {
          var t = -1,
            l = arguments.length,
            i = -1,
            u = r.length,
            c = Array(u + l),
            p = this && this !== y.Z && this instanceof s ? a : e;
          while (++i < u) c[i] = r[i];
          while (l--) c[i++] = arguments[++t];
          return (0, C.Z)(p, o ? n : this, c);
        }
        return s;
      }
      var st = at,
        lt = '__lodash_placeholder__',
        it = 1,
        ut = 2,
        ct = 4,
        pt = 8,
        ht = 128,
        dt = 256,
        vt = Math.min;
      function ft(e, t) {
        var n = e[1],
          r = t[1],
          o = n | r,
          a = o < (it | ut | ht),
          s =
            (r == ht && n == pt) ||
            (r == ht && n == dt && e[7].length <= t[8]) ||
            (r == (ht | dt) && t[7].length <= t[8] && n == pt);
        if (!a && !s) return e;
        r & it && ((e[2] = t[2]), (o |= n & it ? 0 : ct));
        var l = t[3];
        if (l) {
          var i = e[3];
          (e[3] = i ? k(i, l, t[4]) : l), (e[4] = i ? Le(e[3], lt) : t[4]);
        }
        return (
          (l = t[5]),
          l &&
            ((i = e[5]),
            (e[5] = i ? N(i, l, t[6]) : l),
            (e[6] = i ? Le(e[5], lt) : t[6])),
          (l = t[7]),
          l && (e[7] = l),
          r & ht && (e[8] = null == e[8] ? t[8] : vt(e[8], t[8])),
          null == e[9] && (e[9] = t[9]),
          (e[0] = t[0]),
          (e[1] = o),
          e
        );
      }
      var mt = ft,
        gt = n(98392),
        yt = 'Expected a function',
        _t = 1,
        Zt = 2,
        wt = 8,
        Ct = 16,
        Rt = 32,
        St = 64,
        kt = Math.max;
      function Dt(e, t, n, r, o, a, s, l) {
        var i = t & Zt;
        if (!i && 'function' != typeof e) throw new TypeError(yt);
        var u = r ? r.length : 0;
        if (
          (u || ((t &= ~(Rt | St)), (r = o = void 0)),
          (s = void 0 === s ? s : kt((0, gt.Z)(s), 0)),
          (l = void 0 === l ? l : (0, gt.Z)(l)),
          (u -= o ? o.length : 0),
          t & St)
        ) {
          var c = r,
            p = o;
          r = o = void 0;
        }
        var h = i ? void 0 : V(e),
          v = [e, t, n, r, o, c, p, a, s, l];
        if (
          (h && mt(v, h),
          (e = v[0]),
          (t = v[1]),
          (n = v[2]),
          (r = v[3]),
          (o = v[4]),
          (l = v[9] = void 0 === v[9] ? (i ? 0 : e.length) : kt(v[9] - u, 0)),
          !l && t & (wt | Ct) && (t &= ~(wt | Ct)),
          t && t != _t)
        )
          f =
            t == wt || t == Ct
              ? rt(e, t, l)
              : (t != Rt && t != (_t | Rt)) || o.length
              ? tt.apply(void 0, v)
              : st(e, t, n, r);
        else var f = w(e, t, n);
        var m = h ? d : se;
        return Ie(m(f, v), e, t);
      }
      var Et = Dt,
        Nt = 64,
        Ot = (0, l.Z)(function (e, t) {
          var n = Le(t, Be(Ot));
          return Et(e, Nt, void 0, t, n);
        });
      Ot.placeholder = {};
      var It = Ot,
        Mt = n(39627),
        bt = n(30014),
        Pt = n(77398),
        xt = n(64803),
        Kt = n(23715),
        Ft = n(30353),
        Tt = n(99250),
        Vt = n(86010),
        At = n(47630),
        Bt = n.n(At),
        Gt = (n(55301), n(12924)),
        Ut = n.n(Gt),
        jt = n(96774),
        Ht = n.n(jt),
        zt = n(9695),
        qt = zt.instance,
        Lt = n(41779),
        Wt = n(92063),
        Jt = n(28935),
        Qt = n(12519),
        Xt = n(4394),
        Yt = n(90327),
        $t = n(60416),
        en = n(92248);
      function tn(e) {
        var t = e.categoryContent,
          n = e.resultsContent;
        return Ut().createElement(
          Ut().Fragment,
          null,
          Ut().createElement('div', { className: 'name' }, t),
          Ut().createElement('div', { className: 'results' }, n),
        );
      }
      (tn.handledProps = ['categoryContent', 'resultsContent']),
        (tn.propTypes = {});
      var nn = tn;
      function rn(e) {
        var t = e.active,
          n = e.children,
          r = e.className,
          o = e.content,
          s = e.layoutRenderer,
          l = e.renderer,
          i = (0, Vt.default)((0, Wt.lG)(t, 'active'), 'category', r),
          u = (0, Jt.Z)(rn, e),
          c = (0, Qt.Z)(rn, e),
          p = l(e),
          h = en.kK(n) ? o : n;
        return Ut().createElement(
          c,
          (0, a.Z)({}, u, { className: i }),
          s({ categoryContent: p, resultsContent: h }),
        );
      }
      (rn.handledProps = [
        'active',
        'as',
        'children',
        'className',
        'content',
        'layoutRenderer',
        'name',
        'renderer',
        'results',
      ]),
        (rn.defaultProps = {
          layoutRenderer: nn,
          renderer: function (e) {
            var t = e.name;
            return t;
          },
        }),
        (rn.propTypes = {});
      var on = rn,
        an = n(93619),
        sn = function (e) {
          var t = e.image,
            n = e.price,
            r = e.title,
            o = e.description;
          return [
            t &&
              Ut().createElement(
                'div',
                { key: 'image', className: 'image' },
                (0, an.Ff)(t, { autoGenerateKey: !1 }),
              ),
            Ut().createElement(
              'div',
              { key: 'content', className: 'content' },
              n && Ut().createElement('div', { className: 'price' }, n),
              r && Ut().createElement('div', { className: 'title' }, r),
              o && Ut().createElement('div', { className: 'description' }, o),
            ),
          ];
        };
      sn.handledProps = [];
      var ln = (function (e) {
        function t() {
          for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++)
            r[o] = arguments[o];
          return (
            (t = e.call.apply(e, [this].concat(r)) || this),
            (t.handleClick = function (e) {
              var n = t.props.onClick;
              n && n(e, t.props);
            }),
            t
          );
        }
        (0, o.Z)(t, e);
        var n = t.prototype;
        return (
          (n.render = function () {
            var e = this.props,
              n = e.active,
              r = e.className,
              o = e.renderer,
              s = (0, Vt.default)((0, Wt.lG)(n, 'active'), 'result', r),
              l = (0, Jt.Z)(t, this.props),
              i = (0, Qt.Z)(t, this.props);
            return Ut().createElement(
              i,
              (0, a.Z)({}, l, { className: s, onClick: this.handleClick }),
              o(this.props),
            );
          }),
          t
        );
      })(Gt.Component);
      function un(e) {
        var t = e.children,
          n = e.className,
          r = e.content,
          o = (0, Vt.default)('results transition', n),
          s = (0, Jt.Z)(un, e),
          l = (0, Qt.Z)(un, e);
        return Ut().createElement(
          l,
          (0, a.Z)({}, s, { className: o }),
          en.kK(t) ? r : t,
        );
      }
      (ln.handledProps = [
        'active',
        'as',
        'className',
        'content',
        'description',
        'id',
        'image',
        'onClick',
        'price',
        'renderer',
        'title',
      ]),
        (ln.propTypes = {}),
        (ln.defaultProps = { renderer: sn }),
        (un.handledProps = ['as', 'children', 'className', 'content']),
        (un.propTypes = {});
      var cn = un,
        pn = function (e) {
          var t = e.input;
          return (0, Tt.Z)(t)
            ? (0, a.Z)({}, e, { input: { className: 'prompt' } })
            : (0, Ft.Z)(t)
            ? (0, a.Z)({}, e, {
                input: (0, a.Z)({}, t, {
                  className: (0, Vt.default)(t.className, 'prompt'),
                }),
              })
            : e;
        },
        hn = (function (e) {
          function t() {
            for (
              var t, n = arguments.length, o = new Array(n), l = 0;
              l < n;
              l++
            )
              o[l] = arguments[l];
            return (
              (t = e.call.apply(e, [this].concat(o)) || this),
              (t.handleResultSelect = function (e, n) {
                (0, Kt.Z)(
                  t.props,
                  'onResultSelect',
                  e,
                  (0, a.Z)({}, t.props, { result: n }),
                );
              }),
              (t.handleSelectionChange = function (e) {
                var n = t.getSelectedResult();
                (0, Kt.Z)(
                  t.props,
                  'onSelectionChange',
                  e,
                  (0, a.Z)({}, t.props, { result: n }),
                );
              }),
              (t.closeOnEscape = function (e) {
                Bt().getCode(e) === Bt().Escape &&
                  (e.preventDefault(), t.close());
              }),
              (t.moveSelectionOnKeyDown = function (e) {
                switch (Bt().getCode(e)) {
                  case Bt().ArrowDown:
                    e.preventDefault(), t.moveSelectionBy(e, 1);
                    break;
                  case Bt().ArrowUp:
                    e.preventDefault(), t.moveSelectionBy(e, -1);
                    break;
                  default:
                    break;
                }
              }),
              (t.selectItemOnEnter = function (e) {
                if (Bt().getCode(e) === Bt().Enter) {
                  var n = t.getSelectedResult();
                  n &&
                    (e.preventDefault(),
                    t.setValue(n.title),
                    t.handleResultSelect(e, n),
                    t.close());
                }
              }),
              (t.closeOnDocumentClick = function (e) {
                t.close();
              }),
              (t.handleMouseDown = function (e) {
                (t.isMouseDown = !0),
                  (0, Kt.Z)(t.props, 'onMouseDown', e, t.props),
                  qt.sub('mouseup', t.handleDocumentMouseUp);
              }),
              (t.handleDocumentMouseUp = function () {
                (t.isMouseDown = !1),
                  qt.unsub('mouseup', t.handleDocumentMouseUp);
              }),
              (t.handleInputClick = function (e) {
                e.nativeEvent.stopImmediatePropagation(), t.tryOpen();
              }),
              (t.handleItemClick = function (e, n) {
                var r = n.id,
                  o = t.getSelectedResult(r);
                e.nativeEvent.stopImmediatePropagation(),
                  t.setValue(o.title),
                  t.handleResultSelect(e, o),
                  t.close();
              }),
              (t.handleItemMouseDown = function (e) {
                e.preventDefault();
              }),
              (t.handleFocus = function (e) {
                (0, Kt.Z)(t.props, 'onFocus', e, t.props),
                  t.setState({ focus: !0 });
              }),
              (t.handleBlur = function (e) {
                (0, Kt.Z)(t.props, 'onBlur', e, t.props),
                  t.setState({ focus: !1 });
              }),
              (t.handleSearchChange = function (e) {
                e.stopPropagation();
                var n = t.props.minCharacters,
                  r = t.state.open,
                  o = e.target.value;
                (0, Kt.Z)(
                  t.props,
                  'onSearchChange',
                  e,
                  (0, a.Z)({}, t.props, { value: o }),
                ),
                  o.length < n ? t.close() : r || t.tryOpen(o),
                  t.setValue(o);
              }),
              (t.getFlattenedResults = function () {
                var e = t.props,
                  n = e.category,
                  r = e.results;
                return n
                  ? (0, xt.Z)(
                      r,
                      function (e, t) {
                        return e.concat(t.results);
                      },
                      [],
                    )
                  : r;
              }),
              (t.getSelectedResult = function (e) {
                void 0 === e && (e = t.state.selectedIndex);
                var n = t.getFlattenedResults();
                return (0, Pt.Z)(n, e);
              }),
              (t.setValue = function (e) {
                var n = t.props.selectFirstResult;
                t.setState({ value: e, selectedIndex: n ? 0 : -1 });
              }),
              (t.moveSelectionBy = function (e, n) {
                var r = t.state.selectedIndex,
                  o = t.getFlattenedResults(),
                  a = o.length - 1,
                  s = r + n;
                s > a ? (s = 0) : s < 0 && (s = a),
                  t.setState({ selectedIndex: s }),
                  t.scrollSelectedItemIntoView(),
                  t.handleSelectionChange(e);
              }),
              (t.scrollSelectedItemIntoView = function () {
                if ((0, Lt.Z)()) {
                  var e = document.querySelector(
                    '.ui.search.active.visible .results.visible',
                  );
                  if (e) {
                    var t = e.querySelector('.result.active');
                    if (t) {
                      var n = t.offsetTop < e.scrollTop,
                        r =
                          t.offsetTop + t.clientHeight >
                          e.scrollTop + e.clientHeight;
                      n
                        ? (e.scrollTop = t.offsetTop)
                        : r &&
                          (e.scrollTop =
                            t.offsetTop + t.clientHeight - e.clientHeight);
                    }
                  }
                }
              }),
              (t.tryOpen = function (e) {
                void 0 === e && (e = t.state.value);
                var n = t.props.minCharacters;
                e.length < n || t.open();
              }),
              (t.open = function () {
                t.setState({ open: !0 });
              }),
              (t.close = function () {
                t.setState({ open: !1 });
              }),
              (t.renderSearchInput = function (e) {
                var n = t.props,
                  r = n.icon,
                  o = n.input,
                  s = n.placeholder,
                  l = t.state.value;
                return $t.Z.create(o, {
                  autoGenerateKey: !1,
                  defaultProps: (0, a.Z)({}, e, {
                    autoComplete: 'off',
                    icon: r,
                    onChange: t.handleSearchChange,
                    onClick: t.handleInputClick,
                    tabIndex: '0',
                    value: l,
                    placeholder: s,
                  }),
                  overrideProps: pn,
                });
              }),
              (t.renderNoResults = function () {
                var e = t.props,
                  n = e.noResultsDescription,
                  r = e.noResultsMessage;
                return Ut().createElement(
                  'div',
                  { className: 'message empty' },
                  Ut().createElement('div', { className: 'header' }, r),
                  n &&
                    Ut().createElement('div', { className: 'description' }, n),
                );
              }),
              (t.renderResult = function (e, n, o, s) {
                var l = e.childKey,
                  i = (0, r.Z)(e, ['childKey']);
                void 0 === s && (s = 0);
                var u = t.props.resultRenderer,
                  c = t.state.selectedIndex,
                  p = n + s;
                return Ut().createElement(
                  ln,
                  (0, a.Z)(
                    {
                      key: null != l ? l : i.id || i.title,
                      active: c === p,
                      onClick: t.handleItemClick,
                      onMouseDown: t.handleItemMouseDown,
                      renderer: u,
                    },
                    i,
                    { id: p },
                  ),
                );
              }),
              (t.renderResults = function () {
                var e = t.props.results;
                return (0, bt.Z)(e, t.renderResult);
              }),
              (t.renderCategories = function () {
                var e = t.props,
                  n = e.categoryLayoutRenderer,
                  o = e.categoryRenderer,
                  s = e.results,
                  l = t.state.selectedIndex,
                  i = 0;
                return (0, bt.Z)(s, function (e) {
                  var s = e.childKey,
                    u = (0, r.Z)(e, ['childKey']),
                    c = (0, a.Z)(
                      {
                        key: null != s ? s : u.name,
                        active: (0, Mt.Z)(l, i, i + u.results.length),
                        layoutRenderer: n,
                        renderer: o,
                      },
                      u,
                    ),
                    p = It(t.renderResult, i);
                  return (
                    (i += u.results.length),
                    Ut().createElement(on, c, u.results.map(p))
                  );
                });
              }),
              (t.renderMenuContent = function () {
                var e = t.props,
                  n = e.category,
                  r = e.showNoResults,
                  o = e.results;
                return (0, s.Z)(o)
                  ? r
                    ? t.renderNoResults()
                    : null
                  : n
                  ? t.renderCategories()
                  : t.renderResults();
              }),
              (t.renderResultsMenu = function () {
                var e = t.state.open,
                  n = e ? 'visible' : '',
                  r = t.renderMenuContent();
                if (r) return Ut().createElement(cn, { className: n }, r);
              }),
              t
            );
          }
          (0, o.Z)(t, e),
            (t.getAutoControlledStateFromProps = function (e, t) {
              if (
                'undefined' !== typeof t.prevValue &&
                Ht()(t.prevValue, t.value)
              )
                return { prevValue: t.value };
              var n = e.selectFirstResult ? 0 : -1;
              return { prevValue: t.value, selectedIndex: n };
            });
          var n = t.prototype;
          return (
            (n.shouldComponentUpdate = function (e, t) {
              return !Ht()(e, this.props) || !Ht()(t, this.state);
            }),
            (n.componentDidUpdate = function (e, t) {
              !t.focus && this.state.focus
                ? (this.isMouseDown || this.tryOpen(),
                  this.state.open &&
                    qt.sub('keydown', [
                      this.moveSelectionOnKeyDown,
                      this.selectItemOnEnter,
                    ]))
                : t.focus &&
                  !this.state.focus &&
                  (this.isMouseDown || this.close(),
                  qt.unsub('keydown', [
                    this.moveSelectionOnKeyDown,
                    this.selectItemOnEnter,
                  ])),
                !t.open && this.state.open
                  ? (this.open(),
                    qt.sub('click', this.closeOnDocumentClick),
                    qt.sub('keydown', [
                      this.closeOnEscape,
                      this.moveSelectionOnKeyDown,
                      this.selectItemOnEnter,
                    ]))
                  : t.open &&
                    !this.state.open &&
                    (this.close(),
                    qt.unsub('click', this.closeOnDocumentClick),
                    qt.unsub('keydown', [
                      this.closeOnEscape,
                      this.moveSelectionOnKeyDown,
                      this.selectItemOnEnter,
                    ]));
            }),
            (n.componentWillUnmount = function () {
              qt.unsub('click', this.closeOnDocumentClick),
                qt.unsub('keydown', [
                  this.closeOnEscape,
                  this.moveSelectionOnKeyDown,
                  this.selectItemOnEnter,
                ]);
            }),
            (n.render = function () {
              var e = this.state,
                n = e.searchClasses,
                r = e.focus,
                o = e.open,
                s = this.props,
                l = s.aligned,
                i = s.category,
                u = s.className,
                c = s.fluid,
                p = s.loading,
                h = s.size,
                d = (0, Vt.default)(
                  'ui',
                  o && 'active visible',
                  h,
                  n,
                  (0, Wt.lG)(i, 'category'),
                  (0, Wt.lG)(r, 'focus'),
                  (0, Wt.lG)(c, 'fluid'),
                  (0, Wt.lG)(p, 'loading'),
                  (0, Wt.cD)(l, 'aligned'),
                  'search',
                  u,
                ),
                v = (0, Jt.Z)(t, this.props),
                f = (0, Qt.Z)(t, this.props),
                m = (0, Xt.vR)(v, { htmlProps: Xt._l }),
                g = m[0],
                y = m[1];
              return Ut().createElement(
                f,
                (0, a.Z)({}, y, {
                  className: d,
                  onBlur: this.handleBlur,
                  onFocus: this.handleFocus,
                  onMouseDown: this.handleMouseDown,
                }),
                this.renderSearchInput(g),
                this.renderResultsMenu(),
              );
            }),
            t
          );
        })(Yt.Z);
      (hn.handledProps = [
        'aligned',
        'as',
        'category',
        'categoryLayoutRenderer',
        'categoryRenderer',
        'className',
        'defaultOpen',
        'defaultValue',
        'fluid',
        'icon',
        'input',
        'loading',
        'minCharacters',
        'noResultsDescription',
        'noResultsMessage',
        'onBlur',
        'onFocus',
        'onMouseDown',
        'onResultSelect',
        'onSearchChange',
        'onSelectionChange',
        'open',
        'placeholder',
        'resultRenderer',
        'results',
        'selectFirstResult',
        'showNoResults',
        'size',
        'value',
      ]),
        (hn.propTypes = {}),
        (hn.defaultProps = {
          icon: 'search',
          input: 'text',
          minCharacters: 1,
          noResultsMessage: 'No results found.',
          showNoResults: !0,
        }),
        (hn.autoControlledProps = ['open', 'value']),
        (hn.Category = on),
        (hn.Result = ln),
        (hn.Results = cn);
    },
  },
]);
