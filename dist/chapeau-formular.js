document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search) {
    const r = new URLSearchParams(window.location.search), n = r.get("gclid");
    n && window.localStorage.setItem("gclid", n);
    const o = r.get("fbclid");
    if (o) {
      const i = `fb.1.${Date.now()}.${o}`;
      window.localStorage.setItem("fbc", i);
    }
    const a = r.get("ttclid");
    a && window.localStorage.setItem("ttclid", a);
  }
  Array.from(document.querySelectorAll("[c-conversion] > form")).forEach((r) => {
    const n = ["gclid", "fbc", "fbp", "user-agent", "ttclid", "url"].reduce((o, a) => {
      const i = document.createElement("input");
      return i.type = "hidden", i.name = a, r.appendChild(i), { ...o, [a]: i };
    }, {});
    r.addEventListener("submit", () => {
      const o = e();
      n.gclid.value = o.gclid, n.fbc.value = o.fbc, n.fbp.value = o.fbp, n["user-agent"].value = o.useragent, n.ttclid.value = o.ttclid, n.url.value = o.url, window.fbq !== void 0 && fbq("track", "SubmitApplication", {}, { eventID: o.fbp });
    });
  }), Array.from(document.querySelectorAll("[data-fb-track]")).forEach((r) => {
    r.addEventListener("click", () => {
      if (r.dataset.trackDisabled === "true") return;
      const n = r.dataset.fbTrack, o = e(), a = r.dataset.trackUrl;
      window.fbq !== void 0 && fbq("track", n, {}, { eventID: o.fbp }), fetch(a, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: n, ...o }) });
    });
  });
  function e() {
    const r = window.localStorage.getItem("gclid"), n = window.localStorage.getItem("fbc"), o = t("_fbp"), a = navigator.userAgent, i = window.localStorage.getItem("ttclid"), s = window.location.href;
    return { gclid: r, fbc: n, fbp: o, useragent: a, ttclid: i, url: s };
  }
  function t(r) {
    const n = `; ${document.cookie}`.split(`; ${r}=`);
    return n.length === 2 ? n.pop().split(";").shift() : null;
  }
});
var Fn = { exports: {} };
(function(e, t) {
  (function() {
    function r(d) {
      Object.defineProperty(d, "__esModule", { value: !0 });
    }
    var n = this, o = {};
    function a(d, c) {
      var f;
      if (typeof Symbol > "u" || d[Symbol.iterator] == null) {
        if (Array.isArray(d) || (f = i(d)) || c) {
          f && (d = f);
          var T = 0, S = function() {
          };
          return { s: S, n: function() {
            return T >= d.length ? { done: !0 } : { done: !1, value: d[T++] };
          }, e: function(G) {
            throw G;
          }, f: S };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var k, Y = !0, B = !1;
      return { s: function() {
        f = d[Symbol.iterator]();
      }, n: function() {
        var G = f.next();
        return Y = G.done, G;
      }, e: function(G) {
        B = !0, k = G;
      }, f: function() {
        try {
          Y || f.return == null || f.return();
        } finally {
          if (B) throw k;
        }
      } };
    }
    function i(d, c) {
      if (d) {
        if (typeof d == "string") return s(d, c);
        var f = Object.prototype.toString.call(d).slice(8, -1);
        return f === "Object" && d.constructor && (f = d.constructor.name), f === "Map" || f === "Set" ? Array.from(d) : f === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f) ? s(d, c) : void 0;
      }
    }
    function s(d, c) {
      (c == null || c > d.length) && (c = d.length);
      for (var f = 0, T = new Array(c); f < c; f++) T[f] = d[f];
      return T;
    }
    Object.defineProperty(o, "__esModule", { value: !0 });
    var l = (u = void 0, p = o.isFormElement = u, m = o.isVisible = p, h = o.getDistanceFromTop = m, _ = o.convertToString = h, o.validateEmail = _);
    o.findTextNode = l;
    var u = function(d) {
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement || d instanceof HTMLTextAreaElement;
    };
    o.isFormElement = u;
    var p = function(d) {
      return !!(d.offsetWidth || d.offsetHeight || d.getClientRects().length);
    };
    o.isVisible = p;
    var m = function(d) {
      var c = d, f = 0;
      if (c.offsetParent) do
        f += c.offsetTop, c = c.offsetParent instanceof HTMLElement ? c.offsetParent : null;
      while (c);
      return f >= 0 ? f : 0;
    };
    o.getDistanceFromTop = m;
    var h = function(d) {
      return typeof d == "string" ? d : typeof d == "number" ? d.toString() : d ? "true" : "false";
    };
    o.convertToString = h;
    var _ = function(d) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(d).toLowerCase());
    };
    o.validateEmail = _, l = function(d) {
      var c, f, T = a(d.childNodes);
      try {
        for (T.s(); !(f = T.n()).done; ) {
          var S = f.value;
          if (S.childNodes.length && (c = l(S)), S.nodeType == Node.TEXT_NODE && (c = S), c) break;
        }
      } catch (k) {
        T.e(k);
      } finally {
        T.f();
      }
      return c;
    }, o.findTextNode = l;
    var E = {};
    function I(d, c) {
      if (!(d instanceof c)) throw new TypeError("Cannot call a class as a function");
    }
    function b(d, c) {
      for (var f = 0; f < c.length; f++) {
        var T = c[f];
        T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(d, T.key, T);
      }
    }
    function R(d, c, f) {
      return c && b(d.prototype, c), d;
    }
    Object.defineProperty(E, "__esModule", { value: !0 });
    var D = function() {
      function d(c) {
        I(this, d), this.view = c, this.currentStep = 0, this.alertShown = !1, this.view = c, this.init();
      }
      return R(d, [{ key: "init", value: function() {
        this.view.setMaskHeight(this.currentStep), this.view.disableElement(this.view.back), this.view.setButtonText(this.currentStep), this.view.setStepsDisplay(this.currentStep), this.view.createHiddenForm(), this.setAlert(), this.setEvents();
      } }, { key: "setEvents", value: function() {
        var c = this, f = function(S) {
          c.navClick(S);
        }, T = function(S) {
          c.handleInput(S);
        };
        this.view.next.addEventListener("click", function() {
          c.nextClick();
        }), this.view.back && this.view.back.addEventListener("click", function() {
          c.backClick();
        }), this.view.navLinks.forEach(function(S) {
          S.addEventListener("click", f);
        }), this.view.inputs.forEach(function(S) {
          S.addEventListener("input", T);
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
          var T = +f.dataset.msfNav - 1;
          T < this.currentStep && (this.view.sliderDots[T].click(), this.currentStep = T, this.view.setMaskHeight(this.currentStep), this.view.setButtonText(this.currentStep), this.currentStep === 0 && this.view.disableElement(this.view.back));
        }
      } }, { key: "handleInput", value: function(c) {
        var f = c.currentTarget;
        if (u(f)) {
          var T = "-";
          switch (f.type) {
            case "checkbox":
              if (!(f instanceof HTMLInputElement)) break;
              T = f.checked;
              var S = f.parentElement;
              if (!S) break;
              var k = S.querySelector(".w-checkbox-input");
              f.checked && k && this.view.removeWarningClass(k);
              break;
            case "radio":
              var Y = this.view.form.querySelector('input[name="'.concat(f.name, '"]:checked'));
              if (!(Y instanceof HTMLInputElement)) break;
              T = Y.value;
              var B = f.parentElement;
              if (!B) break;
              var G = B.querySelector(".w-radio-input");
              G && this.view.removeWarningClass(G);
              break;
            default:
              if (!f.value || f.type === "email" && !_(f.value)) break;
              T = f.value, this.view.removeWarningClass(f);
          }
          this.view.setValues(f, T);
        }
      } }, { key: "checkRequiredInputs", value: function() {
        var c = this, f = this.view.getInputs(this.currentStep).filter(function(S) {
          return S.required && p(S);
        }), T = 0;
        return f.forEach(function(S) {
          switch (S.type) {
            case "checkbox":
              if (S.checkValidity()) {
                T++;
                break;
              }
              var k = S.parentElement;
              if (!k) break;
              var Y = k.querySelector(".w-checkbox-input");
              Y && c.view.addWarningClass(Y);
              break;
            case "radio":
              if (S.checkValidity()) {
                T++;
                break;
              }
              var B = S.parentElement;
              if (!B) break;
              var G = B.querySelector(".w-radio-input");
              G && c.view.addWarningClass(G);
              break;
            default:
              if (!S.checkValidity() || S.type === "email" && !_(S.value)) {
                c.view.addWarningClass(S);
                break;
              }
              T++;
          }
        }), T === f.length;
      } }, { key: "setAlert", value: function() {
        this.view.alertInteraction || this.view.hideElement(this.view.alert, !0);
      } }, { key: "showAlert", value: function() {
        this.alertShown || (this.view.showAlert(), this.alertShown = !0);
      } }, { key: "hideAlert", value: function() {
        this.alertShown && (this.view.hideAlert(), this.alertShown = !1);
      } }, { key: "observeSubmitText", value: function() {
        var c = this, f = this.view.submitButton;
        new MutationObserver(function(T) {
          T.forEach(function(S) {
            S.type === "attributes" && S.attributeName === "value" && (c.view.next.textContent = f.value);
          });
        }).observe(this.view.submitButton, { attributes: !0 });
      } }, { key: "handleSubmit", value: function() {
        this.view.disableButtons(), this.view.hideButtons();
      } }]), d;
    }(), C = D;
    E.default = C;
    var N = {};
    function A(d, c) {
      if (!(d instanceof c)) throw new TypeError("Cannot call a class as a function");
    }
    function F(d, c) {
      for (var f = 0; f < c.length; f++) {
        var T = c[f];
        T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(d, T.key, T);
      }
    }
    function w(d, c, f) {
      return c && F(d.prototype, c), d;
    }
    Object.defineProperty(N, "__esModule", { value: !0 });
    var L = function() {
      function d(c) {
        var f, T = c.alertSelector, S = c.alertText, k = c.backSelector, Y = c.backText, B = c.completedPercentageSelector, G = c.currentStepSelector, te = c.formSelector, W = c.hiddeButtonsOnSubmit, se = W === void 0 || W, j = c.hiddenFormStep, he = j === void 0 ? 1 : j, re = c.nextSelector, Oe = c.nextText, ct = c.scrollTopOnStepChange, ut = ct !== void 0 && ct, ce = c.sendHiddenForm, ge = ce !== void 0 && ce, we = c.warningClass;
        A(this, d);
        var It = document.querySelector(te);
        if (!It) throw new Error("No form was found with the selector ".concat(te));
        this.form = It;
        var Pr = document.querySelector(re);
        if (!Pr) throw new Error("No next button was found with the selector ".concat(re));
        if (this.next = Pr, k) {
          var Mr = document.querySelector(k);
          if (!Mr) throw new Error("No back button was found with the selector ".concat(k));
          this.back = Mr;
        }
        if (T) {
          var Cr = document.querySelector(T);
          if (!Cr) throw new Error("No alert element was found with the selector ".concat(T));
          this.alert = Cr;
        }
        var Nr = It.querySelector('input[type="submit"]');
        if (!Nr) throw new Error("No next button was found with the selector ".concat(re));
        if (this.submitButton = Nr, G) {
          var Gr = document.querySelector(G);
          if (!Gr) throw new Error("No current step display element was found with the selector ".concat(G));
          this.currentStepDisplay = Gr;
        }
        if (B) {
          var Fr = document.querySelector(B);
          if (!Fr) throw new Error("No completed percentage display element was found with the selector ".concat(B));
          this.completedPercentageDisplay = Fr;
        }
        var qe = It.querySelector(".w-slider");
        if (!qe) throw new Error("No slider found inside the form, please add one.");
        this.slider = qe;
        var xr = qe.querySelector(".w-slider-mask");
        if (!xr) throw new Error("No mask found inside the slider!");
        this.mask = xr, this.steps = qe.querySelectorAll(".w-slide");
        var kr = qe.querySelector(".w-slider-arrow-right");
        if (!kr) throw new Error("No right arrow found inside the slider!");
        this.rightArrow = kr;
        var qr = qe.querySelector(".w-slider-arrow-left");
        if (!qr) throw new Error("No left arrow found inside the slider!");
        this.leftArrow = qr, this.sliderDots = qe.querySelectorAll(".w-slider-dot"), this.navLinks = document.querySelectorAll("[data-msf-nav]"), this.nextText = Oe || this.next.textContent || "Next", this.backText = Y, this.submitText = this.submitButton.value, this.warningClass = we, this.alertText = S, this.alertInteraction = (f = this.alert) === null || f === void 0 ? void 0 : f.querySelector('[data-msf="alert"]'), this.scrollTopOnStepChange = ut, this.hiddeButtonsOnSubmit = se, this.sendHiddenForm = ge, this.hiddenFormStep = he >= 1 ? he : 1, this.inputs = this.getInputs();
      }
      return w(d, [{ key: "setMaskHeight", value: function(c) {
        this.mask.style.height = "", this.mask.style.height = "".concat(this.steps[c].offsetHeight, "px");
      } }, { key: "getInputs", value: function(c) {
        var f = typeof c == "number" ? this.steps[c].querySelectorAll("input, select, textarea") : this.form.querySelectorAll("input, select, textarea");
        return Array.from(f);
      } }, { key: "setButtonText", value: function(c) {
        var f = this, T = function(k) {
          var Y = k === "back" ? f.back : f.next;
          if (Y) {
            var B = l(Y), G = k === "back" ? f.backText : f.nextText;
            if (B && Array.isArray(G) && G.length > 0) for (var te = function(se) {
              var j = G.findIndex(function(he) {
                return +he.step - 1 == c - se;
              });
              if (j >= 0) return B.textContent = G[j].text, "break";
            }, W = 0; W <= c && te(W) !== "break"; W++) ;
          }
        };
        T("back");
        var S = l(this.next);
        S && c === this.steps.length - 1 ? S.textContent = this.submitText : S && typeof this.nextText == "string" && c === this.steps.length - 2 ? S.textContent = this.nextText : T("next");
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
          var T = getComputedStyle(c);
          T.transition === "all 0s ease 0s" && (c.style.transition = "opacity 0.2s ease"), f && T.display !== "none" && c.addEventListener("transitionend", function S() {
            c.style.display = "none", c.removeEventListener("transitionend", S);
          }), c.style.opacity = "0", this.disableElement(c);
        }
      } }, { key: "showElement", value: function(c) {
        var f = this, T = arguments.length > 1 && arguments[1] !== void 0 && arguments[1];
        c && (T && (c.style.display = "block"), requestAnimationFrame(function() {
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
        var T = document.querySelector('[data-msf-value="'.concat(c.id, '"]')) || document.querySelector('[data-msf-value="'.concat(c.name, '"]'));
        if (T && (T.textContent = f), c.matches('[data-msf="hidden"]')) {
          var S = this.hiddenForm.querySelector("#hidden-".concat(c.id));
          S instanceof HTMLInputElement && (S.value = f);
        }
      } }, { key: "setStepsDisplay", value: function(c) {
        this.currentStepDisplay && (this.currentStepDisplay.textContent = (c + 1).toString()), this.completedPercentageDisplay && (this.completedPercentageDisplay.textContent = "".concat(Math.round(c / (this.steps.length - 1) * 100), "%"));
      } }, { key: "createHiddenForm", value: function() {
        var c, f = this;
        if (this.sendHiddenForm) {
          var T = this.form.parentElement;
          T && (T.insertAdjacentHTML("afterend", `
    <div class="w-form" style="display: none;">
        <form id="msf-hidden-form" name="MSF Hidden Form" data-name="MSF Hidden Form">
            <input type="submit" value="Submit" data-wait="Please wait..." />
        </form>
    </div>
    `), this.hiddenForm = T.parentElement ? T.parentElement.querySelector("#msf-hidden-form") : document.querySelector("#msf-hidden-form"), this.hiddenSubmitButton = this.hiddenForm.querySelector('input[type="submit"]'), this.form.querySelectorAll('[data-msf="hidden"]').forEach(function(S) {
            var k = u(S) ? S : S.querySelector("input, select, textarea");
            if (k && !f.hiddenForm.querySelector("#hidden-".concat(S.id))) {
              var Y = '<input type="hidden" id="hidden-'.concat(k.id, '" name="').concat(k.name, '" data-name="').concat(k.name, '" />');
              f.hiddenForm.insertAdjacentHTML("beforeend", Y);
            }
          }), window.Webflow && window.Webflow.destroy(), window.Webflow && window.Webflow.ready(), window.Webflow && ((c = window.Webflow.require("ix2")) === null || c === void 0 || c.init()));
        }
      } }]), d;
    }(), z = L;
    N.default = z;
    var P = {};
    function q(d, c) {
      if (!(d instanceof c)) throw new TypeError("Cannot call a class as a function");
    }
    var Q = P && P.__importDefault || function(d) {
      return d && d.__esModule ? d : { default: d };
    };
    Object.defineProperty(P, "__esModule", { value: !0 });
    var Z = Q(E), O = Q(N), $ = function d(c) {
      q(this, d), this.view = new O.default(c), this.controller = new Z.default(this.view);
    }, y = $;
    P.default = y;
    var v = {};
    r(v);
    function M(d) {
      var c = typeof d;
      return d != null && (c == "object" || c == "function");
    }
    var x = typeof n == "object" && n && n.Object === Object && n, V = typeof self == "object" && self && self.Object === Object && self, fe = x || V || Function("return this")(), xe = function() {
      return fe.Date.now();
    }, Ht = /\s/;
    function Re(d) {
      for (var c = d.length; c-- && Ht.test(d.charAt(c)); ) ;
      return c;
    }
    var Yt = /^\s+/;
    function H(d) {
      return d && d.slice(0, Re(d) + 1).replace(Yt, "");
    }
    var X = fe.Symbol, Pe = Object.prototype, Me = Pe.hasOwnProperty, le = Pe.toString, ke = X ? X.toStringTag : void 0;
    function No(d) {
      var c = Me.call(d, ke), f = d[ke];
      try {
        d[ke] = void 0;
        var T = !0;
      } catch {
      }
      var S = le.call(d);
      return T && (c ? d[ke] = f : delete d[ke]), S;
    }
    var Go = Object.prototype, Fo = Go.toString;
    function xo(d) {
      return Fo.call(d);
    }
    var ko = "[object Null]", qo = "[object Undefined]", br = X ? X.toStringTag : void 0;
    function Bo(d) {
      return d == null ? d === void 0 ? qo : ko : br && br in Object(d) ? No(d) : xo(d);
    }
    function Uo(d) {
      return d != null && typeof d == "object";
    }
    var Vo = "[object Symbol]";
    function Ho(d) {
      return typeof d == "symbol" || Uo(d) && Bo(d) == Vo;
    }
    var Dr = NaN, Yo = /^[-+]0x[0-9a-f]+$/i, zo = /^0b[01]+$/i, $o = /^0o[0-7]+$/i, Wo = parseInt;
    function wr(d) {
      if (typeof d == "number") return d;
      if (Ho(d)) return Dr;
      if (M(d)) {
        var c = typeof d.valueOf == "function" ? d.valueOf() : d;
        d = M(c) ? c + "" : c;
      }
      if (typeof d != "string") return d === 0 ? d : +d;
      d = H(d);
      var f = zo.test(d);
      return f || $o.test(d) ? Wo(d.slice(2), f ? 2 : 8) : Yo.test(d) ? Dr : +d;
    }
    var jo = "Expected a function", Xo = Math.max, Qo = Math.min;
    function Zo(d, c, f) {
      var T, S, k, Y, B, G, te = 0, W = !1, se = !1, j = !0;
      if (typeof d != "function") throw new TypeError(jo);
      function he(ce) {
        var ge = T, we = S;
        return T = S = void 0, te = ce, Y = d.apply(we, ge);
      }
      function re(ce) {
        var ge = ce - G;
        return G === void 0 || ge >= c || ge < 0 || se && ce - te >= k;
      }
      function Oe() {
        var ce = xe();
        if (re(ce)) return ct(ce);
        B = setTimeout(Oe, function(ge) {
          var we = c - (ge - G);
          return se ? Qo(we, k - (ge - te)) : we;
        }(ce));
      }
      function ct(ce) {
        return B = void 0, j && T ? he(ce) : (T = S = void 0, Y);
      }
      function ut() {
        var ce = xe(), ge = re(ce);
        if (T = arguments, S = this, G = ce, ge) {
          if (B === void 0) return function(we) {
            return te = we, B = setTimeout(Oe, c), W ? he(we) : Y;
          }(G);
          if (se) return clearTimeout(B), B = setTimeout(Oe, c), he(G);
        }
        return B === void 0 && (B = setTimeout(Oe, c)), Y;
      }
      return c = wr(c) || 0, M(f) && (W = !!f.leading, k = (se = "maxWait" in f) ? Xo(wr(f.maxWait) || 0, c) : k, j = "trailing" in f ? !!f.trailing : j), ut.cancel = function() {
        B !== void 0 && clearTimeout(B), te = 0, T = G = S = B = void 0;
      }, ut.flush = function() {
        return B === void 0 ? Y : ct(xe());
      }, ut;
    }
    v.default = Zo;
    var be = {};
    Object.defineProperty(be, "__esModule", { value: !0 });
    var at = (Ze = void 0, De = be.isFormElement = Ze, Tt = be.throwError = De, be.isVisible = Tt);
    be.convertToString = at;
    var Ze = function(d) {
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement || d instanceof HTMLTextAreaElement;
    };
    be.isFormElement = Ze;
    var De = function(d, c) {
      switch (c) {
        case "wrong-selector":
          throw new Error("The element with a selector ".concat(d, " has not been found. Please, check if you've set it correctly."));
        case "no-parent":
          throw new Error("The element with a selector ".concat(d, ` hasn't got any parent with the [data-logic="parent"] attibute.`));
        case "wrong-action":
          throw new Error("No action (or wrong action name) has been provided for the ".concat(d, " selector."));
        case "wrong-operator":
          throw new Error("The operator of the selector ".concat(d, " is not valid."));
      }
    };
    be.throwError = De;
    var Tt = function(d) {
      return !!(d.offsetWidth || d.offsetHeight || d.getClientRects().length);
    };
    be.isVisible = Tt, at = function(d) {
      return typeof d == "string" ? d : typeof d == "number" ? d.toString() : d ? "true" : "false";
    }, be.convertToString = at;
    var st = {};
    function Ko(d, c) {
      var f;
      if (typeof Symbol > "u" || d[Symbol.iterator] == null) {
        if (Array.isArray(d) || (f = Jo(d)) || c) {
          f && (d = f);
          var T = 0, S = function() {
          };
          return { s: S, n: function() {
            return T >= d.length ? { done: !0 } : { done: !1, value: d[T++] };
          }, e: function(G) {
            throw G;
          }, f: S };
        }
        throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
      }
      var k, Y = !0, B = !1;
      return { s: function() {
        f = d[Symbol.iterator]();
      }, n: function() {
        var G = f.next();
        return Y = G.done, G;
      }, e: function(G) {
        B = !0, k = G;
      }, f: function() {
        try {
          Y || f.return == null || f.return();
        } finally {
          if (B) throw k;
        }
      } };
    }
    function Jo(d, c) {
      if (d) {
        if (typeof d == "string") return Ar(d, c);
        var f = Object.prototype.toString.call(d).slice(8, -1);
        return f === "Object" && d.constructor && (f = d.constructor.name), f === "Map" || f === "Set" ? Array.from(d) : f === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f) ? Ar(d, c) : void 0;
      }
    }
    function Ar(d, c) {
      (c == null || c > d.length) && (c = d.length);
      for (var f = 0, T = new Array(c); f < c; f++) T[f] = d[f];
      return T;
    }
    function ei(d, c) {
      if (!(d instanceof c)) throw new TypeError("Cannot call a class as a function");
    }
    function ti(d, c) {
      for (var f = 0; f < c.length; f++) {
        var T = c[f];
        T.enumerable = T.enumerable || !1, T.configurable = !0, "value" in T && (T.writable = !0), Object.defineProperty(d, T.key, T);
      }
    }
    function ri(d, c, f) {
      return c && ti(d.prototype, c), d;
    }
    var ni = st && st.__importDefault || function(d) {
      return d && d.__esModule ? d : { default: d };
    };
    Object.defineProperty(st, "__esModule", { value: !0 });
    var oi = ni(v), ii = function() {
      function d(c) {
        ei(this, d), this.logicList = [], this.submitHiddenInputs = !1, this.checkConditionsOnLoad = !0, Object.assign(this, c), this.store = [], this.init();
      }
      return ri(d, [{ key: "init", value: function() {
        var c = this;
        this.logicList.forEach(function(f) {
          c.addEvents(f), f.actions.forEach(function(T) {
            c.storeInputData(T.selector, T.action);
          });
        });
      } }, { key: "addEvents", value: function(c) {
        var f = this;
        c.conditions.forEach(function(T) {
          var S = document.querySelector(T.selector);
          if (Ze(S)) {
            var k = S.type === "radio" ? Array.from(document.querySelectorAll('input[name="'.concat(S.name, '"]'))) : [S];
            f.checkConditionsOnLoad && f.checkConditions(c);
            var Y = oi.default(f.checkConditions.bind(f), 200), B = ["email", "number", "password", "search", "tel", "text", "textarea", "url"];
            k.forEach(function(G) {
              G.addEventListener("input", function() {
                B.includes(S.type) ? Y(c) : f.checkConditions(c);
              });
            });
          } else De(T.selector, "wrong-selector");
        });
      } }, { key: "storeInputData", value: function(c, f) {
        var T = this;
        if (f !== "custom") {
          var S = document.querySelector(c);
          S instanceof HTMLElement ? this.getTargets(S).forEach(function(k) {
            var Y = { element: k, required: k.required, disabled: k.disabled };
            T.store.findIndex(function(B) {
              return B.element === k;
            }) === -1 && T.store.push(Y);
          }) : De(c, "wrong-selector");
        }
      } }, { key: "checkConditions", value: function(c) {
        var f, T = this, S = c.conditions, k = c.operator, Y = k === void 0 ? "and" : k, B = c.actions, G = !1, te = Ko(S);
        try {
          for (te.s(); !(f = te.n()).done; ) {
            var W = f.value, se = document.querySelector(W.selector);
            if (!Ze(se)) return void De(W.selector, "wrong-selector");
            var j = "";
            switch (se.type) {
              case "checkbox":
                j = at(se.checked);
                break;
              case "radio":
                var he = document.querySelector('input[name="'.concat(se.name, '"]:checked'));
                he instanceof HTMLInputElement && (j = he.value);
                break;
              default:
                j = se.value;
            }
            var re = at(W.value);
            switch (W.operator) {
              case "equal":
                G = j === re;
                break;
              case "not-equal":
                G = j !== re;
                break;
              case "contain":
                G = !!j.includes(re);
                break;
              case "not-contain":
                G = !j.includes(re);
                break;
              case "greater":
                G = +j > +re;
                break;
              case "greater-equal":
                G = +j >= +re;
                break;
              case "less":
                G = +j < +re;
                break;
              case "less-equal":
                G = +j <= +re;
                break;
              case "empty":
                G = j.length === 0;
                break;
              case "filled":
                G = j.length > 0;
                break;
              default:
                De(W.selector, "wrong-operator");
            }
            if (Y === "and" && !G || Y === "or" && G) break;
          }
        } catch (Oe) {
          te.e(Oe);
        } finally {
          te.f();
        }
        G && B.forEach(function(Oe) {
          T.triggerAction(Oe);
        });
      } }, { key: "triggerAction", value: function(c) {
        var f = this, T = c.selector, S = c.action, k = c.clear, Y = k !== void 0 && k, B = document.querySelector(T);
        if (B instanceof HTMLElement) if (S !== "custom") {
          var G = this.getTargets(B), te = !1;
          G.forEach(function(W) {
            var se = f.getStoredData(W), j = se.required, he = se.disabled, re = Tt(W);
            switch (te || (te = f.triggerInteraction(B, S)), S) {
              case "show":
                f.showInput(W, B, te, j, he);
                break;
              case "hide":
                f.hideInput(W, B, te);
                break;
              case "enable":
                f.enableInput(W, re);
                break;
              case "disable":
                f.disableInput(W, re);
                break;
              case "require":
                f.requireInput(W, re);
                break;
              case "unrequire":
                f.unrequireInput(W, re);
                break;
              default:
                De(T, "wrong-action");
            }
            Y && f.clearInput(W);
          });
        } else this.triggerInteraction(B, S);
        else De(T, "wrong-selector");
      } }, { key: "showInput", value: function(c, f, T, S, k) {
        T || (f.style.display = "block"), c.required = S, c.disabled = k;
      } }, { key: "hideInput", value: function(c, f, T) {
        T || (f.style.display = "none"), this.submitHiddenInputs || (c.disabled = !0), c.required = !1;
      } }, { key: "enableInput", value: function(c, f) {
        f && (c.disabled = !1), this.updateStoredData(c, "disabled", !1);
      } }, { key: "disableInput", value: function(c, f) {
        f && (c.disabled = !0), this.updateStoredData(c, "disabled", !0);
      } }, { key: "requireInput", value: function(c, f) {
        f && (c.required = !0), this.updateStoredData(c, "required", !0);
      } }, { key: "unrequireInput", value: function(c, f) {
        f && (c.required = !1), this.updateStoredData(c, "required", !1);
      } }, { key: "getTargets", value: function(c) {
        return Ze(c) ? [c] : Array.from(c.querySelectorAll("input, select, textarea"));
      } }, { key: "triggerInteraction", value: function(c, f) {
        var T = f === "custom" ? c : c.querySelector(':scope > [data-logic="'.concat(f, '"]'));
        return T instanceof HTMLElement && (T.click(), !0);
      } }, { key: "clearInput", value: function(c) {
        c.type === "checkbox" || c.type === "radio" ? c.checked = !1 : c.value = "";
      } }, { key: "updateStoredData", value: function(c, f, T) {
        var S = this.store.findIndex(function(k) {
          return k.element === c;
        });
        S > -1 && (this.store[S][f] = T);
      } }, { key: "getStoredData", value: function(c) {
        return this.store.find(function(f) {
          return f.element === c;
        });
      } }]), d;
    }(), ai = ii;
    st.default = ai;
    var lt = {}, Lr = lt && lt.__importDefault || function(d) {
      return d && d.__esModule ? d : { default: d };
    };
    Object.defineProperty(lt, "__esModule", { value: !0 });
    var si = Lr(P), li = Lr(st);
    lt = { MSF: si.default, Logic: li.default }, e.exports = lt;
  })();
})(Fn);
var ci = Fn.exports;
function xn(e) {
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", e) : e();
}
var ui = typeof global == "object" && global && global.Object === Object && global, di = typeof self == "object" && self && self.Object === Object && self, lr = ui || di || Function("return this")(), rt = lr.Symbol, kn = Object.prototype, pi = kn.hasOwnProperty, fi = kn.toString, dt = rt ? rt.toStringTag : void 0;
function Ei(e) {
  var t = pi.call(e, dt), r = e[dt];
  try {
    e[dt] = void 0;
    var n = !0;
  } catch {
  }
  var o = fi.call(e);
  return n && (t ? e[dt] = r : delete e[dt]), o;
}
var hi = Object.prototype, mi = hi.toString;
function _i(e) {
  return mi.call(e);
}
var Ti = "[object Null]", Ii = "[object Undefined]", Br = rt ? rt.toStringTag : void 0;
function qn(e) {
  return e == null ? e === void 0 ? Ii : Ti : Br && Br in Object(e) ? Ei(e) : _i(e);
}
function gi(e) {
  return e != null && typeof e == "object";
}
var yi = "[object Symbol]";
function cr(e) {
  return typeof e == "symbol" || gi(e) && qn(e) == yi;
}
function Si(e, t) {
  for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; ) o[r] = t(e[r], r, e);
  return o;
}
var ur = Array.isArray, vi = 1 / 0, Ur = rt ? rt.prototype : void 0, Vr = Ur ? Ur.toString : void 0;
function Bn(e) {
  if (typeof e == "string") return e;
  if (ur(e)) return Si(e, Bn) + "";
  if (cr(e)) return Vr ? Vr.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -vi ? "-0" : t;
}
function wt(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Ri = "[object AsyncFunction]", Oi = "[object Function]", bi = "[object GeneratorFunction]", Di = "[object Proxy]";
function wi(e) {
  if (!wt(e)) return !1;
  var t = qn(e);
  return t == Oi || t == bi || t == Ri || t == Di;
}
var zt = lr["__core-js_shared__"], Hr = function() {
  var e = /[^.]+$/.exec(zt && zt.keys && zt.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Ai(e) {
  return !!Hr && Hr in e;
}
var Li = Function.prototype, Pi = Li.toString;
function Mi(e) {
  if (e != null) {
    try {
      return Pi.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Ci = /[\\^$.*+?()[\]{}|]/g, Ni = /^\[object .+?Constructor\]$/, Gi = Function.prototype, Fi = Object.prototype, xi = Gi.toString, ki = Fi.hasOwnProperty, qi = RegExp("^" + xi.call(ki).replace(Ci, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function Bi(e) {
  if (!wt(e) || Ai(e)) return !1;
  var t = wi(e) ? qi : Ni;
  return t.test(Mi(e));
}
function Ui(e, t) {
  return e == null ? void 0 : e[t];
}
function dr(e, t) {
  var r = Ui(e, t);
  return Bi(r) ? r : void 0;
}
var Yr = function() {
  try {
    var e = dr(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}(), Vi = 9007199254740991, Hi = /^(?:0|[1-9]\d*)$/;
function Yi(e, t) {
  var r = typeof e;
  return t = t ?? Vi, !!t && (r == "number" || r != "symbol" && Hi.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function zi(e, t, r) {
  t == "__proto__" && Yr ? Yr(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 }) : e[t] = r;
}
function Un(e, t) {
  return e === t || e !== e && t !== t;
}
var $i = Object.prototype, Wi = $i.hasOwnProperty;
function ji(e, t, r) {
  var n = e[t];
  (!(Wi.call(e, t) && Un(n, r)) || r === void 0 && !(t in e)) && zi(e, t, r);
}
var Xi = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Qi = /^\w*$/;
function Zi(e, t) {
  if (ur(e)) return !1;
  var r = typeof e;
  return r == "number" || r == "symbol" || r == "boolean" || e == null || cr(e) ? !0 : Qi.test(e) || !Xi.test(e) || t != null && e in Object(t);
}
var mt = dr(Object, "create");
function Ki() {
  this.__data__ = mt ? mt(null) : {}, this.size = 0;
}
function Ji(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var ea = "__lodash_hash_undefined__", ta = Object.prototype, ra = ta.hasOwnProperty;
function na(e) {
  var t = this.__data__;
  if (mt) {
    var r = t[e];
    return r === ea ? void 0 : r;
  }
  return ra.call(t, e) ? t[e] : void 0;
}
var oa = Object.prototype, ia = oa.hasOwnProperty;
function aa(e) {
  var t = this.__data__;
  return mt ? t[e] !== void 0 : ia.call(t, e);
}
var sa = "__lodash_hash_undefined__";
function la(e, t) {
  var r = this.__data__;
  return this.size += this.has(e) ? 0 : 1, r[e] = mt && t === void 0 ? sa : t, this;
}
function Be(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Be.prototype.clear = Ki, Be.prototype.delete = Ji, Be.prototype.get = na, Be.prototype.has = aa, Be.prototype.set = la;
function ca() {
  this.__data__ = [], this.size = 0;
}
function Nt(e, t) {
  for (var r = e.length; r--; ) if (Un(e[r][0], t)) return r;
  return -1;
}
var ua = Array.prototype, da = ua.splice;
function pa(e) {
  var t = this.__data__, r = Nt(t, e);
  if (r < 0) return !1;
  var n = t.length - 1;
  return r == n ? t.pop() : da.call(t, r, 1), --this.size, !0;
}
function fa(e) {
  var t = this.__data__, r = Nt(t, e);
  return r < 0 ? void 0 : t[r][1];
}
function Ea(e) {
  return Nt(this.__data__, e) > -1;
}
function ha(e, t) {
  var r = this.__data__, n = Nt(r, e);
  return n < 0 ? (++this.size, r.push([e, t])) : r[n][1] = t, this;
}
function Ke(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ke.prototype.clear = ca, Ke.prototype.delete = pa, Ke.prototype.get = fa, Ke.prototype.has = Ea, Ke.prototype.set = ha;
var ma = dr(lr, "Map");
function _a() {
  this.size = 0, this.__data__ = { hash: new Be(), map: new (ma || Ke)(), string: new Be() };
}
function Ta(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Gt(e, t) {
  var r = e.__data__;
  return Ta(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
}
function Ia(e) {
  var t = Gt(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function ga(e) {
  return Gt(this, e).get(e);
}
function ya(e) {
  return Gt(this, e).has(e);
}
function Sa(e, t) {
  var r = Gt(this, e), n = r.size;
  return r.set(e, t), this.size += r.size == n ? 0 : 1, this;
}
function Ue(e) {
  var t = -1, r = e == null ? 0 : e.length;
  for (this.clear(); ++t < r; ) {
    var n = e[t];
    this.set(n[0], n[1]);
  }
}
Ue.prototype.clear = _a, Ue.prototype.delete = Ia, Ue.prototype.get = ga, Ue.prototype.has = ya, Ue.prototype.set = Sa;
var va = "Expected a function";
function pr(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function") throw new TypeError(va);
  var r = function() {
    var n = arguments, o = t ? t.apply(this, n) : n[0], a = r.cache;
    if (a.has(o)) return a.get(o);
    var i = e.apply(this, n);
    return r.cache = a.set(o, i) || a, i;
  };
  return r.cache = new (pr.Cache || Ue)(), r;
}
pr.Cache = Ue;
var Ra = 500;
function Oa(e) {
  var t = pr(e, function(n) {
    return r.size === Ra && r.clear(), n;
  }), r = t.cache;
  return t;
}
var ba = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Da = /\\(\\)?/g, wa = Oa(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(ba, function(r, n, o, a) {
    t.push(o ? a.replace(Da, "$1") : n || r);
  }), t;
});
function Aa(e) {
  return e == null ? "" : Bn(e);
}
function Vn(e, t) {
  return ur(e) ? e : Zi(e, t) ? [e] : wa(Aa(e));
}
var La = 1 / 0;
function Hn(e) {
  if (typeof e == "string" || cr(e)) return e;
  var t = e + "";
  return t == "0" && 1 / e == -La ? "-0" : t;
}
function Pa(e, t) {
  t = Vn(t, e);
  for (var r = 0, n = t.length; e != null && r < n; ) e = e[Hn(t[r++])];
  return r && r == n ? e : void 0;
}
function Ma(e, t, r) {
  var n = e == null ? void 0 : Pa(e, t);
  return n === void 0 ? r : n;
}
function Ca(e, t, r, n) {
  if (!wt(e)) return e;
  t = Vn(t, e);
  for (var o = -1, a = t.length, i = a - 1, s = e; s != null && ++o < a; ) {
    var l = Hn(t[o]), u = r;
    if (l === "__proto__" || l === "constructor" || l === "prototype") return e;
    if (o != i) {
      var p = s[l];
      u = void 0, u === void 0 && (u = wt(p) ? p : Yi(t[o + 1]) ? [] : {});
    }
    ji(s, l, u), s = s[l];
  }
  return e;
}
function Na(e, t, r) {
  return e == null ? e : Ca(e, t, r);
}
class Ge {
  constructor(t) {
    if (t.dataset.refAsyncForm) return Ge.refs[t.dataset.refAsyncForm];
    this.ref = Math.random(), Ge.refs[this.ref] = this, t.dataset.refAsyncForm = this.ref, this.el = t, this.form = t.querySelector("form"), this.formSuccess = t.querySelector(".w-form-done"), this.formFail = t.querySelector(".w-form-fail"), this.submitButton = t.querySelector('[type="submit"]'), this.buttonText = this.getSubmitText(), this.waitingText = this.submitButton.dataset.wait, this.beforeSubmitHandlers = [], this.payloadHandlers = [], this.inputHandlers = [], this.onStateHandlers = [], this.el.addEventListener("submit", (r) => this.submit(r));
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
      if (!this.beforeSubmitHandlers.reduce((a, i) => i() && a, !0)) return;
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
      let o = n.name, a = n.value;
      n.type === "checkbox" && (a = n.checked), n.type === "radio" && !n.checked && (a = null);
      const i = n.dataset.checkboxGroup;
      i !== void 0 && (o = i, n.checked ? a = [n.name] : a = null);
      for (const m of this.inputHandlers) a = await m(n, a);
      if (a === null) continue;
      let s = [o];
      const l = n.dataset.group;
      l && s.unshift(l);
      const u = s.join("."), p = Ma(t, u);
      typeof p < "u" && (a = [p, a].flat()), Na(t, u, a);
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
Ge.refs = {}, window.AsyncForm = Ge, xn(() => {
  Array.from(document.querySelectorAll("[c-async-form]")).forEach((e) => new Ge(e));
});
/*!
* FilePond 4.30.6
* Licensed under MIT, https://opensource.org/licenses/MIT/
* Please visit https://pqina.nl/filepond/ for details.
*/
const Ga = (e) => e instanceof HTMLElement, Fa = (e, t = [], r = []) => {
  const n = { ...e }, o = [], a = [], i = () => ({ ...n }), s = () => {
    const E = [...o];
    return o.length = 0, E;
  }, l = () => {
    const E = [...a];
    a.length = 0, E.forEach(({ type: I, data: b }) => {
      u(I, b);
    });
  }, u = (E, I, b) => {
    if (b && !document.hidden) {
      a.push({ type: E, data: I });
      return;
    }
    _[E] && _[E](I), o.push({ type: E, data: I });
  }, p = (E, ...I) => h[E] ? h[E](...I) : null, m = { getState: i, processActionQueue: s, processDispatchQueue: l, dispatch: u, query: p };
  let h = {};
  t.forEach((E) => {
    h = { ...E(n), ...h };
  });
  let _ = {};
  return r.forEach((E) => {
    _ = { ...E(u, p, n), ..._ };
  }), m;
}, xa = (e, t, r) => {
  if (typeof r == "function") {
    e[t] = r;
    return;
  }
  Object.defineProperty(e, t, { ...r });
}, K = (e, t) => {
  for (const r in e) e.hasOwnProperty(r) && t(r, e[r]);
}, Fe = (e) => {
  const t = {};
  return K(e, (r) => {
    xa(t, r, e[r]);
  }), t;
}, ne = (e, t, r = null) => {
  if (r === null) return e.getAttribute(t) || e.hasAttribute(t);
  e.setAttribute(t, r);
}, ka = "http://www.w3.org/2000/svg", qa = ["svg", "path"], zr = (e) => qa.includes(e), At = (e, t, r = {}) => {
  typeof t == "object" && (r = t, t = null);
  const n = zr(e) ? document.createElementNS(ka, e) : document.createElement(e);
  return t && (zr(e) ? ne(n, "class", t) : n.className = t), K(r, (o, a) => {
    ne(n, o, a);
  }), n;
}, Ba = (e) => (t, r) => {
  typeof r < "u" && e.children[r] ? e.insertBefore(t, e.children[r]) : e.appendChild(t);
}, Ua = (e, t) => (r, n) => (typeof n < "u" ? t.splice(n, 0, r) : t.push(r), r), Va = (e, t) => (r) => (t.splice(t.indexOf(r), 1), r.element.parentNode && e.removeChild(r.element), r), Ha = typeof window < "u" && typeof window.document < "u", Yn = () => Ha, Ya = Yn() ? At("svg") : {}, za = "children" in Ya ? (e) => e.children.length : (e) => e.childNodes.length, zn = (e, t, r, n) => {
  const o = r[0] || e.left, a = r[1] || e.top, i = o + e.width, s = a + e.height * (n[1] || 1), l = { element: { ...e }, inner: { left: e.left, top: e.top, right: e.right, bottom: e.bottom }, outer: { left: o, top: a, right: i, bottom: s } };
  return t.filter((u) => !u.isRectIgnored()).map((u) => u.rect).forEach((u) => {
    $r(l.inner, { ...u.inner }), $r(l.outer, { ...u.outer });
  }), Wr(l.inner), l.outer.bottom += l.element.marginBottom, l.outer.right += l.element.marginRight, Wr(l.outer), l;
}, $r = (e, t) => {
  t.top += e.top, t.right += e.left, t.bottom += e.top, t.left += e.left, t.bottom > e.bottom && (e.bottom = t.bottom), t.right > e.right && (e.right = t.right);
}, Wr = (e) => {
  e.width = e.right - e.left, e.height = e.bottom - e.top;
}, Ve = (e) => typeof e == "number", $a = (e, t, r, n = 1e-3) => Math.abs(e - t) < n && Math.abs(r) < n, Wa = ({ stiffness: e = 0.5, damping: t = 0.75, mass: r = 10 } = {}) => {
  let n = null, o = null, a = 0, i = !1;
  const s = Fe({ interpolate: (l, u) => {
    if (i) return;
    if (!(Ve(n) && Ve(o))) {
      i = !0, a = 0;
      return;
    }
    const p = -(o - n) * e;
    a += p / r, o += a, a *= t, $a(o, n, a) || u ? (o = n, a = 0, i = !0, s.onupdate(o), s.oncomplete(o)) : s.onupdate(o);
  }, target: { set: (l) => {
    if (Ve(l) && !Ve(o) && (o = l), n === null && (n = l, o = l), n = l, o === n || typeof n > "u") {
      i = !0, a = 0, s.onupdate(o), s.oncomplete(o);
      return;
    }
    i = !1;
  }, get: () => n }, resting: { get: () => i }, onupdate: (l) => {
  }, oncomplete: (l) => {
  } });
  return s;
}, ja = (e) => e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e, Xa = ({ duration: e = 500, easing: t = ja, delay: r = 0 } = {}) => {
  let n = null, o, a, i = !0, s = !1, l = null;
  const u = Fe({ interpolate: (p, m) => {
    i || l === null || (n === null && (n = p), !(p - n < r) && (o = p - n - r, o >= e || m ? (o = 1, a = s ? 0 : 1, u.onupdate(a * l), u.oncomplete(a * l), i = !0) : (a = o / e, u.onupdate((o >= 0 ? t(s ? 1 - a : a) : 0) * l))));
  }, target: { get: () => s ? 0 : l, set: (p) => {
    if (l === null) {
      l = p, u.onupdate(p), u.oncomplete(p);
      return;
    }
    p < l ? (l = 1, s = !0) : (s = !1, l = p), i = !1, n = null;
  } }, resting: { get: () => i }, onupdate: (p) => {
  }, oncomplete: (p) => {
  } });
  return u;
}, jr = { spring: Wa, tween: Xa }, Qa = (e, t, r) => {
  const n = e[t] && typeof e[t][r] == "object" ? e[t][r] : e[t] || e, o = typeof n == "string" ? n : n.type, a = typeof n == "object" ? { ...n } : {};
  return jr[o] ? jr[o](a) : null;
}, fr = (e, t, r, n = !1) => {
  t = Array.isArray(t) ? t : [t], t.forEach((o) => {
    e.forEach((a) => {
      let i = a, s = () => r[a], l = (u) => r[a] = u;
      typeof a == "object" && (i = a.key, s = a.getter || s, l = a.setter || l), !(o[i] && !n) && (o[i] = { get: s, set: l });
    });
  });
}, Za = ({ mixinConfig: e, viewProps: t, viewInternalAPI: r, viewExternalAPI: n }) => {
  const o = { ...t }, a = [];
  return K(e, (i, s) => {
    const l = Qa(s);
    l && (l.onupdate = (u) => {
      t[i] = u;
    }, l.target = o[i], fr([{ key: i, setter: (u) => {
      l.target !== u && (l.target = u);
    }, getter: () => t[i] }], [r, n], t, !0), a.push(l));
  }), { write: (i) => {
    let s = document.hidden, l = !0;
    return a.forEach((u) => {
      u.resting || (l = !1), u.interpolate(i, s);
    }), l;
  }, destroy: () => {
  } };
}, Ka = (e) => (t, r) => {
  e.addEventListener(t, r);
}, Ja = (e) => (t, r) => {
  e.removeEventListener(t, r);
}, es = ({ mixinConfig: e, viewProps: t, viewInternalAPI: r, viewExternalAPI: n, viewState: o, view: a }) => {
  const i = [], s = Ka(a.element), l = Ja(a.element);
  return n.on = (u, p) => {
    i.push({ type: u, fn: p }), s(u, p);
  }, n.off = (u, p) => {
    i.splice(i.findIndex((m) => m.type === u && m.fn === p), 1), l(u, p);
  }, { write: () => !0, destroy: () => {
    i.forEach((u) => {
      l(u.type, u.fn);
    });
  } };
}, ts = ({ mixinConfig: e, viewProps: t, viewExternalAPI: r }) => {
  fr(e, r, t);
}, ue = (e) => e != null, rs = { opacity: 1, scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, rotateX: 0, rotateY: 0, rotateZ: 0, originX: 0, originY: 0 }, ns = ({ mixinConfig: e, viewProps: t, viewInternalAPI: r, viewExternalAPI: n, view: o }) => {
  const a = { ...t }, i = {};
  fr(e, [r, n], t);
  const s = () => [t.translateX || 0, t.translateY || 0], l = () => [t.scaleX || 0, t.scaleY || 0], u = () => o.rect ? zn(o.rect, o.childViews, s(), l()) : null;
  return r.rect = { get: u }, n.rect = { get: u }, e.forEach((p) => {
    t[p] = typeof a[p] > "u" ? rs[p] : a[p];
  }), { write: () => {
    if (os(i, t)) return is(o.element, t), Object.assign(i, { ...t }), !0;
  }, destroy: () => {
  } };
}, os = (e, t) => {
  if (Object.keys(e).length !== Object.keys(t).length) return !0;
  for (const r in t) if (t[r] !== e[r]) return !0;
  return !1;
}, is = (e, { opacity: t, perspective: r, translateX: n, translateY: o, scaleX: a, scaleY: i, rotateX: s, rotateY: l, rotateZ: u, originX: p, originY: m, width: h, height: _ }) => {
  let E = "", I = "";
  (ue(p) || ue(m)) && (I += `transform-origin: ${p || 0}px ${m || 0}px;`), ue(r) && (E += `perspective(${r}px) `), (ue(n) || ue(o)) && (E += `translate3d(${n || 0}px, ${o || 0}px, 0) `), (ue(a) || ue(i)) && (E += `scale3d(${ue(a) ? a : 1}, ${ue(i) ? i : 1}, 1) `), ue(u) && (E += `rotateZ(${u}rad) `), ue(s) && (E += `rotateX(${s}rad) `), ue(l) && (E += `rotateY(${l}rad) `), E.length && (I += `transform:${E};`), ue(t) && (I += `opacity:${t};`, t === 0 && (I += "visibility:hidden;"), t < 1 && (I += "pointer-events:none;")), ue(_) && (I += `height:${_}px;`), ue(h) && (I += `width:${h}px;`);
  const b = e.elementCurrentStyle || "";
  (I.length !== b.length || I !== b) && (e.style.cssText = I, e.elementCurrentStyle = I);
}, as = { styles: ns, listeners: es, animations: Za, apis: ts }, Xr = (e = {}, t = {}, r = {}) => (t.layoutCalculated || (e.paddingTop = parseInt(r.paddingTop, 10) || 0, e.marginTop = parseInt(r.marginTop, 10) || 0, e.marginRight = parseInt(r.marginRight, 10) || 0, e.marginBottom = parseInt(r.marginBottom, 10) || 0, e.marginLeft = parseInt(r.marginLeft, 10) || 0, t.layoutCalculated = !0), e.left = t.offsetLeft || 0, e.top = t.offsetTop || 0, e.width = t.offsetWidth || 0, e.height = t.offsetHeight || 0, e.right = e.left + e.width, e.bottom = e.top + e.height, e.scrollTop = t.scrollTop, e.hidden = t.offsetParent === null, e), oe = ({ tag: e = "div", name: t = null, attributes: r = {}, read: n = () => {
}, write: o = () => {
}, create: a = () => {
}, destroy: i = () => {
}, filterFrameActionsForChild: s = (_, E) => E, didCreateView: l = () => {
}, didWriteView: u = () => {
}, ignoreRect: p = !1, ignoreRectUpdate: m = !1, mixins: h = [] } = {}) => (_, E = {}) => {
  const I = At(e, `filepond--${t}`, r), b = window.getComputedStyle(I, null), R = Xr();
  let D = null, C = !1;
  const N = [], A = [], F = {}, w = {}, L = [o], z = [n], P = [i], q = () => I, Q = () => N.concat(), Z = () => F, O = (H) => (X, Pe) => X(H, Pe), $ = () => D || (D = zn(R, N, [0, 0], [1, 1]), D), y = () => b, v = () => {
    D = null, N.forEach((X) => X._read()), !(m && R.width && R.height) && Xr(R, I, b);
    const H = { root: Re, props: E, rect: R };
    z.forEach((X) => X(H));
  }, M = (H, X, Pe) => {
    let Me = X.length === 0;
    return L.forEach((le) => {
      le({ props: E, root: Re, actions: X, timestamp: H, shouldOptimize: Pe }) === !1 && (Me = !1);
    }), A.forEach((le) => {
      le.write(H) === !1 && (Me = !1);
    }), N.filter((le) => !!le.element.parentNode).forEach((le) => {
      le._write(H, s(le, X), Pe) || (Me = !1);
    }), N.forEach((le, ke) => {
      le.element.parentNode || (Re.appendChild(le.element, ke), le._read(), le._write(H, s(le, X), Pe), Me = !1);
    }), C = Me, u({ props: E, root: Re, actions: X, timestamp: H }), Me;
  }, x = () => {
    A.forEach((H) => H.destroy()), P.forEach((H) => {
      H({ root: Re, props: E });
    }), N.forEach((H) => H._destroy());
  }, V = { element: { get: q }, style: { get: y }, childViews: { get: Q } }, fe = { ...V, rect: { get: $ }, ref: { get: Z }, is: (H) => t === H, appendChild: Ba(I), createChildView: O(_), linkView: (H) => (N.push(H), H), unlinkView: (H) => {
    N.splice(N.indexOf(H), 1);
  }, appendChildView: Ua(I, N), removeChildView: Va(I, N), registerWriter: (H) => L.push(H), registerReader: (H) => z.push(H), registerDestroyer: (H) => P.push(H), invalidateLayout: () => I.layoutCalculated = !1, dispatch: _.dispatch, query: _.query }, xe = { element: { get: q }, childViews: { get: Q }, rect: { get: $ }, resting: { get: () => C }, isRectIgnored: () => p, _read: v, _write: M, _destroy: x }, Ht = { ...V, rect: { get: () => R } };
  Object.keys(h).sort((H, X) => H === "styles" ? 1 : X === "styles" ? -1 : 0).forEach((H) => {
    const X = as[H]({ mixinConfig: h[H], viewProps: E, viewState: w, viewInternalAPI: fe, viewExternalAPI: xe, view: Fe(Ht) });
    X && A.push(X);
  });
  const Re = Fe(fe);
  a({ root: Re, props: E });
  const Yt = za(I);
  return N.forEach((H, X) => {
    Re.appendChild(H.element, Yt + X);
  }), l(Re), Fe(xe);
}, ss = (e, t, r = 60) => {
  const n = "__framePainter";
  if (window[n]) {
    window[n].readers.push(e), window[n].writers.push(t);
    return;
  }
  window[n] = { readers: [e], writers: [t] };
  const o = window[n], a = 1e3 / r;
  let i = null, s = null, l = null, u = null;
  const p = () => {
    document.hidden ? (l = () => window.setTimeout(() => m(performance.now()), a), u = () => window.clearTimeout(s)) : (l = () => window.requestAnimationFrame(m), u = () => window.cancelAnimationFrame(s));
  };
  document.addEventListener("visibilitychange", () => {
    u && u(), p(), m(performance.now());
  });
  const m = (h) => {
    s = l(m), i || (i = h);
    const _ = h - i;
    _ <= a || (i = h - _ % a, o.readers.forEach((E) => E()), o.writers.forEach((E) => E(h)));
  };
  return p(), m(performance.now()), { pause: () => {
    u(s);
  } };
}, pe = (e, t) => ({ root: r, props: n, actions: o = [], timestamp: a, shouldOptimize: i }) => {
  o.filter((s) => e[s.type]).forEach((s) => e[s.type]({ root: r, props: n, action: s.data, timestamp: a, shouldOptimize: i })), t && t({ root: r, props: n, actions: o, timestamp: a, shouldOptimize: i });
}, Qr = (e, t) => t.parentNode.insertBefore(e, t), Zr = (e, t) => t.parentNode.insertBefore(e, t.nextSibling), Ft = (e) => Array.isArray(e), Ae = (e) => e == null, ls = (e) => e.trim(), xt = (e) => "" + e, cs = (e, t = ",") => Ae(e) ? [] : Ft(e) ? e : xt(e).split(t).map(ls).filter((r) => r.length), $n = (e) => typeof e == "boolean", Wn = (e) => $n(e) ? e : e === "true", de = (e) => typeof e == "string", jn = (e) => Ve(e) ? e : de(e) ? xt(e).replace(/[a-z]+/gi, "") : 0, bt = (e) => parseInt(jn(e), 10), Kr = (e) => parseFloat(jn(e)), it = (e) => Ve(e) && isFinite(e) && Math.floor(e) === e, Jr = (e, t = 1e3) => {
  if (it(e)) return e;
  let r = xt(e).trim();
  return /MB$/i.test(r) ? (r = r.replace(/MB$i/, "").trim(), bt(r) * t * t) : /KB/i.test(r) ? (r = r.replace(/KB$i/, "").trim(), bt(r) * t) : bt(r);
}, He = (e) => typeof e == "function", us = (e) => {
  let t = self, r = e.split("."), n = null;
  for (; n = r.shift(); ) if (t = t[n], !t) return null;
  return t;
}, en = { process: "POST", patch: "PATCH", revert: "DELETE", fetch: "GET", restore: "GET", load: "GET" }, ds = (e) => {
  const t = {};
  return t.url = de(e) ? e : e.url || "", t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0, t.headers = e.headers ? e.headers : {}, K(en, (r) => {
    t[r] = ps(r, e[r], en[r], t.timeout, t.headers);
  }), t.process = e.process || de(e) || e.url ? t.process : null, t.remove = e.remove || null, delete t.headers, t;
}, ps = (e, t, r, n, o) => {
  if (t === null) return null;
  if (typeof t == "function") return t;
  const a = { url: r === "GET" || r === "PATCH" ? `?${e}=` : "", method: r, headers: o, withCredentials: !1, timeout: n, onload: null, ondata: null, onerror: null };
  if (de(t)) return a.url = t, a;
  if (Object.assign(a, t), de(a.headers)) {
    const i = a.headers.split(/:(.+)/);
    a.headers = { header: i[0], value: i[1] };
  }
  return a.withCredentials = Wn(a.withCredentials), a;
}, fs = (e) => ds(e), Es = (e) => e === null, ae = (e) => typeof e == "object" && e !== null, hs = (e) => ae(e) && de(e.url) && ae(e.process) && ae(e.revert) && ae(e.restore) && ae(e.fetch), Jt = (e) => Ft(e) ? "array" : Es(e) ? "null" : it(e) ? "int" : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e) ? "bytes" : hs(e) ? "api" : typeof e, ms = (e) => e.replace(/{\s*'/g, '{"').replace(/'\s*}/g, '"}').replace(/'\s*:/g, '":').replace(/:\s*'/g, ':"').replace(/,\s*'/g, ',"').replace(/'\s*,/g, '",'), _s = { array: cs, boolean: Wn, int: (e) => Jt(e) === "bytes" ? Jr(e) : bt(e), number: Kr, float: Kr, bytes: Jr, string: (e) => He(e) ? e : xt(e), function: (e) => us(e), serverapi: fs, object: (e) => {
  try {
    return JSON.parse(ms(e));
  } catch {
    return null;
  }
} }, Ts = (e, t) => _s[t](e), Xn = (e, t, r) => {
  if (e === t) return e;
  let n = Jt(e);
  if (n !== r) {
    const o = Ts(e, r);
    if (n = Jt(o), o === null) throw `Trying to assign value with incorrect type to "${option}", allowed type: "${r}"`;
    e = o;
  }
  return e;
}, Is = (e, t) => {
  let r = e;
  return { enumerable: !0, get: () => r, set: (n) => {
    r = Xn(n, e, t);
  } };
}, gs = (e) => {
  const t = {};
  return K(e, (r) => {
    const n = e[r];
    t[r] = Is(n[0], n[1]);
  }), Fe(t);
}, ys = (e) => ({ items: [], listUpdateTimeout: null, itemUpdateTimeout: null, processingQueue: [], options: gs(e) }), kt = (e, t = "-") => e.split(/(?=[A-Z])/).map((r) => r.toLowerCase()).join(t), Ss = (e, t) => {
  const r = {};
  return K(t, (n) => {
    r[n] = { get: () => e.getState().options[n], set: (o) => {
      e.dispatch(`SET_${kt(n, "_").toUpperCase()}`, { value: o });
    } };
  }), r;
}, vs = (e) => (t, r, n) => {
  const o = {};
  return K(e, (a) => {
    const i = kt(a, "_").toUpperCase();
    o[`SET_${i}`] = (s) => {
      try {
        n.options[a] = s.value;
      } catch {
      }
      t(`DID_SET_${i}`, { value: n.options[a] });
    };
  }), o;
}, Rs = (e) => (t) => {
  const r = {};
  return K(e, (n) => {
    r[`GET_${kt(n, "_").toUpperCase()}`] = (o) => t.options[n];
  }), r;
}, Ie = { API: 1, DROP: 2, BROWSE: 3, PASTE: 4, NONE: 5 }, Er = () => Math.random().toString(36).substring(2, 11), hr = (e, t) => e.splice(t, 1), Os = (e, t) => {
  t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0);
}, qt = () => {
  const e = [], t = (n, o) => {
    hr(e, e.findIndex((a) => a.event === n && (a.cb === o || !o)));
  }, r = (n, o, a) => {
    e.filter((i) => i.event === n).map((i) => i.cb).forEach((i) => Os(() => i(...o), a));
  };
  return { fireSync: (n, ...o) => {
    r(n, o, !0);
  }, fire: (n, ...o) => {
    r(n, o, !1);
  }, on: (n, o) => {
    e.push({ event: n, cb: o });
  }, onOnce: (n, o) => {
    e.push({ event: n, cb: (...a) => {
      t(n, o), o(...a);
    } });
  }, off: t };
}, Qn = (e, t, r) => {
  Object.getOwnPropertyNames(e).filter((n) => !r.includes(n)).forEach((n) => Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n)));
}, bs = ["fire", "process", "revert", "load", "on", "off", "onOnce", "retryLoad", "extend", "archive", "archived", "release", "released", "requestProcessing", "freeze"], Ee = (e) => {
  const t = {};
  return Qn(e, t, bs), t;
}, Ds = (e) => {
  e.forEach((t, r) => {
    t.released && hr(e, r);
  });
}, U = { INIT: 1, IDLE: 2, PROCESSING_QUEUED: 9, PROCESSING: 3, PROCESSING_COMPLETE: 5, PROCESSING_ERROR: 6, PROCESSING_REVERT_ERROR: 10, LOADING: 7, LOAD_ERROR: 8 }, ie = { INPUT: 1, LIMBO: 2, LOCAL: 3 }, Zn = (e) => /[^0-9]+/.exec(e), Kn = () => Zn(1.1.toLocaleString())[0], ws = () => {
  const e = Kn(), t = 1e3.toLocaleString();
  return t !== "1000" ? Zn(t)[0] : e === "." ? "," : ".";
}, g = { BOOLEAN: "boolean", INT: "int", NUMBER: "number", STRING: "string", ARRAY: "array", OBJECT: "object", FUNCTION: "function", ACTION: "action", SERVER_API: "serverapi", REGEX: "regex" }, mr = [], ye = (e, t, r) => new Promise((n, o) => {
  const a = mr.filter((s) => s.key === e).map((s) => s.cb);
  if (a.length === 0) {
    n(t);
    return;
  }
  const i = a.shift();
  a.reduce((s, l) => s.then((u) => l(u, r)), i(t, r)).then((s) => n(s)).catch((s) => o(s));
}), Xe = (e, t, r) => mr.filter((n) => n.key === e).map((n) => n.cb(t, r)), As = (e, t) => mr.push({ key: e, cb: t }), Ls = (e) => Object.assign(Je, e), Lt = () => ({ ...Je }), Ps = (e) => {
  K(e, (t, r) => {
    Je[t] && (Je[t][0] = Xn(r, Je[t][0], Je[t][1]));
  });
}, Je = { id: [null, g.STRING], name: ["filepond", g.STRING], disabled: [!1, g.BOOLEAN], className: [null, g.STRING], required: [!1, g.BOOLEAN], captureMethod: [null, g.STRING], allowSyncAcceptAttribute: [!0, g.BOOLEAN], allowDrop: [!0, g.BOOLEAN], allowBrowse: [!0, g.BOOLEAN], allowPaste: [!0, g.BOOLEAN], allowMultiple: [!1, g.BOOLEAN], allowReplace: [!0, g.BOOLEAN], allowRevert: [!0, g.BOOLEAN], allowRemove: [!0, g.BOOLEAN], allowProcess: [!0, g.BOOLEAN], allowReorder: [!1, g.BOOLEAN], allowDirectoriesOnly: [!1, g.BOOLEAN], storeAsFile: [!1, g.BOOLEAN], forceRevert: [!1, g.BOOLEAN], maxFiles: [null, g.INT], checkValidity: [!1, g.BOOLEAN], itemInsertLocationFreedom: [!0, g.BOOLEAN], itemInsertLocation: ["before", g.STRING], itemInsertInterval: [75, g.INT], dropOnPage: [!1, g.BOOLEAN], dropOnElement: [!0, g.BOOLEAN], dropValidation: [!1, g.BOOLEAN], ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], g.ARRAY], instantUpload: [!0, g.BOOLEAN], maxParallelUploads: [2, g.INT], allowMinimumUploadDuration: [!0, g.BOOLEAN], chunkUploads: [!1, g.BOOLEAN], chunkForce: [!1, g.BOOLEAN], chunkSize: [5e6, g.INT], chunkRetryDelays: [[500, 1e3, 3e3], g.ARRAY], server: [null, g.SERVER_API], fileSizeBase: [1e3, g.INT], labelFileSizeBytes: ["bytes", g.STRING], labelFileSizeKilobytes: ["KB", g.STRING], labelFileSizeMegabytes: ["MB", g.STRING], labelFileSizeGigabytes: ["GB", g.STRING], labelDecimalSeparator: [Kn(), g.STRING], labelThousandsSeparator: [ws(), g.STRING], labelIdle: ['Drag & Drop your files or <span class="filepond--label-action">Browse</span>', g.STRING], labelInvalidField: ["Field contains invalid files", g.STRING], labelFileWaitingForSize: ["Waiting for size", g.STRING], labelFileSizeNotAvailable: ["Size not available", g.STRING], labelFileCountSingular: ["file in list", g.STRING], labelFileCountPlural: ["files in list", g.STRING], labelFileLoading: ["Loading", g.STRING], labelFileAdded: ["Added", g.STRING], labelFileLoadError: ["Error during load", g.STRING], labelFileRemoved: ["Removed", g.STRING], labelFileRemoveError: ["Error during remove", g.STRING], labelFileProcessing: ["Uploading", g.STRING], labelFileProcessingComplete: ["Upload complete", g.STRING], labelFileProcessingAborted: ["Upload cancelled", g.STRING], labelFileProcessingError: ["Error during upload", g.STRING], labelFileProcessingRevertError: ["Error during revert", g.STRING], labelTapToCancel: ["tap to cancel", g.STRING], labelTapToRetry: ["tap to retry", g.STRING], labelTapToUndo: ["tap to undo", g.STRING], labelButtonRemoveItem: ["Remove", g.STRING], labelButtonAbortItemLoad: ["Abort", g.STRING], labelButtonRetryItemLoad: ["Retry", g.STRING], labelButtonAbortItemProcessing: ["Cancel", g.STRING], labelButtonUndoItemProcessing: ["Undo", g.STRING], labelButtonRetryItemProcessing: ["Retry", g.STRING], labelButtonProcessItem: ["Upload", g.STRING], iconRemove: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], iconProcess: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>', g.STRING], iconRetry: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], iconUndo: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], iconDone: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], oninit: [null, g.FUNCTION], onwarning: [null, g.FUNCTION], onerror: [null, g.FUNCTION], onactivatefile: [null, g.FUNCTION], oninitfile: [null, g.FUNCTION], onaddfilestart: [null, g.FUNCTION], onaddfileprogress: [null, g.FUNCTION], onaddfile: [null, g.FUNCTION], onprocessfilestart: [null, g.FUNCTION], onprocessfileprogress: [null, g.FUNCTION], onprocessfileabort: [null, g.FUNCTION], onprocessfilerevert: [null, g.FUNCTION], onprocessfile: [null, g.FUNCTION], onprocessfiles: [null, g.FUNCTION], onremovefile: [null, g.FUNCTION], onpreparefile: [null, g.FUNCTION], onupdatefiles: [null, g.FUNCTION], onreorderfiles: [null, g.FUNCTION], beforeDropFile: [null, g.FUNCTION], beforeAddFile: [null, g.FUNCTION], beforeRemoveFile: [null, g.FUNCTION], beforePrepareFile: [null, g.FUNCTION], stylePanelLayout: [null, g.STRING], stylePanelAspectRatio: [null, g.STRING], styleItemPanelAspectRatio: [null, g.STRING], styleButtonRemoveItemPosition: ["left", g.STRING], styleButtonProcessItemPosition: ["right", g.STRING], styleLoadIndicatorPosition: ["right", g.STRING], styleProgressIndicatorPosition: ["right", g.STRING], styleButtonRemoveItemAlign: [!1, g.BOOLEAN], files: [[], g.ARRAY], credits: [["https://pqina.nl/", "Powered by PQINA"], g.ARRAY] }, Ye = (e, t) => Ae(t) ? e[0] || null : it(t) ? e[t] || null : (typeof t == "object" && (t = t.id), e.find((r) => r.id === t) || null), Jn = (e) => {
  if (Ae(e)) return e;
  if (/:/.test(e)) {
    const t = e.split(":");
    return t[1] / t[0];
  }
  return parseFloat(e);
}, Se = (e) => e.filter((t) => !t.archived), eo = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 };
let gt = null;
const Ms = () => {
  if (gt === null) try {
    const e = new DataTransfer();
    e.items.add(new File(["hello world"], "This_Works.txt"));
    const t = document.createElement("input");
    t.setAttribute("type", "file"), t.files = e.files, gt = t.files.length === 1;
  } catch {
    gt = !1;
  }
  return gt;
}, Cs = [U.LOAD_ERROR, U.PROCESSING_ERROR, U.PROCESSING_REVERT_ERROR], Ns = [U.LOADING, U.PROCESSING, U.PROCESSING_QUEUED, U.INIT], Gs = [U.PROCESSING_COMPLETE], Fs = (e) => Cs.includes(e.status), xs = (e) => Ns.includes(e.status), ks = (e) => Gs.includes(e.status), tn = (e) => ae(e.options.server) && (ae(e.options.server.process) || He(e.options.server.process)), qs = (e) => ({ GET_STATUS: () => {
  const t = Se(e.items), { EMPTY: r, ERROR: n, BUSY: o, IDLE: a, READY: i } = eo;
  return t.length === 0 ? r : t.some(Fs) ? n : t.some(xs) ? o : t.some(ks) ? i : a;
}, GET_ITEM: (t) => Ye(e.items, t), GET_ACTIVE_ITEM: (t) => Ye(Se(e.items), t), GET_ACTIVE_ITEMS: () => Se(e.items), GET_ITEMS: () => e.items, GET_ITEM_NAME: (t) => {
  const r = Ye(e.items, t);
  return r ? r.filename : null;
}, GET_ITEM_SIZE: (t) => {
  const r = Ye(e.items, t);
  return r ? r.fileSize : null;
}, GET_STYLES: () => Object.keys(e.options).filter((t) => /^style/.test(t)).map((t) => ({ name: t, value: e.options[t] })), GET_PANEL_ASPECT_RATIO: () => /circle/.test(e.options.stylePanelLayout) ? 1 : Jn(e.options.stylePanelAspectRatio), GET_ITEM_PANEL_ASPECT_RATIO: () => e.options.styleItemPanelAspectRatio, GET_ITEMS_BY_STATUS: (t) => Se(e.items).filter((r) => r.status === t), GET_TOTAL_ITEMS: () => Se(e.items).length, SHOULD_UPDATE_FILE_INPUT: () => e.options.storeAsFile && Ms() && !tn(e), IS_ASYNC: () => tn(e), GET_FILE_SIZE_LABELS: (t) => ({ labelBytes: t("GET_LABEL_FILE_SIZE_BYTES") || void 0, labelKilobytes: t("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0, labelMegabytes: t("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0, labelGigabytes: t("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0 }) }), Bs = (e) => {
  const t = Se(e.items).length;
  if (!e.options.allowMultiple) return t === 0;
  const r = e.options.maxFiles;
  return r === null || t < r;
}, to = (e, t, r) => Math.max(Math.min(r, e), t), Us = (e, t, r) => e.splice(t, 0, r), Vs = (e, t, r) => Ae(t) ? null : typeof r > "u" ? (e.push(t), t) : (r = to(r, 0, e.length), Us(e, r, t), t), er = (e) => /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(e), _t = (e) => `${e}`.split("/").pop().split("?").shift(), Bt = (e) => e.split(".").pop(), Hs = (e) => {
  if (typeof e != "string") return "";
  const t = e.split("/").pop();
  return /svg/.test(t) ? "svg" : /zip|compressed/.test(t) ? "zip" : /plain/.test(t) ? "txt" : /msword/.test(t) ? "doc" : /[a-z]+/.test(t) ? t === "jpeg" ? "jpg" : t : "";
}, pt = (e, t = "") => (t + e).slice(-t.length), ro = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${pt(e.getMonth() + 1, "00")}-${pt(e.getDate(), "00")}_${pt(e.getHours(), "00")}-${pt(e.getMinutes(), "00")}-${pt(e.getSeconds(), "00")}`, nt = (e, t, r = null, n = null) => {
  const o = typeof r == "string" ? e.slice(0, e.size, r) : e.slice(0, e.size, e.type);
  return o.lastModifiedDate = /* @__PURE__ */ new Date(), e._relativePath && (o._relativePath = e._relativePath), de(t) || (t = ro()), t && n === null && Bt(t) ? o.name = t : (n = n || Hs(o.type), o.name = t + (n ? "." + n : "")), o;
}, Ys = () => window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, no = (e, t) => {
  const r = Ys();
  if (r) {
    const n = new r();
    return n.append(e), n.getBlob(t);
  }
  return new Blob([e], { type: t });
}, zs = (e, t) => {
  const r = new ArrayBuffer(e.length), n = new Uint8Array(r);
  for (let o = 0; o < e.length; o++) n[o] = e.charCodeAt(o);
  return no(r, t);
}, oo = (e) => (/^data:(.+);/.exec(e) || [])[1] || null, $s = (e) => e.split(",")[1].replace(/\s/g, ""), Ws = (e) => atob($s(e)), js = (e) => {
  const t = oo(e), r = Ws(e);
  return zs(r, t);
}, Xs = (e, t, r) => nt(js(e), t, null, r), Qs = (e) => {
  if (!/^content-disposition:/i.test(e)) return null;
  const t = e.split(/filename=|filename\*=.+''/).splice(1).map((r) => r.trim().replace(/^["']|[;"']{0,2}$/g, "")).filter((r) => r.length);
  return t.length ? decodeURI(t[t.length - 1]) : null;
}, Zs = (e) => {
  if (/content-length:/i.test(e)) {
    const t = e.match(/[0-9]+/)[0];
    return t ? parseInt(t, 10) : null;
  }
  return null;
}, Ks = (e) => /x-content-transfer-id:/i.test(e) && (e.split(":")[1] || "").trim() || null, _r = (e) => {
  const t = { source: null, name: null, size: null }, r = e.split(`
`);
  for (let n of r) {
    const o = Qs(n);
    if (o) {
      t.name = o;
      continue;
    }
    const a = Zs(n);
    if (a) {
      t.size = a;
      continue;
    }
    const i = Ks(n);
    if (i) {
      t.source = i;
      continue;
    }
  }
  return t;
}, Js = (e) => {
  const t = { source: null, complete: !1, progress: 0, size: null, timestamp: null, duration: 0, request: null }, r = () => t.progress, n = () => {
    t.request && t.request.abort && t.request.abort();
  }, o = () => {
    const s = t.source;
    i.fire("init", s), s instanceof File ? i.fire("load", s) : s instanceof Blob ? i.fire("load", nt(s, s.name)) : er(s) ? i.fire("load", Xs(s)) : a(s);
  }, a = (s) => {
    if (!e) {
      i.fire("error", { type: "error", body: "Can't load URL", code: 400 });
      return;
    }
    t.timestamp = Date.now(), t.request = e(s, (l) => {
      t.duration = Date.now() - t.timestamp, t.complete = !0, l instanceof Blob && (l = nt(l, l.name || _t(s))), i.fire("load", l instanceof Blob ? l : l ? l.body : null);
    }, (l) => {
      i.fire("error", typeof l == "string" ? { type: "error", code: 0, body: l } : l);
    }, (l, u, p) => {
      if (p && (t.size = p), t.duration = Date.now() - t.timestamp, !l) {
        t.progress = null;
        return;
      }
      t.progress = u / p, i.fire("progress", t.progress);
    }, () => {
      i.fire("abort");
    }, (l) => {
      const u = _r(typeof l == "string" ? l : l.headers);
      i.fire("meta", { size: t.size || u.size, filename: u.name, source: u.source });
    });
  }, i = { ...qt(), setSource: (s) => t.source = s, getProgress: r, abort: n, load: o };
  return i;
}, rn = (e) => /GET|HEAD/.test(e), ze = (e, t, r) => {
  const n = { onheaders: () => {
  }, onprogress: () => {
  }, onload: () => {
  }, ontimeout: () => {
  }, onerror: () => {
  }, onabort: () => {
  }, abort: () => {
    o = !0, i.abort();
  } };
  let o = !1, a = !1;
  r = { method: "POST", headers: {}, withCredentials: !1, ...r }, t = encodeURI(t), rn(r.method) && e && (t = `${t}${encodeURIComponent(typeof e == "string" ? e : JSON.stringify(e))}`);
  const i = new XMLHttpRequest(), s = rn(r.method) ? i : i.upload;
  return s.onprogress = (l) => {
    o || n.onprogress(l.lengthComputable, l.loaded, l.total);
  }, i.onreadystatechange = () => {
    i.readyState < 2 || i.readyState === 4 && i.status === 0 || a || (a = !0, n.onheaders(i));
  }, i.onload = () => {
    i.status >= 200 && i.status < 300 ? n.onload(i) : n.onerror(i);
  }, i.onerror = () => n.onerror(i), i.onabort = () => {
    o = !0, n.onabort();
  }, i.ontimeout = () => n.ontimeout(i), i.open(r.method, t, !0), it(r.timeout) && (i.timeout = r.timeout), Object.keys(r.headers).forEach((l) => {
    const u = unescape(encodeURIComponent(r.headers[l]));
    i.setRequestHeader(l, u);
  }), r.responseType && (i.responseType = r.responseType), r.withCredentials && (i.withCredentials = !0), i.send(e), n;
}, J = (e, t, r, n) => ({ type: e, code: t, body: r, headers: n }), $e = (e) => (t) => {
  e(J("error", 0, "Timeout", t.getAllResponseHeaders()));
}, nn = (e) => /\?/.test(e), ht = (...e) => {
  let t = "";
  return e.forEach((r) => {
    t += nn(t) && nn(r) ? r.replace(/\?/, "&") : r;
  }), t;
}, $t = (e = "", t) => {
  if (typeof t == "function") return t;
  if (!t || !de(t.url)) return null;
  const r = t.onload || ((o) => o), n = t.onerror || ((o) => null);
  return (o, a, i, s, l, u) => {
    const p = ze(o, ht(e, t.url), { ...t, responseType: "blob" });
    return p.onload = (m) => {
      const h = m.getAllResponseHeaders(), _ = _r(h).name || _t(o);
      a(J("load", m.status, t.method === "HEAD" ? null : nt(r(m.response), _), h));
    }, p.onerror = (m) => {
      i(J("error", m.status, n(m.response) || m.statusText, m.getAllResponseHeaders()));
    }, p.onheaders = (m) => {
      u(J("headers", m.status, null, m.getAllResponseHeaders()));
    }, p.ontimeout = $e(i), p.onprogress = s, p.onabort = l, p;
  };
}, _e = { QUEUED: 0, COMPLETE: 1, PROCESSING: 2, ERROR: 3, WAITING: 4 }, el = (e, t, r, n, o, a, i, s, l, u, p) => {
  const m = [], { chunkTransferId: h, chunkServer: _, chunkSize: E, chunkRetryDelays: I } = p, b = { serverId: h, aborted: !1 }, R = t.ondata || ((O) => O), D = t.onload || ((O, $) => $ === "HEAD" ? O.getResponseHeader("Upload-Offset") : O.response), C = t.onerror || ((O) => null), N = (O) => {
    const $ = new FormData();
    ae(o) && $.append(r, JSON.stringify(o));
    const y = typeof t.headers == "function" ? t.headers(n, o) : { ...t.headers, "Upload-Length": n.size }, v = { ...t, headers: y }, M = ze(R($), ht(e, t.url), v);
    M.onload = (x) => O(D(x, v.method)), M.onerror = (x) => i(J("error", x.status, C(x.response) || x.statusText, x.getAllResponseHeaders())), M.ontimeout = $e(i);
  }, A = (O) => {
    const $ = ht(e, _.url, b.serverId), y = { headers: typeof t.headers == "function" ? t.headers(b.serverId) : { ...t.headers }, method: "HEAD" }, v = ze(null, $, y);
    v.onload = (M) => O(D(M, y.method)), v.onerror = (M) => i(J("error", M.status, C(M.response) || M.statusText, M.getAllResponseHeaders())), v.ontimeout = $e(i);
  }, F = Math.floor(n.size / E);
  for (let O = 0; O <= F; O++) {
    const $ = O * E, y = n.slice($, $ + E, "application/offset+octet-stream");
    m[O] = { index: O, size: y.size, offset: $, data: y, file: n, progress: 0, retries: [...I], status: _e.QUEUED, error: null, request: null, timeout: null };
  }
  const w = () => a(b.serverId), L = (O) => O.status === _e.QUEUED || O.status === _e.ERROR, z = (O) => {
    if (b.aborted) return;
    if (O = O || m.find(L), !O) {
      m.every((V) => V.status === _e.COMPLETE) && w();
      return;
    }
    O.status = _e.PROCESSING, O.progress = null;
    const $ = _.ondata || ((V) => V), y = _.onerror || ((V) => null), v = ht(e, _.url, b.serverId), M = typeof _.headers == "function" ? _.headers(O) : { ..._.headers, "Content-Type": "application/offset+octet-stream", "Upload-Offset": O.offset, "Upload-Length": n.size, "Upload-Name": n.name }, x = O.request = ze($(O.data), v, { ..._, headers: M });
    x.onload = () => {
      O.status = _e.COMPLETE, O.request = null, Q();
    }, x.onprogress = (V, fe, xe) => {
      O.progress = V ? fe : null, q();
    }, x.onerror = (V) => {
      O.status = _e.ERROR, O.request = null, O.error = y(V.response) || V.statusText, P(O) || i(J("error", V.status, y(V.response) || V.statusText, V.getAllResponseHeaders()));
    }, x.ontimeout = (V) => {
      O.status = _e.ERROR, O.request = null, P(O) || $e(i)(V);
    }, x.onabort = () => {
      O.status = _e.QUEUED, O.request = null, l();
    };
  }, P = (O) => O.retries.length === 0 ? !1 : (O.status = _e.WAITING, clearTimeout(O.timeout), O.timeout = setTimeout(() => {
    z(O);
  }, O.retries.shift()), !0), q = () => {
    const O = m.reduce((y, v) => y === null || v.progress === null ? null : y + v.progress, 0);
    if (O === null) return s(!1, 0, 0);
    const $ = m.reduce((y, v) => y + v.size, 0);
    s(!0, O, $);
  }, Q = () => {
    m.filter((O) => O.status === _e.PROCESSING).length >= 1 || z();
  }, Z = () => {
    m.forEach((O) => {
      clearTimeout(O.timeout), O.request && O.request.abort();
    });
  };
  return b.serverId ? A((O) => {
    b.aborted || (m.filter(($) => $.offset < O).forEach(($) => {
      $.status = _e.COMPLETE, $.progress = $.size;
    }), Q());
  }) : N((O) => {
    b.aborted || (u(O), b.serverId = O, Q());
  }), { abort: () => {
    b.aborted = !0, Z();
  } };
}, tl = (e, t, r, n) => (o, a, i, s, l, u, p) => {
  if (!o) return;
  const m = n.chunkUploads, h = m && o.size > n.chunkSize, _ = m && (h || n.chunkForce);
  if (o instanceof Blob && _) return el(e, t, r, o, a, i, s, l, u, p, n);
  const E = t.ondata || ((A) => A), I = t.onload || ((A) => A), b = t.onerror || ((A) => null), R = typeof t.headers == "function" ? t.headers(o, a) || {} : { ...t.headers }, D = { ...t, headers: R };
  var C = new FormData();
  ae(a) && C.append(r, JSON.stringify(a)), (o instanceof Blob ? [{ name: null, file: o }] : o).forEach((A) => {
    C.append(r, A.file, A.name === null ? A.file.name : `${A.name}${A.file.name}`);
  });
  const N = ze(E(C), ht(e, t.url), D);
  return N.onload = (A) => {
    i(J("load", A.status, I(A.response), A.getAllResponseHeaders()));
  }, N.onerror = (A) => {
    s(J("error", A.status, b(A.response) || A.statusText, A.getAllResponseHeaders()));
  }, N.ontimeout = $e(s), N.onprogress = l, N.onabort = u, N;
}, rl = (e = "", t, r, n) => typeof t == "function" ? (...o) => t(r, ...o, n) : !t || !de(t.url) ? null : tl(e, t, r, n), ft = (e = "", t) => {
  if (typeof t == "function") return t;
  if (!t || !de(t.url)) return (o, a) => a();
  const r = t.onload || ((o) => o), n = t.onerror || ((o) => null);
  return (o, a, i) => {
    const s = ze(o, e + t.url, t);
    return s.onload = (l) => {
      a(J("load", l.status, r(l.response), l.getAllResponseHeaders()));
    }, s.onerror = (l) => {
      i(J("error", l.status, n(l.response) || l.statusText, l.getAllResponseHeaders()));
    }, s.ontimeout = $e(i), s;
  };
}, io = (e = 0, t = 1) => e + Math.random() * (t - e), nl = (e, t = 1e3, r = 0, n = 25, o = 250) => {
  let a = null;
  const i = Date.now(), s = () => {
    let l = Date.now() - i, u = io(n, o);
    l + u > t && (u = l + u - t);
    let p = l / t;
    if (p >= 1 || document.hidden) {
      e(1);
      return;
    }
    e(p), a = setTimeout(s, u);
  };
  return t > 0 && s(), { clear: () => {
    clearTimeout(a);
  } };
}, ol = (e, t) => {
  const r = { complete: !1, perceivedProgress: 0, perceivedPerformanceUpdater: null, progress: null, timestamp: null, perceivedDuration: 0, duration: 0, request: null, response: null }, { allowMinimumUploadDuration: n } = t, o = (p, m) => {
    const h = () => {
      r.duration === 0 || r.progress === null || u.fire("progress", u.getProgress());
    }, _ = () => {
      r.complete = !0, u.fire("load-perceived", r.response.body);
    };
    u.fire("start"), r.timestamp = Date.now(), r.perceivedPerformanceUpdater = nl((E) => {
      r.perceivedProgress = E, r.perceivedDuration = Date.now() - r.timestamp, h(), r.response && r.perceivedProgress === 1 && !r.complete && _();
    }, n ? io(750, 1500) : 0), r.request = e(p, m, (E) => {
      r.response = ae(E) ? E : { type: "load", code: 200, body: `${E}`, headers: {} }, r.duration = Date.now() - r.timestamp, r.progress = 1, u.fire("load", r.response.body), (!n || n && r.perceivedProgress === 1) && _();
    }, (E) => {
      r.perceivedPerformanceUpdater.clear(), u.fire("error", ae(E) ? E : { type: "error", code: 0, body: `${E}` });
    }, (E, I, b) => {
      r.duration = Date.now() - r.timestamp, r.progress = E ? I / b : null, h();
    }, () => {
      r.perceivedPerformanceUpdater.clear(), u.fire("abort", r.response ? r.response.body : null);
    }, (E) => {
      u.fire("transfer", E);
    });
  }, a = () => {
    r.request && (r.perceivedPerformanceUpdater.clear(), r.request.abort && r.request.abort(), r.complete = !0);
  }, i = () => {
    a(), r.complete = !1, r.perceivedProgress = 0, r.progress = 0, r.timestamp = null, r.perceivedDuration = 0, r.duration = 0, r.request = null, r.response = null;
  }, s = n ? () => r.progress ? Math.min(r.progress, r.perceivedProgress) : null : () => r.progress || null, l = n ? () => Math.min(r.duration, r.perceivedDuration) : () => r.duration, u = { ...qt(), process: o, abort: a, getProgress: s, getDuration: l, reset: i };
  return u;
}, ao = (e) => e.substring(0, e.lastIndexOf(".")) || e, il = (e) => {
  let t = [e.name, e.size, e.type];
  return e instanceof Blob || er(e) ? t[0] = e.name || ro() : er(e) ? (t[1] = e.length, t[2] = oo(e)) : de(e) && (t[0] = _t(e), t[1] = 0, t[2] = "application/octet-stream"), { name: t[0], size: t[1], type: t[2] };
}, ot = (e) => !!(e instanceof File || e instanceof Blob && e.name), so = (e) => {
  if (!ae(e)) return e;
  const t = Ft(e) ? [] : {};
  for (const r in e) {
    if (!e.hasOwnProperty(r)) continue;
    const n = e[r];
    t[r] = n && ae(n) ? so(n) : n;
  }
  return t;
}, al = (e = null, t = null, r = null) => {
  const n = Er(), o = { archived: !1, frozen: !1, released: !1, source: null, file: r, serverFileReference: t, transferId: null, processingAborted: !1, status: t ? U.PROCESSING_COMPLETE : U.INIT, activeLoader: null, activeProcessor: null };
  let a = null;
  const i = {}, s = (w) => o.status = w, l = (w, ...L) => {
    o.released || o.frozen || A.fire(w, ...L);
  }, u = () => Bt(o.file.name), p = () => o.file.type, m = () => o.file.size, h = () => o.file, _ = (w, L, z) => {
    if (o.source = w, A.fireSync("init"), o.file) {
      A.fireSync("load-skip");
      return;
    }
    o.file = il(w), L.on("init", () => {
      l("load-init");
    }), L.on("meta", (P) => {
      o.file.size = P.size, o.file.filename = P.filename, P.source && (e = ie.LIMBO, o.serverFileReference = P.source, o.status = U.PROCESSING_COMPLETE), l("load-meta");
    }), L.on("progress", (P) => {
      s(U.LOADING), l("load-progress", P);
    }), L.on("error", (P) => {
      s(U.LOAD_ERROR), l("load-request-error", P);
    }), L.on("abort", () => {
      s(U.INIT), l("load-abort");
    }), L.on("load", (P) => {
      o.activeLoader = null;
      const q = (Z) => {
        o.file = ot(Z) ? Z : o.file, e === ie.LIMBO && o.serverFileReference ? s(U.PROCESSING_COMPLETE) : s(U.IDLE), l("load");
      }, Q = (Z) => {
        o.file = P, l("load-meta"), s(U.LOAD_ERROR), l("load-file-error", Z);
      };
      if (o.serverFileReference) {
        q(P);
        return;
      }
      z(P, q, Q);
    }), L.setSource(w), o.activeLoader = L, L.load();
  }, E = () => {
    o.activeLoader && o.activeLoader.load();
  }, I = () => {
    if (o.activeLoader) {
      o.activeLoader.abort();
      return;
    }
    s(U.INIT), l("load-abort");
  }, b = (w, L) => {
    if (o.processingAborted) {
      o.processingAborted = !1;
      return;
    }
    if (s(U.PROCESSING), a = null, !(o.file instanceof Blob)) {
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
      o.activeProcessor = null, o.transferId = null, o.serverFileReference = q, s(U.PROCESSING_COMPLETE), l("process-complete", q);
    }), w.on("start", () => {
      l("process-start");
    }), w.on("error", (q) => {
      o.activeProcessor = null, s(U.PROCESSING_ERROR), l("process-error", q);
    }), w.on("abort", (q) => {
      o.activeProcessor = null, o.serverFileReference = q, s(U.IDLE), l("process-abort"), a && a();
    }), w.on("progress", (q) => {
      l("process-progress", q);
    });
    const z = (q) => {
      o.archived || w.process(q, { ...i });
    }, P = console.error;
    L(o.file, z, P), o.activeProcessor = w;
  }, R = () => {
    o.processingAborted = !1, s(U.PROCESSING_QUEUED);
  }, D = () => new Promise((w) => {
    if (!o.activeProcessor) {
      o.processingAborted = !0, s(U.IDLE), l("process-abort"), w();
      return;
    }
    a = () => {
      w();
    }, o.activeProcessor.abort();
  }), C = (w, L) => new Promise((z, P) => {
    const q = o.serverFileReference !== null ? o.serverFileReference : o.transferId;
    if (q === null) {
      z();
      return;
    }
    w(q, () => {
      o.serverFileReference = null, o.transferId = null, z();
    }, (Q) => {
      if (!L) {
        z();
        return;
      }
      s(U.PROCESSING_REVERT_ERROR), l("process-revert-error"), P(Q);
    }), s(U.IDLE), l("process-revert");
  }), N = (w, L, z) => {
    const P = w.split("."), q = P[0], Q = P.pop();
    let Z = i;
    P.forEach((O) => Z = Z[O]), JSON.stringify(Z[Q]) !== JSON.stringify(L) && (Z[Q] = L, l("metadata-update", { key: q, value: i[q], silent: z }));
  }, A = { id: { get: () => n }, origin: { get: () => e, set: (w) => e = w }, serverId: { get: () => o.serverFileReference }, transferId: { get: () => o.transferId }, status: { get: () => o.status }, filename: { get: () => o.file.name }, filenameWithoutExtension: { get: () => ao(o.file.name) }, fileExtension: { get: u }, fileType: { get: p }, fileSize: { get: m }, file: { get: h }, relativePath: { get: () => o.file._relativePath }, source: { get: () => o.source }, getMetadata: (w) => so(w ? i[w] : i), setMetadata: (w, L, z) => {
    if (ae(w)) {
      const P = w;
      return Object.keys(P).forEach((q) => {
        N(q, P[q], L);
      }), w;
    }
    return N(w, L, z), L;
  }, extend: (w, L) => F[w] = L, abortLoad: I, retryLoad: E, requestProcessing: R, abortProcessing: D, load: _, process: b, revert: C, ...qt(), freeze: () => o.frozen = !0, release: () => o.released = !0, released: { get: () => o.released }, archive: () => o.archived = !0, archived: { get: () => o.archived } }, F = Fe(A);
  return F;
}, sl = (e, t) => Ae(t) ? 0 : de(t) ? e.findIndex((r) => r.id === t) : -1, on = (e, t) => {
  const r = sl(e, t);
  if (!(r < 0)) return e[r] || null;
}, ll = (e, t, r, n, o, a) => {
  const i = ze(null, e, { method: "GET", responseType: "blob" });
  return i.onload = (s) => {
    const l = s.getAllResponseHeaders(), u = _r(l).name || _t(e);
    t(J("load", s.status, nt(s.response, u), l));
  }, i.onerror = (s) => {
    r(J("error", s.status, s.statusText, s.getAllResponseHeaders()));
  }, i.onheaders = (s) => {
    a(J("headers", s.status, null, s.getAllResponseHeaders()));
  }, i.ontimeout = $e(r), i.onprogress = n, i.onabort = o, i;
}, an = (e) => (e.indexOf("//") === 0 && (e = location.protocol + e), e.toLowerCase().replace("blob:", "").replace(/([a-z])?:\/\//, "$1").split("/")[0]), cl = (e) => (e.indexOf(":") > -1 || e.indexOf("//") > -1) && an(location.href) !== an(e), yt = (e) => (...t) => He(e) ? e(...t) : e, ul = (e) => !ot(e.file), Wt = (e, t) => {
  clearTimeout(t.listUpdateTimeout), t.listUpdateTimeout = setTimeout(() => {
    e("DID_UPDATE_ITEMS", { items: Se(t.items) });
  }, 0);
}, sn = (e, ...t) => new Promise((r) => {
  if (!e) return r(!0);
  const n = e(...t);
  if (n == null) return r(!0);
  if (typeof n == "boolean") return r(n);
  typeof n.then == "function" && n.then(r);
}), jt = (e, t) => {
  e.items.sort((r, n) => t(Ee(r), Ee(n)));
}, Te = (e, t) => ({ query: r, success: n = () => {
}, failure: o = () => {
}, ...a } = {}) => {
  const i = Ye(e.items, r);
  if (!i) {
    o({ error: J("error", 0, "Item not found"), file: null });
    return;
  }
  t(i, n, o, a || {});
}, dl = (e, t, r) => ({ ABORT_ALL: () => {
  Se(r.items).forEach((n) => {
    n.freeze(), n.abortLoad(), n.abortProcessing();
  });
}, DID_SET_FILES: ({ value: n = [] }) => {
  const o = n.map((i) => ({ source: i.source ? i.source : i, options: i.options }));
  let a = Se(r.items);
  a.forEach((i) => {
    o.find((s) => s.source === i.source || s.source === i.file) || e("REMOVE_ITEM", { query: i, remove: !1 });
  }), a = Se(r.items), o.forEach((i, s) => {
    a.find((l) => l.source === i.source || l.file === i.source) || e("ADD_ITEM", { ...i, interactionMethod: Ie.NONE, index: s });
  });
}, DID_UPDATE_ITEM_METADATA: ({ id: n, action: o, change: a }) => {
  a.silent || (clearTimeout(r.itemUpdateTimeout), r.itemUpdateTimeout = setTimeout(() => {
    const i = on(r.items, n);
    if (!t("IS_ASYNC")) {
      ye("SHOULD_PREPARE_OUTPUT", !1, { item: i, query: t, action: o, change: a }).then((p) => {
        const m = t("GET_BEFORE_PREPARE_FILE");
        m && (p = m(i, p)), p && e("REQUEST_PREPARE_OUTPUT", { query: n, item: i, success: (h) => {
          e("DID_PREPARE_OUTPUT", { id: n, file: h });
        } }, !0);
      });
      return;
    }
    i.origin === ie.LOCAL && e("DID_LOAD_ITEM", { id: i.id, error: null, serverFileReference: i.source });
    const s = () => {
      setTimeout(() => {
        e("REQUEST_ITEM_PROCESSING", { query: n });
      }, 32);
    }, l = (p) => {
      i.revert(ft(r.options.server.url, r.options.server.revert), t("GET_FORCE_REVERT")).then(p ? s : () => {
      }).catch(() => {
      });
    }, u = (p) => {
      i.abortProcessing().then(p ? s : () => {
      });
    };
    if (i.status === U.PROCESSING_COMPLETE) return l(r.options.instantUpload);
    if (i.status === U.PROCESSING) return u(r.options.instantUpload);
    r.options.instantUpload && s();
  }, 0));
}, MOVE_ITEM: ({ query: n, index: o }) => {
  const a = Ye(r.items, n);
  if (!a) return;
  const i = r.items.indexOf(a);
  o = to(o, 0, r.items.length - 1), i !== o && r.items.splice(o, 0, r.items.splice(i, 1)[0]);
}, SORT: ({ compare: n }) => {
  jt(r, n), e("DID_SORT_ITEMS", { items: t("GET_ACTIVE_ITEMS") });
}, ADD_ITEMS: ({ items: n, index: o, interactionMethod: a, success: i = () => {
}, failure: s = () => {
} }) => {
  let l = o;
  if (o === -1 || typeof o > "u") {
    const h = t("GET_ITEM_INSERT_LOCATION"), _ = t("GET_TOTAL_ITEMS");
    l = h === "before" ? 0 : _;
  }
  const u = t("GET_IGNORED_FILES"), p = (h) => ot(h) ? !u.includes(h.name.toLowerCase()) : !Ae(h), m = n.filter(p).map((h) => new Promise((_, E) => {
    e("ADD_ITEM", { interactionMethod: a, source: h.source || h, success: _, failure: E, index: l++, options: h.options || {} });
  }));
  Promise.all(m).then(i).catch(s);
}, ADD_ITEM: ({ source: n, index: o = -1, interactionMethod: a, success: i = () => {
}, failure: s = () => {
}, options: l = {} }) => {
  if (Ae(n)) {
    s({ error: J("error", 0, "No source"), file: null });
    return;
  }
  if (ot(n) && r.options.ignoredFiles.includes(n.name.toLowerCase())) return;
  if (!Bs(r)) {
    if (r.options.allowMultiple || !r.options.allowMultiple && !r.options.allowReplace) {
      const D = J("warning", 0, "Max files");
      e("DID_THROW_MAX_FILES", { source: n, error: D }), s({ error: D, file: null });
      return;
    }
    const R = Se(r.items)[0];
    if (R.status === U.PROCESSING_COMPLETE || R.status === U.PROCESSING_REVERT_ERROR) {
      const D = t("GET_FORCE_REVERT");
      if (R.revert(ft(r.options.server.url, r.options.server.revert), D).then(() => {
        D && e("ADD_ITEM", { source: n, index: o, interactionMethod: a, success: i, failure: s, options: l });
      }).catch(() => {
      }), D) return;
    }
    e("REMOVE_ITEM", { query: R.id });
  }
  const u = l.type === "local" ? ie.LOCAL : l.type === "limbo" ? ie.LIMBO : ie.INPUT, p = al(u, u === ie.INPUT ? null : n, l.file);
  Object.keys(l.metadata || {}).forEach((R) => {
    p.setMetadata(R, l.metadata[R]);
  }), Xe("DID_CREATE_ITEM", p, { query: t, dispatch: e });
  const m = t("GET_ITEM_INSERT_LOCATION");
  r.options.itemInsertLocationFreedom || (o = m === "before" ? -1 : r.items.length), Vs(r.items, p, o), He(m) && n && jt(r, m);
  const h = p.id;
  p.on("init", () => {
    e("DID_INIT_ITEM", { id: h });
  }), p.on("load-init", () => {
    e("DID_START_ITEM_LOAD", { id: h });
  }), p.on("load-meta", () => {
    e("DID_UPDATE_ITEM_META", { id: h });
  }), p.on("load-progress", (R) => {
    e("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: h, progress: R });
  }), p.on("load-request-error", (R) => {
    const D = yt(r.options.labelFileLoadError)(R);
    if (R.code >= 400 && R.code < 500) {
      e("DID_THROW_ITEM_INVALID", { id: h, error: R, status: { main: D, sub: `${R.code} (${R.body})` } }), s({ error: R, file: Ee(p) });
      return;
    }
    e("DID_THROW_ITEM_LOAD_ERROR", { id: h, error: R, status: { main: D, sub: r.options.labelTapToRetry } });
  }), p.on("load-file-error", (R) => {
    e("DID_THROW_ITEM_INVALID", { id: h, error: R.status, status: R.status }), s({ error: R.status, file: Ee(p) });
  }), p.on("load-abort", () => {
    e("REMOVE_ITEM", { query: h });
  }), p.on("load-skip", () => {
    e("COMPLETE_LOAD_ITEM", { query: h, item: p, data: { source: n, success: i } });
  }), p.on("load", () => {
    const R = (D) => {
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
          e("COMPLETE_LOAD_ITEM", { query: h, item: p, data: { source: n, success: i } }), Wt(e, r);
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
      sn(t("GET_BEFORE_ADD_FILE"), Ee(p)).then(R);
    }).catch((D) => {
      if (!D || !D.error || !D.status) return R(!1);
      e("DID_THROW_ITEM_INVALID", { id: h, error: D.error, status: D.status });
    });
  }), p.on("process-start", () => {
    e("DID_START_ITEM_PROCESSING", { id: h });
  }), p.on("process-progress", (R) => {
    e("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: h, progress: R });
  }), p.on("process-error", (R) => {
    e("DID_THROW_ITEM_PROCESSING_ERROR", { id: h, error: R, status: { main: yt(r.options.labelFileProcessingError)(R), sub: r.options.labelTapToRetry } });
  }), p.on("process-revert-error", (R) => {
    e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", { id: h, error: R, status: { main: yt(r.options.labelFileProcessingRevertError)(R), sub: r.options.labelTapToRetry } });
  }), p.on("process-complete", (R) => {
    e("DID_COMPLETE_ITEM_PROCESSING", { id: h, error: null, serverFileReference: R }), e("DID_DEFINE_VALUE", { id: h, value: R });
  }), p.on("process-abort", () => {
    e("DID_ABORT_ITEM_PROCESSING", { id: h });
  }), p.on("process-revert", () => {
    e("DID_REVERT_ITEM_PROCESSING", { id: h }), e("DID_DEFINE_VALUE", { id: h, value: null });
  }), e("DID_ADD_ITEM", { id: h, index: o, interactionMethod: a }), Wt(e, r);
  const { url: _, load: E, restore: I, fetch: b } = r.options.server || {};
  p.load(n, Js(u === ie.INPUT ? de(n) && cl(n) && b ? $t(_, b) : ll : u === ie.LIMBO ? $t(_, I) : $t(_, E)), (R, D, C) => {
    ye("LOAD_FILE", R, { query: t }).then(D).catch(C);
  });
}, REQUEST_PREPARE_OUTPUT: ({ item: n, success: o, failure: a = () => {
} }) => {
  const i = { error: J("error", 0, "Item not found"), file: null };
  if (n.archived) return a(i);
  ye("PREPARE_OUTPUT", n.file, { query: t, item: n }).then((s) => {
    ye("COMPLETE_PREPARE_OUTPUT", s, { query: t, item: n }).then((l) => {
      if (n.archived) return a(i);
      o(l);
    });
  });
}, COMPLETE_LOAD_ITEM: ({ item: n, data: o }) => {
  const { success: a, source: i } = o, s = t("GET_ITEM_INSERT_LOCATION");
  if (He(s) && i && jt(r, s), e("DID_LOAD_ITEM", { id: n.id, error: null, serverFileReference: n.origin === ie.INPUT ? null : i }), a(Ee(n)), n.origin === ie.LOCAL) {
    e("DID_LOAD_LOCAL_ITEM", { id: n.id });
    return;
  }
  if (n.origin === ie.LIMBO) {
    e("DID_COMPLETE_ITEM_PROCESSING", { id: n.id, error: null, serverFileReference: i }), e("DID_DEFINE_VALUE", { id: n.id, value: n.serverId || i });
    return;
  }
  t("IS_ASYNC") && r.options.instantUpload && e("REQUEST_ITEM_PROCESSING", { query: n.id });
}, RETRY_ITEM_LOAD: Te(r, (n) => {
  n.retryLoad();
}), REQUEST_ITEM_PREPARE: Te(r, (n, o, a) => {
  e("REQUEST_PREPARE_OUTPUT", { query: n.id, item: n, success: (i) => {
    e("DID_PREPARE_OUTPUT", { id: n.id, file: i }), o({ file: n, output: i });
  }, failure: a }, !0);
}), REQUEST_ITEM_PROCESSING: Te(r, (n, o, a) => {
  if (!(n.status === U.IDLE || n.status === U.PROCESSING_ERROR)) {
    const i = () => e("REQUEST_ITEM_PROCESSING", { query: n, success: o, failure: a }), s = () => document.hidden ? i() : setTimeout(i, 32);
    n.status === U.PROCESSING_COMPLETE || n.status === U.PROCESSING_REVERT_ERROR ? n.revert(ft(r.options.server.url, r.options.server.revert), t("GET_FORCE_REVERT")).then(s).catch(() => {
    }) : n.status === U.PROCESSING && n.abortProcessing().then(s);
    return;
  }
  n.status !== U.PROCESSING_QUEUED && (n.requestProcessing(), e("DID_REQUEST_ITEM_PROCESSING", { id: n.id }), e("PROCESS_ITEM", { query: n, success: o, failure: a }, !0));
}), PROCESS_ITEM: Te(r, (n, o, a) => {
  const i = t("GET_MAX_PARALLEL_UPLOADS");
  if (t("GET_ITEMS_BY_STATUS", U.PROCESSING).length === i) {
    r.processingQueue.push({ id: n.id, success: o, failure: a });
    return;
  }
  if (n.status === U.PROCESSING) return;
  const s = () => {
    const u = r.processingQueue.shift();
    if (!u) return;
    const { id: p, success: m, failure: h } = u, _ = Ye(r.items, p);
    if (!_ || _.archived) {
      s();
      return;
    }
    e("PROCESS_ITEM", { query: p, success: m, failure: h }, !0);
  };
  n.onOnce("process-complete", () => {
    o(Ee(n)), s();
    const u = r.options.server;
    if (r.options.instantUpload && n.origin === ie.LOCAL && He(u.remove)) {
      const p = () => {
      };
      n.origin = ie.LIMBO, r.options.server.remove(n.source, p, p);
    }
    t("GET_ITEMS_BY_STATUS", U.PROCESSING_COMPLETE).length === r.items.length && e("DID_COMPLETE_ITEM_PROCESSING_ALL");
  }), n.onOnce("process-error", (u) => {
    a({ error: u, file: Ee(n) }), s();
  });
  const l = r.options;
  n.process(ol(rl(l.server.url, l.server.process, l.name, { chunkTransferId: n.transferId, chunkServer: l.server.patch, chunkUploads: l.chunkUploads, chunkForce: l.chunkForce, chunkSize: l.chunkSize, chunkRetryDelays: l.chunkRetryDelays }), { allowMinimumUploadDuration: t("GET_ALLOW_MINIMUM_UPLOAD_DURATION") }), (u, p, m) => {
    ye("PREPARE_OUTPUT", u, { query: t, item: n }).then((h) => {
      e("DID_PREPARE_OUTPUT", { id: n.id, file: h }), p(h);
    }).catch(m);
  });
}), RETRY_ITEM_PROCESSING: Te(r, (n) => {
  e("REQUEST_ITEM_PROCESSING", { query: n });
}), REQUEST_REMOVE_ITEM: Te(r, (n) => {
  sn(t("GET_BEFORE_REMOVE_FILE"), Ee(n)).then((o) => {
    o && e("REMOVE_ITEM", { query: n });
  });
}), RELEASE_ITEM: Te(r, (n) => {
  n.release();
}), REMOVE_ITEM: Te(r, (n, o, a, i) => {
  const s = () => {
    const u = n.id;
    on(r.items, u).archive(), e("DID_REMOVE_ITEM", { error: null, id: u, item: n }), Wt(e, r), o(Ee(n));
  }, l = r.options.server;
  n.origin === ie.LOCAL && l && He(l.remove) && i.remove !== !1 ? (e("DID_START_ITEM_REMOVE", { id: n.id }), l.remove(n.source, () => s(), (u) => {
    e("DID_THROW_ITEM_REMOVE_ERROR", { id: n.id, error: J("error", 0, u, null), status: { main: yt(r.options.labelFileRemoveError)(u), sub: r.options.labelTapToRetry } });
  })) : ((i.revert && n.origin !== ie.LOCAL && n.serverId !== null || r.options.chunkUploads && n.file.size > r.options.chunkSize || r.options.chunkUploads && r.options.chunkForce) && n.revert(ft(r.options.server.url, r.options.server.revert), t("GET_FORCE_REVERT")), s());
}), ABORT_ITEM_LOAD: Te(r, (n) => {
  n.abortLoad();
}), ABORT_ITEM_PROCESSING: Te(r, (n) => {
  if (n.serverId) {
    e("REVERT_ITEM_PROCESSING", { id: n.id });
    return;
  }
  n.abortProcessing().then(() => {
    r.options.instantUpload && e("REMOVE_ITEM", { query: n.id });
  });
}), REQUEST_REVERT_ITEM_PROCESSING: Te(r, (n) => {
  if (!r.options.instantUpload) {
    e("REVERT_ITEM_PROCESSING", { query: n });
    return;
  }
  const o = (s) => {
    s && e("REVERT_ITEM_PROCESSING", { query: n });
  }, a = t("GET_BEFORE_REMOVE_FILE");
  if (!a) return o(!0);
  const i = a(Ee(n));
  if (i == null) return o(!0);
  if (typeof i == "boolean") return o(i);
  typeof i.then == "function" && i.then(o);
}), REVERT_ITEM_PROCESSING: Te(r, (n) => {
  n.revert(ft(r.options.server.url, r.options.server.revert), t("GET_FORCE_REVERT")).then(() => {
    (r.options.instantUpload || ul(n)) && e("REMOVE_ITEM", { query: n.id });
  }).catch(() => {
  });
}), SET_OPTIONS: ({ options: n }) => {
  const o = Object.keys(n), a = pl.filter((i) => o.includes(i));
  [...a, ...Object.keys(n).filter((i) => !a.includes(i))].forEach((i) => {
    e(`SET_${kt(i, "_").toUpperCase()}`, { value: n[i] });
  });
} }), pl = ["server"], Tr = (e) => e, Le = (e) => document.createElement(e), ee = (e, t) => {
  let r = e.childNodes[0];
  r ? t !== r.nodeValue && (r.nodeValue = t) : (r = document.createTextNode(t), e.appendChild(r));
}, ln = (e, t, r, n) => {
  const o = (n % 360 - 90) * Math.PI / 180;
  return { x: e + r * Math.cos(o), y: t + r * Math.sin(o) };
}, fl = (e, t, r, n, o, a) => {
  const i = ln(e, t, r, o), s = ln(e, t, r, n);
  return ["M", i.x, i.y, "A", r, r, 0, a, 0, s.x, s.y].join(" ");
}, El = (e, t, r, n, o) => {
  let a = 1;
  return o > n && o - n <= 0.5 && (a = 0), n > o && n - o >= 0.5 && (a = 0), fl(e, t, r, Math.min(0.9999, n) * 360, Math.min(0.9999, o) * 360, a);
}, hl = ({ root: e, props: t }) => {
  t.spin = !1, t.progress = 0, t.opacity = 0;
  const r = At("svg");
  e.ref.path = At("path", { "stroke-width": 2, "stroke-linecap": "round" }), r.appendChild(e.ref.path), e.ref.svg = r, e.appendChild(r);
}, ml = ({ root: e, props: t }) => {
  if (t.opacity === 0) return;
  t.align && (e.element.dataset.align = t.align);
  const r = parseInt(ne(e.ref.path, "stroke-width"), 10), n = e.rect.element.width * 0.5;
  let o = 0, a = 0;
  t.spin ? (o = 0, a = 0.5) : (o = 0, a = t.progress);
  const i = El(n, n, n - r, o, a);
  ne(e.ref.path, "d", i), ne(e.ref.path, "stroke-opacity", t.spin || t.progress > 0 ? 1 : 0);
}, cn = oe({ tag: "div", name: "progress-indicator", ignoreRectUpdate: !0, ignoreRect: !0, create: hl, write: ml, mixins: { apis: ["progress", "spin", "align"], styles: ["opacity"], animations: { opacity: { type: "tween", duration: 500 }, progress: { type: "spring", stiffness: 0.95, damping: 0.65, mass: 10 } } } }), _l = ({ root: e, props: t }) => {
  e.element.innerHTML = (t.icon || "") + `<span>${t.label}</span>`, t.isDisabled = !1;
}, Tl = ({ root: e, props: t }) => {
  const { isDisabled: r } = t, n = e.query("GET_DISABLED") || t.opacity === 0;
  n && !r ? (t.isDisabled = !0, ne(e.element, "disabled", "disabled")) : !n && r && (t.isDisabled = !1, e.element.removeAttribute("disabled"));
}, lo = oe({ tag: "button", attributes: { type: "button" }, ignoreRect: !0, ignoreRectUpdate: !0, name: "file-action-button", mixins: { apis: ["label"], styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"], animations: { scaleX: "spring", scaleY: "spring", translateX: "spring", translateY: "spring", opacity: { type: "tween", duration: 250 } }, listeners: !0 }, create: _l, write: Tl }), co = (e, t = ".", r = 1e3, n = {}) => {
  const { labelBytes: o = "bytes", labelKilobytes: a = "KB", labelMegabytes: i = "MB", labelGigabytes: s = "GB" } = n;
  e = Math.round(Math.abs(e));
  const l = r, u = r * r, p = r * r * r;
  return e < l ? `${e} ${o}` : e < u ? `${Math.floor(e / l)} ${a}` : e < p ? `${un(e / u, 1, t)} ${i}` : `${un(e / p, 2, t)} ${s}`;
}, un = (e, t, r) => e.toFixed(t).split(".").filter((n) => n !== "0").join(r), Il = ({ root: e, props: t }) => {
  const r = Le("span");
  r.className = "filepond--file-info-main", ne(r, "aria-hidden", "true"), e.appendChild(r), e.ref.fileName = r;
  const n = Le("span");
  n.className = "filepond--file-info-sub", e.appendChild(n), e.ref.fileSize = n, ee(n, e.query("GET_LABEL_FILE_WAITING_FOR_SIZE")), ee(r, Tr(e.query("GET_ITEM_NAME", t.id)));
}, tr = ({ root: e, props: t }) => {
  ee(e.ref.fileSize, co(e.query("GET_ITEM_SIZE", t.id), ".", e.query("GET_FILE_SIZE_BASE"), e.query("GET_FILE_SIZE_LABELS", e.query))), ee(e.ref.fileName, Tr(e.query("GET_ITEM_NAME", t.id)));
}, dn = ({ root: e, props: t }) => {
  if (it(e.query("GET_ITEM_SIZE", t.id))) {
    tr({ root: e, props: t });
    return;
  }
  ee(e.ref.fileSize, e.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
}, gl = oe({ name: "file-info", ignoreRect: !0, ignoreRectUpdate: !0, write: pe({ DID_LOAD_ITEM: tr, DID_UPDATE_ITEM_META: tr, DID_THROW_ITEM_LOAD_ERROR: dn, DID_THROW_ITEM_INVALID: dn }), didCreateView: (e) => {
  Xe("CREATE_VIEW", { ...e, view: e });
}, create: Il, mixins: { styles: ["translateX", "translateY"], animations: { translateX: "spring", translateY: "spring" } } }), uo = (e) => Math.round(e * 100), yl = ({ root: e }) => {
  const t = Le("span");
  t.className = "filepond--file-status-main", e.appendChild(t), e.ref.main = t;
  const r = Le("span");
  r.className = "filepond--file-status-sub", e.appendChild(r), e.ref.sub = r, po({ root: e, action: { progress: null } });
}, po = ({ root: e, action: t }) => {
  const r = t.progress === null ? e.query("GET_LABEL_FILE_LOADING") : `${e.query("GET_LABEL_FILE_LOADING")} ${uo(t.progress)}%`;
  ee(e.ref.main, r), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, Sl = ({ root: e, action: t }) => {
  const r = t.progress === null ? e.query("GET_LABEL_FILE_PROCESSING") : `${e.query("GET_LABEL_FILE_PROCESSING")} ${uo(t.progress)}%`;
  ee(e.ref.main, r), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, vl = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, Rl = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_ABORTED")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_RETRY"));
}, Ol = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_UNDO"));
}, pn = ({ root: e }) => {
  ee(e.ref.main, ""), ee(e.ref.sub, "");
}, Et = ({ root: e, action: t }) => {
  ee(e.ref.main, t.status.main), ee(e.ref.sub, t.status.sub);
}, bl = oe({ name: "file-status", ignoreRect: !0, ignoreRectUpdate: !0, write: pe({ DID_LOAD_ITEM: pn, DID_REVERT_ITEM_PROCESSING: pn, DID_REQUEST_ITEM_PROCESSING: vl, DID_ABORT_ITEM_PROCESSING: Rl, DID_COMPLETE_ITEM_PROCESSING: Ol, DID_UPDATE_ITEM_PROCESS_PROGRESS: Sl, DID_UPDATE_ITEM_LOAD_PROGRESS: po, DID_THROW_ITEM_LOAD_ERROR: Et, DID_THROW_ITEM_INVALID: Et, DID_THROW_ITEM_PROCESSING_ERROR: Et, DID_THROW_ITEM_PROCESSING_REVERT_ERROR: Et, DID_THROW_ITEM_REMOVE_ERROR: Et }), didCreateView: (e) => {
  Xe("CREATE_VIEW", { ...e, view: e });
}, create: yl, mixins: { styles: ["translateX", "translateY", "opacity"], animations: { opacity: { type: "tween", duration: 250 }, translateX: "spring", translateY: "spring" } } }), rr = { AbortItemLoad: { label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD", action: "ABORT_ITEM_LOAD", className: "filepond--action-abort-item-load", align: "LOAD_INDICATOR_POSITION" }, RetryItemLoad: { label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD", action: "RETRY_ITEM_LOAD", icon: "GET_ICON_RETRY", className: "filepond--action-retry-item-load", align: "BUTTON_PROCESS_ITEM_POSITION" }, RemoveItem: { label: "GET_LABEL_BUTTON_REMOVE_ITEM", action: "REQUEST_REMOVE_ITEM", icon: "GET_ICON_REMOVE", className: "filepond--action-remove-item", align: "BUTTON_REMOVE_ITEM_POSITION" }, ProcessItem: { label: "GET_LABEL_BUTTON_PROCESS_ITEM", action: "REQUEST_ITEM_PROCESSING", icon: "GET_ICON_PROCESS", className: "filepond--action-process-item", align: "BUTTON_PROCESS_ITEM_POSITION" }, AbortItemProcessing: { label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING", action: "ABORT_ITEM_PROCESSING", className: "filepond--action-abort-item-processing", align: "BUTTON_PROCESS_ITEM_POSITION" }, RetryItemProcessing: { label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING", action: "RETRY_ITEM_PROCESSING", icon: "GET_ICON_RETRY", className: "filepond--action-retry-item-processing", align: "BUTTON_PROCESS_ITEM_POSITION" }, RevertItemProcessing: { label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING", action: "REQUEST_REVERT_ITEM_PROCESSING", icon: "GET_ICON_UNDO", className: "filepond--action-revert-item-processing", align: "BUTTON_PROCESS_ITEM_POSITION" } }, nr = [];
K(rr, (e) => {
  nr.push(e);
});
const me = (e) => {
  if (or(e) === "right") return 0;
  const t = e.ref.buttonRemoveItem.rect.element;
  return t.hidden ? null : t.width + t.left;
}, Dl = (e) => e.ref.buttonAbortItemLoad.rect.element.width, St = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4), wl = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2), Al = (e) => e.query("GET_STYLE_LOAD_INDICATOR_POSITION"), Ll = (e) => e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"), or = (e) => e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION"), Pl = { buttonAbortItemLoad: { opacity: 0 }, buttonRetryItemLoad: { opacity: 0 }, buttonRemoveItem: { opacity: 0 }, buttonProcessItem: { opacity: 0 }, buttonAbortItemProcessing: { opacity: 0 }, buttonRetryItemProcessing: { opacity: 0 }, buttonRevertItemProcessing: { opacity: 0 }, loadProgressIndicator: { opacity: 0, align: Al }, processProgressIndicator: { opacity: 0, align: Ll }, processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 }, info: { translateX: 0, translateY: 0, opacity: 0 }, status: { translateX: 0, translateY: 0, opacity: 0 } }, fn = { buttonRemoveItem: { opacity: 1 }, buttonProcessItem: { opacity: 1 }, info: { translateX: me }, status: { translateX: me } }, Xt = { buttonAbortItemProcessing: { opacity: 1 }, processProgressIndicator: { opacity: 1 }, status: { opacity: 1 } }, et = { DID_THROW_ITEM_INVALID: { buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { translateX: me, opacity: 1 } }, DID_START_ITEM_LOAD: { buttonAbortItemLoad: { opacity: 1 }, loadProgressIndicator: { opacity: 1 }, status: { opacity: 1 } }, DID_THROW_ITEM_LOAD_ERROR: { buttonRetryItemLoad: { opacity: 1 }, buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { opacity: 1 } }, DID_START_ITEM_REMOVE: { processProgressIndicator: { opacity: 1, align: or }, info: { translateX: me }, status: { opacity: 0 } }, DID_THROW_ITEM_REMOVE_ERROR: { processProgressIndicator: { opacity: 0, align: or }, buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { opacity: 1, translateX: me } }, DID_LOAD_ITEM: fn, DID_LOAD_LOCAL_ITEM: { buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { translateX: me } }, DID_START_ITEM_PROCESSING: Xt, DID_REQUEST_ITEM_PROCESSING: Xt, DID_UPDATE_ITEM_PROCESS_PROGRESS: Xt, DID_COMPLETE_ITEM_PROCESSING: { buttonRevertItemProcessing: { opacity: 1 }, info: { opacity: 1 }, status: { opacity: 1 } }, DID_THROW_ITEM_PROCESSING_ERROR: { buttonRemoveItem: { opacity: 1 }, buttonRetryItemProcessing: { opacity: 1 }, status: { opacity: 1 }, info: { translateX: me } }, DID_THROW_ITEM_PROCESSING_REVERT_ERROR: { buttonRevertItemProcessing: { opacity: 1 }, status: { opacity: 1 }, info: { opacity: 1 } }, DID_ABORT_ITEM_PROCESSING: { buttonRemoveItem: { opacity: 1 }, buttonProcessItem: { opacity: 1 }, info: { translateX: me }, status: { opacity: 1 } }, DID_REVERT_ITEM_PROCESSING: fn }, Ml = oe({ create: ({ root: e }) => {
  e.element.innerHTML = e.query("GET_ICON_DONE");
}, name: "processing-complete-indicator", ignoreRect: !0, mixins: { styles: ["scaleX", "scaleY", "opacity"], animations: { scaleX: "spring", scaleY: "spring", opacity: { type: "tween", duration: 250 } } } }), Cl = ({ root: e, props: t }) => {
  const r = Object.keys(rr).reduce((E, I) => (E[I] = { ...rr[I] }, E), {}), { id: n } = t, o = e.query("GET_ALLOW_REVERT"), a = e.query("GET_ALLOW_REMOVE"), i = e.query("GET_ALLOW_PROCESS"), s = e.query("GET_INSTANT_UPLOAD"), l = e.query("IS_ASYNC"), u = e.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
  let p;
  l ? i && !o ? p = (E) => !/RevertItemProcessing/.test(E) : !i && o ? p = (E) => !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(E) : !i && !o && (p = (E) => !/Process/.test(E)) : p = (E) => !/Process/.test(E);
  const m = p ? nr.filter(p) : nr.concat();
  if (s && o && (r.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM", r.RevertItemProcessing.icon = "GET_ICON_REMOVE"), l && !o) {
    const E = et.DID_COMPLETE_ITEM_PROCESSING;
    E.info.translateX = wl, E.info.translateY = St, E.status.translateY = St, E.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  if (l && !i && (["DID_START_ITEM_PROCESSING", "DID_REQUEST_ITEM_PROCESSING", "DID_UPDATE_ITEM_PROCESS_PROGRESS", "DID_THROW_ITEM_PROCESSING_ERROR"].forEach((E) => {
    et[E].status.translateY = St;
  }), et.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = Dl), u && o) {
    r.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION";
    const E = et.DID_COMPLETE_ITEM_PROCESSING;
    E.info.translateX = me, E.status.translateY = St, E.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  a || (r.RemoveItem.disabled = !0), K(r, (E, I) => {
    const b = e.createChildView(lo, { label: e.query(I.label), icon: e.query(I.icon), opacity: 0 });
    m.includes(E) && e.appendChildView(b), I.disabled && (b.element.setAttribute("disabled", "disabled"), b.element.setAttribute("hidden", "hidden")), b.element.dataset.align = e.query(`GET_STYLE_${I.align}`), b.element.classList.add(I.className), b.on("click", (R) => {
      R.stopPropagation(), !I.disabled && e.dispatch(I.action, { query: n });
    }), e.ref[`button${E}`] = b;
  }), e.ref.processingCompleteIndicator = e.appendChildView(e.createChildView(Ml)), e.ref.processingCompleteIndicator.element.dataset.align = e.query("GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"), e.ref.info = e.appendChildView(e.createChildView(gl, { id: n })), e.ref.status = e.appendChildView(e.createChildView(bl, { id: n }));
  const h = e.appendChildView(e.createChildView(cn, { opacity: 0, align: e.query("GET_STYLE_LOAD_INDICATOR_POSITION") }));
  h.element.classList.add("filepond--load-indicator"), e.ref.loadProgressIndicator = h;
  const _ = e.appendChildView(e.createChildView(cn, { opacity: 0, align: e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION") }));
  _.element.classList.add("filepond--process-indicator"), e.ref.processProgressIndicator = _, e.ref.activeStyles = [];
}, Nl = ({ root: e, actions: t, props: r }) => {
  Gl({ root: e, actions: t, props: r });
  let n = t.concat().filter((o) => /^DID_/.test(o.type)).reverse().find((o) => et[o.type]);
  if (n) {
    e.ref.activeStyles = [];
    const o = et[n.type];
    K(Pl, (a, i) => {
      const s = e.ref[a];
      K(i, (l, u) => {
        const p = o[a] && typeof o[a][l] < "u" ? o[a][l] : u;
        e.ref.activeStyles.push({ control: s, key: l, value: p });
      });
    });
  }
  e.ref.activeStyles.forEach(({ control: o, key: a, value: i }) => {
    o[a] = typeof i == "function" ? i(e) : i;
  });
}, Gl = pe({ DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: ({ root: e, action: t }) => {
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
} }), Fl = oe({ create: Cl, write: Nl, didCreateView: (e) => {
  Xe("CREATE_VIEW", { ...e, view: e });
}, name: "file" }), xl = ({ root: e, props: t }) => {
  e.ref.fileName = Le("legend"), e.appendChild(e.ref.fileName), e.ref.file = e.appendChildView(e.createChildView(Fl, { id: t.id })), e.ref.data = !1;
}, kl = ({ root: e, props: t }) => {
  ee(e.ref.fileName, Tr(e.query("GET_ITEM_NAME", t.id)));
}, ql = oe({ create: xl, ignoreRect: !0, write: pe({ DID_LOAD_ITEM: kl }), didCreateView: (e) => {
  Xe("CREATE_VIEW", { ...e, view: e });
}, tag: "fieldset", name: "file-wrapper" }), En = { type: "spring", damping: 0.6, mass: 7 }, Bl = ({ root: e, props: t }) => {
  [{ name: "top" }, { name: "center", props: { translateY: null, scaleY: null }, mixins: { animations: { scaleY: En }, styles: ["translateY", "scaleY"] } }, { name: "bottom", props: { translateY: null }, mixins: { animations: { translateY: En }, styles: ["translateY"] } }].forEach((r) => {
    Ul(e, r, t.name);
  }), e.element.classList.add(`filepond--${t.name}`), e.ref.scalable = null;
}, Ul = (e, t, r) => {
  const n = oe({ name: `panel-${t.name} filepond--${r}`, mixins: t.mixins, ignoreRectUpdate: !0 }), o = e.createChildView(n, t.props);
  e.ref[t.name] = e.appendChildView(o);
}, Vl = ({ root: e, props: t }) => {
  if ((e.ref.scalable === null || t.scalable !== e.ref.scalable) && (e.ref.scalable = $n(t.scalable) ? t.scalable : !0, e.element.dataset.scalable = e.ref.scalable), !t.height) return;
  const r = e.ref.top.rect.element, n = e.ref.bottom.rect.element, o = Math.max(r.height + n.height, t.height);
  e.ref.center.translateY = r.height, e.ref.center.scaleY = (o - r.height - n.height) / 100, e.ref.bottom.translateY = o - n.height;
}, fo = oe({ name: "panel", read: ({ root: e, props: t }) => t.heightCurrent = e.ref.bottom.translateY, write: Vl, create: Bl, ignoreRect: !0, mixins: { apis: ["height", "heightCurrent", "scalable"] } }), Hl = (e) => {
  const t = e.map((n) => n.id);
  let r;
  return { setIndex: (n) => {
    r = n;
  }, getIndex: () => r, getItemIndex: (n) => t.indexOf(n.id) };
}, hn = { type: "spring", stiffness: 0.75, damping: 0.45, mass: 10 }, mn = "spring", _n = { DID_START_ITEM_LOAD: "busy", DID_UPDATE_ITEM_LOAD_PROGRESS: "loading", DID_THROW_ITEM_INVALID: "load-invalid", DID_THROW_ITEM_LOAD_ERROR: "load-error", DID_LOAD_ITEM: "idle", DID_THROW_ITEM_REMOVE_ERROR: "remove-error", DID_START_ITEM_REMOVE: "busy", DID_START_ITEM_PROCESSING: "busy processing", DID_REQUEST_ITEM_PROCESSING: "busy processing", DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing", DID_COMPLETE_ITEM_PROCESSING: "processing-complete", DID_THROW_ITEM_PROCESSING_ERROR: "processing-error", DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error", DID_ABORT_ITEM_PROCESSING: "cancelled", DID_REVERT_ITEM_PROCESSING: "idle" }, Yl = ({ root: e, props: t }) => {
  if (e.ref.handleClick = (n) => e.dispatch("DID_ACTIVATE_ITEM", { id: t.id }), e.element.id = `filepond--item-${t.id}`, e.element.addEventListener("click", e.ref.handleClick), e.ref.container = e.appendChildView(e.createChildView(ql, { id: t.id })), e.ref.panel = e.appendChildView(e.createChildView(fo, { name: "item-panel" })), e.ref.panel.height = null, t.markedForRemoval = !1, !e.query("GET_ALLOW_REORDER")) return;
  e.element.dataset.dragState = "idle";
  const r = (n) => {
    if (!n.isPrimary) return;
    let o = !1;
    const a = { x: n.pageX, y: n.pageY };
    t.dragOrigin = { x: e.translateX, y: e.translateY }, t.dragCenter = { x: n.offsetX, y: n.offsetY };
    const i = Hl(e.query("GET_ACTIVE_ITEMS"));
    e.dispatch("DID_GRAB_ITEM", { id: t.id, dragState: i });
    const s = (u) => {
      u.isPrimary && (u.stopPropagation(), u.preventDefault(), t.dragOffset = { x: u.pageX - a.x, y: u.pageY - a.y }, t.dragOffset.x * t.dragOffset.x + t.dragOffset.y * t.dragOffset.y > 16 && !o && (o = !0, e.element.removeEventListener("click", e.ref.handleClick)), e.dispatch("DID_DRAG_ITEM", { id: t.id, dragState: i }));
    }, l = (u) => {
      u.isPrimary && (document.removeEventListener("pointermove", s), document.removeEventListener("pointerup", l), t.dragOffset = { x: u.pageX - a.x, y: u.pageY - a.y }, e.dispatch("DID_DROP_ITEM", { id: t.id, dragState: i }), o && setTimeout(() => e.element.addEventListener("click", e.ref.handleClick), 0));
    };
    document.addEventListener("pointermove", s), document.addEventListener("pointerup", l);
  };
  e.element.addEventListener("pointerdown", r);
}, zl = pe({ DID_UPDATE_PANEL_HEIGHT: ({ root: e, action: t }) => {
  e.height = t.height;
} }), $l = pe({ DID_GRAB_ITEM: ({ root: e, props: t }) => {
  t.dragOrigin = { x: e.translateX, y: e.translateY };
}, DID_DRAG_ITEM: ({ root: e }) => {
  e.element.dataset.dragState = "drag";
}, DID_DROP_ITEM: ({ root: e, props: t }) => {
  t.dragOffset = null, t.dragOrigin = null, e.element.dataset.dragState = "drop";
} }, ({ root: e, actions: t, props: r, shouldOptimize: n }) => {
  e.element.dataset.dragState === "drop" && e.scaleX <= 1 && (e.element.dataset.dragState = "idle");
  let o = t.concat().filter((i) => /^DID_/.test(i.type)).reverse().find((i) => _n[i.type]);
  o && o.type !== r.currentState && (r.currentState = o.type, e.element.dataset.filepondItemState = _n[r.currentState] || "");
  const a = e.query("GET_ITEM_PANEL_ASPECT_RATIO") || e.query("GET_PANEL_ASPECT_RATIO");
  a ? n || (e.height = e.rect.element.width * a) : (zl({ root: e, actions: t, props: r }), !e.height && e.ref.container.rect.element.height > 0 && (e.height = e.ref.container.rect.element.height)), n && (e.ref.panel.height = null), e.ref.panel.height = e.height;
}), Wl = oe({ create: Yl, write: $l, destroy: ({ root: e, props: t }) => {
  e.element.removeEventListener("click", e.ref.handleClick), e.dispatch("RELEASE_ITEM", { query: t.id });
}, tag: "li", name: "item", mixins: { apis: ["id", "interactionMethod", "markedForRemoval", "spawnDate", "dragCenter", "dragOrigin", "dragOffset"], styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity", "height"], animations: { scaleX: mn, scaleY: mn, translateX: hn, translateY: hn, opacity: { type: "tween", duration: 150 } } } });
var Ir = (e, t) => Math.max(1, Math.floor((e + 1) / t));
const gr = (e, t, r) => {
  if (!r) return;
  const n = e.rect.element.width, o = t.length;
  let a = null;
  if (o === 0 || r.top < t[0].rect.element.top) return -1;
  const i = t[0].rect.element, s = i.marginLeft + i.marginRight, l = i.width + s, u = Ir(n, l);
  if (u === 1) {
    for (let h = 0; h < o; h++) {
      const _ = t[h], E = _.rect.outer.top + _.rect.element.height * 0.5;
      if (r.top < E) return h;
    }
    return o;
  }
  const p = i.marginTop + i.marginBottom, m = i.height + p;
  for (let h = 0; h < o; h++) {
    const _ = h % u, E = Math.floor(h / u), I = _ * l, b = E * m, R = b - i.marginTop, D = I + l, C = b + m + i.marginBottom;
    if (r.top < C && r.top > R) {
      if (r.left < D) return h;
      h !== o - 1 ? a = h : a = null;
    }
  }
  return a !== null ? a : o;
}, vt = { height: 0, width: 0, get getHeight() {
  return this.height;
}, set setHeight(e) {
  (this.height === 0 || e === 0) && (this.height = e);
}, get getWidth() {
  return this.width;
}, set setWidth(e) {
  (this.width === 0 || e === 0) && (this.width = e);
}, setDimensions: function(e, t) {
  (this.height === 0 || e === 0) && (this.height = e), (this.width === 0 || t === 0) && (this.width = t);
} }, jl = ({ root: e }) => {
  ne(e.element, "role", "list"), e.ref.lastItemSpanwDate = Date.now();
}, Xl = ({ root: e, action: t }) => {
  const { id: r, index: n, interactionMethod: o } = t;
  e.ref.addIndex = n;
  const a = Date.now();
  let i = a, s = 1;
  if (o !== Ie.NONE) {
    s = 0;
    const l = e.query("GET_ITEM_INSERT_INTERVAL"), u = a - e.ref.lastItemSpanwDate;
    i = u < l ? a + (l - u) : a;
  }
  e.ref.lastItemSpanwDate = i, e.appendChildView(e.createChildView(Wl, { spawnDate: i, id: r, opacity: s, interactionMethod: o }), n);
}, Tn = (e, t, r, n = 0, o = 1) => {
  e.dragOffset ? (e.translateX = null, e.translateY = null, e.translateX = e.dragOrigin.x + e.dragOffset.x, e.translateY = e.dragOrigin.y + e.dragOffset.y, e.scaleX = 1.025, e.scaleY = 1.025) : (e.translateX = t, e.translateY = r, Date.now() > e.spawnDate && (e.opacity === 0 && Ql(e, t, r, n, o), e.scaleX = 1, e.scaleY = 1, e.opacity = 1));
}, Ql = (e, t, r, n, o) => {
  e.interactionMethod === Ie.NONE ? (e.translateX = null, e.translateX = t, e.translateY = null, e.translateY = r) : e.interactionMethod === Ie.DROP ? (e.translateX = null, e.translateX = t - n * 20, e.translateY = null, e.translateY = r - o * 10, e.scaleX = 0.8, e.scaleY = 0.8) : e.interactionMethod === Ie.BROWSE ? (e.translateY = null, e.translateY = r - 30) : e.interactionMethod === Ie.API && (e.translateX = null, e.translateX = t - 30, e.translateY = null);
}, Zl = ({ root: e, action: t }) => {
  const { id: r } = t, n = e.childViews.find((o) => o.id === r);
  n && (n.scaleX = 0.9, n.scaleY = 0.9, n.opacity = 0, n.markedForRemoval = !0);
}, Qt = (e) => e.rect.element.height + e.rect.element.marginBottom * 0.5 + e.rect.element.marginTop * 0.5, Kl = (e) => e.rect.element.width + e.rect.element.marginLeft * 0.5 + e.rect.element.marginRight * 0.5, Jl = ({ root: e, action: t }) => {
  const { id: r, dragState: n } = t, o = e.query("GET_ITEM", { id: r }), a = e.childViews.find((b) => b.id === r), i = e.childViews.length, s = n.getItemIndex(o);
  if (!a) return;
  const l = { x: a.dragOrigin.x + a.dragOffset.x + a.dragCenter.x, y: a.dragOrigin.y + a.dragOffset.y + a.dragCenter.y }, u = Qt(a), p = Kl(a);
  let m = Math.floor(e.rect.outer.width / p);
  m > i && (m = i);
  const h = Math.floor(i / m + 1);
  vt.setHeight = u * h, vt.setWidth = p * m;
  var _ = { y: Math.floor(l.y / u), x: Math.floor(l.x / p), getGridIndex: function() {
    return l.y > vt.getHeight || l.y < 0 || l.x > vt.getWidth || l.x < 0 ? s : this.y * m + this.x;
  }, getColIndex: function() {
    const b = e.query("GET_ACTIVE_ITEMS"), R = e.childViews.filter((P) => P.rect.element.height), D = b.map((P) => R.find((q) => q.id === P.id)), C = D.findIndex((P) => P === a), N = Qt(a), A = D.length;
    let F = A, w = 0, L = 0, z = 0;
    for (let P = 0; P < A; P++) if (w = Qt(D[P]), z = L, L = z + w, l.y < L) {
      if (C > P) {
        if (l.y < z + N) {
          F = P;
          break;
        }
        continue;
      }
      F = P;
      break;
    }
    return F;
  } };
  const E = m > 1 ? _.getGridIndex() : _.getColIndex();
  e.dispatch("MOVE_ITEM", { query: a, index: E });
  const I = n.getIndex();
  if (I === void 0 || I !== E) {
    if (n.setIndex(E), I === void 0) return;
    e.dispatch("DID_REORDER_ITEMS", { items: e.query("GET_ACTIVE_ITEMS"), origin: s, target: E });
  }
}, ec = pe({ DID_ADD_ITEM: Xl, DID_REMOVE_ITEM: Zl, DID_DRAG_ITEM: Jl }), tc = ({ root: e, props: t, actions: r, shouldOptimize: n }) => {
  ec({ root: e, props: t, actions: r });
  const { dragCoordinates: o } = t, a = e.rect.element.width, i = e.childViews.filter((C) => C.rect.element.height), s = e.query("GET_ACTIVE_ITEMS").map((C) => i.find((N) => N.id === C.id)).filter((C) => C), l = o ? gr(e, s, o) : null, u = e.ref.addIndex || null;
  e.ref.addIndex = null;
  let p = 0, m = 0, h = 0;
  if (s.length === 0) return;
  const _ = s[0].rect.element, E = _.marginTop + _.marginBottom, I = _.marginLeft + _.marginRight, b = _.width + I, R = _.height + E, D = Ir(a, b);
  if (D === 1) {
    let C = 0, N = 0;
    s.forEach((A, F) => {
      if (l) {
        let L = F - l;
        L === -2 ? N = -E * 0.25 : L === -1 ? N = -E * 0.75 : L === 0 ? N = E * 0.75 : L === 1 ? N = E * 0.25 : N = 0;
      }
      n && (A.translateX = null, A.translateY = null), A.markedForRemoval || Tn(A, 0, C + N);
      let w = (A.rect.element.height + E) * (A.markedForRemoval ? A.opacity : 1);
      C += w;
    });
  } else {
    let C = 0, N = 0;
    s.forEach((A, F) => {
      F === l && (p = 1), F === u && (h += 1), A.markedForRemoval && A.opacity < 0.5 && (m -= 1);
      const w = F + h + p + m, L = w % D, z = Math.floor(w / D), P = L * b, q = z * R, Q = Math.sign(P - C), Z = Math.sign(q - N);
      C = P, N = q, !A.markedForRemoval && (n && (A.translateX = null, A.translateY = null), Tn(A, P, q, Q, Z));
    });
  }
}, rc = (e, t) => t.filter((r) => r.data && r.data.id ? e.id === r.data.id : !0), nc = oe({ create: jl, write: tc, tag: "ul", name: "list", didWriteView: ({ root: e }) => {
  e.childViews.filter((t) => t.markedForRemoval && t.opacity === 0 && t.resting).forEach((t) => {
    t._destroy(), e.removeChildView(t);
  });
}, filterFrameActionsForChild: rc, mixins: { apis: ["dragCoordinates"] } }), oc = ({ root: e, props: t }) => {
  e.ref.list = e.appendChildView(e.createChildView(nc)), t.dragCoordinates = null, t.overflowing = !1;
}, ic = ({ root: e, props: t, action: r }) => {
  e.query("GET_ITEM_INSERT_LOCATION_FREEDOM") && (t.dragCoordinates = { left: r.position.scopeLeft - e.ref.list.rect.element.left, top: r.position.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop) });
}, ac = ({ props: e }) => {
  e.dragCoordinates = null;
}, sc = pe({ DID_DRAG: ic, DID_END_DRAG: ac }), lc = ({ root: e, props: t, actions: r }) => {
  if (sc({ root: e, props: t, actions: r }), e.ref.list.dragCoordinates = t.dragCoordinates, t.overflowing && !t.overflow && (t.overflowing = !1, e.element.dataset.state = "", e.height = null), t.overflow) {
    const n = Math.round(t.overflow);
    n !== e.height && (t.overflowing = !0, e.element.dataset.state = "overflow", e.height = n);
  }
}, cc = oe({ create: oc, write: lc, name: "list-scroller", mixins: { apis: ["overflow", "dragCoordinates"], styles: ["height", "translateY"], animations: { translateY: "spring" } } }), ve = (e, t, r, n = "") => {
  r ? ne(e, t, n) : e.removeAttribute(t);
}, uc = (e) => {
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
}, dc = ({ root: e, props: t }) => {
  e.element.id = `filepond--browser-${t.id}`, ne(e.element, "name", e.query("GET_NAME")), ne(e.element, "aria-controls", `filepond--assistant-${t.id}`), ne(e.element, "aria-labelledby", `filepond--drop-label-${t.id}`), Eo({ root: e, action: { value: e.query("GET_ACCEPTED_FILE_TYPES") } }), ho({ root: e, action: { value: e.query("GET_ALLOW_MULTIPLE") } }), mo({ root: e, action: { value: e.query("GET_ALLOW_DIRECTORIES_ONLY") } }), ir({ root: e }), _o({ root: e, action: { value: e.query("GET_REQUIRED") } }), To({ root: e, action: { value: e.query("GET_CAPTURE_METHOD") } }), e.ref.handleChange = (r) => {
    if (!e.element.value) return;
    const n = Array.from(e.element.files).map((o) => (o._relativePath = o.webkitRelativePath, o));
    setTimeout(() => {
      t.onload(n), uc(e.element);
    }, 250);
  }, e.element.addEventListener("change", e.ref.handleChange);
}, Eo = ({ root: e, action: t }) => {
  e.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") && ve(e.element, "accept", !!t.value, t.value ? t.value.join(",") : "");
}, ho = ({ root: e, action: t }) => {
  ve(e.element, "multiple", t.value);
}, mo = ({ root: e, action: t }) => {
  ve(e.element, "webkitdirectory", t.value);
}, ir = ({ root: e }) => {
  const t = e.query("GET_DISABLED"), r = e.query("GET_ALLOW_BROWSE"), n = t || !r;
  ve(e.element, "disabled", n);
}, _o = ({ root: e, action: t }) => {
  t.value ? e.query("GET_TOTAL_ITEMS") === 0 && ve(e.element, "required", !0) : ve(e.element, "required", !1);
}, To = ({ root: e, action: t }) => {
  ve(e.element, "capture", !!t.value, t.value === !0 ? "" : t.value);
}, In = ({ root: e }) => {
  const { element: t } = e;
  e.query("GET_TOTAL_ITEMS") > 0 ? (ve(t, "required", !1), ve(t, "name", !1)) : (ve(t, "name", !0, e.query("GET_NAME")), e.query("GET_CHECK_VALIDITY") && t.setCustomValidity(""), e.query("GET_REQUIRED") && ve(t, "required", !0));
}, pc = ({ root: e }) => {
  e.query("GET_CHECK_VALIDITY") && e.element.setCustomValidity(e.query("GET_LABEL_INVALID_FIELD"));
}, fc = oe({ tag: "input", name: "browser", ignoreRect: !0, ignoreRectUpdate: !0, attributes: { type: "file" }, create: dc, destroy: ({ root: e }) => {
  e.element.removeEventListener("change", e.ref.handleChange);
}, write: pe({ DID_LOAD_ITEM: In, DID_REMOVE_ITEM: In, DID_THROW_ITEM_INVALID: pc, DID_SET_DISABLED: ir, DID_SET_ALLOW_BROWSE: ir, DID_SET_ALLOW_DIRECTORIES_ONLY: mo, DID_SET_ALLOW_MULTIPLE: ho, DID_SET_ACCEPTED_FILE_TYPES: Eo, DID_SET_CAPTURE_METHOD: To, DID_SET_REQUIRED: _o }) }), gn = { ENTER: 13, SPACE: 32 }, Ec = ({ root: e, props: t }) => {
  const r = Le("label");
  ne(r, "for", `filepond--browser-${t.id}`), ne(r, "id", `filepond--drop-label-${t.id}`), ne(r, "aria-hidden", "true"), e.ref.handleKeyDown = (n) => {
    (n.keyCode === gn.ENTER || n.keyCode === gn.SPACE) && (n.preventDefault(), e.ref.label.click());
  }, e.ref.handleClick = (n) => {
    n.target === r || r.contains(n.target) || e.ref.label.click();
  }, r.addEventListener("keydown", e.ref.handleKeyDown), e.element.addEventListener("click", e.ref.handleClick), Io(r, t.caption), e.appendChild(r), e.ref.label = r;
}, Io = (e, t) => {
  e.innerHTML = t;
  const r = e.querySelector(".filepond--label-action");
  return r && ne(r, "tabindex", "0"), t;
}, hc = oe({ name: "drop-label", ignoreRect: !0, create: Ec, destroy: ({ root: e }) => {
  e.ref.label.addEventListener("keydown", e.ref.handleKeyDown), e.element.removeEventListener("click", e.ref.handleClick);
}, write: pe({ DID_SET_LABEL_IDLE: ({ root: e, action: t }) => {
  Io(e.ref.label, t.value);
} }), mixins: { styles: ["opacity", "translateX", "translateY"], animations: { opacity: { type: "tween", duration: 150 }, translateX: "spring", translateY: "spring" } } }), mc = oe({ name: "drip-blob", ignoreRect: !0, mixins: { styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"], animations: { scaleX: "spring", scaleY: "spring", translateX: "spring", translateY: "spring", opacity: { type: "tween", duration: 250 } } } }), _c = ({ root: e }) => {
  const t = e.rect.element.width * 0.5, r = e.rect.element.height * 0.5;
  e.ref.blob = e.appendChildView(e.createChildView(mc, { opacity: 0, scaleX: 2.5, scaleY: 2.5, translateX: t, translateY: r }));
}, Tc = ({ root: e, action: t }) => {
  if (!e.ref.blob) {
    _c({ root: e });
    return;
  }
  e.ref.blob.translateX = t.position.scopeLeft, e.ref.blob.translateY = t.position.scopeTop, e.ref.blob.scaleX = 1, e.ref.blob.scaleY = 1, e.ref.blob.opacity = 1;
}, Ic = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.opacity = 0);
}, gc = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.scaleX = 2.5, e.ref.blob.scaleY = 2.5, e.ref.blob.opacity = 0);
}, yc = ({ root: e, props: t, actions: r }) => {
  Sc({ root: e, props: t, actions: r });
  const { blob: n } = e.ref;
  r.length === 0 && n && n.opacity === 0 && (e.removeChildView(n), e.ref.blob = null);
}, Sc = pe({ DID_DRAG: Tc, DID_DROP: gc, DID_END_DRAG: Ic }), vc = oe({ ignoreRect: !0, ignoreRectUpdate: !0, name: "drip", write: yc }), go = (e, t) => {
  try {
    const r = new DataTransfer();
    t.forEach((n) => {
      n instanceof File ? r.items.add(n) : r.items.add(new File([n], n.name, { type: n.type }));
    }), e.files = r.files;
  } catch {
    return !1;
  }
  return !0;
}, Rc = ({ root: e }) => e.ref.fields = {}, Ut = (e, t) => e.ref.fields[t], yr = (e) => {
  e.query("GET_ACTIVE_ITEMS").forEach((t) => {
    e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id]);
  });
}, yn = ({ root: e }) => yr(e), Oc = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).origin !== ie.LOCAL && e.query("SHOULD_UPDATE_FILE_INPUT"), n = Le("input");
  n.type = r ? "file" : "hidden", n.name = e.query("GET_NAME"), n.disabled = e.query("GET_DISABLED"), e.ref.fields[t.id] = n, yr(e);
}, bc = ({ root: e, action: t }) => {
  const r = Ut(e, t.id);
  if (!r || (t.serverFileReference !== null && (r.value = t.serverFileReference), !e.query("SHOULD_UPDATE_FILE_INPUT"))) return;
  const n = e.query("GET_ITEM", t.id);
  go(r, [n.file]);
}, Dc = ({ root: e, action: t }) => {
  e.query("SHOULD_UPDATE_FILE_INPUT") && setTimeout(() => {
    const r = Ut(e, t.id);
    r && go(r, [t.file]);
  }, 0);
}, wc = ({ root: e }) => {
  e.element.disabled = e.query("GET_DISABLED");
}, Ac = ({ root: e, action: t }) => {
  const r = Ut(e, t.id);
  r && (r.parentNode && r.parentNode.removeChild(r), delete e.ref.fields[t.id]);
}, Lc = ({ root: e, action: t }) => {
  const r = Ut(e, t.id);
  r && (t.value === null ? r.removeAttribute("value") : r.type != "file" && (r.value = t.value), yr(e));
}, Pc = pe({ DID_SET_DISABLED: wc, DID_ADD_ITEM: Oc, DID_LOAD_ITEM: bc, DID_REMOVE_ITEM: Ac, DID_DEFINE_VALUE: Lc, DID_PREPARE_OUTPUT: Dc, DID_REORDER_ITEMS: yn, DID_SORT_ITEMS: yn }), Mc = oe({ tag: "fieldset", name: "data", create: Rc, write: Pc, ignoreRect: !0 }), Cc = (e) => "getRootNode" in e ? e.getRootNode() : document, Nc = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"], Gc = ["css", "csv", "html", "txt"], Fc = { zip: "zip|compressed", epub: "application/epub+zip" }, yo = (e = "") => (e = e.toLowerCase(), Nc.includes(e) ? "image/" + (e === "jpg" ? "jpeg" : e === "svg" ? "svg+xml" : e) : Gc.includes(e) ? "text/" + e : Fc[e] || ""), Sr = (e) => new Promise((t, r) => {
  const n = Yc(e);
  if (n.length && !xc(e)) return t(n);
  kc(e).then(t);
}), xc = (e) => e.files ? e.files.length > 0 : !1, kc = (e) => new Promise((t, r) => {
  const n = (e.items ? Array.from(e.items) : []).filter((o) => qc(o)).map((o) => Bc(o));
  if (!n.length) {
    t(e.files ? Array.from(e.files) : []);
    return;
  }
  Promise.all(n).then((o) => {
    const a = [];
    o.forEach((i) => {
      a.push.apply(a, i);
    }), t(a.filter((i) => i).map((i) => (i._relativePath || (i._relativePath = i.webkitRelativePath), i)));
  }).catch(console.error);
}), qc = (e) => {
  if (So(e)) {
    const t = vr(e);
    if (t) return t.isFile || t.isDirectory;
  }
  return e.kind === "file";
}, Bc = (e) => new Promise((t, r) => {
  if (Hc(e)) {
    Uc(vr(e)).then(t).catch(r);
    return;
  }
  t([e.getAsFile()]);
}), Uc = (e) => new Promise((t, r) => {
  const n = [];
  let o = 0, a = 0;
  const i = () => {
    a === 0 && o === 0 && t(n);
  }, s = (l) => {
    o++;
    const u = l.createReader(), p = () => {
      u.readEntries((m) => {
        if (m.length === 0) {
          o--, i();
          return;
        }
        m.forEach((h) => {
          h.isDirectory ? s(h) : (a++, h.file((_) => {
            const E = Vc(_);
            h.fullPath && (E._relativePath = h.fullPath), n.push(E), a--, i();
          }));
        }), p();
      }, r);
    };
    p();
  };
  s(e);
}), Vc = (e) => {
  if (e.type.length) return e;
  const t = e.lastModifiedDate, r = e.name, n = yo(Bt(e.name));
  return n.length && (e = e.slice(0, e.size, n), e.name = r, e.lastModifiedDate = t), e;
}, Hc = (e) => So(e) && (vr(e) || {}).isDirectory, So = (e) => "webkitGetAsEntry" in e, vr = (e) => e.webkitGetAsEntry(), Yc = (e) => {
  let t = [];
  try {
    if (t = $c(e), t.length) return t;
    t = zc(e);
  } catch {
  }
  return t;
}, zc = (e) => {
  let t = e.getData("url");
  return typeof t == "string" && t.length ? [t] : [];
}, $c = (e) => {
  let t = e.getData("text/html");
  if (typeof t == "string" && t.length) {
    const r = t.match(/src\s*=\s*"(.+?)"/);
    if (r) return [r[1]];
  }
  return [];
}, Pt = [], We = (e) => ({ pageLeft: e.pageX, pageTop: e.pageY, scopeLeft: e.offsetX || e.layerX, scopeTop: e.offsetY || e.layerY }), Wc = (e, t, r) => {
  const n = jc(t), o = { element: e, filterElement: r, state: null, ondrop: () => {
  }, onenter: () => {
  }, ondrag: () => {
  }, onexit: () => {
  }, onload: () => {
  }, allowdrop: () => {
  } };
  return o.destroy = n.addListener(o), o;
}, jc = (e) => {
  const t = Pt.find((n) => n.element === e);
  if (t) return t;
  const r = Xc(e);
  return Pt.push(r), r;
}, Xc = (e) => {
  const t = [], r = { dragenter: Zc, dragover: Kc, dragleave: eu, drop: Jc }, n = {};
  K(r, (a, i) => {
    n[a] = i(e, t), e.addEventListener(a, n[a], !1);
  });
  const o = { element: e, addListener: (a) => (t.push(a), () => {
    t.splice(t.indexOf(a), 1), t.length === 0 && (Pt.splice(Pt.indexOf(o), 1), K(r, (i) => {
      e.removeEventListener(i, n[i], !1);
    }));
  }) };
  return o;
}, Qc = (e, t) => ("elementFromPoint" in e || (e = document), e.elementFromPoint(t.x, t.y)), Rr = (e, t) => {
  const r = Cc(t), n = Qc(r, { x: e.pageX - window.pageXOffset, y: e.pageY - window.pageYOffset });
  return n === t || t.contains(n);
};
let vo = null;
const Rt = (e, t) => {
  try {
    e.dropEffect = t;
  } catch {
  }
}, Zc = (e, t) => (r) => {
  r.preventDefault(), vo = r.target, t.forEach((n) => {
    const { element: o, onenter: a } = n;
    Rr(r, o) && (n.state = "enter", a(We(r)));
  });
}, Kc = (e, t) => (r) => {
  r.preventDefault();
  const n = r.dataTransfer;
  Sr(n).then((o) => {
    let a = !1;
    t.some((i) => {
      const { filterElement: s, element: l, onenter: u, onexit: p, ondrag: m, allowdrop: h } = i;
      Rt(n, "copy");
      const _ = h(o);
      if (!_) {
        Rt(n, "none");
        return;
      }
      if (Rr(r, l)) {
        if (a = !0, i.state === null) {
          i.state = "enter", u(We(r));
          return;
        }
        if (i.state = "over", s && !_) {
          Rt(n, "none");
          return;
        }
        m(We(r));
      } else s && !a && Rt(n, "none"), i.state && (i.state = null, p(We(r)));
    });
  });
}, Jc = (e, t) => (r) => {
  r.preventDefault();
  const n = r.dataTransfer;
  Sr(n).then((o) => {
    t.forEach((a) => {
      const { filterElement: i, element: s, ondrop: l, onexit: u, allowdrop: p } = a;
      if (a.state = null, !(i && !Rr(r, s))) {
        if (!p(o)) return u(We(r));
        l(We(r), o);
      }
    });
  });
}, eu = (e, t) => (r) => {
  vo === r.target && t.forEach((n) => {
    const { onexit: o } = n;
    n.state = null, o(We(r));
  });
}, tu = (e, t, r) => {
  e.classList.add("filepond--hopper");
  const { catchesDropsOnPage: n, requiresDropOnElement: o, filterItems: a = (p) => p } = r, i = Wc(e, n ? document.documentElement : e, o);
  let s = "", l = "";
  i.allowdrop = (p) => t(a(p)), i.ondrop = (p, m) => {
    const h = a(m);
    if (!t(h)) {
      u.ondragend(p);
      return;
    }
    l = "drag-drop", u.onload(h, p);
  }, i.ondrag = (p) => {
    u.ondrag(p);
  }, i.onenter = (p) => {
    l = "drag-over", u.ondragstart(p);
  }, i.onexit = (p) => {
    l = "drag-exit", u.ondragend(p);
  };
  const u = { updateHopperState: () => {
    s !== l && (e.dataset.hopperState = l, s = l);
  }, onload: () => {
  }, ondragstart: () => {
  }, ondrag: () => {
  }, ondragend: () => {
  }, destroy: () => {
    i.destroy();
  } };
  return u;
};
let ar = !1;
const tt = [], Ro = (e) => {
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
    if (!r) return;
  }
  Sr(e.clipboardData).then((r) => {
    r.length && tt.forEach((n) => n(r));
  });
}, ru = (e) => {
  tt.includes(e) || (tt.push(e), !ar && (ar = !0, document.addEventListener("paste", Ro)));
}, nu = (e) => {
  hr(tt, tt.indexOf(e)), tt.length === 0 && (document.removeEventListener("paste", Ro), ar = !1);
}, ou = () => {
  const e = (r) => {
    t.onload(r);
  }, t = { destroy: () => {
    nu(e);
  }, onload: () => {
  } };
  return ru(e), t;
}, iu = ({ root: e, props: t }) => {
  e.element.id = `filepond--assistant-${t.id}`, ne(e.element, "role", "status"), ne(e.element, "aria-live", "polite"), ne(e.element, "aria-relevant", "additions");
};
let Sn = null, vn = null;
const Zt = [], Vt = (e, t) => {
  e.element.textContent = t;
}, au = (e) => {
  e.element.textContent = "";
}, Oo = (e, t, r) => {
  const n = e.query("GET_TOTAL_ITEMS");
  Vt(e, `${r} ${t}, ${n} ${n === 1 ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL")}`), clearTimeout(vn), vn = setTimeout(() => {
    au(e);
  }, 1500);
}, bo = (e) => e.element.parentNode.contains(document.activeElement), su = ({ root: e, action: t }) => {
  if (!bo(e)) return;
  e.element.textContent = "";
  const r = e.query("GET_ITEM", t.id);
  Zt.push(r.filename), clearTimeout(Sn), Sn = setTimeout(() => {
    Oo(e, Zt.join(", "), e.query("GET_LABEL_FILE_ADDED")), Zt.length = 0;
  }, 750);
}, lu = ({ root: e, action: t }) => {
  if (!bo(e)) return;
  const r = t.item;
  Oo(e, r.filename, e.query("GET_LABEL_FILE_REMOVED"));
}, cu = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, n = e.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
  Vt(e, `${r} ${n}`);
}, Rn = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, n = e.query("GET_LABEL_FILE_PROCESSING_ABORTED");
  Vt(e, `${r} ${n}`);
}, Ot = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename;
  Vt(e, `${t.status.main} ${r} ${t.status.sub}`);
}, uu = oe({ create: iu, ignoreRect: !0, ignoreRectUpdate: !0, write: pe({ DID_LOAD_ITEM: su, DID_REMOVE_ITEM: lu, DID_COMPLETE_ITEM_PROCESSING: cu, DID_ABORT_ITEM_PROCESSING: Rn, DID_REVERT_ITEM_PROCESSING: Rn, DID_THROW_ITEM_REMOVE_ERROR: Ot, DID_THROW_ITEM_LOAD_ERROR: Ot, DID_THROW_ITEM_INVALID: Ot, DID_THROW_ITEM_PROCESSING_ERROR: Ot }), tag: "span", name: "assistant" }), Do = (e, t = "-") => e.replace(new RegExp(`${t}.`, "g"), (r) => r.charAt(1).toUpperCase()), wo = (e, t = 16, r = !0) => {
  let n = Date.now(), o = null;
  return (...a) => {
    clearTimeout(o);
    const i = Date.now() - n, s = () => {
      n = Date.now(), e(...a);
    };
    i < t ? r || (o = setTimeout(s, t - i)) : s();
  };
}, du = 1e6, Mt = (e) => e.preventDefault(), pu = ({ root: e, props: t }) => {
  const r = e.query("GET_ID");
  r && (e.element.id = r);
  const n = e.query("GET_CLASS_NAME");
  n && n.split(" ").filter((s) => s.length).forEach((s) => {
    e.element.classList.add(s);
  }), e.ref.label = e.appendChildView(e.createChildView(hc, { ...t, translateY: null, caption: e.query("GET_LABEL_IDLE") })), e.ref.list = e.appendChildView(e.createChildView(cc, { translateY: null })), e.ref.panel = e.appendChildView(e.createChildView(fo, { name: "panel-root" })), e.ref.assistant = e.appendChildView(e.createChildView(uu, { ...t })), e.ref.data = e.appendChildView(e.createChildView(Mc, { ...t })), e.ref.measure = Le("div"), e.ref.measure.style.height = "100%", e.element.appendChild(e.ref.measure), e.ref.bounds = null, e.query("GET_STYLES").filter((s) => !Ae(s.value)).map(({ name: s, value: l }) => {
    e.element.dataset[s] = l;
  }), e.ref.widthPrevious = null, e.ref.widthUpdated = wo(() => {
    e.ref.updateHistory = [], e.dispatch("DID_RESIZE_ROOT");
  }, 250), e.ref.previousAspectRatio = null, e.ref.updateHistory = [];
  const o = window.matchMedia("(pointer: fine) and (hover: hover)").matches, a = "PointerEvent" in window;
  e.query("GET_ALLOW_REORDER") && a && !o && (e.element.addEventListener("touchmove", Mt, { passive: !1 }), e.element.addEventListener("gesturestart", Mt));
  const i = e.query("GET_CREDITS");
  if (i.length === 2) {
    const s = document.createElement("a");
    s.className = "filepond--credits", s.setAttribute("aria-hidden", "true"), s.href = i[0], s.tabindex = -1, s.target = "_blank", s.rel = "noopener noreferrer", s.textContent = i[1], e.element.appendChild(s), e.ref.credits = s;
  }
}, fu = ({ root: e, props: t, actions: r }) => {
  if (Tu({ root: e, props: t, actions: r }), r.filter((F) => /^DID_SET_STYLE_/.test(F.type)).filter((F) => !Ae(F.data.value)).map(({ type: F, data: w }) => {
    const L = Do(F.substring(8).toLowerCase(), "_");
    e.element.dataset[L] = w.value, e.invalidateLayout();
  }), e.rect.element.hidden) return;
  e.rect.element.width !== e.ref.widthPrevious && (e.ref.widthPrevious = e.rect.element.width, e.ref.widthUpdated());
  let n = e.ref.bounds;
  n || (n = e.ref.bounds = mu(e), e.element.removeChild(e.ref.measure), e.ref.measure = null);
  const { hopper: o, label: a, list: i, panel: s } = e.ref;
  o && o.updateHopperState();
  const l = e.query("GET_PANEL_ASPECT_RATIO"), u = e.query("GET_ALLOW_MULTIPLE"), p = e.query("GET_TOTAL_ITEMS"), m = u ? e.query("GET_MAX_FILES") || du : 1, h = p === m, _ = r.find((F) => F.type === "DID_ADD_ITEM");
  if (h && _) {
    const F = _.data.interactionMethod;
    a.opacity = 0, u ? a.translateY = -40 : F === Ie.API ? a.translateX = 40 : F === Ie.BROWSE ? a.translateY = 40 : a.translateY = 30;
  } else h || (a.opacity = 1, a.translateX = 0, a.translateY = 0);
  const E = Eu(e), I = hu(e), b = a.rect.element.height, R = !u || h ? 0 : b, D = h ? i.rect.element.marginTop : 0, C = p === 0 ? 0 : i.rect.element.marginBottom, N = R + D + I.visual + C, A = R + D + I.bounds + C;
  if (i.translateY = Math.max(0, R - i.rect.element.marginTop) - E.top, l) {
    const F = e.rect.element.width, w = F * l;
    l !== e.ref.previousAspectRatio && (e.ref.previousAspectRatio = l, e.ref.updateHistory = []);
    const L = e.ref.updateHistory;
    L.push(F);
    const z = 2;
    if (L.length > z * 2) {
      const q = L.length, Q = q - 10;
      let Z = 0;
      for (let O = q; O >= Q; O--) if (L[O] === L[O - 2] && Z++, Z >= z) return;
    }
    s.scalable = !1, s.height = w;
    const P = w - R - (C - E.bottom) - (h ? D : 0);
    I.visual > P ? i.overflow = P : i.overflow = null, e.height = w;
  } else if (n.fixedHeight) {
    s.scalable = !1;
    const F = n.fixedHeight - R - (C - E.bottom) - (h ? D : 0);
    I.visual > F ? i.overflow = F : i.overflow = null;
  } else if (n.cappedHeight) {
    const F = N >= n.cappedHeight, w = Math.min(n.cappedHeight, N);
    s.scalable = !0, s.height = F ? w : w - E.top - E.bottom;
    const L = w - R - (C - E.bottom) - (h ? D : 0);
    N > n.cappedHeight && I.visual > L ? i.overflow = L : i.overflow = null, e.height = Math.min(n.cappedHeight, A - E.top - E.bottom);
  } else {
    const F = p > 0 ? E.top + E.bottom : 0;
    s.scalable = !0, s.height = Math.max(b, N - F), e.height = Math.max(b, A - F);
  }
  e.ref.credits && s.heightCurrent && (e.ref.credits.style.transform = `translateY(${s.heightCurrent}px)`);
}, Eu = (e) => {
  const t = e.ref.list.childViews[0].childViews[0];
  return t ? { top: t.rect.element.marginTop, bottom: t.rect.element.marginBottom } : { top: 0, bottom: 0 };
}, hu = (e) => {
  let t = 0, r = 0;
  const n = e.ref.list, o = n.childViews[0], a = o.childViews.filter((D) => D.rect.element.height), i = e.query("GET_ACTIVE_ITEMS").map((D) => a.find((C) => C.id === D.id)).filter((D) => D);
  if (i.length === 0) return { visual: t, bounds: r };
  const s = o.rect.element.width, l = gr(o, i, n.dragCoordinates), u = i[0].rect.element, p = u.marginTop + u.marginBottom, m = u.marginLeft + u.marginRight, h = u.width + m, _ = u.height + p, E = typeof l < "u" && l >= 0 ? 1 : 0, I = i.find((D) => D.markedForRemoval && D.opacity < 0.45) ? -1 : 0, b = i.length + E + I, R = Ir(s, h);
  return R === 1 ? i.forEach((D) => {
    const C = D.rect.element.height + p;
    r += C, t += C * D.opacity;
  }) : (r = Math.ceil(b / R) * _, t = r), { visual: t, bounds: r };
}, mu = (e) => {
  const t = e.ref.measureHeight || null;
  return { cappedHeight: parseInt(e.style.maxHeight, 10) || null, fixedHeight: t === 0 ? null : t };
}, Or = (e, t) => {
  const r = e.query("GET_ALLOW_REPLACE"), n = e.query("GET_ALLOW_MULTIPLE"), o = e.query("GET_TOTAL_ITEMS");
  let a = e.query("GET_MAX_FILES");
  const i = t.length;
  return !n && i > 1 ? (e.dispatch("DID_THROW_MAX_FILES", { source: t, error: J("warning", 0, "Max files") }), !0) : (a = n ? a : 1, !n && r ? !1 : it(a) && o + i > a ? (e.dispatch("DID_THROW_MAX_FILES", { source: t, error: J("warning", 0, "Max files") }), !0) : !1);
}, _u = (e, t, r) => {
  const n = e.childViews[0];
  return gr(n, t, { left: r.scopeLeft - n.rect.element.left, top: r.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop) });
}, On = (e) => {
  const t = e.query("GET_ALLOW_DROP"), r = e.query("GET_DISABLED"), n = t && !r;
  if (n && !e.ref.hopper) {
    const o = tu(e.element, (a) => {
      const i = e.query("GET_BEFORE_DROP_FILE") || (() => !0);
      return e.query("GET_DROP_VALIDATION") ? a.every((s) => Xe("ALLOW_HOPPER_ITEM", s, { query: e.query }).every((l) => l === !0) && i(s)) : !0;
    }, { filterItems: (a) => {
      const i = e.query("GET_IGNORED_FILES");
      return a.filter((s) => ot(s) ? !i.includes(s.name.toLowerCase()) : !0);
    }, catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"), requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT") });
    o.onload = (a, i) => {
      const s = e.ref.list.childViews[0].childViews.filter((u) => u.rect.element.height), l = e.query("GET_ACTIVE_ITEMS").map((u) => s.find((p) => p.id === u.id)).filter((u) => u);
      ye("ADD_ITEMS", a, { dispatch: e.dispatch }).then((u) => {
        if (Or(e, u)) return !1;
        e.dispatch("ADD_ITEMS", { items: u, index: _u(e.ref.list, l, i), interactionMethod: Ie.DROP });
      }), e.dispatch("DID_DROP", { position: i }), e.dispatch("DID_END_DRAG", { position: i });
    }, o.ondragstart = (a) => {
      e.dispatch("DID_START_DRAG", { position: a });
    }, o.ondrag = wo((a) => {
      e.dispatch("DID_DRAG", { position: a });
    }), o.ondragend = (a) => {
      e.dispatch("DID_END_DRAG", { position: a });
    }, e.ref.hopper = o, e.ref.drip = e.appendChildView(e.createChildView(vc));
  } else !n && e.ref.hopper && (e.ref.hopper.destroy(), e.ref.hopper = null, e.removeChildView(e.ref.drip));
}, bn = (e, t) => {
  const r = e.query("GET_ALLOW_BROWSE"), n = e.query("GET_DISABLED"), o = r && !n;
  o && !e.ref.browser ? e.ref.browser = e.appendChildView(e.createChildView(fc, { ...t, onload: (a) => {
    ye("ADD_ITEMS", a, { dispatch: e.dispatch }).then((i) => {
      if (Or(e, i)) return !1;
      e.dispatch("ADD_ITEMS", { items: i, index: -1, interactionMethod: Ie.BROWSE });
    });
  } }), 0) : !o && e.ref.browser && (e.removeChildView(e.ref.browser), e.ref.browser = null);
}, Dn = (e) => {
  const t = e.query("GET_ALLOW_PASTE"), r = e.query("GET_DISABLED"), n = t && !r;
  n && !e.ref.paster ? (e.ref.paster = ou(), e.ref.paster.onload = (o) => {
    ye("ADD_ITEMS", o, { dispatch: e.dispatch }).then((a) => {
      if (Or(e, a)) return !1;
      e.dispatch("ADD_ITEMS", { items: a, index: -1, interactionMethod: Ie.PASTE });
    });
  }) : !n && e.ref.paster && (e.ref.paster.destroy(), e.ref.paster = null);
}, Tu = pe({ DID_SET_ALLOW_BROWSE: ({ root: e, props: t }) => {
  bn(e, t);
}, DID_SET_ALLOW_DROP: ({ root: e }) => {
  On(e);
}, DID_SET_ALLOW_PASTE: ({ root: e }) => {
  Dn(e);
}, DID_SET_DISABLED: ({ root: e, props: t }) => {
  On(e), Dn(e), bn(e, t), e.query("GET_DISABLED") ? e.element.dataset.disabled = "disabled" : e.element.removeAttribute("data-disabled");
} }), Iu = oe({ name: "root", read: ({ root: e }) => {
  e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight);
}, create: pu, write: fu, destroy: ({ root: e }) => {
  e.ref.paster && e.ref.paster.destroy(), e.ref.hopper && e.ref.hopper.destroy(), e.element.removeEventListener("touchmove", Mt), e.element.removeEventListener("gesturestart", Mt);
}, mixins: { styles: ["height"] } }), gu = (e = {}) => {
  let t = null;
  const r = Lt(), n = Fa(ys(r), [qs, Rs(r)], [dl, vs(r)]);
  n.dispatch("SET_OPTIONS", { options: e });
  const o = () => {
    document.hidden || n.dispatch("KICK");
  };
  document.addEventListener("visibilitychange", o);
  let a = null, i = !1, s = !1, l = null, u = null;
  const p = () => {
    i || (i = !0), clearTimeout(a), a = setTimeout(() => {
      i = !1, l = null, u = null, s && (s = !1, n.dispatch("DID_STOP_RESIZE"));
    }, 500);
  };
  window.addEventListener("resize", p);
  const m = Iu(n, { id: Er() });
  let h = !1, _ = !1;
  const E = { _read: () => {
    i && (u = window.innerWidth, l || (l = u), !s && u !== l && (n.dispatch("DID_START_RESIZE"), s = !0)), _ && h && (h = m.element.offsetParent === null), !h && (m._read(), _ = m.rect.element.hidden);
  }, _write: (y) => {
    const v = n.processActionQueue().filter((M) => !/^SET_/.test(M.type));
    h && !v.length || (D(v), h = m._write(y, v, s), Ds(n.query("GET_ITEMS")), h && n.processDispatchQueue());
  } }, I = (y) => (v) => {
    const M = { type: y };
    if (!v) return M;
    if (v.hasOwnProperty("error") && (M.error = v.error ? { ...v.error } : null), v.status && (M.status = { ...v.status }), v.file && (M.output = v.file), v.source) M.file = v.source;
    else if (v.item || v.id) {
      const x = v.item ? v.item : n.query("GET_ITEM", v.id);
      M.file = x ? Ee(x) : null;
    }
    return v.items && (M.items = v.items.map(Ee)), /progress/.test(y) && (M.progress = v.progress), v.hasOwnProperty("origin") && v.hasOwnProperty("target") && (M.origin = v.origin, M.target = v.target), M;
  }, b = { DID_DESTROY: I("destroy"), DID_INIT: I("init"), DID_THROW_MAX_FILES: I("warning"), DID_INIT_ITEM: I("initfile"), DID_START_ITEM_LOAD: I("addfilestart"), DID_UPDATE_ITEM_LOAD_PROGRESS: I("addfileprogress"), DID_LOAD_ITEM: I("addfile"), DID_THROW_ITEM_INVALID: [I("error"), I("addfile")], DID_THROW_ITEM_LOAD_ERROR: [I("error"), I("addfile")], DID_THROW_ITEM_REMOVE_ERROR: [I("error"), I("removefile")], DID_PREPARE_OUTPUT: I("preparefile"), DID_START_ITEM_PROCESSING: I("processfilestart"), DID_UPDATE_ITEM_PROCESS_PROGRESS: I("processfileprogress"), DID_ABORT_ITEM_PROCESSING: I("processfileabort"), DID_COMPLETE_ITEM_PROCESSING: I("processfile"), DID_COMPLETE_ITEM_PROCESSING_ALL: I("processfiles"), DID_REVERT_ITEM_PROCESSING: I("processfilerevert"), DID_THROW_ITEM_PROCESSING_ERROR: [I("error"), I("processfile")], DID_REMOVE_ITEM: I("removefile"), DID_UPDATE_ITEMS: I("updatefiles"), DID_ACTIVATE_ITEM: I("activatefile"), DID_REORDER_ITEMS: I("reorderfiles") }, R = (y) => {
    const v = { pond: $, ...y };
    delete v.type, m.element.dispatchEvent(new CustomEvent(`FilePond:${y.type}`, { detail: v, bubbles: !0, cancelable: !0, composed: !0 }));
    const M = [];
    y.hasOwnProperty("error") && M.push(y.error), y.hasOwnProperty("file") && M.push(y.file);
    const x = ["type", "error", "file"];
    Object.keys(y).filter((fe) => !x.includes(fe)).forEach((fe) => M.push(y[fe])), $.fire(y.type, ...M);
    const V = n.query(`GET_ON${y.type.toUpperCase()}`);
    V && V(...M);
  }, D = (y) => {
    y.length && y.filter((v) => b[v.type]).forEach((v) => {
      const M = b[v.type];
      (Array.isArray(M) ? M : [M]).forEach((x) => {
        v.type === "DID_INIT_ITEM" ? R(x(v.data)) : setTimeout(() => {
          R(x(v.data));
        }, 0);
      });
    });
  }, C = (y) => n.dispatch("SET_OPTIONS", { options: y }), N = (y) => n.query("GET_ACTIVE_ITEM", y), A = (y) => new Promise((v, M) => {
    n.dispatch("REQUEST_ITEM_PREPARE", { query: y, success: (x) => {
      v(x);
    }, failure: (x) => {
      M(x);
    } });
  }), F = (y, v = {}) => new Promise((M, x) => {
    z([{ source: y, options: v }], { index: v.index }).then((V) => M(V && V[0])).catch(x);
  }), w = (y) => y.file && y.id, L = (y, v) => (typeof y == "object" && !w(y) && !v && (v = y, y = void 0), n.dispatch("REMOVE_ITEM", { ...v, query: y }), n.query("GET_ACTIVE_ITEM", y) === null), z = (...y) => new Promise((v, M) => {
    const x = [], V = {};
    if (Ft(y[0])) x.push.apply(x, y[0]), Object.assign(V, y[1] || {});
    else {
      const fe = y[y.length - 1];
      typeof fe == "object" && !(fe instanceof Blob) && Object.assign(V, y.pop()), x.push(...y);
    }
    n.dispatch("ADD_ITEMS", { items: x, index: V.index, interactionMethod: Ie.API, success: v, failure: M });
  }), P = () => n.query("GET_ACTIVE_ITEMS"), q = (y) => new Promise((v, M) => {
    n.dispatch("REQUEST_ITEM_PROCESSING", { query: y, success: (x) => {
      v(x);
    }, failure: (x) => {
      M(x);
    } });
  }), Q = (...y) => {
    const v = Array.isArray(y[0]) ? y[0] : y, M = v.length ? v : P();
    return Promise.all(M.map(A));
  }, Z = (...y) => {
    const v = Array.isArray(y[0]) ? y[0] : y;
    if (!v.length) {
      const M = P().filter((x) => !(x.status === U.IDLE && x.origin === ie.LOCAL) && x.status !== U.PROCESSING && x.status !== U.PROCESSING_COMPLETE && x.status !== U.PROCESSING_REVERT_ERROR);
      return Promise.all(M.map(q));
    }
    return Promise.all(v.map(q));
  }, O = (...y) => {
    const v = Array.isArray(y[0]) ? y[0] : y;
    let M;
    typeof v[v.length - 1] == "object" ? M = v.pop() : Array.isArray(y[0]) && (M = y[1]);
    const x = P();
    return v.length ? v.map((V) => Ve(V) ? x[V] ? x[V].id : null : V).filter((V) => V).map((V) => L(V, M)) : Promise.all(x.map((V) => L(V, M)));
  }, $ = { ...qt(), ...E, ...Ss(n, r), setOptions: C, addFile: F, addFiles: z, getFile: N, processFile: q, prepareFile: A, removeFile: L, moveFile: (y, v) => n.dispatch("MOVE_ITEM", { query: y, index: v }), getFiles: P, processFiles: Z, removeFiles: O, prepareFiles: Q, sort: (y) => n.dispatch("SORT", { compare: y }), browse: () => {
    var y = m.element.querySelector("input[type=file]");
    y && y.click();
  }, destroy: () => {
    $.fire("destroy", m.element), n.dispatch("ABORT_ALL"), m._destroy(), window.removeEventListener("resize", p), document.removeEventListener("visibilitychange", o), n.dispatch("DID_DESTROY");
  }, insertBefore: (y) => Qr(m.element, y), insertAfter: (y) => Zr(m.element, y), appendTo: (y) => y.appendChild(m.element), replaceElement: (y) => {
    Qr(m.element, y), y.parentNode.removeChild(y), t = y;
  }, restoreElement: () => {
    t && (Zr(t, m.element), m.element.parentNode.removeChild(m.element), t = null);
  }, isAttachedTo: (y) => m.element === y || t === y, element: { get: () => m.element }, status: { get: () => n.query("GET_STATUS") } };
  return n.dispatch("DID_INIT"), Fe($);
}, Ao = (e = {}) => {
  const t = {};
  return K(Lt(), (r, n) => {
    t[r] = n[0];
  }), gu({ ...t, ...e });
}, yu = (e) => e.charAt(0).toLowerCase() + e.slice(1), Su = (e) => Do(e.replace(/^data-/, "")), Lo = (e, t) => {
  K(t, (r, n) => {
    K(e, (o, a) => {
      const i = new RegExp(r);
      if (!i.test(o) || (delete e[o], n === !1)) return;
      if (de(n)) {
        e[n] = a;
        return;
      }
      const s = n.group;
      ae(n) && !e[s] && (e[s] = {}), e[s][yu(o.replace(i, ""))] = a;
    }), n.mapping && Lo(e[n.group], n.mapping);
  });
}, vu = (e, t = {}) => {
  const r = [];
  K(e.attributes, (o) => {
    r.push(e.attributes[o]);
  });
  const n = r.filter((o) => o.name).reduce((o, a) => {
    const i = ne(e, a.name);
    return o[Su(a.name)] = i === a.name ? !0 : i, o;
  }, {});
  return Lo(n, t), n;
}, Ru = (e, t = {}) => {
  const r = { "^class$": "className", "^multiple$": "allowMultiple", "^capture$": "captureMethod", "^webkitdirectory$": "allowDirectoriesOnly", "^server": { group: "server", mapping: { "^process": { group: "process" }, "^revert": { group: "revert" }, "^fetch": { group: "fetch" }, "^restore": { group: "restore" }, "^load": { group: "load" } } }, "^type$": !1, "^files$": !1 };
  Xe("SET_ATTRIBUTE_TO_OPTION_MAP", r);
  const n = { ...t }, o = vu(e.nodeName === "FIELDSET" ? e.querySelector("input[type=file]") : e, r);
  Object.keys(o).forEach((i) => {
    ae(o[i]) ? (ae(n[i]) || (n[i] = {}), Object.assign(n[i], o[i])) : n[i] = o[i];
  }), n.files = (t.files || []).concat(Array.from(e.querySelectorAll("input:not([type=file])")).map((i) => ({ source: i.value, options: { type: i.dataset.type } })));
  const a = Ao(n);
  return e.files && Array.from(e.files).forEach((i) => {
    a.addFile(i);
  }), a.replaceElement(e), a;
}, Ou = (...e) => Ga(e[0]) ? Ru(...e) : Ao(...e), bu = ["fire", "_read", "_write"], wn = (e) => {
  const t = {};
  return Qn(e, t, bu), t;
}, Du = (e, t) => e.replace(/(?:{([a-zA-Z]+)})/g, (r, n) => t[n]), wu = (e) => {
  const t = new Blob(["(", e.toString(), ")()"], { type: "application/javascript" }), r = URL.createObjectURL(t), n = new Worker(r);
  return { transfer: (o, a) => {
  }, post: (o, a, i) => {
    const s = Er();
    n.onmessage = (l) => {
      l.data.id === s && a(l.data.message);
    }, n.postMessage({ id: s, message: o }, i);
  }, terminate: () => {
    n.terminate(), URL.revokeObjectURL(r);
  } };
}, Au = (e) => new Promise((t, r) => {
  const n = new Image();
  n.onload = () => {
    t(n);
  }, n.onerror = (o) => {
    r(o);
  }, n.src = e;
}), Po = (e, t) => {
  const r = e.slice(0, e.size, e.type);
  return r.lastModifiedDate = e.lastModifiedDate, r.name = t, r;
}, Lu = (e) => Po(e, e.name), An = [], Pu = (e) => {
  if (An.includes(e)) return;
  An.push(e);
  const t = e({ addFilter: As, utils: { Type: g, forin: K, isString: de, isFile: ot, toNaturalFileSize: co, replaceInString: Du, getExtensionFromFilename: Bt, getFilenameWithoutExtension: ao, guesstimateMimeType: yo, getFileFromBlob: nt, getFilenameFromURL: _t, createRoute: pe, createWorker: wu, createView: oe, createItemAPI: Ee, loadImage: Au, copyFile: Lu, renameFile: Po, createBlob: no, applyFilterChain: ye, text: ee, getNumericAspectRatioFromString: Jn }, views: { fileActionButton: lo } });
  Ls(t.options);
}, Mu = () => Object.prototype.toString.call(window.operamini) === "[object OperaMini]", Cu = () => "Promise" in window, Nu = () => "slice" in Blob.prototype, Gu = () => "URL" in window && "createObjectURL" in window.URL, Fu = () => "visibilityState" in document, xu = () => "performance" in window, ku = () => "supports" in (window.CSS || {}), qu = () => /MSIE|Trident/.test(window.navigator.userAgent), Ln = (() => {
  const e = Yn() && !Mu() && Fu() && Cu() && Nu() && Gu() && xu() && (ku() || qu());
  return () => e;
})(), Ce = { apps: [] }, Bu = "filepond", Qe = () => {
};
let sr = {}, Pn = {}, Dt = Qe, Kt = Qe, Mn = Qe, Cn = Qe, Ct = Qe, Nn = Qe, Gn = Qe;
if (Ln()) {
  ss(() => {
    Ce.apps.forEach((r) => r._read());
  }, (r) => {
    Ce.apps.forEach((n) => n._write(r));
  });
  const e = () => {
    document.dispatchEvent(new CustomEvent("FilePond:loaded", { detail: { supported: Ln, create: Dt, destroy: Kt, parse: Mn, find: Cn, registerPlugin: Ct, setOptions: Gn } })), document.removeEventListener("DOMContentLoaded", e);
  };
  document.readyState !== "loading" ? setTimeout(() => e(), 0) : document.addEventListener("DOMContentLoaded", e);
  const t = () => K(Lt(), (r, n) => {
    Pn[r] = n[1];
  });
  sr = { ...eo }, Pn = {}, t(), Dt = (...r) => {
    const n = Ou(...r);
    return n.on("destroy", Kt), Ce.apps.push(n), wn(n);
  }, Kt = (r) => {
    const n = Ce.apps.findIndex((o) => o.isAttachedTo(r));
    return n >= 0 ? (Ce.apps.splice(n, 1)[0].restoreElement(), !0) : !1;
  }, Mn = (r) => Array.from(r.querySelectorAll(`.${Bu}`)).filter((n) => !Ce.apps.find((o) => o.isAttachedTo(n))).map((n) => Dt(n)), Cn = (r) => {
    const n = Ce.apps.find((o) => o.isAttachedTo(r));
    return n ? wn(n) : null;
  }, Ct = (...r) => {
    r.forEach(Pu), t();
  }, Nn = () => {
    const r = {};
    return K(Lt(), (n, o) => {
      r[n] = o[0];
    }), r;
  }, Gn = (r) => (ae(r) && (Ce.apps.forEach((n) => {
    n.setOptions(r);
  }), Ps(r)), Nn());
}
/*!
* FilePondPluginFileValidateSize 2.2.8
* Licensed under MIT, https://opensource.org/licenses/MIT/
* Please visit https://pqina.nl/filepond/ for details.
*/
const Mo = ({ addFilter: e, utils: t }) => {
  const { Type: r, replaceInString: n, toNaturalFileSize: o } = t;
  return e("ALLOW_HOPPER_ITEM", (a, { query: i }) => {
    if (!i("GET_ALLOW_FILE_SIZE_VALIDATION")) return !0;
    const s = i("GET_MAX_FILE_SIZE");
    if (s !== null && a.size > s) return !1;
    const l = i("GET_MIN_FILE_SIZE");
    return !(l !== null && a.size < l);
  }), e("LOAD_FILE", (a, { query: i }) => new Promise((s, l) => {
    if (!i("GET_ALLOW_FILE_SIZE_VALIDATION")) return s(a);
    const u = i("GET_FILE_VALIDATE_SIZE_FILTER");
    if (u && !u(a)) return s(a);
    const p = i("GET_MAX_FILE_SIZE");
    if (p !== null && a.size > p) {
      l({ status: { main: i("GET_LABEL_MAX_FILE_SIZE_EXCEEDED"), sub: n(i("GET_LABEL_MAX_FILE_SIZE"), { filesize: o(p, ".", i("GET_FILE_SIZE_BASE"), i("GET_FILE_SIZE_LABELS", i)) }) } });
      return;
    }
    const m = i("GET_MIN_FILE_SIZE");
    if (m !== null && a.size < m) {
      l({ status: { main: i("GET_LABEL_MIN_FILE_SIZE_EXCEEDED"), sub: n(i("GET_LABEL_MIN_FILE_SIZE"), { filesize: o(m, ".", i("GET_FILE_SIZE_BASE"), i("GET_FILE_SIZE_LABELS", i)) }) } });
      return;
    }
    const h = i("GET_MAX_TOTAL_FILE_SIZE");
    if (h !== null && i("GET_ACTIVE_ITEMS").reduce((_, E) => _ + E.fileSize, 0) > h) {
      l({ status: { main: i("GET_LABEL_MAX_TOTAL_FILE_SIZE_EXCEEDED"), sub: n(i("GET_LABEL_MAX_TOTAL_FILE_SIZE"), { filesize: o(h, ".", i("GET_FILE_SIZE_BASE"), i("GET_FILE_SIZE_LABELS", i)) }) } });
      return;
    }
    s(a);
  })), { options: { allowFileSizeValidation: [!0, r.BOOLEAN], maxFileSize: [null, r.INT], minFileSize: [null, r.INT], maxTotalFileSize: [null, r.INT], fileValidateSizeFilter: [null, r.FUNCTION], labelMinFileSizeExceeded: ["File is too small", r.STRING], labelMinFileSize: ["Minimum file size is {filesize}", r.STRING], labelMaxFileSizeExceeded: ["File is too large", r.STRING], labelMaxFileSize: ["Maximum file size is {filesize}", r.STRING], labelMaxTotalFileSizeExceeded: ["Maximum total size exceeded", r.STRING], labelMaxTotalFileSize: ["Maximum total file size is {filesize}", r.STRING] } };
}, Uu = typeof window < "u" && typeof window.document < "u";
Uu && document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: Mo }));
/*!
* FilePondPluginFileValidateType 1.2.9
* Licensed under MIT, https://opensource.org/licenses/MIT/
* Please visit https://pqina.nl/filepond/ for details.
*/
const Co = ({ addFilter: e, utils: t }) => {
  const { Type: r, isString: n, replaceInString: o, guesstimateMimeType: a, getExtensionFromFilename: i, getFilenameFromURL: s } = t, l = (_, E) => {
    const I = (/^[^/]+/.exec(_) || []).pop(), b = E.slice(0, -2);
    return I === b;
  }, u = (_, E) => _.some((I) => /\*$/.test(I) ? l(E, I) : I === E), p = (_) => {
    let E = "";
    if (n(_)) {
      const I = s(_), b = i(I);
      b && (E = a(b));
    } else E = _.type;
    return E;
  }, m = (_, E, I) => {
    if (E.length === 0) return !0;
    const b = p(_);
    return I ? new Promise((R, D) => {
      I(_, b).then((C) => {
        u(E, C) ? R() : D();
      }).catch(D);
    }) : u(E, b);
  }, h = (_) => (E) => _[E] === null ? !1 : _[E] || E;
  return e("SET_ATTRIBUTE_TO_OPTION_MAP", (_) => Object.assign(_, { accept: "acceptedFileTypes" })), e("ALLOW_HOPPER_ITEM", (_, { query: E }) => E("GET_ALLOW_FILE_TYPE_VALIDATION") ? m(_, E("GET_ACCEPTED_FILE_TYPES")) : !0), e("LOAD_FILE", (_, { query: E }) => new Promise((I, b) => {
    if (!E("GET_ALLOW_FILE_TYPE_VALIDATION")) {
      I(_);
      return;
    }
    const R = E("GET_ACCEPTED_FILE_TYPES"), D = E("GET_FILE_VALIDATE_TYPE_DETECT_TYPE"), C = m(_, R, D), N = () => {
      const A = R.map(h(E("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP"))).filter((w) => w !== !1), F = A.filter((w, L) => A.indexOf(w) === L);
      b({ status: { main: E("GET_LABEL_FILE_TYPE_NOT_ALLOWED"), sub: o(E("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES"), { allTypes: F.join(", "), allButLastType: F.slice(0, -1).join(", "), lastType: F[F.length - 1] }) } });
    };
    if (typeof C == "boolean") return C ? I(_) : N();
    C.then(() => {
      I(_);
    }).catch(N);
  })), { options: { allowFileTypeValidation: [!0, r.BOOLEAN], acceptedFileTypes: [[], r.ARRAY], labelFileTypeNotAllowed: ["File is of invalid type", r.STRING], fileValidateTypeLabelExpectedTypes: ["Expects {allButLastType} or {lastType}", r.STRING], fileValidateTypeLabelExpectedTypesMap: [{}, r.OBJECT], fileValidateTypeDetectType: [null, r.FUNCTION] } };
}, Vu = typeof window < "u" && typeof window.document < "u";
Vu && document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: Co }));
class je {
  constructor(t) {
    if (t.dataset.refFileUpload) return je.refs[t.dataset.refFileUpload];
    this.ref = Math.random(), je.refs[this.ref] = this, t.dataset.refFileUpload = this.ref, this.inputs = t.querySelectorAll('input[type="file"]'), this.fileponds = {}, this.headers = { Authorization: "pFdRC99ihTG!C%BQB6EJKjc!n%" }, document.addEventListener("FilePond:loaded", () => this.onload());
    const r = new Ge(t.closest("[c-async-form]"));
    r.onBeforeSubmit = () => this.beforeSubmit(), r.onPayload = (n) => this.onPayload(n), r.onInput = async (n, o) => await this.inputHandler(n, o);
  }
  onload() {
    Ct(Co), Ct(Mo);
    const t = { server: { url: "https://formupload.agentur-chapeau.de/", process: { url: "process", headers: this.headers }, revert: { url: "revert", headers: this.headers }, restore: null, load: null, fetch: null }, credits: !1, ...Hu, ...window.c_fileupload_options };
    for (const r of this.inputs) this.fileponds[r.name] = Dt(r, { ...t, maxFiles: r.dataset.maxFiles || null, maxFileSize: r.dataset.maxFileSize || null, maxTotalFileSize: r.dataset.maxTotalFileSize || null });
  }
  beforeSubmit() {
    for (const [t, r] of Object.entries(this.fileponds)) if (!(r.status == sr.EMPTY || r.status == sr.READY)) return alert("Es sind noch nicht alle Dateien hochgeladen!"), !1;
    return !0;
  }
  onPayload(t) {
    for (const r of this.inputs) r.multiple && (t[r.name] = []);
    return t;
  }
  async inputHandler(t, r) {
    if (!t.closest(".filepond--root")) return r;
    if (!t.closest(".filepond--data")) return null;
    const n = this.fileponds[t.name], o = n.getFiles().find((u) => u.serverId === r), a = await fetch(`${n.server.url}finish`, { method: "POST", body: r, headers: this.headers });
    if (!a.ok) throw new Error("Upload could not finish ", a);
    const i = await a.text(), s = o.filename, l = o.fileSize;
    return { url: i, name: s, size: l };
  }
}
je.refs = {}, window.FileUpload = je, xn(() => {
  Array.from(document.querySelectorAll("[c-file-upload]")).forEach((e) => new je(e));
});
const Hu = { labelIdle: 'Dateien hierher ziehen oder <span class="filepond--label-action">auswählen</span>', labelInvalidField: "Feld enthält ungültige Dateien", labelFileWaitingForSize: "Auf Größe warten", labelFileSizeNotAvailable: "Größe nicht verfügbar", labelFileLoading: "Laden", labelFileLoadError: "Fehler beim Laden", labelFileProcessing: "Hochladen", labelFileProcessingComplete: "Hochgeladen", labelFileProcessingAborted: "Hochladen abgebrochen", labelFileProcessingError: "Fehler beim Hochladen", labelFileProcessingRevertError: "Fehler beim Entfernen", labelFileRemoveError: "Fehler beim Löschen", labelTapToCancel: "Tippen zum Abbrechen ", labelTapToRetry: "Tippen zum Wiederholen", labelTapToUndo: "Tippen zum Entfernen", labelButtonRemoveItem: "Entfernen", labelButtonAbortItemLoad: "Abbrechen", labelButtonRetryItemLoad: "Wiederholen", labelButtonAbortItemProcessing: "Abbrechen", labelButtonUndoItemProcessing: "Entfernen", labelButtonRetryItemProcessing: "Wiederholen", labelButtonProcessItem: "Hochladen", labelMaxFileSizeExceeded: "Datei ist zu groß", labelMaxFileSize: "Maximale Dateigröße beträgt {filesize}", labelMaxTotalFileSizeExceeded: "Maximale Gesamtgröße überschritten", labelMaxTotalFileSize: "Maximale Gesamtgröße beträgt {filesize}", labelFileTypeNotAllowed: "Ungültiger Dateityp", fileValidateTypeLabelExpectedTypes: "Gültige Dateitypen: {allButLastType} und {lastType}", fileValidateTypeLabelExpectedTypesMap: { "image/*": "Bilddateien", "image/png": ".png", "image/jpg": ".jpg", "image/jpeg": ".jpeg", "application/pdf": ".pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx" } };
var Ne = window.Webflow || [];
Ne.push(() => {
  Yu();
});
function Yu() {
  const e = document.querySelector('[c-chapeau-form="main"]'), t = e.querySelector('[c-chapeau-form="nav"]'), r = e.querySelector('[c-chapeau-form="total-steps"]'), n = e.querySelector('[c-chapeau-form="progress"]'), o = e.querySelector('[c-chapeau-form="slider"]'), a = e.querySelector('[c-chapeau-form="slides"]'), i = e.querySelector('[c-chapeau-form="not-qualified-message"]'), s = e.querySelector('[c-chapeau-form="buttons"]'), l = '[c-chapeau-form="form"]', u = '[c-chapeau-form="next"]', p = '[c-chapeau-form="back"]', m = '[c-chapeau-form="current-step"]';
  zu(o, a);
  const h = new ci.MSF({ hiddeButtonsOnSubmit: !1, scrollTopOnStepChange: !1, formSelector: l, nextSelector: u, backSelector: p, currentStepSelector: m });
  ju(h), $u(h, n), Xu(h), Wu(h, i, t, s), Ku(h), Qu(h, e), Zu(h, e);
  const _ = h.view.steps.length;
  r.textContent = _, window.msf = h, e.removeAttribute("c-cloak"), h.view.setMaskHeight(0);
}
function zu(e, t) {
  var o;
  const r = e.querySelector(":scope > .w-slider-mask"), n = Array.from(t.querySelectorAll(":scope > .w-dyn-items > .w-dyn-item"));
  Array.from(r.querySelectorAll(".w-slide")).forEach((a) => a.remove()), n.forEach((a) => {
    a.classList.add("w-slide"), r.appendChild(a);
  }), t.remove(), Ne.destroy(), Ne.ready(), (o = Ne.require("ix2")) == null || o.init(), Ne.require("slider").redraw(), Ne.require("slider").ready();
}
function $u({ view: e, controller: t }, r) {
  e.next.addEventListener("click", n), e.back.addEventListener("click", n), n();
  function n() {
    const o = t.currentStep + 1, a = e.steps.length, i = Math.min(o / a * 100, 100);
    r.style.width = `${i}%`;
  }
}
function Wu({ view: e, controller: t }, r, n, o) {
  e.form.addEventListener("change", a);
  function a() {
    var h;
    const u = e.getInputs(t.currentStep).some((_) => _.checked ? _.parentElement.querySelector('[c-chapeau-form="not-qualified"]') != null : !1), p = e.steps[t.currentStep], m = (h = p.nextSibling) == null ? void 0 : h.matches('[c-chapeau-form="not-qualified-message"]');
    u ? m || (p.insertAdjacentHTML("afterend", r.outerHTML), p.nextElementSibling.querySelector('[c-chapeau-form="not-qualified-back"]').addEventListener("click", () => e.back.click())) : m && p.nextSibling.remove(), p.dataset.notQualified = u, Ne.require("slider").redraw(), Ne.require("slider").ready();
  }
  const i = e.submitForm.bind(e);
  e.submitForm = () => {
    e.steps[e.steps.length - 1].dataset.notQualified === "true" ? (e.goNext(), s()) : i();
  }, e.next.addEventListener("click", () => {
    var u;
    ((u = e.steps[t.currentStep - 1]) == null ? void 0 : u.dataset.notQualified) === "true" && s();
  }), e.back.addEventListener("click", () => {
    l();
  });
  function s() {
    e.hideElement(n), e.hideElement(o);
  }
  function l() {
    e.showElement(n), e.showElement(o);
  }
}
function ju({ view: e }) {
  e.enableElement(e.back), e.disableElement = (t) => {
    t && t.classList.add("disabled");
  }, e.enableElement = (t) => {
    t && t.classList.remove("disabled");
  }, e.disableElement(e.back);
}
function Xu(e) {
  e.view;
  const t = e.controller, r = t.checkRequiredInputs.bind(t);
  function n() {
    this.inputsCurrentlyValid = !0;
    const o = this.view.getInputs(this.currentStep);
    for (const a of o) if (!a.reportValidity()) return this.inputsCurrentlyValid = !1, !1;
    return r();
  }
  t.checkRequiredInputs = n.bind(t);
}
function Qu({ view: e, controller: t }, r) {
  const n = e.back, o = e.next, a = new Ge(r);
  a.onState = (i) => {
    i === "success" && (e.hideElement(n), e.hideElement(o));
  }, t.observeSubmitText(), t.handleSubmit = () => {
    t.currentStep = Math.min(t.currentStep, e.steps.length - 1);
  };
}
function Zu(e, t) {
  new je(t);
  const r = e.view, n = e.controller;
  r.form.addEventListener("FilePond:updatefiles", () => {
    setTimeout(() => r.setMaskHeight(n.currentStep), 100);
  });
}
function Ku({ view: e, controller: t }) {
  e.form.addEventListener("change", r), e.next.addEventListener("click", r), e.back.addEventListener("click", r), r();
  function r() {
    const n = e.getInputs(t.currentStep).some((a) => !a.checkValidity()), o = e.steps[t.currentStep].dataset.notQualified == "true";
    e.next.dataset.trackDisabled = n || o;
  }
}
//# sourceMappingURL=chapeau-formular.js.map
