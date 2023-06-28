(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [4224, 6950],
  {
    54224: function (e, t, a) {
      'use strict';
      a.r(t);
      var r = a(91896),
        o = a(12924),
        l = a.n(o),
        c = a(26950),
        n = {
          placeholder: 'https://s1.ax1x.com/2023/03/27/ppsbWan.jpg',
          source: 'youtube',
          url: 'O6Xo21L0ybE',
          aspectRatio: '4:3',
          autoplay: !1,
          brandedUI: !1,
          defaultActive: !1,
          hd: !1,
        };
      t['default'] = () =>
        l().createElement(c.default, (0, r.Z)({ isTpl: !1 }, n));
    },
    26950: function (e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, {
          default: function () {
            return C;
          },
        });
      var r = a(93224),
        o = a(12924),
        l = a.n(o),
        c = a(72624),
        n = a.n(c),
        i = a(22122),
        s = a(41788),
        p = a(86010),
        d = (a(55301), a(92063)),
        u = a(28935),
        m = a(12519),
        h = a(92248),
        v = a(93619),
        f = a(90327),
        b = a(65382),
        y = (function (e) {
          function t() {
            for (
              var t, a = arguments.length, r = new Array(a), o = 0;
              o < a;
              o++
            )
              r[o] = arguments[o];
            return (
              (t = e.call.apply(e, [this].concat(r)) || this),
              (t.handleClick = function (e) {
                var a = t.props.onClick,
                  r = t.state.active;
                a && a(e, (0, i.Z)({}, t.props, { active: !0 })),
                  r || t.setState({ active: !0 });
              }),
              t
            );
          }
          (0, s.Z)(t, e);
          var a = t.prototype;
          return (
            (a.getSrc = function () {
              var e = this.props,
                t = e.autoplay,
                a = void 0 === t || t,
                r = e.brandedUI,
                o = void 0 !== r && r,
                l = e.color,
                c = void 0 === l ? '#444444' : l,
                n = e.hd,
                i = void 0 === n || n,
                s = e.id,
                p = e.source,
                d = e.url;
              return 'youtube' === p
                ? [
                    '//www.youtube.com/embed/' + s,
                    '?autohide=true',
                    '&amp;autoplay=' + a,
                    '&amp;color=' + encodeURIComponent(c),
                    '&amp;hq=' + i,
                    '&amp;jsapi=false',
                    '&amp;modestbranding=' + o,
                    '&amp;rel=' + (o ? 0 : 1),
                  ].join('')
                : 'vimeo' === p
                ? [
                    '//player.vimeo.com/video/' + s,
                    '?api=false',
                    '&amp;autoplay=' + a,
                    '&amp;byline=false',
                    '&amp;color=' + encodeURIComponent(c),
                    '&amp;portrait=false',
                    '&amp;title=false',
                  ].join('')
                : d;
            }),
            (a.render = function () {
              var e = this.props,
                a = e.aspectRatio,
                r = e.className,
                o = e.icon,
                c = e.placeholder,
                n = this.state.active,
                s = (0, p.default)('ui', a, (0, d.lG)(n, 'active'), 'embed', r),
                h = (0, u.Z)(t, this.props),
                v = (0, m.Z)(t, this.props),
                f = void 0 !== o ? o : 'video play';
              return l().createElement(
                v,
                (0, i.Z)({}, h, { className: s, onClick: this.handleClick }),
                b.Z.create(f, { autoGenerateKey: !1 }),
                c &&
                  l().createElement('img', {
                    className: 'placeholder',
                    src: c,
                  }),
                this.renderEmbed(),
              );
            }),
            (a.renderEmbed = function () {
              var e = this.props,
                t = e.children,
                a = e.content,
                r = e.iframe,
                o = e.source,
                c = this.state.active;
              return c
                ? h.kK(t)
                  ? h.kK(a)
                    ? l().createElement(
                        'div',
                        { className: 'embed' },
                        (0, v.PI)(h.kK(r) ? this.getSrc() : r, {
                          defaultProps: {
                            allowFullScreen: !1,
                            frameBorder: 0,
                            height: '100%',
                            scrolling: 'no',
                            src: this.getSrc(),
                            title: 'Embedded content from ' + o + '.',
                            width: '100%',
                          },
                          autoGenerateKey: !1,
                        }),
                      )
                    : l().createElement('div', { className: 'embed' }, a)
                  : l().createElement('div', { className: 'embed' }, t)
                : null;
            }),
            t
          );
        })(f.Z);
      (y.handledProps = [
        'active',
        'as',
        'aspectRatio',
        'autoplay',
        'brandedUI',
        'children',
        'className',
        'color',
        'content',
        'defaultActive',
        'hd',
        'icon',
        'id',
        'iframe',
        'onClick',
        'placeholder',
        'source',
        'url',
      ]),
        (y.propTypes = {}),
        (y.autoControlledProps = ['active']);
      var E = a(76763),
        k = ['isTpl'],
        g = (e) => {
          var t = e.isTpl,
            a = (0, r.Z)(e, k),
            o = a.placeholder,
            c = a.source,
            i = a.url,
            s = a.aspectRatio,
            p = a.autoplay,
            d = a.brandedUI,
            u = a.defaultActive,
            m = a.hd;
          return l().createElement(
            l().Fragment,
            null,
            t && l().createElement(E.Z, { src: n(), alt: 'Embed' }),
            !t &&
              l().createElement(
                'div',
                null,
                l().createElement(y, {
                  id: i,
                  placeholder: o,
                  source: c,
                  aspectRatio: s,
                  autoplay: p,
                  brandedUI: d,
                  defaultActive: u,
                  hd: m,
                }),
              ),
          );
        },
        C = g;
    },
    72624: function (e, t, a) {
      e.exports = a.p + 'static/video.33b88ab5.png';
    },
  },
]);
