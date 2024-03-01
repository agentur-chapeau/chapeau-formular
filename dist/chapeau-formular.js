class ze {
  constructor(t) {
    if (t.dataset.refAsyncForm)
      return ze.refs[t.dataset.refAsyncForm];
    this.ref = Math.random(), ze.refs[this.ref] = this, t.dataset.refAsyncForm = this.ref, this.el = t, this.form = t.querySelector("form"), this.formSuccess = t.querySelector(".w-form-done"), this.formFail = t.querySelector(".w-form-fail"), this.submitButton = t.querySelector('[type="submit"]'), this.buttonText = this.getSubmitText(), this.waitingText = this.submitButton.dataset.wait, this.beforeSubmitHandlers = [], this.payloadHandlers = [], this.inputHandlers = [], this.onStateHandlers = [], this.el.addEventListener("submit", (n) => this.submit(n));
  }
  /**
   * @callback BeforeSubmitHandler
   * @returns {bool} if false then the form is not submitted
   */
  /**
   * Gets called before the form starts to submit
   * Allows to cancel the submit by returning false
   * @type {BeforeSubmitHandler}
   */
  set onBeforeSubmit(t) {
    this.beforeSubmitHandlers.push(t);
  }
  /**
   * @callback PayloadHandler
   * @param {Object} payload The current payload
   * @returns {Object} The new payload
   */
  /**
   * Allows for adding custom value to the payload
   * Gets called before form elements are converted
   * All handlers will be called in the order they were registered
   * @type {PayloadHandler}
   */
  set onPayload(t) {
    this.payloadHandlers.push(t);
  }
  /**
   * @callback InputHandler
   * @param {HTMLElement} input The input element
   * @param {String} value The current value
   * @returns {String} The new value
   */
  /**
   * Allows for transforming the values of the form elements
   * All handlers will be called in the order they were registered
   * Can be async
   * @type {InputHandler}
   */
  set onInput(t) {
    this.inputHandlers.push(t);
  }
  /**
   * @callback StateHandler
   * @param {'loading' | 'success' | 'error'} state
   */
  /**
   * Gets called when the forms state changes
   * @type {StateHandler}
   */
  set onState(t) {
    this.onStateHandlers.push(t);
  }
  async submit(t) {
    t.preventDefault();
    try {
      if (!this.beforeSubmitHandlers.reduce((a, f) => f() && a, !0))
        return;
      this.setState("loading");
      const r = await this.createPayload(), s = this.form.action, i = {
        method: this.form.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(r)
      };
      (await fetch(s, i)).ok ? this.setState("success") : this.setState("error");
    } catch (n) {
      console.error(n), this.setState("error");
    }
  }
  async createPayload() {
    let t = this.payloadHandlers.reduce((r, s) => s(r), {});
    const n = this.elements.filter((r) => r.name !== "");
    for (const r of n) {
      const s = r.name;
      let o = r.value;
      for (const i of this.inputHandlers)
        o = await i(r, o);
      if (o !== null && (r.type === "checkbox" && (o = r.checked), !(r.type === "radio" && !r.checked))) {
        if (typeof t[s] < "u") {
          Array.isArray(t[s]) || (t[s] = [t[s]]), t[s].push(o);
          continue;
        }
        t[s] = o;
      }
    }
    return t;
  }
  /**
   * @param {'loading' | 'success' | 'error'} state
   */
  setState(t) {
    switch (t) {
      case "loading":
        this.form.style.display = null, this.formSuccess.style.display = null, this.formFail.style.display = null, this.elements.forEach((n) => n.disabled = !0), this.setSubmitText(this.waitingText);
        break;
      case "success":
        this.form.style.display = "none", this.formSuccess.style.display = "block", this.formFail.style.display = "none", this.elements.forEach((n) => n.disabled = !1), this.setSubmitText(this.buttonText), this.form.reset(), this.formSuccess.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
        break;
      case "error":
        this.form.style.display = null, this.formSuccess.style.display = null, this.formFail.style.display = "block", this.elements.forEach((n) => n.disabled = !1), this.setSubmitText(this.buttonText);
        break;
    }
    this.onStateHandlers.forEach((n) => n(t));
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
ze.refs = {};
document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.querySelectorAll("[c-async-form]")).forEach((e) => new ze(e));
});
/*!
 * FilePond 4.30.6
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
const Fs = (e) => e instanceof HTMLElement, Bs = (e, t = [], n = []) => {
  const r = {
    ...e
  }, s = [], o = [], i = () => ({ ...r }), l = () => {
    const p = [...s];
    return s.length = 0, p;
  }, a = () => {
    const p = [...o];
    o.length = 0, p.forEach(({ type: I, data: D }) => {
      f(I, D);
    });
  }, f = (p, I, D) => {
    if (D && !document.hidden) {
      o.push({ type: p, data: I });
      return;
    }
    T[p] && T[p](I), s.push({
      type: p,
      data: I
    });
  }, d = (p, ...I) => h[p] ? h[p](...I) : null, m = {
    getState: i,
    processActionQueue: l,
    processDispatchQueue: a,
    dispatch: f,
    query: d
  };
  let h = {};
  t.forEach((p) => {
    h = {
      ...p(r),
      ...h
    };
  });
  let T = {};
  return n.forEach((p) => {
    T = {
      ...p(f, d, r),
      ...T
    };
  }), m;
}, xs = (e, t, n) => {
  if (typeof n == "function") {
    e[t] = n;
    return;
  }
  Object.defineProperty(e, t, { ...n });
}, Z = (e, t) => {
  for (const n in e)
    e.hasOwnProperty(n) && t(n, e[n]);
}, Fe = (e) => {
  const t = {};
  return Z(e, (n) => {
    xs(t, n, e[n]);
  }), t;
}, re = (e, t, n = null) => {
  if (n === null)
    return e.getAttribute(t) || e.hasAttribute(t);
  e.setAttribute(t, n);
}, Us = "http://www.w3.org/2000/svg", ks = ["svg", "path"], vn = (e) => ks.includes(e), Rt = (e, t, n = {}) => {
  typeof t == "object" && (n = t, t = null);
  const r = vn(e) ? document.createElementNS(Us, e) : document.createElement(e);
  return t && (vn(e) ? re(r, "class", t) : r.className = t), Z(n, (s, o) => {
    re(r, s, o);
  }), r;
}, Vs = (e) => (t, n) => {
  typeof n < "u" && e.children[n] ? e.insertBefore(t, e.children[n]) : e.appendChild(t);
}, qs = (e, t) => (n, r) => (typeof r < "u" ? t.splice(r, 0, n) : t.push(n), n), Hs = (e, t) => (n) => (t.splice(t.indexOf(n), 1), n.element.parentNode && e.removeChild(n.element), n), Ys = typeof window < "u" && typeof window.document < "u", Ir = () => Ys, zs = Ir() ? Rt("svg") : {}, Ws = "children" in zs ? (e) => e.children.length : (e) => e.childNodes.length, _r = (e, t, n, r) => {
  const s = n[0] || e.left, o = n[1] || e.top, i = s + e.width, l = o + e.height * (r[1] || 1), a = {
    // the rectangle of the element itself
    element: {
      ...e
    },
    // the rectangle of the element expanded to contain its children, does not include any margins
    inner: {
      left: e.left,
      top: e.top,
      right: e.right,
      bottom: e.bottom
    },
    // the rectangle of the element expanded to contain its children including own margin and child margins
    // margins will be added after we've recalculated the size
    outer: {
      left: s,
      top: o,
      right: i,
      bottom: l
    }
  };
  return t.filter((f) => !f.isRectIgnored()).map((f) => f.rect).forEach((f) => {
    An(a.inner, { ...f.inner }), An(a.outer, { ...f.outer });
  }), Ln(a.inner), a.outer.bottom += a.element.marginBottom, a.outer.right += a.element.marginRight, Ln(a.outer), a;
}, An = (e, t) => {
  t.top += e.top, t.right += e.left, t.bottom += e.top, t.left += e.left, t.bottom > e.bottom && (e.bottom = t.bottom), t.right > e.right && (e.right = t.right);
}, Ln = (e) => {
  e.width = e.right - e.left, e.height = e.bottom - e.top;
}, Ue = (e) => typeof e == "number", $s = (e, t, n, r = 1e-3) => Math.abs(e - t) < r && Math.abs(n) < r, Xs = (
  // default options
  ({ stiffness: e = 0.5, damping: t = 0.75, mass: n = 10 } = {}) => {
    let r = null, s = null, o = 0, i = !1;
    const f = Fe({
      interpolate: (d, m) => {
        if (i)
          return;
        if (!(Ue(r) && Ue(s))) {
          i = !0, o = 0;
          return;
        }
        const h = -(s - r) * e;
        o += h / n, s += o, o *= t, $s(s, r, o) || m ? (s = r, o = 0, i = !0, f.onupdate(s), f.oncomplete(s)) : f.onupdate(s);
      },
      target: {
        set: (d) => {
          if (Ue(d) && !Ue(s) && (s = d), r === null && (r = d, s = d), r = d, s === r || typeof r > "u") {
            i = !0, o = 0, f.onupdate(s), f.oncomplete(s);
            return;
          }
          i = !1;
        },
        get: () => r
      },
      resting: {
        get: () => i
      },
      onupdate: (d) => {
      },
      oncomplete: (d) => {
      }
    });
    return f;
  }
), js = (e) => e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e, Qs = (
  // default values
  ({ duration: e = 500, easing: t = js, delay: n = 0 } = {}) => {
    let r = null, s, o, i = !0, l = !1, a = null;
    const d = Fe({
      interpolate: (m, h) => {
        i || a === null || (r === null && (r = m), !(m - r < n) && (s = m - r - n, s >= e || h ? (s = 1, o = l ? 0 : 1, d.onupdate(o * a), d.oncomplete(o * a), i = !0) : (o = s / e, d.onupdate((s >= 0 ? t(l ? 1 - o : o) : 0) * a))));
      },
      target: {
        get: () => l ? 0 : a,
        set: (m) => {
          if (a === null) {
            a = m, d.onupdate(m), d.oncomplete(m);
            return;
          }
          m < a ? (a = 1, l = !0) : (l = !1, a = m), i = !1, r = null;
        }
      },
      resting: {
        get: () => i
      },
      onupdate: (m) => {
      },
      oncomplete: (m) => {
      }
    });
    return d;
  }
), wn = {
  spring: Xs,
  tween: Qs
}, Zs = (e, t, n) => {
  const r = e[t] && typeof e[t][n] == "object" ? e[t][n] : e[t] || e, s = typeof r == "string" ? r : r.type, o = typeof r == "object" ? { ...r } : {};
  return wn[s] ? wn[s](o) : null;
}, Kt = (e, t, n, r = !1) => {
  t = Array.isArray(t) ? t : [t], t.forEach((s) => {
    e.forEach((o) => {
      let i = o, l = () => n[o], a = (f) => n[o] = f;
      typeof o == "object" && (i = o.key, l = o.getter || l, a = o.setter || a), !(s[i] && !r) && (s[i] = {
        get: l,
        set: a
      });
    });
  });
}, Ks = ({ mixinConfig: e, viewProps: t, viewInternalAPI: n, viewExternalAPI: r }) => {
  const s = { ...t }, o = [];
  return Z(e, (i, l) => {
    const a = Zs(l);
    if (!a)
      return;
    a.onupdate = (d) => {
      t[i] = d;
    }, a.target = s[i], Kt([{
      key: i,
      setter: (d) => {
        a.target !== d && (a.target = d);
      },
      getter: () => t[i]
    }], [n, r], t, !0), o.push(a);
  }), {
    write: (i) => {
      let l = document.hidden, a = !0;
      return o.forEach((f) => {
        f.resting || (a = !1), f.interpolate(i, l);
      }), a;
    },
    destroy: () => {
    }
  };
}, Js = (e) => (t, n) => {
  e.addEventListener(t, n);
}, ei = (e) => (t, n) => {
  e.removeEventListener(t, n);
}, ti = ({
  mixinConfig: e,
  viewProps: t,
  viewInternalAPI: n,
  viewExternalAPI: r,
  viewState: s,
  view: o
}) => {
  const i = [], l = Js(o.element), a = ei(o.element);
  return r.on = (f, d) => {
    i.push({
      type: f,
      fn: d
    }), l(f, d);
  }, r.off = (f, d) => {
    i.splice(i.findIndex((m) => m.type === f && m.fn === d), 1), a(f, d);
  }, {
    write: () => !0,
    destroy: () => {
      i.forEach((f) => {
        a(f.type, f.fn);
      });
    }
  };
}, ni = ({ mixinConfig: e, viewProps: t, viewExternalAPI: n }) => {
  Kt(e, n, t);
}, de = (e) => e != null, ri = {
  opacity: 1,
  scaleX: 1,
  scaleY: 1,
  translateX: 0,
  translateY: 0,
  rotateX: 0,
  rotateY: 0,
  rotateZ: 0,
  originX: 0,
  originY: 0
}, si = ({ mixinConfig: e, viewProps: t, viewInternalAPI: n, viewExternalAPI: r, view: s }) => {
  const o = { ...t }, i = {};
  Kt(e, [n, r], t);
  const l = () => [t.translateX || 0, t.translateY || 0], a = () => [t.scaleX || 0, t.scaleY || 0], f = () => s.rect ? _r(s.rect, s.childViews, l(), a()) : null;
  return n.rect = { get: f }, r.rect = { get: f }, e.forEach((d) => {
    t[d] = typeof o[d] > "u" ? ri[d] : o[d];
  }), {
    write: () => {
      if (ii(i, t))
        return oi(s.element, t), Object.assign(i, { ...t }), !0;
    },
    destroy: () => {
    }
  };
}, ii = (e, t) => {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !0;
  for (const n in t)
    if (t[n] !== e[n])
      return !0;
  return !1;
}, oi = (e, {
  opacity: t,
  perspective: n,
  translateX: r,
  translateY: s,
  scaleX: o,
  scaleY: i,
  rotateX: l,
  rotateY: a,
  rotateZ: f,
  originX: d,
  originY: m,
  width: h,
  height: T
}) => {
  let p = "", I = "";
  (de(d) || de(m)) && (I += `transform-origin: ${d || 0}px ${m || 0}px;`), de(n) && (p += `perspective(${n}px) `), (de(r) || de(s)) && (p += `translate3d(${r || 0}px, ${s || 0}px, 0) `), (de(o) || de(i)) && (p += `scale3d(${de(o) ? o : 1}, ${de(i) ? i : 1}, 1) `), de(f) && (p += `rotateZ(${f}rad) `), de(l) && (p += `rotateX(${l}rad) `), de(a) && (p += `rotateY(${a}rad) `), p.length && (I += `transform:${p};`), de(t) && (I += `opacity:${t};`, t === 0 && (I += "visibility:hidden;"), t < 1 && (I += "pointer-events:none;")), de(T) && (I += `height:${T}px;`), de(h) && (I += `width:${h}px;`);
  const D = e.elementCurrentStyle || "";
  (I.length !== D.length || I !== D) && (e.style.cssText = I, e.elementCurrentStyle = I);
}, ai = {
  styles: si,
  listeners: ti,
  animations: Ks,
  apis: ni
}, Pn = (e = {}, t = {}, n = {}) => (t.layoutCalculated || (e.paddingTop = parseInt(n.paddingTop, 10) || 0, e.marginTop = parseInt(n.marginTop, 10) || 0, e.marginRight = parseInt(n.marginRight, 10) || 0, e.marginBottom = parseInt(n.marginBottom, 10) || 0, e.marginLeft = parseInt(n.marginLeft, 10) || 0, t.layoutCalculated = !0), e.left = t.offsetLeft || 0, e.top = t.offsetTop || 0, e.width = t.offsetWidth || 0, e.height = t.offsetHeight || 0, e.right = e.left + e.width, e.bottom = e.top + e.height, e.scrollTop = t.scrollTop, e.hidden = t.offsetParent === null, e), se = (
  // default view definition
  ({
    // element definition
    tag: e = "div",
    name: t = null,
    attributes: n = {},
    // view interaction
    read: r = () => {
    },
    write: s = () => {
    },
    create: o = () => {
    },
    destroy: i = () => {
    },
    // hooks
    filterFrameActionsForChild: l = (T, p) => p,
    didCreateView: a = () => {
    },
    didWriteView: f = () => {
    },
    // rect related
    ignoreRect: d = !1,
    ignoreRectUpdate: m = !1,
    // mixins
    mixins: h = []
  } = {}) => (T, p = {}) => {
    const I = Rt(e, `filepond--${t}`, n), D = window.getComputedStyle(I, null), O = Pn();
    let A = null, L = !1;
    const w = [], P = [], F = {}, W = {}, v = [
      s
      // default writer
    ], B = [
      r
      // default reader
    ], q = [
      i
      // default destroy
    ], N = () => I, U = () => w.concat(), ie = () => F, b = (H) => (K, Te) => K(H, Te), Y = () => A || (A = _r(O, w, [0, 0], [1, 1]), A), S = () => D, y = () => {
      A = null, w.forEach((Te) => Te._read()), !(m && O.width && O.height) && Pn(O, I, D);
      const K = { root: Oe, props: p, rect: O };
      B.forEach((Te) => Te(K));
    }, M = (H, K, Te) => {
      let Ce = K.length === 0;
      return v.forEach((ce) => {
        ce({
          props: p,
          root: Oe,
          actions: K,
          timestamp: H,
          shouldOptimize: Te
        }) === !1 && (Ce = !1);
      }), P.forEach((ce) => {
        ce.write(H) === !1 && (Ce = !1);
      }), w.filter((ce) => !!ce.element.parentNode).forEach((ce) => {
        ce._write(
          H,
          l(ce, K),
          Te
        ) || (Ce = !1);
      }), w.forEach((ce, De) => {
        ce.element.parentNode || (Oe.appendChild(ce.element, De), ce._read(), ce._write(
          H,
          l(ce, K),
          Te
        ), Ce = !1);
      }), L = Ce, f({
        props: p,
        root: Oe,
        actions: K,
        timestamp: H
      }), Ce;
    }, C = () => {
      P.forEach((H) => H.destroy()), q.forEach((H) => {
        H({ root: Oe, props: p });
      }), w.forEach((H) => H._destroy());
    }, $ = {
      element: {
        get: N
      },
      style: {
        get: S
      },
      childViews: {
        get: U
      }
    }, X = {
      ...$,
      rect: {
        get: Y
      },
      // access to custom children references
      ref: {
        get: ie
      },
      // dom modifiers
      is: (H) => t === H,
      appendChild: Vs(I),
      createChildView: b(T),
      linkView: (H) => (w.push(H), H),
      unlinkView: (H) => {
        w.splice(w.indexOf(H), 1);
      },
      appendChildView: qs(I, w),
      removeChildView: Hs(I, w),
      registerWriter: (H) => v.push(H),
      registerReader: (H) => B.push(H),
      registerDestroyer: (H) => q.push(H),
      invalidateLayout: () => I.layoutCalculated = !1,
      // access to data store
      dispatch: T.dispatch,
      query: T.query
    }, Be = {
      element: {
        get: N
      },
      childViews: {
        get: U
      },
      rect: {
        get: Y
      },
      resting: {
        get: () => L
      },
      isRectIgnored: () => d,
      _read: y,
      _write: M,
      _destroy: C
    }, Nt = {
      ...$,
      rect: {
        get: () => O
      }
    };
    Object.keys(h).sort((H, K) => H === "styles" ? 1 : K === "styles" ? -1 : 0).forEach((H) => {
      const K = ai[H]({
        mixinConfig: h[H],
        viewProps: p,
        viewState: W,
        viewInternalAPI: X,
        viewExternalAPI: Be,
        view: Fe(Nt)
      });
      K && P.push(K);
    });
    const Oe = Fe(X);
    o({
      root: Oe,
      props: p
    });
    const Gt = Ws(I);
    return w.forEach((H, K) => {
      Oe.appendChild(H.element, Gt + K);
    }), a(Oe), Fe(Be);
  }
), li = (e, t, n = 60) => {
  const r = "__framePainter";
  if (window[r]) {
    window[r].readers.push(e), window[r].writers.push(t);
    return;
  }
  window[r] = {
    readers: [e],
    writers: [t]
  };
  const s = window[r], o = 1e3 / n;
  let i = null, l = null, a = null, f = null;
  const d = () => {
    document.hidden ? (a = () => window.setTimeout(() => m(performance.now()), o), f = () => window.clearTimeout(l)) : (a = () => window.requestAnimationFrame(m), f = () => window.cancelAnimationFrame(l));
  };
  document.addEventListener("visibilitychange", () => {
    f && f(), d(), m(performance.now());
  });
  const m = (h) => {
    l = a(m), i || (i = h);
    const T = h - i;
    T <= o || (i = h - T % o, s.readers.forEach((p) => p()), s.writers.forEach((p) => p(h)));
  };
  return d(), m(performance.now()), {
    pause: () => {
      f(l);
    }
  };
}, Ee = (e, t) => ({ root: n, props: r, actions: s = [], timestamp: o, shouldOptimize: i }) => {
  s.filter((l) => e[l.type]).forEach(
    (l) => e[l.type]({ root: n, props: r, action: l.data, timestamp: o, shouldOptimize: i })
  ), t && t({ root: n, props: r, actions: s, timestamp: o, shouldOptimize: i });
}, Mn = (e, t) => t.parentNode.insertBefore(e, t), Cn = (e, t) => t.parentNode.insertBefore(e, t.nextSibling), vt = (e) => Array.isArray(e), Pe = (e) => e == null, ci = (e) => e.trim(), At = (e) => "" + e, ui = (e, t = ",") => Pe(e) ? [] : vt(e) ? e : At(e).split(t).map(ci).filter((n) => n.length), gr = (e) => typeof e == "boolean", Sr = (e) => gr(e) ? e : e === "true", fe = (e) => typeof e == "string", Rr = (e) => Ue(e) ? e : fe(e) ? At(e).replace(/[a-z]+/gi, "") : 0, gt = (e) => parseInt(Rr(e), 10), Nn = (e) => parseFloat(Rr(e)), tt = (e) => Ue(e) && isFinite(e) && Math.floor(e) === e, Gn = (e, t = 1e3) => {
  if (tt(e))
    return e;
  let n = At(e).trim();
  return /MB$/i.test(n) ? (n = n.replace(/MB$i/, "").trim(), gt(n) * t * t) : /KB/i.test(n) ? (n = n.replace(/KB$i/, "").trim(), gt(n) * t) : gt(n);
}, ke = (e) => typeof e == "function", di = (e) => {
  let t = self, n = e.split("."), r = null;
  for (; r = n.shift(); )
    if (t = t[r], !t)
      return null;
  return t;
}, Fn = {
  process: "POST",
  patch: "PATCH",
  revert: "DELETE",
  fetch: "GET",
  restore: "GET",
  load: "GET"
}, fi = (e) => {
  const t = {};
  return t.url = fe(e) ? e : e.url || "", t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0, t.headers = e.headers ? e.headers : {}, Z(Fn, (n) => {
    t[n] = Ei(n, e[n], Fn[n], t.timeout, t.headers);
  }), t.process = e.process || fe(e) || e.url ? t.process : null, t.remove = e.remove || null, delete t.headers, t;
}, Ei = (e, t, n, r, s) => {
  if (t === null)
    return null;
  if (typeof t == "function")
    return t;
  const o = {
    url: n === "GET" || n === "PATCH" ? `?${e}=` : "",
    method: n,
    headers: s,
    withCredentials: !1,
    timeout: r,
    onload: null,
    ondata: null,
    onerror: null
  };
  if (fe(t))
    return o.url = t, o;
  if (Object.assign(o, t), fe(o.headers)) {
    const i = o.headers.split(/:(.+)/);
    o.headers = {
      header: i[0],
      value: i[1]
    };
  }
  return o.withCredentials = Sr(o.withCredentials), o;
}, pi = (e) => fi(e), mi = (e) => e === null, ae = (e) => typeof e == "object" && e !== null, hi = (e) => ae(e) && fe(e.url) && ae(e.process) && ae(e.revert) && ae(e.restore) && ae(e.fetch), Ht = (e) => vt(e) ? "array" : mi(e) ? "null" : tt(e) ? "int" : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e) ? "bytes" : hi(e) ? "api" : typeof e, Ti = (e) => e.replace(/{\s*'/g, '{"').replace(/'\s*}/g, '"}').replace(/'\s*:/g, '":').replace(/:\s*'/g, ':"').replace(/,\s*'/g, ',"').replace(/'\s*,/g, '",'), Ii = {
  array: ui,
  boolean: Sr,
  int: (e) => Ht(e) === "bytes" ? Gn(e) : gt(e),
  number: Nn,
  float: Nn,
  bytes: Gn,
  string: (e) => ke(e) ? e : At(e),
  function: (e) => di(e),
  serverapi: pi,
  object: (e) => {
    try {
      return JSON.parse(Ti(e));
    } catch {
      return null;
    }
  }
}, _i = (e, t) => Ii[t](e), yr = (e, t, n) => {
  if (e === t)
    return e;
  let r = Ht(e);
  if (r !== n) {
    const s = _i(e, n);
    if (r = Ht(s), s === null)
      throw `Trying to assign value with incorrect type to "${option}", allowed type: "${n}"`;
    e = s;
  }
  return e;
}, gi = (e, t) => {
  let n = e;
  return {
    enumerable: !0,
    get: () => n,
    set: (r) => {
      n = yr(r, e, t);
    }
  };
}, Si = (e) => {
  const t = {};
  return Z(e, (n) => {
    const r = e[n];
    t[n] = gi(r[0], r[1]);
  }), Fe(t);
}, Ri = (e) => ({
  // model
  items: [],
  // timeout used for calling update items
  listUpdateTimeout: null,
  // timeout used for stacking metadata updates
  itemUpdateTimeout: null,
  // queue of items waiting to be processed
  processingQueue: [],
  // options
  options: Si(e)
}), Lt = (e, t = "-") => e.split(/(?=[A-Z])/).map((n) => n.toLowerCase()).join(t), yi = (e, t) => {
  const n = {};
  return Z(t, (r) => {
    n[r] = {
      get: () => e.getState().options[r],
      set: (s) => {
        e.dispatch(`SET_${Lt(r, "_").toUpperCase()}`, {
          value: s
        });
      }
    };
  }), n;
}, bi = (e) => (t, n, r) => {
  const s = {};
  return Z(e, (o) => {
    const i = Lt(o, "_").toUpperCase();
    s[`SET_${i}`] = (l) => {
      try {
        r.options[o] = l.value;
      } catch {
      }
      t(`DID_SET_${i}`, { value: r.options[o] });
    };
  }), s;
}, Oi = (e) => (t) => {
  const n = {};
  return Z(e, (r) => {
    n[`GET_${Lt(r, "_").toUpperCase()}`] = (s) => t.options[r];
  }), n;
}, ge = {
  API: 1,
  DROP: 2,
  BROWSE: 3,
  PASTE: 4,
  NONE: 5
}, Jt = () => Math.random().toString(36).substring(2, 11), en = (e, t) => e.splice(t, 1), Di = (e, t) => {
  t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0);
}, wt = () => {
  const e = [], t = (r, s) => {
    en(
      e,
      e.findIndex((o) => o.event === r && (o.cb === s || !s))
    );
  }, n = (r, s, o) => {
    e.filter((i) => i.event === r).map((i) => i.cb).forEach((i) => Di(() => i(...s), o));
  };
  return {
    fireSync: (r, ...s) => {
      n(r, s, !0);
    },
    fire: (r, ...s) => {
      n(r, s, !1);
    },
    on: (r, s) => {
      e.push({ event: r, cb: s });
    },
    onOnce: (r, s) => {
      e.push({
        event: r,
        cb: (...o) => {
          t(r, s), s(...o);
        }
      });
    },
    off: t
  };
}, br = (e, t, n) => {
  Object.getOwnPropertyNames(e).filter((r) => !n.includes(r)).forEach(
    (r) => Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r))
  );
}, vi = [
  "fire",
  "process",
  "revert",
  "load",
  "on",
  "off",
  "onOnce",
  "retryLoad",
  "extend",
  "archive",
  "archived",
  "release",
  "released",
  "requestProcessing",
  "freeze"
], pe = (e) => {
  const t = {};
  return br(e, t, vi), t;
}, Ai = (e) => {
  e.forEach((t, n) => {
    t.released && en(e, n);
  });
}, V = {
  INIT: 1,
  IDLE: 2,
  PROCESSING_QUEUED: 9,
  PROCESSING: 3,
  PROCESSING_COMPLETE: 5,
  PROCESSING_ERROR: 6,
  PROCESSING_REVERT_ERROR: 10,
  LOADING: 7,
  LOAD_ERROR: 8
}, oe = {
  INPUT: 1,
  LIMBO: 2,
  LOCAL: 3
}, Or = (e) => /[^0-9]+/.exec(e), Dr = () => Or(1.1.toLocaleString())[0], Li = () => {
  const e = Dr(), t = 1e3.toLocaleString();
  return t !== "1000" ? Or(t)[0] : e === "." ? "," : ".";
}, g = {
  BOOLEAN: "boolean",
  INT: "int",
  NUMBER: "number",
  STRING: "string",
  ARRAY: "array",
  OBJECT: "object",
  FUNCTION: "function",
  ACTION: "action",
  SERVER_API: "serverapi",
  REGEX: "regex"
}, tn = [], Re = (e, t, n) => new Promise((r, s) => {
  const o = tn.filter((l) => l.key === e).map((l) => l.cb);
  if (o.length === 0) {
    r(t);
    return;
  }
  const i = o.shift();
  o.reduce(
    // loop over promises passing value to next promise
    (l, a) => l.then((f) => a(f, n)),
    // call initial filter, will return a promise
    i(t, n)
    // all executed
  ).then((l) => r(l)).catch((l) => s(l));
}), We = (e, t, n) => tn.filter((r) => r.key === e).map((r) => r.cb(t, n)), wi = (e, t) => tn.push({ key: e, cb: t }), Pi = (e) => Object.assign(je, e), yt = () => ({ ...je }), Mi = (e) => {
  Z(e, (t, n) => {
    je[t] && (je[t][0] = yr(
      n,
      je[t][0],
      je[t][1]
    ));
  });
}, je = {
  // the id to add to the root element
  id: [null, g.STRING],
  // input field name to use
  name: ["filepond", g.STRING],
  // disable the field
  disabled: [!1, g.BOOLEAN],
  // classname to put on wrapper
  className: [null, g.STRING],
  // is the field required
  required: [!1, g.BOOLEAN],
  // Allow media capture when value is set
  captureMethod: [null, g.STRING],
  // - "camera", "microphone" or "camcorder",
  // - Does not work with multiple on apple devices
  // - If set, acceptedFileTypes must be made to match with media wildcard "image/*", "audio/*" or "video/*"
  // sync `acceptedFileTypes` property with `accept` attribute
  allowSyncAcceptAttribute: [!0, g.BOOLEAN],
  // Feature toggles
  allowDrop: [!0, g.BOOLEAN],
  // Allow dropping of files
  allowBrowse: [!0, g.BOOLEAN],
  // Allow browsing the file system
  allowPaste: [!0, g.BOOLEAN],
  // Allow pasting files
  allowMultiple: [!1, g.BOOLEAN],
  // Allow multiple files (disabled by default, as multiple attribute is also required on input to allow multiple)
  allowReplace: [!0, g.BOOLEAN],
  // Allow dropping a file on other file to replace it (only works when multiple is set to false)
  allowRevert: [!0, g.BOOLEAN],
  // Allows user to revert file upload
  allowRemove: [!0, g.BOOLEAN],
  // Allow user to remove a file
  allowProcess: [!0, g.BOOLEAN],
  // Allows user to process a file, when set to false, this removes the file upload button
  allowReorder: [!1, g.BOOLEAN],
  // Allow reordering of files
  allowDirectoriesOnly: [!1, g.BOOLEAN],
  // Allow only selecting directories with browse (no support for filtering dnd at this point)
  // Try store file if `server` not set
  storeAsFile: [!1, g.BOOLEAN],
  // Revert mode
  forceRevert: [!1, g.BOOLEAN],
  // Set to 'force' to require the file to be reverted before removal
  // Input requirements
  maxFiles: [null, g.INT],
  // Max number of files
  checkValidity: [!1, g.BOOLEAN],
  // Enables custom validity messages
  // Where to put file
  itemInsertLocationFreedom: [!0, g.BOOLEAN],
  // Set to false to always add items to begin or end of list
  itemInsertLocation: ["before", g.STRING],
  // Default index in list to add items that have been dropped at the top of the list
  itemInsertInterval: [75, g.INT],
  // Drag 'n Drop related
  dropOnPage: [!1, g.BOOLEAN],
  // Allow dropping of files anywhere on page (prevents browser from opening file if dropped outside of Up)
  dropOnElement: [!0, g.BOOLEAN],
  // Drop needs to happen on element (set to false to also load drops outside of Up)
  dropValidation: [!1, g.BOOLEAN],
  // Enable or disable validating files on drop
  ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], g.ARRAY],
  // Upload related
  instantUpload: [!0, g.BOOLEAN],
  // Should upload files immediately on drop
  maxParallelUploads: [2, g.INT],
  // Maximum files to upload in parallel
  allowMinimumUploadDuration: [!0, g.BOOLEAN],
  // if true uploads take at least 750 ms, this ensures the user sees the upload progress giving trust the upload actually happened
  // Chunks
  chunkUploads: [!1, g.BOOLEAN],
  // Enable chunked uploads
  chunkForce: [!1, g.BOOLEAN],
  // Force use of chunk uploads even for files smaller than chunk size
  chunkSize: [5e6, g.INT],
  // Size of chunks (5MB default)
  chunkRetryDelays: [[500, 1e3, 3e3], g.ARRAY],
  // Amount of times to retry upload of a chunk when it fails
  // The server api end points to use for uploading (see docs)
  server: [null, g.SERVER_API],
  // File size calculations, can set to 1024, this is only used for display, properties use file size base 1000
  fileSizeBase: [1e3, g.INT],
  // Labels and status messages
  labelFileSizeBytes: ["bytes", g.STRING],
  labelFileSizeKilobytes: ["KB", g.STRING],
  labelFileSizeMegabytes: ["MB", g.STRING],
  labelFileSizeGigabytes: ["GB", g.STRING],
  labelDecimalSeparator: [Dr(), g.STRING],
  // Default is locale separator
  labelThousandsSeparator: [Li(), g.STRING],
  // Default is locale separator
  labelIdle: [
    'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
    g.STRING
  ],
  labelInvalidField: ["Field contains invalid files", g.STRING],
  labelFileWaitingForSize: ["Waiting for size", g.STRING],
  labelFileSizeNotAvailable: ["Size not available", g.STRING],
  labelFileCountSingular: ["file in list", g.STRING],
  labelFileCountPlural: ["files in list", g.STRING],
  labelFileLoading: ["Loading", g.STRING],
  labelFileAdded: ["Added", g.STRING],
  // assistive only
  labelFileLoadError: ["Error during load", g.STRING],
  labelFileRemoved: ["Removed", g.STRING],
  // assistive only
  labelFileRemoveError: ["Error during remove", g.STRING],
  labelFileProcessing: ["Uploading", g.STRING],
  labelFileProcessingComplete: ["Upload complete", g.STRING],
  labelFileProcessingAborted: ["Upload cancelled", g.STRING],
  labelFileProcessingError: ["Error during upload", g.STRING],
  labelFileProcessingRevertError: ["Error during revert", g.STRING],
  labelTapToCancel: ["tap to cancel", g.STRING],
  labelTapToRetry: ["tap to retry", g.STRING],
  labelTapToUndo: ["tap to undo", g.STRING],
  labelButtonRemoveItem: ["Remove", g.STRING],
  labelButtonAbortItemLoad: ["Abort", g.STRING],
  labelButtonRetryItemLoad: ["Retry", g.STRING],
  labelButtonAbortItemProcessing: ["Cancel", g.STRING],
  labelButtonUndoItemProcessing: ["Undo", g.STRING],
  labelButtonRetryItemProcessing: ["Retry", g.STRING],
  labelButtonProcessItem: ["Upload", g.STRING],
  // make sure width and height plus viewpox are even numbers so icons are nicely centered
  iconRemove: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>',
    g.STRING
  ],
  iconProcess: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>',
    g.STRING
  ],
  iconRetry: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>',
    g.STRING
  ],
  iconUndo: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>',
    g.STRING
  ],
  iconDone: [
    '<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>',
    g.STRING
  ],
  // event handlers
  oninit: [null, g.FUNCTION],
  onwarning: [null, g.FUNCTION],
  onerror: [null, g.FUNCTION],
  onactivatefile: [null, g.FUNCTION],
  oninitfile: [null, g.FUNCTION],
  onaddfilestart: [null, g.FUNCTION],
  onaddfileprogress: [null, g.FUNCTION],
  onaddfile: [null, g.FUNCTION],
  onprocessfilestart: [null, g.FUNCTION],
  onprocessfileprogress: [null, g.FUNCTION],
  onprocessfileabort: [null, g.FUNCTION],
  onprocessfilerevert: [null, g.FUNCTION],
  onprocessfile: [null, g.FUNCTION],
  onprocessfiles: [null, g.FUNCTION],
  onremovefile: [null, g.FUNCTION],
  onpreparefile: [null, g.FUNCTION],
  onupdatefiles: [null, g.FUNCTION],
  onreorderfiles: [null, g.FUNCTION],
  // hooks
  beforeDropFile: [null, g.FUNCTION],
  beforeAddFile: [null, g.FUNCTION],
  beforeRemoveFile: [null, g.FUNCTION],
  beforePrepareFile: [null, g.FUNCTION],
  // styles
  stylePanelLayout: [null, g.STRING],
  // null 'integrated', 'compact', 'circle'
  stylePanelAspectRatio: [null, g.STRING],
  // null or '3:2' or 1
  styleItemPanelAspectRatio: [null, g.STRING],
  styleButtonRemoveItemPosition: ["left", g.STRING],
  styleButtonProcessItemPosition: ["right", g.STRING],
  styleLoadIndicatorPosition: ["right", g.STRING],
  styleProgressIndicatorPosition: ["right", g.STRING],
  styleButtonRemoveItemAlign: [!1, g.BOOLEAN],
  // custom initial files array
  files: [[], g.ARRAY],
  // show support by displaying credits
  credits: [["https://pqina.nl/", "Powered by PQINA"], g.ARRAY]
}, Ve = (e, t) => Pe(t) ? e[0] || null : tt(t) ? e[t] || null : (typeof t == "object" && (t = t.id), e.find((n) => n.id === t) || null), vr = (e) => {
  if (Pe(e))
    return e;
  if (/:/.test(e)) {
    const t = e.split(":");
    return t[1] / t[0];
  }
  return parseFloat(e);
}, ye = (e) => e.filter((t) => !t.archived), Ar = {
  EMPTY: 0,
  IDLE: 1,
  // waiting
  ERROR: 2,
  // a file is in error state
  BUSY: 3,
  // busy processing or loading
  READY: 4
  // all files uploaded
};
let pt = null;
const Ci = () => {
  if (pt === null)
    try {
      const e = new DataTransfer();
      e.items.add(new File(["hello world"], "This_Works.txt"));
      const t = document.createElement("input");
      t.setAttribute("type", "file"), t.files = e.files, pt = t.files.length === 1;
    } catch {
      pt = !1;
    }
  return pt;
}, Ni = [
  V.LOAD_ERROR,
  V.PROCESSING_ERROR,
  V.PROCESSING_REVERT_ERROR
], Gi = [
  V.LOADING,
  V.PROCESSING,
  V.PROCESSING_QUEUED,
  V.INIT
], Fi = [V.PROCESSING_COMPLETE], Bi = (e) => Ni.includes(e.status), xi = (e) => Gi.includes(e.status), Ui = (e) => Fi.includes(e.status), Bn = (e) => ae(e.options.server) && (ae(e.options.server.process) || ke(e.options.server.process)), ki = (e) => ({
  GET_STATUS: () => {
    const t = ye(e.items), { EMPTY: n, ERROR: r, BUSY: s, IDLE: o, READY: i } = Ar;
    return t.length === 0 ? n : t.some(Bi) ? r : t.some(xi) ? s : t.some(Ui) ? i : o;
  },
  GET_ITEM: (t) => Ve(e.items, t),
  GET_ACTIVE_ITEM: (t) => Ve(ye(e.items), t),
  GET_ACTIVE_ITEMS: () => ye(e.items),
  GET_ITEMS: () => e.items,
  GET_ITEM_NAME: (t) => {
    const n = Ve(e.items, t);
    return n ? n.filename : null;
  },
  GET_ITEM_SIZE: (t) => {
    const n = Ve(e.items, t);
    return n ? n.fileSize : null;
  },
  GET_STYLES: () => Object.keys(e.options).filter((t) => /^style/.test(t)).map((t) => ({
    name: t,
    value: e.options[t]
  })),
  GET_PANEL_ASPECT_RATIO: () => /circle/.test(e.options.stylePanelLayout) ? 1 : vr(e.options.stylePanelAspectRatio),
  GET_ITEM_PANEL_ASPECT_RATIO: () => e.options.styleItemPanelAspectRatio,
  GET_ITEMS_BY_STATUS: (t) => ye(e.items).filter((n) => n.status === t),
  GET_TOTAL_ITEMS: () => ye(e.items).length,
  SHOULD_UPDATE_FILE_INPUT: () => e.options.storeAsFile && Ci() && !Bn(e),
  IS_ASYNC: () => Bn(e),
  GET_FILE_SIZE_LABELS: (t) => ({
    labelBytes: t("GET_LABEL_FILE_SIZE_BYTES") || void 0,
    labelKilobytes: t("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0,
    labelMegabytes: t("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0,
    labelGigabytes: t("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0
  })
}), Vi = (e) => {
  const t = ye(e.items).length;
  if (!e.options.allowMultiple)
    return t === 0;
  const n = e.options.maxFiles;
  return n === null || t < n;
}, Lr = (e, t, n) => Math.max(Math.min(n, e), t), qi = (e, t, n) => e.splice(t, 0, n), Hi = (e, t, n) => Pe(t) ? null : typeof n > "u" ? (e.push(t), t) : (n = Lr(n, 0, e.length), qi(e, n, t), t), Yt = (e) => /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(
  e
), dt = (e) => `${e}`.split("/").pop().split("?").shift(), Pt = (e) => e.split(".").pop(), Yi = (e) => {
  if (typeof e != "string")
    return "";
  const t = e.split("/").pop();
  return /svg/.test(t) ? "svg" : /zip|compressed/.test(t) ? "zip" : /plain/.test(t) ? "txt" : /msword/.test(t) ? "doc" : /[a-z]+/.test(t) ? t === "jpeg" ? "jpg" : t : "";
}, at = (e, t = "") => (t + e).slice(-t.length), wr = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${at(e.getMonth() + 1, "00")}-${at(
  e.getDate(),
  "00"
)}_${at(e.getHours(), "00")}-${at(e.getMinutes(), "00")}-${at(
  e.getSeconds(),
  "00"
)}`, Ke = (e, t, n = null, r = null) => {
  const s = typeof n == "string" ? e.slice(0, e.size, n) : e.slice(0, e.size, e.type);
  return s.lastModifiedDate = /* @__PURE__ */ new Date(), e._relativePath && (s._relativePath = e._relativePath), fe(t) || (t = wr()), t && r === null && Pt(t) ? s.name = t : (r = r || Yi(s.type), s.name = t + (r ? "." + r : "")), s;
}, zi = () => window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, Pr = (e, t) => {
  const n = zi();
  if (n) {
    const r = new n();
    return r.append(e), r.getBlob(t);
  }
  return new Blob([e], {
    type: t
  });
}, Wi = (e, t) => {
  const n = new ArrayBuffer(e.length), r = new Uint8Array(n);
  for (let s = 0; s < e.length; s++)
    r[s] = e.charCodeAt(s);
  return Pr(n, t);
}, Mr = (e) => (/^data:(.+);/.exec(e) || [])[1] || null, $i = (e) => e.split(",")[1].replace(/\s/g, ""), Xi = (e) => atob($i(e)), ji = (e) => {
  const t = Mr(e), n = Xi(e);
  return Wi(n, t);
}, Qi = (e, t, n) => Ke(ji(e), t, null, n), Zi = (e) => {
  if (!/^content-disposition:/i.test(e))
    return null;
  const t = e.split(/filename=|filename\*=.+''/).splice(1).map((n) => n.trim().replace(/^["']|[;"']{0,2}$/g, "")).filter((n) => n.length);
  return t.length ? decodeURI(t[t.length - 1]) : null;
}, Ki = (e) => {
  if (/content-length:/i.test(e)) {
    const t = e.match(/[0-9]+/)[0];
    return t ? parseInt(t, 10) : null;
  }
  return null;
}, Ji = (e) => /x-content-transfer-id:/i.test(e) && (e.split(":")[1] || "").trim() || null, nn = (e) => {
  const t = {
    source: null,
    name: null,
    size: null
  }, n = e.split(`
`);
  for (let r of n) {
    const s = Zi(r);
    if (s) {
      t.name = s;
      continue;
    }
    const o = Ki(r);
    if (o) {
      t.size = o;
      continue;
    }
    const i = Ji(r);
    if (i) {
      t.source = i;
      continue;
    }
  }
  return t;
}, eo = (e) => {
  const t = {
    source: null,
    complete: !1,
    progress: 0,
    size: null,
    timestamp: null,
    duration: 0,
    request: null
  }, n = () => t.progress, r = () => {
    t.request && t.request.abort && t.request.abort();
  }, s = () => {
    const l = t.source;
    i.fire("init", l), l instanceof File ? i.fire("load", l) : l instanceof Blob ? i.fire("load", Ke(l, l.name)) : Yt(l) ? i.fire("load", Qi(l)) : o(l);
  }, o = (l) => {
    if (!e) {
      i.fire("error", {
        type: "error",
        body: "Can't load URL",
        code: 400
      });
      return;
    }
    t.timestamp = Date.now(), t.request = e(
      l,
      (a) => {
        t.duration = Date.now() - t.timestamp, t.complete = !0, a instanceof Blob && (a = Ke(a, a.name || dt(l))), i.fire(
          "load",
          // if has received blob, we go with blob, if no response, we return null
          a instanceof Blob ? a : a ? a.body : null
        );
      },
      (a) => {
        i.fire(
          "error",
          typeof a == "string" ? {
            type: "error",
            code: 0,
            body: a
          } : a
        );
      },
      (a, f, d) => {
        if (d && (t.size = d), t.duration = Date.now() - t.timestamp, !a) {
          t.progress = null;
          return;
        }
        t.progress = f / d, i.fire("progress", t.progress);
      },
      () => {
        i.fire("abort");
      },
      (a) => {
        const f = nn(
          typeof a == "string" ? a : a.headers
        );
        i.fire("meta", {
          size: t.size || f.size,
          filename: f.name,
          source: f.source
        });
      }
    );
  }, i = {
    ...wt(),
    setSource: (l) => t.source = l,
    getProgress: n,
    // file load progress
    abort: r,
    // abort file load
    load: s
    // start load
  };
  return i;
}, xn = (e) => /GET|HEAD/.test(e), qe = (e, t, n) => {
  const r = {
    onheaders: () => {
    },
    onprogress: () => {
    },
    onload: () => {
    },
    ontimeout: () => {
    },
    onerror: () => {
    },
    onabort: () => {
    },
    abort: () => {
      s = !0, i.abort();
    }
  };
  let s = !1, o = !1;
  n = {
    method: "POST",
    headers: {},
    withCredentials: !1,
    ...n
  }, t = encodeURI(t), xn(n.method) && e && (t = `${t}${encodeURIComponent(typeof e == "string" ? e : JSON.stringify(e))}`);
  const i = new XMLHttpRequest(), l = xn(n.method) ? i : i.upload;
  return l.onprogress = (a) => {
    s || r.onprogress(a.lengthComputable, a.loaded, a.total);
  }, i.onreadystatechange = () => {
    i.readyState < 2 || i.readyState === 4 && i.status === 0 || o || (o = !0, r.onheaders(i));
  }, i.onload = () => {
    i.status >= 200 && i.status < 300 ? r.onload(i) : r.onerror(i);
  }, i.onerror = () => r.onerror(i), i.onabort = () => {
    s = !0, r.onabort();
  }, i.ontimeout = () => r.ontimeout(i), i.open(n.method, t, !0), tt(n.timeout) && (i.timeout = n.timeout), Object.keys(n.headers).forEach((a) => {
    const f = unescape(encodeURIComponent(n.headers[a]));
    i.setRequestHeader(a, f);
  }), n.responseType && (i.responseType = n.responseType), n.withCredentials && (i.withCredentials = !0), i.send(e), r;
}, J = (e, t, n, r) => ({
  type: e,
  code: t,
  body: n,
  headers: r
}), He = (e) => (t) => {
  e(J("error", 0, "Timeout", t.getAllResponseHeaders()));
}, Un = (e) => /\?/.test(e), ut = (...e) => {
  let t = "";
  return e.forEach((n) => {
    t += Un(t) && Un(n) ? n.replace(/\?/, "&") : n;
  }), t;
}, Ft = (e = "", t) => {
  if (typeof t == "function")
    return t;
  if (!t || !fe(t.url))
    return null;
  const n = t.onload || ((s) => s), r = t.onerror || ((s) => null);
  return (s, o, i, l, a, f) => {
    const d = qe(s, ut(e, t.url), {
      ...t,
      responseType: "blob"
    });
    return d.onload = (m) => {
      const h = m.getAllResponseHeaders(), T = nn(h).name || dt(s);
      o(
        J(
          "load",
          m.status,
          t.method === "HEAD" ? null : Ke(n(m.response), T),
          h
        )
      );
    }, d.onerror = (m) => {
      i(
        J(
          "error",
          m.status,
          r(m.response) || m.statusText,
          m.getAllResponseHeaders()
        )
      );
    }, d.onheaders = (m) => {
      f(J("headers", m.status, null, m.getAllResponseHeaders()));
    }, d.ontimeout = He(i), d.onprogress = l, d.onabort = a, d;
  };
}, Ie = {
  QUEUED: 0,
  COMPLETE: 1,
  PROCESSING: 2,
  ERROR: 3,
  WAITING: 4
}, to = (e, t, n, r, s, o, i, l, a, f, d) => {
  const m = [], { chunkTransferId: h, chunkServer: T, chunkSize: p, chunkRetryDelays: I } = d, D = {
    serverId: h,
    aborted: !1
  }, O = t.ondata || ((b) => b), A = t.onload || ((b, Y) => Y === "HEAD" ? b.getResponseHeader("Upload-Offset") : b.response), L = t.onerror || ((b) => null), w = (b) => {
    const Y = new FormData();
    ae(s) && Y.append(n, JSON.stringify(s));
    const S = typeof t.headers == "function" ? t.headers(r, s) : {
      ...t.headers,
      "Upload-Length": r.size
    }, y = {
      ...t,
      headers: S
    }, M = qe(O(Y), ut(e, t.url), y);
    M.onload = (C) => b(A(C, y.method)), M.onerror = (C) => i(
      J(
        "error",
        C.status,
        L(C.response) || C.statusText,
        C.getAllResponseHeaders()
      )
    ), M.ontimeout = He(i);
  }, P = (b) => {
    const Y = ut(e, T.url, D.serverId), y = {
      headers: typeof t.headers == "function" ? t.headers(D.serverId) : {
        ...t.headers
      },
      method: "HEAD"
    }, M = qe(null, Y, y);
    M.onload = (C) => b(A(C, y.method)), M.onerror = (C) => i(
      J(
        "error",
        C.status,
        L(C.response) || C.statusText,
        C.getAllResponseHeaders()
      )
    ), M.ontimeout = He(i);
  }, F = Math.floor(r.size / p);
  for (let b = 0; b <= F; b++) {
    const Y = b * p, S = r.slice(Y, Y + p, "application/offset+octet-stream");
    m[b] = {
      index: b,
      size: S.size,
      offset: Y,
      data: S,
      file: r,
      progress: 0,
      retries: [...I],
      status: Ie.QUEUED,
      error: null,
      request: null,
      timeout: null
    };
  }
  const W = () => o(D.serverId), v = (b) => b.status === Ie.QUEUED || b.status === Ie.ERROR, B = (b) => {
    if (D.aborted)
      return;
    if (b = b || m.find(v), !b) {
      m.every(($) => $.status === Ie.COMPLETE) && W();
      return;
    }
    b.status = Ie.PROCESSING, b.progress = null;
    const Y = T.ondata || (($) => $), S = T.onerror || (($) => null), y = ut(e, T.url, D.serverId), M = typeof T.headers == "function" ? T.headers(b) : {
      ...T.headers,
      "Content-Type": "application/offset+octet-stream",
      "Upload-Offset": b.offset,
      "Upload-Length": r.size,
      "Upload-Name": r.name
    }, C = b.request = qe(Y(b.data), y, {
      ...T,
      headers: M
    });
    C.onload = () => {
      b.status = Ie.COMPLETE, b.request = null, U();
    }, C.onprogress = ($, X, Be) => {
      b.progress = $ ? X : null, N();
    }, C.onerror = ($) => {
      b.status = Ie.ERROR, b.request = null, b.error = S($.response) || $.statusText, q(b) || i(
        J(
          "error",
          $.status,
          S($.response) || $.statusText,
          $.getAllResponseHeaders()
        )
      );
    }, C.ontimeout = ($) => {
      b.status = Ie.ERROR, b.request = null, q(b) || He(i)($);
    }, C.onabort = () => {
      b.status = Ie.QUEUED, b.request = null, a();
    };
  }, q = (b) => b.retries.length === 0 ? !1 : (b.status = Ie.WAITING, clearTimeout(b.timeout), b.timeout = setTimeout(() => {
    B(b);
  }, b.retries.shift()), !0), N = () => {
    const b = m.reduce((S, y) => S === null || y.progress === null ? null : S + y.progress, 0);
    if (b === null)
      return l(!1, 0, 0);
    const Y = m.reduce((S, y) => S + y.size, 0);
    l(!0, b, Y);
  }, U = () => {
    m.filter((Y) => Y.status === Ie.PROCESSING).length >= 1 || B();
  }, ie = () => {
    m.forEach((b) => {
      clearTimeout(b.timeout), b.request && b.request.abort();
    });
  };
  return D.serverId ? P((b) => {
    D.aborted || (m.filter((Y) => Y.offset < b).forEach((Y) => {
      Y.status = Ie.COMPLETE, Y.progress = Y.size;
    }), U());
  }) : w((b) => {
    D.aborted || (f(b), D.serverId = b, U());
  }), {
    abort: () => {
      D.aborted = !0, ie();
    }
  };
}, no = (e, t, n, r) => (s, o, i, l, a, f, d) => {
  if (!s)
    return;
  const m = r.chunkUploads, h = m && s.size > r.chunkSize, T = m && (h || r.chunkForce);
  if (s instanceof Blob && T)
    return to(
      e,
      t,
      n,
      s,
      o,
      i,
      l,
      a,
      f,
      d,
      r
    );
  const p = t.ondata || ((P) => P), I = t.onload || ((P) => P), D = t.onerror || ((P) => null), O = typeof t.headers == "function" ? t.headers(s, o) || {} : {
    ...t.headers
  }, A = {
    ...t,
    headers: O
  };
  var L = new FormData();
  ae(o) && L.append(n, JSON.stringify(o)), (s instanceof Blob ? [{ name: null, file: s }] : s).forEach((P) => {
    L.append(
      n,
      P.file,
      P.name === null ? P.file.name : `${P.name}${P.file.name}`
    );
  });
  const w = qe(p(L), ut(e, t.url), A);
  return w.onload = (P) => {
    i(J("load", P.status, I(P.response), P.getAllResponseHeaders()));
  }, w.onerror = (P) => {
    l(
      J(
        "error",
        P.status,
        D(P.response) || P.statusText,
        P.getAllResponseHeaders()
      )
    );
  }, w.ontimeout = He(l), w.onprogress = a, w.onabort = f, w;
}, ro = (e = "", t, n, r) => typeof t == "function" ? (...s) => t(n, ...s, r) : !t || !fe(t.url) ? null : no(e, t, n, r), lt = (e = "", t) => {
  if (typeof t == "function")
    return t;
  if (!t || !fe(t.url))
    return (s, o) => o();
  const n = t.onload || ((s) => s), r = t.onerror || ((s) => null);
  return (s, o, i) => {
    const l = qe(
      s,
      e + t.url,
      t
      // contains method, headers and withCredentials properties
    );
    return l.onload = (a) => {
      o(
        J(
          "load",
          a.status,
          n(a.response),
          a.getAllResponseHeaders()
        )
      );
    }, l.onerror = (a) => {
      i(
        J(
          "error",
          a.status,
          r(a.response) || a.statusText,
          a.getAllResponseHeaders()
        )
      );
    }, l.ontimeout = He(i), l;
  };
}, Cr = (e = 0, t = 1) => e + Math.random() * (t - e), so = (e, t = 1e3, n = 0, r = 25, s = 250) => {
  let o = null;
  const i = Date.now(), l = () => {
    let a = Date.now() - i, f = Cr(r, s);
    a + f > t && (f = a + f - t);
    let d = a / t;
    if (d >= 1 || document.hidden) {
      e(1);
      return;
    }
    e(d), o = setTimeout(l, f);
  };
  return t > 0 && l(), {
    clear: () => {
      clearTimeout(o);
    }
  };
}, io = (e, t) => {
  const n = {
    complete: !1,
    perceivedProgress: 0,
    perceivedPerformanceUpdater: null,
    progress: null,
    timestamp: null,
    perceivedDuration: 0,
    duration: 0,
    request: null,
    response: null
  }, { allowMinimumUploadDuration: r } = t, s = (d, m) => {
    const h = () => {
      n.duration === 0 || n.progress === null || f.fire("progress", f.getProgress());
    }, T = () => {
      n.complete = !0, f.fire("load-perceived", n.response.body);
    };
    f.fire("start"), n.timestamp = Date.now(), n.perceivedPerformanceUpdater = so(
      (p) => {
        n.perceivedProgress = p, n.perceivedDuration = Date.now() - n.timestamp, h(), n.response && n.perceivedProgress === 1 && !n.complete && T();
      },
      // random delay as in a list of files you start noticing
      // files uploading at the exact same speed
      r ? Cr(750, 1500) : 0
    ), n.request = e(
      // the file to process
      d,
      // the metadata to send along
      m,
      // callbacks (load, error, progress, abort, transfer)
      // load expects the body to be a server id if
      // you want to make use of revert
      (p) => {
        n.response = ae(p) ? p : {
          type: "load",
          code: 200,
          body: `${p}`,
          headers: {}
        }, n.duration = Date.now() - n.timestamp, n.progress = 1, f.fire("load", n.response.body), (!r || r && n.perceivedProgress === 1) && T();
      },
      // error is expected to be an object with type, code, body
      (p) => {
        n.perceivedPerformanceUpdater.clear(), f.fire(
          "error",
          ae(p) ? p : {
            type: "error",
            code: 0,
            body: `${p}`
          }
        );
      },
      // actual processing progress
      (p, I, D) => {
        n.duration = Date.now() - n.timestamp, n.progress = p ? I / D : null, h();
      },
      // abort does not expect a value
      () => {
        n.perceivedPerformanceUpdater.clear(), f.fire("abort", n.response ? n.response.body : null);
      },
      // register the id for this transfer
      (p) => {
        f.fire("transfer", p);
      }
    );
  }, o = () => {
    n.request && (n.perceivedPerformanceUpdater.clear(), n.request.abort && n.request.abort(), n.complete = !0);
  }, i = () => {
    o(), n.complete = !1, n.perceivedProgress = 0, n.progress = 0, n.timestamp = null, n.perceivedDuration = 0, n.duration = 0, n.request = null, n.response = null;
  }, l = r ? () => n.progress ? Math.min(n.progress, n.perceivedProgress) : null : () => n.progress || null, a = r ? () => Math.min(n.duration, n.perceivedDuration) : () => n.duration, f = {
    ...wt(),
    process: s,
    // start processing file
    abort: o,
    // abort active process request
    getProgress: l,
    getDuration: a,
    reset: i
  };
  return f;
}, Nr = (e) => e.substring(0, e.lastIndexOf(".")) || e, oo = (e) => {
  let t = [e.name, e.size, e.type];
  return e instanceof Blob || Yt(e) ? t[0] = e.name || wr() : Yt(e) ? (t[1] = e.length, t[2] = Mr(e)) : fe(e) && (t[0] = dt(e), t[1] = 0, t[2] = "application/octet-stream"), {
    name: t[0],
    size: t[1],
    type: t[2]
  };
}, Je = (e) => !!(e instanceof File || e instanceof Blob && e.name), Gr = (e) => {
  if (!ae(e))
    return e;
  const t = vt(e) ? [] : {};
  for (const n in e) {
    if (!e.hasOwnProperty(n))
      continue;
    const r = e[n];
    t[n] = r && ae(r) ? Gr(r) : r;
  }
  return t;
}, ao = (e = null, t = null, n = null) => {
  const r = Jt(), s = {
    // is archived
    archived: !1,
    // if is frozen, no longer fires events
    frozen: !1,
    // removed from view
    released: !1,
    // original source
    source: null,
    // file model reference
    file: n,
    // id of file on server
    serverFileReference: t,
    // id of file transfer on server
    transferId: null,
    // is aborted
    processingAborted: !1,
    // current item status
    status: t ? V.PROCESSING_COMPLETE : V.INIT,
    // active processes
    activeLoader: null,
    activeProcessor: null
  };
  let o = null;
  const i = {}, l = (v) => s.status = v, a = (v, ...B) => {
    s.released || s.frozen || F.fire(v, ...B);
  }, f = () => Pt(s.file.name), d = () => s.file.type, m = () => s.file.size, h = () => s.file, T = (v, B, q) => {
    if (s.source = v, F.fireSync("init"), s.file) {
      F.fireSync("load-skip");
      return;
    }
    s.file = oo(v), B.on("init", () => {
      a("load-init");
    }), B.on("meta", (N) => {
      s.file.size = N.size, s.file.filename = N.filename, N.source && (e = oe.LIMBO, s.serverFileReference = N.source, s.status = V.PROCESSING_COMPLETE), a("load-meta");
    }), B.on("progress", (N) => {
      l(V.LOADING), a("load-progress", N);
    }), B.on("error", (N) => {
      l(V.LOAD_ERROR), a("load-request-error", N);
    }), B.on("abort", () => {
      l(V.INIT), a("load-abort");
    }), B.on("load", (N) => {
      s.activeLoader = null;
      const U = (b) => {
        s.file = Je(b) ? b : s.file, e === oe.LIMBO && s.serverFileReference ? l(V.PROCESSING_COMPLETE) : l(V.IDLE), a("load");
      }, ie = (b) => {
        s.file = N, a("load-meta"), l(V.LOAD_ERROR), a("load-file-error", b);
      };
      if (s.serverFileReference) {
        U(N);
        return;
      }
      q(N, U, ie);
    }), B.setSource(v), s.activeLoader = B, B.load();
  }, p = () => {
    s.activeLoader && s.activeLoader.load();
  }, I = () => {
    if (s.activeLoader) {
      s.activeLoader.abort();
      return;
    }
    l(V.INIT), a("load-abort");
  }, D = (v, B) => {
    if (s.processingAborted) {
      s.processingAborted = !1;
      return;
    }
    if (l(V.PROCESSING), o = null, !(s.file instanceof Blob)) {
      F.on("load", () => {
        D(v, B);
      });
      return;
    }
    v.on("load", (U) => {
      s.transferId = null, s.serverFileReference = U;
    }), v.on("transfer", (U) => {
      s.transferId = U;
    }), v.on("load-perceived", (U) => {
      s.activeProcessor = null, s.transferId = null, s.serverFileReference = U, l(V.PROCESSING_COMPLETE), a("process-complete", U);
    }), v.on("start", () => {
      a("process-start");
    }), v.on("error", (U) => {
      s.activeProcessor = null, l(V.PROCESSING_ERROR), a("process-error", U);
    }), v.on("abort", (U) => {
      s.activeProcessor = null, s.serverFileReference = U, l(V.IDLE), a("process-abort"), o && o();
    }), v.on("progress", (U) => {
      a("process-progress", U);
    });
    const q = (U) => {
      s.archived || v.process(U, { ...i });
    }, N = console.error;
    B(s.file, q, N), s.activeProcessor = v;
  }, O = () => {
    s.processingAborted = !1, l(V.PROCESSING_QUEUED);
  }, A = () => new Promise((v) => {
    if (!s.activeProcessor) {
      s.processingAborted = !0, l(V.IDLE), a("process-abort"), v();
      return;
    }
    o = () => {
      v();
    }, s.activeProcessor.abort();
  }), L = (v, B) => new Promise((q, N) => {
    const U = s.serverFileReference !== null ? s.serverFileReference : s.transferId;
    if (U === null) {
      q();
      return;
    }
    v(
      U,
      () => {
        s.serverFileReference = null, s.transferId = null, q();
      },
      (ie) => {
        if (!B) {
          q();
          return;
        }
        l(V.PROCESSING_REVERT_ERROR), a("process-revert-error"), N(ie);
      }
    ), l(V.IDLE), a("process-revert");
  }), w = (v, B, q) => {
    const N = v.split("."), U = N[0], ie = N.pop();
    let b = i;
    N.forEach((Y) => b = b[Y]), JSON.stringify(b[ie]) !== JSON.stringify(B) && (b[ie] = B, a("metadata-update", {
      key: U,
      value: i[U],
      silent: q
    }));
  }, F = {
    id: { get: () => r },
    origin: { get: () => e, set: (v) => e = v },
    serverId: { get: () => s.serverFileReference },
    transferId: { get: () => s.transferId },
    status: { get: () => s.status },
    filename: { get: () => s.file.name },
    filenameWithoutExtension: { get: () => Nr(s.file.name) },
    fileExtension: { get: f },
    fileType: { get: d },
    fileSize: { get: m },
    file: { get: h },
    relativePath: { get: () => s.file._relativePath },
    source: { get: () => s.source },
    getMetadata: (v) => Gr(v ? i[v] : i),
    setMetadata: (v, B, q) => {
      if (ae(v)) {
        const N = v;
        return Object.keys(N).forEach((U) => {
          w(U, N[U], B);
        }), v;
      }
      return w(v, B, q), B;
    },
    extend: (v, B) => W[v] = B,
    abortLoad: I,
    retryLoad: p,
    requestProcessing: O,
    abortProcessing: A,
    load: T,
    process: D,
    revert: L,
    ...wt(),
    freeze: () => s.frozen = !0,
    release: () => s.released = !0,
    released: { get: () => s.released },
    archive: () => s.archived = !0,
    archived: { get: () => s.archived }
  }, W = Fe(F);
  return W;
}, lo = (e, t) => Pe(t) ? 0 : fe(t) ? e.findIndex((n) => n.id === t) : -1, kn = (e, t) => {
  const n = lo(e, t);
  if (!(n < 0))
    return e[n] || null;
}, Vn = (e, t, n, r, s, o) => {
  const i = qe(null, e, {
    method: "GET",
    responseType: "blob"
  });
  return i.onload = (l) => {
    const a = l.getAllResponseHeaders(), f = nn(a).name || dt(e);
    t(J("load", l.status, Ke(l.response, f), a));
  }, i.onerror = (l) => {
    n(J("error", l.status, l.statusText, l.getAllResponseHeaders()));
  }, i.onheaders = (l) => {
    o(J("headers", l.status, null, l.getAllResponseHeaders()));
  }, i.ontimeout = He(n), i.onprogress = r, i.onabort = s, i;
}, qn = (e) => (e.indexOf("//") === 0 && (e = location.protocol + e), e.toLowerCase().replace("blob:", "").replace(/([a-z])?:\/\//, "$1").split("/")[0]), co = (e) => (e.indexOf(":") > -1 || e.indexOf("//") > -1) && qn(location.href) !== qn(e), mt = (e) => (...t) => ke(e) ? e(...t) : e, uo = (e) => !Je(e.file), Bt = (e, t) => {
  clearTimeout(t.listUpdateTimeout), t.listUpdateTimeout = setTimeout(() => {
    e("DID_UPDATE_ITEMS", { items: ye(t.items) });
  }, 0);
}, Hn = (e, ...t) => new Promise((n) => {
  if (!e)
    return n(!0);
  const r = e(...t);
  if (r == null)
    return n(!0);
  if (typeof r == "boolean")
    return n(r);
  typeof r.then == "function" && r.then(n);
}), xt = (e, t) => {
  e.items.sort((n, r) => t(pe(n), pe(r)));
}, _e = (e, t) => ({
  query: n,
  success: r = () => {
  },
  failure: s = () => {
  },
  ...o
} = {}) => {
  const i = Ve(e.items, n);
  if (!i) {
    s({
      error: J("error", 0, "Item not found"),
      file: null
    });
    return;
  }
  t(i, r, s, o || {});
}, fo = (e, t, n) => ({
  /**
   * Aborts all ongoing processes
   */
  ABORT_ALL: () => {
    ye(n.items).forEach((r) => {
      r.freeze(), r.abortLoad(), r.abortProcessing();
    });
  },
  /**
   * Sets initial files
   */
  DID_SET_FILES: ({ value: r = [] }) => {
    const s = r.map((i) => ({
      source: i.source ? i.source : i,
      options: i.options
    }));
    let o = ye(n.items);
    o.forEach((i) => {
      s.find((l) => l.source === i.source || l.source === i.file) || e("REMOVE_ITEM", { query: i, remove: !1 });
    }), o = ye(n.items), s.forEach((i, l) => {
      o.find((a) => a.source === i.source || a.file === i.source) || e("ADD_ITEM", {
        ...i,
        interactionMethod: ge.NONE,
        index: l
      });
    });
  },
  DID_UPDATE_ITEM_METADATA: ({ id: r, action: s, change: o }) => {
    o.silent || (clearTimeout(n.itemUpdateTimeout), n.itemUpdateTimeout = setTimeout(() => {
      const i = kn(n.items, r);
      if (!t("IS_ASYNC")) {
        Re("SHOULD_PREPARE_OUTPUT", !1, {
          item: i,
          query: t,
          action: s,
          change: o
        }).then((d) => {
          const m = t("GET_BEFORE_PREPARE_FILE");
          m && (d = m(i, d)), d && e(
            "REQUEST_PREPARE_OUTPUT",
            {
              query: r,
              item: i,
              success: (h) => {
                e("DID_PREPARE_OUTPUT", { id: r, file: h });
              }
            },
            !0
          );
        });
        return;
      }
      i.origin === oe.LOCAL && e("DID_LOAD_ITEM", {
        id: i.id,
        error: null,
        serverFileReference: i.source
      });
      const l = () => {
        setTimeout(() => {
          e("REQUEST_ITEM_PROCESSING", { query: r });
        }, 32);
      }, a = (d) => {
        i.revert(
          lt(n.options.server.url, n.options.server.revert),
          t("GET_FORCE_REVERT")
        ).then(d ? l : () => {
        }).catch(() => {
        });
      }, f = (d) => {
        i.abortProcessing().then(d ? l : () => {
        });
      };
      if (i.status === V.PROCESSING_COMPLETE)
        return a(n.options.instantUpload);
      if (i.status === V.PROCESSING)
        return f(n.options.instantUpload);
      n.options.instantUpload && l();
    }, 0));
  },
  MOVE_ITEM: ({ query: r, index: s }) => {
    const o = Ve(n.items, r);
    if (!o)
      return;
    const i = n.items.indexOf(o);
    s = Lr(s, 0, n.items.length - 1), i !== s && n.items.splice(s, 0, n.items.splice(i, 1)[0]);
  },
  SORT: ({ compare: r }) => {
    xt(n, r), e("DID_SORT_ITEMS", {
      items: t("GET_ACTIVE_ITEMS")
    });
  },
  ADD_ITEMS: ({ items: r, index: s, interactionMethod: o, success: i = () => {
  }, failure: l = () => {
  } }) => {
    let a = s;
    if (s === -1 || typeof s > "u") {
      const T = t("GET_ITEM_INSERT_LOCATION"), p = t("GET_TOTAL_ITEMS");
      a = T === "before" ? 0 : p;
    }
    const f = t("GET_IGNORED_FILES"), d = (T) => Je(T) ? !f.includes(T.name.toLowerCase()) : !Pe(T), h = r.filter(d).map(
      (T) => new Promise((p, I) => {
        e("ADD_ITEM", {
          interactionMethod: o,
          source: T.source || T,
          success: p,
          failure: I,
          index: a++,
          options: T.options || {}
        });
      })
    );
    Promise.all(h).then(i).catch(l);
  },
  /**
   * @param source
   * @param index
   * @param interactionMethod
   */
  ADD_ITEM: ({
    source: r,
    index: s = -1,
    interactionMethod: o,
    success: i = () => {
    },
    failure: l = () => {
    },
    options: a = {}
  }) => {
    if (Pe(r)) {
      l({
        error: J("error", 0, "No source"),
        file: null
      });
      return;
    }
    if (Je(r) && n.options.ignoredFiles.includes(r.name.toLowerCase()))
      return;
    if (!Vi(n)) {
      if (n.options.allowMultiple || !n.options.allowMultiple && !n.options.allowReplace) {
        const A = J("warning", 0, "Max files");
        e("DID_THROW_MAX_FILES", {
          source: r,
          error: A
        }), l({ error: A, file: null });
        return;
      }
      const O = ye(n.items)[0];
      if (O.status === V.PROCESSING_COMPLETE || O.status === V.PROCESSING_REVERT_ERROR) {
        const A = t("GET_FORCE_REVERT");
        if (O.revert(
          lt(n.options.server.url, n.options.server.revert),
          A
        ).then(() => {
          A && e("ADD_ITEM", {
            source: r,
            index: s,
            interactionMethod: o,
            success: i,
            failure: l,
            options: a
          });
        }).catch(() => {
        }), A)
          return;
      }
      e("REMOVE_ITEM", { query: O.id });
    }
    const f = a.type === "local" ? oe.LOCAL : a.type === "limbo" ? oe.LIMBO : oe.INPUT, d = ao(
      // where did this file come from
      f,
      // an input file never has a server file reference
      f === oe.INPUT ? null : r,
      // file mock data, if defined
      a.file
    );
    Object.keys(a.metadata || {}).forEach((O) => {
      d.setMetadata(O, a.metadata[O]);
    }), We("DID_CREATE_ITEM", d, { query: t, dispatch: e });
    const m = t("GET_ITEM_INSERT_LOCATION");
    n.options.itemInsertLocationFreedom || (s = m === "before" ? -1 : n.items.length), Hi(n.items, d, s), ke(m) && r && xt(n, m);
    const h = d.id;
    d.on("init", () => {
      e("DID_INIT_ITEM", { id: h });
    }), d.on("load-init", () => {
      e("DID_START_ITEM_LOAD", { id: h });
    }), d.on("load-meta", () => {
      e("DID_UPDATE_ITEM_META", { id: h });
    }), d.on("load-progress", (O) => {
      e("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: h, progress: O });
    }), d.on("load-request-error", (O) => {
      const A = mt(n.options.labelFileLoadError)(O);
      if (O.code >= 400 && O.code < 500) {
        e("DID_THROW_ITEM_INVALID", {
          id: h,
          error: O,
          status: {
            main: A,
            sub: `${O.code} (${O.body})`
          }
        }), l({ error: O, file: pe(d) });
        return;
      }
      e("DID_THROW_ITEM_LOAD_ERROR", {
        id: h,
        error: O,
        status: {
          main: A,
          sub: n.options.labelTapToRetry
        }
      });
    }), d.on("load-file-error", (O) => {
      e("DID_THROW_ITEM_INVALID", {
        id: h,
        error: O.status,
        status: O.status
      }), l({ error: O.status, file: pe(d) });
    }), d.on("load-abort", () => {
      e("REMOVE_ITEM", { query: h });
    }), d.on("load-skip", () => {
      e("COMPLETE_LOAD_ITEM", {
        query: h,
        item: d,
        data: {
          source: r,
          success: i
        }
      });
    }), d.on("load", () => {
      const O = (A) => {
        if (!A) {
          e("REMOVE_ITEM", {
            query: h
          });
          return;
        }
        d.on("metadata-update", (L) => {
          e("DID_UPDATE_ITEM_METADATA", { id: h, change: L });
        }), Re("SHOULD_PREPARE_OUTPUT", !1, { item: d, query: t }).then(
          (L) => {
            const w = t("GET_BEFORE_PREPARE_FILE");
            w && (L = w(d, L));
            const P = () => {
              e("COMPLETE_LOAD_ITEM", {
                query: h,
                item: d,
                data: {
                  source: r,
                  success: i
                }
              }), Bt(e, n);
            };
            if (L) {
              e(
                "REQUEST_PREPARE_OUTPUT",
                {
                  query: h,
                  item: d,
                  success: (F) => {
                    e("DID_PREPARE_OUTPUT", { id: h, file: F }), P();
                  }
                },
                !0
              );
              return;
            }
            P();
          }
        );
      };
      Re("DID_LOAD_ITEM", d, { query: t, dispatch: e }).then(() => {
        Hn(t("GET_BEFORE_ADD_FILE"), pe(d)).then(
          O
        );
      }).catch((A) => {
        if (!A || !A.error || !A.status)
          return O(!1);
        e("DID_THROW_ITEM_INVALID", {
          id: h,
          error: A.error,
          status: A.status
        });
      });
    }), d.on("process-start", () => {
      e("DID_START_ITEM_PROCESSING", { id: h });
    }), d.on("process-progress", (O) => {
      e("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: h, progress: O });
    }), d.on("process-error", (O) => {
      e("DID_THROW_ITEM_PROCESSING_ERROR", {
        id: h,
        error: O,
        status: {
          main: mt(n.options.labelFileProcessingError)(O),
          sub: n.options.labelTapToRetry
        }
      });
    }), d.on("process-revert-error", (O) => {
      e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", {
        id: h,
        error: O,
        status: {
          main: mt(n.options.labelFileProcessingRevertError)(O),
          sub: n.options.labelTapToRetry
        }
      });
    }), d.on("process-complete", (O) => {
      e("DID_COMPLETE_ITEM_PROCESSING", {
        id: h,
        error: null,
        serverFileReference: O
      }), e("DID_DEFINE_VALUE", { id: h, value: O });
    }), d.on("process-abort", () => {
      e("DID_ABORT_ITEM_PROCESSING", { id: h });
    }), d.on("process-revert", () => {
      e("DID_REVERT_ITEM_PROCESSING", { id: h }), e("DID_DEFINE_VALUE", { id: h, value: null });
    }), e("DID_ADD_ITEM", { id: h, index: s, interactionMethod: o }), Bt(e, n);
    const { url: T, load: p, restore: I, fetch: D } = n.options.server || {};
    d.load(
      r,
      // this creates a function that loads the file based on the type of file (string, base64, blob, file) and location of file (local, remote, limbo)
      eo(
        f === oe.INPUT ? (
          // input, if is remote, see if should use custom fetch, else use default fetchBlob
          fe(r) && co(r) && D ? Ft(T, D) : Vn
        ) : (
          // limbo or local
          f === oe.LIMBO ? Ft(T, I) : Ft(T, p)
        )
        // local
      ),
      // called when the file is loaded so it can be piped through the filters
      (O, A, L) => {
        Re("LOAD_FILE", O, { query: t }).then(A).catch(L);
      }
    );
  },
  REQUEST_PREPARE_OUTPUT: ({ item: r, success: s, failure: o = () => {
  } }) => {
    const i = {
      error: J("error", 0, "Item not found"),
      file: null
    };
    if (r.archived)
      return o(i);
    Re("PREPARE_OUTPUT", r.file, { query: t, item: r }).then((l) => {
      Re("COMPLETE_PREPARE_OUTPUT", l, { query: t, item: r }).then((a) => {
        if (r.archived)
          return o(i);
        s(a);
      });
    });
  },
  COMPLETE_LOAD_ITEM: ({ item: r, data: s }) => {
    const { success: o, source: i } = s, l = t("GET_ITEM_INSERT_LOCATION");
    if (ke(l) && i && xt(n, l), e("DID_LOAD_ITEM", {
      id: r.id,
      error: null,
      serverFileReference: r.origin === oe.INPUT ? null : i
    }), o(pe(r)), r.origin === oe.LOCAL) {
      e("DID_LOAD_LOCAL_ITEM", { id: r.id });
      return;
    }
    if (r.origin === oe.LIMBO) {
      e("DID_COMPLETE_ITEM_PROCESSING", {
        id: r.id,
        error: null,
        serverFileReference: i
      }), e("DID_DEFINE_VALUE", {
        id: r.id,
        value: r.serverId || i
      });
      return;
    }
    t("IS_ASYNC") && n.options.instantUpload && e("REQUEST_ITEM_PROCESSING", { query: r.id });
  },
  RETRY_ITEM_LOAD: _e(n, (r) => {
    r.retryLoad();
  }),
  REQUEST_ITEM_PREPARE: _e(n, (r, s, o) => {
    e(
      "REQUEST_PREPARE_OUTPUT",
      {
        query: r.id,
        item: r,
        success: (i) => {
          e("DID_PREPARE_OUTPUT", { id: r.id, file: i }), s({
            file: r,
            output: i
          });
        },
        failure: o
      },
      !0
    );
  }),
  REQUEST_ITEM_PROCESSING: _e(n, (r, s, o) => {
    if (!// waiting for something
    (r.status === V.IDLE || // processing went wrong earlier
    r.status === V.PROCESSING_ERROR)) {
      const l = () => e("REQUEST_ITEM_PROCESSING", { query: r, success: s, failure: o }), a = () => document.hidden ? l() : setTimeout(l, 32);
      r.status === V.PROCESSING_COMPLETE || r.status === V.PROCESSING_REVERT_ERROR ? r.revert(
        lt(n.options.server.url, n.options.server.revert),
        t("GET_FORCE_REVERT")
      ).then(a).catch(() => {
      }) : r.status === V.PROCESSING && r.abortProcessing().then(a);
      return;
    }
    r.status !== V.PROCESSING_QUEUED && (r.requestProcessing(), e("DID_REQUEST_ITEM_PROCESSING", { id: r.id }), e("PROCESS_ITEM", { query: r, success: s, failure: o }, !0));
  }),
  PROCESS_ITEM: _e(n, (r, s, o) => {
    const i = t("GET_MAX_PARALLEL_UPLOADS");
    if (t("GET_ITEMS_BY_STATUS", V.PROCESSING).length === i) {
      n.processingQueue.push({
        id: r.id,
        success: s,
        failure: o
      });
      return;
    }
    if (r.status === V.PROCESSING)
      return;
    const a = () => {
      const d = n.processingQueue.shift();
      if (!d)
        return;
      const { id: m, success: h, failure: T } = d, p = Ve(n.items, m);
      if (!p || p.archived) {
        a();
        return;
      }
      e("PROCESS_ITEM", { query: m, success: h, failure: T }, !0);
    };
    r.onOnce("process-complete", () => {
      s(pe(r)), a();
      const d = n.options.server;
      if (n.options.instantUpload && r.origin === oe.LOCAL && ke(d.remove)) {
        const T = () => {
        };
        r.origin = oe.LIMBO, n.options.server.remove(r.source, T, T);
      }
      t("GET_ITEMS_BY_STATUS", V.PROCESSING_COMPLETE).length === n.items.length && e("DID_COMPLETE_ITEM_PROCESSING_ALL");
    }), r.onOnce("process-error", (d) => {
      o({ error: d, file: pe(r) }), a();
    });
    const f = n.options;
    r.process(
      io(
        ro(f.server.url, f.server.process, f.name, {
          chunkTransferId: r.transferId,
          chunkServer: f.server.patch,
          chunkUploads: f.chunkUploads,
          chunkForce: f.chunkForce,
          chunkSize: f.chunkSize,
          chunkRetryDelays: f.chunkRetryDelays
        }),
        {
          allowMinimumUploadDuration: t("GET_ALLOW_MINIMUM_UPLOAD_DURATION")
        }
      ),
      // called when the file is about to be processed so it can be piped through the transform filters
      (d, m, h) => {
        Re("PREPARE_OUTPUT", d, { query: t, item: r }).then((T) => {
          e("DID_PREPARE_OUTPUT", { id: r.id, file: T }), m(T);
        }).catch(h);
      }
    );
  }),
  RETRY_ITEM_PROCESSING: _e(n, (r) => {
    e("REQUEST_ITEM_PROCESSING", { query: r });
  }),
  REQUEST_REMOVE_ITEM: _e(n, (r) => {
    Hn(t("GET_BEFORE_REMOVE_FILE"), pe(r)).then((s) => {
      s && e("REMOVE_ITEM", { query: r });
    });
  }),
  RELEASE_ITEM: _e(n, (r) => {
    r.release();
  }),
  REMOVE_ITEM: _e(n, (r, s, o, i) => {
    const l = () => {
      const f = r.id;
      kn(n.items, f).archive(), e("DID_REMOVE_ITEM", { error: null, id: f, item: r }), Bt(e, n), s(pe(r));
    }, a = n.options.server;
    r.origin === oe.LOCAL && a && ke(a.remove) && i.remove !== !1 ? (e("DID_START_ITEM_REMOVE", { id: r.id }), a.remove(
      r.source,
      () => l(),
      (f) => {
        e("DID_THROW_ITEM_REMOVE_ERROR", {
          id: r.id,
          error: J("error", 0, f, null),
          status: {
            main: mt(n.options.labelFileRemoveError)(f),
            sub: n.options.labelTapToRetry
          }
        });
      }
    )) : ((i.revert && r.origin !== oe.LOCAL && r.serverId !== null || // if chunked uploads are enabled and we're uploading in chunks for this specific file
    // or if the file isn't big enough for chunked uploads but chunkForce is set then call
    // revert before removing from the view...
    n.options.chunkUploads && r.file.size > n.options.chunkSize || n.options.chunkUploads && n.options.chunkForce) && r.revert(
      lt(n.options.server.url, n.options.server.revert),
      t("GET_FORCE_REVERT")
    ), l());
  }),
  ABORT_ITEM_LOAD: _e(n, (r) => {
    r.abortLoad();
  }),
  ABORT_ITEM_PROCESSING: _e(n, (r) => {
    if (r.serverId) {
      e("REVERT_ITEM_PROCESSING", { id: r.id });
      return;
    }
    r.abortProcessing().then(() => {
      n.options.instantUpload && e("REMOVE_ITEM", { query: r.id });
    });
  }),
  REQUEST_REVERT_ITEM_PROCESSING: _e(n, (r) => {
    if (!n.options.instantUpload) {
      e("REVERT_ITEM_PROCESSING", { query: r });
      return;
    }
    const s = (l) => {
      l && e("REVERT_ITEM_PROCESSING", { query: r });
    }, o = t("GET_BEFORE_REMOVE_FILE");
    if (!o)
      return s(!0);
    const i = o(pe(r));
    if (i == null)
      return s(!0);
    if (typeof i == "boolean")
      return s(i);
    typeof i.then == "function" && i.then(s);
  }),
  REVERT_ITEM_PROCESSING: _e(n, (r) => {
    r.revert(
      lt(n.options.server.url, n.options.server.revert),
      t("GET_FORCE_REVERT")
    ).then(() => {
      (n.options.instantUpload || uo(r)) && e("REMOVE_ITEM", { query: r.id });
    }).catch(() => {
    });
  }),
  SET_OPTIONS: ({ options: r }) => {
    const s = Object.keys(r), o = Eo.filter((l) => s.includes(l));
    [
      // add prioritized first if passed to options, else remove
      ...o,
      // prevent duplicate keys
      ...Object.keys(r).filter((l) => !o.includes(l))
    ].forEach((l) => {
      e(`SET_${Lt(l, "_").toUpperCase()}`, {
        value: r[l]
      });
    });
  }
}), Eo = [
  "server"
  // must be processed before "files"
], rn = (e) => e, Me = (e) => document.createElement(e), ee = (e, t) => {
  let n = e.childNodes[0];
  n ? t !== n.nodeValue && (n.nodeValue = t) : (n = document.createTextNode(t), e.appendChild(n));
}, Yn = (e, t, n, r) => {
  const s = (r % 360 - 90) * Math.PI / 180;
  return {
    x: e + n * Math.cos(s),
    y: t + n * Math.sin(s)
  };
}, po = (e, t, n, r, s, o) => {
  const i = Yn(e, t, n, s), l = Yn(e, t, n, r);
  return ["M", i.x, i.y, "A", n, n, 0, o, 0, l.x, l.y].join(" ");
}, mo = (e, t, n, r, s) => {
  let o = 1;
  return s > r && s - r <= 0.5 && (o = 0), r > s && r - s >= 0.5 && (o = 0), po(
    e,
    t,
    n,
    Math.min(0.9999, r) * 360,
    Math.min(0.9999, s) * 360,
    o
  );
}, ho = ({ root: e, props: t }) => {
  t.spin = !1, t.progress = 0, t.opacity = 0;
  const n = Rt("svg");
  e.ref.path = Rt("path", {
    "stroke-width": 2,
    "stroke-linecap": "round"
  }), n.appendChild(e.ref.path), e.ref.svg = n, e.appendChild(n);
}, To = ({ root: e, props: t }) => {
  if (t.opacity === 0)
    return;
  t.align && (e.element.dataset.align = t.align);
  const n = parseInt(re(e.ref.path, "stroke-width"), 10), r = e.rect.element.width * 0.5;
  let s = 0, o = 0;
  t.spin ? (s = 0, o = 0.5) : (s = 0, o = t.progress);
  const i = mo(r, r, r - n, s, o);
  re(e.ref.path, "d", i), re(e.ref.path, "stroke-opacity", t.spin || t.progress > 0 ? 1 : 0);
}, zn = se({
  tag: "div",
  name: "progress-indicator",
  ignoreRectUpdate: !0,
  ignoreRect: !0,
  create: ho,
  write: To,
  mixins: {
    apis: ["progress", "spin", "align"],
    styles: ["opacity"],
    animations: {
      opacity: { type: "tween", duration: 500 },
      progress: {
        type: "spring",
        stiffness: 0.95,
        damping: 0.65,
        mass: 10
      }
    }
  }
}), Io = ({ root: e, props: t }) => {
  e.element.innerHTML = (t.icon || "") + `<span>${t.label}</span>`, t.isDisabled = !1;
}, _o = ({ root: e, props: t }) => {
  const { isDisabled: n } = t, r = e.query("GET_DISABLED") || t.opacity === 0;
  r && !n ? (t.isDisabled = !0, re(e.element, "disabled", "disabled")) : !r && n && (t.isDisabled = !1, e.element.removeAttribute("disabled"));
}, Fr = se({
  tag: "button",
  attributes: {
    type: "button"
  },
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  name: "file-action-button",
  mixins: {
    apis: ["label"],
    styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: "spring",
      scaleY: "spring",
      translateX: "spring",
      translateY: "spring",
      opacity: { type: "tween", duration: 250 }
    },
    listeners: !0
  },
  create: Io,
  write: _o
}), Br = (e, t = ".", n = 1e3, r = {}) => {
  const {
    labelBytes: s = "bytes",
    labelKilobytes: o = "KB",
    labelMegabytes: i = "MB",
    labelGigabytes: l = "GB"
  } = r;
  e = Math.round(Math.abs(e));
  const a = n, f = n * n, d = n * n * n;
  return e < a ? `${e} ${s}` : e < f ? `${Math.floor(e / a)} ${o}` : e < d ? `${Wn(e / f, 1, t)} ${i}` : `${Wn(e / d, 2, t)} ${l}`;
}, Wn = (e, t, n) => e.toFixed(t).split(".").filter((r) => r !== "0").join(n), go = ({ root: e, props: t }) => {
  const n = Me("span");
  n.className = "filepond--file-info-main", re(n, "aria-hidden", "true"), e.appendChild(n), e.ref.fileName = n;
  const r = Me("span");
  r.className = "filepond--file-info-sub", e.appendChild(r), e.ref.fileSize = r, ee(r, e.query("GET_LABEL_FILE_WAITING_FOR_SIZE")), ee(n, rn(e.query("GET_ITEM_NAME", t.id)));
}, zt = ({ root: e, props: t }) => {
  ee(
    e.ref.fileSize,
    Br(
      e.query("GET_ITEM_SIZE", t.id),
      ".",
      e.query("GET_FILE_SIZE_BASE"),
      e.query("GET_FILE_SIZE_LABELS", e.query)
    )
  ), ee(e.ref.fileName, rn(e.query("GET_ITEM_NAME", t.id)));
}, $n = ({ root: e, props: t }) => {
  if (tt(e.query("GET_ITEM_SIZE", t.id))) {
    zt({ root: e, props: t });
    return;
  }
  ee(e.ref.fileSize, e.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
}, So = se({
  name: "file-info",
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  write: Ee({
    DID_LOAD_ITEM: zt,
    DID_UPDATE_ITEM_META: zt,
    DID_THROW_ITEM_LOAD_ERROR: $n,
    DID_THROW_ITEM_INVALID: $n
  }),
  didCreateView: (e) => {
    We("CREATE_VIEW", { ...e, view: e });
  },
  create: go,
  mixins: {
    styles: ["translateX", "translateY"],
    animations: {
      translateX: "spring",
      translateY: "spring"
    }
  }
}), xr = (e) => Math.round(e * 100), Ro = ({ root: e }) => {
  const t = Me("span");
  t.className = "filepond--file-status-main", e.appendChild(t), e.ref.main = t;
  const n = Me("span");
  n.className = "filepond--file-status-sub", e.appendChild(n), e.ref.sub = n, Ur({ root: e, action: { progress: null } });
}, Ur = ({ root: e, action: t }) => {
  const n = t.progress === null ? e.query("GET_LABEL_FILE_LOADING") : `${e.query("GET_LABEL_FILE_LOADING")} ${xr(t.progress)}%`;
  ee(e.ref.main, n), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, yo = ({ root: e, action: t }) => {
  const n = t.progress === null ? e.query("GET_LABEL_FILE_PROCESSING") : `${e.query("GET_LABEL_FILE_PROCESSING")} ${xr(t.progress)}%`;
  ee(e.ref.main, n), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, bo = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, Oo = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_ABORTED")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_RETRY"));
}, Do = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_UNDO"));
}, Xn = ({ root: e }) => {
  ee(e.ref.main, ""), ee(e.ref.sub, "");
}, ct = ({ root: e, action: t }) => {
  ee(e.ref.main, t.status.main), ee(e.ref.sub, t.status.sub);
}, vo = se({
  name: "file-status",
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  write: Ee({
    DID_LOAD_ITEM: Xn,
    DID_REVERT_ITEM_PROCESSING: Xn,
    DID_REQUEST_ITEM_PROCESSING: bo,
    DID_ABORT_ITEM_PROCESSING: Oo,
    DID_COMPLETE_ITEM_PROCESSING: Do,
    DID_UPDATE_ITEM_PROCESS_PROGRESS: yo,
    DID_UPDATE_ITEM_LOAD_PROGRESS: Ur,
    DID_THROW_ITEM_LOAD_ERROR: ct,
    DID_THROW_ITEM_INVALID: ct,
    DID_THROW_ITEM_PROCESSING_ERROR: ct,
    DID_THROW_ITEM_PROCESSING_REVERT_ERROR: ct,
    DID_THROW_ITEM_REMOVE_ERROR: ct
  }),
  didCreateView: (e) => {
    We("CREATE_VIEW", { ...e, view: e });
  },
  create: Ro,
  mixins: {
    styles: ["translateX", "translateY", "opacity"],
    animations: {
      opacity: { type: "tween", duration: 250 },
      translateX: "spring",
      translateY: "spring"
    }
  }
}), Wt = {
  AbortItemLoad: {
    label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD",
    action: "ABORT_ITEM_LOAD",
    className: "filepond--action-abort-item-load",
    align: "LOAD_INDICATOR_POSITION"
    // right
  },
  RetryItemLoad: {
    label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD",
    action: "RETRY_ITEM_LOAD",
    icon: "GET_ICON_RETRY",
    className: "filepond--action-retry-item-load",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  },
  RemoveItem: {
    label: "GET_LABEL_BUTTON_REMOVE_ITEM",
    action: "REQUEST_REMOVE_ITEM",
    icon: "GET_ICON_REMOVE",
    className: "filepond--action-remove-item",
    align: "BUTTON_REMOVE_ITEM_POSITION"
    // left
  },
  ProcessItem: {
    label: "GET_LABEL_BUTTON_PROCESS_ITEM",
    action: "REQUEST_ITEM_PROCESSING",
    icon: "GET_ICON_PROCESS",
    className: "filepond--action-process-item",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  },
  AbortItemProcessing: {
    label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING",
    action: "ABORT_ITEM_PROCESSING",
    className: "filepond--action-abort-item-processing",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  },
  RetryItemProcessing: {
    label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING",
    action: "RETRY_ITEM_PROCESSING",
    icon: "GET_ICON_RETRY",
    className: "filepond--action-retry-item-processing",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  },
  RevertItemProcessing: {
    label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING",
    action: "REQUEST_REVERT_ITEM_PROCESSING",
    icon: "GET_ICON_UNDO",
    className: "filepond--action-revert-item-processing",
    align: "BUTTON_PROCESS_ITEM_POSITION"
    // right
  }
}, $t = [];
Z(Wt, (e) => {
  $t.push(e);
});
const he = (e) => {
  if (Xt(e) === "right")
    return 0;
  const t = e.ref.buttonRemoveItem.rect.element;
  return t.hidden ? null : t.width + t.left;
}, Ao = (e) => e.ref.buttonAbortItemLoad.rect.element.width, ht = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4), Lo = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2), wo = (e) => e.query("GET_STYLE_LOAD_INDICATOR_POSITION"), Po = (e) => e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"), Xt = (e) => e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION"), Mo = {
  buttonAbortItemLoad: { opacity: 0 },
  buttonRetryItemLoad: { opacity: 0 },
  buttonRemoveItem: { opacity: 0 },
  buttonProcessItem: { opacity: 0 },
  buttonAbortItemProcessing: { opacity: 0 },
  buttonRetryItemProcessing: { opacity: 0 },
  buttonRevertItemProcessing: { opacity: 0 },
  loadProgressIndicator: { opacity: 0, align: wo },
  processProgressIndicator: { opacity: 0, align: Po },
  processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 },
  info: { translateX: 0, translateY: 0, opacity: 0 },
  status: { translateX: 0, translateY: 0, opacity: 0 }
}, jn = {
  buttonRemoveItem: { opacity: 1 },
  buttonProcessItem: { opacity: 1 },
  info: { translateX: he },
  status: { translateX: he }
}, Ut = {
  buttonAbortItemProcessing: { opacity: 1 },
  processProgressIndicator: { opacity: 1 },
  status: { opacity: 1 }
}, Qe = {
  DID_THROW_ITEM_INVALID: {
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: he },
    status: { translateX: he, opacity: 1 }
  },
  DID_START_ITEM_LOAD: {
    buttonAbortItemLoad: { opacity: 1 },
    loadProgressIndicator: { opacity: 1 },
    status: { opacity: 1 }
  },
  DID_THROW_ITEM_LOAD_ERROR: {
    buttonRetryItemLoad: { opacity: 1 },
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: he },
    status: { opacity: 1 }
  },
  DID_START_ITEM_REMOVE: {
    processProgressIndicator: { opacity: 1, align: Xt },
    info: { translateX: he },
    status: { opacity: 0 }
  },
  DID_THROW_ITEM_REMOVE_ERROR: {
    processProgressIndicator: { opacity: 0, align: Xt },
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: he },
    status: { opacity: 1, translateX: he }
  },
  DID_LOAD_ITEM: jn,
  DID_LOAD_LOCAL_ITEM: {
    buttonRemoveItem: { opacity: 1 },
    info: { translateX: he },
    status: { translateX: he }
  },
  DID_START_ITEM_PROCESSING: Ut,
  DID_REQUEST_ITEM_PROCESSING: Ut,
  DID_UPDATE_ITEM_PROCESS_PROGRESS: Ut,
  DID_COMPLETE_ITEM_PROCESSING: {
    buttonRevertItemProcessing: { opacity: 1 },
    info: { opacity: 1 },
    status: { opacity: 1 }
  },
  DID_THROW_ITEM_PROCESSING_ERROR: {
    buttonRemoveItem: { opacity: 1 },
    buttonRetryItemProcessing: { opacity: 1 },
    status: { opacity: 1 },
    info: { translateX: he }
  },
  DID_THROW_ITEM_PROCESSING_REVERT_ERROR: {
    buttonRevertItemProcessing: { opacity: 1 },
    status: { opacity: 1 },
    info: { opacity: 1 }
  },
  DID_ABORT_ITEM_PROCESSING: {
    buttonRemoveItem: { opacity: 1 },
    buttonProcessItem: { opacity: 1 },
    info: { translateX: he },
    status: { opacity: 1 }
  },
  DID_REVERT_ITEM_PROCESSING: jn
}, Co = se({
  create: ({ root: e }) => {
    e.element.innerHTML = e.query("GET_ICON_DONE");
  },
  name: "processing-complete-indicator",
  ignoreRect: !0,
  mixins: {
    styles: ["scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: "spring",
      scaleY: "spring",
      opacity: { type: "tween", duration: 250 }
    }
  }
}), No = ({ root: e, props: t }) => {
  const n = Object.keys(Wt).reduce((p, I) => (p[I] = { ...Wt[I] }, p), {}), { id: r } = t, s = e.query("GET_ALLOW_REVERT"), o = e.query("GET_ALLOW_REMOVE"), i = e.query("GET_ALLOW_PROCESS"), l = e.query("GET_INSTANT_UPLOAD"), a = e.query("IS_ASYNC"), f = e.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
  let d;
  a ? i && !s ? d = (p) => !/RevertItemProcessing/.test(p) : !i && s ? d = (p) => !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(p) : !i && !s && (d = (p) => !/Process/.test(p)) : d = (p) => !/Process/.test(p);
  const m = d ? $t.filter(d) : $t.concat();
  if (l && s && (n.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM", n.RevertItemProcessing.icon = "GET_ICON_REMOVE"), a && !s) {
    const p = Qe.DID_COMPLETE_ITEM_PROCESSING;
    p.info.translateX = Lo, p.info.translateY = ht, p.status.translateY = ht, p.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  if (a && !i && ([
    "DID_START_ITEM_PROCESSING",
    "DID_REQUEST_ITEM_PROCESSING",
    "DID_UPDATE_ITEM_PROCESS_PROGRESS",
    "DID_THROW_ITEM_PROCESSING_ERROR"
  ].forEach((p) => {
    Qe[p].status.translateY = ht;
  }), Qe.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = Ao), f && s) {
    n.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION";
    const p = Qe.DID_COMPLETE_ITEM_PROCESSING;
    p.info.translateX = he, p.status.translateY = ht, p.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  o || (n.RemoveItem.disabled = !0), Z(n, (p, I) => {
    const D = e.createChildView(Fr, {
      label: e.query(I.label),
      icon: e.query(I.icon),
      opacity: 0
    });
    m.includes(p) && e.appendChildView(D), I.disabled && (D.element.setAttribute("disabled", "disabled"), D.element.setAttribute("hidden", "hidden")), D.element.dataset.align = e.query(`GET_STYLE_${I.align}`), D.element.classList.add(I.className), D.on("click", (O) => {
      O.stopPropagation(), !I.disabled && e.dispatch(I.action, { query: r });
    }), e.ref[`button${p}`] = D;
  }), e.ref.processingCompleteIndicator = e.appendChildView(
    e.createChildView(Co)
  ), e.ref.processingCompleteIndicator.element.dataset.align = e.query(
    "GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"
  ), e.ref.info = e.appendChildView(e.createChildView(So, { id: r })), e.ref.status = e.appendChildView(e.createChildView(vo, { id: r }));
  const h = e.appendChildView(
    e.createChildView(zn, {
      opacity: 0,
      align: e.query("GET_STYLE_LOAD_INDICATOR_POSITION")
    })
  );
  h.element.classList.add("filepond--load-indicator"), e.ref.loadProgressIndicator = h;
  const T = e.appendChildView(
    e.createChildView(zn, {
      opacity: 0,
      align: e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION")
    })
  );
  T.element.classList.add("filepond--process-indicator"), e.ref.processProgressIndicator = T, e.ref.activeStyles = [];
}, Go = ({ root: e, actions: t, props: n }) => {
  Fo({ root: e, actions: t, props: n });
  let r = t.concat().filter((s) => /^DID_/.test(s.type)).reverse().find((s) => Qe[s.type]);
  if (r) {
    e.ref.activeStyles = [];
    const s = Qe[r.type];
    Z(Mo, (o, i) => {
      const l = e.ref[o];
      Z(i, (a, f) => {
        const d = s[o] && typeof s[o][a] < "u" ? s[o][a] : f;
        e.ref.activeStyles.push({ control: l, key: a, value: d });
      });
    });
  }
  e.ref.activeStyles.forEach(({ control: s, key: o, value: i }) => {
    s[o] = typeof i == "function" ? i(e) : i;
  });
}, Fo = Ee({
  DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: ({ root: e, action: t }) => {
    e.ref.buttonAbortItemProcessing.label = t.value;
  },
  DID_SET_LABEL_BUTTON_ABORT_ITEM_LOAD: ({ root: e, action: t }) => {
    e.ref.buttonAbortItemLoad.label = t.value;
  },
  DID_SET_LABEL_BUTTON_ABORT_ITEM_REMOVAL: ({ root: e, action: t }) => {
    e.ref.buttonAbortItemRemoval.label = t.value;
  },
  DID_REQUEST_ITEM_PROCESSING: ({ root: e }) => {
    e.ref.processProgressIndicator.spin = !0, e.ref.processProgressIndicator.progress = 0;
  },
  DID_START_ITEM_LOAD: ({ root: e }) => {
    e.ref.loadProgressIndicator.spin = !0, e.ref.loadProgressIndicator.progress = 0;
  },
  DID_START_ITEM_REMOVE: ({ root: e }) => {
    e.ref.processProgressIndicator.spin = !0, e.ref.processProgressIndicator.progress = 0;
  },
  DID_UPDATE_ITEM_LOAD_PROGRESS: ({ root: e, action: t }) => {
    e.ref.loadProgressIndicator.spin = !1, e.ref.loadProgressIndicator.progress = t.progress;
  },
  DID_UPDATE_ITEM_PROCESS_PROGRESS: ({ root: e, action: t }) => {
    e.ref.processProgressIndicator.spin = !1, e.ref.processProgressIndicator.progress = t.progress;
  }
}), Bo = se({
  create: No,
  write: Go,
  didCreateView: (e) => {
    We("CREATE_VIEW", { ...e, view: e });
  },
  name: "file"
}), xo = ({ root: e, props: t }) => {
  e.ref.fileName = Me("legend"), e.appendChild(e.ref.fileName), e.ref.file = e.appendChildView(e.createChildView(Bo, { id: t.id })), e.ref.data = !1;
}, Uo = ({ root: e, props: t }) => {
  ee(e.ref.fileName, rn(e.query("GET_ITEM_NAME", t.id)));
}, ko = se({
  create: xo,
  ignoreRect: !0,
  write: Ee({
    DID_LOAD_ITEM: Uo
  }),
  didCreateView: (e) => {
    We("CREATE_VIEW", { ...e, view: e });
  },
  tag: "fieldset",
  name: "file-wrapper"
}), Qn = { type: "spring", damping: 0.6, mass: 7 }, Vo = ({ root: e, props: t }) => {
  [
    {
      name: "top"
    },
    {
      name: "center",
      props: {
        translateY: null,
        scaleY: null
      },
      mixins: {
        animations: {
          scaleY: Qn
        },
        styles: ["translateY", "scaleY"]
      }
    },
    {
      name: "bottom",
      props: {
        translateY: null
      },
      mixins: {
        animations: {
          translateY: Qn
        },
        styles: ["translateY"]
      }
    }
  ].forEach((n) => {
    qo(e, n, t.name);
  }), e.element.classList.add(`filepond--${t.name}`), e.ref.scalable = null;
}, qo = (e, t, n) => {
  const r = se({
    name: `panel-${t.name} filepond--${n}`,
    mixins: t.mixins,
    ignoreRectUpdate: !0
  }), s = e.createChildView(r, t.props);
  e.ref[t.name] = e.appendChildView(s);
}, Ho = ({ root: e, props: t }) => {
  if ((e.ref.scalable === null || t.scalable !== e.ref.scalable) && (e.ref.scalable = gr(t.scalable) ? t.scalable : !0, e.element.dataset.scalable = e.ref.scalable), !t.height)
    return;
  const n = e.ref.top.rect.element, r = e.ref.bottom.rect.element, s = Math.max(n.height + r.height, t.height);
  e.ref.center.translateY = n.height, e.ref.center.scaleY = (s - n.height - r.height) / 100, e.ref.bottom.translateY = s - r.height;
}, kr = se({
  name: "panel",
  read: ({ root: e, props: t }) => t.heightCurrent = e.ref.bottom.translateY,
  write: Ho,
  create: Vo,
  ignoreRect: !0,
  mixins: {
    apis: ["height", "heightCurrent", "scalable"]
  }
}), Yo = (e) => {
  const t = e.map((r) => r.id);
  let n;
  return {
    setIndex: (r) => {
      n = r;
    },
    getIndex: () => n,
    getItemIndex: (r) => t.indexOf(r.id)
  };
}, Zn = {
  type: "spring",
  stiffness: 0.75,
  damping: 0.45,
  mass: 10
}, Kn = "spring", Jn = {
  DID_START_ITEM_LOAD: "busy",
  DID_UPDATE_ITEM_LOAD_PROGRESS: "loading",
  DID_THROW_ITEM_INVALID: "load-invalid",
  DID_THROW_ITEM_LOAD_ERROR: "load-error",
  DID_LOAD_ITEM: "idle",
  DID_THROW_ITEM_REMOVE_ERROR: "remove-error",
  DID_START_ITEM_REMOVE: "busy",
  DID_START_ITEM_PROCESSING: "busy processing",
  DID_REQUEST_ITEM_PROCESSING: "busy processing",
  DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing",
  DID_COMPLETE_ITEM_PROCESSING: "processing-complete",
  DID_THROW_ITEM_PROCESSING_ERROR: "processing-error",
  DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error",
  DID_ABORT_ITEM_PROCESSING: "cancelled",
  DID_REVERT_ITEM_PROCESSING: "idle"
}, zo = ({ root: e, props: t }) => {
  if (e.ref.handleClick = (r) => e.dispatch("DID_ACTIVATE_ITEM", { id: t.id }), e.element.id = `filepond--item-${t.id}`, e.element.addEventListener("click", e.ref.handleClick), e.ref.container = e.appendChildView(e.createChildView(ko, { id: t.id })), e.ref.panel = e.appendChildView(e.createChildView(kr, { name: "item-panel" })), e.ref.panel.height = null, t.markedForRemoval = !1, !e.query("GET_ALLOW_REORDER"))
    return;
  e.element.dataset.dragState = "idle";
  const n = (r) => {
    if (!r.isPrimary)
      return;
    let s = !1;
    const o = {
      x: r.pageX,
      y: r.pageY
    };
    t.dragOrigin = {
      x: e.translateX,
      y: e.translateY
    }, t.dragCenter = {
      x: r.offsetX,
      y: r.offsetY
    };
    const i = Yo(e.query("GET_ACTIVE_ITEMS"));
    e.dispatch("DID_GRAB_ITEM", { id: t.id, dragState: i });
    const l = (f) => {
      if (!f.isPrimary)
        return;
      f.stopPropagation(), f.preventDefault(), t.dragOffset = {
        x: f.pageX - o.x,
        y: f.pageY - o.y
      }, t.dragOffset.x * t.dragOffset.x + t.dragOffset.y * t.dragOffset.y > 16 && !s && (s = !0, e.element.removeEventListener("click", e.ref.handleClick)), e.dispatch("DID_DRAG_ITEM", { id: t.id, dragState: i });
    }, a = (f) => {
      f.isPrimary && (document.removeEventListener("pointermove", l), document.removeEventListener("pointerup", a), t.dragOffset = {
        x: f.pageX - o.x,
        y: f.pageY - o.y
      }, e.dispatch("DID_DROP_ITEM", { id: t.id, dragState: i }), s && setTimeout(() => e.element.addEventListener("click", e.ref.handleClick), 0));
    };
    document.addEventListener("pointermove", l), document.addEventListener("pointerup", a);
  };
  e.element.addEventListener("pointerdown", n);
}, Wo = Ee({
  DID_UPDATE_PANEL_HEIGHT: ({ root: e, action: t }) => {
    e.height = t.height;
  }
}), $o = Ee(
  {
    DID_GRAB_ITEM: ({ root: e, props: t }) => {
      t.dragOrigin = {
        x: e.translateX,
        y: e.translateY
      };
    },
    DID_DRAG_ITEM: ({ root: e }) => {
      e.element.dataset.dragState = "drag";
    },
    DID_DROP_ITEM: ({ root: e, props: t }) => {
      t.dragOffset = null, t.dragOrigin = null, e.element.dataset.dragState = "drop";
    }
  },
  ({ root: e, actions: t, props: n, shouldOptimize: r }) => {
    e.element.dataset.dragState === "drop" && e.scaleX <= 1 && (e.element.dataset.dragState = "idle");
    let s = t.concat().filter((i) => /^DID_/.test(i.type)).reverse().find((i) => Jn[i.type]);
    s && s.type !== n.currentState && (n.currentState = s.type, e.element.dataset.filepondItemState = Jn[n.currentState] || "");
    const o = e.query("GET_ITEM_PANEL_ASPECT_RATIO") || e.query("GET_PANEL_ASPECT_RATIO");
    o ? r || (e.height = e.rect.element.width * o) : (Wo({ root: e, actions: t, props: n }), !e.height && e.ref.container.rect.element.height > 0 && (e.height = e.ref.container.rect.element.height)), r && (e.ref.panel.height = null), e.ref.panel.height = e.height;
  }
), Xo = se({
  create: zo,
  write: $o,
  destroy: ({ root: e, props: t }) => {
    e.element.removeEventListener("click", e.ref.handleClick), e.dispatch("RELEASE_ITEM", { query: t.id });
  },
  tag: "li",
  name: "item",
  mixins: {
    apis: [
      "id",
      "interactionMethod",
      "markedForRemoval",
      "spawnDate",
      "dragCenter",
      "dragOrigin",
      "dragOffset"
    ],
    styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity", "height"],
    animations: {
      scaleX: Kn,
      scaleY: Kn,
      translateX: Zn,
      translateY: Zn,
      opacity: { type: "tween", duration: 150 }
    }
  }
});
var sn = (e, t) => Math.max(1, Math.floor((e + 1) / t));
const on = (e, t, n) => {
  if (!n)
    return;
  const r = e.rect.element.width, s = t.length;
  let o = null;
  if (s === 0 || n.top < t[0].rect.element.top)
    return -1;
  const l = t[0].rect.element, a = l.marginLeft + l.marginRight, f = l.width + a, d = sn(r, f);
  if (d === 1) {
    for (let T = 0; T < s; T++) {
      const p = t[T], I = p.rect.outer.top + p.rect.element.height * 0.5;
      if (n.top < I)
        return T;
    }
    return s;
  }
  const m = l.marginTop + l.marginBottom, h = l.height + m;
  for (let T = 0; T < s; T++) {
    const p = T % d, I = Math.floor(T / d), D = p * f, O = I * h, A = O - l.marginTop, L = D + f, w = O + h + l.marginBottom;
    if (n.top < w && n.top > A) {
      if (n.left < L)
        return T;
      T !== s - 1 ? o = T : o = null;
    }
  }
  return o !== null ? o : s;
}, Tt = {
  height: 0,
  width: 0,
  get getHeight() {
    return this.height;
  },
  set setHeight(e) {
    (this.height === 0 || e === 0) && (this.height = e);
  },
  get getWidth() {
    return this.width;
  },
  set setWidth(e) {
    (this.width === 0 || e === 0) && (this.width = e);
  },
  setDimensions: function(e, t) {
    (this.height === 0 || e === 0) && (this.height = e), (this.width === 0 || t === 0) && (this.width = t);
  }
}, jo = ({ root: e }) => {
  re(e.element, "role", "list"), e.ref.lastItemSpanwDate = Date.now();
}, Qo = ({ root: e, action: t }) => {
  const { id: n, index: r, interactionMethod: s } = t;
  e.ref.addIndex = r;
  const o = Date.now();
  let i = o, l = 1;
  if (s !== ge.NONE) {
    l = 0;
    const a = e.query("GET_ITEM_INSERT_INTERVAL"), f = o - e.ref.lastItemSpanwDate;
    i = f < a ? o + (a - f) : o;
  }
  e.ref.lastItemSpanwDate = i, e.appendChildView(
    e.createChildView(
      // view type
      Xo,
      // props
      {
        spawnDate: i,
        id: n,
        opacity: l,
        interactionMethod: s
      }
    ),
    r
  );
}, er = (e, t, n, r = 0, s = 1) => {
  e.dragOffset ? (e.translateX = null, e.translateY = null, e.translateX = e.dragOrigin.x + e.dragOffset.x, e.translateY = e.dragOrigin.y + e.dragOffset.y, e.scaleX = 1.025, e.scaleY = 1.025) : (e.translateX = t, e.translateY = n, Date.now() > e.spawnDate && (e.opacity === 0 && Zo(e, t, n, r, s), e.scaleX = 1, e.scaleY = 1, e.opacity = 1));
}, Zo = (e, t, n, r, s) => {
  e.interactionMethod === ge.NONE ? (e.translateX = null, e.translateX = t, e.translateY = null, e.translateY = n) : e.interactionMethod === ge.DROP ? (e.translateX = null, e.translateX = t - r * 20, e.translateY = null, e.translateY = n - s * 10, e.scaleX = 0.8, e.scaleY = 0.8) : e.interactionMethod === ge.BROWSE ? (e.translateY = null, e.translateY = n - 30) : e.interactionMethod === ge.API && (e.translateX = null, e.translateX = t - 30, e.translateY = null);
}, Ko = ({ root: e, action: t }) => {
  const { id: n } = t, r = e.childViews.find((s) => s.id === n);
  r && (r.scaleX = 0.9, r.scaleY = 0.9, r.opacity = 0, r.markedForRemoval = !0);
}, kt = (e) => e.rect.element.height + e.rect.element.marginBottom * 0.5 + e.rect.element.marginTop * 0.5, Jo = (e) => e.rect.element.width + e.rect.element.marginLeft * 0.5 + e.rect.element.marginRight * 0.5, ea = ({ root: e, action: t }) => {
  const { id: n, dragState: r } = t, s = e.query("GET_ITEM", { id: n }), o = e.childViews.find((D) => D.id === n), i = e.childViews.length, l = r.getItemIndex(s);
  if (!o)
    return;
  const a = {
    x: o.dragOrigin.x + o.dragOffset.x + o.dragCenter.x,
    y: o.dragOrigin.y + o.dragOffset.y + o.dragCenter.y
  }, f = kt(o), d = Jo(o);
  let m = Math.floor(e.rect.outer.width / d);
  m > i && (m = i);
  const h = Math.floor(i / m + 1);
  Tt.setHeight = f * h, Tt.setWidth = d * m;
  var T = {
    y: Math.floor(a.y / f),
    x: Math.floor(a.x / d),
    getGridIndex: function() {
      return a.y > Tt.getHeight || a.y < 0 || a.x > Tt.getWidth || a.x < 0 ? l : this.y * m + this.x;
    },
    getColIndex: function() {
      const O = e.query("GET_ACTIVE_ITEMS"), A = e.childViews.filter((N) => N.rect.element.height), L = O.map(
        (N) => A.find((U) => U.id === N.id)
      ), w = L.findIndex((N) => N === o), P = kt(o), F = L.length;
      let W = F, v = 0, B = 0, q = 0;
      for (let N = 0; N < F; N++)
        if (v = kt(L[N]), q = B, B = q + v, a.y < B) {
          if (w > N) {
            if (a.y < q + P) {
              W = N;
              break;
            }
            continue;
          }
          W = N;
          break;
        }
      return W;
    }
  };
  const p = m > 1 ? T.getGridIndex() : T.getColIndex();
  e.dispatch("MOVE_ITEM", { query: o, index: p });
  const I = r.getIndex();
  if (I === void 0 || I !== p) {
    if (r.setIndex(p), I === void 0)
      return;
    e.dispatch("DID_REORDER_ITEMS", {
      items: e.query("GET_ACTIVE_ITEMS"),
      origin: l,
      target: p
    });
  }
}, ta = Ee({
  DID_ADD_ITEM: Qo,
  DID_REMOVE_ITEM: Ko,
  DID_DRAG_ITEM: ea
}), na = ({ root: e, props: t, actions: n, shouldOptimize: r }) => {
  ta({ root: e, props: t, actions: n });
  const { dragCoordinates: s } = t, o = e.rect.element.width, i = e.childViews.filter((L) => L.rect.element.height), l = e.query("GET_ACTIVE_ITEMS").map((L) => i.find((w) => w.id === L.id)).filter((L) => L), a = s ? on(e, l, s) : null, f = e.ref.addIndex || null;
  e.ref.addIndex = null;
  let d = 0, m = 0, h = 0;
  if (l.length === 0)
    return;
  const T = l[0].rect.element, p = T.marginTop + T.marginBottom, I = T.marginLeft + T.marginRight, D = T.width + I, O = T.height + p, A = sn(o, D);
  if (A === 1) {
    let L = 0, w = 0;
    l.forEach((P, F) => {
      if (a) {
        let B = F - a;
        B === -2 ? w = -p * 0.25 : B === -1 ? w = -p * 0.75 : B === 0 ? w = p * 0.75 : B === 1 ? w = p * 0.25 : w = 0;
      }
      r && (P.translateX = null, P.translateY = null), P.markedForRemoval || er(P, 0, L + w);
      let v = (P.rect.element.height + p) * (P.markedForRemoval ? P.opacity : 1);
      L += v;
    });
  } else {
    let L = 0, w = 0;
    l.forEach((P, F) => {
      F === a && (d = 1), F === f && (h += 1), P.markedForRemoval && P.opacity < 0.5 && (m -= 1);
      const W = F + h + d + m, v = W % A, B = Math.floor(W / A), q = v * D, N = B * O, U = Math.sign(q - L), ie = Math.sign(N - w);
      L = q, w = N, !P.markedForRemoval && (r && (P.translateX = null, P.translateY = null), er(P, q, N, U, ie));
    });
  }
}, ra = (e, t) => t.filter((n) => n.data && n.data.id ? e.id === n.data.id : !0), sa = se({
  create: jo,
  write: na,
  tag: "ul",
  name: "list",
  didWriteView: ({ root: e }) => {
    e.childViews.filter((t) => t.markedForRemoval && t.opacity === 0 && t.resting).forEach((t) => {
      t._destroy(), e.removeChildView(t);
    });
  },
  filterFrameActionsForChild: ra,
  mixins: {
    apis: ["dragCoordinates"]
  }
}), ia = ({ root: e, props: t }) => {
  e.ref.list = e.appendChildView(e.createChildView(sa)), t.dragCoordinates = null, t.overflowing = !1;
}, oa = ({ root: e, props: t, action: n }) => {
  e.query("GET_ITEM_INSERT_LOCATION_FREEDOM") && (t.dragCoordinates = {
    left: n.position.scopeLeft - e.ref.list.rect.element.left,
    top: n.position.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop)
  });
}, aa = ({ props: e }) => {
  e.dragCoordinates = null;
}, la = Ee({
  DID_DRAG: oa,
  DID_END_DRAG: aa
}), ca = ({ root: e, props: t, actions: n }) => {
  if (la({ root: e, props: t, actions: n }), e.ref.list.dragCoordinates = t.dragCoordinates, t.overflowing && !t.overflow && (t.overflowing = !1, e.element.dataset.state = "", e.height = null), t.overflow) {
    const r = Math.round(t.overflow);
    r !== e.height && (t.overflowing = !0, e.element.dataset.state = "overflow", e.height = r);
  }
}, ua = se({
  create: ia,
  write: ca,
  name: "list-scroller",
  mixins: {
    apis: ["overflow", "dragCoordinates"],
    styles: ["height", "translateY"],
    animations: {
      translateY: "spring"
    }
  }
}), be = (e, t, n, r = "") => {
  n ? re(e, t, r) : e.removeAttribute(t);
}, da = (e) => {
  if (!(!e || e.value === "")) {
    try {
      e.value = "";
    } catch {
    }
    if (e.value) {
      const t = Me("form"), n = e.parentNode, r = e.nextSibling;
      t.appendChild(e), t.reset(), r ? n.insertBefore(e, r) : n.appendChild(e);
    }
  }
}, fa = ({ root: e, props: t }) => {
  e.element.id = `filepond--browser-${t.id}`, re(e.element, "name", e.query("GET_NAME")), re(e.element, "aria-controls", `filepond--assistant-${t.id}`), re(e.element, "aria-labelledby", `filepond--drop-label-${t.id}`), Vr({ root: e, action: { value: e.query("GET_ACCEPTED_FILE_TYPES") } }), qr({ root: e, action: { value: e.query("GET_ALLOW_MULTIPLE") } }), Hr({ root: e, action: { value: e.query("GET_ALLOW_DIRECTORIES_ONLY") } }), jt({ root: e }), Yr({ root: e, action: { value: e.query("GET_REQUIRED") } }), zr({ root: e, action: { value: e.query("GET_CAPTURE_METHOD") } }), e.ref.handleChange = (n) => {
    if (!e.element.value)
      return;
    const r = Array.from(e.element.files).map((s) => (s._relativePath = s.webkitRelativePath, s));
    setTimeout(() => {
      t.onload(r), da(e.element);
    }, 250);
  }, e.element.addEventListener("change", e.ref.handleChange);
}, Vr = ({ root: e, action: t }) => {
  e.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") && be(e.element, "accept", !!t.value, t.value ? t.value.join(",") : "");
}, qr = ({ root: e, action: t }) => {
  be(e.element, "multiple", t.value);
}, Hr = ({ root: e, action: t }) => {
  be(e.element, "webkitdirectory", t.value);
}, jt = ({ root: e }) => {
  const t = e.query("GET_DISABLED"), n = e.query("GET_ALLOW_BROWSE"), r = t || !n;
  be(e.element, "disabled", r);
}, Yr = ({ root: e, action: t }) => {
  t.value ? e.query("GET_TOTAL_ITEMS") === 0 && be(e.element, "required", !0) : be(e.element, "required", !1);
}, zr = ({ root: e, action: t }) => {
  be(e.element, "capture", !!t.value, t.value === !0 ? "" : t.value);
}, tr = ({ root: e }) => {
  const { element: t } = e;
  e.query("GET_TOTAL_ITEMS") > 0 ? (be(t, "required", !1), be(t, "name", !1)) : (be(t, "name", !0, e.query("GET_NAME")), e.query("GET_CHECK_VALIDITY") && t.setCustomValidity(""), e.query("GET_REQUIRED") && be(t, "required", !0));
}, Ea = ({ root: e }) => {
  e.query("GET_CHECK_VALIDITY") && e.element.setCustomValidity(e.query("GET_LABEL_INVALID_FIELD"));
}, pa = se({
  tag: "input",
  name: "browser",
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  attributes: {
    type: "file"
  },
  create: fa,
  destroy: ({ root: e }) => {
    e.element.removeEventListener("change", e.ref.handleChange);
  },
  write: Ee({
    DID_LOAD_ITEM: tr,
    DID_REMOVE_ITEM: tr,
    DID_THROW_ITEM_INVALID: Ea,
    DID_SET_DISABLED: jt,
    DID_SET_ALLOW_BROWSE: jt,
    DID_SET_ALLOW_DIRECTORIES_ONLY: Hr,
    DID_SET_ALLOW_MULTIPLE: qr,
    DID_SET_ACCEPTED_FILE_TYPES: Vr,
    DID_SET_CAPTURE_METHOD: zr,
    DID_SET_REQUIRED: Yr
  })
}), nr = {
  ENTER: 13,
  SPACE: 32
}, ma = ({ root: e, props: t }) => {
  const n = Me("label");
  re(n, "for", `filepond--browser-${t.id}`), re(n, "id", `filepond--drop-label-${t.id}`), re(n, "aria-hidden", "true"), e.ref.handleKeyDown = (r) => {
    (r.keyCode === nr.ENTER || r.keyCode === nr.SPACE) && (r.preventDefault(), e.ref.label.click());
  }, e.ref.handleClick = (r) => {
    r.target === n || n.contains(r.target) || e.ref.label.click();
  }, n.addEventListener("keydown", e.ref.handleKeyDown), e.element.addEventListener("click", e.ref.handleClick), Wr(n, t.caption), e.appendChild(n), e.ref.label = n;
}, Wr = (e, t) => {
  e.innerHTML = t;
  const n = e.querySelector(".filepond--label-action");
  return n && re(n, "tabindex", "0"), t;
}, ha = se({
  name: "drop-label",
  ignoreRect: !0,
  create: ma,
  destroy: ({ root: e }) => {
    e.ref.label.addEventListener("keydown", e.ref.handleKeyDown), e.element.removeEventListener("click", e.ref.handleClick);
  },
  write: Ee({
    DID_SET_LABEL_IDLE: ({ root: e, action: t }) => {
      Wr(e.ref.label, t.value);
    }
  }),
  mixins: {
    styles: ["opacity", "translateX", "translateY"],
    animations: {
      opacity: { type: "tween", duration: 150 },
      translateX: "spring",
      translateY: "spring"
    }
  }
}), Ta = se({
  name: "drip-blob",
  ignoreRect: !0,
  mixins: {
    styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"],
    animations: {
      scaleX: "spring",
      scaleY: "spring",
      translateX: "spring",
      translateY: "spring",
      opacity: { type: "tween", duration: 250 }
    }
  }
}), Ia = ({ root: e }) => {
  const t = e.rect.element.width * 0.5, n = e.rect.element.height * 0.5;
  e.ref.blob = e.appendChildView(
    e.createChildView(Ta, {
      opacity: 0,
      scaleX: 2.5,
      scaleY: 2.5,
      translateX: t,
      translateY: n
    })
  );
}, _a = ({ root: e, action: t }) => {
  if (!e.ref.blob) {
    Ia({ root: e });
    return;
  }
  e.ref.blob.translateX = t.position.scopeLeft, e.ref.blob.translateY = t.position.scopeTop, e.ref.blob.scaleX = 1, e.ref.blob.scaleY = 1, e.ref.blob.opacity = 1;
}, ga = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.opacity = 0);
}, Sa = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.scaleX = 2.5, e.ref.blob.scaleY = 2.5, e.ref.blob.opacity = 0);
}, Ra = ({ root: e, props: t, actions: n }) => {
  ya({ root: e, props: t, actions: n });
  const { blob: r } = e.ref;
  n.length === 0 && r && r.opacity === 0 && (e.removeChildView(r), e.ref.blob = null);
}, ya = Ee({
  DID_DRAG: _a,
  DID_DROP: Sa,
  DID_END_DRAG: ga
}), ba = se({
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  name: "drip",
  write: Ra
}), $r = (e, t) => {
  try {
    const n = new DataTransfer();
    t.forEach((r) => {
      r instanceof File ? n.items.add(r) : n.items.add(
        new File([r], r.name, {
          type: r.type
        })
      );
    }), e.files = n.files;
  } catch {
    return !1;
  }
  return !0;
}, Oa = ({ root: e }) => e.ref.fields = {}, Mt = (e, t) => e.ref.fields[t], an = (e) => {
  e.query("GET_ACTIVE_ITEMS").forEach((t) => {
    e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id]);
  });
}, rr = ({ root: e }) => an(e), Da = ({ root: e, action: t }) => {
  const s = !(e.query("GET_ITEM", t.id).origin === oe.LOCAL) && e.query("SHOULD_UPDATE_FILE_INPUT"), o = Me("input");
  o.type = s ? "file" : "hidden", o.name = e.query("GET_NAME"), o.disabled = e.query("GET_DISABLED"), e.ref.fields[t.id] = o, an(e);
}, va = ({ root: e, action: t }) => {
  const n = Mt(e, t.id);
  if (!n || (t.serverFileReference !== null && (n.value = t.serverFileReference), !e.query("SHOULD_UPDATE_FILE_INPUT")))
    return;
  const r = e.query("GET_ITEM", t.id);
  $r(n, [r.file]);
}, Aa = ({ root: e, action: t }) => {
  e.query("SHOULD_UPDATE_FILE_INPUT") && setTimeout(() => {
    const n = Mt(e, t.id);
    n && $r(n, [t.file]);
  }, 0);
}, La = ({ root: e }) => {
  e.element.disabled = e.query("GET_DISABLED");
}, wa = ({ root: e, action: t }) => {
  const n = Mt(e, t.id);
  n && (n.parentNode && n.parentNode.removeChild(n), delete e.ref.fields[t.id]);
}, Pa = ({ root: e, action: t }) => {
  const n = Mt(e, t.id);
  n && (t.value === null ? n.removeAttribute("value") : n.type != "file" && (n.value = t.value), an(e));
}, Ma = Ee({
  DID_SET_DISABLED: La,
  DID_ADD_ITEM: Da,
  DID_LOAD_ITEM: va,
  DID_REMOVE_ITEM: wa,
  DID_DEFINE_VALUE: Pa,
  DID_PREPARE_OUTPUT: Aa,
  DID_REORDER_ITEMS: rr,
  DID_SORT_ITEMS: rr
}), Ca = se({
  tag: "fieldset",
  name: "data",
  create: Oa,
  write: Ma,
  ignoreRect: !0
}), Na = (e) => "getRootNode" in e ? e.getRootNode() : document, Ga = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"], Fa = ["css", "csv", "html", "txt"], Ba = {
  zip: "zip|compressed",
  epub: "application/epub+zip"
}, Xr = (e = "") => (e = e.toLowerCase(), Ga.includes(e) ? "image/" + (e === "jpg" ? "jpeg" : e === "svg" ? "svg+xml" : e) : Fa.includes(e) ? "text/" + e : Ba[e] || ""), ln = (e) => new Promise((t, n) => {
  const r = za(e);
  if (r.length && !xa(e))
    return t(r);
  Ua(e).then(t);
}), xa = (e) => e.files ? e.files.length > 0 : !1, Ua = (e) => new Promise((t, n) => {
  const r = (e.items ? Array.from(e.items) : []).filter((s) => ka(s)).map((s) => Va(s));
  if (!r.length) {
    t(e.files ? Array.from(e.files) : []);
    return;
  }
  Promise.all(r).then((s) => {
    const o = [];
    s.forEach((i) => {
      o.push.apply(o, i);
    }), t(
      o.filter((i) => i).map((i) => (i._relativePath || (i._relativePath = i.webkitRelativePath), i))
    );
  }).catch(console.error);
}), ka = (e) => {
  if (jr(e)) {
    const t = cn(e);
    if (t)
      return t.isFile || t.isDirectory;
  }
  return e.kind === "file";
}, Va = (e) => new Promise((t, n) => {
  if (Ya(e)) {
    qa(cn(e)).then(t).catch(n);
    return;
  }
  t([e.getAsFile()]);
}), qa = (e) => new Promise((t, n) => {
  const r = [];
  let s = 0, o = 0;
  const i = () => {
    o === 0 && s === 0 && t(r);
  }, l = (a) => {
    s++;
    const f = a.createReader(), d = () => {
      f.readEntries((m) => {
        if (m.length === 0) {
          s--, i();
          return;
        }
        m.forEach((h) => {
          h.isDirectory ? l(h) : (o++, h.file((T) => {
            const p = Ha(T);
            h.fullPath && (p._relativePath = h.fullPath), r.push(p), o--, i();
          }));
        }), d();
      }, n);
    };
    d();
  };
  l(e);
}), Ha = (e) => {
  if (e.type.length)
    return e;
  const t = e.lastModifiedDate, n = e.name, r = Xr(Pt(e.name));
  return r.length && (e = e.slice(0, e.size, r), e.name = n, e.lastModifiedDate = t), e;
}, Ya = (e) => jr(e) && (cn(e) || {}).isDirectory, jr = (e) => "webkitGetAsEntry" in e, cn = (e) => e.webkitGetAsEntry(), za = (e) => {
  let t = [];
  try {
    if (t = $a(e), t.length)
      return t;
    t = Wa(e);
  } catch {
  }
  return t;
}, Wa = (e) => {
  let t = e.getData("url");
  return typeof t == "string" && t.length ? [t] : [];
}, $a = (e) => {
  let t = e.getData("text/html");
  if (typeof t == "string" && t.length) {
    const n = t.match(/src\s*=\s*"(.+?)"/);
    if (n)
      return [n[1]];
  }
  return [];
}, bt = [], Ye = (e) => ({
  pageLeft: e.pageX,
  pageTop: e.pageY,
  scopeLeft: e.offsetX || e.layerX,
  scopeTop: e.offsetY || e.layerY
}), Xa = (e, t, n) => {
  const r = ja(t), s = {
    element: e,
    filterElement: n,
    state: null,
    ondrop: () => {
    },
    onenter: () => {
    },
    ondrag: () => {
    },
    onexit: () => {
    },
    onload: () => {
    },
    allowdrop: () => {
    }
  };
  return s.destroy = r.addListener(s), s;
}, ja = (e) => {
  const t = bt.find((r) => r.element === e);
  if (t)
    return t;
  const n = Qa(e);
  return bt.push(n), n;
}, Qa = (e) => {
  const t = [], n = {
    dragenter: Ka,
    dragover: Ja,
    dragleave: tl,
    drop: el
  }, r = {};
  Z(n, (o, i) => {
    r[o] = i(e, t), e.addEventListener(o, r[o], !1);
  });
  const s = {
    element: e,
    addListener: (o) => (t.push(o), () => {
      t.splice(t.indexOf(o), 1), t.length === 0 && (bt.splice(bt.indexOf(s), 1), Z(n, (i) => {
        e.removeEventListener(i, r[i], !1);
      }));
    })
  };
  return s;
}, Za = (e, t) => ("elementFromPoint" in e || (e = document), e.elementFromPoint(t.x, t.y)), un = (e, t) => {
  const n = Na(t), r = Za(n, {
    x: e.pageX - window.pageXOffset,
    y: e.pageY - window.pageYOffset
  });
  return r === t || t.contains(r);
};
let Qr = null;
const It = (e, t) => {
  try {
    e.dropEffect = t;
  } catch {
  }
}, Ka = (e, t) => (n) => {
  n.preventDefault(), Qr = n.target, t.forEach((r) => {
    const { element: s, onenter: o } = r;
    un(n, s) && (r.state = "enter", o(Ye(n)));
  });
}, Ja = (e, t) => (n) => {
  n.preventDefault();
  const r = n.dataTransfer;
  ln(r).then((s) => {
    let o = !1;
    t.some((i) => {
      const { filterElement: l, element: a, onenter: f, onexit: d, ondrag: m, allowdrop: h } = i;
      It(r, "copy");
      const T = h(s);
      if (!T) {
        It(r, "none");
        return;
      }
      if (un(n, a)) {
        if (o = !0, i.state === null) {
          i.state = "enter", f(Ye(n));
          return;
        }
        if (i.state = "over", l && !T) {
          It(r, "none");
          return;
        }
        m(Ye(n));
      } else
        l && !o && It(r, "none"), i.state && (i.state = null, d(Ye(n)));
    });
  });
}, el = (e, t) => (n) => {
  n.preventDefault();
  const r = n.dataTransfer;
  ln(r).then((s) => {
    t.forEach((o) => {
      const { filterElement: i, element: l, ondrop: a, onexit: f, allowdrop: d } = o;
      if (o.state = null, !(i && !un(n, l))) {
        if (!d(s))
          return f(Ye(n));
        a(Ye(n), s);
      }
    });
  });
}, tl = (e, t) => (n) => {
  Qr === n.target && t.forEach((r) => {
    const { onexit: s } = r;
    r.state = null, s(Ye(n));
  });
}, nl = (e, t, n) => {
  e.classList.add("filepond--hopper");
  const { catchesDropsOnPage: r, requiresDropOnElement: s, filterItems: o = (d) => d } = n, i = Xa(
    e,
    r ? document.documentElement : e,
    s
  );
  let l = "", a = "";
  i.allowdrop = (d) => t(o(d)), i.ondrop = (d, m) => {
    const h = o(m);
    if (!t(h)) {
      f.ondragend(d);
      return;
    }
    a = "drag-drop", f.onload(h, d);
  }, i.ondrag = (d) => {
    f.ondrag(d);
  }, i.onenter = (d) => {
    a = "drag-over", f.ondragstart(d);
  }, i.onexit = (d) => {
    a = "drag-exit", f.ondragend(d);
  };
  const f = {
    updateHopperState: () => {
      l !== a && (e.dataset.hopperState = a, l = a);
    },
    onload: () => {
    },
    ondragstart: () => {
    },
    ondrag: () => {
    },
    ondragend: () => {
    },
    destroy: () => {
      i.destroy();
    }
  };
  return f;
};
let Qt = !1;
const Ze = [], Zr = (e) => {
  const t = document.activeElement;
  if (t && /textarea|input/i.test(t.nodeName)) {
    let n = !1, r = t;
    for (; r !== document.body; ) {
      if (r.classList.contains("filepond--root")) {
        n = !0;
        break;
      }
      r = r.parentNode;
    }
    if (!n)
      return;
  }
  ln(e.clipboardData).then((n) => {
    n.length && Ze.forEach((r) => r(n));
  });
}, rl = (e) => {
  Ze.includes(e) || (Ze.push(e), !Qt && (Qt = !0, document.addEventListener("paste", Zr)));
}, sl = (e) => {
  en(Ze, Ze.indexOf(e)), Ze.length === 0 && (document.removeEventListener("paste", Zr), Qt = !1);
}, il = () => {
  const e = (n) => {
    t.onload(n);
  }, t = {
    destroy: () => {
      sl(e);
    },
    onload: () => {
    }
  };
  return rl(e), t;
}, ol = ({ root: e, props: t }) => {
  e.element.id = `filepond--assistant-${t.id}`, re(e.element, "role", "status"), re(e.element, "aria-live", "polite"), re(e.element, "aria-relevant", "additions");
};
let sr = null, ir = null;
const Vt = [], Ct = (e, t) => {
  e.element.textContent = t;
}, al = (e) => {
  e.element.textContent = "";
}, Kr = (e, t, n) => {
  const r = e.query("GET_TOTAL_ITEMS");
  Ct(
    e,
    `${n} ${t}, ${r} ${r === 1 ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL")}`
  ), clearTimeout(ir), ir = setTimeout(() => {
    al(e);
  }, 1500);
}, Jr = (e) => e.element.parentNode.contains(document.activeElement), ll = ({ root: e, action: t }) => {
  if (!Jr(e))
    return;
  e.element.textContent = "";
  const n = e.query("GET_ITEM", t.id);
  Vt.push(n.filename), clearTimeout(sr), sr = setTimeout(() => {
    Kr(e, Vt.join(", "), e.query("GET_LABEL_FILE_ADDED")), Vt.length = 0;
  }, 750);
}, cl = ({ root: e, action: t }) => {
  if (!Jr(e))
    return;
  const n = t.item;
  Kr(e, n.filename, e.query("GET_LABEL_FILE_REMOVED"));
}, ul = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, s = e.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
  Ct(e, `${r} ${s}`);
}, or = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, s = e.query("GET_LABEL_FILE_PROCESSING_ABORTED");
  Ct(e, `${r} ${s}`);
}, _t = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename;
  Ct(e, `${t.status.main} ${r} ${t.status.sub}`);
}, dl = se({
  create: ol,
  ignoreRect: !0,
  ignoreRectUpdate: !0,
  write: Ee({
    DID_LOAD_ITEM: ll,
    DID_REMOVE_ITEM: cl,
    DID_COMPLETE_ITEM_PROCESSING: ul,
    DID_ABORT_ITEM_PROCESSING: or,
    DID_REVERT_ITEM_PROCESSING: or,
    DID_THROW_ITEM_REMOVE_ERROR: _t,
    DID_THROW_ITEM_LOAD_ERROR: _t,
    DID_THROW_ITEM_INVALID: _t,
    DID_THROW_ITEM_PROCESSING_ERROR: _t
  }),
  tag: "span",
  name: "assistant"
}), es = (e, t = "-") => e.replace(new RegExp(`${t}.`, "g"), (n) => n.charAt(1).toUpperCase()), ts = (e, t = 16, n = !0) => {
  let r = Date.now(), s = null;
  return (...o) => {
    clearTimeout(s);
    const i = Date.now() - r, l = () => {
      r = Date.now(), e(...o);
    };
    i < t ? n || (s = setTimeout(l, t - i)) : l();
  };
}, fl = 1e6, Ot = (e) => e.preventDefault(), El = ({ root: e, props: t }) => {
  const n = e.query("GET_ID");
  n && (e.element.id = n);
  const r = e.query("GET_CLASS_NAME");
  r && r.split(" ").filter((a) => a.length).forEach((a) => {
    e.element.classList.add(a);
  }), e.ref.label = e.appendChildView(
    e.createChildView(ha, {
      ...t,
      translateY: null,
      caption: e.query("GET_LABEL_IDLE")
    })
  ), e.ref.list = e.appendChildView(e.createChildView(ua, { translateY: null })), e.ref.panel = e.appendChildView(e.createChildView(kr, { name: "panel-root" })), e.ref.assistant = e.appendChildView(e.createChildView(dl, { ...t })), e.ref.data = e.appendChildView(e.createChildView(Ca, { ...t })), e.ref.measure = Me("div"), e.ref.measure.style.height = "100%", e.element.appendChild(e.ref.measure), e.ref.bounds = null, e.query("GET_STYLES").filter((a) => !Pe(a.value)).map(({ name: a, value: f }) => {
    e.element.dataset[a] = f;
  }), e.ref.widthPrevious = null, e.ref.widthUpdated = ts(() => {
    e.ref.updateHistory = [], e.dispatch("DID_RESIZE_ROOT");
  }, 250), e.ref.previousAspectRatio = null, e.ref.updateHistory = [];
  const s = window.matchMedia("(pointer: fine) and (hover: hover)").matches, o = "PointerEvent" in window;
  e.query("GET_ALLOW_REORDER") && o && !s && (e.element.addEventListener("touchmove", Ot, { passive: !1 }), e.element.addEventListener("gesturestart", Ot));
  const i = e.query("GET_CREDITS");
  if (i.length === 2) {
    const a = document.createElement("a");
    a.className = "filepond--credits", a.setAttribute("aria-hidden", "true"), a.href = i[0], a.tabindex = -1, a.target = "_blank", a.rel = "noopener noreferrer", a.textContent = i[1], e.element.appendChild(a), e.ref.credits = a;
  }
}, pl = ({ root: e, props: t, actions: n }) => {
  if (_l({ root: e, props: t, actions: n }), n.filter((F) => /^DID_SET_STYLE_/.test(F.type)).filter((F) => !Pe(F.data.value)).map(({ type: F, data: W }) => {
    const v = es(F.substring(8).toLowerCase(), "_");
    e.element.dataset[v] = W.value, e.invalidateLayout();
  }), e.rect.element.hidden)
    return;
  e.rect.element.width !== e.ref.widthPrevious && (e.ref.widthPrevious = e.rect.element.width, e.ref.widthUpdated());
  let r = e.ref.bounds;
  r || (r = e.ref.bounds = Tl(e), e.element.removeChild(e.ref.measure), e.ref.measure = null);
  const { hopper: s, label: o, list: i, panel: l } = e.ref;
  s && s.updateHopperState();
  const a = e.query("GET_PANEL_ASPECT_RATIO"), f = e.query("GET_ALLOW_MULTIPLE"), d = e.query("GET_TOTAL_ITEMS"), m = f ? e.query("GET_MAX_FILES") || fl : 1, h = d === m, T = n.find((F) => F.type === "DID_ADD_ITEM");
  if (h && T) {
    const F = T.data.interactionMethod;
    o.opacity = 0, f ? o.translateY = -40 : F === ge.API ? o.translateX = 40 : F === ge.BROWSE ? o.translateY = 40 : o.translateY = 30;
  } else
    h || (o.opacity = 1, o.translateX = 0, o.translateY = 0);
  const p = ml(e), I = hl(e), D = o.rect.element.height, O = !f || h ? 0 : D, A = h ? i.rect.element.marginTop : 0, L = d === 0 ? 0 : i.rect.element.marginBottom, w = O + A + I.visual + L, P = O + A + I.bounds + L;
  if (i.translateY = Math.max(0, O - i.rect.element.marginTop) - p.top, a) {
    const F = e.rect.element.width, W = F * a;
    a !== e.ref.previousAspectRatio && (e.ref.previousAspectRatio = a, e.ref.updateHistory = []);
    const v = e.ref.updateHistory;
    v.push(F);
    const B = 2;
    if (v.length > B * 2) {
      const N = v.length, U = N - 10;
      let ie = 0;
      for (let b = N; b >= U; b--)
        if (v[b] === v[b - 2] && ie++, ie >= B)
          return;
    }
    l.scalable = !1, l.height = W;
    const q = (
      // the height of the panel minus the label height
      W - O - // the room we leave open between the end of the list and the panel bottom
      (L - p.bottom) - // if we're full we need to leave some room between the top of the panel and the list
      (h ? A : 0)
    );
    I.visual > q ? i.overflow = q : i.overflow = null, e.height = W;
  } else if (r.fixedHeight) {
    l.scalable = !1;
    const F = (
      // the height of the panel minus the label height
      r.fixedHeight - O - // the room we leave open between the end of the list and the panel bottom
      (L - p.bottom) - // if we're full we need to leave some room between the top of the panel and the list
      (h ? A : 0)
    );
    I.visual > F ? i.overflow = F : i.overflow = null;
  } else if (r.cappedHeight) {
    const F = w >= r.cappedHeight, W = Math.min(r.cappedHeight, w);
    l.scalable = !0, l.height = F ? W : W - p.top - p.bottom;
    const v = (
      // the height of the panel minus the label height
      W - O - // the room we leave open between the end of the list and the panel bottom
      (L - p.bottom) - // if we're full we need to leave some room between the top of the panel and the list
      (h ? A : 0)
    );
    w > r.cappedHeight && I.visual > v ? i.overflow = v : i.overflow = null, e.height = Math.min(
      r.cappedHeight,
      P - p.top - p.bottom
    );
  } else {
    const F = d > 0 ? p.top + p.bottom : 0;
    l.scalable = !0, l.height = Math.max(D, w - F), e.height = Math.max(D, P - F);
  }
  e.ref.credits && l.heightCurrent && (e.ref.credits.style.transform = `translateY(${l.heightCurrent}px)`);
}, ml = (e) => {
  const t = e.ref.list.childViews[0].childViews[0];
  return t ? {
    top: t.rect.element.marginTop,
    bottom: t.rect.element.marginBottom
  } : {
    top: 0,
    bottom: 0
  };
}, hl = (e) => {
  let t = 0, n = 0;
  const r = e.ref.list, s = r.childViews[0], o = s.childViews.filter((A) => A.rect.element.height), i = e.query("GET_ACTIVE_ITEMS").map((A) => o.find((L) => L.id === A.id)).filter((A) => A);
  if (i.length === 0)
    return { visual: t, bounds: n };
  const l = s.rect.element.width, a = on(s, i, r.dragCoordinates), f = i[0].rect.element, d = f.marginTop + f.marginBottom, m = f.marginLeft + f.marginRight, h = f.width + m, T = f.height + d, p = typeof a < "u" && a >= 0 ? 1 : 0, I = i.find((A) => A.markedForRemoval && A.opacity < 0.45) ? -1 : 0, D = i.length + p + I, O = sn(l, h);
  return O === 1 ? i.forEach((A) => {
    const L = A.rect.element.height + d;
    n += L, t += L * A.opacity;
  }) : (n = Math.ceil(D / O) * T, t = n), { visual: t, bounds: n };
}, Tl = (e) => {
  const t = e.ref.measureHeight || null;
  return {
    cappedHeight: parseInt(e.style.maxHeight, 10) || null,
    fixedHeight: t === 0 ? null : t
  };
}, dn = (e, t) => {
  const n = e.query("GET_ALLOW_REPLACE"), r = e.query("GET_ALLOW_MULTIPLE"), s = e.query("GET_TOTAL_ITEMS");
  let o = e.query("GET_MAX_FILES");
  const i = t.length;
  return !r && i > 1 ? (e.dispatch("DID_THROW_MAX_FILES", {
    source: t,
    error: J("warning", 0, "Max files")
  }), !0) : (o = r ? o : 1, !r && n ? !1 : tt(o) && s + i > o ? (e.dispatch("DID_THROW_MAX_FILES", {
    source: t,
    error: J("warning", 0, "Max files")
  }), !0) : !1);
}, Il = (e, t, n) => {
  const r = e.childViews[0];
  return on(r, t, {
    left: n.scopeLeft - r.rect.element.left,
    top: n.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop)
  });
}, ar = (e) => {
  const t = e.query("GET_ALLOW_DROP"), n = e.query("GET_DISABLED"), r = t && !n;
  if (r && !e.ref.hopper) {
    const s = nl(
      e.element,
      (o) => {
        const i = e.query("GET_BEFORE_DROP_FILE") || (() => !0);
        return e.query("GET_DROP_VALIDATION") ? o.every(
          (a) => We("ALLOW_HOPPER_ITEM", a, {
            query: e.query
          }).every((f) => f === !0) && i(a)
        ) : !0;
      },
      {
        filterItems: (o) => {
          const i = e.query("GET_IGNORED_FILES");
          return o.filter((l) => Je(l) ? !i.includes(l.name.toLowerCase()) : !0);
        },
        catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"),
        requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT")
      }
    );
    s.onload = (o, i) => {
      const a = e.ref.list.childViews[0].childViews.filter((d) => d.rect.element.height), f = e.query("GET_ACTIVE_ITEMS").map((d) => a.find((m) => m.id === d.id)).filter((d) => d);
      Re("ADD_ITEMS", o, { dispatch: e.dispatch }).then((d) => {
        if (dn(e, d))
          return !1;
        e.dispatch("ADD_ITEMS", {
          items: d,
          index: Il(e.ref.list, f, i),
          interactionMethod: ge.DROP
        });
      }), e.dispatch("DID_DROP", { position: i }), e.dispatch("DID_END_DRAG", { position: i });
    }, s.ondragstart = (o) => {
      e.dispatch("DID_START_DRAG", { position: o });
    }, s.ondrag = ts((o) => {
      e.dispatch("DID_DRAG", { position: o });
    }), s.ondragend = (o) => {
      e.dispatch("DID_END_DRAG", { position: o });
    }, e.ref.hopper = s, e.ref.drip = e.appendChildView(e.createChildView(ba));
  } else
    !r && e.ref.hopper && (e.ref.hopper.destroy(), e.ref.hopper = null, e.removeChildView(e.ref.drip));
}, lr = (e, t) => {
  const n = e.query("GET_ALLOW_BROWSE"), r = e.query("GET_DISABLED"), s = n && !r;
  s && !e.ref.browser ? e.ref.browser = e.appendChildView(
    e.createChildView(pa, {
      ...t,
      onload: (o) => {
        Re("ADD_ITEMS", o, {
          dispatch: e.dispatch
        }).then((i) => {
          if (dn(e, i))
            return !1;
          e.dispatch("ADD_ITEMS", {
            items: i,
            index: -1,
            interactionMethod: ge.BROWSE
          });
        });
      }
    }),
    0
  ) : !s && e.ref.browser && (e.removeChildView(e.ref.browser), e.ref.browser = null);
}, cr = (e) => {
  const t = e.query("GET_ALLOW_PASTE"), n = e.query("GET_DISABLED"), r = t && !n;
  r && !e.ref.paster ? (e.ref.paster = il(), e.ref.paster.onload = (s) => {
    Re("ADD_ITEMS", s, { dispatch: e.dispatch }).then((o) => {
      if (dn(e, o))
        return !1;
      e.dispatch("ADD_ITEMS", {
        items: o,
        index: -1,
        interactionMethod: ge.PASTE
      });
    });
  }) : !r && e.ref.paster && (e.ref.paster.destroy(), e.ref.paster = null);
}, _l = Ee({
  DID_SET_ALLOW_BROWSE: ({ root: e, props: t }) => {
    lr(e, t);
  },
  DID_SET_ALLOW_DROP: ({ root: e }) => {
    ar(e);
  },
  DID_SET_ALLOW_PASTE: ({ root: e }) => {
    cr(e);
  },
  DID_SET_DISABLED: ({ root: e, props: t }) => {
    ar(e), cr(e), lr(e, t), e.query("GET_DISABLED") ? e.element.dataset.disabled = "disabled" : e.element.removeAttribute("data-disabled");
  }
}), gl = se({
  name: "root",
  read: ({ root: e }) => {
    e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight);
  },
  create: El,
  write: pl,
  destroy: ({ root: e }) => {
    e.ref.paster && e.ref.paster.destroy(), e.ref.hopper && e.ref.hopper.destroy(), e.element.removeEventListener("touchmove", Ot), e.element.removeEventListener("gesturestart", Ot);
  },
  mixins: {
    styles: ["height"]
  }
}), Sl = (e = {}) => {
  let t = null;
  const n = yt(), r = Bs(
    // initial state (should be serializable)
    Ri(n),
    // queries
    [ki, Oi(n)],
    // action handlers
    [fo, bi(n)]
  );
  r.dispatch("SET_OPTIONS", { options: e });
  const s = () => {
    document.hidden || r.dispatch("KICK");
  };
  document.addEventListener("visibilitychange", s);
  let o = null, i = !1, l = !1, a = null, f = null;
  const d = () => {
    i || (i = !0), clearTimeout(o), o = setTimeout(() => {
      i = !1, a = null, f = null, l && (l = !1, r.dispatch("DID_STOP_RESIZE"));
    }, 500);
  };
  window.addEventListener("resize", d);
  const m = gl(r, { id: Jt() });
  let h = !1, T = !1;
  const p = {
    // necessary for update loop
    /**
     * Reads from dom (never call manually)
     * @private
     */
    _read: () => {
      i && (f = window.innerWidth, a || (a = f), !l && f !== a && (r.dispatch("DID_START_RESIZE"), l = !0)), T && h && (h = m.element.offsetParent === null), !h && (m._read(), T = m.rect.element.hidden);
    },
    /**
     * Writes to dom (never call manually)
     * @private
     */
    _write: (S) => {
      const y = r.processActionQueue().filter((M) => !/^SET_/.test(M.type));
      h && !y.length || (A(y), h = m._write(S, y, l), Ai(r.query("GET_ITEMS")), h && r.processDispatchQueue());
    }
  }, I = (S) => (y) => {
    const M = {
      type: S
    };
    if (!y)
      return M;
    if (y.hasOwnProperty("error") && (M.error = y.error ? { ...y.error } : null), y.status && (M.status = { ...y.status }), y.file && (M.output = y.file), y.source)
      M.file = y.source;
    else if (y.item || y.id) {
      const C = y.item ? y.item : r.query("GET_ITEM", y.id);
      M.file = C ? pe(C) : null;
    }
    return y.items && (M.items = y.items.map(pe)), /progress/.test(S) && (M.progress = y.progress), y.hasOwnProperty("origin") && y.hasOwnProperty("target") && (M.origin = y.origin, M.target = y.target), M;
  }, D = {
    DID_DESTROY: I("destroy"),
    DID_INIT: I("init"),
    DID_THROW_MAX_FILES: I("warning"),
    DID_INIT_ITEM: I("initfile"),
    DID_START_ITEM_LOAD: I("addfilestart"),
    DID_UPDATE_ITEM_LOAD_PROGRESS: I("addfileprogress"),
    DID_LOAD_ITEM: I("addfile"),
    DID_THROW_ITEM_INVALID: [I("error"), I("addfile")],
    DID_THROW_ITEM_LOAD_ERROR: [I("error"), I("addfile")],
    DID_THROW_ITEM_REMOVE_ERROR: [I("error"), I("removefile")],
    DID_PREPARE_OUTPUT: I("preparefile"),
    DID_START_ITEM_PROCESSING: I("processfilestart"),
    DID_UPDATE_ITEM_PROCESS_PROGRESS: I("processfileprogress"),
    DID_ABORT_ITEM_PROCESSING: I("processfileabort"),
    DID_COMPLETE_ITEM_PROCESSING: I("processfile"),
    DID_COMPLETE_ITEM_PROCESSING_ALL: I("processfiles"),
    DID_REVERT_ITEM_PROCESSING: I("processfilerevert"),
    DID_THROW_ITEM_PROCESSING_ERROR: [I("error"), I("processfile")],
    DID_REMOVE_ITEM: I("removefile"),
    DID_UPDATE_ITEMS: I("updatefiles"),
    DID_ACTIVATE_ITEM: I("activatefile"),
    DID_REORDER_ITEMS: I("reorderfiles")
  }, O = (S) => {
    const y = { pond: Y, ...S };
    delete y.type, m.element.dispatchEvent(
      new CustomEvent(`FilePond:${S.type}`, {
        // event info
        detail: y,
        // event behaviour
        bubbles: !0,
        cancelable: !0,
        composed: !0
        // triggers listeners outside of shadow root
      })
    );
    const M = [];
    S.hasOwnProperty("error") && M.push(S.error), S.hasOwnProperty("file") && M.push(S.file);
    const C = ["type", "error", "file"];
    Object.keys(S).filter((X) => !C.includes(X)).forEach((X) => M.push(S[X])), Y.fire(S.type, ...M);
    const $ = r.query(`GET_ON${S.type.toUpperCase()}`);
    $ && $(...M);
  }, A = (S) => {
    S.length && S.filter((y) => D[y.type]).forEach((y) => {
      const M = D[y.type];
      (Array.isArray(M) ? M : [M]).forEach((C) => {
        y.type === "DID_INIT_ITEM" ? O(C(y.data)) : setTimeout(() => {
          O(C(y.data));
        }, 0);
      });
    });
  }, L = (S) => r.dispatch("SET_OPTIONS", { options: S }), w = (S) => r.query("GET_ACTIVE_ITEM", S), P = (S) => new Promise((y, M) => {
    r.dispatch("REQUEST_ITEM_PREPARE", {
      query: S,
      success: (C) => {
        y(C);
      },
      failure: (C) => {
        M(C);
      }
    });
  }), F = (S, y = {}) => new Promise((M, C) => {
    B([{ source: S, options: y }], { index: y.index }).then(($) => M($ && $[0])).catch(C);
  }), W = (S) => S.file && S.id, v = (S, y) => (typeof S == "object" && !W(S) && !y && (y = S, S = void 0), r.dispatch("REMOVE_ITEM", { ...y, query: S }), r.query("GET_ACTIVE_ITEM", S) === null), B = (...S) => new Promise((y, M) => {
    const C = [], $ = {};
    if (vt(S[0]))
      C.push.apply(C, S[0]), Object.assign($, S[1] || {});
    else {
      const X = S[S.length - 1];
      typeof X == "object" && !(X instanceof Blob) && Object.assign($, S.pop()), C.push(...S);
    }
    r.dispatch("ADD_ITEMS", {
      items: C,
      index: $.index,
      interactionMethod: ge.API,
      success: y,
      failure: M
    });
  }), q = () => r.query("GET_ACTIVE_ITEMS"), N = (S) => new Promise((y, M) => {
    r.dispatch("REQUEST_ITEM_PROCESSING", {
      query: S,
      success: (C) => {
        y(C);
      },
      failure: (C) => {
        M(C);
      }
    });
  }), U = (...S) => {
    const y = Array.isArray(S[0]) ? S[0] : S, M = y.length ? y : q();
    return Promise.all(M.map(P));
  }, ie = (...S) => {
    const y = Array.isArray(S[0]) ? S[0] : S;
    if (!y.length) {
      const M = q().filter(
        (C) => !(C.status === V.IDLE && C.origin === oe.LOCAL) && C.status !== V.PROCESSING && C.status !== V.PROCESSING_COMPLETE && C.status !== V.PROCESSING_REVERT_ERROR
      );
      return Promise.all(M.map(N));
    }
    return Promise.all(y.map(N));
  }, b = (...S) => {
    const y = Array.isArray(S[0]) ? S[0] : S;
    let M;
    typeof y[y.length - 1] == "object" ? M = y.pop() : Array.isArray(S[0]) && (M = S[1]);
    const C = q();
    return y.length ? y.map((X) => Ue(X) ? C[X] ? C[X].id : null : X).filter((X) => X).map((X) => v(X, M)) : Promise.all(C.map((X) => v(X, M)));
  }, Y = {
    // supports events
    ...wt(),
    // inject private api methods
    ...p,
    // inject all getters and setters
    ...yi(r, n),
    /**
     * Override options defined in options object
     * @param options
     */
    setOptions: L,
    /**
     * Load the given file
     * @param source - the source of the file (either a File, base64 data uri or url)
     * @param options - object, { index: 0 }
     */
    addFile: F,
    /**
     * Load the given files
     * @param sources - the sources of the files to load
     * @param options - object, { index: 0 }
     */
    addFiles: B,
    /**
     * Returns the file objects matching the given query
     * @param query { string, number, null }
     */
    getFile: w,
    /**
     * Upload file with given name
     * @param query { string, number, null  }
     */
    processFile: N,
    /**
     * Request prepare output for file with given name
     * @param query { string, number, null  }
     */
    prepareFile: P,
    /**
     * Removes a file by its name
     * @param query { string, number, null  }
     */
    removeFile: v,
    /**
     * Moves a file to a new location in the files list
     */
    moveFile: (S, y) => r.dispatch("MOVE_ITEM", { query: S, index: y }),
    /**
     * Returns all files (wrapped in public api)
     */
    getFiles: q,
    /**
     * Starts uploading all files
     */
    processFiles: ie,
    /**
     * Clears all files from the files list
     */
    removeFiles: b,
    /**
     * Starts preparing output of all files
     */
    prepareFiles: U,
    /**
     * Sort list of files
     */
    sort: (S) => r.dispatch("SORT", { compare: S }),
    /**
     * Browse the file system for a file
     */
    browse: () => {
      var S = m.element.querySelector("input[type=file]");
      S && S.click();
    },
    /**
     * Destroys the app
     */
    destroy: () => {
      Y.fire("destroy", m.element), r.dispatch("ABORT_ALL"), m._destroy(), window.removeEventListener("resize", d), document.removeEventListener("visibilitychange", s), r.dispatch("DID_DESTROY");
    },
    /**
     * Inserts the plugin before the target element
     */
    insertBefore: (S) => Mn(m.element, S),
    /**
     * Inserts the plugin after the target element
     */
    insertAfter: (S) => Cn(m.element, S),
    /**
     * Appends the plugin to the target element
     */
    appendTo: (S) => S.appendChild(m.element),
    /**
     * Replaces an element with the app
     */
    replaceElement: (S) => {
      Mn(m.element, S), S.parentNode.removeChild(S), t = S;
    },
    /**
     * Restores the original element
     */
    restoreElement: () => {
      t && (Cn(t, m.element), m.element.parentNode.removeChild(m.element), t = null);
    },
    /**
     * Returns true if the app root is attached to given element
     * @param element
     */
    isAttachedTo: (S) => m.element === S || t === S,
    /**
     * Returns the root element
     */
    element: {
      get: () => m.element
    },
    /**
     * Returns the current pond status
     */
    status: {
      get: () => r.query("GET_STATUS")
    }
  };
  return r.dispatch("DID_INIT"), Fe(Y);
}, ns = (e = {}) => {
  const t = {};
  return Z(yt(), (r, s) => {
    t[r] = s[0];
  }), Sl({
    // default options
    ...t,
    // custom options
    ...e
  });
}, Rl = (e) => e.charAt(0).toLowerCase() + e.slice(1), yl = (e) => es(e.replace(/^data-/, "")), rs = (e, t) => {
  Z(t, (n, r) => {
    Z(e, (s, o) => {
      const i = new RegExp(n);
      if (!i.test(s) || (delete e[s], r === !1))
        return;
      if (fe(r)) {
        e[r] = o;
        return;
      }
      const a = r.group;
      ae(r) && !e[a] && (e[a] = {}), e[a][Rl(s.replace(i, ""))] = o;
    }), r.mapping && rs(e[r.group], r.mapping);
  });
}, bl = (e, t = {}) => {
  const n = [];
  Z(e.attributes, (s) => {
    n.push(e.attributes[s]);
  });
  const r = n.filter((s) => s.name).reduce((s, o) => {
    const i = re(e, o.name);
    return s[yl(o.name)] = i === o.name ? !0 : i, s;
  }, {});
  return rs(r, t), r;
}, Ol = (e, t = {}) => {
  const n = {
    // translate to other name
    "^class$": "className",
    "^multiple$": "allowMultiple",
    "^capture$": "captureMethod",
    "^webkitdirectory$": "allowDirectoriesOnly",
    // group under single property
    "^server": {
      group: "server",
      mapping: {
        "^process": {
          group: "process"
        },
        "^revert": {
          group: "revert"
        },
        "^fetch": {
          group: "fetch"
        },
        "^restore": {
          group: "restore"
        },
        "^load": {
          group: "load"
        }
      }
    },
    // don't include in object
    "^type$": !1,
    "^files$": !1
  };
  We("SET_ATTRIBUTE_TO_OPTION_MAP", n);
  const r = {
    ...t
  }, s = bl(
    e.nodeName === "FIELDSET" ? e.querySelector("input[type=file]") : e,
    n
  );
  Object.keys(s).forEach((i) => {
    ae(s[i]) ? (ae(r[i]) || (r[i] = {}), Object.assign(r[i], s[i])) : r[i] = s[i];
  }), r.files = (t.files || []).concat(
    Array.from(e.querySelectorAll("input:not([type=file])")).map((i) => ({
      source: i.value,
      options: {
        type: i.dataset.type
      }
    }))
  );
  const o = ns(r);
  return e.files && Array.from(e.files).forEach((i) => {
    o.addFile(i);
  }), o.replaceElement(e), o;
}, Dl = (...e) => Fs(e[0]) ? Ol(...e) : ns(...e), vl = ["fire", "_read", "_write"], ur = (e) => {
  const t = {};
  return br(e, t, vl), t;
}, Al = (e, t) => e.replace(/(?:{([a-zA-Z]+)})/g, (n, r) => t[r]), Ll = (e) => {
  const t = new Blob(["(", e.toString(), ")()"], {
    type: "application/javascript"
  }), n = URL.createObjectURL(t), r = new Worker(n);
  return {
    transfer: (s, o) => {
    },
    post: (s, o, i) => {
      const l = Jt();
      r.onmessage = (a) => {
        a.data.id === l && o(a.data.message);
      }, r.postMessage(
        {
          id: l,
          message: s
        },
        i
      );
    },
    terminate: () => {
      r.terminate(), URL.revokeObjectURL(n);
    }
  };
}, wl = (e) => new Promise((t, n) => {
  const r = new Image();
  r.onload = () => {
    t(r);
  }, r.onerror = (s) => {
    n(s);
  }, r.src = e;
}), ss = (e, t) => {
  const n = e.slice(0, e.size, e.type);
  return n.lastModifiedDate = e.lastModifiedDate, n.name = t, n;
}, Pl = (e) => ss(e, e.name), dr = [], Ml = (e) => {
  if (dr.includes(e))
    return;
  dr.push(e);
  const t = e({
    addFilter: wi,
    utils: {
      Type: g,
      forin: Z,
      isString: fe,
      isFile: Je,
      toNaturalFileSize: Br,
      replaceInString: Al,
      getExtensionFromFilename: Pt,
      getFilenameWithoutExtension: Nr,
      guesstimateMimeType: Xr,
      getFileFromBlob: Ke,
      getFilenameFromURL: dt,
      createRoute: Ee,
      createWorker: Ll,
      createView: se,
      createItemAPI: pe,
      loadImage: wl,
      copyFile: Pl,
      renameFile: ss,
      createBlob: Pr,
      applyFilterChain: Re,
      text: ee,
      getNumericAspectRatioFromString: vr
    },
    views: {
      fileActionButton: Fr
    }
  });
  Pi(t.options);
}, Cl = () => Object.prototype.toString.call(window.operamini) === "[object OperaMini]", Nl = () => "Promise" in window, Gl = () => "slice" in Blob.prototype, Fl = () => "URL" in window && "createObjectURL" in window.URL, Bl = () => "visibilityState" in document, xl = () => "performance" in window, Ul = () => "supports" in (window.CSS || {}), kl = () => /MSIE|Trident/.test(window.navigator.userAgent), fr = (() => {
  const e = (
    // Has to be a browser
    Ir() && // Can't run on Opera Mini due to lack of everything
    !Cl() && // Require these APIs to feature detect a modern browser
    Bl() && Nl() && Gl() && Fl() && xl() && // doesn't need CSSSupports but is a good way to detect Safari 9+ (we do want to support IE11 though)
    (Ul() || kl())
  );
  return () => e;
})(), Ne = {
  // active app instances, used to redraw the apps and to find the later
  apps: []
}, Vl = "filepond", $e = () => {
};
let Zt = {}, Er = {}, St = $e, qt = $e, pr = $e, mr = $e, Dt = $e, hr = $e, Tr = $e;
if (fr()) {
  li(
    () => {
      Ne.apps.forEach((n) => n._read());
    },
    (n) => {
      Ne.apps.forEach((r) => r._write(n));
    }
  );
  const e = () => {
    document.dispatchEvent(
      new CustomEvent("FilePond:loaded", {
        detail: {
          supported: fr,
          create: St,
          destroy: qt,
          parse: pr,
          find: mr,
          registerPlugin: Dt,
          setOptions: Tr
        }
      })
    ), document.removeEventListener("DOMContentLoaded", e);
  };
  document.readyState !== "loading" ? setTimeout(() => e(), 0) : document.addEventListener("DOMContentLoaded", e);
  const t = () => Z(yt(), (n, r) => {
    Er[n] = r[1];
  });
  Zt = { ...Ar }, Er = {}, t(), St = (...n) => {
    const r = Dl(...n);
    return r.on("destroy", qt), Ne.apps.push(r), ur(r);
  }, qt = (n) => {
    const r = Ne.apps.findIndex((s) => s.isAttachedTo(n));
    return r >= 0 ? (Ne.apps.splice(r, 1)[0].restoreElement(), !0) : !1;
  }, pr = (n) => Array.from(n.querySelectorAll(`.${Vl}`)).filter(
    (o) => !Ne.apps.find((i) => i.isAttachedTo(o))
  ).map((o) => St(o)), mr = (n) => {
    const r = Ne.apps.find((s) => s.isAttachedTo(n));
    return r ? ur(r) : null;
  }, Dt = (...n) => {
    n.forEach(Ml), t();
  }, hr = () => {
    const n = {};
    return Z(yt(), (r, s) => {
      n[r] = s[0];
    }), n;
  }, Tr = (n) => (ae(n) && (Ne.apps.forEach((r) => {
    r.setOptions(n);
  }), Mi(n)), hr());
}
/*!
 * FilePondPluginFileValidateType 1.2.9
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
const is = ({ addFilter: e, utils: t }) => {
  const {
    Type: n,
    isString: r,
    replaceInString: s,
    guesstimateMimeType: o,
    getExtensionFromFilename: i,
    getFilenameFromURL: l
  } = t, a = (T, p) => {
    const I = (/^[^/]+/.exec(T) || []).pop(), D = p.slice(0, -2);
    return I === D;
  }, f = (T, p) => T.some((I) => /\*$/.test(I) ? a(p, I) : I === p), d = (T) => {
    let p = "";
    if (r(T)) {
      const I = l(T), D = i(I);
      D && (p = o(D));
    } else
      p = T.type;
    return p;
  }, m = (T, p, I) => {
    if (p.length === 0)
      return !0;
    const D = d(T);
    return I ? new Promise((O, A) => {
      I(T, D).then((L) => {
        f(p, L) ? O() : A();
      }).catch(A);
    }) : f(p, D);
  }, h = (T) => (p) => T[p] === null ? !1 : T[p] || p;
  return e(
    "SET_ATTRIBUTE_TO_OPTION_MAP",
    (T) => Object.assign(T, {
      accept: "acceptedFileTypes"
    })
  ), e("ALLOW_HOPPER_ITEM", (T, { query: p }) => p("GET_ALLOW_FILE_TYPE_VALIDATION") ? m(T, p("GET_ACCEPTED_FILE_TYPES")) : !0), e(
    "LOAD_FILE",
    (T, { query: p }) => new Promise((I, D) => {
      if (!p("GET_ALLOW_FILE_TYPE_VALIDATION")) {
        I(T);
        return;
      }
      const O = p("GET_ACCEPTED_FILE_TYPES"), A = p("GET_FILE_VALIDATE_TYPE_DETECT_TYPE"), L = m(T, O, A), w = () => {
        const P = O.map(
          h(
            p("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP")
          )
        ).filter((W) => W !== !1), F = P.filter(
          (W, v) => P.indexOf(W) === v
        );
        D({
          status: {
            main: p("GET_LABEL_FILE_TYPE_NOT_ALLOWED"),
            sub: s(
              p("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES"),
              {
                allTypes: F.join(", "),
                allButLastType: F.slice(0, -1).join(", "),
                lastType: F[F.length - 1]
              }
            )
          }
        });
      };
      if (typeof L == "boolean")
        return L ? I(T) : w();
      L.then(() => {
        I(T);
      }).catch(w);
    })
  ), {
    // default options
    options: {
      // Enable or disable file type validation
      allowFileTypeValidation: [!0, n.BOOLEAN],
      // What file types to accept
      acceptedFileTypes: [[], n.ARRAY],
      // - must be comma separated
      // - mime types: image/png, image/jpeg, image/gif
      // - extensions: .png, .jpg, .jpeg ( not enabled yet )
      // - wildcards: image/*
      // label to show when a type is not allowed
      labelFileTypeNotAllowed: ["File is of invalid type", n.STRING],
      // nicer label
      fileValidateTypeLabelExpectedTypes: [
        "Expects {allButLastType} or {lastType}",
        n.STRING
      ],
      // map mime types to extensions
      fileValidateTypeLabelExpectedTypesMap: [{}, n.OBJECT],
      // Custom function to detect type of file
      fileValidateTypeDetectType: [null, n.FUNCTION]
    }
  };
}, ql = typeof window < "u" && typeof window.document < "u";
ql && document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: is }));
/*!
 * FilePondPluginFileValidateSize 2.2.8
 * Licensed under MIT, https://opensource.org/licenses/MIT/
 * Please visit https://pqina.nl/filepond/ for details.
 */
const os = ({ addFilter: e, utils: t }) => {
  const { Type: n, replaceInString: r, toNaturalFileSize: s } = t;
  return e("ALLOW_HOPPER_ITEM", (o, { query: i }) => {
    if (!i("GET_ALLOW_FILE_SIZE_VALIDATION"))
      return !0;
    const l = i("GET_MAX_FILE_SIZE");
    if (l !== null && o.size > l)
      return !1;
    const a = i("GET_MIN_FILE_SIZE");
    return !(a !== null && o.size < a);
  }), e(
    "LOAD_FILE",
    (o, { query: i }) => new Promise((l, a) => {
      if (!i("GET_ALLOW_FILE_SIZE_VALIDATION"))
        return l(o);
      const f = i("GET_FILE_VALIDATE_SIZE_FILTER");
      if (f && !f(o))
        return l(o);
      const d = i("GET_MAX_FILE_SIZE");
      if (d !== null && o.size > d) {
        a({
          status: {
            main: i("GET_LABEL_MAX_FILE_SIZE_EXCEEDED"),
            sub: r(i("GET_LABEL_MAX_FILE_SIZE"), {
              filesize: s(
                d,
                ".",
                i("GET_FILE_SIZE_BASE"),
                i("GET_FILE_SIZE_LABELS", i)
              )
            })
          }
        });
        return;
      }
      const m = i("GET_MIN_FILE_SIZE");
      if (m !== null && o.size < m) {
        a({
          status: {
            main: i("GET_LABEL_MIN_FILE_SIZE_EXCEEDED"),
            sub: r(i("GET_LABEL_MIN_FILE_SIZE"), {
              filesize: s(
                m,
                ".",
                i("GET_FILE_SIZE_BASE"),
                i("GET_FILE_SIZE_LABELS", i)
              )
            })
          }
        });
        return;
      }
      const h = i("GET_MAX_TOTAL_FILE_SIZE");
      if (h !== null && i("GET_ACTIVE_ITEMS").reduce((p, I) => p + I.fileSize, 0) > h) {
        a({
          status: {
            main: i("GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED"),
            sub: r(i("GET_LABEL_MAX_TOTAL_FILE_SIZE"), {
              filesize: s(
                h,
                ".",
                i("GET_FILE_SIZE_BASE"),
                i("GET_FILE_SIZE_LABELS", i)
              )
            })
          }
        });
        return;
      }
      l(o);
    })
  ), {
    options: {
      // Enable or disable file type validation
      allowFileSizeValidation: [!0, n.BOOLEAN],
      // Max individual file size in bytes
      maxFileSize: [null, n.INT],
      // Min individual file size in bytes
      minFileSize: [null, n.INT],
      // Max total file size in bytes
      maxTotalFileSize: [null, n.INT],
      // Filter the files that need to be validated for size
      fileValidateSizeFilter: [null, n.FUNCTION],
      // error labels
      labelMinFileSizeExceeded: ["File is too small", n.STRING],
      labelMinFileSize: ["Minimum file size is {filesize}", n.STRING],
      labelMaxFileSizeExceeded: ["File is too large", n.STRING],
      labelMaxFileSize: ["Maximum file size is {filesize}", n.STRING],
      labelMaxTotalFileSizeExceeded: ["Maximum total size exceeded", n.STRING],
      labelMaxTotalFileSize: ["Maximum total file size is {filesize}", n.STRING]
    }
  };
}, Hl = typeof window < "u" && typeof window.document < "u";
Hl && document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: os }));
class et {
  constructor(t) {
    if (t.dataset.refFileUpload)
      return et.refs[t.dataset.refFileUpload];
    this.ref = Math.random(), et.refs[this.ref] = this, t.dataset.refFileUpload = this.ref, this.inputs = t.querySelectorAll('input[type="file"]'), this.fileponds = {}, this.headers = {
      Authorization: "pFdRC99ihTG!C%BQB6EJKjc!n%"
    }, document.addEventListener("FilePond:loaded", () => this.onload());
    const n = new ze(t.closest("[c-async-form]"));
    n.onBeforeSubmit = () => this.beforeSubmit(), n.onPayload = (r) => this.onPayload(r), n.onInput = async (r, s) => await this.inputHandler(r, s);
  }
  onload() {
    Dt(is), Dt(os);
    const t = {
      server: {
        url: "https://formupload.agentur-chapeau.de/",
        process: {
          url: "process",
          headers: this.headers
        },
        revert: {
          url: "revert",
          headers: this.headers
        },
        restore: null,
        load: null,
        fetch: null
      },
      credits: !1,
      labelIdle: `
			<div>
				<span>Dateien hierher ziehen oder <span class="filepond--label-action">auswählen</span></span>
			</div>
			`,
      labelInvalidField: "Feld enthält ungültige Dateien",
      labelFileWaitingForSize: "Auf Größe warten",
      labelFileSizeNotAvailable: "Größe nicht verfügbar",
      labelFileLoading: "Laden",
      labelFileLoadError: "Fehler beim Laden",
      labelFileProcessing: "Hochladen",
      labelFileProcessingComplete: "Hochgeladen",
      labelFileProcessingAborted: "Hochladen abgebrochen",
      labelFileProcessingError: "Fehler beim Hochladen",
      labelFileProcessingRevertError: "Fehler beim Entfernen",
      labelFileRemoveError: "Fehler beim Löschen",
      labelTapToCancel: "Tippen zum Abbrechen ",
      labelTapToRetry: "Tippen zum Wiederholen",
      labelTapToUndo: "Tippen zum Entfernen",
      labelButtonRemoveItem: "Entfernen",
      labelButtonAbortItemLoad: "Abbrechen",
      labelButtonRetryItemLoad: "Wiederholen",
      labelButtonAbortItemProcessing: "Abbrechen",
      labelButtonUndoItemProcessing: "Entfernen",
      labelButtonRetryItemProcessing: "Wiederholen",
      labelButtonProcessItem: "Hochladen",
      labelMaxFileSizeExceeded: "Datei ist zu groß",
      labelMaxFileSize: "Maximale Dateigröße beträgt {filesize}",
      labelMaxTotalFileSizeExceeded: "Maximale Gesamtgröße überschritten",
      labelMaxTotalFileSize: "Maximale Gesamtgröße beträgt {filesize}",
      labelFileTypeNotAllowed: "Ungültiger Dateityp",
      fileValidateTypeLabelExpectedTypes: "Gültige Dateitypen: {allButLastType} und {lastType}",
      fileValidateTypeLabelExpectedTypesMap: {
        "image/*": "Bilddateien",
        "image/png": ".png",
        "image/jpg": ".jpg",
        "image/jpeg": ".jpeg",
        "application/pdf": ".pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx"
      }
    };
    for (const n of this.inputs)
      this.fileponds[n.name] = St(n, {
        ...t,
        maxFiles: n.dataset.maxFiles || null,
        maxFileSize: n.dataset.maxFileSize || null,
        maxTotalFileSize: n.dataset.maxTotalFileSize || null
      });
  }
  beforeSubmit() {
    for (const [t, n] of Object.entries(this.fileponds))
      if (!(n.status == Zt.EMPTY || n.status == Zt.READY))
        return alert("Es sind noch nicht alle Dateien hochgeladen!"), !1;
    return !0;
  }
  onPayload(t) {
    for (const n of this.inputs)
      n.multiple && (t[n.name] = []);
    return t;
  }
  async inputHandler(t, n) {
    if (!t.closest(".filepond--root"))
      return n;
    if (!t.closest(".filepond--data"))
      return null;
    const r = this.fileponds[t.name], s = r.getFiles().find((f) => f.serverId === n), o = await fetch(`${r.server.url}finish`, {
      method: "POST",
      body: n,
      headers: this.headers
    });
    if (!o.ok)
      throw new Error("Upload could not finish ", o);
    const i = await o.text(), l = s.filename, a = s.fileSize;
    return {
      url: i,
      name: l,
      size: a
    };
  }
}
et.refs = {};
document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.querySelectorAll("[c-file-upload]")).forEach((e) => new et(e));
});
document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search) {
    const s = new URLSearchParams(window.location.search), o = s.get("gclid");
    o && window.localStorage.setItem("gclid", o);
    const i = s.get("fbclid");
    if (i) {
      const a = `fb.1.${Date.now()}.${i}`;
      window.localStorage.setItem("fbc", a);
    }
    const l = s.get("ttclid");
    l && window.localStorage.setItem("ttclid", l);
  }
  Array.from(document.querySelectorAll("[c-conversion] > form")).forEach((s) => {
    const o = ["gclid", "fbc", "fbp", "user-agent", "ttclid", "url"].reduce((i, l) => {
      const a = document.createElement("input");
      return a.type = "hidden", a.name = l, s.appendChild(a), {
        ...i,
        [l]: a
      };
    }, {});
    s.addEventListener("submit", () => {
      const i = n();
      o.gclid.value = i.gclid, o.fbc.value = i.fbc, o.fbp.value = i.fbp, o["user-agent"].value = i.useragent, o.ttclid.value = i.ttclid, o.url.value = i.url, window.fbq !== void 0 && fbq("track", "SubmitApplication", {}, { eventID: i.fbp });
    });
  }), Array.from(document.querySelectorAll("[data-fb-track]")).forEach((s) => {
    s.addEventListener("click", () => {
      if (s.dataset.trackDisabled === "true")
        return;
      const i = s.dataset.fbTrack, l = n(), a = s.dataset.trackUrl;
      window.fbq !== void 0 && fbq("track", i, {}, { eventID: l.fbp }), fetch(a, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: i,
          ...l
        })
      });
    });
  });
  function n() {
    const s = window.localStorage.getItem("gclid"), o = window.localStorage.getItem("fbc"), i = r("_fbp"), l = navigator.userAgent, a = window.localStorage.getItem("ttclid"), f = window.location.href;
    return {
      gclid: s,
      fbc: o,
      fbp: i,
      useragent: l,
      ttclid: a,
      url: f
    };
  }
  function r(s) {
    const i = `; ${document.cookie}`.split(`; ${s}=`);
    return i.length === 2 ? i.pop().split(";").shift() : null;
  }
});
var as = { exports: {} };
(function(e, t) {
  (function() {
    function n(u) {
      Object.defineProperty(u, "__esModule", { value: !0 });
    }
    var r = this, s = {};
    function o(u, c) {
      var E;
      if (typeof Symbol > "u" || u[Symbol.iterator] == null) {
        if (Array.isArray(u) || (E = i(u)) || c && u && typeof u.length == "number") {
          E && (u = E);
          var _ = 0, R = function() {
          };
          return { s: R, n: function() {
            return _ >= u.length ? { done: !0 } : { done: !1, value: u[_++] };
          }, e: function(G) {
            throw G;
          }, f: R };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var x, z = !0, k = !1;
      return { s: function() {
        E = u[Symbol.iterator]();
      }, n: function() {
        var G = E.next();
        return z = G.done, G;
      }, e: function(G) {
        k = !0, x = G;
      }, f: function() {
        try {
          z || E.return == null || E.return();
        } finally {
          if (k)
            throw x;
        }
      } };
    }
    function i(u, c) {
      if (u) {
        if (typeof u == "string")
          return l(u, c);
        var E = Object.prototype.toString.call(u).slice(8, -1);
        return E === "Object" && u.constructor && (E = u.constructor.name), E === "Map" || E === "Set" ? Array.from(u) : E === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(E) ? l(u, c) : void 0;
      }
    }
    function l(u, c) {
      (c == null || c > u.length) && (c = u.length);
      for (var E = 0, _ = new Array(c); E < c; E++)
        _[E] = u[E];
      return _;
    }
    Object.defineProperty(s, "__esModule", { value: !0 });
    var a = (f = void 0, d = s.isFormElement = f, m = s.isVisible = d, h = s.getDistanceFromTop = m, T = s.convertToString = h, s.validateEmail = T);
    s.findTextNode = a;
    var f = function(u) {
      return u instanceof HTMLInputElement || u instanceof HTMLSelectElement || u instanceof HTMLTextAreaElement;
    };
    s.isFormElement = f;
    var d = function(u) {
      return !!(u.offsetWidth || u.offsetHeight || u.getClientRects().length);
    };
    s.isVisible = d;
    var m = function(u) {
      var c = u, E = 0;
      if (c.offsetParent)
        do
          E += c.offsetTop, c = c.offsetParent instanceof HTMLElement ? c.offsetParent : null;
        while (c);
      return E >= 0 ? E : 0;
    };
    s.getDistanceFromTop = m;
    var h = function(u) {
      return typeof u == "string" ? u : typeof u == "number" ? u.toString() : u ? "true" : "false";
    };
    s.convertToString = h;
    var T = function(u) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(u).toLowerCase());
    };
    s.validateEmail = T, a = function(u) {
      var c, E, _ = o(u.childNodes);
      try {
        for (_.s(); !(E = _.n()).done; ) {
          var R = E.value;
          if (R.childNodes.length && (c = a(R)), R.nodeType == Node.TEXT_NODE && (c = R), c)
            break;
        }
      } catch (x) {
        _.e(x);
      } finally {
        _.f();
      }
      return c;
    }, s.findTextNode = a;
    var p = {};
    function I(u, c) {
      if (!(u instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function D(u, c) {
      for (var E = 0; E < c.length; E++) {
        var _ = c[E];
        _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(u, _.key, _);
      }
    }
    function O(u, c, E) {
      return c && D(u.prototype, c), E && D(u, E), u;
    }
    Object.defineProperty(p, "__esModule", { value: !0 });
    var A = function() {
      function u(c) {
        I(this, u), this.view = c, this.currentStep = 0, this.alertShown = !1, this.view = c, this.init();
      }
      return O(u, [{ key: "init", value: function() {
        this.view.setMaskHeight(this.currentStep), this.view.disableElement(this.view.back), this.view.setButtonText(this.currentStep), this.view.setStepsDisplay(this.currentStep), this.view.createHiddenForm(), this.setAlert(), this.setEvents();
      } }, { key: "setEvents", value: function() {
        var c = this, E = function(R) {
          c.navClick(R);
        }, _ = function(R) {
          c.handleInput(R);
        };
        this.view.next.addEventListener("click", function() {
          c.nextClick();
        }), this.view.back && this.view.back.addEventListener("click", function() {
          c.backClick();
        }), this.view.navLinks.forEach(function(R) {
          R.addEventListener("click", E);
        }), this.view.inputs.forEach(function(R) {
          R.addEventListener("input", _);
        }), this.view.form.addEventListener("submit", function(R) {
          c.handleSubmit();
        }), this.view.sendHiddenForm && this.view.rightArrow.addEventListener("click", function R() {
          c.currentStep === c.view.hiddenFormStep && (c.view.submitHiddenForm(), c.view.rightArrow.removeEventListener("click", R));
        });
      } }, { key: "nextClick", value: function() {
        this.checkRequiredInputs() ? (this.currentStep++, this.currentStep === 1 && this.view.enableElement(this.view.back), this.currentStep === this.view.steps.length ? this.view.submitForm() : (this.view.goNext(), this.view.setMaskHeight(this.currentStep), this.view.setButtonText(this.currentStep), this.view.setStepsDisplay(this.currentStep)), this.hideAlert(), this.view.scrollTop()) : this.showAlert();
      } }, { key: "backClick", value: function() {
        var c = this.currentStep - 1;
        c < 0 || (this.view.goBack(), this.view.setMaskHeight(c), this.view.setButtonText(c), this.view.setStepsDisplay(c), this.hideAlert(), this.view.scrollTop(), this.currentStep = c, this.currentStep === 0 && this.view.disableElement(this.view.back));
      } }, { key: "navClick", value: function(c) {
        var E = c.currentTarget;
        if (E instanceof HTMLElement) {
          var _ = +E.dataset.msfNav - 1;
          _ < this.currentStep && (this.view.sliderDots[_].click(), this.currentStep = _, this.view.setMaskHeight(this.currentStep), this.view.setButtonText(this.currentStep), this.currentStep === 0 && this.view.disableElement(this.view.back));
        }
      } }, { key: "handleInput", value: function(c) {
        var E = c.currentTarget;
        if (f(E)) {
          var _ = "-";
          switch (E.type) {
            case "checkbox":
              if (!(E instanceof HTMLInputElement))
                break;
              _ = E.checked;
              var R = E.parentElement;
              if (!R)
                break;
              var x = R.querySelector(".w-checkbox-input");
              E.checked && x && this.view.removeWarningClass(x);
              break;
            case "radio":
              var z = this.view.form.querySelector('input[name="'.concat(E.name, '"]:checked'));
              if (!(z instanceof HTMLInputElement))
                break;
              _ = z.value;
              var k = E.parentElement;
              if (!k)
                break;
              var G = k.querySelector(".w-radio-input");
              G && this.view.removeWarningClass(G);
              break;
            default:
              if (!E.value || E.type === "email" && !T(E.value))
                break;
              _ = E.value, this.view.removeWarningClass(E);
          }
          this.view.setValues(E, _);
        }
      } }, { key: "checkRequiredInputs", value: function() {
        var c = this, E = this.view.getInputs(this.currentStep).filter(function(R) {
          return R.required && d(R);
        }), _ = 0;
        return E.forEach(function(R) {
          switch (R.type) {
            case "checkbox":
              if (R.checkValidity()) {
                _++;
                break;
              }
              var x = R.parentElement;
              if (!x)
                break;
              var z = x.querySelector(".w-checkbox-input");
              z && c.view.addWarningClass(z);
              break;
            case "radio":
              if (R.checkValidity()) {
                _++;
                break;
              }
              var k = R.parentElement;
              if (!k)
                break;
              var G = k.querySelector(".w-radio-input");
              G && c.view.addWarningClass(G);
              break;
            default:
              if (!R.checkValidity() || R.type === "email" && !T(R.value)) {
                c.view.addWarningClass(R);
                break;
              }
              _++;
          }
        }), _ === E.length;
      } }, { key: "setAlert", value: function() {
        this.view.alertInteraction || this.view.hideElement(this.view.alert, !0);
      } }, { key: "showAlert", value: function() {
        this.alertShown || (this.view.showAlert(), this.alertShown = !0);
      } }, { key: "hideAlert", value: function() {
        this.alertShown && (this.view.hideAlert(), this.alertShown = !1);
      } }, { key: "observeSubmitText", value: function() {
        var c = this, E = this.view.submitButton;
        new MutationObserver(function(_) {
          _.forEach(function(R) {
            R.type === "attributes" && R.attributeName === "value" && (c.view.next.textContent = E.value);
          });
        }).observe(this.view.submitButton, { attributes: !0 });
      } }, { key: "handleSubmit", value: function() {
        this.view.disableButtons(), this.view.hideButtons();
      } }]), u;
    }(), L = A;
    p.default = L;
    var w = {};
    function P(u, c) {
      if (!(u instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function F(u, c) {
      for (var E = 0; E < c.length; E++) {
        var _ = c[E];
        _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(u, _.key, _);
      }
    }
    function W(u, c, E) {
      return c && F(u.prototype, c), E && F(u, E), u;
    }
    Object.defineProperty(w, "__esModule", { value: !0 });
    var v = function() {
      function u(c) {
        var E, _ = c.alertSelector, R = c.alertText, x = c.backSelector, z = c.backText, k = c.completedPercentageSelector, G = c.currentStepSelector, te = c.formSelector, j = c.hiddeButtonsOnSubmit, le = j === void 0 || j, Q = c.hiddenFormStep, me = Q === void 0 ? 1 : Q, ne = c.nextSelector, ve = c.nextText, it = c.scrollTopOnStepChange, ot = it !== void 0 && it, ue = c.sendHiddenForm, Se = ue !== void 0 && ue, we = c.warningClass;
        P(this, u);
        var Et = document.querySelector(te);
        if (!Et)
          throw new Error("No form was found with the selector ".concat(te));
        this.form = Et;
        var In = document.querySelector(ne);
        if (!In)
          throw new Error("No next button was found with the selector ".concat(ne));
        if (this.next = In, x) {
          var _n = document.querySelector(x);
          if (!_n)
            throw new Error("No back button was found with the selector ".concat(x));
          this.back = _n;
        }
        if (_) {
          var gn = document.querySelector(_);
          if (!gn)
            throw new Error("No alert element was found with the selector ".concat(_));
          this.alert = gn;
        }
        var Sn = Et.querySelector('input[type="submit"]');
        if (!Sn)
          throw new Error("No next button was found with the selector ".concat(ne));
        if (this.submitButton = Sn, G) {
          var Rn = document.querySelector(G);
          if (!Rn)
            throw new Error("No current step display element was found with the selector ".concat(G));
          this.currentStepDisplay = Rn;
        }
        if (k) {
          var yn = document.querySelector(k);
          if (!yn)
            throw new Error("No completed percentage display element was found with the selector ".concat(k));
          this.completedPercentageDisplay = yn;
        }
        var xe = Et.querySelector(".w-slider");
        if (!xe)
          throw new Error("No slider found inside the form, please add one.");
        this.slider = xe;
        var bn = xe.querySelector(".w-slider-mask");
        if (!bn)
          throw new Error("No mask found inside the slider!");
        this.mask = bn, this.steps = xe.querySelectorAll(".w-slide");
        var On = xe.querySelector(".w-slider-arrow-right");
        if (!On)
          throw new Error("No right arrow found inside the slider!");
        this.rightArrow = On;
        var Dn = xe.querySelector(".w-slider-arrow-left");
        if (!Dn)
          throw new Error("No left arrow found inside the slider!");
        this.leftArrow = Dn, this.sliderDots = xe.querySelectorAll(".w-slider-dot"), this.navLinks = document.querySelectorAll("[data-msf-nav]"), this.nextText = ve || this.next.textContent || "Next", this.backText = z, this.submitText = this.submitButton.value, this.warningClass = we, this.alertText = R, this.alertInteraction = (E = this.alert) === null || E === void 0 ? void 0 : E.querySelector('[data-msf="alert"]'), this.scrollTopOnStepChange = ot, this.hiddeButtonsOnSubmit = le, this.sendHiddenForm = Se, this.hiddenFormStep = me >= 1 ? me : 1, this.inputs = this.getInputs();
      }
      return W(u, [{ key: "setMaskHeight", value: function(c) {
        this.mask.style.height = "", this.mask.style.height = "".concat(this.steps[c].offsetHeight, "px");
      } }, { key: "getInputs", value: function(c) {
        var E = typeof c == "number" ? this.steps[c].querySelectorAll("input, select, textarea") : this.form.querySelectorAll("input, select, textarea");
        return Array.from(E);
      } }, { key: "setButtonText", value: function(c) {
        var E = this, _ = function(x) {
          var z = x === "back" ? E.back : E.next;
          if (z) {
            var k = a(z), G = x === "back" ? E.backText : E.nextText;
            if (k && Array.isArray(G) && G.length > 0)
              for (var te = function(le) {
                var Q = G.findIndex(function(me) {
                  return +me.step - 1 == c - le;
                });
                if (Q >= 0)
                  return k.textContent = G[Q].text, "break";
              }, j = 0; j <= c && te(j) !== "break"; j++)
                ;
          }
        };
        _("back");
        var R = a(this.next);
        R && c === this.steps.length - 1 ? R.textContent = this.submitText : R && typeof this.nextText == "string" && c === this.steps.length - 2 ? R.textContent = this.nextText : _("next");
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
        var E = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        if (c) {
          var _ = getComputedStyle(c);
          _.transition === "all 0s ease 0s" && (c.style.transition = "opacity 0.2s ease"), E && _.display !== "none" && c.addEventListener("transitionend", function R() {
            c.style.display = "none", c.removeEventListener("transitionend", R);
          }), c.style.opacity = "0", this.disableElement(c);
        }
      } }, { key: "showElement", value: function(c) {
        var E = this, _ = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        c && (_ && (c.style.display = "block"), requestAnimationFrame(function() {
          c.style.opacity = "", E.enableElement(c);
        }));
      } }, { key: "disableElement", value: function(c) {
        c && (c.style.pointerEvents = "none");
      } }, { key: "enableElement", value: function(c) {
        c && (c.style.pointerEvents = "");
      } }, { key: "disableButtons", value: function() {
        var c = this;
        this.disableElement(this.next), this.disableElement(this.back), this.navLinks.forEach(function(E) {
          return c.disableElement(E);
        });
      } }, { key: "hideButtons", value: function() {
        this.hiddeButtonsOnSubmit && (this.hideElement(this.next), this.back && this.hideElement(this.back));
      } }, { key: "showAlert", value: function() {
        this.alertText && alert(this.alertText), this.alert && (this.alertInteraction ? this.alertInteraction.click() : this.showElement(this.alert, !0));
      } }, { key: "hideAlert", value: function() {
        this.alert && (this.alertInteraction ? this.alertInteraction.click() : this.hideElement(this.alert, !0));
      } }, { key: "scrollTop", value: function() {
        this.scrollTopOnStepChange && window.scrollTo({ top: m(this.form), behavior: "smooth" });
      } }, { key: "setValues", value: function(c, E) {
        E = h(E);
        var _ = document.querySelector('[data-msf-value="'.concat(c.id, '"]')) || document.querySelector('[data-msf-value="'.concat(c.name, '"]'));
        if (_ && (_.textContent = E), c.matches('[data-msf="hidden"]')) {
          var R = this.hiddenForm.querySelector("#hidden-".concat(c.id));
          R instanceof HTMLInputElement && (R.value = E);
        }
      } }, { key: "setStepsDisplay", value: function(c) {
        this.currentStepDisplay && (this.currentStepDisplay.textContent = (c + 1).toString()), this.completedPercentageDisplay && (this.completedPercentageDisplay.textContent = "".concat(Math.round(c / (this.steps.length - 1) * 100), "%"));
      } }, { key: "createHiddenForm", value: function() {
        var c, E = this;
        if (this.sendHiddenForm) {
          var _ = this.form.parentElement;
          _ && (_.insertAdjacentHTML("afterend", `
    <div class="w-form" style="display: none;">
        <form id="msf-hidden-form" name="MSF Hidden Form" data-name="MSF Hidden Form">
            <input type="submit" value="Submit" data-wait="Please wait..." />
        </form>
    </div>
    `), this.hiddenForm = _.parentElement ? _.parentElement.querySelector("#msf-hidden-form") : document.querySelector("#msf-hidden-form"), this.hiddenSubmitButton = this.hiddenForm.querySelector('input[type="submit"]'), this.form.querySelectorAll('[data-msf="hidden"]').forEach(function(R) {
            var x = f(R) ? R : R.querySelector("input, select, textarea");
            if (x && !E.hiddenForm.querySelector("#hidden-".concat(R.id))) {
              var z = '<input type="hidden" id="hidden-'.concat(x.id, '" name="').concat(x.name, '" data-name="').concat(x.name, '" />');
              E.hiddenForm.insertAdjacentHTML("beforeend", z);
            }
          }), window.Webflow && window.Webflow.destroy(), window.Webflow && window.Webflow.ready(), window.Webflow && ((c = window.Webflow.require("ix2")) === null || c === void 0 || c.init()));
        }
      } }]), u;
    }(), B = v;
    w.default = B;
    var q = {};
    function N(u, c) {
      if (!(u instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    var U = q && q.__importDefault || function(u) {
      return u && u.__esModule ? u : { default: u };
    };
    Object.defineProperty(q, "__esModule", { value: !0 });
    var ie = U(p), b = U(w), Y = function u(c) {
      N(this, u), this.view = new b.default(c), this.controller = new ie.default(this.view);
    }, S = Y;
    q.default = S;
    var y = {};
    n(y);
    function M(u) {
      var c = typeof u;
      return u != null && (c == "object" || c == "function");
    }
    var C = typeof r == "object" && r && r.Object === Object && r, $ = typeof self == "object" && self && self.Object === Object && self, X = C || $ || Function("return this")(), Be = function() {
      return X.Date.now();
    }, Nt = /\s/;
    function Oe(u) {
      for (var c = u.length; c-- && Nt.test(u.charAt(c)); )
        ;
      return c;
    }
    var Gt = /^\s+/;
    function H(u) {
      return u && u.slice(0, Oe(u) + 1).replace(Gt, "");
    }
    var K = X.Symbol, Te = Object.prototype, Ce = Te.hasOwnProperty, ce = Te.toString, De = K ? K.toStringTag : void 0;
    function ls(u) {
      var c = Ce.call(u, De), E = u[De];
      try {
        u[De] = void 0;
        var _ = !0;
      } catch {
      }
      var R = ce.call(u);
      return _ && (c ? u[De] = E : delete u[De]), R;
    }
    var cs = Object.prototype, us = cs.toString;
    function ds(u) {
      return us.call(u);
    }
    var fs = "[object Null]", Es = "[object Undefined]", fn = K ? K.toStringTag : void 0;
    function ps(u) {
      return u == null ? u === void 0 ? Es : fs : fn && fn in Object(u) ? ls(u) : ds(u);
    }
    function ms(u) {
      return u != null && typeof u == "object";
    }
    var hs = "[object Symbol]";
    function Ts(u) {
      return typeof u == "symbol" || ms(u) && ps(u) == hs;
    }
    var En = NaN, Is = /^[-+]0x[0-9a-f]+$/i, _s = /^0b[01]+$/i, gs = /^0o[0-7]+$/i, Ss = parseInt;
    function pn(u) {
      if (typeof u == "number")
        return u;
      if (Ts(u))
        return En;
      if (M(u)) {
        var c = typeof u.valueOf == "function" ? u.valueOf() : u;
        u = M(c) ? c + "" : c;
      }
      if (typeof u != "string")
        return u === 0 ? u : +u;
      u = H(u);
      var E = _s.test(u);
      return E || gs.test(u) ? Ss(u.slice(2), E ? 2 : 8) : Is.test(u) ? En : +u;
    }
    var Rs = "Expected a function", ys = Math.max, bs = Math.min;
    function Os(u, c, E) {
      var _, R, x, z, k, G, te = 0, j = !1, le = !1, Q = !0;
      if (typeof u != "function")
        throw new TypeError(Rs);
      function me(ue) {
        var Se = _, we = R;
        return _ = R = void 0, te = ue, z = u.apply(we, Se);
      }
      function ne(ue) {
        var Se = ue - G;
        return G === void 0 || Se >= c || Se < 0 || le && ue - te >= x;
      }
      function ve() {
        var ue = Be();
        if (ne(ue))
          return it(ue);
        k = setTimeout(ve, function(Se) {
          var we = c - (Se - G);
          return le ? bs(we, x - (Se - te)) : we;
        }(ue));
      }
      function it(ue) {
        return k = void 0, Q && _ ? me(ue) : (_ = R = void 0, z);
      }
      function ot() {
        var ue = Be(), Se = ne(ue);
        if (_ = arguments, R = this, G = ue, Se) {
          if (k === void 0)
            return function(we) {
              return te = we, k = setTimeout(ve, c), j ? me(we) : z;
            }(G);
          if (le)
            return clearTimeout(k), k = setTimeout(ve, c), me(G);
        }
        return k === void 0 && (k = setTimeout(ve, c)), z;
      }
      return c = pn(c) || 0, M(E) && (j = !!E.leading, x = (le = "maxWait" in E) ? ys(pn(E.maxWait) || 0, c) : x, Q = "trailing" in E ? !!E.trailing : Q), ot.cancel = function() {
        k !== void 0 && clearTimeout(k), te = 0, _ = G = R = k = void 0;
      }, ot.flush = function() {
        return k === void 0 ? z : it(Be());
      }, ot;
    }
    y.default = Os;
    var Ae = {};
    Object.defineProperty(Ae, "__esModule", { value: !0 });
    var nt = (Xe = void 0, Le = Ae.isFormElement = Xe, ft = Ae.throwError = Le, Ae.isVisible = ft);
    Ae.convertToString = nt;
    var Xe = function(u) {
      return u instanceof HTMLInputElement || u instanceof HTMLSelectElement || u instanceof HTMLTextAreaElement;
    };
    Ae.isFormElement = Xe;
    var Le = function(u, c) {
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
    Ae.throwError = Le;
    var ft = function(u) {
      return !!(u.offsetWidth || u.offsetHeight || u.getClientRects().length);
    };
    Ae.isVisible = ft, nt = function(u) {
      return typeof u == "string" ? u : typeof u == "number" ? u.toString() : u ? "true" : "false";
    }, Ae.convertToString = nt;
    var rt = {};
    function Ds(u, c) {
      var E;
      if (typeof Symbol > "u" || u[Symbol.iterator] == null) {
        if (Array.isArray(u) || (E = vs(u)) || c && u && typeof u.length == "number") {
          E && (u = E);
          var _ = 0, R = function() {
          };
          return { s: R, n: function() {
            return _ >= u.length ? { done: !0 } : { done: !1, value: u[_++] };
          }, e: function(G) {
            throw G;
          }, f: R };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var x, z = !0, k = !1;
      return { s: function() {
        E = u[Symbol.iterator]();
      }, n: function() {
        var G = E.next();
        return z = G.done, G;
      }, e: function(G) {
        k = !0, x = G;
      }, f: function() {
        try {
          z || E.return == null || E.return();
        } finally {
          if (k)
            throw x;
        }
      } };
    }
    function vs(u, c) {
      if (u) {
        if (typeof u == "string")
          return mn(u, c);
        var E = Object.prototype.toString.call(u).slice(8, -1);
        return E === "Object" && u.constructor && (E = u.constructor.name), E === "Map" || E === "Set" ? Array.from(u) : E === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(E) ? mn(u, c) : void 0;
      }
    }
    function mn(u, c) {
      (c == null || c > u.length) && (c = u.length);
      for (var E = 0, _ = new Array(c); E < c; E++)
        _[E] = u[E];
      return _;
    }
    function As(u, c) {
      if (!(u instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function hn(u, c) {
      for (var E = 0; E < c.length; E++) {
        var _ = c[E];
        _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(u, _.key, _);
      }
    }
    function Ls(u, c, E) {
      return c && hn(u.prototype, c), E && hn(u, E), u;
    }
    var ws = rt && rt.__importDefault || function(u) {
      return u && u.__esModule ? u : { default: u };
    };
    Object.defineProperty(rt, "__esModule", { value: !0 });
    var Ps = ws(y), Ms = function() {
      function u(c) {
        As(this, u), this.logicList = [], this.submitHiddenInputs = !1, this.checkConditionsOnLoad = !0, Object.assign(this, c), this.store = [], this.init();
      }
      return Ls(u, [{ key: "init", value: function() {
        var c = this;
        this.logicList.forEach(function(E) {
          c.addEvents(E), E.actions.forEach(function(_) {
            c.storeInputData(_.selector, _.action);
          });
        });
      } }, { key: "addEvents", value: function(c) {
        var E = this;
        c.conditions.forEach(function(_) {
          var R = document.querySelector(_.selector);
          if (Xe(R)) {
            var x = R.type === "radio" ? Array.from(document.querySelectorAll('input[name="'.concat(R.name, '"]'))) : [R];
            E.checkConditionsOnLoad && E.checkConditions(c);
            var z = Ps.default(E.checkConditions.bind(E), 200), k = ["email", "number", "password", "search", "tel", "text", "textarea", "url"];
            x.forEach(function(G) {
              G.addEventListener("input", function() {
                k.includes(R.type) ? z(c) : E.checkConditions(c);
              });
            });
          } else
            Le(_.selector, "wrong-selector");
        });
      } }, { key: "storeInputData", value: function(c, E) {
        var _ = this;
        if (E !== "custom") {
          var R = document.querySelector(c);
          R instanceof HTMLElement ? this.getTargets(R).forEach(function(x) {
            var z = { element: x, required: x.required, disabled: x.disabled };
            _.store.findIndex(function(k) {
              return k.element === x;
            }) === -1 && _.store.push(z);
          }) : Le(c, "wrong-selector");
        }
      } }, { key: "checkConditions", value: function(c) {
        var E, _ = this, R = c.conditions, x = c.operator, z = x === void 0 ? "and" : x, k = c.actions, G = !1, te = Ds(R);
        try {
          for (te.s(); !(E = te.n()).done; ) {
            var j = E.value, le = document.querySelector(j.selector);
            if (!Xe(le))
              return void Le(j.selector, "wrong-selector");
            var Q = "";
            switch (le.type) {
              case "checkbox":
                Q = nt(le.checked);
                break;
              case "radio":
                var me = document.querySelector('input[name="'.concat(le.name, '"]:checked'));
                me instanceof HTMLInputElement && (Q = me.value);
                break;
              default:
                Q = le.value;
            }
            var ne = nt(j.value);
            switch (j.operator) {
              case "equal":
                G = Q === ne;
                break;
              case "not-equal":
                G = Q !== ne;
                break;
              case "contain":
                G = !!Q.includes(ne);
                break;
              case "not-contain":
                G = !Q.includes(ne);
                break;
              case "greater":
                G = +Q > +ne;
                break;
              case "greater-equal":
                G = +Q >= +ne;
                break;
              case "less":
                G = +Q < +ne;
                break;
              case "less-equal":
                G = +Q <= +ne;
                break;
              case "empty":
                G = Q.length === 0;
                break;
              case "filled":
                G = Q.length > 0;
                break;
              default:
                Le(j.selector, "wrong-operator");
            }
            if (z === "and" && !G || z === "or" && G)
              break;
          }
        } catch (ve) {
          te.e(ve);
        } finally {
          te.f();
        }
        G && k.forEach(function(ve) {
          _.triggerAction(ve);
        });
      } }, { key: "triggerAction", value: function(c) {
        var E = this, _ = c.selector, R = c.action, x = c.clear, z = x !== void 0 && x, k = document.querySelector(_);
        if (k instanceof HTMLElement)
          if (R !== "custom") {
            var G = this.getTargets(k), te = !1;
            G.forEach(function(j) {
              var le = E.getStoredData(j), Q = le.required, me = le.disabled, ne = ft(j);
              switch (te || (te = E.triggerInteraction(k, R)), R) {
                case "show":
                  E.showInput(j, k, te, Q, me);
                  break;
                case "hide":
                  E.hideInput(j, k, te);
                  break;
                case "enable":
                  E.enableInput(j, ne);
                  break;
                case "disable":
                  E.disableInput(j, ne);
                  break;
                case "require":
                  E.requireInput(j, ne);
                  break;
                case "unrequire":
                  E.unrequireInput(j, ne);
                  break;
                default:
                  Le(_, "wrong-action");
              }
              z && E.clearInput(j);
            });
          } else
            this.triggerInteraction(k, R);
        else
          Le(_, "wrong-selector");
      } }, { key: "showInput", value: function(c, E, _, R, x) {
        _ || (E.style.display = "block"), c.required = R, c.disabled = x;
      } }, { key: "hideInput", value: function(c, E, _) {
        _ || (E.style.display = "none"), this.submitHiddenInputs || (c.disabled = !0), c.required = !1;
      } }, { key: "enableInput", value: function(c, E) {
        E && (c.disabled = !1), this.updateStoredData(c, "disabled", !1);
      } }, { key: "disableInput", value: function(c, E) {
        E && (c.disabled = !0), this.updateStoredData(c, "disabled", !0);
      } }, { key: "requireInput", value: function(c, E) {
        E && (c.required = !0), this.updateStoredData(c, "required", !0);
      } }, { key: "unrequireInput", value: function(c, E) {
        E && (c.required = !1), this.updateStoredData(c, "required", !1);
      } }, { key: "getTargets", value: function(c) {
        return Xe(c) ? [c] : Array.from(c.querySelectorAll("input, select, textarea"));
      } }, { key: "triggerInteraction", value: function(c, E) {
        var _ = E === "custom" ? c : c.querySelector(':scope > [data-logic="'.concat(E, '"]'));
        return _ instanceof HTMLElement && (_.click(), !0);
      } }, { key: "clearInput", value: function(c) {
        c.type === "checkbox" || c.type === "radio" ? c.checked = !1 : c.value = "";
      } }, { key: "updateStoredData", value: function(c, E, _) {
        var R = this.store.findIndex(function(x) {
          return x.element === c;
        });
        R > -1 && (this.store[R][E] = _);
      } }, { key: "getStoredData", value: function(c) {
        return this.store.find(function(E) {
          return E.element === c;
        });
      } }]), u;
    }(), Cs = Ms;
    rt.default = Cs;
    var st = {}, Tn = st && st.__importDefault || function(u) {
      return u && u.__esModule ? u : { default: u };
    };
    Object.defineProperty(st, "__esModule", { value: !0 });
    var Ns = Tn(q), Gs = Tn(rt);
    st = { MSF: Ns.default, Logic: Gs.default }, e.exports = st;
  })();
})(as);
var Yl = as.exports, Ge = window.Webflow || [];
Ge.push(() => {
  zl();
});
function zl() {
  const e = document.querySelector('[c-chapeau-form="main"]'), t = e.querySelector('[c-chapeau-form="nav"]'), n = e.querySelector('[c-chapeau-form="total-steps"]'), r = e.querySelector('[c-chapeau-form="progress"]'), s = e.querySelector('[c-chapeau-form="slider"]'), o = e.querySelector('[c-chapeau-form="slides"]'), i = e.querySelector('[c-chapeau-form="not-qualified-message"]'), l = e.querySelector('[c-chapeau-form="buttons"]'), a = '[c-chapeau-form="form"]', f = '[c-chapeau-form="next"]', d = '[c-chapeau-form="back"]', m = '[c-chapeau-form="current-step"]';
  Wl(s, o);
  const h = new Yl.MSF({
    hiddeButtonsOnSubmit: !1,
    // Buttons will be manually hidden
    scrollTopOnStepChange: !1,
    formSelector: a,
    nextSelector: f,
    backSelector: d,
    currentStepSelector: m
  });
  jl(h), $l(h, r), Ql(h), Xl(h, i, t, l), Zl(h), Kl(h, e);
  const T = h.view.steps.length;
  n.textContent = T, window.msf = h, e.removeAttribute("c-cloak"), h.view.setMaskHeight(0);
}
function Wl(e, t) {
  const n = e.querySelector(":scope > .w-slider-mask"), r = Array.from(t.querySelectorAll(":scope > .w-dyn-items > .w-dyn-item"));
  Array.from(n.querySelectorAll(".w-slide")).forEach((s) => s.remove()), r.forEach((s) => {
    s.classList.add("w-slide"), n.appendChild(s);
  }), t.remove(), Ge.destroy(), Ge.ready(), Ge.require("ix2").init(), Ge.require("slider").redraw(), Ge.require("slider").ready();
}
function $l({ view: e, controller: t }, n) {
  e.next.addEventListener("click", r), e.back.addEventListener("click", r), r();
  function r() {
    const s = t.currentStep + 1, o = e.steps.length, i = Math.min(s / o * 100, 100);
    n.style.width = `${i}%`;
  }
}
function Xl({ view: e, controller: t }, n, r, s) {
  e.form.addEventListener("change", o);
  function o() {
    var T;
    const d = e.getInputs(t.currentStep).some((p) => p.checked ? p.parentElement.querySelector('[c-chapeau-form="not-qualified"]') != null : !1), m = e.steps[t.currentStep], h = (T = m.nextSibling) == null ? void 0 : T.matches(
      '[c-chapeau-form="not-qualified-message"]'
    );
    d ? (e.next.dataset.trackDisabled = !0, h || (m.insertAdjacentHTML("afterend", n.outerHTML), m.nextElementSibling.querySelector('[c-chapeau-form="not-qualified-back"]').addEventListener("click", () => e.back.click()))) : (e.next.dataset.trackDisabled = !1, h && m.nextSibling.remove()), m.dataset.notQualified = d, Ge.require("slider").redraw(), Ge.require("slider").ready();
  }
  const i = e.submitForm.bind(e);
  e.submitForm = () => {
    e.steps[e.steps.length - 1].dataset.notQualified === "true" ? (e.goNext(), l()) : i();
  }, e.next.addEventListener("click", () => {
    e.steps[t.currentStep - 1].dataset.notQualified === "true" && l();
  }), e.back.addEventListener("click", () => {
    a();
  });
  function l() {
    e.hideElement(r), e.hideElement(s);
  }
  function a() {
    e.showElement(r), e.showElement(s);
  }
}
function jl({ view: e }) {
  e.enableElement(e.back), e.disableElement = (t) => {
    t && t.classList.add("disabled");
  }, e.enableElement = (t) => {
    t && t.classList.remove("disabled");
  }, e.disableElement(e.back);
}
function Ql(e) {
  e.view;
  const t = e.controller, n = t.checkRequiredInputs.bind(t);
  function r() {
    this.inputsCurrentlyValid = !0;
    const s = this.view.getInputs(this.currentStep);
    for (const o of s)
      if (!o.reportValidity())
        return this.inputsCurrentlyValid = !1, !1;
    return n();
  }
  t.checkRequiredInputs = r.bind(t);
}
function Zl(e) {
  const t = e.view, n = e.controller, r = t.form.closest("[c-async-form]"), s = t.back, o = t.next, i = new ze(r);
  i.onState = (l) => {
    l === "success" && (t.hideElement(s), t.hideElement(o));
  }, n.observeSubmitText(), n.handleSubmit = () => {
    n.currentStep = Math.min(n.currentStep, t.steps.length - 1);
  };
}
function Kl(e, t) {
  new et(t);
  const n = e.view, r = e.controller;
  n.form.addEventListener("FilePond:updatefiles", () => {
    setTimeout(() => n.setMaskHeight(r.currentStep), 100);
  });
}
