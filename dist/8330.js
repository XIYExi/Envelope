(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [8330],
  {
    60693: function (e, t, a) {
      var n = a(59713);
      function l(e) {
        for (var t = 1; t < arguments.length; t++) {
          var a = null != arguments[t] ? Object(arguments[t]) : {},
            l = Object.keys(a);
          'function' === typeof Object.getOwnPropertySymbols &&
            l.push.apply(
              l,
              Object.getOwnPropertySymbols(a).filter(function (e) {
                return Object.getOwnPropertyDescriptor(a, e).enumerable;
              }),
            ),
            l.forEach(function (t) {
              n(e, t, a[t]);
            });
        }
        return e;
      }
      (e.exports = l),
        (e.exports.__esModule = !0),
        (e.exports.default = e.exports);
    },
    45501: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(60693)),
        o = l(a(34575)),
        i = l(a(93913)),
        u = a(14890),
        d = l(a(99610)),
        s = n(a(52234)),
        c = n(a(38359)),
        f = (function () {
          function e(t) {
            (0, o['default'])(this, e),
              (this.store = t || (0, u.createStore)(d['default'])),
              (this.video = null),
              (this.rootElement = null);
          }
          return (
            (0, i['default'])(e, [
              {
                key: 'getActions',
                value: function () {
                  var e = this,
                    t = this.store.dispatch,
                    a = (0, r['default'])({}, s, c);
                  function n(a) {
                    return function () {
                      var n = a.apply(e, arguments);
                      'undefined' !== typeof n && t(n);
                    };
                  }
                  return Object.keys(a)
                    .filter(function (e) {
                      return 'function' === typeof a[e];
                    })
                    .reduce(function (e, t) {
                      return (e[t] = n(a[t])), e;
                    }, {});
                },
              },
              {
                key: 'getState',
                value: function () {
                  return this.store.getState();
                },
              },
              {
                key: 'subscribeToStateChange',
                value: function (e, t) {
                  t || (t = this.getState.bind(this));
                  var a = t(),
                    n = function () {
                      var n = t();
                      if (n !== a) {
                        var l = a;
                        (a = n), e(n, l);
                      }
                    };
                  return this.store.subscribe(n);
                },
              },
              {
                key: 'subscribeToOperationStateChange',
                value: function (e) {
                  var t = this;
                  return this.subscribeToStateChange(e, function () {
                    return t.getState().operation;
                  });
                },
              },
              {
                key: 'subscribeToPlayerStateChange',
                value: function (e) {
                  var t = this;
                  return this.subscribeToStateChange(e, function () {
                    return t.getState().player;
                  });
                },
              },
            ]),
            e
          );
        })();
      t.default = f;
    },
    52234: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.handleFullscreenChange = d),
        (t.activate = s),
        (t.userActivate = c),
        (t.play = f),
        (t.pause = h),
        (t.togglePlay = v),
        (t.seek = p),
        (t.forward = m),
        (t.replay = y),
        (t.changeRate = g),
        (t.changeVolume = k),
        (t.mute = b),
        (t.toggleFullscreen = E),
        (t.USER_ACTIVATE =
          t.PLAYER_ACTIVATE =
          t.FULLSCREEN_CHANGE =
          t.OPERATE =
            void 0);
      var l = n(a(3387)),
        r = 'video-react/OPERATE';
      t.OPERATE = r;
      var o = 'video-react/FULLSCREEN_CHANGE';
      t.FULLSCREEN_CHANGE = o;
      var i = 'video-react/PLAYER_ACTIVATE';
      t.PLAYER_ACTIVATE = i;
      var u = 'video-react/USER_ACTIVATE';
      function d(e) {
        return { type: o, isFullscreen: e };
      }
      function s(e) {
        return { type: i, activity: e };
      }
      function c(e) {
        return { type: u, activity: e };
      }
      function f() {
        var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : { action: 'play', source: '' };
        return this.video.play(), { type: r, operation: e };
      }
      function h() {
        var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : { action: 'pause', source: '' };
        return this.video.pause(), { type: r, operation: e };
      }
      function v() {
        var e =
          arguments.length > 0 && void 0 !== arguments[0]
            ? arguments[0]
            : { action: 'toggle-play', source: '' };
        return this.video.togglePlay(), { type: r, operation: e };
      }
      function p(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : { action: 'seek', source: '' };
        return this.video.seek(e), { type: r, operation: t };
      }
      function m(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : { action: 'forward-'.concat(e), source: '' };
        return this.video.forward(e), { type: r, operation: t };
      }
      function y(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : { action: 'replay-'.concat(e), source: '' };
        return this.video.replay(e), { type: r, operation: t };
      }
      function g(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : { action: 'change-rate', source: '' };
        return (this.video.playbackRate = e), { type: r, operation: t };
      }
      function k(e) {
        var t =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : { action: 'change-volume', source: '' },
          a = e;
        return (
          e < 0 && (a = 0),
          e > 1 && (a = 1),
          (this.video.volume = a),
          { type: r, operation: t }
        );
      }
      function b(e) {
        var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : { action: e ? 'muted' : 'unmuted', source: '' };
        return (this.video.muted = e), { type: r, operation: t };
      }
      function E(e) {
        return l['default'].enabled
          ? (l['default'].isFullscreen
              ? l['default'].exit()
              : l['default'].request(this.rootElement),
            { type: r, operation: { action: 'toggle-fullscreen', source: '' } })
          : { type: o, isFullscreen: !e.isFullscreen };
      }
      t.USER_ACTIVATE = u;
    },
    38359: function (e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.handleLoadStart = A),
        (t.handleCanPlay = _),
        (t.handleWaiting = w),
        (t.handleCanPlayThrough = D),
        (t.handlePlaying = I),
        (t.handlePlay = R),
        (t.handlePause = O),
        (t.handleEnd = F),
        (t.handleSeeking = L),
        (t.handleSeeked = x),
        (t.handleDurationChange = j),
        (t.handleTimeUpdate = B),
        (t.handleVolumeChange = U),
        (t.handleProgressChange = K),
        (t.handleRateChange = H),
        (t.handleSuspend = G),
        (t.handleAbort = V),
        (t.handleEmptied = W),
        (t.handleStalled = z),
        (t.handleLoadedMetaData = Y),
        (t.handleLoadedData = q),
        (t.handleResize = X),
        (t.handleError = Z),
        (t.handleSeekingTime = J),
        (t.handleEndSeeking = Q),
        (t.activateTextTrack = $),
        (t.ACTIVATE_TEXT_TRACK =
          t.ERROR =
          t.RESIZE =
          t.LOADED_DATA =
          t.LOADED_META_DATA =
          t.STALLED =
          t.EMPTIED =
          t.ABORT =
          t.SUSPEND =
          t.RATE_CHANGE =
          t.PROGRESS_CHANGE =
          t.VOLUME_CHANGE =
          t.TIME_UPDATE =
          t.DURATION_CHANGE =
          t.END_SEEKING =
          t.SEEKING_TIME =
          t.SEEKED =
          t.SEEKING =
          t.END =
          t.PAUSE =
          t.PLAY =
          t.PLAYING =
          t.CAN_PLAY_THROUGH =
          t.WAITING =
          t.CAN_PLAY =
          t.LOAD_START =
            void 0);
      var a = 'video-react/LOAD_START';
      t.LOAD_START = a;
      var n = 'video-react/CAN_PLAY';
      t.CAN_PLAY = n;
      var l = 'video-react/WAITING';
      t.WAITING = l;
      var r = 'video-react/CAN_PLAY_THROUGH';
      t.CAN_PLAY_THROUGH = r;
      var o = 'video-react/PLAYING';
      t.PLAYING = o;
      var i = 'video-react/PLAY';
      t.PLAY = i;
      var u = 'video-react/PAUSE';
      t.PAUSE = u;
      var d = 'video-react/END';
      t.END = d;
      var s = 'video-react/SEEKING';
      t.SEEKING = s;
      var c = 'video-react/SEEKED';
      t.SEEKED = c;
      var f = 'video-react/SEEKING_TIME';
      t.SEEKING_TIME = f;
      var h = 'video-react/END_SEEKING';
      t.END_SEEKING = h;
      var v = 'video-react/DURATION_CHANGE';
      t.DURATION_CHANGE = v;
      var p = 'video-react/TIME_UPDATE';
      t.TIME_UPDATE = p;
      var m = 'video-react/VOLUME_CHANGE';
      t.VOLUME_CHANGE = m;
      var y = 'video-react/PROGRESS_CHANGE';
      t.PROGRESS_CHANGE = y;
      var g = 'video-react/RATE_CHANGE';
      t.RATE_CHANGE = g;
      var k = 'video-react/SUSPEND';
      t.SUSPEND = k;
      var b = 'video-react/ABORT';
      t.ABORT = b;
      var E = 'video-react/EMPTIED';
      t.EMPTIED = E;
      var C = 'video-react/STALLED';
      t.STALLED = C;
      var P = 'video-react/LOADED_META_DATA';
      t.LOADED_META_DATA = P;
      var T = 'video-react/LOADED_DATA';
      t.LOADED_DATA = T;
      var S = 'video-react/RESIZE';
      t.RESIZE = S;
      var N = 'video-react/ERROR';
      t.ERROR = N;
      var M = 'video-react/ACTIVATE_TEXT_TRACK';
      function A(e) {
        return { type: a, videoProps: e };
      }
      function _(e) {
        return { type: n, videoProps: e };
      }
      function w(e) {
        return { type: l, videoProps: e };
      }
      function D(e) {
        return { type: r, videoProps: e };
      }
      function I(e) {
        return { type: o, videoProps: e };
      }
      function R(e) {
        return { type: i, videoProps: e };
      }
      function O(e) {
        return { type: u, videoProps: e };
      }
      function F(e) {
        return { type: d, videoProps: e };
      }
      function L(e) {
        return { type: s, videoProps: e };
      }
      function x(e) {
        return { type: c, videoProps: e };
      }
      function j(e) {
        return { type: v, videoProps: e };
      }
      function B(e) {
        return { type: p, videoProps: e };
      }
      function U(e) {
        return { type: m, videoProps: e };
      }
      function K(e) {
        return { type: y, videoProps: e };
      }
      function H(e) {
        return { type: g, videoProps: e };
      }
      function G(e) {
        return { type: k, videoProps: e };
      }
      function V(e) {
        return { type: b, videoProps: e };
      }
      function W(e) {
        return { type: E, videoProps: e };
      }
      function z(e) {
        return { type: C, videoProps: e };
      }
      function Y(e) {
        return { type: P, videoProps: e };
      }
      function q(e) {
        return { type: T, videoProps: e };
      }
      function X(e) {
        return { type: S, videoProps: e };
      }
      function Z(e) {
        return { type: N, videoProps: e };
      }
      function J(e) {
        return { type: f, time: e };
      }
      function Q(e) {
        return { type: h, time: e };
      }
      function $(e) {
        return { type: M, textTrack: e };
      }
      t.ACTIVATE_TEXT_TRACK = M;
    },
    77423: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = { manager: c['default'].object, className: c['default'].string },
        p = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.timer = null),
              e.manager.subscribeToOperationStateChange(
                n.handleStateChange.bind((0, d['default'])(n)),
              ),
              (n.state = { hidden: !0, operation: {} }),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'handleStateChange',
                value: function (e, t) {
                  var a = this;
                  e.count !== t.count &&
                    'shortcut' === e.operation.source &&
                    (this.timer &&
                      (clearTimeout(this.timer), (this.timer = null)),
                    this.setState({
                      hidden: !1,
                      count: e.count,
                      operation: e.operation,
                    }),
                    (this.timer = setTimeout(function () {
                      a.setState({ hidden: !0 }), (a.timer = null);
                    }, 500)));
                },
              },
              {
                key: 'render',
                value: function () {
                  if ('shortcut' !== this.state.operation.source) return null;
                  var e = this.state.hidden ? { display: 'none' } : null;
                  return f['default'].createElement(
                    'div',
                    {
                      className: (0, h['default'])(
                        {
                          'video-react-bezel': !0,
                          'video-react-bezel-animation':
                            this.state.count % 2 === 0,
                          'video-react-bezel-animation-alt':
                            this.state.count % 2 === 1,
                        },
                        this.props.className,
                      ),
                      style: e,
                      role: 'status',
                      'aria-label': this.state.operation.action,
                    },
                    f['default'].createElement('div', {
                      className: (0, h['default'])(
                        'video-react-bezel-icon',
                        'video-react-bezel-icon-'.concat(
                          this.state.operation.action,
                        ),
                      ),
                    }),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = p), (p.propTypes = v), (p.displayName = 'Bezel');
    },
    1638: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = {
          actions: c['default'].object,
          player: c['default'].object,
          position: c['default'].string,
          className: c['default'].string,
        },
        p = { position: 'left' },
        m = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.handleClick = n.handleClick.bind((0, d['default'])(n))),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              { key: 'componentDidMount', value: function () {} },
              {
                key: 'handleClick',
                value: function () {
                  var e = this.props.actions;
                  e.play();
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    t = e.player,
                    a = e.position;
                  return f['default'].createElement(
                    'button',
                    {
                      className: (0, h['default'])(
                        'video-react-big-play-button',
                        'video-react-big-play-button-'.concat(a),
                        this.props.className,
                        {
                          'big-play-button-hide': t.hasStarted || !t.currentSrc,
                        },
                      ),
                      type: 'button',
                      'aria-live': 'polite',
                      tabIndex: '0',
                      onClick: this.handleClick,
                    },
                    f['default'].createElement(
                      'span',
                      { className: 'video-react-control-text' },
                      'Play Video',
                    ),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = m),
        (m.propTypes = v),
        (m.defaultProps = p),
        (m.displayName = 'BigPlayButton');
    },
    17191: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(67154)),
        o = l(a(60693)),
        i = l(a(34575)),
        u = l(a(93913)),
        d = l(a(78585)),
        s = l(a(29754)),
        c = l(a(81506)),
        f = l(a(2205)),
        h = l(a(55301)),
        v = n(a(12924)),
        p = l(a(94184)),
        m = {
          tagName: h['default'].string,
          onClick: h['default'].func.isRequired,
          onFocus: h['default'].func,
          onBlur: h['default'].func,
          className: h['default'].string,
        },
        y = { tagName: 'div' },
        g = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, i['default'])(this, t),
              (n = (0, d['default'])(
                this,
                (0, s['default'])(t).call(this, e, a),
              )),
              (n.handleClick = n.handleClick.bind((0, c['default'])(n))),
              (n.handleFocus = n.handleFocus.bind((0, c['default'])(n))),
              (n.handleBlur = n.handleBlur.bind((0, c['default'])(n))),
              (n.handleKeypress = n.handleKeypress.bind((0, c['default'])(n))),
              n
            );
          }
          return (
            (0, f['default'])(t, e),
            (0, u['default'])(t, [
              {
                key: 'handleKeypress',
                value: function (e) {
                  (32 !== e.which && 13 !== e.which) ||
                    (e.preventDefault(), this.handleClick(e));
                },
              },
              {
                key: 'handleClick',
                value: function (e) {
                  var t = this.props.onClick;
                  t(e);
                },
              },
              {
                key: 'handleFocus',
                value: function (e) {
                  document.addEventListener('keydown', this.handleKeypress),
                    this.props.onFocus && this.props.onFocus(e);
                },
              },
              {
                key: 'handleBlur',
                value: function (e) {
                  document.removeEventListener('keydown', this.handleKeypress),
                    this.props.onBlur && this.props.onBlur(e);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props.tagName,
                    t = (0, o['default'])({}, this.props);
                  return (
                    delete t.tagName,
                    delete t.className,
                    v['default'].createElement(
                      e,
                      (0, r['default'])(
                        {
                          className: (0, p['default'])(this.props.className),
                          role: 'button',
                          tabIndex: '0',
                          onClick: this.handleClick,
                          onFocus: this.handleFocus,
                          onBlur: this.handleBlur,
                        },
                        t,
                      ),
                    )
                  );
                },
              },
            ]),
            t
          );
        })(v.Component);
      (t.default = g),
        (g.propTypes = m),
        (g.defaultProps = y),
        (g.displayName = 'ClickableComponent');
    },
    6238: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = u);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = { player: l['default'].object, className: l['default'].string };
      function u(e) {
        var t = e.player,
          a = e.className;
        return t.error
          ? null
          : r['default'].createElement('div', {
              className: (0, o['default'])('video-react-loading-spinner', a),
            });
      }
      (u.propTypes = i), (u.displayName = 'LoadingSpinner');
    },
    97617: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(60693)),
        o = l(a(59713)),
        i = l(a(6479)),
        u = l(a(34575)),
        d = l(a(93913)),
        s = l(a(78585)),
        c = l(a(29754)),
        f = l(a(81506)),
        h = l(a(2205)),
        v = l(a(55301)),
        p = n(a(12924)),
        m = l(a(94184)),
        y = l(a(45501)),
        g = l(a(1638)),
        k = l(a(6238)),
        b = l(a(78814)),
        E = l(a(20122)),
        C = l(a(77423)),
        P = l(a(19097)),
        T = l(a(7473)),
        S = n(a(87152)),
        N = a(6021),
        M = a(43453),
        A = l(a(3387)),
        _ = {
          children: v['default'].any,
          width: v['default'].oneOfType([
            v['default'].string,
            v['default'].number,
          ]),
          height: v['default'].oneOfType([
            v['default'].string,
            v['default'].number,
          ]),
          fluid: v['default'].bool,
          muted: v['default'].bool,
          playsInline: v['default'].bool,
          aspectRatio: v['default'].string,
          className: v['default'].string,
          videoId: v['default'].string,
          startTime: v['default'].number,
          loop: v['default'].bool,
          autoPlay: v['default'].bool,
          src: v['default'].string,
          poster: v['default'].string,
          preload: v['default'].oneOf(['auto', 'metadata', 'none']),
          onLoadStart: v['default'].func,
          onWaiting: v['default'].func,
          onCanPlay: v['default'].func,
          onCanPlayThrough: v['default'].func,
          onPlaying: v['default'].func,
          onEnded: v['default'].func,
          onSeeking: v['default'].func,
          onSeeked: v['default'].func,
          onPlay: v['default'].func,
          onPause: v['default'].func,
          onProgress: v['default'].func,
          onDurationChange: v['default'].func,
          onError: v['default'].func,
          onSuspend: v['default'].func,
          onAbort: v['default'].func,
          onEmptied: v['default'].func,
          onStalled: v['default'].func,
          onLoadedMetadata: v['default'].func,
          onLoadedData: v['default'].func,
          onTimeUpdate: v['default'].func,
          onRateChange: v['default'].func,
          onVolumeChange: v['default'].func,
          store: v['default'].object,
        },
        w = {
          fluid: !0,
          muted: !1,
          playsInline: !1,
          preload: 'auto',
          aspectRatio: 'auto',
        },
        D = (function (e) {
          function t(e) {
            var a;
            return (
              (0, u['default'])(this, t),
              (a = (0, s['default'])(this, (0, c['default'])(t).call(this, e))),
              (a.controlsHideTimer = null),
              (a.video = null),
              (a.manager = new y['default'](e.store)),
              (a.actions = a.manager.getActions()),
              a.manager.subscribeToPlayerStateChange(
                a.handleStateChange.bind((0, f['default'])(a)),
              ),
              (a.getStyle = a.getStyle.bind((0, f['default'])(a))),
              (a.handleResize = a.handleResize.bind((0, f['default'])(a))),
              (a.getChildren = a.getChildren.bind((0, f['default'])(a))),
              (a.handleMouseMove = (0, M.throttle)(
                a.handleMouseMove.bind((0, f['default'])(a)),
                250,
              )),
              (a.handleMouseDown = a.handleMouseDown.bind(
                (0, f['default'])(a),
              )),
              (a.startControlsTimer = a.startControlsTimer.bind(
                (0, f['default'])(a),
              )),
              (a.handleFullScreenChange = a.handleFullScreenChange.bind(
                (0, f['default'])(a),
              )),
              (a.handleKeyDown = a.handleKeyDown.bind((0, f['default'])(a))),
              (a.handleFocus = a.handleFocus.bind((0, f['default'])(a))),
              (a.handleBlur = a.handleBlur.bind((0, f['default'])(a))),
              a
            );
          }
          return (
            (0, h['default'])(t, e),
            (0, d['default'])(t, [
              {
                key: 'componentDidMount',
                value: function () {
                  this.handleResize(),
                    window.addEventListener('resize', this.handleResize),
                    A['default'].addEventListener(this.handleFullScreenChange);
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  window.removeEventListener('resize', this.handleResize),
                    A['default'].removeEventListener(
                      this.handleFullScreenChange,
                    ),
                    this.controlsHideTimer &&
                      window.clearTimeout(this.controlsHideTimer);
                },
              },
              {
                key: 'getDefaultChildren',
                value: function (e) {
                  var t = this;
                  return [
                    p['default'].createElement(
                      E['default'],
                      {
                        ref: function (e) {
                          (t.video = e), (t.manager.video = t.video);
                        },
                        key: 'video',
                        order: 0,
                      },
                      e,
                    ),
                    p['default'].createElement(b['default'], {
                      key: 'poster-image',
                      order: 1,
                    }),
                    p['default'].createElement(k['default'], {
                      key: 'loading-spinner',
                      order: 2,
                    }),
                    p['default'].createElement(C['default'], {
                      key: 'bezel',
                      order: 3,
                    }),
                    p['default'].createElement(g['default'], {
                      key: 'big-play-button',
                      order: 4,
                    }),
                    p['default'].createElement(T['default'], {
                      key: 'control-bar',
                      order: 5,
                    }),
                    p['default'].createElement(P['default'], {
                      key: 'shortcut',
                      order: 99,
                    }),
                  ];
                },
              },
              {
                key: 'getChildren',
                value: function (e) {
                  e.className;
                  var t = e.children,
                    a = (0, i['default'])(e, ['className', 'children']),
                    n = p['default'].Children.toArray(
                      this.props.children,
                    ).filter(function (e) {
                      return !(0, M.isVideoChild)(e);
                    }),
                    l = this.getDefaultChildren(t);
                  return (0, M.mergeAndSortChildren)(l, n, a);
                },
              },
              {
                key: 'setWidthOrHeight',
                value: function (e, t, a) {
                  var n;
                  'string' === typeof a
                    ? 'auto' === a
                      ? (n = 'auto')
                      : a.match(/\d+%/) && (n = a)
                    : 'number' === typeof a && (n = ''.concat(a, 'px')),
                    Object.assign(e, (0, o['default'])({}, t, n));
                },
              },
              {
                key: 'getStyle',
                value: function () {
                  var e,
                    t,
                    a,
                    n = this.props,
                    l = n.fluid,
                    r = n.aspectRatio,
                    o = n.height,
                    i = n.width,
                    u = this.manager.getState(),
                    d = u.player,
                    s = {};
                  a =
                    void 0 !== r && 'auto' !== r
                      ? r
                      : d.videoWidth
                      ? ''.concat(d.videoWidth, ':').concat(d.videoHeight)
                      : '16:9';
                  var c = a.split(':'),
                    f = c[1] / c[0];
                  return (
                    (e =
                      void 0 !== i
                        ? i
                        : void 0 !== o
                        ? o / f
                        : d.videoWidth || 400),
                    (t = void 0 !== o ? o : e * f),
                    l
                      ? (s.paddingTop = ''.concat(100 * f, '%'))
                      : (this.setWidthOrHeight(s, 'width', e),
                        this.setWidthOrHeight(s, 'height', t)),
                    s
                  );
                },
              },
              {
                key: 'getState',
                value: function () {
                  return this.manager.getState();
                },
              },
              {
                key: 'play',
                value: function () {
                  this.video.play();
                },
              },
              {
                key: 'pause',
                value: function () {
                  this.video.pause();
                },
              },
              {
                key: 'load',
                value: function () {
                  this.video.load();
                },
              },
              {
                key: 'addTextTrack',
                value: function () {
                  var e;
                  (e = this.video).addTextTrack.apply(e, arguments);
                },
              },
              {
                key: 'canPlayType',
                value: function () {
                  var e;
                  (e = this.video).canPlayType.apply(e, arguments);
                },
              },
              {
                key: 'seek',
                value: function (e) {
                  this.video.seek(e);
                },
              },
              {
                key: 'forward',
                value: function (e) {
                  this.video.forward(e);
                },
              },
              {
                key: 'replay',
                value: function (e) {
                  this.video.replay(e);
                },
              },
              {
                key: 'toggleFullscreen',
                value: function () {
                  this.video.toggleFullscreen();
                },
              },
              {
                key: 'subscribeToStateChange',
                value: function (e) {
                  return this.manager.subscribeToPlayerStateChange(e);
                },
              },
              { key: 'handleResize', value: function () {} },
              {
                key: 'handleFullScreenChange',
                value: function (e) {
                  e.target === this.manager.rootElement &&
                    this.actions.handleFullscreenChange(
                      A['default'].isFullscreen,
                    );
                },
              },
              {
                key: 'handleMouseDown',
                value: function () {
                  this.startControlsTimer();
                },
              },
              {
                key: 'handleMouseMove',
                value: function () {
                  this.startControlsTimer();
                },
              },
              {
                key: 'handleKeyDown',
                value: function () {
                  this.startControlsTimer();
                },
              },
              {
                key: 'startControlsTimer',
                value: function () {
                  var e = this,
                    t = 3e3;
                  p['default'].Children.forEach(
                    this.props.children,
                    function (e) {
                      if (
                        p['default'].isValidElement(e) &&
                        e.type === T['default']
                      ) {
                        var a = e.props.autoHideTime;
                        'number' === typeof a && (t = a);
                      }
                    },
                  ),
                    this.actions.userActivate(!0),
                    clearTimeout(this.controlsHideTimer),
                    (this.controlsHideTimer = setTimeout(function () {
                      e.actions.userActivate(!1);
                    }, t));
                },
              },
              {
                key: 'handleStateChange',
                value: function (e, t) {
                  e.isFullscreen !== t.isFullscreen &&
                    (this.handleResize(),
                    (0, N.focusNode)(this.manager.rootElement)),
                    this.forceUpdate();
                },
              },
              {
                key: 'handleFocus',
                value: function () {
                  this.actions.activate(!0);
                },
              },
              {
                key: 'handleBlur',
                value: function () {
                  this.actions.activate(!1);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.props.fluid,
                    a = this.manager.getState(),
                    n = a.player,
                    l = n.paused,
                    o = n.hasStarted,
                    i = n.waiting,
                    u = n.seeking,
                    d = n.isFullscreen,
                    s = n.userActivity,
                    c = (0, r['default'])({}, this.props, {
                      player: n,
                      actions: this.actions,
                      manager: this.manager,
                      store: this.manager.store,
                      video: this.video ? this.video.video : null,
                    }),
                    f = this.getChildren(c);
                  return p['default'].createElement(
                    'div',
                    {
                      className: (0, m['default'])(
                        {
                          'video-react-controls-enabled': !0,
                          'video-react-has-started': o,
                          'video-react-paused': l,
                          'video-react-playing': !l,
                          'video-react-waiting': i,
                          'video-react-seeking': u,
                          'video-react-fluid': t,
                          'video-react-fullscreen': d,
                          'video-react-user-inactive': !s,
                          'video-react-user-active': s,
                          'video-react-workinghover': !S.IS_IOS,
                        },
                        'video-react',
                        this.props.className,
                      ),
                      style: this.getStyle(),
                      ref: function (t) {
                        e.manager.rootElement = t;
                      },
                      role: 'region',
                      onTouchStart: this.handleMouseDown,
                      onMouseDown: this.handleMouseDown,
                      onTouchMove: this.handleMouseMove,
                      onMouseMove: this.handleMouseMove,
                      onKeyDown: this.handleKeyDown,
                      onFocus: this.handleFocus,
                      onBlur: this.handleBlur,
                      tabIndex: '-1',
                    },
                    f,
                  );
                },
              },
              {
                key: 'playbackRate',
                get: function () {
                  return this.video.playbackRate;
                },
                set: function (e) {
                  this.video.playbackRate = e;
                },
              },
              {
                key: 'muted',
                get: function () {
                  return this.video.muted;
                },
                set: function (e) {
                  this.video.muted = e;
                },
              },
              {
                key: 'volume',
                get: function () {
                  return this.video.volume;
                },
                set: function (e) {
                  this.video.volume = e;
                },
              },
              {
                key: 'videoWidth',
                get: function () {
                  return this.video.videoWidth;
                },
              },
              {
                key: 'videoHeight',
                get: function () {
                  return this.video.videoHeight;
                },
              },
            ]),
            t
          );
        })(p.Component);
      (t.default = D),
        (D.contextTypes = { store: v['default'].object }),
        (D.propTypes = _),
        (D.defaultProps = w),
        (D.displayName = 'Player');
    },
    78814: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = {
          poster: l['default'].string,
          player: l['default'].object,
          actions: l['default'].object,
          className: l['default'].string,
        };
      function u(e) {
        var t = e.poster,
          a = e.player,
          n = e.actions,
          l = e.className;
        return !t || a.hasStarted
          ? null
          : r['default'].createElement('div', {
              className: (0, o['default'])('video-react-poster', l),
              style: { backgroundImage: 'url("'.concat(t, '")') },
              onClick: function () {
                a.paused && n.play();
              },
            });
      }
      (u.propTypes = i), (u.displayName = 'PosterImage');
      var d = u;
      t.default = d;
    },
    19097: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(59713)),
        r = n(a(319)),
        o = n(a(34575)),
        i = n(a(93913)),
        u = n(a(78585)),
        d = n(a(29754)),
        s = n(a(81506)),
        c = n(a(2205)),
        f = a(12924),
        h = n(a(55301)),
        v = a(6021),
        p = {
          clickable: h['default'].bool,
          dblclickable: h['default'].bool,
          manager: h['default'].object,
          actions: h['default'].object,
          player: h['default'].object,
          shortcuts: h['default'].array,
        },
        m = { clickable: !0, dblclickable: !0 },
        y = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, o['default'])(this, t),
              (n = (0, u['default'])(
                this,
                (0, d['default'])(t).call(this, e, a),
              )),
              (n.defaultShortcuts = [
                { keyCode: 32, handle: n.togglePlay },
                { keyCode: 75, handle: n.togglePlay },
                { keyCode: 70, handle: n.toggleFullscreen },
                {
                  keyCode: 37,
                  handle: function (e, t) {
                    e.hasStarted &&
                      t.replay(5, { action: 'replay-5', source: 'shortcut' });
                  },
                },
                {
                  keyCode: 74,
                  handle: function (e, t) {
                    e.hasStarted &&
                      t.replay(10, { action: 'replay-10', source: 'shortcut' });
                  },
                },
                {
                  keyCode: 39,
                  handle: function (e, t) {
                    e.hasStarted &&
                      t.forward(5, { action: 'forward-5', source: 'shortcut' });
                  },
                },
                {
                  keyCode: 76,
                  handle: function (e, t) {
                    e.hasStarted &&
                      t.forward(10, {
                        action: 'forward-10',
                        source: 'shortcut',
                      });
                  },
                },
                {
                  keyCode: 36,
                  handle: function (e, t) {
                    e.hasStarted && t.seek(0);
                  },
                },
                {
                  keyCode: 35,
                  handle: function (e, t) {
                    e.hasStarted && t.seek(e.duration);
                  },
                },
                {
                  keyCode: 38,
                  handle: function (e, t) {
                    var a = e.volume + 0.05;
                    a > 1 && (a = 1),
                      t.changeVolume(a, {
                        action: 'volume-up',
                        source: 'shortcut',
                      });
                  },
                },
                {
                  keyCode: 40,
                  handle: function (e, t) {
                    var a = e.volume - 0.05;
                    a < 0 && (a = 0);
                    var n = a > 0 ? 'volume-down' : 'volume-off';
                    t.changeVolume(a, { action: n, source: 'shortcut' });
                  },
                },
                {
                  keyCode: 190,
                  shift: !0,
                  handle: function (e, t) {
                    var a = e.playbackRate;
                    a >= 1.5
                      ? (a = 2)
                      : a >= 1.25
                      ? (a = 1.5)
                      : a >= 1
                      ? (a = 1.25)
                      : a >= 0.5
                      ? (a = 1)
                      : a >= 0.25
                      ? (a = 0.5)
                      : a >= 0 && (a = 0.25),
                      t.changeRate(a, {
                        action: 'fast-forward',
                        source: 'shortcut',
                      });
                  },
                },
                {
                  keyCode: 188,
                  shift: !0,
                  handle: function (e, t) {
                    var a = e.playbackRate;
                    a <= 0.5
                      ? (a = 0.25)
                      : a <= 1
                      ? (a = 0.5)
                      : a <= 1.25
                      ? (a = 1)
                      : a <= 1.5
                      ? (a = 1.25)
                      : a <= 2 && (a = 1.5),
                      t.changeRate(a, {
                        action: 'fast-rewind',
                        source: 'shortcut',
                      });
                  },
                },
              ]),
              (n.shortcuts = (0, r['default'])(n.defaultShortcuts)),
              (n.mergeShortcuts = n.mergeShortcuts.bind((0, s['default'])(n))),
              (n.handleKeyPress = n.handleKeyPress.bind((0, s['default'])(n))),
              (n.handleClick = n.handleClick.bind((0, s['default'])(n))),
              (n.handleDoubleClick = n.handleDoubleClick.bind(
                (0, s['default'])(n),
              )),
              n
            );
          }
          return (
            (0, c['default'])(t, e),
            (0, i['default'])(t, [
              {
                key: 'componentDidMount',
                value: function () {
                  this.mergeShortcuts(),
                    document.addEventListener('keydown', this.handleKeyPress),
                    document.addEventListener('click', this.handleClick),
                    document.addEventListener(
                      'dblclick',
                      this.handleDoubleClick,
                    );
                },
              },
              {
                key: 'componentDidUpdate',
                value: function (e) {
                  e.shortcuts !== this.props.shortcuts && this.mergeShortcuts();
                },
              },
              {
                key: 'componentWillUnmount',
                value: function () {
                  document.removeEventListener('keydown', this.handleKeyPress),
                    document.removeEventListener('click', this.handleClick),
                    document.removeEventListener(
                      'dblclick',
                      this.handleDoubleClick,
                    );
                },
              },
              {
                key: 'mergeShortcuts',
                value: function () {
                  var e = function (e) {
                      var t = e.keyCode,
                        a = void 0 === t ? 0 : t,
                        n = e.ctrl,
                        l = void 0 !== n && n,
                        r = e.shift,
                        o = void 0 !== r && r,
                        i = e.alt,
                        u = void 0 !== i && i;
                      return ''
                        .concat(a, ':')
                        .concat(l, ':')
                        .concat(o, ':')
                        .concat(u);
                    },
                    t = this.defaultShortcuts.reduce(function (t, a) {
                      return Object.assign(t, (0, l['default'])({}, e(a), a));
                    }, {}),
                    a = (this.props.shortcuts || []).reduce(function (t, a) {
                      var n = a.keyCode,
                        r = a.handle;
                      return n && 'function' === typeof r
                        ? Object.assign(t, (0, l['default'])({}, e(a), a))
                        : t;
                    }, t),
                    n = function (e) {
                      var t = 0,
                        a = ['ctrl', 'shift', 'alt'];
                      return (
                        a.forEach(function (a) {
                          e[a] && t++;
                        }),
                        t
                      );
                    };
                  this.shortcuts = Object.keys(a)
                    .map(function (e) {
                      return a[e];
                    })
                    .sort(function (e, t) {
                      return n(t) - n(e);
                    });
                },
              },
              {
                key: 'togglePlay',
                value: function (e, t) {
                  e.paused
                    ? t.play({ action: 'play', source: 'shortcut' })
                    : t.pause({ action: 'pause', source: 'shortcut' });
                },
              },
              {
                key: 'toggleFullscreen',
                value: function (e, t) {
                  t.toggleFullscreen(e);
                },
              },
              {
                key: 'handleKeyPress',
                value: function (e) {
                  var t = this.props,
                    a = t.player,
                    n = t.actions;
                  if (
                    a.isActive &&
                    (!document.activeElement ||
                      !(
                        (0, v.hasClass)(
                          document.activeElement,
                          'video-react-control',
                        ) ||
                        (0, v.hasClass)(
                          document.activeElement,
                          'video-react-menu-button-active',
                        ) ||
                        (0, v.hasClass)(
                          document.activeElement,
                          'video-react-big-play-button',
                        )
                      ))
                  ) {
                    var l = e.keyCode || e.which,
                      r = e.ctrlKey || e.metaKey,
                      o = e.shiftKey,
                      i = e.altKey,
                      u = this.shortcuts.filter(function (e) {
                        return (
                          !(!e.keyCode || e.keyCode - l !== 0) &&
                          !(
                            (void 0 !== e.ctrl && e.ctrl !== r) ||
                            (void 0 !== e.shift && e.shift !== o) ||
                            (void 0 !== e.alt && e.alt !== i)
                          )
                        );
                      })[0];
                    u && (u.handle(a, n), e.preventDefault());
                  }
                },
              },
              {
                key: 'canBeClicked',
                value: function (e, t) {
                  return !(
                    !e.isActive ||
                    'VIDEO' !== t.target.nodeName ||
                    4 !== e.readyState
                  );
                },
              },
              {
                key: 'handleClick',
                value: function (e) {
                  var t = this.props,
                    a = t.player,
                    n = t.actions,
                    l = t.clickable;
                  this.canBeClicked(a, e) && l && this.togglePlay(a, n);
                },
              },
              {
                key: 'handleDoubleClick',
                value: function (e) {
                  var t = this.props,
                    a = t.player,
                    n = t.actions,
                    l = t.dblclickable;
                  this.canBeClicked(a, e) && l && this.toggleFullscreen(a, n);
                },
              },
              {
                key: 'render',
                value: function () {
                  return null;
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = y),
        (y.propTypes = p),
        (y.defaultProps = m),
        (y.displayName = 'Shortcut');
    },
    21303: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = n(a(6021)),
        p = {
          className: c['default'].string,
          onMouseDown: c['default'].func,
          onMouseMove: c['default'].func,
          stepForward: c['default'].func,
          stepBack: c['default'].func,
          sliderActive: c['default'].func,
          sliderInactive: c['default'].func,
          onMouseUp: c['default'].func,
          onFocus: c['default'].func,
          onBlur: c['default'].func,
          onClick: c['default'].func,
          getPercent: c['default'].func,
          vertical: c['default'].bool,
          children: c['default'].node,
          label: c['default'].string,
          valuenow: c['default'].string,
          valuetext: c['default'].string,
        },
        m = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.handleMouseDown = n.handleMouseDown.bind(
                (0, d['default'])(n),
              )),
              (n.handleMouseMove = n.handleMouseMove.bind(
                (0, d['default'])(n),
              )),
              (n.handleMouseUp = n.handleMouseUp.bind((0, d['default'])(n))),
              (n.handleFocus = n.handleFocus.bind((0, d['default'])(n))),
              (n.handleBlur = n.handleBlur.bind((0, d['default'])(n))),
              (n.handleClick = n.handleClick.bind((0, d['default'])(n))),
              (n.handleKeyPress = n.handleKeyPress.bind((0, d['default'])(n))),
              (n.stepForward = n.stepForward.bind((0, d['default'])(n))),
              (n.stepBack = n.stepBack.bind((0, d['default'])(n))),
              (n.calculateDistance = n.calculateDistance.bind(
                (0, d['default'])(n),
              )),
              (n.getProgress = n.getProgress.bind((0, d['default'])(n))),
              (n.renderChildren = n.renderChildren.bind((0, d['default'])(n))),
              (n.state = { active: !1 }),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'componentWillUnmount',
                value: function () {
                  document.removeEventListener(
                    'mousemove',
                    this.handleMouseMove,
                    !0,
                  ),
                    document.removeEventListener(
                      'mouseup',
                      this.handleMouseUp,
                      !0,
                    ),
                    document.removeEventListener(
                      'touchmove',
                      this.handleMouseMove,
                      !0,
                    ),
                    document.removeEventListener(
                      'touchend',
                      this.handleMouseUp,
                      !0,
                    ),
                    document.removeEventListener(
                      'keydown',
                      this.handleKeyPress,
                      !0,
                    );
                },
              },
              {
                key: 'getProgress',
                value: function () {
                  var e = this.props.getPercent;
                  if (!e) return 0;
                  var t = e();
                  return (
                    ('number' !== typeof t || t < 0 || t === 1 / 0) && (t = 0),
                    t
                  );
                },
              },
              {
                key: 'handleMouseDown',
                value: function (e) {
                  var t = this.props.onMouseDown;
                  document.addEventListener(
                    'mousemove',
                    this.handleMouseMove,
                    !0,
                  ),
                    document.addEventListener(
                      'mouseup',
                      this.handleMouseUp,
                      !0,
                    ),
                    document.addEventListener(
                      'touchmove',
                      this.handleMouseMove,
                      !0,
                    ),
                    document.addEventListener(
                      'touchend',
                      this.handleMouseUp,
                      !0,
                    ),
                    this.setState({ active: !0 }),
                    this.props.sliderActive && this.props.sliderActive(e),
                    this.handleMouseMove(e),
                    t && t(e);
                },
              },
              {
                key: 'handleMouseMove',
                value: function (e) {
                  var t = this.props.onMouseMove;
                  t && t(e);
                },
              },
              {
                key: 'handleMouseUp',
                value: function (e) {
                  e.preventDefault();
                  var t = this.props.onMouseUp;
                  document.removeEventListener(
                    'mousemove',
                    this.handleMouseMove,
                    !0,
                  ),
                    document.removeEventListener(
                      'mouseup',
                      this.handleMouseUp,
                      !0,
                    ),
                    document.removeEventListener(
                      'touchmove',
                      this.handleMouseMove,
                      !0,
                    ),
                    document.removeEventListener(
                      'touchend',
                      this.handleMouseUp,
                      !0,
                    ),
                    this.setState({ active: !1 }),
                    this.props.sliderInactive && this.props.sliderInactive(e),
                    t && t(e);
                },
              },
              {
                key: 'handleFocus',
                value: function (e) {
                  document.addEventListener('keydown', this.handleKeyPress, !0),
                    this.props.onFocus && this.props.onFocus(e);
                },
              },
              {
                key: 'handleBlur',
                value: function (e) {
                  document.removeEventListener(
                    'keydown',
                    this.handleKeyPress,
                    !0,
                  ),
                    this.props.onBlur && this.props.onBlur(e);
                },
              },
              {
                key: 'handleClick',
                value: function (e) {
                  e.preventDefault(),
                    this.props.onClick && this.props.onClick(e);
                },
              },
              {
                key: 'handleKeyPress',
                value: function (e) {
                  37 === e.which || 40 === e.which
                    ? (e.preventDefault(), e.stopPropagation(), this.stepBack())
                    : (38 !== e.which && 39 !== e.which) ||
                      (e.preventDefault(),
                      e.stopPropagation(),
                      this.stepForward());
                },
              },
              {
                key: 'stepForward',
                value: function () {
                  this.props.stepForward && this.props.stepForward();
                },
              },
              {
                key: 'stepBack',
                value: function () {
                  this.props.stepBack && this.props.stepBack();
                },
              },
              {
                key: 'calculateDistance',
                value: function (e) {
                  var t = this.slider,
                    a = v.getPointerPosition(t, e);
                  return this.props.vertical ? a.y : a.x;
                },
              },
              {
                key: 'renderChildren',
                value: function () {
                  var e = this.getProgress(),
                    t = ''.concat((100 * e).toFixed(2), '%');
                  return f['default'].Children.map(
                    this.props.children,
                    function (a) {
                      return f['default'].cloneElement(a, {
                        progress: e,
                        percentage: t,
                      });
                    },
                  );
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.vertical,
                    n = t.label,
                    l = t.valuenow,
                    r = t.valuetext;
                  return f['default'].createElement(
                    'div',
                    {
                      className: (0, h['default'])(
                        this.props.className,
                        {
                          'video-react-slider-vertical': a,
                          'video-react-slider-horizontal': !a,
                          'video-react-sliding': this.state.active,
                        },
                        'video-react-slider',
                      ),
                      ref: function (t) {
                        e.slider = t;
                      },
                      tabIndex: '0',
                      role: 'slider',
                      onMouseDown: this.handleMouseDown,
                      onTouchStart: this.handleMouseDown,
                      onFocus: this.handleFocus,
                      onBlur: this.handleBlur,
                      onClick: this.handleClick,
                      'aria-label': n || '',
                      'aria-valuenow': l || '',
                      'aria-valuetext': r || '',
                      'aria-valuemin': 0,
                      'aria-valuemax': 100,
                    },
                    this.renderChildren(),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = m), (m.propTypes = p), (m.displayName = 'Slider');
    },
    20122: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(60693)),
        o = l(a(34575)),
        i = l(a(93913)),
        u = l(a(78585)),
        d = l(a(29754)),
        s = l(a(81506)),
        c = l(a(2205)),
        f = l(a(55301)),
        h = n(a(12924)),
        v = l(a(94184)),
        p = a(43453),
        m = {
          actions: f['default'].object,
          player: f['default'].object,
          children: f['default'].any,
          startTime: f['default'].number,
          loop: f['default'].bool,
          muted: f['default'].bool,
          autoPlay: f['default'].bool,
          playsInline: f['default'].bool,
          src: f['default'].string,
          poster: f['default'].string,
          className: f['default'].string,
          preload: f['default'].oneOf(['auto', 'metadata', 'none']),
          crossOrigin: f['default'].string,
          onLoadStart: f['default'].func,
          onWaiting: f['default'].func,
          onCanPlay: f['default'].func,
          onCanPlayThrough: f['default'].func,
          onPlaying: f['default'].func,
          onEnded: f['default'].func,
          onSeeking: f['default'].func,
          onSeeked: f['default'].func,
          onPlay: f['default'].func,
          onPause: f['default'].func,
          onProgress: f['default'].func,
          onDurationChange: f['default'].func,
          onError: f['default'].func,
          onSuspend: f['default'].func,
          onAbort: f['default'].func,
          onEmptied: f['default'].func,
          onStalled: f['default'].func,
          onLoadedMetadata: f['default'].func,
          onLoadedData: f['default'].func,
          onTimeUpdate: f['default'].func,
          onRateChange: f['default'].func,
          onVolumeChange: f['default'].func,
          onResize: f['default'].func,
        },
        y = (function (e) {
          function t(e) {
            var a;
            return (
              (0, o['default'])(this, t),
              (a = (0, u['default'])(this, (0, d['default'])(t).call(this, e))),
              (a.video = null),
              (a.play = a.play.bind((0, s['default'])(a))),
              (a.pause = a.pause.bind((0, s['default'])(a))),
              (a.seek = a.seek.bind((0, s['default'])(a))),
              (a.forward = a.forward.bind((0, s['default'])(a))),
              (a.replay = a.replay.bind((0, s['default'])(a))),
              (a.toggleFullscreen = a.toggleFullscreen.bind(
                (0, s['default'])(a),
              )),
              (a.getProperties = a.getProperties.bind((0, s['default'])(a))),
              (a.renderChildren = a.renderChildren.bind((0, s['default'])(a))),
              (a.handleLoadStart = a.handleLoadStart.bind(
                (0, s['default'])(a),
              )),
              (a.handleCanPlay = a.handleCanPlay.bind((0, s['default'])(a))),
              (a.handleCanPlayThrough = a.handleCanPlayThrough.bind(
                (0, s['default'])(a),
              )),
              (a.handlePlay = a.handlePlay.bind((0, s['default'])(a))),
              (a.handlePlaying = a.handlePlaying.bind((0, s['default'])(a))),
              (a.handlePause = a.handlePause.bind((0, s['default'])(a))),
              (a.handleEnded = a.handleEnded.bind((0, s['default'])(a))),
              (a.handleWaiting = a.handleWaiting.bind((0, s['default'])(a))),
              (a.handleSeeking = a.handleSeeking.bind((0, s['default'])(a))),
              (a.handleSeeked = a.handleSeeked.bind((0, s['default'])(a))),
              (a.handleFullscreenChange = a.handleFullscreenChange.bind(
                (0, s['default'])(a),
              )),
              (a.handleError = a.handleError.bind((0, s['default'])(a))),
              (a.handleSuspend = a.handleSuspend.bind((0, s['default'])(a))),
              (a.handleAbort = a.handleAbort.bind((0, s['default'])(a))),
              (a.handleEmptied = a.handleEmptied.bind((0, s['default'])(a))),
              (a.handleStalled = a.handleStalled.bind((0, s['default'])(a))),
              (a.handleLoadedMetaData = a.handleLoadedMetaData.bind(
                (0, s['default'])(a),
              )),
              (a.handleLoadedData = a.handleLoadedData.bind(
                (0, s['default'])(a),
              )),
              (a.handleTimeUpdate = a.handleTimeUpdate.bind(
                (0, s['default'])(a),
              )),
              (a.handleRateChange = a.handleRateChange.bind(
                (0, s['default'])(a),
              )),
              (a.handleVolumeChange = a.handleVolumeChange.bind(
                (0, s['default'])(a),
              )),
              (a.handleDurationChange = a.handleDurationChange.bind(
                (0, s['default'])(a),
              )),
              (a.handleProgress = (0, p.throttle)(
                a.handleProgress.bind((0, s['default'])(a)),
                250,
              )),
              (a.handleKeypress = a.handleKeypress.bind((0, s['default'])(a))),
              (a.handleTextTrackChange = a.handleTextTrackChange.bind(
                (0, s['default'])(a),
              )),
              a
            );
          }
          return (
            (0, c['default'])(t, e),
            (0, i['default'])(t, [
              {
                key: 'componentDidMount',
                value: function () {
                  this.forceUpdate(),
                    this.video &&
                      this.video.textTracks &&
                      ((this.video.textTracks.onaddtrack =
                        this.handleTextTrackChange),
                      (this.video.textTracks.onremovetrack =
                        this.handleTextTrackChange));
                },
              },
              {
                key: 'getProperties',
                value: function () {
                  var e = this;
                  return this.video
                    ? p.mediaProperties.reduce(function (t, a) {
                        return (t[a] = e.video[a]), t;
                      }, {})
                    : null;
                },
              },
              {
                key: 'handleTextTrackChange',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.player;
                  if (this.video && this.video.textTracks) {
                    var n = Array.from(this.video.textTracks).find(function (
                      e,
                    ) {
                      return 'showing' === e.mode;
                    });
                    n !== a.activeTextTrack && t.activateTextTrack(n);
                  }
                },
              },
              {
                key: 'play',
                value: function () {
                  var e = this.video.play();
                  void 0 !== e &&
                    e['catch'](function () {}).then(function () {});
                },
              },
              {
                key: 'pause',
                value: function () {
                  var e = this.video.pause();
                  void 0 !== e &&
                    e['catch'](function () {}).then(function () {});
                },
              },
              {
                key: 'load',
                value: function () {
                  this.video.load();
                },
              },
              {
                key: 'addTextTrack',
                value: function () {
                  var e;
                  (e = this.video).addTextTrack.apply(e, arguments);
                },
              },
              {
                key: 'canPlayType',
                value: function () {
                  var e;
                  (e = this.video).canPlayType.apply(e, arguments);
                },
              },
              {
                key: 'togglePlay',
                value: function () {
                  this.video.paused ? this.play() : this.pause();
                },
              },
              {
                key: 'seek',
                value: function (e) {
                  try {
                    this.video.currentTime = e;
                  } catch (t) {}
                },
              },
              {
                key: 'forward',
                value: function (e) {
                  this.seek(this.video.currentTime + e);
                },
              },
              {
                key: 'replay',
                value: function (e) {
                  this.forward(-e);
                },
              },
              {
                key: 'toggleFullscreen',
                value: function () {
                  var e = this.props,
                    t = e.player,
                    a = e.actions;
                  a.toggleFullscreen(t);
                },
              },
              {
                key: 'handleLoadStart',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onLoadStart;
                  t.handleLoadStart(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleCanPlay',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onCanPlay;
                  t.handleCanPlay(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleCanPlayThrough',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onCanPlayThrough;
                  t.handleCanPlayThrough(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handlePlaying',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onPlaying;
                  t.handlePlaying(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handlePlay',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onPlay;
                  t.handlePlay(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handlePause',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onPause;
                  t.handlePause(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleDurationChange',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onDurationChange;
                  t.handleDurationChange(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleProgress',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onProgress;
                  this.video && t.handleProgressChange(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleEnded',
                value: function () {
                  var e = this.props,
                    t = e.loop,
                    a = e.player,
                    n = e.actions,
                    l = e.onEnded;
                  t ? (this.seek(0), this.play()) : a.paused || this.pause(),
                    n.handleEnd(this.getProperties()),
                    l && l.apply(void 0, arguments);
                },
              },
              {
                key: 'handleWaiting',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onWaiting;
                  t.handleWaiting(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleSeeking',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onSeeking;
                  t.handleSeeking(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleSeeked',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onSeeked;
                  t.handleSeeked(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              { key: 'handleFullscreenChange', value: function () {} },
              {
                key: 'handleSuspend',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onSuspend;
                  t.handleSuspend(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleAbort',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onAbort;
                  t.handleAbort(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleEmptied',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onEmptied;
                  t.handleEmptied(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleStalled',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onStalled;
                  t.handleStalled(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleLoadedMetaData',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onLoadedMetadata,
                    n = e.startTime;
                  n && n > 0 && (this.video.currentTime = n),
                    t.handleLoadedMetaData(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleLoadedData',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onLoadedData;
                  t.handleLoadedData(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleTimeUpdate',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onTimeUpdate;
                  t.handleTimeUpdate(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleRateChange',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onRateChange;
                  t.handleRateChange(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleVolumeChange',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onVolumeChange;
                  t.handleVolumeChange(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleError',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onError;
                  t.handleError(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              {
                key: 'handleResize',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.onResize;
                  t.handleResize(this.getProperties()),
                    a && a.apply(void 0, arguments);
                },
              },
              { key: 'handleKeypress', value: function () {} },
              {
                key: 'renderChildren',
                value: function () {
                  var e = this,
                    t = (0, r['default'])({}, this.props, {
                      video: this.video,
                    });
                  return this.video
                    ? h['default'].Children.toArray(this.props.children)
                        .filter(p.isVideoChild)
                        .map(function (a) {
                          var n;
                          if ('string' === typeof a.type) {
                            if ('source' === a.type) {
                              n = (0, r['default'])({}, a.props);
                              var l = n.onError;
                              n.onError = function () {
                                l && l.apply(void 0, arguments),
                                  e.handleError.apply(e, arguments);
                              };
                            }
                          } else n = t;
                          return h['default'].cloneElement(a, n);
                        })
                    : null;
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.loop,
                    n = t.poster,
                    l = t.preload,
                    r = t.src,
                    o = t.autoPlay,
                    i = t.playsInline,
                    u = t.muted,
                    d = t.crossOrigin,
                    s = t.videoId;
                  return h['default'].createElement(
                    'video',
                    {
                      className: (0, v['default'])(
                        'video-react-video',
                        this.props.className,
                      ),
                      id: s,
                      crossOrigin: d,
                      ref: function (t) {
                        e.video = t;
                      },
                      muted: u,
                      preload: l,
                      loop: a,
                      playsInline: i,
                      autoPlay: o,
                      poster: n,
                      src: r,
                      onLoadStart: this.handleLoadStart,
                      onWaiting: this.handleWaiting,
                      onCanPlay: this.handleCanPlay,
                      onCanPlayThrough: this.handleCanPlayThrough,
                      onPlaying: this.handlePlaying,
                      onEnded: this.handleEnded,
                      onSeeking: this.handleSeeking,
                      onSeeked: this.handleSeeked,
                      onPlay: this.handlePlay,
                      onPause: this.handlePause,
                      onProgress: this.handleProgress,
                      onDurationChange: this.handleDurationChange,
                      onError: this.handleError,
                      onSuspend: this.handleSuspend,
                      onAbort: this.handleAbort,
                      onEmptied: this.handleEmptied,
                      onStalled: this.handleStalled,
                      onLoadedMetadata: this.handleLoadedMetaData,
                      onLoadedData: this.handleLoadedData,
                      onTimeUpdate: this.handleTimeUpdate,
                      onRateChange: this.handleRateChange,
                      onVolumeChange: this.handleVolumeChange,
                      tabIndex: '-1',
                    },
                    this.renderChildren(),
                  );
                },
              },
              {
                key: 'playbackRate',
                get: function () {
                  return this.video.playbackRate;
                },
                set: function (e) {
                  this.video.playbackRate = e;
                },
              },
              {
                key: 'muted',
                get: function () {
                  return this.video.muted;
                },
                set: function (e) {
                  this.video.muted = e;
                },
              },
              {
                key: 'volume',
                get: function () {
                  return this.video.volume;
                },
                set: function (e) {
                  e > 1 && (e = 1), e < 0 && (e = 0), (this.video.volume = e);
                },
              },
              {
                key: 'videoWidth',
                get: function () {
                  return this.video.videoWidth;
                },
              },
              {
                key: 'videoHeight',
                get: function () {
                  return this.video.videoHeight;
                },
              },
            ]),
            t
          );
        })(h.Component);
      (t.default = y), (y.propTypes = m), (y.displayName = 'Video');
    },
    77557: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = l(a(9077)),
        p = {
          player: c['default'].object,
          actions: c['default'].object,
          className: c['default'].string,
          offMenuText: c['default'].string,
          showOffMenu: c['default'].bool,
          kinds: c['default'].array,
        },
        m = {
          offMenuText: 'Off',
          showOffMenu: !0,
          kinds: ['captions', 'subtitles'],
        },
        y = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.getTextTrackItems = n.getTextTrackItems.bind(
                (0, d['default'])(n),
              )),
              (n.updateState = n.updateState.bind((0, d['default'])(n))),
              (n.handleSelectItem = n.handleSelectItem.bind(
                (0, d['default'])(n),
              )),
              (n.state = n.getTextTrackItems()),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'componentDidUpdate',
                value: function () {
                  this.updateState();
                },
              },
              {
                key: 'getTextTrackItems',
                value: function () {
                  var e = this.props,
                    t = e.kinds,
                    a = e.player,
                    n = e.offMenuText,
                    l = e.showOffMenu,
                    r = a.textTracks,
                    o = a.activeTextTrack,
                    i = { items: [], selectedIndex: 0 },
                    u = Array.from(r || []);
                  return (
                    0 === u.length ||
                      (l && i.items.push({ label: n || 'Off', value: null }),
                      u.forEach(function (e) {
                        (t.length && !t.includes(e.kind)) ||
                          i.items.push({ label: e.label, value: e.language });
                      }),
                      (i.selectedIndex = i.items.findIndex(function (e) {
                        return o && o.language === e.value;
                      })),
                      -1 === i.selectedIndex && (i.selectedIndex = 0)),
                    i
                  );
                },
              },
              {
                key: 'updateState',
                value: function () {
                  var e = this.getTextTrackItems();
                  (e.selectedIndex === this.state.selectedIndex &&
                    this.textTrackItemsAreEqual(e.items, this.state.items)) ||
                    this.setState(e);
                },
              },
              {
                key: 'textTrackItemsAreEqual',
                value: function (e, t) {
                  if (e.length !== t.length) return !1;
                  for (var a = 0; a < e.length; a++)
                    if (
                      !t[a] ||
                      e[a].label !== t[a].label ||
                      e[a].value !== t[a].value
                    )
                      return !1;
                  return !0;
                },
              },
              {
                key: 'handleSelectItem',
                value: function (e) {
                  var t = this.props,
                    a = t.player,
                    n = t.actions,
                    l = t.showOffMenu,
                    r = a.textTracks;
                  Array.from(r).forEach(function (t, a) {
                    e === (l ? a + 1 : a)
                      ? ((t.mode = 'showing'), n.activateTextTrack(t))
                      : (t.mode = 'hidden');
                  });
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.state,
                    t = e.items,
                    a = e.selectedIndex;
                  return f['default'].createElement(
                    v['default'],
                    {
                      className: (0, h['default'])(
                        'video-react-closed-caption',
                        this.props.className,
                      ),
                      onSelectItem: this.handleSelectItem,
                      items: t,
                      selectedIndex: a,
                    },
                    f['default'].createElement(
                      'span',
                      { className: 'video-react-control-text' },
                      'Closed Caption',
                    ),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (y.propTypes = p),
        (y.defaultProps = m),
        (y.displayName = 'ClosedCaptionButton');
      var g = y;
      t.default = g;
    },
    7473: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(6479)),
        o = l(a(34575)),
        i = l(a(93913)),
        u = l(a(78585)),
        d = l(a(29754)),
        s = l(a(81506)),
        c = l(a(2205)),
        f = l(a(55301)),
        h = n(a(12924)),
        v = l(a(94184)),
        p = l(a(54850)),
        m = l(a(17058)),
        y = l(a(50183)),
        g = l(a(9356)),
        k = l(a(93282)),
        b = l(a(61866)),
        E = l(a(66008)),
        C = l(a(72042)),
        P = l(a(24609)),
        T = l(a(90228)),
        S = l(a(44223)),
        N = a(43453),
        M = {
          children: f['default'].any,
          autoHide: f['default'].bool,
          autoHideTime: f['default'].number,
          disableDefaultControls: f['default'].bool,
          disableCompletely: f['default'].bool,
          className: f['default'].string,
        },
        A = { autoHide: !0, disableCompletely: !1 },
        _ = (function (e) {
          function t(e) {
            var a;
            return (
              (0, o['default'])(this, t),
              (a = (0, u['default'])(this, (0, d['default'])(t).call(this, e))),
              (a.getDefaultChildren = a.getDefaultChildren.bind(
                (0, s['default'])(a),
              )),
              (a.getFullChildren = a.getFullChildren.bind(
                (0, s['default'])(a),
              )),
              a
            );
          }
          return (
            (0, c['default'])(t, e),
            (0, i['default'])(t, [
              {
                key: 'getDefaultChildren',
                value: function () {
                  return [
                    h['default'].createElement(m['default'], {
                      key: 'play-toggle',
                      order: 1,
                    }),
                    h['default'].createElement(T['default'], {
                      key: 'volume-menu-button',
                      order: 4,
                    }),
                    h['default'].createElement(E['default'], {
                      key: 'current-time-display',
                      order: 5.1,
                    }),
                    h['default'].createElement(P['default'], {
                      key: 'time-divider',
                      order: 5.2,
                    }),
                    h['default'].createElement(C['default'], {
                      key: 'duration-display',
                      order: 5.3,
                    }),
                    h['default'].createElement(p['default'], {
                      key: 'progress-control',
                      order: 6,
                    }),
                    h['default'].createElement(k['default'], {
                      key: 'fullscreen-toggle',
                      order: 8,
                    }),
                  ];
                },
              },
              {
                key: 'getFullChildren',
                value: function () {
                  return [
                    h['default'].createElement(m['default'], {
                      key: 'play-toggle',
                      order: 1,
                    }),
                    h['default'].createElement(g['default'], {
                      key: 'replay-control',
                      order: 2,
                    }),
                    h['default'].createElement(y['default'], {
                      key: 'forward-control',
                      order: 3,
                    }),
                    h['default'].createElement(T['default'], {
                      key: 'volume-menu-button',
                      order: 4,
                    }),
                    h['default'].createElement(E['default'], {
                      key: 'current-time-display',
                      order: 5,
                    }),
                    h['default'].createElement(P['default'], {
                      key: 'time-divider',
                      order: 6,
                    }),
                    h['default'].createElement(C['default'], {
                      key: 'duration-display',
                      order: 7,
                    }),
                    h['default'].createElement(p['default'], {
                      key: 'progress-control',
                      order: 8,
                    }),
                    h['default'].createElement(b['default'], {
                      key: 'remaining-time-display',
                      order: 9,
                    }),
                    h['default'].createElement(S['default'], {
                      rates: [1, 1.25, 1.5, 2],
                      key: 'playback-rate',
                      order: 10,
                    }),
                    h['default'].createElement(k['default'], {
                      key: 'fullscreen-toggle',
                      order: 11,
                    }),
                  ];
                },
              },
              {
                key: 'getChildren',
                value: function () {
                  var e = h['default'].Children.toArray(this.props.children),
                    t = this.props.disableDefaultControls
                      ? []
                      : this.getDefaultChildren(),
                    a = this.props,
                    n = (a.className, (0, r['default'])(a, ['className']));
                  return (0, N.mergeAndSortChildren)(t, e, n);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    t = e.autoHide,
                    a = e.className,
                    n = e.disableCompletely,
                    l = this.getChildren();
                  return n
                    ? null
                    : h['default'].createElement(
                        'div',
                        {
                          className: (0, v['default'])(
                            'video-react-control-bar',
                            { 'video-react-control-bar-auto-hide': t },
                            a,
                          ),
                        },
                        l,
                      );
                },
              },
            ]),
            t
          );
        })(h.Component);
      (t.default = _),
        (_.propTypes = M),
        (_.defaultProps = A),
        (_.displayName = 'ControlBar');
    },
    50183: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(82073)),
        r = (0, l['default'])('forward');
      r.displayName = 'ForwardControl';
      var o = r;
      t.default = o;
    },
    82073: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = {
          actions: c['default'].object,
          className: c['default'].string,
          seconds: c['default'].oneOf([5, 10, 30]),
        },
        v = { seconds: 10 },
        p = function (e) {
          var t = (function (t) {
            function a(e, t) {
              var n;
              return (
                (0, r['default'])(this, a),
                (n = (0, i['default'])(
                  this,
                  (0, u['default'])(a).call(this, e, t),
                )),
                (n.handleClick = n.handleClick.bind((0, d['default'])(n))),
                n
              );
            }
            return (
              (0, s['default'])(a, t),
              (0, o['default'])(a, [
                {
                  key: 'handleClick',
                  value: function () {
                    var t = this.props,
                      a = t.actions,
                      n = t.seconds;
                    'forward' === e ? a.forward(n) : a.replay(n);
                  },
                },
                {
                  key: 'render',
                  value: function () {
                    var t = this,
                      a = this.props,
                      n = a.seconds,
                      l = a.className,
                      r = [
                        'video-react-control',
                        'video-react-button',
                        'video-react-icon',
                      ];
                    return (
                      r.push(
                        'video-react-icon-'.concat(e, '-').concat(n),
                        'video-react-'.concat(e, '-control'),
                      ),
                      l && r.push(l),
                      f['default'].createElement(
                        'button',
                        {
                          ref: function (e) {
                            t.button = e;
                          },
                          className: r.join(' '),
                          type: 'button',
                          onClick: this.handleClick,
                        },
                        f['default'].createElement(
                          'span',
                          { className: 'video-react-control-text' },
                          ''.concat(e, ' ').concat(n, ' seconds'),
                        ),
                      )
                    );
                  },
                },
              ]),
              a
            );
          })(f.Component);
          return (t.propTypes = h), (t.defaultProps = v), t;
        };
      t.default = p;
    },
    93282: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = {
          actions: c['default'].object,
          player: c['default'].object,
          className: c['default'].string,
        },
        p = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.handleClick = n.handleClick.bind((0, d['default'])(n))),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'handleClick',
                value: function () {
                  var e = this.props,
                    t = e.player,
                    a = e.actions;
                  a.toggleFullscreen(t);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.player,
                    n = t.className;
                  return f['default'].createElement(
                    'button',
                    {
                      className: (0, h['default'])(
                        n,
                        {
                          'video-react-icon-fullscreen-exit': a.isFullscreen,
                          'video-react-icon-fullscreen': !a.isFullscreen,
                        },
                        'video-react-fullscreen-control video-react-control video-react-button video-react-icon',
                      ),
                      ref: function (t) {
                        e.button = t;
                      },
                      type: 'button',
                      tabIndex: '0',
                      onClick: this.handleClick,
                    },
                    f['default'].createElement(
                      'span',
                      { className: 'video-react-control-text' },
                      'Non-Fullscreen',
                    ),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = p), (p.propTypes = v), (p.displayName = 'FullscreenToggle');
    },
    87020: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = u);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = {
          duration: l['default'].number,
          buffered: l['default'].object,
          className: l['default'].string,
        };
      function u(e) {
        var t = e.buffered,
          a = e.duration,
          n = e.className;
        if (!t || !t.length) return null;
        var l = t.end(t.length - 1),
          i = {};
        function u(e, t) {
          var a = e / t || 0;
          return ''.concat(100 * (a >= 1 ? 1 : a), '%');
        }
        l > a && (l = a), (i.width = u(l, a));
        for (var d = [], s = 0; s < t.length; s++) {
          var c = t.start(s),
            f = t.end(s),
            h = r['default'].createElement('div', {
              style: { left: u(c, l), width: u(f - c, l) },
              key: 'part-'.concat(s),
            });
          d.push(h);
        }
        return (
          0 === d.length && (d = null),
          r['default'].createElement(
            'div',
            {
              style: i,
              className: (0, o['default'])('video-react-load-progress', n),
            },
            r['default'].createElement(
              'span',
              { className: 'video-react-control-text' },
              'Loaded: 0%',
            ),
            d,
          )
        );
      }
      (u.propTypes = i), (u.displayName = 'LoadProgressBar');
    },
    36082: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = a(43453);
      function u(e) {
        var t = e.duration,
          a = e.mouseTime,
          n = e.className,
          l = e.text;
        if (!a.time) return null;
        var u = l || (0, i.formatTime)(a.time, t);
        return r['default'].createElement('div', {
          className: (0, o['default'])('video-react-mouse-display', n),
          style: { left: ''.concat(a.position, 'px') },
          'data-current-time': u,
        });
      }
      (u.propTypes = {
        duration: l['default'].number,
        mouseTime: l['default'].object,
        className: l['default'].string,
      }),
        (u.displayName = 'MouseTimeDisplay');
      var d = u;
      t.default = d;
    },
    73258: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = d);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = a(43453),
        u = {
          currentTime: l['default'].number,
          duration: l['default'].number,
          percentage: l['default'].string,
          className: l['default'].string,
        };
      function d(e) {
        var t = e.currentTime,
          a = e.duration,
          n = e.percentage,
          l = e.className;
        return r['default'].createElement(
          'div',
          {
            'data-current-time': (0, i.formatTime)(t, a),
            className: (0, o['default'])(
              'video-react-play-progress video-react-slider-bar',
              l,
            ),
            style: { width: n },
          },
          r['default'].createElement(
            'span',
            { className: 'video-react-control-text' },
            'Progress: '.concat(n),
          ),
        );
      }
      (d.propTypes = u), (d.displayName = 'PlayProgressBar');
    },
    17058: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = {
          actions: c['default'].object,
          player: c['default'].object,
          className: c['default'].string,
        },
        p = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.handleClick = n.handleClick.bind((0, d['default'])(n))),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'handleClick',
                value: function () {
                  var e = this.props,
                    t = e.actions,
                    a = e.player;
                  a.paused ? t.play() : t.pause();
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.player,
                    n = t.className,
                    l = a.paused ? 'Play' : 'Pause';
                  return f['default'].createElement(
                    'button',
                    {
                      ref: function (t) {
                        e.button = t;
                      },
                      className: (0, h['default'])(n, {
                        'video-react-play-control': !0,
                        'video-react-control': !0,
                        'video-react-button': !0,
                        'video-react-paused': a.paused,
                        'video-react-playing': !a.paused,
                      }),
                      type: 'button',
                      tabIndex: '0',
                      onClick: this.handleClick,
                    },
                    f['default'].createElement(
                      'span',
                      { className: 'video-react-control-text' },
                      l,
                    ),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = p), (p.propTypes = v), (p.displayName = 'PlayToggle');
    },
    26203: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(2205)),
        s = n(a(12924)),
        c = l(a(44223)),
        f = a(43453),
        h = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (0, f.deprecatedWarning)(
                'PlaybackRate',
                'PlaybackRateMenuButton',
              ),
              n
            );
          }
          return (
            (0, d['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'render',
                value: function () {
                  return s['default'].createElement(c['default'], this.props);
                },
              },
            ]),
            t
          );
        })(s.Component);
      (t.default = h), (h.displayName = 'PlaybackRate');
    },
    44223: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = l(a(9077)),
        p = {
          player: c['default'].object,
          actions: c['default'].object,
          rates: c['default'].array,
          className: c['default'].string,
        },
        m = { rates: [2, 1.5, 1.25, 1, 0.5, 0.25] },
        y = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.handleSelectItem = n.handleSelectItem.bind(
                (0, d['default'])(n),
              )),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'handleSelectItem',
                value: function (e) {
                  var t = this.props,
                    a = t.rates,
                    n = t.actions;
                  e >= 0 && e < a.length && n.changeRate(a[e]);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    t = e.rates,
                    a = e.player,
                    n = t.map(function (e) {
                      return { label: ''.concat(e, 'x'), value: e };
                    }),
                    l = t.indexOf(a.playbackRate) || 0;
                  return f['default'].createElement(
                    v['default'],
                    {
                      className: (0, h['default'])(
                        'video-react-playback-rate',
                        this.props.className,
                      ),
                      onSelectItem: this.handleSelectItem,
                      items: n,
                      selectedIndex: l,
                    },
                    f['default'].createElement(
                      'span',
                      { className: 'video-react-control-text' },
                      'Playback Rate',
                    ),
                    f['default'].createElement(
                      'div',
                      { className: 'video-react-playback-rate-value' },
                      ''.concat(a.playbackRate.toFixed(2), 'x'),
                    ),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (y.propTypes = p),
        (y.defaultProps = m),
        (y.displayName = 'PlaybackRateMenuButton');
      var g = y;
      t.default = g;
    },
    54850: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(67154)),
        o = l(a(34575)),
        i = l(a(93913)),
        u = l(a(78585)),
        d = l(a(29754)),
        s = l(a(81506)),
        c = l(a(2205)),
        f = l(a(55301)),
        h = n(a(12924)),
        v = l(a(94184)),
        p = n(a(6021)),
        m = l(a(25775)),
        y = { player: f['default'].object, className: f['default'].string },
        g = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, o['default'])(this, t),
              (n = (0, u['default'])(
                this,
                (0, d['default'])(t).call(this, e, a),
              )),
              (n.state = { mouseTime: { time: null, position: 0 } }),
              (n.handleMouseMoveThrottle = n.handleMouseMove.bind(
                (0, s['default'])(n),
              )),
              n
            );
          }
          return (
            (0, c['default'])(t, e),
            (0, i['default'])(t, [
              {
                key: 'handleMouseMove',
                value: function (e) {
                  if (e.pageX) {
                    var t = this.props.player.duration,
                      a = this.seekBar,
                      n = p.getPointerPosition(a, e).x * t,
                      l = e.pageX - p.findElPosition(a).left;
                    this.setState({ mouseTime: { time: n, position: l } });
                  }
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.props.className;
                  return h['default'].createElement(
                    'div',
                    {
                      onMouseMove: this.handleMouseMoveThrottle,
                      className: (0, v['default'])(
                        'video-react-progress-control video-react-control',
                        t,
                      ),
                    },
                    h['default'].createElement(
                      m['default'],
                      (0, r['default'])(
                        {
                          mouseTime: this.state.mouseTime,
                          ref: function (t) {
                            e.seekBar = t;
                          },
                        },
                        this.props,
                      ),
                    ),
                  );
                },
              },
            ]),
            t
          );
        })(h.Component);
      (t.default = g), (g.propTypes = y), (g.displayName = 'ProgressControl');
    },
    9356: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(82073)),
        r = (0, l['default'])('replay');
      r.displayName = 'ReplayControl';
      var o = r;
      t.default = o;
    },
    25775: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = l(a(21303)),
        p = l(a(73258)),
        m = l(a(87020)),
        y = l(a(36082)),
        g = a(43453),
        k = {
          player: c['default'].object,
          mouseTime: c['default'].object,
          actions: c['default'].object,
          className: c['default'].string,
        },
        b = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.getPercent = n.getPercent.bind((0, d['default'])(n))),
              (n.getNewTime = n.getNewTime.bind((0, d['default'])(n))),
              (n.stepForward = n.stepForward.bind((0, d['default'])(n))),
              (n.stepBack = n.stepBack.bind((0, d['default'])(n))),
              (n.handleMouseDown = n.handleMouseDown.bind(
                (0, d['default'])(n),
              )),
              (n.handleMouseMove = n.handleMouseMove.bind(
                (0, d['default'])(n),
              )),
              (n.handleMouseUp = n.handleMouseUp.bind((0, d['default'])(n))),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              { key: 'componentDidMount', value: function () {} },
              { key: 'componentDidUpdate', value: function () {} },
              {
                key: 'getPercent',
                value: function () {
                  var e = this.props.player,
                    t = e.currentTime,
                    a = e.seekingTime,
                    n = e.duration,
                    l = a || t,
                    r = l / n;
                  return r >= 1 ? 1 : r;
                },
              },
              {
                key: 'getNewTime',
                value: function (e) {
                  var t = this.props.player.duration,
                    a = this.slider.calculateDistance(e),
                    n = a * t;
                  return n === t ? n - 0.1 : n;
                },
              },
              { key: 'handleMouseDown', value: function () {} },
              {
                key: 'handleMouseUp',
                value: function (e) {
                  var t = this.props.actions,
                    a = this.getNewTime(e);
                  t.seek(a), t.handleEndSeeking(a);
                },
              },
              {
                key: 'handleMouseMove',
                value: function (e) {
                  var t = this.props.actions,
                    a = this.getNewTime(e);
                  t.handleSeekingTime(a);
                },
              },
              {
                key: 'stepForward',
                value: function () {
                  var e = this.props.actions;
                  e.forward(5);
                },
              },
              {
                key: 'stepBack',
                value: function () {
                  var e = this.props.actions;
                  e.replay(5);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.player,
                    n = a.currentTime,
                    l = a.seekingTime,
                    r = a.duration,
                    o = a.buffered,
                    i = t.mouseTime,
                    u = l || n;
                  return f['default'].createElement(
                    v['default'],
                    {
                      ref: function (t) {
                        e.slider = t;
                      },
                      label: 'video progress bar',
                      className: (0, h['default'])(
                        'video-react-progress-holder',
                        this.props.className,
                      ),
                      valuenow: (100 * this.getPercent()).toFixed(2),
                      valuetext: (0, g.formatTime)(u, r),
                      onMouseDown: this.handleMouseDown,
                      onMouseMove: this.handleMouseMove,
                      onMouseUp: this.handleMouseUp,
                      getPercent: this.getPercent,
                      stepForward: this.stepForward,
                      stepBack: this.stepBack,
                    },
                    f['default'].createElement(m['default'], {
                      buffered: o,
                      currentTime: u,
                      duration: r,
                    }),
                    f['default'].createElement(y['default'], {
                      duration: r,
                      mouseTime: i,
                    }),
                    f['default'].createElement(p['default'], {
                      currentTime: u,
                      duration: r,
                    }),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = b), (b.propTypes = k), (b.displayName = 'SeekBar');
    },
    90228: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(67154)),
        o = l(a(34575)),
        i = l(a(93913)),
        u = l(a(78585)),
        d = l(a(29754)),
        s = l(a(81506)),
        c = l(a(2205)),
        f = l(a(55301)),
        h = n(a(12924)),
        v = l(a(94184)),
        p = l(a(83842)),
        m = l(a(31251)),
        y = {
          player: f['default'].object,
          actions: f['default'].object,
          vertical: f['default'].bool,
          className: f['default'].string,
          alwaysShowVolume: f['default'].bool,
        },
        g = { vertical: !1 },
        k = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, o['default'])(this, t),
              (n = (0, u['default'])(
                this,
                (0, d['default'])(t).call(this, e, a),
              )),
              (n.state = { active: !1 }),
              (n.handleClick = n.handleClick.bind((0, s['default'])(n))),
              (n.handleFocus = n.handleFocus.bind((0, s['default'])(n))),
              (n.handleBlur = n.handleBlur.bind((0, s['default'])(n))),
              n
            );
          }
          return (
            (0, c['default'])(t, e),
            (0, i['default'])(t, [
              {
                key: 'handleClick',
                value: function () {
                  var e = this.props,
                    t = e.player,
                    a = e.actions;
                  a.mute(!t.muted);
                },
              },
              {
                key: 'handleFocus',
                value: function () {
                  this.setState({ active: !0 });
                },
              },
              {
                key: 'handleBlur',
                value: function () {
                  this.setState({ active: !1 });
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    t = e.vertical,
                    a = e.player,
                    n = e.className,
                    l = !t,
                    o = this.volumeLevel;
                  return h['default'].createElement(
                    p['default'],
                    {
                      className: (0, v['default'])(
                        n,
                        {
                          'video-react-volume-menu-button-vertical': t,
                          'video-react-volume-menu-button-horizontal': !t,
                          'video-react-vol-muted': a.muted,
                          'video-react-vol-0': 0 === o && !a.muted,
                          'video-react-vol-1': 1 === o,
                          'video-react-vol-2': 2 === o,
                          'video-react-vol-3': 3 === o,
                          'video-react-slider-active':
                            this.props.alwaysShowVolume || this.state.active,
                          'video-react-lock-showing':
                            this.props.alwaysShowVolume || this.state.active,
                        },
                        'video-react-volume-menu-button',
                      ),
                      onClick: this.handleClick,
                      inline: l,
                    },
                    h['default'].createElement(
                      m['default'],
                      (0, r['default'])(
                        { onFocus: this.handleFocus, onBlur: this.handleBlur },
                        this.props,
                      ),
                    ),
                  );
                },
              },
              {
                key: 'volumeLevel',
                get: function () {
                  var e = this.props.player,
                    t = e.volume,
                    a = e.muted,
                    n = 3;
                  return (
                    0 === t || a
                      ? (n = 0)
                      : t < 0.33
                      ? (n = 1)
                      : t < 0.67 && (n = 2),
                    n
                  );
                },
              },
            ]),
            t
          );
        })(h.Component);
      (k.propTypes = y),
        (k.defaultProps = g),
        (k.displayName = 'VolumeMenuButton');
      var b = k;
      t.default = b;
    },
    60239: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = { children: c['default'].any },
        v = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.handleClick = n.handleClick.bind((0, d['default'])(n))),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'handleClick',
                value: function (e) {
                  e.preventDefault();
                },
              },
              {
                key: 'render',
                value: function () {
                  return f['default'].createElement(
                    'div',
                    {
                      className: 'video-react-menu video-react-lock-showing',
                      role: 'presentation',
                      onClick: this.handleClick,
                    },
                    f['default'].createElement(
                      'ul',
                      { className: 'video-react-menu-content' },
                      this.props.children,
                    ),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = v), (v.propTypes = h), (v.displayName = 'Menu');
    },
    9077: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = l(a(60239)),
        p = l(a(79533)),
        m = l(a(17191)),
        y = {
          inline: c['default'].bool,
          items: c['default'].array,
          className: c['default'].string,
          onSelectItem: c['default'].func,
          children: c['default'].any,
          selectedIndex: c['default'].number,
        },
        g = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.state = { active: !1, activateIndex: e.selectedIndex || 0 }),
              (n.commitSelection = n.commitSelection.bind(
                (0, d['default'])(n),
              )),
              (n.activateMenuItem = n.activateMenuItem.bind(
                (0, d['default'])(n),
              )),
              (n.handleClick = n.handleClick.bind((0, d['default'])(n))),
              (n.renderMenu = n.renderMenu.bind((0, d['default'])(n))),
              (n.handleFocus = n.handleFocus.bind((0, d['default'])(n))),
              (n.handleBlur = n.handleBlur.bind((0, d['default'])(n))),
              (n.handleUpArrow = n.handleUpArrow.bind((0, d['default'])(n))),
              (n.handleDownArrow = n.handleDownArrow.bind(
                (0, d['default'])(n),
              )),
              (n.handleEscape = n.handleEscape.bind((0, d['default'])(n))),
              (n.handleReturn = n.handleReturn.bind((0, d['default'])(n))),
              (n.handleTab = n.handleTab.bind((0, d['default'])(n))),
              (n.handleKeyPress = n.handleKeyPress.bind((0, d['default'])(n))),
              (n.handleSelectItem = n.handleSelectItem.bind(
                (0, d['default'])(n),
              )),
              (n.handleIndexChange = n.handleIndexChange.bind(
                (0, d['default'])(n),
              )),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'componentDidUpdate',
                value: function (e) {
                  e.selectedIndex !== this.props.selectedIndex &&
                    this.activateMenuItem(this.props.selectedIndex);
                },
              },
              {
                key: 'commitSelection',
                value: function (e) {
                  this.setState({ activateIndex: e }),
                    this.handleIndexChange(e);
                },
              },
              {
                key: 'activateMenuItem',
                value: function (e) {
                  this.setState({ activateIndex: e }),
                    this.handleIndexChange(e);
                },
              },
              {
                key: 'handleIndexChange',
                value: function (e) {
                  var t = this.props.onSelectItem;
                  t(e);
                },
              },
              {
                key: 'handleClick',
                value: function () {
                  this.setState(function (e) {
                    return { active: !e.active };
                  });
                },
              },
              {
                key: 'handleFocus',
                value: function () {
                  document.addEventListener('keydown', this.handleKeyPress);
                },
              },
              {
                key: 'handleBlur',
                value: function () {
                  this.setState({ active: !1 }),
                    document.removeEventListener(
                      'keydown',
                      this.handleKeyPress,
                    );
                },
              },
              {
                key: 'handleUpArrow',
                value: function (e) {
                  var t = this.props.items;
                  if (this.state.active) {
                    e.preventDefault();
                    var a = this.state.activateIndex - 1;
                    a < 0 && (a = t.length ? t.length - 1 : 0),
                      this.activateMenuItem(a);
                  }
                },
              },
              {
                key: 'handleDownArrow',
                value: function (e) {
                  var t = this.props.items;
                  if (this.state.active) {
                    e.preventDefault();
                    var a = this.state.activateIndex + 1;
                    a >= t.length && (a = 0), this.activateMenuItem(a);
                  }
                },
              },
              {
                key: 'handleTab',
                value: function (e) {
                  this.state.active &&
                    (e.preventDefault(),
                    this.commitSelection(this.state.activateIndex));
                },
              },
              {
                key: 'handleReturn',
                value: function (e) {
                  e.preventDefault(),
                    this.state.active
                      ? this.commitSelection(this.state.activateIndex)
                      : this.setState({ active: !0 });
                },
              },
              {
                key: 'handleEscape',
                value: function () {
                  this.setState({ active: !1, activateIndex: 0 });
                },
              },
              {
                key: 'handleKeyPress',
                value: function (e) {
                  27 === e.which
                    ? this.handleEscape(e)
                    : 9 === e.which
                    ? this.handleTab(e)
                    : 13 === e.which
                    ? this.handleReturn(e)
                    : 38 === e.which
                    ? this.handleUpArrow(e)
                    : 40 === e.which && this.handleDownArrow(e);
                },
              },
              {
                key: 'handleSelectItem',
                value: function (e) {
                  this.commitSelection(e);
                },
              },
              {
                key: 'renderMenu',
                value: function () {
                  var e = this;
                  if (!this.state.active) return null;
                  var t = this.props.items;
                  return f['default'].createElement(
                    v['default'],
                    null,
                    t.map(function (t, a) {
                      return f['default'].createElement(p['default'], {
                        item: t,
                        index: a,
                        onSelectItem: e.handleSelectItem,
                        activateIndex: e.state.activateIndex,
                        key: 'item-'.concat(a++),
                      });
                    }),
                  );
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.inline,
                    n = t.className;
                  return f['default'].createElement(
                    m['default'],
                    {
                      className: (0, h['default'])(
                        n,
                        {
                          'video-react-menu-button-inline': !!a,
                          'video-react-menu-button-popup': !a,
                          'video-react-menu-button-active': this.state.active,
                        },
                        'video-react-control video-react-button video-react-menu-button',
                      ),
                      role: 'button',
                      tabIndex: '0',
                      ref: function (t) {
                        e.menuButton = t;
                      },
                      onClick: this.handleClick,
                      onFocus: this.handleFocus,
                      onBlur: this.handleBlur,
                    },
                    this.props.children,
                    this.renderMenu(),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = g), (g.propTypes = y), (g.displayName = 'MenuButton');
    },
    79533: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = l(a(94184)),
        v = {
          item: c['default'].object,
          index: c['default'].number,
          activateIndex: c['default'].number,
          onSelectItem: c['default'].func,
        },
        p = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.handleClick = n.handleClick.bind((0, d['default'])(n))),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'handleClick',
                value: function () {
                  var e = this.props,
                    t = e.index,
                    a = e.onSelectItem;
                  a(t);
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props,
                    t = e.item,
                    a = e.index,
                    n = e.activateIndex;
                  return f['default'].createElement(
                    'li',
                    {
                      className: (0, h['default'])({
                        'video-react-menu-item': !0,
                        'video-react-selected': a === n,
                      }),
                      role: 'menuitem',
                      onClick: this.handleClick,
                    },
                    t.label,
                    f['default'].createElement('span', {
                      className: 'video-react-control-text',
                    }),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = p), (p.propTypes = v), (p.displayName = 'MenuItem');
    },
    62387: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(34575)),
        o = l(a(93913)),
        i = l(a(78585)),
        u = l(a(29754)),
        d = l(a(81506)),
        s = l(a(2205)),
        c = l(a(55301)),
        f = n(a(12924)),
        h = { player: c['default'].object, children: c['default'].any },
        v = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, r['default'])(this, t),
              (n = (0, i['default'])(
                this,
                (0, u['default'])(t).call(this, e, a),
              )),
              (n.handleClick = n.handleClick.bind((0, d['default'])(n))),
              n
            );
          }
          return (
            (0, s['default'])(t, e),
            (0, o['default'])(t, [
              {
                key: 'handleClick',
                value: function (e) {
                  e.preventDefault();
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this.props.children;
                  return f['default'].createElement(
                    'div',
                    {
                      className: 'video-react-menu',
                      onClick: this.handleClick,
                    },
                    f['default'].createElement(
                      'div',
                      { className: 'video-react-menu-content' },
                      e,
                    ),
                  );
                },
              },
            ]),
            t
          );
        })(f.Component);
      (t.default = v), (v.propTypes = h), (v.displayName = 'Popup');
    },
    83842: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = h);
      var l = n(a(67154)),
        r = n(a(60693)),
        o = n(a(55301)),
        i = n(a(12924)),
        u = n(a(94184)),
        d = n(a(17191)),
        s = n(a(62387)),
        c = {
          inline: o['default'].bool,
          onClick: o['default'].func.isRequired,
          onFocus: o['default'].func,
          onBlur: o['default'].func,
          className: o['default'].string,
        },
        f = { inline: !0 };
      function h(e) {
        var t = e.inline,
          a = e.className,
          n = (0, r['default'])({}, e);
        return (
          delete n.children,
          delete n.inline,
          delete n.className,
          i['default'].createElement(
            d['default'],
            (0, l['default'])(
              {
                className: (0, u['default'])(
                  a,
                  {
                    'video-react-menu-button-inline': !!t,
                    'video-react-menu-button-popup': !t,
                  },
                  'video-react-control video-react-button video-react-menu-button',
                ),
              },
              n,
            ),
            i['default'].createElement(s['default'], e),
          )
        );
      }
      (h.propTypes = c), (h.defaultProps = f), (h.displayName = 'PopupButton');
    },
    66008: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = a(43453),
        u = { player: l['default'].object, className: l['default'].string };
      function d(e) {
        var t = e.player,
          a = t.currentTime,
          n = t.duration,
          l = e.className,
          u = (0, i.formatTime)(a, n);
        return r['default'].createElement(
          'div',
          {
            className: (0, o['default'])(
              'video-react-current-time video-react-time-control video-react-control',
              l,
            ),
          },
          r['default'].createElement(
            'div',
            {
              className: 'video-react-current-time-display',
              'aria-live': 'off',
            },
            r['default'].createElement(
              'span',
              { className: 'video-react-control-text' },
              'Current Time ',
            ),
            u,
          ),
        );
      }
      (d.propTypes = u), (d.displayName = 'CurrentTimeDisplay');
      var s = d;
      t.default = s;
    },
    72042: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = a(43453),
        u = { player: l['default'].object, className: l['default'].string };
      function d(e) {
        var t = e.player.duration,
          a = e.className,
          n = (0, i.formatTime)(t);
        return r['default'].createElement(
          'div',
          {
            className: (0, o['default'])(
              a,
              'video-react-duration video-react-time-control video-react-control',
            ),
          },
          r['default'].createElement(
            'div',
            { className: 'video-react-duration-display', 'aria-live': 'off' },
            r['default'].createElement(
              'span',
              { className: 'video-react-control-text' },
              'Duration Time ',
            ),
            n,
          ),
        );
      }
      (d.propTypes = u), (d.displayName = 'DurationDisplay');
      var s = d;
      t.default = s;
    },
    61866: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = a(43453),
        u = { player: l['default'].object, className: l['default'].string };
      function d(e) {
        var t = e.player,
          a = t.currentTime,
          n = t.duration,
          l = e.className,
          u = n - a,
          d = (0, i.formatTime)(u);
        return r['default'].createElement(
          'div',
          {
            className: (0, o['default'])(
              'video-react-remaining-time video-react-time-control video-react-control',
              l,
            ),
          },
          r['default'].createElement(
            'div',
            {
              className: 'video-react-remaining-time-display',
              'aria-live': 'off',
            },
            r['default'].createElement(
              'span',
              { className: 'video-react-control-text' },
              'Remaining Time ',
            ),
            '-'.concat(d),
          ),
        );
      }
      (d.propTypes = u), (d.displayName = 'RemainingTimeDisplay');
      var s = d;
      t.default = s;
    },
    24609: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = u);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = { separator: l['default'].string, className: l['default'].string };
      function u(e) {
        var t = e.separator,
          a = e.className,
          n = t || '/';
        return r['default'].createElement(
          'div',
          {
            className: (0, o['default'])(
              'video-react-time-control video-react-time-divider',
              a,
            ),
            dir: 'ltr',
          },
          r['default'].createElement(
            'div',
            null,
            r['default'].createElement('span', null, n),
          ),
        );
      }
      (u.propTypes = i), (u.displayName = 'TimeDivider');
    },
    31251: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var r = l(a(67154)),
        o = l(a(34575)),
        i = l(a(93913)),
        u = l(a(78585)),
        d = l(a(29754)),
        s = l(a(81506)),
        c = l(a(2205)),
        f = l(a(55301)),
        h = n(a(12924)),
        v = l(a(94184)),
        p = l(a(21303)),
        m = l(a(30685)),
        y = {
          actions: f['default'].object,
          player: f['default'].object,
          className: f['default'].string,
          onFocus: f['default'].func,
          onBlur: f['default'].func,
        },
        g = (function (e) {
          function t(e, a) {
            var n;
            return (
              (0, o['default'])(this, t),
              (n = (0, u['default'])(
                this,
                (0, d['default'])(t).call(this, e, a),
              )),
              (n.state = { percentage: '0%' }),
              (n.handleMouseMove = n.handleMouseMove.bind(
                (0, s['default'])(n),
              )),
              (n.handlePercentageChange = n.handlePercentageChange.bind(
                (0, s['default'])(n),
              )),
              (n.checkMuted = n.checkMuted.bind((0, s['default'])(n))),
              (n.getPercent = n.getPercent.bind((0, s['default'])(n))),
              (n.stepForward = n.stepForward.bind((0, s['default'])(n))),
              (n.stepBack = n.stepBack.bind((0, s['default'])(n))),
              (n.handleFocus = n.handleFocus.bind((0, s['default'])(n))),
              (n.handleBlur = n.handleBlur.bind((0, s['default'])(n))),
              (n.handleClick = n.handleClick.bind((0, s['default'])(n))),
              n
            );
          }
          return (
            (0, c['default'])(t, e),
            (0, i['default'])(t, [
              { key: 'componentDidMount', value: function () {} },
              {
                key: 'getPercent',
                value: function () {
                  var e = this.props.player;
                  return e.muted ? 0 : e.volume;
                },
              },
              {
                key: 'checkMuted',
                value: function () {
                  var e = this.props,
                    t = e.player,
                    a = e.actions;
                  t.muted && a.mute(!1);
                },
              },
              {
                key: 'handleMouseMove',
                value: function (e) {
                  var t = this.props.actions;
                  this.checkMuted();
                  var a = this.slider.calculateDistance(e);
                  t.changeVolume(a);
                },
              },
              {
                key: 'stepForward',
                value: function () {
                  var e = this.props,
                    t = e.player,
                    a = e.actions;
                  this.checkMuted(), a.changeVolume(t.volume + 0.1);
                },
              },
              {
                key: 'stepBack',
                value: function () {
                  var e = this.props,
                    t = e.player,
                    a = e.actions;
                  this.checkMuted(), a.changeVolume(t.volume - 0.1);
                },
              },
              {
                key: 'handleFocus',
                value: function (e) {
                  this.props.onFocus && this.props.onFocus(e);
                },
              },
              {
                key: 'handleBlur',
                value: function (e) {
                  this.props.onBlur && this.props.onBlur(e);
                },
              },
              {
                key: 'handlePercentageChange',
                value: function (e) {
                  e !== this.state.percentage &&
                    this.setState({ percentage: e });
                },
              },
              {
                key: 'handleClick',
                value: function (e) {
                  e.stopPropagation();
                },
              },
              {
                key: 'render',
                value: function () {
                  var e = this,
                    t = this.props,
                    a = t.player,
                    n = t.className,
                    l = (100 * a.volume).toFixed(2);
                  return h['default'].createElement(
                    p['default'],
                    (0, r['default'])(
                      {
                        ref: function (t) {
                          e.slider = t;
                        },
                        label: 'volume level',
                        valuenow: l,
                        valuetext: ''.concat(l, '%'),
                        onMouseMove: this.handleMouseMove,
                        onFocus: this.handleFocus,
                        onBlur: this.handleBlur,
                        onClick: this.handleClick,
                        sliderActive: this.handleFocus,
                        sliderInactive: this.handleBlur,
                        getPercent: this.getPercent,
                        onPercentageChange: this.handlePercentageChange,
                        stepForward: this.stepForward,
                        stepBack: this.stepBack,
                      },
                      this.props,
                      {
                        className: (0, v['default'])(
                          n,
                          'video-react-volume-bar video-react-slider-bar',
                        ),
                      },
                    ),
                    h['default'].createElement(m['default'], this.props),
                  );
                },
              },
            ]),
            t
          );
        })(h.Component);
      (g.propTypes = y), (g.displayName = 'VolumeBar');
      var k = g;
      t.default = k;
    },
    30685: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(55301)),
        r = n(a(12924)),
        o = n(a(94184)),
        i = {
          percentage: l['default'].string,
          vertical: l['default'].bool,
          className: l['default'].string,
        },
        u = { percentage: '100%', vertical: !1 };
      function d(e) {
        var t = e.percentage,
          a = e.vertical,
          n = e.className,
          l = {};
        return (
          a ? (l.height = t) : (l.width = t),
          r['default'].createElement(
            'div',
            {
              className: (0, o['default'])(n, 'video-react-volume-level'),
              style: l,
            },
            r['default'].createElement('span', {
              className: 'video-react-control-text',
            }),
          )
        );
      }
      (d.propTypes = i), (d.defaultProps = u), (d.displayName = 'VolumeLevel');
      var s = d;
      t.default = s;
    },
    88330: function (e, t, a) {
      'use strict';
      var n = a(20862),
        l = a(95318);
      Object.defineProperty(t, 'J5', {
        enumerable: !0,
        get: function () {
          return r['default'];
        },
      }),
        Object.defineProperty(t, 'sT', {
          enumerable: !0,
          get: function () {
            return i['default'];
          },
        });
      var r = l(a(97617)),
        o = l(a(20122)),
        i = l(a(1638)),
        u = l(a(6238)),
        d = l(a(78814)),
        s = l(a(21303)),
        c = l(a(77423)),
        f = l(a(19097)),
        h = l(a(7473)),
        v = l(a(17058)),
        p = l(a(50183)),
        m = l(a(9356)),
        y = l(a(93282)),
        g = l(a(54850)),
        k = l(a(25775)),
        b = l(a(73258)),
        E = l(a(87020)),
        C = l(a(36082)),
        P = l(a(90228)),
        T = l(a(44223)),
        S = l(a(26203)),
        N = l(a(77557)),
        M = l(a(61866)),
        A = l(a(66008)),
        _ = l(a(72042)),
        w = l(a(24609)),
        D = l(a(9077)),
        I = n(a(52234));
      var R = n(a(38359));
      var O = a(99610);
    },
    99610: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = o),
        (t.operationReducer = t.playerReducer = void 0);
      var l = n(a(39256)),
        r = n(a(60945));
      function o() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 ? arguments[1] : void 0;
        return {
          player: (0, l['default'])(e.player, t),
          operation: (0, r['default'])(e.operation, t),
        };
      }
      var i = l['default'];
      t.playerReducer = i;
      var u = r['default'];
      t.operationReducer = u;
    },
    60945: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = i);
      var l = n(a(60693)),
        r = a(52234),
        o = { count: 0, operation: { action: '', source: '' } };
      function i() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : o,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case r.OPERATE:
            return (0, l['default'])({}, e, {
              count: e.count + 1,
              operation: (0, l['default'])({}, e.operation, t.operation),
            });
          default:
            return e;
        }
      }
    },
    39256: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }), (t.default = u);
      var l = n(a(60693)),
        r = a(38359),
        o = a(52234),
        i = {
          currentSrc: null,
          duration: 0,
          currentTime: 0,
          seekingTime: 0,
          buffered: null,
          waiting: !1,
          seeking: !1,
          paused: !0,
          autoPaused: !1,
          ended: !1,
          playbackRate: 1,
          muted: !1,
          volume: 1,
          readyState: 0,
          networkState: 0,
          videoWidth: 0,
          videoHeight: 0,
          hasStarted: !1,
          userActivity: !0,
          isActive: !1,
          isFullscreen: !1,
          activeTextTrack: null,
        };
      function u() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : i,
          t = arguments.length > 1 ? arguments[1] : void 0;
        switch (t.type) {
          case o.USER_ACTIVATE:
            return (0, l['default'])({}, e, { userActivity: t.activity });
          case o.PLAYER_ACTIVATE:
            return (0, l['default'])({}, e, { isActive: t.activity });
          case o.FULLSCREEN_CHANGE:
            return (0, l['default'])({}, e, { isFullscreen: !!t.isFullscreen });
          case r.SEEKING_TIME:
            return (0, l['default'])({}, e, { seekingTime: t.time });
          case r.END_SEEKING:
            return (0, l['default'])({}, e, { seekingTime: 0 });
          case r.LOAD_START:
            return (0, l['default'])({}, e, t.videoProps, {
              hasStarted: !1,
              ended: !1,
            });
          case r.CAN_PLAY:
            return (0, l['default'])({}, e, t.videoProps, { waiting: !1 });
          case r.WAITING:
            return (0, l['default'])({}, e, t.videoProps, { waiting: !0 });
          case r.CAN_PLAY_THROUGH:
          case r.PLAYING:
            return (0, l['default'])({}, e, t.videoProps, { waiting: !1 });
          case r.PLAY:
            return (0, l['default'])({}, e, t.videoProps, {
              ended: !1,
              paused: !1,
              autoPaused: !1,
              waiting: !1,
              hasStarted: !0,
            });
          case r.PAUSE:
            return (0, l['default'])({}, e, t.videoProps, { paused: !0 });
          case r.END:
            return (0, l['default'])({}, e, t.videoProps, { ended: !0 });
          case r.SEEKING:
            return (0, l['default'])({}, e, t.videoProps, { seeking: !0 });
          case r.SEEKED:
            return (0, l['default'])({}, e, t.videoProps, { seeking: !1 });
          case r.ERROR:
            return (0, l['default'])({}, e, t.videoProps, {
              error: 'UNKNOWN ERROR',
              ended: !0,
            });
          case r.DURATION_CHANGE:
          case r.TIME_UPDATE:
          case r.VOLUME_CHANGE:
          case r.PROGRESS_CHANGE:
          case r.RATE_CHANGE:
          case r.SUSPEND:
          case r.ABORT:
          case r.EMPTIED:
          case r.STALLED:
          case r.LOADED_META_DATA:
          case r.LOADED_DATA:
          case r.RESIZE:
            return (0, l['default'])({}, e, t.videoProps);
          case r.ACTIVATE_TEXT_TRACK:
            return (0, l['default'])({}, e, { activeTextTrack: t.textTrack });
          default:
            return e;
        }
      }
    },
    87152: function (e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.IS_IOS = t.IS_IPOD = t.IS_IPHONE = t.IS_IPAD = void 0);
      var a =
          'undefined' !== typeof window && window.navigator
            ? window.navigator.userAgent
            : '',
        n = /iPad/i.test(a);
      t.IS_IPAD = n;
      var l = /iPhone/i.test(a) && !n;
      t.IS_IPHONE = l;
      var r = /iPod/i.test(a);
      t.IS_IPOD = r;
      var o = l || n || r;
      t.IS_IOS = o;
    },
    6021: function (e, t) {
      'use strict';
      function a(e) {
        var t;
        if (
          (e.getBoundingClientRect &&
            e.parentNode &&
            (t = e.getBoundingClientRect()),
          !t)
        )
          return { left: 0, top: 0 };
        var a = document,
          n = a.body,
          l = a.documentElement,
          r = l.clientLeft || n.clientLeft || 0,
          o = window.pageXOffset || n.scrollLeft,
          i = t.left + o - r,
          u = l.clientTop || n.clientTop || 0,
          d = window.pageYOffset || n.scrollTop,
          s = t.top + d - u;
        return { left: Math.round(i), top: Math.round(s) };
      }
      function n(e, t) {
        var n = {},
          l = a(e),
          r = e.offsetWidth,
          o = e.offsetHeight,
          i = l.top,
          u = l.left,
          d = t.pageY,
          s = t.pageX;
        return (
          t.changedTouches &&
            ((s = t.changedTouches[0].pageX), (d = t.changedTouches[0].pageY)),
          (n.y = Math.max(0, Math.min(1, (i - d + o) / o))),
          (n.x = Math.max(0, Math.min(1, (s - u) / r))),
          n
        );
      }
      function l(e) {
        e && e.blur && e.blur();
      }
      function r(e) {
        e && e.focus && e.focus();
      }
      function o(e, t) {
        for (var a = e.className.split(' '), n = 0; n < a.length; n++)
          if (a[n].toLowerCase() === t.toLowerCase()) return !0;
        return !1;
      }
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.findElPosition = a),
        (t.getPointerPosition = n),
        (t.blurNode = l),
        (t.focusNode = r),
        (t.hasClass = o);
    },
    3387: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.default = void 0);
      var l = n(a(34575)),
        r = n(a(93913)),
        o = (function () {
          function e() {
            (0, l['default'])(this, e);
          }
          return (
            (0, r['default'])(e, [
              {
                key: 'request',
                value: function (e) {
                  e.requestFullscreen
                    ? e.requestFullscreen()
                    : e.webkitRequestFullscreen
                    ? e.webkitRequestFullscreen()
                    : e.mozRequestFullScreen
                    ? e.mozRequestFullScreen()
                    : e.msRequestFullscreen && e.msRequestFullscreen();
                },
              },
              {
                key: 'exit',
                value: function () {
                  document.exitFullscreen
                    ? document.exitFullscreen()
                    : document.webkitExitFullscreen
                    ? document.webkitExitFullscreen()
                    : document.mozCancelFullScreen
                    ? document.mozCancelFullScreen()
                    : document.msExitFullscreen && document.msExitFullscreen();
                },
              },
              {
                key: 'addEventListener',
                value: function (e) {
                  document.addEventListener('fullscreenchange', e),
                    document.addEventListener('webkitfullscreenchange', e),
                    document.addEventListener('mozfullscreenchange', e),
                    document.addEventListener('MSFullscreenChange', e);
                },
              },
              {
                key: 'removeEventListener',
                value: function (e) {
                  document.removeEventListener('fullscreenchange', e),
                    document.removeEventListener('webkitfullscreenchange', e),
                    document.removeEventListener('mozfullscreenchange', e),
                    document.removeEventListener('MSFullscreenChange', e);
                },
              },
              {
                key: 'isFullscreen',
                get: function () {
                  return (
                    document.fullscreenElement ||
                    document.webkitFullscreenElement ||
                    document.mozFullScreenElement ||
                    document.msFullscreenElement
                  );
                },
              },
              {
                key: 'enabled',
                get: function () {
                  return (
                    document.fullscreenEnabled ||
                    document.webkitFullscreenEnabled ||
                    document.mozFullScreenEnabled ||
                    document.msFullscreenEnabled
                  );
                },
              },
            ]),
            e
          );
        })(),
        i = new o();
      t.default = i;
    },
    43453: function (e, t, a) {
      'use strict';
      var n = a(95318);
      Object.defineProperty(t, '__esModule', { value: !0 }),
        (t.formatTime = d),
        (t.isVideoChild = s),
        (t.mergeAndSortChildren = h),
        (t.deprecatedWarning = v),
        (t.throttle = p),
        (t.mediaProperties = void 0);
      var l = n(a(319)),
        r = n(a(60693)),
        o = n(a(6479)),
        i = n(a(12924)),
        u =
          Number.isNaN ||
          function (e) {
            return e !== e;
          };
      function d() {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e,
          a = Math.floor(e % 60),
          n = Math.floor((e / 60) % 60),
          l = Math.floor(e / 3600),
          r = Math.floor((t / 60) % 60),
          o = Math.floor(t / 3600);
        return (
          (u(e) || e === 1 / 0) && ((l = '-'), (n = '-'), (a = '-')),
          (l = l > 0 || o > 0 ? ''.concat(l, ':') : ''),
          (n = ''.concat((l || r >= 10) && n < 10 ? '0'.concat(n) : n, ':')),
          (a = a < 10 ? '0'.concat(a) : a),
          l + n + a
        );
      }
      function s(e) {
        return (
          !(!e.props || !e.props.isVideoChild) ||
          'source' === e.type ||
          'track' === e.type
        );
      }
      var c = function (e, t) {
          return e.filter(t)[0];
        },
        f = function (e, t) {
          var a = e.type,
            n = t.type;
          return 'string' === typeof a || 'string' === typeof n
            ? a === n
            : 'function' === typeof a &&
                'function' === typeof n &&
                a.displayName === n.displayName;
        };
      function h(e, t, a) {
        var n =
            arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
          l = i['default'].Children.toArray(t),
          u = (a.order, (0, o['default'])(a, ['order']));
        return l
          .filter(function (e) {
            return !e.props.disabled;
          })
          .concat(
            e.filter(function (e) {
              return !c(l, function (t) {
                return f(t, e);
              });
            }),
          )
          .map(function (t) {
            var a = c(e, function (e) {
                return f(e, t);
              }),
              n = a ? a.props : {},
              l = (0, r['default'])({}, u, n, t.props),
              o = i['default'].cloneElement(t, l, t.props.children);
            return o;
          })
          .sort(function (e, t) {
            return (e.props.order || n) - (t.props.order || n);
          });
      }
      function v(e, t) {
        console.warn(
          'WARNING: '
            .concat(e, ' will be deprecated soon! Please use ')
            .concat(t, ' instead.'),
        );
      }
      function p(e, t) {
        var a = arguments,
          n = !1;
        return function () {
          n ||
            (e.apply(void 0, (0, l['default'])(a)),
            (n = !0),
            setTimeout(function () {
              n = !1;
            }, t));
        };
      }
      var m = [
        'error',
        'src',
        'srcObject',
        'currentSrc',
        'crossOrigin',
        'networkState',
        'preload',
        'buffered',
        'readyState',
        'seeking',
        'currentTime',
        'duration',
        'paused',
        'defaultPlaybackRate',
        'playbackRate',
        'played',
        'seekable',
        'ended',
        'autoplay',
        'loop',
        'mediaGroup',
        'controller',
        'controls',
        'volume',
        'muted',
        'defaultMuted',
        'audioTracks',
        'videoTracks',
        'textTracks',
        'width',
        'height',
        'videoWidth',
        'videoHeight',
        'poster',
      ];
      t.mediaProperties = m;
    },
  },
]);
