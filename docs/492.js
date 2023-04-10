(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [492],
  {
    52683: function () {},
    80492: function (e, n, t) {
      'use strict';
      t.r(n),
        t.d(n, {
          AHeader: function () {
            return U;
          },
        });
      t(57663);
      var r,
        o,
        a,
        l,
        i,
        s = t(71577),
        c = (t(94233), t(51890)),
        g = (t(12968), t(6122)),
        A = t(57337),
        m = t(93224),
        p = t(20310),
        u = t(12924),
        f = t.n(u),
        C = t(74086),
        E = t.n(C),
        d = t(12788),
        h = ['isTpl'],
        I = d.ZP.div(
          r ||
            (r = (0, p.Z)([
              "\n  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n  padding: 15px 20px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n\n  & button + button {\n    margin-left: 10px;\n  }\n",
            ])),
        ),
        B = d.ZP.div(
          o ||
            (o = (0, p.Z)([
              '\n  color: #333;\n  font-size: 14px;\n  margin-right: 10px;\n',
            ])),
        ),
        b = d.ZP.div(
          a ||
            (a = (0, p.Z)([
              '\n  margin-right: 10px;\n  max-width: 160px;\n  max-height: 46px;\n  height: 46px;\n  overflow: hidden;\n  img {\n    height: 100%;\n    object-fit: contain;\n  }\n',
            ])),
        ),
        Q = d.ZP.h1(
          l ||
            (l = (0, p.Z)([
              '\n  font-weight: 900;\n  line-height: 1;\n  margin: 6px 0 6px 10px;\n  display: inline-block;\n  vertical-align: top;\n  color: ',
              ';\n  font-size: ',
              ';\n',
            ])),
          (e) => e.$color,
          (e) => e.$fontSize,
        ),
        y = d.ZP.header(
          i ||
            (i = (0, p.Z)([
              '\n  box-sizing: content-box;\n  padding: 3px 12px;\n  display: flex;\n  align-items: center;\n  height: 50px;\n  overflow: hidden;\n  position: absolute;\n  background-color: ',
              ';\n  width: ',
              '%;\n  height: ',
              '%;\n  border-radius: ',
              ';\n  transform: translate(\n      ',
              'px,\n      ',
              '\n    )\n    scale(',
              ')\n    rotate(',
              'deg);\n',
            ])),
          (e) => e.props.bgColor,
          (e) => e.props.baseWidth,
          (e) => e.props.baseHeight,
          (e) => e.props.baseRadius,
          (e) => e.props.baseLeft,
          (e) => e.props.baseTop,
          (e) => e.props.baseScale / 100,
          (e) => e.props.baseRadius,
        ),
        U = (e) => {
          var n = e.isTpl,
            t = (0, m.Z)(e, h),
            r = t.user,
            o = t.title,
            a = t.logo,
            l = t.fontSize,
            i = t.color,
            p = t.size,
            C = t.shape,
            d = t.onLogin,
            U = t.onLogout,
            x = t.onCreateAccount,
            v = (0, u.useState)(r),
            Z = (0, A.Z)(v, 2),
            S = Z[0],
            G = Z[1],
            k = () => {
              G(''), U && U();
            },
            J = () => {
              G('xiye'), d && d();
            },
            F = () => {
              G('xiye'), x && x();
            };
          return f().createElement(
            f().Fragment,
            null,
            n &&
              f().createElement(
                'div',
                null,
                f().createElement(g.Z, { preview: !1, src: E(), alt: '' }),
              ),
            !n &&
              f().createElement(
                y,
                { props: e },
                f().createElement(
                  I,
                  null,
                  f().createElement(
                    'div',
                    { style: { display: 'flex' } },
                    f().createElement(
                      b,
                      null,
                      f().createElement(c.C, {
                        shape: C,
                        size: p,
                        src: a && a[0].url,
                        alt: o,
                      }),
                    ),
                    f().createElement(Q, { $fontSize: l, $color: i }, o),
                  ),
                  f().createElement(
                    'div',
                    null,
                    S.length > 0
                      ? f().createElement(
                          f().Fragment,
                          null,
                          f().createElement(
                            B,
                            null,
                            'Welcome, ',
                            f().createElement('b', null, S),
                            '!',
                          ),
                          f().createElement(
                            s.Z,
                            { size: 'small', onClick: k },
                            'Log out',
                          ),
                        )
                      : f().createElement(
                          f().Fragment,
                          null,
                          f().createElement(
                            s.Z,
                            { size: 'small', onClick: J },
                            'Log in',
                          ),
                          f().createElement(
                            s.Z,
                            { type: 'primary', size: 'small', onClick: F },
                            'Sign up',
                          ),
                        ),
                  ),
                ),
              ),
          );
        };
      n['default'] = (0, u.memo)(U);
    },
    74086: function (e) {
      e.exports =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAXNSR0IArs4c6QAAD+BJREFUeF7tnXuMXHUVx79ntkgjUowGiUR5SOncaX0A3blTBBWjIPEJPogUNPhAJDyMifjEAFHAWIFI8UGpQkRBRSG+hYggAu3eaQERundKCahEfAakPhB255i73ZZa2t37+935/e69v/nehPDH/s75nfM58+nOzN6HgAcJkMAOCQjZkAAJ7JgABeGrgwRmIEBB+PIgAQrC1wAJ2BHgbxA7bowaEgIUZEgGzTbtCFAQO26MGhICFGRIBs027QhQEDtujBoSAhRkSAbNNu0IUBA7bowaEgIUZEgGzTbtCFAQO26MGhICFGRIBs027QhQEDtujBoSAhRkSAbNNu0IUBA7bowaEgIUZEgGzTbtCFAQO26MGhICFGRIBs027QhQEDtujBoSAhRkSAbNNu0IUBA7bowaEgIUZEgGzTbtCHgRRJNI7cpjFAnsmIDEqfPXr/MNsvYoCF/mLghQEBdUmTMYAhQkmFGyERcEKIgLqswZDAEKEswo2YgLAhTEBVXmDIYABQlmlGzEBQEK4oIqcwZDgIIEM0o24oIABXFBlTmDIUBBghklG3FBgIK4oMqcwRCgIMGMko24IEBBXFBlzmAIUJBgRslGXBCgIC6oMmcwBChIMKNkIy4IUBAXVJkzGAIUJJhRshEXBCiIC6rMGQwBChLMKNmICwIUxAVV5gyGAAUJZpRsxAUBCuKCKnMGQ4CCBDNKNuKCAAVxQZU5gyFAQYIZJRtxQYCCuKDKnMEQoCDBjJKNuCBAQVxQZc5gCFCQYEbJRlwQoCAuqDJnMAQoSDCjZCMuCFAQF1SZMxgCFCSYUbIRFwQoiAuqzBkMAQoSzCjZiAsCFMQFVeYMhgAFCWaUbMQFAQrigipzBkOAggQzSjbiggAFcUGVOYMhQEGCGSUbcUGAgrigypzBEKAgwYySjbggQEFcUGXOYAhQkGBGyUZcEKAgLqgyZzAEKEgwo2QjLghQEBdUmTMYAhQkmFGyERcEKIgLqswZDAEKEswo2YgLAhTEBVXmDIYABQlmlGzEBQEK4oIqcwZDgIIEM0o24oIABXFBlTmDIUBBghklG3FBgIK4oMqcwRCgIMGMko24IEBBXFBlzmAIUJBgRslGXBCgIC6oMmcwBChIMKNkIy4IUBAXVJkzGAIUJJhRshEXBCiIC6rl57y5QAmHFYg1Ce1CcCtUNkD6D2Gi8RB2fvIP+MfERjxz7l5oyN4A9oL294bK3hDsBcBXbVv6oCAmI63LWsU50knPNi1XV0WHYQQ3mcblWi/4L/q4AoIbsPMzbpWX3f2XXHFbLdJV0T5oYCkacjxUW6bxNuspiA21qsdUSRDBX9GXKzBn4nJZfN/4oNBpt/V6qL4DwAmDyrm9PBTEJd2ycldFEJGvY/LJs2TJhodcodCk+R5ALgKwm4s9KIgLqmXnrIIgljXYoNM1reejr9cCWGITP1MMBRk00Srks3xxDuwzSEP2lNHxh32j0LHobAjOGuS+FGSQNKuSq0xBFE3ppOvLQqHd6G1QfG9Q+1OQQZGsUp6yBBEslXZ6ddkoNInOA/CJQdRBQQZBsWo5yhHkSxKnp1YFhY5F10NwRNF6KEhRglWM9y/Iw1A9RDq9B6qCQ8eiBRDcDuC5RWqiIEXoVTXWvyAfkTi9oGo4tBsdC8VVReqiIEXoVTXWpyCKDdJJ968iCk1arwT0uwD2sK2PgtiSq3KcX0GWSyc9vQgOTaI3QbE/GrIQqs+D4g40JIWO3CbxPX+wya3d6EIoPmwTu3UMBSlKsIrxPgURPVTavdtsMOjaRfPRn/w2FIu3G694BIIrMWfkUjno3nV59tBu8xCoXAlg3zzrZ1tDQWYjVMef+xOkJ3Ea2SDSmxY9C7tMbswZey/mjBwzkySaNnfFY42PAnpmzpy5llGQXJhqtsifID+WOH2TDR0da30Foh80iN2hJDoWvRGC8wG82CBfrqUUJBemmi3yJoh8U+Lxd5nS0TXz90N/zgbTOEBvlLj32s1xumbhXpjUUyF6hnmufBEUJB+neq3yJYjgEmmnp5nC0bHW0ZCpkwttjoslTj+kSfN4AKcBEtskyRtDQfKSqtM6X4JAPivx+KdN0QzgpMLLAJxouq/NegpiQ63qMd4EwRckTo3f3mi3+Wao/KDqGLP6KEgdpmRaozdBdKXEPeN/ybXbbEIlNW2rjPUUpAzqrvf0JYjge9JOs8tejQ9NmrcA8grjQM8BFMQzcC/b+RIE+IXE6eE2PWl3wYugjfttYn3GUBCftH3t5U+QjRKn82zb0jXRS9DHj6du71PRg4JUdDCFyvInCDCJV8vBaZH7cEHHWh+D6OcK9ewomII4AltqWp+CqJwrnfHCp3dod0EMNE6B4t2lsttmcwpSpWkMqhafggjWSjsdHVjpycLXAP1TABw9qJxF8lCQIvSqGutTkIyB4CRppysGiUMzUUSXQnUpgLmDzG2Si4KY0KrLWv+CDPS3yNaY9c7W/nhCj0MDJ0Kxp+8RUBDfxH3s51uQTT05vex26uZwk3qSb1EoiI8XrO89yhFkApM4vOg3WrOh8i0KBZltInX8eTmCAIoxPKmHy6G9vBdCWdP1JQoFsR5RhQPLEmTqA7tcI+3xY3zR2SKK4GMuPsxTEF+T9LlPmYKUIEm2pd7RHMWkfByKtw0SNQUZJM2q5CpbkE0crkNj4gwZ3eD1fKvpxyF8fVCjoCCDIlmlPNUQJHu/dT8UZ0hn/DqfeHSs+Q6IZPfDKnxQkMIIK5igMoJMs1GcgxG51OcjEaZvPdorOh0KUpRgFeOrJsjU5xL8EX1c5lMUvX3RczBn8u9FRkRBitCramwVBdnMKhMFWAGRFT5+o2i39U6oWj+SgYJU9UVepK4qC1KCKJpE2Yf299ggpSA21KoeUwdBnmL4ZwiuwoheJQf11rhAq6tbS9DQVTa5KYgNtarH1EuQp2gKvg/oldLuDfyOJ9qNrobinaajoyCmxOqwvq6CbGErNwL9yyXufWtQuDVpHgnIz0zzURBTYnVYX3tBpiELxiCyUkbHVw4CuybR3QBeYpKLgpjQqsvaUAR5ivctUL1EOr1rioxAk9aXAT3ZJAcFMaFVl7XhCbKJvOBqaafZFYZWh80dHSmIFeqKB4UqyJQkeqa0e+faTkCTSE1iKYgJrbqsDVmQbAYNHCejqdXDOTVpPgLIs/OOkoLkJVWndaELAlwrcWp1WrsmUfao6n3yjpOC5CVVp3WqJ0un91XTknVt9EZM4kemcdtZ/wCgywD5JIAXDCDftin+JnG6u01eTZp3AnJA3lgKkpeUr3WKX0Iwv9DtOPvyBlky/lPTkrUbfQCKS03jtqxXPA7RZZiHZRL1Nmq39WGoXmidb6ZAaRwk7XV3mubWJLoJwGF54yhIXlLu1z0AlfOkM75Sk+jjwNQz9+wO7R8gnfW/MQ0u9mAbXYmGXiCj6//vsQbabX0XqlZ3gJ+x/v7EbrJkw2PGPXajtVAclDeOguQl5Xbd+dhp7uflwLsezbbR37x0F/z3iezcIaM/am0psdHfXUbX/820ZE2i7LfHB4ziFD+BNC6SeN2NO4rTbnQ9FEcY5Z1pseIG6aSvs8mnSXMDIPvljaUgeUk5WaffwYgsk8Xp2m3T61h07NRJfKaH4BfStnwkQRL9EEDep9beAZUvSmf8G3lK1CRalt07K8/aWddYfgkx9Y9PEv0FQO7PLxRk1mm4WCAJIBdIvG7Gy0J1TXQa+rjYrAJ9r8S9y81iNq3WJFoPYP9ZYh8GsBzz9JLsc4bJPsXewm3Z6TqJ07ea7Lv1Wk2ixwHsnDeeguQlNZh12dueC/GvkeXy6nv/mSel4Yvq2xKnx+bJ+7TfWL998R74z8SfZon9Ehr9S7b9nGGyn4613o+GngDFISZxU2sFayH9I23ePk79A7DpeSTZ+Vi5DwqSG1XBhapfA3S51YfnVdFhGMFZM3z70oPo56Xds76bhyZR9tYqe4s103GVxOlxBUlM/7ZaeAzQzy5iOnLWfJkYwIqiN8jWJMq++Mi+AMl9UJDcqAosVPmqdMaNTpLb3m66amEHO/Vj9NGZukmaSArRdUD/Btt/VTfvo0nrM4DO/pwP0bdIuzebSLlhabLfC4GRBYAsgGABFE0AGwH5PRS/A/CgdNLsKVSFD02iLJ/R06woSGHsORII/omJyVgOvm88x+pSluhYdD0k1zdNt0mcHlpKkQU2tb0VEAUpAN0oVHCetNNPGcV4Wqyrm29HQ0xOJb9C4tTqGm9PLT1tG02inwMw/mqYgvib2L+hjSOls+7X/rbMt5PpX5ens54vcZqdSlL5Q7ut90HV6qIrCuJzvAW/hXFRaqFbdWrjlVUUfmtOunr+PDTm3A5gkQ0/CmJDrUiM57ufz1Sq3rFoISYms7/FWL14NuWWV0k8fksRJC5jDb8mf1opFMTldHaUuyKSaBLdU0yO6QZFj3JxJ5Kioykqx5T+cSpF65gt3vkGWQGmV4rNVrTznwvOlnZ6jvN9drDBwOTYnL/A6R8uGGg3OguKs4vmpiBFCRaLvwyNXU6R0bVPFkuTP1rv3OfZeGLuryB4af6o3CtvxiTOcf0YthnfNt4yf3fMnZP9Pef03FXPsJCCDIJikRyqv0ZDz5f2euN7Npluq2MLjoI0fDyKYAX6WCFLnn4SpmnNJut1LFoKyJkQbZnEzbSWggyKZPE838JkY7kcvG6seKr/z6Cro8VoTJ3GbnYqe/FCVgD9lRKv7xZPteMMU89UR/94ACcMeh8KMmiixfNdiwa+j+c+fq3s+2B25qn1UaIY2xiqP82eXYhHnnGNvO7uf1k3tFWgrlkQod84GpCjAI0HkXN7OSiIK7LF8z4A0VuhcjdEV0m7d9tsKXVVtA9Gpi4nPRiCxVAsni3G888fBLAaih5U70F/zl3y8ns35Klh05m4eiggbQgOgOLAPHFF11CQogS9xuujgDwKTP9fMA+quwEyD0D2X+7rHLyWPdNmqpMQyS6dza4t2fz/LGLX6Z52heo8iIyUUTMFKYM696wNAQpSm1Gx0DIIUJAyqHPP2hCgILUZFQstgwAFKYM696wNAQpSm1Gx0DIIUJAyqHPP2hCgILUZFQstgwAFKYM696wNAQpSm1Gx0DIIUJAyqHPP2hAIRpDaEGehJLANAS+X3JI6CdSVAAWp6+RYtxcCFMQLZm5SVwIUpK6TY91eCFAQL5i5SV0JUJC6To51eyFAQbxg5iZ1JUBB6jo51u2FAAXxgpmb1JUABanr5Fi3FwIUxAtmblJXAhSkrpNj3V4IUBAvmLlJXQlQkLpOjnV7IUBBvGDmJnUlQEHqOjnW7YUABfGCmZvUlQAFqevkWLcXAhTEC2ZuUlcCFKSuk2PdXghQEC+YuUldCVCQuk6OdXshQEG8YOYmdSVAQeo6OdbthcD/AGPLzSMsbNh+AAAAAElFTkSuQmCC';
    },
    51890: function (e, n, t) {
      'use strict';
      t.d(n, {
        C: function () {
          return Z;
        },
      });
      var r = t(22122),
        o = t(96156),
        a = t(90484),
        l = t(28481),
        i = t(94184),
        s = t.n(i),
        c = t(48717),
        g = t(42550),
        A = t(12924),
        m = t(53124),
        p = t(25378),
        u = t(24308),
        f = A.createContext('default'),
        C = function (e) {
          var n = e.children,
            t = e.size;
          return A.createElement(f.Consumer, null, function (e) {
            return A.createElement(f.Provider, { value: t || e }, n);
          });
        },
        E = f,
        d = function (e, n) {
          var t = {};
          for (var r in e)
            Object.prototype.hasOwnProperty.call(e, r) &&
              n.indexOf(r) < 0 &&
              (t[r] = e[r]);
          if (null != e && 'function' === typeof Object.getOwnPropertySymbols) {
            var o = 0;
            for (r = Object.getOwnPropertySymbols(e); o < r.length; o++)
              n.indexOf(r[o]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
                (t[r[o]] = e[r[o]]);
          }
          return t;
        },
        h = function (e, n) {
          var t,
            i,
            f = A.useContext(E),
            C = A.useState(1),
            h = (0, l.Z)(C, 2),
            I = h[0],
            B = h[1],
            b = A.useState(!1),
            Q = (0, l.Z)(b, 2),
            y = Q[0],
            U = Q[1],
            x = A.useState(!0),
            v = (0, l.Z)(x, 2),
            Z = v[0],
            S = v[1],
            G = A.useRef(null),
            k = A.useRef(null),
            J = (0, g.sQ)(n, G),
            F = A.useContext(m.E_),
            w = F.getPrefixCls,
            R = function () {
              if (k.current && G.current) {
                var n = k.current.offsetWidth,
                  t = G.current.offsetWidth;
                if (0 !== n && 0 !== t) {
                  var r = e.gap,
                    o = void 0 === r ? 4 : r;
                  2 * o < t && B(t - 2 * o < n ? (t - 2 * o) / n : 1);
                }
              }
            };
          A.useEffect(function () {
            U(!0);
          }, []),
            A.useEffect(
              function () {
                S(!0), B(1);
              },
              [e.src],
            ),
            A.useEffect(
              function () {
                R();
              },
              [e.gap],
            );
          var M,
            X = function () {
              var n = e.onError,
                t = n ? n() : void 0;
              !1 !== t && S(!1);
            },
            K = e.prefixCls,
            N = e.shape,
            D = void 0 === N ? 'circle' : N,
            P = e.size,
            q = void 0 === P ? 'default' : P,
            L = e.src,
            z = e.srcSet,
            j = e.icon,
            O = e.className,
            T = e.alt,
            Y = e.draggable,
            V = e.children,
            W = e.crossOrigin,
            H = d(e, [
              'prefixCls',
              'shape',
              'size',
              'src',
              'srcSet',
              'icon',
              'className',
              'alt',
              'draggable',
              'children',
              'crossOrigin',
            ]),
            $ = 'default' === q ? f : q,
            _ = Object.keys(('object' === (0, a.Z)($) && $) || {}).some(
              function (e) {
                return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(e);
              },
            ),
            ee = (0, p.Z)(_),
            ne = A.useMemo(
              function () {
                if ('object' !== (0, a.Z)($)) return {};
                var e = u.c4.find(function (e) {
                    return ee[e];
                  }),
                  n = $[e];
                return n
                  ? {
                      width: n,
                      height: n,
                      lineHeight: ''.concat(n, 'px'),
                      fontSize: j ? n / 2 : 18,
                    }
                  : {};
              },
              [ee, $],
            ),
            te = w('avatar', K),
            re = s()(
              ((t = {}),
              (0, o.Z)(t, ''.concat(te, '-lg'), 'large' === $),
              (0, o.Z)(t, ''.concat(te, '-sm'), 'small' === $),
              t),
            ),
            oe = A.isValidElement(L),
            ae = s()(
              te,
              re,
              ((i = {}),
              (0, o.Z)(i, ''.concat(te, '-').concat(D), !!D),
              (0, o.Z)(i, ''.concat(te, '-image'), oe || (L && Z)),
              (0, o.Z)(i, ''.concat(te, '-icon'), !!j),
              i),
              O,
            ),
            le =
              'number' === typeof $
                ? {
                    width: $,
                    height: $,
                    lineHeight: ''.concat($, 'px'),
                    fontSize: j ? $ / 2 : 18,
                  }
                : {};
          if ('string' === typeof L && Z)
            M = A.createElement('img', {
              src: L,
              draggable: Y,
              srcSet: z,
              onError: X,
              alt: T,
              crossOrigin: W,
            });
          else if (oe) M = L;
          else if (j) M = j;
          else if (y || 1 !== I) {
            var ie = 'scale('.concat(I, ') translateX(-50%)'),
              se = { msTransform: ie, WebkitTransform: ie, transform: ie },
              ce =
                'number' === typeof $ ? { lineHeight: ''.concat($, 'px') } : {};
            M = A.createElement(
              c.Z,
              { onResize: R },
              A.createElement(
                'span',
                {
                  className: ''.concat(te, '-string'),
                  ref: k,
                  style: (0, r.Z)((0, r.Z)({}, ce), se),
                },
                V,
              ),
            );
          } else
            M = A.createElement(
              'span',
              {
                className: ''.concat(te, '-string'),
                style: { opacity: 0 },
                ref: k,
              },
              V,
            );
          return (
            delete H.onError,
            delete H.gap,
            A.createElement(
              'span',
              (0, r.Z)({}, H, {
                style: (0, r.Z)((0, r.Z)((0, r.Z)({}, le), ne), H.style),
                className: ae,
                ref: J,
              }),
              M,
            )
          );
        },
        I = A.forwardRef(h);
      var B = I,
        b = t(50344),
        Q = t(55241),
        y = t(96159),
        U = function (e) {
          var n = A.useContext(m.E_),
            t = n.getPrefixCls,
            r = n.direction,
            a = e.prefixCls,
            l = e.className,
            i = void 0 === l ? '' : l,
            c = e.maxCount,
            g = e.maxStyle,
            p = e.size,
            u = t('avatar-group', a),
            f = s()(u, (0, o.Z)({}, ''.concat(u, '-rtl'), 'rtl' === r), i),
            E = e.children,
            d = e.maxPopoverPlacement,
            h = void 0 === d ? 'top' : d,
            I = e.maxPopoverTrigger,
            U = void 0 === I ? 'hover' : I,
            x = (0, b.Z)(E).map(function (e, n) {
              return (0, y.Tm)(e, { key: 'avatar-key-'.concat(n) });
            }),
            v = x.length;
          if (c && c < v) {
            var Z = x.slice(0, c),
              S = x.slice(c, v);
            return (
              Z.push(
                A.createElement(
                  Q.Z,
                  {
                    key: 'avatar-popover-key',
                    content: S,
                    trigger: U,
                    placement: h,
                    overlayClassName: ''.concat(u, '-popover'),
                  },
                  A.createElement(B, { style: g }, '+'.concat(v - c)),
                ),
              ),
              A.createElement(
                C,
                { size: p },
                A.createElement('div', { className: f, style: e.style }, Z),
              )
            );
          }
          return A.createElement(
            C,
            { size: p },
            A.createElement('div', { className: f, style: e.style }, x),
          );
        },
        x = U,
        v = B;
      v.Group = x;
      var Z = v;
    },
    94233: function (e, n, t) {
      'use strict';
      t(38663), t(52683), t(20136);
    },
  },
]);
