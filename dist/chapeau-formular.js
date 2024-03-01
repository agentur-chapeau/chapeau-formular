class ze {
  constructor(t) {
    if (t.dataset.refAsyncForm)
      return ze.refs[t.dataset.refAsyncForm];
    this.ref = Math.random(), ze.refs[this.ref] = this, t.dataset.refAsyncForm = this.ref, this.el = t, this.form = t.querySelector("form"), this.formSuccess = t.querySelector(".w-form-done"), this.formFail = t.querySelector(".w-form-fail"), this.submitButton = t.querySelector('[type="submit"]'), this.buttonText = this.getSubmitText(), this.waitingText = this.submitButton.dataset.wait, this.beforeSubmitHandlers = [], this.payloadHandlers = [], this.inputHandlers = [], this.onStateHandlers = [], this.el.addEventListener("submit", (r) => this.submit(r));
  }
  set onBeforeSubmit(t) {
    this.beforeSubmitHandlers.push(t);
  }
  set onPayload(t) {
    this.payloadHandlers.push(t);
  }
  set onInput(t) {
    this.inputHandlers.push(t);
  }
  set onState(t) {
    this.onStateHandlers.push(t);
  }
  async submit(t) {
    t.preventDefault();
    try {
      if (!this.beforeSubmitHandlers.reduce((s, i) => i() && s, !0))
        return;
      this.setState("loading");
      const r = await this.createPayload(), n = this.form.action, o = { method: this.form.method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(r) };
      (await fetch(n, o)).ok ? this.setState("success") : this.setState("error");
    } catch (r) {
      console.error(r), this.setState("error");
    }
  }
  async createPayload() {
    let t = this.payloadHandlers.reduce((n, o) => o(n), {});
    const r = this.elements.filter((n) => n.name !== "");
    for (const n of r) {
      const o = n.name;
      let s = n.value;
      for (const i of this.inputHandlers)
        s = await i(n, s);
      if (s !== null && (n.type === "checkbox" && (s = n.checked), !(n.type === "radio" && !n.checked))) {
        if (typeof t[o] < "u") {
          Array.isArray(t[o]) || (t[o] = [t[o]]), t[o].push(s);
          continue;
        }
        t[o] = s;
      }
    }
    return t;
  }
  setState(t) {
    switch (t) {
      case "loading":
        this.form.style.display = null, this.formSuccess.style.display = null, this.formFail.style.display = null, this.elements.forEach((r) => r.disabled = !0), this.setSubmitText(this.waitingText);
        break;
      case "success":
        this.form.style.display = "none", this.formSuccess.style.display = "block", this.formFail.style.display = "none", this.elements.forEach((r) => r.disabled = !1), this.setSubmitText(this.buttonText), this.form.reset(), this.formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      case "error":
        this.form.style.display = null, this.formSuccess.style.display = null, this.formFail.style.display = "block", this.elements.forEach((r) => r.disabled = !1), this.setSubmitText(this.buttonText);
        break;
    }
    this.onStateHandlers.forEach((r) => r(t));
  }
  getSubmitText() {
    return this.submitButton instanceof HTMLInputElement ? this.submitButton.value : this.submitButton.textContent;
  }
  setSubmitText(t) {
    this.submitButton instanceof HTMLInputElement ? this.submitButton.value = t : this.submitButton.textContent = t;
  }
  get elements() {
    return Array.from(this.form.elements);
  }
}
ze.refs = {}, document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.querySelectorAll("[c-async-form]")).forEach((e) => new ze(e));
});
/*!
* FilePond 4.30.6
* Licensed under MIT, https://opensource.org/licenses/MIT/
* Please visit https://pqina.nl/filepond/ for details.
*/
const Fo = (e) => e instanceof HTMLElement, xo = (e, t = [], r = []) => {
  const n = { ...e }, o = [], s = [], i = () => ({ ...n }), a = () => {
    const E = [...o];
    return o.length = 0, E;
  }, l = () => {
    const E = [...s];
    s.length = 0, E.forEach(({ type: I, data: b }) => {
      d(I, b);
    });
  }, d = (E, I, b) => {
    if (b && !document.hidden) {
      s.push({ type: E, data: I });
      return;
    }
    T[E] && T[E](I), o.push({ type: E, data: I });
  }, p = (E, ...I) => h[E] ? h[E](...I) : null, m = { getState: i, processActionQueue: a, processDispatchQueue: l, dispatch: d, query: p };
  let h = {};
  t.forEach((E) => {
    h = { ...E(n), ...h };
  });
  let T = {};
  return r.forEach((E) => {
    T = { ...E(d, p, n), ...T };
  }), m;
}, ko = (e, t, r) => {
  if (typeof r == "function") {
    e[t] = r;
    return;
  }
  Object.defineProperty(e, t, { ...r });
}, K = (e, t) => {
  for (const r in e)
    e.hasOwnProperty(r) && t(r, e[r]);
}, Ge = (e) => {
  const t = {};
  return K(e, (r) => {
    ko(t, r, e[r]);
  }), t;
}, ne = (e, t, r = null) => {
  if (r === null)
    return e.getAttribute(t) || e.hasAttribute(t);
  e.setAttribute(t, r);
}, qo = "http://www.w3.org/2000/svg", Bo = ["svg", "path"], br = (e) => Bo.includes(e), St = (e, t, r = {}) => {
  typeof t == "object" && (r = t, t = null);
  const n = br(e) ? document.createElementNS(qo, e) : document.createElement(e);
  return t && (br(e) ? ne(n, "class", t) : n.className = t), K(r, (o, s) => {
    ne(n, o, s);
  }), n;
}, Uo = (e) => (t, r) => {
  typeof r < "u" && e.children[r] ? e.insertBefore(t, e.children[r]) : e.appendChild(t);
}, Vo = (e, t) => (r, n) => (typeof n < "u" ? t.splice(n, 0, r) : t.push(r), r), Yo = (e, t) => (r) => (t.splice(t.indexOf(r), 1), r.element.parentNode && e.removeChild(r.element), r), Ho = typeof window < "u" && typeof window.document < "u", Tn = () => Ho, zo = Tn() ? St("svg") : {}, Wo = "children" in zo ? (e) => e.children.length : (e) => e.childNodes.length, _n = (e, t, r, n) => {
  const o = r[0] || e.left, s = r[1] || e.top, i = o + e.width, a = s + e.height * (n[1] || 1), l = { element: { ...e }, inner: { left: e.left, top: e.top, right: e.right, bottom: e.bottom }, outer: { left: o, top: s, right: i, bottom: a } };
  return t.filter((d) => !d.isRectIgnored()).map((d) => d.rect).forEach((d) => {
    Dr(l.inner, { ...d.inner }), Dr(l.outer, { ...d.outer });
  }), wr(l.inner), l.outer.bottom += l.element.marginBottom, l.outer.right += l.element.marginRight, wr(l.outer), l;
}, Dr = (e, t) => {
  t.top += e.top, t.right += e.left, t.bottom += e.top, t.left += e.left, t.bottom > e.bottom && (e.bottom = t.bottom), t.right > e.right && (e.right = t.right);
}, wr = (e) => {
  e.width = e.right - e.left, e.height = e.bottom - e.top;
}, qe = (e) => typeof e == "number", Xo = (e, t, r, n = 1e-3) => Math.abs(e - t) < n && Math.abs(r) < n, $o = ({ stiffness: e = 0.5, damping: t = 0.75, mass: r = 10 } = {}) => {
  let n = null, o = null, s = 0, i = !1;
  const a = Ge({ interpolate: (l, d) => {
    if (i)
      return;
    if (!(qe(n) && qe(o))) {
      i = !0, s = 0;
      return;
    }
    const p = -(o - n) * e;
    s += p / r, o += s, s *= t, Xo(o, n, s) || d ? (o = n, s = 0, i = !0, a.onupdate(o), a.oncomplete(o)) : a.onupdate(o);
  }, target: { set: (l) => {
    if (qe(l) && !qe(o) && (o = l), n === null && (n = l, o = l), n = l, o === n || typeof n > "u") {
      i = !0, s = 0, a.onupdate(o), a.oncomplete(o);
      return;
    }
    i = !1;
  }, get: () => n }, resting: { get: () => i }, onupdate: (l) => {
  }, oncomplete: (l) => {
  } });
  return a;
}, jo = (e) => e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e, Zo = ({ duration: e = 500, easing: t = jo, delay: r = 0 } = {}) => {
  let n = null, o, s, i = !0, a = !1, l = null;
  const d = Ge({ interpolate: (p, m) => {
    i || l === null || (n === null && (n = p), !(p - n < r) && (o = p - n - r, o >= e || m ? (o = 1, s = a ? 0 : 1, d.onupdate(s * l), d.oncomplete(s * l), i = !0) : (s = o / e, d.onupdate((o >= 0 ? t(a ? 1 - s : s) : 0) * l))));
  }, target: { get: () => a ? 0 : l, set: (p) => {
    if (l === null) {
      l = p, d.onupdate(p), d.oncomplete(p);
      return;
    }
    p < l ? (l = 1, a = !0) : (a = !1, l = p), i = !1, n = null;
  } }, resting: { get: () => i }, onupdate: (p) => {
  }, oncomplete: (p) => {
  } });
  return d;
}, Ar = { spring: $o, tween: Zo }, Qo = (e, t, r) => {
  const n = e[t] && typeof e[t][r] == "object" ? e[t][r] : e[t] || e, o = typeof n == "string" ? n : n.type, s = typeof n == "object" ? { ...n } : {};
  return Ar[o] ? Ar[o](s) : null;
}, Kt = (e, t, r, n = !1) => {
  t = Array.isArray(t) ? t : [t], t.forEach((o) => {
    e.forEach((s) => {
      let i = s, a = () => r[s], l = (d) => r[s] = d;
      typeof s == "object" && (i = s.key, a = s.getter || a, l = s.setter || l), !(o[i] && !n) && (o[i] = { get: a, set: l });
    });
  });
}, Ko = ({ mixinConfig: e, viewProps: t, viewInternalAPI: r, viewExternalAPI: n }) => {
  const o = { ...t }, s = [];
  return K(e, (i, a) => {
    const l = Qo(a);
    l && (l.onupdate = (d) => {
      t[i] = d;
    }, l.target = o[i], Kt([{ key: i, setter: (d) => {
      l.target !== d && (l.target = d);
    }, getter: () => t[i] }], [r, n], t, !0), s.push(l));
  }), { write: (i) => {
    let a = document.hidden, l = !0;
    return s.forEach((d) => {
      d.resting || (l = !1), d.interpolate(i, a);
    }), l;
  }, destroy: () => {
  } };
}, Jo = (e) => (t, r) => {
  e.addEventListener(t, r);
}, ei = (e) => (t, r) => {
  e.removeEventListener(t, r);
}, ti = ({ mixinConfig: e, viewProps: t, viewInternalAPI: r, viewExternalAPI: n, viewState: o, view: s }) => {
  const i = [], a = Jo(s.element), l = ei(s.element);
  return n.on = (d, p) => {
    i.push({ type: d, fn: p }), a(d, p);
  }, n.off = (d, p) => {
    i.splice(i.findIndex((m) => m.type === d && m.fn === p), 1), l(d, p);
  }, { write: () => !0, destroy: () => {
    i.forEach((d) => {
      l(d.type, d.fn);
    });
  } };
}, ri = ({ mixinConfig: e, viewProps: t, viewExternalAPI: r }) => {
  Kt(e, r, t);
}, de = (e) => e != null, ni = { opacity: 1, scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, rotateX: 0, rotateY: 0, rotateZ: 0, originX: 0, originY: 0 }, oi = ({ mixinConfig: e, viewProps: t, viewInternalAPI: r, viewExternalAPI: n, view: o }) => {
  const s = { ...t }, i = {};
  Kt(e, [r, n], t);
  const a = () => [t.translateX || 0, t.translateY || 0], l = () => [t.scaleX || 0, t.scaleY || 0], d = () => o.rect ? _n(o.rect, o.childViews, a(), l()) : null;
  return r.rect = { get: d }, n.rect = { get: d }, e.forEach((p) => {
    t[p] = typeof s[p] > "u" ? ni[p] : s[p];
  }), { write: () => {
    if (ii(i, t))
      return si(o.element, t), Object.assign(i, { ...t }), !0;
  }, destroy: () => {
  } };
}, ii = (e, t) => {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !0;
  for (const r in t)
    if (t[r] !== e[r])
      return !0;
  return !1;
}, si = (e, { opacity: t, perspective: r, translateX: n, translateY: o, scaleX: s, scaleY: i, rotateX: a, rotateY: l, rotateZ: d, originX: p, originY: m, width: h, height: T }) => {
  let E = "", I = "";
  (de(p) || de(m)) && (I += `transform-origin: ${p || 0}px ${m || 0}px;`), de(r) && (E += `perspective(${r}px) `), (de(n) || de(o)) && (E += `translate3d(${n || 0}px, ${o || 0}px, 0) `), (de(s) || de(i)) && (E += `scale3d(${de(s) ? s : 1}, ${de(i) ? i : 1}, 1) `), de(d) && (E += `rotateZ(${d}rad) `), de(a) && (E += `rotateX(${a}rad) `), de(l) && (E += `rotateY(${l}rad) `), E.length && (I += `transform:${E};`), de(t) && (I += `opacity:${t};`, t === 0 && (I += "visibility:hidden;"), t < 1 && (I += "pointer-events:none;")), de(T) && (I += `height:${T}px;`), de(h) && (I += `width:${h}px;`);
  const b = e.elementCurrentStyle || "";
  (I.length !== b.length || I !== b) && (e.style.cssText = I, e.elementCurrentStyle = I);
}, ai = { styles: oi, listeners: ti, animations: Ko, apis: ri }, Lr = (e = {}, t = {}, r = {}) => (t.layoutCalculated || (e.paddingTop = parseInt(r.paddingTop, 10) || 0, e.marginTop = parseInt(r.marginTop, 10) || 0, e.marginRight = parseInt(r.marginRight, 10) || 0, e.marginBottom = parseInt(r.marginBottom, 10) || 0, e.marginLeft = parseInt(r.marginLeft, 10) || 0, t.layoutCalculated = !0), e.left = t.offsetLeft || 0, e.top = t.offsetTop || 0, e.width = t.offsetWidth || 0, e.height = t.offsetHeight || 0, e.right = e.left + e.width, e.bottom = e.top + e.height, e.scrollTop = t.scrollTop, e.hidden = t.offsetParent === null, e), oe = ({ tag: e = "div", name: t = null, attributes: r = {}, read: n = () => {
}, write: o = () => {
}, create: s = () => {
}, destroy: i = () => {
}, filterFrameActionsForChild: a = (T, E) => E, didCreateView: l = () => {
}, didWriteView: d = () => {
}, ignoreRect: p = !1, ignoreRectUpdate: m = !1, mixins: h = [] } = {}) => (T, E = {}) => {
  const I = St(e, `filepond--${t}`, r), b = window.getComputedStyle(I, null), v = Lr();
  let D = null, C = !1;
  const N = [], A = [], F = {}, w = {}, L = [o], z = [n], M = [i], q = () => I, Z = () => N.concat(), Q = () => F, O = (Y) => (j, Me) => j(Y, Me), W = () => D || (D = _n(v, N, [0, 0], [1, 1]), D), y = () => b, R = () => {
    D = null, N.forEach((j) => j._read()), !(m && v.width && v.height) && Lr(v, I, b);
    const Y = { root: ve, props: E, rect: v };
    z.forEach((j) => j(Y));
  }, P = (Y, j, Me) => {
    let Pe = j.length === 0;
    return L.forEach((le) => {
      le({ props: E, root: ve, actions: j, timestamp: Y, shouldOptimize: Me }) === !1 && (Pe = !1);
    }), A.forEach((le) => {
      le.write(Y) === !1 && (Pe = !1);
    }), N.filter((le) => !!le.element.parentNode).forEach((le) => {
      le._write(Y, a(le, j), Me) || (Pe = !1);
    }), N.forEach((le, xe) => {
      le.element.parentNode || (ve.appendChild(le.element, xe), le._read(), le._write(Y, a(le, j), Me), Pe = !1);
    }), C = Pe, d({ props: E, root: ve, actions: j, timestamp: Y }), Pe;
  }, x = () => {
    A.forEach((Y) => Y.destroy()), M.forEach((Y) => {
      Y({ root: ve, props: E });
    }), N.forEach((Y) => Y._destroy());
  }, V = { element: { get: q }, style: { get: y }, childViews: { get: Z } }, fe = { ...V, rect: { get: W }, ref: { get: Q }, is: (Y) => t === Y, appendChild: Uo(I), createChildView: O(T), linkView: (Y) => (N.push(Y), Y), unlinkView: (Y) => {
    N.splice(N.indexOf(Y), 1);
  }, appendChildView: Vo(I, N), removeChildView: Yo(I, N), registerWriter: (Y) => L.push(Y), registerReader: (Y) => z.push(Y), registerDestroyer: (Y) => M.push(Y), invalidateLayout: () => I.layoutCalculated = !1, dispatch: T.dispatch, query: T.query }, Fe = { element: { get: q }, childViews: { get: Z }, rect: { get: W }, resting: { get: () => C }, isRectIgnored: () => p, _read: R, _write: P, _destroy: x }, Nt = { ...V, rect: { get: () => v } };
  Object.keys(h).sort((Y, j) => Y === "styles" ? 1 : j === "styles" ? -1 : 0).forEach((Y) => {
    const j = ai[Y]({ mixinConfig: h[Y], viewProps: E, viewState: w, viewInternalAPI: fe, viewExternalAPI: Fe, view: Ge(Nt) });
    j && A.push(j);
  });
  const ve = Ge(fe);
  s({ root: ve, props: E });
  const Gt = Wo(I);
  return N.forEach((Y, j) => {
    ve.appendChild(Y.element, Gt + j);
  }), l(ve), Ge(Fe);
}, li = (e, t, r = 60) => {
  const n = "__framePainter";
  if (window[n]) {
    window[n].readers.push(e), window[n].writers.push(t);
    return;
  }
  window[n] = { readers: [e], writers: [t] };
  const o = window[n], s = 1e3 / r;
  let i = null, a = null, l = null, d = null;
  const p = () => {
    document.hidden ? (l = () => window.setTimeout(() => m(performance.now()), s), d = () => window.clearTimeout(a)) : (l = () => window.requestAnimationFrame(m), d = () => window.cancelAnimationFrame(a));
  };
  document.addEventListener("visibilitychange", () => {
    d && d(), p(), m(performance.now());
  });
  const m = (h) => {
    a = l(m), i || (i = h);
    const T = h - i;
    T <= s || (i = h - T % s, o.readers.forEach((E) => E()), o.writers.forEach((E) => E(h)));
  };
  return p(), m(performance.now()), { pause: () => {
    d(a);
  } };
}, pe = (e, t) => ({ root: r, props: n, actions: o = [], timestamp: s, shouldOptimize: i }) => {
  o.filter((a) => e[a.type]).forEach((a) => e[a.type]({ root: r, props: n, action: a.data, timestamp: s, shouldOptimize: i })), t && t({ root: r, props: n, actions: o, timestamp: s, shouldOptimize: i });
}, Mr = (e, t) => t.parentNode.insertBefore(e, t), Pr = (e, t) => t.parentNode.insertBefore(e, t.nextSibling), Dt = (e) => Array.isArray(e), Ae = (e) => e == null, ci = (e) => e.trim(), wt = (e) => "" + e, di = (e, t = ",") => Ae(e) ? [] : Dt(e) ? e : wt(e).split(t).map(ci).filter((r) => r.length), In = (e) => typeof e == "boolean", gn = (e) => In(e) ? e : e === "true", ue = (e) => typeof e == "string", yn = (e) => qe(e) ? e : ue(e) ? wt(e).replace(/[a-z]+/gi, "") : 0, gt = (e) => parseInt(yn(e), 10), Cr = (e) => parseFloat(yn(e)), tt = (e) => qe(e) && isFinite(e) && Math.floor(e) === e, Nr = (e, t = 1e3) => {
  if (tt(e))
    return e;
  let r = wt(e).trim();
  return /MB$/i.test(r) ? (r = r.replace(/MB$i/, "").trim(), gt(r) * t * t) : /KB/i.test(r) ? (r = r.replace(/KB$i/, "").trim(), gt(r) * t) : gt(r);
}, Be = (e) => typeof e == "function", ui = (e) => {
  let t = self, r = e.split("."), n = null;
  for (; n = r.shift(); )
    if (t = t[n], !t)
      return null;
  return t;
}, Gr = { process: "POST", patch: "PATCH", revert: "DELETE", fetch: "GET", restore: "GET", load: "GET" }, pi = (e) => {
  const t = {};
  return t.url = ue(e) ? e : e.url || "", t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0, t.headers = e.headers ? e.headers : {}, K(Gr, (r) => {
    t[r] = fi(r, e[r], Gr[r], t.timeout, t.headers);
  }), t.process = e.process || ue(e) || e.url ? t.process : null, t.remove = e.remove || null, delete t.headers, t;
}, fi = (e, t, r, n, o) => {
  if (t === null)
    return null;
  if (typeof t == "function")
    return t;
  const s = { url: r === "GET" || r === "PATCH" ? `?${e}=` : "", method: r, headers: o, withCredentials: !1, timeout: n, onload: null, ondata: null, onerror: null };
  if (ue(t))
    return s.url = t, s;
  if (Object.assign(s, t), ue(s.headers)) {
    const i = s.headers.split(/:(.+)/);
    s.headers = { header: i[0], value: i[1] };
  }
  return s.withCredentials = gn(s.withCredentials), s;
}, Ei = (e) => pi(e), hi = (e) => e === null, se = (e) => typeof e == "object" && e !== null, mi = (e) => se(e) && ue(e.url) && se(e.process) && se(e.revert) && se(e.restore) && se(e.fetch), Yt = (e) => Dt(e) ? "array" : hi(e) ? "null" : tt(e) ? "int" : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e) ? "bytes" : mi(e) ? "api" : typeof e, Ti = (e) => e.replace(/{\s*'/g, '{"').replace(/'\s*}/g, '"}').replace(/'\s*:/g, '":').replace(/:\s*'/g, ':"').replace(/,\s*'/g, ',"').replace(/'\s*,/g, '",'), _i = { array: di, boolean: gn, int: (e) => Yt(e) === "bytes" ? Nr(e) : gt(e), number: Cr, float: Cr, bytes: Nr, string: (e) => Be(e) ? e : wt(e), function: (e) => ui(e), serverapi: Ei, object: (e) => {
  try {
    return JSON.parse(Ti(e));
  } catch {
    return null;
  }
} }, Ii = (e, t) => _i[t](e), Sn = (e, t, r) => {
  if (e === t)
    return e;
  let n = Yt(e);
  if (n !== r) {
    const o = Ii(e, r);
    if (n = Yt(o), o === null)
      throw `Trying to assign value with incorrect type to "${option}", allowed type: "${r}"`;
    e = o;
  }
  return e;
}, gi = (e, t) => {
  let r = e;
  return { enumerable: !0, get: () => r, set: (n) => {
    r = Sn(n, e, t);
  } };
}, yi = (e) => {
  const t = {};
  return K(e, (r) => {
    const n = e[r];
    t[r] = gi(n[0], n[1]);
  }), Ge(t);
}, Si = (e) => ({ items: [], listUpdateTimeout: null, itemUpdateTimeout: null, processingQueue: [], options: yi(e) }), At = (e, t = "-") => e.split(/(?=[A-Z])/).map((r) => r.toLowerCase()).join(t), Ri = (e, t) => {
  const r = {};
  return K(t, (n) => {
    r[n] = { get: () => e.getState().options[n], set: (o) => {
      e.dispatch(`SET_${At(n, "_").toUpperCase()}`, { value: o });
    } };
  }), r;
}, vi = (e) => (t, r, n) => {
  const o = {};
  return K(e, (s) => {
    const i = At(s, "_").toUpperCase();
    o[`SET_${i}`] = (a) => {
      try {
        n.options[s] = a.value;
      } catch {
      }
      t(`DID_SET_${i}`, { value: n.options[s] });
    };
  }), o;
}, Oi = (e) => (t) => {
  const r = {};
  return K(e, (n) => {
    r[`GET_${At(n, "_").toUpperCase()}`] = (o) => t.options[n];
  }), r;
}, Ie = { API: 1, DROP: 2, BROWSE: 3, PASTE: 4, NONE: 5 }, Jt = () => Math.random().toString(36).substring(2, 11), er = (e, t) => e.splice(t, 1), bi = (e, t) => {
  t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0);
}, Lt = () => {
  const e = [], t = (n, o) => {
    er(e, e.findIndex((s) => s.event === n && (s.cb === o || !o)));
  }, r = (n, o, s) => {
    e.filter((i) => i.event === n).map((i) => i.cb).forEach((i) => bi(() => i(...o), s));
  };
  return { fireSync: (n, ...o) => {
    r(n, o, !0);
  }, fire: (n, ...o) => {
    r(n, o, !1);
  }, on: (n, o) => {
    e.push({ event: n, cb: o });
  }, onOnce: (n, o) => {
    e.push({ event: n, cb: (...s) => {
      t(n, o), o(...s);
    } });
  }, off: t };
}, Rn = (e, t, r) => {
  Object.getOwnPropertyNames(e).filter((n) => !r.includes(n)).forEach((n) => Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n)));
}, Di = ["fire", "process", "revert", "load", "on", "off", "onOnce", "retryLoad", "extend", "archive", "archived", "release", "released", "requestProcessing", "freeze"], Ee = (e) => {
  const t = {};
  return Rn(e, t, Di), t;
}, wi = (e) => {
  e.forEach((t, r) => {
    t.released && er(e, r);
  });
}, U = { INIT: 1, IDLE: 2, PROCESSING_QUEUED: 9, PROCESSING: 3, PROCESSING_COMPLETE: 5, PROCESSING_ERROR: 6, PROCESSING_REVERT_ERROR: 10, LOADING: 7, LOAD_ERROR: 8 }, ie = { INPUT: 1, LIMBO: 2, LOCAL: 3 }, vn = (e) => /[^0-9]+/.exec(e), On = () => vn(1.1.toLocaleString())[0], Ai = () => {
  const e = On(), t = 1e3.toLocaleString();
  return t !== "1000" ? vn(t)[0] : e === "." ? "," : ".";
}, g = { BOOLEAN: "boolean", INT: "int", NUMBER: "number", STRING: "string", ARRAY: "array", OBJECT: "object", FUNCTION: "function", ACTION: "action", SERVER_API: "serverapi", REGEX: "regex" }, tr = [], ye = (e, t, r) => new Promise((n, o) => {
  const s = tr.filter((a) => a.key === e).map((a) => a.cb);
  if (s.length === 0) {
    n(t);
    return;
  }
  const i = s.shift();
  s.reduce((a, l) => a.then((d) => l(d, r)), i(t, r)).then((a) => n(a)).catch((a) => o(a));
}), We = (e, t, r) => tr.filter((n) => n.key === e).map((n) => n.cb(t, r)), Li = (e, t) => tr.push({ key: e, cb: t }), Mi = (e) => Object.assign(je, e), Rt = () => ({ ...je }), Pi = (e) => {
  K(e, (t, r) => {
    je[t] && (je[t][0] = Sn(r, je[t][0], je[t][1]));
  });
}, je = { id: [null, g.STRING], name: ["filepond", g.STRING], disabled: [!1, g.BOOLEAN], className: [null, g.STRING], required: [!1, g.BOOLEAN], captureMethod: [null, g.STRING], allowSyncAcceptAttribute: [!0, g.BOOLEAN], allowDrop: [!0, g.BOOLEAN], allowBrowse: [!0, g.BOOLEAN], allowPaste: [!0, g.BOOLEAN], allowMultiple: [!1, g.BOOLEAN], allowReplace: [!0, g.BOOLEAN], allowRevert: [!0, g.BOOLEAN], allowRemove: [!0, g.BOOLEAN], allowProcess: [!0, g.BOOLEAN], allowReorder: [!1, g.BOOLEAN], allowDirectoriesOnly: [!1, g.BOOLEAN], storeAsFile: [!1, g.BOOLEAN], forceRevert: [!1, g.BOOLEAN], maxFiles: [null, g.INT], checkValidity: [!1, g.BOOLEAN], itemInsertLocationFreedom: [!0, g.BOOLEAN], itemInsertLocation: ["before", g.STRING], itemInsertInterval: [75, g.INT], dropOnPage: [!1, g.BOOLEAN], dropOnElement: [!0, g.BOOLEAN], dropValidation: [!1, g.BOOLEAN], ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], g.ARRAY], instantUpload: [!0, g.BOOLEAN], maxParallelUploads: [2, g.INT], allowMinimumUploadDuration: [!0, g.BOOLEAN], chunkUploads: [!1, g.BOOLEAN], chunkForce: [!1, g.BOOLEAN], chunkSize: [5e6, g.INT], chunkRetryDelays: [[500, 1e3, 3e3], g.ARRAY], server: [null, g.SERVER_API], fileSizeBase: [1e3, g.INT], labelFileSizeBytes: ["bytes", g.STRING], labelFileSizeKilobytes: ["KB", g.STRING], labelFileSizeMegabytes: ["MB", g.STRING], labelFileSizeGigabytes: ["GB", g.STRING], labelDecimalSeparator: [On(), g.STRING], labelThousandsSeparator: [Ai(), g.STRING], labelIdle: ['Drag & Drop your files or <span class="filepond--label-action">Browse</span>', g.STRING], labelInvalidField: ["Field contains invalid files", g.STRING], labelFileWaitingForSize: ["Waiting for size", g.STRING], labelFileSizeNotAvailable: ["Size not available", g.STRING], labelFileCountSingular: ["file in list", g.STRING], labelFileCountPlural: ["files in list", g.STRING], labelFileLoading: ["Loading", g.STRING], labelFileAdded: ["Added", g.STRING], labelFileLoadError: ["Error during load", g.STRING], labelFileRemoved: ["Removed", g.STRING], labelFileRemoveError: ["Error during remove", g.STRING], labelFileProcessing: ["Uploading", g.STRING], labelFileProcessingComplete: ["Upload complete", g.STRING], labelFileProcessingAborted: ["Upload cancelled", g.STRING], labelFileProcessingError: ["Error during upload", g.STRING], labelFileProcessingRevertError: ["Error during revert", g.STRING], labelTapToCancel: ["tap to cancel", g.STRING], labelTapToRetry: ["tap to retry", g.STRING], labelTapToUndo: ["tap to undo", g.STRING], labelButtonRemoveItem: ["Remove", g.STRING], labelButtonAbortItemLoad: ["Abort", g.STRING], labelButtonRetryItemLoad: ["Retry", g.STRING], labelButtonAbortItemProcessing: ["Cancel", g.STRING], labelButtonUndoItemProcessing: ["Undo", g.STRING], labelButtonRetryItemProcessing: ["Retry", g.STRING], labelButtonProcessItem: ["Upload", g.STRING], iconRemove: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], iconProcess: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>', g.STRING], iconRetry: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], iconUndo: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], iconDone: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], oninit: [null, g.FUNCTION], onwarning: [null, g.FUNCTION], onerror: [null, g.FUNCTION], onactivatefile: [null, g.FUNCTION], oninitfile: [null, g.FUNCTION], onaddfilestart: [null, g.FUNCTION], onaddfileprogress: [null, g.FUNCTION], onaddfile: [null, g.FUNCTION], onprocessfilestart: [null, g.FUNCTION], onprocessfileprogress: [null, g.FUNCTION], onprocessfileabort: [null, g.FUNCTION], onprocessfilerevert: [null, g.FUNCTION], onprocessfile: [null, g.FUNCTION], onprocessfiles: [null, g.FUNCTION], onremovefile: [null, g.FUNCTION], onpreparefile: [null, g.FUNCTION], onupdatefiles: [null, g.FUNCTION], onreorderfiles: [null, g.FUNCTION], beforeDropFile: [null, g.FUNCTION], beforeAddFile: [null, g.FUNCTION], beforeRemoveFile: [null, g.FUNCTION], beforePrepareFile: [null, g.FUNCTION], stylePanelLayout: [null, g.STRING], stylePanelAspectRatio: [null, g.STRING], styleItemPanelAspectRatio: [null, g.STRING], styleButtonRemoveItemPosition: ["left", g.STRING], styleButtonProcessItemPosition: ["right", g.STRING], styleLoadIndicatorPosition: ["right", g.STRING], styleProgressIndicatorPosition: ["right", g.STRING], styleButtonRemoveItemAlign: [!1, g.BOOLEAN], files: [[], g.ARRAY], credits: [["https://pqina.nl/", "Powered by PQINA"], g.ARRAY] }, Ue = (e, t) => Ae(t) ? e[0] || null : tt(t) ? e[t] || null : (typeof t == "object" && (t = t.id), e.find((r) => r.id === t) || null), bn = (e) => {
  if (Ae(e))
    return e;
  if (/:/.test(e)) {
    const t = e.split(":");
    return t[1] / t[0];
  }
  return parseFloat(e);
}, Se = (e) => e.filter((t) => !t.archived), Dn = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 };
let Et = null;
const Ci = () => {
  if (Et === null)
    try {
      const e = new DataTransfer();
      e.items.add(new File(["hello world"], "This_Works.txt"));
      const t = document.createElement("input");
      t.setAttribute("type", "file"), t.files = e.files, Et = t.files.length === 1;
    } catch {
      Et = !1;
    }
  return Et;
}, Ni = [U.LOAD_ERROR, U.PROCESSING_ERROR, U.PROCESSING_REVERT_ERROR], Gi = [U.LOADING, U.PROCESSING, U.PROCESSING_QUEUED, U.INIT], Fi = [U.PROCESSING_COMPLETE], xi = (e) => Ni.includes(e.status), ki = (e) => Gi.includes(e.status), qi = (e) => Fi.includes(e.status), Fr = (e) => se(e.options.server) && (se(e.options.server.process) || Be(e.options.server.process)), Bi = (e) => ({ GET_STATUS: () => {
  const t = Se(e.items), { EMPTY: r, ERROR: n, BUSY: o, IDLE: s, READY: i } = Dn;
  return t.length === 0 ? r : t.some(xi) ? n : t.some(ki) ? o : t.some(qi) ? i : s;
}, GET_ITEM: (t) => Ue(e.items, t), GET_ACTIVE_ITEM: (t) => Ue(Se(e.items), t), GET_ACTIVE_ITEMS: () => Se(e.items), GET_ITEMS: () => e.items, GET_ITEM_NAME: (t) => {
  const r = Ue(e.items, t);
  return r ? r.filename : null;
}, GET_ITEM_SIZE: (t) => {
  const r = Ue(e.items, t);
  return r ? r.fileSize : null;
}, GET_STYLES: () => Object.keys(e.options).filter((t) => /^style/.test(t)).map((t) => ({ name: t, value: e.options[t] })), GET_PANEL_ASPECT_RATIO: () => /circle/.test(e.options.stylePanelLayout) ? 1 : bn(e.options.stylePanelAspectRatio), GET_ITEM_PANEL_ASPECT_RATIO: () => e.options.styleItemPanelAspectRatio, GET_ITEMS_BY_STATUS: (t) => Se(e.items).filter((r) => r.status === t), GET_TOTAL_ITEMS: () => Se(e.items).length, SHOULD_UPDATE_FILE_INPUT: () => e.options.storeAsFile && Ci() && !Fr(e), IS_ASYNC: () => Fr(e), GET_FILE_SIZE_LABELS: (t) => ({ labelBytes: t("GET_LABEL_FILE_SIZE_BYTES") || void 0, labelKilobytes: t("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0, labelMegabytes: t("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0, labelGigabytes: t("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0 }) }), Ui = (e) => {
  const t = Se(e.items).length;
  if (!e.options.allowMultiple)
    return t === 0;
  const r = e.options.maxFiles;
  return r === null || t < r;
}, wn = (e, t, r) => Math.max(Math.min(r, e), t), Vi = (e, t, r) => e.splice(t, 0, r), Yi = (e, t, r) => Ae(t) ? null : typeof r > "u" ? (e.push(t), t) : (r = wn(r, 0, e.length), Vi(e, r, t), t), Ht = (e) => /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(e), ut = (e) => `${e}`.split("/").pop().split("?").shift(), Mt = (e) => e.split(".").pop(), Hi = (e) => {
  if (typeof e != "string")
    return "";
  const t = e.split("/").pop();
  return /svg/.test(t) ? "svg" : /zip|compressed/.test(t) ? "zip" : /plain/.test(t) ? "txt" : /msword/.test(t) ? "doc" : /[a-z]+/.test(t) ? t === "jpeg" ? "jpg" : t : "";
}, at = (e, t = "") => (t + e).slice(-t.length), An = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${at(e.getMonth() + 1, "00")}-${at(e.getDate(), "00")}_${at(e.getHours(), "00")}-${at(e.getMinutes(), "00")}-${at(e.getSeconds(), "00")}`, Ke = (e, t, r = null, n = null) => {
  const o = typeof r == "string" ? e.slice(0, e.size, r) : e.slice(0, e.size, e.type);
  return o.lastModifiedDate = /* @__PURE__ */ new Date(), e._relativePath && (o._relativePath = e._relativePath), ue(t) || (t = An()), t && n === null && Mt(t) ? o.name = t : (n = n || Hi(o.type), o.name = t + (n ? "." + n : "")), o;
}, zi = () => window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, Ln = (e, t) => {
  const r = zi();
  if (r) {
    const n = new r();
    return n.append(e), n.getBlob(t);
  }
  return new Blob([e], { type: t });
}, Wi = (e, t) => {
  const r = new ArrayBuffer(e.length), n = new Uint8Array(r);
  for (let o = 0; o < e.length; o++)
    n[o] = e.charCodeAt(o);
  return Ln(r, t);
}, Mn = (e) => (/^data:(.+);/.exec(e) || [])[1] || null, Xi = (e) => e.split(",")[1].replace(/\s/g, ""), $i = (e) => atob(Xi(e)), ji = (e) => {
  const t = Mn(e), r = $i(e);
  return Wi(r, t);
}, Zi = (e, t, r) => Ke(ji(e), t, null, r), Qi = (e) => {
  if (!/^content-disposition:/i.test(e))
    return null;
  const t = e.split(/filename=|filename\*=.+''/).splice(1).map((r) => r.trim().replace(/^["']|[;"']{0,2}$/g, "")).filter((r) => r.length);
  return t.length ? decodeURI(t[t.length - 1]) : null;
}, Ki = (e) => {
  if (/content-length:/i.test(e)) {
    const t = e.match(/[0-9]+/)[0];
    return t ? parseInt(t, 10) : null;
  }
  return null;
}, Ji = (e) => /x-content-transfer-id:/i.test(e) && (e.split(":")[1] || "").trim() || null, rr = (e) => {
  const t = { source: null, name: null, size: null }, r = e.split(`
`);
  for (let n of r) {
    const o = Qi(n);
    if (o) {
      t.name = o;
      continue;
    }
    const s = Ki(n);
    if (s) {
      t.size = s;
      continue;
    }
    const i = Ji(n);
    if (i) {
      t.source = i;
      continue;
    }
  }
  return t;
}, es = (e) => {
  const t = { source: null, complete: !1, progress: 0, size: null, timestamp: null, duration: 0, request: null }, r = () => t.progress, n = () => {
    t.request && t.request.abort && t.request.abort();
  }, o = () => {
    const a = t.source;
    i.fire("init", a), a instanceof File ? i.fire("load", a) : a instanceof Blob ? i.fire("load", Ke(a, a.name)) : Ht(a) ? i.fire("load", Zi(a)) : s(a);
  }, s = (a) => {
    if (!e) {
      i.fire("error", { type: "error", body: "Can't load URL", code: 400 });
      return;
    }
    t.timestamp = Date.now(), t.request = e(a, (l) => {
      t.duration = Date.now() - t.timestamp, t.complete = !0, l instanceof Blob && (l = Ke(l, l.name || ut(a))), i.fire("load", l instanceof Blob ? l : l ? l.body : null);
    }, (l) => {
      i.fire("error", typeof l == "string" ? { type: "error", code: 0, body: l } : l);
    }, (l, d, p) => {
      if (p && (t.size = p), t.duration = Date.now() - t.timestamp, !l) {
        t.progress = null;
        return;
      }
      t.progress = d / p, i.fire("progress", t.progress);
    }, () => {
      i.fire("abort");
    }, (l) => {
      const d = rr(typeof l == "string" ? l : l.headers);
      i.fire("meta", { size: t.size || d.size, filename: d.name, source: d.source });
    });
  }, i = { ...Lt(), setSource: (a) => t.source = a, getProgress: r, abort: n, load: o };
  return i;
}, xr = (e) => /GET|HEAD/.test(e), Ve = (e, t, r) => {
  const n = { onheaders: () => {
  }, onprogress: () => {
  }, onload: () => {
  }, ontimeout: () => {
  }, onerror: () => {
  }, onabort: () => {
  }, abort: () => {
    o = !0, i.abort();
  } };
  let o = !1, s = !1;
  r = { method: "POST", headers: {}, withCredentials: !1, ...r }, t = encodeURI(t), xr(r.method) && e && (t = `${t}${encodeURIComponent(typeof e == "string" ? e : JSON.stringify(e))}`);
  const i = new XMLHttpRequest(), a = xr(r.method) ? i : i.upload;
  return a.onprogress = (l) => {
    o || n.onprogress(l.lengthComputable, l.loaded, l.total);
  }, i.onreadystatechange = () => {
    i.readyState < 2 || i.readyState === 4 && i.status === 0 || s || (s = !0, n.onheaders(i));
  }, i.onload = () => {
    i.status >= 200 && i.status < 300 ? n.onload(i) : n.onerror(i);
  }, i.onerror = () => n.onerror(i), i.onabort = () => {
    o = !0, n.onabort();
  }, i.ontimeout = () => n.ontimeout(i), i.open(r.method, t, !0), tt(r.timeout) && (i.timeout = r.timeout), Object.keys(r.headers).forEach((l) => {
    const d = unescape(encodeURIComponent(r.headers[l]));
    i.setRequestHeader(l, d);
  }), r.responseType && (i.responseType = r.responseType), r.withCredentials && (i.withCredentials = !0), i.send(e), n;
}, J = (e, t, r, n) => ({ type: e, code: t, body: r, headers: n }), Ye = (e) => (t) => {
  e(J("error", 0, "Timeout", t.getAllResponseHeaders()));
}, kr = (e) => /\?/.test(e), dt = (...e) => {
  let t = "";
  return e.forEach((r) => {
    t += kr(t) && kr(r) ? r.replace(/\?/, "&") : r;
  }), t;
}, Ft = (e = "", t) => {
  if (typeof t == "function")
    return t;
  if (!t || !ue(t.url))
    return null;
  const r = t.onload || ((o) => o), n = t.onerror || ((o) => null);
  return (o, s, i, a, l, d) => {
    const p = Ve(o, dt(e, t.url), { ...t, responseType: "blob" });
    return p.onload = (m) => {
      const h = m.getAllResponseHeaders(), T = rr(h).name || ut(o);
      s(J("load", m.status, t.method === "HEAD" ? null : Ke(r(m.response), T), h));
    }, p.onerror = (m) => {
      i(J("error", m.status, n(m.response) || m.statusText, m.getAllResponseHeaders()));
    }, p.onheaders = (m) => {
      d(J("headers", m.status, null, m.getAllResponseHeaders()));
    }, p.ontimeout = Ye(i), p.onprogress = a, p.onabort = l, p;
  };
}, Te = { QUEUED: 0, COMPLETE: 1, PROCESSING: 2, ERROR: 3, WAITING: 4 }, ts = (e, t, r, n, o, s, i, a, l, d, p) => {
  const m = [], { chunkTransferId: h, chunkServer: T, chunkSize: E, chunkRetryDelays: I } = p, b = { serverId: h, aborted: !1 }, v = t.ondata || ((O) => O), D = t.onload || ((O, W) => W === "HEAD" ? O.getResponseHeader("Upload-Offset") : O.response), C = t.onerror || ((O) => null), N = (O) => {
    const W = new FormData();
    se(o) && W.append(r, JSON.stringify(o));
    const y = typeof t.headers == "function" ? t.headers(n, o) : { ...t.headers, "Upload-Length": n.size }, R = { ...t, headers: y }, P = Ve(v(W), dt(e, t.url), R);
    P.onload = (x) => O(D(x, R.method)), P.onerror = (x) => i(J("error", x.status, C(x.response) || x.statusText, x.getAllResponseHeaders())), P.ontimeout = Ye(i);
  }, A = (O) => {
    const W = dt(e, T.url, b.serverId), y = { headers: typeof t.headers == "function" ? t.headers(b.serverId) : { ...t.headers }, method: "HEAD" }, R = Ve(null, W, y);
    R.onload = (P) => O(D(P, y.method)), R.onerror = (P) => i(J("error", P.status, C(P.response) || P.statusText, P.getAllResponseHeaders())), R.ontimeout = Ye(i);
  }, F = Math.floor(n.size / E);
  for (let O = 0; O <= F; O++) {
    const W = O * E, y = n.slice(W, W + E, "application/offset+octet-stream");
    m[O] = { index: O, size: y.size, offset: W, data: y, file: n, progress: 0, retries: [...I], status: Te.QUEUED, error: null, request: null, timeout: null };
  }
  const w = () => s(b.serverId), L = (O) => O.status === Te.QUEUED || O.status === Te.ERROR, z = (O) => {
    if (b.aborted)
      return;
    if (O = O || m.find(L), !O) {
      m.every((V) => V.status === Te.COMPLETE) && w();
      return;
    }
    O.status = Te.PROCESSING, O.progress = null;
    const W = T.ondata || ((V) => V), y = T.onerror || ((V) => null), R = dt(e, T.url, b.serverId), P = typeof T.headers == "function" ? T.headers(O) : { ...T.headers, "Content-Type": "application/offset+octet-stream", "Upload-Offset": O.offset, "Upload-Length": n.size, "Upload-Name": n.name }, x = O.request = Ve(W(O.data), R, { ...T, headers: P });
    x.onload = () => {
      O.status = Te.COMPLETE, O.request = null, Z();
    }, x.onprogress = (V, fe, Fe) => {
      O.progress = V ? fe : null, q();
    }, x.onerror = (V) => {
      O.status = Te.ERROR, O.request = null, O.error = y(V.response) || V.statusText, M(O) || i(J("error", V.status, y(V.response) || V.statusText, V.getAllResponseHeaders()));
    }, x.ontimeout = (V) => {
      O.status = Te.ERROR, O.request = null, M(O) || Ye(i)(V);
    }, x.onabort = () => {
      O.status = Te.QUEUED, O.request = null, l();
    };
  }, M = (O) => O.retries.length === 0 ? !1 : (O.status = Te.WAITING, clearTimeout(O.timeout), O.timeout = setTimeout(() => {
    z(O);
  }, O.retries.shift()), !0), q = () => {
    const O = m.reduce((y, R) => y === null || R.progress === null ? null : y + R.progress, 0);
    if (O === null)
      return a(!1, 0, 0);
    const W = m.reduce((y, R) => y + R.size, 0);
    a(!0, O, W);
  }, Z = () => {
    m.filter((O) => O.status === Te.PROCESSING).length >= 1 || z();
  }, Q = () => {
    m.forEach((O) => {
      clearTimeout(O.timeout), O.request && O.request.abort();
    });
  };
  return b.serverId ? A((O) => {
    b.aborted || (m.filter((W) => W.offset < O).forEach((W) => {
      W.status = Te.COMPLETE, W.progress = W.size;
    }), Z());
  }) : N((O) => {
    b.aborted || (d(O), b.serverId = O, Z());
  }), { abort: () => {
    b.aborted = !0, Q();
  } };
}, rs = (e, t, r, n) => (o, s, i, a, l, d, p) => {
  if (!o)
    return;
  const m = n.chunkUploads, h = m && o.size > n.chunkSize, T = m && (h || n.chunkForce);
  if (o instanceof Blob && T)
    return ts(e, t, r, o, s, i, a, l, d, p, n);
  const E = t.ondata || ((A) => A), I = t.onload || ((A) => A), b = t.onerror || ((A) => null), v = typeof t.headers == "function" ? t.headers(o, s) || {} : { ...t.headers }, D = { ...t, headers: v };
  var C = new FormData();
  se(s) && C.append(r, JSON.stringify(s)), (o instanceof Blob ? [{ name: null, file: o }] : o).forEach((A) => {
    C.append(r, A.file, A.name === null ? A.file.name : `${A.name}${A.file.name}`);
  });
  const N = Ve(E(C), dt(e, t.url), D);
  return N.onload = (A) => {
    i(J("load", A.status, I(A.response), A.getAllResponseHeaders()));
  }, N.onerror = (A) => {
    a(J("error", A.status, b(A.response) || A.statusText, A.getAllResponseHeaders()));
  }, N.ontimeout = Ye(a), N.onprogress = l, N.onabort = d, N;
}, ns = (e = "", t, r, n) => typeof t == "function" ? (...o) => t(r, ...o, n) : !t || !ue(t.url) ? null : rs(e, t, r, n), lt = (e = "", t) => {
  if (typeof t == "function")
    return t;
  if (!t || !ue(t.url))
    return (o, s) => s();
  const r = t.onload || ((o) => o), n = t.onerror || ((o) => null);
  return (o, s, i) => {
    const a = Ve(o, e + t.url, t);
    return a.onload = (l) => {
      s(J("load", l.status, r(l.response), l.getAllResponseHeaders()));
    }, a.onerror = (l) => {
      i(J("error", l.status, n(l.response) || l.statusText, l.getAllResponseHeaders()));
    }, a.ontimeout = Ye(i), a;
  };
}, Pn = (e = 0, t = 1) => e + Math.random() * (t - e), os = (e, t = 1e3, r = 0, n = 25, o = 250) => {
  let s = null;
  const i = Date.now(), a = () => {
    let l = Date.now() - i, d = Pn(n, o);
    l + d > t && (d = l + d - t);
    let p = l / t;
    if (p >= 1 || document.hidden) {
      e(1);
      return;
    }
    e(p), s = setTimeout(a, d);
  };
  return t > 0 && a(), { clear: () => {
    clearTimeout(s);
  } };
}, is = (e, t) => {
  const r = { complete: !1, perceivedProgress: 0, perceivedPerformanceUpdater: null, progress: null, timestamp: null, perceivedDuration: 0, duration: 0, request: null, response: null }, { allowMinimumUploadDuration: n } = t, o = (p, m) => {
    const h = () => {
      r.duration === 0 || r.progress === null || d.fire("progress", d.getProgress());
    }, T = () => {
      r.complete = !0, d.fire("load-perceived", r.response.body);
    };
    d.fire("start"), r.timestamp = Date.now(), r.perceivedPerformanceUpdater = os((E) => {
      r.perceivedProgress = E, r.perceivedDuration = Date.now() - r.timestamp, h(), r.response && r.perceivedProgress === 1 && !r.complete && T();
    }, n ? Pn(750, 1500) : 0), r.request = e(p, m, (E) => {
      r.response = se(E) ? E : { type: "load", code: 200, body: `${E}`, headers: {} }, r.duration = Date.now() - r.timestamp, r.progress = 1, d.fire("load", r.response.body), (!n || n && r.perceivedProgress === 1) && T();
    }, (E) => {
      r.perceivedPerformanceUpdater.clear(), d.fire("error", se(E) ? E : { type: "error", code: 0, body: `${E}` });
    }, (E, I, b) => {
      r.duration = Date.now() - r.timestamp, r.progress = E ? I / b : null, h();
    }, () => {
      r.perceivedPerformanceUpdater.clear(), d.fire("abort", r.response ? r.response.body : null);
    }, (E) => {
      d.fire("transfer", E);
    });
  }, s = () => {
    r.request && (r.perceivedPerformanceUpdater.clear(), r.request.abort && r.request.abort(), r.complete = !0);
  }, i = () => {
    s(), r.complete = !1, r.perceivedProgress = 0, r.progress = 0, r.timestamp = null, r.perceivedDuration = 0, r.duration = 0, r.request = null, r.response = null;
  }, a = n ? () => r.progress ? Math.min(r.progress, r.perceivedProgress) : null : () => r.progress || null, l = n ? () => Math.min(r.duration, r.perceivedDuration) : () => r.duration, d = { ...Lt(), process: o, abort: s, getProgress: a, getDuration: l, reset: i };
  return d;
}, Cn = (e) => e.substring(0, e.lastIndexOf(".")) || e, ss = (e) => {
  let t = [e.name, e.size, e.type];
  return e instanceof Blob || Ht(e) ? t[0] = e.name || An() : Ht(e) ? (t[1] = e.length, t[2] = Mn(e)) : ue(e) && (t[0] = ut(e), t[1] = 0, t[2] = "application/octet-stream"), { name: t[0], size: t[1], type: t[2] };
}, Je = (e) => !!(e instanceof File || e instanceof Blob && e.name), Nn = (e) => {
  if (!se(e))
    return e;
  const t = Dt(e) ? [] : {};
  for (const r in e) {
    if (!e.hasOwnProperty(r))
      continue;
    const n = e[r];
    t[r] = n && se(n) ? Nn(n) : n;
  }
  return t;
}, as = (e = null, t = null, r = null) => {
  const n = Jt(), o = { archived: !1, frozen: !1, released: !1, source: null, file: r, serverFileReference: t, transferId: null, processingAborted: !1, status: t ? U.PROCESSING_COMPLETE : U.INIT, activeLoader: null, activeProcessor: null };
  let s = null;
  const i = {}, a = (w) => o.status = w, l = (w, ...L) => {
    o.released || o.frozen || A.fire(w, ...L);
  }, d = () => Mt(o.file.name), p = () => o.file.type, m = () => o.file.size, h = () => o.file, T = (w, L, z) => {
    if (o.source = w, A.fireSync("init"), o.file) {
      A.fireSync("load-skip");
      return;
    }
    o.file = ss(w), L.on("init", () => {
      l("load-init");
    }), L.on("meta", (M) => {
      o.file.size = M.size, o.file.filename = M.filename, M.source && (e = ie.LIMBO, o.serverFileReference = M.source, o.status = U.PROCESSING_COMPLETE), l("load-meta");
    }), L.on("progress", (M) => {
      a(U.LOADING), l("load-progress", M);
    }), L.on("error", (M) => {
      a(U.LOAD_ERROR), l("load-request-error", M);
    }), L.on("abort", () => {
      a(U.INIT), l("load-abort");
    }), L.on("load", (M) => {
      o.activeLoader = null;
      const q = (Q) => {
        o.file = Je(Q) ? Q : o.file, e === ie.LIMBO && o.serverFileReference ? a(U.PROCESSING_COMPLETE) : a(U.IDLE), l("load");
      }, Z = (Q) => {
        o.file = M, l("load-meta"), a(U.LOAD_ERROR), l("load-file-error", Q);
      };
      if (o.serverFileReference) {
        q(M);
        return;
      }
      z(M, q, Z);
    }), L.setSource(w), o.activeLoader = L, L.load();
  }, E = () => {
    o.activeLoader && o.activeLoader.load();
  }, I = () => {
    if (o.activeLoader) {
      o.activeLoader.abort();
      return;
    }
    a(U.INIT), l("load-abort");
  }, b = (w, L) => {
    if (o.processingAborted) {
      o.processingAborted = !1;
      return;
    }
    if (a(U.PROCESSING), s = null, !(o.file instanceof Blob)) {
      A.on("load", () => {
        b(w, L);
      });
      return;
    }
    w.on("load", (q) => {
      o.transferId = null, o.serverFileReference = q;
    }), w.on("transfer", (q) => {
      o.transferId = q;
    }), w.on("load-perceived", (q) => {
      o.activeProcessor = null, o.transferId = null, o.serverFileReference = q, a(U.PROCESSING_COMPLETE), l("process-complete", q);
    }), w.on("start", () => {
      l("process-start");
    }), w.on("error", (q) => {
      o.activeProcessor = null, a(U.PROCESSING_ERROR), l("process-error", q);
    }), w.on("abort", (q) => {
      o.activeProcessor = null, o.serverFileReference = q, a(U.IDLE), l("process-abort"), s && s();
    }), w.on("progress", (q) => {
      l("process-progress", q);
    });
    const z = (q) => {
      o.archived || w.process(q, { ...i });
    }, M = console.error;
    L(o.file, z, M), o.activeProcessor = w;
  }, v = () => {
    o.processingAborted = !1, a(U.PROCESSING_QUEUED);
  }, D = () => new Promise((w) => {
    if (!o.activeProcessor) {
      o.processingAborted = !0, a(U.IDLE), l("process-abort"), w();
      return;
    }
    s = () => {
      w();
    }, o.activeProcessor.abort();
  }), C = (w, L) => new Promise((z, M) => {
    const q = o.serverFileReference !== null ? o.serverFileReference : o.transferId;
    if (q === null) {
      z();
      return;
    }
    w(q, () => {
      o.serverFileReference = null, o.transferId = null, z();
    }, (Z) => {
      if (!L) {
        z();
        return;
      }
      a(U.PROCESSING_REVERT_ERROR), l("process-revert-error"), M(Z);
    }), a(U.IDLE), l("process-revert");
  }), N = (w, L, z) => {
    const M = w.split("."), q = M[0], Z = M.pop();
    let Q = i;
    M.forEach((O) => Q = Q[O]), JSON.stringify(Q[Z]) !== JSON.stringify(L) && (Q[Z] = L, l("metadata-update", { key: q, value: i[q], silent: z }));
  }, A = { id: { get: () => n }, origin: { get: () => e, set: (w) => e = w }, serverId: { get: () => o.serverFileReference }, transferId: { get: () => o.transferId }, status: { get: () => o.status }, filename: { get: () => o.file.name }, filenameWithoutExtension: { get: () => Cn(o.file.name) }, fileExtension: { get: d }, fileType: { get: p }, fileSize: { get: m }, file: { get: h }, relativePath: { get: () => o.file._relativePath }, source: { get: () => o.source }, getMetadata: (w) => Nn(w ? i[w] : i), setMetadata: (w, L, z) => {
    if (se(w)) {
      const M = w;
      return Object.keys(M).forEach((q) => {
        N(q, M[q], L);
      }), w;
    }
    return N(w, L, z), L;
  }, extend: (w, L) => F[w] = L, abortLoad: I, retryLoad: E, requestProcessing: v, abortProcessing: D, load: T, process: b, revert: C, ...Lt(), freeze: () => o.frozen = !0, release: () => o.released = !0, released: { get: () => o.released }, archive: () => o.archived = !0, archived: { get: () => o.archived } }, F = Ge(A);
  return F;
}, ls = (e, t) => Ae(t) ? 0 : ue(t) ? e.findIndex((r) => r.id === t) : -1, qr = (e, t) => {
  const r = ls(e, t);
  if (!(r < 0))
    return e[r] || null;
}, cs = (e, t, r, n, o, s) => {
  const i = Ve(null, e, { method: "GET", responseType: "blob" });
  return i.onload = (a) => {
    const l = a.getAllResponseHeaders(), d = rr(l).name || ut(e);
    t(J("load", a.status, Ke(a.response, d), l));
  }, i.onerror = (a) => {
    r(J("error", a.status, a.statusText, a.getAllResponseHeaders()));
  }, i.onheaders = (a) => {
    s(J("headers", a.status, null, a.getAllResponseHeaders()));
  }, i.ontimeout = Ye(r), i.onprogress = n, i.onabort = o, i;
}, Br = (e) => (e.indexOf("//") === 0 && (e = location.protocol + e), e.toLowerCase().replace("blob:", "").replace(/([a-z])?:\/\//, "$1").split("/")[0]), ds = (e) => (e.indexOf(":") > -1 || e.indexOf("//") > -1) && Br(location.href) !== Br(e), ht = (e) => (...t) => Be(e) ? e(...t) : e, us = (e) => !Je(e.file), xt = (e, t) => {
  clearTimeout(t.listUpdateTimeout), t.listUpdateTimeout = setTimeout(() => {
    e("DID_UPDATE_ITEMS", { items: Se(t.items) });
  }, 0);
}, Ur = (e, ...t) => new Promise((r) => {
  if (!e)
    return r(!0);
  const n = e(...t);
  if (n == null)
    return r(!0);
  if (typeof n == "boolean")
    return r(n);
  typeof n.then == "function" && n.then(r);
}), kt = (e, t) => {
  e.items.sort((r, n) => t(Ee(r), Ee(n)));
}, _e = (e, t) => ({ query: r, success: n = () => {
}, failure: o = () => {
}, ...s } = {}) => {
  const i = Ue(e.items, r);
  if (!i) {
    o({ error: J("error", 0, "Item not found"), file: null });
    return;
  }
  t(i, n, o, s || {});
}, ps = (e, t, r) => ({ ABORT_ALL: () => {
  Se(r.items).forEach((n) => {
    n.freeze(), n.abortLoad(), n.abortProcessing();
  });
}, DID_SET_FILES: ({ value: n = [] }) => {
  const o = n.map((i) => ({ source: i.source ? i.source : i, options: i.options }));
  let s = Se(r.items);
  s.forEach((i) => {
    o.find((a) => a.source === i.source || a.source === i.file) || e("REMOVE_ITEM", { query: i, remove: !1 });
  }), s = Se(r.items), o.forEach((i, a) => {
    s.find((l) => l.source === i.source || l.file === i.source) || e("ADD_ITEM", { ...i, interactionMethod: Ie.NONE, index: a });
  });
}, DID_UPDATE_ITEM_METADATA: ({ id: n, action: o, change: s }) => {
  s.silent || (clearTimeout(r.itemUpdateTimeout), r.itemUpdateTimeout = setTimeout(() => {
    const i = qr(r.items, n);
    if (!t("IS_ASYNC")) {
      ye("SHOULD_PREPARE_OUTPUT", !1, { item: i, query: t, action: o, change: s }).then((p) => {
        const m = t("GET_BEFORE_PREPARE_FILE");
        m && (p = m(i, p)), p && e("REQUEST_PREPARE_OUTPUT", { query: n, item: i, success: (h) => {
          e("DID_PREPARE_OUTPUT", { id: n, file: h });
        } }, !0);
      });
      return;
    }
    i.origin === ie.LOCAL && e("DID_LOAD_ITEM", { id: i.id, error: null, serverFileReference: i.source });
    const a = () => {
      setTimeout(() => {
        e("REQUEST_ITEM_PROCESSING", { query: n });
      }, 32);
    }, l = (p) => {
      i.revert(lt(r.options.server.url, r.options.server.revert), t("GET_FORCE_REVERT")).then(p ? a : () => {
      }).catch(() => {
      });
    }, d = (p) => {
      i.abortProcessing().then(p ? a : () => {
      });
    };
    if (i.status === U.PROCESSING_COMPLETE)
      return l(r.options.instantUpload);
    if (i.status === U.PROCESSING)
      return d(r.options.instantUpload);
    r.options.instantUpload && a();
  }, 0));
}, MOVE_ITEM: ({ query: n, index: o }) => {
  const s = Ue(r.items, n);
  if (!s)
    return;
  const i = r.items.indexOf(s);
  o = wn(o, 0, r.items.length - 1), i !== o && r.items.splice(o, 0, r.items.splice(i, 1)[0]);
}, SORT: ({ compare: n }) => {
  kt(r, n), e("DID_SORT_ITEMS", { items: t("GET_ACTIVE_ITEMS") });
}, ADD_ITEMS: ({ items: n, index: o, interactionMethod: s, success: i = () => {
}, failure: a = () => {
} }) => {
  let l = o;
  if (o === -1 || typeof o > "u") {
    const h = t("GET_ITEM_INSERT_LOCATION"), T = t("GET_TOTAL_ITEMS");
    l = h === "before" ? 0 : T;
  }
  const d = t("GET_IGNORED_FILES"), p = (h) => Je(h) ? !d.includes(h.name.toLowerCase()) : !Ae(h), m = n.filter(p).map((h) => new Promise((T, E) => {
    e("ADD_ITEM", { interactionMethod: s, source: h.source || h, success: T, failure: E, index: l++, options: h.options || {} });
  }));
  Promise.all(m).then(i).catch(a);
}, ADD_ITEM: ({ source: n, index: o = -1, interactionMethod: s, success: i = () => {
}, failure: a = () => {
}, options: l = {} }) => {
  if (Ae(n)) {
    a({ error: J("error", 0, "No source"), file: null });
    return;
  }
  if (Je(n) && r.options.ignoredFiles.includes(n.name.toLowerCase()))
    return;
  if (!Ui(r)) {
    if (r.options.allowMultiple || !r.options.allowMultiple && !r.options.allowReplace) {
      const D = J("warning", 0, "Max files");
      e("DID_THROW_MAX_FILES", { source: n, error: D }), a({ error: D, file: null });
      return;
    }
    const v = Se(r.items)[0];
    if (v.status === U.PROCESSING_COMPLETE || v.status === U.PROCESSING_REVERT_ERROR) {
      const D = t("GET_FORCE_REVERT");
      if (v.revert(lt(r.options.server.url, r.options.server.revert), D).then(() => {
        D && e("ADD_ITEM", { source: n, index: o, interactionMethod: s, success: i, failure: a, options: l });
      }).catch(() => {
      }), D)
        return;
    }
    e("REMOVE_ITEM", { query: v.id });
  }
  const d = l.type === "local" ? ie.LOCAL : l.type === "limbo" ? ie.LIMBO : ie.INPUT, p = as(d, d === ie.INPUT ? null : n, l.file);
  Object.keys(l.metadata || {}).forEach((v) => {
    p.setMetadata(v, l.metadata[v]);
  }), We("DID_CREATE_ITEM", p, { query: t, dispatch: e });
  const m = t("GET_ITEM_INSERT_LOCATION");
  r.options.itemInsertLocationFreedom || (o = m === "before" ? -1 : r.items.length), Yi(r.items, p, o), Be(m) && n && kt(r, m);
  const h = p.id;
  p.on("init", () => {
    e("DID_INIT_ITEM", { id: h });
  }), p.on("load-init", () => {
    e("DID_START_ITEM_LOAD", { id: h });
  }), p.on("load-meta", () => {
    e("DID_UPDATE_ITEM_META", { id: h });
  }), p.on("load-progress", (v) => {
    e("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: h, progress: v });
  }), p.on("load-request-error", (v) => {
    const D = ht(r.options.labelFileLoadError)(v);
    if (v.code >= 400 && v.code < 500) {
      e("DID_THROW_ITEM_INVALID", { id: h, error: v, status: { main: D, sub: `${v.code} (${v.body})` } }), a({ error: v, file: Ee(p) });
      return;
    }
    e("DID_THROW_ITEM_LOAD_ERROR", { id: h, error: v, status: { main: D, sub: r.options.labelTapToRetry } });
  }), p.on("load-file-error", (v) => {
    e("DID_THROW_ITEM_INVALID", { id: h, error: v.status, status: v.status }), a({ error: v.status, file: Ee(p) });
  }), p.on("load-abort", () => {
    e("REMOVE_ITEM", { query: h });
  }), p.on("load-skip", () => {
    e("COMPLETE_LOAD_ITEM", { query: h, item: p, data: { source: n, success: i } });
  }), p.on("load", () => {
    const v = (D) => {
      if (!D) {
        e("REMOVE_ITEM", { query: h });
        return;
      }
      p.on("metadata-update", (C) => {
        e("DID_UPDATE_ITEM_METADATA", { id: h, change: C });
      }), ye("SHOULD_PREPARE_OUTPUT", !1, { item: p, query: t }).then((C) => {
        const N = t("GET_BEFORE_PREPARE_FILE");
        N && (C = N(p, C));
        const A = () => {
          e("COMPLETE_LOAD_ITEM", { query: h, item: p, data: { source: n, success: i } }), xt(e, r);
        };
        if (C) {
          e("REQUEST_PREPARE_OUTPUT", { query: h, item: p, success: (F) => {
            e("DID_PREPARE_OUTPUT", { id: h, file: F }), A();
          } }, !0);
          return;
        }
        A();
      });
    };
    ye("DID_LOAD_ITEM", p, { query: t, dispatch: e }).then(() => {
      Ur(t("GET_BEFORE_ADD_FILE"), Ee(p)).then(v);
    }).catch((D) => {
      if (!D || !D.error || !D.status)
        return v(!1);
      e("DID_THROW_ITEM_INVALID", { id: h, error: D.error, status: D.status });
    });
  }), p.on("process-start", () => {
    e("DID_START_ITEM_PROCESSING", { id: h });
  }), p.on("process-progress", (v) => {
    e("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: h, progress: v });
  }), p.on("process-error", (v) => {
    e("DID_THROW_ITEM_PROCESSING_ERROR", { id: h, error: v, status: { main: ht(r.options.labelFileProcessingError)(v), sub: r.options.labelTapToRetry } });
  }), p.on("process-revert-error", (v) => {
    e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", { id: h, error: v, status: { main: ht(r.options.labelFileProcessingRevertError)(v), sub: r.options.labelTapToRetry } });
  }), p.on("process-complete", (v) => {
    e("DID_COMPLETE_ITEM_PROCESSING", { id: h, error: null, serverFileReference: v }), e("DID_DEFINE_VALUE", { id: h, value: v });
  }), p.on("process-abort", () => {
    e("DID_ABORT_ITEM_PROCESSING", { id: h });
  }), p.on("process-revert", () => {
    e("DID_REVERT_ITEM_PROCESSING", { id: h }), e("DID_DEFINE_VALUE", { id: h, value: null });
  }), e("DID_ADD_ITEM", { id: h, index: o, interactionMethod: s }), xt(e, r);
  const { url: T, load: E, restore: I, fetch: b } = r.options.server || {};
  p.load(n, es(d === ie.INPUT ? ue(n) && ds(n) && b ? Ft(T, b) : cs : d === ie.LIMBO ? Ft(T, I) : Ft(T, E)), (v, D, C) => {
    ye("LOAD_FILE", v, { query: t }).then(D).catch(C);
  });
}, REQUEST_PREPARE_OUTPUT: ({ item: n, success: o, failure: s = () => {
} }) => {
  const i = { error: J("error", 0, "Item not found"), file: null };
  if (n.archived)
    return s(i);
  ye("PREPARE_OUTPUT", n.file, { query: t, item: n }).then((a) => {
    ye("COMPLETE_PREPARE_OUTPUT", a, { query: t, item: n }).then((l) => {
      if (n.archived)
        return s(i);
      o(l);
    });
  });
}, COMPLETE_LOAD_ITEM: ({ item: n, data: o }) => {
  const { success: s, source: i } = o, a = t("GET_ITEM_INSERT_LOCATION");
  if (Be(a) && i && kt(r, a), e("DID_LOAD_ITEM", { id: n.id, error: null, serverFileReference: n.origin === ie.INPUT ? null : i }), s(Ee(n)), n.origin === ie.LOCAL) {
    e("DID_LOAD_LOCAL_ITEM", { id: n.id });
    return;
  }
  if (n.origin === ie.LIMBO) {
    e("DID_COMPLETE_ITEM_PROCESSING", { id: n.id, error: null, serverFileReference: i }), e("DID_DEFINE_VALUE", { id: n.id, value: n.serverId || i });
    return;
  }
  t("IS_ASYNC") && r.options.instantUpload && e("REQUEST_ITEM_PROCESSING", { query: n.id });
}, RETRY_ITEM_LOAD: _e(r, (n) => {
  n.retryLoad();
}), REQUEST_ITEM_PREPARE: _e(r, (n, o, s) => {
  e("REQUEST_PREPARE_OUTPUT", { query: n.id, item: n, success: (i) => {
    e("DID_PREPARE_OUTPUT", { id: n.id, file: i }), o({ file: n, output: i });
  }, failure: s }, !0);
}), REQUEST_ITEM_PROCESSING: _e(r, (n, o, s) => {
  if (!(n.status === U.IDLE || n.status === U.PROCESSING_ERROR)) {
    const i = () => e("REQUEST_ITEM_PROCESSING", { query: n, success: o, failure: s }), a = () => document.hidden ? i() : setTimeout(i, 32);
    n.status === U.PROCESSING_COMPLETE || n.status === U.PROCESSING_REVERT_ERROR ? n.revert(lt(r.options.server.url, r.options.server.revert), t("GET_FORCE_REVERT")).then(a).catch(() => {
    }) : n.status === U.PROCESSING && n.abortProcessing().then(a);
    return;
  }
  n.status !== U.PROCESSING_QUEUED && (n.requestProcessing(), e("DID_REQUEST_ITEM_PROCESSING", { id: n.id }), e("PROCESS_ITEM", { query: n, success: o, failure: s }, !0));
}), PROCESS_ITEM: _e(r, (n, o, s) => {
  const i = t("GET_MAX_PARALLEL_UPLOADS");
  if (t("GET_ITEMS_BY_STATUS", U.PROCESSING).length === i) {
    r.processingQueue.push({ id: n.id, success: o, failure: s });
    return;
  }
  if (n.status === U.PROCESSING)
    return;
  const a = () => {
    const d = r.processingQueue.shift();
    if (!d)
      return;
    const { id: p, success: m, failure: h } = d, T = Ue(r.items, p);
    if (!T || T.archived) {
      a();
      return;
    }
    e("PROCESS_ITEM", { query: p, success: m, failure: h }, !0);
  };
  n.onOnce("process-complete", () => {
    o(Ee(n)), a();
    const d = r.options.server;
    if (r.options.instantUpload && n.origin === ie.LOCAL && Be(d.remove)) {
      const p = () => {
      };
      n.origin = ie.LIMBO, r.options.server.remove(n.source, p, p);
    }
    t("GET_ITEMS_BY_STATUS", U.PROCESSING_COMPLETE).length === r.items.length && e("DID_COMPLETE_ITEM_PROCESSING_ALL");
  }), n.onOnce("process-error", (d) => {
    s({ error: d, file: Ee(n) }), a();
  });
  const l = r.options;
  n.process(is(ns(l.server.url, l.server.process, l.name, { chunkTransferId: n.transferId, chunkServer: l.server.patch, chunkUploads: l.chunkUploads, chunkForce: l.chunkForce, chunkSize: l.chunkSize, chunkRetryDelays: l.chunkRetryDelays }), { allowMinimumUploadDuration: t("GET_ALLOW_MINIMUM_UPLOAD_DURATION") }), (d, p, m) => {
    ye("PREPARE_OUTPUT", d, { query: t, item: n }).then((h) => {
      e("DID_PREPARE_OUTPUT", { id: n.id, file: h }), p(h);
    }).catch(m);
  });
}), RETRY_ITEM_PROCESSING: _e(r, (n) => {
  e("REQUEST_ITEM_PROCESSING", { query: n });
}), REQUEST_REMOVE_ITEM: _e(r, (n) => {
  Ur(t("GET_BEFORE_REMOVE_FILE"), Ee(n)).then((o) => {
    o && e("REMOVE_ITEM", { query: n });
  });
}), RELEASE_ITEM: _e(r, (n) => {
  n.release();
}), REMOVE_ITEM: _e(r, (n, o, s, i) => {
  const a = () => {
    const d = n.id;
    qr(r.items, d).archive(), e("DID_REMOVE_ITEM", { error: null, id: d, item: n }), xt(e, r), o(Ee(n));
  }, l = r.options.server;
  n.origin === ie.LOCAL && l && Be(l.remove) && i.remove !== !1 ? (e("DID_START_ITEM_REMOVE", { id: n.id }), l.remove(n.source, () => a(), (d) => {
    e("DID_THROW_ITEM_REMOVE_ERROR", { id: n.id, error: J("error", 0, d, null), status: { main: ht(r.options.labelFileRemoveError)(d), sub: r.options.labelTapToRetry } });
  })) : ((i.revert && n.origin !== ie.LOCAL && n.serverId !== null || r.options.chunkUploads && n.file.size > r.options.chunkSize || r.options.chunkUploads && r.options.chunkForce) && n.revert(lt(r.options.server.url, r.options.server.revert), t("GET_FORCE_REVERT")), a());
}), ABORT_ITEM_LOAD: _e(r, (n) => {
  n.abortLoad();
}), ABORT_ITEM_PROCESSING: _e(r, (n) => {
  if (n.serverId) {
    e("REVERT_ITEM_PROCESSING", { id: n.id });
    return;
  }
  n.abortProcessing().then(() => {
    r.options.instantUpload && e("REMOVE_ITEM", { query: n.id });
  });
}), REQUEST_REVERT_ITEM_PROCESSING: _e(r, (n) => {
  if (!r.options.instantUpload) {
    e("REVERT_ITEM_PROCESSING", { query: n });
    return;
  }
  const o = (a) => {
    a && e("REVERT_ITEM_PROCESSING", { query: n });
  }, s = t("GET_BEFORE_REMOVE_FILE");
  if (!s)
    return o(!0);
  const i = s(Ee(n));
  if (i == null)
    return o(!0);
  if (typeof i == "boolean")
    return o(i);
  typeof i.then == "function" && i.then(o);
}), REVERT_ITEM_PROCESSING: _e(r, (n) => {
  n.revert(lt(r.options.server.url, r.options.server.revert), t("GET_FORCE_REVERT")).then(() => {
    (r.options.instantUpload || us(n)) && e("REMOVE_ITEM", { query: n.id });
  }).catch(() => {
  });
}), SET_OPTIONS: ({ options: n }) => {
  const o = Object.keys(n), s = fs.filter((i) => o.includes(i));
  [...s, ...Object.keys(n).filter((i) => !s.includes(i))].forEach((i) => {
    e(`SET_${At(i, "_").toUpperCase()}`, { value: n[i] });
  });
} }), fs = ["server"], nr = (e) => e, Le = (e) => document.createElement(e), ee = (e, t) => {
  let r = e.childNodes[0];
  r ? t !== r.nodeValue && (r.nodeValue = t) : (r = document.createTextNode(t), e.appendChild(r));
}, Vr = (e, t, r, n) => {
  const o = (n % 360 - 90) * Math.PI / 180;
  return { x: e + r * Math.cos(o), y: t + r * Math.sin(o) };
}, Es = (e, t, r, n, o, s) => {
  const i = Vr(e, t, r, o), a = Vr(e, t, r, n);
  return ["M", i.x, i.y, "A", r, r, 0, s, 0, a.x, a.y].join(" ");
}, hs = (e, t, r, n, o) => {
  let s = 1;
  return o > n && o - n <= 0.5 && (s = 0), n > o && n - o >= 0.5 && (s = 0), Es(e, t, r, Math.min(0.9999, n) * 360, Math.min(0.9999, o) * 360, s);
}, ms = ({ root: e, props: t }) => {
  t.spin = !1, t.progress = 0, t.opacity = 0;
  const r = St("svg");
  e.ref.path = St("path", { "stroke-width": 2, "stroke-linecap": "round" }), r.appendChild(e.ref.path), e.ref.svg = r, e.appendChild(r);
}, Ts = ({ root: e, props: t }) => {
  if (t.opacity === 0)
    return;
  t.align && (e.element.dataset.align = t.align);
  const r = parseInt(ne(e.ref.path, "stroke-width"), 10), n = e.rect.element.width * 0.5;
  let o = 0, s = 0;
  t.spin ? (o = 0, s = 0.5) : (o = 0, s = t.progress);
  const i = hs(n, n, n - r, o, s);
  ne(e.ref.path, "d", i), ne(e.ref.path, "stroke-opacity", t.spin || t.progress > 0 ? 1 : 0);
}, Yr = oe({ tag: "div", name: "progress-indicator", ignoreRectUpdate: !0, ignoreRect: !0, create: ms, write: Ts, mixins: { apis: ["progress", "spin", "align"], styles: ["opacity"], animations: { opacity: { type: "tween", duration: 500 }, progress: { type: "spring", stiffness: 0.95, damping: 0.65, mass: 10 } } } }), _s = ({ root: e, props: t }) => {
  e.element.innerHTML = (t.icon || "") + `<span>${t.label}</span>`, t.isDisabled = !1;
}, Is = ({ root: e, props: t }) => {
  const { isDisabled: r } = t, n = e.query("GET_DISABLED") || t.opacity === 0;
  n && !r ? (t.isDisabled = !0, ne(e.element, "disabled", "disabled")) : !n && r && (t.isDisabled = !1, e.element.removeAttribute("disabled"));
}, Gn = oe({ tag: "button", attributes: { type: "button" }, ignoreRect: !0, ignoreRectUpdate: !0, name: "file-action-button", mixins: { apis: ["label"], styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"], animations: { scaleX: "spring", scaleY: "spring", translateX: "spring", translateY: "spring", opacity: { type: "tween", duration: 250 } }, listeners: !0 }, create: _s, write: Is }), Fn = (e, t = ".", r = 1e3, n = {}) => {
  const { labelBytes: o = "bytes", labelKilobytes: s = "KB", labelMegabytes: i = "MB", labelGigabytes: a = "GB" } = n;
  e = Math.round(Math.abs(e));
  const l = r, d = r * r, p = r * r * r;
  return e < l ? `${e} ${o}` : e < d ? `${Math.floor(e / l)} ${s}` : e < p ? `${Hr(e / d, 1, t)} ${i}` : `${Hr(e / p, 2, t)} ${a}`;
}, Hr = (e, t, r) => e.toFixed(t).split(".").filter((n) => n !== "0").join(r), gs = ({ root: e, props: t }) => {
  const r = Le("span");
  r.className = "filepond--file-info-main", ne(r, "aria-hidden", "true"), e.appendChild(r), e.ref.fileName = r;
  const n = Le("span");
  n.className = "filepond--file-info-sub", e.appendChild(n), e.ref.fileSize = n, ee(n, e.query("GET_LABEL_FILE_WAITING_FOR_SIZE")), ee(r, nr(e.query("GET_ITEM_NAME", t.id)));
}, zt = ({ root: e, props: t }) => {
  ee(e.ref.fileSize, Fn(e.query("GET_ITEM_SIZE", t.id), ".", e.query("GET_FILE_SIZE_BASE"), e.query("GET_FILE_SIZE_LABELS", e.query))), ee(e.ref.fileName, nr(e.query("GET_ITEM_NAME", t.id)));
}, zr = ({ root: e, props: t }) => {
  if (tt(e.query("GET_ITEM_SIZE", t.id))) {
    zt({ root: e, props: t });
    return;
  }
  ee(e.ref.fileSize, e.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
}, ys = oe({ name: "file-info", ignoreRect: !0, ignoreRectUpdate: !0, write: pe({ DID_LOAD_ITEM: zt, DID_UPDATE_ITEM_META: zt, DID_THROW_ITEM_LOAD_ERROR: zr, DID_THROW_ITEM_INVALID: zr }), didCreateView: (e) => {
  We("CREATE_VIEW", { ...e, view: e });
}, create: gs, mixins: { styles: ["translateX", "translateY"], animations: { translateX: "spring", translateY: "spring" } } }), xn = (e) => Math.round(e * 100), Ss = ({ root: e }) => {
  const t = Le("span");
  t.className = "filepond--file-status-main", e.appendChild(t), e.ref.main = t;
  const r = Le("span");
  r.className = "filepond--file-status-sub", e.appendChild(r), e.ref.sub = r, kn({ root: e, action: { progress: null } });
}, kn = ({ root: e, action: t }) => {
  const r = t.progress === null ? e.query("GET_LABEL_FILE_LOADING") : `${e.query("GET_LABEL_FILE_LOADING")} ${xn(t.progress)}%`;
  ee(e.ref.main, r), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, Rs = ({ root: e, action: t }) => {
  const r = t.progress === null ? e.query("GET_LABEL_FILE_PROCESSING") : `${e.query("GET_LABEL_FILE_PROCESSING")} ${xn(t.progress)}%`;
  ee(e.ref.main, r), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, vs = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, Os = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_ABORTED")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_RETRY"));
}, bs = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_UNDO"));
}, Wr = ({ root: e }) => {
  ee(e.ref.main, ""), ee(e.ref.sub, "");
}, ct = ({ root: e, action: t }) => {
  ee(e.ref.main, t.status.main), ee(e.ref.sub, t.status.sub);
}, Ds = oe({ name: "file-status", ignoreRect: !0, ignoreRectUpdate: !0, write: pe({ DID_LOAD_ITEM: Wr, DID_REVERT_ITEM_PROCESSING: Wr, DID_REQUEST_ITEM_PROCESSING: vs, DID_ABORT_ITEM_PROCESSING: Os, DID_COMPLETE_ITEM_PROCESSING: bs, DID_UPDATE_ITEM_PROCESS_PROGRESS: Rs, DID_UPDATE_ITEM_LOAD_PROGRESS: kn, DID_THROW_ITEM_LOAD_ERROR: ct, DID_THROW_ITEM_INVALID: ct, DID_THROW_ITEM_PROCESSING_ERROR: ct, DID_THROW_ITEM_PROCESSING_REVERT_ERROR: ct, DID_THROW_ITEM_REMOVE_ERROR: ct }), didCreateView: (e) => {
  We("CREATE_VIEW", { ...e, view: e });
}, create: Ss, mixins: { styles: ["translateX", "translateY", "opacity"], animations: { opacity: { type: "tween", duration: 250 }, translateX: "spring", translateY: "spring" } } }), Wt = { AbortItemLoad: { label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD", action: "ABORT_ITEM_LOAD", className: "filepond--action-abort-item-load", align: "LOAD_INDICATOR_POSITION" }, RetryItemLoad: { label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD", action: "RETRY_ITEM_LOAD", icon: "GET_ICON_RETRY", className: "filepond--action-retry-item-load", align: "BUTTON_PROCESS_ITEM_POSITION" }, RemoveItem: { label: "GET_LABEL_BUTTON_REMOVE_ITEM", action: "REQUEST_REMOVE_ITEM", icon: "GET_ICON_REMOVE", className: "filepond--action-remove-item", align: "BUTTON_REMOVE_ITEM_POSITION" }, ProcessItem: { label: "GET_LABEL_BUTTON_PROCESS_ITEM", action: "REQUEST_ITEM_PROCESSING", icon: "GET_ICON_PROCESS", className: "filepond--action-process-item", align: "BUTTON_PROCESS_ITEM_POSITION" }, AbortItemProcessing: { label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING", action: "ABORT_ITEM_PROCESSING", className: "filepond--action-abort-item-processing", align: "BUTTON_PROCESS_ITEM_POSITION" }, RetryItemProcessing: { label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING", action: "RETRY_ITEM_PROCESSING", icon: "GET_ICON_RETRY", className: "filepond--action-retry-item-processing", align: "BUTTON_PROCESS_ITEM_POSITION" }, RevertItemProcessing: { label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING", action: "REQUEST_REVERT_ITEM_PROCESSING", icon: "GET_ICON_UNDO", className: "filepond--action-revert-item-processing", align: "BUTTON_PROCESS_ITEM_POSITION" } }, Xt = [];
K(Wt, (e) => {
  Xt.push(e);
});
const me = (e) => {
  if ($t(e) === "right")
    return 0;
  const t = e.ref.buttonRemoveItem.rect.element;
  return t.hidden ? null : t.width + t.left;
}, ws = (e) => e.ref.buttonAbortItemLoad.rect.element.width, mt = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4), As = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2), Ls = (e) => e.query("GET_STYLE_LOAD_INDICATOR_POSITION"), Ms = (e) => e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"), $t = (e) => e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION"), Ps = { buttonAbortItemLoad: { opacity: 0 }, buttonRetryItemLoad: { opacity: 0 }, buttonRemoveItem: { opacity: 0 }, buttonProcessItem: { opacity: 0 }, buttonAbortItemProcessing: { opacity: 0 }, buttonRetryItemProcessing: { opacity: 0 }, buttonRevertItemProcessing: { opacity: 0 }, loadProgressIndicator: { opacity: 0, align: Ls }, processProgressIndicator: { opacity: 0, align: Ms }, processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 }, info: { translateX: 0, translateY: 0, opacity: 0 }, status: { translateX: 0, translateY: 0, opacity: 0 } }, Xr = { buttonRemoveItem: { opacity: 1 }, buttonProcessItem: { opacity: 1 }, info: { translateX: me }, status: { translateX: me } }, qt = { buttonAbortItemProcessing: { opacity: 1 }, processProgressIndicator: { opacity: 1 }, status: { opacity: 1 } }, Ze = { DID_THROW_ITEM_INVALID: { buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { translateX: me, opacity: 1 } }, DID_START_ITEM_LOAD: { buttonAbortItemLoad: { opacity: 1 }, loadProgressIndicator: { opacity: 1 }, status: { opacity: 1 } }, DID_THROW_ITEM_LOAD_ERROR: { buttonRetryItemLoad: { opacity: 1 }, buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { opacity: 1 } }, DID_START_ITEM_REMOVE: { processProgressIndicator: { opacity: 1, align: $t }, info: { translateX: me }, status: { opacity: 0 } }, DID_THROW_ITEM_REMOVE_ERROR: { processProgressIndicator: { opacity: 0, align: $t }, buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { opacity: 1, translateX: me } }, DID_LOAD_ITEM: Xr, DID_LOAD_LOCAL_ITEM: { buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { translateX: me } }, DID_START_ITEM_PROCESSING: qt, DID_REQUEST_ITEM_PROCESSING: qt, DID_UPDATE_ITEM_PROCESS_PROGRESS: qt, DID_COMPLETE_ITEM_PROCESSING: { buttonRevertItemProcessing: { opacity: 1 }, info: { opacity: 1 }, status: { opacity: 1 } }, DID_THROW_ITEM_PROCESSING_ERROR: { buttonRemoveItem: { opacity: 1 }, buttonRetryItemProcessing: { opacity: 1 }, status: { opacity: 1 }, info: { translateX: me } }, DID_THROW_ITEM_PROCESSING_REVERT_ERROR: { buttonRevertItemProcessing: { opacity: 1 }, status: { opacity: 1 }, info: { opacity: 1 } }, DID_ABORT_ITEM_PROCESSING: { buttonRemoveItem: { opacity: 1 }, buttonProcessItem: { opacity: 1 }, info: { translateX: me }, status: { opacity: 1 } }, DID_REVERT_ITEM_PROCESSING: Xr }, Cs = oe({ create: ({ root: e }) => {
  e.element.innerHTML = e.query("GET_ICON_DONE");
}, name: "processing-complete-indicator", ignoreRect: !0, mixins: { styles: ["scaleX", "scaleY", "opacity"], animations: { scaleX: "spring", scaleY: "spring", opacity: { type: "tween", duration: 250 } } } }), Ns = ({ root: e, props: t }) => {
  const r = Object.keys(Wt).reduce((E, I) => (E[I] = { ...Wt[I] }, E), {}), { id: n } = t, o = e.query("GET_ALLOW_REVERT"), s = e.query("GET_ALLOW_REMOVE"), i = e.query("GET_ALLOW_PROCESS"), a = e.query("GET_INSTANT_UPLOAD"), l = e.query("IS_ASYNC"), d = e.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
  let p;
  l ? i && !o ? p = (E) => !/RevertItemProcessing/.test(E) : !i && o ? p = (E) => !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(E) : !i && !o && (p = (E) => !/Process/.test(E)) : p = (E) => !/Process/.test(E);
  const m = p ? Xt.filter(p) : Xt.concat();
  if (a && o && (r.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM", r.RevertItemProcessing.icon = "GET_ICON_REMOVE"), l && !o) {
    const E = Ze.DID_COMPLETE_ITEM_PROCESSING;
    E.info.translateX = As, E.info.translateY = mt, E.status.translateY = mt, E.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  if (l && !i && (["DID_START_ITEM_PROCESSING", "DID_REQUEST_ITEM_PROCESSING", "DID_UPDATE_ITEM_PROCESS_PROGRESS", "DID_THROW_ITEM_PROCESSING_ERROR"].forEach((E) => {
    Ze[E].status.translateY = mt;
  }), Ze.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = ws), d && o) {
    r.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION";
    const E = Ze.DID_COMPLETE_ITEM_PROCESSING;
    E.info.translateX = me, E.status.translateY = mt, E.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  s || (r.RemoveItem.disabled = !0), K(r, (E, I) => {
    const b = e.createChildView(Gn, { label: e.query(I.label), icon: e.query(I.icon), opacity: 0 });
    m.includes(E) && e.appendChildView(b), I.disabled && (b.element.setAttribute("disabled", "disabled"), b.element.setAttribute("hidden", "hidden")), b.element.dataset.align = e.query(`GET_STYLE_${I.align}`), b.element.classList.add(I.className), b.on("click", (v) => {
      v.stopPropagation(), !I.disabled && e.dispatch(I.action, { query: n });
    }), e.ref[`button${E}`] = b;
  }), e.ref.processingCompleteIndicator = e.appendChildView(e.createChildView(Cs)), e.ref.processingCompleteIndicator.element.dataset.align = e.query("GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"), e.ref.info = e.appendChildView(e.createChildView(ys, { id: n })), e.ref.status = e.appendChildView(e.createChildView(Ds, { id: n }));
  const h = e.appendChildView(e.createChildView(Yr, { opacity: 0, align: e.query("GET_STYLE_LOAD_INDICATOR_POSITION") }));
  h.element.classList.add("filepond--load-indicator"), e.ref.loadProgressIndicator = h;
  const T = e.appendChildView(e.createChildView(Yr, { opacity: 0, align: e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION") }));
  T.element.classList.add("filepond--process-indicator"), e.ref.processProgressIndicator = T, e.ref.activeStyles = [];
}, Gs = ({ root: e, actions: t, props: r }) => {
  Fs({ root: e, actions: t, props: r });
  let n = t.concat().filter((o) => /^DID_/.test(o.type)).reverse().find((o) => Ze[o.type]);
  if (n) {
    e.ref.activeStyles = [];
    const o = Ze[n.type];
    K(Ps, (s, i) => {
      const a = e.ref[s];
      K(i, (l, d) => {
        const p = o[s] && typeof o[s][l] < "u" ? o[s][l] : d;
        e.ref.activeStyles.push({ control: a, key: l, value: p });
      });
    });
  }
  e.ref.activeStyles.forEach(({ control: o, key: s, value: i }) => {
    o[s] = typeof i == "function" ? i(e) : i;
  });
}, Fs = pe({ DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: ({ root: e, action: t }) => {
  e.ref.buttonAbortItemProcessing.label = t.value;
}, DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: ({ root: e, action: t }) => {
  e.ref.buttonAbortItemLoad.label = t.value;
}, DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: ({ root: e, action: t }) => {
  e.ref.buttonAbortItemRemoval.label = t.value;
}, DID_REQUEST_ITEM_PROCESSING: ({ root: e }) => {
  e.ref.processProgressIndicator.spin = !0, e.ref.processProgressIndicator.progress = 0;
}, DID_START_ITEM_LOAD: ({ root: e }) => {
  e.ref.loadProgressIndicator.spin = !0, e.ref.loadProgressIndicator.progress = 0;
}, DID_START_ITEM_REMOVE: ({ root: e }) => {
  e.ref.processProgressIndicator.spin = !0, e.ref.processProgressIndicator.progress = 0;
}, DID_UPDATE_ITEM_LOAD_PROGRESS: ({ root: e, action: t }) => {
  e.ref.loadProgressIndicator.spin = !1, e.ref.loadProgressIndicator.progress = t.progress;
}, DID_UPDATE_ITEM_PROCESS_PROGRESS: ({ root: e, action: t }) => {
  e.ref.processProgressIndicator.spin = !1, e.ref.processProgressIndicator.progress = t.progress;
} }), xs = oe({ create: Ns, write: Gs, didCreateView: (e) => {
  We("CREATE_VIEW", { ...e, view: e });
}, name: "file" }), ks = ({ root: e, props: t }) => {
  e.ref.fileName = Le("legend"), e.appendChild(e.ref.fileName), e.ref.file = e.appendChildView(e.createChildView(xs, { id: t.id })), e.ref.data = !1;
}, qs = ({ root: e, props: t }) => {
  ee(e.ref.fileName, nr(e.query("GET_ITEM_NAME", t.id)));
}, Bs = oe({ create: ks, ignoreRect: !0, write: pe({ DID_LOAD_ITEM: qs }), didCreateView: (e) => {
  We("CREATE_VIEW", { ...e, view: e });
}, tag: "fieldset", name: "file-wrapper" }), $r = { type: "spring", damping: 0.6, mass: 7 }, Us = ({ root: e, props: t }) => {
  [{ name: "top" }, { name: "center", props: { translateY: null, scaleY: null }, mixins: { animations: { scaleY: $r }, styles: ["translateY", "scaleY"] } }, { name: "bottom", props: { translateY: null }, mixins: { animations: { translateY: $r }, styles: ["translateY"] } }].forEach((r) => {
    Vs(e, r, t.name);
  }), e.element.classList.add(`filepond--${t.name}`), e.ref.scalable = null;
}, Vs = (e, t, r) => {
  const n = oe({ name: `panel-${t.name} filepond--${r}`, mixins: t.mixins, ignoreRectUpdate: !0 }), o = e.createChildView(n, t.props);
  e.ref[t.name] = e.appendChildView(o);
}, Ys = ({ root: e, props: t }) => {
  if ((e.ref.scalable === null || t.scalable !== e.ref.scalable) && (e.ref.scalable = In(t.scalable) ? t.scalable : !0, e.element.dataset.scalable = e.ref.scalable), !t.height)
    return;
  const r = e.ref.top.rect.element, n = e.ref.bottom.rect.element, o = Math.max(r.height + n.height, t.height);
  e.ref.center.translateY = r.height, e.ref.center.scaleY = (o - r.height - n.height) / 100, e.ref.bottom.translateY = o - n.height;
}, qn = oe({ name: "panel", read: ({ root: e, props: t }) => t.heightCurrent = e.ref.bottom.translateY, write: Ys, create: Us, ignoreRect: !0, mixins: { apis: ["height", "heightCurrent", "scalable"] } }), Hs = (e) => {
  const t = e.map((n) => n.id);
  let r;
  return { setIndex: (n) => {
    r = n;
  }, getIndex: () => r, getItemIndex: (n) => t.indexOf(n.id) };
}, jr = { type: "spring", stiffness: 0.75, damping: 0.45, mass: 10 }, Zr = "spring", Qr = { DID_START_ITEM_LOAD: "busy", DID_UPDATE_ITEM_LOAD_PROGRESS: "loading", DID_THROW_ITEM_INVALID: "load-invalid", DID_THROW_ITEM_LOAD_ERROR: "load-error", DID_LOAD_ITEM: "idle", DID_THROW_ITEM_REMOVE_ERROR: "remove-error", DID_START_ITEM_REMOVE: "busy", DID_START_ITEM_PROCESSING: "busy processing", DID_REQUEST_ITEM_PROCESSING: "busy processing", DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing", DID_COMPLETE_ITEM_PROCESSING: "processing-complete", DID_THROW_ITEM_PROCESSING_ERROR: "processing-error", DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error", DID_ABORT_ITEM_PROCESSING: "cancelled", DID_REVERT_ITEM_PROCESSING: "idle" }, zs = ({ root: e, props: t }) => {
  if (e.ref.handleClick = (n) => e.dispatch("DID_ACTIVATE_ITEM", { id: t.id }), e.element.id = `filepond--item-${t.id}`, e.element.addEventListener("click", e.ref.handleClick), e.ref.container = e.appendChildView(e.createChildView(Bs, { id: t.id })), e.ref.panel = e.appendChildView(e.createChildView(qn, { name: "item-panel" })), e.ref.panel.height = null, t.markedForRemoval = !1, !e.query("GET_ALLOW_REORDER"))
    return;
  e.element.dataset.dragState = "idle";
  const r = (n) => {
    if (!n.isPrimary)
      return;
    let o = !1;
    const s = { x: n.pageX, y: n.pageY };
    t.dragOrigin = { x: e.translateX, y: e.translateY }, t.dragCenter = { x: n.offsetX, y: n.offsetY };
    const i = Hs(e.query("GET_ACTIVE_ITEMS"));
    e.dispatch("DID_GRAB_ITEM", { id: t.id, dragState: i });
    const a = (d) => {
      d.isPrimary && (d.stopPropagation(), d.preventDefault(), t.dragOffset = { x: d.pageX - s.x, y: d.pageY - s.y }, t.dragOffset.x * t.dragOffset.x + t.dragOffset.y * t.dragOffset.y > 16 && !o && (o = !0, e.element.removeEventListener("click", e.ref.handleClick)), e.dispatch("DID_DRAG_ITEM", { id: t.id, dragState: i }));
    }, l = (d) => {
      d.isPrimary && (document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", l), t.dragOffset = { x: d.pageX - s.x, y: d.pageY - s.y }, e.dispatch("DID_DROP_ITEM", { id: t.id, dragState: i }), o && setTimeout(() => e.element.addEventListener("click", e.ref.handleClick), 0));
    };
    document.addEventListener("pointermove", a), document.addEventListener("pointerup", l);
  };
  e.element.addEventListener("pointerdown", r);
}, Ws = pe({ DID_UPDATE_PANEL_HEIGHT: ({ root: e, action: t }) => {
  e.height = t.height;
} }), Xs = pe({ DID_GRAB_ITEM: ({ root: e, props: t }) => {
  t.dragOrigin = { x: e.translateX, y: e.translateY };
}, DID_DRAG_ITEM: ({ root: e }) => {
  e.element.dataset.dragState = "drag";
}, DID_DROP_ITEM: ({ root: e, props: t }) => {
  t.dragOffset = null, t.dragOrigin = null, e.element.dataset.dragState = "drop";
} }, ({ root: e, actions: t, props: r, shouldOptimize: n }) => {
  e.element.dataset.dragState === "drop" && e.scaleX <= 1 && (e.element.dataset.dragState = "idle");
  let o = t.concat().filter((i) => /^DID_/.test(i.type)).reverse().find((i) => Qr[i.type]);
  o && o.type !== r.currentState && (r.currentState = o.type, e.element.dataset.filepondItemState = Qr[r.currentState] || "");
  const s = e.query("GET_ITEM_PANEL_ASPECT_RATIO") || e.query("GET_PANEL_ASPECT_RATIO");
  s ? n || (e.height = e.rect.element.width * s) : (Ws({ root: e, actions: t, props: r }), !e.height && e.ref.container.rect.element.height > 0 && (e.height = e.ref.container.rect.element.height)), n && (e.ref.panel.height = null), e.ref.panel.height = e.height;
}), $s = oe({ create: zs, write: Xs, destroy: ({ root: e, props: t }) => {
  e.element.removeEventListener("click", e.ref.handleClick), e.dispatch("RELEASE_ITEM", { query: t.id });
}, tag: "li", name: "item", mixins: { apis: ["id", "interactionMethod", "markedForRemoval", "spawnDate", "dragCenter", "dragOrigin", "dragOffset"], styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity", "height"], animations: { scaleX: Zr, scaleY: Zr, translateX: jr, translateY: jr, opacity: { type: "tween", duration: 150 } } } });
var or = (e, t) => Math.max(1, Math.floor((e + 1) / t));
const ir = (e, t, r) => {
  if (!r)
    return;
  const n = e.rect.element.width, o = t.length;
  let s = null;
  if (o === 0 || r.top < t[0].rect.element.top)
    return -1;
  const i = t[0].rect.element, a = i.marginLeft + i.marginRight, l = i.width + a, d = or(n, l);
  if (d === 1) {
    for (let h = 0; h < o; h++) {
      const T = t[h], E = T.rect.outer.top + T.rect.element.height * 0.5;
      if (r.top < E)
        return h;
    }
    return o;
  }
  const p = i.marginTop + i.marginBottom, m = i.height + p;
  for (let h = 0; h < o; h++) {
    const T = h % d, E = Math.floor(h / d), I = T * l, b = E * m, v = b - i.marginTop, D = I + l, C = b + m + i.marginBottom;
    if (r.top < C && r.top > v) {
      if (r.left < D)
        return h;
      h !== o - 1 ? s = h : s = null;
    }
  }
  return s !== null ? s : o;
}, Tt = { height: 0, width: 0, get getHeight() {
  return this.height;
}, set setHeight(e) {
  (this.height === 0 || e === 0) && (this.height = e);
}, get getWidth() {
  return this.width;
}, set setWidth(e) {
  (this.width === 0 || e === 0) && (this.width = e);
}, setDimensions: function(e, t) {
  (this.height === 0 || e === 0) && (this.height = e), (this.width === 0 || t === 0) && (this.width = t);
} }, js = ({ root: e }) => {
  ne(e.element, "role", "list"), e.ref.lastItemSpanwDate = Date.now();
}, Zs = ({ root: e, action: t }) => {
  const { id: r, index: n, interactionMethod: o } = t;
  e.ref.addIndex = n;
  const s = Date.now();
  let i = s, a = 1;
  if (o !== Ie.NONE) {
    a = 0;
    const l = e.query("GET_ITEM_INSERT_INTERVAL"), d = s - e.ref.lastItemSpanwDate;
    i = d < l ? s + (l - d) : s;
  }
  e.ref.lastItemSpanwDate = i, e.appendChildView(e.createChildView($s, { spawnDate: i, id: r, opacity: a, interactionMethod: o }), n);
}, Kr = (e, t, r, n = 0, o = 1) => {
  e.dragOffset ? (e.translateX = null, e.translateY = null, e.translateX = e.dragOrigin.x + e.dragOffset.x, e.translateY = e.dragOrigin.y + e.dragOffset.y, e.scaleX = 1.025, e.scaleY = 1.025) : (e.translateX = t, e.translateY = r, Date.now() > e.spawnDate && (e.opacity === 0 && Qs(e, t, r, n, o), e.scaleX = 1, e.scaleY = 1, e.opacity = 1));
}, Qs = (e, t, r, n, o) => {
  e.interactionMethod === Ie.NONE ? (e.translateX = null, e.translateX = t, e.translateY = null, e.translateY = r) : e.interactionMethod === Ie.DROP ? (e.translateX = null, e.translateX = t - n * 20, e.translateY = null, e.translateY = r - o * 10, e.scaleX = 0.8, e.scaleY = 0.8) : e.interactionMethod === Ie.BROWSE ? (e.translateY = null, e.translateY = r - 30) : e.interactionMethod === Ie.API && (e.translateX = null, e.translateX = t - 30, e.translateY = null);
}, Ks = ({ root: e, action: t }) => {
  const { id: r } = t, n = e.childViews.find((o) => o.id === r);
  n && (n.scaleX = 0.9, n.scaleY = 0.9, n.opacity = 0, n.markedForRemoval = !0);
}, Bt = (e) => e.rect.element.height + e.rect.element.marginBottom * 0.5 + e.rect.element.marginTop * 0.5, Js = (e) => e.rect.element.width + e.rect.element.marginLeft * 0.5 + e.rect.element.marginRight * 0.5, ea = ({ root: e, action: t }) => {
  const { id: r, dragState: n } = t, o = e.query("GET_ITEM", { id: r }), s = e.childViews.find((b) => b.id === r), i = e.childViews.length, a = n.getItemIndex(o);
  if (!s)
    return;
  const l = { x: s.dragOrigin.x + s.dragOffset.x + s.dragCenter.x, y: s.dragOrigin.y + s.dragOffset.y + s.dragCenter.y }, d = Bt(s), p = Js(s);
  let m = Math.floor(e.rect.outer.width / p);
  m > i && (m = i);
  const h = Math.floor(i / m + 1);
  Tt.setHeight = d * h, Tt.setWidth = p * m;
  var T = { y: Math.floor(l.y / d), x: Math.floor(l.x / p), getGridIndex: function() {
    return l.y > Tt.getHeight || l.y < 0 || l.x > Tt.getWidth || l.x < 0 ? a : this.y * m + this.x;
  }, getColIndex: function() {
    const b = e.query("GET_ACTIVE_ITEMS"), v = e.childViews.filter((M) => M.rect.element.height), D = b.map((M) => v.find((q) => q.id === M.id)), C = D.findIndex((M) => M === s), N = Bt(s), A = D.length;
    let F = A, w = 0, L = 0, z = 0;
    for (let M = 0; M < A; M++)
      if (w = Bt(D[M]), z = L, L = z + w, l.y < L) {
        if (C > M) {
          if (l.y < z + N) {
            F = M;
            break;
          }
          continue;
        }
        F = M;
        break;
      }
    return F;
  } };
  const E = m > 1 ? T.getGridIndex() : T.getColIndex();
  e.dispatch("MOVE_ITEM", { query: s, index: E });
  const I = n.getIndex();
  if (I === void 0 || I !== E) {
    if (n.setIndex(E), I === void 0)
      return;
    e.dispatch("DID_REORDER_ITEMS", { items: e.query("GET_ACTIVE_ITEMS"), origin: a, target: E });
  }
}, ta = pe({ DID_ADD_ITEM: Zs, DID_REMOVE_ITEM: Ks, DID_DRAG_ITEM: ea }), ra = ({ root: e, props: t, actions: r, shouldOptimize: n }) => {
  ta({ root: e, props: t, actions: r });
  const { dragCoordinates: o } = t, s = e.rect.element.width, i = e.childViews.filter((C) => C.rect.element.height), a = e.query("GET_ACTIVE_ITEMS").map((C) => i.find((N) => N.id === C.id)).filter((C) => C), l = o ? ir(e, a, o) : null, d = e.ref.addIndex || null;
  e.ref.addIndex = null;
  let p = 0, m = 0, h = 0;
  if (a.length === 0)
    return;
  const T = a[0].rect.element, E = T.marginTop + T.marginBottom, I = T.marginLeft + T.marginRight, b = T.width + I, v = T.height + E, D = or(s, b);
  if (D === 1) {
    let C = 0, N = 0;
    a.forEach((A, F) => {
      if (l) {
        let L = F - l;
        L === -2 ? N = -E * 0.25 : L === -1 ? N = -E * 0.75 : L === 0 ? N = E * 0.75 : L === 1 ? N = E * 0.25 : N = 0;
      }
      n && (A.translateX = null, A.translateY = null), A.markedForRemoval || Kr(A, 0, C + N);
      let w = (A.rect.element.height + E) * (A.markedForRemoval ? A.opacity : 1);
      C += w;
    });
  } else {
    let C = 0, N = 0;
    a.forEach((A, F) => {
      F === l && (p = 1), F === d && (h += 1), A.markedForRemoval && A.opacity < 0.5 && (m -= 1);
      const w = F + h + p + m, L = w % D, z = Math.floor(w / D), M = L * b, q = z * v, Z = Math.sign(M - C), Q = Math.sign(q - N);
      C = M, N = q, !A.markedForRemoval && (n && (A.translateX = null, A.translateY = null), Kr(A, M, q, Z, Q));
    });
  }
}, na = (e, t) => t.filter((r) => r.data && r.data.id ? e.id === r.data.id : !0), oa = oe({ create: js, write: ra, tag: "ul", name: "list", didWriteView: ({ root: e }) => {
  e.childViews.filter((t) => t.markedForRemoval && t.opacity === 0 && t.resting).forEach((t) => {
    t._destroy(), e.removeChildView(t);
  });
}, filterFrameActionsForChild: na, mixins: { apis: ["dragCoordinates"] } }), ia = ({ root: e, props: t }) => {
  e.ref.list = e.appendChildView(e.createChildView(oa)), t.dragCoordinates = null, t.overflowing = !1;
}, sa = ({ root: e, props: t, action: r }) => {
  e.query("GET_ITEM_INSERT_LOCATION_FREEDOM") && (t.dragCoordinates = { left: r.position.scopeLeft - e.ref.list.rect.element.left, top: r.position.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop) });
}, aa = ({ props: e }) => {
  e.dragCoordinates = null;
}, la = pe({ DID_DRAG: sa, DID_END_DRAG: aa }), ca = ({ root: e, props: t, actions: r }) => {
  if (la({ root: e, props: t, actions: r }), e.ref.list.dragCoordinates = t.dragCoordinates, t.overflowing && !t.overflow && (t.overflowing = !1, e.element.dataset.state = "", e.height = null), t.overflow) {
    const n = Math.round(t.overflow);
    n !== e.height && (t.overflowing = !0, e.element.dataset.state = "overflow", e.height = n);
  }
}, da = oe({ create: ia, write: ca, name: "list-scroller", mixins: { apis: ["overflow", "dragCoordinates"], styles: ["height", "translateY"], animations: { translateY: "spring" } } }), Re = (e, t, r, n = "") => {
  r ? ne(e, t, n) : e.removeAttribute(t);
}, ua = (e) => {
  if (!(!e || e.value === "")) {
    try {
      e.value = "";
    } catch {
    }
    if (e.value) {
      const t = Le("form"), r = e.parentNode, n = e.nextSibling;
      t.appendChild(e), t.reset(), n ? r.insertBefore(e, n) : r.appendChild(e);
    }
  }
}, pa = ({ root: e, props: t }) => {
  e.element.id = `filepond--browser-${t.id}`, ne(e.element, "name", e.query("GET_NAME")), ne(e.element, "aria-controls", `filepond--assistant-${t.id}`), ne(e.element, "aria-labelledby", `filepond--drop-label-${t.id}`), Bn({ root: e, action: { value: e.query("GET_ACCEPTED_FILE_TYPES") } }), Un({ root: e, action: { value: e.query("GET_ALLOW_MULTIPLE") } }), Vn({ root: e, action: { value: e.query("GET_ALLOW_DIRECTORIES_ONLY") } }), jt({ root: e }), Yn({ root: e, action: { value: e.query("GET_REQUIRED") } }), Hn({ root: e, action: { value: e.query("GET_CAPTURE_METHOD") } }), e.ref.handleChange = (r) => {
    if (!e.element.value)
      return;
    const n = Array.from(e.element.files).map((o) => (o._relativePath = o.webkitRelativePath, o));
    setTimeout(() => {
      t.onload(n), ua(e.element);
    }, 250);
  }, e.element.addEventListener("change", e.ref.handleChange);
}, Bn = ({ root: e, action: t }) => {
  e.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") && Re(e.element, "accept", !!t.value, t.value ? t.value.join(",") : "");
}, Un = ({ root: e, action: t }) => {
  Re(e.element, "multiple", t.value);
}, Vn = ({ root: e, action: t }) => {
  Re(e.element, "webkitdirectory", t.value);
}, jt = ({ root: e }) => {
  const t = e.query("GET_DISABLED"), r = e.query("GET_ALLOW_BROWSE"), n = t || !r;
  Re(e.element, "disabled", n);
}, Yn = ({ root: e, action: t }) => {
  t.value ? e.query("GET_TOTAL_ITEMS") === 0 && Re(e.element, "required", !0) : Re(e.element, "required", !1);
}, Hn = ({ root: e, action: t }) => {
  Re(e.element, "capture", !!t.value, t.value === !0 ? "" : t.value);
}, Jr = ({ root: e }) => {
  const { element: t } = e;
  e.query("GET_TOTAL_ITEMS") > 0 ? (Re(t, "required", !1), Re(t, "name", !1)) : (Re(t, "name", !0, e.query("GET_NAME")), e.query("GET_CHECK_VALIDITY") && t.setCustomValidity(""), e.query("GET_REQUIRED") && Re(t, "required", !0));
}, fa = ({ root: e }) => {
  e.query("GET_CHECK_VALIDITY") && e.element.setCustomValidity(e.query("GET_LABEL_INVALID_FIELD"));
}, Ea = oe({ tag: "input", name: "browser", ignoreRect: !0, ignoreRectUpdate: !0, attributes: { type: "file" }, create: pa, destroy: ({ root: e }) => {
  e.element.removeEventListener("change", e.ref.handleChange);
}, write: pe({ DID_LOAD_ITEM: Jr, DID_REMOVE_ITEM: Jr, DID_THROW_ITEM_INVALID: fa, DID_SET_DISABLED: jt, DID_SET_ALLOW_BROWSE: jt, DID_SET_ALLOW_DIRECTORIES_ONLY: Vn, DID_SET_ALLOW_MULTIPLE: Un, DID_SET_ACCEPTED_FILE_TYPES: Bn, DID_SET_CAPTURE_METHOD: Hn, DID_SET_REQUIRED: Yn }) }), en = { ENTER: 13, SPACE: 32 }, ha = ({ root: e, props: t }) => {
  const r = Le("label");
  ne(r, "for", `filepond--browser-${t.id}`), ne(r, "id", `filepond--drop-label-${t.id}`), ne(r, "aria-hidden", "true"), e.ref.handleKeyDown = (n) => {
    (n.keyCode === en.ENTER || n.keyCode === en.SPACE) && (n.preventDefault(), e.ref.label.click());
  }, e.ref.handleClick = (n) => {
    n.target === r || r.contains(n.target) || e.ref.label.click();
  }, r.addEventListener("keydown", e.ref.handleKeyDown), e.element.addEventListener("click", e.ref.handleClick), zn(r, t.caption), e.appendChild(r), e.ref.label = r;
}, zn = (e, t) => {
  e.innerHTML = t;
  const r = e.querySelector(".filepond--label-action");
  return r && ne(r, "tabindex", "0"), t;
}, ma = oe({ name: "drop-label", ignoreRect: !0, create: ha, destroy: ({ root: e }) => {
  e.ref.label.addEventListener("keydown", e.ref.handleKeyDown), e.element.removeEventListener("click", e.ref.handleClick);
}, write: pe({ DID_SET_LABEL_IDLE: ({ root: e, action: t }) => {
  zn(e.ref.label, t.value);
} }), mixins: { styles: ["opacity", "translateX", "translateY"], animations: { opacity: { type: "tween", duration: 150 }, translateX: "spring", translateY: "spring" } } }), Ta = oe({ name: "drip-blob", ignoreRect: !0, mixins: { styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"], animations: { scaleX: "spring", scaleY: "spring", translateX: "spring", translateY: "spring", opacity: { type: "tween", duration: 250 } } } }), _a = ({ root: e }) => {
  const t = e.rect.element.width * 0.5, r = e.rect.element.height * 0.5;
  e.ref.blob = e.appendChildView(e.createChildView(Ta, { opacity: 0, scaleX: 2.5, scaleY: 2.5, translateX: t, translateY: r }));
}, Ia = ({ root: e, action: t }) => {
  if (!e.ref.blob) {
    _a({ root: e });
    return;
  }
  e.ref.blob.translateX = t.position.scopeLeft, e.ref.blob.translateY = t.position.scopeTop, e.ref.blob.scaleX = 1, e.ref.blob.scaleY = 1, e.ref.blob.opacity = 1;
}, ga = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.opacity = 0);
}, ya = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.scaleX = 2.5, e.ref.blob.scaleY = 2.5, e.ref.blob.opacity = 0);
}, Sa = ({ root: e, props: t, actions: r }) => {
  Ra({ root: e, props: t, actions: r });
  const { blob: n } = e.ref;
  r.length === 0 && n && n.opacity === 0 && (e.removeChildView(n), e.ref.blob = null);
}, Ra = pe({ DID_DRAG: Ia, DID_DROP: ya, DID_END_DRAG: ga }), va = oe({ ignoreRect: !0, ignoreRectUpdate: !0, name: "drip", write: Sa }), Wn = (e, t) => {
  try {
    const r = new DataTransfer();
    t.forEach((n) => {
      n instanceof File ? r.items.add(n) : r.items.add(new File([n], n.name, { type: n.type }));
    }), e.files = r.files;
  } catch {
    return !1;
  }
  return !0;
}, Oa = ({ root: e }) => e.ref.fields = {}, Pt = (e, t) => e.ref.fields[t], sr = (e) => {
  e.query("GET_ACTIVE_ITEMS").forEach((t) => {
    e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id]);
  });
}, tn = ({ root: e }) => sr(e), ba = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).origin !== ie.LOCAL && e.query("SHOULD_UPDATE_FILE_INPUT"), n = Le("input");
  n.type = r ? "file" : "hidden", n.name = e.query("GET_NAME"), n.disabled = e.query("GET_DISABLED"), e.ref.fields[t.id] = n, sr(e);
}, Da = ({ root: e, action: t }) => {
  const r = Pt(e, t.id);
  if (!r || (t.serverFileReference !== null && (r.value = t.serverFileReference), !e.query("SHOULD_UPDATE_FILE_INPUT")))
    return;
  const n = e.query("GET_ITEM", t.id);
  Wn(r, [n.file]);
}, wa = ({ root: e, action: t }) => {
  e.query("SHOULD_UPDATE_FILE_INPUT") && setTimeout(() => {
    const r = Pt(e, t.id);
    r && Wn(r, [t.file]);
  }, 0);
}, Aa = ({ root: e }) => {
  e.element.disabled = e.query("GET_DISABLED");
}, La = ({ root: e, action: t }) => {
  const r = Pt(e, t.id);
  r && (r.parentNode && r.parentNode.removeChild(r), delete e.ref.fields[t.id]);
}, Ma = ({ root: e, action: t }) => {
  const r = Pt(e, t.id);
  r && (t.value === null ? r.removeAttribute("value") : r.type != "file" && (r.value = t.value), sr(e));
}, Pa = pe({ DID_SET_DISABLED: Aa, DID_ADD_ITEM: ba, DID_LOAD_ITEM: Da, DID_REMOVE_ITEM: La, DID_DEFINE_VALUE: Ma, DID_PREPARE_OUTPUT: wa, DID_REORDER_ITEMS: tn, DID_SORT_ITEMS: tn }), Ca = oe({ tag: "fieldset", name: "data", create: Oa, write: Pa, ignoreRect: !0 }), Na = (e) => "getRootNode" in e ? e.getRootNode() : document, Ga = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"], Fa = ["css", "csv", "html", "txt"], xa = { zip: "zip|compressed", epub: "application/epub+zip" }, Xn = (e = "") => (e = e.toLowerCase(), Ga.includes(e) ? "image/" + (e === "jpg" ? "jpeg" : e === "svg" ? "svg+xml" : e) : Fa.includes(e) ? "text/" + e : xa[e] || ""), ar = (e) => new Promise((t, r) => {
  const n = za(e);
  if (n.length && !ka(e))
    return t(n);
  qa(e).then(t);
}), ka = (e) => e.files ? e.files.length > 0 : !1, qa = (e) => new Promise((t, r) => {
  const n = (e.items ? Array.from(e.items) : []).filter((o) => Ba(o)).map((o) => Ua(o));
  if (!n.length) {
    t(e.files ? Array.from(e.files) : []);
    return;
  }
  Promise.all(n).then((o) => {
    const s = [];
    o.forEach((i) => {
      s.push.apply(s, i);
    }), t(s.filter((i) => i).map((i) => (i._relativePath || (i._relativePath = i.webkitRelativePath), i)));
  }).catch(console.error);
}), Ba = (e) => {
  if ($n(e)) {
    const t = lr(e);
    if (t)
      return t.isFile || t.isDirectory;
  }
  return e.kind === "file";
}, Ua = (e) => new Promise((t, r) => {
  if (Ha(e)) {
    Va(lr(e)).then(t).catch(r);
    return;
  }
  t([e.getAsFile()]);
}), Va = (e) => new Promise((t, r) => {
  const n = [];
  let o = 0, s = 0;
  const i = () => {
    s === 0 && o === 0 && t(n);
  }, a = (l) => {
    o++;
    const d = l.createReader(), p = () => {
      d.readEntries((m) => {
        if (m.length === 0) {
          o--, i();
          return;
        }
        m.forEach((h) => {
          h.isDirectory ? a(h) : (s++, h.file((T) => {
            const E = Ya(T);
            h.fullPath && (E._relativePath = h.fullPath), n.push(E), s--, i();
          }));
        }), p();
      }, r);
    };
    p();
  };
  a(e);
}), Ya = (e) => {
  if (e.type.length)
    return e;
  const t = e.lastModifiedDate, r = e.name, n = Xn(Mt(e.name));
  return n.length && (e = e.slice(0, e.size, n), e.name = r, e.lastModifiedDate = t), e;
}, Ha = (e) => $n(e) && (lr(e) || {}).isDirectory, $n = (e) => "webkitGetAsEntry" in e, lr = (e) => e.webkitGetAsEntry(), za = (e) => {
  let t = [];
  try {
    if (t = Xa(e), t.length)
      return t;
    t = Wa(e);
  } catch {
  }
  return t;
}, Wa = (e) => {
  let t = e.getData("url");
  return typeof t == "string" && t.length ? [t] : [];
}, Xa = (e) => {
  let t = e.getData("text/html");
  if (typeof t == "string" && t.length) {
    const r = t.match(/src\s*=\s*"(.+?)"/);
    if (r)
      return [r[1]];
  }
  return [];
}, vt = [], He = (e) => ({ pageLeft: e.pageX, pageTop: e.pageY, scopeLeft: e.offsetX || e.layerX, scopeTop: e.offsetY || e.layerY }), $a = (e, t, r) => {
  const n = ja(t), o = { element: e, filterElement: r, state: null, ondrop: () => {
  }, onenter: () => {
  }, ondrag: () => {
  }, onexit: () => {
  }, onload: () => {
  }, allowdrop: () => {
  } };
  return o.destroy = n.addListener(o), o;
}, ja = (e) => {
  const t = vt.find((n) => n.element === e);
  if (t)
    return t;
  const r = Za(e);
  return vt.push(r), r;
}, Za = (e) => {
  const t = [], r = { dragenter: Ka, dragover: Ja, dragleave: tl, drop: el }, n = {};
  K(r, (s, i) => {
    n[s] = i(e, t), e.addEventListener(s, n[s], !1);
  });
  const o = { element: e, addListener: (s) => (t.push(s), () => {
    t.splice(t.indexOf(s), 1), t.length === 0 && (vt.splice(vt.indexOf(o), 1), K(r, (i) => {
      e.removeEventListener(i, n[i], !1);
    }));
  }) };
  return o;
}, Qa = (e, t) => ("elementFromPoint" in e || (e = document), e.elementFromPoint(t.x, t.y)), cr = (e, t) => {
  const r = Na(t), n = Qa(r, { x: e.pageX - window.pageXOffset, y: e.pageY - window.pageYOffset });
  return n === t || t.contains(n);
};
let jn = null;
const _t = (e, t) => {
  try {
    e.dropEffect = t;
  } catch {
  }
}, Ka = (e, t) => (r) => {
  r.preventDefault(), jn = r.target, t.forEach((n) => {
    const { element: o, onenter: s } = n;
    cr(r, o) && (n.state = "enter", s(He(r)));
  });
}, Ja = (e, t) => (r) => {
  r.preventDefault();
  const n = r.dataTransfer;
  ar(n).then((o) => {
    let s = !1;
    t.some((i) => {
      const { filterElement: a, element: l, onenter: d, onexit: p, ondrag: m, allowdrop: h } = i;
      _t(n, "copy");
      const T = h(o);
      if (!T) {
        _t(n, "none");
        return;
      }
      if (cr(r, l)) {
        if (s = !0, i.state === null) {
          i.state = "enter", d(He(r));
          return;
        }
        if (i.state = "over", a && !T) {
          _t(n, "none");
          return;
        }
        m(He(r));
      } else
        a && !s && _t(n, "none"), i.state && (i.state = null, p(He(r)));
    });
  });
}, el = (e, t) => (r) => {
  r.preventDefault();
  const n = r.dataTransfer;
  ar(n).then((o) => {
    t.forEach((s) => {
      const { filterElement: i, element: a, ondrop: l, onexit: d, allowdrop: p } = s;
      if (s.state = null, !(i && !cr(r, a))) {
        if (!p(o))
          return d(He(r));
        l(He(r), o);
      }
    });
  });
}, tl = (e, t) => (r) => {
  jn === r.target && t.forEach((n) => {
    const { onexit: o } = n;
    n.state = null, o(He(r));
  });
}, rl = (e, t, r) => {
  e.classList.add("filepond--hopper");
  const { catchesDropsOnPage: n, requiresDropOnElement: o, filterItems: s = (p) => p } = r, i = $a(e, n ? document.documentElement : e, o);
  let a = "", l = "";
  i.allowdrop = (p) => t(s(p)), i.ondrop = (p, m) => {
    const h = s(m);
    if (!t(h)) {
      d.ondragend(p);
      return;
    }
    l = "drag-drop", d.onload(h, p);
  }, i.ondrag = (p) => {
    d.ondrag(p);
  }, i.onenter = (p) => {
    l = "drag-over", d.ondragstart(p);
  }, i.onexit = (p) => {
    l = "drag-exit", d.ondragend(p);
  };
  const d = { updateHopperState: () => {
    a !== l && (e.dataset.hopperState = l, a = l);
  }, onload: () => {
  }, ondragstart: () => {
  }, ondrag: () => {
  }, ondragend: () => {
  }, destroy: () => {
    i.destroy();
  } };
  return d;
};
let Zt = !1;
const Qe = [], Zn = (e) => {
  const t = document.activeElement;
  if (t && /textarea|input/i.test(t.nodeName)) {
    let r = !1, n = t;
    for (; n !== document.body; ) {
      if (n.classList.contains("filepond--root")) {
        r = !0;
        break;
      }
      n = n.parentNode;
    }
    if (!r)
      return;
  }
  ar(e.clipboardData).then((r) => {
    r.length && Qe.forEach((n) => n(r));
  });
}, nl = (e) => {
  Qe.includes(e) || (Qe.push(e), !Zt && (Zt = !0, document.addEventListener("paste", Zn)));
}, ol = (e) => {
  er(Qe, Qe.indexOf(e)), Qe.length === 0 && (document.removeEventListener("paste", Zn), Zt = !1);
}, il = () => {
  const e = (r) => {
    t.onload(r);
  }, t = { destroy: () => {
    ol(e);
  }, onload: () => {
  } };
  return nl(e), t;
}, sl = ({ root: e, props: t }) => {
  e.element.id = `filepond--assistant-${t.id}`, ne(e.element, "role", "status"), ne(e.element, "aria-live", "polite"), ne(e.element, "aria-relevant", "additions");
};
let rn = null, nn = null;
const Ut = [], Ct = (e, t) => {
  e.element.textContent = t;
}, al = (e) => {
  e.element.textContent = "";
}, Qn = (e, t, r) => {
  const n = e.query("GET_TOTAL_ITEMS");
  Ct(e, `${r} ${t}, ${n} ${n === 1 ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL")}`), clearTimeout(nn), nn = setTimeout(() => {
    al(e);
  }, 1500);
}, Kn = (e) => e.element.parentNode.contains(document.activeElement), ll = ({ root: e, action: t }) => {
  if (!Kn(e))
    return;
  e.element.textContent = "";
  const r = e.query("GET_ITEM", t.id);
  Ut.push(r.filename), clearTimeout(rn), rn = setTimeout(() => {
    Qn(e, Ut.join(", "), e.query("GET_LABEL_FILE_ADDED")), Ut.length = 0;
  }, 750);
}, cl = ({ root: e, action: t }) => {
  if (!Kn(e))
    return;
  const r = t.item;
  Qn(e, r.filename, e.query("GET_LABEL_FILE_REMOVED"));
}, dl = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, n = e.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
  Ct(e, `${r} ${n}`);
}, on = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, n = e.query("GET_LABEL_FILE_PROCESSING_ABORTED");
  Ct(e, `${r} ${n}`);
}, It = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename;
  Ct(e, `${t.status.main} ${r} ${t.status.sub}`);
}, ul = oe({ create: sl, ignoreRect: !0, ignoreRectUpdate: !0, write: pe({ DID_LOAD_ITEM: ll, DID_REMOVE_ITEM: cl, DID_COMPLETE_ITEM_PROCESSING: dl, DID_ABORT_ITEM_PROCESSING: on, DID_REVERT_ITEM_PROCESSING: on, DID_THROW_ITEM_REMOVE_ERROR: It, DID_THROW_ITEM_LOAD_ERROR: It, DID_THROW_ITEM_INVALID: It, DID_THROW_ITEM_PROCESSING_ERROR: It }), tag: "span", name: "assistant" }), Jn = (e, t = "-") => e.replace(new RegExp(`${t}.`, "g"), (r) => r.charAt(1).toUpperCase()), eo = (e, t = 16, r = !0) => {
  let n = Date.now(), o = null;
  return (...s) => {
    clearTimeout(o);
    const i = Date.now() - n, a = () => {
      n = Date.now(), e(...s);
    };
    i < t ? r || (o = setTimeout(a, t - i)) : a();
  };
}, pl = 1e6, Ot = (e) => e.preventDefault(), fl = ({ root: e, props: t }) => {
  const r = e.query("GET_ID");
  r && (e.element.id = r);
  const n = e.query("GET_CLASS_NAME");
  n && n.split(" ").filter((a) => a.length).forEach((a) => {
    e.element.classList.add(a);
  }), e.ref.label = e.appendChildView(e.createChildView(ma, { ...t, translateY: null, caption: e.query("GET_LABEL_IDLE") })), e.ref.list = e.appendChildView(e.createChildView(da, { translateY: null })), e.ref.panel = e.appendChildView(e.createChildView(qn, { name: "panel-root" })), e.ref.assistant = e.appendChildView(e.createChildView(ul, { ...t })), e.ref.data = e.appendChildView(e.createChildView(Ca, { ...t })), e.ref.measure = Le("div"), e.ref.measure.style.height = "100%", e.element.appendChild(e.ref.measure), e.ref.bounds = null, e.query("GET_STYLES").filter((a) => !Ae(a.value)).map(({ name: a, value: l }) => {
    e.element.dataset[a] = l;
  }), e.ref.widthPrevious = null, e.ref.widthUpdated = eo(() => {
    e.ref.updateHistory = [], e.dispatch("DID_RESIZE_ROOT");
  }, 250), e.ref.previousAspectRatio = null, e.ref.updateHistory = [];
  const o = window.matchMedia("(pointer: fine) and (hover: hover)").matches, s = "PointerEvent" in window;
  e.query("GET_ALLOW_REORDER") && s && !o && (e.element.addEventListener("touchmove", Ot, { passive: !1 }), e.element.addEventListener("gesturestart", Ot));
  const i = e.query("GET_CREDITS");
  if (i.length === 2) {
    const a = document.createElement("a");
    a.className = "filepond--credits", a.setAttribute("aria-hidden", "true"), a.href = i[0], a.tabindex = -1, a.target = "_blank", a.rel = "noopener noreferrer", a.textContent = i[1], e.element.appendChild(a), e.ref.credits = a;
  }
}, El = ({ root: e, props: t, actions: r }) => {
  if (Il({ root: e, props: t, actions: r }), r.filter((F) => /^DID_SET_STYLE_/.test(F.type)).filter((F) => !Ae(F.data.value)).map(({ type: F, data: w }) => {
    const L = Jn(F.substring(8).toLowerCase(), "_");
    e.element.dataset[L] = w.value, e.invalidateLayout();
  }), e.rect.element.hidden)
    return;
  e.rect.element.width !== e.ref.widthPrevious && (e.ref.widthPrevious = e.rect.element.width, e.ref.widthUpdated());
  let n = e.ref.bounds;
  n || (n = e.ref.bounds = Tl(e), e.element.removeChild(e.ref.measure), e.ref.measure = null);
  const { hopper: o, label: s, list: i, panel: a } = e.ref;
  o && o.updateHopperState();
  const l = e.query("GET_PANEL_ASPECT_RATIO"), d = e.query("GET_ALLOW_MULTIPLE"), p = e.query("GET_TOTAL_ITEMS"), m = d ? e.query("GET_MAX_FILES") || pl : 1, h = p === m, T = r.find((F) => F.type === "DID_ADD_ITEM");
  if (h && T) {
    const F = T.data.interactionMethod;
    s.opacity = 0, d ? s.translateY = -40 : F === Ie.API ? s.translateX = 40 : F === Ie.BROWSE ? s.translateY = 40 : s.translateY = 30;
  } else
    h || (s.opacity = 1, s.translateX = 0, s.translateY = 0);
  const E = hl(e), I = ml(e), b = s.rect.element.height, v = !d || h ? 0 : b, D = h ? i.rect.element.marginTop : 0, C = p === 0 ? 0 : i.rect.element.marginBottom, N = v + D + I.visual + C, A = v + D + I.bounds + C;
  if (i.translateY = Math.max(0, v - i.rect.element.marginTop) - E.top, l) {
    const F = e.rect.element.width, w = F * l;
    l !== e.ref.previousAspectRatio && (e.ref.previousAspectRatio = l, e.ref.updateHistory = []);
    const L = e.ref.updateHistory;
    L.push(F);
    const z = 2;
    if (L.length > z * 2) {
      const q = L.length, Z = q - 10;
      let Q = 0;
      for (let O = q; O >= Z; O--)
        if (L[O] === L[O - 2] && Q++, Q >= z)
          return;
    }
    a.scalable = !1, a.height = w;
    const M = w - v - (C - E.bottom) - (h ? D : 0);
    I.visual > M ? i.overflow = M : i.overflow = null, e.height = w;
  } else if (n.fixedHeight) {
    a.scalable = !1;
    const F = n.fixedHeight - v - (C - E.bottom) - (h ? D : 0);
    I.visual > F ? i.overflow = F : i.overflow = null;
  } else if (n.cappedHeight) {
    const F = N >= n.cappedHeight, w = Math.min(n.cappedHeight, N);
    a.scalable = !0, a.height = F ? w : w - E.top - E.bottom;
    const L = w - v - (C - E.bottom) - (h ? D : 0);
    N > n.cappedHeight && I.visual > L ? i.overflow = L : i.overflow = null, e.height = Math.min(n.cappedHeight, A - E.top - E.bottom);
  } else {
    const F = p > 0 ? E.top + E.bottom : 0;
    a.scalable = !0, a.height = Math.max(b, N - F), e.height = Math.max(b, A - F);
  }
  e.ref.credits && a.heightCurrent && (e.ref.credits.style.transform = `translateY(${a.heightCurrent}px)`);
}, hl = (e) => {
  const t = e.ref.list.childViews[0].childViews[0];
  return t ? { top: t.rect.element.marginTop, bottom: t.rect.element.marginBottom } : { top: 0, bottom: 0 };
}, ml = (e) => {
  let t = 0, r = 0;
  const n = e.ref.list, o = n.childViews[0], s = o.childViews.filter((D) => D.rect.element.height), i = e.query("GET_ACTIVE_ITEMS").map((D) => s.find((C) => C.id === D.id)).filter((D) => D);
  if (i.length === 0)
    return { visual: t, bounds: r };
  const a = o.rect.element.width, l = ir(o, i, n.dragCoordinates), d = i[0].rect.element, p = d.marginTop + d.marginBottom, m = d.marginLeft + d.marginRight, h = d.width + m, T = d.height + p, E = typeof l < "u" && l >= 0 ? 1 : 0, I = i.find((D) => D.markedForRemoval && D.opacity < 0.45) ? -1 : 0, b = i.length + E + I, v = or(a, h);
  return v === 1 ? i.forEach((D) => {
    const C = D.rect.element.height + p;
    r += C, t += C * D.opacity;
  }) : (r = Math.ceil(b / v) * T, t = r), { visual: t, bounds: r };
}, Tl = (e) => {
  const t = e.ref.measureHeight || null;
  return { cappedHeight: parseInt(e.style.maxHeight, 10) || null, fixedHeight: t === 0 ? null : t };
}, dr = (e, t) => {
  const r = e.query("GET_ALLOW_REPLACE"), n = e.query("GET_ALLOW_MULTIPLE"), o = e.query("GET_TOTAL_ITEMS");
  let s = e.query("GET_MAX_FILES");
  const i = t.length;
  return !n && i > 1 ? (e.dispatch("DID_THROW_MAX_FILES", { source: t, error: J("warning", 0, "Max files") }), !0) : (s = n ? s : 1, !n && r ? !1 : tt(s) && o + i > s ? (e.dispatch("DID_THROW_MAX_FILES", { source: t, error: J("warning", 0, "Max files") }), !0) : !1);
}, _l = (e, t, r) => {
  const n = e.childViews[0];
  return ir(n, t, { left: r.scopeLeft - n.rect.element.left, top: r.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop) });
}, sn = (e) => {
  const t = e.query("GET_ALLOW_DROP"), r = e.query("GET_DISABLED"), n = t && !r;
  if (n && !e.ref.hopper) {
    const o = rl(e.element, (s) => {
      const i = e.query("GET_BEFORE_DROP_FILE") || (() => !0);
      return e.query("GET_DROP_VALIDATION") ? s.every((a) => We("ALLOW_HOPPER_ITEM", a, { query: e.query }).every((l) => l === !0) && i(a)) : !0;
    }, { filterItems: (s) => {
      const i = e.query("GET_IGNORED_FILES");
      return s.filter((a) => Je(a) ? !i.includes(a.name.toLowerCase()) : !0);
    }, catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"), requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT") });
    o.onload = (s, i) => {
      const a = e.ref.list.childViews[0].childViews.filter((d) => d.rect.element.height), l = e.query("GET_ACTIVE_ITEMS").map((d) => a.find((p) => p.id === d.id)).filter((d) => d);
      ye("ADD_ITEMS", s, { dispatch: e.dispatch }).then((d) => {
        if (dr(e, d))
          return !1;
        e.dispatch("ADD_ITEMS", { items: d, index: _l(e.ref.list, l, i), interactionMethod: Ie.DROP });
      }), e.dispatch("DID_DROP", { position: i }), e.dispatch("DID_END_DRAG", { position: i });
    }, o.ondragstart = (s) => {
      e.dispatch("DID_START_DRAG", { position: s });
    }, o.ondrag = eo((s) => {
      e.dispatch("DID_DRAG", { position: s });
    }), o.ondragend = (s) => {
      e.dispatch("DID_END_DRAG", { position: s });
    }, e.ref.hopper = o, e.ref.drip = e.appendChildView(e.createChildView(va));
  } else
    !n && e.ref.hopper && (e.ref.hopper.destroy(), e.ref.hopper = null, e.removeChildView(e.ref.drip));
}, an = (e, t) => {
  const r = e.query("GET_ALLOW_BROWSE"), n = e.query("GET_DISABLED"), o = r && !n;
  o && !e.ref.browser ? e.ref.browser = e.appendChildView(e.createChildView(Ea, { ...t, onload: (s) => {
    ye("ADD_ITEMS", s, { dispatch: e.dispatch }).then((i) => {
      if (dr(e, i))
        return !1;
      e.dispatch("ADD_ITEMS", { items: i, index: -1, interactionMethod: Ie.BROWSE });
    });
  } }), 0) : !o && e.ref.browser && (e.removeChildView(e.ref.browser), e.ref.browser = null);
}, ln = (e) => {
  const t = e.query("GET_ALLOW_PASTE"), r = e.query("GET_DISABLED"), n = t && !r;
  n && !e.ref.paster ? (e.ref.paster = il(), e.ref.paster.onload = (o) => {
    ye("ADD_ITEMS", o, { dispatch: e.dispatch }).then((s) => {
      if (dr(e, s))
        return !1;
      e.dispatch("ADD_ITEMS", { items: s, index: -1, interactionMethod: Ie.PASTE });
    });
  }) : !n && e.ref.paster && (e.ref.paster.destroy(), e.ref.paster = null);
}, Il = pe({ DID_SET_ALLOW_BROWSE: ({ root: e, props: t }) => {
  an(e, t);
}, DID_SET_ALLOW_DROP: ({ root: e }) => {
  sn(e);
}, DID_SET_ALLOW_PASTE: ({ root: e }) => {
  ln(e);
}, DID_SET_DISABLED: ({ root: e, props: t }) => {
  sn(e), ln(e), an(e, t), e.query("GET_DISABLED") ? e.element.dataset.disabled = "disabled" : e.element.removeAttribute("data-disabled");
} }), gl = oe({ name: "root", read: ({ root: e }) => {
  e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight);
}, create: fl, write: El, destroy: ({ root: e }) => {
  e.ref.paster && e.ref.paster.destroy(), e.ref.hopper && e.ref.hopper.destroy(), e.element.removeEventListener("touchmove", Ot), e.element.removeEventListener("gesturestart", Ot);
}, mixins: { styles: ["height"] } }), yl = (e = {}) => {
  let t = null;
  const r = Rt(), n = xo(Si(r), [Bi, Oi(r)], [ps, vi(r)]);
  n.dispatch("SET_OPTIONS", { options: e });
  const o = () => {
    document.hidden || n.dispatch("KICK");
  };
  document.addEventListener("visibilitychange", o);
  let s = null, i = !1, a = !1, l = null, d = null;
  const p = () => {
    i || (i = !0), clearTimeout(s), s = setTimeout(() => {
      i = !1, l = null, d = null, a && (a = !1, n.dispatch("DID_STOP_RESIZE"));
    }, 500);
  };
  window.addEventListener("resize", p);
  const m = gl(n, { id: Jt() });
  let h = !1, T = !1;
  const E = { _read: () => {
    i && (d = window.innerWidth, l || (l = d), !a && d !== l && (n.dispatch("DID_START_RESIZE"), a = !0)), T && h && (h = m.element.offsetParent === null), !h && (m._read(), T = m.rect.element.hidden);
  }, _write: (y) => {
    const R = n.processActionQueue().filter((P) => !/^SET_/.test(P.type));
    h && !R.length || (D(R), h = m._write(y, R, a), wi(n.query("GET_ITEMS")), h && n.processDispatchQueue());
  } }, I = (y) => (R) => {
    const P = { type: y };
    if (!R)
      return P;
    if (R.hasOwnProperty("error") && (P.error = R.error ? { ...R.error } : null), R.status && (P.status = { ...R.status }), R.file && (P.output = R.file), R.source)
      P.file = R.source;
    else if (R.item || R.id) {
      const x = R.item ? R.item : n.query("GET_ITEM", R.id);
      P.file = x ? Ee(x) : null;
    }
    return R.items && (P.items = R.items.map(Ee)), /progress/.test(y) && (P.progress = R.progress), R.hasOwnProperty("origin") && R.hasOwnProperty("target") && (P.origin = R.origin, P.target = R.target), P;
  }, b = { DID_DESTROY: I("destroy"), DID_INIT: I("init"), DID_THROW_MAX_FILES: I("warning"), DID_INIT_ITEM: I("initfile"), DID_START_ITEM_LOAD: I("addfilestart"), DID_UPDATE_ITEM_LOAD_PROGRESS: I("addfileprogress"), DID_LOAD_ITEM: I("addfile"), DID_THROW_ITEM_INVALID: [I("error"), I("addfile")], DID_THROW_ITEM_LOAD_ERROR: [I("error"), I("addfile")], DID_THROW_ITEM_REMOVE_ERROR: [I("error"), I("removefile")], DID_PREPARE_OUTPUT: I("preparefile"), DID_START_ITEM_PROCESSING: I("processfilestart"), DID_UPDATE_ITEM_PROCESS_PROGRESS: I("processfileprogress"), DID_ABORT_ITEM_PROCESSING: I("processfileabort"), DID_COMPLETE_ITEM_PROCESSING: I("processfile"), DID_COMPLETE_ITEM_PROCESSING_ALL: I("processfiles"), DID_REVERT_ITEM_PROCESSING: I("processfilerevert"), DID_THROW_ITEM_PROCESSING_ERROR: [I("error"), I("processfile")], DID_REMOVE_ITEM: I("removefile"), DID_UPDATE_ITEMS: I("updatefiles"), DID_ACTIVATE_ITEM: I("activatefile"), DID_REORDER_ITEMS: I("reorderfiles") }, v = (y) => {
    const R = { pond: W, ...y };
    delete R.type, m.element.dispatchEvent(new CustomEvent(`FilePond:${y.type}`, { detail: R, bubbles: !0, cancelable: !0, composed: !0 }));
    const P = [];
    y.hasOwnProperty("error") && P.push(y.error), y.hasOwnProperty("file") && P.push(y.file);
    const x = ["type", "error", "file"];
    Object.keys(y).filter((fe) => !x.includes(fe)).forEach((fe) => P.push(y[fe])), W.fire(y.type, ...P);
    const V = n.query(`GET_ON${y.type.toUpperCase()}`);
    V && V(...P);
  }, D = (y) => {
    y.length && y.filter((R) => b[R.type]).forEach((R) => {
      const P = b[R.type];
      (Array.isArray(P) ? P : [P]).forEach((x) => {
        R.type === "DID_INIT_ITEM" ? v(x(R.data)) : setTimeout(() => {
          v(x(R.data));
        }, 0);
      });
    });
  }, C = (y) => n.dispatch("SET_OPTIONS", { options: y }), N = (y) => n.query("GET_ACTIVE_ITEM", y), A = (y) => new Promise((R, P) => {
    n.dispatch("REQUEST_ITEM_PREPARE", { query: y, success: (x) => {
      R(x);
    }, failure: (x) => {
      P(x);
    } });
  }), F = (y, R = {}) => new Promise((P, x) => {
    z([{ source: y, options: R }], { index: R.index }).then((V) => P(V && V[0])).catch(x);
  }), w = (y) => y.file && y.id, L = (y, R) => (typeof y == "object" && !w(y) && !R && (R = y, y = void 0), n.dispatch("REMOVE_ITEM", { ...R, query: y }), n.query("GET_ACTIVE_ITEM", y) === null), z = (...y) => new Promise((R, P) => {
    const x = [], V = {};
    if (Dt(y[0]))
      x.push.apply(x, y[0]), Object.assign(V, y[1] || {});
    else {
      const fe = y[y.length - 1];
      typeof fe == "object" && !(fe instanceof Blob) && Object.assign(V, y.pop()), x.push(...y);
    }
    n.dispatch("ADD_ITEMS", { items: x, index: V.index, interactionMethod: Ie.API, success: R, failure: P });
  }), M = () => n.query("GET_ACTIVE_ITEMS"), q = (y) => new Promise((R, P) => {
    n.dispatch("REQUEST_ITEM_PROCESSING", { query: y, success: (x) => {
      R(x);
    }, failure: (x) => {
      P(x);
    } });
  }), Z = (...y) => {
    const R = Array.isArray(y[0]) ? y[0] : y, P = R.length ? R : M();
    return Promise.all(P.map(A));
  }, Q = (...y) => {
    const R = Array.isArray(y[0]) ? y[0] : y;
    if (!R.length) {
      const P = M().filter((x) => !(x.status === U.IDLE && x.origin === ie.LOCAL) && x.status !== U.PROCESSING && x.status !== U.PROCESSING_COMPLETE && x.status !== U.PROCESSING_REVERT_ERROR);
      return Promise.all(P.map(q));
    }
    return Promise.all(R.map(q));
  }, O = (...y) => {
    const R = Array.isArray(y[0]) ? y[0] : y;
    let P;
    typeof R[R.length - 1] == "object" ? P = R.pop() : Array.isArray(y[0]) && (P = y[1]);
    const x = M();
    return R.length ? R.map((V) => qe(V) ? x[V] ? x[V].id : null : V).filter((V) => V).map((V) => L(V, P)) : Promise.all(x.map((V) => L(V, P)));
  }, W = { ...Lt(), ...E, ...Ri(n, r), setOptions: C, addFile: F, addFiles: z, getFile: N, processFile: q, prepareFile: A, removeFile: L, moveFile: (y, R) => n.dispatch("MOVE_ITEM", { query: y, index: R }), getFiles: M, processFiles: Q, removeFiles: O, prepareFiles: Z, sort: (y) => n.dispatch("SORT", { compare: y }), browse: () => {
    var y = m.element.querySelector("input[type=file]");
    y && y.click();
  }, destroy: () => {
    W.fire("destroy", m.element), n.dispatch("ABORT_ALL"), m._destroy(), window.removeEventListener("resize", p), document.removeEventListener("visibilitychange", o), n.dispatch("DID_DESTROY");
  }, insertBefore: (y) => Mr(m.element, y), insertAfter: (y) => Pr(m.element, y), appendTo: (y) => y.appendChild(m.element), replaceElement: (y) => {
    Mr(m.element, y), y.parentNode.removeChild(y), t = y;
  }, restoreElement: () => {
    t && (Pr(t, m.element), m.element.parentNode.removeChild(m.element), t = null);
  }, isAttachedTo: (y) => m.element === y || t === y, element: { get: () => m.element }, status: { get: () => n.query("GET_STATUS") } };
  return n.dispatch("DID_INIT"), Ge(W);
}, to = (e = {}) => {
  const t = {};
  return K(Rt(), (r, n) => {
    t[r] = n[0];
  }), yl({ ...t, ...e });
}, Sl = (e) => e.charAt(0).toLowerCase() + e.slice(1), Rl = (e) => Jn(e.replace(/^data-/, "")), ro = (e, t) => {
  K(t, (r, n) => {
    K(e, (o, s) => {
      const i = new RegExp(r);
      if (!i.test(o) || (delete e[o], n === !1))
        return;
      if (ue(n)) {
        e[n] = s;
        return;
      }
      const a = n.group;
      se(n) && !e[a] && (e[a] = {}), e[a][Sl(o.replace(i, ""))] = s;
    }), n.mapping && ro(e[n.group], n.mapping);
  });
}, vl = (e, t = {}) => {
  const r = [];
  K(e.attributes, (o) => {
    r.push(e.attributes[o]);
  });
  const n = r.filter((o) => o.name).reduce((o, s) => {
    const i = ne(e, s.name);
    return o[Rl(s.name)] = i === s.name ? !0 : i, o;
  }, {});
  return ro(n, t), n;
}, Ol = (e, t = {}) => {
  const r = { "^class$": "className", "^multiple$": "allowMultiple", "^capture$": "captureMethod", "^webkitdirectory$": "allowDirectoriesOnly", "^server": { group: "server", mapping: { "^process": { group: "process" }, "^revert": { group: "revert" }, "^fetch": { group: "fetch" }, "^restore": { group: "restore" }, "^load": { group: "load" } } }, "^type$": !1, "^files$": !1 };
  We("SET_ATTRIBUTE_TO_OPTION_MAP", r);
  const n = { ...t }, o = vl(e.nodeName === "FIELDSET" ? e.querySelector("input[type=file]") : e, r);
  Object.keys(o).forEach((i) => {
    se(o[i]) ? (se(n[i]) || (n[i] = {}), Object.assign(n[i], o[i])) : n[i] = o[i];
  }), n.files = (t.files || []).concat(Array.from(e.querySelectorAll("input:not([type=file])")).map((i) => ({ source: i.value, options: { type: i.dataset.type } })));
  const s = to(n);
  return e.files && Array.from(e.files).forEach((i) => {
    s.addFile(i);
  }), s.replaceElement(e), s;
}, bl = (...e) => Fo(e[0]) ? Ol(...e) : to(...e), Dl = ["fire", "_read", "_write"], cn = (e) => {
  const t = {};
  return Rn(e, t, Dl), t;
}, wl = (e, t) => e.replace(/(?:{([a-zA-Z]+)})/g, (r, n) => t[n]), Al = (e) => {
  const t = new Blob(["(", e.toString(), ")()"], { type: "application/javascript" }), r = URL.createObjectURL(t), n = new Worker(r);
  return { transfer: (o, s) => {
  }, post: (o, s, i) => {
    const a = Jt();
    n.onmessage = (l) => {
      l.data.id === a && s(l.data.message);
    }, n.postMessage({ id: a, message: o }, i);
  }, terminate: () => {
    n.terminate(), URL.revokeObjectURL(r);
  } };
}, Ll = (e) => new Promise((t, r) => {
  const n = new Image();
  n.onload = () => {
    t(n);
  }, n.onerror = (o) => {
    r(o);
  }, n.src = e;
}), no = (e, t) => {
  const r = e.slice(0, e.size, e.type);
  return r.lastModifiedDate = e.lastModifiedDate, r.name = t, r;
}, Ml = (e) => no(e, e.name), dn = [], Pl = (e) => {
  if (dn.includes(e))
    return;
  dn.push(e);
  const t = e({ addFilter: Li, utils: { Type: g, forin: K, isString: ue, isFile: Je, toNaturalFileSize: Fn, replaceInString: wl, getExtensionFromFilename: Mt, getFilenameWithoutExtension: Cn, guesstimateMimeType: Xn, getFileFromBlob: Ke, getFilenameFromURL: ut, createRoute: pe, createWorker: Al, createView: oe, createItemAPI: Ee, loadImage: Ll, copyFile: Ml, renameFile: no, createBlob: Ln, applyFilterChain: ye, text: ee, getNumericAspectRatioFromString: bn }, views: { fileActionButton: Gn } });
  Mi(t.options);
}, Cl = () => Object.prototype.toString.call(window.operamini) === "[object OperaMini]", Nl = () => "Promise" in window, Gl = () => "slice" in Blob.prototype, Fl = () => "URL" in window && "createObjectURL" in window.URL, xl = () => "visibilityState" in document, kl = () => "performance" in window, ql = () => "supports" in (window.CSS || {}), Bl = () => /MSIE|Trident/.test(window.navigator.userAgent), un = (() => {
  const e = Tn() && !Cl() && xl() && Nl() && Gl() && Fl() && kl() && (ql() || Bl());
  return () => e;
})(), Ce = { apps: [] }, Ul = "filepond", Xe = () => {
};
let Qt = {}, pn = {}, yt = Xe, Vt = Xe, fn = Xe, En = Xe, bt = Xe, hn = Xe, mn = Xe;
if (un()) {
  li(() => {
    Ce.apps.forEach((r) => r._read());
  }, (r) => {
    Ce.apps.forEach((n) => n._write(r));
  });
  const e = () => {
    document.dispatchEvent(new CustomEvent("FilePond:loaded", { detail: { supported: un, create: yt, destroy: Vt, parse: fn, find: En, registerPlugin: bt, setOptions: mn } })), document.removeEventListener("DOMContentLoaded", e);
  };
  document.readyState !== "loading" ? setTimeout(() => e(), 0) : document.addEventListener("DOMContentLoaded", e);
  const t = () => K(Rt(), (r, n) => {
    pn[r] = n[1];
  });
  Qt = { ...Dn }, pn = {}, t(), yt = (...r) => {
    const n = bl(...r);
    return n.on("destroy", Vt), Ce.apps.push(n), cn(n);
  }, Vt = (r) => {
    const n = Ce.apps.findIndex((o) => o.isAttachedTo(r));
    return n >= 0 ? (Ce.apps.splice(n, 1)[0].restoreElement(), !0) : !1;
  }, fn = (r) => Array.from(r.querySelectorAll(`.${Ul}`)).filter((n) => !Ce.apps.find((o) => o.isAttachedTo(n))).map((n) => yt(n)), En = (r) => {
    const n = Ce.apps.find((o) => o.isAttachedTo(r));
    return n ? cn(n) : null;
  }, bt = (...r) => {
    r.forEach(Pl), t();
  }, hn = () => {
    const r = {};
    return K(Rt(), (n, o) => {
      r[n] = o[0];
    }), r;
  }, mn = (r) => (se(r) && (Ce.apps.forEach((n) => {
    n.setOptions(r);
  }), Pi(r)), hn());
}
/*!
* FilePondPluginFileValidateType 1.2.9
* Licensed under MIT, https://opensource.org/licenses/MIT/
* Please visit https://pqina.nl/filepond/ for details.
*/
const oo = ({ addFilter: e, utils: t }) => {
  const { Type: r, isString: n, replaceInString: o, guesstimateMimeType: s, getExtensionFromFilename: i, getFilenameFromURL: a } = t, l = (T, E) => {
    const I = (/^[^/]+/.exec(T) || []).pop(), b = E.slice(0, -2);
    return I === b;
  }, d = (T, E) => T.some((I) => /\*$/.test(I) ? l(E, I) : I === E), p = (T) => {
    let E = "";
    if (n(T)) {
      const I = a(T), b = i(I);
      b && (E = s(b));
    } else
      E = T.type;
    return E;
  }, m = (T, E, I) => {
    if (E.length === 0)
      return !0;
    const b = p(T);
    return I ? new Promise((v, D) => {
      I(T, b).then((C) => {
        d(E, C) ? v() : D();
      }).catch(D);
    }) : d(E, b);
  }, h = (T) => (E) => T[E] === null ? !1 : T[E] || E;
  return e("SET_ATTRIBUTE_TO_OPTION_MAP", (T) => Object.assign(T, { accept: "acceptedFileTypes" })), e("ALLOW_HOPPER_ITEM", (T, { query: E }) => E("GET_ALLOW_FILE_TYPE_VALIDATION") ? m(T, E("GET_ACCEPTED_FILE_TYPES")) : !0), e("LOAD_FILE", (T, { query: E }) => new Promise((I, b) => {
    if (!E("GET_ALLOW_FILE_TYPE_VALIDATION")) {
      I(T);
      return;
    }
    const v = E("GET_ACCEPTED_FILE_TYPES"), D = E("GET_FILE_VALIDATE_TYPE_DETECT_TYPE"), C = m(T, v, D), N = () => {
      const A = v.map(h(E("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP"))).filter((w) => w !== !1), F = A.filter((w, L) => A.indexOf(w) === L);
      b({ status: { main: E("GET_LABEL_FILE_TYPE_NOT_ALLOWED"), sub: o(E("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES"), { allTypes: F.join(", "), allButLastType: F.slice(0, -1).join(", "), lastType: F[F.length - 1] }) } });
    };
    if (typeof C == "boolean")
      return C ? I(T) : N();
    C.then(() => {
      I(T);
    }).catch(N);
  })), { options: { allowFileTypeValidation: [!0, r.BOOLEAN], acceptedFileTypes: [[], r.ARRAY], labelFileTypeNotAllowed: ["File is of invalid type", r.STRING], fileValidateTypeLabelExpectedTypes: ["Expects {allButLastType} or {lastType}", r.STRING], fileValidateTypeLabelExpectedTypesMap: [{}, r.OBJECT], fileValidateTypeDetectType: [null, r.FUNCTION] } };
}, Vl = typeof window < "u" && typeof window.document < "u";
Vl && document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: oo }));
/*!
* FilePondPluginFileValidateSize 2.2.8
* Licensed under MIT, https://opensource.org/licenses/MIT/
* Please visit https://pqina.nl/filepond/ for details.
*/
const io = ({ addFilter: e, utils: t }) => {
  const { Type: r, replaceInString: n, toNaturalFileSize: o } = t;
  return e("ALLOW_HOPPER_ITEM", (s, { query: i }) => {
    if (!i("GET_ALLOW_FILE_SIZE_VALIDATION"))
      return !0;
    const a = i("GET_MAX_FILE_SIZE");
    if (a !== null && s.size > a)
      return !1;
    const l = i("GET_MIN_FILE_SIZE");
    return !(l !== null && s.size < l);
  }), e("LOAD_FILE", (s, { query: i }) => new Promise((a, l) => {
    if (!i("GET_ALLOW_FILE_SIZE_VALIDATION"))
      return a(s);
    const d = i("GET_FILE_VALIDATE_SIZE_FILTER");
    if (d && !d(s))
      return a(s);
    const p = i("GET_MAX_FILE_SIZE");
    if (p !== null && s.size > p) {
      l({ status: { main: i("GET_LABEL_MAX_FILE_SIZE_EXCEEDED"), sub: n(i("GET_LABEL_MAX_FILE_SIZE"), { filesize: o(p, ".", i("GET_FILE_SIZE_BASE"), i("GET_FILE_SIZE_LABELS", i)) }) } });
      return;
    }
    const m = i("GET_MIN_FILE_SIZE");
    if (m !== null && s.size < m) {
      l({ status: { main: i("GET_LABEL_MIN_FILE_SIZE_EXCEEDED"), sub: n(i("GET_LABEL_MIN_FILE_SIZE"), { filesize: o(m, ".", i("GET_FILE_SIZE_BASE"), i("GET_FILE_SIZE_LABELS", i)) }) } });
      return;
    }
    const h = i("GET_MAX_TOTAL_FILE_SIZE");
    if (h !== null && i("GET_ACTIVE_ITEMS").reduce((T, E) => T + E.fileSize, 0) > h) {
      l({ status: { main: i("GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED"), sub: n(i("GET_LABEL_MAX_TOTAL_FILE_SIZE"), { filesize: o(h, ".", i("GET_FILE_SIZE_BASE"), i("GET_FILE_SIZE_LABELS", i)) }) } });
      return;
    }
    a(s);
  })), { options: { allowFileSizeValidation: [!0, r.BOOLEAN], maxFileSize: [null, r.INT], minFileSize: [null, r.INT], maxTotalFileSize: [null, r.INT], fileValidateSizeFilter: [null, r.FUNCTION], labelMinFileSizeExceeded: ["File is too small", r.STRING], labelMinFileSize: ["Minimum file size is {filesize}", r.STRING], labelMaxFileSizeExceeded: ["File is too large", r.STRING], labelMaxFileSize: ["Maximum file size is {filesize}", r.STRING], labelMaxTotalFileSizeExceeded: ["Maximum total size exceeded", r.STRING], labelMaxTotalFileSize: ["Maximum total file size is {filesize}", r.STRING] } };
}, Yl = typeof window < "u" && typeof window.document < "u";
Yl && document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: io }));
class et {
  constructor(t) {
    if (t.dataset.refFileUpload)
      return et.refs[t.dataset.refFileUpload];
    this.ref = Math.random(), et.refs[this.ref] = this, t.dataset.refFileUpload = this.ref, this.inputs = t.querySelectorAll('input[type="file"]'), this.fileponds = {}, this.headers = { Authorization: "pFdRC99ihTG!C%BQB6EJKjc!n%" }, document.addEventListener("FilePond:loaded", () => this.onload());
    const r = new ze(t.closest("[c-async-form]"));
    r.onBeforeSubmit = () => this.beforeSubmit(), r.onPayload = (n) => this.onPayload(n), r.onInput = async (n, o) => await this.inputHandler(n, o);
  }
  onload() {
    bt(oo), bt(io);
    const t = { server: { url: "https://formupload.agentur-chapeau.de/", process: { url: "process", headers: this.headers }, revert: { url: "revert", headers: this.headers }, restore: null, load: null, fetch: null }, credits: !1, labelIdle: `
			<div>
				<span>Dateien hierher ziehen oder <span class="filepond--label-action">auswählen</span></span>
			</div>
			`, labelInvalidField: "Feld enthält ungültige Dateien", labelFileWaitingForSize: "Auf Größe warten", labelFileSizeNotAvailable: "Größe nicht verfügbar", labelFileLoading: "Laden", labelFileLoadError: "Fehler beim Laden", labelFileProcessing: "Hochladen", labelFileProcessingComplete: "Hochgeladen", labelFileProcessingAborted: "Hochladen abgebrochen", labelFileProcessingError: "Fehler beim Hochladen", labelFileProcessingRevertError: "Fehler beim Entfernen", labelFileRemoveError: "Fehler beim Löschen", labelTapToCancel: "Tippen zum Abbrechen ", labelTapToRetry: "Tippen zum Wiederholen", labelTapToUndo: "Tippen zum Entfernen", labelButtonRemoveItem: "Entfernen", labelButtonAbortItemLoad: "Abbrechen", labelButtonRetryItemLoad: "Wiederholen", labelButtonAbortItemProcessing: "Abbrechen", labelButtonUndoItemProcessing: "Entfernen", labelButtonRetryItemProcessing: "Wiederholen", labelButtonProcessItem: "Hochladen", labelMaxFileSizeExceeded: "Datei ist zu groß", labelMaxFileSize: "Maximale Dateigröße beträgt {filesize}", labelMaxTotalFileSizeExceeded: "Maximale Gesamtgröße überschritten", labelMaxTotalFileSize: "Maximale Gesamtgröße beträgt {filesize}", labelFileTypeNotAllowed: "Ungültiger Dateityp", fileValidateTypeLabelExpectedTypes: "Gültige Dateitypen: {allButLastType} und {lastType}", fileValidateTypeLabelExpectedTypesMap: { "image/*": "Bilddateien", "image/png": ".png", "image/jpg": ".jpg", "image/jpeg": ".jpeg", "application/pdf": ".pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx" } };
    for (const r of this.inputs)
      this.fileponds[r.name] = yt(r, { ...t, maxFiles: r.dataset.maxFiles || null, maxFileSize: r.dataset.maxFileSize || null, maxTotalFileSize: r.dataset.maxTotalFileSize || null });
  }
  beforeSubmit() {
    for (const [t, r] of Object.entries(this.fileponds))
      if (!(r.status == Qt.EMPTY || r.status == Qt.READY))
        return alert("Es sind noch nicht alle Dateien hochgeladen!"), !1;
    return !0;
  }
  onPayload(t) {
    for (const r of this.inputs)
      r.multiple && (t[r.name] = []);
    return t;
  }
  async inputHandler(t, r) {
    if (!t.closest(".filepond--root"))
      return r;
    if (!t.closest(".filepond--data"))
      return null;
    const n = this.fileponds[t.name], o = n.getFiles().find((d) => d.serverId === r), s = await fetch(`${n.server.url}finish`, { method: "POST", body: r, headers: this.headers });
    if (!s.ok)
      throw new Error("Upload could not finish ", s);
    const i = await s.text(), a = o.filename, l = o.fileSize;
    return { url: i, name: a, size: l };
  }
}
et.refs = {}, document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.querySelectorAll("[c-file-upload]")).forEach((e) => new et(e));
}), document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search) {
    const r = new URLSearchParams(window.location.search), n = r.get("gclid");
    n && window.localStorage.setItem("gclid", n);
    const o = r.get("fbclid");
    if (o) {
      const i = `fb.1.${Date.now()}.${o}`;
      window.localStorage.setItem("fbc", i);
    }
    const s = r.get("ttclid");
    s && window.localStorage.setItem("ttclid", s);
  }
  Array.from(document.querySelectorAll("[c-conversion] > form")).forEach((r) => {
    const n = ["gclid", "fbc", "fbp", "user-agent", "ttclid", "url"].reduce((o, s) => {
      const i = document.createElement("input");
      return i.type = "hidden", i.name = s, r.appendChild(i), { ...o, [s]: i };
    }, {});
    r.addEventListener("submit", () => {
      const o = e();
      n.gclid.value = o.gclid, n.fbc.value = o.fbc, n.fbp.value = o.fbp, n["user-agent"].value = o.useragent, n.ttclid.value = o.ttclid, n.url.value = o.url, window.fbq !== void 0 && fbq("track", "SubmitApplication", {}, { eventID: o.fbp });
    });
  }), Array.from(document.querySelectorAll("[data-fb-track]")).forEach((r) => {
    r.addEventListener("click", () => {
      if (r.dataset.trackDisabled === "true")
        return;
      const n = r.dataset.fbTrack, o = e(), s = r.dataset.trackUrl;
      window.fbq !== void 0 && fbq("track", n, {}, { eventID: o.fbp }), fetch(s, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: n, ...o }) });
    });
  });
  function e() {
    const r = window.localStorage.getItem("gclid"), n = window.localStorage.getItem("fbc"), o = t("_fbp"), s = navigator.userAgent, i = window.localStorage.getItem("ttclid"), a = window.location.href;
    return { gclid: r, fbc: n, fbp: o, useragent: s, ttclid: i, url: a };
  }
  function t(r) {
    const n = `; ${document.cookie}`.split(`; ${r}=`);
    return n.length === 2 ? n.pop().split(";").shift() : null;
  }
});
var so = { exports: {} };
(function(e, t) {
  (function() {
    function r(u) {
      Object.defineProperty(u, "__esModule", { value: !0 });
    }
    var n = this, o = {};
    function s(u, c) {
      var f;
      if (typeof Symbol > "u" || u[Symbol.iterator] == null) {
        if (Array.isArray(u) || (f = i(u)) || c && u && typeof u.length == "number") {
          f && (u = f);
          var _ = 0, S = function() {
          };
          return { s: S, n: function() {
            return _ >= u.length ? { done: !0 } : { done: !1, value: u[_++] };
          }, e: function(G) {
            throw G;
          }, f: S };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var k, H = !0, B = !1;
      return { s: function() {
        f = u[Symbol.iterator]();
      }, n: function() {
        var G = f.next();
        return H = G.done, G;
      }, e: function(G) {
        B = !0, k = G;
      }, f: function() {
        try {
          H || f.return == null || f.return();
        } finally {
          if (B)
            throw k;
        }
      } };
    }
    function i(u, c) {
      if (u) {
        if (typeof u == "string")
          return a(u, c);
        var f = Object.prototype.toString.call(u).slice(8, -1);
        return f === "Object" && u.constructor && (f = u.constructor.name), f === "Map" || f === "Set" ? Array.from(u) : f === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f) ? a(u, c) : void 0;
      }
    }
    function a(u, c) {
      (c == null || c > u.length) && (c = u.length);
      for (var f = 0, _ = new Array(c); f < c; f++)
        _[f] = u[f];
      return _;
    }
    Object.defineProperty(o, "__esModule", { value: !0 });
    var l = (d = void 0, p = o.isFormElement = d, m = o.isVisible = p, h = o.getDistanceFromTop = m, T = o.convertToString = h, o.validateEmail = T);
    o.findTextNode = l;
    var d = function(u) {
      return u instanceof HTMLInputElement || u instanceof HTMLSelectElement || u instanceof HTMLTextAreaElement;
    };
    o.isFormElement = d;
    var p = function(u) {
      return !!(u.offsetWidth || u.offsetHeight || u.getClientRects().length);
    };
    o.isVisible = p;
    var m = function(u) {
      var c = u, f = 0;
      if (c.offsetParent)
        do
          f += c.offsetTop, c = c.offsetParent instanceof HTMLElement ? c.offsetParent : null;
        while (c);
      return f >= 0 ? f : 0;
    };
    o.getDistanceFromTop = m;
    var h = function(u) {
      return typeof u == "string" ? u : typeof u == "number" ? u.toString() : u ? "true" : "false";
    };
    o.convertToString = h;
    var T = function(u) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(u).toLowerCase());
    };
    o.validateEmail = T, l = function(u) {
      var c, f, _ = s(u.childNodes);
      try {
        for (_.s(); !(f = _.n()).done; ) {
          var S = f.value;
          if (S.childNodes.length && (c = l(S)), S.nodeType == Node.TEXT_NODE && (c = S), c)
            break;
        }
      } catch (k) {
        _.e(k);
      } finally {
        _.f();
      }
      return c;
    }, o.findTextNode = l;
    var E = {};
    function I(u, c) {
      if (!(u instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function b(u, c) {
      for (var f = 0; f < c.length; f++) {
        var _ = c[f];
        _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(u, _.key, _);
      }
    }
    function v(u, c, f) {
      return c && b(u.prototype, c), f && b(u, f), u;
    }
    Object.defineProperty(E, "__esModule", { value: !0 });
    var D = function() {
      function u(c) {
        I(this, u), this.view = c, this.currentStep = 0, this.alertShown = !1, this.view = c, this.init();
      }
      return v(u, [{ key: "init", value: function() {
        this.view.setMaskHeight(this.currentStep), this.view.disableElement(this.view.back), this.view.setButtonText(this.currentStep), this.view.setStepsDisplay(this.currentStep), this.view.createHiddenForm(), this.setAlert(), this.setEvents();
      } }, { key: "setEvents", value: function() {
        var c = this, f = function(S) {
          c.navClick(S);
        }, _ = function(S) {
          c.handleInput(S);
        };
        this.view.next.addEventListener("click", function() {
          c.nextClick();
        }), this.view.back && this.view.back.addEventListener("click", function() {
          c.backClick();
        }), this.view.navLinks.forEach(function(S) {
          S.addEventListener("click", f);
        }), this.view.inputs.forEach(function(S) {
          S.addEventListener("input", _);
        }), this.view.form.addEventListener("submit", function(S) {
          c.handleSubmit();
        }), this.view.sendHiddenForm && this.view.rightArrow.addEventListener("click", function S() {
          c.currentStep === c.view.hiddenFormStep && (c.view.submitHiddenForm(), c.view.rightArrow.removeEventListener("click", S));
        });
      } }, { key: "nextClick", value: function() {
        this.checkRequiredInputs() ? (this.currentStep++, this.currentStep === 1 && this.view.enableElement(this.view.back), this.currentStep === this.view.steps.length ? this.view.submitForm() : (this.view.goNext(), this.view.setMaskHeight(this.currentStep), this.view.setButtonText(this.currentStep), this.view.setStepsDisplay(this.currentStep)), this.hideAlert(), this.view.scrollTop()) : this.showAlert();
      } }, { key: "backClick", value: function() {
        var c = this.currentStep - 1;
        c < 0 || (this.view.goBack(), this.view.setMaskHeight(c), this.view.setButtonText(c), this.view.setStepsDisplay(c), this.hideAlert(), this.view.scrollTop(), this.currentStep = c, this.currentStep === 0 && this.view.disableElement(this.view.back));
      } }, { key: "navClick", value: function(c) {
        var f = c.currentTarget;
        if (f instanceof HTMLElement) {
          var _ = +f.dataset.msfNav - 1;
          _ < this.currentStep && (this.view.sliderDots[_].click(), this.currentStep = _, this.view.setMaskHeight(this.currentStep), this.view.setButtonText(this.currentStep), this.currentStep === 0 && this.view.disableElement(this.view.back));
        }
      } }, { key: "handleInput", value: function(c) {
        var f = c.currentTarget;
        if (d(f)) {
          var _ = "-";
          switch (f.type) {
            case "checkbox":
              if (!(f instanceof HTMLInputElement))
                break;
              _ = f.checked;
              var S = f.parentElement;
              if (!S)
                break;
              var k = S.querySelector(".w-checkbox-input");
              f.checked && k && this.view.removeWarningClass(k);
              break;
            case "radio":
              var H = this.view.form.querySelector('input[name="'.concat(f.name, '"]:checked'));
              if (!(H instanceof HTMLInputElement))
                break;
              _ = H.value;
              var B = f.parentElement;
              if (!B)
                break;
              var G = B.querySelector(".w-radio-input");
              G && this.view.removeWarningClass(G);
              break;
            default:
              if (!f.value || f.type === "email" && !T(f.value))
                break;
              _ = f.value, this.view.removeWarningClass(f);
          }
          this.view.setValues(f, _);
        }
      } }, { key: "checkRequiredInputs", value: function() {
        var c = this, f = this.view.getInputs(this.currentStep).filter(function(S) {
          return S.required && p(S);
        }), _ = 0;
        return f.forEach(function(S) {
          switch (S.type) {
            case "checkbox":
              if (S.checkValidity()) {
                _++;
                break;
              }
              var k = S.parentElement;
              if (!k)
                break;
              var H = k.querySelector(".w-checkbox-input");
              H && c.view.addWarningClass(H);
              break;
            case "radio":
              if (S.checkValidity()) {
                _++;
                break;
              }
              var B = S.parentElement;
              if (!B)
                break;
              var G = B.querySelector(".w-radio-input");
              G && c.view.addWarningClass(G);
              break;
            default:
              if (!S.checkValidity() || S.type === "email" && !T(S.value)) {
                c.view.addWarningClass(S);
                break;
              }
              _++;
          }
        }), _ === f.length;
      } }, { key: "setAlert", value: function() {
        this.view.alertInteraction || this.view.hideElement(this.view.alert, !0);
      } }, { key: "showAlert", value: function() {
        this.alertShown || (this.view.showAlert(), this.alertShown = !0);
      } }, { key: "hideAlert", value: function() {
        this.alertShown && (this.view.hideAlert(), this.alertShown = !1);
      } }, { key: "observeSubmitText", value: function() {
        var c = this, f = this.view.submitButton;
        new MutationObserver(function(_) {
          _.forEach(function(S) {
            S.type === "attributes" && S.attributeName === "value" && (c.view.next.textContent = f.value);
          });
        }).observe(this.view.submitButton, { attributes: !0 });
      } }, { key: "handleSubmit", value: function() {
        this.view.disableButtons(), this.view.hideButtons();
      } }]), u;
    }(), C = D;
    E.default = C;
    var N = {};
    function A(u, c) {
      if (!(u instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function F(u, c) {
      for (var f = 0; f < c.length; f++) {
        var _ = c[f];
        _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(u, _.key, _);
      }
    }
    function w(u, c, f) {
      return c && F(u.prototype, c), f && F(u, f), u;
    }
    Object.defineProperty(N, "__esModule", { value: !0 });
    var L = function() {
      function u(c) {
        var f, _ = c.alertSelector, S = c.alertText, k = c.backSelector, H = c.backText, B = c.completedPercentageSelector, G = c.currentStepSelector, te = c.formSelector, X = c.hiddeButtonsOnSubmit, ae = X === void 0 || X, $ = c.hiddenFormStep, he = $ === void 0 ? 1 : $, re = c.nextSelector, Oe = c.nextText, it = c.scrollTopOnStepChange, st = it !== void 0 && it, ce = c.sendHiddenForm, ge = ce !== void 0 && ce, we = c.warningClass;
        A(this, u);
        var ft = document.querySelector(te);
        if (!ft)
          throw new Error("No form was found with the selector ".concat(te));
        this.form = ft;
        var Tr = document.querySelector(re);
        if (!Tr)
          throw new Error("No next button was found with the selector ".concat(re));
        if (this.next = Tr, k) {
          var _r = document.querySelector(k);
          if (!_r)
            throw new Error("No back button was found with the selector ".concat(k));
          this.back = _r;
        }
        if (_) {
          var Ir = document.querySelector(_);
          if (!Ir)
            throw new Error("No alert element was found with the selector ".concat(_));
          this.alert = Ir;
        }
        var gr = ft.querySelector('input[type="submit"]');
        if (!gr)
          throw new Error("No next button was found with the selector ".concat(re));
        if (this.submitButton = gr, G) {
          var yr = document.querySelector(G);
          if (!yr)
            throw new Error("No current step display element was found with the selector ".concat(G));
          this.currentStepDisplay = yr;
        }
        if (B) {
          var Sr = document.querySelector(B);
          if (!Sr)
            throw new Error("No completed percentage display element was found with the selector ".concat(B));
          this.completedPercentageDisplay = Sr;
        }
        var ke = ft.querySelector(".w-slider");
        if (!ke)
          throw new Error("No slider found inside the form, please add one.");
        this.slider = ke;
        var Rr = ke.querySelector(".w-slider-mask");
        if (!Rr)
          throw new Error("No mask found inside the slider!");
        this.mask = Rr, this.steps = ke.querySelectorAll(".w-slide");
        var vr = ke.querySelector(".w-slider-arrow-right");
        if (!vr)
          throw new Error("No right arrow found inside the slider!");
        this.rightArrow = vr;
        var Or = ke.querySelector(".w-slider-arrow-left");
        if (!Or)
          throw new Error("No left arrow found inside the slider!");
        this.leftArrow = Or, this.sliderDots = ke.querySelectorAll(".w-slider-dot"), this.navLinks = document.querySelectorAll("[data-msf-nav]"), this.nextText = Oe || this.next.textContent || "Next", this.backText = H, this.submitText = this.submitButton.value, this.warningClass = we, this.alertText = S, this.alertInteraction = (f = this.alert) === null || f === void 0 ? void 0 : f.querySelector('[data-msf="alert"]'), this.scrollTopOnStepChange = st, this.hiddeButtonsOnSubmit = ae, this.sendHiddenForm = ge, this.hiddenFormStep = he >= 1 ? he : 1, this.inputs = this.getInputs();
      }
      return w(u, [{ key: "setMaskHeight", value: function(c) {
        this.mask.style.height = "", this.mask.style.height = "".concat(this.steps[c].offsetHeight, "px");
      } }, { key: "getInputs", value: function(c) {
        var f = typeof c == "number" ? this.steps[c].querySelectorAll("input, select, textarea") : this.form.querySelectorAll("input, select, textarea");
        return Array.from(f);
      } }, { key: "setButtonText", value: function(c) {
        var f = this, _ = function(k) {
          var H = k === "back" ? f.back : f.next;
          if (H) {
            var B = l(H), G = k === "back" ? f.backText : f.nextText;
            if (B && Array.isArray(G) && G.length > 0)
              for (var te = function(ae) {
                var $ = G.findIndex(function(he) {
                  return +he.step - 1 == c - ae;
                });
                if ($ >= 0)
                  return B.textContent = G[$].text, "break";
              }, X = 0; X <= c && te(X) !== "break"; X++)
                ;
          }
        };
        _("back");
        var S = l(this.next);
        S && c === this.steps.length - 1 ? S.textContent = this.submitText : S && typeof this.nextText == "string" && c === this.steps.length - 2 ? S.textContent = this.nextText : _("next");
      } }, { key: "goNext", value: function() {
        this.rightArrow.click();
      } }, { key: "goBack", value: function() {
        this.leftArrow.click();
      } }, { key: "submitForm", value: function() {
        this.submitButton.click();
      } }, { key: "submitHiddenForm", value: function() {
        this.sendHiddenForm && this.hiddenSubmitButton.click();
      } }, { key: "addWarningClass", value: function(c) {
        this.warningClass && c.classList.add(this.warningClass);
      } }, { key: "removeWarningClass", value: function(c) {
        this.warningClass && c.classList.remove(this.warningClass);
      } }, { key: "hideElement", value: function(c) {
        var f = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (c) {
          var _ = getComputedStyle(c);
          _.transition === "all 0s ease 0s" && (c.style.transition = "opacity 0.2s ease"), f && _.display !== "none" && c.addEventListener("transitionend", function S() {
            c.style.display = "none", c.removeEventListener("transitionend", S);
          }), c.style.opacity = "0", this.disableElement(c);
        }
      } }, { key: "showElement", value: function(c) {
        var f = this, _ = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        c && (_ && (c.style.display = "block"), requestAnimationFrame(function() {
          c.style.opacity = "", f.enableElement(c);
        }));
      } }, { key: "disableElement", value: function(c) {
        c && (c.style.pointerEvents = "none");
      } }, { key: "enableElement", value: function(c) {
        c && (c.style.pointerEvents = "");
      } }, { key: "disableButtons", value: function() {
        var c = this;
        this.disableElement(this.next), this.disableElement(this.back), this.navLinks.forEach(function(f) {
          return c.disableElement(f);
        });
      } }, { key: "hideButtons", value: function() {
        this.hiddeButtonsOnSubmit && (this.hideElement(this.next), this.back && this.hideElement(this.back));
      } }, { key: "showAlert", value: function() {
        this.alertText && alert(this.alertText), this.alert && (this.alertInteraction ? this.alertInteraction.click() : this.showElement(this.alert, !0));
      } }, { key: "hideAlert", value: function() {
        this.alert && (this.alertInteraction ? this.alertInteraction.click() : this.hideElement(this.alert, !0));
      } }, { key: "scrollTop", value: function() {
        this.scrollTopOnStepChange && window.scrollTo({ top: m(this.form), behavior: "smooth" });
      } }, { key: "setValues", value: function(c, f) {
        f = h(f);
        var _ = document.querySelector('[data-msf-value="'.concat(c.id, '"]')) || document.querySelector('[data-msf-value="'.concat(c.name, '"]'));
        if (_ && (_.textContent = f), c.matches('[data-msf="hidden"]')) {
          var S = this.hiddenForm.querySelector("#hidden-".concat(c.id));
          S instanceof HTMLInputElement && (S.value = f);
        }
      } }, { key: "setStepsDisplay", value: function(c) {
        this.currentStepDisplay && (this.currentStepDisplay.textContent = (c + 1).toString()), this.completedPercentageDisplay && (this.completedPercentageDisplay.textContent = "".concat(Math.round(c / (this.steps.length - 1) * 100), "%"));
      } }, { key: "createHiddenForm", value: function() {
        var c, f = this;
        if (this.sendHiddenForm) {
          var _ = this.form.parentElement;
          _ && (_.insertAdjacentHTML("afterend", `
    <div class="w-form" style="display: none;">
        <form id="msf-hidden-form" name="MSF Hidden Form" data-name="MSF Hidden Form">
            <input type="submit" value="Submit" data-wait="Please wait..." />
        </form>
    </div>
    `), this.hiddenForm = _.parentElement ? _.parentElement.querySelector("#msf-hidden-form") : document.querySelector("#msf-hidden-form"), this.hiddenSubmitButton = this.hiddenForm.querySelector('input[type="submit"]'), this.form.querySelectorAll('[data-msf="hidden"]').forEach(function(S) {
            var k = d(S) ? S : S.querySelector("input, select, textarea");
            if (k && !f.hiddenForm.querySelector("#hidden-".concat(S.id))) {
              var H = '<input type="hidden" id="hidden-'.concat(k.id, '" name="').concat(k.name, '" data-name="').concat(k.name, '" />');
              f.hiddenForm.insertAdjacentHTML("beforeend", H);
            }
          }), window.Webflow && window.Webflow.destroy(), window.Webflow && window.Webflow.ready(), window.Webflow && ((c = window.Webflow.require("ix2")) === null || c === void 0 || c.init()));
        }
      } }]), u;
    }(), z = L;
    N.default = z;
    var M = {};
    function q(u, c) {
      if (!(u instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    var Z = M && M.__importDefault || function(u) {
      return u && u.__esModule ? u : { default: u };
    };
    Object.defineProperty(M, "__esModule", { value: !0 });
    var Q = Z(E), O = Z(N), W = function u(c) {
      q(this, u), this.view = new O.default(c), this.controller = new Q.default(this.view);
    }, y = W;
    M.default = y;
    var R = {};
    r(R);
    function P(u) {
      var c = typeof u;
      return u != null && (c == "object" || c == "function");
    }
    var x = typeof n == "object" && n && n.Object === Object && n, V = typeof self == "object" && self && self.Object === Object && self, fe = x || V || Function("return this")(), Fe = function() {
      return fe.Date.now();
    }, Nt = /\s/;
    function ve(u) {
      for (var c = u.length; c-- && Nt.test(u.charAt(c)); )
        ;
      return c;
    }
    var Gt = /^\s+/;
    function Y(u) {
      return u && u.slice(0, ve(u) + 1).replace(Gt, "");
    }
    var j = fe.Symbol, Me = Object.prototype, Pe = Me.hasOwnProperty, le = Me.toString, xe = j ? j.toStringTag : void 0;
    function ao(u) {
      var c = Pe.call(u, xe), f = u[xe];
      try {
        u[xe] = void 0;
        var _ = !0;
      } catch {
      }
      var S = le.call(u);
      return _ && (c ? u[xe] = f : delete u[xe]), S;
    }
    var lo = Object.prototype, co = lo.toString;
    function uo(u) {
      return co.call(u);
    }
    var po = "[object Null]", fo = "[object Undefined]", ur = j ? j.toStringTag : void 0;
    function Eo(u) {
      return u == null ? u === void 0 ? fo : po : ur && ur in Object(u) ? ao(u) : uo(u);
    }
    function ho(u) {
      return u != null && typeof u == "object";
    }
    var mo = "[object Symbol]";
    function To(u) {
      return typeof u == "symbol" || ho(u) && Eo(u) == mo;
    }
    var pr = NaN, _o = /^[-+]0x[0-9a-f]+$/i, Io = /^0b[01]+$/i, go = /^0o[0-7]+$/i, yo = parseInt;
    function fr(u) {
      if (typeof u == "number")
        return u;
      if (To(u))
        return pr;
      if (P(u)) {
        var c = typeof u.valueOf == "function" ? u.valueOf() : u;
        u = P(c) ? c + "" : c;
      }
      if (typeof u != "string")
        return u === 0 ? u : +u;
      u = Y(u);
      var f = Io.test(u);
      return f || go.test(u) ? yo(u.slice(2), f ? 2 : 8) : _o.test(u) ? pr : +u;
    }
    var So = "Expected a function", Ro = Math.max, vo = Math.min;
    function Oo(u, c, f) {
      var _, S, k, H, B, G, te = 0, X = !1, ae = !1, $ = !0;
      if (typeof u != "function")
        throw new TypeError(So);
      function he(ce) {
        var ge = _, we = S;
        return _ = S = void 0, te = ce, H = u.apply(we, ge);
      }
      function re(ce) {
        var ge = ce - G;
        return G === void 0 || ge >= c || ge < 0 || ae && ce - te >= k;
      }
      function Oe() {
        var ce = Fe();
        if (re(ce))
          return it(ce);
        B = setTimeout(Oe, function(ge) {
          var we = c - (ge - G);
          return ae ? vo(we, k - (ge - te)) : we;
        }(ce));
      }
      function it(ce) {
        return B = void 0, $ && _ ? he(ce) : (_ = S = void 0, H);
      }
      function st() {
        var ce = Fe(), ge = re(ce);
        if (_ = arguments, S = this, G = ce, ge) {
          if (B === void 0)
            return function(we) {
              return te = we, B = setTimeout(Oe, c), X ? he(we) : H;
            }(G);
          if (ae)
            return clearTimeout(B), B = setTimeout(Oe, c), he(G);
        }
        return B === void 0 && (B = setTimeout(Oe, c)), H;
      }
      return c = fr(c) || 0, P(f) && (X = !!f.leading, k = (ae = "maxWait" in f) ? Ro(fr(f.maxWait) || 0, c) : k, $ = "trailing" in f ? !!f.trailing : $), st.cancel = function() {
        B !== void 0 && clearTimeout(B), te = 0, _ = G = S = B = void 0;
      }, st.flush = function() {
        return B === void 0 ? H : it(Fe());
      }, st;
    }
    R.default = Oo;
    var be = {};
    Object.defineProperty(be, "__esModule", { value: !0 });
    var rt = ($e = void 0, De = be.isFormElement = $e, pt = be.throwError = De, be.isVisible = pt);
    be.convertToString = rt;
    var $e = function(u) {
      return u instanceof HTMLInputElement || u instanceof HTMLSelectElement || u instanceof HTMLTextAreaElement;
    };
    be.isFormElement = $e;
    var De = function(u, c) {
      switch (c) {
        case "wrong-selector":
          throw new Error("The element with a selector ".concat(u, " has not been found. Please, check if you've set it correctly."));
        case "no-parent":
          throw new Error("The element with a selector ".concat(u, ` hasn't got any parent with the [data-logic="parent"] attibute.`));
        case "wrong-action":
          throw new Error("No action (or wrong action name) has been provided for the ".concat(u, " selector."));
        case "wrong-operator":
          throw new Error("The operator of the selector ".concat(u, " is not valid."));
      }
    };
    be.throwError = De;
    var pt = function(u) {
      return !!(u.offsetWidth || u.offsetHeight || u.getClientRects().length);
    };
    be.isVisible = pt, rt = function(u) {
      return typeof u == "string" ? u : typeof u == "number" ? u.toString() : u ? "true" : "false";
    }, be.convertToString = rt;
    var nt = {};
    function bo(u, c) {
      var f;
      if (typeof Symbol > "u" || u[Symbol.iterator] == null) {
        if (Array.isArray(u) || (f = Do(u)) || c && u && typeof u.length == "number") {
          f && (u = f);
          var _ = 0, S = function() {
          };
          return { s: S, n: function() {
            return _ >= u.length ? { done: !0 } : { done: !1, value: u[_++] };
          }, e: function(G) {
            throw G;
          }, f: S };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var k, H = !0, B = !1;
      return { s: function() {
        f = u[Symbol.iterator]();
      }, n: function() {
        var G = f.next();
        return H = G.done, G;
      }, e: function(G) {
        B = !0, k = G;
      }, f: function() {
        try {
          H || f.return == null || f.return();
        } finally {
          if (B)
            throw k;
        }
      } };
    }
    function Do(u, c) {
      if (u) {
        if (typeof u == "string")
          return Er(u, c);
        var f = Object.prototype.toString.call(u).slice(8, -1);
        return f === "Object" && u.constructor && (f = u.constructor.name), f === "Map" || f === "Set" ? Array.from(u) : f === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f) ? Er(u, c) : void 0;
      }
    }
    function Er(u, c) {
      (c == null || c > u.length) && (c = u.length);
      for (var f = 0, _ = new Array(c); f < c; f++)
        _[f] = u[f];
      return _;
    }
    function wo(u, c) {
      if (!(u instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function hr(u, c) {
      for (var f = 0; f < c.length; f++) {
        var _ = c[f];
        _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(u, _.key, _);
      }
    }
    function Ao(u, c, f) {
      return c && hr(u.prototype, c), f && hr(u, f), u;
    }
    var Lo = nt && nt.__importDefault || function(u) {
      return u && u.__esModule ? u : { default: u };
    };
    Object.defineProperty(nt, "__esModule", { value: !0 });
    var Mo = Lo(R), Po = function() {
      function u(c) {
        wo(this, u), this.logicList = [], this.submitHiddenInputs = !1, this.checkConditionsOnLoad = !0, Object.assign(this, c), this.store = [], this.init();
      }
      return Ao(u, [{ key: "init", value: function() {
        var c = this;
        this.logicList.forEach(function(f) {
          c.addEvents(f), f.actions.forEach(function(_) {
            c.storeInputData(_.selector, _.action);
          });
        });
      } }, { key: "addEvents", value: function(c) {
        var f = this;
        c.conditions.forEach(function(_) {
          var S = document.querySelector(_.selector);
          if ($e(S)) {
            var k = S.type === "radio" ? Array.from(document.querySelectorAll('input[name="'.concat(S.name, '"]'))) : [S];
            f.checkConditionsOnLoad && f.checkConditions(c);
            var H = Mo.default(f.checkConditions.bind(f), 200), B = ["email", "number", "password", "search", "tel", "text", "textarea", "url"];
            k.forEach(function(G) {
              G.addEventListener("input", function() {
                B.includes(S.type) ? H(c) : f.checkConditions(c);
              });
            });
          } else
            De(_.selector, "wrong-selector");
        });
      } }, { key: "storeInputData", value: function(c, f) {
        var _ = this;
        if (f !== "custom") {
          var S = document.querySelector(c);
          S instanceof HTMLElement ? this.getTargets(S).forEach(function(k) {
            var H = { element: k, required: k.required, disabled: k.disabled };
            _.store.findIndex(function(B) {
              return B.element === k;
            }) === -1 && _.store.push(H);
          }) : De(c, "wrong-selector");
        }
      } }, { key: "checkConditions", value: function(c) {
        var f, _ = this, S = c.conditions, k = c.operator, H = k === void 0 ? "and" : k, B = c.actions, G = !1, te = bo(S);
        try {
          for (te.s(); !(f = te.n()).done; ) {
            var X = f.value, ae = document.querySelector(X.selector);
            if (!$e(ae))
              return void De(X.selector, "wrong-selector");
            var $ = "";
            switch (ae.type) {
              case "checkbox":
                $ = rt(ae.checked);
                break;
              case "radio":
                var he = document.querySelector('input[name="'.concat(ae.name, '"]:checked'));
                he instanceof HTMLInputElement && ($ = he.value);
                break;
              default:
                $ = ae.value;
            }
            var re = rt(X.value);
            switch (X.operator) {
              case "equal":
                G = $ === re;
                break;
              case "not-equal":
                G = $ !== re;
                break;
              case "contain":
                G = !!$.includes(re);
                break;
              case "not-contain":
                G = !$.includes(re);
                break;
              case "greater":
                G = +$ > +re;
                break;
              case "greater-equal":
                G = +$ >= +re;
                break;
              case "less":
                G = +$ < +re;
                break;
              case "less-equal":
                G = +$ <= +re;
                break;
              case "empty":
                G = $.length === 0;
                break;
              case "filled":
                G = $.length > 0;
                break;
              default:
                De(X.selector, "wrong-operator");
            }
            if (H === "and" && !G || H === "or" && G)
              break;
          }
        } catch (Oe) {
          te.e(Oe);
        } finally {
          te.f();
        }
        G && B.forEach(function(Oe) {
          _.triggerAction(Oe);
        });
      } }, { key: "triggerAction", value: function(c) {
        var f = this, _ = c.selector, S = c.action, k = c.clear, H = k !== void 0 && k, B = document.querySelector(_);
        if (B instanceof HTMLElement)
          if (S !== "custom") {
            var G = this.getTargets(B), te = !1;
            G.forEach(function(X) {
              var ae = f.getStoredData(X), $ = ae.required, he = ae.disabled, re = pt(X);
              switch (te || (te = f.triggerInteraction(B, S)), S) {
                case "show":
                  f.showInput(X, B, te, $, he);
                  break;
                case "hide":
                  f.hideInput(X, B, te);
                  break;
                case "enable":
                  f.enableInput(X, re);
                  break;
                case "disable":
                  f.disableInput(X, re);
                  break;
                case "require":
                  f.requireInput(X, re);
                  break;
                case "unrequire":
                  f.unrequireInput(X, re);
                  break;
                default:
                  De(_, "wrong-action");
              }
              H && f.clearInput(X);
            });
          } else
            this.triggerInteraction(B, S);
        else
          De(_, "wrong-selector");
      } }, { key: "showInput", value: function(c, f, _, S, k) {
        _ || (f.style.display = "block"), c.required = S, c.disabled = k;
      } }, { key: "hideInput", value: function(c, f, _) {
        _ || (f.style.display = "none"), this.submitHiddenInputs || (c.disabled = !0), c.required = !1;
      } }, { key: "enableInput", value: function(c, f) {
        f && (c.disabled = !1), this.updateStoredData(c, "disabled", !1);
      } }, { key: "disableInput", value: function(c, f) {
        f && (c.disabled = !0), this.updateStoredData(c, "disabled", !0);
      } }, { key: "requireInput", value: function(c, f) {
        f && (c.required = !0), this.updateStoredData(c, "required", !0);
      } }, { key: "unrequireInput", value: function(c, f) {
        f && (c.required = !1), this.updateStoredData(c, "required", !1);
      } }, { key: "getTargets", value: function(c) {
        return $e(c) ? [c] : Array.from(c.querySelectorAll("input, select, textarea"));
      } }, { key: "triggerInteraction", value: function(c, f) {
        var _ = f === "custom" ? c : c.querySelector(':scope > [data-logic="'.concat(f, '"]'));
        return _ instanceof HTMLElement && (_.click(), !0);
      } }, { key: "clearInput", value: function(c) {
        c.type === "checkbox" || c.type === "radio" ? c.checked = !1 : c.value = "";
      } }, { key: "updateStoredData", value: function(c, f, _) {
        var S = this.store.findIndex(function(k) {
          return k.element === c;
        });
        S > -1 && (this.store[S][f] = _);
      } }, { key: "getStoredData", value: function(c) {
        return this.store.find(function(f) {
          return f.element === c;
        });
      } }]), u;
    }(), Co = Po;
    nt.default = Co;
    var ot = {}, mr = ot && ot.__importDefault || function(u) {
      return u && u.__esModule ? u : { default: u };
    };
    Object.defineProperty(ot, "__esModule", { value: !0 });
    var No = mr(M), Go = mr(nt);
    ot = { MSF: No.default, Logic: Go.default }, e.exports = ot;
  })();
})(so);
var Hl = so.exports, Ne = window.Webflow || [];
Ne.push(() => {
  zl();
});
function zl() {
  const e = document.querySelector('[c-chapeau-form="main"]'), t = e.querySelector('[c-chapeau-form="nav"]'), r = e.querySelector('[c-chapeau-form="total-steps"]'), n = e.querySelector('[c-chapeau-form="progress"]'), o = e.querySelector('[c-chapeau-form="slider"]'), s = e.querySelector('[c-chapeau-form="slides"]'), i = e.querySelector('[c-chapeau-form="not-qualified-message"]'), a = e.querySelector('[c-chapeau-form="buttons"]'), l = '[c-chapeau-form="form"]', d = '[c-chapeau-form="next"]', p = '[c-chapeau-form="back"]', m = '[c-chapeau-form="current-step"]';
  Wl(o, s);
  const h = new Hl.MSF({ hiddeButtonsOnSubmit: !1, scrollTopOnStepChange: !1, formSelector: l, nextSelector: d, backSelector: p, currentStepSelector: m });
  jl(h), Xl(h, n), Zl(h), $l(h, i, t, a), Ql(h), Kl(h, e);
  const T = h.view.steps.length;
  r.textContent = T, window.msf = h, e.removeAttribute("c-cloak"), h.view.setMaskHeight(0);
}
function Wl(e, t) {
  const r = e.querySelector(":scope > .w-slider-mask"), n = Array.from(t.querySelectorAll(":scope > .w-dyn-items > .w-dyn-item"));
  Array.from(r.querySelectorAll(".w-slide")).forEach((o) => o.remove()), n.forEach((o) => {
    o.classList.add("w-slide"), r.appendChild(o);
  }), t.remove(), Ne.destroy(), Ne.ready(), Ne.require("ix2").init(), Ne.require("slider").redraw(), Ne.require("slider").ready();
}
function Xl({ view: e, controller: t }, r) {
  e.next.addEventListener("click", n), e.back.addEventListener("click", n), n();
  function n() {
    const o = t.currentStep + 1, s = e.steps.length, i = Math.min(o / s * 100, 100);
    r.style.width = `${i}%`;
  }
}
function $l({ view: e, controller: t }, r, n, o) {
  e.form.addEventListener("change", s);
  function s() {
    var h;
    const d = e.getInputs(t.currentStep).some((T) => T.checked ? T.parentElement.querySelector('[c-chapeau-form="not-qualified"]') != null : !1), p = e.steps[t.currentStep], m = (h = p.nextSibling) == null ? void 0 : h.matches('[c-chapeau-form="not-qualified-message"]');
    d ? (e.next.dataset.trackDisabled = !0, m || (p.insertAdjacentHTML("afterend", r.outerHTML), p.nextElementSibling.querySelector('[c-chapeau-form="not-qualified-back"]').addEventListener("click", () => e.back.click()))) : (e.next.dataset.trackDisabled = !1, m && p.nextSibling.remove()), p.dataset.notQualified = d, Ne.require("slider").redraw(), Ne.require("slider").ready();
  }
  const i = e.submitForm.bind(e);
  e.submitForm = () => {
    e.steps[e.steps.length - 1].dataset.notQualified === "true" ? (e.goNext(), a()) : i();
  }, e.next.addEventListener("click", () => {
    e.steps[t.currentStep - 1].dataset.notQualified === "true" && a();
  }), e.back.addEventListener("click", () => {
    l();
  });
  function a() {
    e.hideElement(n), e.hideElement(o);
  }
  function l() {
    e.showElement(n), e.showElement(o);
  }
}
function jl({ view: e }) {
  e.enableElement(e.back), e.disableElement = (t) => {
    t && t.classList.add("disabled");
  }, e.enableElement = (t) => {
    t && t.classList.remove("disabled");
  }, e.disableElement(e.back);
}
function Zl(e) {
  e.view;
  const t = e.controller, r = t.checkRequiredInputs.bind(t);
  function n() {
    this.inputsCurrentlyValid = !0;
    const o = this.view.getInputs(this.currentStep);
    for (const s of o)
      if (!s.reportValidity())
        return this.inputsCurrentlyValid = !1, !1;
    return r();
  }
  t.checkRequiredInputs = n.bind(t);
}
function Ql(e) {
  const t = e.view, r = e.controller, n = t.form.closest("[c-async-form]"), o = t.back, s = t.next, i = new ze(n);
  i.onState = (a) => {
    a === "success" && (t.hideElement(o), t.hideElement(s));
  }, r.observeSubmitText(), r.handleSubmit = () => {
    r.currentStep = Math.min(r.currentStep, t.steps.length - 1);
  };
}
function Kl(e, t) {
  new et(t);
  const r = e.view, n = e.controller;
  r.form.addEventListener("FilePond:updatefiles", () => {
    setTimeout(() => r.setMaskHeight(n.currentStep), 100);
  });
}
//# sourceMappingURL=chapeau-formular.js.map
