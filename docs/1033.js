(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [1033],
  {
    91033: function (t, e, n) {
      'use strict';
      n.r(e);
      var r = (function () {
          if ('undefined' !== typeof Map) return Map;
          function t(t, e) {
            var n = -1;
            return (
              t.some(function (t, r) {
                return t[0] === e && ((n = r), !0);
              }),
              n
            );
          }
          return (function () {
            function e() {
              this.__entries__ = [];
            }
            return (
              Object.defineProperty(e.prototype, 'size', {
                get: function () {
                  return this.__entries__.length;
                },
                enumerable: !0,
                configurable: !0,
              }),
              (e.prototype.get = function (e) {
                var n = t(this.__entries__, e),
                  r = this.__entries__[n];
                return r && r[1];
              }),
              (e.prototype.set = function (e, n) {
                var r = t(this.__entries__, e);
                ~r
                  ? (this.__entries__[r][1] = n)
                  : this.__entries__.push([e, n]);
              }),
              (e.prototype.delete = function (e) {
                var n = this.__entries__,
                  r = t(n, e);
                ~r && n.splice(r, 1);
              }),
              (e.prototype.has = function (e) {
                return !!~t(this.__entries__, e);
              }),
              (e.prototype.clear = function () {
                this.__entries__.splice(0);
              }),
              (e.prototype.forEach = function (t, e) {
                void 0 === e && (e = null);
                for (var n = 0, r = this.__entries__; n < r.length; n++) {
                  var i = r[n];
                  t.call(e, i[1], i[0]);
                }
              }),
              e
            );
          })();
        })(),
        i =
          'undefined' !== typeof window &&
          'undefined' !== typeof document &&
          window.document === document,
        o = (function () {
          return 'undefined' !== typeof n.g && n.g.Math === Math
            ? n.g
            : 'undefined' !== typeof self && self.Math === Math
            ? self
            : 'undefined' !== typeof window && window.Math === Math
            ? window
            : Function('return this')();
        })(),
        s = (function () {
          return 'function' === typeof requestAnimationFrame
            ? requestAnimationFrame.bind(o)
            : function (t) {
                return setTimeout(function () {
                  return t(Date.now());
                }, 1e3 / 60);
              };
        })(),
        c = 2;
      function a(t, e) {
        var n = !1,
          r = !1,
          i = 0;
        function o() {
          n && ((n = !1), t()), r && u();
        }
        function a() {
          s(o);
        }
        function u() {
          var t = Date.now();
          if (n) {
            if (t - i < c) return;
            r = !0;
          } else (n = !0), (r = !1), setTimeout(a, e);
          i = t;
        }
        return u;
      }
      var u = 20,
        h = [
          'top',
          'right',
          'bottom',
          'left',
          'width',
          'height',
          'size',
          'weight',
        ],
        f = 'undefined' !== typeof MutationObserver,
        d = (function () {
          function t() {
            (this.connected_ = !1),
              (this.mutationEventsAdded_ = !1),
              (this.mutationsObserver_ = null),
              (this.observers_ = []),
              (this.onTransitionEnd_ = this.onTransitionEnd_.bind(this)),
              (this.refresh = a(this.refresh.bind(this), u));
          }
          return (
            (t.prototype.addObserver = function (t) {
              ~this.observers_.indexOf(t) || this.observers_.push(t),
                this.connected_ || this.connect_();
            }),
            (t.prototype.removeObserver = function (t) {
              var e = this.observers_,
                n = e.indexOf(t);
              ~n && e.splice(n, 1),
                !e.length && this.connected_ && this.disconnect_();
            }),
            (t.prototype.refresh = function () {
              var t = this.updateObservers_();
              t && this.refresh();
            }),
            (t.prototype.updateObservers_ = function () {
              var t = this.observers_.filter(function (t) {
                return t.gatherActive(), t.hasActive();
              });
              return (
                t.forEach(function (t) {
                  return t.broadcastActive();
                }),
                t.length > 0
              );
            }),
            (t.prototype.connect_ = function () {
              i &&
                !this.connected_ &&
                (document.addEventListener(
                  'transitionend',
                  this.onTransitionEnd_,
                ),
                window.addEventListener('resize', this.refresh),
                f
                  ? ((this.mutationsObserver_ = new MutationObserver(
                      this.refresh,
                    )),
                    this.mutationsObserver_.observe(document, {
                      attributes: !0,
                      childList: !0,
                      characterData: !0,
                      subtree: !0,
                    }))
                  : (document.addEventListener(
                      'DOMSubtreeModified',
                      this.refresh,
                    ),
                    (this.mutationEventsAdded_ = !0)),
                (this.connected_ = !0));
            }),
            (t.prototype.disconnect_ = function () {
              i &&
                this.connected_ &&
                (document.removeEventListener(
                  'transitionend',
                  this.onTransitionEnd_,
                ),
                window.removeEventListener('resize', this.refresh),
                this.mutationsObserver_ && this.mutationsObserver_.disconnect(),
                this.mutationEventsAdded_ &&
                  document.removeEventListener(
                    'DOMSubtreeModified',
                    this.refresh,
                  ),
                (this.mutationsObserver_ = null),
                (this.mutationEventsAdded_ = !1),
                (this.connected_ = !1));
            }),
            (t.prototype.onTransitionEnd_ = function (t) {
              var e = t.propertyName,
                n = void 0 === e ? '' : e,
                r = h.some(function (t) {
                  return !!~n.indexOf(t);
                });
              r && this.refresh();
            }),
            (t.getInstance = function () {
              return (
                this.instance_ || (this.instance_ = new t()), this.instance_
              );
            }),
            (t.instance_ = null),
            t
          );
        })(),
        p = function (t, e) {
          for (var n = 0, r = Object.keys(e); n < r.length; n++) {
            var i = r[n];
            Object.defineProperty(t, i, {
              value: e[i],
              enumerable: !1,
              writable: !1,
              configurable: !0,
            });
          }
          return t;
        },
        v = function (t) {
          var e = t && t.ownerDocument && t.ownerDocument.defaultView;
          return e || o;
        },
        l = A(0, 0, 0, 0);
      function _(t) {
        return parseFloat(t) || 0;
      }
      function b(t) {
        for (var e = [], n = 1; n < arguments.length; n++)
          e[n - 1] = arguments[n];
        return e.reduce(function (e, n) {
          var r = t['border-' + n + '-width'];
          return e + _(r);
        }, 0);
      }
      function m(t) {
        for (
          var e = ['top', 'right', 'bottom', 'left'], n = {}, r = 0, i = e;
          r < i.length;
          r++
        ) {
          var o = i[r],
            s = t['padding-' + o];
          n[o] = _(s);
        }
        return n;
      }
      function y(t) {
        var e = t.getBBox();
        return A(0, 0, e.width, e.height);
      }
      function w(t) {
        var e = t.clientWidth,
          n = t.clientHeight;
        if (!e && !n) return l;
        var r = v(t).getComputedStyle(t),
          i = m(r),
          o = i.left + i.right,
          s = i.top + i.bottom,
          c = _(r.width),
          a = _(r.height);
        if (
          ('border-box' === r.boxSizing &&
            (Math.round(c + o) !== e && (c -= b(r, 'left', 'right') + o),
            Math.round(a + s) !== n && (a -= b(r, 'top', 'bottom') + s)),
          !E(t))
        ) {
          var u = Math.round(c + o) - e,
            h = Math.round(a + s) - n;
          1 !== Math.abs(u) && (c -= u), 1 !== Math.abs(h) && (a -= h);
        }
        return A(i.left, i.top, c, a);
      }
      var g = (function () {
        return 'undefined' !== typeof SVGGraphicsElement
          ? function (t) {
              return t instanceof v(t).SVGGraphicsElement;
            }
          : function (t) {
              return (
                t instanceof v(t).SVGElement && 'function' === typeof t.getBBox
              );
            };
      })();
      function E(t) {
        return t === v(t).document.documentElement;
      }
      function O(t) {
        return i ? (g(t) ? y(t) : w(t)) : l;
      }
      function M(t) {
        var e = t.x,
          n = t.y,
          r = t.width,
          i = t.height,
          o = 'undefined' !== typeof DOMRectReadOnly ? DOMRectReadOnly : Object,
          s = Object.create(o.prototype);
        return (
          p(s, {
            x: e,
            y: n,
            width: r,
            height: i,
            top: n,
            right: e + r,
            bottom: i + n,
            left: e,
          }),
          s
        );
      }
      function A(t, e, n, r) {
        return { x: t, y: e, width: n, height: r };
      }
      var T = (function () {
          function t(t) {
            (this.broadcastWidth = 0),
              (this.broadcastHeight = 0),
              (this.contentRect_ = A(0, 0, 0, 0)),
              (this.target = t);
          }
          return (
            (t.prototype.isActive = function () {
              var t = O(this.target);
              return (
                (this.contentRect_ = t),
                t.width !== this.broadcastWidth ||
                  t.height !== this.broadcastHeight
              );
            }),
            (t.prototype.broadcastRect = function () {
              var t = this.contentRect_;
              return (
                (this.broadcastWidth = t.width),
                (this.broadcastHeight = t.height),
                t
              );
            }),
            t
          );
        })(),
        k = (function () {
          function t(t, e) {
            var n = M(e);
            p(this, { target: t, contentRect: n });
          }
          return t;
        })(),
        x = (function () {
          function t(t, e, n) {
            if (
              ((this.activeObservations_ = []),
              (this.observations_ = new r()),
              'function' !== typeof t)
            )
              throw new TypeError(
                'The callback provided as parameter 1 is not a function.',
              );
            (this.callback_ = t),
              (this.controller_ = e),
              (this.callbackCtx_ = n);
          }
          return (
            (t.prototype.observe = function (t) {
              if (!arguments.length)
                throw new TypeError('1 argument required, but only 0 present.');
              if ('undefined' !== typeof Element && Element instanceof Object) {
                if (!(t instanceof v(t).Element))
                  throw new TypeError('parameter 1 is not of type "Element".');
                var e = this.observations_;
                e.has(t) ||
                  (e.set(t, new T(t)),
                  this.controller_.addObserver(this),
                  this.controller_.refresh());
              }
            }),
            (t.prototype.unobserve = function (t) {
              if (!arguments.length)
                throw new TypeError('1 argument required, but only 0 present.');
              if ('undefined' !== typeof Element && Element instanceof Object) {
                if (!(t instanceof v(t).Element))
                  throw new TypeError('parameter 1 is not of type "Element".');
                var e = this.observations_;
                e.has(t) &&
                  (e.delete(t),
                  e.size || this.controller_.removeObserver(this));
              }
            }),
            (t.prototype.disconnect = function () {
              this.clearActive(),
                this.observations_.clear(),
                this.controller_.removeObserver(this);
            }),
            (t.prototype.gatherActive = function () {
              var t = this;
              this.clearActive(),
                this.observations_.forEach(function (e) {
                  e.isActive() && t.activeObservations_.push(e);
                });
            }),
            (t.prototype.broadcastActive = function () {
              if (this.hasActive()) {
                var t = this.callbackCtx_,
                  e = this.activeObservations_.map(function (t) {
                    return new k(t.target, t.broadcastRect());
                  });
                this.callback_.call(t, e, t), this.clearActive();
              }
            }),
            (t.prototype.clearActive = function () {
              this.activeObservations_.splice(0);
            }),
            (t.prototype.hasActive = function () {
              return this.activeObservations_.length > 0;
            }),
            t
          );
        })(),
        R = 'undefined' !== typeof WeakMap ? new WeakMap() : new r(),
        D = (function () {
          function t(e) {
            if (!(this instanceof t))
              throw new TypeError('Cannot call a class as a function.');
            if (!arguments.length)
              throw new TypeError('1 argument required, but only 0 present.');
            var n = d.getInstance(),
              r = new x(e, n, this);
            R.set(this, r);
          }
          return t;
        })();
      ['observe', 'unobserve', 'disconnect'].forEach(function (t) {
        D.prototype[t] = function () {
          var e;
          return (e = R.get(this))[t].apply(e, arguments);
        };
      });
      var z = (function () {
        return 'undefined' !== typeof o.ResizeObserver ? o.ResizeObserver : D;
      })();
      e['default'] = z;
    },
  },
]);
