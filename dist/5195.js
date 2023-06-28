(self['webpackChunkenvelope'] = self['webpackChunkenvelope'] || []).push([
  [5195],
  {
    85909: function (t, e, i) {
      'use strict';
      function n() {
        return (
          (n = Object.assign
            ? Object.assign.bind()
            : function (t) {
                for (var e = 1; e < arguments.length; e++) {
                  var i = arguments[e];
                  for (var n in i)
                    Object.prototype.hasOwnProperty.call(i, n) && (t[n] = i[n]);
                }
                return t;
              }),
          n.apply(this, arguments)
        );
      }
      function s(t, e) {
        if (null == t) return {};
        var i,
          n,
          s = {},
          r = Object.keys(t);
        for (n = 0; n < r.length; n++)
          (i = r[n]), e.indexOf(i) >= 0 || (s[i] = t[i]);
        return s;
      }
      i.d(e, {
        ZP: function () {
          return Cg;
        },
      });
      var r = i(12924);
      class o {
        constructor() {}
        lineAt(t) {
          if (t < 0 || t > this.length)
            throw new RangeError(
              `Invalid position ${t} in document of length ${this.length}`,
            );
          return this.lineInner(t, !1, 1, 0);
        }
        line(t) {
          if (t < 1 || t > this.lines)
            throw new RangeError(
              `Invalid line number ${t} in ${this.lines}-line document`,
            );
          return this.lineInner(t, !0, 1, 0);
        }
        replace(t, e, i) {
          let n = [];
          return (
            this.decompose(0, t, n, 2),
            i.length && i.decompose(0, i.length, n, 3),
            this.decompose(e, this.length, n, 1),
            a.from(n, this.length - (e - t) + i.length)
          );
        }
        append(t) {
          return this.replace(this.length, this.length, t);
        }
        slice(t, e = this.length) {
          let i = [];
          return this.decompose(t, e, i, 0), a.from(i, e - t);
        }
        eq(t) {
          if (t == this) return !0;
          if (t.length != this.length || t.lines != this.lines) return !1;
          let e = this.scanIdentical(t, 1),
            i = this.length - this.scanIdentical(t, -1),
            n = new d(this),
            s = new d(t);
          for (let r = e, o = e; ; ) {
            if (
              (n.next(r),
              s.next(r),
              (r = 0),
              n.lineBreak != s.lineBreak ||
                n.done != s.done ||
                n.value != s.value)
            )
              return !1;
            if (((o += n.value.length), n.done || o >= i)) return !0;
          }
        }
        iter(t = 1) {
          return new d(this, t);
        }
        iterRange(t, e = this.length) {
          return new f(this, t, e);
        }
        iterLines(t, e) {
          let i;
          if (null == t) i = this.iter();
          else {
            null == e && (e = this.lines + 1);
            let n = this.line(t).from;
            i = this.iterRange(
              n,
              Math.max(
                n,
                e == this.lines + 1
                  ? this.length
                  : e <= 1
                  ? 0
                  : this.line(e - 1).to,
              ),
            );
          }
          return new p(i);
        }
        toString() {
          return this.sliceString(0);
        }
        toJSON() {
          let t = [];
          return this.flatten(t), t;
        }
        static of(t) {
          if (0 == t.length)
            throw new RangeError('A document must have at least one line');
          return 1 != t.length || t[0]
            ? t.length <= 32
              ? new l(t)
              : a.from(l.split(t, []))
            : o.empty;
        }
      }
      class l extends o {
        constructor(t, e = h(t)) {
          super(), (this.text = t), (this.length = e);
        }
        get lines() {
          return this.text.length;
        }
        get children() {
          return null;
        }
        lineInner(t, e, i, n) {
          for (let s = 0; ; s++) {
            let r = this.text[s],
              o = n + r.length;
            if ((e ? i : o) >= t) return new m(n, o, i, r);
            (n = o + 1), i++;
          }
        }
        decompose(t, e, i, n) {
          let s =
            t <= 0 && e >= this.length
              ? this
              : new l(
                  u(this.text, t, e),
                  Math.min(e, this.length) - Math.max(0, t),
                );
          if (1 & n) {
            let t = i.pop(),
              e = c(s.text, t.text.slice(), 0, s.length);
            if (e.length <= 32) i.push(new l(e, t.length + s.length));
            else {
              let t = e.length >> 1;
              i.push(new l(e.slice(0, t)), new l(e.slice(t)));
            }
          } else i.push(s);
        }
        replace(t, e, i) {
          if (!(i instanceof l)) return super.replace(t, e, i);
          let n = c(this.text, c(i.text, u(this.text, 0, t)), e),
            s = this.length + i.length - (e - t);
          return n.length <= 32 ? new l(n, s) : a.from(l.split(n, []), s);
        }
        sliceString(t, e = this.length, i = '\n') {
          let n = '';
          for (let s = 0, r = 0; s <= e && r < this.text.length; r++) {
            let o = this.text[r],
              l = s + o.length;
            s > t && r && (n += i),
              t < l && e > s && (n += o.slice(Math.max(0, t - s), e - s)),
              (s = l + 1);
          }
          return n;
        }
        flatten(t) {
          for (let e of this.text) t.push(e);
        }
        scanIdentical() {
          return 0;
        }
        static split(t, e) {
          let i = [],
            n = -1;
          for (let s of t)
            i.push(s),
              (n += s.length + 1),
              32 == i.length && (e.push(new l(i, n)), (i = []), (n = -1));
          return n > -1 && e.push(new l(i, n)), e;
        }
      }
      class a extends o {
        constructor(t, e) {
          super(), (this.children = t), (this.length = e), (this.lines = 0);
          for (let i of t) this.lines += i.lines;
        }
        lineInner(t, e, i, n) {
          for (let s = 0; ; s++) {
            let r = this.children[s],
              o = n + r.length,
              l = i + r.lines - 1;
            if ((e ? l : o) >= t) return r.lineInner(t, e, i, n);
            (n = o + 1), (i = l + 1);
          }
        }
        decompose(t, e, i, n) {
          for (let s = 0, r = 0; r <= e && s < this.children.length; s++) {
            let o = this.children[s],
              l = r + o.length;
            if (t <= l && e >= r) {
              let s = n & ((r <= t ? 1 : 0) | (l >= e ? 2 : 0));
              r >= t && l <= e && !s
                ? i.push(o)
                : o.decompose(t - r, e - r, i, s);
            }
            r = l + 1;
          }
        }
        replace(t, e, i) {
          if (i.lines < this.lines)
            for (let n = 0, s = 0; n < this.children.length; n++) {
              let r = this.children[n],
                o = s + r.length;
              if (t >= s && e <= o) {
                let l = r.replace(t - s, e - s, i),
                  h = this.lines - r.lines + l.lines;
                if (l.lines < h >> 4 && l.lines > h >> 6) {
                  let s = this.children.slice();
                  return (s[n] = l), new a(s, this.length - (e - t) + i.length);
                }
                return super.replace(s, o, l);
              }
              s = o + 1;
            }
          return super.replace(t, e, i);
        }
        sliceString(t, e = this.length, i = '\n') {
          let n = '';
          for (let s = 0, r = 0; s < this.children.length && r <= e; s++) {
            let o = this.children[s],
              l = r + o.length;
            r > t && s && (n += i),
              t < l && e > r && (n += o.sliceString(t - r, e - r, i)),
              (r = l + 1);
          }
          return n;
        }
        flatten(t) {
          for (let e of this.children) e.flatten(t);
        }
        scanIdentical(t, e) {
          if (!(t instanceof a)) return 0;
          let i = 0,
            [n, s, r, o] =
              e > 0
                ? [0, 0, this.children.length, t.children.length]
                : [this.children.length - 1, t.children.length - 1, -1, -1];
          for (; ; n += e, s += e) {
            if (n == r || s == o) return i;
            let l = this.children[n],
              a = t.children[s];
            if (l != a) return i + l.scanIdentical(a, e);
            i += l.length + 1;
          }
        }
        static from(t, e = t.reduce((t, e) => t + e.length + 1, -1)) {
          let i = 0;
          for (let l of t) i += l.lines;
          if (i < 32) {
            let i = [];
            for (let e of t) e.flatten(i);
            return new l(i, e);
          }
          let n = Math.max(32, i >> 5),
            s = n << 1,
            r = n >> 1,
            o = [],
            h = 0,
            c = -1,
            u = [];
          function d(t) {
            let e;
            if (t.lines > s && t instanceof a) for (let i of t.children) d(i);
            else
              t.lines > r && (h > r || !h)
                ? (f(), o.push(t))
                : t instanceof l &&
                  h &&
                  (e = u[u.length - 1]) instanceof l &&
                  t.lines + e.lines <= 32
                ? ((h += t.lines),
                  (c += t.length + 1),
                  (u[u.length - 1] = new l(
                    e.text.concat(t.text),
                    e.length + 1 + t.length,
                  )))
                : (h + t.lines > n && f(),
                  (h += t.lines),
                  (c += t.length + 1),
                  u.push(t));
          }
          function f() {
            0 != h &&
              (o.push(1 == u.length ? u[0] : a.from(u, c)),
              (c = -1),
              (h = u.length = 0));
          }
          for (let l of t) d(l);
          return f(), 1 == o.length ? o[0] : new a(o, e);
        }
      }
      function h(t) {
        let e = -1;
        for (let i of t) e += i.length + 1;
        return e;
      }
      function c(t, e, i = 0, n = 1e9) {
        for (let s = 0, r = 0, o = !0; r < t.length && s <= n; r++) {
          let l = t[r],
            a = s + l.length;
          a >= i &&
            (a > n && (l = l.slice(0, n - s)),
            s < i && (l = l.slice(i - s)),
            o ? ((e[e.length - 1] += l), (o = !1)) : e.push(l)),
            (s = a + 1);
        }
        return e;
      }
      function u(t, e, i) {
        return c(t, [''], e, i);
      }
      o.empty = new l([''], 0);
      class d {
        constructor(t, e = 1) {
          (this.dir = e),
            (this.done = !1),
            (this.lineBreak = !1),
            (this.value = ''),
            (this.nodes = [t]),
            (this.offsets = [
              e > 0
                ? 1
                : (t instanceof l ? t.text.length : t.children.length) << 1,
            ]);
        }
        nextInner(t, e) {
          for (this.done = this.lineBreak = !1; ; ) {
            let i = this.nodes.length - 1,
              n = this.nodes[i],
              s = this.offsets[i],
              r = s >> 1,
              o = n instanceof l ? n.text.length : n.children.length;
            if (r == (e > 0 ? o : 0)) {
              if (0 == i) return (this.done = !0), (this.value = ''), this;
              e > 0 && this.offsets[i - 1]++,
                this.nodes.pop(),
                this.offsets.pop();
            } else if ((1 & s) == (e > 0 ? 0 : 1)) {
              if (((this.offsets[i] += e), 0 == t))
                return (this.lineBreak = !0), (this.value = '\n'), this;
              t--;
            } else if (n instanceof l) {
              let s = n.text[r + (e < 0 ? -1 : 0)];
              if (((this.offsets[i] += e), s.length > Math.max(0, t)))
                return (
                  (this.value =
                    0 == t ? s : e > 0 ? s.slice(t) : s.slice(0, s.length - t)),
                  this
                );
              t -= s.length;
            } else {
              let s = n.children[r + (e < 0 ? -1 : 0)];
              t > s.length
                ? ((t -= s.length), (this.offsets[i] += e))
                : (e < 0 && this.offsets[i]--,
                  this.nodes.push(s),
                  this.offsets.push(
                    e > 0
                      ? 1
                      : (s instanceof l ? s.text.length : s.children.length) <<
                          1,
                  ));
            }
          }
        }
        next(t = 0) {
          return (
            t < 0 && (this.nextInner(-t, -this.dir), (t = this.value.length)),
            this.nextInner(t, this.dir)
          );
        }
      }
      class f {
        constructor(t, e, i) {
          (this.value = ''),
            (this.done = !1),
            (this.cursor = new d(t, e > i ? -1 : 1)),
            (this.pos = e > i ? t.length : 0),
            (this.from = Math.min(e, i)),
            (this.to = Math.max(e, i));
        }
        nextInner(t, e) {
          if (e < 0 ? this.pos <= this.from : this.pos >= this.to)
            return (this.value = ''), (this.done = !0), this;
          t += Math.max(0, e < 0 ? this.pos - this.to : this.from - this.pos);
          let i = e < 0 ? this.pos - this.from : this.to - this.pos;
          t > i && (t = i), (i -= t);
          let { value: n } = this.cursor.next(t);
          return (
            (this.pos += (n.length + t) * e),
            (this.value =
              n.length <= i
                ? n
                : e < 0
                ? n.slice(n.length - i)
                : n.slice(0, i)),
            (this.done = !this.value),
            this
          );
        }
        next(t = 0) {
          return (
            t < 0
              ? (t = Math.max(t, this.from - this.pos))
              : t > 0 && (t = Math.min(t, this.to - this.pos)),
            this.nextInner(t, this.cursor.dir)
          );
        }
        get lineBreak() {
          return this.cursor.lineBreak && '' != this.value;
        }
      }
      class p {
        constructor(t) {
          (this.inner = t),
            (this.afterBreak = !0),
            (this.value = ''),
            (this.done = !1);
        }
        next(t = 0) {
          let { done: e, lineBreak: i, value: n } = this.inner.next(t);
          return (
            e
              ? ((this.done = !0), (this.value = ''))
              : i
              ? this.afterBreak
                ? (this.value = '')
                : ((this.afterBreak = !0), this.next())
              : ((this.value = n), (this.afterBreak = !1)),
            this
          );
        }
        get lineBreak() {
          return !1;
        }
      }
      'undefined' != typeof Symbol &&
        ((o.prototype[Symbol.iterator] = function () {
          return this.iter();
        }),
        (d.prototype[Symbol.iterator] =
          f.prototype[Symbol.iterator] =
          p.prototype[Symbol.iterator] =
            function () {
              return this;
            }));
      class m {
        constructor(t, e, i, n) {
          (this.from = t), (this.to = e), (this.number = i), (this.text = n);
        }
        get length() {
          return this.to - this.from;
        }
      }
      let g =
        'lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,3b,f,,w,1j,,,,4,8,4,,3,7,a,2,t,,1m,,,,2,4,8,,9,,a,2,q,,2,2,1l,,4,2,4,2,2,3,3,,u,2,3,,b,2,1l,,4,5,,2,4,,k,2,m,6,,,1m,,,2,,4,8,,7,3,a,2,u,,1n,,,,c,,9,,14,,3,,1l,3,5,3,,4,7,2,b,2,t,,1m,,2,,2,,3,,5,2,7,2,b,2,s,2,1l,2,,,2,4,8,,9,,a,2,t,,20,,4,,2,3,,,8,,29,,2,7,c,8,2q,,2,9,b,6,22,2,r,,,,,,1j,e,,5,,2,5,b,,10,9,,2u,4,,6,,2,2,2,p,2,4,3,g,4,d,,2,2,6,,f,,jj,3,qa,3,t,3,t,2,u,2,1s,2,,7,8,,2,b,9,,19,3,3b,2,y,,3a,3,4,2,9,,6,3,63,2,2,,1m,,,7,,,,,2,8,6,a,2,,1c,h,1r,4,1c,7,,,5,,14,9,c,2,w,4,2,2,,3,1k,,,2,3,,,3,1m,8,2,2,48,3,,d,,7,4,,6,,3,2,5i,1m,,5,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,p,2,5,,47,2,q,i,d,,12,8,p,b,1a,3,1c,,2,4,2,2,13,,1v,6,2,2,2,2,c,,8,,1b,,1f,,,3,2,2,5,2,,,16,2,8,,6m,,2,,4,,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,ar,2,49,b,4w,,1i,f,1k,3,1d,4,2,2,1x,3,10,5,,8,1q,,c,2,1g,9,a,4,2,,2n,3,2,,,2,6,,4g,,3,8,l,2,1l,2,,,,,m,,e,7,3,5,5f,8,2,3,,,n,,29,,2,6,,,2,,,2,,2,6j,,2,4,6,2,,2,r,2,2d,8,2,,,2,2y,,,,2,6,,,2t,3,2,4,,5,77,9,,2,6t,,a,2,,,4,,40,4,2,2,4,,w,a,14,6,2,4,8,,9,6,2,3,1a,d,,2,ba,7,,6,,,2a,m,2,7,,2,,2,3e,6,3,,,2,,7,,,20,2,3,,,,9n,2,f0b,5,1n,7,t4,,1r,4,29,,f5k,2,43q,,,3,4,5,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,79,7,c5,4,15s,7,31,7,240,5,gx7k,2o,3k,6o'
          .split(',')
          .map((t) => (t ? parseInt(t, 36) : 1));
      for (let Ag = 1; Ag < g.length; Ag++) g[Ag] += g[Ag - 1];
      function v(t) {
        for (let e = 1; e < g.length; e += 2)
          if (g[e] > t) return g[e - 1] <= t;
        return !1;
      }
      function w(t) {
        return t >= 127462 && t <= 127487;
      }
      const y = 8205;
      function b(t, e, i = !0, n = !0) {
        return (i ? x : k)(t, e, n);
      }
      function x(t, e, i) {
        if (e == t.length) return e;
        e && S(t.charCodeAt(e)) && C(t.charCodeAt(e - 1)) && e--;
        let n = M(t, e);
        e += O(n);
        while (e < t.length) {
          let s = M(t, e);
          if (n == y || s == y || (i && v(s))) (e += O(s)), (n = s);
          else {
            if (!w(s)) break;
            {
              let i = 0,
                n = e - 2;
              while (n >= 0 && w(M(t, n))) i++, (n -= 2);
              if (i % 2 == 0) break;
              e += 2;
            }
          }
        }
        return e;
      }
      function k(t, e, i) {
        while (e > 0) {
          let n = x(t, e - 2, i);
          if (n < e) return n;
          e--;
        }
        return 0;
      }
      function S(t) {
        return t >= 56320 && t < 57344;
      }
      function C(t) {
        return t >= 55296 && t < 56320;
      }
      function M(t, e) {
        let i = t.charCodeAt(e);
        if (!C(i) || e + 1 == t.length) return i;
        let n = t.charCodeAt(e + 1);
        return S(n) ? n - 56320 + ((i - 55296) << 10) + 65536 : i;
      }
      function A(t) {
        return t <= 65535
          ? String.fromCharCode(t)
          : ((t -= 65536),
            String.fromCharCode(55296 + (t >> 10), 56320 + (1023 & t)));
      }
      function O(t) {
        return t < 65536 ? 1 : 2;
      }
      const D = /\r\n?|\n/;
      var T = (function (t) {
        return (
          (t[(t['Simple'] = 0)] = 'Simple'),
          (t[(t['TrackDel'] = 1)] = 'TrackDel'),
          (t[(t['TrackBefore'] = 2)] = 'TrackBefore'),
          (t[(t['TrackAfter'] = 3)] = 'TrackAfter'),
          t
        );
      })(T || (T = {}));
      class E {
        constructor(t) {
          this.sections = t;
        }
        get length() {
          let t = 0;
          for (let e = 0; e < this.sections.length; e += 2)
            t += this.sections[e];
          return t;
        }
        get newLength() {
          let t = 0;
          for (let e = 0; e < this.sections.length; e += 2) {
            let i = this.sections[e + 1];
            t += i < 0 ? this.sections[e] : i;
          }
          return t;
        }
        get empty() {
          return (
            0 == this.sections.length ||
            (2 == this.sections.length && this.sections[1] < 0)
          );
        }
        iterGaps(t) {
          for (let e = 0, i = 0, n = 0; e < this.sections.length; ) {
            let s = this.sections[e++],
              r = this.sections[e++];
            r < 0 ? (t(i, n, s), (n += s)) : (n += r), (i += s);
          }
        }
        iterChangedRanges(t, e = !1) {
          N(this, t, e);
        }
        get invertedDesc() {
          let t = [];
          for (let e = 0; e < this.sections.length; ) {
            let i = this.sections[e++],
              n = this.sections[e++];
            n < 0 ? t.push(i, n) : t.push(n, i);
          }
          return new E(t);
        }
        composeDesc(t) {
          return this.empty ? t : t.empty ? this : I(this, t);
        }
        mapDesc(t, e = !1) {
          return t.empty ? this : P(this, t, e);
        }
        mapPos(t, e = -1, i = T.Simple) {
          let n = 0,
            s = 0;
          for (let r = 0; r < this.sections.length; ) {
            let o = this.sections[r++],
              l = this.sections[r++],
              a = n + o;
            if (l < 0) {
              if (a > t) return s + (t - n);
              s += o;
            } else {
              if (
                i != T.Simple &&
                a >= t &&
                ((i == T.TrackDel && n < t && a > t) ||
                  (i == T.TrackBefore && n < t) ||
                  (i == T.TrackAfter && a > t))
              )
                return null;
              if (a > t || (a == t && e < 0 && !o))
                return t == n || e < 0 ? s : s + l;
              s += l;
            }
            n = a;
          }
          if (t > n)
            throw new RangeError(
              `Position ${t} is out of range for changeset of length ${n}`,
            );
          return s;
        }
        touchesRange(t, e = t) {
          for (let i = 0, n = 0; i < this.sections.length && n <= e; ) {
            let s = this.sections[i++],
              r = this.sections[i++],
              o = n + s;
            if (r >= 0 && n <= e && o >= t) return !(n < t && o > e) || 'cover';
            n = o;
          }
          return !1;
        }
        toString() {
          let t = '';
          for (let e = 0; e < this.sections.length; ) {
            let i = this.sections[e++],
              n = this.sections[e++];
            t += (t ? ' ' : '') + i + (n >= 0 ? ':' + n : '');
          }
          return t;
        }
        toJSON() {
          return this.sections;
        }
        static fromJSON(t) {
          if (
            !Array.isArray(t) ||
            t.length % 2 ||
            t.some((t) => 'number' != typeof t)
          )
            throw new RangeError('Invalid JSON representation of ChangeDesc');
          return new E(t);
        }
        static create(t) {
          return new E(t);
        }
      }
      class R extends E {
        constructor(t, e) {
          super(t), (this.inserted = e);
        }
        apply(t) {
          if (this.length != t.length)
            throw new RangeError(
              'Applying change set to a document with the wrong length',
            );
          return (
            N(this, (e, i, n, s, r) => (t = t.replace(n, n + (i - e), r)), !1),
            t
          );
        }
        mapDesc(t, e = !1) {
          return P(this, t, e, !0);
        }
        invert(t) {
          let e = this.sections.slice(),
            i = [];
          for (let n = 0, s = 0; n < e.length; n += 2) {
            let r = e[n],
              l = e[n + 1];
            if (l >= 0) {
              (e[n] = l), (e[n + 1] = r);
              let a = n >> 1;
              while (i.length < a) i.push(o.empty);
              i.push(r ? t.slice(s, s + r) : o.empty);
            }
            s += r;
          }
          return new R(e, i);
        }
        compose(t) {
          return this.empty ? t : t.empty ? this : I(this, t, !0);
        }
        map(t, e = !1) {
          return t.empty ? this : P(this, t, e, !0);
        }
        iterChanges(t, e = !1) {
          N(this, t, e);
        }
        get desc() {
          return E.create(this.sections);
        }
        filter(t) {
          let e = [],
            i = [],
            n = [],
            s = new H(this);
          t: for (let r = 0, o = 0; ; ) {
            let l = r == t.length ? 1e9 : t[r++];
            while (o < l || (o == l && 0 == s.len)) {
              if (s.done) break t;
              let t = Math.min(s.len, l - o);
              B(n, t, -1);
              let r = -1 == s.ins ? -1 : 0 == s.off ? s.ins : 0;
              B(e, t, r), r > 0 && L(i, e, s.text), s.forward(t), (o += t);
            }
            let a = t[r++];
            while (o < a) {
              if (s.done) break t;
              let t = Math.min(s.len, a - o);
              B(e, t, -1),
                B(n, t, -1 == s.ins ? -1 : 0 == s.off ? s.ins : 0),
                s.forward(t),
                (o += t);
            }
          }
          return { changes: new R(e, i), filtered: E.create(n) };
        }
        toJSON() {
          let t = [];
          for (let e = 0; e < this.sections.length; e += 2) {
            let i = this.sections[e],
              n = this.sections[e + 1];
            n < 0
              ? t.push(i)
              : 0 == n
              ? t.push([i])
              : t.push([i].concat(this.inserted[e >> 1].toJSON()));
          }
          return t;
        }
        static of(t, e, i) {
          let n = [],
            s = [],
            r = 0,
            l = null;
          function a(t = !1) {
            if (!t && !n.length) return;
            r < e && B(n, e - r, -1);
            let i = new R(n, s);
            (l = l ? l.compose(i.map(l)) : i), (n = []), (s = []), (r = 0);
          }
          function h(t) {
            if (Array.isArray(t)) for (let e of t) h(e);
            else if (t instanceof R) {
              if (t.length != e)
                throw new RangeError(
                  `Mismatched change set length (got ${t.length}, expected ${e})`,
                );
              a(), (l = l ? l.compose(t.map(l)) : t);
            } else {
              let { from: l, to: h = l, insert: c } = t;
              if (l > h || l < 0 || h > e)
                throw new RangeError(
                  `Invalid change range ${l} to ${h} (in doc of length ${e})`,
                );
              let u = c
                  ? 'string' == typeof c
                    ? o.of(c.split(i || D))
                    : c
                  : o.empty,
                d = u.length;
              if (l == h && 0 == d) return;
              l < r && a(),
                l > r && B(n, l - r, -1),
                B(n, h - l, d),
                L(s, n, u),
                (r = h);
            }
          }
          return h(t), a(!l), l;
        }
        static empty(t) {
          return new R(t ? [t, -1] : [], []);
        }
        static fromJSON(t) {
          if (!Array.isArray(t))
            throw new RangeError('Invalid JSON representation of ChangeSet');
          let e = [],
            i = [];
          for (let n = 0; n < t.length; n++) {
            let s = t[n];
            if ('number' == typeof s) e.push(s, -1);
            else {
              if (
                !Array.isArray(s) ||
                'number' != typeof s[0] ||
                s.some((t, e) => e && 'string' != typeof t)
              )
                throw new RangeError(
                  'Invalid JSON representation of ChangeSet',
                );
              if (1 == s.length) e.push(s[0], 0);
              else {
                while (i.length < n) i.push(o.empty);
                (i[n] = o.of(s.slice(1))), e.push(s[0], i[n].length);
              }
            }
          }
          return new R(e, i);
        }
        static createSet(t, e) {
          return new R(t, e);
        }
      }
      function B(t, e, i, n = !1) {
        if (0 == e && i <= 0) return;
        let s = t.length - 2;
        s >= 0 && i <= 0 && i == t[s + 1]
          ? (t[s] += e)
          : 0 == e && 0 == t[s]
          ? (t[s + 1] += i)
          : n
          ? ((t[s] += e), (t[s + 1] += i))
          : t.push(e, i);
      }
      function L(t, e, i) {
        if (0 == i.length) return;
        let n = (e.length - 2) >> 1;
        if (n < t.length) t[t.length - 1] = t[t.length - 1].append(i);
        else {
          while (t.length < n) t.push(o.empty);
          t.push(i);
        }
      }
      function N(t, e, i) {
        let n = t.inserted;
        for (let s = 0, r = 0, l = 0; l < t.sections.length; ) {
          let a = t.sections[l++],
            h = t.sections[l++];
          if (h < 0) (s += a), (r += a);
          else {
            let c = s,
              u = r,
              d = o.empty;
            for (;;) {
              if (
                ((c += a),
                (u += h),
                h && n && (d = d.append(n[(l - 2) >> 1])),
                i || l == t.sections.length || t.sections[l + 1] < 0)
              )
                break;
              (a = t.sections[l++]), (h = t.sections[l++]);
            }
            e(s, c, r, u, d), (s = c), (r = u);
          }
        }
      }
      function P(t, e, i, n = !1) {
        let s = [],
          r = n ? [] : null,
          o = new H(t),
          l = new H(e);
        for (let a = -1; ; )
          if (-1 == o.ins && -1 == l.ins) {
            let t = Math.min(o.len, l.len);
            B(s, t, -1), o.forward(t), l.forward(t);
          } else if (
            l.ins >= 0 &&
            (o.ins < 0 ||
              a == o.i ||
              (0 == o.off && (l.len < o.len || (l.len == o.len && !i))))
          ) {
            let t = l.len;
            B(s, l.ins, -1);
            while (t) {
              let e = Math.min(o.len, t);
              o.ins >= 0 &&
                a < o.i &&
                o.len <= e &&
                (B(s, 0, o.ins), r && L(r, s, o.text), (a = o.i)),
                o.forward(e),
                (t -= e);
            }
            l.next();
          } else {
            if (!(o.ins >= 0)) {
              if (o.done && l.done) return r ? R.createSet(s, r) : E.create(s);
              throw new Error('Mismatched change set lengths');
            }
            {
              let t = 0,
                e = o.len;
              while (e)
                if (-1 == l.ins) {
                  let i = Math.min(e, l.len);
                  (t += i), (e -= i), l.forward(i);
                } else {
                  if (!(0 == l.ins && l.len < e)) break;
                  (e -= l.len), l.next();
                }
              B(s, t, a < o.i ? o.ins : 0),
                r && a < o.i && L(r, s, o.text),
                (a = o.i),
                o.forward(o.len - e);
            }
          }
      }
      function I(t, e, i = !1) {
        let n = [],
          s = i ? [] : null,
          r = new H(t),
          o = new H(e);
        for (let l = !1; ; ) {
          if (r.done && o.done) return s ? R.createSet(n, s) : E.create(n);
          if (0 == r.ins) B(n, r.len, 0, l), r.next();
          else if (0 != o.len || o.done) {
            if (r.done || o.done)
              throw new Error('Mismatched change set lengths');
            {
              let t = Math.min(r.len2, o.len),
                e = n.length;
              if (-1 == r.ins) {
                let e = -1 == o.ins ? -1 : o.off ? 0 : o.ins;
                B(n, t, e, l), s && e && L(s, n, o.text);
              } else
                -1 == o.ins
                  ? (B(n, r.off ? 0 : r.len, t, l), s && L(s, n, r.textBit(t)))
                  : (B(n, r.off ? 0 : r.len, o.off ? 0 : o.ins, l),
                    s && !o.off && L(s, n, o.text));
              (l =
                (r.ins > t || (o.ins >= 0 && o.len > t)) &&
                (l || n.length > e)),
                r.forward2(t),
                o.forward(t);
            }
          } else B(n, 0, o.ins, l), s && L(s, n, o.text), o.next();
        }
      }
      class H {
        constructor(t) {
          (this.set = t), (this.i = 0), this.next();
        }
        next() {
          let { sections: t } = this.set;
          this.i < t.length
            ? ((this.len = t[this.i++]), (this.ins = t[this.i++]))
            : ((this.len = 0), (this.ins = -2)),
            (this.off = 0);
        }
        get done() {
          return -2 == this.ins;
        }
        get len2() {
          return this.ins < 0 ? this.len : this.ins;
        }
        get text() {
          let { inserted: t } = this.set,
            e = (this.i - 2) >> 1;
          return e >= t.length ? o.empty : t[e];
        }
        textBit(t) {
          let { inserted: e } = this.set,
            i = (this.i - 2) >> 1;
          return i >= e.length && !t
            ? o.empty
            : e[i].slice(this.off, null == t ? void 0 : this.off + t);
        }
        forward(t) {
          t == this.len ? this.next() : ((this.len -= t), (this.off += t));
        }
        forward2(t) {
          -1 == this.ins
            ? this.forward(t)
            : t == this.ins
            ? this.next()
            : ((this.ins -= t), (this.off += t));
        }
      }
      class W {
        constructor(t, e, i) {
          (this.from = t), (this.to = e), (this.flags = i);
        }
        get anchor() {
          return 16 & this.flags ? this.to : this.from;
        }
        get head() {
          return 16 & this.flags ? this.from : this.to;
        }
        get empty() {
          return this.from == this.to;
        }
        get assoc() {
          return 4 & this.flags ? -1 : 8 & this.flags ? 1 : 0;
        }
        get bidiLevel() {
          let t = 3 & this.flags;
          return 3 == t ? null : t;
        }
        get goalColumn() {
          let t = this.flags >> 5;
          return 33554431 == t ? void 0 : t;
        }
        map(t, e = -1) {
          let i, n;
          return (
            this.empty
              ? (i = n = t.mapPos(this.from, e))
              : ((i = t.mapPos(this.from, 1)), (n = t.mapPos(this.to, -1))),
            i == this.from && n == this.to ? this : new W(i, n, this.flags)
          );
        }
        extend(t, e = t) {
          if (t <= this.anchor && e >= this.anchor) return V.range(t, e);
          let i = Math.abs(t - this.anchor) > Math.abs(e - this.anchor) ? t : e;
          return V.range(this.anchor, i);
        }
        eq(t) {
          return this.anchor == t.anchor && this.head == t.head;
        }
        toJSON() {
          return { anchor: this.anchor, head: this.head };
        }
        static fromJSON(t) {
          if (!t || 'number' != typeof t.anchor || 'number' != typeof t.head)
            throw new RangeError(
              'Invalid JSON representation for SelectionRange',
            );
          return V.range(t.anchor, t.head);
        }
        static create(t, e, i) {
          return new W(t, e, i);
        }
      }
      class V {
        constructor(t, e) {
          (this.ranges = t), (this.mainIndex = e);
        }
        map(t, e = -1) {
          return t.empty
            ? this
            : V.create(
                this.ranges.map((i) => i.map(t, e)),
                this.mainIndex,
              );
        }
        eq(t) {
          if (
            this.ranges.length != t.ranges.length ||
            this.mainIndex != t.mainIndex
          )
            return !1;
          for (let e = 0; e < this.ranges.length; e++)
            if (!this.ranges[e].eq(t.ranges[e])) return !1;
          return !0;
        }
        get main() {
          return this.ranges[this.mainIndex];
        }
        asSingle() {
          return 1 == this.ranges.length ? this : new V([this.main], 0);
        }
        addRange(t, e = !0) {
          return V.create([t].concat(this.ranges), e ? 0 : this.mainIndex + 1);
        }
        replaceRange(t, e = this.mainIndex) {
          let i = this.ranges.slice();
          return (i[e] = t), V.create(i, this.mainIndex);
        }
        toJSON() {
          return {
            ranges: this.ranges.map((t) => t.toJSON()),
            main: this.mainIndex,
          };
        }
        static fromJSON(t) {
          if (
            !t ||
            !Array.isArray(t.ranges) ||
            'number' != typeof t.main ||
            t.main >= t.ranges.length
          )
            throw new RangeError(
              'Invalid JSON representation for EditorSelection',
            );
          return new V(
            t.ranges.map((t) => W.fromJSON(t)),
            t.main,
          );
        }
        static single(t, e = t) {
          return new V([V.range(t, e)], 0);
        }
        static create(t, e = 0) {
          if (0 == t.length)
            throw new RangeError('A selection needs at least one range');
          for (let i = 0, n = 0; n < t.length; n++) {
            let s = t[n];
            if (s.empty ? s.from <= i : s.from < i)
              return V.normalized(t.slice(), e);
            i = s.to;
          }
          return new V(t, e);
        }
        static cursor(t, e = 0, i, n) {
          return W.create(
            t,
            t,
            (0 == e ? 0 : e < 0 ? 4 : 8) |
              (null == i ? 3 : Math.min(2, i)) |
              ((null !== n && void 0 !== n ? n : 33554431) << 5),
          );
        }
        static range(t, e, i, n) {
          let s =
            ((null !== i && void 0 !== i ? i : 33554431) << 5) |
            (null == n ? 3 : Math.min(2, n));
          return e < t
            ? W.create(e, t, 24 | s)
            : W.create(t, e, (e > t ? 4 : 0) | s);
        }
        static normalized(t, e = 0) {
          let i = t[e];
          t.sort((t, e) => t.from - e.from), (e = t.indexOf(i));
          for (let n = 1; n < t.length; n++) {
            let i = t[n],
              s = t[n - 1];
            if (i.empty ? i.from <= s.to : i.from < s.to) {
              let r = s.from,
                o = Math.max(i.to, s.to);
              n <= e && e--,
                t.splice(
                  --n,
                  2,
                  i.anchor > i.head ? V.range(o, r) : V.range(r, o),
                );
            }
          }
          return new V(t, e);
        }
      }
      function z(t, e) {
        for (let i of t.ranges)
          if (i.to > e)
            throw new RangeError('Selection points outside of document');
      }
      let F = 0;
      class q {
        constructor(t, e, i, n, s) {
          (this.combine = t),
            (this.compareInput = e),
            (this.compare = i),
            (this.isStatic = n),
            (this.id = F++),
            (this.default = t([])),
            (this.extensions = 'function' == typeof s ? s(this) : s);
        }
        static define(t = {}) {
          return new q(
            t.combine || ((t) => t),
            t.compareInput || ((t, e) => t === e),
            t.compare || (t.combine ? (t, e) => t === e : j),
            !!t.static,
            t.enables,
          );
        }
        of(t) {
          return new _([], this, 0, t);
        }
        compute(t, e) {
          if (this.isStatic) throw new Error("Can't compute a static facet");
          return new _(t, this, 1, e);
        }
        computeN(t, e) {
          if (this.isStatic) throw new Error("Can't compute a static facet");
          return new _(t, this, 2, e);
        }
        from(t, e) {
          return e || (e = (t) => t), this.compute([t], (i) => e(i.field(t)));
        }
      }
      function j(t, e) {
        return (
          t == e || (t.length == e.length && t.every((t, i) => t === e[i]))
        );
      }
      class _ {
        constructor(t, e, i, n) {
          (this.dependencies = t),
            (this.facet = e),
            (this.type = i),
            (this.value = n),
            (this.id = F++);
        }
        dynamicSlot(t) {
          var e;
          let i = this.value,
            n = this.facet.compareInput,
            s = this.id,
            r = t[s] >> 1,
            o = 2 == this.type,
            l = !1,
            a = !1,
            h = [];
          for (let c of this.dependencies)
            'doc' == c
              ? (l = !0)
              : 'selection' == c
              ? (a = !0)
              : 0 == (1 & (null !== (e = t[c.id]) && void 0 !== e ? e : 1)) &&
                h.push(t[c.id]);
          return {
            create(t) {
              return (t.values[r] = i(t)), 1;
            },
            update(t, e) {
              if (
                (l && e.docChanged) ||
                (a && (e.docChanged || e.selection)) ||
                $(t, h)
              ) {
                let e = i(t);
                if (o ? !K(e, t.values[r], n) : !n(e, t.values[r]))
                  return (t.values[r] = e), 1;
              }
              return 0;
            },
            reconfigure: (t, e) => {
              let l,
                a = e.config.address[s];
              if (null != a) {
                let s = rt(e, a);
                if (
                  this.dependencies.every((i) =>
                    i instanceof q
                      ? e.facet(i) === t.facet(i)
                      : !(i instanceof J) || e.field(i, !1) == t.field(i, !1),
                  ) ||
                  (o ? K((l = i(t)), s, n) : n((l = i(t)), s))
                )
                  return (t.values[r] = s), 0;
              } else l = i(t);
              return (t.values[r] = l), 1;
            },
          };
        }
      }
      function K(t, e, i) {
        if (t.length != e.length) return !1;
        for (let n = 0; n < t.length; n++) if (!i(t[n], e[n])) return !1;
        return !0;
      }
      function $(t, e) {
        let i = !1;
        for (let n of e) 1 & st(t, n) && (i = !0);
        return i;
      }
      function U(t, e, i) {
        let n = i.map((e) => t[e.id]),
          s = i.map((t) => t.type),
          r = n.filter((t) => !(1 & t)),
          o = t[e.id] >> 1;
        function l(t) {
          let i = [];
          for (let e = 0; e < n.length; e++) {
            let r = rt(t, n[e]);
            if (2 == s[e]) for (let t of r) i.push(t);
            else i.push(r);
          }
          return e.combine(i);
        }
        return {
          create(t) {
            for (let e of n) st(t, e);
            return (t.values[o] = l(t)), 1;
          },
          update(t, i) {
            if (!$(t, r)) return 0;
            let n = l(t);
            return e.compare(n, t.values[o]) ? 0 : ((t.values[o] = n), 1);
          },
          reconfigure(t, s) {
            let r = $(t, n),
              a = s.config.facets[e.id],
              h = s.facet(e);
            if (a && !r && j(i, a)) return (t.values[o] = h), 0;
            let c = l(t);
            return e.compare(c, h)
              ? ((t.values[o] = h), 0)
              : ((t.values[o] = c), 1);
          },
        };
      }
      const G = q.define({ static: !0 });
      class J {
        constructor(t, e, i, n, s) {
          (this.id = t),
            (this.createF = e),
            (this.updateF = i),
            (this.compareF = n),
            (this.spec = s),
            (this.provides = void 0);
        }
        static define(t) {
          let e = new J(
            F++,
            t.create,
            t.update,
            t.compare || ((t, e) => t === e),
            t,
          );
          return t.provide && (e.provides = t.provide(e)), e;
        }
        create(t) {
          let e = t.facet(G).find((t) => t.field == this);
          return (
            (null === e || void 0 === e ? void 0 : e.create) || this.createF
          )(t);
        }
        slot(t) {
          let e = t[this.id] >> 1;
          return {
            create: (t) => ((t.values[e] = this.create(t)), 1),
            update: (t, i) => {
              let n = t.values[e],
                s = this.updateF(n, i);
              return this.compareF(n, s) ? 0 : ((t.values[e] = s), 1);
            },
            reconfigure: (t, i) =>
              null != i.config.address[this.id]
                ? ((t.values[e] = i.field(this)), 0)
                : ((t.values[e] = this.create(t)), 1),
          };
        }
        init(t) {
          return [this, G.of({ field: this, create: t })];
        }
        get extension() {
          return this;
        }
      }
      const Y = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
      function X(t) {
        return (e) => new Q(e, t);
      }
      const Z = {
        highest: X(Y.highest),
        high: X(Y.high),
        default: X(Y.default),
        low: X(Y.low),
        lowest: X(Y.lowest),
      };
      class Q {
        constructor(t, e) {
          (this.inner = t), (this.prec = e);
        }
      }
      class tt {
        of(t) {
          return new et(this, t);
        }
        reconfigure(t) {
          return tt.reconfigure.of({ compartment: this, extension: t });
        }
        get(t) {
          return t.config.compartments.get(this);
        }
      }
      class et {
        constructor(t, e) {
          (this.compartment = t), (this.inner = e);
        }
      }
      class it {
        constructor(t, e, i, n, s, r) {
          (this.base = t),
            (this.compartments = e),
            (this.dynamicSlots = i),
            (this.address = n),
            (this.staticValues = s),
            (this.facets = r),
            (this.statusTemplate = []);
          while (this.statusTemplate.length < i.length)
            this.statusTemplate.push(0);
        }
        staticFacet(t) {
          let e = this.address[t.id];
          return null == e ? t.default : this.staticValues[e >> 1];
        }
        static resolve(t, e, i) {
          let n = [],
            s = Object.create(null),
            r = new Map();
          for (let u of nt(t, e, r))
            u instanceof J
              ? n.push(u)
              : (s[u.facet.id] || (s[u.facet.id] = [])).push(u);
          let o = Object.create(null),
            l = [],
            a = [];
          for (let u of n) (o[u.id] = a.length << 1), a.push((t) => u.slot(t));
          let h = null === i || void 0 === i ? void 0 : i.config.facets;
          for (let u in s) {
            let t = s[u],
              e = t[0].facet,
              n = (h && h[u]) || [];
            if (t.every((t) => 0 == t.type))
              if (((o[e.id] = (l.length << 1) | 1), j(n, t)))
                l.push(i.facet(e));
              else {
                let n = e.combine(t.map((t) => t.value));
                l.push(i && e.compare(n, i.facet(e)) ? i.facet(e) : n);
              }
            else {
              for (let e of t)
                0 == e.type
                  ? ((o[e.id] = (l.length << 1) | 1), l.push(e.value))
                  : ((o[e.id] = a.length << 1),
                    a.push((t) => e.dynamicSlot(t)));
              (o[e.id] = a.length << 1), a.push((i) => U(i, e, t));
            }
          }
          let c = a.map((t) => t(o));
          return new it(t, r, c, o, l, s);
        }
      }
      function nt(t, e, i) {
        let n = [[], [], [], [], []],
          s = new Map();
        function r(t, o) {
          let l = s.get(t);
          if (null != l) {
            if (l <= o) return;
            let e = n[l].indexOf(t);
            e > -1 && n[l].splice(e, 1),
              t instanceof et && i.delete(t.compartment);
          }
          if ((s.set(t, o), Array.isArray(t))) for (let e of t) r(e, o);
          else if (t instanceof et) {
            if (i.has(t.compartment))
              throw new RangeError(
                'Duplicate use of compartment in extensions',
              );
            let n = e.get(t.compartment) || t.inner;
            i.set(t.compartment, n), r(n, o);
          } else if (t instanceof Q) r(t.inner, t.prec);
          else if (t instanceof J) n[o].push(t), t.provides && r(t.provides, o);
          else if (t instanceof _)
            n[o].push(t),
              t.facet.extensions && r(t.facet.extensions, Y.default);
          else {
            let e = t.extension;
            if (!e)
              throw new Error(
                `Unrecognized extension value in extension set (${t}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`,
              );
            r(e, o);
          }
        }
        return r(t, Y.default), n.reduce((t, e) => t.concat(e));
      }
      function st(t, e) {
        if (1 & e) return 2;
        let i = e >> 1,
          n = t.status[i];
        if (4 == n)
          throw new Error('Cyclic dependency between fields and/or facets');
        if (2 & n) return n;
        t.status[i] = 4;
        let s = t.computeSlot(t, t.config.dynamicSlots[i]);
        return (t.status[i] = 2 | s);
      }
      function rt(t, e) {
        return 1 & e ? t.config.staticValues[e >> 1] : t.values[e >> 1];
      }
      const ot = q.define(),
        lt = q.define({ combine: (t) => t.some((t) => t), static: !0 }),
        at = q.define({
          combine: (t) => (t.length ? t[0] : void 0),
          static: !0,
        }),
        ht = q.define(),
        ct = q.define(),
        ut = q.define(),
        dt = q.define({ combine: (t) => !!t.length && t[0] });
      class ft {
        constructor(t, e) {
          (this.type = t), (this.value = e);
        }
        static define() {
          return new pt();
        }
      }
      class pt {
        of(t) {
          return new ft(this, t);
        }
      }
      class mt {
        constructor(t) {
          this.map = t;
        }
        of(t) {
          return new gt(this, t);
        }
      }
      class gt {
        constructor(t, e) {
          (this.type = t), (this.value = e);
        }
        map(t) {
          let e = this.type.map(this.value, t);
          return void 0 === e
            ? void 0
            : e == this.value
            ? this
            : new gt(this.type, e);
        }
        is(t) {
          return this.type == t;
        }
        static define(t = {}) {
          return new mt(t.map || ((t) => t));
        }
        static mapEffects(t, e) {
          if (!t.length) return t;
          let i = [];
          for (let n of t) {
            let t = n.map(e);
            t && i.push(t);
          }
          return i;
        }
      }
      (gt.reconfigure = gt.define()), (gt.appendConfig = gt.define());
      class vt {
        constructor(t, e, i, n, s, r) {
          (this.startState = t),
            (this.changes = e),
            (this.selection = i),
            (this.effects = n),
            (this.annotations = s),
            (this.scrollIntoView = r),
            (this._doc = null),
            (this._state = null),
            i && z(i, e.newLength),
            s.some((t) => t.type == vt.time) ||
              (this.annotations = s.concat(vt.time.of(Date.now())));
        }
        static create(t, e, i, n, s, r) {
          return new vt(t, e, i, n, s, r);
        }
        get newDoc() {
          return (
            this._doc || (this._doc = this.changes.apply(this.startState.doc))
          );
        }
        get newSelection() {
          return this.selection || this.startState.selection.map(this.changes);
        }
        get state() {
          return (
            this._state || this.startState.applyTransaction(this), this._state
          );
        }
        annotation(t) {
          for (let e of this.annotations) if (e.type == t) return e.value;
        }
        get docChanged() {
          return !this.changes.empty;
        }
        get reconfigured() {
          return this.startState.config != this.state.config;
        }
        isUserEvent(t) {
          let e = this.annotation(vt.userEvent);
          return !(
            !e ||
            !(
              e == t ||
              (e.length > t.length &&
                e.slice(0, t.length) == t &&
                '.' == e[t.length])
            )
          );
        }
      }
      function wt(t, e) {
        let i = [];
        for (let n = 0, s = 0; ; ) {
          let r, o;
          if (n < t.length && (s == e.length || e[s] >= t[n]))
            (r = t[n++]), (o = t[n++]);
          else {
            if (!(s < e.length)) return i;
            (r = e[s++]), (o = e[s++]);
          }
          !i.length || i[i.length - 1] < r
            ? i.push(r, o)
            : i[i.length - 1] < o && (i[i.length - 1] = o);
        }
      }
      function yt(t, e, i) {
        var n;
        let s, r, o;
        return (
          i
            ? ((s = e.changes),
              (r = R.empty(e.changes.length)),
              (o = t.changes.compose(e.changes)))
            : ((s = e.changes.map(t.changes)),
              (r = t.changes.mapDesc(e.changes, !0)),
              (o = t.changes.compose(s))),
          {
            changes: o,
            selection: e.selection
              ? e.selection.map(r)
              : null === (n = t.selection) || void 0 === n
              ? void 0
              : n.map(s),
            effects: gt
              .mapEffects(t.effects, s)
              .concat(gt.mapEffects(e.effects, r)),
            annotations: t.annotations.length
              ? t.annotations.concat(e.annotations)
              : e.annotations,
            scrollIntoView: t.scrollIntoView || e.scrollIntoView,
          }
        );
      }
      function bt(t, e, i) {
        let n = e.selection,
          s = Mt(e.annotations);
        return (
          e.userEvent && (s = s.concat(vt.userEvent.of(e.userEvent))),
          {
            changes:
              e.changes instanceof R
                ? e.changes
                : R.of(e.changes || [], i, t.facet(at)),
            selection: n && (n instanceof V ? n : V.single(n.anchor, n.head)),
            effects: Mt(e.effects),
            annotations: s,
            scrollIntoView: !!e.scrollIntoView,
          }
        );
      }
      function xt(t, e, i) {
        let n = bt(t, e.length ? e[0] : {}, t.doc.length);
        e.length && !1 === e[0].filter && (i = !1);
        for (let r = 1; r < e.length; r++) {
          !1 === e[r].filter && (i = !1);
          let s = !!e[r].sequential;
          n = yt(n, bt(t, e[r], s ? n.changes.newLength : t.doc.length), s);
        }
        let s = vt.create(
          t,
          n.changes,
          n.selection,
          n.effects,
          n.annotations,
          n.scrollIntoView,
        );
        return St(i ? kt(s) : s);
      }
      function kt(t) {
        let e = t.startState,
          i = !0;
        for (let s of e.facet(ht)) {
          let e = s(t);
          if (!1 === e) {
            i = !1;
            break;
          }
          Array.isArray(e) && (i = !0 === i ? e : wt(i, e));
        }
        if (!0 !== i) {
          let n, s;
          if (!1 === i)
            (s = t.changes.invertedDesc), (n = R.empty(e.doc.length));
          else {
            let e = t.changes.filter(i);
            (n = e.changes), (s = e.filtered.mapDesc(e.changes).invertedDesc);
          }
          t = vt.create(
            e,
            n,
            t.selection && t.selection.map(s),
            gt.mapEffects(t.effects, s),
            t.annotations,
            t.scrollIntoView,
          );
        }
        let n = e.facet(ct);
        for (let s = n.length - 1; s >= 0; s--) {
          let i = n[s](t);
          t =
            i instanceof vt
              ? i
              : Array.isArray(i) && 1 == i.length && i[0] instanceof vt
              ? i[0]
              : xt(e, Mt(i), !1);
        }
        return t;
      }
      function St(t) {
        let e = t.startState,
          i = e.facet(ut),
          n = t;
        for (let s = i.length - 1; s >= 0; s--) {
          let r = i[s](t);
          r &&
            Object.keys(r).length &&
            (n = yt(n, bt(e, r, t.changes.newLength), !0));
        }
        return n == t
          ? t
          : vt.create(
              e,
              t.changes,
              t.selection,
              n.effects,
              n.annotations,
              n.scrollIntoView,
            );
      }
      (vt.time = ft.define()),
        (vt.userEvent = ft.define()),
        (vt.addToHistory = ft.define()),
        (vt.remote = ft.define());
      const Ct = [];
      function Mt(t) {
        return null == t ? Ct : Array.isArray(t) ? t : [t];
      }
      var At = (function (t) {
        return (
          (t[(t['Word'] = 0)] = 'Word'),
          (t[(t['Space'] = 1)] = 'Space'),
          (t[(t['Other'] = 2)] = 'Other'),
          t
        );
      })(At || (At = {}));
      const Ot =
        /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      let Dt;
      try {
        Dt = new RegExp('[\\p{Alphabetic}\\p{Number}_]', 'u');
      } catch (Mg) {}
      function Tt(t) {
        if (Dt) return Dt.test(t);
        for (let e = 0; e < t.length; e++) {
          let i = t[e];
          if (
            /\w/.test(i) ||
            (i > '\x80' && (i.toUpperCase() != i.toLowerCase() || Ot.test(i)))
          )
            return !0;
        }
        return !1;
      }
      function Et(t) {
        return (e) => {
          if (!/\S/.test(e)) return At.Space;
          if (Tt(e)) return At.Word;
          for (let i = 0; i < t.length; i++)
            if (e.indexOf(t[i]) > -1) return At.Word;
          return At.Other;
        };
      }
      class Rt {
        constructor(t, e, i, n, s, r) {
          (this.config = t),
            (this.doc = e),
            (this.selection = i),
            (this.values = n),
            (this.status = t.statusTemplate.slice()),
            (this.computeSlot = s),
            r && (r._state = this);
          for (let o = 0; o < this.config.dynamicSlots.length; o++)
            st(this, o << 1);
          this.computeSlot = null;
        }
        field(t, e = !0) {
          let i = this.config.address[t.id];
          if (null != i) return st(this, i), rt(this, i);
          if (e) throw new RangeError('Field is not present in this state');
        }
        update(...t) {
          return xt(this, t, !0);
        }
        applyTransaction(t) {
          let e,
            i = this.config,
            { base: n, compartments: s } = i;
          for (let r of t.effects)
            r.is(tt.reconfigure)
              ? (i &&
                  ((s = new Map()),
                  i.compartments.forEach((t, e) => s.set(e, t)),
                  (i = null)),
                s.set(r.value.compartment, r.value.extension))
              : r.is(gt.reconfigure)
              ? ((i = null), (n = r.value))
              : r.is(gt.appendConfig) &&
                ((i = null), (n = Mt(n).concat(r.value)));
          if (i) e = t.startState.values.slice();
          else {
            i = it.resolve(n, s, this);
            let t = new Rt(
              i,
              this.doc,
              this.selection,
              i.dynamicSlots.map(() => null),
              (t, e) => e.reconfigure(t, this),
              null,
            );
            e = t.values;
          }
          new Rt(i, t.newDoc, t.newSelection, e, (e, i) => i.update(e, t), t);
        }
        replaceSelection(t) {
          return (
            'string' == typeof t && (t = this.toText(t)),
            this.changeByRange((e) => ({
              changes: { from: e.from, to: e.to, insert: t },
              range: V.cursor(e.from + t.length),
            }))
          );
        }
        changeByRange(t) {
          let e = this.selection,
            i = t(e.ranges[0]),
            n = this.changes(i.changes),
            s = [i.range],
            r = Mt(i.effects);
          for (let o = 1; o < e.ranges.length; o++) {
            let i = t(e.ranges[o]),
              l = this.changes(i.changes),
              a = l.map(n);
            for (let t = 0; t < o; t++) s[t] = s[t].map(a);
            let h = n.mapDesc(l, !0);
            s.push(i.range.map(h)),
              (n = n.compose(a)),
              (r = gt.mapEffects(r, a).concat(gt.mapEffects(Mt(i.effects), h)));
          }
          return {
            changes: n,
            selection: V.create(s, e.mainIndex),
            effects: r,
          };
        }
        changes(t = []) {
          return t instanceof R
            ? t
            : R.of(t, this.doc.length, this.facet(Rt.lineSeparator));
        }
        toText(t) {
          return o.of(t.split(this.facet(Rt.lineSeparator) || D));
        }
        sliceDoc(t = 0, e = this.doc.length) {
          return this.doc.sliceString(t, e, this.lineBreak);
        }
        facet(t) {
          let e = this.config.address[t.id];
          return null == e ? t.default : (st(this, e), rt(this, e));
        }
        toJSON(t) {
          let e = { doc: this.sliceDoc(), selection: this.selection.toJSON() };
          if (t)
            for (let i in t) {
              let n = t[i];
              n instanceof J &&
                null != this.config.address[n.id] &&
                (e[i] = n.spec.toJSON(this.field(t[i]), this));
            }
          return e;
        }
        static fromJSON(t, e = {}, i) {
          if (!t || 'string' != typeof t.doc)
            throw new RangeError('Invalid JSON representation for EditorState');
          let n = [];
          if (i)
            for (let s in i)
              if (Object.prototype.hasOwnProperty.call(t, s)) {
                let e = i[s],
                  r = t[s];
                n.push(e.init((t) => e.spec.fromJSON(r, t)));
              }
          return Rt.create({
            doc: t.doc,
            selection: V.fromJSON(t.selection),
            extensions: e.extensions ? n.concat([e.extensions]) : n,
          });
        }
        static create(t = {}) {
          let e = it.resolve(t.extensions || [], new Map()),
            i =
              t.doc instanceof o
                ? t.doc
                : o.of(
                    (t.doc || '').split(e.staticFacet(Rt.lineSeparator) || D),
                  ),
            n = t.selection
              ? t.selection instanceof V
                ? t.selection
                : V.single(t.selection.anchor, t.selection.head)
              : V.single(0);
          return (
            z(n, i.length),
            e.staticFacet(lt) || (n = n.asSingle()),
            new Rt(
              e,
              i,
              n,
              e.dynamicSlots.map(() => null),
              (t, e) => e.create(t),
              null,
            )
          );
        }
        get tabSize() {
          return this.facet(Rt.tabSize);
        }
        get lineBreak() {
          return this.facet(Rt.lineSeparator) || '\n';
        }
        get readOnly() {
          return this.facet(dt);
        }
        phrase(t, ...e) {
          for (let i of this.facet(Rt.phrases))
            if (Object.prototype.hasOwnProperty.call(i, t)) {
              t = i[t];
              break;
            }
          return (
            e.length &&
              (t = t.replace(/\$(\$|\d*)/g, (t, i) => {
                if ('$' == i) return '$';
                let n = +(i || 1);
                return !n || n > e.length ? t : e[n - 1];
              })),
            t
          );
        }
        languageDataAt(t, e, i = -1) {
          let n = [];
          for (let s of this.facet(ot))
            for (let r of s(this, e, i))
              Object.prototype.hasOwnProperty.call(r, t) && n.push(r[t]);
          return n;
        }
        charCategorizer(t) {
          return Et(this.languageDataAt('wordChars', t).join(''));
        }
        wordAt(t) {
          let { text: e, from: i, length: n } = this.doc.lineAt(t),
            s = this.charCategorizer(t),
            r = t - i,
            o = t - i;
          while (r > 0) {
            let t = b(e, r, !1);
            if (s(e.slice(t, r)) != At.Word) break;
            r = t;
          }
          while (o < n) {
            let t = b(e, o);
            if (s(e.slice(o, t)) != At.Word) break;
            o = t;
          }
          return r == o ? null : V.range(r + i, o + i);
        }
      }
      function Bt(t, e, i = {}) {
        let n = {};
        for (let s of t)
          for (let t of Object.keys(s)) {
            let e = s[t],
              r = n[t];
            if (void 0 === r) n[t] = e;
            else if (r === e || void 0 === e);
            else {
              if (!Object.hasOwnProperty.call(i, t))
                throw new Error('Config merge conflict for field ' + t);
              n[t] = i[t](r, e);
            }
          }
        for (let s in e) void 0 === n[s] && (n[s] = e[s]);
        return n;
      }
      (Rt.allowMultipleSelections = lt),
        (Rt.tabSize = q.define({ combine: (t) => (t.length ? t[0] : 4) })),
        (Rt.lineSeparator = at),
        (Rt.readOnly = dt),
        (Rt.phrases = q.define({
          compare(t, e) {
            let i = Object.keys(t),
              n = Object.keys(e);
            return i.length == n.length && i.every((i) => t[i] == e[i]);
          },
        })),
        (Rt.languageData = ot),
        (Rt.changeFilter = ht),
        (Rt.transactionFilter = ct),
        (Rt.transactionExtender = ut),
        (tt.reconfigure = gt.define());
      class Lt {
        eq(t) {
          return this == t;
        }
        range(t, e = t) {
          return Nt.create(t, e, this);
        }
      }
      (Lt.prototype.startSide = Lt.prototype.endSide = 0),
        (Lt.prototype.point = !1),
        (Lt.prototype.mapMode = T.TrackDel);
      class Nt {
        constructor(t, e, i) {
          (this.from = t), (this.to = e), (this.value = i);
        }
        static create(t, e, i) {
          return new Nt(t, e, i);
        }
      }
      function Pt(t, e) {
        return t.from - e.from || t.value.startSide - e.value.startSide;
      }
      class It {
        constructor(t, e, i, n) {
          (this.from = t), (this.to = e), (this.value = i), (this.maxPoint = n);
        }
        get length() {
          return this.to[this.to.length - 1];
        }
        findIndex(t, e, i, n = 0) {
          let s = i ? this.to : this.from;
          for (let r = n, o = s.length; ; ) {
            if (r == o) return r;
            let n = (r + o) >> 1,
              l =
                s[n] - t ||
                (i ? this.value[n].endSide : this.value[n].startSide) - e;
            if (n == r) return l >= 0 ? r : o;
            l >= 0 ? (o = n) : (r = n + 1);
          }
        }
        between(t, e, i, n) {
          for (
            let s = this.findIndex(e, -1e9, !0),
              r = this.findIndex(i, 1e9, !1, s);
            s < r;
            s++
          )
            if (!1 === n(this.from[s] + t, this.to[s] + t, this.value[s]))
              return !1;
        }
        map(t, e) {
          let i = [],
            n = [],
            s = [],
            r = -1,
            o = -1;
          for (let l = 0; l < this.value.length; l++) {
            let a,
              h,
              c = this.value[l],
              u = this.from[l] + t,
              d = this.to[l] + t;
            if (u == d) {
              let t = e.mapPos(u, c.startSide, c.mapMode);
              if (null == t) continue;
              if (
                ((a = h = t),
                c.startSide != c.endSide &&
                  ((h = e.mapPos(u, c.endSide)), h < a))
              )
                continue;
            } else if (
              ((a = e.mapPos(u, c.startSide)),
              (h = e.mapPos(d, c.endSide)),
              a > h || (a == h && c.startSide > 0 && c.endSide <= 0))
            )
              continue;
            (h - a || c.endSide - c.startSide) < 0 ||
              (r < 0 && (r = a),
              c.point && (o = Math.max(o, h - a)),
              i.push(c),
              n.push(a - r),
              s.push(h - r));
          }
          return { mapped: i.length ? new It(n, s, i, o) : null, pos: r };
        }
      }
      class Ht {
        constructor(t, e, i, n) {
          (this.chunkPos = t),
            (this.chunk = e),
            (this.nextLayer = i),
            (this.maxPoint = n);
        }
        static create(t, e, i, n) {
          return new Ht(t, e, i, n);
        }
        get length() {
          let t = this.chunk.length - 1;
          return t < 0 ? 0 : Math.max(this.chunkEnd(t), this.nextLayer.length);
        }
        get size() {
          if (this.isEmpty) return 0;
          let t = this.nextLayer.size;
          for (let e of this.chunk) t += e.value.length;
          return t;
        }
        chunkEnd(t) {
          return this.chunkPos[t] + this.chunk[t].length;
        }
        update(t) {
          let {
              add: e = [],
              sort: i = !1,
              filterFrom: n = 0,
              filterTo: s = this.length,
            } = t,
            r = t.filter;
          if (0 == e.length && !r) return this;
          if ((i && (e = e.slice().sort(Pt)), this.isEmpty))
            return e.length ? Ht.of(e) : this;
          let o = new Ft(this, null, -1).goto(0),
            l = 0,
            a = [],
            h = new Vt();
          while (o.value || l < e.length)
            if (
              l < e.length &&
              (o.from - e[l].from || o.startSide - e[l].value.startSide) >= 0
            ) {
              let t = e[l++];
              h.addInner(t.from, t.to, t.value) || a.push(t);
            } else
              1 == o.rangeIndex &&
              o.chunkIndex < this.chunk.length &&
              (l == e.length || this.chunkEnd(o.chunkIndex) < e[l].from) &&
              (!r ||
                n > this.chunkEnd(o.chunkIndex) ||
                s < this.chunkPos[o.chunkIndex]) &&
              h.addChunk(this.chunkPos[o.chunkIndex], this.chunk[o.chunkIndex])
                ? o.nextChunk()
                : ((!r || n > o.to || s < o.from || r(o.from, o.to, o.value)) &&
                    (h.addInner(o.from, o.to, o.value) ||
                      a.push(Nt.create(o.from, o.to, o.value))),
                  o.next());
          return h.finishInner(
            this.nextLayer.isEmpty && !a.length
              ? Ht.empty
              : this.nextLayer.update({
                  add: a,
                  filter: r,
                  filterFrom: n,
                  filterTo: s,
                }),
          );
        }
        map(t) {
          if (t.empty || this.isEmpty) return this;
          let e = [],
            i = [],
            n = -1;
          for (let r = 0; r < this.chunk.length; r++) {
            let s = this.chunkPos[r],
              o = this.chunk[r],
              l = t.touchesRange(s, s + o.length);
            if (!1 === l)
              (n = Math.max(n, o.maxPoint)), e.push(o), i.push(t.mapPos(s));
            else if (!0 === l) {
              let { mapped: r, pos: l } = o.map(s, t);
              r && ((n = Math.max(n, r.maxPoint)), e.push(r), i.push(l));
            }
          }
          let s = this.nextLayer.map(t);
          return 0 == e.length ? s : new Ht(i, e, s || Ht.empty, n);
        }
        between(t, e, i) {
          if (!this.isEmpty) {
            for (let n = 0; n < this.chunk.length; n++) {
              let s = this.chunkPos[n],
                r = this.chunk[n];
              if (
                e >= s &&
                t <= s + r.length &&
                !1 === r.between(s, t - s, e - s, i)
              )
                return;
            }
            this.nextLayer.between(t, e, i);
          }
        }
        iter(t = 0) {
          return qt.from([this]).goto(t);
        }
        get isEmpty() {
          return this.nextLayer == this;
        }
        static iter(t, e = 0) {
          return qt.from(t).goto(e);
        }
        static compare(t, e, i, n, s = -1) {
          let r = t.filter(
              (t) => t.maxPoint > 0 || (!t.isEmpty && t.maxPoint >= s),
            ),
            o = e.filter(
              (t) => t.maxPoint > 0 || (!t.isEmpty && t.maxPoint >= s),
            ),
            l = zt(r, o, i),
            a = new _t(r, l, s),
            h = new _t(o, l, s);
          i.iterGaps((t, e, i) => Kt(a, t, h, e, i, n)),
            i.empty && 0 == i.length && Kt(a, 0, h, 0, 0, n);
        }
        static eq(t, e, i = 0, n) {
          null == n && (n = 999999999);
          let s = t.filter((t) => !t.isEmpty && e.indexOf(t) < 0),
            r = e.filter((e) => !e.isEmpty && t.indexOf(e) < 0);
          if (s.length != r.length) return !1;
          if (!s.length) return !0;
          let o = zt(s, r),
            l = new _t(s, o, 0).goto(i),
            a = new _t(r, o, 0).goto(i);
          for (;;) {
            if (
              l.to != a.to ||
              !$t(l.active, a.active) ||
              (l.point && (!a.point || !l.point.eq(a.point)))
            )
              return !1;
            if (l.to > n) return !0;
            l.next(), a.next();
          }
        }
        static spans(t, e, i, n, s = -1) {
          let r = new _t(t, null, s).goto(e),
            o = e,
            l = r.openStart;
          for (;;) {
            let t = Math.min(r.to, i);
            if (r.point) {
              let i = r.activeForPoint(r.to),
                s = r.pointFrom < e ? i.length + 1 : Math.min(i.length, l);
              n.point(o, t, r.point, i, s, r.pointRank),
                (l = Math.min(r.openEnd(t), i.length));
            } else t > o && (n.span(o, t, r.active, l), (l = r.openEnd(t)));
            if (r.to > i) return l + (r.point && r.to > i ? 1 : 0);
            (o = r.to), r.next();
          }
        }
        static of(t, e = !1) {
          let i = new Vt();
          for (let n of t instanceof Nt ? [t] : e ? Wt(t) : t)
            i.add(n.from, n.to, n.value);
          return i.finish();
        }
      }
      function Wt(t) {
        if (t.length > 1)
          for (let e = t[0], i = 1; i < t.length; i++) {
            let n = t[i];
            if (Pt(e, n) > 0) return t.slice().sort(Pt);
            e = n;
          }
        return t;
      }
      (Ht.empty = new Ht([], [], null, -1)), (Ht.empty.nextLayer = Ht.empty);
      class Vt {
        constructor() {
          (this.chunks = []),
            (this.chunkPos = []),
            (this.chunkStart = -1),
            (this.last = null),
            (this.lastFrom = -1e9),
            (this.lastTo = -1e9),
            (this.from = []),
            (this.to = []),
            (this.value = []),
            (this.maxPoint = -1),
            (this.setMaxPoint = -1),
            (this.nextLayer = null);
        }
        finishChunk(t) {
          this.chunks.push(
            new It(this.from, this.to, this.value, this.maxPoint),
          ),
            this.chunkPos.push(this.chunkStart),
            (this.chunkStart = -1),
            (this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint)),
            (this.maxPoint = -1),
            t && ((this.from = []), (this.to = []), (this.value = []));
        }
        add(t, e, i) {
          this.addInner(t, e, i) ||
            (this.nextLayer || (this.nextLayer = new Vt())).add(t, e, i);
        }
        addInner(t, e, i) {
          let n = t - this.lastTo || i.startSide - this.last.endSide;
          if (
            n <= 0 &&
            (t - this.lastFrom || i.startSide - this.last.startSide) < 0
          )
            throw new Error(
              'Ranges must be added sorted by `from` position and `startSide`',
            );
          return (
            !(n < 0) &&
            (250 == this.from.length && this.finishChunk(!0),
            this.chunkStart < 0 && (this.chunkStart = t),
            this.from.push(t - this.chunkStart),
            this.to.push(e - this.chunkStart),
            (this.last = i),
            (this.lastFrom = t),
            (this.lastTo = e),
            this.value.push(i),
            i.point && (this.maxPoint = Math.max(this.maxPoint, e - t)),
            !0)
          );
        }
        addChunk(t, e) {
          if ((t - this.lastTo || e.value[0].startSide - this.last.endSide) < 0)
            return !1;
          this.from.length && this.finishChunk(!0),
            (this.setMaxPoint = Math.max(this.setMaxPoint, e.maxPoint)),
            this.chunks.push(e),
            this.chunkPos.push(t);
          let i = e.value.length - 1;
          return (
            (this.last = e.value[i]),
            (this.lastFrom = e.from[i] + t),
            (this.lastTo = e.to[i] + t),
            !0
          );
        }
        finish() {
          return this.finishInner(Ht.empty);
        }
        finishInner(t) {
          if (
            (this.from.length && this.finishChunk(!1), 0 == this.chunks.length)
          )
            return t;
          let e = Ht.create(
            this.chunkPos,
            this.chunks,
            this.nextLayer ? this.nextLayer.finishInner(t) : t,
            this.setMaxPoint,
          );
          return (this.from = null), e;
        }
      }
      function zt(t, e, i) {
        let n = new Map();
        for (let r of t)
          for (let t = 0; t < r.chunk.length; t++)
            r.chunk[t].maxPoint <= 0 && n.set(r.chunk[t], r.chunkPos[t]);
        let s = new Set();
        for (let r of e)
          for (let t = 0; t < r.chunk.length; t++) {
            let e = n.get(r.chunk[t]);
            null == e ||
              (i ? i.mapPos(e) : e) != r.chunkPos[t] ||
              (null === i || void 0 === i
                ? void 0
                : i.touchesRange(e, e + r.chunk[t].length)) ||
              s.add(r.chunk[t]);
          }
        return s;
      }
      class Ft {
        constructor(t, e, i, n = 0) {
          (this.layer = t),
            (this.skip = e),
            (this.minPoint = i),
            (this.rank = n);
        }
        get startSide() {
          return this.value ? this.value.startSide : 0;
        }
        get endSide() {
          return this.value ? this.value.endSide : 0;
        }
        goto(t, e = -1e9) {
          return (
            (this.chunkIndex = this.rangeIndex = 0),
            this.gotoInner(t, e, !1),
            this
          );
        }
        gotoInner(t, e, i) {
          while (this.chunkIndex < this.layer.chunk.length) {
            let e = this.layer.chunk[this.chunkIndex];
            if (
              !(
                (this.skip && this.skip.has(e)) ||
                this.layer.chunkEnd(this.chunkIndex) < t ||
                e.maxPoint < this.minPoint
              )
            )
              break;
            this.chunkIndex++, (i = !1);
          }
          if (this.chunkIndex < this.layer.chunk.length) {
            let n = this.layer.chunk[this.chunkIndex].findIndex(
              t - this.layer.chunkPos[this.chunkIndex],
              e,
              !0,
            );
            (!i || this.rangeIndex < n) && this.setRangeIndex(n);
          }
          this.next();
        }
        forward(t, e) {
          (this.to - t || this.endSide - e) < 0 && this.gotoInner(t, e, !0);
        }
        next() {
          for (;;) {
            if (this.chunkIndex == this.layer.chunk.length) {
              (this.from = this.to = 1e9), (this.value = null);
              break;
            }
            {
              let t = this.layer.chunkPos[this.chunkIndex],
                e = this.layer.chunk[this.chunkIndex],
                i = t + e.from[this.rangeIndex];
              if (
                ((this.from = i),
                (this.to = t + e.to[this.rangeIndex]),
                (this.value = e.value[this.rangeIndex]),
                this.setRangeIndex(this.rangeIndex + 1),
                this.minPoint < 0 ||
                  (this.value.point && this.to - this.from >= this.minPoint))
              )
                break;
            }
          }
        }
        setRangeIndex(t) {
          if (t == this.layer.chunk[this.chunkIndex].value.length) {
            if ((this.chunkIndex++, this.skip))
              while (
                this.chunkIndex < this.layer.chunk.length &&
                this.skip.has(this.layer.chunk[this.chunkIndex])
              )
                this.chunkIndex++;
            this.rangeIndex = 0;
          } else this.rangeIndex = t;
        }
        nextChunk() {
          this.chunkIndex++, (this.rangeIndex = 0), this.next();
        }
        compare(t) {
          return (
            this.from - t.from ||
            this.startSide - t.startSide ||
            this.rank - t.rank ||
            this.to - t.to ||
            this.endSide - t.endSide
          );
        }
      }
      class qt {
        constructor(t) {
          this.heap = t;
        }
        static from(t, e = null, i = -1) {
          let n = [];
          for (let s = 0; s < t.length; s++)
            for (let r = t[s]; !r.isEmpty; r = r.nextLayer)
              r.maxPoint >= i && n.push(new Ft(r, e, i, s));
          return 1 == n.length ? n[0] : new qt(n);
        }
        get startSide() {
          return this.value ? this.value.startSide : 0;
        }
        goto(t, e = -1e9) {
          for (let i of this.heap) i.goto(t, e);
          for (let i = this.heap.length >> 1; i >= 0; i--) jt(this.heap, i);
          return this.next(), this;
        }
        forward(t, e) {
          for (let i of this.heap) i.forward(t, e);
          for (let i = this.heap.length >> 1; i >= 0; i--) jt(this.heap, i);
          (this.to - t || this.value.endSide - e) < 0 && this.next();
        }
        next() {
          if (0 == this.heap.length)
            (this.from = this.to = 1e9), (this.value = null), (this.rank = -1);
          else {
            let t = this.heap[0];
            (this.from = t.from),
              (this.to = t.to),
              (this.value = t.value),
              (this.rank = t.rank),
              t.value && t.next(),
              jt(this.heap, 0);
          }
        }
      }
      function jt(t, e) {
        for (let i = t[e]; ; ) {
          let n = 1 + (e << 1);
          if (n >= t.length) break;
          let s = t[n];
          if (
            (n + 1 < t.length &&
              s.compare(t[n + 1]) >= 0 &&
              ((s = t[n + 1]), n++),
            i.compare(s) < 0)
          )
            break;
          (t[n] = i), (t[e] = s), (e = n);
        }
      }
      class _t {
        constructor(t, e, i) {
          (this.minPoint = i),
            (this.active = []),
            (this.activeTo = []),
            (this.activeRank = []),
            (this.minActive = -1),
            (this.point = null),
            (this.pointFrom = 0),
            (this.pointRank = 0),
            (this.to = -1e9),
            (this.endSide = 0),
            (this.openStart = -1),
            (this.cursor = qt.from(t, e, i));
        }
        goto(t, e = -1e9) {
          return (
            this.cursor.goto(t, e),
            (this.active.length =
              this.activeTo.length =
              this.activeRank.length =
                0),
            (this.minActive = -1),
            (this.to = t),
            (this.endSide = e),
            (this.openStart = -1),
            this.next(),
            this
          );
        }
        forward(t, e) {
          while (
            this.minActive > -1 &&
            (this.activeTo[this.minActive] - t ||
              this.active[this.minActive].endSide - e) < 0
          )
            this.removeActive(this.minActive);
          this.cursor.forward(t, e);
        }
        removeActive(t) {
          Ut(this.active, t),
            Ut(this.activeTo, t),
            Ut(this.activeRank, t),
            (this.minActive = Jt(this.active, this.activeTo));
        }
        addActive(t) {
          let e = 0,
            { value: i, to: n, rank: s } = this.cursor;
          while (e < this.activeRank.length && this.activeRank[e] <= s) e++;
          Gt(this.active, e, i),
            Gt(this.activeTo, e, n),
            Gt(this.activeRank, e, s),
            t && Gt(t, e, this.cursor.from),
            (this.minActive = Jt(this.active, this.activeTo));
        }
        next() {
          let t = this.to,
            e = this.point;
          this.point = null;
          let i = this.openStart < 0 ? [] : null;
          for (;;) {
            let n = this.minActive;
            if (
              n > -1 &&
              (this.activeTo[n] - this.cursor.from ||
                this.active[n].endSide - this.cursor.startSide) < 0
            ) {
              if (this.activeTo[n] > t) {
                (this.to = this.activeTo[n]),
                  (this.endSide = this.active[n].endSide);
                break;
              }
              this.removeActive(n), i && Ut(i, n);
            } else {
              if (!this.cursor.value) {
                this.to = this.endSide = 1e9;
                break;
              }
              if (this.cursor.from > t) {
                (this.to = this.cursor.from),
                  (this.endSide = this.cursor.startSide);
                break;
              }
              {
                let t = this.cursor.value;
                if (t.point) {
                  if (
                    !(
                      e &&
                      this.cursor.to == this.to &&
                      this.cursor.from < this.cursor.to
                    )
                  ) {
                    (this.point = t),
                      (this.pointFrom = this.cursor.from),
                      (this.pointRank = this.cursor.rank),
                      (this.to = this.cursor.to),
                      (this.endSide = t.endSide),
                      this.cursor.next(),
                      this.forward(this.to, this.endSide);
                    break;
                  }
                  this.cursor.next();
                } else this.addActive(i), this.cursor.next();
              }
            }
          }
          if (i) {
            this.openStart = 0;
            for (let e = i.length - 1; e >= 0 && i[e] < t; e--)
              this.openStart++;
          }
        }
        activeForPoint(t) {
          if (!this.active.length) return this.active;
          let e = [];
          for (let i = this.active.length - 1; i >= 0; i--) {
            if (this.activeRank[i] < this.pointRank) break;
            (this.activeTo[i] > t ||
              (this.activeTo[i] == t &&
                this.active[i].endSide >= this.point.endSide)) &&
              e.push(this.active[i]);
          }
          return e.reverse();
        }
        openEnd(t) {
          let e = 0;
          for (
            let i = this.activeTo.length - 1;
            i >= 0 && this.activeTo[i] > t;
            i--
          )
            e++;
          return e;
        }
      }
      function Kt(t, e, i, n, s, r) {
        t.goto(e), i.goto(n);
        let o = n + s,
          l = n,
          a = n - e;
        for (;;) {
          let e = t.to + a - i.to || t.endSide - i.endSide,
            n = e < 0 ? t.to + a : i.to,
            s = Math.min(n, o);
          if (
            (t.point || i.point
              ? (t.point &&
                  i.point &&
                  (t.point == i.point || t.point.eq(i.point)) &&
                  $t(t.activeForPoint(t.to + a), i.activeForPoint(i.to))) ||
                r.comparePoint(l, s, t.point, i.point)
              : s > l &&
                !$t(t.active, i.active) &&
                r.compareRange(l, s, t.active, i.active),
            n > o)
          )
            break;
          (l = n), e <= 0 && t.next(), e >= 0 && i.next();
        }
      }
      function $t(t, e) {
        if (t.length != e.length) return !1;
        for (let i = 0; i < t.length; i++)
          if (t[i] != e[i] && !t[i].eq(e[i])) return !1;
        return !0;
      }
      function Ut(t, e) {
        for (let i = e, n = t.length - 1; i < n; i++) t[i] = t[i + 1];
        t.pop();
      }
      function Gt(t, e, i) {
        for (let n = t.length - 1; n >= e; n--) t[n + 1] = t[n];
        t[e] = i;
      }
      function Jt(t, e) {
        let i = -1,
          n = 1e9;
        for (let s = 0; s < e.length; s++)
          (e[s] - n || t[s].endSide - t[i].endSide) < 0 &&
            ((i = s), (n = e[s]));
        return i;
      }
      function Yt(t, e, i = t.length) {
        let n = 0;
        for (let s = 0; s < i; )
          9 == t.charCodeAt(s)
            ? ((n += e - (n % e)), s++)
            : (n++, (s = b(t, s)));
        return n;
      }
      function Xt(t, e, i, n) {
        for (let s = 0, r = 0; ; ) {
          if (r >= e) return s;
          if (s == t.length) break;
          (r += 9 == t.charCodeAt(s) ? i - (r % i) : 1), (s = b(t, s));
        }
        return !0 === n ? -1 : t.length;
      }
      const Zt = '\u037c',
        Qt = 'undefined' == typeof Symbol ? '__' + Zt : Symbol.for(Zt),
        te =
          'undefined' == typeof Symbol
            ? '__styleSet' + Math.floor(1e8 * Math.random())
            : Symbol('styleSet'),
        ee =
          'undefined' != typeof globalThis
            ? globalThis
            : 'undefined' != typeof window
            ? window
            : {};
      class ie {
        constructor(t, e) {
          this.rules = [];
          let { finish: i } = e || {};
          function n(t) {
            return /^@/.test(t) ? [t] : t.split(/,\s*/);
          }
          function s(t, e, r, o) {
            let l = [],
              a = /^@(\w+)\b/.exec(t[0]),
              h = a && 'keyframes' == a[1];
            if (a && null == e) return r.push(t[0] + ';');
            for (let i in e) {
              let o = e[i];
              if (/&/.test(i))
                s(
                  i
                    .split(/,\s*/)
                    .map((e) => t.map((t) => e.replace(/&/, t)))
                    .reduce((t, e) => t.concat(e)),
                  o,
                  r,
                );
              else if (o && 'object' == typeof o) {
                if (!a)
                  throw new RangeError(
                    'The value of a property (' +
                      i +
                      ') should be a primitive value.',
                  );
                s(n(i), o, l, h);
              } else
                null != o &&
                  l.push(
                    i
                      .replace(/_.*/, '')
                      .replace(/[A-Z]/g, (t) => '-' + t.toLowerCase()) +
                      ': ' +
                      o +
                      ';',
                  );
            }
            (l.length || h) &&
              r.push(
                (!i || a || o ? t : t.map(i)).join(', ') +
                  ' {' +
                  l.join(' ') +
                  '}',
              );
          }
          for (let r in t) s(n(r), t[r], this.rules);
        }
        getRules() {
          return this.rules.join('\n');
        }
        static newName() {
          let t = ee[Qt] || 1;
          return (ee[Qt] = t + 1), Zt + t.toString(36);
        }
        static mount(t, e) {
          (t[te] || new se(t)).mount(Array.isArray(e) ? e : [e]);
        }
      }
      let ne = new Map();
      class se {
        constructor(t) {
          let e = t.ownerDocument || t,
            i = e.defaultView;
          if (!t.head && t.adoptedStyleSheets && i.CSSStyleSheet) {
            let n = ne.get(e);
            if (n)
              return (
                (t.adoptedStyleSheets = [n.sheet, ...t.adoptedStyleSheets]),
                (t[te] = n)
              );
            (this.sheet = new i.CSSStyleSheet()),
              (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]),
              ne.set(e, this);
          } else {
            this.styleTag = e.createElement('style');
            let i = t.head || t;
            i.insertBefore(this.styleTag, i.firstChild);
          }
          (this.modules = []), (t[te] = this);
        }
        mount(t) {
          let e = this.sheet,
            i = 0,
            n = 0;
          for (let s = 0; s < t.length; s++) {
            let r = t[s],
              o = this.modules.indexOf(r);
            if (
              (o < n && o > -1 && (this.modules.splice(o, 1), n--, (o = -1)),
              -1 == o)
            ) {
              if ((this.modules.splice(n++, 0, r), e))
                for (let t = 0; t < r.rules.length; t++)
                  e.insertRule(r.rules[t], i++);
            } else {
              while (n < o) i += this.modules[n++].rules.length;
              (i += r.rules.length), n++;
            }
          }
          if (!e) {
            let t = '';
            for (let e = 0; e < this.modules.length; e++)
              t += this.modules[e].getRules() + '\n';
            this.styleTag.textContent = t;
          }
        }
      }
      for (
        var re = {
            8: 'Backspace',
            9: 'Tab',
            10: 'Enter',
            12: 'NumLock',
            13: 'Enter',
            16: 'Shift',
            17: 'Control',
            18: 'Alt',
            20: 'CapsLock',
            27: 'Escape',
            32: ' ',
            33: 'PageUp',
            34: 'PageDown',
            35: 'End',
            36: 'Home',
            37: 'ArrowLeft',
            38: 'ArrowUp',
            39: 'ArrowRight',
            40: 'ArrowDown',
            44: 'PrintScreen',
            45: 'Insert',
            46: 'Delete',
            59: ';',
            61: '=',
            91: 'Meta',
            92: 'Meta',
            106: '*',
            107: '+',
            108: ',',
            109: '-',
            110: '.',
            111: '/',
            144: 'NumLock',
            145: 'ScrollLock',
            160: 'Shift',
            161: 'Shift',
            162: 'Control',
            163: 'Control',
            164: 'Alt',
            165: 'Alt',
            173: '-',
            186: ';',
            187: '=',
            188: ',',
            189: '-',
            190: '.',
            191: '/',
            192: '`',
            219: '[',
            220: '\\',
            221: ']',
            222: "'",
          },
          oe = {
            48: ')',
            49: '!',
            50: '@',
            51: '#',
            52: '$',
            53: '%',
            54: '^',
            55: '&',
            56: '*',
            57: '(',
            59: ':',
            61: '+',
            173: '_',
            186: ':',
            187: '+',
            188: '<',
            189: '_',
            190: '>',
            191: '?',
            192: '~',
            219: '{',
            220: '|',
            221: '}',
            222: '"',
          },
          le =
            'undefined' != typeof navigator &&
            /Chrome\/(\d+)/.exec(navigator.userAgent),
          ae =
            ('undefined' != typeof navigator &&
              /Gecko\/\d+/.test(navigator.userAgent),
            'undefined' != typeof navigator && /Mac/.test(navigator.platform)),
          he =
            'undefined' != typeof navigator &&
            /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(
              navigator.userAgent,
            ),
          ce = ae || (le && +le[1] < 57),
          ue = 0;
        ue < 10;
        ue++
      )
        re[48 + ue] = re[96 + ue] = String(ue);
      for (ue = 1; ue <= 24; ue++) re[ue + 111] = 'F' + ue;
      for (ue = 65; ue <= 90; ue++)
        (re[ue] = String.fromCharCode(ue + 32)),
          (oe[ue] = String.fromCharCode(ue));
      for (var de in re) oe.hasOwnProperty(de) || (oe[de] = re[de]);
      function fe(t) {
        var e =
            (ce && (t.ctrlKey || t.altKey || t.metaKey)) ||
            (he && t.shiftKey && t.key && 1 == t.key.length) ||
            'Unidentified' == t.key,
          i =
            (!e && t.key) ||
            (t.shiftKey ? oe : re)[t.keyCode] ||
            t.key ||
            'Unidentified';
        return (
          'Esc' == i && (i = 'Escape'),
          'Del' == i && (i = 'Delete'),
          'Left' == i && (i = 'ArrowLeft'),
          'Up' == i && (i = 'ArrowUp'),
          'Right' == i && (i = 'ArrowRight'),
          'Down' == i && (i = 'ArrowDown'),
          i
        );
      }
      function pe(t) {
        let e;
        return (
          (e = 11 == t.nodeType ? (t.getSelection ? t : t.ownerDocument) : t),
          e.getSelection()
        );
      }
      function me(t, e) {
        return (
          !!e && (t == e || t.contains(1 != e.nodeType ? e.parentNode : e))
        );
      }
      function ge(t) {
        let e = t.activeElement;
        while (e && e.shadowRoot) e = e.shadowRoot.activeElement;
        return e;
      }
      function ve(t, e) {
        if (!e.anchorNode) return !1;
        try {
          return me(t, e.anchorNode);
        } catch (Mg) {
          return !1;
        }
      }
      function we(t) {
        return 3 == t.nodeType
          ? Re(t, 0, t.nodeValue.length).getClientRects()
          : 1 == t.nodeType
          ? t.getClientRects()
          : [];
      }
      function ye(t, e, i, n) {
        return !!i && (xe(t, e, i, n, -1) || xe(t, e, i, n, 1));
      }
      function be(t) {
        for (var e = 0; ; e++) if (((t = t.previousSibling), !t)) return e;
      }
      function xe(t, e, i, n, s) {
        for (;;) {
          if (t == i && e == n) return !0;
          if (e == (s < 0 ? 0 : ke(t))) {
            if ('DIV' == t.nodeName) return !1;
            let i = t.parentNode;
            if (!i || 1 != i.nodeType) return !1;
            (e = be(t) + (s < 0 ? 0 : 1)), (t = i);
          } else {
            if (1 != t.nodeType) return !1;
            if (
              ((t = t.childNodes[e + (s < 0 ? -1 : 0)]),
              1 == t.nodeType && 'false' == t.contentEditable)
            )
              return !1;
            e = s < 0 ? ke(t) : 0;
          }
        }
      }
      function ke(t) {
        return 3 == t.nodeType ? t.nodeValue.length : t.childNodes.length;
      }
      function Se(t, e) {
        let i = e ? t.left : t.right;
        return { left: i, right: i, top: t.top, bottom: t.bottom };
      }
      function Ce(t) {
        return { left: 0, right: t.innerWidth, top: 0, bottom: t.innerHeight };
      }
      function Me(t, e, i, n, s, r, o, l) {
        let a = t.ownerDocument,
          h = a.defaultView || window;
        for (let c = t; c; )
          if (1 == c.nodeType) {
            let t,
              u = c == a.body;
            if (u) t = Ce(h);
            else {
              if (
                c.scrollHeight <= c.clientHeight &&
                c.scrollWidth <= c.clientWidth
              ) {
                c = c.assignedSlot || c.parentNode;
                continue;
              }
              let e = c.getBoundingClientRect();
              t = {
                left: e.left,
                right: e.left + c.clientWidth,
                top: e.top,
                bottom: e.top + c.clientHeight,
              };
            }
            let d = 0,
              f = 0;
            if ('nearest' == s)
              e.top < t.top
                ? ((f = -(t.top - e.top + o)),
                  i > 0 &&
                    e.bottom > t.bottom + f &&
                    (f = e.bottom - t.bottom + f + o))
                : e.bottom > t.bottom &&
                  ((f = e.bottom - t.bottom + o),
                  i < 0 && e.top - f < t.top && (f = -(t.top + f - e.top + o)));
            else {
              let n = e.bottom - e.top,
                r = t.bottom - t.top,
                l =
                  'center' == s && n <= r
                    ? e.top + n / 2 - r / 2
                    : 'start' == s || ('center' == s && i < 0)
                    ? e.top - o
                    : e.bottom - r + o;
              f = l - t.top;
            }
            if ('nearest' == n)
              e.left < t.left
                ? ((d = -(t.left - e.left + r)),
                  i > 0 &&
                    e.right > t.right + d &&
                    (d = e.right - t.right + d + r))
                : e.right > t.right &&
                  ((d = e.right - t.right + r),
                  i < 0 &&
                    e.left < t.left + d &&
                    (d = -(t.left + d - e.left + r)));
            else {
              let i =
                'center' == n
                  ? e.left + (e.right - e.left) / 2 - (t.right - t.left) / 2
                  : ('start' == n) == l
                  ? e.left - r
                  : e.right - (t.right - t.left) + r;
              d = i - t.left;
            }
            if (d || f)
              if (u) h.scrollBy(d, f);
              else {
                let t = 0,
                  i = 0;
                if (f) {
                  let t = c.scrollTop;
                  (c.scrollTop += f), (i = c.scrollTop - t);
                }
                if (d) {
                  let e = c.scrollLeft;
                  (c.scrollLeft += d), (t = c.scrollLeft - e);
                }
                (e = {
                  left: e.left - t,
                  top: e.top - i,
                  right: e.right - t,
                  bottom: e.bottom - i,
                }),
                  t && Math.abs(t - d) < 1 && (n = 'nearest'),
                  i && Math.abs(i - f) < 1 && (s = 'nearest');
              }
            if (u) break;
            c = c.assignedSlot || c.parentNode;
          } else {
            if (11 != c.nodeType) break;
            c = c.host;
          }
      }
      function Ae(t) {
        let e = t.ownerDocument;
        for (let i = t.parentNode; i; ) {
          if (i == e.body) break;
          if (1 == i.nodeType) {
            if (
              i.scrollHeight > i.clientHeight ||
              i.scrollWidth > i.clientWidth
            )
              return i;
            i = i.assignedSlot || i.parentNode;
          } else {
            if (11 != i.nodeType) break;
            i = i.host;
          }
        }
        return null;
      }
      class Oe {
        constructor() {
          (this.anchorNode = null),
            (this.anchorOffset = 0),
            (this.focusNode = null),
            (this.focusOffset = 0);
        }
        eq(t) {
          return (
            this.anchorNode == t.anchorNode &&
            this.anchorOffset == t.anchorOffset &&
            this.focusNode == t.focusNode &&
            this.focusOffset == t.focusOffset
          );
        }
        setRange(t) {
          this.set(t.anchorNode, t.anchorOffset, t.focusNode, t.focusOffset);
        }
        set(t, e, i, n) {
          (this.anchorNode = t),
            (this.anchorOffset = e),
            (this.focusNode = i),
            (this.focusOffset = n);
        }
      }
      let De,
        Te = null;
      function Ee(t) {
        if (t.setActive) return t.setActive();
        if (Te) return t.focus(Te);
        let e = [];
        for (let i = t; i; i = i.parentNode)
          if ((e.push(i, i.scrollTop, i.scrollLeft), i == i.ownerDocument))
            break;
        if (
          (t.focus(
            null == Te
              ? {
                  get preventScroll() {
                    return (Te = { preventScroll: !0 }), !0;
                  },
                }
              : void 0,
          ),
          !Te)
        ) {
          Te = !1;
          for (let t = 0; t < e.length; ) {
            let i = e[t++],
              n = e[t++],
              s = e[t++];
            i.scrollTop != n && (i.scrollTop = n),
              i.scrollLeft != s && (i.scrollLeft = s);
          }
        }
      }
      function Re(t, e, i = e) {
        let n = De || (De = document.createRange());
        return n.setEnd(t, i), n.setStart(t, e), n;
      }
      function Be(t, e, i) {
        let n = { key: e, code: e, keyCode: i, which: i, cancelable: !0 },
          s = new KeyboardEvent('keydown', n);
        (s.synthetic = !0), t.dispatchEvent(s);
        let r = new KeyboardEvent('keyup', n);
        return (
          (r.synthetic = !0),
          t.dispatchEvent(r),
          s.defaultPrevented || r.defaultPrevented
        );
      }
      function Le(t) {
        while (t) {
          if (t && (9 == t.nodeType || (11 == t.nodeType && t.host))) return t;
          t = t.assignedSlot || t.parentNode;
        }
        return null;
      }
      function Ne(t) {
        while (t.attributes.length) t.removeAttributeNode(t.attributes[0]);
      }
      function Pe(t, e) {
        let i = e.focusNode,
          n = e.focusOffset;
        if (!i || e.anchorNode != i || e.anchorOffset != n) return !1;
        for (;;)
          if (n) {
            if (1 != i.nodeType) return !1;
            let t = i.childNodes[n - 1];
            'false' == t.contentEditable ? n-- : ((i = t), (n = ke(i)));
          } else {
            if (i == t) return !0;
            (n = be(i)), (i = i.parentNode);
          }
      }
      class Ie {
        constructor(t, e, i = !0) {
          (this.node = t), (this.offset = e), (this.precise = i);
        }
        static before(t, e) {
          return new Ie(t.parentNode, be(t), e);
        }
        static after(t, e) {
          return new Ie(t.parentNode, be(t) + 1, e);
        }
      }
      const He = [];
      class We {
        constructor() {
          (this.parent = null), (this.dom = null), (this.dirty = 2);
        }
        get overrideDOMText() {
          return null;
        }
        get posAtStart() {
          return this.parent ? this.parent.posBefore(this) : 0;
        }
        get posAtEnd() {
          return this.posAtStart + this.length;
        }
        posBefore(t) {
          let e = this.posAtStart;
          for (let i of this.children) {
            if (i == t) return e;
            e += i.length + i.breakAfter;
          }
          throw new RangeError('Invalid child in posBefore');
        }
        posAfter(t) {
          return this.posBefore(t) + t.length;
        }
        sync(t, e) {
          if (2 & this.dirty) {
            let i,
              n = this.dom,
              s = null;
            for (let r of this.children) {
              if (r.dirty) {
                if (!r.dom && (i = s ? s.nextSibling : n.firstChild)) {
                  let t = We.get(i);
                  (!t || (!t.parent && t.canReuseDOM(r))) && r.reuseDOM(i);
                }
                r.sync(t, e), (r.dirty = 0);
              }
              if (
                ((i = s ? s.nextSibling : n.firstChild),
                e &&
                  !e.written &&
                  e.node == n &&
                  i != r.dom &&
                  (e.written = !0),
                r.dom.parentNode == n)
              )
                while (i && i != r.dom) i = Ve(i);
              else n.insertBefore(r.dom, i);
              s = r.dom;
            }
            (i = s ? s.nextSibling : n.firstChild),
              i && e && e.node == n && (e.written = !0);
            while (i) i = Ve(i);
          } else if (1 & this.dirty)
            for (let i of this.children)
              i.dirty && (i.sync(t, e), (i.dirty = 0));
        }
        reuseDOM(t) {}
        localPosFromDOM(t, e) {
          let i;
          if (t == this.dom) i = this.dom.childNodes[e];
          else {
            let n = 0 == ke(t) ? 0 : 0 == e ? -1 : 1;
            for (;;) {
              let e = t.parentNode;
              if (e == this.dom) break;
              0 == n &&
                e.firstChild != e.lastChild &&
                (n = t == e.firstChild ? -1 : 1),
                (t = e);
            }
            i = n < 0 ? t : t.nextSibling;
          }
          if (i == this.dom.firstChild) return 0;
          while (i && !We.get(i)) i = i.nextSibling;
          if (!i) return this.length;
          for (let n = 0, s = 0; ; n++) {
            let t = this.children[n];
            if (t.dom == i) return s;
            s += t.length + t.breakAfter;
          }
        }
        domBoundsAround(t, e, i = 0) {
          let n = -1,
            s = -1,
            r = -1,
            o = -1;
          for (let l = 0, a = i, h = i; l < this.children.length; l++) {
            let i = this.children[l],
              c = a + i.length;
            if (a < t && c > e) return i.domBoundsAround(t, e, a);
            if (
              (c >= t && -1 == n && ((n = l), (s = a)),
              a > e && i.dom.parentNode == this.dom)
            ) {
              (r = l), (o = h);
              break;
            }
            (h = c), (a = c + i.breakAfter);
          }
          return {
            from: s,
            to: o < 0 ? i + this.length : o,
            startDOM:
              (n ? this.children[n - 1].dom.nextSibling : null) ||
              this.dom.firstChild,
            endDOM:
              r < this.children.length && r >= 0 ? this.children[r].dom : null,
          };
        }
        markDirty(t = !1) {
          (this.dirty |= 2), this.markParentsDirty(t);
        }
        markParentsDirty(t) {
          for (let e = this.parent; e; e = e.parent) {
            if ((t && (e.dirty |= 2), 1 & e.dirty)) return;
            (e.dirty |= 1), (t = !1);
          }
        }
        setParent(t) {
          this.parent != t &&
            ((this.parent = t), this.dirty && this.markParentsDirty(!0));
        }
        setDOM(t) {
          this.dom && (this.dom.cmView = null),
            (this.dom = t),
            (t.cmView = this);
        }
        get rootView() {
          for (let t = this; ; ) {
            let e = t.parent;
            if (!e) return t;
            t = e;
          }
        }
        replaceChildren(t, e, i = He) {
          this.markDirty();
          for (let n = t; n < e; n++) {
            let t = this.children[n];
            t.parent == this && t.destroy();
          }
          this.children.splice(t, e - t, ...i);
          for (let n = 0; n < i.length; n++) i[n].setParent(this);
        }
        ignoreMutation(t) {
          return !1;
        }
        ignoreEvent(t) {
          return !1;
        }
        childCursor(t = this.length) {
          return new ze(this.children, t, this.children.length);
        }
        childPos(t, e = 1) {
          return this.childCursor().findPos(t, e);
        }
        toString() {
          let t = this.constructor.name.replace('View', '');
          return (
            t +
            (this.children.length
              ? '(' + this.children.join() + ')'
              : this.length
              ? '[' + ('Text' == t ? this.text : this.length) + ']'
              : '') +
            (this.breakAfter ? '#' : '')
          );
        }
        static get(t) {
          return t.cmView;
        }
        get isEditable() {
          return !0;
        }
        get isWidget() {
          return !1;
        }
        get isHidden() {
          return !1;
        }
        merge(t, e, i, n, s, r) {
          return !1;
        }
        become(t) {
          return !1;
        }
        canReuseDOM(t) {
          return t.constructor == this.constructor;
        }
        getSide() {
          return 0;
        }
        destroy() {
          this.parent = null;
        }
      }
      function Ve(t) {
        let e = t.nextSibling;
        return t.parentNode.removeChild(t), e;
      }
      We.prototype.breakAfter = 0;
      class ze {
        constructor(t, e, i) {
          (this.children = t), (this.pos = e), (this.i = i), (this.off = 0);
        }
        findPos(t, e = 1) {
          for (;;) {
            if (
              t > this.pos ||
              (t == this.pos &&
                (e > 0 || 0 == this.i || this.children[this.i - 1].breakAfter))
            )
              return (this.off = t - this.pos), this;
            let i = this.children[--this.i];
            this.pos -= i.length + i.breakAfter;
          }
        }
      }
      function Fe(t, e, i, n, s, r, o, l, a) {
        let { children: h } = t,
          c = h.length ? h[e] : null,
          u = r.length ? r[r.length - 1] : null,
          d = u ? u.breakAfter : o;
        if (
          !(
            e == n &&
            c &&
            !o &&
            !d &&
            r.length < 2 &&
            c.merge(i, s, r.length ? u : null, 0 == i, l, a)
          )
        ) {
          if (n < h.length) {
            let t = h[n];
            t && s < t.length
              ? (e == n && ((t = t.split(s)), (s = 0)),
                !d && u && t.merge(0, s, u, !0, 0, a)
                  ? (r[r.length - 1] = t)
                  : (s && t.merge(0, s, null, !1, 0, a), r.push(t)))
              : (null === t || void 0 === t ? void 0 : t.breakAfter) &&
                (u ? (u.breakAfter = 1) : (o = 1)),
              n++;
          }
          c &&
            ((c.breakAfter = o),
            i > 0 &&
              (!o && r.length && c.merge(i, c.length, r[0], !1, l, 0)
                ? (c.breakAfter = r.shift().breakAfter)
                : (i < c.length ||
                    (c.children.length &&
                      0 == c.children[c.children.length - 1].length)) &&
                  c.merge(i, c.length, null, !1, l, 0),
              e++));
          while (e < n && r.length)
            if (h[n - 1].become(r[r.length - 1]))
              n--, r.pop(), (a = r.length ? 0 : l);
            else {
              if (!h[e].become(r[0])) break;
              e++, r.shift(), (l = r.length ? 0 : a);
            }
          !r.length &&
            e &&
            n < h.length &&
            !h[e - 1].breakAfter &&
            h[n].merge(0, 0, h[e - 1], !1, l, a) &&
            e--,
            (e < n || r.length) && t.replaceChildren(e, n, r);
        }
      }
      function qe(t, e, i, n, s, r) {
        let o = t.childCursor(),
          { i: l, off: a } = o.findPos(i, 1),
          { i: h, off: c } = o.findPos(e, -1),
          u = e - i;
        for (let d of n) u += d.length;
        (t.length += u), Fe(t, h, c, l, a, n, 0, s, r);
      }
      let je =
          'undefined' != typeof navigator
            ? navigator
            : { userAgent: '', vendor: '', platform: '' },
        _e =
          'undefined' != typeof document
            ? document
            : { documentElement: { style: {} } };
      const Ke = /Edge\/(\d+)/.exec(je.userAgent),
        $e = /MSIE \d/.test(je.userAgent),
        Ue = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(je.userAgent),
        Ge = !!($e || Ue || Ke),
        Je = !Ge && /gecko\/(\d+)/i.test(je.userAgent),
        Ye = !Ge && /Chrome\/(\d+)/.exec(je.userAgent),
        Xe = 'webkitFontSmoothing' in _e.documentElement.style,
        Ze = !Ge && /Apple Computer/.test(je.vendor),
        Qe = Ze && (/Mobile\/\w+/.test(je.userAgent) || je.maxTouchPoints > 2);
      var ti = {
        mac: Qe || /Mac/.test(je.platform),
        windows: /Win/.test(je.platform),
        linux: /Linux|X11/.test(je.platform),
        ie: Ge,
        ie_version: $e ? _e.documentMode || 6 : Ue ? +Ue[1] : Ke ? +Ke[1] : 0,
        gecko: Je,
        gecko_version: Je
          ? +(/Firefox\/(\d+)/.exec(je.userAgent) || [0, 0])[1]
          : 0,
        chrome: !!Ye,
        chrome_version: Ye ? +Ye[1] : 0,
        ios: Qe,
        android: /Android\b/.test(je.userAgent),
        webkit: Xe,
        safari: Ze,
        webkit_version: Xe
          ? +(/\bAppleWebKit\/(\d+)/.exec(navigator.userAgent) || [0, 0])[1]
          : 0,
        tabSize:
          null != _e.documentElement.style.tabSize
            ? 'tab-size'
            : '-moz-tab-size',
      };
      const ei = 256;
      class ii extends We {
        constructor(t) {
          super(), (this.text = t);
        }
        get length() {
          return this.text.length;
        }
        createDOM(t) {
          this.setDOM(t || document.createTextNode(this.text));
        }
        sync(t, e) {
          this.dom || this.createDOM(),
            this.dom.nodeValue != this.text &&
              (e && e.node == this.dom && (e.written = !0),
              (this.dom.nodeValue = this.text));
        }
        reuseDOM(t) {
          3 == t.nodeType && this.createDOM(t);
        }
        merge(t, e, i) {
          return (
            (!i ||
              (i instanceof ii && !(this.length - (e - t) + i.length > ei))) &&
            ((this.text =
              this.text.slice(0, t) + (i ? i.text : '') + this.text.slice(e)),
            this.markDirty(),
            !0)
          );
        }
        split(t) {
          let e = new ii(this.text.slice(t));
          return (this.text = this.text.slice(0, t)), this.markDirty(), e;
        }
        localPosFromDOM(t, e) {
          return t == this.dom ? e : e ? this.text.length : 0;
        }
        domAtPos(t) {
          return new Ie(this.dom, t);
        }
        domBoundsAround(t, e, i) {
          return {
            from: i,
            to: i + this.length,
            startDOM: this.dom,
            endDOM: this.dom.nextSibling,
          };
        }
        coordsAt(t, e) {
          return si(this.dom, t, e);
        }
      }
      class ni extends We {
        constructor(t, e = [], i = 0) {
          super(), (this.mark = t), (this.children = e), (this.length = i);
          for (let n of e) n.setParent(this);
        }
        setAttrs(t) {
          if (
            (Ne(t),
            this.mark.class && (t.className = this.mark.class),
            this.mark.attrs)
          )
            for (let e in this.mark.attrs)
              t.setAttribute(e, this.mark.attrs[e]);
          return t;
        }
        reuseDOM(t) {
          t.nodeName == this.mark.tagName.toUpperCase() &&
            (this.setDOM(t), (this.dirty |= 6));
        }
        sync(t, e) {
          this.dom
            ? 4 & this.dirty && this.setAttrs(this.dom)
            : this.setDOM(
                this.setAttrs(document.createElement(this.mark.tagName)),
              ),
            super.sync(t, e);
        }
        merge(t, e, i, n, s, r) {
          return (
            (!i ||
              !(
                !(i instanceof ni && i.mark.eq(this.mark)) ||
                (t && s <= 0) ||
                (e < this.length && r <= 0)
              )) &&
            (qe(this, t, e, i ? i.children : [], s - 1, r - 1),
            this.markDirty(),
            !0)
          );
        }
        split(t) {
          let e = [],
            i = 0,
            n = -1,
            s = 0;
          for (let o of this.children) {
            let r = i + o.length;
            r > t && e.push(i < t ? o.split(t - i) : o),
              n < 0 && i >= t && (n = s),
              (i = r),
              s++;
          }
          let r = this.length - t;
          return (
            (this.length = t),
            n > -1 && ((this.children.length = n), this.markDirty()),
            new ni(this.mark, e, r)
          );
        }
        domAtPos(t) {
          return di(this, t);
        }
        coordsAt(t, e) {
          return pi(this, t, e);
        }
      }
      function si(t, e, i) {
        let n = t.nodeValue.length;
        e > n && (e = n);
        let s = e,
          r = e,
          o = 0;
        (0 == e && i < 0) || (e == n && i >= 0)
          ? ti.chrome ||
            ti.gecko ||
            (e ? (s--, (o = 1)) : r < n && (r++, (o = -1)))
          : i < 0
          ? s--
          : r < n && r++;
        let l = Re(t, s, r).getClientRects();
        if (!l.length) return null;
        let a = l[(o ? o < 0 : i >= 0) ? 0 : l.length - 1];
        return (
          ti.safari &&
            !o &&
            0 == a.width &&
            (a = Array.prototype.find.call(l, (t) => t.width) || a),
          o ? Se(a, o < 0) : a || null
        );
      }
      class ri extends We {
        constructor(t, e, i) {
          super(),
            (this.widget = t),
            (this.length = e),
            (this.side = i),
            (this.prevWidget = null);
        }
        static create(t, e, i) {
          return new (t.customView || ri)(t, e, i);
        }
        split(t) {
          let e = ri.create(this.widget, this.length - t, this.side);
          return (this.length -= t), e;
        }
        sync(t) {
          (this.dom && this.widget.updateDOM(this.dom, t)) ||
            (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom),
            (this.prevWidget = null),
            this.setDOM(this.widget.toDOM(t)),
            (this.dom.contentEditable = 'false'));
        }
        getSide() {
          return this.side;
        }
        merge(t, e, i, n, s, r) {
          return (
            !(
              i &&
              (!(i instanceof ri && this.widget.compare(i.widget)) ||
                (t > 0 && s <= 0) ||
                (e < this.length && r <= 0))
            ) &&
            ((this.length = t + (i ? i.length : 0) + (this.length - e)), !0)
          );
        }
        become(t) {
          return (
            t instanceof ri &&
            t.side == this.side &&
            this.widget.constructor == t.widget.constructor &&
            (this.widget.compare(t.widget) || this.markDirty(!0),
            this.dom && !this.prevWidget && (this.prevWidget = this.widget),
            (this.widget = t.widget),
            (this.length = t.length),
            !0)
          );
        }
        ignoreMutation() {
          return !0;
        }
        ignoreEvent(t) {
          return this.widget.ignoreEvent(t);
        }
        get overrideDOMText() {
          if (0 == this.length) return o.empty;
          let t = this;
          while (t.parent) t = t.parent;
          let { view: e } = t,
            i = e && e.state.doc,
            n = this.posAtStart;
          return i ? i.slice(n, n + this.length) : o.empty;
        }
        domAtPos(t) {
          return (this.length ? 0 == t : this.side > 0)
            ? Ie.before(this.dom)
            : Ie.after(this.dom, t == this.length);
        }
        domBoundsAround() {
          return null;
        }
        coordsAt(t, e) {
          let i = this.widget.coordsAt(this.dom, t, e);
          if (i) return i;
          let n = this.dom.getClientRects(),
            s = null;
          if (!n.length) return null;
          for (let r = t > 0 ? n.length - 1 : 0; ; r += t > 0 ? -1 : 1)
            if (
              ((s = n[r]),
              t > 0 ? 0 == r : r == n.length - 1 || s.top < s.bottom)
            )
              break;
          return this.length ? s : Se(s, this.side > 0);
        }
        get isEditable() {
          return !1;
        }
        get isWidget() {
          return !0;
        }
        get isHidden() {
          return this.widget.isHidden;
        }
        destroy() {
          super.destroy(), this.dom && this.widget.destroy(this.dom);
        }
      }
      class oi extends ri {
        domAtPos(t) {
          let { topView: e, text: i } = this.widget;
          return e
            ? li(
                t,
                0,
                e,
                i,
                this.length - e.length,
                (t, e) => t.domAtPos(e),
                (t, e) => new Ie(t, Math.min(e, t.nodeValue.length)),
              )
            : new Ie(i, Math.min(t, i.nodeValue.length));
        }
        sync() {
          this.setDOM(this.widget.toDOM());
        }
        localPosFromDOM(t, e) {
          let { topView: i, text: n } = this.widget;
          return i
            ? hi(t, e, i, n, this.length - i.length)
            : Math.min(e, this.length);
        }
        ignoreMutation() {
          return !1;
        }
        get overrideDOMText() {
          return null;
        }
        coordsAt(t, e) {
          let { topView: i, text: n } = this.widget;
          return i
            ? li(
                t,
                e,
                i,
                n,
                this.length - i.length,
                (t, e, i) => t.coordsAt(e, i),
                (t, e, i) => si(t, e, i),
              )
            : si(n, t, e);
        }
        destroy() {
          var t;
          super.destroy(),
            null === (t = this.widget.topView) || void 0 === t || t.destroy();
        }
        get isEditable() {
          return !0;
        }
        canReuseDOM() {
          return !0;
        }
      }
      function li(t, e, i, n, s, r, o) {
        if (i instanceof ni) {
          for (let l = i.dom.firstChild; l; l = l.nextSibling) {
            let i = We.get(l);
            if (i) {
              let a = me(l, n),
                h = i.length + (a ? s : 0);
              if (t < h || (t == h && i.getSide() <= 0))
                return a ? li(t, e, i, n, s, r, o) : r(i, t, e);
              t -= h;
            } else {
              let i = ai(t, e, l, o);
              if ('number' != typeof i) return i;
              t = i;
            }
          }
          return r(i, i.length, -1);
        }
        return i.dom == n ? o(n, t, e) : r(i, t, e);
      }
      function ai(t, e, i, n) {
        if (3 == i.nodeType) {
          let s = i.nodeValue.length;
          if (t <= s) return n(i, t, e);
          t -= s;
        } else if (1 == i.nodeType && 'false' != i.contentEditable)
          for (let s = i.firstChild; s; s = s.nextSibling) {
            let i = ai(t, e, s, n);
            if ('number' != typeof i) return i;
            t = i;
          }
        return t;
      }
      function hi(t, e, i, n, s) {
        if (i instanceof ni) {
          let r = 0;
          for (let o = i.dom.firstChild; o; o = o.nextSibling) {
            let i = We.get(o);
            if (i) {
              let l = me(o, n);
              if (me(o, t))
                return r + (l ? hi(t, e, i, n, s) : i.localPosFromDOM(t, e));
              r += i.length + (l ? s : 0);
            } else {
              let i = ci(t, e, o);
              if (null != i.result) return r + i.result;
              r += i.size;
            }
          }
        } else if (i.dom == n) return Math.min(e, n.nodeValue.length);
        return i.localPosFromDOM(t, e);
      }
      function ci(t, e, i) {
        if (3 == i.nodeType)
          return t == i ? { result: e } : { size: i.nodeValue.length };
        if (1 != i.nodeType || 'false' == i.contentEditable)
          return i.contains(t) ? { result: 0 } : { size: 0 };
        {
          let n = 0;
          for (let s = i.firstChild, r = 0; ; s = s.nextSibling, r++) {
            if (t == i && r == e) return { result: n };
            if (!s) return { size: n };
            let o = ci(t, e, s);
            if (null != o.result) return { result: e + o.result };
            n += o.size;
          }
        }
      }
      class ui extends We {
        constructor(t) {
          super(), (this.side = t);
        }
        get length() {
          return 0;
        }
        merge() {
          return !1;
        }
        become(t) {
          return t instanceof ui && t.side == this.side;
        }
        split() {
          return new ui(this.side);
        }
        sync() {
          if (!this.dom) {
            let t = document.createElement('img');
            (t.className = 'cm-widgetBuffer'),
              t.setAttribute('aria-hidden', 'true'),
              this.setDOM(t);
          }
        }
        getSide() {
          return this.side;
        }
        domAtPos(t) {
          return this.side > 0 ? Ie.before(this.dom) : Ie.after(this.dom);
        }
        localPosFromDOM() {
          return 0;
        }
        domBoundsAround() {
          return null;
        }
        coordsAt(t) {
          return this.dom.getBoundingClientRect();
        }
        get overrideDOMText() {
          return o.empty;
        }
        get isHidden() {
          return !0;
        }
      }
      function di(t, e) {
        let i = t.dom,
          { children: n } = t,
          s = 0;
        for (let r = 0; s < n.length; s++) {
          let t = n[s],
            o = r + t.length;
          if (!(o == r && t.getSide() <= 0)) {
            if (e > r && e < o && t.dom.parentNode == i)
              return t.domAtPos(e - r);
            if (e <= r) break;
            r = o;
          }
        }
        for (let r = s; r > 0; r--) {
          let t = n[r - 1];
          if (t.dom.parentNode == i) return t.domAtPos(t.length);
        }
        for (let r = s; r < n.length; r++) {
          let t = n[r];
          if (t.dom.parentNode == i) return t.domAtPos(0);
        }
        return new Ie(i, 0);
      }
      function fi(t, e, i) {
        let n,
          { children: s } = t;
        i > 0 &&
        e instanceof ni &&
        s.length &&
        (n = s[s.length - 1]) instanceof ni &&
        n.mark.eq(e.mark)
          ? fi(n, e.children[0], i - 1)
          : (s.push(e), e.setParent(t)),
          (t.length += e.length);
      }
      function pi(t, e, i) {
        let n = null,
          s = -1,
          r = null,
          o = -1;
        function l(t, e) {
          for (let a = 0, h = 0; a < t.children.length && h <= e; a++) {
            let c = t.children[a],
              u = h + c.length;
            u >= e &&
              (c.children.length
                ? l(c, e - h)
                : (!r || (r.isHidden && i > 0)) &&
                  (u > e || (h == u && c.getSide() > 0))
                ? ((r = c), (o = e - h))
                : (h < e || (h == u && c.getSide() < 0 && !c.isHidden)) &&
                  ((n = c), (s = e - h))),
              (h = u);
          }
        }
        l(t, e);
        let a = (i < 0 ? n : r) || n || r;
        return a ? a.coordsAt(Math.max(0, a == n ? s : o), i) : mi(t);
      }
      function mi(t) {
        let e = t.dom.lastChild;
        if (!e) return t.dom.getBoundingClientRect();
        let i = we(e);
        return i[i.length - 1] || null;
      }
      function gi(t, e) {
        for (let i in t)
          'class' == i && e.class
            ? (e.class += ' ' + t.class)
            : 'style' == i && e.style
            ? (e.style += ';' + t.style)
            : (e[i] = t[i]);
        return e;
      }
      function vi(t, e) {
        if (t == e) return !0;
        if (!t || !e) return !1;
        let i = Object.keys(t),
          n = Object.keys(e);
        if (i.length != n.length) return !1;
        for (let s of i) if (-1 == n.indexOf(s) || t[s] !== e[s]) return !1;
        return !0;
      }
      function wi(t, e, i) {
        let n = null;
        if (e) for (let s in e) (i && s in i) || t.removeAttribute((n = s));
        if (i)
          for (let s in i) (e && e[s] == i[s]) || t.setAttribute((n = s), i[s]);
        return !!n;
      }
      ii.prototype.children =
        ri.prototype.children =
        ui.prototype.children =
          He;
      class yi {
        eq(t) {
          return !1;
        }
        updateDOM(t, e) {
          return !1;
        }
        compare(t) {
          return this == t || (this.constructor == t.constructor && this.eq(t));
        }
        get estimatedHeight() {
          return -1;
        }
        ignoreEvent(t) {
          return !0;
        }
        coordsAt(t, e, i) {
          return null;
        }
        get customView() {
          return null;
        }
        get isHidden() {
          return !1;
        }
        destroy(t) {}
      }
      var bi = (function (t) {
        return (
          (t[(t['Text'] = 0)] = 'Text'),
          (t[(t['WidgetBefore'] = 1)] = 'WidgetBefore'),
          (t[(t['WidgetAfter'] = 2)] = 'WidgetAfter'),
          (t[(t['WidgetRange'] = 3)] = 'WidgetRange'),
          t
        );
      })(bi || (bi = {}));
      class xi extends Lt {
        constructor(t, e, i, n) {
          super(),
            (this.startSide = t),
            (this.endSide = e),
            (this.widget = i),
            (this.spec = n);
        }
        get heightRelevant() {
          return !1;
        }
        static mark(t) {
          return new ki(t);
        }
        static widget(t) {
          let e = t.side || 0,
            i = !!t.block;
          return (
            (e += i ? (e > 0 ? 3e8 : -4e8) : e > 0 ? 1e8 : -1e8),
            new Ci(t, e, e, i, t.widget || null, !1)
          );
        }
        static replace(t) {
          let e,
            i,
            n = !!t.block;
          if (t.isBlockGap) (e = -5e8), (i = 4e8);
          else {
            let { start: s, end: r } = Mi(t, n);
            (e = (s ? (n ? -3e8 : -1) : 5e8) - 1),
              (i = 1 + (r ? (n ? 2e8 : 1) : -6e8));
          }
          return new Ci(t, e, i, n, t.widget || null, !0);
        }
        static line(t) {
          return new Si(t);
        }
        static set(t, e = !1) {
          return Ht.of(t, e);
        }
        hasHeight() {
          return !!this.widget && this.widget.estimatedHeight > -1;
        }
      }
      xi.none = Ht.empty;
      class ki extends xi {
        constructor(t) {
          let { start: e, end: i } = Mi(t);
          super(e ? -1 : 5e8, i ? 1 : -6e8, null, t),
            (this.tagName = t.tagName || 'span'),
            (this.class = t.class || ''),
            (this.attrs = t.attributes || null);
        }
        eq(t) {
          return (
            this == t ||
            (t instanceof ki &&
              this.tagName == t.tagName &&
              this.class == t.class &&
              vi(this.attrs, t.attrs))
          );
        }
        range(t, e = t) {
          if (t >= e) throw new RangeError('Mark decorations may not be empty');
          return super.range(t, e);
        }
      }
      ki.prototype.point = !1;
      class Si extends xi {
        constructor(t) {
          super(-2e8, -2e8, null, t);
        }
        eq(t) {
          return (
            t instanceof Si &&
            this.spec.class == t.spec.class &&
            vi(this.spec.attributes, t.spec.attributes)
          );
        }
        range(t, e = t) {
          if (e != t)
            throw new RangeError('Line decoration ranges must be zero-length');
          return super.range(t, e);
        }
      }
      (Si.prototype.mapMode = T.TrackBefore), (Si.prototype.point = !0);
      class Ci extends xi {
        constructor(t, e, i, n, s, r) {
          super(e, i, s, t),
            (this.block = n),
            (this.isReplace = r),
            (this.mapMode = n
              ? e <= 0
                ? T.TrackBefore
                : T.TrackAfter
              : T.TrackDel);
        }
        get type() {
          return this.startSide < this.endSide
            ? bi.WidgetRange
            : this.startSide <= 0
            ? bi.WidgetBefore
            : bi.WidgetAfter;
        }
        get heightRelevant() {
          return (
            this.block || (!!this.widget && this.widget.estimatedHeight >= 5)
          );
        }
        eq(t) {
          return (
            t instanceof Ci &&
            Ai(this.widget, t.widget) &&
            this.block == t.block &&
            this.startSide == t.startSide &&
            this.endSide == t.endSide
          );
        }
        range(t, e = t) {
          if (
            this.isReplace &&
            (t > e || (t == e && this.startSide > 0 && this.endSide <= 0))
          )
            throw new RangeError('Invalid range for replacement decoration');
          if (!this.isReplace && e != t)
            throw new RangeError(
              'Widget decorations can only have zero-length ranges',
            );
          return super.range(t, e);
        }
      }
      function Mi(t, e = !1) {
        let { inclusiveStart: i, inclusiveEnd: n } = t;
        return (
          null == i && (i = t.inclusive),
          null == n && (n = t.inclusive),
          {
            start: null !== i && void 0 !== i ? i : e,
            end: null !== n && void 0 !== n ? n : e,
          }
        );
      }
      function Ai(t, e) {
        return t == e || !!(t && e && t.compare(e));
      }
      function Oi(t, e, i, n = 0) {
        let s = i.length - 1;
        s >= 0 && i[s] + n >= t ? (i[s] = Math.max(i[s], e)) : i.push(t, e);
      }
      Ci.prototype.point = !0;
      class Di extends We {
        constructor() {
          super(...arguments),
            (this.children = []),
            (this.length = 0),
            (this.prevAttrs = void 0),
            (this.attrs = null),
            (this.breakAfter = 0);
        }
        merge(t, e, i, n, s, r) {
          if (i) {
            if (!(i instanceof Di)) return !1;
            this.dom || i.transferDOM(this);
          }
          return (
            n && this.setDeco(i ? i.attrs : null),
            qe(this, t, e, i ? i.children : [], s, r),
            !0
          );
        }
        split(t) {
          let e = new Di();
          if (((e.breakAfter = this.breakAfter), 0 == this.length)) return e;
          let { i: i, off: n } = this.childPos(t);
          n &&
            (e.append(this.children[i].split(n), 0),
            this.children[i].merge(n, this.children[i].length, null, !1, 0, 0),
            i++);
          for (let s = i; s < this.children.length; s++)
            e.append(this.children[s], 0);
          while (i > 0 && 0 == this.children[i - 1].length)
            this.children[--i].destroy();
          return (
            (this.children.length = i), this.markDirty(), (this.length = t), e
          );
        }
        transferDOM(t) {
          this.dom &&
            (this.markDirty(),
            t.setDOM(this.dom),
            (t.prevAttrs =
              void 0 === this.prevAttrs ? this.attrs : this.prevAttrs),
            (this.prevAttrs = void 0),
            (this.dom = null));
        }
        setDeco(t) {
          vi(this.attrs, t) ||
            (this.dom && ((this.prevAttrs = this.attrs), this.markDirty()),
            (this.attrs = t));
        }
        append(t, e) {
          fi(this, t, e);
        }
        addLineDeco(t) {
          let e = t.spec.attributes,
            i = t.spec.class;
          e && (this.attrs = gi(e, this.attrs || {})),
            i && (this.attrs = gi({ class: i }, this.attrs || {}));
        }
        domAtPos(t) {
          return di(this, t);
        }
        reuseDOM(t) {
          'DIV' == t.nodeName && (this.setDOM(t), (this.dirty |= 6));
        }
        sync(t, e) {
          var i;
          this.dom
            ? 4 & this.dirty &&
              (Ne(this.dom),
              (this.dom.className = 'cm-line'),
              (this.prevAttrs = this.attrs ? null : void 0))
            : (this.setDOM(document.createElement('div')),
              (this.dom.className = 'cm-line'),
              (this.prevAttrs = this.attrs ? null : void 0)),
            void 0 !== this.prevAttrs &&
              (wi(this.dom, this.prevAttrs, this.attrs),
              this.dom.classList.add('cm-line'),
              (this.prevAttrs = void 0)),
            super.sync(t, e);
          let n = this.dom.lastChild;
          while (n && We.get(n) instanceof ni) n = n.lastChild;
          if (
            !n ||
            !this.length ||
            ('BR' != n.nodeName &&
              0 ==
                (null === (i = We.get(n)) || void 0 === i
                  ? void 0
                  : i.isEditable) &&
              (!ti.ios || !this.children.some((t) => t instanceof ii)))
          ) {
            let t = document.createElement('BR');
            (t.cmIgnore = !0), this.dom.appendChild(t);
          }
        }
        measureTextSize() {
          if (0 == this.children.length || this.length > 20) return null;
          let t,
            e = 0;
          for (let i of this.children) {
            if (!(i instanceof ii) || /[^ -~]/.test(i.text)) return null;
            let n = we(i.dom);
            if (1 != n.length) return null;
            (e += n[0].width), (t = n[0].height);
          }
          return e
            ? {
                lineHeight: this.dom.getBoundingClientRect().height,
                charWidth: e / this.length,
                textHeight: t,
              }
            : null;
        }
        coordsAt(t, e) {
          let i = pi(this, t, e);
          if (!this.children.length && i && this.parent) {
            let { heightOracle: t } = this.parent.view.viewState,
              e = i.bottom - i.top;
            if (Math.abs(e - t.lineHeight) < 2 && t.textHeight < e) {
              let n = (e - t.textHeight) / 2;
              return {
                top: i.top + n,
                bottom: i.bottom - n,
                left: i.left,
                right: i.left,
              };
            }
          }
          return i;
        }
        become(t) {
          return !1;
        }
        get type() {
          return bi.Text;
        }
        static find(t, e) {
          for (let i = 0, n = 0; i < t.children.length; i++) {
            let s = t.children[i],
              r = n + s.length;
            if (r >= e) {
              if (s instanceof Di) return s;
              if (r > e) break;
            }
            n = r + s.breakAfter;
          }
          return null;
        }
      }
      class Ti extends We {
        constructor(t, e, i) {
          super(),
            (this.widget = t),
            (this.length = e),
            (this.type = i),
            (this.breakAfter = 0),
            (this.prevWidget = null);
        }
        merge(t, e, i, n, s, r) {
          return (
            !(
              i &&
              (!(i instanceof Ti && this.widget.compare(i.widget)) ||
                (t > 0 && s <= 0) ||
                (e < this.length && r <= 0))
            ) &&
            ((this.length = t + (i ? i.length : 0) + (this.length - e)), !0)
          );
        }
        domAtPos(t) {
          return 0 == t
            ? Ie.before(this.dom)
            : Ie.after(this.dom, t == this.length);
        }
        split(t) {
          let e = this.length - t;
          this.length = t;
          let i = new Ti(this.widget, e, this.type);
          return (i.breakAfter = this.breakAfter), i;
        }
        get children() {
          return He;
        }
        sync(t) {
          (this.dom && this.widget.updateDOM(this.dom, t)) ||
            (this.dom && this.prevWidget && this.prevWidget.destroy(this.dom),
            (this.prevWidget = null),
            this.setDOM(this.widget.toDOM(t)),
            (this.dom.contentEditable = 'false'));
        }
        get overrideDOMText() {
          return this.parent
            ? this.parent.view.state.doc.slice(this.posAtStart, this.posAtEnd)
            : o.empty;
        }
        domBoundsAround() {
          return null;
        }
        become(t) {
          return (
            t instanceof Ti &&
            t.type == this.type &&
            t.widget.constructor == this.widget.constructor &&
            (t.widget.compare(this.widget) || this.markDirty(!0),
            this.dom && !this.prevWidget && (this.prevWidget = this.widget),
            (this.widget = t.widget),
            (this.length = t.length),
            (this.breakAfter = t.breakAfter),
            !0)
          );
        }
        ignoreMutation() {
          return !0;
        }
        ignoreEvent(t) {
          return this.widget.ignoreEvent(t);
        }
        get isEditable() {
          return !1;
        }
        get isWidget() {
          return !0;
        }
        coordsAt(t, e) {
          return this.widget.coordsAt(this.dom, t, e);
        }
        destroy() {
          super.destroy(), this.dom && this.widget.destroy(this.dom);
        }
      }
      class Ei {
        constructor(t, e, i, n) {
          (this.doc = t),
            (this.pos = e),
            (this.end = i),
            (this.disallowBlockEffectsFor = n),
            (this.content = []),
            (this.curLine = null),
            (this.breakAtStart = 0),
            (this.pendingBuffer = 0),
            (this.bufferMarks = []),
            (this.atCursorPos = !0),
            (this.openStart = -1),
            (this.openEnd = -1),
            (this.text = ''),
            (this.textOff = 0),
            (this.cursor = t.iter()),
            (this.skip = e);
        }
        posCovered() {
          if (0 == this.content.length)
            return (
              !this.breakAtStart && this.doc.lineAt(this.pos).from != this.pos
            );
          let t = this.content[this.content.length - 1];
          return (
            !t.breakAfter && !(t instanceof Ti && t.type == bi.WidgetBefore)
          );
        }
        getLine() {
          return (
            this.curLine ||
              (this.content.push((this.curLine = new Di())),
              (this.atCursorPos = !0)),
            this.curLine
          );
        }
        flushBuffer(t = this.bufferMarks) {
          this.pendingBuffer &&
            (this.curLine.append(Ri(new ui(-1), t), t.length),
            (this.pendingBuffer = 0));
        }
        addBlockWidget(t) {
          this.flushBuffer(), (this.curLine = null), this.content.push(t);
        }
        finish(t) {
          this.pendingBuffer && t <= this.bufferMarks.length
            ? this.flushBuffer()
            : (this.pendingBuffer = 0),
            this.posCovered() || this.getLine();
        }
        buildText(t, e, i) {
          while (t > 0) {
            if (this.textOff == this.text.length) {
              let {
                value: e,
                lineBreak: i,
                done: n,
              } = this.cursor.next(this.skip);
              if (((this.skip = 0), n))
                throw new Error(
                  'Ran out of text content when drawing inline views',
                );
              if (i) {
                this.posCovered() || this.getLine(),
                  this.content.length
                    ? (this.content[this.content.length - 1].breakAfter = 1)
                    : (this.breakAtStart = 1),
                  this.flushBuffer(),
                  (this.curLine = null),
                  (this.atCursorPos = !0),
                  t--;
                continue;
              }
              (this.text = e), (this.textOff = 0);
            }
            let n = Math.min(this.text.length - this.textOff, t, 512);
            this.flushBuffer(e.slice(e.length - i)),
              this.getLine().append(
                Ri(new ii(this.text.slice(this.textOff, this.textOff + n)), e),
                i,
              ),
              (this.atCursorPos = !0),
              (this.textOff += n),
              (t -= n),
              (i = 0);
          }
        }
        span(t, e, i, n) {
          this.buildText(e - t, i, n),
            (this.pos = e),
            this.openStart < 0 && (this.openStart = n);
        }
        point(t, e, i, n, s, r) {
          if (this.disallowBlockEffectsFor[r] && i instanceof Ci) {
            if (i.block)
              throw new RangeError(
                'Block decorations may not be specified via plugins',
              );
            if (e > this.doc.lineAt(this.pos).to)
              throw new RangeError(
                'Decorations that replace line breaks may not be specified via plugins',
              );
          }
          let o = e - t;
          if (i instanceof Ci)
            if (i.block) {
              let { type: t } = i;
              t != bi.WidgetAfter || this.posCovered() || this.getLine(),
                this.addBlockWidget(new Ti(i.widget || new Bi('div'), o, t));
            } else {
              let r = ri.create(
                  i.widget || new Bi('span'),
                  o,
                  o ? 0 : i.startSide,
                ),
                l =
                  this.atCursorPos &&
                  !r.isEditable &&
                  s <= n.length &&
                  (t < e || i.startSide > 0),
                a =
                  !r.isEditable && (t < e || s > n.length || i.startSide <= 0),
                h = this.getLine();
              2 != this.pendingBuffer ||
                l ||
                r.isEditable ||
                (this.pendingBuffer = 0),
                this.flushBuffer(n),
                l &&
                  (h.append(Ri(new ui(1), n), s),
                  (s = n.length + Math.max(0, s - n.length))),
                h.append(Ri(r, n), s),
                (this.atCursorPos = a),
                (this.pendingBuffer = a ? (t < e || s > n.length ? 1 : 2) : 0),
                this.pendingBuffer && (this.bufferMarks = n.slice());
            }
          else
            this.doc.lineAt(this.pos).from == this.pos &&
              this.getLine().addLineDeco(i);
          o &&
            (this.textOff + o <= this.text.length
              ? (this.textOff += o)
              : ((this.skip += o - (this.text.length - this.textOff)),
                (this.text = ''),
                (this.textOff = 0)),
            (this.pos = e)),
            this.openStart < 0 && (this.openStart = s);
        }
        static build(t, e, i, n, s) {
          let r = new Ei(t, e, i, s);
          return (
            (r.openEnd = Ht.spans(n, e, i, r)),
            r.openStart < 0 && (r.openStart = r.openEnd),
            r.finish(r.openEnd),
            r
          );
        }
      }
      function Ri(t, e) {
        for (let i of e) t = new ni(i, [t], t.length);
        return t;
      }
      class Bi extends yi {
        constructor(t) {
          super(), (this.tag = t);
        }
        eq(t) {
          return t.tag == this.tag;
        }
        toDOM() {
          return document.createElement(this.tag);
        }
        updateDOM(t) {
          return t.nodeName.toLowerCase() == this.tag;
        }
        get isHidden() {
          return !0;
        }
      }
      const Li = q.define(),
        Ni = q.define(),
        Pi = q.define(),
        Ii = q.define(),
        Hi = q.define(),
        Wi = q.define(),
        Vi = q.define(),
        zi = q.define({ combine: (t) => t.some((t) => t) }),
        Fi = q.define({ combine: (t) => t.some((t) => t) });
      class qi {
        constructor(t, e = 'nearest', i = 'nearest', n = 5, s = 5) {
          (this.range = t),
            (this.y = e),
            (this.x = i),
            (this.yMargin = n),
            (this.xMargin = s);
        }
        map(t) {
          return t.empty
            ? this
            : new qi(
                this.range.map(t),
                this.y,
                this.x,
                this.yMargin,
                this.xMargin,
              );
        }
      }
      const ji = gt.define({ map: (t, e) => t.map(e) });
      function _i(t, e, i) {
        let n = t.facet(Ii);
        n.length
          ? n[0](e)
          : window.onerror
          ? window.onerror(String(e), i, void 0, void 0, e)
          : i
          ? console.error(i + ':', e)
          : console.error(e);
      }
      const Ki = q.define({ combine: (t) => !t.length || t[0] });
      let $i = 0;
      const Ui = q.define();
      class Gi {
        constructor(t, e, i, n) {
          (this.id = t),
            (this.create = e),
            (this.domEventHandlers = i),
            (this.extension = n(this));
        }
        static define(t, e) {
          const { eventHandlers: i, provide: n, decorations: s } = e || {};
          return new Gi($i++, t, i, (t) => {
            let e = [Ui.of(t)];
            return (
              s &&
                e.push(
                  Zi.of((e) => {
                    let i = e.plugin(t);
                    return i ? s(i) : xi.none;
                  }),
                ),
              n && e.push(n(t)),
              e
            );
          });
        }
        static fromClass(t, e) {
          return Gi.define((e) => new t(e), e);
        }
      }
      class Ji {
        constructor(t) {
          (this.spec = t), (this.mustUpdate = null), (this.value = null);
        }
        update(t) {
          if (this.value) {
            if (this.mustUpdate) {
              let t = this.mustUpdate;
              if (((this.mustUpdate = null), this.value.update))
                try {
                  this.value.update(t);
                } catch (e) {
                  if (
                    (_i(t.state, e, 'CodeMirror plugin crashed'),
                    this.value.destroy)
                  )
                    try {
                      this.value.destroy();
                    } catch (Mg) {}
                  this.deactivate();
                }
            }
          } else if (this.spec)
            try {
              this.value = this.spec.create(t);
            } catch (e) {
              _i(t.state, e, 'CodeMirror plugin crashed'), this.deactivate();
            }
          return this;
        }
        destroy(t) {
          var e;
          if (null === (e = this.value) || void 0 === e ? void 0 : e.destroy)
            try {
              this.value.destroy();
            } catch (i) {
              _i(t.state, i, 'CodeMirror plugin crashed');
            }
        }
        deactivate() {
          this.spec = this.value = null;
        }
      }
      const Yi = q.define(),
        Xi = q.define(),
        Zi = q.define(),
        Qi = q.define(),
        tn = q.define(),
        en = q.define();
      class nn {
        constructor(t, e, i, n) {
          (this.fromA = t), (this.toA = e), (this.fromB = i), (this.toB = n);
        }
        join(t) {
          return new nn(
            Math.min(this.fromA, t.fromA),
            Math.max(this.toA, t.toA),
            Math.min(this.fromB, t.fromB),
            Math.max(this.toB, t.toB),
          );
        }
        addToSet(t) {
          let e = t.length,
            i = this;
          for (; e > 0; e--) {
            let n = t[e - 1];
            if (!(n.fromA > i.toA)) {
              if (n.toA < i.fromA) break;
              (i = i.join(n)), t.splice(e - 1, 1);
            }
          }
          return t.splice(e, 0, i), t;
        }
        static extendWithRanges(t, e) {
          if (0 == e.length) return t;
          let i = [];
          for (let n = 0, s = 0, r = 0, o = 0; ; n++) {
            let l = n == t.length ? null : t[n],
              a = r - o,
              h = l ? l.fromB : 1e9;
            while (s < e.length && e[s] < h) {
              let t = e[s],
                n = e[s + 1],
                r = Math.max(o, t),
                l = Math.min(h, n);
              if ((r <= l && new nn(r + a, l + a, r, l).addToSet(i), n > h))
                break;
              s += 2;
            }
            if (!l) return i;
            new nn(l.fromA, l.toA, l.fromB, l.toB).addToSet(i),
              (r = l.toA),
              (o = l.toB);
          }
        }
      }
      class sn {
        constructor(t, e, i) {
          (this.view = t),
            (this.state = e),
            (this.transactions = i),
            (this.flags = 0),
            (this.startState = t.state),
            (this.changes = R.empty(this.startState.doc.length));
          for (let s of i) this.changes = this.changes.compose(s.changes);
          let n = [];
          this.changes.iterChangedRanges((t, e, i, s) =>
            n.push(new nn(t, e, i, s)),
          ),
            (this.changedRanges = n);
        }
        static create(t, e, i) {
          return new sn(t, e, i);
        }
        get viewportChanged() {
          return (4 & this.flags) > 0;
        }
        get heightChanged() {
          return (2 & this.flags) > 0;
        }
        get geometryChanged() {
          return this.docChanged || (10 & this.flags) > 0;
        }
        get focusChanged() {
          return (1 & this.flags) > 0;
        }
        get docChanged() {
          return !this.changes.empty;
        }
        get selectionSet() {
          return this.transactions.some((t) => t.selection);
        }
        get empty() {
          return 0 == this.flags && 0 == this.transactions.length;
        }
      }
      var rn = (function (t) {
        return (t[(t['LTR'] = 0)] = 'LTR'), (t[(t['RTL'] = 1)] = 'RTL'), t;
      })(rn || (rn = {}));
      const on = rn.LTR,
        ln = rn.RTL;
      function an(t) {
        let e = [];
        for (let i = 0; i < t.length; i++) e.push(1 << +t[i]);
        return e;
      }
      const hn = an(
          '88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008',
        ),
        cn = an(
          '4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333',
        ),
        un = Object.create(null),
        dn = [];
      for (let Ag of ['()', '[]', '{}']) {
        let t = Ag.charCodeAt(0),
          e = Ag.charCodeAt(1);
        (un[t] = e), (un[e] = -t);
      }
      function fn(t) {
        return t <= 247
          ? hn[t]
          : 1424 <= t && t <= 1524
          ? 2
          : 1536 <= t && t <= 1785
          ? cn[t - 1536]
          : 1774 <= t && t <= 2220
          ? 4
          : 8192 <= t && t <= 8203
          ? 256
          : 64336 <= t && t <= 65023
          ? 4
          : 8204 == t
          ? 256
          : 1;
      }
      const pn = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
      class mn {
        constructor(t, e, i) {
          (this.from = t), (this.to = e), (this.level = i);
        }
        get dir() {
          return this.level % 2 ? ln : on;
        }
        side(t, e) {
          return (this.dir == e) == t ? this.to : this.from;
        }
        static find(t, e, i, n) {
          let s = -1;
          for (let r = 0; r < t.length; r++) {
            let o = t[r];
            if (o.from <= e && o.to >= e) {
              if (o.level == i) return r;
              (s < 0 ||
                (0 != n
                  ? n < 0
                    ? o.from < e
                    : o.to > e
                  : t[s].level > o.level)) &&
                (s = r);
            }
          }
          if (s < 0) throw new RangeError('Index out of range');
          return s;
        }
      }
      const gn = [];
      function vn(t, e) {
        let i = t.length,
          n = e == on ? 1 : 2,
          s = e == on ? 2 : 1;
        if (!t || (1 == n && !pn.test(t))) return wn(i);
        for (let o = 0, l = n, a = n; o < i; o++) {
          let e = fn(t.charCodeAt(o));
          512 == e ? (e = l) : 8 == e && 4 == a && (e = 16),
            (gn[o] = 4 == e ? 2 : e),
            7 & e && (a = e),
            (l = e);
        }
        for (let o = 0, l = n, a = n; o < i; o++) {
          let t = gn[o];
          if (128 == t)
            o < i - 1 && l == gn[o + 1] && 24 & l
              ? (t = gn[o] = l)
              : (gn[o] = 256);
          else if (64 == t) {
            let t = o + 1;
            while (t < i && 64 == gn[t]) t++;
            let e =
              (o && 8 == l) || (t < i && 8 == gn[t]) ? (1 == a ? 1 : 8) : 256;
            for (let i = o; i < t; i++) gn[i] = e;
            o = t - 1;
          } else 8 == t && 1 == a && (gn[o] = 1);
          (l = t), 7 & t && (a = t);
        }
        for (let o, l, a, h = 0, c = 0, u = 0; h < i; h++)
          if ((l = un[(o = t.charCodeAt(h))]))
            if (l < 0) {
              for (let t = c - 3; t >= 0; t -= 3)
                if (dn[t + 1] == -l) {
                  let e = dn[t + 2],
                    i = 2 & e ? n : 4 & e ? (1 & e ? s : n) : 0;
                  i && (gn[h] = gn[dn[t]] = i), (c = t);
                  break;
                }
            } else {
              if (189 == dn.length) break;
              (dn[c++] = h), (dn[c++] = o), (dn[c++] = u);
            }
          else if (2 == (a = gn[h]) || 1 == a) {
            let t = a == n;
            u = t ? 0 : 1;
            for (let e = c - 3; e >= 0; e -= 3) {
              let i = dn[e + 2];
              if (2 & i) break;
              if (t) dn[e + 2] |= 2;
              else {
                if (4 & i) break;
                dn[e + 2] |= 4;
              }
            }
          }
        for (let o = 0; o < i; o++)
          if (256 == gn[o]) {
            let t = o + 1;
            while (t < i && 256 == gn[t]) t++;
            let e = 1 == (o ? gn[o - 1] : n),
              s = 1 == (t < i ? gn[t] : n),
              r = e == s ? (e ? 1 : 2) : n;
            for (let i = o; i < t; i++) gn[i] = r;
            o = t - 1;
          }
        let r = [];
        if (1 == n)
          for (let o = 0; o < i; ) {
            let t = o,
              e = 1 != gn[o++];
            while (o < i && e == (1 != gn[o])) o++;
            if (e)
              for (let i = o; i > t; ) {
                let e = i,
                  n = 2 != gn[--i];
                while (i > t && n == (2 != gn[i - 1])) i--;
                r.push(new mn(i, e, n ? 2 : 1));
              }
            else r.push(new mn(t, o, 0));
          }
        else
          for (let o = 0; o < i; ) {
            let t = o,
              e = 2 == gn[o++];
            while (o < i && e == (2 == gn[o])) o++;
            r.push(new mn(t, o, e ? 1 : 2));
          }
        return r;
      }
      function wn(t) {
        return [new mn(0, t, 0)];
      }
      let yn = '';
      function bn(t, e, i, n, s) {
        var r;
        let o = n.head - t.from,
          l = -1;
        if (0 == o) {
          if (!s || !t.length) return null;
          e[0].level != i && ((o = e[0].side(!1, i)), (l = 0));
        } else if (o == t.length) {
          if (s) return null;
          let t = e[e.length - 1];
          t.level != i && ((o = t.side(!0, i)), (l = e.length - 1));
        }
        l < 0 &&
          (l = mn.find(
            e,
            o,
            null !== (r = n.bidiLevel) && void 0 !== r ? r : -1,
            n.assoc,
          ));
        let a = e[l];
        o == a.side(s, i) && ((a = e[(l += s ? 1 : -1)]), (o = a.side(!s, i)));
        let h = s == (a.dir == i),
          c = b(t.text, o, h);
        if (
          ((yn = t.text.slice(Math.min(o, c), Math.max(o, c))),
          c != a.side(s, i))
        )
          return V.cursor(c + t.from, h ? -1 : 1, a.level);
        let u = l == (s ? e.length - 1 : 0) ? null : e[l + (s ? 1 : -1)];
        return u || a.level == i
          ? u && u.level < a.level
            ? V.cursor(u.side(!s, i) + t.from, s ? 1 : -1, u.level)
            : V.cursor(c + t.from, s ? -1 : 1, a.level)
          : V.cursor(s ? t.to : t.from, s ? -1 : 1, i);
      }
      const xn = '\uffff';
      class kn {
        constructor(t, e) {
          (this.points = t),
            (this.text = ''),
            (this.lineSeparator = e.facet(Rt.lineSeparator));
        }
        append(t) {
          this.text += t;
        }
        lineBreak() {
          this.text += xn;
        }
        readRange(t, e) {
          if (!t) return this;
          let i = t.parentNode;
          for (let n = t; ; ) {
            this.findPointBefore(i, n), this.readNode(n);
            let t = n.nextSibling;
            if (t == e) break;
            let s = We.get(n),
              r = We.get(t);
            (s && r
              ? s.breakAfter
              : (s ? s.breakAfter : Sn(n)) ||
                (Sn(t) && ('BR' != n.nodeName || n.cmIgnore))) &&
              this.lineBreak(),
              (n = t);
          }
          return this.findPointBefore(i, e), this;
        }
        readTextNode(t) {
          let e = t.nodeValue;
          for (let i of this.points)
            i.node == t &&
              (i.pos = this.text.length + Math.min(i.offset, e.length));
          for (let i = 0, n = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
            let s,
              r = -1,
              o = 1;
            if (
              (this.lineSeparator
                ? ((r = e.indexOf(this.lineSeparator, i)),
                  (o = this.lineSeparator.length))
                : (s = n.exec(e)) && ((r = s.index), (o = s[0].length)),
              this.append(e.slice(i, r < 0 ? e.length : r)),
              r < 0)
            )
              break;
            if ((this.lineBreak(), o > 1))
              for (let e of this.points)
                e.node == t && e.pos > this.text.length && (e.pos -= o - 1);
            i = r + o;
          }
        }
        readNode(t) {
          if (t.cmIgnore) return;
          let e = We.get(t),
            i = e && e.overrideDOMText;
          if (null != i) {
            this.findPointInside(t, i.length);
            for (let t = i.iter(); !t.next().done; )
              t.lineBreak ? this.lineBreak() : this.append(t.value);
          } else
            3 == t.nodeType
              ? this.readTextNode(t)
              : 'BR' == t.nodeName
              ? t.nextSibling && this.lineBreak()
              : 1 == t.nodeType && this.readRange(t.firstChild, null);
        }
        findPointBefore(t, e) {
          for (let i of this.points)
            i.node == t &&
              t.childNodes[i.offset] == e &&
              (i.pos = this.text.length);
        }
        findPointInside(t, e) {
          for (let i of this.points)
            (3 == t.nodeType ? i.node == t : t.contains(i.node)) &&
              (i.pos = this.text.length + Math.min(e, i.offset));
        }
      }
      function Sn(t) {
        return (
          1 == t.nodeType &&
          /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(t.nodeName)
        );
      }
      class Cn {
        constructor(t, e) {
          (this.node = t), (this.offset = e), (this.pos = -1);
        }
      }
      class Mn extends We {
        constructor(t) {
          super(),
            (this.view = t),
            (this.compositionDeco = xi.none),
            (this.decorations = []),
            (this.dynamicDecorationMap = []),
            (this.minWidth = 0),
            (this.minWidthFrom = 0),
            (this.minWidthTo = 0),
            (this.impreciseAnchor = null),
            (this.impreciseHead = null),
            (this.forceSelection = !1),
            (this.lastUpdate = Date.now()),
            this.setDOM(t.contentDOM),
            (this.children = [new Di()]),
            this.children[0].setParent(this),
            this.updateDeco(),
            this.updateInner([new nn(0, 0, 0, t.state.doc.length)], 0);
        }
        get length() {
          return this.view.state.doc.length;
        }
        update(t) {
          let e = t.changedRanges;
          this.minWidth > 0 &&
            e.length &&
            (e.every(
              ({ fromA: t, toA: e }) =>
                e < this.minWidthFrom || t > this.minWidthTo,
            )
              ? ((this.minWidthFrom = t.changes.mapPos(this.minWidthFrom, 1)),
                (this.minWidthTo = t.changes.mapPos(this.minWidthTo, 1)))
              : (this.minWidth = this.minWidthFrom = this.minWidthTo = 0)),
            this.view.inputState.composing < 0
              ? (this.compositionDeco = xi.none)
              : (t.transactions.length || this.dirty) &&
                (this.compositionDeco = Tn(this.view, t.changes)),
            (ti.ie || ti.chrome) &&
              !this.compositionDeco.size &&
              t &&
              t.state.doc.lines != t.startState.doc.lines &&
              (this.forceSelection = !0);
          let i = this.decorations,
            n = this.updateDeco(),
            s = Nn(i, n, t.changes);
          return (
            (e = nn.extendWithRanges(e, s)),
            (0 != this.dirty || 0 != e.length) &&
              (this.updateInner(e, t.startState.doc.length),
              t.transactions.length && (this.lastUpdate = Date.now()),
              !0)
          );
        }
        updateInner(t, e) {
          (this.view.viewState.mustMeasureContent = !0),
            this.updateChildren(t, e);
          let { observer: i } = this.view;
          i.ignore(() => {
            (this.dom.style.height = this.view.viewState.contentHeight + 'px'),
              (this.dom.style.flexBasis = this.minWidth
                ? this.minWidth + 'px'
                : '');
            let t =
              ti.chrome || ti.ios
                ? { node: i.selectionRange.focusNode, written: !1 }
                : void 0;
            this.sync(this.view, t),
              (this.dirty = 0),
              t &&
                (t.written || i.selectionRange.focusNode != t.node) &&
                (this.forceSelection = !0),
              (this.dom.style.height = '');
          });
          let n = [];
          if (
            this.view.viewport.from ||
            this.view.viewport.to < this.view.state.doc.length
          )
            for (let s of this.children)
              s instanceof Ti && s.widget instanceof On && n.push(s.dom);
          i.updateGaps(n);
        }
        updateChildren(t, e) {
          let i = this.childCursor(e);
          for (let n = t.length - 1; ; n--) {
            let e = n >= 0 ? t[n] : null;
            if (!e) break;
            let { fromA: s, toA: r, fromB: o, toB: l } = e,
              {
                content: a,
                breakAtStart: h,
                openStart: c,
                openEnd: u,
              } = Ei.build(
                this.view.state.doc,
                o,
                l,
                this.decorations,
                this.dynamicDecorationMap,
              ),
              { i: d, off: f } = i.findPos(r, 1),
              { i: p, off: m } = i.findPos(s, -1);
            Fe(this, p, m, d, f, a, h, c, u);
          }
        }
        updateSelection(t = !1, e = !1) {
          (!t && this.view.observer.selectionRange.focusNode) ||
            this.view.observer.readSelectionRange();
          let i = this.view.root.activeElement,
            n = i == this.dom,
            s =
              !n &&
              ve(this.dom, this.view.observer.selectionRange) &&
              !(i && this.dom.contains(i));
          if (!(n || e || s)) return;
          let r = this.forceSelection;
          this.forceSelection = !1;
          let o = this.view.state.selection.main,
            l = this.domAtPos(o.anchor),
            a = o.empty ? l : this.domAtPos(o.head);
          if (ti.gecko && o.empty && !this.compositionDeco.size && An(l)) {
            let t = document.createTextNode('');
            this.view.observer.ignore(() =>
              l.node.insertBefore(t, l.node.childNodes[l.offset] || null),
            ),
              (l = a = new Ie(t, 0)),
              (r = !0);
          }
          let h = this.view.observer.selectionRange;
          (!r &&
            h.focusNode &&
            ye(l.node, l.offset, h.anchorNode, h.anchorOffset) &&
            ye(a.node, a.offset, h.focusNode, h.focusOffset)) ||
            (this.view.observer.ignore(() => {
              ti.android &&
                ti.chrome &&
                this.dom.contains(h.focusNode) &&
                Pn(h.focusNode, this.dom) &&
                (this.dom.blur(), this.dom.focus({ preventScroll: !0 }));
              let t = pe(this.view.root);
              if (t)
                if (o.empty) {
                  if (ti.gecko) {
                    let t = Bn(l.node, l.offset);
                    if (t && 3 != t) {
                      let e = Rn(l.node, l.offset, 1 == t ? 1 : -1);
                      e && (l = new Ie(e, 1 == t ? 0 : e.nodeValue.length));
                    }
                  }
                  t.collapse(l.node, l.offset),
                    null != o.bidiLevel &&
                      null != h.cursorBidiLevel &&
                      (h.cursorBidiLevel = o.bidiLevel);
                } else if (t.extend) {
                  t.collapse(l.node, l.offset);
                  try {
                    t.extend(a.node, a.offset);
                  } catch (Mg) {}
                } else {
                  let e = document.createRange();
                  o.anchor > o.head && ([l, a] = [a, l]),
                    e.setEnd(a.node, a.offset),
                    e.setStart(l.node, l.offset),
                    t.removeAllRanges(),
                    t.addRange(e);
                }
              else;
              s &&
                this.view.root.activeElement == this.dom &&
                (this.dom.blur(), i && i.focus());
            }),
            this.view.observer.setSelectionRange(l, a)),
            (this.impreciseAnchor = l.precise
              ? null
              : new Ie(h.anchorNode, h.anchorOffset)),
            (this.impreciseHead = a.precise
              ? null
              : new Ie(h.focusNode, h.focusOffset));
        }
        enforceCursorAssoc() {
          if (this.compositionDeco.size) return;
          let { view: t } = this,
            e = t.state.selection.main,
            i = pe(t.root),
            { anchorNode: n, anchorOffset: s } = t.observer.selectionRange;
          if (!i || !e.empty || !e.assoc || !i.modify) return;
          let r = Di.find(this, e.head);
          if (!r) return;
          let o = r.posAtStart;
          if (e.head == o || e.head == o + r.length) return;
          let l = this.coordsAt(e.head, -1),
            a = this.coordsAt(e.head, 1);
          if (!l || !a || l.bottom > a.top) return;
          let h = this.domAtPos(e.head + e.assoc);
          i.collapse(h.node, h.offset),
            i.modify(
              'move',
              e.assoc < 0 ? 'forward' : 'backward',
              'lineboundary',
            ),
            t.observer.readSelectionRange();
          let c = t.observer.selectionRange;
          t.docView.posFromDOM(c.anchorNode, c.anchorOffset) != e.from &&
            i.collapse(n, s);
        }
        nearest(t) {
          for (let e = t; e; ) {
            let t = We.get(e);
            if (t && t.rootView == this) return t;
            e = e.parentNode;
          }
          return null;
        }
        posFromDOM(t, e) {
          let i = this.nearest(t);
          if (!i)
            throw new RangeError(
              'Trying to find position for a DOM position outside of the document',
            );
          return i.localPosFromDOM(t, e) + i.posAtStart;
        }
        domAtPos(t) {
          let { i: e, off: i } = this.childCursor().findPos(t, -1);
          for (; e < this.children.length - 1; ) {
            let t = this.children[e];
            if (i < t.length || t instanceof Di) break;
            e++, (i = 0);
          }
          return this.children[e].domAtPos(i);
        }
        coordsAt(t, e) {
          for (let i = this.length, n = this.children.length - 1; ; n--) {
            let s = this.children[n],
              r = i - s.breakAfter - s.length;
            if (
              t > r ||
              (t == r &&
                s.type != bi.WidgetBefore &&
                s.type != bi.WidgetAfter &&
                (!n ||
                  2 == e ||
                  this.children[n - 1].breakAfter ||
                  (this.children[n - 1].type == bi.WidgetBefore && e > -2)))
            )
              return s.coordsAt(t - r, e);
            i = r;
          }
        }
        measureVisibleLineHeights(t) {
          let e = [],
            { from: i, to: n } = t,
            s = this.view.contentDOM.clientWidth,
            r =
              s > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1,
            o = -1,
            l = this.view.textDirection == rn.LTR;
          for (let a = 0, h = 0; h < this.children.length; h++) {
            let t = this.children[h],
              c = a + t.length;
            if (c > n) break;
            if (a >= i) {
              let i = t.dom.getBoundingClientRect();
              if ((e.push(i.height), r)) {
                let e = t.dom.lastChild,
                  n = e ? we(e) : [];
                if (n.length) {
                  let t = n[n.length - 1],
                    e = l ? t.right - i.left : i.right - t.left;
                  e > o &&
                    ((o = e),
                    (this.minWidth = s),
                    (this.minWidthFrom = a),
                    (this.minWidthTo = c));
                }
              }
            }
            a = c + t.breakAfter;
          }
          return e;
        }
        textDirectionAt(t) {
          let { i: e } = this.childPos(t, 1);
          return 'rtl' == getComputedStyle(this.children[e].dom).direction
            ? rn.RTL
            : rn.LTR;
        }
        measureTextSize() {
          for (let s of this.children)
            if (s instanceof Di) {
              let t = s.measureTextSize();
              if (t) return t;
            }
          let t,
            e,
            i,
            n = document.createElement('div');
          return (
            (n.className = 'cm-line'),
            (n.style.width = '99999px'),
            (n.textContent = 'abc def ghi jkl mno pqr stu'),
            this.view.observer.ignore(() => {
              this.dom.appendChild(n);
              let s = we(n.firstChild)[0];
              (t = n.getBoundingClientRect().height),
                (e = s ? s.width / 27 : 7),
                (i = s ? s.height : t),
                n.remove();
            }),
            { lineHeight: t, charWidth: e, textHeight: i }
          );
        }
        childCursor(t = this.length) {
          let e = this.children.length;
          return (
            e && (t -= this.children[--e].length), new ze(this.children, t, e)
          );
        }
        computeBlockGapDeco() {
          let t = [],
            e = this.view.viewState;
          for (let i = 0, n = 0; ; n++) {
            let s = n == e.viewports.length ? null : e.viewports[n],
              r = s ? s.from - 1 : this.length;
            if (r > i) {
              let n = e.lineBlockAt(r).bottom - e.lineBlockAt(i).top;
              t.push(
                xi
                  .replace({
                    widget: new On(n),
                    block: !0,
                    inclusive: !0,
                    isBlockGap: !0,
                  })
                  .range(i, r),
              );
            }
            if (!s) break;
            i = s.to + 1;
          }
          return xi.set(t);
        }
        updateDeco() {
          let t = this.view.state.facet(Zi).map((t, e) => {
            let i = (this.dynamicDecorationMap[e] = 'function' == typeof t);
            return i ? t(this.view) : t;
          });
          for (let e = t.length; e < t.length + 3; e++)
            this.dynamicDecorationMap[e] = !1;
          return (this.decorations = [
            ...t,
            this.compositionDeco,
            this.computeBlockGapDeco(),
            this.view.viewState.lineGapDeco,
          ]);
        }
        scrollIntoView(t) {
          let e,
            { range: i } = t,
            n = this.coordsAt(
              i.head,
              i.empty ? i.assoc : i.head > i.anchor ? -1 : 1,
            );
          if (!n) return;
          !i.empty &&
            (e = this.coordsAt(i.anchor, i.anchor > i.head ? -1 : 1)) &&
            (n = {
              left: Math.min(n.left, e.left),
              top: Math.min(n.top, e.top),
              right: Math.max(n.right, e.right),
              bottom: Math.max(n.bottom, e.bottom),
            });
          let s = 0,
            r = 0,
            o = 0,
            l = 0;
          for (let h of this.view.state.facet(tn).map((t) => t(this.view)))
            if (h) {
              let { left: t, right: e, top: i, bottom: n } = h;
              null != t && (s = Math.max(s, t)),
                null != e && (r = Math.max(r, e)),
                null != i && (o = Math.max(o, i)),
                null != n && (l = Math.max(l, n));
            }
          let a = {
            left: n.left - s,
            top: n.top - o,
            right: n.right + r,
            bottom: n.bottom + l,
          };
          Me(
            this.view.scrollDOM,
            a,
            i.head < i.anchor ? -1 : 1,
            t.x,
            t.y,
            t.xMargin,
            t.yMargin,
            this.view.textDirection == rn.LTR,
          );
        }
      }
      function An(t) {
        return (
          1 == t.node.nodeType &&
          t.node.firstChild &&
          (0 == t.offset ||
            'false' == t.node.childNodes[t.offset - 1].contentEditable) &&
          (t.offset == t.node.childNodes.length ||
            'false' == t.node.childNodes[t.offset].contentEditable)
        );
      }
      class On extends yi {
        constructor(t) {
          super(), (this.height = t);
        }
        toDOM() {
          let t = document.createElement('div');
          return this.updateDOM(t), t;
        }
        eq(t) {
          return t.height == this.height;
        }
        updateDOM(t) {
          return (t.style.height = this.height + 'px'), !0;
        }
        get estimatedHeight() {
          return this.height;
        }
      }
      function Dn(t) {
        let e = t.observer.selectionRange,
          i = e.focusNode && Rn(e.focusNode, e.focusOffset, 0);
        if (!i) return null;
        let n = t.docView.nearest(i);
        if (!n) return null;
        if (n instanceof Di) {
          let t = i;
          while (t.parentNode != n.dom) t = t.parentNode;
          let e = t.previousSibling;
          while (e && !We.get(e)) e = e.previousSibling;
          let s = e ? We.get(e).posAtEnd : n.posAtStart;
          return { from: s, to: s, node: t, text: i };
        }
        {
          for (;;) {
            let { parent: t } = n;
            if (!t) return null;
            if (t instanceof Di) break;
            n = t;
          }
          let t = n.posAtStart;
          return { from: t, to: t + n.length, node: n.dom, text: i };
        }
      }
      function Tn(t, e) {
        let i = Dn(t);
        if (!i) return xi.none;
        let { from: n, to: s, node: r, text: o } = i,
          l = e.mapPos(n, 1),
          a = Math.max(l, e.mapPos(s, -1)),
          { state: h } = t,
          c =
            3 == r.nodeType
              ? r.nodeValue
              : new kn([], h).readRange(r.firstChild, null).text;
        if (a - l < c.length)
          if (
            h.doc.sliceString(l, Math.min(h.doc.length, l + c.length), xn) == c
          )
            a = l + c.length;
          else {
            if (h.doc.sliceString(Math.max(0, a - c.length), a, xn) != c)
              return xi.none;
            l = a - c.length;
          }
        else if (h.doc.sliceString(l, a, xn) != c) return xi.none;
        let u = We.get(r);
        return (
          u instanceof oi ? (u = u.widget.topView) : u && (u.parent = null),
          xi.set(
            xi.replace({ widget: new En(r, o, u), inclusive: !0 }).range(l, a),
          )
        );
      }
      class En extends yi {
        constructor(t, e, i) {
          super(), (this.top = t), (this.text = e), (this.topView = i);
        }
        eq(t) {
          return this.top == t.top && this.text == t.text;
        }
        toDOM() {
          return this.top;
        }
        ignoreEvent() {
          return !1;
        }
        get customView() {
          return oi;
        }
      }
      function Rn(t, e, i) {
        if (i <= 0)
          for (let n = t, s = e; ; ) {
            if (3 == n.nodeType) return n;
            if (!(1 == n.nodeType && s > 0)) break;
            (n = n.childNodes[s - 1]), (s = ke(n));
          }
        if (i >= 0)
          for (let n = t, s = e; ; ) {
            if (3 == n.nodeType) return n;
            if (!(1 == n.nodeType && s < n.childNodes.length && i >= 0)) break;
            (n = n.childNodes[s]), (s = 0);
          }
        return null;
      }
      function Bn(t, e) {
        return 1 != t.nodeType
          ? 0
          : (e && 'false' == t.childNodes[e - 1].contentEditable ? 1 : 0) |
              (e < t.childNodes.length &&
              'false' == t.childNodes[e].contentEditable
                ? 2
                : 0);
      }
      class Ln {
        constructor() {
          this.changes = [];
        }
        compareRange(t, e) {
          Oi(t, e, this.changes);
        }
        comparePoint(t, e) {
          Oi(t, e, this.changes);
        }
      }
      function Nn(t, e, i) {
        let n = new Ln();
        return Ht.compare(t, e, i, n), n.changes;
      }
      function Pn(t, e) {
        for (let i = t; i && i != e; i = i.assignedSlot || i.parentNode)
          if (1 == i.nodeType && 'false' == i.contentEditable) return !0;
        return !1;
      }
      function In(t, e, i = 1) {
        let n = t.charCategorizer(e),
          s = t.doc.lineAt(e),
          r = e - s.from;
        if (0 == s.length) return V.cursor(e);
        0 == r ? (i = 1) : r == s.length && (i = -1);
        let o = r,
          l = r;
        i < 0 ? (o = b(s.text, r, !1)) : (l = b(s.text, r));
        let a = n(s.text.slice(o, l));
        while (o > 0) {
          let t = b(s.text, o, !1);
          if (n(s.text.slice(t, o)) != a) break;
          o = t;
        }
        while (l < s.length) {
          let t = b(s.text, l);
          if (n(s.text.slice(l, t)) != a) break;
          l = t;
        }
        return V.range(o + s.from, l + s.from);
      }
      function Hn(t, e) {
        return e.left > t ? e.left - t : Math.max(0, t - e.right);
      }
      function Wn(t, e) {
        return e.top > t ? e.top - t : Math.max(0, t - e.bottom);
      }
      function Vn(t, e) {
        return t.top < e.bottom - 1 && t.bottom > e.top + 1;
      }
      function zn(t, e) {
        return e < t.top
          ? { top: e, left: t.left, right: t.right, bottom: t.bottom }
          : t;
      }
      function Fn(t, e) {
        return e > t.bottom
          ? { top: t.top, left: t.left, right: t.right, bottom: e }
          : t;
      }
      function qn(t, e, i) {
        let n,
          s,
          r,
          o,
          l,
          a,
          h,
          c,
          u = !1;
        for (let p = t.firstChild; p; p = p.nextSibling) {
          let t = we(p);
          for (let d = 0; d < t.length; d++) {
            let f = t[d];
            s && Vn(s, f) && (f = zn(Fn(f, s.bottom), s.top));
            let m = Hn(e, f),
              g = Wn(i, f);
            if (0 == m && 0 == g)
              return 3 == p.nodeType ? jn(p, e, i) : qn(p, e, i);
            if (!n || o > g || (o == g && r > m)) {
              (n = p), (s = f), (r = m), (o = g);
              let l = g ? (i < f.top ? -1 : 1) : m ? (e < f.left ? -1 : 1) : 0;
              u = !l || (l > 0 ? d < t.length - 1 : d > 0);
            }
            0 == m
              ? i > f.bottom && (!h || h.bottom < f.bottom)
                ? ((l = p), (h = f))
                : i < f.top && (!c || c.top > f.top) && ((a = p), (c = f))
              : h && Vn(h, f)
              ? (h = Fn(h, f.bottom))
              : c && Vn(c, f) && (c = zn(c, f.top));
          }
        }
        if (
          (h && h.bottom >= i
            ? ((n = l), (s = h))
            : c && c.top <= i && ((n = a), (s = c)),
          !n)
        )
          return { node: t, offset: 0 };
        let d = Math.max(s.left, Math.min(s.right, e));
        if (3 == n.nodeType) return jn(n, d, i);
        if (u && 'false' != n.contentEditable) return qn(n, d, i);
        let f =
          Array.prototype.indexOf.call(t.childNodes, n) +
          (e >= (s.left + s.right) / 2 ? 1 : 0);
        return { node: t, offset: f };
      }
      function jn(t, e, i) {
        let n = t.nodeValue.length,
          s = -1,
          r = 1e9,
          o = 0;
        for (let l = 0; l < n; l++) {
          let n = Re(t, l, l + 1).getClientRects();
          for (let a = 0; a < n.length; a++) {
            let h = n[a];
            if (h.top == h.bottom) continue;
            o || (o = e - h.left);
            let c = (h.top > i ? h.top - i : i - h.bottom) - 1;
            if (h.left - 1 <= e && h.right + 1 >= e && c < r) {
              let i = e >= (h.left + h.right) / 2,
                n = i;
              if (ti.chrome || ti.gecko) {
                let e = Re(t, l).getBoundingClientRect();
                e.left == h.right && (n = !i);
              }
              if (c <= 0) return { node: t, offset: l + (n ? 1 : 0) };
              (s = l + (n ? 1 : 0)), (r = c);
            }
          }
        }
        return { node: t, offset: s > -1 ? s : o > 0 ? t.nodeValue.length : 0 };
      }
      function _n(t, e, i, n = -1) {
        var s, r;
        let o,
          l = t.contentDOM.getBoundingClientRect(),
          a = l.top + t.viewState.paddingTop,
          { docHeight: h } = t.viewState,
          { x: c, y: u } = e,
          d = u - a;
        if (d < 0) return 0;
        if (d > h) return t.state.doc.length;
        for (let b = t.defaultLineHeight / 2, x = !1; ; ) {
          if (((o = t.elementAtHeight(d)), o.type == bi.Text)) break;
          for (;;) {
            if (((d = n > 0 ? o.bottom + b : o.top - b), d >= 0 && d <= h))
              break;
            if (x) return i ? null : 0;
            (x = !0), (n = -n);
          }
        }
        u = a + d;
        let f = o.from;
        if (f < t.viewport.from)
          return 0 == t.viewport.from ? 0 : i ? null : Kn(t, l, o, c, u);
        if (f > t.viewport.to)
          return t.viewport.to == t.state.doc.length
            ? t.state.doc.length
            : i
            ? null
            : Kn(t, l, o, c, u);
        let p = t.dom.ownerDocument,
          m = t.root.elementFromPoint ? t.root : p,
          g = m.elementFromPoint(c, u);
        g && !t.contentDOM.contains(g) && (g = null),
          g ||
            ((c = Math.max(l.left + 1, Math.min(l.right - 1, c))),
            (g = m.elementFromPoint(c, u)),
            g && !t.contentDOM.contains(g) && (g = null));
        let v,
          w = -1;
        if (
          g &&
          0 !=
            (null === (s = t.docView.nearest(g)) || void 0 === s
              ? void 0
              : s.isEditable)
        )
          if (p.caretPositionFromPoint) {
            let t = p.caretPositionFromPoint(c, u);
            t && ({ offsetNode: v, offset: w } = t);
          } else if (p.caretRangeFromPoint) {
            let e = p.caretRangeFromPoint(c, u);
            e &&
              (({ startContainer: v, startOffset: w } = e),
              (!t.contentDOM.contains(v) ||
                (ti.safari && $n(v, w, c)) ||
                (ti.chrome && Un(v, w, c))) &&
                (v = void 0));
          }
        if (!v || !t.docView.dom.contains(v)) {
          let e = Di.find(t.docView, f);
          if (!e) return d > o.top + o.height / 2 ? o.to : o.from;
          ({ node: v, offset: w } = qn(e.dom, c, u));
        }
        let y = t.docView.nearest(v);
        if (!y) return null;
        if (
          y.isWidget &&
          1 == (null === (r = y.dom) || void 0 === r ? void 0 : r.nodeType)
        ) {
          let t = y.dom.getBoundingClientRect();
          return e.y < t.top ||
            (e.y <= t.bottom && e.x <= (t.left + t.right) / 2)
            ? y.posAtStart
            : y.posAtEnd;
        }
        return y.localPosFromDOM(v, w) + y.posAtStart;
      }
      function Kn(t, e, i, n, s) {
        let r = Math.round((n - e.left) * t.defaultCharacterWidth);
        if (t.lineWrapping && i.height > 1.5 * t.defaultLineHeight) {
          let e = Math.floor((s - i.top) / t.defaultLineHeight);
          r += e * t.viewState.heightOracle.lineLength;
        }
        let o = t.state.sliceDoc(i.from, i.to);
        return i.from + Xt(o, r, t.state.tabSize);
      }
      function $n(t, e, i) {
        let n;
        if (3 != t.nodeType || e != (n = t.nodeValue.length)) return !1;
        for (let s = t.nextSibling; s; s = s.nextSibling)
          if (1 != s.nodeType || 'BR' != s.nodeName) return !1;
        return Re(t, n - 1, n).getBoundingClientRect().left > i;
      }
      function Un(t, e, i) {
        if (0 != e) return !1;
        for (let s = t; ; ) {
          let t = s.parentNode;
          if (!t || 1 != t.nodeType || t.firstChild != s) return !1;
          if (t.classList.contains('cm-line')) break;
          s = t;
        }
        let n =
          1 == t.nodeType
            ? t.getBoundingClientRect()
            : Re(t, 0, Math.max(t.nodeValue.length, 1)).getBoundingClientRect();
        return i - n.left > 5;
      }
      function Gn(t, e, i, n) {
        let s = t.state.doc.lineAt(e.head),
          r =
            n && t.lineWrapping
              ? t.coordsAtPos(
                  e.assoc < 0 && e.head > s.from ? e.head - 1 : e.head,
                )
              : null;
        if (r) {
          let e = t.dom.getBoundingClientRect(),
            n = t.textDirectionAt(s.from),
            o = t.posAtCoords({
              x: i == (n == rn.LTR) ? e.right - 1 : e.left + 1,
              y: (r.top + r.bottom) / 2,
            });
          if (null != o) return V.cursor(o, i ? -1 : 1);
        }
        let o = Di.find(t.docView, e.head),
          l = o ? (i ? o.posAtEnd : o.posAtStart) : i ? s.to : s.from;
        return V.cursor(l, i ? -1 : 1);
      }
      function Jn(t, e, i, n) {
        let s = t.state.doc.lineAt(e.head),
          r = t.bidiSpans(s),
          o = t.textDirectionAt(s.from);
        for (let l = e, a = null; ; ) {
          let e = bn(s, r, o, l, i),
            h = yn;
          if (!e) {
            if (s.number == (i ? t.state.doc.lines : 1)) return l;
            (h = '\n'),
              (s = t.state.doc.line(s.number + (i ? 1 : -1))),
              (r = t.bidiSpans(s)),
              (e = V.cursor(i ? s.from : s.to));
          }
          if (a) {
            if (!a(h)) return l;
          } else {
            if (!n) return e;
            a = n(h);
          }
          l = e;
        }
      }
      function Yn(t, e, i) {
        let n = t.state.charCategorizer(e),
          s = n(i);
        return (t) => {
          let e = n(t);
          return s == At.Space && (s = e), s == e;
        };
      }
      function Xn(t, e, i, n) {
        let s = e.head,
          r = i ? 1 : -1;
        if (s == (i ? t.state.doc.length : 0)) return V.cursor(s, e.assoc);
        let o,
          l = e.goalColumn,
          a = t.contentDOM.getBoundingClientRect(),
          h = t.coordsAtPos(s),
          c = t.documentTop;
        if (h)
          null == l && (l = h.left - a.left), (o = r < 0 ? h.top : h.bottom);
        else {
          let e = t.viewState.lineBlockAt(s);
          null == l &&
            (l = Math.min(
              a.right - a.left,
              t.defaultCharacterWidth * (s - e.from),
            )),
            (o = (r < 0 ? e.top : e.bottom) + c);
        }
        let u = a.left + l,
          d = null !== n && void 0 !== n ? n : t.defaultLineHeight >> 1;
        for (let f = 0; ; f += 10) {
          let i = o + (d + f) * r,
            n = _n(t, { x: u, y: i }, !1, r);
          if (i < a.top || i > a.bottom || (r < 0 ? n < s : n > s))
            return V.cursor(n, e.assoc, void 0, l);
        }
      }
      function Zn(t, e, i) {
        let n = t.state.facet(Qi).map((e) => e(t));
        for (;;) {
          let t = !1;
          for (let s of n)
            s.between(i.from - 1, i.from + 1, (n, s, r) => {
              i.from > n &&
                i.from < s &&
                ((i = e.head > i.from ? V.cursor(n, 1) : V.cursor(s, -1)),
                (t = !0));
            });
          if (!t) return i;
        }
      }
      class Qn {
        constructor(t) {
          (this.lastKeyCode = 0),
            (this.lastKeyTime = 0),
            (this.lastTouchTime = 0),
            (this.lastFocusTime = 0),
            (this.lastScrollTop = 0),
            (this.lastScrollLeft = 0),
            (this.chromeScrollHack = -1),
            (this.pendingIOSKey = void 0),
            (this.lastSelectionOrigin = null),
            (this.lastSelectionTime = 0),
            (this.lastEscPress = 0),
            (this.lastContextMenu = 0),
            (this.scrollHandlers = []),
            (this.registeredEvents = []),
            (this.customHandlers = []),
            (this.composing = -1),
            (this.compositionFirstChange = null),
            (this.compositionEndedAt = 0),
            (this.compositionPendingKey = !1),
            (this.compositionPendingChange = !1),
            (this.mouseSelection = null);
          let e = (e, i) => {
            this.ignoreDuringComposition(i) ||
              ('keydown' == i.type && this.keydown(t, i)) ||
              (this.mustFlushObserver(i) && t.observer.forceFlush(),
              this.runCustomHandlers(i.type, t, i)
                ? i.preventDefault()
                : e(t, i));
          };
          for (let i in cs) {
            let n = cs[i];
            t.contentDOM.addEventListener(
              i,
              (i) => {
                hs(t, i) && e(n, i);
              },
              us[i],
            ),
              this.registeredEvents.push(i);
          }
          t.scrollDOM.addEventListener('mousedown', (i) => {
            if (
              i.target == t.scrollDOM &&
              i.clientY > t.contentDOM.getBoundingClientRect().bottom &&
              (e(cs.mousedown, i), !i.defaultPrevented && 2 == i.button)
            ) {
              let e = t.contentDOM.style.minHeight;
              (t.contentDOM.style.minHeight = '100%'),
                setTimeout(() => (t.contentDOM.style.minHeight = e), 200);
            }
          }),
            t.scrollDOM.addEventListener('drop', (i) => {
              i.target == t.scrollDOM &&
                i.clientY > t.contentDOM.getBoundingClientRect().bottom &&
                e(cs.drop, i);
            }),
            ti.chrome &&
              102 == ti.chrome_version &&
              t.scrollDOM.addEventListener(
                'wheel',
                () => {
                  this.chromeScrollHack < 0
                    ? (t.contentDOM.style.pointerEvents = 'none')
                    : window.clearTimeout(this.chromeScrollHack),
                    (this.chromeScrollHack = setTimeout(() => {
                      (this.chromeScrollHack = -1),
                        (t.contentDOM.style.pointerEvents = '');
                    }, 100));
                },
                { passive: !0 },
              ),
            (this.notifiedFocused = t.hasFocus),
            ti.safari && t.contentDOM.addEventListener('input', () => null);
        }
        setSelectionOrigin(t) {
          (this.lastSelectionOrigin = t), (this.lastSelectionTime = Date.now());
        }
        ensureHandlers(t, e) {
          var i;
          let n;
          this.customHandlers = [];
          for (let s of e)
            if (
              (n =
                null === (i = s.update(t).spec) || void 0 === i
                  ? void 0
                  : i.domEventHandlers)
            ) {
              this.customHandlers.push({ plugin: s.value, handlers: n });
              for (let e in n)
                this.registeredEvents.indexOf(e) < 0 &&
                  'scroll' != e &&
                  (this.registeredEvents.push(e),
                  t.contentDOM.addEventListener(e, (i) => {
                    hs(t, i) &&
                      this.runCustomHandlers(e, t, i) &&
                      i.preventDefault();
                  }));
            }
        }
        runCustomHandlers(t, e, i) {
          for (let s of this.customHandlers) {
            let r = s.handlers[t];
            if (r)
              try {
                if (r.call(s.plugin, i, e) || i.defaultPrevented) return !0;
              } catch (n) {
                _i(e.state, n);
              }
          }
          return !1;
        }
        runScrollHandlers(t, e) {
          (this.lastScrollTop = t.scrollDOM.scrollTop),
            (this.lastScrollLeft = t.scrollDOM.scrollLeft);
          for (let n of this.customHandlers) {
            let s = n.handlers.scroll;
            if (s)
              try {
                s.call(n.plugin, e, t);
              } catch (i) {
                _i(t.state, i);
              }
          }
        }
        keydown(t, e) {
          if (
            ((this.lastKeyCode = e.keyCode),
            (this.lastKeyTime = Date.now()),
            9 == e.keyCode && Date.now() < this.lastEscPress + 2e3)
          )
            return !0;
          if (
            (27 != e.keyCode &&
              is.indexOf(e.keyCode) < 0 &&
              (t.inputState.lastEscPress = 0),
            ti.android &&
              ti.chrome &&
              !e.synthetic &&
              (13 == e.keyCode || 8 == e.keyCode))
          )
            return t.observer.delayAndroidKey(e.key, e.keyCode), !0;
          let i;
          return (
            !(
              !ti.ios ||
              e.synthetic ||
              e.altKey ||
              e.metaKey ||
              !(
                ((i = ts.find((t) => t.keyCode == e.keyCode)) && !e.ctrlKey) ||
                (es.indexOf(e.key) > -1 && e.ctrlKey && !e.shiftKey)
              )
            ) &&
            ((this.pendingIOSKey = i || e),
            setTimeout(() => this.flushIOSKey(t), 250),
            !0)
          );
        }
        flushIOSKey(t) {
          let e = this.pendingIOSKey;
          return (
            !!e &&
            ((this.pendingIOSKey = void 0), Be(t.contentDOM, e.key, e.keyCode))
          );
        }
        ignoreDuringComposition(t) {
          return (
            !!/^key/.test(t.type) &&
            (this.composing > 0 ||
              (!!(
                ti.safari &&
                !ti.ios &&
                this.compositionPendingKey &&
                Date.now() - this.compositionEndedAt < 100
              ) &&
                ((this.compositionPendingKey = !1), !0)))
          );
        }
        mustFlushObserver(t) {
          return 'keydown' == t.type && 229 != t.keyCode;
        }
        startMouseSelection(t) {
          this.mouseSelection && this.mouseSelection.destroy(),
            (this.mouseSelection = t);
        }
        update(t) {
          this.mouseSelection && this.mouseSelection.update(t),
            t.transactions.length &&
              (this.lastKeyCode = this.lastSelectionTime = 0);
        }
        destroy() {
          this.mouseSelection && this.mouseSelection.destroy();
        }
      }
      const ts = [
          { key: 'Backspace', keyCode: 8, inputType: 'deleteContentBackward' },
          { key: 'Enter', keyCode: 13, inputType: 'insertParagraph' },
          { key: 'Delete', keyCode: 46, inputType: 'deleteContentForward' },
        ],
        es = 'dthko',
        is = [16, 17, 18, 20, 91, 92, 224, 225],
        ns = 6;
      function ss(t) {
        return 0.7 * Math.max(0, t) + 8;
      }
      class rs {
        constructor(t, e, i, n) {
          (this.view = t),
            (this.style = i),
            (this.mustSelect = n),
            (this.scrollSpeed = { x: 0, y: 0 }),
            (this.scrolling = -1),
            (this.lastEvent = e),
            (this.scrollParent = Ae(t.contentDOM));
          let s = t.contentDOM.ownerDocument;
          s.addEventListener('mousemove', (this.move = this.move.bind(this))),
            s.addEventListener('mouseup', (this.up = this.up.bind(this))),
            (this.extend = e.shiftKey),
            (this.multiple =
              t.state.facet(Rt.allowMultipleSelections) && os(t, e)),
            (this.dragMove = ls(t, e)),
            (this.dragging = !(!as(t, e) || 1 != Cs(e)) && null);
        }
        start(t) {
          !1 === this.dragging && (t.preventDefault(), this.select(t));
        }
        move(t) {
          var e;
          if (0 == t.buttons) return this.destroy();
          if (!1 !== this.dragging) return;
          this.select((this.lastEvent = t));
          let i = 0,
            n = 0,
            s = (null === (e = this.scrollParent) || void 0 === e
              ? void 0
              : e.getBoundingClientRect()) || {
              left: 0,
              top: 0,
              right: this.view.win.innerWidth,
              bottom: this.view.win.innerHeight,
            };
          t.clientX <= s.left + ns
            ? (i = -ss(s.left - t.clientX))
            : t.clientX >= s.right - ns && (i = ss(t.clientX - s.right)),
            t.clientY <= s.top + ns
              ? (n = -ss(s.top - t.clientY))
              : t.clientY >= s.bottom - ns && (n = ss(t.clientY - s.bottom)),
            this.setScrollSpeed(i, n);
        }
        up(t) {
          null == this.dragging && this.select(this.lastEvent),
            this.dragging || t.preventDefault(),
            this.destroy();
        }
        destroy() {
          this.setScrollSpeed(0, 0);
          let t = this.view.contentDOM.ownerDocument;
          t.removeEventListener('mousemove', this.move),
            t.removeEventListener('mouseup', this.up),
            (this.view.inputState.mouseSelection = null);
        }
        setScrollSpeed(t, e) {
          (this.scrollSpeed = { x: t, y: e }),
            t || e
              ? this.scrolling < 0 &&
                (this.scrolling = setInterval(() => this.scroll(), 50))
              : this.scrolling > -1 &&
                (clearInterval(this.scrolling), (this.scrolling = -1));
        }
        scroll() {
          this.scrollParent
            ? ((this.scrollParent.scrollLeft += this.scrollSpeed.x),
              (this.scrollParent.scrollTop += this.scrollSpeed.y))
            : this.view.win.scrollBy(this.scrollSpeed.x, this.scrollSpeed.y),
            !1 === this.dragging && this.select(this.lastEvent);
        }
        select(t) {
          let e = this.style.get(t, this.extend, this.multiple);
          (!this.mustSelect &&
            e.eq(this.view.state.selection) &&
            e.main.assoc == this.view.state.selection.main.assoc) ||
            this.view.dispatch({ selection: e, userEvent: 'select.pointer' }),
            (this.mustSelect = !1);
        }
        update(t) {
          t.docChanged &&
            this.dragging &&
            (this.dragging = this.dragging.map(t.changes)),
            this.style.update(t) &&
              setTimeout(() => this.select(this.lastEvent), 20);
        }
      }
      function os(t, e) {
        let i = t.state.facet(Li);
        return i.length ? i[0](e) : ti.mac ? e.metaKey : e.ctrlKey;
      }
      function ls(t, e) {
        let i = t.state.facet(Ni);
        return i.length ? i[0](e) : ti.mac ? !e.altKey : !e.ctrlKey;
      }
      function as(t, e) {
        let { main: i } = t.state.selection;
        if (i.empty) return !1;
        let n = pe(t.root);
        if (!n || 0 == n.rangeCount) return !0;
        let s = n.getRangeAt(0).getClientRects();
        for (let r = 0; r < s.length; r++) {
          let t = s[r];
          if (
            t.left <= e.clientX &&
            t.right >= e.clientX &&
            t.top <= e.clientY &&
            t.bottom >= e.clientY
          )
            return !0;
        }
        return !1;
      }
      function hs(t, e) {
        if (!e.bubbles) return !0;
        if (e.defaultPrevented) return !1;
        for (let i, n = e.target; n != t.contentDOM; n = n.parentNode)
          if (!n || 11 == n.nodeType || ((i = We.get(n)) && i.ignoreEvent(e)))
            return !1;
        return !0;
      }
      const cs = Object.create(null),
        us = Object.create(null),
        ds =
          (ti.ie && ti.ie_version < 15) || (ti.ios && ti.webkit_version < 604);
      function fs(t) {
        let e = t.dom.parentNode;
        if (!e) return;
        let i = e.appendChild(document.createElement('textarea'));
        (i.style.cssText = 'position: fixed; left: -10000px; top: 10px'),
          i.focus(),
          setTimeout(() => {
            t.focus(), i.remove(), ps(t, i.value);
          }, 50);
      }
      function ps(t, e) {
        let i,
          { state: n } = t,
          s = 1,
          r = n.toText(e),
          o = r.lines == n.selection.ranges.length,
          l =
            null != Es &&
            n.selection.ranges.every((t) => t.empty) &&
            Es == r.toString();
        if (l) {
          let t = -1;
          i = n.changeByRange((i) => {
            let l = n.doc.lineAt(i.from);
            if (l.from == t) return { range: i };
            t = l.from;
            let a = n.toText((o ? r.line(s++).text : e) + n.lineBreak);
            return {
              changes: { from: l.from, insert: a },
              range: V.cursor(i.from + a.length),
            };
          });
        } else
          i = o
            ? n.changeByRange((t) => {
                let e = r.line(s++);
                return {
                  changes: { from: t.from, to: t.to, insert: e.text },
                  range: V.cursor(t.from + e.length),
                };
              })
            : n.replaceSelection(r);
        t.dispatch(i, { userEvent: 'input.paste', scrollIntoView: !0 });
      }
      function ms(t, e, i, n) {
        if (1 == n) return V.cursor(e, i);
        if (2 == n) return In(t.state, e, i);
        {
          let i = Di.find(t.docView, e),
            n = t.state.doc.lineAt(i ? i.posAtEnd : e),
            s = i ? i.posAtStart : n.from,
            r = i ? i.posAtEnd : n.to;
          return r < t.state.doc.length && r == n.to && r++, V.range(s, r);
        }
      }
      (cs.keydown = (t, e) => {
        t.inputState.setSelectionOrigin('select'),
          27 == e.keyCode && (t.inputState.lastEscPress = Date.now());
      }),
        (cs.touchstart = (t, e) => {
          (t.inputState.lastTouchTime = Date.now()),
            t.inputState.setSelectionOrigin('select.pointer');
        }),
        (cs.touchmove = (t) => {
          t.inputState.setSelectionOrigin('select.pointer');
        }),
        (us.touchstart = us.touchmove = { passive: !0 }),
        (cs.mousedown = (t, e) => {
          if (
            (t.observer.flush(), t.inputState.lastTouchTime > Date.now() - 2e3)
          )
            return;
          let i = null;
          for (let n of t.state.facet(Pi)) if (((i = n(t, e)), i)) break;
          if ((i || 0 != e.button || (i = Ms(t, e)), i)) {
            let n = t.root.activeElement != t.contentDOM;
            t.inputState.startMouseSelection(new rs(t, e, i, n)),
              n && t.observer.ignore(() => Ee(t.contentDOM)),
              t.inputState.mouseSelection &&
                t.inputState.mouseSelection.start(e);
          }
        });
      let gs = (t, e) => t >= e.top && t <= e.bottom,
        vs = (t, e, i) => gs(e, i) && t >= i.left && t <= i.right;
      function ws(t, e, i, n) {
        let s = Di.find(t.docView, e);
        if (!s) return 1;
        let r = e - s.posAtStart;
        if (0 == r) return 1;
        if (r == s.length) return -1;
        let o = s.coordsAt(r, -1);
        if (o && vs(i, n, o)) return -1;
        let l = s.coordsAt(r, 1);
        return l && vs(i, n, l) ? 1 : o && gs(n, o) ? -1 : 1;
      }
      function ys(t, e) {
        let i = t.posAtCoords({ x: e.clientX, y: e.clientY }, !1);
        return { pos: i, bias: ws(t, i, e.clientX, e.clientY) };
      }
      const bs = ti.ie && ti.ie_version <= 11;
      let xs = null,
        ks = 0,
        Ss = 0;
      function Cs(t) {
        if (!bs) return t.detail;
        let e = xs,
          i = Ss;
        return (
          (xs = t),
          (Ss = Date.now()),
          (ks =
            !e ||
            (i > Date.now() - 400 &&
              Math.abs(e.clientX - t.clientX) < 2 &&
              Math.abs(e.clientY - t.clientY) < 2)
              ? (ks + 1) % 3
              : 1)
        );
      }
      function Ms(t, e) {
        let i = ys(t, e),
          n = Cs(e),
          s = t.state.selection;
        return {
          update(t) {
            t.docChanged &&
              ((i.pos = t.changes.mapPos(i.pos)), (s = s.map(t.changes)));
          },
          get(e, r, o) {
            let l,
              a = ys(t, e),
              h = ms(t, a.pos, a.bias, n);
            if (i.pos != a.pos && !r) {
              let e = ms(t, i.pos, i.bias, n),
                s = Math.min(e.from, h.from),
                r = Math.max(e.to, h.to);
              h = s < h.from ? V.range(s, r) : V.range(r, s);
            }
            return r
              ? s.replaceRange(s.main.extend(h.from, h.to))
              : o && 1 == n && s.ranges.length > 1 && (l = As(s, a.pos))
              ? l
              : o
              ? s.addRange(h)
              : V.create([h]);
          },
        };
      }
      function As(t, e) {
        for (let i = 0; i < t.ranges.length; i++) {
          let { from: n, to: s } = t.ranges[i];
          if (n <= e && s >= e)
            return V.create(
              t.ranges.slice(0, i).concat(t.ranges.slice(i + 1)),
              t.mainIndex == i ? 0 : t.mainIndex - (t.mainIndex > i ? 1 : 0),
            );
        }
        return null;
      }
      function Os(t, e, i, n) {
        if (!i) return;
        let s = t.posAtCoords({ x: e.clientX, y: e.clientY }, !1);
        e.preventDefault();
        let { mouseSelection: r } = t.inputState,
          o =
            n && r && r.dragging && r.dragMove
              ? { from: r.dragging.from, to: r.dragging.to }
              : null,
          l = { from: s, insert: i },
          a = t.state.changes(o ? [o, l] : l);
        t.focus(),
          t.dispatch({
            changes: a,
            selection: { anchor: a.mapPos(s, -1), head: a.mapPos(s, 1) },
            userEvent: o ? 'move.drop' : 'input.drop',
          });
      }
      function Ds(t, e) {
        let i = t.dom.parentNode;
        if (!i) return;
        let n = i.appendChild(document.createElement('textarea'));
        (n.style.cssText = 'position: fixed; left: -10000px; top: 10px'),
          (n.value = e),
          n.focus(),
          (n.selectionEnd = e.length),
          (n.selectionStart = 0),
          setTimeout(() => {
            n.remove(), t.focus();
          }, 50);
      }
      function Ts(t) {
        let e = [],
          i = [],
          n = !1;
        for (let s of t.selection.ranges)
          s.empty || (e.push(t.sliceDoc(s.from, s.to)), i.push(s));
        if (!e.length) {
          let s = -1;
          for (let { from: n } of t.selection.ranges) {
            let r = t.doc.lineAt(n);
            r.number > s &&
              (e.push(r.text),
              i.push({ from: r.from, to: Math.min(t.doc.length, r.to + 1) })),
              (s = r.number);
          }
          n = !0;
        }
        return { text: e.join(t.lineBreak), ranges: i, linewise: n };
      }
      (cs.dragstart = (t, e) => {
        let {
            selection: { main: i },
          } = t.state,
          { mouseSelection: n } = t.inputState;
        n && (n.dragging = i),
          e.dataTransfer &&
            (e.dataTransfer.setData('Text', t.state.sliceDoc(i.from, i.to)),
            (e.dataTransfer.effectAllowed = 'copyMove'));
      }),
        (cs.drop = (t, e) => {
          if (!e.dataTransfer) return;
          if (t.state.readOnly) return e.preventDefault();
          let i = e.dataTransfer.files;
          if (i && i.length) {
            e.preventDefault();
            let n = Array(i.length),
              s = 0,
              r = () => {
                ++s == i.length &&
                  Os(
                    t,
                    e,
                    n.filter((t) => null != t).join(t.state.lineBreak),
                    !1,
                  );
              };
            for (let t = 0; t < i.length; t++) {
              let e = new FileReader();
              (e.onerror = r),
                (e.onload = () => {
                  /[\x00-\x08\x0e-\x1f]{2}/.test(e.result) || (n[t] = e.result),
                    r();
                }),
                e.readAsText(i[t]);
            }
          } else Os(t, e, e.dataTransfer.getData('Text'), !0);
        }),
        (cs.paste = (t, e) => {
          if (t.state.readOnly) return e.preventDefault();
          t.observer.flush();
          let i = ds ? null : e.clipboardData;
          i
            ? (ps(t, i.getData('text/plain') || i.getData('text/uri-text')),
              e.preventDefault())
            : fs(t);
        });
      let Es = null;
      cs.copy = cs.cut = (t, e) => {
        let { text: i, ranges: n, linewise: s } = Ts(t.state);
        if (!i && !s) return;
        Es = s ? i : null;
        let r = ds ? null : e.clipboardData;
        r
          ? (e.preventDefault(), r.clearData(), r.setData('text/plain', i))
          : Ds(t, i),
          'cut' != e.type ||
            t.state.readOnly ||
            t.dispatch({
              changes: n,
              scrollIntoView: !0,
              userEvent: 'delete.cut',
            });
      };
      const Rs = ft.define();
      function Bs(t, e) {
        let i = [];
        for (let n of t.facet(Vi)) {
          let s = n(t, e);
          s && i.push(s);
        }
        return i ? t.update({ effects: i, annotations: Rs.of(!0) }) : null;
      }
      function Ls(t) {
        setTimeout(() => {
          let e = t.hasFocus;
          if (e != t.inputState.notifiedFocused) {
            let i = Bs(t.state, e);
            i ? t.dispatch(i) : t.update([]);
          }
        }, 10);
      }
      (cs.focus = (t) => {
        (t.inputState.lastFocusTime = Date.now()),
          t.scrollDOM.scrollTop ||
            (!t.inputState.lastScrollTop && !t.inputState.lastScrollLeft) ||
            ((t.scrollDOM.scrollTop = t.inputState.lastScrollTop),
            (t.scrollDOM.scrollLeft = t.inputState.lastScrollLeft)),
          Ls(t);
      }),
        (cs.blur = (t) => {
          t.observer.clearSelectionRange(), Ls(t);
        }),
        (cs.compositionstart = cs.compositionupdate =
          (t) => {
            null == t.inputState.compositionFirstChange &&
              (t.inputState.compositionFirstChange = !0),
              t.inputState.composing < 0 && (t.inputState.composing = 0);
          }),
        (cs.compositionend = (t) => {
          (t.inputState.composing = -1),
            (t.inputState.compositionEndedAt = Date.now()),
            (t.inputState.compositionPendingKey = !0),
            (t.inputState.compositionPendingChange =
              t.observer.pendingRecords().length > 0),
            (t.inputState.compositionFirstChange = null),
            ti.chrome && ti.android
              ? t.observer.flushSoon()
              : t.inputState.compositionPendingChange
              ? Promise.resolve().then(() => t.observer.flush())
              : setTimeout(() => {
                  t.inputState.composing < 0 &&
                    t.docView.compositionDeco.size &&
                    t.update([]);
                }, 50);
        }),
        (cs.contextmenu = (t) => {
          t.inputState.lastContextMenu = Date.now();
        }),
        (cs.beforeinput = (t, e) => {
          var i;
          let n;
          if (
            ti.chrome &&
            ti.android &&
            (n = ts.find((t) => t.inputType == e.inputType)) &&
            (t.observer.delayAndroidKey(n.key, n.keyCode),
            'Backspace' == n.key || 'Delete' == n.key)
          ) {
            let e =
              (null === (i = window.visualViewport) || void 0 === i
                ? void 0
                : i.height) || 0;
            setTimeout(() => {
              var i;
              ((null === (i = window.visualViewport) || void 0 === i
                ? void 0
                : i.height) || 0) >
                e + 10 &&
                t.hasFocus &&
                (t.contentDOM.blur(), t.focus());
            }, 100);
          }
        });
      const Ns = ['pre-wrap', 'normal', 'pre-line', 'break-spaces'];
      class Ps {
        constructor(t) {
          (this.lineWrapping = t),
            (this.doc = o.empty),
            (this.heightSamples = {}),
            (this.lineHeight = 14),
            (this.charWidth = 7),
            (this.textHeight = 14),
            (this.lineLength = 30),
            (this.heightChanged = !1);
        }
        heightForGap(t, e) {
          let i = this.doc.lineAt(e).number - this.doc.lineAt(t).number + 1;
          return (
            this.lineWrapping &&
              (i += Math.max(
                0,
                Math.ceil(
                  (e - t - i * this.lineLength * 0.5) / this.lineLength,
                ),
              )),
            this.lineHeight * i
          );
        }
        heightForLine(t) {
          if (!this.lineWrapping) return this.lineHeight;
          let e =
            1 +
            Math.max(
              0,
              Math.ceil((t - this.lineLength) / (this.lineLength - 5)),
            );
          return e * this.lineHeight;
        }
        setDoc(t) {
          return (this.doc = t), this;
        }
        mustRefreshForWrapping(t) {
          return Ns.indexOf(t) > -1 != this.lineWrapping;
        }
        mustRefreshForHeights(t) {
          let e = !1;
          for (let i = 0; i < t.length; i++) {
            let n = t[i];
            n < 0
              ? i++
              : this.heightSamples[Math.floor(10 * n)] ||
                ((e = !0), (this.heightSamples[Math.floor(10 * n)] = !0));
          }
          return e;
        }
        refresh(t, e, i, n, s, r) {
          let o = Ns.indexOf(t) > -1,
            l =
              Math.round(e) != Math.round(this.lineHeight) ||
              this.lineWrapping != o;
          if (
            ((this.lineWrapping = o),
            (this.lineHeight = e),
            (this.charWidth = i),
            (this.textHeight = n),
            (this.lineLength = s),
            l)
          ) {
            this.heightSamples = {};
            for (let t = 0; t < r.length; t++) {
              let e = r[t];
              e < 0 ? t++ : (this.heightSamples[Math.floor(10 * e)] = !0);
            }
          }
          return l;
        }
      }
      class Is {
        constructor(t, e) {
          (this.from = t), (this.heights = e), (this.index = 0);
        }
        get more() {
          return this.index < this.heights.length;
        }
      }
      class Hs {
        constructor(t, e, i, n, s, r) {
          (this.from = t),
            (this.length = e),
            (this.top = i),
            (this.height = n),
            (this.children = s),
            (this.deco = r);
        }
        get type() {
          var t, e, i;
          return null !==
            (i =
              null !== (t = this.children) && void 0 !== t
                ? t
                : null === (e = this.deco) || void 0 === e
                ? void 0
                : e.type) && void 0 !== i
            ? i
            : bi.Text;
        }
        get widget() {
          return this.deco && this.deco.widget;
        }
        get to() {
          return this.from + this.length;
        }
        get bottom() {
          return this.top + this.height;
        }
        join(t) {
          let e = (this.children || [this]).concat(t.children || [t]);
          return new Hs(
            this.from,
            this.length + t.length,
            this.top,
            this.height + t.height,
            e,
            null,
          );
        }
      }
      var Ws = (function (t) {
        return (
          (t[(t['ByPos'] = 0)] = 'ByPos'),
          (t[(t['ByHeight'] = 1)] = 'ByHeight'),
          (t[(t['ByPosNoHeight'] = 2)] = 'ByPosNoHeight'),
          t
        );
      })(Ws || (Ws = {}));
      const Vs = 0.001;
      class zs {
        constructor(t, e, i = 2) {
          (this.length = t), (this.height = e), (this.flags = i);
        }
        get outdated() {
          return (2 & this.flags) > 0;
        }
        set outdated(t) {
          this.flags = (t ? 2 : 0) | (-3 & this.flags);
        }
        setHeight(t, e) {
          this.height != e &&
            (Math.abs(this.height - e) > Vs && (t.heightChanged = !0),
            (this.height = e));
        }
        replace(t, e, i) {
          return zs.of(i);
        }
        decomposeLeft(t, e) {
          e.push(this);
        }
        decomposeRight(t, e) {
          e.push(this);
        }
        applyChanges(t, e, i, n) {
          let s = this,
            r = i.doc;
          for (let o = n.length - 1; o >= 0; o--) {
            let { fromA: l, toA: a, fromB: h, toB: c } = n[o],
              u = s.lineAt(l, Ws.ByPosNoHeight, i.setDoc(e), 0, 0),
              d = u.to >= a ? u : s.lineAt(a, Ws.ByPosNoHeight, i, 0, 0);
            (c += d.to - a), (a = d.to);
            while (o > 0 && u.from <= n[o - 1].toA)
              (l = n[o - 1].fromA),
                (h = n[o - 1].fromB),
                o--,
                l < u.from && (u = s.lineAt(l, Ws.ByPosNoHeight, i, 0, 0));
            (h += u.from - l), (l = u.from);
            let f = Us.build(i.setDoc(r), t, h, c);
            s = s.replace(l, a, f);
          }
          return s.updateHeight(i, 0);
        }
        static empty() {
          return new qs(0, 0);
        }
        static of(t) {
          if (1 == t.length) return t[0];
          let e = 0,
            i = t.length,
            n = 0,
            s = 0;
          for (;;)
            if (e == i)
              if (n > 2 * s) {
                let s = t[e - 1];
                s.break
                  ? t.splice(--e, 1, s.left, null, s.right)
                  : t.splice(--e, 1, s.left, s.right),
                  (i += 1 + s.break),
                  (n -= s.size);
              } else {
                if (!(s > 2 * n)) break;
                {
                  let e = t[i];
                  e.break
                    ? t.splice(i, 1, e.left, null, e.right)
                    : t.splice(i, 1, e.left, e.right),
                    (i += 2 + e.break),
                    (s -= e.size);
                }
              }
            else if (n < s) {
              let i = t[e++];
              i && (n += i.size);
            } else {
              let e = t[--i];
              e && (s += e.size);
            }
          let r = 0;
          return (
            null == t[e - 1] ? ((r = 1), e--) : null == t[e] && ((r = 1), i++),
            new _s(zs.of(t.slice(0, e)), r, zs.of(t.slice(i)))
          );
        }
      }
      zs.prototype.size = 1;
      class Fs extends zs {
        constructor(t, e, i) {
          super(t, e), (this.deco = i);
        }
        blockAt(t, e, i, n) {
          return new Hs(n, this.length, i, this.height, null, this.deco);
        }
        lineAt(t, e, i, n, s) {
          return this.blockAt(0, i, n, s);
        }
        forEachLine(t, e, i, n, s, r) {
          t <= s + this.length && e >= s && r(this.blockAt(0, i, n, s));
        }
        updateHeight(t, e = 0, i = !1, n) {
          return (
            n &&
              n.from <= e &&
              n.more &&
              this.setHeight(t, n.heights[n.index++]),
            (this.outdated = !1),
            this
          );
        }
        toString() {
          return `block(${this.length})`;
        }
      }
      class qs extends Fs {
        constructor(t, e) {
          super(t, e, null), (this.collapsed = 0), (this.widgetHeight = 0);
        }
        replace(t, e, i) {
          let n = i[0];
          return 1 == i.length &&
            (n instanceof qs || (n instanceof js && 4 & n.flags)) &&
            Math.abs(this.length - n.length) < 10
            ? (n instanceof js
                ? (n = new qs(n.length, this.height))
                : (n.height = this.height),
              this.outdated || (n.outdated = !1),
              n)
            : zs.of(i);
        }
        updateHeight(t, e = 0, i = !1, n) {
          return (
            n && n.from <= e && n.more
              ? this.setHeight(t, n.heights[n.index++])
              : (i || this.outdated) &&
                this.setHeight(
                  t,
                  Math.max(
                    this.widgetHeight,
                    t.heightForLine(this.length - this.collapsed),
                  ),
                ),
            (this.outdated = !1),
            this
          );
        }
        toString() {
          return `line(${this.length}${this.collapsed ? -this.collapsed : ''}${
            this.widgetHeight ? ':' + this.widgetHeight : ''
          })`;
        }
      }
      class js extends zs {
        constructor(t) {
          super(t, 0);
        }
        heightMetrics(t, e) {
          let i,
            n = t.doc.lineAt(e).number,
            s = t.doc.lineAt(e + this.length).number,
            r = s - n + 1,
            o = 0;
          if (t.lineWrapping) {
            let e = Math.min(this.height, t.lineHeight * r);
            (i = e / r),
              this.length > r + 1 &&
                (o = (this.height - e) / (this.length - r - 1));
          } else i = this.height / r;
          return { firstLine: n, lastLine: s, perLine: i, perChar: o };
        }
        blockAt(t, e, i, n) {
          let {
            firstLine: s,
            lastLine: r,
            perLine: o,
            perChar: l,
          } = this.heightMetrics(e, n);
          if (e.lineWrapping) {
            let s =
                n +
                Math.round(
                  Math.max(0, Math.min(1, (t - i) / this.height)) * this.length,
                ),
              r = e.doc.lineAt(s),
              a = o + r.length * l,
              h = Math.max(i, t - a / 2);
            return new Hs(r.from, r.length, h, a, null, null);
          }
          {
            let n = Math.max(0, Math.min(r - s, Math.floor((t - i) / o))),
              { from: l, length: a } = e.doc.line(s + n);
            return new Hs(l, a, i + o * n, o, null, null);
          }
        }
        lineAt(t, e, i, n, s) {
          if (e == Ws.ByHeight) return this.blockAt(t, i, n, s);
          if (e == Ws.ByPosNoHeight) {
            let { from: e, to: n } = i.doc.lineAt(t);
            return new Hs(e, n - e, 0, 0, null, null);
          }
          let {
              firstLine: r,
              perLine: o,
              perChar: l,
            } = this.heightMetrics(i, s),
            a = i.doc.lineAt(t),
            h = o + a.length * l,
            c = a.number - r,
            u = n + o * c + l * (a.from - s - c);
          return new Hs(
            a.from,
            a.length,
            Math.max(n, Math.min(u, n + this.height - h)),
            h,
            null,
            null,
          );
        }
        forEachLine(t, e, i, n, s, r) {
          (t = Math.max(t, s)), (e = Math.min(e, s + this.length));
          let {
            firstLine: o,
            perLine: l,
            perChar: a,
          } = this.heightMetrics(i, s);
          for (let h = t, c = n; h <= e; ) {
            let e = i.doc.lineAt(h);
            if (h == t) {
              let i = e.number - o;
              c += l * i + a * (t - s - i);
            }
            let n = l + a * e.length;
            r(new Hs(e.from, e.length, c, n, null, null)),
              (c += n),
              (h = e.to + 1);
          }
        }
        replace(t, e, i) {
          let n = this.length - e;
          if (n > 0) {
            let t = i[i.length - 1];
            t instanceof js
              ? (i[i.length - 1] = new js(t.length + n))
              : i.push(null, new js(n - 1));
          }
          if (t > 0) {
            let e = i[0];
            e instanceof js
              ? (i[0] = new js(t + e.length))
              : i.unshift(new js(t - 1), null);
          }
          return zs.of(i);
        }
        decomposeLeft(t, e) {
          e.push(new js(t - 1), null);
        }
        decomposeRight(t, e) {
          e.push(null, new js(this.length - t - 1));
        }
        updateHeight(t, e = 0, i = !1, n) {
          let s = e + this.length;
          if (n && n.from <= e + this.length && n.more) {
            let i = [],
              r = Math.max(e, n.from),
              o = -1;
            n.from > e && i.push(new js(n.from - e - 1).updateHeight(t, e));
            while (r <= s && n.more) {
              let e = t.doc.lineAt(r).length;
              i.length && i.push(null);
              let s = n.heights[n.index++];
              -1 == o ? (o = s) : Math.abs(s - o) >= Vs && (o = -2);
              let l = new qs(e, s);
              (l.outdated = !1), i.push(l), (r += e + 1);
            }
            r <= s && i.push(null, new js(s - r).updateHeight(t, r));
            let l = zs.of(i);
            return (
              (o < 0 ||
                Math.abs(l.height - this.height) >= Vs ||
                Math.abs(o - this.heightMetrics(t, e).perLine) >= Vs) &&
                (t.heightChanged = !0),
              l
            );
          }
          return (
            (i || this.outdated) &&
              (this.setHeight(t, t.heightForGap(e, e + this.length)),
              (this.outdated = !1)),
            this
          );
        }
        toString() {
          return `gap(${this.length})`;
        }
      }
      class _s extends zs {
        constructor(t, e, i) {
          super(
            t.length + e + i.length,
            t.height + i.height,
            e | (t.outdated || i.outdated ? 2 : 0),
          ),
            (this.left = t),
            (this.right = i),
            (this.size = t.size + i.size);
        }
        get break() {
          return 1 & this.flags;
        }
        blockAt(t, e, i, n) {
          let s = i + this.left.height;
          return t < s
            ? this.left.blockAt(t, e, i, n)
            : this.right.blockAt(t, e, s, n + this.left.length + this.break);
        }
        lineAt(t, e, i, n, s) {
          let r = n + this.left.height,
            o = s + this.left.length + this.break,
            l = e == Ws.ByHeight ? t < r : t < o,
            a = l
              ? this.left.lineAt(t, e, i, n, s)
              : this.right.lineAt(t, e, i, r, o);
          if (this.break || (l ? a.to < o : a.from > o)) return a;
          let h = e == Ws.ByPosNoHeight ? Ws.ByPosNoHeight : Ws.ByPos;
          return l
            ? a.join(this.right.lineAt(o, h, i, r, o))
            : this.left.lineAt(o, h, i, n, s).join(a);
        }
        forEachLine(t, e, i, n, s, r) {
          let o = n + this.left.height,
            l = s + this.left.length + this.break;
          if (this.break)
            t < l && this.left.forEachLine(t, e, i, n, s, r),
              e >= l && this.right.forEachLine(t, e, i, o, l, r);
          else {
            let a = this.lineAt(l, Ws.ByPos, i, n, s);
            t < a.from && this.left.forEachLine(t, a.from - 1, i, n, s, r),
              a.to >= t && a.from <= e && r(a),
              e > a.to && this.right.forEachLine(a.to + 1, e, i, o, l, r);
          }
        }
        replace(t, e, i) {
          let n = this.left.length + this.break;
          if (e < n)
            return this.balanced(this.left.replace(t, e, i), this.right);
          if (t > this.left.length)
            return this.balanced(
              this.left,
              this.right.replace(t - n, e - n, i),
            );
          let s = [];
          t > 0 && this.decomposeLeft(t, s);
          let r = s.length;
          for (let o of i) s.push(o);
          if ((t > 0 && Ks(s, r - 1), e < this.length)) {
            let t = s.length;
            this.decomposeRight(e, s), Ks(s, t);
          }
          return zs.of(s);
        }
        decomposeLeft(t, e) {
          let i = this.left.length;
          if (t <= i) return this.left.decomposeLeft(t, e);
          e.push(this.left),
            this.break && (i++, t >= i && e.push(null)),
            t > i && this.right.decomposeLeft(t - i, e);
        }
        decomposeRight(t, e) {
          let i = this.left.length,
            n = i + this.break;
          if (t >= n) return this.right.decomposeRight(t - n, e);
          t < i && this.left.decomposeRight(t, e),
            this.break && t < n && e.push(null),
            e.push(this.right);
        }
        balanced(t, e) {
          return t.size > 2 * e.size || e.size > 2 * t.size
            ? zs.of(this.break ? [t, null, e] : [t, e])
            : ((this.left = t),
              (this.right = e),
              (this.height = t.height + e.height),
              (this.outdated = t.outdated || e.outdated),
              (this.size = t.size + e.size),
              (this.length = t.length + this.break + e.length),
              this);
        }
        updateHeight(t, e = 0, i = !1, n) {
          let { left: s, right: r } = this,
            o = e + s.length + this.break,
            l = null;
          return (
            n && n.from <= e + s.length && n.more
              ? (l = s = s.updateHeight(t, e, i, n))
              : s.updateHeight(t, e, i),
            n && n.from <= o + r.length && n.more
              ? (l = r = r.updateHeight(t, o, i, n))
              : r.updateHeight(t, o, i),
            l
              ? this.balanced(s, r)
              : ((this.height = this.left.height + this.right.height),
                (this.outdated = !1),
                this)
          );
        }
        toString() {
          return this.left + (this.break ? ' ' : '-') + this.right;
        }
      }
      function Ks(t, e) {
        let i, n;
        null == t[e] &&
          (i = t[e - 1]) instanceof js &&
          (n = t[e + 1]) instanceof js &&
          t.splice(e - 1, 3, new js(i.length + 1 + n.length));
      }
      const $s = 5;
      class Us {
        constructor(t, e) {
          (this.pos = t),
            (this.oracle = e),
            (this.nodes = []),
            (this.lineStart = -1),
            (this.lineEnd = -1),
            (this.covering = null),
            (this.writtenTo = t);
        }
        get isCovered() {
          return (
            this.covering && this.nodes[this.nodes.length - 1] == this.covering
          );
        }
        span(t, e) {
          if (this.lineStart > -1) {
            let t = Math.min(e, this.lineEnd),
              i = this.nodes[this.nodes.length - 1];
            i instanceof qs
              ? (i.length += t - this.pos)
              : (t > this.pos || !this.isCovered) &&
                this.nodes.push(new qs(t - this.pos, -1)),
              (this.writtenTo = t),
              e > t &&
                (this.nodes.push(null),
                this.writtenTo++,
                (this.lineStart = -1));
          }
          this.pos = e;
        }
        point(t, e, i) {
          if (t < e || i.heightRelevant) {
            let n = i.widget ? i.widget.estimatedHeight : 0;
            n < 0 && (n = this.oracle.lineHeight);
            let s = e - t;
            i.block
              ? this.addBlock(new Fs(s, n, i))
              : (s || n >= $s) && this.addLineDeco(n, s);
          } else e > t && this.span(t, e);
          this.lineEnd > -1 &&
            this.lineEnd < this.pos &&
            (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
        }
        enterLine() {
          if (this.lineStart > -1) return;
          let { from: t, to: e } = this.oracle.doc.lineAt(this.pos);
          (this.lineStart = t),
            (this.lineEnd = e),
            this.writtenTo < t &&
              ((this.writtenTo < t - 1 ||
                null == this.nodes[this.nodes.length - 1]) &&
                this.nodes.push(this.blankContent(this.writtenTo, t - 1)),
              this.nodes.push(null)),
            this.pos > t && this.nodes.push(new qs(this.pos - t, -1)),
            (this.writtenTo = this.pos);
        }
        blankContent(t, e) {
          let i = new js(e - t);
          return this.oracle.doc.lineAt(t).to == e && (i.flags |= 4), i;
        }
        ensureLine() {
          this.enterLine();
          let t = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
          if (t instanceof qs) return t;
          let e = new qs(0, -1);
          return this.nodes.push(e), e;
        }
        addBlock(t) {
          var e;
          this.enterLine();
          let i = null === (e = t.deco) || void 0 === e ? void 0 : e.type;
          i != bi.WidgetAfter || this.isCovered || this.ensureLine(),
            this.nodes.push(t),
            (this.writtenTo = this.pos = this.pos + t.length),
            i != bi.WidgetBefore && (this.covering = t);
        }
        addLineDeco(t, e) {
          let i = this.ensureLine();
          (i.length += e),
            (i.collapsed += e),
            (i.widgetHeight = Math.max(i.widgetHeight, t)),
            (this.writtenTo = this.pos = this.pos + e);
        }
        finish(t) {
          let e =
            0 == this.nodes.length ? null : this.nodes[this.nodes.length - 1];
          !(this.lineStart > -1) || e instanceof qs || this.isCovered
            ? (this.writtenTo < this.pos || null == e) &&
              this.nodes.push(this.blankContent(this.writtenTo, this.pos))
            : this.nodes.push(new qs(0, -1));
          let i = t;
          for (let n of this.nodes)
            n instanceof qs && n.updateHeight(this.oracle, i),
              (i += n ? n.length : 1);
          return this.nodes;
        }
        static build(t, e, i, n) {
          let s = new Us(i, t);
          return Ht.spans(e, i, n, s, 0), s.finish(i);
        }
      }
      function Gs(t, e, i) {
        let n = new Js();
        return Ht.compare(t, e, i, n, 0), n.changes;
      }
      class Js {
        constructor() {
          this.changes = [];
        }
        compareRange() {}
        comparePoint(t, e, i, n) {
          (t < e || (i && i.heightRelevant) || (n && n.heightRelevant)) &&
            Oi(t, e, this.changes, 5);
        }
      }
      function Ys(t, e) {
        let i = t.getBoundingClientRect(),
          n = t.ownerDocument,
          s = n.defaultView || window,
          r = Math.max(0, i.left),
          o = Math.min(s.innerWidth, i.right),
          l = Math.max(0, i.top),
          a = Math.min(s.innerHeight, i.bottom);
        for (let h = t.parentNode; h && h != n.body; )
          if (1 == h.nodeType) {
            let e = h,
              i = window.getComputedStyle(e);
            if (
              (e.scrollHeight > e.clientHeight ||
                e.scrollWidth > e.clientWidth) &&
              'visible' != i.overflow
            ) {
              let i = e.getBoundingClientRect();
              (r = Math.max(r, i.left)),
                (o = Math.min(o, i.right)),
                (l = Math.max(l, i.top)),
                (a = h == t.parentNode ? i.bottom : Math.min(a, i.bottom));
            }
            h =
              'absolute' == i.position || 'fixed' == i.position
                ? e.offsetParent
                : e.parentNode;
          } else {
            if (11 != h.nodeType) break;
            h = h.host;
          }
        return {
          left: r - i.left,
          right: Math.max(r, o) - i.left,
          top: l - (i.top + e),
          bottom: Math.max(l, a) - (i.top + e),
        };
      }
      function Xs(t, e) {
        let i = t.getBoundingClientRect();
        return {
          left: 0,
          right: i.right - i.left,
          top: e,
          bottom: i.bottom - (i.top + e),
        };
      }
      class Zs {
        constructor(t, e, i) {
          (this.from = t), (this.to = e), (this.size = i);
        }
        static same(t, e) {
          if (t.length != e.length) return !1;
          for (let i = 0; i < t.length; i++) {
            let n = t[i],
              s = e[i];
            if (n.from != s.from || n.to != s.to || n.size != s.size) return !1;
          }
          return !0;
        }
        draw(t) {
          return xi
            .replace({ widget: new Qs(this.size, t) })
            .range(this.from, this.to);
        }
      }
      class Qs extends yi {
        constructor(t, e) {
          super(), (this.size = t), (this.vertical = e);
        }
        eq(t) {
          return t.size == this.size && t.vertical == this.vertical;
        }
        toDOM() {
          let t = document.createElement('div');
          return (
            this.vertical
              ? (t.style.height = this.size + 'px')
              : ((t.style.width = this.size + 'px'),
                (t.style.height = '2px'),
                (t.style.display = 'inline-block')),
            t
          );
        }
        get estimatedHeight() {
          return this.vertical ? this.size : -1;
        }
      }
      class tr {
        constructor(t) {
          (this.state = t),
            (this.pixelViewport = {
              left: 0,
              right: window.innerWidth,
              top: 0,
              bottom: 0,
            }),
            (this.inView = !0),
            (this.paddingTop = 0),
            (this.paddingBottom = 0),
            (this.contentDOMWidth = 0),
            (this.contentDOMHeight = 0),
            (this.editorHeight = 0),
            (this.editorWidth = 0),
            (this.scaler = or),
            (this.scrollTarget = null),
            (this.printing = !1),
            (this.mustMeasureContent = !0),
            (this.defaultTextDirection = rn.LTR),
            (this.visibleRanges = []),
            (this.mustEnforceCursorAssoc = !1);
          let e = t
            .facet(Xi)
            .some(
              (t) => 'function' != typeof t && 'cm-lineWrapping' == t.class,
            );
          (this.heightOracle = new Ps(e)),
            (this.stateDeco = t
              .facet(Zi)
              .filter((t) => 'function' != typeof t)),
            (this.heightMap = zs
              .empty()
              .applyChanges(
                this.stateDeco,
                o.empty,
                this.heightOracle.setDoc(t.doc),
                [new nn(0, 0, 0, t.doc.length)],
              )),
            (this.viewport = this.getViewport(0, null)),
            this.updateViewportLines(),
            this.updateForViewport(),
            (this.lineGaps = this.ensureLineGaps([])),
            (this.lineGapDeco = xi.set(this.lineGaps.map((t) => t.draw(!1)))),
            this.computeVisibleRanges();
        }
        updateForViewport() {
          let t = [this.viewport],
            { main: e } = this.state.selection;
          for (let i = 0; i <= 1; i++) {
            let n = i ? e.head : e.anchor;
            if (!t.some(({ from: t, to: e }) => n >= t && n <= e)) {
              let { from: e, to: i } = this.lineBlockAt(n);
              t.push(new er(e, i));
            }
          }
          (this.viewports = t.sort((t, e) => t.from - e.from)),
            (this.scaler =
              this.heightMap.height <= 7e6
                ? or
                : new lr(this.heightOracle, this.heightMap, this.viewports));
        }
        updateViewportLines() {
          (this.viewportLines = []),
            this.heightMap.forEachLine(
              this.viewport.from,
              this.viewport.to,
              this.heightOracle.setDoc(this.state.doc),
              0,
              0,
              (t) => {
                this.viewportLines.push(
                  1 == this.scaler.scale ? t : ar(t, this.scaler),
                );
              },
            );
        }
        update(t, e = null) {
          this.state = t.state;
          let i = this.stateDeco;
          this.stateDeco = this.state
            .facet(Zi)
            .filter((t) => 'function' != typeof t);
          let n = t.changedRanges,
            s = nn.extendWithRanges(
              n,
              Gs(
                i,
                this.stateDeco,
                t ? t.changes : R.empty(this.state.doc.length),
              ),
            ),
            r = this.heightMap.height;
          (this.heightMap = this.heightMap.applyChanges(
            this.stateDeco,
            t.startState.doc,
            this.heightOracle.setDoc(this.state.doc),
            s,
          )),
            this.heightMap.height != r && (t.flags |= 2);
          let o = s.length
            ? this.mapViewport(this.viewport, t.changes)
            : this.viewport;
          ((e && (e.range.head < o.from || e.range.head > o.to)) ||
            !this.viewportIsAppropriate(o)) &&
            (o = this.getViewport(0, e));
          let l =
            !t.changes.empty ||
            2 & t.flags ||
            o.from != this.viewport.from ||
            o.to != this.viewport.to;
          (this.viewport = o),
            this.updateForViewport(),
            l && this.updateViewportLines(),
            (this.lineGaps.length ||
              this.viewport.to - this.viewport.from > 4e3) &&
              this.updateLineGaps(
                this.ensureLineGaps(this.mapLineGaps(this.lineGaps, t.changes)),
              ),
            (t.flags |= this.computeVisibleRanges()),
            e && (this.scrollTarget = e),
            !this.mustEnforceCursorAssoc &&
              t.selectionSet &&
              t.view.lineWrapping &&
              t.state.selection.main.empty &&
              t.state.selection.main.assoc &&
              !t.state.facet(Fi) &&
              (this.mustEnforceCursorAssoc = !0);
        }
        measure(t) {
          let e = t.contentDOM,
            i = window.getComputedStyle(e),
            n = this.heightOracle,
            s = i.whiteSpace;
          this.defaultTextDirection = 'rtl' == i.direction ? rn.RTL : rn.LTR;
          let r = this.heightOracle.mustRefreshForWrapping(s),
            l = e.getBoundingClientRect(),
            a =
              r || this.mustMeasureContent || this.contentDOMHeight != l.height;
          (this.contentDOMHeight = l.height), (this.mustMeasureContent = !1);
          let h = 0,
            c = 0,
            u = parseInt(i.paddingTop) || 0,
            d = parseInt(i.paddingBottom) || 0;
          (this.paddingTop == u && this.paddingBottom == d) ||
            ((this.paddingTop = u), (this.paddingBottom = d), (h |= 10)),
            this.editorWidth != t.scrollDOM.clientWidth &&
              (n.lineWrapping && (a = !0),
              (this.editorWidth = t.scrollDOM.clientWidth),
              (h |= 8));
          let f = (this.printing ? Xs : Ys)(e, this.paddingTop),
            p = f.top - this.pixelViewport.top,
            m = f.bottom - this.pixelViewport.bottom;
          this.pixelViewport = f;
          let g =
            this.pixelViewport.bottom > this.pixelViewport.top &&
            this.pixelViewport.right > this.pixelViewport.left;
          if (
            (g != this.inView && ((this.inView = g), g && (a = !0)),
            !this.inView && !this.scrollTarget)
          )
            return 0;
          let v = l.width;
          if (
            ((this.contentDOMWidth == v &&
              this.editorHeight == t.scrollDOM.clientHeight) ||
              ((this.contentDOMWidth = l.width),
              (this.editorHeight = t.scrollDOM.clientHeight),
              (h |= 8)),
            a)
          ) {
            let e = t.docView.measureVisibleLineHeights(this.viewport);
            if (
              (n.mustRefreshForHeights(e) && (r = !0),
              r ||
                (n.lineWrapping &&
                  Math.abs(v - this.contentDOMWidth) > n.charWidth))
            ) {
              let {
                lineHeight: i,
                charWidth: o,
                textHeight: l,
              } = t.docView.measureTextSize();
              (r = i > 0 && n.refresh(s, i, o, l, v / o, e)),
                r && ((t.docView.minWidth = 0), (h |= 8));
            }
            p > 0 && m > 0
              ? (c = Math.max(p, m))
              : p < 0 && m < 0 && (c = Math.min(p, m)),
              (n.heightChanged = !1);
            for (let i of this.viewports) {
              let s =
                i.from == this.viewport.from
                  ? e
                  : t.docView.measureVisibleLineHeights(i);
              this.heightMap = (
                r
                  ? zs
                      .empty()
                      .applyChanges(
                        this.stateDeco,
                        o.empty,
                        this.heightOracle,
                        [new nn(0, 0, 0, t.state.doc.length)],
                      )
                  : this.heightMap
              ).updateHeight(n, 0, r, new Is(i.from, s));
            }
            n.heightChanged && (h |= 2);
          }
          let w =
            !this.viewportIsAppropriate(this.viewport, c) ||
            (this.scrollTarget &&
              (this.scrollTarget.range.head < this.viewport.from ||
                this.scrollTarget.range.head > this.viewport.to));
          return (
            w && (this.viewport = this.getViewport(c, this.scrollTarget)),
            this.updateForViewport(),
            (2 & h || w) && this.updateViewportLines(),
            (this.lineGaps.length ||
              this.viewport.to - this.viewport.from > 4e3) &&
              this.updateLineGaps(
                this.ensureLineGaps(r ? [] : this.lineGaps, t),
              ),
            (h |= this.computeVisibleRanges()),
            this.mustEnforceCursorAssoc &&
              ((this.mustEnforceCursorAssoc = !1),
              t.docView.enforceCursorAssoc()),
            h
          );
        }
        get visibleTop() {
          return this.scaler.fromDOM(this.pixelViewport.top);
        }
        get visibleBottom() {
          return this.scaler.fromDOM(this.pixelViewport.bottom);
        }
        getViewport(t, e) {
          let i = 0.5 - Math.max(-0.5, Math.min(0.5, t / 1e3 / 2)),
            n = this.heightMap,
            s = this.heightOracle,
            { visibleTop: r, visibleBottom: o } = this,
            l = new er(
              n.lineAt(r - 1e3 * i, Ws.ByHeight, s, 0, 0).from,
              n.lineAt(o + 1e3 * (1 - i), Ws.ByHeight, s, 0, 0).to,
            );
          if (e) {
            let { head: t } = e.range;
            if (t < l.from || t > l.to) {
              let i,
                r = Math.min(
                  this.editorHeight,
                  this.pixelViewport.bottom - this.pixelViewport.top,
                ),
                o = n.lineAt(t, Ws.ByPos, s, 0, 0);
              (i =
                'center' == e.y
                  ? (o.top + o.bottom) / 2 - r / 2
                  : 'start' == e.y || ('nearest' == e.y && t < l.from)
                  ? o.top
                  : o.bottom - r),
                (l = new er(
                  n.lineAt(i - 500, Ws.ByHeight, s, 0, 0).from,
                  n.lineAt(i + r + 500, Ws.ByHeight, s, 0, 0).to,
                ));
            }
          }
          return l;
        }
        mapViewport(t, e) {
          let i = e.mapPos(t.from, -1),
            n = e.mapPos(t.to, 1);
          return new er(
            this.heightMap.lineAt(i, Ws.ByPos, this.heightOracle, 0, 0).from,
            this.heightMap.lineAt(n, Ws.ByPos, this.heightOracle, 0, 0).to,
          );
        }
        viewportIsAppropriate({ from: t, to: e }, i = 0) {
          if (!this.inView) return !0;
          let { top: n } = this.heightMap.lineAt(
              t,
              Ws.ByPos,
              this.heightOracle,
              0,
              0,
            ),
            { bottom: s } = this.heightMap.lineAt(
              e,
              Ws.ByPos,
              this.heightOracle,
              0,
              0,
            ),
            { visibleTop: r, visibleBottom: o } = this;
          return (
            (0 == t || n <= r - Math.max(10, Math.min(-i, 250))) &&
            (e == this.state.doc.length ||
              s >= o + Math.max(10, Math.min(i, 250))) &&
            n > r - 2e3 &&
            s < o + 2e3
          );
        }
        mapLineGaps(t, e) {
          if (!t.length || e.empty) return t;
          let i = [];
          for (let n of t)
            e.touchesRange(n.from, n.to) ||
              i.push(new Zs(e.mapPos(n.from), e.mapPos(n.to), n.size));
          return i;
        }
        ensureLineGaps(t, e) {
          let i = this.heightOracle.lineWrapping,
            n = i ? 1e4 : 2e3,
            s = n >> 1,
            r = n << 1;
          if (this.defaultTextDirection != rn.LTR && !i) return [];
          let o = [],
            l = (n, r, a, h) => {
              if (r - n < s) return;
              let c = this.state.selection.main,
                u = [c.from];
              c.empty || u.push(c.to);
              for (let t of u)
                if (t > n && t < r)
                  return l(n, t - 10, a, h), void l(t + 10, r, a, h);
              let d = rr(
                t,
                (t) =>
                  t.from >= a.from &&
                  t.to <= a.to &&
                  Math.abs(t.from - n) < s &&
                  Math.abs(t.to - r) < s &&
                  !u.some((e) => t.from < e && t.to > e),
              );
              if (!d) {
                if (
                  r < a.to &&
                  e &&
                  i &&
                  e.visibleRanges.some((t) => t.from <= r && t.to >= r)
                ) {
                  let t = e.moveToLineBoundary(V.cursor(r), !1, !0).head;
                  t > n && (r = t);
                }
                d = new Zs(n, r, this.gapSize(a, n, r, h));
              }
              o.push(d);
            };
          for (let a of this.viewportLines) {
            if (a.length < r) continue;
            let t = ir(a.from, a.to, this.stateDeco);
            if (t.total < r) continue;
            let e,
              s,
              o = this.scrollTarget ? this.scrollTarget.range.head : null;
            if (i) {
              let i,
                r,
                l =
                  (n / this.heightOracle.lineLength) *
                  this.heightOracle.lineHeight;
              if (null != o) {
                let e = sr(t, o),
                  n =
                    ((this.visibleBottom - this.visibleTop) / 2 + l) / a.height;
                (i = e - n), (r = e + n);
              } else
                (i = (this.visibleTop - a.top - l) / a.height),
                  (r = (this.visibleBottom - a.top + l) / a.height);
              (e = nr(t, i)), (s = nr(t, r));
            } else {
              let i,
                r,
                l = t.total * this.heightOracle.charWidth,
                a = n * this.heightOracle.charWidth;
              if (null != o) {
                let e = sr(t, o),
                  n =
                    ((this.pixelViewport.right - this.pixelViewport.left) / 2 +
                      a) /
                    l;
                (i = e - n), (r = e + n);
              } else
                (i = (this.pixelViewport.left - a) / l),
                  (r = (this.pixelViewport.right + a) / l);
              (e = nr(t, i)), (s = nr(t, r));
            }
            e > a.from && l(a.from, e, a, t), s < a.to && l(s, a.to, a, t);
          }
          return o;
        }
        gapSize(t, e, i, n) {
          let s = sr(n, i) - sr(n, e);
          return this.heightOracle.lineWrapping
            ? t.height * s
            : n.total * this.heightOracle.charWidth * s;
        }
        updateLineGaps(t) {
          Zs.same(t, this.lineGaps) ||
            ((this.lineGaps = t),
            (this.lineGapDeco = xi.set(
              t.map((t) => t.draw(this.heightOracle.lineWrapping)),
            )));
        }
        computeVisibleRanges() {
          let t = this.stateDeco;
          this.lineGaps.length && (t = t.concat(this.lineGapDeco));
          let e = [];
          Ht.spans(
            t,
            this.viewport.from,
            this.viewport.to,
            {
              span(t, i) {
                e.push({ from: t, to: i });
              },
              point() {},
            },
            20,
          );
          let i =
            e.length != this.visibleRanges.length ||
            this.visibleRanges.some(
              (t, i) => t.from != e[i].from || t.to != e[i].to,
            );
          return (this.visibleRanges = e), i ? 4 : 0;
        }
        lineBlockAt(t) {
          return (
            (t >= this.viewport.from &&
              t <= this.viewport.to &&
              this.viewportLines.find((e) => e.from <= t && e.to >= t)) ||
            ar(
              this.heightMap.lineAt(t, Ws.ByPos, this.heightOracle, 0, 0),
              this.scaler,
            )
          );
        }
        lineBlockAtHeight(t) {
          return ar(
            this.heightMap.lineAt(
              this.scaler.fromDOM(t),
              Ws.ByHeight,
              this.heightOracle,
              0,
              0,
            ),
            this.scaler,
          );
        }
        elementAtHeight(t) {
          return ar(
            this.heightMap.blockAt(
              this.scaler.fromDOM(t),
              this.heightOracle,
              0,
              0,
            ),
            this.scaler,
          );
        }
        get docHeight() {
          return this.scaler.toDOM(this.heightMap.height);
        }
        get contentHeight() {
          return this.docHeight + this.paddingTop + this.paddingBottom;
        }
      }
      class er {
        constructor(t, e) {
          (this.from = t), (this.to = e);
        }
      }
      function ir(t, e, i) {
        let n = [],
          s = t,
          r = 0;
        return (
          Ht.spans(
            i,
            t,
            e,
            {
              span() {},
              point(t, e) {
                t > s && (n.push({ from: s, to: t }), (r += t - s)), (s = e);
              },
            },
            20,
          ),
          s < e && (n.push({ from: s, to: e }), (r += e - s)),
          { total: r, ranges: n }
        );
      }
      function nr({ total: t, ranges: e }, i) {
        if (i <= 0) return e[0].from;
        if (i >= 1) return e[e.length - 1].to;
        let n = Math.floor(t * i);
        for (let s = 0; ; s++) {
          let { from: t, to: i } = e[s],
            r = i - t;
          if (n <= r) return t + n;
          n -= r;
        }
      }
      function sr(t, e) {
        let i = 0;
        for (let { from: n, to: s } of t.ranges) {
          if (e <= s) {
            i += e - n;
            break;
          }
          i += s - n;
        }
        return i / t.total;
      }
      function rr(t, e) {
        for (let i of t) if (e(i)) return i;
      }
      const or = {
        toDOM(t) {
          return t;
        },
        fromDOM(t) {
          return t;
        },
        scale: 1,
      };
      class lr {
        constructor(t, e, i) {
          let n = 0,
            s = 0,
            r = 0;
          (this.viewports = i.map(({ from: i, to: s }) => {
            let r = e.lineAt(i, Ws.ByPos, t, 0, 0).top,
              o = e.lineAt(s, Ws.ByPos, t, 0, 0).bottom;
            return (
              (n += o - r),
              { from: i, to: s, top: r, bottom: o, domTop: 0, domBottom: 0 }
            );
          })),
            (this.scale = (7e6 - n) / (e.height - n));
          for (let o of this.viewports)
            (o.domTop = r + (o.top - s) * this.scale),
              (r = o.domBottom = o.domTop + (o.bottom - o.top)),
              (s = o.bottom);
        }
        toDOM(t) {
          for (let e = 0, i = 0, n = 0; ; e++) {
            let s = e < this.viewports.length ? this.viewports[e] : null;
            if (!s || t < s.top) return n + (t - i) * this.scale;
            if (t <= s.bottom) return s.domTop + (t - s.top);
            (i = s.bottom), (n = s.domBottom);
          }
        }
        fromDOM(t) {
          for (let e = 0, i = 0, n = 0; ; e++) {
            let s = e < this.viewports.length ? this.viewports[e] : null;
            if (!s || t < s.domTop) return i + (t - n) / this.scale;
            if (t <= s.domBottom) return s.top + (t - s.domTop);
            (i = s.bottom), (n = s.domBottom);
          }
        }
      }
      function ar(t, e) {
        if (1 == e.scale) return t;
        let i = e.toDOM(t.top),
          n = e.toDOM(t.bottom);
        return new Hs(
          t.from,
          t.length,
          i,
          n - i,
          t.children && t.children.map((t) => ar(t, e)),
          t.deco,
        );
      }
      const hr = q.define({ combine: (t) => t.join(' ') }),
        cr = q.define({ combine: (t) => t.indexOf(!0) > -1 }),
        ur = ie.newName(),
        dr = ie.newName(),
        fr = ie.newName(),
        pr = { '&light': '.' + dr, '&dark': '.' + fr };
      function mr(t, e, i) {
        return new ie(e, {
          finish(e) {
            return /&/.test(e)
              ? e.replace(/&\w*/, (e) => {
                  if ('&' == e) return t;
                  if (!i || !i[e])
                    throw new RangeError(`Unsupported selector: ${e}`);
                  return i[e];
                })
              : t + ' ' + e;
          },
        });
      }
      const gr = mr(
        '.' + ur,
        {
          '&': {
            position: 'relative !important',
            boxSizing: 'border-box',
            '&.cm-focused': { outline: '1px dotted #212121' },
            display: 'flex !important',
            flexDirection: 'column',
          },
          '.cm-scroller': {
            display: 'flex !important',
            alignItems: 'flex-start !important',
            fontFamily: 'monospace',
            lineHeight: 1.4,
            height: '100%',
            overflowX: 'auto',
            position: 'relative',
            zIndex: 0,
          },
          '.cm-content': {
            margin: 0,
            flexGrow: 2,
            flexShrink: 0,
            display: 'block',
            whiteSpace: 'pre',
            wordWrap: 'normal',
            boxSizing: 'border-box',
            padding: '4px 0',
            outline: 'none',
            '&[contenteditable=true]': {
              WebkitUserModify: 'read-write-plaintext-only',
            },
          },
          '.cm-lineWrapping': {
            whiteSpace_fallback: 'pre-wrap',
            whiteSpace: 'break-spaces',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
            flexShrink: 1,
          },
          '&light .cm-content': { caretColor: 'black' },
          '&dark .cm-content': { caretColor: 'white' },
          '.cm-line': { display: 'block', padding: '0 2px 0 6px' },
          '.cm-layer': {
            position: 'absolute',
            left: 0,
            top: 0,
            contain: 'size style',
            '& > *': { position: 'absolute' },
          },
          '&light .cm-selectionBackground': { background: '#d9d9d9' },
          '&dark .cm-selectionBackground': { background: '#222' },
          '&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground':
            { background: '#d7d4f0' },
          '&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground':
            { background: '#233' },
          '.cm-cursorLayer': { pointerEvents: 'none' },
          '&.cm-focused > .cm-scroller > .cm-cursorLayer': {
            animation: 'steps(1) cm-blink 1.2s infinite',
          },
          '@keyframes cm-blink': {
            '0%': {},
            '50%': { opacity: 0 },
            '100%': {},
          },
          '@keyframes cm-blink2': {
            '0%': {},
            '50%': { opacity: 0 },
            '100%': {},
          },
          '.cm-cursor, .cm-dropCursor': {
            borderLeft: '1.2px solid black',
            marginLeft: '-0.6px',
            pointerEvents: 'none',
          },
          '.cm-cursor': { display: 'none' },
          '&dark .cm-cursor': { borderLeftColor: '#444' },
          '.cm-dropCursor': { position: 'absolute' },
          '&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor': {
            display: 'block',
          },
          '&light .cm-activeLine': { backgroundColor: '#cceeff44' },
          '&dark .cm-activeLine': { backgroundColor: '#99eeff33' },
          '&light .cm-specialChar': { color: 'red' },
          '&dark .cm-specialChar': { color: '#f78' },
          '.cm-gutters': {
            flexShrink: 0,
            display: 'flex',
            height: '100%',
            boxSizing: 'border-box',
            left: 0,
            zIndex: 200,
          },
          '&light .cm-gutters': {
            backgroundColor: '#f5f5f5',
            color: '#6c6c6c',
            borderRight: '1px solid #ddd',
          },
          '&dark .cm-gutters': { backgroundColor: '#333338', color: '#ccc' },
          '.cm-gutter': {
            display: 'flex !important',
            flexDirection: 'column',
            flexShrink: 0,
            boxSizing: 'border-box',
            minHeight: '100%',
            overflow: 'hidden',
          },
          '.cm-gutterElement': { boxSizing: 'border-box' },
          '.cm-lineNumbers .cm-gutterElement': {
            padding: '0 3px 0 5px',
            minWidth: '20px',
            textAlign: 'right',
            whiteSpace: 'nowrap',
          },
          '&light .cm-activeLineGutter': { backgroundColor: '#e2f2ff' },
          '&dark .cm-activeLineGutter': { backgroundColor: '#222227' },
          '.cm-panels': {
            boxSizing: 'border-box',
            position: 'sticky',
            left: 0,
            right: 0,
          },
          '&light .cm-panels': { backgroundColor: '#f5f5f5', color: 'black' },
          '&light .cm-panels-top': { borderBottom: '1px solid #ddd' },
          '&light .cm-panels-bottom': { borderTop: '1px solid #ddd' },
          '&dark .cm-panels': { backgroundColor: '#333338', color: 'white' },
          '.cm-tab': {
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
          },
          '.cm-widgetBuffer': {
            verticalAlign: 'text-top',
            height: '1em',
            width: 0,
            display: 'inline',
          },
          '.cm-placeholder': {
            color: '#888',
            display: 'inline-block',
            verticalAlign: 'top',
          },
          '.cm-highlightSpace:before': {
            content: 'attr(data-display)',
            position: 'absolute',
            pointerEvents: 'none',
            color: '#888',
          },
          '.cm-highlightTab': {
            backgroundImage:
              'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>\')',
            backgroundSize: 'auto 100%',
            backgroundPosition: 'right 90%',
            backgroundRepeat: 'no-repeat',
          },
          '.cm-trailingSpace': { backgroundColor: '#ff332255' },
          '.cm-button': {
            verticalAlign: 'middle',
            color: 'inherit',
            fontSize: '70%',
            padding: '.2em 1em',
            borderRadius: '1px',
          },
          '&light .cm-button': {
            backgroundImage: 'linear-gradient(#eff1f5, #d9d9df)',
            border: '1px solid #888',
            '&:active': {
              backgroundImage: 'linear-gradient(#b4b4b4, #d0d3d6)',
            },
          },
          '&dark .cm-button': {
            backgroundImage: 'linear-gradient(#393939, #111)',
            border: '1px solid #888',
            '&:active': { backgroundImage: 'linear-gradient(#111, #333)' },
          },
          '.cm-textfield': {
            verticalAlign: 'middle',
            color: 'inherit',
            fontSize: '70%',
            border: '1px solid silver',
            padding: '.2em .5em',
          },
          '&light .cm-textfield': { backgroundColor: 'white' },
          '&dark .cm-textfield': {
            border: '1px solid #555',
            backgroundColor: 'inherit',
          },
        },
        pr,
      );
      class vr {
        constructor(t, e, i, n) {
          (this.typeOver = n), (this.bounds = null), (this.text = '');
          let { impreciseHead: s, impreciseAnchor: r } = t.docView;
          if (t.state.readOnly && e > -1) this.newSel = null;
          else if (
            e > -1 &&
            (this.bounds = t.docView.domBoundsAround(e, i, 0))
          ) {
            let e = s || r ? [] : br(t),
              i = new kn(e, t.state);
            i.readRange(this.bounds.startDOM, this.bounds.endDOM),
              (this.text = i.text),
              (this.newSel = xr(e, this.bounds.from));
          } else {
            let e = t.observer.selectionRange,
              i =
                (s && s.node == e.focusNode && s.offset == e.focusOffset) ||
                !me(t.contentDOM, e.focusNode)
                  ? t.state.selection.main.head
                  : t.docView.posFromDOM(e.focusNode, e.focusOffset),
              n =
                (r && r.node == e.anchorNode && r.offset == e.anchorOffset) ||
                !me(t.contentDOM, e.anchorNode)
                  ? t.state.selection.main.anchor
                  : t.docView.posFromDOM(e.anchorNode, e.anchorOffset);
            this.newSel = V.single(n, i);
          }
        }
      }
      function wr(t, e) {
        let i,
          { newSel: n } = e,
          s = t.state.selection.main;
        if (e.bounds) {
          let { from: n, to: r } = e.bounds,
            l = s.from,
            a = null;
          ((8 === t.inputState.lastKeyCode &&
            t.inputState.lastKeyTime > Date.now() - 100) ||
            (ti.android && e.text.length < r - n)) &&
            ((l = s.to), (a = 'end'));
          let h = yr(t.state.doc.sliceString(n, r, xn), e.text, l - n, a);
          h &&
            (ti.chrome &&
              13 == t.inputState.lastKeyCode &&
              h.toB == h.from + 2 &&
              e.text.slice(h.from, h.toB) == xn + xn &&
              h.toB--,
            (i = {
              from: n + h.from,
              to: n + h.toA,
              insert: o.of(e.text.slice(h.from, h.toB).split(xn)),
            }));
        } else
          n &&
            ((!t.hasFocus && t.state.facet(Ki)) || n.main.eq(s)) &&
            (n = null);
        if (!i && !n) return !1;
        if (
          (!i && e.typeOver && !s.empty && n && n.main.empty
            ? (i = {
                from: s.from,
                to: s.to,
                insert: t.state.doc.slice(s.from, s.to),
              })
            : i &&
              i.from >= s.from &&
              i.to <= s.to &&
              (i.from != s.from || i.to != s.to) &&
              s.to - s.from - (i.to - i.from) <= 4
            ? (i = {
                from: s.from,
                to: s.to,
                insert: t.state.doc
                  .slice(s.from, i.from)
                  .append(i.insert)
                  .append(t.state.doc.slice(i.to, s.to)),
              })
            : (ti.mac || ti.android) &&
              i &&
              i.from == i.to &&
              i.from == s.head - 1 &&
              /^\. ?$/.test(i.insert.toString()) &&
              'off' == t.contentDOM.getAttribute('autocorrect')
            ? (n &&
                2 == i.insert.length &&
                (n = V.single(n.main.anchor - 1, n.main.head - 1)),
              (i = { from: s.from, to: s.to, insert: o.of([' ']) }))
            : ti.chrome &&
              i &&
              i.from == i.to &&
              i.from == s.head &&
              '\n ' == i.insert.toString() &&
              t.lineWrapping &&
              (n && (n = V.single(n.main.anchor - 1, n.main.head - 1)),
              (i = { from: s.from, to: s.to, insert: o.of([' ']) })),
          i)
        ) {
          let e = t.state;
          if (ti.ios && t.inputState.flushIOSKey(t)) return !0;
          if (
            ti.android &&
            ((i.from == s.from &&
              i.to == s.to &&
              1 == i.insert.length &&
              2 == i.insert.lines &&
              Be(t.contentDOM, 'Enter', 13)) ||
              (i.from == s.from - 1 &&
                i.to == s.to &&
                0 == i.insert.length &&
                Be(t.contentDOM, 'Backspace', 8)) ||
              (i.from == s.from &&
                i.to == s.to + 1 &&
                0 == i.insert.length &&
                Be(t.contentDOM, 'Delete', 46)))
          )
            return !0;
          let r,
            o = i.insert.toString();
          if (t.state.facet(Wi).some((e) => e(t, i.from, i.to, o))) return !0;
          if (
            (t.inputState.composing >= 0 && t.inputState.composing++,
            i.from >= s.from &&
              i.to <= s.to &&
              i.to - i.from >= (s.to - s.from) / 3 &&
              (!n ||
                (n.main.empty && n.main.from == i.from + i.insert.length)) &&
              t.inputState.composing < 0)
          ) {
            let n = s.from < i.from ? e.sliceDoc(s.from, i.from) : '',
              o = s.to > i.to ? e.sliceDoc(i.to, s.to) : '';
            r = e.replaceSelection(
              t.state.toText(
                n + i.insert.sliceString(0, void 0, t.state.lineBreak) + o,
              ),
            );
          } else {
            let o = e.changes(i),
              l = n && n.main.to <= o.newLength ? n.main : void 0;
            if (
              e.selection.ranges.length > 1 &&
              t.inputState.composing >= 0 &&
              i.to <= s.to &&
              i.to >= s.to - 10
            ) {
              let n = t.state.sliceDoc(i.from, i.to),
                a = Dn(t) || t.state.doc.lineAt(s.head),
                h = s.to - i.to,
                c = s.to - s.from;
              r = e.changeByRange((r) => {
                if (r.from == s.from && r.to == s.to)
                  return { changes: o, range: l || r.map(o) };
                let u = r.to - h,
                  d = u - n.length;
                if (
                  r.to - r.from != c ||
                  t.state.sliceDoc(d, u) != n ||
                  (a && r.to >= a.from && r.from <= a.to)
                )
                  return { range: r };
                let f = e.changes({ from: d, to: u, insert: i.insert }),
                  p = r.to - s.to;
                return {
                  changes: f,
                  range: l
                    ? V.range(
                        Math.max(0, l.anchor + p),
                        Math.max(0, l.head + p),
                      )
                    : r.map(f),
                };
              });
            } else
              r = { changes: o, selection: l && e.selection.replaceRange(l) };
          }
          let l = 'input.type';
          return (
            (t.composing ||
              (t.inputState.compositionPendingChange &&
                t.inputState.compositionEndedAt > Date.now() - 50)) &&
              ((t.inputState.compositionPendingChange = !1),
              (l += '.compose'),
              t.inputState.compositionFirstChange &&
                ((l += '.start'), (t.inputState.compositionFirstChange = !1))),
            t.dispatch(r, { scrollIntoView: !0, userEvent: l }),
            !0
          );
        }
        if (n && !n.main.eq(s)) {
          let e = !1,
            i = 'select';
          return (
            t.inputState.lastSelectionTime > Date.now() - 50 &&
              ('select' == t.inputState.lastSelectionOrigin && (e = !0),
              (i = t.inputState.lastSelectionOrigin)),
            t.dispatch({ selection: n, scrollIntoView: e, userEvent: i }),
            !0
          );
        }
        return !1;
      }
      function yr(t, e, i, n) {
        let s = Math.min(t.length, e.length),
          r = 0;
        while (r < s && t.charCodeAt(r) == e.charCodeAt(r)) r++;
        if (r == s && t.length == e.length) return null;
        let o = t.length,
          l = e.length;
        while (o > 0 && l > 0 && t.charCodeAt(o - 1) == e.charCodeAt(l - 1))
          o--, l--;
        if ('end' == n) {
          let t = Math.max(0, r - Math.min(o, l));
          i -= o + t - r;
        }
        if (o < r && t.length < e.length) {
          let t = i <= r && i >= o ? r - i : 0;
          (r -= t), (l = r + (l - o)), (o = r);
        } else if (l < r) {
          let t = i <= r && i >= l ? r - i : 0;
          (r -= t), (o = r + (o - l)), (l = r);
        }
        return { from: r, toA: o, toB: l };
      }
      function br(t) {
        let e = [];
        if (t.root.activeElement != t.contentDOM) return e;
        let {
          anchorNode: i,
          anchorOffset: n,
          focusNode: s,
          focusOffset: r,
        } = t.observer.selectionRange;
        return (
          i &&
            (e.push(new Cn(i, n)), (s == i && r == n) || e.push(new Cn(s, r))),
          e
        );
      }
      function xr(t, e) {
        if (0 == t.length) return null;
        let i = t[0].pos,
          n = 2 == t.length ? t[1].pos : i;
        return i > -1 && n > -1 ? V.single(i + e, n + e) : null;
      }
      const kr = {
          childList: !0,
          characterData: !0,
          subtree: !0,
          attributes: !0,
          characterDataOldValue: !0,
        },
        Sr = ti.ie && ti.ie_version <= 11;
      class Cr {
        constructor(t) {
          (this.view = t),
            (this.active = !1),
            (this.selectionRange = new Oe()),
            (this.selectionChanged = !1),
            (this.delayedFlush = -1),
            (this.resizeTimeout = -1),
            (this.queue = []),
            (this.delayedAndroidKey = null),
            (this.flushingAndroidKey = -1),
            (this.lastChange = 0),
            (this.scrollTargets = []),
            (this.intersection = null),
            (this.resizeScroll = null),
            (this.resizeContent = null),
            (this.intersecting = !1),
            (this.gapIntersection = null),
            (this.gaps = []),
            (this.parentCheck = -1),
            (this.dom = t.contentDOM),
            (this.observer = new MutationObserver((e) => {
              for (let t of e) this.queue.push(t);
              ((ti.ie && ti.ie_version <= 11) || (ti.ios && t.composing)) &&
              e.some(
                (t) =>
                  ('childList' == t.type && t.removedNodes.length) ||
                  ('characterData' == t.type &&
                    t.oldValue.length > t.target.nodeValue.length),
              )
                ? this.flushSoon()
                : this.flush();
            })),
            Sr &&
              (this.onCharData = (t) => {
                this.queue.push({
                  target: t.target,
                  type: 'characterData',
                  oldValue: t.prevValue,
                }),
                  this.flushSoon();
              }),
            (this.onSelectionChange = this.onSelectionChange.bind(this)),
            (this.onResize = this.onResize.bind(this)),
            (this.onPrint = this.onPrint.bind(this)),
            (this.onScroll = this.onScroll.bind(this)),
            'function' == typeof ResizeObserver &&
              ((this.resizeScroll = new ResizeObserver(() => {
                var t;
                (null === (t = this.view.docView) || void 0 === t
                  ? void 0
                  : t.lastUpdate) <
                  Date.now() - 75 && this.onResize();
              })),
              this.resizeScroll.observe(t.scrollDOM),
              (this.resizeContent = new ResizeObserver(() =>
                this.view.requestMeasure(),
              )),
              this.resizeContent.observe(t.contentDOM)),
            this.addWindowListeners((this.win = t.win)),
            this.start(),
            'function' == typeof IntersectionObserver &&
              ((this.intersection = new IntersectionObserver(
                (t) => {
                  this.parentCheck < 0 &&
                    (this.parentCheck = setTimeout(
                      this.listenForScroll.bind(this),
                      1e3,
                    )),
                    t.length > 0 &&
                      t[t.length - 1].intersectionRatio > 0 !=
                        this.intersecting &&
                      ((this.intersecting = !this.intersecting),
                      this.intersecting != this.view.inView &&
                        this.onScrollChanged(document.createEvent('Event')));
                },
                { threshold: [0, 0.001] },
              )),
              this.intersection.observe(this.dom),
              (this.gapIntersection = new IntersectionObserver((t) => {
                t.length > 0 &&
                  t[t.length - 1].intersectionRatio > 0 &&
                  this.onScrollChanged(document.createEvent('Event'));
              }, {}))),
            this.listenForScroll(),
            this.readSelectionRange();
        }
        onScrollChanged(t) {
          this.view.inputState.runScrollHandlers(this.view, t),
            this.intersecting && this.view.measure();
        }
        onScroll(t) {
          this.intersecting && this.flush(!1), this.onScrollChanged(t);
        }
        onResize() {
          this.resizeTimeout < 0 &&
            (this.resizeTimeout = setTimeout(() => {
              (this.resizeTimeout = -1), this.view.requestMeasure();
            }, 50));
        }
        onPrint() {
          (this.view.viewState.printing = !0),
            this.view.measure(),
            setTimeout(() => {
              (this.view.viewState.printing = !1), this.view.requestMeasure();
            }, 500);
        }
        updateGaps(t) {
          if (
            this.gapIntersection &&
            (t.length != this.gaps.length ||
              this.gaps.some((e, i) => e != t[i]))
          ) {
            this.gapIntersection.disconnect();
            for (let e of t) this.gapIntersection.observe(e);
            this.gaps = t;
          }
        }
        onSelectionChange(t) {
          let e = this.selectionChanged;
          if (!this.readSelectionRange() || this.delayedAndroidKey) return;
          let { view: i } = this,
            n = this.selectionRange;
          if (
            i.state.facet(Ki) ? i.root.activeElement != this.dom : !ve(i.dom, n)
          )
            return;
          let s = n.anchorNode && i.docView.nearest(n.anchorNode);
          s && s.ignoreEvent(t)
            ? e || (this.selectionChanged = !1)
            : ((ti.ie && ti.ie_version <= 11) || (ti.android && ti.chrome)) &&
              !i.state.selection.main.empty &&
              n.focusNode &&
              ye(n.focusNode, n.focusOffset, n.anchorNode, n.anchorOffset)
            ? this.flushSoon()
            : this.flush(!1);
        }
        readSelectionRange() {
          let { view: t } = this,
            e =
              (ti.safari &&
                11 == t.root.nodeType &&
                ge(this.dom.ownerDocument) == this.dom &&
                Ar(this.view)) ||
              pe(t.root);
          if (!e || this.selectionRange.eq(e)) return !1;
          let i = ve(this.dom, e);
          return i &&
            !this.selectionChanged &&
            t.inputState.lastFocusTime > Date.now() - 200 &&
            t.inputState.lastTouchTime < Date.now() - 300 &&
            Pe(this.dom, e)
            ? ((this.view.inputState.lastFocusTime = 0),
              t.docView.updateSelection(),
              !1)
            : (this.selectionRange.setRange(e),
              i && (this.selectionChanged = !0),
              !0);
        }
        setSelectionRange(t, e) {
          this.selectionRange.set(t.node, t.offset, e.node, e.offset),
            (this.selectionChanged = !1);
        }
        clearSelectionRange() {
          this.selectionRange.set(null, 0, null, 0);
        }
        listenForScroll() {
          this.parentCheck = -1;
          let t = 0,
            e = null;
          for (let i = this.dom; i; )
            if (1 == i.nodeType)
              !e && t < this.scrollTargets.length && this.scrollTargets[t] == i
                ? t++
                : e || (e = this.scrollTargets.slice(0, t)),
                e && e.push(i),
                (i = i.assignedSlot || i.parentNode);
            else {
              if (11 != i.nodeType) break;
              i = i.host;
            }
          if (
            (t < this.scrollTargets.length &&
              !e &&
              (e = this.scrollTargets.slice(0, t)),
            e)
          ) {
            for (let t of this.scrollTargets)
              t.removeEventListener('scroll', this.onScroll);
            for (let t of (this.scrollTargets = e))
              t.addEventListener('scroll', this.onScroll);
          }
        }
        ignore(t) {
          if (!this.active) return t();
          try {
            return this.stop(), t();
          } finally {
            this.start(), this.clear();
          }
        }
        start() {
          this.active ||
            (this.observer.observe(this.dom, kr),
            Sr &&
              this.dom.addEventListener(
                'DOMCharacterDataModified',
                this.onCharData,
              ),
            (this.active = !0));
        }
        stop() {
          this.active &&
            ((this.active = !1),
            this.observer.disconnect(),
            Sr &&
              this.dom.removeEventListener(
                'DOMCharacterDataModified',
                this.onCharData,
              ));
        }
        clear() {
          this.processRecords(),
            (this.queue.length = 0),
            (this.selectionChanged = !1);
        }
        delayAndroidKey(t, e) {
          var i;
          if (!this.delayedAndroidKey) {
            let t = () => {
              let t = this.delayedAndroidKey;
              t &&
                (this.clearDelayedAndroidKey(),
                !this.flush() && t.force && Be(this.dom, t.key, t.keyCode));
            };
            this.flushingAndroidKey = this.view.win.requestAnimationFrame(t);
          }
          (this.delayedAndroidKey && 'Enter' != t) ||
            (this.delayedAndroidKey = {
              key: t,
              keyCode: e,
              force:
                this.lastChange < Date.now() - 50 ||
                !!(null === (i = this.delayedAndroidKey) || void 0 === i
                  ? void 0
                  : i.force),
            });
        }
        clearDelayedAndroidKey() {
          this.win.cancelAnimationFrame(this.flushingAndroidKey),
            (this.delayedAndroidKey = null),
            (this.flushingAndroidKey = -1);
        }
        flushSoon() {
          this.delayedFlush < 0 &&
            (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
              (this.delayedFlush = -1), this.flush();
            }));
        }
        forceFlush() {
          this.delayedFlush >= 0 &&
            (this.view.win.cancelAnimationFrame(this.delayedFlush),
            (this.delayedFlush = -1)),
            this.flush();
        }
        pendingRecords() {
          for (let t of this.observer.takeRecords()) this.queue.push(t);
          return this.queue;
        }
        processRecords() {
          let t = this.pendingRecords();
          t.length && (this.queue = []);
          let e = -1,
            i = -1,
            n = !1;
          for (let s of t) {
            let t = this.readMutation(s);
            t &&
              (t.typeOver && (n = !0),
              -1 == e
                ? ({ from: e, to: i } = t)
                : ((e = Math.min(t.from, e)), (i = Math.max(t.to, i))));
          }
          return { from: e, to: i, typeOver: n };
        }
        readChange() {
          let { from: t, to: e, typeOver: i } = this.processRecords(),
            n = this.selectionChanged && ve(this.dom, this.selectionRange);
          return t < 0 && !n
            ? null
            : (t > -1 && (this.lastChange = Date.now()),
              (this.view.inputState.lastFocusTime = 0),
              (this.selectionChanged = !1),
              new vr(this.view, t, e, i));
        }
        flush(t = !0) {
          if (this.delayedFlush >= 0 || this.delayedAndroidKey) return !1;
          t && this.readSelectionRange();
          let e = this.readChange();
          if (!e) return !1;
          let i = this.view.state,
            n = wr(this.view, e);
          return this.view.state == i && this.view.update([]), n;
        }
        readMutation(t) {
          let e = this.view.docView.nearest(t.target);
          if (!e || e.ignoreMutation(t)) return null;
          if (
            (e.markDirty('attributes' == t.type),
            'attributes' == t.type && (e.dirty |= 4),
            'childList' == t.type)
          ) {
            let i = Mr(e, t.previousSibling || t.target.previousSibling, -1),
              n = Mr(e, t.nextSibling || t.target.nextSibling, 1);
            return {
              from: i ? e.posAfter(i) : e.posAtStart,
              to: n ? e.posBefore(n) : e.posAtEnd,
              typeOver: !1,
            };
          }
          return 'characterData' == t.type
            ? {
                from: e.posAtStart,
                to: e.posAtEnd,
                typeOver: t.target.nodeValue == t.oldValue,
              }
            : null;
        }
        setWindow(t) {
          t != this.win &&
            (this.removeWindowListeners(this.win),
            (this.win = t),
            this.addWindowListeners(this.win));
        }
        addWindowListeners(t) {
          t.addEventListener('resize', this.onResize),
            t.addEventListener('beforeprint', this.onPrint),
            t.addEventListener('scroll', this.onScroll),
            t.document.addEventListener(
              'selectionchange',
              this.onSelectionChange,
            );
        }
        removeWindowListeners(t) {
          t.removeEventListener('scroll', this.onScroll),
            t.removeEventListener('resize', this.onResize),
            t.removeEventListener('beforeprint', this.onPrint),
            t.document.removeEventListener(
              'selectionchange',
              this.onSelectionChange,
            );
        }
        destroy() {
          var t, e, i, n;
          this.stop(),
            null === (t = this.intersection) || void 0 === t || t.disconnect(),
            null === (e = this.gapIntersection) ||
              void 0 === e ||
              e.disconnect(),
            null === (i = this.resizeScroll) || void 0 === i || i.disconnect(),
            null === (n = this.resizeContent) || void 0 === n || n.disconnect();
          for (let s of this.scrollTargets)
            s.removeEventListener('scroll', this.onScroll);
          this.removeWindowListeners(this.win),
            clearTimeout(this.parentCheck),
            clearTimeout(this.resizeTimeout),
            this.win.cancelAnimationFrame(this.delayedFlush),
            this.win.cancelAnimationFrame(this.flushingAndroidKey);
        }
      }
      function Mr(t, e, i) {
        while (e) {
          let n = We.get(e);
          if (n && n.parent == t) return n;
          let s = e.parentNode;
          e = s != t.dom ? s : i > 0 ? e.nextSibling : e.previousSibling;
        }
        return null;
      }
      function Ar(t) {
        let e = null;
        function i(t) {
          t.preventDefault(),
            t.stopImmediatePropagation(),
            (e = t.getTargetRanges()[0]);
        }
        if (
          (t.contentDOM.addEventListener('beforeinput', i, !0),
          t.dom.ownerDocument.execCommand('indent'),
          t.contentDOM.removeEventListener('beforeinput', i, !0),
          !e)
        )
          return null;
        let n = e.startContainer,
          s = e.startOffset,
          r = e.endContainer,
          o = e.endOffset,
          l = t.docView.domAtPos(t.state.selection.main.anchor);
        return (
          ye(l.node, l.offset, r, o) && ([n, s, r, o] = [r, o, n, s]),
          { anchorNode: n, anchorOffset: s, focusNode: r, focusOffset: o }
        );
      }
      class Or {
        constructor(t = {}) {
          (this.plugins = []),
            (this.pluginMap = new Map()),
            (this.editorAttrs = {}),
            (this.contentAttrs = {}),
            (this.bidiCache = []),
            (this.destroyed = !1),
            (this.updateState = 2),
            (this.measureScheduled = -1),
            (this.measureRequests = []),
            (this.contentDOM = document.createElement('div')),
            (this.scrollDOM = document.createElement('div')),
            (this.scrollDOM.tabIndex = -1),
            (this.scrollDOM.className = 'cm-scroller'),
            this.scrollDOM.appendChild(this.contentDOM),
            (this.announceDOM = document.createElement('div')),
            (this.announceDOM.style.cssText = 'position: fixed; top: -10000px'),
            this.announceDOM.setAttribute('aria-live', 'polite'),
            (this.dom = document.createElement('div')),
            this.dom.appendChild(this.announceDOM),
            this.dom.appendChild(this.scrollDOM),
            (this._dispatch = t.dispatch || ((t) => this.update([t]))),
            (this.dispatch = this.dispatch.bind(this)),
            (this._root = t.root || Le(t.parent) || document),
            (this.viewState = new tr(t.state || Rt.create(t))),
            (this.plugins = this.state.facet(Ui).map((t) => new Ji(t)));
          for (let e of this.plugins) e.update(this);
          (this.observer = new Cr(this)),
            (this.inputState = new Qn(this)),
            this.inputState.ensureHandlers(this, this.plugins),
            (this.docView = new Mn(this)),
            this.mountStyles(),
            this.updateAttrs(),
            (this.updateState = 0),
            this.requestMeasure(),
            t.parent && t.parent.appendChild(this.dom);
        }
        get state() {
          return this.viewState.state;
        }
        get viewport() {
          return this.viewState.viewport;
        }
        get visibleRanges() {
          return this.viewState.visibleRanges;
        }
        get inView() {
          return this.viewState.inView;
        }
        get composing() {
          return this.inputState.composing > 0;
        }
        get compositionStarted() {
          return this.inputState.composing >= 0;
        }
        get root() {
          return this._root;
        }
        get win() {
          return this.dom.ownerDocument.defaultView || window;
        }
        dispatch(...t) {
          this._dispatch(
            1 == t.length && t[0] instanceof vt
              ? t[0]
              : this.state.update(...t),
          );
        }
        update(t) {
          if (0 != this.updateState)
            throw new Error(
              'Calls to EditorView.update are not allowed while an update is in progress',
            );
          let e,
            i = !1,
            n = !1,
            s = this.state;
          for (let u of t) {
            if (u.startState != s)
              throw new RangeError(
                "Trying to update state with a transaction that doesn't start from the previous state.",
              );
            s = u.state;
          }
          if (this.destroyed) return void (this.viewState.state = s);
          let r = this.hasFocus,
            o = 0,
            l = null;
          t.some((t) => t.annotation(Rs))
            ? ((this.inputState.notifiedFocused = r), (o = 1))
            : r != this.inputState.notifiedFocused &&
              ((this.inputState.notifiedFocused = r),
              (l = Bs(s, r)),
              l || (o = 1));
          let a = this.observer.delayedAndroidKey,
            h = null;
          if (
            (a
              ? (this.observer.clearDelayedAndroidKey(),
                (h = this.observer.readChange()),
                ((h && !this.state.doc.eq(s.doc)) ||
                  !this.state.selection.eq(s.selection)) &&
                  (h = null))
              : this.observer.clear(),
            s.facet(Rt.phrases) != this.state.facet(Rt.phrases))
          )
            return this.setState(s);
          (e = sn.create(this, s, t)), (e.flags |= o);
          let c = this.viewState.scrollTarget;
          try {
            this.updateState = 2;
            for (let e of t) {
              if ((c && (c = c.map(e.changes)), e.scrollIntoView)) {
                let { main: t } = e.state.selection;
                c = new qi(
                  t.empty ? t : V.cursor(t.head, t.head > t.anchor ? -1 : 1),
                );
              }
              for (let t of e.effects) t.is(ji) && (c = t.value);
            }
            this.viewState.update(e, c),
              (this.bidiCache = Er.update(this.bidiCache, e.changes)),
              e.empty || (this.updatePlugins(e), this.inputState.update(e)),
              (i = this.docView.update(e)),
              this.state.facet(en) != this.styleModules && this.mountStyles(),
              (n = this.updateAttrs()),
              this.showAnnouncements(t),
              this.docView.updateSelection(
                i,
                t.some((t) => t.isUserEvent('select.pointer')),
              );
          } finally {
            this.updateState = 0;
          }
          if (
            (e.startState.facet(hr) != e.state.facet(hr) &&
              (this.viewState.mustMeasureContent = !0),
            (i ||
              n ||
              c ||
              this.viewState.mustEnforceCursorAssoc ||
              this.viewState.mustMeasureContent) &&
              this.requestMeasure(),
            !e.empty)
          )
            for (let u of this.state.facet(Hi)) u(e);
          (l || h) &&
            Promise.resolve().then(() => {
              l && this.state == l.startState && this.dispatch(l),
                h &&
                  !wr(this, h) &&
                  a.force &&
                  Be(this.contentDOM, a.key, a.keyCode);
            });
        }
        setState(t) {
          if (0 != this.updateState)
            throw new Error(
              'Calls to EditorView.setState are not allowed while an update is in progress',
            );
          if (this.destroyed) return void (this.viewState.state = t);
          this.updateState = 2;
          let e = this.hasFocus;
          try {
            for (let t of this.plugins) t.destroy(this);
            (this.viewState = new tr(t)),
              (this.plugins = t.facet(Ui).map((t) => new Ji(t))),
              this.pluginMap.clear();
            for (let t of this.plugins) t.update(this);
            (this.docView = new Mn(this)),
              this.inputState.ensureHandlers(this, this.plugins),
              this.mountStyles(),
              this.updateAttrs(),
              (this.bidiCache = []);
          } finally {
            this.updateState = 0;
          }
          e && this.focus(), this.requestMeasure();
        }
        updatePlugins(t) {
          let e = t.startState.facet(Ui),
            i = t.state.facet(Ui);
          if (e != i) {
            let n = [];
            for (let s of i) {
              let i = e.indexOf(s);
              if (i < 0) n.push(new Ji(s));
              else {
                let e = this.plugins[i];
                (e.mustUpdate = t), n.push(e);
              }
            }
            for (let e of this.plugins) e.mustUpdate != t && e.destroy(this);
            (this.plugins = n),
              this.pluginMap.clear(),
              this.inputState.ensureHandlers(this, this.plugins);
          } else for (let n of this.plugins) n.mustUpdate = t;
          for (let n = 0; n < this.plugins.length; n++)
            this.plugins[n].update(this);
        }
        measure(t = !0) {
          if (this.destroyed) return;
          this.measureScheduled > -1 &&
            this.win.cancelAnimationFrame(this.measureScheduled),
            (this.measureScheduled = 0),
            t && this.observer.forceFlush();
          let e = null,
            { scrollHeight: i, scrollTop: n, clientHeight: s } = this.scrollDOM,
            r = n > i - s - 4 ? i : n;
          try {
            for (let t = 0; ; t++) {
              this.updateState = 1;
              let i = this.viewport,
                n = this.viewState.lineBlockAtHeight(r),
                s = this.viewState.measure(this);
              if (
                !s &&
                !this.measureRequests.length &&
                null == this.viewState.scrollTarget
              )
                break;
              if (t > 5) {
                console.warn(
                  this.measureRequests.length
                    ? 'Measure loop restarted more than 5 times'
                    : 'Viewport failed to stabilize',
                );
                break;
              }
              let l = [];
              4 & s || ([this.measureRequests, l] = [l, this.measureRequests]);
              let a = l.map((t) => {
                  try {
                    return t.read(this);
                  } catch (e) {
                    return _i(this.state, e), Tr;
                  }
                }),
                h = sn.create(this, this.state, []),
                c = !1,
                u = !1;
              (h.flags |= s),
                e ? (e.flags |= s) : (e = h),
                (this.updateState = 2),
                h.empty ||
                  (this.updatePlugins(h),
                  this.inputState.update(h),
                  this.updateAttrs(),
                  (c = this.docView.update(h)));
              for (let t = 0; t < l.length; t++)
                if (a[t] != Tr)
                  try {
                    let e = l[t];
                    e.write && e.write(a[t], this);
                  } catch (o) {
                    _i(this.state, o);
                  }
              if (this.viewState.editorHeight)
                if (this.viewState.scrollTarget)
                  this.docView.scrollIntoView(this.viewState.scrollTarget),
                    (this.viewState.scrollTarget = null),
                    (u = !0);
                else {
                  let t = this.viewState.lineBlockAt(n.from).top - n.top;
                  (t > 1 || t < -1) &&
                    ((this.scrollDOM.scrollTop += t), (u = !0));
                }
              if (
                (c && this.docView.updateSelection(!0),
                this.viewport.from == i.from &&
                  this.viewport.to == i.to &&
                  !u &&
                  0 == this.measureRequests.length)
              )
                break;
            }
          } finally {
            (this.updateState = 0), (this.measureScheduled = -1);
          }
          if (e && !e.empty) for (let l of this.state.facet(Hi)) l(e);
        }
        get themeClasses() {
          return (
            ur +
            ' ' +
            (this.state.facet(cr) ? fr : dr) +
            ' ' +
            this.state.facet(hr)
          );
        }
        updateAttrs() {
          let t = Rr(this, Yi, {
              class:
                'cm-editor' +
                (this.hasFocus ? ' cm-focused ' : ' ') +
                this.themeClasses,
            }),
            e = {
              spellcheck: 'false',
              autocorrect: 'off',
              autocapitalize: 'off',
              translate: 'no',
              contenteditable: this.state.facet(Ki) ? 'true' : 'false',
              class: 'cm-content',
              style: `${ti.tabSize}: ${this.state.tabSize}`,
              role: 'textbox',
              'aria-multiline': 'true',
            };
          this.state.readOnly && (e['aria-readonly'] = 'true'), Rr(this, Xi, e);
          let i = this.observer.ignore(() => {
            let i = wi(this.contentDOM, this.contentAttrs, e),
              n = wi(this.dom, this.editorAttrs, t);
            return i || n;
          });
          return (this.editorAttrs = t), (this.contentAttrs = e), i;
        }
        showAnnouncements(t) {
          let e = !0;
          for (let i of t)
            for (let t of i.effects)
              if (t.is(Or.announce)) {
                e && (this.announceDOM.textContent = ''), (e = !1);
                let i = this.announceDOM.appendChild(
                  document.createElement('div'),
                );
                i.textContent = t.value;
              }
        }
        mountStyles() {
          (this.styleModules = this.state.facet(en)),
            ie.mount(this.root, this.styleModules.concat(gr).reverse());
        }
        readMeasured() {
          if (2 == this.updateState)
            throw new Error(
              "Reading the editor layout isn't allowed during an update",
            );
          0 == this.updateState &&
            this.measureScheduled > -1 &&
            this.measure(!1);
        }
        requestMeasure(t) {
          if (
            (this.measureScheduled < 0 &&
              (this.measureScheduled = this.win.requestAnimationFrame(() =>
                this.measure(),
              )),
            t)
          ) {
            if (this.measureRequests.indexOf(t) > -1) return;
            if (null != t.key)
              for (let e = 0; e < this.measureRequests.length; e++)
                if (this.measureRequests[e].key === t.key)
                  return void (this.measureRequests[e] = t);
            this.measureRequests.push(t);
          }
        }
        plugin(t) {
          let e = this.pluginMap.get(t);
          return (
            (void 0 === e || (e && e.spec != t)) &&
              this.pluginMap.set(
                t,
                (e = this.plugins.find((e) => e.spec == t) || null),
              ),
            e && e.update(this).value
          );
        }
        get documentTop() {
          return (
            this.contentDOM.getBoundingClientRect().top +
            this.viewState.paddingTop
          );
        }
        get documentPadding() {
          return {
            top: this.viewState.paddingTop,
            bottom: this.viewState.paddingBottom,
          };
        }
        elementAtHeight(t) {
          return this.readMeasured(), this.viewState.elementAtHeight(t);
        }
        lineBlockAtHeight(t) {
          return this.readMeasured(), this.viewState.lineBlockAtHeight(t);
        }
        get viewportLineBlocks() {
          return this.viewState.viewportLines;
        }
        lineBlockAt(t) {
          return this.viewState.lineBlockAt(t);
        }
        get contentHeight() {
          return this.viewState.contentHeight;
        }
        moveByChar(t, e, i) {
          return Zn(this, t, Jn(this, t, e, i));
        }
        moveByGroup(t, e) {
          return Zn(
            this,
            t,
            Jn(this, t, e, (e) => Yn(this, t.head, e)),
          );
        }
        moveToLineBoundary(t, e, i = !0) {
          return Gn(this, t, e, i);
        }
        moveVertically(t, e, i) {
          return Zn(this, t, Xn(this, t, e, i));
        }
        domAtPos(t) {
          return this.docView.domAtPos(t);
        }
        posAtDOM(t, e = 0) {
          return this.docView.posFromDOM(t, e);
        }
        posAtCoords(t, e = !0) {
          return this.readMeasured(), _n(this, t, e);
        }
        coordsAtPos(t, e = 1) {
          this.readMeasured();
          let i = this.docView.coordsAt(t, e);
          if (!i || i.left == i.right) return i;
          let n = this.state.doc.lineAt(t),
            s = this.bidiSpans(n),
            r = s[mn.find(s, t - n.from, -1, e)];
          return Se(i, (r.dir == rn.LTR) == e > 0);
        }
        get defaultCharacterWidth() {
          return this.viewState.heightOracle.charWidth;
        }
        get defaultLineHeight() {
          return this.viewState.heightOracle.lineHeight;
        }
        get textDirection() {
          return this.viewState.defaultTextDirection;
        }
        textDirectionAt(t) {
          let e = this.state.facet(zi);
          return !e || t < this.viewport.from || t > this.viewport.to
            ? this.textDirection
            : (this.readMeasured(), this.docView.textDirectionAt(t));
        }
        get lineWrapping() {
          return this.viewState.heightOracle.lineWrapping;
        }
        bidiSpans(t) {
          if (t.length > Dr) return wn(t.length);
          let e = this.textDirectionAt(t.from);
          for (let n of this.bidiCache)
            if (n.from == t.from && n.dir == e) return n.order;
          let i = vn(t.text, e);
          return this.bidiCache.push(new Er(t.from, t.to, e, i)), i;
        }
        get hasFocus() {
          var t;
          return (
            (this.dom.ownerDocument.hasFocus() ||
              (ti.safari &&
                (null === (t = this.inputState) || void 0 === t
                  ? void 0
                  : t.lastContextMenu) >
                  Date.now() - 3e4)) &&
            this.root.activeElement == this.contentDOM
          );
        }
        focus() {
          this.observer.ignore(() => {
            Ee(this.contentDOM), this.docView.updateSelection();
          });
        }
        setRoot(t) {
          this._root != t &&
            ((this._root = t),
            this.observer.setWindow(
              (9 == t.nodeType ? t : t.ownerDocument).defaultView || window,
            ),
            this.mountStyles());
        }
        destroy() {
          for (let t of this.plugins) t.destroy(this);
          (this.plugins = []),
            this.inputState.destroy(),
            this.dom.remove(),
            this.observer.destroy(),
            this.measureScheduled > -1 &&
              this.win.cancelAnimationFrame(this.measureScheduled),
            (this.destroyed = !0);
        }
        static scrollIntoView(t, e = {}) {
          return ji.of(
            new qi(
              'number' == typeof t ? V.cursor(t) : t,
              e.y,
              e.x,
              e.yMargin,
              e.xMargin,
            ),
          );
        }
        static domEventHandlers(t) {
          return Gi.define(() => ({}), { eventHandlers: t });
        }
        static theme(t, e) {
          let i = ie.newName(),
            n = [hr.of(i), en.of(mr(`.${i}`, t))];
          return e && e.dark && n.push(cr.of(!0)), n;
        }
        static baseTheme(t) {
          return Z.lowest(en.of(mr('.' + ur, t, pr)));
        }
        static findFromDOM(t) {
          var e;
          let i = t.querySelector('.cm-content'),
            n = (i && We.get(i)) || We.get(t);
          return (
            (null === (e = null === n || void 0 === n ? void 0 : n.rootView) ||
            void 0 === e
              ? void 0
              : e.view) || null
          );
        }
      }
      (Or.styleModule = en),
        (Or.inputHandler = Wi),
        (Or.focusChangeEffect = Vi),
        (Or.perLineTextDirection = zi),
        (Or.exceptionSink = Ii),
        (Or.updateListener = Hi),
        (Or.editable = Ki),
        (Or.mouseSelectionStyle = Pi),
        (Or.dragMovesSelection = Ni),
        (Or.clickAddsSelectionRange = Li),
        (Or.decorations = Zi),
        (Or.atomicRanges = Qi),
        (Or.scrollMargins = tn),
        (Or.darkTheme = cr),
        (Or.contentAttributes = Xi),
        (Or.editorAttributes = Yi),
        (Or.lineWrapping = Or.contentAttributes.of({
          class: 'cm-lineWrapping',
        })),
        (Or.announce = gt.define());
      const Dr = 4096,
        Tr = {};
      class Er {
        constructor(t, e, i, n) {
          (this.from = t), (this.to = e), (this.dir = i), (this.order = n);
        }
        static update(t, e) {
          if (e.empty) return t;
          let i = [],
            n = t.length ? t[t.length - 1].dir : rn.LTR;
          for (let s = Math.max(0, t.length - 10); s < t.length; s++) {
            let r = t[s];
            r.dir != n ||
              e.touchesRange(r.from, r.to) ||
              i.push(
                new Er(e.mapPos(r.from, 1), e.mapPos(r.to, -1), r.dir, r.order),
              );
          }
          return i;
        }
      }
      function Rr(t, e, i) {
        for (let n = t.state.facet(e), s = n.length - 1; s >= 0; s--) {
          let e = n[s],
            r = 'function' == typeof e ? e(t) : e;
          r && gi(r, i);
        }
        return i;
      }
      const Br = ti.mac
        ? 'mac'
        : ti.windows
        ? 'win'
        : ti.linux
        ? 'linux'
        : 'key';
      function Lr(t, e) {
        const i = t.split(/-(?!$)/);
        let n,
          s,
          r,
          o,
          l = i[i.length - 1];
        'Space' == l && (l = ' ');
        for (let a = 0; a < i.length - 1; ++a) {
          const t = i[a];
          if (/^(cmd|meta|m)$/i.test(t)) o = !0;
          else if (/^a(lt)?$/i.test(t)) n = !0;
          else if (/^(c|ctrl|control)$/i.test(t)) s = !0;
          else if (/^s(hift)?$/i.test(t)) r = !0;
          else {
            if (!/^mod$/i.test(t))
              throw new Error('Unrecognized modifier name: ' + t);
            'mac' == e ? (o = !0) : (s = !0);
          }
        }
        return (
          n && (l = 'Alt-' + l),
          s && (l = 'Ctrl-' + l),
          o && (l = 'Meta-' + l),
          r && (l = 'Shift-' + l),
          l
        );
      }
      function Nr(t, e, i) {
        return (
          e.altKey && (t = 'Alt-' + t),
          e.ctrlKey && (t = 'Ctrl-' + t),
          e.metaKey && (t = 'Meta-' + t),
          !1 !== i && e.shiftKey && (t = 'Shift-' + t),
          t
        );
      }
      const Pr = Z.default(
          Or.domEventHandlers({
            keydown(t, e) {
              return jr(Wr(e.state), t, e, 'editor');
            },
          }),
        ),
        Ir = q.define({ enables: Pr }),
        Hr = new WeakMap();
      function Wr(t) {
        let e = t.facet(Ir),
          i = Hr.get(e);
        return i || Hr.set(e, (i = qr(e.reduce((t, e) => t.concat(e), [])))), i;
      }
      function Vr(t, e, i) {
        return jr(Wr(t.state), e, t, i);
      }
      let zr = null;
      const Fr = 4e3;
      function qr(t, e = Br) {
        let i = Object.create(null),
          n = Object.create(null),
          s = (t, e) => {
            let i = n[t];
            if (null == i) n[t] = e;
            else if (i != e)
              throw new Error(
                'Key binding ' +
                  t +
                  ' is used both as a regular binding and as a multi-stroke prefix',
              );
          },
          r = (t, n, r, o) => {
            var l, a;
            let h = i[t] || (i[t] = Object.create(null)),
              c = n.split(/ (?!$)/).map((t) => Lr(t, e));
            for (let e = 1; e < c.length; e++) {
              let i = c.slice(0, e).join(' ');
              s(i, !0),
                h[i] ||
                  (h[i] = {
                    preventDefault: !0,
                    run: [
                      (e) => {
                        let n = (zr = { view: e, prefix: i, scope: t });
                        return (
                          setTimeout(() => {
                            zr == n && (zr = null);
                          }, Fr),
                          !0
                        );
                      },
                    ],
                  });
            }
            let u = c.join(' ');
            s(u, !1);
            let d =
              h[u] ||
              (h[u] = {
                preventDefault: !1,
                run:
                  (null ===
                    (a =
                      null === (l = h._any) || void 0 === l ? void 0 : l.run) ||
                  void 0 === a
                    ? void 0
                    : a.slice()) || [],
              });
            r && d.run.push(r), o && (d.preventDefault = !0);
          };
        for (let o of t) {
          let t = o.scope ? o.scope.split(' ') : ['editor'];
          if (o.any)
            for (let e of t) {
              let t = i[e] || (i[e] = Object.create(null));
              t._any || (t._any = { preventDefault: !1, run: [] });
              for (let e in t) t[e].run.push(o.any);
            }
          let n = o[e] || o.key;
          if (n)
            for (let e of t)
              r(e, n, o.run, o.preventDefault),
                o.shift && r(e, 'Shift-' + n, o.shift, o.preventDefault);
        }
        return i;
      }
      function jr(t, e, i, n) {
        let s = fe(e),
          r = M(s, 0),
          o = O(r) == s.length && ' ' != s,
          l = '',
          a = !1;
        zr &&
          zr.view == i &&
          zr.scope == n &&
          ((l = zr.prefix + ' '),
          (a = is.indexOf(e.keyCode) < 0) && (zr = null));
        let h,
          c,
          u = new Set(),
          d = (t) => {
            if (t) {
              for (let n of t.run)
                if (!u.has(n) && (u.add(n), n(i, e))) return !0;
              t.preventDefault && (a = !0);
            }
            return !1;
          },
          f = t[n];
        if (f) {
          if (d(f[l + Nr(s, e, !o)])) return !0;
          if (
            o &&
            (e.altKey || e.metaKey || e.ctrlKey) &&
            !(ti.windows && e.ctrlKey && e.altKey) &&
            (h = re[e.keyCode]) &&
            h != s
          ) {
            if (d(f[l + Nr(h, e, !0)])) return !0;
            if (
              e.shiftKey &&
              (c = oe[e.keyCode]) != s &&
              c != h &&
              d(f[l + Nr(c, e, !1)])
            )
              return !0;
          } else if (o && e.shiftKey && d(f[l + Nr(s, e, !0)])) return !0;
          if (d(f._any)) return !0;
        }
        return a;
      }
      class _r {
        constructor(t, e, i, n, s) {
          (this.className = t),
            (this.left = e),
            (this.top = i),
            (this.width = n),
            (this.height = s);
        }
        draw() {
          let t = document.createElement('div');
          return (t.className = this.className), this.adjust(t), t;
        }
        update(t, e) {
          return e.className == this.className && (this.adjust(t), !0);
        }
        adjust(t) {
          (t.style.left = this.left + 'px'),
            (t.style.top = this.top + 'px'),
            null != this.width && (t.style.width = this.width + 'px'),
            (t.style.height = this.height + 'px');
        }
        eq(t) {
          return (
            this.left == t.left &&
            this.top == t.top &&
            this.width == t.width &&
            this.height == t.height &&
            this.className == t.className
          );
        }
        static forRange(t, e, i) {
          if (i.empty) {
            let n = t.coordsAtPos(i.head, i.assoc || 1);
            if (!n) return [];
            let s = Kr(t);
            return [
              new _r(e, n.left - s.left, n.top - s.top, null, n.bottom - n.top),
            ];
          }
          return Gr(t, e, i);
        }
      }
      function Kr(t) {
        let e = t.scrollDOM.getBoundingClientRect(),
          i =
            t.textDirection == rn.LTR
              ? e.left
              : e.right - t.scrollDOM.clientWidth;
        return {
          left: i - t.scrollDOM.scrollLeft,
          top: e.top - t.scrollDOM.scrollTop,
        };
      }
      function $r(t, e, i) {
        let n = V.cursor(e);
        return {
          from: Math.max(i.from, t.moveToLineBoundary(n, !1, !0).from),
          to: Math.min(i.to, t.moveToLineBoundary(n, !0, !0).from),
          type: bi.Text,
        };
      }
      function Ur(t, e) {
        let i = t.lineBlockAt(e);
        if (Array.isArray(i.type))
          for (let n of i.type)
            if (n.to > e || (n.to == e && (n.to == i.to || n.type == bi.Text)))
              return n;
        return i;
      }
      function Gr(t, e, i) {
        if (i.to <= t.viewport.from || i.from >= t.viewport.to) return [];
        let n = Math.max(i.from, t.viewport.from),
          s = Math.min(i.to, t.viewport.to),
          r = t.textDirection == rn.LTR,
          o = t.contentDOM,
          l = o.getBoundingClientRect(),
          a = Kr(t),
          h = o.querySelector('.cm-line'),
          c = h && window.getComputedStyle(h),
          u =
            l.left +
            (c
              ? parseInt(c.paddingLeft) + Math.min(0, parseInt(c.textIndent))
              : 0),
          d = l.right - (c ? parseInt(c.paddingRight) : 0),
          f = Ur(t, n),
          p = Ur(t, s),
          m = f.type == bi.Text ? f : null,
          g = p.type == bi.Text ? p : null;
        if (
          (t.lineWrapping && (m && (m = $r(t, n, m)), g && (g = $r(t, s, g))),
          m && g && m.from == g.from)
        )
          return w(y(i.from, i.to, m));
        {
          let e = m ? y(i.from, null, m) : b(f, !1),
            n = g ? y(null, i.to, g) : b(p, !0),
            s = [];
          return (
            (m || f).to < (g || p).from - 1
              ? s.push(v(u, e.bottom, d, n.top))
              : e.bottom < n.top &&
                t.elementAtHeight((e.bottom + n.top) / 2).type == bi.Text &&
                (e.bottom = n.top = (e.bottom + n.top) / 2),
            w(e).concat(s).concat(w(n))
          );
        }
        function v(t, i, n, s) {
          return new _r(e, t - a.left, i - a.top - 0.01, n - t, s - i + 0.01);
        }
        function w({ top: t, bottom: e, horizontal: i }) {
          let n = [];
          for (let s = 0; s < i.length; s += 2) n.push(v(i[s], t, i[s + 1], e));
          return n;
        }
        function y(e, i, n) {
          let s = 1e9,
            o = -1e9,
            l = [];
          function a(e, i, a, h, c) {
            let f = t.coordsAtPos(e, e == n.to ? -2 : 2),
              p = t.coordsAtPos(a, a == n.from ? 2 : -2);
            f &&
              p &&
              ((s = Math.min(f.top, p.top, s)),
              (o = Math.max(f.bottom, p.bottom, o)),
              c == rn.LTR
                ? l.push(r && i ? u : f.left, r && h ? d : p.right)
                : l.push(!r && h ? u : p.left, !r && i ? d : f.right));
          }
          let h = null !== e && void 0 !== e ? e : n.from,
            c = null !== i && void 0 !== i ? i : n.to;
          for (let r of t.visibleRanges)
            if (r.to > h && r.from < c)
              for (let n = Math.max(r.from, h), s = Math.min(r.to, c); ; ) {
                let r = t.state.doc.lineAt(n);
                for (let o of t.bidiSpans(r)) {
                  let t = o.from + r.from,
                    l = o.to + r.from;
                  if (t >= s) break;
                  l > n &&
                    a(
                      Math.max(t, n),
                      null == e && t <= h,
                      Math.min(l, s),
                      null == i && l >= c,
                      o.dir,
                    );
                }
                if (((n = r.to + 1), n >= s)) break;
              }
          return (
            0 == l.length && a(h, null == e, c, null == i, t.textDirection),
            { top: s, bottom: o, horizontal: l }
          );
        }
        function b(t, e) {
          let i = l.top + (e ? t.top : t.bottom);
          return { top: i, bottom: i, horizontal: [] };
        }
      }
      function Jr(t, e) {
        return t.constructor == e.constructor && t.eq(e);
      }
      class Yr {
        constructor(t, e) {
          (this.view = t),
            (this.layer = e),
            (this.drawn = []),
            (this.measureReq = {
              read: this.measure.bind(this),
              write: this.draw.bind(this),
            }),
            (this.dom = t.scrollDOM.appendChild(document.createElement('div'))),
            this.dom.classList.add('cm-layer'),
            e.above && this.dom.classList.add('cm-layer-above'),
            e.class && this.dom.classList.add(e.class),
            this.dom.setAttribute('aria-hidden', 'true'),
            this.setOrder(t.state),
            t.requestMeasure(this.measureReq),
            e.mount && e.mount(this.dom, t);
        }
        update(t) {
          t.startState.facet(Xr) != t.state.facet(Xr) && this.setOrder(t.state),
            (this.layer.update(t, this.dom) || t.geometryChanged) &&
              t.view.requestMeasure(this.measureReq);
        }
        setOrder(t) {
          let e = 0,
            i = t.facet(Xr);
          while (e < i.length && i[e] != this.layer) e++;
          this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - e);
        }
        measure() {
          return this.layer.markers(this.view);
        }
        draw(t) {
          if (
            t.length != this.drawn.length ||
            t.some((t, e) => !Jr(t, this.drawn[e]))
          ) {
            let e = this.dom.firstChild,
              i = 0;
            for (let n of t)
              n.update &&
              e &&
              n.constructor &&
              this.drawn[i].constructor &&
              n.update(e, this.drawn[i])
                ? ((e = e.nextSibling), i++)
                : this.dom.insertBefore(n.draw(), e);
            while (e) {
              let t = e.nextSibling;
              e.remove(), (e = t);
            }
            this.drawn = t;
          }
        }
        destroy() {
          this.layer.destroy && this.layer.destroy(this.dom, this.view),
            this.dom.remove();
        }
      }
      const Xr = q.define();
      function Zr(t) {
        return [Gi.define((e) => new Yr(e, t)), Xr.of(t)];
      }
      const Qr = !ti.ios,
        to = q.define({
          combine(t) {
            return Bt(
              t,
              { cursorBlinkRate: 1200, drawRangeCursor: !0 },
              {
                cursorBlinkRate: (t, e) => Math.min(t, e),
                drawRangeCursor: (t, e) => t || e,
              },
            );
          },
        });
      function eo(t = {}) {
        return [to.of(t), no, ro, lo, Fi.of(!0)];
      }
      function io(t) {
        return t.startState.facet(to) != t.state.facet(to);
      }
      const no = Zr({
        above: !0,
        markers(t) {
          let { state: e } = t,
            i = e.facet(to),
            n = [];
          for (let s of e.selection.ranges) {
            let r = s == e.selection.main;
            if (s.empty ? !r || Qr : i.drawRangeCursor) {
              let e = r
                  ? 'cm-cursor cm-cursor-primary'
                  : 'cm-cursor cm-cursor-secondary',
                i = s.empty ? s : V.cursor(s.head, s.head > s.anchor ? -1 : 1);
              for (let s of _r.forRange(t, e, i)) n.push(s);
            }
          }
          return n;
        },
        update(t, e) {
          t.transactions.some((t) => t.selection) &&
            (e.style.animationName =
              'cm-blink' == e.style.animationName ? 'cm-blink2' : 'cm-blink');
          let i = io(t);
          return i && so(t.state, e), t.docChanged || t.selectionSet || i;
        },
        mount(t, e) {
          so(e.state, t);
        },
        class: 'cm-cursorLayer',
      });
      function so(t, e) {
        e.style.animationDuration = t.facet(to).cursorBlinkRate + 'ms';
      }
      const ro = Zr({
          above: !1,
          markers(t) {
            return t.state.selection.ranges
              .map((e) =>
                e.empty ? [] : _r.forRange(t, 'cm-selectionBackground', e),
              )
              .reduce((t, e) => t.concat(e));
          },
          update(t, e) {
            return t.docChanged || t.selectionSet || t.viewportChanged || io(t);
          },
          class: 'cm-selectionLayer',
        }),
        oo = {
          '.cm-line': {
            '& ::selection': { backgroundColor: 'transparent !important' },
            '&::selection': { backgroundColor: 'transparent !important' },
          },
        };
      Qr && (oo['.cm-line'].caretColor = 'transparent !important');
      const lo = Z.highest(Or.theme(oo)),
        ao = gt.define({
          map(t, e) {
            return null == t ? null : e.mapPos(t);
          },
        }),
        ho = J.define({
          create() {
            return null;
          },
          update(t, e) {
            return (
              null != t && (t = e.changes.mapPos(t)),
              e.effects.reduce((t, e) => (e.is(ao) ? e.value : t), t)
            );
          },
        }),
        co = Gi.fromClass(
          class {
            constructor(t) {
              (this.view = t),
                (this.cursor = null),
                (this.measureReq = {
                  read: this.readPos.bind(this),
                  write: this.drawCursor.bind(this),
                });
            }
            update(t) {
              var e;
              let i = t.state.field(ho);
              null == i
                ? null != this.cursor &&
                  (null === (e = this.cursor) || void 0 === e || e.remove(),
                  (this.cursor = null))
                : (this.cursor ||
                    ((this.cursor = this.view.scrollDOM.appendChild(
                      document.createElement('div'),
                    )),
                    (this.cursor.className = 'cm-dropCursor')),
                  (t.startState.field(ho) != i ||
                    t.docChanged ||
                    t.geometryChanged) &&
                    this.view.requestMeasure(this.measureReq));
            }
            readPos() {
              let t = this.view.state.field(ho),
                e = null != t && this.view.coordsAtPos(t);
              if (!e) return null;
              let i = this.view.scrollDOM.getBoundingClientRect();
              return {
                left: e.left - i.left + this.view.scrollDOM.scrollLeft,
                top: e.top - i.top + this.view.scrollDOM.scrollTop,
                height: e.bottom - e.top,
              };
            }
            drawCursor(t) {
              this.cursor &&
                (t
                  ? ((this.cursor.style.left = t.left + 'px'),
                    (this.cursor.style.top = t.top + 'px'),
                    (this.cursor.style.height = t.height + 'px'))
                  : (this.cursor.style.left = '-100000px'));
            }
            destroy() {
              this.cursor && this.cursor.remove();
            }
            setDropPos(t) {
              this.view.state.field(ho) != t &&
                this.view.dispatch({ effects: ao.of(t) });
            }
          },
          {
            eventHandlers: {
              dragover(t) {
                this.setDropPos(
                  this.view.posAtCoords({ x: t.clientX, y: t.clientY }),
                );
              },
              dragleave(t) {
                (t.target != this.view.contentDOM &&
                  this.view.contentDOM.contains(t.relatedTarget)) ||
                  this.setDropPos(null);
              },
              dragend() {
                this.setDropPos(null);
              },
              drop() {
                this.setDropPos(null);
              },
            },
          },
        );
      function uo() {
        return [ho, co];
      }
      function fo(t, e, i, n, s) {
        e.lastIndex = 0;
        for (
          let r, o = t.iterRange(i, n), l = i;
          !o.next().done;
          l += o.value.length
        )
          if (!o.lineBreak) while ((r = e.exec(o.value))) s(l + r.index, r);
      }
      function po(t, e) {
        let i = t.visibleRanges;
        if (
          1 == i.length &&
          i[0].from == t.viewport.from &&
          i[0].to == t.viewport.to
        )
          return i;
        let n = [];
        for (let { from: s, to: r } of i)
          (s = Math.max(t.state.doc.lineAt(s).from, s - e)),
            (r = Math.min(t.state.doc.lineAt(r).to, r + e)),
            n.length && n[n.length - 1].to >= s
              ? (n[n.length - 1].to = r)
              : n.push({ from: s, to: r });
        return n;
      }
      class mo {
        constructor(t) {
          const {
            regexp: e,
            decoration: i,
            decorate: n,
            boundary: s,
            maxLength: r = 1e3,
          } = t;
          if (!e.global)
            throw new RangeError(
              "The regular expression given to MatchDecorator should have its 'g' flag set",
            );
          if (((this.regexp = e), n))
            this.addMatch = (t, e, i, s) => n(s, i, i + t[0].length, t, e);
          else if ('function' == typeof i)
            this.addMatch = (t, e, n, s) => {
              let r = i(t, e, n);
              r && s(n, n + t[0].length, r);
            };
          else {
            if (!i)
              throw new RangeError(
                "Either 'decorate' or 'decoration' should be provided to MatchDecorator",
              );
            this.addMatch = (t, e, n, s) => s(n, n + t[0].length, i);
          }
          (this.boundary = s), (this.maxLength = r);
        }
        createDeco(t) {
          let e = new Vt(),
            i = e.add.bind(e);
          for (let { from: n, to: s } of po(t, this.maxLength))
            fo(t.state.doc, this.regexp, n, s, (e, n) =>
              this.addMatch(n, t, e, i),
            );
          return e.finish();
        }
        updateDeco(t, e) {
          let i = 1e9,
            n = -1;
          return (
            t.docChanged &&
              t.changes.iterChanges((e, s, r, o) => {
                o > t.view.viewport.from &&
                  r < t.view.viewport.to &&
                  ((i = Math.min(r, i)), (n = Math.max(o, n)));
              }),
            t.viewportChanged || n - i > 1e3
              ? this.createDeco(t.view)
              : n > -1
              ? this.updateRange(t.view, e.map(t.changes), i, n)
              : e
          );
        }
        updateRange(t, e, i, n) {
          for (let s of t.visibleRanges) {
            let r = Math.max(s.from, i),
              o = Math.min(s.to, n);
            if (o > r) {
              let i = t.state.doc.lineAt(r),
                n = i.to < o ? t.state.doc.lineAt(o) : i,
                l = Math.max(s.from, i.from),
                a = Math.min(s.to, n.to);
              if (this.boundary) {
                for (; r > i.from; r--)
                  if (this.boundary.test(i.text[r - 1 - i.from])) {
                    l = r;
                    break;
                  }
                for (; o < n.to; o++)
                  if (this.boundary.test(n.text[o - n.from])) {
                    a = o;
                    break;
                  }
              }
              let h,
                c = [],
                u = (t, e, i) => c.push(i.range(t, e));
              if (i == n) {
                this.regexp.lastIndex = l - i.from;
                while ((h = this.regexp.exec(i.text)) && h.index < a - i.from)
                  this.addMatch(h, t, h.index + i.from, u);
              } else
                fo(t.state.doc, this.regexp, l, a, (e, i) =>
                  this.addMatch(i, t, e, u),
                );
              e = e.update({
                filterFrom: l,
                filterTo: a,
                filter: (t, e) => t < l || e > a,
                add: c,
              });
            }
          }
          return e;
        }
      }
      const go = null != /x/.unicode ? 'gu' : 'g',
        vo = new RegExp(
          '[\0-\b\n-\x1f\x7f-\x9f\xad\u061c\u200b\u200e\u200f\u2028\u2029\u202d\u202e\u2066\u2067\u2069\ufeff\ufff9-\ufffc]',
          go,
        ),
        wo = {
          0: 'null',
          7: 'bell',
          8: 'backspace',
          10: 'newline',
          11: 'vertical tab',
          13: 'carriage return',
          27: 'escape',
          8203: 'zero width space',
          8204: 'zero width non-joiner',
          8205: 'zero width joiner',
          8206: 'left-to-right mark',
          8207: 'right-to-left mark',
          8232: 'line separator',
          8237: 'left-to-right override',
          8238: 'right-to-left override',
          8294: 'left-to-right isolate',
          8295: 'right-to-left isolate',
          8297: 'pop directional isolate',
          8233: 'paragraph separator',
          65279: 'zero width no-break space',
          65532: 'object replacement',
        };
      let yo = null;
      function bo() {
        var t;
        if (null == yo && 'undefined' != typeof document && document.body) {
          let e = document.body.style;
          yo =
            null !=
            (null !== (t = e.tabSize) && void 0 !== t ? t : e.MozTabSize);
        }
        return yo || !1;
      }
      const xo = q.define({
        combine(t) {
          let e = Bt(t, {
            render: null,
            specialChars: vo,
            addSpecialChars: null,
          });
          return (
            (e.replaceTabs = !bo()) &&
              (e.specialChars = new RegExp('\t|' + e.specialChars.source, go)),
            e.addSpecialChars &&
              (e.specialChars = new RegExp(
                e.specialChars.source + '|' + e.addSpecialChars.source,
                go,
              )),
            e
          );
        },
      });
      function ko(t = {}) {
        return [xo.of(t), Co()];
      }
      let So = null;
      function Co() {
        return (
          So ||
          (So = Gi.fromClass(
            class {
              constructor(t) {
                (this.view = t),
                  (this.decorations = xi.none),
                  (this.decorationCache = Object.create(null)),
                  (this.decorator = this.makeDecorator(t.state.facet(xo))),
                  (this.decorations = this.decorator.createDeco(t));
              }
              makeDecorator(t) {
                return new mo({
                  regexp: t.specialChars,
                  decoration: (e, i, n) => {
                    let { doc: s } = i.state,
                      r = M(e[0], 0);
                    if (9 == r) {
                      let t = s.lineAt(n),
                        e = i.state.tabSize,
                        r = Yt(t.text, e, n - t.from);
                      return xi.replace({
                        widget: new Do(
                          (e - (r % e)) * this.view.defaultCharacterWidth,
                        ),
                      });
                    }
                    return (
                      this.decorationCache[r] ||
                      (this.decorationCache[r] = xi.replace({
                        widget: new Oo(t, r),
                      }))
                    );
                  },
                  boundary: t.replaceTabs ? void 0 : /[^]/,
                });
              }
              update(t) {
                let e = t.state.facet(xo);
                t.startState.facet(xo) != e
                  ? ((this.decorator = this.makeDecorator(e)),
                    (this.decorations = this.decorator.createDeco(t.view)))
                  : (this.decorations = this.decorator.updateDeco(
                      t,
                      this.decorations,
                    ));
              }
            },
            { decorations: (t) => t.decorations },
          ))
        );
      }
      const Mo = '\u2022';
      function Ao(t) {
        return t >= 32
          ? Mo
          : 10 == t
          ? '\u2424'
          : String.fromCharCode(9216 + t);
      }
      class Oo extends yi {
        constructor(t, e) {
          super(), (this.options = t), (this.code = e);
        }
        eq(t) {
          return t.code == this.code;
        }
        toDOM(t) {
          let e = Ao(this.code),
            i =
              t.state.phrase('Control character') +
              ' ' +
              (wo[this.code] || '0x' + this.code.toString(16)),
            n = this.options.render && this.options.render(this.code, i, e);
          if (n) return n;
          let s = document.createElement('span');
          return (
            (s.textContent = e),
            (s.title = i),
            s.setAttribute('aria-label', i),
            (s.className = 'cm-specialChar'),
            s
          );
        }
        ignoreEvent() {
          return !1;
        }
      }
      class Do extends yi {
        constructor(t) {
          super(), (this.width = t);
        }
        eq(t) {
          return t.width == this.width;
        }
        toDOM() {
          let t = document.createElement('span');
          return (
            (t.textContent = '\t'),
            (t.className = 'cm-tab'),
            (t.style.width = this.width + 'px'),
            t
          );
        }
        ignoreEvent() {
          return !1;
        }
      }
      function To() {
        return Ro;
      }
      const Eo = xi.line({ class: 'cm-activeLine' }),
        Ro = Gi.fromClass(
          class {
            constructor(t) {
              this.decorations = this.getDeco(t);
            }
            update(t) {
              (t.docChanged || t.selectionSet) &&
                (this.decorations = this.getDeco(t.view));
            }
            getDeco(t) {
              let e = -1,
                i = [];
              for (let n of t.state.selection.ranges) {
                let s = t.lineBlockAt(n.head);
                s.from > e && (i.push(Eo.range(s.from)), (e = s.from));
              }
              return xi.set(i);
            }
          },
          { decorations: (t) => t.decorations },
        );
      class Bo extends yi {
        constructor(t) {
          super(), (this.content = t);
        }
        toDOM() {
          let t = document.createElement('span');
          return (
            (t.className = 'cm-placeholder'),
            (t.style.pointerEvents = 'none'),
            t.appendChild(
              'string' == typeof this.content
                ? document.createTextNode(this.content)
                : this.content,
            ),
            'string' == typeof this.content
              ? t.setAttribute('aria-label', 'placeholder ' + this.content)
              : t.setAttribute('aria-hidden', 'true'),
            t
          );
        }
        coordsAt(t) {
          let e = t.firstChild ? we(t.firstChild) : [];
          if (!e.length) return null;
          let i = window.getComputedStyle(t.parentNode),
            n = Se(e[0], 'rtl' != i.direction),
            s = parseInt(i.lineHeight);
          return n.bottom - n.top > 1.5 * s
            ? { left: n.left, right: n.right, top: n.top, bottom: n.top + s }
            : n;
        }
        ignoreEvent() {
          return !1;
        }
      }
      function Lo(t) {
        return Gi.fromClass(
          class {
            constructor(e) {
              (this.view = e),
                (this.placeholder = xi.set([
                  xi.widget({ widget: new Bo(t), side: 1 }).range(0),
                ]));
            }
            get decorations() {
              return this.view.state.doc.length ? xi.none : this.placeholder;
            }
          },
          { decorations: (t) => t.decorations },
        );
      }
      const No = 2e3;
      function Po(t, e, i) {
        let n = Math.min(e.line, i.line),
          s = Math.max(e.line, i.line),
          r = [];
        if (e.off > No || i.off > No || e.col < 0 || i.col < 0) {
          let o = Math.min(e.off, i.off),
            l = Math.max(e.off, i.off);
          for (let e = n; e <= s; e++) {
            let i = t.doc.line(e);
            i.length <= l && r.push(V.range(i.from + o, i.to + l));
          }
        } else {
          let o = Math.min(e.col, i.col),
            l = Math.max(e.col, i.col);
          for (let e = n; e <= s; e++) {
            let i = t.doc.line(e),
              n = Xt(i.text, o, t.tabSize, !0);
            if (n < 0) r.push(V.cursor(i.to));
            else {
              let e = Xt(i.text, l, t.tabSize);
              r.push(V.range(i.from + n, i.from + e));
            }
          }
        }
        return r;
      }
      function Io(t, e) {
        let i = t.coordsAtPos(t.viewport.from);
        return i
          ? Math.round(Math.abs((i.left - e) / t.defaultCharacterWidth))
          : -1;
      }
      function Ho(t, e) {
        let i = t.posAtCoords({ x: e.clientX, y: e.clientY }, !1),
          n = t.state.doc.lineAt(i),
          s = i - n.from,
          r =
            s > No
              ? -1
              : s == n.length
              ? Io(t, e.clientX)
              : Yt(n.text, t.state.tabSize, i - n.from);
        return { line: n.number, col: r, off: s };
      }
      function Wo(t, e) {
        let i = Ho(t, e),
          n = t.state.selection;
        return i
          ? {
              update(t) {
                if (t.docChanged) {
                  let e = t.changes.mapPos(t.startState.doc.line(i.line).from),
                    s = t.state.doc.lineAt(e);
                  (i = {
                    line: s.number,
                    col: i.col,
                    off: Math.min(i.off, s.length),
                  }),
                    (n = n.map(t.changes));
                }
              },
              get(e, s, r) {
                let o = Ho(t, e);
                if (!o) return n;
                let l = Po(t.state, i, o);
                return l.length
                  ? r
                    ? V.create(l.concat(n.ranges))
                    : V.create(l)
                  : n;
              },
            }
          : null;
      }
      function Vo(t) {
        let e =
          (null === t || void 0 === t ? void 0 : t.eventFilter) ||
          ((t) => t.altKey && 0 == t.button);
        return Or.mouseSelectionStyle.of((t, i) => (e(i) ? Wo(t, i) : null));
      }
      const zo = {
          Alt: [18, (t) => t.altKey],
          Control: [17, (t) => t.ctrlKey],
          Shift: [16, (t) => t.shiftKey],
          Meta: [91, (t) => t.metaKey],
        },
        Fo = { style: 'cursor: crosshair' };
      function qo(t = {}) {
        let [e, i] = zo[t.key || 'Alt'],
          n = Gi.fromClass(
            class {
              constructor(t) {
                (this.view = t), (this.isDown = !1);
              }
              set(t) {
                this.isDown != t && ((this.isDown = t), this.view.update([]));
              }
            },
            {
              eventHandlers: {
                keydown(t) {
                  this.set(t.keyCode == e || i(t));
                },
                keyup(t) {
                  (t.keyCode != e && i(t)) || this.set(!1);
                },
                mousemove(t) {
                  this.set(i(t));
                },
              },
            },
          );
        return [
          n,
          Or.contentAttributes.of((t) => {
            var e;
            return (
              null === (e = t.plugin(n)) || void 0 === e ? void 0 : e.isDown
            )
              ? Fo
              : null;
          }),
        ];
      }
      const jo = '-10000px';
      class _o {
        constructor(t, e, i) {
          (this.facet = e),
            (this.createTooltipView = i),
            (this.input = t.state.facet(e)),
            (this.tooltips = this.input.filter((t) => t)),
            (this.tooltipViews = this.tooltips.map(i));
        }
        update(t) {
          var e;
          let i = t.state.facet(this.facet),
            n = i.filter((t) => t);
          if (i === this.input) {
            for (let e of this.tooltipViews) e.update && e.update(t);
            return !1;
          }
          let s = [];
          for (let r = 0; r < n.length; r++) {
            let e = n[r],
              i = -1;
            if (e) {
              for (let t = 0; t < this.tooltips.length; t++) {
                let n = this.tooltips[t];
                n && n.create == e.create && (i = t);
              }
              if (i < 0) s[r] = this.createTooltipView(e);
              else {
                let e = (s[r] = this.tooltipViews[i]);
                e.update && e.update(t);
              }
            }
          }
          for (let r of this.tooltipViews)
            s.indexOf(r) < 0 &&
              (r.dom.remove(),
              null === (e = r.destroy) || void 0 === e || e.call(r));
          return (
            (this.input = i), (this.tooltips = n), (this.tooltipViews = s), !0
          );
        }
      }
      function Ko(t) {
        let { win: e } = t;
        return { top: 0, left: 0, bottom: e.innerHeight, right: e.innerWidth };
      }
      const $o = q.define({
          combine: (t) => {
            var e, i, n;
            return {
              position: ti.ios
                ? 'absolute'
                : (null === (e = t.find((t) => t.position)) || void 0 === e
                    ? void 0
                    : e.position) || 'fixed',
              parent:
                (null === (i = t.find((t) => t.parent)) || void 0 === i
                  ? void 0
                  : i.parent) || null,
              tooltipSpace:
                (null === (n = t.find((t) => t.tooltipSpace)) || void 0 === n
                  ? void 0
                  : n.tooltipSpace) || Ko,
            };
          },
        }),
        Uo = new WeakMap(),
        Go = Gi.fromClass(
          class {
            constructor(t) {
              (this.view = t),
                (this.inView = !0),
                (this.lastTransaction = 0),
                (this.measureTimeout = -1);
              let e = t.state.facet($o);
              (this.position = e.position),
                (this.parent = e.parent),
                (this.classes = t.themeClasses),
                this.createContainer(),
                (this.measureReq = {
                  read: this.readMeasure.bind(this),
                  write: this.writeMeasure.bind(this),
                  key: this,
                }),
                (this.manager = new _o(t, Xo, (t) => this.createTooltip(t))),
                (this.intersectionObserver =
                  'function' == typeof IntersectionObserver
                    ? new IntersectionObserver(
                        (t) => {
                          Date.now() > this.lastTransaction - 50 &&
                            t.length > 0 &&
                            t[t.length - 1].intersectionRatio < 1 &&
                            this.measureSoon();
                        },
                        { threshold: [1] },
                      )
                    : null),
                this.observeIntersection(),
                t.win.addEventListener(
                  'resize',
                  (this.measureSoon = this.measureSoon.bind(this)),
                ),
                this.maybeMeasure();
            }
            createContainer() {
              this.parent
                ? ((this.container = document.createElement('div')),
                  (this.container.style.position = 'relative'),
                  (this.container.className = this.view.themeClasses),
                  this.parent.appendChild(this.container))
                : (this.container = this.view.dom);
            }
            observeIntersection() {
              if (this.intersectionObserver) {
                this.intersectionObserver.disconnect();
                for (let t of this.manager.tooltipViews)
                  this.intersectionObserver.observe(t.dom);
              }
            }
            measureSoon() {
              this.measureTimeout < 0 &&
                (this.measureTimeout = setTimeout(() => {
                  (this.measureTimeout = -1), this.maybeMeasure();
                }, 50));
            }
            update(t) {
              t.transactions.length && (this.lastTransaction = Date.now());
              let e = this.manager.update(t);
              e && this.observeIntersection();
              let i = e || t.geometryChanged,
                n = t.state.facet($o);
              if (n.position != this.position) {
                this.position = n.position;
                for (let t of this.manager.tooltipViews)
                  t.dom.style.position = this.position;
                i = !0;
              }
              if (n.parent != this.parent) {
                this.parent && this.container.remove(),
                  (this.parent = n.parent),
                  this.createContainer();
                for (let t of this.manager.tooltipViews)
                  this.container.appendChild(t.dom);
                i = !0;
              } else
                this.parent &&
                  this.view.themeClasses != this.classes &&
                  (this.classes = this.container.className =
                    this.view.themeClasses);
              i && this.maybeMeasure();
            }
            createTooltip(t) {
              let e = t.create(this.view);
              if (
                (e.dom.classList.add('cm-tooltip'),
                t.arrow &&
                  !e.dom.querySelector('.cm-tooltip > .cm-tooltip-arrow'))
              ) {
                let t = document.createElement('div');
                (t.className = 'cm-tooltip-arrow'), e.dom.appendChild(t);
              }
              return (
                (e.dom.style.position = this.position),
                (e.dom.style.top = jo),
                this.container.appendChild(e.dom),
                e.mount && e.mount(this.view),
                e
              );
            }
            destroy() {
              var t, e;
              this.view.win.removeEventListener('resize', this.measureSoon);
              for (let i of this.manager.tooltipViews)
                i.dom.remove(),
                  null === (t = i.destroy) || void 0 === t || t.call(i);
              null === (e = this.intersectionObserver) ||
                void 0 === e ||
                e.disconnect(),
                clearTimeout(this.measureTimeout);
            }
            readMeasure() {
              let t = this.view.dom.getBoundingClientRect();
              return {
                editor: t,
                parent: this.parent
                  ? this.container.getBoundingClientRect()
                  : t,
                pos: this.manager.tooltips.map((t, e) => {
                  let i = this.manager.tooltipViews[e];
                  return i.getCoords
                    ? i.getCoords(t.pos)
                    : this.view.coordsAtPos(t.pos);
                }),
                size: this.manager.tooltipViews.map(({ dom: t }) =>
                  t.getBoundingClientRect(),
                ),
                space: this.view.state.facet($o).tooltipSpace(this.view),
              };
            }
            writeMeasure(t) {
              var e;
              let { editor: i, space: n } = t,
                s = [];
              for (let r = 0; r < this.manager.tooltips.length; r++) {
                let o = this.manager.tooltips[r],
                  l = this.manager.tooltipViews[r],
                  { dom: a } = l,
                  h = t.pos[r],
                  c = t.size[r];
                if (
                  !h ||
                  h.bottom <= Math.max(i.top, n.top) ||
                  h.top >= Math.min(i.bottom, n.bottom) ||
                  h.right < Math.max(i.left, n.left) - 0.1 ||
                  h.left > Math.min(i.right, n.right) + 0.1
                ) {
                  a.style.top = jo;
                  continue;
                }
                let u = o.arrow
                    ? l.dom.querySelector('.cm-tooltip-arrow')
                    : null,
                  d = u ? 7 : 0,
                  f = c.right - c.left,
                  p =
                    null !== (e = Uo.get(l)) && void 0 !== e
                      ? e
                      : c.bottom - c.top,
                  m = l.offset || Yo,
                  g = this.view.textDirection == rn.LTR,
                  v =
                    c.width > n.right - n.left
                      ? g
                        ? n.left
                        : n.right - c.width
                      : g
                      ? Math.min(h.left - (u ? 14 : 0) + m.x, n.right - f)
                      : Math.max(n.left, h.left - f + (u ? 14 : 0) - m.x),
                  w = !!o.above;
                !o.strictSide &&
                  (w
                    ? h.top - (c.bottom - c.top) - m.y < n.top
                    : h.bottom + (c.bottom - c.top) + m.y > n.bottom) &&
                  w == n.bottom - h.bottom > h.top - n.top &&
                  (w = !w);
                let y = (w ? h.top - n.top : n.bottom - h.bottom) - d;
                if (y < p && !1 !== l.resize) {
                  if (y < this.view.defaultLineHeight) {
                    a.style.top = jo;
                    continue;
                  }
                  Uo.set(l, p), (a.style.height = (p = y) + 'px');
                } else a.style.height && (a.style.height = '');
                let b = w ? h.top - p - d - m.y : h.bottom + d + m.y,
                  x = v + f;
                if (!0 !== l.overlap)
                  for (let t of s)
                    t.left < x &&
                      t.right > v &&
                      t.top < b + p &&
                      t.bottom > b &&
                      (b = w ? t.top - p - 2 - d : t.bottom + d + 2);
                'absolute' == this.position
                  ? ((a.style.top = b - t.parent.top + 'px'),
                    (a.style.left = v - t.parent.left + 'px'))
                  : ((a.style.top = b + 'px'), (a.style.left = v + 'px')),
                  u &&
                    (u.style.left =
                      h.left + (g ? m.x : -m.x) - (v + 14 - 7) + 'px'),
                  !0 !== l.overlap &&
                    s.push({ left: v, top: b, right: x, bottom: b + p }),
                  a.classList.toggle('cm-tooltip-above', w),
                  a.classList.toggle('cm-tooltip-below', !w),
                  l.positioned && l.positioned(t.space);
              }
            }
            maybeMeasure() {
              if (
                this.manager.tooltips.length &&
                (this.view.inView && this.view.requestMeasure(this.measureReq),
                this.inView != this.view.inView &&
                  ((this.inView = this.view.inView), !this.inView))
              )
                for (let t of this.manager.tooltipViews) t.dom.style.top = jo;
            }
          },
          {
            eventHandlers: {
              scroll() {
                this.maybeMeasure();
              },
            },
          },
        ),
        Jo = Or.baseTheme({
          '.cm-tooltip': { zIndex: 100, boxSizing: 'border-box' },
          '&light .cm-tooltip': {
            border: '1px solid #bbb',
            backgroundColor: '#f5f5f5',
          },
          '&light .cm-tooltip-section:not(:first-child)': {
            borderTop: '1px solid #bbb',
          },
          '&dark .cm-tooltip': { backgroundColor: '#333338', color: 'white' },
          '.cm-tooltip-arrow': {
            height: '7px',
            width: '14px',
            position: 'absolute',
            zIndex: -1,
            overflow: 'hidden',
            '&:before, &:after': {
              content: "''",
              position: 'absolute',
              width: 0,
              height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
            },
            '.cm-tooltip-above &': {
              bottom: '-7px',
              '&:before': { borderTop: '7px solid #bbb' },
              '&:after': { borderTop: '7px solid #f5f5f5', bottom: '1px' },
            },
            '.cm-tooltip-below &': {
              top: '-7px',
              '&:before': { borderBottom: '7px solid #bbb' },
              '&:after': { borderBottom: '7px solid #f5f5f5', top: '1px' },
            },
          },
          '&dark .cm-tooltip .cm-tooltip-arrow': {
            '&:before': {
              borderTopColor: '#333338',
              borderBottomColor: '#333338',
            },
            '&:after': {
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
            },
          },
        }),
        Yo = { x: 0, y: 0 },
        Xo = q.define({ enables: [Go, Jo] }),
        Zo = q.define();
      class Qo {
        constructor(t) {
          (this.view = t),
            (this.mounted = !1),
            (this.dom = document.createElement('div')),
            this.dom.classList.add('cm-tooltip-hover'),
            (this.manager = new _o(t, Zo, (t) => this.createHostedView(t)));
        }
        static create(t) {
          return new Qo(t);
        }
        createHostedView(t) {
          let e = t.create(this.view);
          return (
            e.dom.classList.add('cm-tooltip-section'),
            this.dom.appendChild(e.dom),
            this.mounted && e.mount && e.mount(this.view),
            e
          );
        }
        mount(t) {
          for (let e of this.manager.tooltipViews) e.mount && e.mount(t);
          this.mounted = !0;
        }
        positioned(t) {
          for (let e of this.manager.tooltipViews)
            e.positioned && e.positioned(t);
        }
        update(t) {
          this.manager.update(t);
        }
        destroy() {
          var t;
          for (let e of this.manager.tooltipViews)
            null === (t = e.destroy) || void 0 === t || t.call(e);
        }
      }
      const tl = Xo.compute([Zo], (t) => {
        let e = t.facet(Zo).filter((t) => t);
        return 0 === e.length
          ? null
          : {
              pos: Math.min(...e.map((t) => t.pos)),
              end: Math.max(
                ...e.filter((t) => null != t.end).map((t) => t.end),
              ),
              create: Qo.create,
              above: e[0].above,
              arrow: e.some((t) => t.arrow),
            };
      });
      class el {
        constructor(t, e, i, n, s) {
          (this.view = t),
            (this.source = e),
            (this.field = i),
            (this.setHover = n),
            (this.hoverTime = s),
            (this.hoverTimeout = -1),
            (this.restartTimeout = -1),
            (this.pending = null),
            (this.lastMove = { x: 0, y: 0, target: t.dom, time: 0 }),
            (this.checkHover = this.checkHover.bind(this)),
            t.dom.addEventListener(
              'mouseleave',
              (this.mouseleave = this.mouseleave.bind(this)),
            ),
            t.dom.addEventListener(
              'mousemove',
              (this.mousemove = this.mousemove.bind(this)),
            );
        }
        update() {
          this.pending &&
            ((this.pending = null),
            clearTimeout(this.restartTimeout),
            (this.restartTimeout = setTimeout(() => this.startHover(), 20)));
        }
        get active() {
          return this.view.state.field(this.field);
        }
        checkHover() {
          if (((this.hoverTimeout = -1), this.active)) return;
          let t = Date.now() - this.lastMove.time;
          t < this.hoverTime
            ? (this.hoverTimeout = setTimeout(
                this.checkHover,
                this.hoverTime - t,
              ))
            : this.startHover();
        }
        startHover() {
          clearTimeout(this.restartTimeout);
          let { lastMove: t } = this,
            e = this.view.contentDOM.contains(t.target)
              ? this.view.posAtCoords(t)
              : null;
          if (null == e) return;
          let i = this.view.coordsAtPos(e);
          if (
            null == i ||
            t.y < i.top ||
            t.y > i.bottom ||
            t.x < i.left - this.view.defaultCharacterWidth ||
            t.x > i.right + this.view.defaultCharacterWidth
          )
            return;
          let n = this.view
              .bidiSpans(this.view.state.doc.lineAt(e))
              .find((t) => t.from <= e && t.to >= e),
            s = n && n.dir == rn.RTL ? -1 : 1,
            r = this.source(this.view, e, t.x < i.left ? -s : s);
          if (null === r || void 0 === r ? void 0 : r.then) {
            let t = (this.pending = { pos: e });
            r.then(
              (e) => {
                this.pending == t &&
                  ((this.pending = null),
                  e && this.view.dispatch({ effects: this.setHover.of(e) }));
              },
              (t) => _i(this.view.state, t, 'hover tooltip'),
            );
          } else r && this.view.dispatch({ effects: this.setHover.of(r) });
        }
        mousemove(t) {
          var e;
          (this.lastMove = {
            x: t.clientX,
            y: t.clientY,
            target: t.target,
            time: Date.now(),
          }),
            this.hoverTimeout < 0 &&
              (this.hoverTimeout = setTimeout(this.checkHover, this.hoverTime));
          let i = this.active;
          if ((i && !il(this.lastMove.target)) || this.pending) {
            let { pos: n } = i || this.pending,
              s =
                null !== (e = null === i || void 0 === i ? void 0 : i.end) &&
                void 0 !== e
                  ? e
                  : n;
            (n == s
              ? this.view.posAtCoords(this.lastMove) == n
              : nl(this.view, n, s, t.clientX, t.clientY, 6)) ||
              (this.view.dispatch({ effects: this.setHover.of(null) }),
              (this.pending = null));
          }
        }
        mouseleave(t) {
          clearTimeout(this.hoverTimeout),
            (this.hoverTimeout = -1),
            this.active &&
              !il(t.relatedTarget) &&
              this.view.dispatch({ effects: this.setHover.of(null) });
        }
        destroy() {
          clearTimeout(this.hoverTimeout),
            this.view.dom.removeEventListener('mouseleave', this.mouseleave),
            this.view.dom.removeEventListener('mousemove', this.mousemove);
        }
      }
      function il(t) {
        for (let e = t; e; e = e.parentNode)
          if (1 == e.nodeType && e.classList.contains('cm-tooltip')) return !0;
        return !1;
      }
      function nl(t, e, i, n, s, r) {
        let o = document.createRange(),
          l = t.domAtPos(e),
          a = t.domAtPos(i);
        o.setEnd(a.node, a.offset), o.setStart(l.node, l.offset);
        let h = o.getClientRects();
        o.detach();
        for (let c = 0; c < h.length; c++) {
          let t = h[c],
            e = Math.max(t.top - s, s - t.bottom, t.left - n, n - t.right);
          if (e <= r) return !0;
        }
        return !1;
      }
      function sl(t, e = {}) {
        let i = gt.define(),
          n = J.define({
            create() {
              return null;
            },
            update(t, n) {
              if (
                t &&
                ((e.hideOnChange && (n.docChanged || n.selection)) ||
                  (e.hideOn && e.hideOn(n, t)))
              )
                return null;
              if (t && n.docChanged) {
                let e = n.changes.mapPos(t.pos, -1, T.TrackDel);
                if (null == e) return null;
                let i = Object.assign(Object.create(null), t);
                (i.pos = e),
                  null != t.end && (i.end = n.changes.mapPos(t.end)),
                  (t = i);
              }
              for (let e of n.effects)
                e.is(i) && (t = e.value), e.is(ol) && (t = null);
              return t;
            },
            provide: (t) => Zo.from(t),
          });
        return [
          n,
          Gi.define((s) => new el(s, t, n, i, e.hoverTime || 300)),
          tl,
        ];
      }
      function rl(t, e) {
        let i = t.plugin(Go);
        if (!i) return null;
        let n = i.manager.tooltips.indexOf(e);
        return n < 0 ? null : i.manager.tooltipViews[n];
      }
      const ol = gt.define();
      const ll = q.define({
        combine(t) {
          let e, i;
          for (let n of t)
            (e = e || n.topContainer), (i = i || n.bottomContainer);
          return { topContainer: e, bottomContainer: i };
        },
      });
      function al(t, e) {
        let i = t.plugin(hl),
          n = i ? i.specs.indexOf(e) : -1;
        return n > -1 ? i.panels[n] : null;
      }
      const hl = Gi.fromClass(
        class {
          constructor(t) {
            (this.input = t.state.facet(dl)),
              (this.specs = this.input.filter((t) => t)),
              (this.panels = this.specs.map((e) => e(t)));
            let e = t.state.facet(ll);
            (this.top = new cl(t, !0, e.topContainer)),
              (this.bottom = new cl(t, !1, e.bottomContainer)),
              this.top.sync(this.panels.filter((t) => t.top)),
              this.bottom.sync(this.panels.filter((t) => !t.top));
            for (let i of this.panels)
              i.dom.classList.add('cm-panel'), i.mount && i.mount();
          }
          update(t) {
            let e = t.state.facet(ll);
            this.top.container != e.topContainer &&
              (this.top.sync([]),
              (this.top = new cl(t.view, !0, e.topContainer))),
              this.bottom.container != e.bottomContainer &&
                (this.bottom.sync([]),
                (this.bottom = new cl(t.view, !1, e.bottomContainer))),
              this.top.syncClasses(),
              this.bottom.syncClasses();
            let i = t.state.facet(dl);
            if (i != this.input) {
              let e = i.filter((t) => t),
                n = [],
                s = [],
                r = [],
                o = [];
              for (let i of e) {
                let e,
                  l = this.specs.indexOf(i);
                l < 0
                  ? ((e = i(t.view)), o.push(e))
                  : ((e = this.panels[l]), e.update && e.update(t)),
                  n.push(e),
                  (e.top ? s : r).push(e);
              }
              (this.specs = e),
                (this.panels = n),
                this.top.sync(s),
                this.bottom.sync(r);
              for (let t of o)
                t.dom.classList.add('cm-panel'), t.mount && t.mount();
            } else for (let n of this.panels) n.update && n.update(t);
          }
          destroy() {
            this.top.sync([]), this.bottom.sync([]);
          }
        },
        {
          provide: (t) =>
            Or.scrollMargins.of((e) => {
              let i = e.plugin(t);
              return (
                i && {
                  top: i.top.scrollMargin(),
                  bottom: i.bottom.scrollMargin(),
                }
              );
            }),
        },
      );
      class cl {
        constructor(t, e, i) {
          (this.view = t),
            (this.top = e),
            (this.container = i),
            (this.dom = void 0),
            (this.classes = ''),
            (this.panels = []),
            this.syncClasses();
        }
        sync(t) {
          for (let e of this.panels)
            e.destroy && t.indexOf(e) < 0 && e.destroy();
          (this.panels = t), this.syncDOM();
        }
        syncDOM() {
          if (0 == this.panels.length)
            return void (this.dom && (this.dom.remove(), (this.dom = void 0)));
          if (!this.dom) {
            (this.dom = document.createElement('div')),
              (this.dom.className = this.top
                ? 'cm-panels cm-panels-top'
                : 'cm-panels cm-panels-bottom'),
              (this.dom.style[this.top ? 'top' : 'bottom'] = '0');
            let t = this.container || this.view.dom;
            t.insertBefore(this.dom, this.top ? t.firstChild : null);
          }
          let t = this.dom.firstChild;
          for (let e of this.panels)
            if (e.dom.parentNode == this.dom) {
              while (t != e.dom) t = ul(t);
              t = t.nextSibling;
            } else this.dom.insertBefore(e.dom, t);
          while (t) t = ul(t);
        }
        scrollMargin() {
          return !this.dom || this.container
            ? 0
            : Math.max(
                0,
                this.top
                  ? this.dom.getBoundingClientRect().bottom -
                      Math.max(
                        0,
                        this.view.scrollDOM.getBoundingClientRect().top,
                      )
                  : Math.min(
                      innerHeight,
                      this.view.scrollDOM.getBoundingClientRect().bottom,
                    ) - this.dom.getBoundingClientRect().top,
              );
        }
        syncClasses() {
          if (this.container && this.classes != this.view.themeClasses) {
            for (let t of this.classes.split(' '))
              t && this.container.classList.remove(t);
            for (let t of (this.classes = this.view.themeClasses).split(' '))
              t && this.container.classList.add(t);
          }
        }
      }
      function ul(t) {
        let e = t.nextSibling;
        return t.remove(), e;
      }
      const dl = q.define({ enables: hl });
      class fl extends Lt {
        compare(t) {
          return this == t || (this.constructor == t.constructor && this.eq(t));
        }
        eq(t) {
          return !1;
        }
        destroy(t) {}
      }
      (fl.prototype.elementClass = ''),
        (fl.prototype.toDOM = void 0),
        (fl.prototype.mapMode = T.TrackBefore),
        (fl.prototype.startSide = fl.prototype.endSide = -1),
        (fl.prototype.point = !0);
      const pl = q.define(),
        ml = {
          class: '',
          renderEmptyElements: !1,
          elementStyle: '',
          markers: () => Ht.empty,
          lineMarker: () => null,
          widgetMarker: () => null,
          lineMarkerChange: null,
          initialSpacer: null,
          updateSpacer: null,
          domEventHandlers: {},
        },
        gl = q.define();
      function vl(t) {
        return [yl(), gl.of(Object.assign(Object.assign({}, ml), t))];
      }
      const wl = q.define({ combine: (t) => t.some((t) => t) });
      function yl(t) {
        let e = [bl];
        return t && !1 === t.fixed && e.push(wl.of(!0)), e;
      }
      const bl = Gi.fromClass(
        class {
          constructor(t) {
            (this.view = t),
              (this.prevViewport = t.viewport),
              (this.dom = document.createElement('div')),
              (this.dom.className = 'cm-gutters'),
              this.dom.setAttribute('aria-hidden', 'true'),
              (this.dom.style.minHeight = this.view.contentHeight + 'px'),
              (this.gutters = t.state.facet(gl).map((e) => new Cl(t, e)));
            for (let e of this.gutters) this.dom.appendChild(e.dom);
            (this.fixed = !t.state.facet(wl)),
              this.fixed && (this.dom.style.position = 'sticky'),
              this.syncGutters(!1),
              t.scrollDOM.insertBefore(this.dom, t.contentDOM);
          }
          update(t) {
            if (this.updateGutters(t)) {
              let e = this.prevViewport,
                i = t.view.viewport,
                n = Math.min(e.to, i.to) - Math.max(e.from, i.from);
              this.syncGutters(n < 0.8 * (i.to - i.from));
            }
            t.geometryChanged &&
              (this.dom.style.minHeight = this.view.contentHeight + 'px'),
              this.view.state.facet(wl) != !this.fixed &&
                ((this.fixed = !this.fixed),
                (this.dom.style.position = this.fixed ? 'sticky' : '')),
              (this.prevViewport = t.view.viewport);
          }
          syncGutters(t) {
            let e = this.dom.nextSibling;
            t && this.dom.remove();
            let i = Ht.iter(this.view.state.facet(pl), this.view.viewport.from),
              n = [],
              s = this.gutters.map(
                (t) =>
                  new Sl(t, this.view.viewport, -this.view.documentPadding.top),
              );
            for (let r of this.view.viewportLineBlocks)
              if ((n.length && (n = []), Array.isArray(r.type))) {
                let t = !0;
                for (let e of r.type)
                  if (e.type == bi.Text && t) {
                    kl(i, n, e.from);
                    for (let t of s) t.line(this.view, e, n);
                    t = !1;
                  } else if (e.widget) for (let t of s) t.widget(this.view, e);
              } else if (r.type == bi.Text) {
                kl(i, n, r.from);
                for (let t of s) t.line(this.view, r, n);
              }
            for (let r of s) r.finish();
            t && this.view.scrollDOM.insertBefore(this.dom, e);
          }
          updateGutters(t) {
            let e = t.startState.facet(gl),
              i = t.state.facet(gl),
              n =
                t.docChanged ||
                t.heightChanged ||
                t.viewportChanged ||
                !Ht.eq(
                  t.startState.facet(pl),
                  t.state.facet(pl),
                  t.view.viewport.from,
                  t.view.viewport.to,
                );
            if (e == i) for (let s of this.gutters) s.update(t) && (n = !0);
            else {
              n = !0;
              let s = [];
              for (let n of i) {
                let i = e.indexOf(n);
                i < 0
                  ? s.push(new Cl(this.view, n))
                  : (this.gutters[i].update(t), s.push(this.gutters[i]));
              }
              for (let t of this.gutters)
                t.dom.remove(), s.indexOf(t) < 0 && t.destroy();
              for (let t of s) this.dom.appendChild(t.dom);
              this.gutters = s;
            }
            return n;
          }
          destroy() {
            for (let t of this.gutters) t.destroy();
            this.dom.remove();
          }
        },
        {
          provide: (t) =>
            Or.scrollMargins.of((e) => {
              let i = e.plugin(t);
              return i && 0 != i.gutters.length && i.fixed
                ? e.textDirection == rn.LTR
                  ? { left: i.dom.offsetWidth }
                  : { right: i.dom.offsetWidth }
                : null;
            }),
        },
      );
      function xl(t) {
        return Array.isArray(t) ? t : [t];
      }
      function kl(t, e, i) {
        while (t.value && t.from <= i) t.from == i && e.push(t.value), t.next();
      }
      class Sl {
        constructor(t, e, i) {
          (this.gutter = t),
            (this.height = i),
            (this.i = 0),
            (this.cursor = Ht.iter(t.markers, e.from));
        }
        addElement(t, e, i) {
          let { gutter: n } = this,
            s = e.top - this.height;
          if (this.i == n.elements.length) {
            let r = new Ml(t, e.height, s, i);
            n.elements.push(r), n.dom.appendChild(r.dom);
          } else n.elements[this.i].update(t, e.height, s, i);
          (this.height = e.bottom), this.i++;
        }
        line(t, e, i) {
          let n = [];
          kl(this.cursor, n, e.from), i.length && (n = n.concat(i));
          let s = this.gutter.config.lineMarker(t, e, n);
          s && n.unshift(s);
          let r = this.gutter;
          (0 != n.length || r.config.renderEmptyElements) &&
            this.addElement(t, e, n);
        }
        widget(t, e) {
          let i = this.gutter.config.widgetMarker(t, e.widget, e);
          i && this.addElement(t, e, [i]);
        }
        finish() {
          let t = this.gutter;
          while (t.elements.length > this.i) {
            let e = t.elements.pop();
            t.dom.removeChild(e.dom), e.destroy();
          }
        }
      }
      class Cl {
        constructor(t, e) {
          (this.view = t),
            (this.config = e),
            (this.elements = []),
            (this.spacer = null),
            (this.dom = document.createElement('div')),
            (this.dom.className =
              'cm-gutter' + (this.config.class ? ' ' + this.config.class : ''));
          for (let i in e.domEventHandlers)
            this.dom.addEventListener(i, (n) => {
              let s,
                r = n.target;
              if (r != this.dom && this.dom.contains(r)) {
                while (r.parentNode != this.dom) r = r.parentNode;
                let t = r.getBoundingClientRect();
                s = (t.top + t.bottom) / 2;
              } else s = n.clientY;
              let o = t.lineBlockAtHeight(s - t.documentTop);
              e.domEventHandlers[i](t, o, n) && n.preventDefault();
            });
          (this.markers = xl(e.markers(t))),
            e.initialSpacer &&
              ((this.spacer = new Ml(t, 0, 0, [e.initialSpacer(t)])),
              this.dom.appendChild(this.spacer.dom),
              (this.spacer.dom.style.cssText +=
                'visibility: hidden; pointer-events: none'));
        }
        update(t) {
          let e = this.markers;
          if (
            ((this.markers = xl(this.config.markers(t.view))),
            this.spacer && this.config.updateSpacer)
          ) {
            let e = this.config.updateSpacer(this.spacer.markers[0], t);
            e != this.spacer.markers[0] &&
              this.spacer.update(t.view, 0, 0, [e]);
          }
          let i = t.view.viewport;
          return (
            !Ht.eq(this.markers, e, i.from, i.to) ||
            (!!this.config.lineMarkerChange && this.config.lineMarkerChange(t))
          );
        }
        destroy() {
          for (let t of this.elements) t.destroy();
        }
      }
      class Ml {
        constructor(t, e, i, n) {
          (this.height = -1),
            (this.above = 0),
            (this.markers = []),
            (this.dom = document.createElement('div')),
            (this.dom.className = 'cm-gutterElement'),
            this.update(t, e, i, n);
        }
        update(t, e, i, n) {
          this.height != e &&
            (this.dom.style.height = (this.height = e) + 'px'),
            this.above != i &&
              (this.dom.style.marginTop = (this.above = i) ? i + 'px' : ''),
            Al(this.markers, n) || this.setMarkers(t, n);
        }
        setMarkers(t, e) {
          let i = 'cm-gutterElement',
            n = this.dom.firstChild;
          for (let s = 0, r = 0; ; ) {
            let o = r,
              l = s < e.length ? e[s++] : null,
              a = !1;
            if (l) {
              let t = l.elementClass;
              t && (i += ' ' + t);
              for (let e = r; e < this.markers.length; e++)
                if (this.markers[e].compare(l)) {
                  (o = e), (a = !0);
                  break;
                }
            } else o = this.markers.length;
            while (r < o) {
              let t = this.markers[r++];
              if (t.toDOM) {
                t.destroy(n);
                let e = n.nextSibling;
                n.remove(), (n = e);
              }
            }
            if (!l) break;
            l.toDOM &&
              (a ? (n = n.nextSibling) : this.dom.insertBefore(l.toDOM(t), n)),
              a && r++;
          }
          (this.dom.className = i), (this.markers = e);
        }
        destroy() {
          this.setMarkers(null, []);
        }
      }
      function Al(t, e) {
        if (t.length != e.length) return !1;
        for (let i = 0; i < t.length; i++) if (!t[i].compare(e[i])) return !1;
        return !0;
      }
      const Ol = q.define(),
        Dl = q.define({
          combine(t) {
            return Bt(
              t,
              { formatNumber: String, domEventHandlers: {} },
              {
                domEventHandlers(t, e) {
                  let i = Object.assign({}, t);
                  for (let n in e) {
                    let t = i[n],
                      s = e[n];
                    i[n] = t ? (e, i, n) => t(e, i, n) || s(e, i, n) : s;
                  }
                  return i;
                },
              },
            );
          },
        });
      class Tl extends fl {
        constructor(t) {
          super(), (this.number = t);
        }
        eq(t) {
          return this.number == t.number;
        }
        toDOM() {
          return document.createTextNode(this.number);
        }
      }
      function El(t, e) {
        return t.state.facet(Dl).formatNumber(e, t.state);
      }
      const Rl = gl.compute([Dl], (t) => ({
        class: 'cm-lineNumbers',
        renderEmptyElements: !1,
        markers(t) {
          return t.state.facet(Ol);
        },
        lineMarker(t, e, i) {
          return i.some((t) => t.toDOM)
            ? null
            : new Tl(El(t, t.state.doc.lineAt(e.from).number));
        },
        widgetMarker: () => null,
        lineMarkerChange: (t) => t.startState.facet(Dl) != t.state.facet(Dl),
        initialSpacer(t) {
          return new Tl(El(t, Ll(t.state.doc.lines)));
        },
        updateSpacer(t, e) {
          let i = El(e.view, Ll(e.view.state.doc.lines));
          return i == t.number ? t : new Tl(i);
        },
        domEventHandlers: t.facet(Dl).domEventHandlers,
      }));
      function Bl(t = {}) {
        return [Dl.of(t), yl(), Rl];
      }
      function Ll(t) {
        let e = 9;
        while (e < t) e = 10 * e + 9;
        return e;
      }
      const Nl = new (class extends fl {
          constructor() {
            super(...arguments), (this.elementClass = 'cm-activeLineGutter');
          }
        })(),
        Pl = pl.compute(['selection'], (t) => {
          let e = [],
            i = -1;
          for (let n of t.selection.ranges) {
            let s = t.doc.lineAt(n.head).from;
            s > i && ((i = s), e.push(Nl.range(s)));
          }
          return Ht.of(e);
        });
      function Il() {
        return Pl;
      }
      const Hl = 1024;
      let Wl = 0;
      class Vl {
        constructor(t, e) {
          (this.from = t), (this.to = e);
        }
      }
      class zl {
        constructor(t = {}) {
          (this.id = Wl++),
            (this.perNode = !!t.perNode),
            (this.deserialize =
              t.deserialize ||
              (() => {
                throw new Error(
                  "This node type doesn't define a deserialize function",
                );
              }));
        }
        add(t) {
          if (this.perNode)
            throw new RangeError("Can't add per-node props to node types");
          return (
            'function' != typeof t && (t = ql.match(t)),
            (e) => {
              let i = t(e);
              return void 0 === i ? null : [this, i];
            }
          );
        }
      }
      (zl.closedBy = new zl({ deserialize: (t) => t.split(' ') })),
        (zl.openedBy = new zl({ deserialize: (t) => t.split(' ') })),
        (zl.group = new zl({ deserialize: (t) => t.split(' ') })),
        (zl.contextHash = new zl({ perNode: !0 })),
        (zl.lookAhead = new zl({ perNode: !0 })),
        (zl.mounted = new zl({ perNode: !0 }));
      const Fl = Object.create(null);
      class ql {
        constructor(t, e, i, n = 0) {
          (this.name = t), (this.props = e), (this.id = i), (this.flags = n);
        }
        static define(t) {
          let e = t.props && t.props.length ? Object.create(null) : Fl,
            i =
              (t.top ? 1 : 0) |
              (t.skipped ? 2 : 0) |
              (t.error ? 4 : 0) |
              (null == t.name ? 8 : 0),
            n = new ql(t.name || '', e, t.id, i);
          if (t.props)
            for (let s of t.props)
              if ((Array.isArray(s) || (s = s(n)), s)) {
                if (s[0].perNode)
                  throw new RangeError(
                    "Can't store a per-node prop on a node type",
                  );
                e[s[0].id] = s[1];
              }
          return n;
        }
        prop(t) {
          return this.props[t.id];
        }
        get isTop() {
          return (1 & this.flags) > 0;
        }
        get isSkipped() {
          return (2 & this.flags) > 0;
        }
        get isError() {
          return (4 & this.flags) > 0;
        }
        get isAnonymous() {
          return (8 & this.flags) > 0;
        }
        is(t) {
          if ('string' == typeof t) {
            if (this.name == t) return !0;
            let e = this.prop(zl.group);
            return !!e && e.indexOf(t) > -1;
          }
          return this.id == t;
        }
        static match(t) {
          let e = Object.create(null);
          for (let i in t) for (let n of i.split(' ')) e[n] = t[i];
          return (t) => {
            for (
              let i = t.prop(zl.group), n = -1;
              n < (i ? i.length : 0);
              n++
            ) {
              let s = e[n < 0 ? t.name : i[n]];
              if (s) return s;
            }
          };
        }
      }
      ql.none = new ql('', Object.create(null), 0, 8);
      const jl = new WeakMap(),
        _l = new WeakMap();
      var Kl;
      (function (t) {
        (t[(t['ExcludeBuffers'] = 1)] = 'ExcludeBuffers'),
          (t[(t['IncludeAnonymous'] = 2)] = 'IncludeAnonymous'),
          (t[(t['IgnoreMounts'] = 4)] = 'IgnoreMounts'),
          (t[(t['IgnoreOverlays'] = 8)] = 'IgnoreOverlays');
      })(Kl || (Kl = {}));
      class $l {
        constructor(t, e, i, n, s) {
          if (
            ((this.type = t),
            (this.children = e),
            (this.positions = i),
            (this.length = n),
            (this.props = null),
            s && s.length)
          ) {
            this.props = Object.create(null);
            for (let [t, e] of s)
              this.props['number' == typeof t ? t : t.id] = e;
          }
        }
        toString() {
          let t = this.prop(zl.mounted);
          if (t && !t.overlay) return t.tree.toString();
          let e = '';
          for (let i of this.children) {
            let t = i.toString();
            t && (e && (e += ','), (e += t));
          }
          return this.type.name
            ? (/\W/.test(this.type.name) && !this.type.isError
                ? JSON.stringify(this.type.name)
                : this.type.name) + (e.length ? '(' + e + ')' : '')
            : e;
        }
        cursor(t = 0) {
          return new na(this.topNode, t);
        }
        cursorAt(t, e = 0, i = 0) {
          let n = jl.get(this) || this.topNode,
            s = new na(n);
          return s.moveTo(t, e), jl.set(this, s._tree), s;
        }
        get topNode() {
          return new Zl(this, 0, 0, null);
        }
        resolve(t, e = 0) {
          let i = Xl(jl.get(this) || this.topNode, t, e, !1);
          return jl.set(this, i), i;
        }
        resolveInner(t, e = 0) {
          let i = Xl(_l.get(this) || this.topNode, t, e, !0);
          return _l.set(this, i), i;
        }
        iterate(t) {
          let { enter: e, leave: i, from: n = 0, to: s = this.length } = t;
          for (let r = this.cursor((t.mode || 0) | Kl.IncludeAnonymous); ; ) {
            let t = !1;
            if (
              r.from <= s &&
              r.to >= n &&
              (r.type.isAnonymous || !1 !== e(r))
            ) {
              if (r.firstChild()) continue;
              t = !0;
            }
            for (;;) {
              if ((t && i && !r.type.isAnonymous && i(r), r.nextSibling()))
                break;
              if (!r.parent()) return;
              t = !0;
            }
          }
        }
        prop(t) {
          return t.perNode
            ? this.props
              ? this.props[t.id]
              : void 0
            : this.type.prop(t);
        }
        get propValues() {
          let t = [];
          if (this.props) for (let e in this.props) t.push([+e, this.props[e]]);
          return t;
        }
        balance(t = {}) {
          return this.children.length <= 8
            ? this
            : aa(
                ql.none,
                this.children,
                this.positions,
                0,
                this.children.length,
                0,
                this.length,
                (t, e, i) => new $l(this.type, t, e, i, this.propValues),
                t.makeTree || ((t, e, i) => new $l(ql.none, t, e, i)),
              );
        }
        static build(t) {
          return ra(t);
        }
      }
      $l.empty = new $l(ql.none, [], [], 0);
      class Ul {
        constructor(t, e) {
          (this.buffer = t), (this.index = e);
        }
        get id() {
          return this.buffer[this.index - 4];
        }
        get start() {
          return this.buffer[this.index - 3];
        }
        get end() {
          return this.buffer[this.index - 2];
        }
        get size() {
          return this.buffer[this.index - 1];
        }
        get pos() {
          return this.index;
        }
        next() {
          this.index -= 4;
        }
        fork() {
          return new Ul(this.buffer, this.index);
        }
      }
      class Gl {
        constructor(t, e, i) {
          (this.buffer = t), (this.length = e), (this.set = i);
        }
        get type() {
          return ql.none;
        }
        toString() {
          let t = [];
          for (let e = 0; e < this.buffer.length; )
            t.push(this.childString(e)), (e = this.buffer[e + 3]);
          return t.join(',');
        }
        childString(t) {
          let e = this.buffer[t],
            i = this.buffer[t + 3],
            n = this.set.types[e],
            s = n.name;
          if (
            (/\W/.test(s) && !n.isError && (s = JSON.stringify(s)),
            (t += 4),
            i == t)
          )
            return s;
          let r = [];
          while (t < i) r.push(this.childString(t)), (t = this.buffer[t + 3]);
          return s + '(' + r.join(',') + ')';
        }
        findChild(t, e, i, n, s) {
          let { buffer: r } = this,
            o = -1;
          for (let l = t; l != e; l = r[l + 3])
            if (Jl(s, n, r[l + 1], r[l + 2]) && ((o = l), i > 0)) break;
          return o;
        }
        slice(t, e, i) {
          let n = this.buffer,
            s = new Uint16Array(e - t),
            r = 0;
          for (let o = t, l = 0; o < e; ) {
            (s[l++] = n[o++]), (s[l++] = n[o++] - i);
            let e = (s[l++] = n[o++] - i);
            (s[l++] = n[o++] - t), (r = Math.max(r, e));
          }
          return new Gl(s, r, this.set);
        }
      }
      function Jl(t, e, i, n) {
        switch (t) {
          case -2:
            return i < e;
          case -1:
            return n >= e && i < e;
          case 0:
            return i < e && n > e;
          case 1:
            return i <= e && n > e;
          case 2:
            return n > e;
          case 4:
            return !0;
        }
      }
      function Yl(t, e) {
        let i = t.childBefore(e);
        while (i) {
          let e = i.lastChild;
          if (!e || e.to != i.to) break;
          e.type.isError && e.from == e.to
            ? ((t = i), (i = e.prevSibling))
            : (i = e);
        }
        return t;
      }
      function Xl(t, e, i, n) {
        var s;
        while (
          t.from == t.to ||
          (i < 1 ? t.from >= e : t.from > e) ||
          (i > -1 ? t.to <= e : t.to < e)
        ) {
          let e = !n && t instanceof Zl && t.index < 0 ? null : t.parent;
          if (!e) return t;
          t = e;
        }
        let r = n ? 0 : Kl.IgnoreOverlays;
        if (n)
          for (let o = t, l = o.parent; l; o = l, l = o.parent)
            o instanceof Zl &&
              o.index < 0 &&
              (null === (s = l.enter(e, i, r)) || void 0 === s
                ? void 0
                : s.from) != o.from &&
              (t = l);
        for (;;) {
          let n = t.enter(e, i, r);
          if (!n) return t;
          t = n;
        }
      }
      class Zl {
        constructor(t, e, i, n) {
          (this._tree = t),
            (this.from = e),
            (this.index = i),
            (this._parent = n);
        }
        get type() {
          return this._tree.type;
        }
        get name() {
          return this._tree.type.name;
        }
        get to() {
          return this.from + this._tree.length;
        }
        nextChild(t, e, i, n, s = 0) {
          for (let r = this; ; ) {
            for (
              let { children: o, positions: l } = r._tree,
                a = e > 0 ? o.length : -1;
              t != a;
              t += e
            ) {
              let a = o[t],
                h = l[t] + r.from;
              if (Jl(n, i, h, h + a.length))
                if (a instanceof Gl) {
                  if (s & Kl.ExcludeBuffers) continue;
                  let o = a.findChild(0, a.buffer.length, e, i - h, n);
                  if (o > -1) return new ia(new ea(r, a, t, h), null, o);
                } else if (
                  s & Kl.IncludeAnonymous ||
                  !a.type.isAnonymous ||
                  sa(a)
                ) {
                  let o;
                  if (
                    !(s & Kl.IgnoreMounts) &&
                    a.props &&
                    (o = a.prop(zl.mounted)) &&
                    !o.overlay
                  )
                    return new Zl(o.tree, h, t, r);
                  let l = new Zl(a, h, t, r);
                  return s & Kl.IncludeAnonymous || !l.type.isAnonymous
                    ? l
                    : l.nextChild(e < 0 ? a.children.length - 1 : 0, e, i, n);
                }
            }
            if (s & Kl.IncludeAnonymous || !r.type.isAnonymous) return null;
            if (
              ((t =
                r.index >= 0
                  ? r.index + e
                  : e < 0
                  ? -1
                  : r._parent._tree.children.length),
              (r = r._parent),
              !r)
            )
              return null;
          }
        }
        get firstChild() {
          return this.nextChild(0, 1, 0, 4);
        }
        get lastChild() {
          return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
        }
        childAfter(t) {
          return this.nextChild(0, 1, t, 2);
        }
        childBefore(t) {
          return this.nextChild(this._tree.children.length - 1, -1, t, -2);
        }
        enter(t, e, i = 0) {
          let n;
          if (
            !(i & Kl.IgnoreOverlays) &&
            (n = this._tree.prop(zl.mounted)) &&
            n.overlay
          ) {
            let i = t - this.from;
            for (let { from: t, to: s } of n.overlay)
              if ((e > 0 ? t <= i : t < i) && (e < 0 ? s >= i : s > i))
                return new Zl(n.tree, n.overlay[0].from + this.from, -1, this);
          }
          return this.nextChild(0, 1, t, e, i);
        }
        nextSignificantParent() {
          let t = this;
          while (t.type.isAnonymous && t._parent) t = t._parent;
          return t;
        }
        get parent() {
          return this._parent ? this._parent.nextSignificantParent() : null;
        }
        get nextSibling() {
          return this._parent && this.index >= 0
            ? this._parent.nextChild(this.index + 1, 1, 0, 4)
            : null;
        }
        get prevSibling() {
          return this._parent && this.index >= 0
            ? this._parent.nextChild(this.index - 1, -1, 0, 4)
            : null;
        }
        cursor(t = 0) {
          return new na(this, t);
        }
        get tree() {
          return this._tree;
        }
        toTree() {
          return this._tree;
        }
        resolve(t, e = 0) {
          return Xl(this, t, e, !1);
        }
        resolveInner(t, e = 0) {
          return Xl(this, t, e, !0);
        }
        enterUnfinishedNodesBefore(t) {
          return Yl(this, t);
        }
        getChild(t, e = null, i = null) {
          let n = Ql(this, t, e, i);
          return n.length ? n[0] : null;
        }
        getChildren(t, e = null, i = null) {
          return Ql(this, t, e, i);
        }
        toString() {
          return this._tree.toString();
        }
        get node() {
          return this;
        }
        matchContext(t) {
          return ta(this, t);
        }
      }
      function Ql(t, e, i, n) {
        let s = t.cursor(),
          r = [];
        if (!s.firstChild()) return r;
        if (null != i) while (!s.type.is(i)) if (!s.nextSibling()) return r;
        for (;;) {
          if (null != n && s.type.is(n)) return r;
          if ((s.type.is(e) && r.push(s.node), !s.nextSibling()))
            return null == n ? r : [];
        }
      }
      function ta(t, e, i = e.length - 1) {
        for (let n = t.parent; i >= 0; n = n.parent) {
          if (!n) return !1;
          if (!n.type.isAnonymous) {
            if (e[i] && e[i] != n.name) return !1;
            i--;
          }
        }
        return !0;
      }
      class ea {
        constructor(t, e, i, n) {
          (this.parent = t),
            (this.buffer = e),
            (this.index = i),
            (this.start = n);
        }
      }
      class ia {
        get name() {
          return this.type.name;
        }
        get from() {
          return (
            this.context.start + this.context.buffer.buffer[this.index + 1]
          );
        }
        get to() {
          return (
            this.context.start + this.context.buffer.buffer[this.index + 2]
          );
        }
        constructor(t, e, i) {
          (this.context = t),
            (this._parent = e),
            (this.index = i),
            (this.type = t.buffer.set.types[t.buffer.buffer[i]]);
        }
        child(t, e, i) {
          let { buffer: n } = this.context,
            s = n.findChild(
              this.index + 4,
              n.buffer[this.index + 3],
              t,
              e - this.context.start,
              i,
            );
          return s < 0 ? null : new ia(this.context, this, s);
        }
        get firstChild() {
          return this.child(1, 0, 4);
        }
        get lastChild() {
          return this.child(-1, 0, 4);
        }
        childAfter(t) {
          return this.child(1, t, 2);
        }
        childBefore(t) {
          return this.child(-1, t, -2);
        }
        enter(t, e, i = 0) {
          if (i & Kl.ExcludeBuffers) return null;
          let { buffer: n } = this.context,
            s = n.findChild(
              this.index + 4,
              n.buffer[this.index + 3],
              e > 0 ? 1 : -1,
              t - this.context.start,
              e,
            );
          return s < 0 ? null : new ia(this.context, this, s);
        }
        get parent() {
          return this._parent || this.context.parent.nextSignificantParent();
        }
        externalSibling(t) {
          return this._parent
            ? null
            : this.context.parent.nextChild(this.context.index + t, t, 0, 4);
        }
        get nextSibling() {
          let { buffer: t } = this.context,
            e = t.buffer[this.index + 3];
          return e <
            (this._parent ? t.buffer[this._parent.index + 3] : t.buffer.length)
            ? new ia(this.context, this._parent, e)
            : this.externalSibling(1);
        }
        get prevSibling() {
          let { buffer: t } = this.context,
            e = this._parent ? this._parent.index + 4 : 0;
          return this.index == e
            ? this.externalSibling(-1)
            : new ia(
                this.context,
                this._parent,
                t.findChild(e, this.index, -1, 0, 4),
              );
        }
        cursor(t = 0) {
          return new na(this, t);
        }
        get tree() {
          return null;
        }
        toTree() {
          let t = [],
            e = [],
            { buffer: i } = this.context,
            n = this.index + 4,
            s = i.buffer[this.index + 3];
          if (s > n) {
            let r = i.buffer[this.index + 1];
            t.push(i.slice(n, s, r)), e.push(0);
          }
          return new $l(this.type, t, e, this.to - this.from);
        }
        resolve(t, e = 0) {
          return Xl(this, t, e, !1);
        }
        resolveInner(t, e = 0) {
          return Xl(this, t, e, !0);
        }
        enterUnfinishedNodesBefore(t) {
          return Yl(this, t);
        }
        toString() {
          return this.context.buffer.childString(this.index);
        }
        getChild(t, e = null, i = null) {
          let n = Ql(this, t, e, i);
          return n.length ? n[0] : null;
        }
        getChildren(t, e = null, i = null) {
          return Ql(this, t, e, i);
        }
        get node() {
          return this;
        }
        matchContext(t) {
          return ta(this, t);
        }
      }
      class na {
        get name() {
          return this.type.name;
        }
        constructor(t, e = 0) {
          if (
            ((this.mode = e),
            (this.buffer = null),
            (this.stack = []),
            (this.index = 0),
            (this.bufferNode = null),
            t instanceof Zl)
          )
            this.yieldNode(t);
          else {
            (this._tree = t.context.parent), (this.buffer = t.context);
            for (let e = t._parent; e; e = e._parent)
              this.stack.unshift(e.index);
            (this.bufferNode = t), this.yieldBuf(t.index);
          }
        }
        yieldNode(t) {
          return (
            !!t &&
            ((this._tree = t),
            (this.type = t.type),
            (this.from = t.from),
            (this.to = t.to),
            !0)
          );
        }
        yieldBuf(t, e) {
          this.index = t;
          let { start: i, buffer: n } = this.buffer;
          return (
            (this.type = e || n.set.types[n.buffer[t]]),
            (this.from = i + n.buffer[t + 1]),
            (this.to = i + n.buffer[t + 2]),
            !0
          );
        }
        yield(t) {
          return (
            !!t &&
            (t instanceof Zl
              ? ((this.buffer = null), this.yieldNode(t))
              : ((this.buffer = t.context), this.yieldBuf(t.index, t.type)))
          );
        }
        toString() {
          return this.buffer
            ? this.buffer.buffer.childString(this.index)
            : this._tree.toString();
        }
        enterChild(t, e, i) {
          if (!this.buffer)
            return this.yield(
              this._tree.nextChild(
                t < 0 ? this._tree._tree.children.length - 1 : 0,
                t,
                e,
                i,
                this.mode,
              ),
            );
          let { buffer: n } = this.buffer,
            s = n.findChild(
              this.index + 4,
              n.buffer[this.index + 3],
              t,
              e - this.buffer.start,
              i,
            );
          return !(s < 0) && (this.stack.push(this.index), this.yieldBuf(s));
        }
        firstChild() {
          return this.enterChild(1, 0, 4);
        }
        lastChild() {
          return this.enterChild(-1, 0, 4);
        }
        childAfter(t) {
          return this.enterChild(1, t, 2);
        }
        childBefore(t) {
          return this.enterChild(-1, t, -2);
        }
        enter(t, e, i = this.mode) {
          return this.buffer
            ? !(i & Kl.ExcludeBuffers) && this.enterChild(1, t, e)
            : this.yield(this._tree.enter(t, e, i));
        }
        parent() {
          if (!this.buffer)
            return this.yieldNode(
              this.mode & Kl.IncludeAnonymous
                ? this._tree._parent
                : this._tree.parent,
            );
          if (this.stack.length) return this.yieldBuf(this.stack.pop());
          let t =
            this.mode & Kl.IncludeAnonymous
              ? this.buffer.parent
              : this.buffer.parent.nextSignificantParent();
          return (this.buffer = null), this.yieldNode(t);
        }
        sibling(t) {
          if (!this.buffer)
            return (
              !!this._tree._parent &&
              this.yield(
                this._tree.index < 0
                  ? null
                  : this._tree._parent.nextChild(
                      this._tree.index + t,
                      t,
                      0,
                      4,
                      this.mode,
                    ),
              )
            );
          let { buffer: e } = this.buffer,
            i = this.stack.length - 1;
          if (t < 0) {
            let t = i < 0 ? 0 : this.stack[i] + 4;
            if (this.index != t)
              return this.yieldBuf(e.findChild(t, this.index, -1, 0, 4));
          } else {
            let t = e.buffer[this.index + 3];
            if (t < (i < 0 ? e.buffer.length : e.buffer[this.stack[i] + 3]))
              return this.yieldBuf(t);
          }
          return (
            i < 0 &&
            this.yield(
              this.buffer.parent.nextChild(
                this.buffer.index + t,
                t,
                0,
                4,
                this.mode,
              ),
            )
          );
        }
        nextSibling() {
          return this.sibling(1);
        }
        prevSibling() {
          return this.sibling(-1);
        }
        atLastNode(t) {
          let e,
            i,
            { buffer: n } = this;
          if (n) {
            if (t > 0) {
              if (this.index < n.buffer.buffer.length) return !1;
            } else
              for (let t = 0; t < this.index; t++)
                if (n.buffer.buffer[t + 3] < this.index) return !1;
            ({ index: e, parent: i } = n);
          } else ({ index: e, _parent: i } = this._tree);
          for (; i; { index: e, _parent: i } = i)
            if (e > -1)
              for (
                let n = e + t, s = t < 0 ? -1 : i._tree.children.length;
                n != s;
                n += t
              ) {
                let t = i._tree.children[n];
                if (
                  this.mode & Kl.IncludeAnonymous ||
                  t instanceof Gl ||
                  !t.type.isAnonymous ||
                  sa(t)
                )
                  return !1;
              }
          return !0;
        }
        move(t, e) {
          if (e && this.enterChild(t, 0, 4)) return !0;
          for (;;) {
            if (this.sibling(t)) return !0;
            if (this.atLastNode(t) || !this.parent()) return !1;
          }
        }
        next(t = !0) {
          return this.move(1, t);
        }
        prev(t = !0) {
          return this.move(-1, t);
        }
        moveTo(t, e = 0) {
          while (
            this.from == this.to ||
            (e < 1 ? this.from >= t : this.from > t) ||
            (e > -1 ? this.to <= t : this.to < t)
          )
            if (!this.parent()) break;
          while (this.enterChild(1, t, e));
          return this;
        }
        get node() {
          if (!this.buffer) return this._tree;
          let t = this.bufferNode,
            e = null,
            i = 0;
          if (t && t.context == this.buffer)
            t: for (let n = this.index, s = this.stack.length; s >= 0; ) {
              for (let r = t; r; r = r._parent)
                if (r.index == n) {
                  if (n == this.index) return r;
                  (e = r), (i = s + 1);
                  break t;
                }
              n = this.stack[--s];
            }
          for (let n = i; n < this.stack.length; n++)
            e = new ia(this.buffer, e, this.stack[n]);
          return (this.bufferNode = new ia(this.buffer, e, this.index));
        }
        get tree() {
          return this.buffer ? null : this._tree._tree;
        }
        iterate(t, e) {
          for (let i = 0; ; ) {
            let n = !1;
            if (this.type.isAnonymous || !1 !== t(this)) {
              if (this.firstChild()) {
                i++;
                continue;
              }
              this.type.isAnonymous || (n = !0);
            }
            for (;;) {
              if (
                (n && e && e(this),
                (n = this.type.isAnonymous),
                this.nextSibling())
              )
                break;
              if (!i) return;
              this.parent(), i--, (n = !0);
            }
          }
        }
        matchContext(t) {
          if (!this.buffer) return ta(this.node, t);
          let { buffer: e } = this.buffer,
            { types: i } = e.set;
          for (let n = t.length - 1, s = this.stack.length - 1; n >= 0; s--) {
            if (s < 0) return ta(this.node, t, n);
            let r = i[e.buffer[this.stack[s]]];
            if (!r.isAnonymous) {
              if (t[n] && t[n] != r.name) return !1;
              n--;
            }
          }
          return !0;
        }
      }
      function sa(t) {
        return t.children.some(
          (t) => t instanceof Gl || !t.type.isAnonymous || sa(t),
        );
      }
      function ra(t) {
        var e;
        let {
            buffer: i,
            nodeSet: n,
            maxBufferLength: s = Hl,
            reused: r = [],
            minRepeatType: o = n.types.length,
          } = t,
          l = Array.isArray(i) ? new Ul(i, i.length) : i,
          a = n.types,
          h = 0,
          c = 0;
        function u(t, e, i, v, w) {
          let { id: y, start: b, end: x, size: k } = l,
            S = c;
          while (k < 0) {
            if ((l.next(), -1 == k)) {
              let e = r[y];
              return i.push(e), void v.push(b - t);
            }
            if (-3 == k) return void (h = y);
            if (-4 == k) return void (c = y);
            throw new RangeError(`Unrecognized record size: ${k}`);
          }
          let C,
            M,
            A = a[y],
            O = b - t;
          if (x - b <= s && (M = m(l.pos - e, w))) {
            let e = new Uint16Array(M.size - M.skip),
              i = l.pos - M.size,
              s = e.length;
            while (l.pos > i) s = g(M.start, e, s);
            (C = new Gl(e, x - M.start, n)), (O = M.start - t);
          } else {
            let t = l.pos - k;
            l.next();
            let e = [],
              i = [],
              n = y >= o ? y : -1,
              r = 0,
              a = x;
            while (l.pos > t)
              n >= 0 && l.id == n && l.size >= 0
                ? (l.end <= a - s &&
                    (f(e, i, b, r, l.end, a, n, S),
                    (r = e.length),
                    (a = l.end)),
                  l.next())
                : u(b, t, e, i, n);
            if (
              (n >= 0 && r > 0 && r < e.length && f(e, i, b, r, b, a, n, S),
              e.reverse(),
              i.reverse(),
              n > -1 && r > 0)
            ) {
              let t = d(A);
              C = aa(A, e, i, 0, e.length, 0, x - b, t, t);
            } else C = p(A, e, i, x - b, S - x);
          }
          i.push(C), v.push(O);
        }
        function d(t) {
          return (e, i, n) => {
            let s,
              r,
              o = 0,
              l = e.length - 1;
            if (l >= 0 && (s = e[l]) instanceof $l) {
              if (!l && s.type == t && s.length == n) return s;
              (r = s.prop(zl.lookAhead)) && (o = i[l] + s.length + r);
            }
            return p(t, e, i, n, o);
          };
        }
        function f(t, e, i, s, r, o, l, a) {
          let h = [],
            c = [];
          while (t.length > s) h.push(t.pop()), c.push(e.pop() + i - r);
          t.push(p(n.types[l], h, c, o - r, a - o)), e.push(r - i);
        }
        function p(t, e, i, n, s = 0, r) {
          if (h) {
            let t = [zl.contextHash, h];
            r = r ? [t].concat(r) : [t];
          }
          if (s > 25) {
            let t = [zl.lookAhead, s];
            r = r ? [t].concat(r) : [t];
          }
          return new $l(t, e, i, n, r);
        }
        function m(t, e) {
          let i = l.fork(),
            n = 0,
            r = 0,
            a = 0,
            h = i.end - s,
            c = { size: 0, start: 0, skip: 0 };
          t: for (let s = i.pos - t; i.pos > s; ) {
            let t = i.size;
            if (i.id == e && t >= 0) {
              (c.size = n),
                (c.start = r),
                (c.skip = a),
                (a += 4),
                (n += 4),
                i.next();
              continue;
            }
            let l = i.pos - t;
            if (t < 0 || l < s || i.start < h) break;
            let u = i.id >= o ? 4 : 0,
              d = i.start;
            i.next();
            while (i.pos > l) {
              if (i.size < 0) {
                if (-3 != i.size) break t;
                u += 4;
              } else i.id >= o && (u += 4);
              i.next();
            }
            (r = d), (n += t), (a += u);
          }
          return (
            (e < 0 || n == t) && ((c.size = n), (c.start = r), (c.skip = a)),
            c.size > 4 ? c : void 0
          );
        }
        function g(t, e, i) {
          let { id: n, start: s, end: r, size: a } = l;
          if ((l.next(), a >= 0 && n < o)) {
            let o = i;
            if (a > 4) {
              let n = l.pos - (a - 4);
              while (l.pos > n) i = g(t, e, i);
            }
            (e[--i] = o), (e[--i] = r - t), (e[--i] = s - t), (e[--i] = n);
          } else -3 == a ? (h = n) : -4 == a && (c = n);
          return i;
        }
        let v = [],
          w = [];
        while (l.pos > 0) u(t.start || 0, t.bufferStart || 0, v, w, -1);
        let y =
          null !== (e = t.length) && void 0 !== e
            ? e
            : v.length
            ? w[0] + v[0].length
            : 0;
        return new $l(a[t.topID], v.reverse(), w.reverse(), y);
      }
      const oa = new WeakMap();
      function la(t, e) {
        if (!t.isAnonymous || e instanceof Gl || e.type != t) return 1;
        let i = oa.get(e);
        if (null == i) {
          i = 1;
          for (let n of e.children) {
            if (n.type != t || !(n instanceof $l)) {
              i = 1;
              break;
            }
            i += la(t, n);
          }
          oa.set(e, i);
        }
        return i;
      }
      function aa(t, e, i, n, s, r, o, l, a) {
        let h = 0;
        for (let p = n; p < s; p++) h += la(t, e[p]);
        let c = Math.ceil((1.5 * h) / 8),
          u = [],
          d = [];
        function f(e, i, n, s, o) {
          for (let l = n; l < s; ) {
            let n = l,
              h = i[l],
              p = la(t, e[l]);
            for (l++; l < s; l++) {
              let i = la(t, e[l]);
              if (p + i >= c) break;
              p += i;
            }
            if (l == n + 1) {
              if (p > c) {
                let t = e[n];
                f(t.children, t.positions, 0, t.children.length, i[n] + o);
                continue;
              }
              u.push(e[n]);
            } else {
              let s = i[l - 1] + e[l - 1].length - h;
              u.push(aa(t, e, i, n, l, h, s, null, a));
            }
            d.push(h + o - r);
          }
        }
        return f(e, i, n, s, 0), (l || a)(u, d, o);
      }
      class ha {
        constructor(t, e, i, n, s = !1, r = !1) {
          (this.from = t),
            (this.to = e),
            (this.tree = i),
            (this.offset = n),
            (this.open = (s ? 1 : 0) | (r ? 2 : 0));
        }
        get openStart() {
          return (1 & this.open) > 0;
        }
        get openEnd() {
          return (2 & this.open) > 0;
        }
        static addTree(t, e = [], i = !1) {
          let n = [new ha(0, t.length, t, 0, !1, i)];
          for (let s of e) s.to > t.length && n.push(s);
          return n;
        }
        static applyChanges(t, e, i = 128) {
          if (!e.length) return t;
          let n = [],
            s = 1,
            r = t.length ? t[0] : null;
          for (let o = 0, l = 0, a = 0; ; o++) {
            let h = o < e.length ? e[o] : null,
              c = h ? h.fromA : 1e9;
            if (c - l >= i)
              while (r && r.from < c) {
                let e = r;
                if (l >= e.from || c <= e.to || a) {
                  let t = Math.max(e.from, l) - a,
                    i = Math.min(e.to, c) - a;
                  e =
                    t >= i
                      ? null
                      : new ha(t, i, e.tree, e.offset + a, o > 0, !!h);
                }
                if ((e && n.push(e), r.to > c)) break;
                r = s < t.length ? t[s++] : null;
              }
            if (!h) break;
            (l = h.toA), (a = h.toA - h.toB);
          }
          return n;
        }
      }
      class ca {
        startParse(t, e, i) {
          return (
            'string' == typeof t && (t = new ua(t)),
            (i = i
              ? i.length
                ? i.map((t) => new Vl(t.from, t.to))
                : [new Vl(0, 0)]
              : [new Vl(0, t.length)]),
            this.createParse(t, e || [], i)
          );
        }
        parse(t, e, i) {
          let n = this.startParse(t, e, i);
          for (;;) {
            let t = n.advance();
            if (t) return t;
          }
        }
      }
      class ua {
        constructor(t) {
          this.string = t;
        }
        get length() {
          return this.string.length;
        }
        chunk(t) {
          return this.string.slice(t);
        }
        get lineChunks() {
          return !1;
        }
        read(t, e) {
          return this.string.slice(t, e);
        }
      }
      new zl({ perNode: !0 });
      let da = 0;
      class fa {
        constructor(t, e, i) {
          (this.set = t),
            (this.base = e),
            (this.modified = i),
            (this.id = da++);
        }
        static define(t) {
          if (null === t || void 0 === t ? void 0 : t.base)
            throw new Error('Can not derive from a modified tag');
          let e = new fa([], null, []);
          if ((e.set.push(e), t)) for (let i of t.set) e.set.push(i);
          return e;
        }
        static defineModifier() {
          let t = new ma();
          return (e) =>
            e.modified.indexOf(t) > -1
              ? e
              : ma.get(
                  e.base || e,
                  e.modified.concat(t).sort((t, e) => t.id - e.id),
                );
        }
      }
      let pa = 0;
      class ma {
        constructor() {
          (this.instances = []), (this.id = pa++);
        }
        static get(t, e) {
          if (!e.length) return t;
          let i = e[0].instances.find((i) => i.base == t && ga(e, i.modified));
          if (i) return i;
          let n = [],
            s = new fa(n, t, e);
          for (let o of e) o.instances.push(s);
          let r = va(e);
          for (let o of t.set)
            if (!o.modified.length) for (let t of r) n.push(ma.get(o, t));
          return s;
        }
      }
      function ga(t, e) {
        return t.length == e.length && t.every((t, i) => t == e[i]);
      }
      function va(t) {
        let e = [[]];
        for (let i = 0; i < t.length; i++)
          for (let n = 0, s = e.length; n < s; n++) e.push(e[n].concat(t[i]));
        return e.sort((t, e) => e.length - t.length);
      }
      function wa(t) {
        let e = Object.create(null);
        for (let i in t) {
          let n = t[i];
          Array.isArray(n) || (n = [n]);
          for (let t of i.split(' '))
            if (t) {
              let i = [],
                s = 2,
                r = t;
              for (let e = 0; ; ) {
                if ('...' == r && e > 0 && e + 3 == t.length) {
                  s = 1;
                  break;
                }
                let n = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(r);
                if (!n) throw new RangeError('Invalid path: ' + t);
                if (
                  (i.push(
                    '*' == n[0] ? '' : '"' == n[0][0] ? JSON.parse(n[0]) : n[0],
                  ),
                  (e += n[0].length),
                  e == t.length)
                )
                  break;
                let o = t[e++];
                if (e == t.length && '!' == o) {
                  s = 0;
                  break;
                }
                if ('/' != o) throw new RangeError('Invalid path: ' + t);
                r = t.slice(e);
              }
              let o = i.length - 1,
                l = i[o];
              if (!l) throw new RangeError('Invalid path: ' + t);
              let a = new ba(n, s, o > 0 ? i.slice(0, o) : null);
              e[l] = a.sort(e[l]);
            }
        }
        return ya.add(e);
      }
      const ya = new zl();
      class ba {
        constructor(t, e, i, n) {
          (this.tags = t), (this.mode = e), (this.context = i), (this.next = n);
        }
        get opaque() {
          return 0 == this.mode;
        }
        get inherit() {
          return 1 == this.mode;
        }
        sort(t) {
          return !t || t.depth < this.depth
            ? ((this.next = t), this)
            : ((t.next = this.sort(t.next)), t);
        }
        get depth() {
          return this.context ? this.context.length : 0;
        }
      }
      function xa(t, e) {
        let i = Object.create(null);
        for (let r of t)
          if (Array.isArray(r.tag)) for (let t of r.tag) i[t.id] = r.class;
          else i[r.tag.id] = r.class;
        let { scope: n, all: s = null } = e || {};
        return {
          style: (t) => {
            let e = s;
            for (let n of t)
              for (let t of n.set) {
                let n = i[t.id];
                if (n) {
                  e = e ? e + ' ' + n : n;
                  break;
                }
              }
            return e;
          },
          scope: n,
        };
      }
      function ka(t, e) {
        let i = null;
        for (let n of t) {
          let t = n.style(e);
          t && (i = i ? i + ' ' + t : t);
        }
        return i;
      }
      function Sa(t, e, i, n = 0, s = t.length) {
        let r = new Ca(n, Array.isArray(e) ? e : [e], i);
        r.highlightRange(t.cursor(), n, s, '', r.highlighters), r.flush(s);
      }
      ba.empty = new ba([], 2, null);
      class Ca {
        constructor(t, e, i) {
          (this.at = t),
            (this.highlighters = e),
            (this.span = i),
            (this.class = '');
        }
        startSpan(t, e) {
          e != this.class &&
            (this.flush(t), t > this.at && (this.at = t), (this.class = e));
        }
        flush(t) {
          t > this.at && this.class && this.span(this.at, t, this.class);
        }
        highlightRange(t, e, i, n, s) {
          let { type: r, from: o, to: l } = t;
          if (o >= i || l <= e) return;
          r.isTop &&
            (s = this.highlighters.filter((t) => !t.scope || t.scope(r)));
          let a = n,
            h = Ma(t) || ba.empty,
            c = ka(s, h.tags);
          if (
            (c &&
              (a && (a += ' '),
              (a += c),
              1 == h.mode && (n += (n ? ' ' : '') + c)),
            this.startSpan(t.from, a),
            h.opaque)
          )
            return;
          let u = t.tree && t.tree.prop(zl.mounted);
          if (u && u.overlay) {
            let r = t.node.enter(u.overlay[0].from + o, 1),
              h = this.highlighters.filter(
                (t) => !t.scope || t.scope(u.tree.type),
              ),
              c = t.firstChild();
            for (let d = 0, f = o; ; d++) {
              let p = d < u.overlay.length ? u.overlay[d] : null,
                m = p ? p.from + o : l,
                g = Math.max(e, f),
                v = Math.min(i, m);
              if (g < v && c)
                while (t.from < v)
                  if (
                    (this.highlightRange(t, g, v, n, s),
                    this.startSpan(Math.min(v, t.to), a),
                    t.to >= m || !t.nextSibling())
                  )
                    break;
              if (!p || m > i) break;
              (f = p.to + o),
                f > e &&
                  (this.highlightRange(
                    r.cursor(),
                    Math.max(e, p.from + o),
                    Math.min(i, f),
                    n,
                    h,
                  ),
                  this.startSpan(f, a));
            }
            c && t.parent();
          } else if (t.firstChild()) {
            do {
              if (!(t.to <= e)) {
                if (t.from >= i) break;
                this.highlightRange(t, e, i, n, s),
                  this.startSpan(Math.min(i, t.to), a);
              }
            } while (t.nextSibling());
            t.parent();
          }
        }
      }
      function Ma(t) {
        let e = t.type.prop(ya);
        while (e && e.context && !t.matchContext(e.context)) e = e.next;
        return e || null;
      }
      const Aa = fa.define,
        Oa = Aa(),
        Da = Aa(),
        Ta = Aa(Da),
        Ea = Aa(Da),
        Ra = Aa(),
        Ba = Aa(Ra),
        La = Aa(Ra),
        Na = Aa(),
        Pa = Aa(Na),
        Ia = Aa(),
        Ha = Aa(),
        Wa = Aa(),
        Va = Aa(Wa),
        za = Aa(),
        Fa = {
          comment: Oa,
          lineComment: Aa(Oa),
          blockComment: Aa(Oa),
          docComment: Aa(Oa),
          name: Da,
          variableName: Aa(Da),
          typeName: Ta,
          tagName: Aa(Ta),
          propertyName: Ea,
          attributeName: Aa(Ea),
          className: Aa(Da),
          labelName: Aa(Da),
          namespace: Aa(Da),
          macroName: Aa(Da),
          literal: Ra,
          string: Ba,
          docString: Aa(Ba),
          character: Aa(Ba),
          attributeValue: Aa(Ba),
          number: La,
          integer: Aa(La),
          float: Aa(La),
          bool: Aa(Ra),
          regexp: Aa(Ra),
          escape: Aa(Ra),
          color: Aa(Ra),
          url: Aa(Ra),
          keyword: Ia,
          self: Aa(Ia),
          null: Aa(Ia),
          atom: Aa(Ia),
          unit: Aa(Ia),
          modifier: Aa(Ia),
          operatorKeyword: Aa(Ia),
          controlKeyword: Aa(Ia),
          definitionKeyword: Aa(Ia),
          moduleKeyword: Aa(Ia),
          operator: Ha,
          derefOperator: Aa(Ha),
          arithmeticOperator: Aa(Ha),
          logicOperator: Aa(Ha),
          bitwiseOperator: Aa(Ha),
          compareOperator: Aa(Ha),
          updateOperator: Aa(Ha),
          definitionOperator: Aa(Ha),
          typeOperator: Aa(Ha),
          controlOperator: Aa(Ha),
          punctuation: Wa,
          separator: Aa(Wa),
          bracket: Va,
          angleBracket: Aa(Va),
          squareBracket: Aa(Va),
          paren: Aa(Va),
          brace: Aa(Va),
          content: Na,
          heading: Pa,
          heading1: Aa(Pa),
          heading2: Aa(Pa),
          heading3: Aa(Pa),
          heading4: Aa(Pa),
          heading5: Aa(Pa),
          heading6: Aa(Pa),
          contentSeparator: Aa(Na),
          list: Aa(Na),
          quote: Aa(Na),
          emphasis: Aa(Na),
          strong: Aa(Na),
          link: Aa(Na),
          monospace: Aa(Na),
          strikethrough: Aa(Na),
          inserted: Aa(),
          deleted: Aa(),
          changed: Aa(),
          invalid: Aa(),
          meta: za,
          documentMeta: Aa(za),
          annotation: Aa(za),
          processingInstruction: Aa(za),
          definition: fa.defineModifier(),
          constant: fa.defineModifier(),
          function: fa.defineModifier(),
          standard: fa.defineModifier(),
          local: fa.defineModifier(),
          special: fa.defineModifier(),
        };
      xa([
        { tag: Fa.link, class: 'tok-link' },
        { tag: Fa.heading, class: 'tok-heading' },
        { tag: Fa.emphasis, class: 'tok-emphasis' },
        { tag: Fa.strong, class: 'tok-strong' },
        { tag: Fa.keyword, class: 'tok-keyword' },
        { tag: Fa.atom, class: 'tok-atom' },
        { tag: Fa.bool, class: 'tok-bool' },
        { tag: Fa.url, class: 'tok-url' },
        { tag: Fa.labelName, class: 'tok-labelName' },
        { tag: Fa.inserted, class: 'tok-inserted' },
        { tag: Fa.deleted, class: 'tok-deleted' },
        { tag: Fa.literal, class: 'tok-literal' },
        { tag: Fa.string, class: 'tok-string' },
        { tag: Fa.number, class: 'tok-number' },
        {
          tag: [Fa.regexp, Fa.escape, Fa.special(Fa.string)],
          class: 'tok-string2',
        },
        { tag: Fa.variableName, class: 'tok-variableName' },
        { tag: Fa.local(Fa.variableName), class: 'tok-variableName tok-local' },
        {
          tag: Fa.definition(Fa.variableName),
          class: 'tok-variableName tok-definition',
        },
        { tag: Fa.special(Fa.variableName), class: 'tok-variableName2' },
        {
          tag: Fa.definition(Fa.propertyName),
          class: 'tok-propertyName tok-definition',
        },
        { tag: Fa.typeName, class: 'tok-typeName' },
        { tag: Fa.namespace, class: 'tok-namespace' },
        { tag: Fa.className, class: 'tok-className' },
        { tag: Fa.macroName, class: 'tok-macroName' },
        { tag: Fa.propertyName, class: 'tok-propertyName' },
        { tag: Fa.operator, class: 'tok-operator' },
        { tag: Fa.comment, class: 'tok-comment' },
        { tag: Fa.meta, class: 'tok-meta' },
        { tag: Fa.invalid, class: 'tok-invalid' },
        { tag: Fa.punctuation, class: 'tok-punctuation' },
      ]);
      var qa;
      const ja = new zl();
      const _a = new zl();
      class Ka {
        constructor(t, e, i = [], n = '') {
          (this.data = t),
            (this.name = n),
            Rt.prototype.hasOwnProperty('tree') ||
              Object.defineProperty(Rt.prototype, 'tree', {
                get() {
                  return Ua(this);
                },
              }),
            (this.parser = e),
            (this.extension = [
              ih.of(this),
              Rt.languageData.of((t, e, i) => {
                let n = $a(t, e, i),
                  s = n.type.prop(ja);
                if (!s) return [];
                let r = t.facet(s),
                  o = n.type.prop(_a);
                if (o) {
                  let s = n.resolve(e - n.from, i);
                  for (let e of o)
                    if (e.test(s, t)) {
                      let i = t.facet(e.facet);
                      return 'replace' == e.type ? i : i.concat(r);
                    }
                }
                return r;
              }),
            ].concat(i));
        }
        isActiveAt(t, e, i = -1) {
          return $a(t, e, i).type.prop(ja) == this.data;
        }
        findRegions(t) {
          let e = t.facet(ih);
          if ((null === e || void 0 === e ? void 0 : e.data) == this.data)
            return [{ from: 0, to: t.doc.length }];
          if (!e || !e.allowsNesting) return [];
          let i = [],
            n = (t, e) => {
              if (t.prop(ja) == this.data)
                return void i.push({ from: e, to: e + t.length });
              let s = t.prop(zl.mounted);
              if (s) {
                if (s.tree.prop(ja) == this.data) {
                  if (s.overlay)
                    for (let t of s.overlay)
                      i.push({ from: t.from + e, to: t.to + e });
                  else i.push({ from: e, to: e + t.length });
                  return;
                }
                if (s.overlay) {
                  let t = i.length;
                  if ((n(s.tree, s.overlay[0].from + e), i.length > t)) return;
                }
              }
              for (let i = 0; i < t.children.length; i++) {
                let s = t.children[i];
                s instanceof $l && n(s, t.positions[i] + e);
              }
            };
          return n(Ua(t), 0), i;
        }
        get allowsNesting() {
          return !0;
        }
      }
      function $a(t, e, i) {
        let n = t.facet(ih),
          s = Ua(t).topNode;
        if (!n || n.allowsNesting)
          for (let r = s; r; r = r.enter(e, i, Kl.ExcludeBuffers))
            r.type.isTop && (s = r);
        return s;
      }
      Ka.setState = gt.define();
      function Ua(t) {
        let e = t.field(Ka.state, !1);
        return e ? e.tree : $l.empty;
      }
      class Ga {
        constructor(t) {
          (this.doc = t),
            (this.cursorPos = 0),
            (this.string = ''),
            (this.cursor = t.iter());
        }
        get length() {
          return this.doc.length;
        }
        syncTo(t) {
          return (
            (this.string = this.cursor.next(t - this.cursorPos).value),
            (this.cursorPos = t + this.string.length),
            this.cursorPos - this.string.length
          );
        }
        chunk(t) {
          return this.syncTo(t), this.string;
        }
        get lineChunks() {
          return !0;
        }
        read(t, e) {
          let i = this.cursorPos - this.string.length;
          return t < i || e >= this.cursorPos
            ? this.doc.sliceString(t, e)
            : this.string.slice(t - i, e - i);
        }
      }
      let Ja = null;
      class Ya {
        constructor(t, e, i = [], n, s, r, o, l) {
          (this.parser = t),
            (this.state = e),
            (this.fragments = i),
            (this.tree = n),
            (this.treeLen = s),
            (this.viewport = r),
            (this.skipped = o),
            (this.scheduleOn = l),
            (this.parse = null),
            (this.tempSkipped = []);
        }
        static create(t, e, i) {
          return new Ya(t, e, [], $l.empty, 0, i, [], null);
        }
        startParse() {
          return this.parser.startParse(new Ga(this.state.doc), this.fragments);
        }
        work(t, e) {
          return (
            null != e && e >= this.state.doc.length && (e = void 0),
            this.tree != $l.empty &&
            this.isDone(null !== e && void 0 !== e ? e : this.state.doc.length)
              ? (this.takeTree(), !0)
              : this.withContext(() => {
                  var i;
                  if ('number' == typeof t) {
                    let e = Date.now() + t;
                    t = () => Date.now() > e;
                  }
                  for (
                    this.parse || (this.parse = this.startParse()),
                      null != e &&
                        (null == this.parse.stoppedAt ||
                          this.parse.stoppedAt > e) &&
                        e < this.state.doc.length &&
                        this.parse.stopAt(e);
                    ;

                  ) {
                    let n = this.parse.advance();
                    if (n) {
                      if (
                        ((this.fragments = this.withoutTempSkipped(
                          ha.addTree(
                            n,
                            this.fragments,
                            null != this.parse.stoppedAt,
                          ),
                        )),
                        (this.treeLen =
                          null !== (i = this.parse.stoppedAt) && void 0 !== i
                            ? i
                            : this.state.doc.length),
                        (this.tree = n),
                        (this.parse = null),
                        !(
                          this.treeLen <
                          (null !== e && void 0 !== e
                            ? e
                            : this.state.doc.length)
                        ))
                      )
                        return !0;
                      this.parse = this.startParse();
                    }
                    if (t()) return !1;
                  }
                })
          );
        }
        takeTree() {
          let t, e;
          this.parse &&
            (t = this.parse.parsedPos) >= this.treeLen &&
            ((null == this.parse.stoppedAt || this.parse.stoppedAt > t) &&
              this.parse.stopAt(t),
            this.withContext(() => {
              while (!(e = this.parse.advance()));
            }),
            (this.treeLen = t),
            (this.tree = e),
            (this.fragments = this.withoutTempSkipped(
              ha.addTree(this.tree, this.fragments, !0),
            )),
            (this.parse = null));
        }
        withContext(t) {
          let e = Ja;
          Ja = this;
          try {
            return t();
          } finally {
            Ja = e;
          }
        }
        withoutTempSkipped(t) {
          for (let e; (e = this.tempSkipped.pop()); ) t = Xa(t, e.from, e.to);
          return t;
        }
        changes(t, e) {
          let {
            fragments: i,
            tree: n,
            treeLen: s,
            viewport: r,
            skipped: o,
          } = this;
          if ((this.takeTree(), !t.empty)) {
            let e = [];
            if (
              (t.iterChangedRanges((t, i, n, s) =>
                e.push({ fromA: t, toA: i, fromB: n, toB: s }),
              ),
              (i = ha.applyChanges(i, e)),
              (n = $l.empty),
              (s = 0),
              (r = { from: t.mapPos(r.from, -1), to: t.mapPos(r.to, 1) }),
              this.skipped.length)
            ) {
              o = [];
              for (let e of this.skipped) {
                let i = t.mapPos(e.from, 1),
                  n = t.mapPos(e.to, -1);
                i < n && o.push({ from: i, to: n });
              }
            }
          }
          return new Ya(this.parser, e, i, n, s, r, o, this.scheduleOn);
        }
        updateViewport(t) {
          if (this.viewport.from == t.from && this.viewport.to == t.to)
            return !1;
          this.viewport = t;
          let e = this.skipped.length;
          for (let i = 0; i < this.skipped.length; i++) {
            let { from: e, to: n } = this.skipped[i];
            e < t.to &&
              n > t.from &&
              ((this.fragments = Xa(this.fragments, e, n)),
              this.skipped.splice(i--, 1));
          }
          return !(this.skipped.length >= e) && (this.reset(), !0);
        }
        reset() {
          this.parse && (this.takeTree(), (this.parse = null));
        }
        skipUntilInView(t, e) {
          this.skipped.push({ from: t, to: e });
        }
        static getSkippingParser(t) {
          return new (class extends ca {
            createParse(e, i, n) {
              let s = n[0].from,
                r = n[n.length - 1].to,
                o = {
                  parsedPos: s,
                  advance() {
                    let e = Ja;
                    if (e) {
                      for (let t of n) e.tempSkipped.push(t);
                      t &&
                        (e.scheduleOn = e.scheduleOn
                          ? Promise.all([e.scheduleOn, t])
                          : t);
                    }
                    return (this.parsedPos = r), new $l(ql.none, [], [], r - s);
                  },
                  stoppedAt: null,
                  stopAt() {},
                };
              return o;
            }
          })();
        }
        isDone(t) {
          t = Math.min(t, this.state.doc.length);
          let e = this.fragments;
          return (
            this.treeLen >= t && e.length && 0 == e[0].from && e[0].to >= t
          );
        }
        static get() {
          return Ja;
        }
      }
      function Xa(t, e, i) {
        return ha.applyChanges(t, [{ fromA: e, toA: i, fromB: e, toB: i }]);
      }
      class Za {
        constructor(t) {
          (this.context = t), (this.tree = t.tree);
        }
        apply(t) {
          if (!t.docChanged && this.tree == this.context.tree) return this;
          let e = this.context.changes(t.changes, t.state),
            i =
              this.context.treeLen == t.startState.doc.length
                ? void 0
                : Math.max(
                    t.changes.mapPos(this.context.treeLen),
                    e.viewport.to,
                  );
          return e.work(20, i) || e.takeTree(), new Za(e);
        }
        static init(t) {
          let e = Math.min(3e3, t.doc.length),
            i = Ya.create(t.facet(ih).parser, t, { from: 0, to: e });
          return i.work(20, e) || i.takeTree(), new Za(i);
        }
      }
      Ka.state = J.define({
        create: Za.init,
        update(t, e) {
          for (let i of e.effects) if (i.is(Ka.setState)) return i.value;
          return e.startState.facet(ih) != e.state.facet(ih)
            ? Za.init(e.state)
            : t.apply(e);
        },
      });
      let Qa = (t) => {
        let e = setTimeout(() => t(), 500);
        return () => clearTimeout(e);
      };
      'undefined' != typeof requestIdleCallback &&
        (Qa = (t) => {
          let e = -1,
            i = setTimeout(() => {
              e = requestIdleCallback(t, { timeout: 400 });
            }, 100);
          return () => (e < 0 ? clearTimeout(i) : cancelIdleCallback(e));
        });
      const th =
          'undefined' != typeof navigator &&
          (null === (qa = navigator.scheduling) || void 0 === qa
            ? void 0
            : qa.isInputPending)
            ? () => navigator.scheduling.isInputPending()
            : null,
        eh = Gi.fromClass(
          class {
            constructor(t) {
              (this.view = t),
                (this.working = null),
                (this.workScheduled = 0),
                (this.chunkEnd = -1),
                (this.chunkBudget = -1),
                (this.work = this.work.bind(this)),
                this.scheduleWork();
            }
            update(t) {
              let e = this.view.state.field(Ka.state).context;
              (e.updateViewport(t.view.viewport) ||
                this.view.viewport.to > e.treeLen) &&
                this.scheduleWork(),
                t.docChanged &&
                  (this.view.hasFocus && (this.chunkBudget += 50),
                  this.scheduleWork()),
                this.checkAsyncSchedule(e);
            }
            scheduleWork() {
              if (this.working) return;
              let { state: t } = this.view,
                e = t.field(Ka.state);
              (e.tree == e.context.tree && e.context.isDone(t.doc.length)) ||
                (this.working = Qa(this.work));
            }
            work(t) {
              this.working = null;
              let e = Date.now();
              if (
                (this.chunkEnd < e &&
                  (this.chunkEnd < 0 || this.view.hasFocus) &&
                  ((this.chunkEnd = e + 3e4), (this.chunkBudget = 3e3)),
                this.chunkBudget <= 0)
              )
                return;
              let {
                  state: i,
                  viewport: { to: n },
                } = this.view,
                s = i.field(Ka.state);
              if (s.tree == s.context.tree && s.context.isDone(n + 1e5)) return;
              let r =
                  Date.now() +
                  Math.min(
                    this.chunkBudget,
                    100,
                    t && !th ? Math.max(25, t.timeRemaining() - 5) : 1e9,
                  ),
                o = s.context.treeLen < n && i.doc.length > n + 1e3,
                l = s.context.work(
                  () => (th && th()) || Date.now() > r,
                  n + (o ? 0 : 1e5),
                );
              (this.chunkBudget -= Date.now() - e),
                (l || this.chunkBudget <= 0) &&
                  (s.context.takeTree(),
                  this.view.dispatch({
                    effects: Ka.setState.of(new Za(s.context)),
                  })),
                this.chunkBudget > 0 && (!l || o) && this.scheduleWork(),
                this.checkAsyncSchedule(s.context);
            }
            checkAsyncSchedule(t) {
              t.scheduleOn &&
                (this.workScheduled++,
                t.scheduleOn
                  .then(() => this.scheduleWork())
                  .catch((t) => _i(this.view.state, t))
                  .then(() => this.workScheduled--),
                (t.scheduleOn = null));
            }
            destroy() {
              this.working && this.working();
            }
            isWorking() {
              return !!(this.working || this.workScheduled > 0);
            }
          },
          {
            eventHandlers: {
              focus() {
                this.scheduleWork();
              },
            },
          },
        ),
        ih = q.define({
          combine(t) {
            return t.length ? t[0] : null;
          },
          enables: (t) => [
            Ka.state,
            eh,
            Or.contentAttributes.compute([t], (e) => {
              let i = e.facet(t);
              return i && i.name ? { 'data-language': i.name } : {};
            }),
          ],
        });
      const nh = q.define(),
        sh = q.define({
          combine: (t) => {
            if (!t.length) return '  ';
            let e = t[0];
            if (!e || /\S/.test(e) || Array.from(e).some((t) => t != e[0]))
              throw new Error('Invalid indent unit: ' + JSON.stringify(t[0]));
            return e;
          },
        });
      function rh(t) {
        let e = t.facet(sh);
        return 9 == e.charCodeAt(0) ? t.tabSize * e.length : e.length;
      }
      function oh(t, e) {
        let i = '',
          n = t.tabSize,
          s = t.facet(sh)[0];
        if ('\t' == s) {
          while (e >= n) (i += '\t'), (e -= n);
          s = ' ';
        }
        for (let r = 0; r < e; r++) i += s;
        return i;
      }
      function lh(t, e) {
        t instanceof Rt && (t = new ah(t));
        for (let n of t.state.facet(nh)) {
          let i = n(t, e);
          if (void 0 !== i) return i;
        }
        let i = Ua(t.state);
        return i ? ch(t, i, e) : null;
      }
      class ah {
        constructor(t, e = {}) {
          (this.state = t), (this.options = e), (this.unit = rh(t));
        }
        lineAt(t, e = 1) {
          let i = this.state.doc.lineAt(t),
            { simulateBreak: n, simulateDoubleBreak: s } = this.options;
          return null != n && n >= i.from && n <= i.to
            ? s && n == t
              ? { text: '', from: t }
              : (e < 0 ? n < t : n <= t)
              ? { text: i.text.slice(n - i.from), from: n }
              : { text: i.text.slice(0, n - i.from), from: i.from }
            : i;
        }
        textAfterPos(t, e = 1) {
          if (
            this.options.simulateDoubleBreak &&
            t == this.options.simulateBreak
          )
            return '';
          let { text: i, from: n } = this.lineAt(t, e);
          return i.slice(t - n, Math.min(i.length, t + 100 - n));
        }
        column(t, e = 1) {
          let { text: i, from: n } = this.lineAt(t, e),
            s = this.countColumn(i, t - n),
            r = this.options.overrideIndentation
              ? this.options.overrideIndentation(n)
              : -1;
          return r > -1 && (s += r - this.countColumn(i, i.search(/\S|$/))), s;
        }
        countColumn(t, e = t.length) {
          return Yt(t, this.state.tabSize, e);
        }
        lineIndent(t, e = 1) {
          let { text: i, from: n } = this.lineAt(t, e),
            s = this.options.overrideIndentation;
          if (s) {
            let t = s(n);
            if (t > -1) return t;
          }
          return this.countColumn(i, i.search(/\S|$/));
        }
        get simulatedBreak() {
          return this.options.simulateBreak || null;
        }
      }
      const hh = new zl();
      function ch(t, e, i) {
        return fh(e.resolveInner(i).enterUnfinishedNodesBefore(i), i, t);
      }
      function uh(t) {
        return (
          t.pos == t.options.simulateBreak && t.options.simulateDoubleBreak
        );
      }
      function dh(t) {
        let e = t.type.prop(hh);
        if (e) return e;
        let i,
          n = t.firstChild;
        if (n && (i = n.type.prop(zl.closedBy))) {
          let e = t.lastChild,
            n = e && i.indexOf(e.name) > -1;
          return (t) => wh(t, !0, 1, void 0, n && !uh(t) ? e.from : void 0);
        }
        return null == t.parent ? ph : null;
      }
      function fh(t, e, i) {
        for (; t; t = t.parent) {
          let n = dh(t);
          if (n) return n(mh.create(i, e, t));
        }
        return null;
      }
      function ph() {
        return 0;
      }
      class mh extends ah {
        constructor(t, e, i) {
          super(t.state, t.options),
            (this.base = t),
            (this.pos = e),
            (this.node = i);
        }
        static create(t, e, i) {
          return new mh(t, e, i);
        }
        get textAfter() {
          return this.textAfterPos(this.pos);
        }
        get baseIndent() {
          let t = this.state.doc.lineAt(this.node.from);
          for (;;) {
            let e = this.node.resolve(t.from);
            while (e.parent && e.parent.from == e.from) e = e.parent;
            if (gh(e, this.node)) break;
            t = this.state.doc.lineAt(e.from);
          }
          return this.lineIndent(t.from);
        }
        continue() {
          let t = this.node.parent;
          return t ? fh(t, this.pos, this.base) : 0;
        }
      }
      function gh(t, e) {
        for (let i = e; i; i = i.parent) if (t == i) return !0;
        return !1;
      }
      function vh(t) {
        let e = t.node,
          i = e.childAfter(e.from),
          n = e.lastChild;
        if (!i) return null;
        let s = t.options.simulateBreak,
          r = t.state.doc.lineAt(i.from),
          o = null == s || s <= r.from ? r.to : Math.min(r.to, s);
        for (let l = i.to; ; ) {
          let t = e.childAfter(l);
          if (!t || t == n) return null;
          if (!t.type.isSkipped) return t.from < o ? i : null;
          l = t.to;
        }
      }
      function wh(t, e, i, n, s) {
        let r = t.textAfter,
          o = r.match(/^\s*/)[0].length,
          l = (n && r.slice(o, o + n.length) == n) || s == t.pos + o,
          a = e ? vh(t) : null;
        return a
          ? l
            ? t.column(a.from)
            : t.column(a.to)
          : t.baseIndent + (l ? 0 : t.unit * i);
      }
      const yh = 200;
      function bh() {
        return Rt.transactionFilter.of((t) => {
          if (
            !t.docChanged ||
            (!t.isUserEvent('input.type') && !t.isUserEvent('input.complete'))
          )
            return t;
          let e = t.startState.languageDataAt(
            'indentOnInput',
            t.startState.selection.main.head,
          );
          if (!e.length) return t;
          let i = t.newDoc,
            { head: n } = t.newSelection.main,
            s = i.lineAt(n);
          if (n > s.from + yh) return t;
          let r = i.sliceString(s.from, n);
          if (!e.some((t) => t.test(r))) return t;
          let { state: o } = t,
            l = -1,
            a = [];
          for (let { head: h } of o.selection.ranges) {
            let t = o.doc.lineAt(h);
            if (t.from == l) continue;
            l = t.from;
            let e = lh(o, t.from);
            if (null == e) continue;
            let i = /^\s*/.exec(t.text)[0],
              n = oh(o, e);
            i != n &&
              a.push({ from: t.from, to: t.from + i.length, insert: n });
          }
          return a.length ? [t, { changes: a, sequential: !0 }] : t;
        });
      }
      const xh = q.define(),
        kh = new zl();
      function Sh(t, e, i) {
        let n = Ua(t);
        if (n.length < i) return null;
        let s = n.resolveInner(i, 1),
          r = null;
        for (let o = s; o; o = o.parent) {
          if (o.to <= i || o.from > i) continue;
          if (r && o.from < e) break;
          let s = o.type.prop(kh);
          if (
            s &&
            (o.to < n.length - 50 || n.length == t.doc.length || !Ch(o))
          ) {
            let n = s(o, t);
            n && n.from <= i && n.from >= e && n.to > i && (r = n);
          }
        }
        return r;
      }
      function Ch(t) {
        let e = t.lastChild;
        return e && e.to == t.to && e.type.isError;
      }
      function Mh(t, e, i) {
        for (let n of t.facet(xh)) {
          let s = n(t, e, i);
          if (s) return s;
        }
        return Sh(t, e, i);
      }
      function Ah(t, e) {
        let i = e.mapPos(t.from, 1),
          n = e.mapPos(t.to, -1);
        return i >= n ? void 0 : { from: i, to: n };
      }
      const Oh = gt.define({ map: Ah }),
        Dh = gt.define({ map: Ah });
      function Th(t) {
        let e = [];
        for (let { head: i } of t.state.selection.ranges)
          e.some((t) => t.from <= i && t.to >= i) || e.push(t.lineBlockAt(i));
        return e;
      }
      const Eh = J.define({
        create() {
          return xi.none;
        },
        update(t, e) {
          t = t.map(e.changes);
          for (let i of e.effects)
            i.is(Oh) && !Bh(t, i.value.from, i.value.to)
              ? (t = t.update({ add: [jh.range(i.value.from, i.value.to)] }))
              : i.is(Dh) &&
                (t = t.update({
                  filter: (t, e) => i.value.from != t || i.value.to != e,
                  filterFrom: i.value.from,
                  filterTo: i.value.to,
                }));
          if (e.selection) {
            let i = !1,
              { head: n } = e.selection.main;
            t.between(n, n, (t, e) => {
              t < n && e > n && (i = !0);
            }),
              i &&
                (t = t.update({
                  filterFrom: n,
                  filterTo: n,
                  filter: (t, e) => e <= n || t >= n,
                }));
          }
          return t;
        },
        provide: (t) => Or.decorations.from(t),
        toJSON(t, e) {
          let i = [];
          return (
            t.between(0, e.doc.length, (t, e) => {
              i.push(t, e);
            }),
            i
          );
        },
        fromJSON(t) {
          if (!Array.isArray(t) || t.length % 2)
            throw new RangeError('Invalid JSON for fold state');
          let e = [];
          for (let i = 0; i < t.length; ) {
            let n = t[i++],
              s = t[i++];
            if ('number' != typeof n || 'number' != typeof s)
              throw new RangeError('Invalid JSON for fold state');
            e.push(jh.range(n, s));
          }
          return xi.set(e, !0);
        },
      });
      function Rh(t, e, i) {
        var n;
        let s = null;
        return (
          null === (n = t.field(Eh, !1)) ||
            void 0 === n ||
            n.between(e, i, (t, e) => {
              (!s || s.from > t) && (s = { from: t, to: e });
            }),
          s
        );
      }
      function Bh(t, e, i) {
        let n = !1;
        return (
          t.between(e, e, (t, s) => {
            t == e && s == i && (n = !0);
          }),
          n
        );
      }
      function Lh(t, e) {
        return t.field(Eh, !1) ? e : e.concat(gt.appendConfig.of(qh()));
      }
      const Nh = (t) => {
          for (let e of Th(t)) {
            let i = Mh(t.state, e.from, e.to);
            if (i)
              return (
                t.dispatch({ effects: Lh(t.state, [Oh.of(i), Ih(t, i)]) }), !0
              );
          }
          return !1;
        },
        Ph = (t) => {
          if (!t.state.field(Eh, !1)) return !1;
          let e = [];
          for (let i of Th(t)) {
            let n = Rh(t.state, i.from, i.to);
            n && e.push(Dh.of(n), Ih(t, n, !1));
          }
          return e.length && t.dispatch({ effects: e }), e.length > 0;
        };
      function Ih(t, e, i = !0) {
        let n = t.state.doc.lineAt(e.from).number,
          s = t.state.doc.lineAt(e.to).number;
        return Or.announce.of(
          `${t.state.phrase(
            i ? 'Folded lines' : 'Unfolded lines',
          )} ${n} ${t.state.phrase('to')} ${s}.`,
        );
      }
      const Hh = (t) => {
          let { state: e } = t,
            i = [];
          for (let n = 0; n < e.doc.length; ) {
            let s = t.lineBlockAt(n),
              r = Mh(e, s.from, s.to);
            r && i.push(Oh.of(r)), (n = (r ? t.lineBlockAt(r.to) : s).to + 1);
          }
          return (
            i.length && t.dispatch({ effects: Lh(t.state, i) }), !!i.length
          );
        },
        Wh = (t) => {
          let e = t.state.field(Eh, !1);
          if (!e || !e.size) return !1;
          let i = [];
          return (
            e.between(0, t.state.doc.length, (t, e) => {
              i.push(Dh.of({ from: t, to: e }));
            }),
            t.dispatch({ effects: i }),
            !0
          );
        };
      const Vh = [
          { key: 'Ctrl-Shift-[', mac: 'Cmd-Alt-[', run: Nh },
          { key: 'Ctrl-Shift-]', mac: 'Cmd-Alt-]', run: Ph },
          { key: 'Ctrl-Alt-[', run: Hh },
          { key: 'Ctrl-Alt-]', run: Wh },
        ],
        zh = { placeholderDOM: null, placeholderText: '\u2026' },
        Fh = q.define({
          combine(t) {
            return Bt(t, zh);
          },
        });
      function qh(t) {
        let e = [Eh, Uh];
        return t && e.push(Fh.of(t)), e;
      }
      const jh = xi.replace({
          widget: new (class extends yi {
            toDOM(t) {
              let { state: e } = t,
                i = e.facet(Fh),
                n = (e) => {
                  let i = t.lineBlockAt(t.posAtDOM(e.target)),
                    n = Rh(t.state, i.from, i.to);
                  n && t.dispatch({ effects: Dh.of(n) }), e.preventDefault();
                };
              if (i.placeholderDOM) return i.placeholderDOM(t, n);
              let s = document.createElement('span');
              return (
                (s.textContent = i.placeholderText),
                s.setAttribute('aria-label', e.phrase('folded code')),
                (s.title = e.phrase('unfold')),
                (s.className = 'cm-foldPlaceholder'),
                (s.onclick = n),
                s
              );
            }
          })(),
        }),
        _h = {
          openText: '\u2304',
          closedText: '\u203a',
          markerDOM: null,
          domEventHandlers: {},
          foldingChanged: () => !1,
        };
      class Kh extends fl {
        constructor(t, e) {
          super(), (this.config = t), (this.open = e);
        }
        eq(t) {
          return this.config == t.config && this.open == t.open;
        }
        toDOM(t) {
          if (this.config.markerDOM) return this.config.markerDOM(this.open);
          let e = document.createElement('span');
          return (
            (e.textContent = this.open
              ? this.config.openText
              : this.config.closedText),
            (e.title = t.state.phrase(this.open ? 'Fold line' : 'Unfold line')),
            e
          );
        }
      }
      function $h(t = {}) {
        let e = Object.assign(Object.assign({}, _h), t),
          i = new Kh(e, !0),
          n = new Kh(e, !1),
          s = Gi.fromClass(
            class {
              constructor(t) {
                (this.from = t.viewport.from),
                  (this.markers = this.buildMarkers(t));
              }
              update(t) {
                (t.docChanged ||
                  t.viewportChanged ||
                  t.startState.facet(ih) != t.state.facet(ih) ||
                  t.startState.field(Eh, !1) != t.state.field(Eh, !1) ||
                  Ua(t.startState) != Ua(t.state) ||
                  e.foldingChanged(t)) &&
                  (this.markers = this.buildMarkers(t.view));
              }
              buildMarkers(t) {
                let e = new Vt();
                for (let s of t.viewportLineBlocks) {
                  let r = Rh(t.state, s.from, s.to)
                    ? n
                    : Mh(t.state, s.from, s.to)
                    ? i
                    : null;
                  r && e.add(s.from, s.from, r);
                }
                return e.finish();
              }
            },
          ),
          { domEventHandlers: r } = e;
        return [
          s,
          vl({
            class: 'cm-foldGutter',
            markers(t) {
              var e;
              return (
                (null === (e = t.plugin(s)) || void 0 === e
                  ? void 0
                  : e.markers) || Ht.empty
              );
            },
            initialSpacer() {
              return new Kh(e, !1);
            },
            domEventHandlers: Object.assign(Object.assign({}, r), {
              click: (t, e, i) => {
                if (r.click && r.click(t, e, i)) return !0;
                let n = Rh(t.state, e.from, e.to);
                if (n) return t.dispatch({ effects: Dh.of(n) }), !0;
                let s = Mh(t.state, e.from, e.to);
                return !!s && (t.dispatch({ effects: Oh.of(s) }), !0);
              },
            }),
          }),
          qh(),
        ];
      }
      const Uh = Or.baseTheme({
        '.cm-foldPlaceholder': {
          backgroundColor: '#eee',
          border: '1px solid #ddd',
          color: '#888',
          borderRadius: '.2em',
          margin: '0 1px',
          padding: '0 1px',
          cursor: 'pointer',
        },
        '.cm-foldGutter span': { padding: '0 1px', cursor: 'pointer' },
      });
      class Gh {
        constructor(t, e) {
          let i;
          function n(t) {
            let e = ie.newName();
            return ((i || (i = Object.create(null)))['.' + e] = t), e;
          }
          this.specs = t;
          const s =
              'string' == typeof e.all ? e.all : e.all ? n(e.all) : void 0,
            r = e.scope;
          (this.scope =
            r instanceof Ka
              ? (t) => t.prop(ja) == r.data
              : r
              ? (t) => t == r
              : void 0),
            (this.style = xa(
              t.map((t) => ({
                tag: t.tag,
                class: t.class || n(Object.assign({}, t, { tag: null })),
              })),
              { all: s },
            ).style),
            (this.module = i ? new ie(i) : null),
            (this.themeType = e.themeType);
        }
        static define(t, e) {
          return new Gh(t, e || {});
        }
      }
      const Jh = q.define(),
        Yh = q.define({
          combine(t) {
            return t.length ? [t[0]] : null;
          },
        });
      function Xh(t) {
        let e = t.facet(Jh);
        return e.length ? e : t.facet(Yh);
      }
      function Zh(t, e) {
        let i,
          n = [tc];
        return (
          t instanceof Gh &&
            (t.module && n.push(Or.styleModule.of(t.module)),
            (i = t.themeType)),
          (null === e || void 0 === e ? void 0 : e.fallback)
            ? n.push(Yh.of(t))
            : i
            ? n.push(
                Jh.computeN([Or.darkTheme], (e) =>
                  e.facet(Or.darkTheme) == ('dark' == i) ? [t] : [],
                ),
              )
            : n.push(Jh.of(t)),
          n
        );
      }
      class Qh {
        constructor(t) {
          (this.markCache = Object.create(null)),
            (this.tree = Ua(t.state)),
            (this.decorations = this.buildDeco(t, Xh(t.state)));
        }
        update(t) {
          let e = Ua(t.state),
            i = Xh(t.state),
            n = i != Xh(t.startState);
          e.length < t.view.viewport.to && !n && e.type == this.tree.type
            ? (this.decorations = this.decorations.map(t.changes))
            : (e != this.tree || t.viewportChanged || n) &&
              ((this.tree = e), (this.decorations = this.buildDeco(t.view, i)));
        }
        buildDeco(t, e) {
          if (!e || !this.tree.length) return xi.none;
          let i = new Vt();
          for (let { from: n, to: s } of t.visibleRanges)
            Sa(
              this.tree,
              e,
              (t, e, n) => {
                i.add(
                  t,
                  e,
                  this.markCache[n] ||
                    (this.markCache[n] = xi.mark({ class: n })),
                );
              },
              n,
              s,
            );
          return i.finish();
        }
      }
      const tc = Z.high(
          Gi.fromClass(Qh, { decorations: (t) => t.decorations }),
        ),
        ec = Gh.define([
          { tag: Fa.meta, color: '#404740' },
          { tag: Fa.link, textDecoration: 'underline' },
          { tag: Fa.heading, textDecoration: 'underline', fontWeight: 'bold' },
          { tag: Fa.emphasis, fontStyle: 'italic' },
          { tag: Fa.strong, fontWeight: 'bold' },
          { tag: Fa.strikethrough, textDecoration: 'line-through' },
          { tag: Fa.keyword, color: '#708' },
          {
            tag: [Fa.atom, Fa.bool, Fa.url, Fa.contentSeparator, Fa.labelName],
            color: '#219',
          },
          { tag: [Fa.literal, Fa.inserted], color: '#164' },
          { tag: [Fa.string, Fa.deleted], color: '#a11' },
          { tag: [Fa.regexp, Fa.escape, Fa.special(Fa.string)], color: '#e40' },
          { tag: Fa.definition(Fa.variableName), color: '#00f' },
          { tag: Fa.local(Fa.variableName), color: '#30a' },
          { tag: [Fa.typeName, Fa.namespace], color: '#085' },
          { tag: Fa.className, color: '#167' },
          { tag: [Fa.special(Fa.variableName), Fa.macroName], color: '#256' },
          { tag: Fa.definition(Fa.propertyName), color: '#00c' },
          { tag: Fa.comment, color: '#940' },
          { tag: Fa.invalid, color: '#f00' },
        ]),
        ic = Or.baseTheme({
          '&.cm-focused .cm-matchingBracket': { backgroundColor: '#328c8252' },
          '&.cm-focused .cm-nonmatchingBracket': {
            backgroundColor: '#bb555544',
          },
        }),
        nc = 1e4,
        sc = '()[]{}',
        rc = q.define({
          combine(t) {
            return Bt(t, {
              afterCursor: !0,
              brackets: sc,
              maxScanDistance: nc,
              renderMatch: ac,
            });
          },
        }),
        oc = xi.mark({ class: 'cm-matchingBracket' }),
        lc = xi.mark({ class: 'cm-nonmatchingBracket' });
      function ac(t) {
        let e = [],
          i = t.matched ? oc : lc;
        return (
          e.push(i.range(t.start.from, t.start.to)),
          t.end && e.push(i.range(t.end.from, t.end.to)),
          e
        );
      }
      const hc = J.define({
          create() {
            return xi.none;
          },
          update(t, e) {
            if (!e.docChanged && !e.selection) return t;
            let i = [],
              n = e.state.facet(rc);
            for (let s of e.state.selection.ranges) {
              if (!s.empty) continue;
              let t =
                mc(e.state, s.head, -1, n) ||
                (s.head > 0 && mc(e.state, s.head - 1, 1, n)) ||
                (n.afterCursor &&
                  (mc(e.state, s.head, 1, n) ||
                    (s.head < e.state.doc.length &&
                      mc(e.state, s.head + 1, -1, n))));
              t && (i = i.concat(n.renderMatch(t, e.state)));
            }
            return xi.set(i, !0);
          },
          provide: (t) => Or.decorations.from(t),
        }),
        cc = [hc, ic];
      function uc(t = {}) {
        return [rc.of(t), cc];
      }
      const dc = new zl();
      function fc(t, e, i) {
        let n = t.prop(e < 0 ? zl.openedBy : zl.closedBy);
        if (n) return n;
        if (1 == t.name.length) {
          let n = i.indexOf(t.name);
          if (n > -1 && n % 2 == (e < 0 ? 1 : 0)) return [i[n + e]];
        }
        return null;
      }
      function pc(t) {
        let e = t.type.prop(dc);
        return e ? e(t.node) : t;
      }
      function mc(t, e, i, n = {}) {
        let s = n.maxScanDistance || nc,
          r = n.brackets || sc,
          o = Ua(t),
          l = o.resolveInner(e, i);
        for (let a = l; a; a = a.parent) {
          let n = fc(a.type, i, r);
          if (n && a.from < a.to) {
            let s = pc(a);
            if (
              s &&
              (i > 0 ? e >= s.from && e < s.to : e > s.from && e <= s.to)
            )
              return gc(t, e, i, a, s, n, r);
          }
        }
        return vc(t, e, i, o, l.type, s, r);
      }
      function gc(t, e, i, n, s, r, o) {
        let l = n.parent,
          a = { from: s.from, to: s.to },
          h = 0,
          c = null === l || void 0 === l ? void 0 : l.cursor();
        if (c && (i < 0 ? c.childBefore(n.from) : c.childAfter(n.to)))
          do {
            if (i < 0 ? c.to <= n.from : c.from >= n.to) {
              if (0 == h && r.indexOf(c.type.name) > -1 && c.from < c.to) {
                let t = pc(c);
                return {
                  start: a,
                  end: t ? { from: t.from, to: t.to } : void 0,
                  matched: !0,
                };
              }
              if (fc(c.type, i, o)) h++;
              else if (fc(c.type, -i, o)) {
                if (0 == h) {
                  let t = pc(c);
                  return {
                    start: a,
                    end:
                      t && t.from < t.to ? { from: t.from, to: t.to } : void 0,
                    matched: !1,
                  };
                }
                h--;
              }
            }
          } while (i < 0 ? c.prevSibling() : c.nextSibling());
        return { start: a, matched: !1 };
      }
      function vc(t, e, i, n, s, r, o) {
        let l = i < 0 ? t.sliceDoc(e - 1, e) : t.sliceDoc(e, e + 1),
          a = o.indexOf(l);
        if (a < 0 || (a % 2 == 0) != i > 0) return null;
        let h = { from: i < 0 ? e - 1 : e, to: i > 0 ? e + 1 : e },
          c = t.doc.iterRange(e, i > 0 ? t.doc.length : 0),
          u = 0;
        for (let d = 0; !c.next().done && d <= r; ) {
          let t = c.value;
          i < 0 && (d += t.length);
          let r = e + d * i;
          for (
            let e = i > 0 ? 0 : t.length - 1, l = i > 0 ? t.length : -1;
            e != l;
            e += i
          ) {
            let l = o.indexOf(t[e]);
            if (!(l < 0 || n.resolveInner(r + e, 1).type != s))
              if ((l % 2 == 0) == i > 0) u++;
              else {
                if (1 == u)
                  return {
                    start: h,
                    end: { from: r + e, to: r + e + 1 },
                    matched: l >> 1 == a >> 1,
                  };
                u--;
              }
          }
          i > 0 && (d += t.length);
        }
        return c.done ? { start: h, matched: !1 } : null;
      }
      const wc = Object.create(null),
        yc = [ql.none],
        bc = [],
        xc = Object.create(null);
      for (let [Ag, Og] of [
        ['variable', 'variableName'],
        ['variable-2', 'variableName.special'],
        ['string-2', 'string.special'],
        ['def', 'variableName.definition'],
        ['tag', 'tagName'],
        ['attribute', 'attributeName'],
        ['type', 'typeName'],
        ['builtin', 'variableName.standard'],
        ['qualifier', 'modifier'],
        ['error', 'invalid'],
        ['header', 'heading'],
        ['property', 'propertyName'],
      ])
        xc[Ag] = Sc(wc, Og);
      function kc(t, e) {
        bc.indexOf(t) > -1 || (bc.push(t), console.warn(e));
      }
      function Sc(t, e) {
        let i = null;
        for (let r of e.split('.')) {
          let e = t[r] || Fa[r];
          e
            ? 'function' == typeof e
              ? i
                ? (i = e(i))
                : kc(r, `Modifier ${r} used at start of tag`)
              : i
              ? kc(r, `Tag ${r} used as modifier`)
              : (i = e)
            : kc(r, `Unknown highlighting tag ${r}`);
        }
        if (!i) return 0;
        let n = e.replace(/ /g, '_'),
          s = ql.define({ id: yc.length, name: n, props: [wa({ [n]: i })] });
        return yc.push(s), s.id;
      }
      const Cc = (t) => {
        let { state: e } = t,
          i = e.doc.lineAt(e.selection.main.from),
          n = Tc(t.state, i.from);
        return n.line ? Ac(t) : !!n.block && Dc(t);
      };
      function Mc(t, e) {
        return ({ state: i, dispatch: n }) => {
          if (i.readOnly) return !1;
          let s = t(e, i);
          return !!s && (n(i.update(s)), !0);
        };
      }
      const Ac = Mc(Nc, 0),
        Oc = Mc(Lc, 0),
        Dc = Mc((t, e) => Lc(t, e, Bc(e)), 0);
      function Tc(t, e) {
        let i = t.languageDataAt('commentTokens', e);
        return i.length ? i[0] : {};
      }
      const Ec = 50;
      function Rc(t, { open: e, close: i }, n, s) {
        let r,
          o,
          l = t.sliceDoc(n - Ec, n),
          a = t.sliceDoc(s, s + Ec),
          h = /\s*$/.exec(l)[0].length,
          c = /^\s*/.exec(a)[0].length,
          u = l.length - h;
        if (l.slice(u - e.length, u) == e && a.slice(c, c + i.length) == i)
          return {
            open: { pos: n - h, margin: h && 1 },
            close: { pos: s + c, margin: c && 1 },
          };
        s - n <= 2 * Ec
          ? (r = o = t.sliceDoc(n, s))
          : ((r = t.sliceDoc(n, n + Ec)), (o = t.sliceDoc(s - Ec, s)));
        let d = /^\s*/.exec(r)[0].length,
          f = /\s*$/.exec(o)[0].length,
          p = o.length - f - i.length;
        return r.slice(d, d + e.length) == e && o.slice(p, p + i.length) == i
          ? {
              open: {
                pos: n + d + e.length,
                margin: /\s/.test(r.charAt(d + e.length)) ? 1 : 0,
              },
              close: {
                pos: s - f - i.length,
                margin: /\s/.test(o.charAt(p - 1)) ? 1 : 0,
              },
            }
          : null;
      }
      function Bc(t) {
        let e = [];
        for (let i of t.selection.ranges) {
          let n = t.doc.lineAt(i.from),
            s = i.to <= n.to ? n : t.doc.lineAt(i.to),
            r = e.length - 1;
          r >= 0 && e[r].to > n.from
            ? (e[r].to = s.to)
            : e.push({
                from: n.from + /^\s*/.exec(n.text)[0].length,
                to: s.to,
              });
        }
        return e;
      }
      function Lc(t, e, i = e.selection.ranges) {
        let n = i.map((t) => Tc(e, t.from).block);
        if (!n.every((t) => t)) return null;
        let s = i.map((t, i) => Rc(e, n[i], t.from, t.to));
        if (2 != t && !s.every((t) => t))
          return {
            changes: e.changes(
              i.map((t, e) =>
                s[e]
                  ? []
                  : [
                      { from: t.from, insert: n[e].open + ' ' },
                      { from: t.to, insert: ' ' + n[e].close },
                    ],
              ),
            ),
          };
        if (1 != t && s.some((t) => t)) {
          let t = [];
          for (let e, i = 0; i < s.length; i++)
            if ((e = s[i])) {
              let s = n[i],
                { open: r, close: o } = e;
              t.push(
                { from: r.pos - s.open.length, to: r.pos + r.margin },
                { from: o.pos - o.margin, to: o.pos + s.close.length },
              );
            }
          return { changes: t };
        }
        return null;
      }
      function Nc(t, e, i = e.selection.ranges) {
        let n = [],
          s = -1;
        for (let { from: r, to: o } of i) {
          let t = n.length,
            i = 1e9,
            l = Tc(e, r).line;
          if (l) {
            for (let t = r; t <= o; ) {
              let a = e.doc.lineAt(t);
              if (a.from > s && (r == o || o > a.from)) {
                s = a.from;
                let t = /^\s*/.exec(a.text)[0].length,
                  e = t == a.length,
                  r = a.text.slice(t, t + l.length) == l ? t : -1;
                t < a.text.length && t < i && (i = t),
                  n.push({
                    line: a,
                    comment: r,
                    token: l,
                    indent: t,
                    empty: e,
                    single: !1,
                  });
              }
              t = a.to + 1;
            }
            if (i < 1e9)
              for (let e = t; e < n.length; e++)
                n[e].indent < n[e].line.text.length && (n[e].indent = i);
            n.length == t + 1 && (n[t].single = !0);
          }
        }
        if (2 != t && n.some((t) => t.comment < 0 && (!t.empty || t.single))) {
          let t = [];
          for (let { line: e, token: s, indent: r, empty: o, single: l } of n)
            (!l && o) || t.push({ from: e.from + r, insert: s + ' ' });
          let i = e.changes(t);
          return { changes: i, selection: e.selection.map(i, 1) };
        }
        if (1 != t && n.some((t) => t.comment >= 0)) {
          let t = [];
          for (let { line: e, comment: i, token: s } of n)
            if (i >= 0) {
              let n = e.from + i,
                r = n + s.length;
              ' ' == e.text[r - e.from] && r++, t.push({ from: n, to: r });
            }
          return { changes: t };
        }
        return null;
      }
      const Pc = ft.define(),
        Ic = ft.define(),
        Hc = q.define(),
        Wc = q.define({
          combine(t) {
            return Bt(
              t,
              { minDepth: 100, newGroupDelay: 500, joinToEvent: (t, e) => e },
              {
                minDepth: Math.max,
                newGroupDelay: Math.min,
                joinToEvent: (t, e) => (i, n) => t(i, n) || e(i, n),
              },
            );
          },
        });
      function Vc(t) {
        let e = 0;
        return t.iterChangedRanges((t, i) => (e = i)), e;
      }
      const zc = J.define({
        create() {
          return ru.empty;
        },
        update(t, e) {
          let i = e.state.facet(Wc),
            n = e.annotation(Pc);
          if (n) {
            let s = e.docChanged ? V.single(Vc(e.changes)) : void 0,
              r = Uc.fromTransaction(e, s),
              o = n.side,
              l = 0 == o ? t.undone : t.done;
            return (
              (l = r
                ? Gc(l, l.length, i.minDepth, r)
                : tu(l, e.startState.selection)),
              new ru(0 == o ? n.rest : l, 0 == o ? l : n.rest)
            );
          }
          let s = e.annotation(Ic);
          if (
            (('full' != s && 'before' != s) || (t = t.isolate()),
            !1 === e.annotation(vt.addToHistory))
          )
            return e.changes.empty ? t : t.addMapping(e.changes.desc);
          let r = Uc.fromTransaction(e),
            o = e.annotation(vt.time),
            l = e.annotation(vt.userEvent);
          return (
            r
              ? (t = t.addChanges(r, o, l, i, e))
              : e.selection &&
                (t = t.addSelection(
                  e.startState.selection,
                  o,
                  l,
                  i.newGroupDelay,
                )),
            ('full' != s && 'after' != s) || (t = t.isolate()),
            t
          );
        },
        toJSON(t) {
          return {
            done: t.done.map((t) => t.toJSON()),
            undone: t.undone.map((t) => t.toJSON()),
          };
        },
        fromJSON(t) {
          return new ru(t.done.map(Uc.fromJSON), t.undone.map(Uc.fromJSON));
        },
      });
      function Fc(t = {}) {
        return [
          zc,
          Wc.of(t),
          Or.domEventHandlers({
            beforeinput(t, e) {
              let i =
                'historyUndo' == t.inputType
                  ? jc
                  : 'historyRedo' == t.inputType
                  ? _c
                  : null;
              return !!i && (t.preventDefault(), i(e));
            },
          }),
        ];
      }
      function qc(t, e) {
        return function ({ state: i, dispatch: n }) {
          if (!e && i.readOnly) return !1;
          let s = i.field(zc, !1);
          if (!s) return !1;
          let r = s.pop(t, i, e);
          return !!r && (n(r), !0);
        };
      }
      const jc = qc(0, !1),
        _c = qc(1, !1),
        Kc = qc(0, !0),
        $c = qc(1, !0);
      class Uc {
        constructor(t, e, i, n, s) {
          (this.changes = t),
            (this.effects = e),
            (this.mapped = i),
            (this.startSelection = n),
            (this.selectionsAfter = s);
        }
        setSelAfter(t) {
          return new Uc(
            this.changes,
            this.effects,
            this.mapped,
            this.startSelection,
            t,
          );
        }
        toJSON() {
          var t, e, i;
          return {
            changes:
              null === (t = this.changes) || void 0 === t ? void 0 : t.toJSON(),
            mapped:
              null === (e = this.mapped) || void 0 === e ? void 0 : e.toJSON(),
            startSelection:
              null === (i = this.startSelection) || void 0 === i
                ? void 0
                : i.toJSON(),
            selectionsAfter: this.selectionsAfter.map((t) => t.toJSON()),
          };
        }
        static fromJSON(t) {
          return new Uc(
            t.changes && R.fromJSON(t.changes),
            [],
            t.mapped && E.fromJSON(t.mapped),
            t.startSelection && V.fromJSON(t.startSelection),
            t.selectionsAfter.map(V.fromJSON),
          );
        }
        static fromTransaction(t, e) {
          let i = Zc;
          for (let n of t.startState.facet(Hc)) {
            let e = n(t);
            e.length && (i = i.concat(e));
          }
          return !i.length && t.changes.empty
            ? null
            : new Uc(
                t.changes.invert(t.startState.doc),
                i,
                void 0,
                e || t.startState.selection,
                Zc,
              );
        }
        static selection(t) {
          return new Uc(void 0, Zc, void 0, void 0, t);
        }
      }
      function Gc(t, e, i, n) {
        let s = e + 1 > i + 20 ? e - i - 1 : 0,
          r = t.slice(s, e);
        return r.push(n), r;
      }
      function Jc(t, e) {
        let i = [],
          n = !1;
        return (
          t.iterChangedRanges((t, e) => i.push(t, e)),
          e.iterChangedRanges((t, e, s, r) => {
            for (let o = 0; o < i.length; ) {
              let t = i[o++],
                e = i[o++];
              r >= t && s <= e && (n = !0);
            }
          }),
          n
        );
      }
      function Yc(t, e) {
        return (
          t.ranges.length == e.ranges.length &&
          0 === t.ranges.filter((t, i) => t.empty != e.ranges[i].empty).length
        );
      }
      function Xc(t, e) {
        return t.length ? (e.length ? t.concat(e) : t) : e;
      }
      const Zc = [],
        Qc = 200;
      function tu(t, e) {
        if (t.length) {
          let i = t[t.length - 1],
            n = i.selectionsAfter.slice(
              Math.max(0, i.selectionsAfter.length - Qc),
            );
          return n.length && n[n.length - 1].eq(e)
            ? t
            : (n.push(e), Gc(t, t.length - 1, 1e9, i.setSelAfter(n)));
        }
        return [Uc.selection([e])];
      }
      function eu(t) {
        let e = t[t.length - 1],
          i = t.slice();
        return (
          (i[t.length - 1] = e.setSelAfter(
            e.selectionsAfter.slice(0, e.selectionsAfter.length - 1),
          )),
          i
        );
      }
      function iu(t, e) {
        if (!t.length) return t;
        let i = t.length,
          n = Zc;
        while (i) {
          let s = nu(t[i - 1], e, n);
          if ((s.changes && !s.changes.empty) || s.effects.length) {
            let e = t.slice(0, i);
            return (e[i - 1] = s), e;
          }
          (e = s.mapped), i--, (n = s.selectionsAfter);
        }
        return n.length ? [Uc.selection(n)] : Zc;
      }
      function nu(t, e, i) {
        let n = Xc(
          t.selectionsAfter.length
            ? t.selectionsAfter.map((t) => t.map(e))
            : Zc,
          i,
        );
        if (!t.changes) return Uc.selection(n);
        let s = t.changes.map(e),
          r = e.mapDesc(t.changes, !0),
          o = t.mapped ? t.mapped.composeDesc(r) : r;
        return new Uc(
          s,
          gt.mapEffects(t.effects, e),
          o,
          t.startSelection.map(r),
          n,
        );
      }
      const su = /^(input\.type|delete)($|\.)/;
      class ru {
        constructor(t, e, i = 0, n) {
          (this.done = t),
            (this.undone = e),
            (this.prevTime = i),
            (this.prevUserEvent = n);
        }
        isolate() {
          return this.prevTime ? new ru(this.done, this.undone) : this;
        }
        addChanges(t, e, i, n, s) {
          let r = this.done,
            o = r[r.length - 1];
          return (
            (r =
              o &&
              o.changes &&
              !o.changes.empty &&
              t.changes &&
              (!i || su.test(i)) &&
              ((!o.selectionsAfter.length &&
                e - this.prevTime < n.newGroupDelay &&
                n.joinToEvent(s, Jc(o.changes, t.changes))) ||
                'input.type.compose' == i)
                ? Gc(
                    r,
                    r.length - 1,
                    n.minDepth,
                    new Uc(
                      t.changes.compose(o.changes),
                      Xc(t.effects, o.effects),
                      o.mapped,
                      o.startSelection,
                      Zc,
                    ),
                  )
                : Gc(r, r.length, n.minDepth, t)),
            new ru(r, Zc, e, i)
          );
        }
        addSelection(t, e, i, n) {
          let s = this.done.length
            ? this.done[this.done.length - 1].selectionsAfter
            : Zc;
          return s.length > 0 &&
            e - this.prevTime < n &&
            i == this.prevUserEvent &&
            i &&
            /^select($|\.)/.test(i) &&
            Yc(s[s.length - 1], t)
            ? this
            : new ru(tu(this.done, t), this.undone, e, i);
        }
        addMapping(t) {
          return new ru(
            iu(this.done, t),
            iu(this.undone, t),
            this.prevTime,
            this.prevUserEvent,
          );
        }
        pop(t, e, i) {
          let n = 0 == t ? this.done : this.undone;
          if (0 == n.length) return null;
          let s = n[n.length - 1];
          if (i && s.selectionsAfter.length)
            return e.update({
              selection: s.selectionsAfter[s.selectionsAfter.length - 1],
              annotations: Pc.of({ side: t, rest: eu(n) }),
              userEvent: 0 == t ? 'select.undo' : 'select.redo',
              scrollIntoView: !0,
            });
          if (s.changes) {
            let i = 1 == n.length ? Zc : n.slice(0, n.length - 1);
            return (
              s.mapped && (i = iu(i, s.mapped)),
              e.update({
                changes: s.changes,
                selection: s.startSelection,
                effects: s.effects,
                annotations: Pc.of({ side: t, rest: i }),
                filter: !1,
                userEvent: 0 == t ? 'undo' : 'redo',
                scrollIntoView: !0,
              })
            );
          }
          return null;
        }
      }
      ru.empty = new ru(Zc, Zc);
      const ou = [
        { key: 'Mod-z', run: jc, preventDefault: !0 },
        { key: 'Mod-y', mac: 'Mod-Shift-z', run: _c, preventDefault: !0 },
        { linux: 'Ctrl-Shift-z', run: _c, preventDefault: !0 },
        { key: 'Mod-u', run: Kc, preventDefault: !0 },
        { key: 'Alt-u', mac: 'Mod-Shift-u', run: $c, preventDefault: !0 },
      ];
      function lu(t, e) {
        return V.create(t.ranges.map(e), t.mainIndex);
      }
      function au(t, e) {
        return t.update({
          selection: e,
          scrollIntoView: !0,
          userEvent: 'select',
        });
      }
      function hu({ state: t, dispatch: e }, i) {
        let n = lu(t.selection, i);
        return !n.eq(t.selection) && (e(au(t, n)), !0);
      }
      function cu(t, e) {
        return V.cursor(e ? t.to : t.from);
      }
      function uu(t, e) {
        return hu(t, (i) => (i.empty ? t.moveByChar(i, e) : cu(i, e)));
      }
      function du(t) {
        return t.textDirectionAt(t.state.selection.main.head) == rn.LTR;
      }
      const fu = (t) => uu(t, !du(t)),
        pu = (t) => uu(t, du(t));
      function mu(t, e) {
        return hu(t, (i) => (i.empty ? t.moveByGroup(i, e) : cu(i, e)));
      }
      const gu = (t) => mu(t, !du(t)),
        vu = (t) => mu(t, du(t));
      function wu(t, e, i) {
        if (e.type.prop(i)) return !0;
        let n = e.to - e.from;
        return (
          (n && (n > 2 || /[^\s,.;:]/.test(t.sliceDoc(e.from, e.to)))) ||
          e.firstChild
        );
      }
      function yu(t, e, i) {
        let n = Ua(t).resolveInner(e.head),
          s = i ? zl.closedBy : zl.openedBy;
        for (let a = e.head; ; ) {
          let e = i ? n.childAfter(a) : n.childBefore(a);
          if (!e) break;
          wu(t, e, s) ? (n = e) : (a = i ? e.to : e.from);
        }
        let r,
          o,
          l = n.type.prop(s);
        return (
          (o =
            l && (r = i ? mc(t, n.from, 1) : mc(t, n.to, -1)) && r.matched
              ? i
                ? r.end.to
                : r.end.from
              : i
              ? n.to
              : n.from),
          V.cursor(o, i ? -1 : 1)
        );
      }
      const bu = (t) => hu(t, (e) => yu(t.state, e, !du(t))),
        xu = (t) => hu(t, (e) => yu(t.state, e, du(t)));
      function ku(t, e) {
        return hu(t, (i) => {
          if (!i.empty) return cu(i, e);
          let n = t.moveVertically(i, e);
          return n.head != i.head ? n : t.moveToLineBoundary(i, e);
        });
      }
      const Su = (t) => ku(t, !1),
        Cu = (t) => ku(t, !0);
      function Mu(t) {
        let e,
          i = t.scrollDOM.clientHeight < t.scrollDOM.scrollHeight - 2,
          n = 0,
          s = 0;
        if (i) {
          for (let e of t.state.facet(Or.scrollMargins)) {
            let i = e(t);
            (null === i || void 0 === i ? void 0 : i.top) &&
              (n = Math.max(null === i || void 0 === i ? void 0 : i.top, n)),
              (null === i || void 0 === i ? void 0 : i.bottom) &&
                (s = Math.max(
                  null === i || void 0 === i ? void 0 : i.bottom,
                  s,
                ));
          }
          e = t.scrollDOM.clientHeight - n - s;
        } else e = (t.dom.ownerDocument.defaultView || window).innerHeight;
        return {
          marginTop: n,
          marginBottom: s,
          selfScroll: i,
          height: Math.max(t.defaultLineHeight, e - 5),
        };
      }
      function Au(t, e) {
        let i,
          n = Mu(t),
          { state: s } = t,
          r = lu(s.selection, (i) =>
            i.empty ? t.moveVertically(i, e, n.height) : cu(i, e),
          );
        if (r.eq(s.selection)) return !1;
        if (n.selfScroll) {
          let e = t.coordsAtPos(s.selection.main.head),
            o = t.scrollDOM.getBoundingClientRect(),
            l = o.top + n.marginTop,
            a = o.bottom - n.marginBottom;
          e &&
            e.top > l &&
            e.bottom < a &&
            (i = Or.scrollIntoView(r.main.head, {
              y: 'start',
              yMargin: e.top - l,
            }));
        }
        return t.dispatch(au(s, r), { effects: i }), !0;
      }
      const Ou = (t) => Au(t, !1),
        Du = (t) => Au(t, !0);
      function Tu(t, e, i) {
        let n = t.lineBlockAt(e.head),
          s = t.moveToLineBoundary(e, i);
        if (
          (s.head == e.head &&
            s.head != (i ? n.to : n.from) &&
            (s = t.moveToLineBoundary(e, i, !1)),
          !i && s.head == n.from && n.length)
        ) {
          let i = /^\s*/.exec(
            t.state.sliceDoc(n.from, Math.min(n.from + 100, n.to)),
          )[0].length;
          i && e.head != n.from + i && (s = V.cursor(n.from + i));
        }
        return s;
      }
      const Eu = (t) => hu(t, (e) => Tu(t, e, !0)),
        Ru = (t) => hu(t, (e) => Tu(t, e, !1)),
        Bu = (t) => hu(t, (e) => Tu(t, e, !du(t))),
        Lu = (t) => hu(t, (e) => Tu(t, e, du(t))),
        Nu = (t) => hu(t, (e) => V.cursor(t.lineBlockAt(e.head).from, 1)),
        Pu = (t) => hu(t, (e) => V.cursor(t.lineBlockAt(e.head).to, -1));
      function Iu(t, e, i) {
        let n = !1,
          s = lu(t.selection, (e) => {
            let s =
              mc(t, e.head, -1) ||
              mc(t, e.head, 1) ||
              (e.head > 0 && mc(t, e.head - 1, 1)) ||
              (e.head < t.doc.length && mc(t, e.head + 1, -1));
            if (!s || !s.end) return e;
            n = !0;
            let r = s.start.from == e.head ? s.end.to : s.end.from;
            return i ? V.range(e.anchor, r) : V.cursor(r);
          });
        return !!n && (e(au(t, s)), !0);
      }
      const Hu = ({ state: t, dispatch: e }) => Iu(t, e, !1);
      function Wu(t, e) {
        let i = lu(t.state.selection, (t) => {
          let i = e(t);
          return V.range(t.anchor, i.head, i.goalColumn, i.bidiLevel || void 0);
        });
        return !i.eq(t.state.selection) && (t.dispatch(au(t.state, i)), !0);
      }
      function Vu(t, e) {
        return Wu(t, (i) => t.moveByChar(i, e));
      }
      const zu = (t) => Vu(t, !du(t)),
        Fu = (t) => Vu(t, du(t));
      function qu(t, e) {
        return Wu(t, (i) => t.moveByGroup(i, e));
      }
      const ju = (t) => qu(t, !du(t)),
        _u = (t) => qu(t, du(t));
      const Ku = (t) => Wu(t, (e) => yu(t.state, e, !du(t))),
        $u = (t) => Wu(t, (e) => yu(t.state, e, du(t)));
      function Uu(t, e) {
        return Wu(t, (i) => t.moveVertically(i, e));
      }
      const Gu = (t) => Uu(t, !1),
        Ju = (t) => Uu(t, !0);
      function Yu(t, e) {
        return Wu(t, (i) => t.moveVertically(i, e, Mu(t).height));
      }
      const Xu = (t) => Yu(t, !1),
        Zu = (t) => Yu(t, !0),
        Qu = (t) => Wu(t, (e) => Tu(t, e, !0)),
        td = (t) => Wu(t, (e) => Tu(t, e, !1)),
        ed = (t) => Wu(t, (e) => Tu(t, e, !du(t))),
        id = (t) => Wu(t, (e) => Tu(t, e, du(t))),
        nd = (t) => Wu(t, (e) => V.cursor(t.lineBlockAt(e.head).from)),
        sd = (t) => Wu(t, (e) => V.cursor(t.lineBlockAt(e.head).to)),
        rd = ({ state: t, dispatch: e }) => (e(au(t, { anchor: 0 })), !0),
        od = ({ state: t, dispatch: e }) => (
          e(au(t, { anchor: t.doc.length })), !0
        ),
        ld = ({ state: t, dispatch: e }) => (
          e(au(t, { anchor: t.selection.main.anchor, head: 0 })), !0
        ),
        ad = ({ state: t, dispatch: e }) => (
          e(au(t, { anchor: t.selection.main.anchor, head: t.doc.length })), !0
        ),
        hd = ({ state: t, dispatch: e }) => (
          e(
            t.update({
              selection: { anchor: 0, head: t.doc.length },
              userEvent: 'select',
            }),
          ),
          !0
        ),
        cd = ({ state: t, dispatch: e }) => {
          let i = Md(t).map(({ from: e, to: i }) =>
            V.range(e, Math.min(i + 1, t.doc.length)),
          );
          return (
            e(t.update({ selection: V.create(i), userEvent: 'select' })), !0
          );
        },
        ud = ({ state: t, dispatch: e }) => {
          let i = lu(t.selection, (e) => {
            var i;
            let n = Ua(t).resolveInner(e.head, 1);
            while (
              !(
                (n.from < e.from && n.to >= e.to) ||
                (n.to > e.to && n.from <= e.from)
              ) &&
              (null === (i = n.parent) || void 0 === i ? void 0 : i.parent)
            )
              n = n.parent;
            return V.range(n.to, n.from);
          });
          return e(au(t, i)), !0;
        },
        dd = ({ state: t, dispatch: e }) => {
          let i = t.selection,
            n = null;
          return (
            i.ranges.length > 1
              ? (n = V.create([i.main]))
              : i.main.empty || (n = V.create([V.cursor(i.main.head)])),
            !!n && (e(au(t, n)), !0)
          );
        };
      function fd(t, e) {
        if (t.state.readOnly) return !1;
        let i = 'delete.selection',
          { state: n } = t,
          s = n.changeByRange((n) => {
            let { from: s, to: r } = n;
            if (s == r) {
              let n = e(s);
              n < s
                ? ((i = 'delete.backward'), (n = pd(t, n, !1)))
                : n > s && ((i = 'delete.forward'), (n = pd(t, n, !0))),
                (s = Math.min(s, n)),
                (r = Math.max(r, n));
            } else (s = pd(t, s, !1)), (r = pd(t, r, !0));
            return s == r
              ? { range: n }
              : { changes: { from: s, to: r }, range: V.cursor(s) };
          });
        return (
          !s.changes.empty &&
          (t.dispatch(
            n.update(s, {
              scrollIntoView: !0,
              userEvent: i,
              effects:
                'delete.selection' == i
                  ? Or.announce.of(n.phrase('Selection deleted'))
                  : void 0,
            }),
          ),
          !0)
        );
      }
      function pd(t, e, i) {
        if (t instanceof Or)
          for (let n of t.state.facet(Or.atomicRanges).map((e) => e(t)))
            n.between(e, e, (t, n) => {
              t < e && n > e && (e = i ? n : t);
            });
        return e;
      }
      const md = (t, e) =>
          fd(t, (i) => {
            let n,
              s,
              { state: r } = t,
              o = r.doc.lineAt(i);
            if (
              !e &&
              i > o.from &&
              i < o.from + 200 &&
              !/[^ \t]/.test((n = o.text.slice(0, i - o.from)))
            ) {
              if ('\t' == n[n.length - 1]) return i - 1;
              let t = Yt(n, r.tabSize),
                e = t % rh(r) || rh(r);
              for (let s = 0; s < e && ' ' == n[n.length - 1 - s]; s++) i--;
              s = i;
            } else
              (s = b(o.text, i - o.from, e, e) + o.from),
                s == i &&
                  o.number != (e ? r.doc.lines : 1) &&
                  (s += e ? 1 : -1);
            return s;
          }),
        gd = (t) => md(t, !1),
        vd = (t) => md(t, !0),
        wd = (t, e) =>
          fd(t, (i) => {
            let n = i,
              { state: s } = t,
              r = s.doc.lineAt(n),
              o = s.charCategorizer(n);
            for (let t = null; ; ) {
              if (n == (e ? r.to : r.from)) {
                n == i &&
                  r.number != (e ? s.doc.lines : 1) &&
                  (n += e ? 1 : -1);
                break;
              }
              let l = b(r.text, n - r.from, e) + r.from,
                a = r.text.slice(
                  Math.min(n, l) - r.from,
                  Math.max(n, l) - r.from,
                ),
                h = o(a);
              if (null != t && h != t) break;
              (' ' == a && n == i) || (t = h), (n = l);
            }
            return n;
          }),
        yd = (t) => wd(t, !1),
        bd = (t) => wd(t, !0),
        xd = (t) =>
          fd(t, (e) => {
            let i = t.lineBlockAt(e).to;
            return e < i ? i : Math.min(t.state.doc.length, e + 1);
          }),
        kd = (t) =>
          fd(t, (e) => {
            let i = t.lineBlockAt(e).from;
            return e > i ? i : Math.max(0, e - 1);
          }),
        Sd = ({ state: t, dispatch: e }) => {
          if (t.readOnly) return !1;
          let i = t.changeByRange((t) => ({
            changes: { from: t.from, to: t.to, insert: o.of(['', '']) },
            range: V.cursor(t.from),
          }));
          return e(t.update(i, { scrollIntoView: !0, userEvent: 'input' })), !0;
        },
        Cd = ({ state: t, dispatch: e }) => {
          if (t.readOnly) return !1;
          let i = t.changeByRange((e) => {
            if (!e.empty || 0 == e.from || e.from == t.doc.length)
              return { range: e };
            let i = e.from,
              n = t.doc.lineAt(i),
              s = i == n.from ? i - 1 : b(n.text, i - n.from, !1) + n.from,
              r = i == n.to ? i + 1 : b(n.text, i - n.from, !0) + n.from;
            return {
              changes: {
                from: s,
                to: r,
                insert: t.doc.slice(i, r).append(t.doc.slice(s, i)),
              },
              range: V.cursor(r),
            };
          });
          return (
            !i.changes.empty &&
            (e(
              t.update(i, { scrollIntoView: !0, userEvent: 'move.character' }),
            ),
            !0)
          );
        };
      function Md(t) {
        let e = [],
          i = -1;
        for (let n of t.selection.ranges) {
          let s = t.doc.lineAt(n.from),
            r = t.doc.lineAt(n.to);
          if (
            (n.empty || n.to != r.from || (r = t.doc.lineAt(n.to - 1)),
            i >= s.number)
          ) {
            let t = e[e.length - 1];
            (t.to = r.to), t.ranges.push(n);
          } else e.push({ from: s.from, to: r.to, ranges: [n] });
          i = r.number + 1;
        }
        return e;
      }
      function Ad(t, e, i) {
        if (t.readOnly) return !1;
        let n = [],
          s = [];
        for (let r of Md(t)) {
          if (i ? r.to == t.doc.length : 0 == r.from) continue;
          let e = t.doc.lineAt(i ? r.to + 1 : r.from - 1),
            o = e.length + 1;
          if (i) {
            n.push(
              { from: r.to, to: e.to },
              { from: r.from, insert: e.text + t.lineBreak },
            );
            for (let e of r.ranges)
              s.push(
                V.range(
                  Math.min(t.doc.length, e.anchor + o),
                  Math.min(t.doc.length, e.head + o),
                ),
              );
          } else {
            n.push(
              { from: e.from, to: r.from },
              { from: r.to, insert: t.lineBreak + e.text },
            );
            for (let t of r.ranges) s.push(V.range(t.anchor - o, t.head - o));
          }
        }
        return (
          !!n.length &&
          (e(
            t.update({
              changes: n,
              scrollIntoView: !0,
              selection: V.create(s, t.selection.mainIndex),
              userEvent: 'move.line',
            }),
          ),
          !0)
        );
      }
      const Od = ({ state: t, dispatch: e }) => Ad(t, e, !1),
        Dd = ({ state: t, dispatch: e }) => Ad(t, e, !0);
      function Td(t, e, i) {
        if (t.readOnly) return !1;
        let n = [];
        for (let s of Md(t))
          i
            ? n.push({
                from: s.from,
                insert: t.doc.slice(s.from, s.to) + t.lineBreak,
              })
            : n.push({
                from: s.to,
                insert: t.lineBreak + t.doc.slice(s.from, s.to),
              });
        return (
          e(
            t.update({
              changes: n,
              scrollIntoView: !0,
              userEvent: 'input.copyline',
            }),
          ),
          !0
        );
      }
      const Ed = ({ state: t, dispatch: e }) => Td(t, e, !1),
        Rd = ({ state: t, dispatch: e }) => Td(t, e, !0),
        Bd = (t) => {
          if (t.state.readOnly) return !1;
          let { state: e } = t,
            i = e.changes(
              Md(e).map(
                ({ from: t, to: i }) => (
                  t > 0 ? t-- : i < e.doc.length && i++, { from: t, to: i }
                ),
              ),
            ),
            n = lu(e.selection, (e) => t.moveVertically(e, !0)).map(i);
          return (
            t.dispatch({
              changes: i,
              selection: n,
              scrollIntoView: !0,
              userEvent: 'delete.line',
            }),
            !0
          );
        };
      function Ld(t, e) {
        if (/\(\)|\[\]|\{\}/.test(t.sliceDoc(e - 1, e + 1)))
          return { from: e, to: e };
        let i,
          n = Ua(t).resolveInner(e),
          s = n.childBefore(e),
          r = n.childAfter(e);
        return s &&
          r &&
          s.to <= e &&
          r.from >= e &&
          (i = s.type.prop(zl.closedBy)) &&
          i.indexOf(r.name) > -1 &&
          t.doc.lineAt(s.to).from == t.doc.lineAt(r.from).from
          ? { from: s.to, to: r.from }
          : null;
      }
      const Nd = Id(!1),
        Pd = Id(!0);
      function Id(t) {
        return ({ state: e, dispatch: i }) => {
          if (e.readOnly) return !1;
          let n = e.changeByRange((i) => {
            let { from: n, to: s } = i,
              r = e.doc.lineAt(n),
              l = !t && n == s && Ld(e, n);
            t && (n = s = (s <= r.to ? r : e.doc.lineAt(s)).to);
            let a = new ah(e, { simulateBreak: n, simulateDoubleBreak: !!l }),
              h = lh(a, n);
            null == h && (h = /^\s*/.exec(e.doc.lineAt(n).text)[0].length);
            while (s < r.to && /\s/.test(r.text[s - r.from])) s++;
            l
              ? ({ from: n, to: s } = l)
              : n > r.from &&
                n < r.from + 100 &&
                !/\S/.test(r.text.slice(0, n)) &&
                (n = r.from);
            let c = ['', oh(e, h)];
            return (
              l && c.push(oh(e, a.lineIndent(r.from, -1))),
              {
                changes: { from: n, to: s, insert: o.of(c) },
                range: V.cursor(n + 1 + c[1].length),
              }
            );
          });
          return i(e.update(n, { scrollIntoView: !0, userEvent: 'input' })), !0;
        };
      }
      function Hd(t, e) {
        let i = -1;
        return t.changeByRange((n) => {
          let s = [];
          for (let o = n.from; o <= n.to; ) {
            let r = t.doc.lineAt(o);
            r.number > i &&
              (n.empty || n.to > r.from) &&
              (e(r, s, n), (i = r.number)),
              (o = r.to + 1);
          }
          let r = t.changes(s);
          return {
            changes: s,
            range: V.range(r.mapPos(n.anchor, 1), r.mapPos(n.head, 1)),
          };
        });
      }
      const Wd = ({ state: t, dispatch: e }) => {
          if (t.readOnly) return !1;
          let i = Object.create(null),
            n = new ah(t, {
              overrideIndentation: (t) => {
                let e = i[t];
                return null == e ? -1 : e;
              },
            }),
            s = Hd(t, (e, s, r) => {
              let o = lh(n, e.from);
              if (null == o) return;
              /\S/.test(e.text) || (o = 0);
              let l = /^\s*/.exec(e.text)[0],
                a = oh(t, o);
              (l != a || r.from < e.from + l.length) &&
                ((i[e.from] = o),
                s.push({ from: e.from, to: e.from + l.length, insert: a }));
            });
          return s.changes.empty || e(t.update(s, { userEvent: 'indent' })), !0;
        },
        Vd = ({ state: t, dispatch: e }) =>
          !t.readOnly &&
          (e(
            t.update(
              Hd(t, (e, i) => {
                i.push({ from: e.from, insert: t.facet(sh) });
              }),
              { userEvent: 'input.indent' },
            ),
          ),
          !0),
        zd = ({ state: t, dispatch: e }) =>
          !t.readOnly &&
          (e(
            t.update(
              Hd(t, (e, i) => {
                let n = /^\s*/.exec(e.text)[0];
                if (!n) return;
                let s = Yt(n, t.tabSize),
                  r = 0,
                  o = oh(t, Math.max(0, s - rh(t)));
                while (
                  r < n.length &&
                  r < o.length &&
                  n.charCodeAt(r) == o.charCodeAt(r)
                )
                  r++;
                i.push({
                  from: e.from + r,
                  to: e.from + n.length,
                  insert: o.slice(r),
                });
              }),
              { userEvent: 'delete.dedent' },
            ),
          ),
          !0),
        Fd = [
          { key: 'Ctrl-b', run: fu, shift: zu, preventDefault: !0 },
          { key: 'Ctrl-f', run: pu, shift: Fu },
          { key: 'Ctrl-p', run: Su, shift: Gu },
          { key: 'Ctrl-n', run: Cu, shift: Ju },
          { key: 'Ctrl-a', run: Nu, shift: nd },
          { key: 'Ctrl-e', run: Pu, shift: sd },
          { key: 'Ctrl-d', run: vd },
          { key: 'Ctrl-h', run: gd },
          { key: 'Ctrl-k', run: xd },
          { key: 'Ctrl-Alt-h', run: yd },
          { key: 'Ctrl-o', run: Sd },
          { key: 'Ctrl-t', run: Cd },
          { key: 'Ctrl-v', run: Du },
        ],
        qd = [
          { key: 'ArrowLeft', run: fu, shift: zu, preventDefault: !0 },
          {
            key: 'Mod-ArrowLeft',
            mac: 'Alt-ArrowLeft',
            run: gu,
            shift: ju,
            preventDefault: !0,
          },
          { mac: 'Cmd-ArrowLeft', run: Bu, shift: ed, preventDefault: !0 },
          { key: 'ArrowRight', run: pu, shift: Fu, preventDefault: !0 },
          {
            key: 'Mod-ArrowRight',
            mac: 'Alt-ArrowRight',
            run: vu,
            shift: _u,
            preventDefault: !0,
          },
          { mac: 'Cmd-ArrowRight', run: Lu, shift: id, preventDefault: !0 },
          { key: 'ArrowUp', run: Su, shift: Gu, preventDefault: !0 },
          { mac: 'Cmd-ArrowUp', run: rd, shift: ld },
          { mac: 'Ctrl-ArrowUp', run: Ou, shift: Xu },
          { key: 'ArrowDown', run: Cu, shift: Ju, preventDefault: !0 },
          { mac: 'Cmd-ArrowDown', run: od, shift: ad },
          { mac: 'Ctrl-ArrowDown', run: Du, shift: Zu },
          { key: 'PageUp', run: Ou, shift: Xu },
          { key: 'PageDown', run: Du, shift: Zu },
          { key: 'Home', run: Ru, shift: td, preventDefault: !0 },
          { key: 'Mod-Home', run: rd, shift: ld },
          { key: 'End', run: Eu, shift: Qu, preventDefault: !0 },
          { key: 'Mod-End', run: od, shift: ad },
          { key: 'Enter', run: Nd },
          { key: 'Mod-a', run: hd },
          { key: 'Backspace', run: gd, shift: gd },
          { key: 'Delete', run: vd },
          { key: 'Mod-Backspace', mac: 'Alt-Backspace', run: yd },
          { key: 'Mod-Delete', mac: 'Alt-Delete', run: bd },
          { mac: 'Mod-Backspace', run: kd },
          { mac: 'Mod-Delete', run: xd },
        ].concat(Fd.map((t) => ({ mac: t.key, run: t.run, shift: t.shift }))),
        jd = [
          { key: 'Alt-ArrowLeft', mac: 'Ctrl-ArrowLeft', run: bu, shift: Ku },
          { key: 'Alt-ArrowRight', mac: 'Ctrl-ArrowRight', run: xu, shift: $u },
          { key: 'Alt-ArrowUp', run: Od },
          { key: 'Shift-Alt-ArrowUp', run: Ed },
          { key: 'Alt-ArrowDown', run: Dd },
          { key: 'Shift-Alt-ArrowDown', run: Rd },
          { key: 'Escape', run: dd },
          { key: 'Mod-Enter', run: Pd },
          { key: 'Alt-l', mac: 'Ctrl-l', run: cd },
          { key: 'Mod-i', run: ud, preventDefault: !0 },
          { key: 'Mod-[', run: zd },
          { key: 'Mod-]', run: Vd },
          { key: 'Mod-Alt-\\', run: Wd },
          { key: 'Shift-Mod-k', run: Bd },
          { key: 'Shift-Mod-\\', run: Hu },
          { key: 'Mod-/', run: Cc },
          { key: 'Alt-A', run: Oc },
        ].concat(qd),
        _d = { key: 'Tab', run: Vd, shift: zd };
      function Kd() {
        var t = arguments[0];
        'string' == typeof t && (t = document.createElement(t));
        var e = 1,
          i = arguments[1];
        if (
          i &&
          'object' == typeof i &&
          null == i.nodeType &&
          !Array.isArray(i)
        ) {
          for (var n in i)
            if (Object.prototype.hasOwnProperty.call(i, n)) {
              var s = i[n];
              'string' == typeof s
                ? t.setAttribute(n, s)
                : null != s && (t[n] = s);
            }
          e++;
        }
        for (; e < arguments.length; e++) $d(t, arguments[e]);
        return t;
      }
      function $d(t, e) {
        if ('string' == typeof e) t.appendChild(document.createTextNode(e));
        else if (null == e);
        else if (null != e.nodeType) t.appendChild(e);
        else {
          if (!Array.isArray(e))
            throw new RangeError('Unsupported child node: ' + e);
          for (var i = 0; i < e.length; i++) $d(t, e[i]);
        }
      }
      const Ud =
        'function' == typeof String.prototype.normalize
          ? (t) => t.normalize('NFKD')
          : (t) => t;
      class Gd {
        constructor(t, e, i = 0, n = t.length, s, r) {
          (this.test = r),
            (this.value = { from: 0, to: 0 }),
            (this.done = !1),
            (this.matches = []),
            (this.buffer = ''),
            (this.bufferPos = 0),
            (this.iter = t.iterRange(i, n)),
            (this.bufferStart = i),
            (this.normalize = s ? (t) => s(Ud(t)) : Ud),
            (this.query = this.normalize(e));
        }
        peek() {
          if (this.bufferPos == this.buffer.length) {
            if (
              ((this.bufferStart += this.buffer.length),
              this.iter.next(),
              this.iter.done)
            )
              return -1;
            (this.bufferPos = 0), (this.buffer = this.iter.value);
          }
          return M(this.buffer, this.bufferPos);
        }
        next() {
          while (this.matches.length) this.matches.pop();
          return this.nextOverlapping();
        }
        nextOverlapping() {
          for (;;) {
            let t = this.peek();
            if (t < 0) return (this.done = !0), this;
            let e = A(t),
              i = this.bufferStart + this.bufferPos;
            this.bufferPos += O(t);
            let n = this.normalize(e);
            for (let s = 0, r = i; ; s++) {
              let t = n.charCodeAt(s),
                o = this.match(t, r);
              if (o) return (this.value = o), this;
              if (s == n.length - 1) break;
              r == i && s < e.length && e.charCodeAt(s) == t && r++;
            }
          }
        }
        match(t, e) {
          let i = null;
          for (let n = 0; n < this.matches.length; n += 2) {
            let s = this.matches[n],
              r = !1;
            this.query.charCodeAt(s) == t &&
              (s == this.query.length - 1
                ? (i = { from: this.matches[n + 1], to: e + 1 })
                : (this.matches[n]++, (r = !0))),
              r || (this.matches.splice(n, 2), (n -= 2));
          }
          return (
            this.query.charCodeAt(0) == t &&
              (1 == this.query.length
                ? (i = { from: e, to: e + 1 })
                : this.matches.push(1, e)),
            i &&
              this.test &&
              !this.test(i.from, i.to, this.buffer, this.bufferPos) &&
              (i = null),
            i
          );
        }
      }
      'undefined' != typeof Symbol &&
        (Gd.prototype[Symbol.iterator] = function () {
          return this;
        });
      const Jd = { from: -1, to: -1, match: /.*/.exec('') },
        Yd = 'gm' + (null == /x/.unicode ? '' : 'u');
      class Xd {
        constructor(t, e, i, n = 0, s = t.length) {
          if (
            ((this.text = t),
            (this.to = s),
            (this.curLine = ''),
            (this.done = !1),
            (this.value = Jd),
            /\\[sWDnr]|\n|\r|\[\^/.test(e))
          )
            return new tf(t, e, i, n, s);
          (this.re = new RegExp(
            e,
            Yd +
              ((null === i || void 0 === i ? void 0 : i.ignoreCase) ? 'i' : ''),
          )),
            (this.test = null === i || void 0 === i ? void 0 : i.test),
            (this.iter = t.iter());
          let r = t.lineAt(n);
          (this.curLineStart = r.from),
            (this.matchPos = nf(t, n)),
            this.getLine(this.curLineStart);
        }
        getLine(t) {
          this.iter.next(t),
            this.iter.lineBreak
              ? (this.curLine = '')
              : ((this.curLine = this.iter.value),
                this.curLineStart + this.curLine.length > this.to &&
                  (this.curLine = this.curLine.slice(
                    0,
                    this.to - this.curLineStart,
                  )),
                this.iter.next());
        }
        nextLine() {
          (this.curLineStart = this.curLineStart + this.curLine.length + 1),
            this.curLineStart > this.to ? (this.curLine = '') : this.getLine(0);
        }
        next() {
          for (let t = this.matchPos - this.curLineStart; ; ) {
            this.re.lastIndex = t;
            let e = this.matchPos <= this.to && this.re.exec(this.curLine);
            if (e) {
              let i = this.curLineStart + e.index,
                n = i + e[0].length;
              if (
                ((this.matchPos = nf(this.text, n + (i == n ? 1 : 0))),
                i == this.curLineStart + this.curLine.length && this.nextLine(),
                (i < n || i > this.value.to) &&
                  (!this.test || this.test(i, n, e)))
              )
                return (this.value = { from: i, to: n, match: e }), this;
              t = this.matchPos - this.curLineStart;
            } else {
              if (!(this.curLineStart + this.curLine.length < this.to))
                return (this.done = !0), this;
              this.nextLine(), (t = 0);
            }
          }
        }
      }
      const Zd = new WeakMap();
      class Qd {
        constructor(t, e) {
          (this.from = t), (this.text = e);
        }
        get to() {
          return this.from + this.text.length;
        }
        static get(t, e, i) {
          let n = Zd.get(t);
          if (!n || n.from >= i || n.to <= e) {
            let n = new Qd(e, t.sliceString(e, i));
            return Zd.set(t, n), n;
          }
          if (n.from == e && n.to == i) return n;
          let { text: s, from: r } = n;
          return (
            r > e && ((s = t.sliceString(e, r) + s), (r = e)),
            n.to < i && (s += t.sliceString(n.to, i)),
            Zd.set(t, new Qd(r, s)),
            new Qd(e, s.slice(e - r, i - r))
          );
        }
      }
      class tf {
        constructor(t, e, i, n, s) {
          (this.text = t),
            (this.to = s),
            (this.done = !1),
            (this.value = Jd),
            (this.matchPos = nf(t, n)),
            (this.re = new RegExp(
              e,
              Yd +
                ((null === i || void 0 === i ? void 0 : i.ignoreCase)
                  ? 'i'
                  : ''),
            )),
            (this.test = null === i || void 0 === i ? void 0 : i.test),
            (this.flat = Qd.get(t, n, this.chunkEnd(n + 5e3)));
        }
        chunkEnd(t) {
          return t >= this.to ? this.to : this.text.lineAt(t).to;
        }
        next() {
          for (;;) {
            let t = (this.re.lastIndex = this.matchPos - this.flat.from),
              e = this.re.exec(this.flat.text);
            if (
              (e &&
                !e[0] &&
                e.index == t &&
                ((this.re.lastIndex = t + 1),
                (e = this.re.exec(this.flat.text))),
              e)
            ) {
              let t = this.flat.from + e.index,
                i = t + e[0].length;
              if (
                (this.flat.to >= this.to ||
                  e.index + e[0].length <= this.flat.text.length - 10) &&
                (!this.test || this.test(t, i, e))
              )
                return (
                  (this.value = { from: t, to: i, match: e }),
                  (this.matchPos = nf(this.text, i + (t == i ? 1 : 0))),
                  this
                );
            }
            if (this.flat.to == this.to) return (this.done = !0), this;
            this.flat = Qd.get(
              this.text,
              this.flat.from,
              this.chunkEnd(this.flat.from + 2 * this.flat.text.length),
            );
          }
        }
      }
      function ef(t) {
        try {
          return new RegExp(t, Yd), !0;
        } catch (qa) {
          return !1;
        }
      }
      function nf(t, e) {
        if (e >= t.length) return e;
        let i,
          n = t.lineAt(e);
        while (
          e < n.to &&
          (i = n.text.charCodeAt(e - n.from)) >= 56320 &&
          i < 57344
        )
          e++;
        return e;
      }
      function sf(t) {
        let e = Kd('input', { class: 'cm-textfield', name: 'line' }),
          i = Kd(
            'form',
            {
              class: 'cm-gotoLine',
              onkeydown: (e) => {
                27 == e.keyCode
                  ? (e.preventDefault(),
                    t.dispatch({ effects: rf.of(!1) }),
                    t.focus())
                  : 13 == e.keyCode && (e.preventDefault(), n());
              },
              onsubmit: (t) => {
                t.preventDefault(), n();
              },
            },
            Kd('label', t.state.phrase('Go to line'), ': ', e),
            ' ',
            Kd(
              'button',
              { class: 'cm-button', type: 'submit' },
              t.state.phrase('go'),
            ),
          );
        function n() {
          let i = /^([+-])?(\d+)?(:\d+)?(%)?$/.exec(e.value);
          if (!i) return;
          let { state: n } = t,
            s = n.doc.lineAt(n.selection.main.head),
            [, r, o, l, a] = i,
            h = l ? +l.slice(1) : 0,
            c = o ? +o : s.number;
          if (o && a) {
            let t = c / 100;
            r && (t = t * ('-' == r ? -1 : 1) + s.number / n.doc.lines),
              (c = Math.round(n.doc.lines * t));
          } else o && r && (c = c * ('-' == r ? -1 : 1) + s.number);
          let u = n.doc.line(Math.max(1, Math.min(n.doc.lines, c)));
          t.dispatch({
            effects: rf.of(!1),
            selection: V.cursor(u.from + Math.max(0, Math.min(h, u.length))),
            scrollIntoView: !0,
          }),
            t.focus();
        }
        return { dom: i };
      }
      'undefined' != typeof Symbol &&
        (Xd.prototype[Symbol.iterator] = tf.prototype[Symbol.iterator] =
          function () {
            return this;
          });
      const rf = gt.define(),
        of = J.define({
          create() {
            return !0;
          },
          update(t, e) {
            for (let i of e.effects) i.is(rf) && (t = i.value);
            return t;
          },
          provide: (t) => dl.from(t, (t) => (t ? sf : null)),
        }),
        lf = (t) => {
          let e = al(t, sf);
          if (!e) {
            let i = [rf.of(!0)];
            null == t.state.field(of, !1) &&
              i.push(gt.appendConfig.of([of, af])),
              t.dispatch({ effects: i }),
              (e = al(t, sf));
          }
          return e && e.dom.querySelector('input').focus(), !0;
        },
        af = Or.baseTheme({
          '.cm-panel.cm-gotoLine': {
            padding: '2px 6px 4px',
            '& label': { fontSize: '80%' },
          },
        }),
        hf = {
          highlightWordAroundCursor: !1,
          minSelectionLength: 1,
          maxMatches: 100,
          wholeWords: !1,
        },
        cf = q.define({
          combine(t) {
            return Bt(t, hf, {
              highlightWordAroundCursor: (t, e) => t || e,
              minSelectionLength: Math.min,
              maxMatches: Math.min,
            });
          },
        });
      function uf(t) {
        let e = [vf, gf];
        return t && e.push(cf.of(t)), e;
      }
      const df = xi.mark({ class: 'cm-selectionMatch' }),
        ff = xi.mark({ class: 'cm-selectionMatch cm-selectionMatch-main' });
      function pf(t, e, i, n) {
        return (
          (0 == i || t(e.sliceDoc(i - 1, i)) != At.Word) &&
          (n == e.doc.length || t(e.sliceDoc(n, n + 1)) != At.Word)
        );
      }
      function mf(t, e, i, n) {
        return (
          t(e.sliceDoc(i, i + 1)) == At.Word &&
          t(e.sliceDoc(n - 1, n)) == At.Word
        );
      }
      const gf = Gi.fromClass(
          class {
            constructor(t) {
              this.decorations = this.getDeco(t);
            }
            update(t) {
              (t.selectionSet || t.docChanged || t.viewportChanged) &&
                (this.decorations = this.getDeco(t.view));
            }
            getDeco(t) {
              let e = t.state.facet(cf),
                { state: i } = t,
                n = i.selection;
              if (n.ranges.length > 1) return xi.none;
              let s,
                r = n.main,
                o = null;
              if (r.empty) {
                if (!e.highlightWordAroundCursor) return xi.none;
                let t = i.wordAt(r.head);
                if (!t) return xi.none;
                (o = i.charCategorizer(r.head)), (s = i.sliceDoc(t.from, t.to));
              } else {
                let t = r.to - r.from;
                if (t < e.minSelectionLength || t > 200) return xi.none;
                if (e.wholeWords) {
                  if (
                    ((s = i.sliceDoc(r.from, r.to)),
                    (o = i.charCategorizer(r.head)),
                    !pf(o, i, r.from, r.to) || !mf(o, i, r.from, r.to))
                  )
                    return xi.none;
                } else if (((s = i.sliceDoc(r.from, r.to).trim()), !s))
                  return xi.none;
              }
              let l = [];
              for (let a of t.visibleRanges) {
                let t = new Gd(i.doc, s, a.from, a.to);
                while (!t.next().done) {
                  let { from: n, to: s } = t.value;
                  if (
                    (!o || pf(o, i, n, s)) &&
                    (r.empty && n <= r.from && s >= r.to
                      ? l.push(ff.range(n, s))
                      : (n >= r.to || s <= r.from) && l.push(df.range(n, s)),
                    l.length > e.maxMatches)
                  )
                    return xi.none;
                }
              }
              return xi.set(l);
            }
          },
          { decorations: (t) => t.decorations },
        ),
        vf = Or.baseTheme({
          '.cm-selectionMatch': { backgroundColor: '#99ff7780' },
          '.cm-searchMatch .cm-selectionMatch': {
            backgroundColor: 'transparent',
          },
        }),
        wf = ({ state: t, dispatch: e }) => {
          let { selection: i } = t,
            n = V.create(
              i.ranges.map((e) => t.wordAt(e.head) || V.cursor(e.head)),
              i.mainIndex,
            );
          return !n.eq(i) && (e(t.update({ selection: n })), !0);
        };
      function yf(t, e) {
        let { main: i, ranges: n } = t.selection,
          s = t.wordAt(i.head),
          r = s && s.from == i.from && s.to == i.to;
        for (let o = !1, l = new Gd(t.doc, e, n[n.length - 1].to); ; ) {
          if ((l.next(), !l.done)) {
            if (o && n.some((t) => t.from == l.value.from)) continue;
            if (r) {
              let e = t.wordAt(l.value.from);
              if (!e || e.from != l.value.from || e.to != l.value.to) continue;
            }
            return l.value;
          }
          if (o) return null;
          (l = new Gd(t.doc, e, 0, Math.max(0, n[n.length - 1].from - 1))),
            (o = !0);
        }
      }
      const bf = ({ state: t, dispatch: e }) => {
          let { ranges: i } = t.selection;
          if (i.some((t) => t.from === t.to))
            return wf({ state: t, dispatch: e });
          let n = t.sliceDoc(i[0].from, i[0].to);
          if (t.selection.ranges.some((e) => t.sliceDoc(e.from, e.to) != n))
            return !1;
          let s = yf(t, n);
          return (
            !!s &&
            (e(
              t.update({
                selection: t.selection.addRange(V.range(s.from, s.to), !1),
                effects: Or.scrollIntoView(s.to),
              }),
            ),
            !0)
          );
        },
        xf = q.define({
          combine(t) {
            return Bt(t, {
              top: !1,
              caseSensitive: !1,
              literal: !1,
              wholeWord: !1,
              createPanel: (t) => new Qf(t),
              scrollToMatch: (t) => Or.scrollIntoView(t),
            });
          },
        });
      class kf {
        constructor(t) {
          (this.search = t.search),
            (this.caseSensitive = !!t.caseSensitive),
            (this.literal = !!t.literal),
            (this.regexp = !!t.regexp),
            (this.replace = t.replace || ''),
            (this.valid = !!this.search && (!this.regexp || ef(this.search))),
            (this.unquoted = this.unquote(this.search)),
            (this.wholeWord = !!t.wholeWord);
        }
        unquote(t) {
          return this.literal
            ? t
            : t.replace(/\\([nrt\\])/g, (t, e) =>
                'n' == e ? '\n' : 'r' == e ? '\r' : 't' == e ? '\t' : '\\',
              );
        }
        eq(t) {
          return (
            this.search == t.search &&
            this.replace == t.replace &&
            this.caseSensitive == t.caseSensitive &&
            this.regexp == t.regexp &&
            this.wholeWord == t.wholeWord
          );
        }
        create() {
          return this.regexp ? new Rf(this) : new Af(this);
        }
        getCursor(t, e = 0, i) {
          let n = t.doc ? t : Rt.create({ doc: t });
          return (
            null == i && (i = n.doc.length),
            this.regexp ? Of(this, n, e, i) : Cf(this, n, e, i)
          );
        }
      }
      class Sf {
        constructor(t) {
          this.spec = t;
        }
      }
      function Cf(t, e, i, n) {
        return new Gd(
          e.doc,
          t.unquoted,
          i,
          n,
          t.caseSensitive ? void 0 : (t) => t.toLowerCase(),
          t.wholeWord
            ? Mf(e.doc, e.charCategorizer(e.selection.main.head))
            : void 0,
        );
      }
      function Mf(t, e) {
        return (i, n, s, r) => (
          (r > i || r + s.length < n) &&
            ((r = Math.max(0, i - 2)),
            (s = t.sliceString(r, Math.min(t.length, n + 2)))),
          (e(Df(s, i - r)) != At.Word || e(Tf(s, i - r)) != At.Word) &&
            (e(Tf(s, n - r)) != At.Word || e(Df(s, n - r)) != At.Word)
        );
      }
      class Af extends Sf {
        constructor(t) {
          super(t);
        }
        nextMatch(t, e, i) {
          let n = Cf(this.spec, t, i, t.doc.length).nextOverlapping();
          return (
            n.done && (n = Cf(this.spec, t, 0, e).nextOverlapping()),
            n.done ? null : n.value
          );
        }
        prevMatchInRange(t, e, i) {
          for (let n = i; ; ) {
            let i = Math.max(e, n - 1e4 - this.spec.unquoted.length),
              s = Cf(this.spec, t, i, n),
              r = null;
            while (!s.nextOverlapping().done) r = s.value;
            if (r) return r;
            if (i == e) return null;
            n -= 1e4;
          }
        }
        prevMatch(t, e, i) {
          return (
            this.prevMatchInRange(t, 0, e) ||
            this.prevMatchInRange(t, i, t.doc.length)
          );
        }
        getReplacement(t) {
          return this.spec.unquote(this.spec.replace);
        }
        matchAll(t, e) {
          let i = Cf(this.spec, t, 0, t.doc.length),
            n = [];
          while (!i.next().done) {
            if (n.length >= e) return null;
            n.push(i.value);
          }
          return n;
        }
        highlight(t, e, i, n) {
          let s = Cf(
            this.spec,
            t,
            Math.max(0, e - this.spec.unquoted.length),
            Math.min(i + this.spec.unquoted.length, t.doc.length),
          );
          while (!s.next().done) n(s.value.from, s.value.to);
        }
      }
      function Of(t, e, i, n) {
        return new Xd(
          e.doc,
          t.search,
          {
            ignoreCase: !t.caseSensitive,
            test: t.wholeWord
              ? Ef(e.charCategorizer(e.selection.main.head))
              : void 0,
          },
          i,
          n,
        );
      }
      function Df(t, e) {
        return t.slice(b(t, e, !1), e);
      }
      function Tf(t, e) {
        return t.slice(e, b(t, e));
      }
      function Ef(t) {
        return (e, i, n) =>
          !n[0].length ||
          ((t(Df(n.input, n.index)) != At.Word ||
            t(Tf(n.input, n.index)) != At.Word) &&
            (t(Tf(n.input, n.index + n[0].length)) != At.Word ||
              t(Df(n.input, n.index + n[0].length)) != At.Word));
      }
      class Rf extends Sf {
        nextMatch(t, e, i) {
          let n = Of(this.spec, t, i, t.doc.length).next();
          return (
            n.done && (n = Of(this.spec, t, 0, e).next()),
            n.done ? null : n.value
          );
        }
        prevMatchInRange(t, e, i) {
          for (let n = 1; ; n++) {
            let s = Math.max(e, i - 1e4 * n),
              r = Of(this.spec, t, s, i),
              o = null;
            while (!r.next().done) o = r.value;
            if (o && (s == e || o.from > s + 10)) return o;
            if (s == e) return null;
          }
        }
        prevMatch(t, e, i) {
          return (
            this.prevMatchInRange(t, 0, e) ||
            this.prevMatchInRange(t, i, t.doc.length)
          );
        }
        getReplacement(t) {
          return this.spec.unquote(
            this.spec.replace.replace(/\$([$&\d+])/g, (e, i) =>
              '$' == i
                ? '$'
                : '&' == i
                ? t.match[0]
                : '0' != i && +i < t.match.length
                ? t.match[i]
                : e,
            ),
          );
        }
        matchAll(t, e) {
          let i = Of(this.spec, t, 0, t.doc.length),
            n = [];
          while (!i.next().done) {
            if (n.length >= e) return null;
            n.push(i.value);
          }
          return n;
        }
        highlight(t, e, i, n) {
          let s = Of(
            this.spec,
            t,
            Math.max(0, e - 250),
            Math.min(i + 250, t.doc.length),
          );
          while (!s.next().done) n(s.value.from, s.value.to);
        }
      }
      const Bf = gt.define(),
        Lf = gt.define(),
        Nf = J.define({
          create(t) {
            return new Pf(Uf(t).create(), null);
          },
          update(t, e) {
            for (let i of e.effects)
              i.is(Bf)
                ? (t = new Pf(i.value.create(), t.panel))
                : i.is(Lf) && (t = new Pf(t.query, i.value ? $f : null));
            return t;
          },
          provide: (t) => dl.from(t, (t) => t.panel),
        });
      class Pf {
        constructor(t, e) {
          (this.query = t), (this.panel = e);
        }
      }
      const If = xi.mark({ class: 'cm-searchMatch' }),
        Hf = xi.mark({ class: 'cm-searchMatch cm-searchMatch-selected' }),
        Wf = Gi.fromClass(
          class {
            constructor(t) {
              (this.view = t),
                (this.decorations = this.highlight(t.state.field(Nf)));
            }
            update(t) {
              let e = t.state.field(Nf);
              (e != t.startState.field(Nf) ||
                t.docChanged ||
                t.selectionSet ||
                t.viewportChanged) &&
                (this.decorations = this.highlight(e));
            }
            highlight({ query: t, panel: e }) {
              if (!e || !t.spec.valid) return xi.none;
              let { view: i } = this,
                n = new Vt();
              for (let s = 0, r = i.visibleRanges, o = r.length; s < o; s++) {
                let { from: e, to: l } = r[s];
                while (s < o - 1 && l > r[s + 1].from - 500) l = r[++s].to;
                t.highlight(i.state, e, l, (t, e) => {
                  let s = i.state.selection.ranges.some(
                    (i) => i.from == t && i.to == e,
                  );
                  n.add(t, e, s ? Hf : If);
                });
              }
              return n.finish();
            }
          },
          { decorations: (t) => t.decorations },
        );
      function Vf(t) {
        return (e) => {
          let i = e.state.field(Nf, !1);
          return i && i.query.spec.valid ? t(e, i) : Yf(e);
        };
      }
      const zf = Vf((t, { query: e }) => {
          let { to: i } = t.state.selection.main,
            n = e.nextMatch(t.state, i, i);
          if (!n) return !1;
          let s = V.single(n.from, n.to),
            r = t.state.facet(xf);
          return (
            t.dispatch({
              selection: s,
              effects: [np(t, n), r.scrollToMatch(s.main, t)],
              userEvent: 'select.search',
            }),
            Jf(t),
            !0
          );
        }),
        Ff = Vf((t, { query: e }) => {
          let { state: i } = t,
            { from: n } = i.selection.main,
            s = e.prevMatch(i, n, n);
          if (!s) return !1;
          let r = V.single(s.from, s.to),
            o = t.state.facet(xf);
          return (
            t.dispatch({
              selection: r,
              effects: [np(t, s), o.scrollToMatch(r.main, t)],
              userEvent: 'select.search',
            }),
            Jf(t),
            !0
          );
        }),
        qf = Vf((t, { query: e }) => {
          let i = e.matchAll(t.state, 1e3);
          return (
            !(!i || !i.length) &&
            (t.dispatch({
              selection: V.create(i.map((t) => V.range(t.from, t.to))),
              userEvent: 'select.search.matches',
            }),
            !0)
          );
        }),
        jf = ({ state: t, dispatch: e }) => {
          let i = t.selection;
          if (i.ranges.length > 1 || i.main.empty) return !1;
          let { from: n, to: s } = i.main,
            r = [],
            o = 0;
          for (let l = new Gd(t.doc, t.sliceDoc(n, s)); !l.next().done; ) {
            if (r.length > 1e3) return !1;
            l.value.from == n && (o = r.length),
              r.push(V.range(l.value.from, l.value.to));
          }
          return (
            e(
              t.update({
                selection: V.create(r, o),
                userEvent: 'select.search.matches',
              }),
            ),
            !0
          );
        },
        _f = Vf((t, { query: e }) => {
          let { state: i } = t,
            { from: n, to: s } = i.selection.main;
          if (i.readOnly) return !1;
          let r = e.nextMatch(i, n, n);
          if (!r) return !1;
          let o,
            l,
            a = [],
            h = [];
          if (
            (r.from == n &&
              r.to == s &&
              ((l = i.toText(e.getReplacement(r))),
              a.push({ from: r.from, to: r.to, insert: l }),
              (r = e.nextMatch(i, r.from, r.to)),
              h.push(
                Or.announce.of(
                  i.phrase('replaced match on line $', i.doc.lineAt(n).number) +
                    '.',
                ),
              )),
            r)
          ) {
            let e =
              0 == a.length || a[0].from >= r.to ? 0 : r.to - r.from - l.length;
            (o = V.single(r.from - e, r.to - e)),
              h.push(np(t, r)),
              h.push(i.facet(xf).scrollToMatch(o.main, t));
          }
          return (
            t.dispatch({
              changes: a,
              selection: o,
              effects: h,
              userEvent: 'input.replace',
            }),
            !0
          );
        }),
        Kf = Vf((t, { query: e }) => {
          if (t.state.readOnly) return !1;
          let i = e.matchAll(t.state, 1e9).map((t) => {
            let { from: i, to: n } = t;
            return { from: i, to: n, insert: e.getReplacement(t) };
          });
          if (!i.length) return !1;
          let n = t.state.phrase('replaced $ matches', i.length) + '.';
          return (
            t.dispatch({
              changes: i,
              effects: Or.announce.of(n),
              userEvent: 'input.replace.all',
            }),
            !0
          );
        });
      function $f(t) {
        return t.state.facet(xf).createPanel(t);
      }
      function Uf(t, e) {
        var i, n, s, r;
        let o = t.selection.main,
          l = o.empty || o.to > o.from + 100 ? '' : t.sliceDoc(o.from, o.to);
        if (e && !l) return e;
        let a = t.facet(xf);
        return new kf({
          search: (
            null !== (i = null === e || void 0 === e ? void 0 : e.literal) &&
            void 0 !== i
              ? i
              : a.literal
          )
            ? l
            : l.replace(/\n/g, '\\n'),
          caseSensitive:
            null !==
              (n = null === e || void 0 === e ? void 0 : e.caseSensitive) &&
            void 0 !== n
              ? n
              : a.caseSensitive,
          literal:
            null !== (s = null === e || void 0 === e ? void 0 : e.literal) &&
            void 0 !== s
              ? s
              : a.literal,
          wholeWord:
            null !== (r = null === e || void 0 === e ? void 0 : e.wholeWord) &&
            void 0 !== r
              ? r
              : a.wholeWord,
        });
      }
      function Gf(t) {
        let e = al(t, $f);
        return e && e.dom.querySelector('[main-field]');
      }
      function Jf(t) {
        let e = Gf(t);
        e && e == t.root.activeElement && e.select();
      }
      const Yf = (t) => {
          let e = t.state.field(Nf, !1);
          if (e && e.panel) {
            let i = Gf(t);
            if (i && i != t.root.activeElement) {
              let n = Uf(t.state, e.query.spec);
              n.valid && t.dispatch({ effects: Bf.of(n) }),
                i.focus(),
                i.select();
            }
          } else
            t.dispatch({
              effects: [
                Lf.of(!0),
                e ? Bf.of(Uf(t.state, e.query.spec)) : gt.appendConfig.of(rp),
              ],
            });
          return !0;
        },
        Xf = (t) => {
          let e = t.state.field(Nf, !1);
          if (!e || !e.panel) return !1;
          let i = al(t, $f);
          return (
            i && i.dom.contains(t.root.activeElement) && t.focus(),
            t.dispatch({ effects: Lf.of(!1) }),
            !0
          );
        },
        Zf = [
          { key: 'Mod-f', run: Yf, scope: 'editor search-panel' },
          {
            key: 'F3',
            run: zf,
            shift: Ff,
            scope: 'editor search-panel',
            preventDefault: !0,
          },
          {
            key: 'Mod-g',
            run: zf,
            shift: Ff,
            scope: 'editor search-panel',
            preventDefault: !0,
          },
          { key: 'Escape', run: Xf, scope: 'editor search-panel' },
          { key: 'Mod-Shift-l', run: jf },
          { key: 'Alt-g', run: lf },
          { key: 'Mod-d', run: bf, preventDefault: !0 },
        ];
      class Qf {
        constructor(t) {
          this.view = t;
          let e = (this.query = t.state.field(Nf).query.spec);
          function i(t, e, i) {
            return Kd(
              'button',
              { class: 'cm-button', name: t, onclick: e, type: 'button' },
              i,
            );
          }
          (this.commit = this.commit.bind(this)),
            (this.searchField = Kd('input', {
              value: e.search,
              placeholder: tp(t, 'Find'),
              'aria-label': tp(t, 'Find'),
              class: 'cm-textfield',
              name: 'search',
              form: '',
              'main-field': 'true',
              onchange: this.commit,
              onkeyup: this.commit,
            })),
            (this.replaceField = Kd('input', {
              value: e.replace,
              placeholder: tp(t, 'Replace'),
              'aria-label': tp(t, 'Replace'),
              class: 'cm-textfield',
              name: 'replace',
              form: '',
              onchange: this.commit,
              onkeyup: this.commit,
            })),
            (this.caseField = Kd('input', {
              type: 'checkbox',
              name: 'case',
              form: '',
              checked: e.caseSensitive,
              onchange: this.commit,
            })),
            (this.reField = Kd('input', {
              type: 'checkbox',
              name: 're',
              form: '',
              checked: e.regexp,
              onchange: this.commit,
            })),
            (this.wordField = Kd('input', {
              type: 'checkbox',
              name: 'word',
              form: '',
              checked: e.wholeWord,
              onchange: this.commit,
            })),
            (this.dom = Kd(
              'div',
              { onkeydown: (t) => this.keydown(t), class: 'cm-search' },
              [
                this.searchField,
                i('next', () => zf(t), [tp(t, 'next')]),
                i('prev', () => Ff(t), [tp(t, 'previous')]),
                i('select', () => qf(t), [tp(t, 'all')]),
                Kd('label', null, [this.caseField, tp(t, 'match case')]),
                Kd('label', null, [this.reField, tp(t, 'regexp')]),
                Kd('label', null, [this.wordField, tp(t, 'by word')]),
                ...(t.state.readOnly
                  ? []
                  : [
                      Kd('br'),
                      this.replaceField,
                      i('replace', () => _f(t), [tp(t, 'replace')]),
                      i('replaceAll', () => Kf(t), [tp(t, 'replace all')]),
                    ]),
                Kd(
                  'button',
                  {
                    name: 'close',
                    onclick: () => Xf(t),
                    'aria-label': tp(t, 'close'),
                    type: 'button',
                  },
                  ['\xd7'],
                ),
              ],
            ));
        }
        commit() {
          let t = new kf({
            search: this.searchField.value,
            caseSensitive: this.caseField.checked,
            regexp: this.reField.checked,
            wholeWord: this.wordField.checked,
            replace: this.replaceField.value,
          });
          t.eq(this.query) ||
            ((this.query = t), this.view.dispatch({ effects: Bf.of(t) }));
        }
        keydown(t) {
          Vr(this.view, t, 'search-panel')
            ? t.preventDefault()
            : 13 == t.keyCode && t.target == this.searchField
            ? (t.preventDefault(), (t.shiftKey ? Ff : zf)(this.view))
            : 13 == t.keyCode &&
              t.target == this.replaceField &&
              (t.preventDefault(), _f(this.view));
        }
        update(t) {
          for (let e of t.transactions)
            for (let t of e.effects)
              t.is(Bf) && !t.value.eq(this.query) && this.setQuery(t.value);
        }
        setQuery(t) {
          (this.query = t),
            (this.searchField.value = t.search),
            (this.replaceField.value = t.replace),
            (this.caseField.checked = t.caseSensitive),
            (this.reField.checked = t.regexp),
            (this.wordField.checked = t.wholeWord);
        }
        mount() {
          this.searchField.select();
        }
        get pos() {
          return 80;
        }
        get top() {
          return this.view.state.facet(xf).top;
        }
      }
      function tp(t, e) {
        return t.state.phrase(e);
      }
      const ep = 30,
        ip = /[\s\.,:;?!]/;
      function np(t, { from: e, to: i }) {
        let n = t.state.doc.lineAt(e),
          s = t.state.doc.lineAt(i).to,
          r = Math.max(n.from, e - ep),
          o = Math.min(s, i + ep),
          l = t.state.sliceDoc(r, o);
        if (r != n.from)
          for (let a = 0; a < ep; a++)
            if (!ip.test(l[a + 1]) && ip.test(l[a])) {
              l = l.slice(a);
              break;
            }
        if (o != s)
          for (let a = l.length - 1; a > l.length - ep; a--)
            if (!ip.test(l[a - 1]) && ip.test(l[a])) {
              l = l.slice(0, a);
              break;
            }
        return Or.announce.of(
          `${t.state.phrase('current match')}. ${l} ${t.state.phrase(
            'on line',
          )} ${n.number}.`,
        );
      }
      const sp = Or.baseTheme({
          '.cm-panel.cm-search': {
            padding: '2px 6px 4px',
            position: 'relative',
            '& [name=close]': {
              position: 'absolute',
              top: '0',
              right: '4px',
              backgroundColor: 'inherit',
              border: 'none',
              font: 'inherit',
              padding: 0,
              margin: 0,
            },
            '& input, & button, & label': { margin: '.2em .6em .2em 0' },
            '& input[type=checkbox]': { marginRight: '.2em' },
            '& label': { fontSize: '80%', whiteSpace: 'pre' },
          },
          '&light .cm-searchMatch': { backgroundColor: '#ffff0054' },
          '&dark .cm-searchMatch': { backgroundColor: '#00ffff8a' },
          '&light .cm-searchMatch-selected': { backgroundColor: '#ff6a0054' },
          '&dark .cm-searchMatch-selected': { backgroundColor: '#ff00ff8a' },
        }),
        rp = [Nf, Z.lowest(Wf), sp];
      class op {
        constructor(t, e, i) {
          (this.state = t),
            (this.pos = e),
            (this.explicit = i),
            (this.abortListeners = []);
        }
        tokenBefore(t) {
          let e = Ua(this.state).resolveInner(this.pos, -1);
          while (e && t.indexOf(e.name) < 0) e = e.parent;
          return e
            ? {
                from: e.from,
                to: this.pos,
                text: this.state.sliceDoc(e.from, this.pos),
                type: e.type,
              }
            : null;
        }
        matchBefore(t) {
          let e = this.state.doc.lineAt(this.pos),
            i = Math.max(e.from, this.pos - 250),
            n = e.text.slice(i - e.from, this.pos - e.from),
            s = n.search(dp(t, !1));
          return s < 0 ? null : { from: i + s, to: this.pos, text: n.slice(s) };
        }
        get aborted() {
          return null == this.abortListeners;
        }
        addEventListener(t, e) {
          'abort' == t && this.abortListeners && this.abortListeners.push(e);
        }
      }
      function lp(t) {
        let e = Object.keys(t).join(''),
          i = /\w/.test(e);
        return (
          i && (e = e.replace(/\w/g, '')),
          `[${i ? '\\w' : ''}${e.replace(/[^\w\s]/g, '\\$&')}]`
        );
      }
      function ap(t) {
        let e = Object.create(null),
          i = Object.create(null);
        for (let { label: s } of t) {
          e[s[0]] = !0;
          for (let t = 1; t < s.length; t++) i[s[t]] = !0;
        }
        let n = lp(e) + lp(i) + '*$';
        return [new RegExp('^' + n), new RegExp(n)];
      }
      function hp(t) {
        let e = t.map((t) => ('string' == typeof t ? { label: t } : t)),
          [i, n] = e.every((t) => /^\w+$/.test(t.label))
            ? [/\w*$/, /\w+$/]
            : ap(e);
        return (t) => {
          let s = t.matchBefore(n);
          return s || t.explicit
            ? { from: s ? s.from : t.pos, options: e, validFor: i }
            : null;
        };
      }
      class cp {
        constructor(t, e, i, n) {
          (this.completion = t),
            (this.source = e),
            (this.match = i),
            (this.score = n);
        }
      }
      function up(t) {
        return t.selection.main.from;
      }
      function dp(t, e) {
        var i;
        let { source: n } = t,
          s = e && '^' != n[0],
          r = '$' != n[n.length - 1];
        return s || r
          ? new RegExp(
              `${s ? '^' : ''}(?:${n})${r ? '$' : ''}`,
              null !== (i = t.flags) && void 0 !== i
                ? i
                : t.ignoreCase
                ? 'i'
                : '',
            )
          : t;
      }
      const fp = ft.define();
      function pp(t, e, i, n) {
        let { main: s } = t.selection,
          r = i - s.from,
          o = n - s.from;
        return Object.assign(
          Object.assign(
            {},
            t.changeByRange((l) =>
              l != s &&
              i != n &&
              t.sliceDoc(l.from + r, l.from + o) != t.sliceDoc(i, n)
                ? { range: l }
                : {
                    changes: {
                      from: l.from + r,
                      to: n == s.from ? l.to : l.from + o,
                      insert: e,
                    },
                    range: V.cursor(l.from + r + e.length),
                  },
            ),
          ),
          { userEvent: 'input.complete' },
        );
      }
      const mp = new WeakMap();
      function gp(t) {
        if (!Array.isArray(t)) return t;
        let e = mp.get(t);
        return e || mp.set(t, (e = hp(t))), e;
      }
      const vp = gt.define(),
        wp = gt.define();
      class yp {
        constructor(t) {
          (this.pattern = t),
            (this.chars = []),
            (this.folded = []),
            (this.any = []),
            (this.precise = []),
            (this.byWord = []);
          for (let e = 0; e < t.length; ) {
            let i = M(t, e),
              n = O(i);
            this.chars.push(i);
            let s = t.slice(e, e + n),
              r = s.toUpperCase();
            this.folded.push(M(r == s ? s.toLowerCase() : r, 0)), (e += n);
          }
          this.astral = t.length != this.chars.length;
        }
        match(t) {
          if (0 == this.pattern.length) return [0];
          if (t.length < this.pattern.length) return null;
          let { chars: e, folded: i, any: n, precise: s, byWord: r } = this;
          if (1 == e.length) {
            let n = M(t, 0),
              s = O(n),
              r = s == t.length ? 0 : -100;
            if (n == e[0]);
            else {
              if (n != i[0]) return null;
              r += -200;
            }
            return [r, 0, s];
          }
          let o = t.indexOf(this.pattern);
          if (0 == o)
            return [
              t.length == this.pattern.length ? 0 : -100,
              0,
              this.pattern.length,
            ];
          let l = e.length,
            a = 0;
          if (o < 0) {
            for (let s = 0, r = Math.min(t.length, 200); s < r && a < l; ) {
              let r = M(t, s);
              (r != e[a] && r != i[a]) || (n[a++] = s), (s += O(r));
            }
            if (a < l) return null;
          }
          let h = 0,
            c = 0,
            u = !1,
            d = 0,
            f = -1,
            p = -1,
            m = /[a-z]/.test(t),
            g = !0;
          for (
            let v = 0, w = Math.min(t.length, 200), y = 0;
            v < w && c < l;

          ) {
            let n = M(t, v);
            o < 0 &&
              (h < l && n == e[h] && (s[h++] = v),
              d < l &&
                (n == e[d] || n == i[d]
                  ? (0 == d && (f = v), (p = v + 1), d++)
                  : (d = 0)));
            let a,
              w =
                n < 255
                  ? (n >= 48 && n <= 57) || (n >= 97 && n <= 122)
                    ? 2
                    : n >= 65 && n <= 90
                    ? 1
                    : 0
                  : (a = A(n)) != a.toLowerCase()
                  ? 1
                  : a != a.toUpperCase()
                  ? 2
                  : 0;
            (!v || (1 == w && m) || (0 == y && 0 != w)) &&
              (e[c] == n || (i[c] == n && (u = !0))
                ? (r[c++] = v)
                : r.length && (g = !1)),
              (y = w),
              (v += O(n));
          }
          return c == l && 0 == r[0] && g
            ? this.result((u ? -200 : 0) - 100, r, t)
            : d == l && 0 == f
            ? [-200 - t.length + (p == t.length ? 0 : -100), 0, p]
            : o > -1
            ? [-700 - t.length, o, o + this.pattern.length]
            : d == l
            ? [-900 - t.length, f, p]
            : c == l
            ? this.result((u ? -200 : 0) - 100 - 700 + (g ? 0 : -1100), r, t)
            : 2 == e.length
            ? null
            : this.result((n[0] ? -700 : 0) - 200 - 1100, n, t);
        }
        result(t, e, i) {
          let n = [t - i.length],
            s = 1;
          for (let r of e) {
            let t = r + (this.astral ? O(M(i, r)) : 1);
            s > 1 && n[s - 1] == r
              ? (n[s - 1] = t)
              : ((n[s++] = r), (n[s++] = t));
          }
          return n;
        }
      }
      const bp = q.define({
        combine(t) {
          return Bt(
            t,
            {
              activateOnTyping: !0,
              selectOnOpen: !0,
              override: null,
              closeOnBlur: !0,
              maxRenderedOptions: 100,
              defaultKeymap: !0,
              tooltipClass: () => '',
              optionClass: () => '',
              aboveCursor: !1,
              icons: !0,
              addToOptions: [],
              positionInfo: kp,
              compareCompletions: (t, e) => t.label.localeCompare(e.label),
              interactionDelay: 75,
            },
            {
              defaultKeymap: (t, e) => t && e,
              closeOnBlur: (t, e) => t && e,
              icons: (t, e) => t && e,
              tooltipClass: (t, e) => (i) => xp(t(i), e(i)),
              optionClass: (t, e) => (i) => xp(t(i), e(i)),
              addToOptions: (t, e) => t.concat(e),
            },
          );
        },
      });
      function xp(t, e) {
        return t ? (e ? t + ' ' + e : t) : e;
      }
      function kp(t, e, i, n, s) {
        let r,
          o,
          l = t.textDirection == rn.RTL,
          a = l,
          h = !1,
          c = 'top',
          u = e.left - s.left,
          d = s.right - e.right,
          f = n.right - n.left,
          p = n.bottom - n.top;
        if (
          (a && u < Math.min(f, d)
            ? (a = !1)
            : !a && d < Math.min(f, u) && (a = !0),
          f <= (a ? u : d))
        )
          (r = Math.max(s.top, Math.min(i.top, s.bottom - p)) - e.top),
            (o = Math.min(400, a ? u : d));
        else {
          (h = !0), (o = Math.min(400, (l ? e.right : s.right - e.left) - 30));
          let t = s.bottom - e.bottom;
          t >= p || t > e.top
            ? (r = i.bottom - e.top)
            : ((c = 'bottom'), (r = e.bottom - i.top));
        }
        return {
          style: `${c}: ${r}px; max-width: ${o}px`,
          class:
            'cm-completionInfo-' +
            (h ? (l ? 'left-narrow' : 'right-narrow') : a ? 'left' : 'right'),
        };
      }
      function Sp(t, e = 'option') {
        return (i) => {
          let n = i.state.field(Zp, !1);
          if (
            !n ||
            !n.open ||
            n.open.disabled ||
            Date.now() - n.open.timestamp < i.state.facet(bp).interactionDelay
          )
            return !1;
          let s,
            r = 1;
          'page' == e &&
            (s = rl(i, n.open.tooltip)) &&
            (r = Math.max(
              2,
              Math.floor(
                s.dom.offsetHeight / s.dom.querySelector('li').offsetHeight,
              ) - 1,
            ));
          let { length: o } = n.open.options,
            l =
              n.open.selected > -1
                ? n.open.selected + r * (t ? 1 : -1)
                : t
                ? 0
                : o - 1;
          return (
            l < 0
              ? (l = 'page' == e ? 0 : o - 1)
              : l >= o && (l = 'page' == e ? o - 1 : 0),
            i.dispatch({ effects: Xp.of(l) }),
            !0
          );
        };
      }
      const Cp = (t) => {
          let e = t.state.field(Zp, !1);
          return (
            !(
              t.state.readOnly ||
              !e ||
              !e.open ||
              e.open.selected < 0 ||
              Date.now() - e.open.timestamp < t.state.facet(bp).interactionDelay
            ) &&
            (!!e.open.disabled || Bp(t, e.open.options[e.open.selected]))
          );
        },
        Mp = (t) => {
          let e = t.state.field(Zp, !1);
          return !!e && (t.dispatch({ effects: vp.of(!0) }), !0);
        },
        Ap = (t) => {
          let e = t.state.field(Zp, !1);
          return (
            !(!e || !e.active.some((t) => 0 != t.state)) &&
            (t.dispatch({ effects: wp.of(null) }), !0)
          );
        };
      class Op {
        constructor(t, e) {
          (this.active = t),
            (this.context = e),
            (this.time = Date.now()),
            (this.updates = []),
            (this.done = void 0);
        }
      }
      const Dp = 50,
        Tp = 50,
        Ep = 1e3,
        Rp = Gi.fromClass(
          class {
            constructor(t) {
              (this.view = t),
                (this.debounceUpdate = -1),
                (this.running = []),
                (this.debounceAccept = -1),
                (this.composing = 0);
              for (let e of t.state.field(Zp).active)
                1 == e.state && this.startQuery(e);
            }
            update(t) {
              let e = t.state.field(Zp);
              if (
                !t.selectionSet &&
                !t.docChanged &&
                t.startState.field(Zp) == e
              )
                return;
              let i = t.transactions.some(
                (t) => (t.selection || t.docChanged) && !$p(t),
              );
              for (let s = 0; s < this.running.length; s++) {
                let e = this.running[s];
                if (
                  i ||
                  (e.updates.length + t.transactions.length > Tp &&
                    Date.now() - e.time > Ep)
                ) {
                  for (let t of e.context.abortListeners)
                    try {
                      t();
                    } catch (n) {
                      _i(this.view.state, n);
                    }
                  (e.context.abortListeners = null),
                    this.running.splice(s--, 1);
                } else e.updates.push(...t.transactions);
              }
              if (
                (this.debounceUpdate > -1 && clearTimeout(this.debounceUpdate),
                (this.debounceUpdate = e.active.some(
                  (t) =>
                    1 == t.state &&
                    !this.running.some((e) => e.active.source == t.source),
                )
                  ? setTimeout(() => this.startUpdate(), Dp)
                  : -1),
                0 != this.composing)
              )
                for (let s of t.transactions)
                  'input' == $p(s)
                    ? (this.composing = 2)
                    : 2 == this.composing &&
                      s.selection &&
                      (this.composing = 3);
            }
            startUpdate() {
              this.debounceUpdate = -1;
              let { state: t } = this.view,
                e = t.field(Zp);
              for (let i of e.active)
                1 != i.state ||
                  this.running.some((t) => t.active.source == i.source) ||
                  this.startQuery(i);
            }
            startQuery(t) {
              let { state: e } = this.view,
                i = up(e),
                n = new op(e, i, t.explicitPos == i),
                s = new Op(t, n);
              this.running.push(s),
                Promise.resolve(t.source(n)).then(
                  (t) => {
                    s.context.aborted ||
                      ((s.done = t || null), this.scheduleAccept());
                  },
                  (t) => {
                    this.view.dispatch({ effects: wp.of(null) }),
                      _i(this.view.state, t);
                  },
                );
            }
            scheduleAccept() {
              this.running.every((t) => void 0 !== t.done)
                ? this.accept()
                : this.debounceAccept < 0 &&
                  (this.debounceAccept = setTimeout(() => this.accept(), Dp));
            }
            accept() {
              var t;
              this.debounceAccept > -1 && clearTimeout(this.debounceAccept),
                (this.debounceAccept = -1);
              let e = [],
                i = this.view.state.facet(bp);
              for (let n = 0; n < this.running.length; n++) {
                let s = this.running[n];
                if (void 0 === s.done) continue;
                if ((this.running.splice(n--, 1), s.done)) {
                  let n = new Gp(
                    s.active.source,
                    s.active.explicitPos,
                    s.done,
                    s.done.from,
                    null !== (t = s.done.to) && void 0 !== t
                      ? t
                      : up(
                          s.updates.length
                            ? s.updates[0].startState
                            : this.view.state,
                        ),
                  );
                  for (let t of s.updates) n = n.update(t, i);
                  if (n.hasResult()) {
                    e.push(n);
                    continue;
                  }
                }
                let r = this.view.state
                  .field(Zp)
                  .active.find((t) => t.source == s.active.source);
                if (r && 1 == r.state)
                  if (null == s.done) {
                    let t = new Up(s.active.source, 0);
                    for (let e of s.updates) t = t.update(e, i);
                    1 != t.state && e.push(t);
                  } else this.startQuery(r);
              }
              e.length && this.view.dispatch({ effects: Yp.of(e) });
            }
          },
          {
            eventHandlers: {
              blur(t) {
                let e = this.view.state.field(Zp, !1);
                if (e && e.tooltip && this.view.state.facet(bp).closeOnBlur) {
                  let i = e.open && rl(this.view, e.open.tooltip);
                  (i && i.dom.contains(t.relatedTarget)) ||
                    this.view.dispatch({ effects: wp.of(null) });
                }
              },
              compositionstart() {
                this.composing = 1;
              },
              compositionend() {
                3 == this.composing &&
                  setTimeout(
                    () => this.view.dispatch({ effects: vp.of(!1) }),
                    20,
                  ),
                  (this.composing = 0);
              },
            },
          },
        );
      function Bp(t, e) {
        const i = e.completion.apply || e.completion.label;
        let n = t.state.field(Zp).active.find((t) => t.source == e.source);
        return (
          n instanceof Gp &&
          ('string' == typeof i
            ? t.dispatch(
                Object.assign(Object.assign({}, pp(t.state, i, n.from, n.to)), {
                  annotations: fp.of(e.completion),
                }),
              )
            : i(t, e.completion, n.from, n.to),
          !0)
        );
      }
      function Lp(t) {
        let e = t.addToOptions.slice();
        return (
          t.icons &&
            e.push({
              render(t) {
                let e = document.createElement('div');
                return (
                  e.classList.add('cm-completionIcon'),
                  t.type &&
                    e.classList.add(
                      ...t.type
                        .split(/\s+/g)
                        .map((t) => 'cm-completionIcon-' + t),
                    ),
                  e.setAttribute('aria-hidden', 'true'),
                  e
                );
              },
              position: 20,
            }),
          e.push(
            {
              render(t, e, i) {
                let n = document.createElement('span');
                n.className = 'cm-completionLabel';
                let { label: s } = t,
                  r = 0;
                for (let o = 1; o < i.length; ) {
                  let t = i[o++],
                    e = i[o++];
                  t > r &&
                    n.appendChild(document.createTextNode(s.slice(r, t)));
                  let l = n.appendChild(document.createElement('span'));
                  l.appendChild(document.createTextNode(s.slice(t, e))),
                    (l.className = 'cm-completionMatchedText'),
                    (r = e);
                }
                return (
                  r < s.length &&
                    n.appendChild(document.createTextNode(s.slice(r))),
                  n
                );
              },
              position: 50,
            },
            {
              render(t) {
                if (!t.detail) return null;
                let e = document.createElement('span');
                return (
                  (e.className = 'cm-completionDetail'),
                  (e.textContent = t.detail),
                  e
                );
              },
              position: 80,
            },
          ),
          e.sort((t, e) => t.position - e.position).map((t) => t.render)
        );
      }
      function Np(t, e, i) {
        if (t <= i) return { from: 0, to: t };
        if ((e < 0 && (e = 0), e <= t >> 1)) {
          let t = Math.floor(e / i);
          return { from: t * i, to: (t + 1) * i };
        }
        let n = Math.floor((t - e) / i);
        return { from: t - (n + 1) * i, to: t - n * i };
      }
      class Pp {
        constructor(t, e) {
          (this.view = t),
            (this.stateField = e),
            (this.info = null),
            (this.placeInfoReq = {
              read: () => this.measureInfo(),
              write: (t) => this.placeInfo(t),
              key: this,
            }),
            (this.space = null),
            (this.currentClass = '');
          let i = t.state.field(e),
            { options: n, selected: s } = i.open,
            r = t.state.facet(bp);
          (this.optionContent = Lp(r)),
            (this.optionClass = r.optionClass),
            (this.tooltipClass = r.tooltipClass),
            (this.range = Np(n.length, s, r.maxRenderedOptions)),
            (this.dom = document.createElement('div')),
            (this.dom.className = 'cm-tooltip-autocomplete'),
            this.updateTooltipClass(t.state),
            this.dom.addEventListener('mousedown', (e) => {
              for (let i, s = e.target; s && s != this.dom; s = s.parentNode)
                if (
                  'LI' == s.nodeName &&
                  (i = /-(\d+)$/.exec(s.id)) &&
                  +i[1] < n.length
                )
                  return Bp(t, n[+i[1]]), void e.preventDefault();
            }),
            this.dom.addEventListener('focusout', (e) => {
              let i = t.state.field(this.stateField, !1);
              i &&
                i.tooltip &&
                t.state.facet(bp).closeOnBlur &&
                e.relatedTarget != t.contentDOM &&
                t.dispatch({ effects: wp.of(null) });
            }),
            (this.list = this.dom.appendChild(
              this.createListBox(n, i.id, this.range),
            )),
            this.list.addEventListener('scroll', () => {
              this.info && this.view.requestMeasure(this.placeInfoReq);
            });
        }
        mount() {
          this.updateSel();
        }
        update(t) {
          var e, i, n;
          let s = t.state.field(this.stateField),
            r = t.startState.field(this.stateField);
          this.updateTooltipClass(t.state),
            s != r &&
              (this.updateSel(),
              (null === (e = s.open) || void 0 === e ? void 0 : e.disabled) !=
                (null === (i = r.open) || void 0 === i ? void 0 : i.disabled) &&
                this.dom.classList.toggle(
                  'cm-tooltip-autocomplete-disabled',
                  !!(null === (n = s.open) || void 0 === n
                    ? void 0
                    : n.disabled),
                ));
        }
        updateTooltipClass(t) {
          let e = this.tooltipClass(t);
          if (e != this.currentClass) {
            for (let t of this.currentClass.split(' '))
              t && this.dom.classList.remove(t);
            for (let t of e.split(' ')) t && this.dom.classList.add(t);
            this.currentClass = e;
          }
        }
        positioned(t) {
          (this.space = t),
            this.info && this.view.requestMeasure(this.placeInfoReq);
        }
        updateSel() {
          let t = this.view.state.field(this.stateField),
            e = t.open;
          if (
            (((e.selected > -1 && e.selected < this.range.from) ||
              e.selected >= this.range.to) &&
              ((this.range = Np(
                e.options.length,
                e.selected,
                this.view.state.facet(bp).maxRenderedOptions,
              )),
              this.list.remove(),
              (this.list = this.dom.appendChild(
                this.createListBox(e.options, t.id, this.range),
              )),
              this.list.addEventListener('scroll', () => {
                this.info && this.view.requestMeasure(this.placeInfoReq);
              })),
            this.updateSelectedOption(e.selected))
          ) {
            this.info && (this.info.remove(), (this.info = null));
            let { completion: i } = e.options[e.selected],
              { info: n } = i;
            if (!n) return;
            let s = 'string' === typeof n ? document.createTextNode(n) : n(i);
            if (!s) return;
            'then' in s
              ? s
                  .then((e) => {
                    e &&
                      this.view.state.field(this.stateField, !1) == t &&
                      this.addInfoPane(e);
                  })
                  .catch((t) => _i(this.view.state, t, 'completion info'))
              : this.addInfoPane(s);
          }
        }
        addInfoPane(t) {
          let e = (this.info = document.createElement('div'));
          (e.className = 'cm-tooltip cm-completionInfo'),
            e.appendChild(t),
            this.dom.appendChild(e),
            this.view.requestMeasure(this.placeInfoReq);
        }
        updateSelectedOption(t) {
          let e = null;
          for (
            let i = this.list.firstChild, n = this.range.from;
            i;
            i = i.nextSibling, n++
          )
            'LI' == i.nodeName && i.id
              ? n == t
                ? i.hasAttribute('aria-selected') ||
                  (i.setAttribute('aria-selected', 'true'), (e = i))
                : i.hasAttribute('aria-selected') &&
                  i.removeAttribute('aria-selected')
              : n--;
          return e && Hp(this.list, e), e;
        }
        measureInfo() {
          let t = this.dom.querySelector('[aria-selected]');
          if (!t || !this.info) return null;
          let e = this.dom.getBoundingClientRect(),
            i = this.info.getBoundingClientRect(),
            n = t.getBoundingClientRect(),
            s = this.space;
          if (!s) {
            let t = this.dom.ownerDocument.defaultView || window;
            s = { left: 0, top: 0, right: t.innerWidth, bottom: t.innerHeight };
          }
          return n.top > Math.min(s.bottom, e.bottom) - 10 ||
            n.bottom < Math.max(s.top, e.top) + 10
            ? null
            : this.view.state.facet(bp).positionInfo(this.view, e, n, i, s);
        }
        placeInfo(t) {
          this.info &&
            (t
              ? (t.style && (this.info.style.cssText = t.style),
                (this.info.className =
                  'cm-tooltip cm-completionInfo ' + (t.class || '')))
              : (this.info.style.cssText = 'top: -1e6px'));
        }
        createListBox(t, e, i) {
          const n = document.createElement('ul');
          (n.id = e),
            n.setAttribute('role', 'listbox'),
            n.setAttribute('aria-expanded', 'true'),
            n.setAttribute('aria-label', this.view.state.phrase('Completions'));
          let s = null;
          for (let r = i.from; r < i.to; r++) {
            let { completion: o, match: l } = t[r],
              { section: a } = o;
            if (a) {
              let t = 'string' == typeof a ? a : a.name;
              if (t != s && (r > i.from || 0 == i.from))
                if (((s = t), 'string' != typeof a && a.header))
                  n.appendChild(a.header(a));
                else {
                  let e = n.appendChild(
                    document.createElement('completion-section'),
                  );
                  e.textContent = t;
                }
            }
            const h = n.appendChild(document.createElement('li'));
            (h.id = e + '-' + r), h.setAttribute('role', 'option');
            let c = this.optionClass(o);
            c && (h.className = c);
            for (let t of this.optionContent) {
              let e = t(o, this.view.state, l);
              e && h.appendChild(e);
            }
          }
          return (
            i.from && n.classList.add('cm-completionListIncompleteTop'),
            i.to < t.length &&
              n.classList.add('cm-completionListIncompleteBottom'),
            n
          );
        }
      }
      function Ip(t) {
        return (e) => new Pp(e, t);
      }
      function Hp(t, e) {
        let i = t.getBoundingClientRect(),
          n = e.getBoundingClientRect();
        n.top < i.top
          ? (t.scrollTop -= i.top - n.top)
          : n.bottom > i.bottom && (t.scrollTop += n.bottom - i.bottom);
      }
      function Wp(t) {
        return (
          100 * (t.boost || 0) +
          (t.apply ? 10 : 0) +
          (t.info ? 5 : 0) +
          (t.type ? 1 : 0)
        );
      }
      function Vp(t, e) {
        let i = [],
          n = null,
          s = (t) => {
            i.push(t);
            let { section: e } = t.completion;
            if (e) {
              n || (n = []);
              let t = 'string' == typeof e ? e : e.name;
              n.some((e) => e.name == t) ||
                n.push('string' == typeof e ? { name: t } : e);
            }
          };
        for (let a of t)
          if (a.hasResult())
            if (!1 === a.result.filter) {
              let t = a.result.getMatch;
              for (let e of a.result.options) {
                let n = [1e9 - i.length];
                if (t) for (let i of t(e)) n.push(i);
                s(new cp(e, a.source, n, n[0]));
              }
            } else {
              let t,
                i = new yp(e.sliceDoc(a.from, a.to));
              for (let e of a.result.options)
                (t = i.match(e.label)) &&
                  s(new cp(e, a.source, t, t[0] + (e.boost || 0)));
            }
        if (n) {
          let t = Object.create(null),
            e = 0,
            s = (t, e) => {
              var i, n;
              return (
                (null !== (i = t.rank) && void 0 !== i ? i : 1e9) -
                  (null !== (n = e.rank) && void 0 !== n ? n : 1e9) ||
                (t.name < e.name ? -1 : 1)
              );
            };
          for (let i of n.sort(s)) (e -= 1e5), (t[i.name] = e);
          for (let n of i) {
            let { section: e } = n.completion;
            e && (n.score += t['string' == typeof e ? e : e.name]);
          }
        }
        let r = [],
          o = null,
          l = e.facet(bp).compareCompletions;
        for (let a of i.sort(
          (t, e) => e.score - t.score || l(t.completion, e.completion),
        ))
          !o ||
          o.label != a.completion.label ||
          o.detail != a.completion.detail ||
          (null != o.type &&
            null != a.completion.type &&
            o.type != a.completion.type) ||
          o.apply != a.completion.apply
            ? r.push(a)
            : Wp(a.completion) > Wp(o) && (r[r.length - 1] = a),
            (o = a.completion);
        return r;
      }
      class zp {
        constructor(t, e, i, n, s, r) {
          (this.options = t),
            (this.attrs = e),
            (this.tooltip = i),
            (this.timestamp = n),
            (this.selected = s),
            (this.disabled = r);
        }
        setSelected(t, e) {
          return t == this.selected || t >= this.options.length
            ? this
            : new zp(
                this.options,
                _p(e, t),
                this.tooltip,
                this.timestamp,
                t,
                this.disabled,
              );
        }
        static build(t, e, i, n, s) {
          let r = Vp(t, e);
          if (!r.length)
            return n && t.some((t) => 1 == t.state)
              ? new zp(
                  n.options,
                  n.attrs,
                  n.tooltip,
                  n.timestamp,
                  n.selected,
                  !0,
                )
              : null;
          let o = e.facet(bp).selectOnOpen ? 0 : -1;
          if (n && n.selected != o && -1 != n.selected) {
            let t = n.options[n.selected].completion;
            for (let e = 0; e < r.length; e++)
              if (r[e].completion == t) {
                o = e;
                break;
              }
          }
          return new zp(
            r,
            _p(i, o),
            {
              pos: t.reduce(
                (t, e) => (e.hasResult() ? Math.min(t, e.from) : t),
                1e8,
              ),
              create: Ip(Zp),
              above: s.aboveCursor,
            },
            n ? n.timestamp : Date.now(),
            o,
            !1,
          );
        }
        map(t) {
          return new zp(
            this.options,
            this.attrs,
            Object.assign(Object.assign({}, this.tooltip), {
              pos: t.mapPos(this.tooltip.pos),
            }),
            this.timestamp,
            this.selected,
            this.disabled,
          );
        }
      }
      class Fp {
        constructor(t, e, i) {
          (this.active = t), (this.id = e), (this.open = i);
        }
        static start() {
          return new Fp(
            Kp,
            'cm-ac-' + Math.floor(2e6 * Math.random()).toString(36),
            null,
          );
        }
        update(t) {
          let { state: e } = t,
            i = e.facet(bp),
            n = i.override || e.languageDataAt('autocomplete', up(e)).map(gp),
            s = n.map((e) => {
              let n =
                this.active.find((t) => t.source == e) ||
                new Up(e, this.active.some((t) => 0 != t.state) ? 1 : 0);
              return n.update(t, i);
            });
          s.length == this.active.length &&
            s.every((t, e) => t == this.active[e]) &&
            (s = this.active);
          let r = this.open;
          r && t.docChanged && (r = r.map(t.changes)),
            t.selection ||
            s.some(
              (e) => e.hasResult() && t.changes.touchesRange(e.from, e.to),
            ) ||
            !qp(s, this.active)
              ? (r = zp.build(s, e, this.id, r, i))
              : r && r.disabled && !s.some((t) => 1 == t.state) && (r = null),
            !r &&
              s.every((t) => 1 != t.state) &&
              s.some((t) => t.hasResult()) &&
              (s = s.map((t) => (t.hasResult() ? new Up(t.source, 0) : t)));
          for (let o of t.effects)
            o.is(Xp) && (r = r && r.setSelected(o.value, this.id));
          return s == this.active && r == this.open
            ? this
            : new Fp(s, this.id, r);
        }
        get tooltip() {
          return this.open ? this.open.tooltip : null;
        }
        get attrs() {
          return this.open ? this.open.attrs : jp;
        }
      }
      function qp(t, e) {
        if (t == e) return !0;
        for (let i = 0, n = 0; ; ) {
          while (i < t.length && !t[i].hasResult) i++;
          while (n < e.length && !e[n].hasResult) n++;
          let s = i == t.length,
            r = n == e.length;
          if (s || r) return s == r;
          if (t[i++].result != e[n++].result) return !1;
        }
      }
      const jp = { 'aria-autocomplete': 'list' };
      function _p(t, e) {
        let i = {
          'aria-autocomplete': 'list',
          'aria-haspopup': 'listbox',
          'aria-controls': t,
        };
        return e > -1 && (i['aria-activedescendant'] = t + '-' + e), i;
      }
      const Kp = [];
      function $p(t) {
        return t.isUserEvent('input.type')
          ? 'input'
          : t.isUserEvent('delete.backward')
          ? 'delete'
          : null;
      }
      class Up {
        constructor(t, e, i = -1) {
          (this.source = t), (this.state = e), (this.explicitPos = i);
        }
        hasResult() {
          return !1;
        }
        update(t, e) {
          let i = $p(t),
            n = this;
          i
            ? (n = n.handleUserEvent(t, i, e))
            : t.docChanged
            ? (n = n.handleChange(t))
            : t.selection && 0 != n.state && (n = new Up(n.source, 0));
          for (let s of t.effects)
            if (s.is(vp)) n = new Up(n.source, 1, s.value ? up(t.state) : -1);
            else if (s.is(wp)) n = new Up(n.source, 0);
            else if (s.is(Yp))
              for (let t of s.value) t.source == n.source && (n = t);
          return n;
        }
        handleUserEvent(t, e, i) {
          return 'delete' != e && i.activateOnTyping
            ? new Up(this.source, 1)
            : this.map(t.changes);
        }
        handleChange(t) {
          return t.changes.touchesRange(up(t.startState))
            ? new Up(this.source, 0)
            : this.map(t.changes);
        }
        map(t) {
          return t.empty || this.explicitPos < 0
            ? this
            : new Up(this.source, this.state, t.mapPos(this.explicitPos));
        }
      }
      class Gp extends Up {
        constructor(t, e, i, n, s) {
          super(t, 2, e), (this.result = i), (this.from = n), (this.to = s);
        }
        hasResult() {
          return !0;
        }
        handleUserEvent(t, e, i) {
          var n;
          let s = t.changes.mapPos(this.from),
            r = t.changes.mapPos(this.to, 1),
            o = up(t.state);
          if (
            (this.explicitPos < 0 ? o <= s : o < this.from) ||
            o > r ||
            ('delete' == e && up(t.startState) == this.from)
          )
            return new Up(
              this.source,
              'input' == e && i.activateOnTyping ? 1 : 0,
            );
          let l,
            a = this.explicitPos < 0 ? -1 : t.changes.mapPos(this.explicitPos);
          return Jp(this.result.validFor, t.state, s, r)
            ? new Gp(this.source, a, this.result, s, r)
            : this.result.update &&
              (l = this.result.update(
                this.result,
                s,
                r,
                new op(t.state, o, a >= 0),
              ))
            ? new Gp(
                this.source,
                a,
                l,
                l.from,
                null !== (n = l.to) && void 0 !== n ? n : up(t.state),
              )
            : new Up(this.source, 1, a);
        }
        handleChange(t) {
          return t.changes.touchesRange(this.from, this.to)
            ? new Up(this.source, 0)
            : this.map(t.changes);
        }
        map(t) {
          return t.empty
            ? this
            : new Gp(
                this.source,
                this.explicitPos < 0 ? -1 : t.mapPos(this.explicitPos),
                this.result,
                t.mapPos(this.from),
                t.mapPos(this.to, 1),
              );
        }
      }
      function Jp(t, e, i, n) {
        if (!t) return !1;
        let s = e.sliceDoc(i, n);
        return 'function' == typeof t ? t(s, i, n, e) : dp(t, !0).test(s);
      }
      const Yp = gt.define({
          map(t, e) {
            return t.map((t) => t.map(e));
          },
        }),
        Xp = gt.define(),
        Zp = J.define({
          create() {
            return Fp.start();
          },
          update(t, e) {
            return t.update(e);
          },
          provide: (t) => [
            Xo.from(t, (t) => t.tooltip),
            Or.contentAttributes.from(t, (t) => t.attrs),
          ],
        }),
        Qp = Or.baseTheme({
          '.cm-tooltip.cm-tooltip-autocomplete': {
            '& > ul': {
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
              overflow: 'hidden auto',
              maxWidth_fallback: '700px',
              maxWidth: 'min(700px, 95vw)',
              minWidth: '250px',
              maxHeight: '10em',
              height: '100%',
              listStyle: 'none',
              margin: 0,
              padding: 0,
              '& > li, & > completion-section': {
                padding: '1px 3px',
                lineHeight: 1.2,
              },
              '& > li': {
                overflowX: 'hidden',
                textOverflow: 'ellipsis',
                cursor: 'pointer',
              },
              '& > completion-section': {
                display: 'list-item',
                borderBottom: '1px solid silver',
                paddingLeft: '0.5em',
                opacity: 0.7,
              },
            },
          },
          '&light .cm-tooltip-autocomplete ul li[aria-selected]': {
            background: '#17c',
            color: 'white',
          },
          '&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]': {
            background: '#777',
          },
          '&dark .cm-tooltip-autocomplete ul li[aria-selected]': {
            background: '#347',
            color: 'white',
          },
          '&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]': {
            background: '#444',
          },
          '.cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after':
            {
              content: '"\xb7\xb7\xb7"',
              opacity: 0.5,
              display: 'block',
              textAlign: 'center',
            },
          '.cm-tooltip.cm-completionInfo': {
            position: 'absolute',
            padding: '3px 9px',
            width: 'max-content',
            maxWidth: '400px',
            boxSizing: 'border-box',
          },
          '.cm-completionInfo.cm-completionInfo-left': { right: '100%' },
          '.cm-completionInfo.cm-completionInfo-right': { left: '100%' },
          '.cm-completionInfo.cm-completionInfo-left-narrow': { right: '30px' },
          '.cm-completionInfo.cm-completionInfo-right-narrow': { left: '30px' },
          '&light .cm-snippetField': { backgroundColor: '#00000022' },
          '&dark .cm-snippetField': { backgroundColor: '#ffffff22' },
          '.cm-snippetFieldPosition': {
            verticalAlign: 'text-top',
            width: 0,
            height: '1.15em',
            display: 'inline-block',
            margin: '0 -0.7px -.7em',
            borderLeft: '1.4px dotted #888',
          },
          '.cm-completionMatchedText': { textDecoration: 'underline' },
          '.cm-completionDetail': { marginLeft: '0.5em', fontStyle: 'italic' },
          '.cm-completionIcon': {
            fontSize: '90%',
            width: '.8em',
            display: 'inline-block',
            textAlign: 'center',
            paddingRight: '.6em',
            opacity: '0.6',
            boxSizing: 'content-box',
          },
          '.cm-completionIcon-function, .cm-completionIcon-method': {
            '&:after': { content: "'\u0192'" },
          },
          '.cm-completionIcon-class': { '&:after': { content: "'\u25cb'" } },
          '.cm-completionIcon-interface': {
            '&:after': { content: "'\u25cc'" },
          },
          '.cm-completionIcon-variable': {
            '&:after': { content: "'\ud835\udc65'" },
          },
          '.cm-completionIcon-constant': {
            '&:after': { content: "'\ud835\udc36'" },
          },
          '.cm-completionIcon-type': {
            '&:after': { content: "'\ud835\udc61'" },
          },
          '.cm-completionIcon-enum': { '&:after': { content: "'\u222a'" } },
          '.cm-completionIcon-property': { '&:after': { content: "'\u25a1'" } },
          '.cm-completionIcon-keyword': {
            '&:after': { content: "'\ud83d\udd11\ufe0e'" },
          },
          '.cm-completionIcon-namespace': {
            '&:after': { content: "'\u25a2'" },
          },
          '.cm-completionIcon-text': {
            '&:after': {
              content: "'abc'",
              fontSize: '50%',
              verticalAlign: 'middle',
            },
          },
        });
      const tm = {
          brackets: ['(', '[', '{', "'", '"'],
          before: ')]}:;>',
          stringPrefixes: [],
        },
        em = gt.define({
          map(t, e) {
            let i = e.mapPos(t, -1, T.TrackAfter);
            return null == i ? void 0 : i;
          },
        }),
        im = new (class extends Lt {})();
      (im.startSide = 1), (im.endSide = -1);
      const nm = J.define({
        create() {
          return Ht.empty;
        },
        update(t, e) {
          if (e.selection) {
            let i = e.state.doc.lineAt(e.selection.main.head).from,
              n = e.startState.doc.lineAt(
                e.startState.selection.main.head,
              ).from;
            i != e.changes.mapPos(n, -1) && (t = Ht.empty);
          }
          t = t.map(e.changes);
          for (let i of e.effects)
            i.is(em) &&
              (t = t.update({ add: [im.range(i.value, i.value + 1)] }));
          return t;
        },
      });
      function sm() {
        return [hm, nm];
      }
      const rm = '()[]{}<>';
      function om(t) {
        for (let e = 0; e < rm.length; e += 2)
          if (rm.charCodeAt(e) == t) return rm.charAt(e + 1);
        return A(t < 128 ? t : t + 1);
      }
      function lm(t, e) {
        return t.languageDataAt('closeBrackets', e)[0] || tm;
      }
      const am =
          'object' == typeof navigator && /Android\b/.test(navigator.userAgent),
        hm = Or.inputHandler.of((t, e, i, n) => {
          if ((am ? t.composing : t.compositionStarted) || t.state.readOnly)
            return !1;
          let s = t.state.selection.main;
          if (
            n.length > 2 ||
            (2 == n.length && 1 == O(M(n, 0))) ||
            e != s.from ||
            i != s.to
          )
            return !1;
          let r = dm(t.state, n);
          return !!r && (t.dispatch(r), !0);
        }),
        cm = ({ state: t, dispatch: e }) => {
          if (t.readOnly) return !1;
          let i = lm(t, t.selection.main.head),
            n = i.brackets || tm.brackets,
            s = null,
            r = t.changeByRange((e) => {
              if (e.empty) {
                let i = mm(t.doc, e.head);
                for (let s of n)
                  if (s == i && pm(t.doc, e.head) == om(M(s, 0)))
                    return {
                      changes: {
                        from: e.head - s.length,
                        to: e.head + s.length,
                      },
                      range: V.cursor(e.head - s.length),
                    };
              }
              return { range: (s = e) };
            });
          return (
            s ||
              e(
                t.update(r, {
                  scrollIntoView: !0,
                  userEvent: 'delete.backward',
                }),
              ),
            !s
          );
        },
        um = [{ key: 'Backspace', run: cm }];
      function dm(t, e) {
        let i = lm(t, t.selection.main.head),
          n = i.brackets || tm.brackets;
        for (let s of n) {
          let r = om(M(s, 0));
          if (e == s)
            return r == s
              ? wm(t, s, n.indexOf(s + s + s) > -1, i)
              : gm(t, s, r, i.before || tm.before);
          if (e == r && fm(t, t.selection.main.from)) return vm(t, s, r);
        }
        return null;
      }
      function fm(t, e) {
        let i = !1;
        return (
          t.field(nm).between(0, t.doc.length, (t) => {
            t == e && (i = !0);
          }),
          i
        );
      }
      function pm(t, e) {
        let i = t.sliceString(e, e + 2);
        return i.slice(0, O(M(i, 0)));
      }
      function mm(t, e) {
        let i = t.sliceString(e - 2, e);
        return O(M(i, 0)) == i.length ? i : i.slice(1);
      }
      function gm(t, e, i, n) {
        let s = null,
          r = t.changeByRange((r) => {
            if (!r.empty)
              return {
                changes: [
                  { insert: e, from: r.from },
                  { insert: i, from: r.to },
                ],
                effects: em.of(r.to + e.length),
                range: V.range(r.anchor + e.length, r.head + e.length),
              };
            let o = pm(t.doc, r.head);
            return !o || /\s/.test(o) || n.indexOf(o) > -1
              ? {
                  changes: { insert: e + i, from: r.head },
                  effects: em.of(r.head + e.length),
                  range: V.cursor(r.head + e.length),
                }
              : { range: (s = r) };
          });
        return s
          ? null
          : t.update(r, { scrollIntoView: !0, userEvent: 'input.type' });
      }
      function vm(t, e, i) {
        let n = null,
          s = t.changeByRange((e) =>
            e.empty && pm(t.doc, e.head) == i
              ? {
                  changes: { from: e.head, to: e.head + i.length, insert: i },
                  range: V.cursor(e.head + i.length),
                }
              : (n = { range: e }),
          );
        return n
          ? null
          : t.update(s, { scrollIntoView: !0, userEvent: 'input.type' });
      }
      function wm(t, e, i, n) {
        let s = n.stringPrefixes || tm.stringPrefixes,
          r = null,
          o = t.changeByRange((n) => {
            if (!n.empty)
              return {
                changes: [
                  { insert: e, from: n.from },
                  { insert: e, from: n.to },
                ],
                effects: em.of(n.to + e.length),
                range: V.range(n.anchor + e.length, n.head + e.length),
              };
            let o,
              l = n.head,
              a = pm(t.doc, l);
            if (a == e) {
              if (ym(t, l))
                return {
                  changes: { insert: e + e, from: l },
                  effects: em.of(l + e.length),
                  range: V.cursor(l + e.length),
                };
              if (fm(t, l)) {
                let n = i && t.sliceDoc(l, l + 3 * e.length) == e + e + e,
                  s = n ? e + e + e : e;
                return {
                  changes: { from: l, to: l + s.length, insert: s },
                  range: V.cursor(l + s.length),
                };
              }
            } else {
              if (
                i &&
                t.sliceDoc(l - 2 * e.length, l) == e + e &&
                (o = xm(t, l - 2 * e.length, s)) > -1 &&
                ym(t, o)
              )
                return {
                  changes: { insert: e + e + e + e, from: l },
                  effects: em.of(l + e.length),
                  range: V.cursor(l + e.length),
                };
              if (
                t.charCategorizer(l)(a) != At.Word &&
                xm(t, l, s) > -1 &&
                !bm(t, l, e, s)
              )
                return {
                  changes: { insert: e + e, from: l },
                  effects: em.of(l + e.length),
                  range: V.cursor(l + e.length),
                };
            }
            return { range: (r = n) };
          });
        return r
          ? null
          : t.update(o, { scrollIntoView: !0, userEvent: 'input.type' });
      }
      function ym(t, e) {
        let i = Ua(t).resolveInner(e + 1);
        return i.parent && i.from == e;
      }
      function bm(t, e, i, n) {
        let s = Ua(t).resolveInner(e, -1),
          r = n.reduce((t, e) => Math.max(t, e.length), 0);
        for (let o = 0; o < 5; o++) {
          let o = t.sliceDoc(s.from, Math.min(s.to, s.from + i.length + r)),
            l = o.indexOf(i);
          if (!l || (l > -1 && n.indexOf(o.slice(0, l)) > -1)) {
            let e = s.firstChild;
            while (e && e.from == s.from && e.to - e.from > i.length + l) {
              if (t.sliceDoc(e.to - i.length, e.to) == i) return !1;
              e = e.firstChild;
            }
            return !0;
          }
          let a = s.to == e && s.parent;
          if (!a) break;
          s = a;
        }
        return !1;
      }
      function xm(t, e, i) {
        let n = t.charCategorizer(e);
        if (n(t.sliceDoc(e - 1, e)) != At.Word) return e;
        for (let s of i) {
          let i = e - s.length;
          if (t.sliceDoc(i, e) == s && n(t.sliceDoc(i - 1, i)) != At.Word)
            return i;
        }
        return -1;
      }
      function km(t = {}) {
        return [Zp, bp.of(t), Rp, Cm, Qp];
      }
      const Sm = [
          { key: 'Ctrl-Space', run: Mp },
          { key: 'Escape', run: Ap },
          { key: 'ArrowDown', run: Sp(!0) },
          { key: 'ArrowUp', run: Sp(!1) },
          { key: 'PageDown', run: Sp(!0, 'page') },
          { key: 'PageUp', run: Sp(!1, 'page') },
          { key: 'Enter', run: Cp },
        ],
        Cm = Z.highest(
          Ir.computeN([bp], (t) => (t.facet(bp).defaultKeymap ? [Sm] : [])),
        );
      class Mm {
        constructor(t, e, i) {
          (this.from = t), (this.to = e), (this.diagnostic = i);
        }
      }
      class Am {
        constructor(t, e, i) {
          (this.diagnostics = t), (this.panel = e), (this.selected = i);
        }
        static init(t, e, i) {
          let n = t,
            s = i.facet(Fm).markerFilter;
          s && (n = s(n));
          let r = xi.set(
            n.map((t) =>
              t.from == t.to ||
              (t.from == t.to - 1 && i.doc.lineAt(t.from).to == t.from)
                ? xi.widget({ widget: new _m(t), diagnostic: t }).range(t.from)
                : xi
                    .mark({
                      attributes: {
                        class: 'cm-lintRange cm-lintRange-' + t.severity,
                      },
                      diagnostic: t,
                    })
                    .range(t.from, t.to),
            ),
            !0,
          );
          return new Am(r, e, Om(r));
        }
      }
      function Om(t, e = null, i = 0) {
        let n = null;
        return (
          t.between(i, 1e9, (t, i, { spec: s }) => {
            if (!e || s.diagnostic == e)
              return (n = new Mm(t, i, s.diagnostic)), !1;
          }),
          n
        );
      }
      function Dm(t, e) {
        return !(
          !t.effects.some((t) => t.is(Em)) && !t.changes.touchesRange(e.pos)
        );
      }
      function Tm(t, e) {
        return t.field(Lm, !1) ? e : e.concat(gt.appendConfig.of(Ym));
      }
      const Em = gt.define(),
        Rm = gt.define(),
        Bm = gt.define(),
        Lm = J.define({
          create() {
            return new Am(xi.none, null, null);
          },
          update(t, e) {
            if (e.docChanged) {
              let i = t.diagnostics.map(e.changes),
                n = null;
              if (t.selected) {
                let s = e.changes.mapPos(t.selected.from, 1);
                n = Om(i, t.selected.diagnostic, s) || Om(i, null, s);
              }
              t = new Am(i, t.panel, n);
            }
            for (let i of e.effects)
              i.is(Em)
                ? (t = Am.init(i.value, t.panel, e.state))
                : i.is(Rm)
                ? (t = new Am(
                    t.diagnostics,
                    i.value ? $m.open : null,
                    t.selected,
                  ))
                : i.is(Bm) && (t = new Am(t.diagnostics, t.panel, i.value));
            return t;
          },
          provide: (t) => [
            dl.from(t, (t) => t.panel),
            Or.decorations.from(t, (t) => t.diagnostics),
          ],
        });
      const Nm = xi.mark({ class: 'cm-lintRange cm-lintRange-active' });
      function Pm(t, e, i) {
        let { diagnostics: n } = t.state.field(Lm),
          s = [],
          r = 2e8,
          o = 0;
        n.between(
          e - (i < 0 ? 1 : 0),
          e + (i > 0 ? 1 : 0),
          (t, n, { spec: l }) => {
            e >= t &&
              e <= n &&
              (t == n || ((e > t || i > 0) && (e < n || i < 0))) &&
              (s.push(l.diagnostic),
              (r = Math.min(t, r)),
              (o = Math.max(n, o)));
          },
        );
        let l = t.state.facet(Fm).tooltipFilter;
        return (
          l && (s = l(s)),
          s.length
            ? {
                pos: r,
                end: o,
                above: t.state.doc.lineAt(r).to < o,
                create() {
                  return { dom: Im(t, s) };
                },
              }
            : null
        );
      }
      function Im(t, e) {
        return Kd(
          'ul',
          { class: 'cm-tooltip-lint' },
          e.map((e) => jm(t, e, !1)),
        );
      }
      const Hm = (t) => {
          let e = t.state.field(Lm, !1);
          (e && e.panel) || t.dispatch({ effects: Tm(t.state, [Rm.of(!0)]) });
          let i = al(t, $m.open);
          return i && i.dom.querySelector('.cm-panel-lint ul').focus(), !0;
        },
        Wm = (t) => {
          let e = t.state.field(Lm, !1);
          return !(!e || !e.panel) && (t.dispatch({ effects: Rm.of(!1) }), !0);
        },
        Vm = (t) => {
          let e = t.state.field(Lm, !1);
          if (!e) return !1;
          let i = t.state.selection.main,
            n = e.diagnostics.iter(i.to + 1);
          return (
            !(
              !n.value &&
              ((n = e.diagnostics.iter(0)),
              !n.value || (n.from == i.from && n.to == i.to))
            ) &&
            (t.dispatch({
              selection: { anchor: n.from, head: n.to },
              scrollIntoView: !0,
            }),
            !0)
          );
        },
        zm = [
          { key: 'Mod-Shift-m', run: Hm, preventDefault: !0 },
          { key: 'F8', run: Vm },
        ],
        Fm = q.define({
          combine(t) {
            return Object.assign(
              { sources: t.map((t) => t.source) },
              Bt(
                t.map((t) => t.config),
                {
                  delay: 750,
                  markerFilter: null,
                  tooltipFilter: null,
                  needsRefresh: null,
                },
                {
                  needsRefresh: (t, e) =>
                    t ? (e ? (i) => t(i) || e(i) : t) : e,
                },
              ),
            );
          },
        });
      function qm(t) {
        let e = [];
        if (t)
          t: for (let { name: i } of t) {
            for (let t = 0; t < i.length; t++) {
              let n = i[t];
              if (
                /[a-zA-Z]/.test(n) &&
                !e.some((t) => t.toLowerCase() == n.toLowerCase())
              ) {
                e.push(n);
                continue t;
              }
            }
            e.push('');
          }
        return e;
      }
      function jm(t, e, i) {
        var n;
        let s = i ? qm(e.actions) : [];
        return Kd(
          'li',
          { class: 'cm-diagnostic cm-diagnostic-' + e.severity },
          Kd(
            'span',
            { class: 'cm-diagnosticText' },
            e.renderMessage ? e.renderMessage() : e.message,
          ),
          null === (n = e.actions) || void 0 === n
            ? void 0
            : n.map((i, n) => {
                let r = !1,
                  o = (n) => {
                    if ((n.preventDefault(), r)) return;
                    r = !0;
                    let s = Om(t.state.field(Lm).diagnostics, e);
                    s && i.apply(t, s.from, s.to);
                  },
                  { name: l } = i,
                  a = s[n] ? l.indexOf(s[n]) : -1,
                  h =
                    a < 0
                      ? l
                      : [
                          l.slice(0, a),
                          Kd('u', l.slice(a, a + 1)),
                          l.slice(a + 1),
                        ];
                return Kd(
                  'button',
                  {
                    type: 'button',
                    class: 'cm-diagnosticAction',
                    onclick: o,
                    onmousedown: o,
                    'aria-label': ` Action: ${l}${
                      a < 0 ? '' : ` (access key "${s[n]})"`
                    }.`,
                  },
                  h,
                );
              }),
          e.source && Kd('div', { class: 'cm-diagnosticSource' }, e.source),
        );
      }
      class _m extends yi {
        constructor(t) {
          super(), (this.diagnostic = t);
        }
        eq(t) {
          return t.diagnostic == this.diagnostic;
        }
        toDOM() {
          return Kd('span', {
            class: 'cm-lintPoint cm-lintPoint-' + this.diagnostic.severity,
          });
        }
      }
      class Km {
        constructor(t, e) {
          (this.diagnostic = e),
            (this.id =
              'item_' + Math.floor(4294967295 * Math.random()).toString(16)),
            (this.dom = jm(t, e, !0)),
            (this.dom.id = this.id),
            this.dom.setAttribute('role', 'option');
        }
      }
      class $m {
        constructor(t) {
          (this.view = t), (this.items = []);
          let e = (e) => {
              if (27 == e.keyCode) Wm(this.view), this.view.focus();
              else if (38 == e.keyCode || 33 == e.keyCode)
                this.moveSelection(
                  (this.selectedIndex - 1 + this.items.length) %
                    this.items.length,
                );
              else if (40 == e.keyCode || 34 == e.keyCode)
                this.moveSelection(
                  (this.selectedIndex + 1) % this.items.length,
                );
              else if (36 == e.keyCode) this.moveSelection(0);
              else if (35 == e.keyCode)
                this.moveSelection(this.items.length - 1);
              else if (13 == e.keyCode) this.view.focus();
              else {
                if (
                  !(
                    e.keyCode >= 65 &&
                    e.keyCode <= 90 &&
                    this.selectedIndex >= 0
                  )
                )
                  return;
                {
                  let { diagnostic: i } = this.items[this.selectedIndex],
                    n = qm(i.actions);
                  for (let s = 0; s < n.length; s++)
                    if (n[s].toUpperCase().charCodeAt(0) == e.keyCode) {
                      let e = Om(this.view.state.field(Lm).diagnostics, i);
                      e && i.actions[s].apply(t, e.from, e.to);
                    }
                }
              }
              e.preventDefault();
            },
            i = (t) => {
              for (let e = 0; e < this.items.length; e++)
                this.items[e].dom.contains(t.target) && this.moveSelection(e);
            };
          (this.list = Kd('ul', {
            tabIndex: 0,
            role: 'listbox',
            'aria-label': this.view.state.phrase('Diagnostics'),
            onkeydown: e,
            onclick: i,
          })),
            (this.dom = Kd(
              'div',
              { class: 'cm-panel-lint' },
              this.list,
              Kd(
                'button',
                {
                  type: 'button',
                  name: 'close',
                  'aria-label': this.view.state.phrase('close'),
                  onclick: () => Wm(this.view),
                },
                '\xd7',
              ),
            )),
            this.update();
        }
        get selectedIndex() {
          let t = this.view.state.field(Lm).selected;
          if (!t) return -1;
          for (let e = 0; e < this.items.length; e++)
            if (this.items[e].diagnostic == t.diagnostic) return e;
          return -1;
        }
        update() {
          let { diagnostics: t, selected: e } = this.view.state.field(Lm),
            i = 0,
            n = !1,
            s = null;
          t.between(0, this.view.state.doc.length, (t, r, { spec: o }) => {
            let l,
              a = -1;
            for (let e = i; e < this.items.length; e++)
              if (this.items[e].diagnostic == o.diagnostic) {
                a = e;
                break;
              }
            a < 0
              ? ((l = new Km(this.view, o.diagnostic)),
                this.items.splice(i, 0, l),
                (n = !0))
              : ((l = this.items[a]),
                a > i && (this.items.splice(i, a - i), (n = !0))),
              e && l.diagnostic == e.diagnostic
                ? l.dom.hasAttribute('aria-selected') ||
                  (l.dom.setAttribute('aria-selected', 'true'), (s = l))
                : l.dom.hasAttribute('aria-selected') &&
                  l.dom.removeAttribute('aria-selected'),
              i++;
          });
          while (
            i < this.items.length &&
            !(1 == this.items.length && this.items[0].diagnostic.from < 0)
          )
            (n = !0), this.items.pop();
          0 == this.items.length &&
            (this.items.push(
              new Km(this.view, {
                from: -1,
                to: -1,
                severity: 'info',
                message: this.view.state.phrase('No diagnostics'),
              }),
            ),
            (n = !0)),
            s
              ? (this.list.setAttribute('aria-activedescendant', s.id),
                this.view.requestMeasure({
                  key: this,
                  read: () => ({
                    sel: s.dom.getBoundingClientRect(),
                    panel: this.list.getBoundingClientRect(),
                  }),
                  write: ({ sel: t, panel: e }) => {
                    t.top < e.top
                      ? (this.list.scrollTop -= e.top - t.top)
                      : t.bottom > e.bottom &&
                        (this.list.scrollTop += t.bottom - e.bottom);
                  },
                }))
              : this.selectedIndex < 0 &&
                this.list.removeAttribute('aria-activedescendant'),
            n && this.sync();
        }
        sync() {
          let t = this.list.firstChild;
          function e() {
            let e = t;
            (t = e.nextSibling), e.remove();
          }
          for (let i of this.items)
            if (i.dom.parentNode == this.list) {
              while (t != i.dom) e();
              t = i.dom.nextSibling;
            } else this.list.insertBefore(i.dom, t);
          while (t) e();
        }
        moveSelection(t) {
          if (this.selectedIndex < 0) return;
          let e = this.view.state.field(Lm),
            i = Om(e.diagnostics, this.items[t].diagnostic);
          i &&
            this.view.dispatch({
              selection: { anchor: i.from, head: i.to },
              scrollIntoView: !0,
              effects: Bm.of(i),
            });
        }
        static open(t) {
          return new $m(t);
        }
      }
      function Um(t, e = 'viewBox="0 0 40 40"') {
        return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" ${e}>${encodeURIComponent(
          t,
        )}</svg>')`;
      }
      function Gm(t) {
        return Um(
          `<path d="m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0" stroke="${t}" fill="none" stroke-width=".7"/>`,
          'width="6" height="3"',
        );
      }
      const Jm = Or.baseTheme({
        '.cm-diagnostic': {
          padding: '3px 6px 3px 8px',
          marginLeft: '-1px',
          display: 'block',
          whiteSpace: 'pre-wrap',
        },
        '.cm-diagnostic-error': { borderLeft: '5px solid #d11' },
        '.cm-diagnostic-warning': { borderLeft: '5px solid orange' },
        '.cm-diagnostic-info': { borderLeft: '5px solid #999' },
        '.cm-diagnosticAction': {
          font: 'inherit',
          border: 'none',
          padding: '2px 4px',
          backgroundColor: '#444',
          color: 'white',
          borderRadius: '3px',
          marginLeft: '8px',
          cursor: 'pointer',
        },
        '.cm-diagnosticSource': { fontSize: '70%', opacity: 0.7 },
        '.cm-lintRange': {
          backgroundPosition: 'left bottom',
          backgroundRepeat: 'repeat-x',
          paddingBottom: '0.7px',
        },
        '.cm-lintRange-error': { backgroundImage: Gm('#d11') },
        '.cm-lintRange-warning': { backgroundImage: Gm('orange') },
        '.cm-lintRange-info': { backgroundImage: Gm('#999') },
        '.cm-lintRange-active': { backgroundColor: '#ffdd9980' },
        '.cm-tooltip-lint': { padding: 0, margin: 0 },
        '.cm-lintPoint': {
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '-2px',
            borderLeft: '3px solid transparent',
            borderRight: '3px solid transparent',
            borderBottom: '4px solid #d11',
          },
        },
        '.cm-lintPoint-warning': { '&:after': { borderBottomColor: 'orange' } },
        '.cm-lintPoint-info': { '&:after': { borderBottomColor: '#999' } },
        '.cm-panel.cm-panel-lint': {
          position: 'relative',
          '& ul': {
            maxHeight: '100px',
            overflowY: 'auto',
            '& [aria-selected]': {
              backgroundColor: '#ddd',
              '& u': { textDecoration: 'underline' },
            },
            '&:focus [aria-selected]': {
              background_fallback: '#bdf',
              backgroundColor: 'Highlight',
              color_fallback: 'white',
              color: 'HighlightText',
            },
            '& u': { textDecoration: 'none' },
            padding: 0,
            margin: 0,
          },
          '& [name=close]': {
            position: 'absolute',
            top: '0',
            right: '2px',
            background: 'inherit',
            border: 'none',
            font: 'inherit',
            padding: 0,
            margin: 0,
          },
        },
      });
      const Ym = [
        Lm,
        Or.decorations.compute([Lm], (t) => {
          let { selected: e, panel: i } = t.field(Lm);
          return e && i && e.from != e.to
            ? xi.set([Nm.range(e.from, e.to)])
            : xi.none;
        }),
        sl(Pm, { hideOn: Dm }),
        Jm,
      ];
      var Xm = function (t) {
        void 0 === t && (t = {});
        var e = [];
        !1 !== t.closeBracketsKeymap && (e = e.concat(um)),
          !1 !== t.defaultKeymap && (e = e.concat(jd)),
          !1 !== t.searchKeymap && (e = e.concat(Zf)),
          !1 !== t.historyKeymap && (e = e.concat(ou)),
          !1 !== t.foldKeymap && (e = e.concat(Vh)),
          !1 !== t.completionKeymap && (e = e.concat(Sm)),
          !1 !== t.lintKeymap && (e = e.concat(zm));
        var i = [];
        return (
          !1 !== t.lineNumbers && i.push(Bl()),
          !1 !== t.highlightActiveLineGutter && i.push(Il()),
          !1 !== t.highlightSpecialChars && i.push(ko()),
          !1 !== t.history && i.push(Fc()),
          !1 !== t.foldGutter && i.push($h()),
          !1 !== t.drawSelection && i.push(eo()),
          !1 !== t.dropCursor && i.push(uo()),
          !1 !== t.allowMultipleSelections &&
            i.push(Rt.allowMultipleSelections.of(!0)),
          !1 !== t.indentOnInput && i.push(bh()),
          !1 !== t.syntaxHighlighting && i.push(Zh(ec, { fallback: !0 })),
          !1 !== t.bracketMatching && i.push(uc()),
          !1 !== t.closeBrackets && i.push(sm()),
          !1 !== t.autocompletion && i.push(km()),
          !1 !== t.rectangularSelection && i.push(Vo()),
          !1 !== t.crosshairCursor && i.push(qo()),
          !1 !== t.highlightActiveLine && i.push(To()),
          !1 !== t.highlightSelectionMatches && i.push(uf()),
          t.tabSize &&
            'number' === typeof t.tabSize &&
            i.push(sh.of(' '.repeat(t.tabSize))),
          i.concat([Ir.of(e.flat())]).filter(Boolean)
        );
      };
      const Zm = '#e5c07b',
        Qm = '#e06c75',
        tg = '#56b6c2',
        eg = '#ffffff',
        ig = '#abb2bf',
        ng = '#7d8799',
        sg = '#61afef',
        rg = '#98c379',
        og = '#d19a66',
        lg = '#c678dd',
        ag = '#21252b',
        hg = '#2c313a',
        cg = '#282c34',
        ug = '#353a42',
        dg = '#3E4451',
        fg = '#528bff',
        pg = Or.theme(
          {
            '&': { color: ig, backgroundColor: cg },
            '.cm-content': { caretColor: fg },
            '.cm-cursor, .cm-dropCursor': { borderLeftColor: fg },
            '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
              { backgroundColor: dg },
            '.cm-panels': { backgroundColor: ag, color: ig },
            '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
            '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },
            '.cm-searchMatch': {
              backgroundColor: '#72a1ff59',
              outline: '1px solid #457dff',
            },
            '.cm-searchMatch.cm-searchMatch-selected': {
              backgroundColor: '#6199ff2f',
            },
            '.cm-activeLine': { backgroundColor: '#6699ff0b' },
            '.cm-selectionMatch': { backgroundColor: '#aafe661a' },
            '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket':
              { backgroundColor: '#bad0f847' },
            '.cm-gutters': { backgroundColor: cg, color: ng, border: 'none' },
            '.cm-activeLineGutter': { backgroundColor: hg },
            '.cm-foldPlaceholder': {
              backgroundColor: 'transparent',
              border: 'none',
              color: '#ddd',
            },
            '.cm-tooltip': { border: 'none', backgroundColor: ug },
            '.cm-tooltip .cm-tooltip-arrow:before': {
              borderTopColor: 'transparent',
              borderBottomColor: 'transparent',
            },
            '.cm-tooltip .cm-tooltip-arrow:after': {
              borderTopColor: ug,
              borderBottomColor: ug,
            },
            '.cm-tooltip-autocomplete': {
              '& > ul > li[aria-selected]': { backgroundColor: hg, color: ig },
            },
          },
          { dark: !0 },
        ),
        mg = Gh.define([
          { tag: Fa.keyword, color: lg },
          {
            tag: [
              Fa.name,
              Fa.deleted,
              Fa.character,
              Fa.propertyName,
              Fa.macroName,
            ],
            color: Qm,
          },
          { tag: [Fa.function(Fa.variableName), Fa.labelName], color: sg },
          {
            tag: [Fa.color, Fa.constant(Fa.name), Fa.standard(Fa.name)],
            color: og,
          },
          { tag: [Fa.definition(Fa.name), Fa.separator], color: ig },
          {
            tag: [
              Fa.typeName,
              Fa.className,
              Fa.number,
              Fa.changed,
              Fa.annotation,
              Fa.modifier,
              Fa.self,
              Fa.namespace,
            ],
            color: Zm,
          },
          {
            tag: [
              Fa.operator,
              Fa.operatorKeyword,
              Fa.url,
              Fa.escape,
              Fa.regexp,
              Fa.link,
              Fa.special(Fa.string),
            ],
            color: tg,
          },
          { tag: [Fa.meta, Fa.comment], color: ng },
          { tag: Fa.strong, fontWeight: 'bold' },
          { tag: Fa.emphasis, fontStyle: 'italic' },
          { tag: Fa.strikethrough, textDecoration: 'line-through' },
          { tag: Fa.link, color: ng, textDecoration: 'underline' },
          { tag: Fa.heading, fontWeight: 'bold', color: Qm },
          { tag: [Fa.atom, Fa.bool, Fa.special(Fa.variableName)], color: og },
          {
            tag: [Fa.processingInstruction, Fa.string, Fa.inserted],
            color: rg,
          },
          { tag: Fa.invalid, color: eg },
        ]),
        gg = [pg, Zh(mg)];
      var vg = function (t) {
          void 0 === t && (t = {});
          var {
              indentWithTab: e = !0,
              editable: i = !0,
              readOnly: n = !1,
              theme: s = 'light',
              placeholder: r = '',
              basicSetup: o = !0,
            } = t,
            l = [],
            a = Or.theme({ '&': { backgroundColor: '#fff' } }, { dark: !1 });
          switch (
            (e && l.unshift(Ir.of([_d])),
            o && ('boolean' === typeof o ? l.unshift(Xm()) : l.unshift(Xm(o))),
            r && l.unshift(Lo(r)),
            s)
          ) {
            case 'light':
              l.push(a);
              break;
            case 'dark':
              l.push(gg);
              break;
            case 'none':
              break;
            default:
              l.push(s);
              break;
          }
          return (
            !1 === i && l.push(Or.editable.of(!1)),
            n && l.push(Rt.readOnly.of(!0)),
            [...l]
          );
        },
        wg = (t) => ({
          line: t.state.doc.lineAt(t.state.selection.main.from),
          lineCount: t.state.doc.lines,
          lineBreak: t.state.lineBreak,
          length: t.state.doc.length,
          readOnly: t.state.readOnly,
          tabSize: t.state.tabSize,
          selection: t.state.selection,
          selectionAsSingle: t.state.selection.asSingle().main,
          ranges: t.state.selection.ranges,
          selectionCode: t.state.sliceDoc(
            t.state.selection.main.from,
            t.state.selection.main.to,
          ),
          selections: t.state.selection.ranges.map((e) =>
            t.state.sliceDoc(e.from, e.to),
          ),
          selectedText: t.state.selection.ranges.some((t) => !t.empty),
        }),
        yg = ft.define();
      function bg(t) {
        var {
            value: e,
            selection: i,
            onChange: n,
            onStatistics: s,
            onCreateEditor: o,
            onUpdate: l,
            extensions: a = [],
            autoFocus: h,
            theme: c = 'light',
            height: u = '',
            minHeight: d = '',
            maxHeight: f = '',
            placeholder: p = '',
            width: m = '',
            minWidth: g = '',
            maxWidth: v = '',
            editable: w = !0,
            readOnly: y = !1,
            indentWithTab: b = !0,
            basicSetup: x = !0,
            root: k,
            initialState: S,
          } = t,
          [C, M] = (0, r.useState)(),
          [A, O] = (0, r.useState)(),
          [D, T] = (0, r.useState)(),
          E = Or.theme({
            '&': {
              height: u,
              minHeight: d,
              maxHeight: f,
              width: m,
              minWidth: g,
              maxWidth: v,
            },
          }),
          R = Or.updateListener.of((t) => {
            if (
              t.docChanged &&
              'function' === typeof n &&
              !t.transactions.some((t) => t.annotation(yg))
            ) {
              var e = t.state.doc,
                i = e.toString();
              n(i, t);
            }
            s && s(wg(t));
          }),
          B = vg({
            theme: c,
            editable: w,
            readOnly: y,
            placeholder: p,
            indentWithTab: b,
            basicSetup: x,
          }),
          L = [R, E, ...B];
        return (
          l && 'function' === typeof l && L.push(Or.updateListener.of(l)),
          (L = L.concat(a)),
          (0, r.useEffect)(() => {
            if (C && !D) {
              var t = { doc: e, selection: i, extensions: L },
                n = S ? Rt.fromJSON(S.json, t, S.fields) : Rt.create(t);
              if ((T(n), !A)) {
                var s = new Or({ state: n, parent: C, root: k });
                O(s), o && o(s, n);
              }
            }
            return () => {
              A && (T(void 0), O(void 0));
            };
          }, [C, D]),
          (0, r.useEffect)(() => M(t.container), [t.container]),
          (0, r.useEffect)(
            () => () => {
              A && (A.destroy(), O(void 0));
            },
            [A],
          ),
          (0, r.useEffect)(() => {
            h && A && A.focus();
          }, [h, A]),
          (0, r.useEffect)(() => {
            A && A.dispatch({ effects: gt.reconfigure.of(L) });
          }, [c, a, u, d, f, m, g, v, p, w, y, b, x, n, l]),
          (0, r.useEffect)(() => {
            if (void 0 !== e) {
              var t = A ? A.state.doc.toString() : '';
              A &&
                e !== t &&
                A.dispatch({
                  changes: { from: 0, to: t.length, insert: e || '' },
                  annotations: [yg.of(!0)],
                });
            }
          }, [e, A]),
          {
            state: D,
            setState: T,
            view: A,
            setView: O,
            container: C,
            setContainer: M,
          }
        );
      }
      var xg = i(85893),
        kg = [
          'className',
          'value',
          'selection',
          'extensions',
          'onChange',
          'onStatistics',
          'onCreateEditor',
          'onUpdate',
          'autoFocus',
          'theme',
          'height',
          'minHeight',
          'maxHeight',
          'width',
          'minWidth',
          'maxWidth',
          'basicSetup',
          'placeholder',
          'indentWithTab',
          'editable',
          'readOnly',
          'root',
          'initialState',
        ],
        Sg = (0, r.forwardRef)((t, e) => {
          var {
              className: i,
              value: o = '',
              selection: l,
              extensions: a = [],
              onChange: h,
              onStatistics: c,
              onCreateEditor: u,
              onUpdate: d,
              autoFocus: f,
              theme: p = 'light',
              height: m,
              minHeight: g,
              maxHeight: v,
              width: w,
              minWidth: y,
              maxWidth: b,
              basicSetup: x,
              placeholder: k,
              indentWithTab: S,
              editable: C,
              readOnly: M,
              root: A,
              initialState: O,
            } = t,
            D = s(t, kg),
            T = (0, r.useRef)(null),
            {
              state: E,
              view: R,
              container: B,
            } = bg({
              container: T.current,
              root: A,
              value: o,
              autoFocus: f,
              theme: p,
              height: m,
              minHeight: g,
              maxHeight: v,
              width: w,
              minWidth: y,
              maxWidth: b,
              basicSetup: x,
              placeholder: k,
              indentWithTab: S,
              editable: C,
              readOnly: M,
              selection: l,
              onChange: h,
              onStatistics: c,
              onCreateEditor: u,
              onUpdate: d,
              extensions: a,
              initialState: O,
            });
          if (
            ((0, r.useImperativeHandle)(
              e,
              () => ({ editor: T.current, state: E, view: R }),
              [T, B, E, R],
            ),
            'string' !== typeof o)
          )
            throw new Error('value must be typeof string but got ' + typeof o);
          var L = 'string' === typeof p ? 'cm-theme-' + p : 'cm-theme';
          return (0, xg.jsx)(
            'div',
            n({ ref: T, className: L + (i ? ' ' + i : '') }, D),
          );
        });
      Sg.displayName = 'CodeMirror';
      var Cg = Sg;
    },
    955: function () {},
    11382: function (t, e, i) {
      'use strict';
      var n = i(22122),
        s = i(96156),
        r = i(28481),
        o = i(94184),
        l = i.n(o),
        a = i(23279),
        h = i.n(a),
        c = i(98423),
        u = i(12924),
        d = i(53124),
        f = i(96159),
        p = i(93355),
        m = function (t, e) {
          var i = {};
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) &&
              e.indexOf(n) < 0 &&
              (i[n] = t[n]);
          if (null != t && 'function' === typeof Object.getOwnPropertySymbols) {
            var s = 0;
            for (n = Object.getOwnPropertySymbols(t); s < n.length; s++)
              e.indexOf(n[s]) < 0 &&
                Object.prototype.propertyIsEnumerable.call(t, n[s]) &&
                (i[n[s]] = t[n[s]]);
          }
          return i;
        },
        g = ((0, p.b)('small', 'default', 'large'), null);
      function v(t, e) {
        var i = e.indicator,
          n = ''.concat(t, '-dot');
        return null === i
          ? null
          : (0, f.l$)(i)
          ? (0, f.Tm)(i, { className: l()(i.props.className, n) })
          : (0, f.l$)(g)
          ? (0, f.Tm)(g, { className: l()(g.props.className, n) })
          : u.createElement(
              'span',
              { className: l()(n, ''.concat(t, '-dot-spin')) },
              u.createElement('i', { className: ''.concat(t, '-dot-item') }),
              u.createElement('i', { className: ''.concat(t, '-dot-item') }),
              u.createElement('i', { className: ''.concat(t, '-dot-item') }),
              u.createElement('i', { className: ''.concat(t, '-dot-item') }),
            );
      }
      function w(t, e) {
        return !!t && !!e && !isNaN(Number(e));
      }
      var y = function (t) {
          var e = t.spinPrefixCls,
            i = t.spinning,
            o = void 0 === i || i,
            a = t.delay,
            f = t.className,
            p = t.size,
            g = void 0 === p ? 'default' : p,
            y = t.tip,
            b = t.wrapperClassName,
            x = t.style,
            k = t.children,
            S = m(t, [
              'spinPrefixCls',
              'spinning',
              'delay',
              'className',
              'size',
              'tip',
              'wrapperClassName',
              'style',
              'children',
            ]),
            C = u.useState(function () {
              return o && !w(o, a);
            }),
            M = (0, r.Z)(C, 2),
            A = M[0],
            O = M[1];
          u.useEffect(
            function () {
              var t = h()(function () {
                O(o);
              }, a);
              return (
                t(),
                function () {
                  var e;
                  null ===
                    (e = null === t || void 0 === t ? void 0 : t.cancel) ||
                    void 0 === e ||
                    e.call(t);
                }
              );
            },
            [a, o],
          );
          var D = function () {
              return 'undefined' !== typeof k;
            },
            T = function (i) {
              var r,
                o = i.direction,
                a = l()(
                  e,
                  ((r = {}),
                  (0, s.Z)(r, ''.concat(e, '-sm'), 'small' === g),
                  (0, s.Z)(r, ''.concat(e, '-lg'), 'large' === g),
                  (0, s.Z)(r, ''.concat(e, '-spinning'), A),
                  (0, s.Z)(r, ''.concat(e, '-show-text'), !!y),
                  (0, s.Z)(r, ''.concat(e, '-rtl'), 'rtl' === o),
                  r),
                  f,
                ),
                h = (0, c.Z)(S, ['indicator', 'prefixCls']),
                d = u.createElement(
                  'div',
                  (0, n.Z)({}, h, {
                    style: x,
                    className: a,
                    'aria-live': 'polite',
                    'aria-busy': A,
                  }),
                  v(e, t),
                  y
                    ? u.createElement(
                        'div',
                        { className: ''.concat(e, '-text') },
                        y,
                      )
                    : null,
                );
              if (D()) {
                var p = l()(
                  ''.concat(e, '-container'),
                  (0, s.Z)({}, ''.concat(e, '-blur'), A),
                );
                return u.createElement(
                  'div',
                  (0, n.Z)({}, h, {
                    className: l()(''.concat(e, '-nested-loading'), b),
                  }),
                  A && u.createElement('div', { key: 'loading' }, d),
                  u.createElement('div', { className: p, key: 'container' }, k),
                );
              }
              return d;
            };
          return u.createElement(d.C, null, T);
        },
        b = function (t) {
          var e = t.prefixCls,
            i = u.useContext(d.E_),
            s = i.getPrefixCls,
            r = s('spin', e),
            o = (0, n.Z)((0, n.Z)({}, t), { spinPrefixCls: r });
          return u.createElement(y, (0, n.Z)({}, o));
        };
      (b.setDefaultIndicator = function (t) {
        g = t;
      }),
        (e['Z'] = b);
    },
    20228: function (t, e, i) {
      'use strict';
      i(38663), i(955);
    },
    62705: function (t, e, i) {
      var n = i(55639),
        s = n.Symbol;
      t.exports = s;
    },
    44239: function (t, e, i) {
      var n = i(62705),
        s = i(89607),
        r = i(2333),
        o = '[object Null]',
        l = '[object Undefined]',
        a = n ? n.toStringTag : void 0;
      function h(t) {
        return null == t
          ? void 0 === t
            ? l
            : o
          : a && a in Object(t)
          ? s(t)
          : r(t);
      }
      t.exports = h;
    },
    27561: function (t, e, i) {
      var n = i(67990),
        s = /^\s+/;
      function r(t) {
        return t ? t.slice(0, n(t) + 1).replace(s, '') : t;
      }
      t.exports = r;
    },
    31957: function (t, e, i) {
      var n = 'object' == typeof i.g && i.g && i.g.Object === Object && i.g;
      t.exports = n;
    },
    89607: function (t, e, i) {
      var n = i(62705),
        s = Object.prototype,
        r = s.hasOwnProperty,
        o = s.toString,
        l = n ? n.toStringTag : void 0;
      function a(t) {
        var e = r.call(t, l),
          i = t[l];
        try {
          t[l] = void 0;
          var n = !0;
        } catch (a) {}
        var s = o.call(t);
        return n && (e ? (t[l] = i) : delete t[l]), s;
      }
      t.exports = a;
    },
    2333: function (t) {
      var e = Object.prototype,
        i = e.toString;
      function n(t) {
        return i.call(t);
      }
      t.exports = n;
    },
    55639: function (t, e, i) {
      var n = i(31957),
        s = 'object' == typeof self && self && self.Object === Object && self,
        r = n || s || Function('return this')();
      t.exports = r;
    },
    67990: function (t) {
      var e = /\s/;
      function i(t) {
        var i = t.length;
        while (i-- && e.test(t.charAt(i)));
        return i;
      }
      t.exports = i;
    },
    23279: function (t, e, i) {
      var n = i(13218),
        s = i(7771),
        r = i(14841),
        o = 'Expected a function',
        l = Math.max,
        a = Math.min;
      function h(t, e, i) {
        var h,
          c,
          u,
          d,
          f,
          p,
          m = 0,
          g = !1,
          v = !1,
          w = !0;
        if ('function' != typeof t) throw new TypeError(o);
        function y(e) {
          var i = h,
            n = c;
          return (h = c = void 0), (m = e), (d = t.apply(n, i)), d;
        }
        function b(t) {
          return (m = t), (f = setTimeout(S, e)), g ? y(t) : d;
        }
        function x(t) {
          var i = t - p,
            n = t - m,
            s = e - i;
          return v ? a(s, u - n) : s;
        }
        function k(t) {
          var i = t - p,
            n = t - m;
          return void 0 === p || i >= e || i < 0 || (v && n >= u);
        }
        function S() {
          var t = s();
          if (k(t)) return C(t);
          f = setTimeout(S, x(t));
        }
        function C(t) {
          return (f = void 0), w && h ? y(t) : ((h = c = void 0), d);
        }
        function M() {
          void 0 !== f && clearTimeout(f), (m = 0), (h = p = c = f = void 0);
        }
        function A() {
          return void 0 === f ? d : C(s());
        }
        function O() {
          var t = s(),
            i = k(t);
          if (((h = arguments), (c = this), (p = t), i)) {
            if (void 0 === f) return b(p);
            if (v) return clearTimeout(f), (f = setTimeout(S, e)), y(p);
          }
          return void 0 === f && (f = setTimeout(S, e)), d;
        }
        return (
          (e = r(e) || 0),
          n(i) &&
            ((g = !!i.leading),
            (v = 'maxWait' in i),
            (u = v ? l(r(i.maxWait) || 0, e) : u),
            (w = 'trailing' in i ? !!i.trailing : w)),
          (O.cancel = M),
          (O.flush = A),
          O
        );
      }
      t.exports = h;
    },
    13218: function (t) {
      function e(t) {
        var e = typeof t;
        return null != t && ('object' == e || 'function' == e);
      }
      t.exports = e;
    },
    37005: function (t) {
      function e(t) {
        return null != t && 'object' == typeof t;
      }
      t.exports = e;
    },
    33448: function (t, e, i) {
      var n = i(44239),
        s = i(37005),
        r = '[object Symbol]';
      function o(t) {
        return 'symbol' == typeof t || (s(t) && n(t) == r);
      }
      t.exports = o;
    },
    7771: function (t, e, i) {
      var n = i(55639),
        s = function () {
          return n.Date.now();
        };
      t.exports = s;
    },
    14841: function (t, e, i) {
      var n = i(27561),
        s = i(13218),
        r = i(33448),
        o = NaN,
        l = /^[-+]0x[0-9a-f]+$/i,
        a = /^0b[01]+$/i,
        h = /^0o[0-7]+$/i,
        c = parseInt;
      function u(t) {
        if ('number' == typeof t) return t;
        if (r(t)) return o;
        if (s(t)) {
          var e = 'function' == typeof t.valueOf ? t.valueOf() : t;
          t = s(e) ? e + '' : e;
        }
        if ('string' != typeof t) return 0 === t ? t : +t;
        t = n(t);
        var i = a.test(t);
        return i || h.test(t) ? c(t.slice(2), i ? 2 : 8) : l.test(t) ? o : +t;
      }
      t.exports = u;
    },
    75251: function (t, e, i) {
      'use strict';
      var n = i(12924),
        s = 60103;
      if (((e.Fragment = 60107), 'function' === typeof Symbol && Symbol.for)) {
        var r = Symbol.for;
        (s = r('react.element')), (e.Fragment = r('react.fragment'));
      }
      var o =
          n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
            .ReactCurrentOwner,
        l = Object.prototype.hasOwnProperty,
        a = { key: !0, ref: !0, __self: !0, __source: !0 };
      function h(t, e, i) {
        var n,
          r = {},
          h = null,
          c = null;
        for (n in (void 0 !== i && (h = '' + i),
        void 0 !== e.key && (h = '' + e.key),
        void 0 !== e.ref && (c = e.ref),
        e))
          l.call(e, n) && !a.hasOwnProperty(n) && (r[n] = e[n]);
        if (t && t.defaultProps)
          for (n in ((e = t.defaultProps), e)) void 0 === r[n] && (r[n] = e[n]);
        return {
          $$typeof: s,
          type: t,
          key: h,
          ref: c,
          props: r,
          _owner: o.current,
        };
      }
      (e.jsx = h), (e.jsxs = h);
    },
    85893: function (t, e, i) {
      'use strict';
      t.exports = i(75251);
    },
  },
]);
