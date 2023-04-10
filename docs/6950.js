(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [6950],
  {
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
        n = a(72624),
        c = a.n(n),
        i = a(22122),
        s = a(41788),
        d = a(86010),
        p = (a(55301), a(92063)),
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
                n = void 0 === l ? '#444444' : l,
                c = e.hd,
                i = void 0 === c || c,
                s = e.id,
                d = e.source,
                p = e.url;
              return 'youtube' === d
                ? [
                    '//www.youtube.com/embed/' + s,
                    '?autohide=true',
                    '&amp;autoplay=' + a,
                    '&amp;color=' + encodeURIComponent(n),
                    '&amp;hq=' + i,
                    '&amp;jsapi=false',
                    '&amp;modestbranding=' + o,
                    '&amp;rel=' + (o ? 0 : 1),
                  ].join('')
                : 'vimeo' === d
                ? [
                    '//player.vimeo.com/video/' + s,
                    '?api=false',
                    '&amp;autoplay=' + a,
                    '&amp;byline=false',
                    '&amp;color=' + encodeURIComponent(n),
                    '&amp;portrait=false',
                    '&amp;title=false',
                  ].join('')
                : p;
            }),
            (a.render = function () {
              var e = this.props,
                a = e.aspectRatio,
                r = e.className,
                o = e.icon,
                n = e.placeholder,
                c = this.state.active,
                s = (0, d.default)('ui', a, (0, p.lG)(c, 'active'), 'embed', r),
                h = (0, u.Z)(t, this.props),
                v = (0, m.Z)(t, this.props),
                f = void 0 !== o ? o : 'video play';
              return l().createElement(
                v,
                (0, i.Z)({}, h, { className: s, onClick: this.handleClick }),
                b.Z.create(f, { autoGenerateKey: !1 }),
                n &&
                  l().createElement('img', {
                    className: 'placeholder',
                    src: n,
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
                n = this.state.active;
              return n
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
      var E = a(49282),
        k = ['isTpl'],
        g = (e) => {
          var t = e.isTpl,
            a = (0, r.Z)(e, k),
            o = a.placeholder,
            n = a.source,
            i = a.url,
            s = a.aspectRatio,
            d = a.autoplay,
            p = a.brandedUI,
            u = a.defaultActive,
            m = a.hd;
          return l().createElement(
            l().Fragment,
            null,
            t && l().createElement(E.Z, { src: c(), alt: 'Embed' }),
            !t &&
              l().createElement(
                'div',
                null,
                l().createElement(y, {
                  id: i,
                  placeholder: o,
                  source: n,
                  aspectRatio: s,
                  autoplay: d,
                  brandedUI: p,
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
