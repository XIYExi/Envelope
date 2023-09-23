(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [9383],
  {
    47701: function (e, t, n) {
      'use strict';
      var r = n(20192),
        o = n(52373),
        i = Object.prototype,
        a = i.hasOwnProperty;
      function s(e, t, n) {
        var i = e[t];
        (a.call(e, t) && (0, o.Z)(i, n) && (void 0 !== n || t in e)) ||
          (0, r.Z)(e, t, n);
      }
      t['Z'] = s;
    },
    20192: function (e, t, n) {
      'use strict';
      var r = n(14608);
      function o(e, t, n) {
        '__proto__' == t && r.Z
          ? (0, r.Z)(e, t, {
              configurable: !0,
              enumerable: !0,
              value: n,
              writable: !0,
            })
          : (e[t] = n);
      }
      t['Z'] = o;
    },
    10430: function (e, t, n) {
      'use strict';
      var r = n(5710),
        o = n(23195);
      function i(e) {
        return (0, o.Z)(e) && (0, r.Z)(e);
      }
      t['Z'] = i;
    },
    49545: function (e, t, n) {
      'use strict';
      var r = n(9695);
      t['Z'] = r.instance;
    },
    92990: function (e, t, n) {
      'use strict';
      n.d(t, {
        Z: function () {
          return wn;
        },
      });
      var r = n(22122),
        o = n(41788),
        i = n(55288),
        a = n(99250),
        s = n(23715),
        c = n(23195),
        f = n(30353);
      function u(e) {
        return (0, c.Z)(e) && 1 === e.nodeType && !(0, f.Z)(e);
      }
      var l = u,
        p = n(39350),
        d = n(4112),
        m = n(81927),
        h = n(64803),
        v = n(9695),
        g = n.n(v),
        y = n(86010),
        b = (n(55301), n(12924)),
        w = n.n(b),
        x = b.createContext();
      b.createContext();
      var O = function (e) {
          return Array.isArray(e) ? e[0] : e;
        },
        Z = function (e) {
          if ('function' === typeof e) {
            for (
              var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1;
              r < t;
              r++
            )
              n[r - 1] = arguments[r];
            return e.apply(void 0, n);
          }
        },
        E = function (e, t) {
          if ('function' === typeof e) return Z(e, t);
          null != e && (e.current = t);
        },
        P = function (e) {
          return e.reduce(function (e, t) {
            var n = t[0],
              r = t[1];
            return (e[n] = r), e;
          }, {});
        },
        D =
          'undefined' !== typeof window &&
          window.document &&
          window.document.createElement
            ? b.useLayoutEffect
            : b.useEffect,
        k = n(11092);
      function j(e) {
        if (null == e) return window;
        if ('[object Window]' !== e.toString()) {
          var t = e.ownerDocument;
          return (t && t.defaultView) || window;
        }
        return e;
      }
      function R(e) {
        var t = j(e).Element;
        return e instanceof t || e instanceof Element;
      }
      function C(e) {
        var t = j(e).HTMLElement;
        return e instanceof t || e instanceof HTMLElement;
      }
      function M(e) {
        if ('undefined' === typeof ShadowRoot) return !1;
        var t = j(e).ShadowRoot;
        return e instanceof t || e instanceof ShadowRoot;
      }
      var S = Math.max,
        A = Math.min,
        T = Math.round;
      function U() {
        var e = navigator.userAgentData;
        return null != e && e.brands
          ? e.brands
              .map(function (e) {
                return e.brand + '/' + e.version;
              })
              .join(' ')
          : navigator.userAgent;
      }
      function L() {
        return !/^((?!chrome|android).)*safari/i.test(U());
      }
      function W(e, t, n) {
        void 0 === t && (t = !1), void 0 === n && (n = !1);
        var r = e.getBoundingClientRect(),
          o = 1,
          i = 1;
        t &&
          C(e) &&
          ((o = (e.offsetWidth > 0 && T(r.width) / e.offsetWidth) || 1),
          (i = (e.offsetHeight > 0 && T(r.height) / e.offsetHeight) || 1));
        var a = R(e) ? j(e) : window,
          s = a.visualViewport,
          c = !L() && n,
          f = (r.left + (c && s ? s.offsetLeft : 0)) / o,
          u = (r.top + (c && s ? s.offsetTop : 0)) / i,
          l = r.width / o,
          p = r.height / i;
        return {
          width: l,
          height: p,
          top: u,
          right: f + l,
          bottom: u + p,
          left: f,
          x: f,
          y: u,
        };
      }
      function B(e) {
        var t = j(e),
          n = t.pageXOffset,
          r = t.pageYOffset;
        return { scrollLeft: n, scrollTop: r };
      }
      function H(e) {
        return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
      }
      function N(e) {
        return e !== j(e) && C(e) ? H(e) : B(e);
      }
      function F(e) {
        return e ? (e.nodeName || '').toLowerCase() : null;
      }
      function I(e) {
        return ((R(e) ? e.ownerDocument : e.document) || window.document)
          .documentElement;
      }
      function z(e) {
        return W(I(e)).left + B(e).scrollLeft;
      }
      function q(e) {
        return j(e).getComputedStyle(e);
      }
      function V(e) {
        var t = q(e),
          n = t.overflow,
          r = t.overflowX,
          o = t.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + o + r);
      }
      function _(e) {
        var t = e.getBoundingClientRect(),
          n = T(t.width) / e.offsetWidth || 1,
          r = T(t.height) / e.offsetHeight || 1;
        return 1 !== n || 1 !== r;
      }
      function G(e, t, n) {
        void 0 === n && (n = !1);
        var r = C(t),
          o = C(t) && _(t),
          i = I(t),
          a = W(e, o, n),
          s = { scrollLeft: 0, scrollTop: 0 },
          c = { x: 0, y: 0 };
        return (
          (r || (!r && !n)) &&
            (('body' !== F(t) || V(i)) && (s = N(t)),
            C(t)
              ? ((c = W(t, !0)), (c.x += t.clientLeft), (c.y += t.clientTop))
              : i && (c.x = z(i))),
          {
            x: a.left + s.scrollLeft - c.x,
            y: a.top + s.scrollTop - c.y,
            width: a.width,
            height: a.height,
          }
        );
      }
      function K(e) {
        var t = W(e),
          n = e.offsetWidth,
          r = e.offsetHeight;
        return (
          Math.abs(t.width - n) <= 1 && (n = t.width),
          Math.abs(t.height - r) <= 1 && (r = t.height),
          { x: e.offsetLeft, y: e.offsetTop, width: n, height: r }
        );
      }
      function X(e) {
        return 'html' === F(e)
          ? e
          : e.assignedSlot || e.parentNode || (M(e) ? e.host : null) || I(e);
      }
      function Y(e) {
        return ['html', 'body', '#document'].indexOf(F(e)) >= 0
          ? e.ownerDocument.body
          : C(e) && V(e)
          ? e
          : Y(X(e));
      }
      function J(e, t) {
        var n;
        void 0 === t && (t = []);
        var r = Y(e),
          o = r === (null == (n = e.ownerDocument) ? void 0 : n.body),
          i = j(r),
          a = o ? [i].concat(i.visualViewport || [], V(r) ? r : []) : r,
          s = t.concat(a);
        return o ? s : s.concat(J(X(a)));
      }
      function Q(e) {
        return ['table', 'td', 'th'].indexOf(F(e)) >= 0;
      }
      function $(e) {
        return C(e) && 'fixed' !== q(e).position ? e.offsetParent : null;
      }
      function ee(e) {
        var t = /firefox/i.test(U()),
          n = /Trident/i.test(U());
        if (n && C(e)) {
          var r = q(e);
          if ('fixed' === r.position) return null;
        }
        var o = X(e);
        M(o) && (o = o.host);
        while (C(o) && ['html', 'body'].indexOf(F(o)) < 0) {
          var i = q(o);
          if (
            'none' !== i.transform ||
            'none' !== i.perspective ||
            'paint' === i.contain ||
            -1 !== ['transform', 'perspective'].indexOf(i.willChange) ||
            (t && 'filter' === i.willChange) ||
            (t && i.filter && 'none' !== i.filter)
          )
            return o;
          o = o.parentNode;
        }
        return null;
      }
      function te(e) {
        var t = j(e),
          n = $(e);
        while (n && Q(n) && 'static' === q(n).position) n = $(n);
        return n &&
          ('html' === F(n) || ('body' === F(n) && 'static' === q(n).position))
          ? t
          : n || ee(e) || t;
      }
      var ne = 'top',
        re = 'bottom',
        oe = 'right',
        ie = 'left',
        ae = 'auto',
        se = [ne, re, oe, ie],
        ce = 'start',
        fe = 'end',
        ue = 'clippingParents',
        le = 'viewport',
        pe = 'popper',
        de = 'reference',
        me = se.reduce(function (e, t) {
          return e.concat([t + '-' + ce, t + '-' + fe]);
        }, []),
        he = [].concat(se, [ae]).reduce(function (e, t) {
          return e.concat([t, t + '-' + ce, t + '-' + fe]);
        }, []),
        ve = 'beforeRead',
        ge = 'read',
        ye = 'afterRead',
        be = 'beforeMain',
        we = 'main',
        xe = 'afterMain',
        Oe = 'beforeWrite',
        Ze = 'write',
        Ee = 'afterWrite',
        Pe = [ve, ge, ye, be, we, xe, Oe, Ze, Ee];
      function De(e) {
        var t = new Map(),
          n = new Set(),
          r = [];
        function o(e) {
          n.add(e.name);
          var i = [].concat(e.requires || [], e.requiresIfExists || []);
          i.forEach(function (e) {
            if (!n.has(e)) {
              var r = t.get(e);
              r && o(r);
            }
          }),
            r.push(e);
        }
        return (
          e.forEach(function (e) {
            t.set(e.name, e);
          }),
          e.forEach(function (e) {
            n.has(e.name) || o(e);
          }),
          r
        );
      }
      function ke(e) {
        var t = De(e);
        return Pe.reduce(function (e, n) {
          return e.concat(
            t.filter(function (e) {
              return e.phase === n;
            }),
          );
        }, []);
      }
      function je(e) {
        var t;
        return function () {
          return (
            t ||
              (t = new Promise(function (n) {
                Promise.resolve().then(function () {
                  (t = void 0), n(e());
                });
              })),
            t
          );
        };
      }
      function Re(e) {
        var t = e.reduce(function (e, t) {
          var n = e[t.name];
          return (
            (e[t.name] = n
              ? Object.assign({}, n, t, {
                  options: Object.assign({}, n.options, t.options),
                  data: Object.assign({}, n.data, t.data),
                })
              : t),
            e
          );
        }, {});
        return Object.keys(t).map(function (e) {
          return t[e];
        });
      }
      var Ce = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
      function Me() {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return !t.some(function (e) {
          return !(e && 'function' === typeof e.getBoundingClientRect);
        });
      }
      function Se(e) {
        void 0 === e && (e = {});
        var t = e,
          n = t.defaultModifiers,
          r = void 0 === n ? [] : n,
          o = t.defaultOptions,
          i = void 0 === o ? Ce : o;
        return function (e, t, n) {
          void 0 === n && (n = i);
          var o = {
              placement: 'bottom',
              orderedModifiers: [],
              options: Object.assign({}, Ce, i),
              modifiersData: {},
              elements: { reference: e, popper: t },
              attributes: {},
              styles: {},
            },
            a = [],
            s = !1,
            c = {
              state: o,
              setOptions: function (n) {
                var a = 'function' === typeof n ? n(o.options) : n;
                u(),
                  (o.options = Object.assign({}, i, o.options, a)),
                  (o.scrollParents = {
                    reference: R(e)
                      ? J(e)
                      : e.contextElement
                      ? J(e.contextElement)
                      : [],
                    popper: J(t),
                  });
                var s = ke(Re([].concat(r, o.options.modifiers)));
                return (
                  (o.orderedModifiers = s.filter(function (e) {
                    return e.enabled;
                  })),
                  f(),
                  c.update()
                );
              },
              forceUpdate: function () {
                if (!s) {
                  var e = o.elements,
                    t = e.reference,
                    n = e.popper;
                  if (Me(t, n)) {
                    (o.rects = {
                      reference: G(t, te(n), 'fixed' === o.options.strategy),
                      popper: K(n),
                    }),
                      (o.reset = !1),
                      (o.placement = o.options.placement),
                      o.orderedModifiers.forEach(function (e) {
                        return (o.modifiersData[e.name] = Object.assign(
                          {},
                          e.data,
                        ));
                      });
                    for (var r = 0; r < o.orderedModifiers.length; r++)
                      if (!0 !== o.reset) {
                        var i = o.orderedModifiers[r],
                          a = i.fn,
                          f = i.options,
                          u = void 0 === f ? {} : f,
                          l = i.name;
                        'function' === typeof a &&
                          (o =
                            a({ state: o, options: u, name: l, instance: c }) ||
                            o);
                      } else (o.reset = !1), (r = -1);
                  }
                }
              },
              update: je(function () {
                return new Promise(function (e) {
                  c.forceUpdate(), e(o);
                });
              }),
              destroy: function () {
                u(), (s = !0);
              },
            };
          if (!Me(e, t)) return c;
          function f() {
            o.orderedModifiers.forEach(function (e) {
              var t = e.name,
                n = e.options,
                r = void 0 === n ? {} : n,
                i = e.effect;
              if ('function' === typeof i) {
                var s = i({ state: o, name: t, instance: c, options: r }),
                  f = function () {};
                a.push(s || f);
              }
            });
          }
          function u() {
            a.forEach(function (e) {
              return e();
            }),
              (a = []);
          }
          return (
            c.setOptions(n).then(function (e) {
              !s && n.onFirstUpdate && n.onFirstUpdate(e);
            }),
            c
          );
        };
      }
      var Ae = { passive: !0 };
      function Te(e) {
        var t = e.state,
          n = e.instance,
          r = e.options,
          o = r.scroll,
          i = void 0 === o || o,
          a = r.resize,
          s = void 0 === a || a,
          c = j(t.elements.popper),
          f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
        return (
          i &&
            f.forEach(function (e) {
              e.addEventListener('scroll', n.update, Ae);
            }),
          s && c.addEventListener('resize', n.update, Ae),
          function () {
            i &&
              f.forEach(function (e) {
                e.removeEventListener('scroll', n.update, Ae);
              }),
              s && c.removeEventListener('resize', n.update, Ae);
          }
        );
      }
      var Ue = {
        name: 'eventListeners',
        enabled: !0,
        phase: 'write',
        fn: function () {},
        effect: Te,
        data: {},
      };
      function Le(e) {
        return e.split('-')[0];
      }
      function We(e) {
        return e.split('-')[1];
      }
      function Be(e) {
        return ['top', 'bottom'].indexOf(e) >= 0 ? 'x' : 'y';
      }
      function He(e) {
        var t,
          n = e.reference,
          r = e.element,
          o = e.placement,
          i = o ? Le(o) : null,
          a = o ? We(o) : null,
          s = n.x + n.width / 2 - r.width / 2,
          c = n.y + n.height / 2 - r.height / 2;
        switch (i) {
          case ne:
            t = { x: s, y: n.y - r.height };
            break;
          case re:
            t = { x: s, y: n.y + n.height };
            break;
          case oe:
            t = { x: n.x + n.width, y: c };
            break;
          case ie:
            t = { x: n.x - r.width, y: c };
            break;
          default:
            t = { x: n.x, y: n.y };
        }
        var f = i ? Be(i) : null;
        if (null != f) {
          var u = 'y' === f ? 'height' : 'width';
          switch (a) {
            case ce:
              t[f] = t[f] - (n[u] / 2 - r[u] / 2);
              break;
            case fe:
              t[f] = t[f] + (n[u] / 2 - r[u] / 2);
              break;
            default:
          }
        }
        return t;
      }
      function Ne(e) {
        var t = e.state,
          n = e.name;
        t.modifiersData[n] = He({
          reference: t.rects.reference,
          element: t.rects.popper,
          strategy: 'absolute',
          placement: t.placement,
        });
      }
      var Fe = {
          name: 'popperOffsets',
          enabled: !0,
          phase: 'read',
          fn: Ne,
          data: {},
        },
        Ie = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
      function ze(e) {
        var t = e.x,
          n = e.y,
          r = window,
          o = r.devicePixelRatio || 1;
        return { x: T(t * o) / o || 0, y: T(n * o) / o || 0 };
      }
      function qe(e) {
        var t,
          n = e.popper,
          r = e.popperRect,
          o = e.placement,
          i = e.variation,
          a = e.offsets,
          s = e.position,
          c = e.gpuAcceleration,
          f = e.adaptive,
          u = e.roundOffsets,
          l = e.isFixed,
          p = a.x,
          d = void 0 === p ? 0 : p,
          m = a.y,
          h = void 0 === m ? 0 : m,
          v = 'function' === typeof u ? u({ x: d, y: h }) : { x: d, y: h };
        (d = v.x), (h = v.y);
        var g = a.hasOwnProperty('x'),
          y = a.hasOwnProperty('y'),
          b = ie,
          w = ne,
          x = window;
        if (f) {
          var O = te(n),
            Z = 'clientHeight',
            E = 'clientWidth';
          if (
            (O === j(n) &&
              ((O = I(n)),
              'static' !== q(O).position &&
                'absolute' === s &&
                ((Z = 'scrollHeight'), (E = 'scrollWidth'))),
            o === ne || ((o === ie || o === oe) && i === fe))
          ) {
            w = re;
            var P =
              l && O === x && x.visualViewport ? x.visualViewport.height : O[Z];
            (h -= P - r.height), (h *= c ? 1 : -1);
          }
          if (o === ie || ((o === ne || o === re) && i === fe)) {
            b = oe;
            var D =
              l && O === x && x.visualViewport ? x.visualViewport.width : O[E];
            (d -= D - r.width), (d *= c ? 1 : -1);
          }
        }
        var k,
          R = Object.assign({ position: s }, f && Ie),
          C = !0 === u ? ze({ x: d, y: h }) : { x: d, y: h };
        return (
          (d = C.x),
          (h = C.y),
          c
            ? Object.assign(
                {},
                R,
                ((k = {}),
                (k[w] = y ? '0' : ''),
                (k[b] = g ? '0' : ''),
                (k.transform =
                  (x.devicePixelRatio || 1) <= 1
                    ? 'translate(' + d + 'px, ' + h + 'px)'
                    : 'translate3d(' + d + 'px, ' + h + 'px, 0)'),
                k),
              )
            : Object.assign(
                {},
                R,
                ((t = {}),
                (t[w] = y ? h + 'px' : ''),
                (t[b] = g ? d + 'px' : ''),
                (t.transform = ''),
                t),
              )
        );
      }
      function Ve(e) {
        var t = e.state,
          n = e.options,
          r = n.gpuAcceleration,
          o = void 0 === r || r,
          i = n.adaptive,
          a = void 0 === i || i,
          s = n.roundOffsets,
          c = void 0 === s || s,
          f = {
            placement: Le(t.placement),
            variation: We(t.placement),
            popper: t.elements.popper,
            popperRect: t.rects.popper,
            gpuAcceleration: o,
            isFixed: 'fixed' === t.options.strategy,
          };
        null != t.modifiersData.popperOffsets &&
          (t.styles.popper = Object.assign(
            {},
            t.styles.popper,
            qe(
              Object.assign({}, f, {
                offsets: t.modifiersData.popperOffsets,
                position: t.options.strategy,
                adaptive: a,
                roundOffsets: c,
              }),
            ),
          )),
          null != t.modifiersData.arrow &&
            (t.styles.arrow = Object.assign(
              {},
              t.styles.arrow,
              qe(
                Object.assign({}, f, {
                  offsets: t.modifiersData.arrow,
                  position: 'absolute',
                  adaptive: !1,
                  roundOffsets: c,
                }),
              ),
            )),
          (t.attributes.popper = Object.assign({}, t.attributes.popper, {
            'data-popper-placement': t.placement,
          }));
      }
      var _e = {
        name: 'computeStyles',
        enabled: !0,
        phase: 'beforeWrite',
        fn: Ve,
        data: {},
      };
      function Ge(e) {
        var t = e.state;
        Object.keys(t.elements).forEach(function (e) {
          var n = t.styles[e] || {},
            r = t.attributes[e] || {},
            o = t.elements[e];
          C(o) &&
            F(o) &&
            (Object.assign(o.style, n),
            Object.keys(r).forEach(function (e) {
              var t = r[e];
              !1 === t
                ? o.removeAttribute(e)
                : o.setAttribute(e, !0 === t ? '' : t);
            }));
        });
      }
      function Ke(e) {
        var t = e.state,
          n = {
            popper: {
              position: t.options.strategy,
              left: '0',
              top: '0',
              margin: '0',
            },
            arrow: { position: 'absolute' },
            reference: {},
          };
        return (
          Object.assign(t.elements.popper.style, n.popper),
          (t.styles = n),
          t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow),
          function () {
            Object.keys(t.elements).forEach(function (e) {
              var r = t.elements[e],
                o = t.attributes[e] || {},
                i = Object.keys(
                  t.styles.hasOwnProperty(e) ? t.styles[e] : n[e],
                ),
                a = i.reduce(function (e, t) {
                  return (e[t] = ''), e;
                }, {});
              C(r) &&
                F(r) &&
                (Object.assign(r.style, a),
                Object.keys(o).forEach(function (e) {
                  r.removeAttribute(e);
                }));
            });
          }
        );
      }
      var Xe = {
        name: 'applyStyles',
        enabled: !0,
        phase: 'write',
        fn: Ge,
        effect: Ke,
        requires: ['computeStyles'],
      };
      function Ye(e, t, n) {
        var r = Le(e),
          o = [ie, ne].indexOf(r) >= 0 ? -1 : 1,
          i =
            'function' === typeof n
              ? n(Object.assign({}, t, { placement: e }))
              : n,
          a = i[0],
          s = i[1];
        return (
          (a = a || 0),
          (s = (s || 0) * o),
          [ie, oe].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s }
        );
      }
      function Je(e) {
        var t = e.state,
          n = e.options,
          r = e.name,
          o = n.offset,
          i = void 0 === o ? [0, 0] : o,
          a = he.reduce(function (e, n) {
            return (e[n] = Ye(n, t.rects, i)), e;
          }, {}),
          s = a[t.placement],
          c = s.x,
          f = s.y;
        null != t.modifiersData.popperOffsets &&
          ((t.modifiersData.popperOffsets.x += c),
          (t.modifiersData.popperOffsets.y += f)),
          (t.modifiersData[r] = a);
      }
      var Qe = {
          name: 'offset',
          enabled: !0,
          phase: 'main',
          requires: ['popperOffsets'],
          fn: Je,
        },
        $e = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
      function et(e) {
        return e.replace(/left|right|bottom|top/g, function (e) {
          return $e[e];
        });
      }
      var tt = { start: 'end', end: 'start' };
      function nt(e) {
        return e.replace(/start|end/g, function (e) {
          return tt[e];
        });
      }
      function rt(e, t) {
        var n = j(e),
          r = I(e),
          o = n.visualViewport,
          i = r.clientWidth,
          a = r.clientHeight,
          s = 0,
          c = 0;
        if (o) {
          (i = o.width), (a = o.height);
          var f = L();
          (f || (!f && 'fixed' === t)) &&
            ((s = o.offsetLeft), (c = o.offsetTop));
        }
        return { width: i, height: a, x: s + z(e), y: c };
      }
      function ot(e) {
        var t,
          n = I(e),
          r = B(e),
          o = null == (t = e.ownerDocument) ? void 0 : t.body,
          i = S(
            n.scrollWidth,
            n.clientWidth,
            o ? o.scrollWidth : 0,
            o ? o.clientWidth : 0,
          ),
          a = S(
            n.scrollHeight,
            n.clientHeight,
            o ? o.scrollHeight : 0,
            o ? o.clientHeight : 0,
          ),
          s = -r.scrollLeft + z(e),
          c = -r.scrollTop;
        return (
          'rtl' === q(o || n).direction &&
            (s += S(n.clientWidth, o ? o.clientWidth : 0) - i),
          { width: i, height: a, x: s, y: c }
        );
      }
      function it(e, t) {
        var n = t.getRootNode && t.getRootNode();
        if (e.contains(t)) return !0;
        if (n && M(n)) {
          var r = t;
          do {
            if (r && e.isSameNode(r)) return !0;
            r = r.parentNode || r.host;
          } while (r);
        }
        return !1;
      }
      function at(e) {
        return Object.assign({}, e, {
          left: e.x,
          top: e.y,
          right: e.x + e.width,
          bottom: e.y + e.height,
        });
      }
      function st(e, t) {
        var n = W(e, !1, 'fixed' === t);
        return (
          (n.top = n.top + e.clientTop),
          (n.left = n.left + e.clientLeft),
          (n.bottom = n.top + e.clientHeight),
          (n.right = n.left + e.clientWidth),
          (n.width = e.clientWidth),
          (n.height = e.clientHeight),
          (n.x = n.left),
          (n.y = n.top),
          n
        );
      }
      function ct(e, t, n) {
        return t === le ? at(rt(e, n)) : R(t) ? st(t, n) : at(ot(I(e)));
      }
      function ft(e) {
        var t = J(X(e)),
          n = ['absolute', 'fixed'].indexOf(q(e).position) >= 0,
          r = n && C(e) ? te(e) : e;
        return R(r)
          ? t.filter(function (e) {
              return R(e) && it(e, r) && 'body' !== F(e);
            })
          : [];
      }
      function ut(e, t, n, r) {
        var o = 'clippingParents' === t ? ft(e) : [].concat(t),
          i = [].concat(o, [n]),
          a = i[0],
          s = i.reduce(function (t, n) {
            var o = ct(e, n, r);
            return (
              (t.top = S(o.top, t.top)),
              (t.right = A(o.right, t.right)),
              (t.bottom = A(o.bottom, t.bottom)),
              (t.left = S(o.left, t.left)),
              t
            );
          }, ct(e, a, r));
        return (
          (s.width = s.right - s.left),
          (s.height = s.bottom - s.top),
          (s.x = s.left),
          (s.y = s.top),
          s
        );
      }
      function lt() {
        return { top: 0, right: 0, bottom: 0, left: 0 };
      }
      function pt(e) {
        return Object.assign({}, lt(), e);
      }
      function dt(e, t) {
        return t.reduce(function (t, n) {
          return (t[n] = e), t;
        }, {});
      }
      function mt(e, t) {
        void 0 === t && (t = {});
        var n = t,
          r = n.placement,
          o = void 0 === r ? e.placement : r,
          i = n.strategy,
          a = void 0 === i ? e.strategy : i,
          s = n.boundary,
          c = void 0 === s ? ue : s,
          f = n.rootBoundary,
          u = void 0 === f ? le : f,
          l = n.elementContext,
          p = void 0 === l ? pe : l,
          d = n.altBoundary,
          m = void 0 !== d && d,
          h = n.padding,
          v = void 0 === h ? 0 : h,
          g = pt('number' !== typeof v ? v : dt(v, se)),
          y = p === pe ? de : pe,
          b = e.rects.popper,
          w = e.elements[m ? y : p],
          x = ut(R(w) ? w : w.contextElement || I(e.elements.popper), c, u, a),
          O = W(e.elements.reference),
          Z = He({
            reference: O,
            element: b,
            strategy: 'absolute',
            placement: o,
          }),
          E = at(Object.assign({}, b, Z)),
          P = p === pe ? E : O,
          D = {
            top: x.top - P.top + g.top,
            bottom: P.bottom - x.bottom + g.bottom,
            left: x.left - P.left + g.left,
            right: P.right - x.right + g.right,
          },
          k = e.modifiersData.offset;
        if (p === pe && k) {
          var j = k[o];
          Object.keys(D).forEach(function (e) {
            var t = [oe, re].indexOf(e) >= 0 ? 1 : -1,
              n = [ne, re].indexOf(e) >= 0 ? 'y' : 'x';
            D[e] += j[n] * t;
          });
        }
        return D;
      }
      function ht(e, t) {
        void 0 === t && (t = {});
        var n = t,
          r = n.placement,
          o = n.boundary,
          i = n.rootBoundary,
          a = n.padding,
          s = n.flipVariations,
          c = n.allowedAutoPlacements,
          f = void 0 === c ? he : c,
          u = We(r),
          l = u
            ? s
              ? me
              : me.filter(function (e) {
                  return We(e) === u;
                })
            : se,
          p = l.filter(function (e) {
            return f.indexOf(e) >= 0;
          });
        0 === p.length && (p = l);
        var d = p.reduce(function (t, n) {
          return (
            (t[n] = mt(e, {
              placement: n,
              boundary: o,
              rootBoundary: i,
              padding: a,
            })[Le(n)]),
            t
          );
        }, {});
        return Object.keys(d).sort(function (e, t) {
          return d[e] - d[t];
        });
      }
      function vt(e) {
        if (Le(e) === ae) return [];
        var t = et(e);
        return [nt(e), t, nt(t)];
      }
      function gt(e) {
        var t = e.state,
          n = e.options,
          r = e.name;
        if (!t.modifiersData[r]._skip) {
          for (
            var o = n.mainAxis,
              i = void 0 === o || o,
              a = n.altAxis,
              s = void 0 === a || a,
              c = n.fallbackPlacements,
              f = n.padding,
              u = n.boundary,
              l = n.rootBoundary,
              p = n.altBoundary,
              d = n.flipVariations,
              m = void 0 === d || d,
              h = n.allowedAutoPlacements,
              v = t.options.placement,
              g = Le(v),
              y = g === v,
              b = c || (y || !m ? [et(v)] : vt(v)),
              w = [v].concat(b).reduce(function (e, n) {
                return e.concat(
                  Le(n) === ae
                    ? ht(t, {
                        placement: n,
                        boundary: u,
                        rootBoundary: l,
                        padding: f,
                        flipVariations: m,
                        allowedAutoPlacements: h,
                      })
                    : n,
                );
              }, []),
              x = t.rects.reference,
              O = t.rects.popper,
              Z = new Map(),
              E = !0,
              P = w[0],
              D = 0;
            D < w.length;
            D++
          ) {
            var k = w[D],
              j = Le(k),
              R = We(k) === ce,
              C = [ne, re].indexOf(j) >= 0,
              M = C ? 'width' : 'height',
              S = mt(t, {
                placement: k,
                boundary: u,
                rootBoundary: l,
                altBoundary: p,
                padding: f,
              }),
              A = C ? (R ? oe : ie) : R ? re : ne;
            x[M] > O[M] && (A = et(A));
            var T = et(A),
              U = [];
            if (
              (i && U.push(S[j] <= 0),
              s && U.push(S[A] <= 0, S[T] <= 0),
              U.every(function (e) {
                return e;
              }))
            ) {
              (P = k), (E = !1);
              break;
            }
            Z.set(k, U);
          }
          if (E)
            for (
              var L = m ? 3 : 1,
                W = function (e) {
                  var t = w.find(function (t) {
                    var n = Z.get(t);
                    if (n)
                      return n.slice(0, e).every(function (e) {
                        return e;
                      });
                  });
                  if (t) return (P = t), 'break';
                },
                B = L;
              B > 0;
              B--
            ) {
              var H = W(B);
              if ('break' === H) break;
            }
          t.placement !== P &&
            ((t.modifiersData[r]._skip = !0),
            (t.placement = P),
            (t.reset = !0));
        }
      }
      var yt = {
        name: 'flip',
        enabled: !0,
        phase: 'main',
        fn: gt,
        requiresIfExists: ['offset'],
        data: { _skip: !1 },
      };
      function bt(e) {
        return 'x' === e ? 'y' : 'x';
      }
      function wt(e, t, n) {
        return S(e, A(t, n));
      }
      function xt(e, t, n) {
        var r = wt(e, t, n);
        return r > n ? n : r;
      }
      function Ot(e) {
        var t = e.state,
          n = e.options,
          r = e.name,
          o = n.mainAxis,
          i = void 0 === o || o,
          a = n.altAxis,
          s = void 0 !== a && a,
          c = n.boundary,
          f = n.rootBoundary,
          u = n.altBoundary,
          l = n.padding,
          p = n.tether,
          d = void 0 === p || p,
          m = n.tetherOffset,
          h = void 0 === m ? 0 : m,
          v = mt(t, {
            boundary: c,
            rootBoundary: f,
            padding: l,
            altBoundary: u,
          }),
          g = Le(t.placement),
          y = We(t.placement),
          b = !y,
          w = Be(g),
          x = bt(w),
          O = t.modifiersData.popperOffsets,
          Z = t.rects.reference,
          E = t.rects.popper,
          P =
            'function' === typeof h
              ? h(Object.assign({}, t.rects, { placement: t.placement }))
              : h,
          D =
            'number' === typeof P
              ? { mainAxis: P, altAxis: P }
              : Object.assign({ mainAxis: 0, altAxis: 0 }, P),
          k = t.modifiersData.offset
            ? t.modifiersData.offset[t.placement]
            : null,
          j = { x: 0, y: 0 };
        if (O) {
          if (i) {
            var R,
              C = 'y' === w ? ne : ie,
              M = 'y' === w ? re : oe,
              T = 'y' === w ? 'height' : 'width',
              U = O[w],
              L = U + v[C],
              W = U - v[M],
              B = d ? -E[T] / 2 : 0,
              H = y === ce ? Z[T] : E[T],
              N = y === ce ? -E[T] : -Z[T],
              F = t.elements.arrow,
              I = d && F ? K(F) : { width: 0, height: 0 },
              z = t.modifiersData['arrow#persistent']
                ? t.modifiersData['arrow#persistent'].padding
                : lt(),
              q = z[C],
              V = z[M],
              _ = wt(0, Z[T], I[T]),
              G = b
                ? Z[T] / 2 - B - _ - q - D.mainAxis
                : H - _ - q - D.mainAxis,
              X = b
                ? -Z[T] / 2 + B + _ + V + D.mainAxis
                : N + _ + V + D.mainAxis,
              Y = t.elements.arrow && te(t.elements.arrow),
              J = Y ? ('y' === w ? Y.clientTop || 0 : Y.clientLeft || 0) : 0,
              Q = null != (R = null == k ? void 0 : k[w]) ? R : 0,
              $ = U + G - Q - J,
              ee = U + X - Q,
              ae = wt(d ? A(L, $) : L, U, d ? S(W, ee) : W);
            (O[w] = ae), (j[w] = ae - U);
          }
          if (s) {
            var se,
              fe = 'x' === w ? ne : ie,
              ue = 'x' === w ? re : oe,
              le = O[x],
              pe = 'y' === x ? 'height' : 'width',
              de = le + v[fe],
              me = le - v[ue],
              he = -1 !== [ne, ie].indexOf(g),
              ve = null != (se = null == k ? void 0 : k[x]) ? se : 0,
              ge = he ? de : le - Z[pe] - E[pe] - ve + D.altAxis,
              ye = he ? le + Z[pe] + E[pe] - ve - D.altAxis : me,
              be = d && he ? xt(ge, le, ye) : wt(d ? ge : de, le, d ? ye : me);
            (O[x] = be), (j[x] = be - le);
          }
          t.modifiersData[r] = j;
        }
      }
      var Zt = {
          name: 'preventOverflow',
          enabled: !0,
          phase: 'main',
          fn: Ot,
          requiresIfExists: ['offset'],
        },
        Et = function (e, t) {
          return (
            (e =
              'function' === typeof e
                ? e(Object.assign({}, t.rects, { placement: t.placement }))
                : e),
            pt('number' !== typeof e ? e : dt(e, se))
          );
        };
      function Pt(e) {
        var t,
          n = e.state,
          r = e.name,
          o = e.options,
          i = n.elements.arrow,
          a = n.modifiersData.popperOffsets,
          s = Le(n.placement),
          c = Be(s),
          f = [ie, oe].indexOf(s) >= 0,
          u = f ? 'height' : 'width';
        if (i && a) {
          var l = Et(o.padding, n),
            p = K(i),
            d = 'y' === c ? ne : ie,
            m = 'y' === c ? re : oe,
            h =
              n.rects.reference[u] +
              n.rects.reference[c] -
              a[c] -
              n.rects.popper[u],
            v = a[c] - n.rects.reference[c],
            g = te(i),
            y = g ? ('y' === c ? g.clientHeight || 0 : g.clientWidth || 0) : 0,
            b = h / 2 - v / 2,
            w = l[d],
            x = y - p[u] - l[m],
            O = y / 2 - p[u] / 2 + b,
            Z = wt(w, O, x),
            E = c;
          n.modifiersData[r] =
            ((t = {}), (t[E] = Z), (t.centerOffset = Z - O), t);
        }
      }
      function Dt(e) {
        var t = e.state,
          n = e.options,
          r = n.element,
          o = void 0 === r ? '[data-popper-arrow]' : r;
        null != o &&
          ('string' !== typeof o ||
            ((o = t.elements.popper.querySelector(o)), o)) &&
          it(t.elements.popper, o) &&
          (t.elements.arrow = o);
      }
      var kt = {
        name: 'arrow',
        enabled: !0,
        phase: 'main',
        fn: Pt,
        effect: Dt,
        requires: ['popperOffsets'],
        requiresIfExists: ['preventOverflow'],
      };
      function jt(e, t, n) {
        return (
          void 0 === n && (n = { x: 0, y: 0 }),
          {
            top: e.top - t.height - n.y,
            right: e.right - t.width + n.x,
            bottom: e.bottom - t.height + n.y,
            left: e.left - t.width - n.x,
          }
        );
      }
      function Rt(e) {
        return [ne, oe, re, ie].some(function (t) {
          return e[t] >= 0;
        });
      }
      function Ct(e) {
        var t = e.state,
          n = e.name,
          r = t.rects.reference,
          o = t.rects.popper,
          i = t.modifiersData.preventOverflow,
          a = mt(t, { elementContext: 'reference' }),
          s = mt(t, { altBoundary: !0 }),
          c = jt(a, r),
          f = jt(s, o, i),
          u = Rt(c),
          l = Rt(f);
        (t.modifiersData[n] = {
          referenceClippingOffsets: c,
          popperEscapeOffsets: f,
          isReferenceHidden: u,
          hasPopperEscaped: l,
        }),
          (t.attributes.popper = Object.assign({}, t.attributes.popper, {
            'data-popper-reference-hidden': u,
            'data-popper-escaped': l,
          }));
      }
      var Mt = {
          name: 'hide',
          enabled: !0,
          phase: 'main',
          requiresIfExists: ['preventOverflow'],
          fn: Ct,
        },
        St = [Ue, Fe, _e, Xe, Qe, yt, Zt, kt, Mt],
        At = Se({ defaultModifiers: St }),
        Tt = n(69590),
        Ut = n.n(Tt),
        Lt = [],
        Wt = function (e, t, n) {
          void 0 === n && (n = {});
          var r = b.useRef(null),
            o = {
              onFirstUpdate: n.onFirstUpdate,
              placement: n.placement || 'bottom',
              strategy: n.strategy || 'absolute',
              modifiers: n.modifiers || Lt,
            },
            i = b.useState({
              styles: {
                popper: { position: o.strategy, left: '0', top: '0' },
                arrow: { position: 'absolute' },
              },
              attributes: {},
            }),
            a = i[0],
            s = i[1],
            c = b.useMemo(function () {
              return {
                name: 'updateState',
                enabled: !0,
                phase: 'write',
                fn: function (e) {
                  var t = e.state,
                    n = Object.keys(t.elements);
                  k.flushSync(function () {
                    s({
                      styles: P(
                        n.map(function (e) {
                          return [e, t.styles[e] || {}];
                        }),
                      ),
                      attributes: P(
                        n.map(function (e) {
                          return [e, t.attributes[e]];
                        }),
                      ),
                    });
                  });
                },
                requires: ['computeStyles'],
              };
            }, []),
            f = b.useMemo(
              function () {
                var e = {
                  onFirstUpdate: o.onFirstUpdate,
                  placement: o.placement,
                  strategy: o.strategy,
                  modifiers: [].concat(o.modifiers, [
                    c,
                    { name: 'applyStyles', enabled: !1 },
                  ]),
                };
                return Ut()(r.current, e)
                  ? r.current || e
                  : ((r.current = e), e);
              },
              [o.onFirstUpdate, o.placement, o.strategy, o.modifiers, c],
            ),
            u = b.useRef();
          return (
            D(
              function () {
                u.current && u.current.setOptions(f);
              },
              [f],
            ),
            D(
              function () {
                if (null != e && null != t) {
                  var r = n.createPopper || At,
                    o = r(e, t, f);
                  return (
                    (u.current = o),
                    function () {
                      o.destroy(), (u.current = null);
                    }
                  );
                }
              },
              [e, t, n.createPopper],
            ),
            {
              state: u.current ? u.current.state : null,
              styles: a.styles,
              attributes: a.attributes,
              update: u.current ? u.current.update : null,
              forceUpdate: u.current ? u.current.forceUpdate : null,
            }
          );
        },
        Bt = function () {},
        Ht = function () {
          return Promise.resolve(null);
        },
        Nt = [];
      function Ft(e) {
        var t = e.placement,
          n = void 0 === t ? 'bottom' : t,
          r = e.strategy,
          o = void 0 === r ? 'absolute' : r,
          i = e.modifiers,
          a = void 0 === i ? Nt : i,
          s = e.referenceElement,
          c = e.onFirstUpdate,
          f = e.innerRef,
          u = e.children,
          l = b.useContext(x),
          p = b.useState(null),
          d = p[0],
          m = p[1],
          h = b.useState(null),
          v = h[0],
          g = h[1];
        b.useEffect(
          function () {
            E(f, d);
          },
          [f, d],
        );
        var y = b.useMemo(
            function () {
              return {
                placement: n,
                strategy: o,
                onFirstUpdate: c,
                modifiers: [].concat(a, [
                  {
                    name: 'arrow',
                    enabled: null != v,
                    options: { element: v },
                  },
                ]),
              };
            },
            [n, o, c, a, v],
          ),
          w = Wt(s || l, d, y),
          Z = w.state,
          P = w.styles,
          D = w.forceUpdate,
          k = w.update,
          j = b.useMemo(
            function () {
              return {
                ref: m,
                style: P.popper,
                placement: Z ? Z.placement : n,
                hasPopperEscaped:
                  Z && Z.modifiersData.hide
                    ? Z.modifiersData.hide.hasPopperEscaped
                    : null,
                isReferenceHidden:
                  Z && Z.modifiersData.hide
                    ? Z.modifiersData.hide.isReferenceHidden
                    : null,
                arrowProps: { style: P.arrow, ref: g },
                forceUpdate: D || Bt,
                update: k || Ht,
              };
            },
            [m, g, n, Z, P, k, D],
          );
        return O(u)(j);
      }
      var It = n(96774),
        zt = n.n(It),
        qt = n(49545),
        Vt = n(92063),
        _t = n(12519),
        Gt = n(92248),
        Kt = n(93619),
        Xt = n(28935),
        Yt = n(24880),
        Jt = n(31955),
        Qt = n(99035);
      function $t(e, t, n, r) {
        return (
          (0, Qt.Z)(e, function (e, o, i) {
            t(r, n(e), o, i);
          }),
          r
        );
      }
      var en = $t;
      function tn(e, t) {
        return function (n, r) {
          return en(n, e, t(r), {});
        };
      }
      var nn = tn,
        rn = n(63305),
        on = Object.prototype,
        an = on.toString,
        sn = nn(function (e, t, n) {
          null != t && 'function' != typeof t.toString && (t = an.call(t)),
            (e[t] = n);
        }, (0, Jt.Z)(rn.Z)),
        cn = sn,
        fn = n(88130),
        un = {
          'top center': 'top',
          'top left': 'top-start',
          'top right': 'top-end',
          'bottom center': 'bottom',
          'bottom left': 'bottom-start',
          'bottom right': 'bottom-end',
          'right center': 'right',
          'left center': 'left',
        },
        ln = ((0, fn.Z)(un), cn(un)),
        pn = n(5991),
        dn = n(28408),
        mn = n(34714),
        hn = (function () {
          function e(e) {
            this.ref = e;
          }
          var t = e.prototype;
          return (
            (t.getBoundingClientRect = function () {
              return (0, s.Z)(this.ref.current, 'getBoundingClientRect') || {};
            }),
            (0, pn.Z)(e, [
              {
                key: 'clientWidth',
                get: function () {
                  return this.getBoundingClientRect().width;
                },
              },
              {
                key: 'clientHeight',
                get: function () {
                  return this.getBoundingClientRect().height;
                },
              },
              {
                key: 'parentNode',
                get: function () {
                  return this.ref.current
                    ? this.ref.current.parentNode
                    : void 0;
                },
              },
            ]),
            e
          );
        })(),
        vn = (0, dn.Z)(function (e) {
          return new hn((0, mn.I)(e) ? e : { current: e });
        }),
        gn = vn;
      function yn(e) {
        var t = e.children,
          n = e.className,
          o = e.content,
          i = (0, y.default)('content', n),
          a = (0, Xt.Z)(yn, e),
          s = (0, _t.Z)(yn, e);
        return w().createElement(
          s,
          (0, r.Z)({}, a, { className: i }),
          Gt.kK(t) ? o : t,
        );
      }
      function bn(e) {
        var t = e.children,
          n = e.className,
          o = e.content,
          i = (0, y.default)('header', n),
          a = (0, Xt.Z)(bn, e),
          s = (0, _t.Z)(bn, e);
        return w().createElement(
          s,
          (0, r.Z)({}, a, { className: i }),
          Gt.kK(t) ? o : t,
        );
      }
      (yn.handledProps = ['as', 'children', 'className', 'content']),
        (yn.propTypes = {}),
        (yn.create = (0, Kt.u5)(yn, function (e) {
          return { children: e };
        })),
        (bn.handledProps = ['as', 'children', 'className', 'content']),
        (bn.propTypes = {}),
        (bn.create = (0, Kt.u5)(bn, function (e) {
          return { children: e };
        }));
      var wn = (function (e) {
        function t() {
          for (var n, o = arguments.length, i = new Array(o), a = 0; a < o; a++)
            i[a] = arguments[a];
          return (
            (n = e.call.apply(e, [this].concat(i)) || this),
            (n.state = {}),
            (n.open = !1),
            (n.zIndexWasSynced = !1),
            (n.triggerRef = w().createRef()),
            (n.elementRef = w().createRef()),
            (n.getPortalProps = function () {
              var e = {},
                t = n.props,
                r = t.on,
                o = t.hoverable,
                i = (0, p.Z)(r) ? r : [r];
              return (
                o &&
                  ((e.closeOnPortalMouseLeave = !0), (e.mouseLeaveDelay = 300)),
                (0, m.Z)(i, 'hover') &&
                  ((e.openOnTriggerClick = !1),
                  (e.closeOnTriggerClick = !1),
                  (e.openOnTriggerMouseEnter = !0),
                  (e.closeOnTriggerMouseLeave = !0),
                  (e.mouseLeaveDelay = 70),
                  (e.mouseEnterDelay = 50)),
                (0, m.Z)(i, 'click') &&
                  ((e.openOnTriggerClick = !0),
                  (e.closeOnTriggerClick = !0),
                  (e.closeOnDocumentClick = !0)),
                (0, m.Z)(i, 'focus') &&
                  ((e.openOnTriggerFocus = !0), (e.closeOnTriggerBlur = !0)),
                e
              );
            }),
            (n.hideOnScroll = function (e) {
              (l(e.target) && n.elementRef.current.contains(e.target)) ||
                (n.setState({ closed: !0 }),
                qt.Z.unsub('scroll', n.hideOnScroll, { target: window }),
                (n.timeoutId = setTimeout(function () {
                  n.setState({ closed: !1 });
                }, 50)),
                n.handleClose(e));
            }),
            (n.handleClose = function (e) {
              (0, s.Z)(
                n.props,
                'onClose',
                e,
                (0, r.Z)({}, n.props, { open: !1 }),
              );
            }),
            (n.handleOpen = function (e) {
              (0, s.Z)(
                n.props,
                'onOpen',
                e,
                (0, r.Z)({}, n.props, { open: !0 }),
              );
            }),
            (n.handlePortalMount = function (e) {
              (0, s.Z)(n.props, 'onMount', e, n.props);
            }),
            (n.handlePortalUnmount = function (e) {
              (n.positionUpdate = null),
                (0, s.Z)(n.props, 'onUnmount', e, n.props);
            }),
            (n.renderContent = function (e) {
              var o = e.placement,
                i = e.ref,
                a = e.update,
                s = e.style,
                c = n.props,
                f = c.basic,
                u = c.children,
                l = c.className,
                p = c.content,
                d = c.hideOnScroll,
                m = c.flowing,
                h = c.header,
                v = c.inverted,
                b = c.popper,
                x = c.size,
                O = c.style,
                Z = c.wide,
                E = n.state.contentRestProps;
              n.positionUpdate = a;
              var P = (0, y.default)(
                  'ui',
                  ln[o],
                  x,
                  (0, Vt.sU)(Z, 'wide'),
                  (0, Vt.lG)(f, 'basic'),
                  (0, Vt.lG)(m, 'flowing'),
                  (0, Vt.lG)(v, 'inverted'),
                  'popup transition visible',
                  l,
                ),
                D = (0, _t.Z)(t, n.props),
                k = (0, r.Z)(
                  { left: 'auto', right: 'auto', position: 'initial' },
                  O,
                ),
                j = w().createElement(
                  D,
                  (0, r.Z)({}, E, {
                    className: P,
                    style: k,
                    ref: n.elementRef,
                  }),
                  Gt.kK(u)
                    ? w().createElement(
                        w().Fragment,
                        null,
                        bn.create(h, { autoGenerateKey: !1 }),
                        yn.create(p, { autoGenerateKey: !1 }),
                      )
                    : u,
                  d &&
                    w().createElement(g(), {
                      on: n.hideOnScroll,
                      name: 'scroll',
                      target: 'window',
                    }),
                );
              return (0, Kt.DE)(b || {}, {
                overrideProps: {
                  children: j,
                  ref: i,
                  style: (0, r.Z)({ display: 'flex' }, s),
                },
              });
            }),
            n
          );
        }
        (0, o.Z)(t, e),
          (t.getDerivedStateFromProps = function (e, n) {
            if (n.closed || n.disabled) return {};
            var r = (0, Xt.Z)(t, e),
              o = (0, h.Z)(
                r,
                function (e, t, n) {
                  return (0, m.Z)(Yt.Z.handledProps, n) || (e[n] = t), e;
                },
                {},
              ),
              i = (0, d.Z)(r, Yt.Z.handledProps);
            return { contentRestProps: o, portalRestProps: i };
          });
        var n = t.prototype;
        return (
          (n.componentDidUpdate = function (e) {
            var t = zt()(this.props.popperDependencies, e.popperDependencies);
            t || this.handleUpdate();
          }),
          (n.componentWillUnmount = function () {
            clearTimeout(this.timeoutId);
          }),
          (n.handleUpdate = function () {
            this.positionUpdate && this.positionUpdate();
          }),
          (n.render = function () {
            var e = this,
              t = this.props,
              n = t.context,
              o = t.disabled,
              s = t.eventsEnabled,
              c = t.offset,
              f = t.pinned,
              u = t.popper,
              l = t.popperModifiers,
              p = t.position,
              d = t.positionFixed,
              m = t.trigger,
              h = this.state,
              v = h.closed,
              g = h.portalRestProps;
            if (v || o) return m;
            var y = [
                { name: 'arrow', enabled: !1 },
                {
                  name: 'eventListeners',
                  options: { scroll: !!s, resize: !!s },
                },
                { name: 'flip', enabled: !f },
                { name: 'preventOverflow', enabled: !!c },
                { name: 'offset', enabled: !!c, options: { offset: c } },
              ].concat(l, [
                {
                  name: 'syncZIndex',
                  enabled: !0,
                  phase: 'beforeRead',
                  fn: function (t) {
                    var n,
                      r = t.state;
                    if (!e.zIndexWasSynced) {
                      var o =
                        null == u || null == (n = u.style) ? void 0 : n.zIndex;
                      (0, a.Z)(o) &&
                        (r.elements.popper.style.zIndex =
                          window.getComputedStyle(
                            r.elements.popper.firstChild,
                          ).zIndex),
                        (e.zIndexWasSynced = !0);
                    }
                  },
                  effect: function () {
                    return function () {
                      e.zIndexWasSynced = !1;
                    };
                  },
                },
              ]),
              b = gn((0, i.Z)(n) ? this.triggerRef : n),
              x = (0, r.Z)({}, this.getPortalProps(), g);
            return w().createElement(
              Yt.Z,
              (0, r.Z)({}, x, {
                onClose: this.handleClose,
                onMount: this.handlePortalMount,
                onOpen: this.handleOpen,
                onUnmount: this.handlePortalUnmount,
                trigger: m,
                triggerRef: this.triggerRef,
              }),
              w().createElement(
                Ft,
                {
                  modifiers: y,
                  placement: un[p],
                  strategy: d ? 'fixed' : null,
                  referenceElement: b,
                },
                this.renderContent,
              ),
            );
          }),
          t
        );
      })(b.Component);
      (wn.handledProps = [
        'as',
        'basic',
        'children',
        'className',
        'content',
        'context',
        'disabled',
        'eventsEnabled',
        'flowing',
        'header',
        'hideOnScroll',
        'hoverable',
        'inverted',
        'offset',
        'on',
        'onClose',
        'onMount',
        'onOpen',
        'onUnmount',
        'pinned',
        'popper',
        'popperDependencies',
        'popperModifiers',
        'position',
        'positionFixed',
        'size',
        'style',
        'trigger',
        'wide',
      ]),
        (wn.propTypes = {}),
        (wn.defaultProps = {
          disabled: !1,
          eventsEnabled: !0,
          on: ['click', 'hover'],
          pinned: !1,
          popperModifiers: [],
          position: 'top left',
        }),
        (wn.Content = yn),
        (wn.Header = bn);
    },
  },
]);
