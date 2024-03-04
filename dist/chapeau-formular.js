document.addEventListener("DOMContentLoaded", () => {
  if (window.location.search) {
    const o = new URLSearchParams(window.location.search), s = o.get("gclid");
    s && window.localStorage.setItem("gclid", s);
    const i = o.get("fbclid");
    if (i) {
      const l = `fb.1.${Date.now()}.${i}`;
      window.localStorage.setItem("fbc", l);
    }
    const a = o.get("ttclid");
    a && window.localStorage.setItem("ttclid", a);
  }
  Array.from(document.querySelectorAll("[c-conversion] > form")).forEach((o) => {
    const s = ["gclid", "fbc", "fbp", "user-agent", "ttclid", "url"].reduce((i, a) => {
      const l = document.createElement("input");
      return l.type = "hidden", l.name = a, o.appendChild(l), {
        ...i,
        [a]: l
      };
    }, {});
    o.addEventListener("submit", () => {
      const i = r();
      s.gclid.value = i.gclid, s.fbc.value = i.fbc, s.fbp.value = i.fbp, s["user-agent"].value = i.useragent, s.ttclid.value = i.ttclid, s.url.value = i.url, window.fbq !== void 0 && fbq("track", "SubmitApplication", {}, { eventID: i.fbp });
    });
  }), Array.from(document.querySelectorAll("[data-fb-track]")).forEach((o) => {
    o.addEventListener("click", () => {
      if (o.dataset.trackDisabled === "true")
        return;
      const i = o.dataset.fbTrack, a = r(), l = o.dataset.trackUrl;
      window.fbq !== void 0 && fbq("track", i, {}, { eventID: a.fbp }), fetch(l, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          event: i,
          ...a
        })
      });
    });
  });
  function r() {
    const o = window.localStorage.getItem("gclid"), s = window.localStorage.getItem("fbc"), i = n("_fbp"), a = navigator.userAgent, l = window.localStorage.getItem("ttclid"), u = window.location.href;
    return {
      gclid: o,
      fbc: s,
      fbp: i,
      useragent: a,
      ttclid: l,
      url: u
    };
  }
  function n(o) {
    const i = `; ${document.cookie}`.split(`; ${o}=`);
    return i.length === 2 ? i.pop().split(";").shift() : null;
  }
});
var Tn = { exports: {} };
(function(e, t) {
  (function() {
    function r(d) {
      Object.defineProperty(d, "__esModule", { value: !0 });
    }
    var n = this, o = {};
    function s(d, c) {
      var f;
      if (typeof Symbol > "u" || d[Symbol.iterator] == null) {
        if (Array.isArray(d) || (f = i(d)) || c && d && typeof d.length == "number") {
          f && (d = f);
          var _ = 0, S = function() {
          };
          return { s: S, n: function() {
            return _ >= d.length ? { done: !0 } : { done: !1, value: d[_++] };
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
          if (B)
            throw k;
        }
      } };
    }
    function i(d, c) {
      if (d) {
        if (typeof d == "string")
          return a(d, c);
        var f = Object.prototype.toString.call(d).slice(8, -1);
        return f === "Object" && d.constructor && (f = d.constructor.name), f === "Map" || f === "Set" ? Array.from(d) : f === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f) ? a(d, c) : void 0;
      }
    }
    function a(d, c) {
      (c == null || c > d.length) && (c = d.length);
      for (var f = 0, _ = new Array(c); f < c; f++)
        _[f] = d[f];
      return _;
    }
    Object.defineProperty(o, "__esModule", { value: !0 });
    var l = (u = void 0, p = o.isFormElement = u, m = o.isVisible = p, h = o.getDistanceFromTop = m, T = o.convertToString = h, o.validateEmail = T);
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
      if (c.offsetParent)
        do
          f += c.offsetTop, c = c.offsetParent instanceof HTMLElement ? c.offsetParent : null;
        while (c);
      return f >= 0 ? f : 0;
    };
    o.getDistanceFromTop = m;
    var h = function(d) {
      return typeof d == "string" ? d : typeof d == "number" ? d.toString() : d ? "true" : "false";
    };
    o.convertToString = h;
    var T = function(d) {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(d).toLowerCase());
    };
    o.validateEmail = T, l = function(d) {
      var c, f, _ = s(d.childNodes);
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
    function I(d, c) {
      if (!(d instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function O(d, c) {
      for (var f = 0; f < c.length; f++) {
        var _ = c[f];
        _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(d, _.key, _);
      }
    }
    function b(d, c, f) {
      return c && O(d.prototype, c), f && O(d, f), d;
    }
    Object.defineProperty(E, "__esModule", { value: !0 });
    var D = function() {
      function d(c) {
        I(this, d), this.view = c, this.currentStep = 0, this.alertShown = !1, this.view = c, this.init();
      }
      return b(d, [{ key: "init", value: function() {
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
        if (u(f)) {
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
              var Y = this.view.form.querySelector('input[name="'.concat(f.name, '"]:checked'));
              if (!(Y instanceof HTMLInputElement))
                break;
              _ = Y.value;
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
              var Y = k.querySelector(".w-checkbox-input");
              Y && c.view.addWarningClass(Y);
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
      } }]), d;
    }(), C = D;
    E.default = C;
    var N = {};
    function L(d, c) {
      if (!(d instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function F(d, c) {
      for (var f = 0; f < c.length; f++) {
        var _ = c[f];
        _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(d, _.key, _);
      }
    }
    function A(d, c, f) {
      return c && F(d.prototype, c), f && F(d, f), d;
    }
    Object.defineProperty(N, "__esModule", { value: !0 });
    var w = function() {
      function d(c) {
        var f, _ = c.alertSelector, S = c.alertText, k = c.backSelector, Y = c.backText, B = c.completedPercentageSelector, G = c.currentStepSelector, te = c.formSelector, X = c.hiddeButtonsOnSubmit, ae = X === void 0 || X, j = c.hiddenFormStep, he = j === void 0 ? 1 : j, re = c.nextSelector, ve = c.nextText, it = c.scrollTopOnStepChange, st = it !== void 0 && it, ce = c.sendHiddenForm, ge = ce !== void 0 && ce, Ae = c.warningClass;
        L(this, d);
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
        var qe = ft.querySelector(".w-slider");
        if (!qe)
          throw new Error("No slider found inside the form, please add one.");
        this.slider = qe;
        var Rr = qe.querySelector(".w-slider-mask");
        if (!Rr)
          throw new Error("No mask found inside the slider!");
        this.mask = Rr, this.steps = qe.querySelectorAll(".w-slide");
        var br = qe.querySelector(".w-slider-arrow-right");
        if (!br)
          throw new Error("No right arrow found inside the slider!");
        this.rightArrow = br;
        var vr = qe.querySelector(".w-slider-arrow-left");
        if (!vr)
          throw new Error("No left arrow found inside the slider!");
        this.leftArrow = vr, this.sliderDots = qe.querySelectorAll(".w-slider-dot"), this.navLinks = document.querySelectorAll("[data-msf-nav]"), this.nextText = ve || this.next.textContent || "Next", this.backText = Y, this.submitText = this.submitButton.value, this.warningClass = Ae, this.alertText = S, this.alertInteraction = (f = this.alert) === null || f === void 0 ? void 0 : f.querySelector('[data-msf="alert"]'), this.scrollTopOnStepChange = st, this.hiddeButtonsOnSubmit = ae, this.sendHiddenForm = ge, this.hiddenFormStep = he >= 1 ? he : 1, this.inputs = this.getInputs();
      }
      return A(d, [{ key: "setMaskHeight", value: function(c) {
        this.mask.style.height = "", this.mask.style.height = "".concat(this.steps[c].offsetHeight, "px");
      } }, { key: "getInputs", value: function(c) {
        var f = typeof c == "number" ? this.steps[c].querySelectorAll("input, select, textarea") : this.form.querySelectorAll("input, select, textarea");
        return Array.from(f);
      } }, { key: "setButtonText", value: function(c) {
        var f = this, _ = function(k) {
          var Y = k === "back" ? f.back : f.next;
          if (Y) {
            var B = l(Y), G = k === "back" ? f.backText : f.nextText;
            if (B && Array.isArray(G) && G.length > 0)
              for (var te = function(ae) {
                var j = G.findIndex(function(he) {
                  return +he.step - 1 == c - ae;
                });
                if (j >= 0)
                  return B.textContent = G[j].text, "break";
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
            var k = u(S) ? S : S.querySelector("input, select, textarea");
            if (k && !f.hiddenForm.querySelector("#hidden-".concat(S.id))) {
              var Y = '<input type="hidden" id="hidden-'.concat(k.id, '" name="').concat(k.name, '" data-name="').concat(k.name, '" />');
              f.hiddenForm.insertAdjacentHTML("beforeend", Y);
            }
          }), window.Webflow && window.Webflow.destroy(), window.Webflow && window.Webflow.ready(), window.Webflow && ((c = window.Webflow.require("ix2")) === null || c === void 0 || c.init()));
        }
      } }]), d;
    }(), z = w;
    N.default = z;
    var P = {};
    function q(d, c) {
      if (!(d instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    var Q = P && P.__importDefault || function(d) {
      return d && d.__esModule ? d : { default: d };
    };
    Object.defineProperty(P, "__esModule", { value: !0 });
    var Z = Q(E), v = Q(N), W = function d(c) {
      q(this, d), this.view = new v.default(c), this.controller = new Z.default(this.view);
    }, y = W;
    P.default = y;
    var R = {};
    r(R);
    function M(d) {
      var c = typeof d;
      return d != null && (c == "object" || c == "function");
    }
    var x = typeof n == "object" && n && n.Object === Object && n, V = typeof self == "object" && self && self.Object === Object && self, fe = x || V || Function("return this")(), xe = function() {
      return fe.Date.now();
    }, Nt = /\s/;
    function be(d) {
      for (var c = d.length; c-- && Nt.test(d.charAt(c)); )
        ;
      return c;
    }
    var Gt = /^\s+/;
    function H(d) {
      return d && d.slice(0, be(d) + 1).replace(Gt, "");
    }
    var $ = fe.Symbol, Pe = Object.prototype, Me = Pe.hasOwnProperty, le = Pe.toString, ke = $ ? $.toStringTag : void 0;
    function ao(d) {
      var c = Me.call(d, ke), f = d[ke];
      try {
        d[ke] = void 0;
        var _ = !0;
      } catch {
      }
      var S = le.call(d);
      return _ && (c ? d[ke] = f : delete d[ke]), S;
    }
    var lo = Object.prototype, co = lo.toString;
    function uo(d) {
      return co.call(d);
    }
    var po = "[object Null]", fo = "[object Undefined]", dr = $ ? $.toStringTag : void 0;
    function Eo(d) {
      return d == null ? d === void 0 ? fo : po : dr && dr in Object(d) ? ao(d) : uo(d);
    }
    function ho(d) {
      return d != null && typeof d == "object";
    }
    var mo = "[object Symbol]";
    function To(d) {
      return typeof d == "symbol" || ho(d) && Eo(d) == mo;
    }
    var pr = NaN, _o = /^[-+]0x[0-9a-f]+$/i, Io = /^0b[01]+$/i, go = /^0o[0-7]+$/i, yo = parseInt;
    function fr(d) {
      if (typeof d == "number")
        return d;
      if (To(d))
        return pr;
      if (M(d)) {
        var c = typeof d.valueOf == "function" ? d.valueOf() : d;
        d = M(c) ? c + "" : c;
      }
      if (typeof d != "string")
        return d === 0 ? d : +d;
      d = H(d);
      var f = Io.test(d);
      return f || go.test(d) ? yo(d.slice(2), f ? 2 : 8) : _o.test(d) ? pr : +d;
    }
    var So = "Expected a function", Ro = Math.max, bo = Math.min;
    function vo(d, c, f) {
      var _, S, k, Y, B, G, te = 0, X = !1, ae = !1, j = !0;
      if (typeof d != "function")
        throw new TypeError(So);
      function he(ce) {
        var ge = _, Ae = S;
        return _ = S = void 0, te = ce, Y = d.apply(Ae, ge);
      }
      function re(ce) {
        var ge = ce - G;
        return G === void 0 || ge >= c || ge < 0 || ae && ce - te >= k;
      }
      function ve() {
        var ce = xe();
        if (re(ce))
          return it(ce);
        B = setTimeout(ve, function(ge) {
          var Ae = c - (ge - G);
          return ae ? bo(Ae, k - (ge - te)) : Ae;
        }(ce));
      }
      function it(ce) {
        return B = void 0, j && _ ? he(ce) : (_ = S = void 0, Y);
      }
      function st() {
        var ce = xe(), ge = re(ce);
        if (_ = arguments, S = this, G = ce, ge) {
          if (B === void 0)
            return function(Ae) {
              return te = Ae, B = setTimeout(ve, c), X ? he(Ae) : Y;
            }(G);
          if (ae)
            return clearTimeout(B), B = setTimeout(ve, c), he(G);
        }
        return B === void 0 && (B = setTimeout(ve, c)), Y;
      }
      return c = fr(c) || 0, M(f) && (X = !!f.leading, k = (ae = "maxWait" in f) ? Ro(fr(f.maxWait) || 0, c) : k, j = "trailing" in f ? !!f.trailing : j), st.cancel = function() {
        B !== void 0 && clearTimeout(B), te = 0, _ = G = S = B = void 0;
      }, st.flush = function() {
        return B === void 0 ? Y : it(xe());
      }, st;
    }
    R.default = vo;
    var Oe = {};
    Object.defineProperty(Oe, "__esModule", { value: !0 });
    var rt = ($e = void 0, De = Oe.isFormElement = $e, pt = Oe.throwError = De, Oe.isVisible = pt);
    Oe.convertToString = rt;
    var $e = function(d) {
      return d instanceof HTMLInputElement || d instanceof HTMLSelectElement || d instanceof HTMLTextAreaElement;
    };
    Oe.isFormElement = $e;
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
    Oe.throwError = De;
    var pt = function(d) {
      return !!(d.offsetWidth || d.offsetHeight || d.getClientRects().length);
    };
    Oe.isVisible = pt, rt = function(d) {
      return typeof d == "string" ? d : typeof d == "number" ? d.toString() : d ? "true" : "false";
    }, Oe.convertToString = rt;
    var nt = {};
    function Oo(d, c) {
      var f;
      if (typeof Symbol > "u" || d[Symbol.iterator] == null) {
        if (Array.isArray(d) || (f = Do(d)) || c && d && typeof d.length == "number") {
          f && (d = f);
          var _ = 0, S = function() {
          };
          return { s: S, n: function() {
            return _ >= d.length ? { done: !0 } : { done: !1, value: d[_++] };
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
          if (B)
            throw k;
        }
      } };
    }
    function Do(d, c) {
      if (d) {
        if (typeof d == "string")
          return Er(d, c);
        var f = Object.prototype.toString.call(d).slice(8, -1);
        return f === "Object" && d.constructor && (f = d.constructor.name), f === "Map" || f === "Set" ? Array.from(d) : f === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(f) ? Er(d, c) : void 0;
      }
    }
    function Er(d, c) {
      (c == null || c > d.length) && (c = d.length);
      for (var f = 0, _ = new Array(c); f < c; f++)
        _[f] = d[f];
      return _;
    }
    function Ao(d, c) {
      if (!(d instanceof c))
        throw new TypeError("Cannot call a class as a function");
    }
    function hr(d, c) {
      for (var f = 0; f < c.length; f++) {
        var _ = c[f];
        _.enumerable = _.enumerable || !1, _.configurable = !0, "value" in _ && (_.writable = !0), Object.defineProperty(d, _.key, _);
      }
    }
    function Lo(d, c, f) {
      return c && hr(d.prototype, c), f && hr(d, f), d;
    }
    var wo = nt && nt.__importDefault || function(d) {
      return d && d.__esModule ? d : { default: d };
    };
    Object.defineProperty(nt, "__esModule", { value: !0 });
    var Po = wo(R), Mo = function() {
      function d(c) {
        Ao(this, d), this.logicList = [], this.submitHiddenInputs = !1, this.checkConditionsOnLoad = !0, Object.assign(this, c), this.store = [], this.init();
      }
      return Lo(d, [{ key: "init", value: function() {
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
            var Y = Po.default(f.checkConditions.bind(f), 200), B = ["email", "number", "password", "search", "tel", "text", "textarea", "url"];
            k.forEach(function(G) {
              G.addEventListener("input", function() {
                B.includes(S.type) ? Y(c) : f.checkConditions(c);
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
            var Y = { element: k, required: k.required, disabled: k.disabled };
            _.store.findIndex(function(B) {
              return B.element === k;
            }) === -1 && _.store.push(Y);
          }) : De(c, "wrong-selector");
        }
      } }, { key: "checkConditions", value: function(c) {
        var f, _ = this, S = c.conditions, k = c.operator, Y = k === void 0 ? "and" : k, B = c.actions, G = !1, te = Oo(S);
        try {
          for (te.s(); !(f = te.n()).done; ) {
            var X = f.value, ae = document.querySelector(X.selector);
            if (!$e(ae))
              return void De(X.selector, "wrong-selector");
            var j = "";
            switch (ae.type) {
              case "checkbox":
                j = rt(ae.checked);
                break;
              case "radio":
                var he = document.querySelector('input[name="'.concat(ae.name, '"]:checked'));
                he instanceof HTMLInputElement && (j = he.value);
                break;
              default:
                j = ae.value;
            }
            var re = rt(X.value);
            switch (X.operator) {
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
                De(X.selector, "wrong-operator");
            }
            if (Y === "and" && !G || Y === "or" && G)
              break;
          }
        } catch (ve) {
          te.e(ve);
        } finally {
          te.f();
        }
        G && B.forEach(function(ve) {
          _.triggerAction(ve);
        });
      } }, { key: "triggerAction", value: function(c) {
        var f = this, _ = c.selector, S = c.action, k = c.clear, Y = k !== void 0 && k, B = document.querySelector(_);
        if (B instanceof HTMLElement)
          if (S !== "custom") {
            var G = this.getTargets(B), te = !1;
            G.forEach(function(X) {
              var ae = f.getStoredData(X), j = ae.required, he = ae.disabled, re = pt(X);
              switch (te || (te = f.triggerInteraction(B, S)), S) {
                case "show":
                  f.showInput(X, B, te, j, he);
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
              Y && f.clearInput(X);
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
      } }]), d;
    }(), Co = Mo;
    nt.default = Co;
    var ot = {}, mr = ot && ot.__importDefault || function(d) {
      return d && d.__esModule ? d : { default: d };
    };
    Object.defineProperty(ot, "__esModule", { value: !0 });
    var No = mr(P), Go = mr(nt);
    ot = { MSF: No.default, Logic: Go.default }, e.exports = ot;
  })();
})(Tn);
var Fo = Tn.exports;
class Ge {
  constructor(t) {
    if (t.dataset.refAsyncForm)
      return Ge.refs[t.dataset.refAsyncForm];
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
Ge.refs = {}, window.AsyncForm = Ge, document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.querySelectorAll("[c-async-form]")).forEach((e) => new Ge(e));
});
/*!
* FilePond 4.30.6
* Licensed under MIT, https://opensource.org/licenses/MIT/
* Please visit https://pqina.nl/filepond/ for details.
*/
const xo = (e) => e instanceof HTMLElement, ko = (e, t = [], r = []) => {
  const n = { ...e }, o = [], s = [], i = () => ({ ...n }), a = () => {
    const E = [...o];
    return o.length = 0, E;
  }, l = () => {
    const E = [...s];
    s.length = 0, E.forEach(({ type: I, data: O }) => {
      u(I, O);
    });
  }, u = (E, I, O) => {
    if (O && !document.hidden) {
      s.push({ type: E, data: I });
      return;
    }
    T[E] && T[E](I), o.push({ type: E, data: I });
  }, p = (E, ...I) => h[E] ? h[E](...I) : null, m = { getState: i, processActionQueue: a, processDispatchQueue: l, dispatch: u, query: p };
  let h = {};
  t.forEach((E) => {
    h = { ...E(n), ...h };
  });
  let T = {};
  return r.forEach((E) => {
    T = { ...E(u, p, n), ...T };
  }), m;
}, qo = (e, t, r) => {
  if (typeof r == "function") {
    e[t] = r;
    return;
  }
  Object.defineProperty(e, t, { ...r });
}, K = (e, t) => {
  for (const r in e)
    e.hasOwnProperty(r) && t(r, e[r]);
}, Fe = (e) => {
  const t = {};
  return K(e, (r) => {
    qo(t, r, e[r]);
  }), t;
}, ne = (e, t, r = null) => {
  if (r === null)
    return e.getAttribute(t) || e.hasAttribute(t);
  e.setAttribute(t, r);
}, Bo = "http://www.w3.org/2000/svg", Uo = ["svg", "path"], Or = (e) => Uo.includes(e), St = (e, t, r = {}) => {
  typeof t == "object" && (r = t, t = null);
  const n = Or(e) ? document.createElementNS(Bo, e) : document.createElement(e);
  return t && (Or(e) ? ne(n, "class", t) : n.className = t), K(r, (o, s) => {
    ne(n, o, s);
  }), n;
}, Vo = (e) => (t, r) => {
  typeof r < "u" && e.children[r] ? e.insertBefore(t, e.children[r]) : e.appendChild(t);
}, Ho = (e, t) => (r, n) => (typeof n < "u" ? t.splice(n, 0, r) : t.push(r), r), Yo = (e, t) => (r) => (t.splice(t.indexOf(r), 1), r.element.parentNode && e.removeChild(r.element), r), zo = typeof window < "u" && typeof window.document < "u", _n = () => zo, Wo = _n() ? St("svg") : {}, Xo = "children" in Wo ? (e) => e.children.length : (e) => e.childNodes.length, In = (e, t, r, n) => {
  const o = r[0] || e.left, s = r[1] || e.top, i = o + e.width, a = s + e.height * (n[1] || 1), l = { element: { ...e }, inner: { left: e.left, top: e.top, right: e.right, bottom: e.bottom }, outer: { left: o, top: s, right: i, bottom: a } };
  return t.filter((u) => !u.isRectIgnored()).map((u) => u.rect).forEach((u) => {
    Dr(l.inner, { ...u.inner }), Dr(l.outer, { ...u.outer });
  }), Ar(l.inner), l.outer.bottom += l.element.marginBottom, l.outer.right += l.element.marginRight, Ar(l.outer), l;
}, Dr = (e, t) => {
  t.top += e.top, t.right += e.left, t.bottom += e.top, t.left += e.left, t.bottom > e.bottom && (e.bottom = t.bottom), t.right > e.right && (e.right = t.right);
}, Ar = (e) => {
  e.width = e.right - e.left, e.height = e.bottom - e.top;
}, Be = (e) => typeof e == "number", jo = (e, t, r, n = 1e-3) => Math.abs(e - t) < n && Math.abs(r) < n, $o = ({ stiffness: e = 0.5, damping: t = 0.75, mass: r = 10 } = {}) => {
  let n = null, o = null, s = 0, i = !1;
  const a = Fe({ interpolate: (l, u) => {
    if (i)
      return;
    if (!(Be(n) && Be(o))) {
      i = !0, s = 0;
      return;
    }
    const p = -(o - n) * e;
    s += p / r, o += s, s *= t, jo(o, n, s) || u ? (o = n, s = 0, i = !0, a.onupdate(o), a.oncomplete(o)) : a.onupdate(o);
  }, target: { set: (l) => {
    if (Be(l) && !Be(o) && (o = l), n === null && (n = l, o = l), n = l, o === n || typeof n > "u") {
      i = !0, s = 0, a.onupdate(o), a.oncomplete(o);
      return;
    }
    i = !1;
  }, get: () => n }, resting: { get: () => i }, onupdate: (l) => {
  }, oncomplete: (l) => {
  } });
  return a;
}, Qo = (e) => e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e, Zo = ({ duration: e = 500, easing: t = Qo, delay: r = 0 } = {}) => {
  let n = null, o, s, i = !0, a = !1, l = null;
  const u = Fe({ interpolate: (p, m) => {
    i || l === null || (n === null && (n = p), !(p - n < r) && (o = p - n - r, o >= e || m ? (o = 1, s = a ? 0 : 1, u.onupdate(s * l), u.oncomplete(s * l), i = !0) : (s = o / e, u.onupdate((o >= 0 ? t(a ? 1 - s : s) : 0) * l))));
  }, target: { get: () => a ? 0 : l, set: (p) => {
    if (l === null) {
      l = p, u.onupdate(p), u.oncomplete(p);
      return;
    }
    p < l ? (l = 1, a = !0) : (a = !1, l = p), i = !1, n = null;
  } }, resting: { get: () => i }, onupdate: (p) => {
  }, oncomplete: (p) => {
  } });
  return u;
}, Lr = { spring: $o, tween: Zo }, Ko = (e, t, r) => {
  const n = e[t] && typeof e[t][r] == "object" ? e[t][r] : e[t] || e, o = typeof n == "string" ? n : n.type, s = typeof n == "object" ? { ...n } : {};
  return Lr[o] ? Lr[o](s) : null;
}, Kt = (e, t, r, n = !1) => {
  t = Array.isArray(t) ? t : [t], t.forEach((o) => {
    e.forEach((s) => {
      let i = s, a = () => r[s], l = (u) => r[s] = u;
      typeof s == "object" && (i = s.key, a = s.getter || a, l = s.setter || l), !(o[i] && !n) && (o[i] = { get: a, set: l });
    });
  });
}, Jo = ({ mixinConfig: e, viewProps: t, viewInternalAPI: r, viewExternalAPI: n }) => {
  const o = { ...t }, s = [];
  return K(e, (i, a) => {
    const l = Ko(a);
    l && (l.onupdate = (u) => {
      t[i] = u;
    }, l.target = o[i], Kt([{ key: i, setter: (u) => {
      l.target !== u && (l.target = u);
    }, getter: () => t[i] }], [r, n], t, !0), s.push(l));
  }), { write: (i) => {
    let a = document.hidden, l = !0;
    return s.forEach((u) => {
      u.resting || (l = !1), u.interpolate(i, a);
    }), l;
  }, destroy: () => {
  } };
}, ei = (e) => (t, r) => {
  e.addEventListener(t, r);
}, ti = (e) => (t, r) => {
  e.removeEventListener(t, r);
}, ri = ({ mixinConfig: e, viewProps: t, viewInternalAPI: r, viewExternalAPI: n, viewState: o, view: s }) => {
  const i = [], a = ei(s.element), l = ti(s.element);
  return n.on = (u, p) => {
    i.push({ type: u, fn: p }), a(u, p);
  }, n.off = (u, p) => {
    i.splice(i.findIndex((m) => m.type === u && m.fn === p), 1), l(u, p);
  }, { write: () => !0, destroy: () => {
    i.forEach((u) => {
      l(u.type, u.fn);
    });
  } };
}, ni = ({ mixinConfig: e, viewProps: t, viewExternalAPI: r }) => {
  Kt(e, r, t);
}, ue = (e) => e != null, oi = { opacity: 1, scaleX: 1, scaleY: 1, translateX: 0, translateY: 0, rotateX: 0, rotateY: 0, rotateZ: 0, originX: 0, originY: 0 }, ii = ({ mixinConfig: e, viewProps: t, viewInternalAPI: r, viewExternalAPI: n, view: o }) => {
  const s = { ...t }, i = {};
  Kt(e, [r, n], t);
  const a = () => [t.translateX || 0, t.translateY || 0], l = () => [t.scaleX || 0, t.scaleY || 0], u = () => o.rect ? In(o.rect, o.childViews, a(), l()) : null;
  return r.rect = { get: u }, n.rect = { get: u }, e.forEach((p) => {
    t[p] = typeof s[p] > "u" ? oi[p] : s[p];
  }), { write: () => {
    if (si(i, t))
      return ai(o.element, t), Object.assign(i, { ...t }), !0;
  }, destroy: () => {
  } };
}, si = (e, t) => {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !0;
  for (const r in t)
    if (t[r] !== e[r])
      return !0;
  return !1;
}, ai = (e, { opacity: t, perspective: r, translateX: n, translateY: o, scaleX: s, scaleY: i, rotateX: a, rotateY: l, rotateZ: u, originX: p, originY: m, width: h, height: T }) => {
  let E = "", I = "";
  (ue(p) || ue(m)) && (I += `transform-origin: ${p || 0}px ${m || 0}px;`), ue(r) && (E += `perspective(${r}px) `), (ue(n) || ue(o)) && (E += `translate3d(${n || 0}px, ${o || 0}px, 0) `), (ue(s) || ue(i)) && (E += `scale3d(${ue(s) ? s : 1}, ${ue(i) ? i : 1}, 1) `), ue(u) && (E += `rotateZ(${u}rad) `), ue(a) && (E += `rotateX(${a}rad) `), ue(l) && (E += `rotateY(${l}rad) `), E.length && (I += `transform:${E};`), ue(t) && (I += `opacity:${t};`, t === 0 && (I += "visibility:hidden;"), t < 1 && (I += "pointer-events:none;")), ue(T) && (I += `height:${T}px;`), ue(h) && (I += `width:${h}px;`);
  const O = e.elementCurrentStyle || "";
  (I.length !== O.length || I !== O) && (e.style.cssText = I, e.elementCurrentStyle = I);
}, li = { styles: ii, listeners: ri, animations: Jo, apis: ni }, wr = (e = {}, t = {}, r = {}) => (t.layoutCalculated || (e.paddingTop = parseInt(r.paddingTop, 10) || 0, e.marginTop = parseInt(r.marginTop, 10) || 0, e.marginRight = parseInt(r.marginRight, 10) || 0, e.marginBottom = parseInt(r.marginBottom, 10) || 0, e.marginLeft = parseInt(r.marginLeft, 10) || 0, t.layoutCalculated = !0), e.left = t.offsetLeft || 0, e.top = t.offsetTop || 0, e.width = t.offsetWidth || 0, e.height = t.offsetHeight || 0, e.right = e.left + e.width, e.bottom = e.top + e.height, e.scrollTop = t.scrollTop, e.hidden = t.offsetParent === null, e), oe = ({ tag: e = "div", name: t = null, attributes: r = {}, read: n = () => {
}, write: o = () => {
}, create: s = () => {
}, destroy: i = () => {
}, filterFrameActionsForChild: a = (T, E) => E, didCreateView: l = () => {
}, didWriteView: u = () => {
}, ignoreRect: p = !1, ignoreRectUpdate: m = !1, mixins: h = [] } = {}) => (T, E = {}) => {
  const I = St(e, `filepond--${t}`, r), O = window.getComputedStyle(I, null), b = wr();
  let D = null, C = !1;
  const N = [], L = [], F = {}, A = {}, w = [o], z = [n], P = [i], q = () => I, Q = () => N.concat(), Z = () => F, v = (H) => ($, Pe) => $(H, Pe), W = () => D || (D = In(b, N, [0, 0], [1, 1]), D), y = () => O, R = () => {
    D = null, N.forEach(($) => $._read()), !(m && b.width && b.height) && wr(b, I, O);
    const H = { root: be, props: E, rect: b };
    z.forEach(($) => $(H));
  }, M = (H, $, Pe) => {
    let Me = $.length === 0;
    return w.forEach((le) => {
      le({ props: E, root: be, actions: $, timestamp: H, shouldOptimize: Pe }) === !1 && (Me = !1);
    }), L.forEach((le) => {
      le.write(H) === !1 && (Me = !1);
    }), N.filter((le) => !!le.element.parentNode).forEach((le) => {
      le._write(H, a(le, $), Pe) || (Me = !1);
    }), N.forEach((le, ke) => {
      le.element.parentNode || (be.appendChild(le.element, ke), le._read(), le._write(H, a(le, $), Pe), Me = !1);
    }), C = Me, u({ props: E, root: be, actions: $, timestamp: H }), Me;
  }, x = () => {
    L.forEach((H) => H.destroy()), P.forEach((H) => {
      H({ root: be, props: E });
    }), N.forEach((H) => H._destroy());
  }, V = { element: { get: q }, style: { get: y }, childViews: { get: Q } }, fe = { ...V, rect: { get: W }, ref: { get: Z }, is: (H) => t === H, appendChild: Vo(I), createChildView: v(T), linkView: (H) => (N.push(H), H), unlinkView: (H) => {
    N.splice(N.indexOf(H), 1);
  }, appendChildView: Ho(I, N), removeChildView: Yo(I, N), registerWriter: (H) => w.push(H), registerReader: (H) => z.push(H), registerDestroyer: (H) => P.push(H), invalidateLayout: () => I.layoutCalculated = !1, dispatch: T.dispatch, query: T.query }, xe = { element: { get: q }, childViews: { get: Q }, rect: { get: W }, resting: { get: () => C }, isRectIgnored: () => p, _read: R, _write: M, _destroy: x }, Nt = { ...V, rect: { get: () => b } };
  Object.keys(h).sort((H, $) => H === "styles" ? 1 : $ === "styles" ? -1 : 0).forEach((H) => {
    const $ = li[H]({ mixinConfig: h[H], viewProps: E, viewState: A, viewInternalAPI: fe, viewExternalAPI: xe, view: Fe(Nt) });
    $ && L.push($);
  });
  const be = Fe(fe);
  s({ root: be, props: E });
  const Gt = Xo(I);
  return N.forEach((H, $) => {
    be.appendChild(H.element, Gt + $);
  }), l(be), Fe(xe);
}, ci = (e, t, r = 60) => {
  const n = "__framePainter";
  if (window[n]) {
    window[n].readers.push(e), window[n].writers.push(t);
    return;
  }
  window[n] = { readers: [e], writers: [t] };
  const o = window[n], s = 1e3 / r;
  let i = null, a = null, l = null, u = null;
  const p = () => {
    document.hidden ? (l = () => window.setTimeout(() => m(performance.now()), s), u = () => window.clearTimeout(a)) : (l = () => window.requestAnimationFrame(m), u = () => window.cancelAnimationFrame(a));
  };
  document.addEventListener("visibilitychange", () => {
    u && u(), p(), m(performance.now());
  });
  const m = (h) => {
    a = l(m), i || (i = h);
    const T = h - i;
    T <= s || (i = h - T % s, o.readers.forEach((E) => E()), o.writers.forEach((E) => E(h)));
  };
  return p(), m(performance.now()), { pause: () => {
    u(a);
  } };
}, pe = (e, t) => ({ root: r, props: n, actions: o = [], timestamp: s, shouldOptimize: i }) => {
  o.filter((a) => e[a.type]).forEach((a) => e[a.type]({ root: r, props: n, action: a.data, timestamp: s, shouldOptimize: i })), t && t({ root: r, props: n, actions: o, timestamp: s, shouldOptimize: i });
}, Pr = (e, t) => t.parentNode.insertBefore(e, t), Mr = (e, t) => t.parentNode.insertBefore(e, t.nextSibling), Dt = (e) => Array.isArray(e), Le = (e) => e == null, ui = (e) => e.trim(), At = (e) => "" + e, di = (e, t = ",") => Le(e) ? [] : Dt(e) ? e : At(e).split(t).map(ui).filter((r) => r.length), gn = (e) => typeof e == "boolean", yn = (e) => gn(e) ? e : e === "true", de = (e) => typeof e == "string", Sn = (e) => Be(e) ? e : de(e) ? At(e).replace(/[a-z]+/gi, "") : 0, gt = (e) => parseInt(Sn(e), 10), Cr = (e) => parseFloat(Sn(e)), tt = (e) => Be(e) && isFinite(e) && Math.floor(e) === e, Nr = (e, t = 1e3) => {
  if (tt(e))
    return e;
  let r = At(e).trim();
  return /MB$/i.test(r) ? (r = r.replace(/MB$i/, "").trim(), gt(r) * t * t) : /KB/i.test(r) ? (r = r.replace(/KB$i/, "").trim(), gt(r) * t) : gt(r);
}, Ue = (e) => typeof e == "function", pi = (e) => {
  let t = self, r = e.split("."), n = null;
  for (; n = r.shift(); )
    if (t = t[n], !t)
      return null;
  return t;
}, Gr = { process: "POST", patch: "PATCH", revert: "DELETE", fetch: "GET", restore: "GET", load: "GET" }, fi = (e) => {
  const t = {};
  return t.url = de(e) ? e : e.url || "", t.timeout = e.timeout ? parseInt(e.timeout, 10) : 0, t.headers = e.headers ? e.headers : {}, K(Gr, (r) => {
    t[r] = Ei(r, e[r], Gr[r], t.timeout, t.headers);
  }), t.process = e.process || de(e) || e.url ? t.process : null, t.remove = e.remove || null, delete t.headers, t;
}, Ei = (e, t, r, n, o) => {
  if (t === null)
    return null;
  if (typeof t == "function")
    return t;
  const s = { url: r === "GET" || r === "PATCH" ? `?${e}=` : "", method: r, headers: o, withCredentials: !1, timeout: n, onload: null, ondata: null, onerror: null };
  if (de(t))
    return s.url = t, s;
  if (Object.assign(s, t), de(s.headers)) {
    const i = s.headers.split(/:(.+)/);
    s.headers = { header: i[0], value: i[1] };
  }
  return s.withCredentials = yn(s.withCredentials), s;
}, hi = (e) => fi(e), mi = (e) => e === null, se = (e) => typeof e == "object" && e !== null, Ti = (e) => se(e) && de(e.url) && se(e.process) && se(e.revert) && se(e.restore) && se(e.fetch), Ht = (e) => Dt(e) ? "array" : mi(e) ? "null" : tt(e) ? "int" : /^[0-9]+ ?(?:GB|MB|KB)$/gi.test(e) ? "bytes" : Ti(e) ? "api" : typeof e, _i = (e) => e.replace(/{\s*'/g, '{"').replace(/'\s*}/g, '"}').replace(/'\s*:/g, '":').replace(/:\s*'/g, ':"').replace(/,\s*'/g, ',"').replace(/'\s*,/g, '",'), Ii = { array: di, boolean: yn, int: (e) => Ht(e) === "bytes" ? Nr(e) : gt(e), number: Cr, float: Cr, bytes: Nr, string: (e) => Ue(e) ? e : At(e), function: (e) => pi(e), serverapi: hi, object: (e) => {
  try {
    return JSON.parse(_i(e));
  } catch {
    return null;
  }
} }, gi = (e, t) => Ii[t](e), Rn = (e, t, r) => {
  if (e === t)
    return e;
  let n = Ht(e);
  if (n !== r) {
    const o = gi(e, r);
    if (n = Ht(o), o === null)
      throw `Trying to assign value with incorrect type to "${option}", allowed type: "${r}"`;
    e = o;
  }
  return e;
}, yi = (e, t) => {
  let r = e;
  return { enumerable: !0, get: () => r, set: (n) => {
    r = Rn(n, e, t);
  } };
}, Si = (e) => {
  const t = {};
  return K(e, (r) => {
    const n = e[r];
    t[r] = yi(n[0], n[1]);
  }), Fe(t);
}, Ri = (e) => ({ items: [], listUpdateTimeout: null, itemUpdateTimeout: null, processingQueue: [], options: Si(e) }), Lt = (e, t = "-") => e.split(/(?=[A-Z])/).map((r) => r.toLowerCase()).join(t), bi = (e, t) => {
  const r = {};
  return K(t, (n) => {
    r[n] = { get: () => e.getState().options[n], set: (o) => {
      e.dispatch(`SET_${Lt(n, "_").toUpperCase()}`, { value: o });
    } };
  }), r;
}, vi = (e) => (t, r, n) => {
  const o = {};
  return K(e, (s) => {
    const i = Lt(s, "_").toUpperCase();
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
    r[`GET_${Lt(n, "_").toUpperCase()}`] = (o) => t.options[n];
  }), r;
}, Ie = { API: 1, DROP: 2, BROWSE: 3, PASTE: 4, NONE: 5 }, Jt = () => Math.random().toString(36).substring(2, 11), er = (e, t) => e.splice(t, 1), Di = (e, t) => {
  t ? e() : document.hidden ? Promise.resolve(1).then(e) : setTimeout(e, 0);
}, wt = () => {
  const e = [], t = (n, o) => {
    er(e, e.findIndex((s) => s.event === n && (s.cb === o || !o)));
  }, r = (n, o, s) => {
    e.filter((i) => i.event === n).map((i) => i.cb).forEach((i) => Di(() => i(...o), s));
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
}, bn = (e, t, r) => {
  Object.getOwnPropertyNames(e).filter((n) => !r.includes(n)).forEach((n) => Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n)));
}, Ai = ["fire", "process", "revert", "load", "on", "off", "onOnce", "retryLoad", "extend", "archive", "archived", "release", "released", "requestProcessing", "freeze"], Ee = (e) => {
  const t = {};
  return bn(e, t, Ai), t;
}, Li = (e) => {
  e.forEach((t, r) => {
    t.released && er(e, r);
  });
}, U = { INIT: 1, IDLE: 2, PROCESSING_QUEUED: 9, PROCESSING: 3, PROCESSING_COMPLETE: 5, PROCESSING_ERROR: 6, PROCESSING_REVERT_ERROR: 10, LOADING: 7, LOAD_ERROR: 8 }, ie = { INPUT: 1, LIMBO: 2, LOCAL: 3 }, vn = (e) => /[^0-9]+/.exec(e), On = () => vn(1.1.toLocaleString())[0], wi = () => {
  const e = On(), t = 1e3.toLocaleString();
  return t !== "1000" ? vn(t)[0] : e === "." ? "," : ".";
}, g = { BOOLEAN: "boolean", INT: "int", NUMBER: "number", STRING: "string", ARRAY: "array", OBJECT: "object", FUNCTION: "function", ACTION: "action", SERVER_API: "serverapi", REGEX: "regex" }, tr = [], ye = (e, t, r) => new Promise((n, o) => {
  const s = tr.filter((a) => a.key === e).map((a) => a.cb);
  if (s.length === 0) {
    n(t);
    return;
  }
  const i = s.shift();
  s.reduce((a, l) => a.then((u) => l(u, r)), i(t, r)).then((a) => n(a)).catch((a) => o(a));
}), Xe = (e, t, r) => tr.filter((n) => n.key === e).map((n) => n.cb(t, r)), Pi = (e, t) => tr.push({ key: e, cb: t }), Mi = (e) => Object.assign(Qe, e), Rt = () => ({ ...Qe }), Ci = (e) => {
  K(e, (t, r) => {
    Qe[t] && (Qe[t][0] = Rn(r, Qe[t][0], Qe[t][1]));
  });
}, Qe = { id: [null, g.STRING], name: ["filepond", g.STRING], disabled: [!1, g.BOOLEAN], className: [null, g.STRING], required: [!1, g.BOOLEAN], captureMethod: [null, g.STRING], allowSyncAcceptAttribute: [!0, g.BOOLEAN], allowDrop: [!0, g.BOOLEAN], allowBrowse: [!0, g.BOOLEAN], allowPaste: [!0, g.BOOLEAN], allowMultiple: [!1, g.BOOLEAN], allowReplace: [!0, g.BOOLEAN], allowRevert: [!0, g.BOOLEAN], allowRemove: [!0, g.BOOLEAN], allowProcess: [!0, g.BOOLEAN], allowReorder: [!1, g.BOOLEAN], allowDirectoriesOnly: [!1, g.BOOLEAN], storeAsFile: [!1, g.BOOLEAN], forceRevert: [!1, g.BOOLEAN], maxFiles: [null, g.INT], checkValidity: [!1, g.BOOLEAN], itemInsertLocationFreedom: [!0, g.BOOLEAN], itemInsertLocation: ["before", g.STRING], itemInsertInterval: [75, g.INT], dropOnPage: [!1, g.BOOLEAN], dropOnElement: [!0, g.BOOLEAN], dropValidation: [!1, g.BOOLEAN], ignoredFiles: [[".ds_store", "thumbs.db", "desktop.ini"], g.ARRAY], instantUpload: [!0, g.BOOLEAN], maxParallelUploads: [2, g.INT], allowMinimumUploadDuration: [!0, g.BOOLEAN], chunkUploads: [!1, g.BOOLEAN], chunkForce: [!1, g.BOOLEAN], chunkSize: [5e6, g.INT], chunkRetryDelays: [[500, 1e3, 3e3], g.ARRAY], server: [null, g.SERVER_API], fileSizeBase: [1e3, g.INT], labelFileSizeBytes: ["bytes", g.STRING], labelFileSizeKilobytes: ["KB", g.STRING], labelFileSizeMegabytes: ["MB", g.STRING], labelFileSizeGigabytes: ["GB", g.STRING], labelDecimalSeparator: [On(), g.STRING], labelThousandsSeparator: [wi(), g.STRING], labelIdle: ['Drag & Drop your files or <span class="filepond--label-action">Browse</span>', g.STRING], labelInvalidField: ["Field contains invalid files", g.STRING], labelFileWaitingForSize: ["Waiting for size", g.STRING], labelFileSizeNotAvailable: ["Size not available", g.STRING], labelFileCountSingular: ["file in list", g.STRING], labelFileCountPlural: ["files in list", g.STRING], labelFileLoading: ["Loading", g.STRING], labelFileAdded: ["Added", g.STRING], labelFileLoadError: ["Error during load", g.STRING], labelFileRemoved: ["Removed", g.STRING], labelFileRemoveError: ["Error during remove", g.STRING], labelFileProcessing: ["Uploading", g.STRING], labelFileProcessingComplete: ["Upload complete", g.STRING], labelFileProcessingAborted: ["Upload cancelled", g.STRING], labelFileProcessingError: ["Error during upload", g.STRING], labelFileProcessingRevertError: ["Error during revert", g.STRING], labelTapToCancel: ["tap to cancel", g.STRING], labelTapToRetry: ["tap to retry", g.STRING], labelTapToUndo: ["tap to undo", g.STRING], labelButtonRemoveItem: ["Remove", g.STRING], labelButtonAbortItemLoad: ["Abort", g.STRING], labelButtonRetryItemLoad: ["Retry", g.STRING], labelButtonAbortItemProcessing: ["Cancel", g.STRING], labelButtonUndoItemProcessing: ["Undo", g.STRING], labelButtonRetryItemProcessing: ["Retry", g.STRING], labelButtonProcessItem: ["Upload", g.STRING], iconRemove: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], iconProcess: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M14 10.414v3.585a1 1 0 0 1-2 0v-3.585l-1.293 1.293a1 1 0 0 1-1.414-1.415l3-3a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1-1.414 1.415L14 10.414zM9 18a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2H9z" fill="currentColor" fill-rule="evenodd"/></svg>', g.STRING], iconRetry: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M10.81 9.185l-.038.02A4.997 4.997 0 0 0 8 13.683a5 5 0 0 0 5 5 5 5 0 0 0 5-5 1 1 0 0 1 2 0A7 7 0 1 1 9.722 7.496l-.842-.21a.999.999 0 1 1 .484-1.94l3.23.806c.535.133.86.675.73 1.21l-.804 3.233a.997.997 0 0 1-1.21.73.997.997 0 0 1-.73-1.21l.23-.928v-.002z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], iconUndo: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M9.185 10.81l.02-.038A4.997 4.997 0 0 1 13.683 8a5 5 0 0 1 5 5 5 5 0 0 1-5 5 1 1 0 0 0 0 2A7 7 0 1 0 7.496 9.722l-.21-.842a.999.999 0 1 0-1.94.484l.806 3.23c.133.535.675.86 1.21.73l3.233-.803a.997.997 0 0 0 .73-1.21.997.997 0 0 0-1.21-.73l-.928.23-.002-.001z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], iconDone: ['<svg width="26" height="26" viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg"><path d="M18.293 9.293a1 1 0 0 1 1.414 1.414l-7.002 7a1 1 0 0 1-1.414 0l-3.998-4a1 1 0 1 1 1.414-1.414L12 15.586l6.294-6.293z" fill="currentColor" fill-rule="nonzero"/></svg>', g.STRING], oninit: [null, g.FUNCTION], onwarning: [null, g.FUNCTION], onerror: [null, g.FUNCTION], onactivatefile: [null, g.FUNCTION], oninitfile: [null, g.FUNCTION], onaddfilestart: [null, g.FUNCTION], onaddfileprogress: [null, g.FUNCTION], onaddfile: [null, g.FUNCTION], onprocessfilestart: [null, g.FUNCTION], onprocessfileprogress: [null, g.FUNCTION], onprocessfileabort: [null, g.FUNCTION], onprocessfilerevert: [null, g.FUNCTION], onprocessfile: [null, g.FUNCTION], onprocessfiles: [null, g.FUNCTION], onremovefile: [null, g.FUNCTION], onpreparefile: [null, g.FUNCTION], onupdatefiles: [null, g.FUNCTION], onreorderfiles: [null, g.FUNCTION], beforeDropFile: [null, g.FUNCTION], beforeAddFile: [null, g.FUNCTION], beforeRemoveFile: [null, g.FUNCTION], beforePrepareFile: [null, g.FUNCTION], stylePanelLayout: [null, g.STRING], stylePanelAspectRatio: [null, g.STRING], styleItemPanelAspectRatio: [null, g.STRING], styleButtonRemoveItemPosition: ["left", g.STRING], styleButtonProcessItemPosition: ["right", g.STRING], styleLoadIndicatorPosition: ["right", g.STRING], styleProgressIndicatorPosition: ["right", g.STRING], styleButtonRemoveItemAlign: [!1, g.BOOLEAN], files: [[], g.ARRAY], credits: [["https://pqina.nl/", "Powered by PQINA"], g.ARRAY] }, Ve = (e, t) => Le(t) ? e[0] || null : tt(t) ? e[t] || null : (typeof t == "object" && (t = t.id), e.find((r) => r.id === t) || null), Dn = (e) => {
  if (Le(e))
    return e;
  if (/:/.test(e)) {
    const t = e.split(":");
    return t[1] / t[0];
  }
  return parseFloat(e);
}, Se = (e) => e.filter((t) => !t.archived), An = { EMPTY: 0, IDLE: 1, ERROR: 2, BUSY: 3, READY: 4 };
let Et = null;
const Ni = () => {
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
}, Gi = [U.LOAD_ERROR, U.PROCESSING_ERROR, U.PROCESSING_REVERT_ERROR], Fi = [U.LOADING, U.PROCESSING, U.PROCESSING_QUEUED, U.INIT], xi = [U.PROCESSING_COMPLETE], ki = (e) => Gi.includes(e.status), qi = (e) => Fi.includes(e.status), Bi = (e) => xi.includes(e.status), Fr = (e) => se(e.options.server) && (se(e.options.server.process) || Ue(e.options.server.process)), Ui = (e) => ({ GET_STATUS: () => {
  const t = Se(e.items), { EMPTY: r, ERROR: n, BUSY: o, IDLE: s, READY: i } = An;
  return t.length === 0 ? r : t.some(ki) ? n : t.some(qi) ? o : t.some(Bi) ? i : s;
}, GET_ITEM: (t) => Ve(e.items, t), GET_ACTIVE_ITEM: (t) => Ve(Se(e.items), t), GET_ACTIVE_ITEMS: () => Se(e.items), GET_ITEMS: () => e.items, GET_ITEM_NAME: (t) => {
  const r = Ve(e.items, t);
  return r ? r.filename : null;
}, GET_ITEM_SIZE: (t) => {
  const r = Ve(e.items, t);
  return r ? r.fileSize : null;
}, GET_STYLES: () => Object.keys(e.options).filter((t) => /^style/.test(t)).map((t) => ({ name: t, value: e.options[t] })), GET_PANEL_ASPECT_RATIO: () => /circle/.test(e.options.stylePanelLayout) ? 1 : Dn(e.options.stylePanelAspectRatio), GET_ITEM_PANEL_ASPECT_RATIO: () => e.options.styleItemPanelAspectRatio, GET_ITEMS_BY_STATUS: (t) => Se(e.items).filter((r) => r.status === t), GET_TOTAL_ITEMS: () => Se(e.items).length, SHOULD_UPDATE_FILE_INPUT: () => e.options.storeAsFile && Ni() && !Fr(e), IS_ASYNC: () => Fr(e), GET_FILE_SIZE_LABELS: (t) => ({ labelBytes: t("GET_LABEL_FILE_SIZE_BYTES") || void 0, labelKilobytes: t("GET_LABEL_FILE_SIZE_KILOBYTES") || void 0, labelMegabytes: t("GET_LABEL_FILE_SIZE_MEGABYTES") || void 0, labelGigabytes: t("GET_LABEL_FILE_SIZE_GIGABYTES") || void 0 }) }), Vi = (e) => {
  const t = Se(e.items).length;
  if (!e.options.allowMultiple)
    return t === 0;
  const r = e.options.maxFiles;
  return r === null || t < r;
}, Ln = (e, t, r) => Math.max(Math.min(r, e), t), Hi = (e, t, r) => e.splice(t, 0, r), Yi = (e, t, r) => Le(t) ? null : typeof r > "u" ? (e.push(t), t) : (r = Ln(r, 0, e.length), Hi(e, r, t), t), Yt = (e) => /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*)\s*$/i.test(e), dt = (e) => `${e}`.split("/").pop().split("?").shift(), Pt = (e) => e.split(".").pop(), zi = (e) => {
  if (typeof e != "string")
    return "";
  const t = e.split("/").pop();
  return /svg/.test(t) ? "svg" : /zip|compressed/.test(t) ? "zip" : /plain/.test(t) ? "txt" : /msword/.test(t) ? "doc" : /[a-z]+/.test(t) ? t === "jpeg" ? "jpg" : t : "";
}, at = (e, t = "") => (t + e).slice(-t.length), wn = (e = /* @__PURE__ */ new Date()) => `${e.getFullYear()}-${at(e.getMonth() + 1, "00")}-${at(e.getDate(), "00")}_${at(e.getHours(), "00")}-${at(e.getMinutes(), "00")}-${at(e.getSeconds(), "00")}`, Je = (e, t, r = null, n = null) => {
  const o = typeof r == "string" ? e.slice(0, e.size, r) : e.slice(0, e.size, e.type);
  return o.lastModifiedDate = /* @__PURE__ */ new Date(), e._relativePath && (o._relativePath = e._relativePath), de(t) || (t = wn()), t && n === null && Pt(t) ? o.name = t : (n = n || zi(o.type), o.name = t + (n ? "." + n : "")), o;
}, Wi = () => window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder, Pn = (e, t) => {
  const r = Wi();
  if (r) {
    const n = new r();
    return n.append(e), n.getBlob(t);
  }
  return new Blob([e], { type: t });
}, Xi = (e, t) => {
  const r = new ArrayBuffer(e.length), n = new Uint8Array(r);
  for (let o = 0; o < e.length; o++)
    n[o] = e.charCodeAt(o);
  return Pn(r, t);
}, Mn = (e) => (/^data:(.+);/.exec(e) || [])[1] || null, ji = (e) => e.split(",")[1].replace(/\s/g, ""), $i = (e) => atob(ji(e)), Qi = (e) => {
  const t = Mn(e), r = $i(e);
  return Xi(r, t);
}, Zi = (e, t, r) => Je(Qi(e), t, null, r), Ki = (e) => {
  if (!/^content-disposition:/i.test(e))
    return null;
  const t = e.split(/filename=|filename\*=.+''/).splice(1).map((r) => r.trim().replace(/^["']|[;"']{0,2}$/g, "")).filter((r) => r.length);
  return t.length ? decodeURI(t[t.length - 1]) : null;
}, Ji = (e) => {
  if (/content-length:/i.test(e)) {
    const t = e.match(/[0-9]+/)[0];
    return t ? parseInt(t, 10) : null;
  }
  return null;
}, es = (e) => /x-content-transfer-id:/i.test(e) && (e.split(":")[1] || "").trim() || null, rr = (e) => {
  const t = { source: null, name: null, size: null }, r = e.split(`
`);
  for (let n of r) {
    const o = Ki(n);
    if (o) {
      t.name = o;
      continue;
    }
    const s = Ji(n);
    if (s) {
      t.size = s;
      continue;
    }
    const i = es(n);
    if (i) {
      t.source = i;
      continue;
    }
  }
  return t;
}, ts = (e) => {
  const t = { source: null, complete: !1, progress: 0, size: null, timestamp: null, duration: 0, request: null }, r = () => t.progress, n = () => {
    t.request && t.request.abort && t.request.abort();
  }, o = () => {
    const a = t.source;
    i.fire("init", a), a instanceof File ? i.fire("load", a) : a instanceof Blob ? i.fire("load", Je(a, a.name)) : Yt(a) ? i.fire("load", Zi(a)) : s(a);
  }, s = (a) => {
    if (!e) {
      i.fire("error", { type: "error", body: "Can't load URL", code: 400 });
      return;
    }
    t.timestamp = Date.now(), t.request = e(a, (l) => {
      t.duration = Date.now() - t.timestamp, t.complete = !0, l instanceof Blob && (l = Je(l, l.name || dt(a))), i.fire("load", l instanceof Blob ? l : l ? l.body : null);
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
      const u = rr(typeof l == "string" ? l : l.headers);
      i.fire("meta", { size: t.size || u.size, filename: u.name, source: u.source });
    });
  }, i = { ...wt(), setSource: (a) => t.source = a, getProgress: r, abort: n, load: o };
  return i;
}, xr = (e) => /GET|HEAD/.test(e), He = (e, t, r) => {
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
    const u = unescape(encodeURIComponent(r.headers[l]));
    i.setRequestHeader(l, u);
  }), r.responseType && (i.responseType = r.responseType), r.withCredentials && (i.withCredentials = !0), i.send(e), n;
}, J = (e, t, r, n) => ({ type: e, code: t, body: r, headers: n }), Ye = (e) => (t) => {
  e(J("error", 0, "Timeout", t.getAllResponseHeaders()));
}, kr = (e) => /\?/.test(e), ut = (...e) => {
  let t = "";
  return e.forEach((r) => {
    t += kr(t) && kr(r) ? r.replace(/\?/, "&") : r;
  }), t;
}, Ft = (e = "", t) => {
  if (typeof t == "function")
    return t;
  if (!t || !de(t.url))
    return null;
  const r = t.onload || ((o) => o), n = t.onerror || ((o) => null);
  return (o, s, i, a, l, u) => {
    const p = He(o, ut(e, t.url), { ...t, responseType: "blob" });
    return p.onload = (m) => {
      const h = m.getAllResponseHeaders(), T = rr(h).name || dt(o);
      s(J("load", m.status, t.method === "HEAD" ? null : Je(r(m.response), T), h));
    }, p.onerror = (m) => {
      i(J("error", m.status, n(m.response) || m.statusText, m.getAllResponseHeaders()));
    }, p.onheaders = (m) => {
      u(J("headers", m.status, null, m.getAllResponseHeaders()));
    }, p.ontimeout = Ye(i), p.onprogress = a, p.onabort = l, p;
  };
}, Te = { QUEUED: 0, COMPLETE: 1, PROCESSING: 2, ERROR: 3, WAITING: 4 }, rs = (e, t, r, n, o, s, i, a, l, u, p) => {
  const m = [], { chunkTransferId: h, chunkServer: T, chunkSize: E, chunkRetryDelays: I } = p, O = { serverId: h, aborted: !1 }, b = t.ondata || ((v) => v), D = t.onload || ((v, W) => W === "HEAD" ? v.getResponseHeader("Upload-Offset") : v.response), C = t.onerror || ((v) => null), N = (v) => {
    const W = new FormData();
    se(o) && W.append(r, JSON.stringify(o));
    const y = typeof t.headers == "function" ? t.headers(n, o) : { ...t.headers, "Upload-Length": n.size }, R = { ...t, headers: y }, M = He(b(W), ut(e, t.url), R);
    M.onload = (x) => v(D(x, R.method)), M.onerror = (x) => i(J("error", x.status, C(x.response) || x.statusText, x.getAllResponseHeaders())), M.ontimeout = Ye(i);
  }, L = (v) => {
    const W = ut(e, T.url, O.serverId), y = { headers: typeof t.headers == "function" ? t.headers(O.serverId) : { ...t.headers }, method: "HEAD" }, R = He(null, W, y);
    R.onload = (M) => v(D(M, y.method)), R.onerror = (M) => i(J("error", M.status, C(M.response) || M.statusText, M.getAllResponseHeaders())), R.ontimeout = Ye(i);
  }, F = Math.floor(n.size / E);
  for (let v = 0; v <= F; v++) {
    const W = v * E, y = n.slice(W, W + E, "application/offset+octet-stream");
    m[v] = { index: v, size: y.size, offset: W, data: y, file: n, progress: 0, retries: [...I], status: Te.QUEUED, error: null, request: null, timeout: null };
  }
  const A = () => s(O.serverId), w = (v) => v.status === Te.QUEUED || v.status === Te.ERROR, z = (v) => {
    if (O.aborted)
      return;
    if (v = v || m.find(w), !v) {
      m.every((V) => V.status === Te.COMPLETE) && A();
      return;
    }
    v.status = Te.PROCESSING, v.progress = null;
    const W = T.ondata || ((V) => V), y = T.onerror || ((V) => null), R = ut(e, T.url, O.serverId), M = typeof T.headers == "function" ? T.headers(v) : { ...T.headers, "Content-Type": "application/offset+octet-stream", "Upload-Offset": v.offset, "Upload-Length": n.size, "Upload-Name": n.name }, x = v.request = He(W(v.data), R, { ...T, headers: M });
    x.onload = () => {
      v.status = Te.COMPLETE, v.request = null, Q();
    }, x.onprogress = (V, fe, xe) => {
      v.progress = V ? fe : null, q();
    }, x.onerror = (V) => {
      v.status = Te.ERROR, v.request = null, v.error = y(V.response) || V.statusText, P(v) || i(J("error", V.status, y(V.response) || V.statusText, V.getAllResponseHeaders()));
    }, x.ontimeout = (V) => {
      v.status = Te.ERROR, v.request = null, P(v) || Ye(i)(V);
    }, x.onabort = () => {
      v.status = Te.QUEUED, v.request = null, l();
    };
  }, P = (v) => v.retries.length === 0 ? !1 : (v.status = Te.WAITING, clearTimeout(v.timeout), v.timeout = setTimeout(() => {
    z(v);
  }, v.retries.shift()), !0), q = () => {
    const v = m.reduce((y, R) => y === null || R.progress === null ? null : y + R.progress, 0);
    if (v === null)
      return a(!1, 0, 0);
    const W = m.reduce((y, R) => y + R.size, 0);
    a(!0, v, W);
  }, Q = () => {
    m.filter((v) => v.status === Te.PROCESSING).length >= 1 || z();
  }, Z = () => {
    m.forEach((v) => {
      clearTimeout(v.timeout), v.request && v.request.abort();
    });
  };
  return O.serverId ? L((v) => {
    O.aborted || (m.filter((W) => W.offset < v).forEach((W) => {
      W.status = Te.COMPLETE, W.progress = W.size;
    }), Q());
  }) : N((v) => {
    O.aborted || (u(v), O.serverId = v, Q());
  }), { abort: () => {
    O.aborted = !0, Z();
  } };
}, ns = (e, t, r, n) => (o, s, i, a, l, u, p) => {
  if (!o)
    return;
  const m = n.chunkUploads, h = m && o.size > n.chunkSize, T = m && (h || n.chunkForce);
  if (o instanceof Blob && T)
    return rs(e, t, r, o, s, i, a, l, u, p, n);
  const E = t.ondata || ((L) => L), I = t.onload || ((L) => L), O = t.onerror || ((L) => null), b = typeof t.headers == "function" ? t.headers(o, s) || {} : { ...t.headers }, D = { ...t, headers: b };
  var C = new FormData();
  se(s) && C.append(r, JSON.stringify(s)), (o instanceof Blob ? [{ name: null, file: o }] : o).forEach((L) => {
    C.append(r, L.file, L.name === null ? L.file.name : `${L.name}${L.file.name}`);
  });
  const N = He(E(C), ut(e, t.url), D);
  return N.onload = (L) => {
    i(J("load", L.status, I(L.response), L.getAllResponseHeaders()));
  }, N.onerror = (L) => {
    a(J("error", L.status, O(L.response) || L.statusText, L.getAllResponseHeaders()));
  }, N.ontimeout = Ye(a), N.onprogress = l, N.onabort = u, N;
}, os = (e = "", t, r, n) => typeof t == "function" ? (...o) => t(r, ...o, n) : !t || !de(t.url) ? null : ns(e, t, r, n), lt = (e = "", t) => {
  if (typeof t == "function")
    return t;
  if (!t || !de(t.url))
    return (o, s) => s();
  const r = t.onload || ((o) => o), n = t.onerror || ((o) => null);
  return (o, s, i) => {
    const a = He(o, e + t.url, t);
    return a.onload = (l) => {
      s(J("load", l.status, r(l.response), l.getAllResponseHeaders()));
    }, a.onerror = (l) => {
      i(J("error", l.status, n(l.response) || l.statusText, l.getAllResponseHeaders()));
    }, a.ontimeout = Ye(i), a;
  };
}, Cn = (e = 0, t = 1) => e + Math.random() * (t - e), is = (e, t = 1e3, r = 0, n = 25, o = 250) => {
  let s = null;
  const i = Date.now(), a = () => {
    let l = Date.now() - i, u = Cn(n, o);
    l + u > t && (u = l + u - t);
    let p = l / t;
    if (p >= 1 || document.hidden) {
      e(1);
      return;
    }
    e(p), s = setTimeout(a, u);
  };
  return t > 0 && a(), { clear: () => {
    clearTimeout(s);
  } };
}, ss = (e, t) => {
  const r = { complete: !1, perceivedProgress: 0, perceivedPerformanceUpdater: null, progress: null, timestamp: null, perceivedDuration: 0, duration: 0, request: null, response: null }, { allowMinimumUploadDuration: n } = t, o = (p, m) => {
    const h = () => {
      r.duration === 0 || r.progress === null || u.fire("progress", u.getProgress());
    }, T = () => {
      r.complete = !0, u.fire("load-perceived", r.response.body);
    };
    u.fire("start"), r.timestamp = Date.now(), r.perceivedPerformanceUpdater = is((E) => {
      r.perceivedProgress = E, r.perceivedDuration = Date.now() - r.timestamp, h(), r.response && r.perceivedProgress === 1 && !r.complete && T();
    }, n ? Cn(750, 1500) : 0), r.request = e(p, m, (E) => {
      r.response = se(E) ? E : { type: "load", code: 200, body: `${E}`, headers: {} }, r.duration = Date.now() - r.timestamp, r.progress = 1, u.fire("load", r.response.body), (!n || n && r.perceivedProgress === 1) && T();
    }, (E) => {
      r.perceivedPerformanceUpdater.clear(), u.fire("error", se(E) ? E : { type: "error", code: 0, body: `${E}` });
    }, (E, I, O) => {
      r.duration = Date.now() - r.timestamp, r.progress = E ? I / O : null, h();
    }, () => {
      r.perceivedPerformanceUpdater.clear(), u.fire("abort", r.response ? r.response.body : null);
    }, (E) => {
      u.fire("transfer", E);
    });
  }, s = () => {
    r.request && (r.perceivedPerformanceUpdater.clear(), r.request.abort && r.request.abort(), r.complete = !0);
  }, i = () => {
    s(), r.complete = !1, r.perceivedProgress = 0, r.progress = 0, r.timestamp = null, r.perceivedDuration = 0, r.duration = 0, r.request = null, r.response = null;
  }, a = n ? () => r.progress ? Math.min(r.progress, r.perceivedProgress) : null : () => r.progress || null, l = n ? () => Math.min(r.duration, r.perceivedDuration) : () => r.duration, u = { ...wt(), process: o, abort: s, getProgress: a, getDuration: l, reset: i };
  return u;
}, Nn = (e) => e.substring(0, e.lastIndexOf(".")) || e, as = (e) => {
  let t = [e.name, e.size, e.type];
  return e instanceof Blob || Yt(e) ? t[0] = e.name || wn() : Yt(e) ? (t[1] = e.length, t[2] = Mn(e)) : de(e) && (t[0] = dt(e), t[1] = 0, t[2] = "application/octet-stream"), { name: t[0], size: t[1], type: t[2] };
}, et = (e) => !!(e instanceof File || e instanceof Blob && e.name), Gn = (e) => {
  if (!se(e))
    return e;
  const t = Dt(e) ? [] : {};
  for (const r in e) {
    if (!e.hasOwnProperty(r))
      continue;
    const n = e[r];
    t[r] = n && se(n) ? Gn(n) : n;
  }
  return t;
}, ls = (e = null, t = null, r = null) => {
  const n = Jt(), o = { archived: !1, frozen: !1, released: !1, source: null, file: r, serverFileReference: t, transferId: null, processingAborted: !1, status: t ? U.PROCESSING_COMPLETE : U.INIT, activeLoader: null, activeProcessor: null };
  let s = null;
  const i = {}, a = (A) => o.status = A, l = (A, ...w) => {
    o.released || o.frozen || L.fire(A, ...w);
  }, u = () => Pt(o.file.name), p = () => o.file.type, m = () => o.file.size, h = () => o.file, T = (A, w, z) => {
    if (o.source = A, L.fireSync("init"), o.file) {
      L.fireSync("load-skip");
      return;
    }
    o.file = as(A), w.on("init", () => {
      l("load-init");
    }), w.on("meta", (P) => {
      o.file.size = P.size, o.file.filename = P.filename, P.source && (e = ie.LIMBO, o.serverFileReference = P.source, o.status = U.PROCESSING_COMPLETE), l("load-meta");
    }), w.on("progress", (P) => {
      a(U.LOADING), l("load-progress", P);
    }), w.on("error", (P) => {
      a(U.LOAD_ERROR), l("load-request-error", P);
    }), w.on("abort", () => {
      a(U.INIT), l("load-abort");
    }), w.on("load", (P) => {
      o.activeLoader = null;
      const q = (Z) => {
        o.file = et(Z) ? Z : o.file, e === ie.LIMBO && o.serverFileReference ? a(U.PROCESSING_COMPLETE) : a(U.IDLE), l("load");
      }, Q = (Z) => {
        o.file = P, l("load-meta"), a(U.LOAD_ERROR), l("load-file-error", Z);
      };
      if (o.serverFileReference) {
        q(P);
        return;
      }
      z(P, q, Q);
    }), w.setSource(A), o.activeLoader = w, w.load();
  }, E = () => {
    o.activeLoader && o.activeLoader.load();
  }, I = () => {
    if (o.activeLoader) {
      o.activeLoader.abort();
      return;
    }
    a(U.INIT), l("load-abort");
  }, O = (A, w) => {
    if (o.processingAborted) {
      o.processingAborted = !1;
      return;
    }
    if (a(U.PROCESSING), s = null, !(o.file instanceof Blob)) {
      L.on("load", () => {
        O(A, w);
      });
      return;
    }
    A.on("load", (q) => {
      o.transferId = null, o.serverFileReference = q;
    }), A.on("transfer", (q) => {
      o.transferId = q;
    }), A.on("load-perceived", (q) => {
      o.activeProcessor = null, o.transferId = null, o.serverFileReference = q, a(U.PROCESSING_COMPLETE), l("process-complete", q);
    }), A.on("start", () => {
      l("process-start");
    }), A.on("error", (q) => {
      o.activeProcessor = null, a(U.PROCESSING_ERROR), l("process-error", q);
    }), A.on("abort", (q) => {
      o.activeProcessor = null, o.serverFileReference = q, a(U.IDLE), l("process-abort"), s && s();
    }), A.on("progress", (q) => {
      l("process-progress", q);
    });
    const z = (q) => {
      o.archived || A.process(q, { ...i });
    }, P = console.error;
    w(o.file, z, P), o.activeProcessor = A;
  }, b = () => {
    o.processingAborted = !1, a(U.PROCESSING_QUEUED);
  }, D = () => new Promise((A) => {
    if (!o.activeProcessor) {
      o.processingAborted = !0, a(U.IDLE), l("process-abort"), A();
      return;
    }
    s = () => {
      A();
    }, o.activeProcessor.abort();
  }), C = (A, w) => new Promise((z, P) => {
    const q = o.serverFileReference !== null ? o.serverFileReference : o.transferId;
    if (q === null) {
      z();
      return;
    }
    A(q, () => {
      o.serverFileReference = null, o.transferId = null, z();
    }, (Q) => {
      if (!w) {
        z();
        return;
      }
      a(U.PROCESSING_REVERT_ERROR), l("process-revert-error"), P(Q);
    }), a(U.IDLE), l("process-revert");
  }), N = (A, w, z) => {
    const P = A.split("."), q = P[0], Q = P.pop();
    let Z = i;
    P.forEach((v) => Z = Z[v]), JSON.stringify(Z[Q]) !== JSON.stringify(w) && (Z[Q] = w, l("metadata-update", { key: q, value: i[q], silent: z }));
  }, L = { id: { get: () => n }, origin: { get: () => e, set: (A) => e = A }, serverId: { get: () => o.serverFileReference }, transferId: { get: () => o.transferId }, status: { get: () => o.status }, filename: { get: () => o.file.name }, filenameWithoutExtension: { get: () => Nn(o.file.name) }, fileExtension: { get: u }, fileType: { get: p }, fileSize: { get: m }, file: { get: h }, relativePath: { get: () => o.file._relativePath }, source: { get: () => o.source }, getMetadata: (A) => Gn(A ? i[A] : i), setMetadata: (A, w, z) => {
    if (se(A)) {
      const P = A;
      return Object.keys(P).forEach((q) => {
        N(q, P[q], w);
      }), A;
    }
    return N(A, w, z), w;
  }, extend: (A, w) => F[A] = w, abortLoad: I, retryLoad: E, requestProcessing: b, abortProcessing: D, load: T, process: O, revert: C, ...wt(), freeze: () => o.frozen = !0, release: () => o.released = !0, released: { get: () => o.released }, archive: () => o.archived = !0, archived: { get: () => o.archived } }, F = Fe(L);
  return F;
}, cs = (e, t) => Le(t) ? 0 : de(t) ? e.findIndex((r) => r.id === t) : -1, qr = (e, t) => {
  const r = cs(e, t);
  if (!(r < 0))
    return e[r] || null;
}, us = (e, t, r, n, o, s) => {
  const i = He(null, e, { method: "GET", responseType: "blob" });
  return i.onload = (a) => {
    const l = a.getAllResponseHeaders(), u = rr(l).name || dt(e);
    t(J("load", a.status, Je(a.response, u), l));
  }, i.onerror = (a) => {
    r(J("error", a.status, a.statusText, a.getAllResponseHeaders()));
  }, i.onheaders = (a) => {
    s(J("headers", a.status, null, a.getAllResponseHeaders()));
  }, i.ontimeout = Ye(r), i.onprogress = n, i.onabort = o, i;
}, Br = (e) => (e.indexOf("//") === 0 && (e = location.protocol + e), e.toLowerCase().replace("blob:", "").replace(/([a-z])?:\/\//, "$1").split("/")[0]), ds = (e) => (e.indexOf(":") > -1 || e.indexOf("//") > -1) && Br(location.href) !== Br(e), ht = (e) => (...t) => Ue(e) ? e(...t) : e, ps = (e) => !et(e.file), xt = (e, t) => {
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
  const i = Ve(e.items, r);
  if (!i) {
    o({ error: J("error", 0, "Item not found"), file: null });
    return;
  }
  t(i, n, o, s || {});
}, fs = (e, t, r) => ({ ABORT_ALL: () => {
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
    }, u = (p) => {
      i.abortProcessing().then(p ? a : () => {
      });
    };
    if (i.status === U.PROCESSING_COMPLETE)
      return l(r.options.instantUpload);
    if (i.status === U.PROCESSING)
      return u(r.options.instantUpload);
    r.options.instantUpload && a();
  }, 0));
}, MOVE_ITEM: ({ query: n, index: o }) => {
  const s = Ve(r.items, n);
  if (!s)
    return;
  const i = r.items.indexOf(s);
  o = Ln(o, 0, r.items.length - 1), i !== o && r.items.splice(o, 0, r.items.splice(i, 1)[0]);
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
  const u = t("GET_IGNORED_FILES"), p = (h) => et(h) ? !u.includes(h.name.toLowerCase()) : !Le(h), m = n.filter(p).map((h) => new Promise((T, E) => {
    e("ADD_ITEM", { interactionMethod: s, source: h.source || h, success: T, failure: E, index: l++, options: h.options || {} });
  }));
  Promise.all(m).then(i).catch(a);
}, ADD_ITEM: ({ source: n, index: o = -1, interactionMethod: s, success: i = () => {
}, failure: a = () => {
}, options: l = {} }) => {
  if (Le(n)) {
    a({ error: J("error", 0, "No source"), file: null });
    return;
  }
  if (et(n) && r.options.ignoredFiles.includes(n.name.toLowerCase()))
    return;
  if (!Vi(r)) {
    if (r.options.allowMultiple || !r.options.allowMultiple && !r.options.allowReplace) {
      const D = J("warning", 0, "Max files");
      e("DID_THROW_MAX_FILES", { source: n, error: D }), a({ error: D, file: null });
      return;
    }
    const b = Se(r.items)[0];
    if (b.status === U.PROCESSING_COMPLETE || b.status === U.PROCESSING_REVERT_ERROR) {
      const D = t("GET_FORCE_REVERT");
      if (b.revert(lt(r.options.server.url, r.options.server.revert), D).then(() => {
        D && e("ADD_ITEM", { source: n, index: o, interactionMethod: s, success: i, failure: a, options: l });
      }).catch(() => {
      }), D)
        return;
    }
    e("REMOVE_ITEM", { query: b.id });
  }
  const u = l.type === "local" ? ie.LOCAL : l.type === "limbo" ? ie.LIMBO : ie.INPUT, p = ls(u, u === ie.INPUT ? null : n, l.file);
  Object.keys(l.metadata || {}).forEach((b) => {
    p.setMetadata(b, l.metadata[b]);
  }), Xe("DID_CREATE_ITEM", p, { query: t, dispatch: e });
  const m = t("GET_ITEM_INSERT_LOCATION");
  r.options.itemInsertLocationFreedom || (o = m === "before" ? -1 : r.items.length), Yi(r.items, p, o), Ue(m) && n && kt(r, m);
  const h = p.id;
  p.on("init", () => {
    e("DID_INIT_ITEM", { id: h });
  }), p.on("load-init", () => {
    e("DID_START_ITEM_LOAD", { id: h });
  }), p.on("load-meta", () => {
    e("DID_UPDATE_ITEM_META", { id: h });
  }), p.on("load-progress", (b) => {
    e("DID_UPDATE_ITEM_LOAD_PROGRESS", { id: h, progress: b });
  }), p.on("load-request-error", (b) => {
    const D = ht(r.options.labelFileLoadError)(b);
    if (b.code >= 400 && b.code < 500) {
      e("DID_THROW_ITEM_INVALID", { id: h, error: b, status: { main: D, sub: `${b.code} (${b.body})` } }), a({ error: b, file: Ee(p) });
      return;
    }
    e("DID_THROW_ITEM_LOAD_ERROR", { id: h, error: b, status: { main: D, sub: r.options.labelTapToRetry } });
  }), p.on("load-file-error", (b) => {
    e("DID_THROW_ITEM_INVALID", { id: h, error: b.status, status: b.status }), a({ error: b.status, file: Ee(p) });
  }), p.on("load-abort", () => {
    e("REMOVE_ITEM", { query: h });
  }), p.on("load-skip", () => {
    e("COMPLETE_LOAD_ITEM", { query: h, item: p, data: { source: n, success: i } });
  }), p.on("load", () => {
    const b = (D) => {
      if (!D) {
        e("REMOVE_ITEM", { query: h });
        return;
      }
      p.on("metadata-update", (C) => {
        e("DID_UPDATE_ITEM_METADATA", { id: h, change: C });
      }), ye("SHOULD_PREPARE_OUTPUT", !1, { item: p, query: t }).then((C) => {
        const N = t("GET_BEFORE_PREPARE_FILE");
        N && (C = N(p, C));
        const L = () => {
          e("COMPLETE_LOAD_ITEM", { query: h, item: p, data: { source: n, success: i } }), xt(e, r);
        };
        if (C) {
          e("REQUEST_PREPARE_OUTPUT", { query: h, item: p, success: (F) => {
            e("DID_PREPARE_OUTPUT", { id: h, file: F }), L();
          } }, !0);
          return;
        }
        L();
      });
    };
    ye("DID_LOAD_ITEM", p, { query: t, dispatch: e }).then(() => {
      Ur(t("GET_BEFORE_ADD_FILE"), Ee(p)).then(b);
    }).catch((D) => {
      if (!D || !D.error || !D.status)
        return b(!1);
      e("DID_THROW_ITEM_INVALID", { id: h, error: D.error, status: D.status });
    });
  }), p.on("process-start", () => {
    e("DID_START_ITEM_PROCESSING", { id: h });
  }), p.on("process-progress", (b) => {
    e("DID_UPDATE_ITEM_PROCESS_PROGRESS", { id: h, progress: b });
  }), p.on("process-error", (b) => {
    e("DID_THROW_ITEM_PROCESSING_ERROR", { id: h, error: b, status: { main: ht(r.options.labelFileProcessingError)(b), sub: r.options.labelTapToRetry } });
  }), p.on("process-revert-error", (b) => {
    e("DID_THROW_ITEM_PROCESSING_REVERT_ERROR", { id: h, error: b, status: { main: ht(r.options.labelFileProcessingRevertError)(b), sub: r.options.labelTapToRetry } });
  }), p.on("process-complete", (b) => {
    e("DID_COMPLETE_ITEM_PROCESSING", { id: h, error: null, serverFileReference: b }), e("DID_DEFINE_VALUE", { id: h, value: b });
  }), p.on("process-abort", () => {
    e("DID_ABORT_ITEM_PROCESSING", { id: h });
  }), p.on("process-revert", () => {
    e("DID_REVERT_ITEM_PROCESSING", { id: h }), e("DID_DEFINE_VALUE", { id: h, value: null });
  }), e("DID_ADD_ITEM", { id: h, index: o, interactionMethod: s }), xt(e, r);
  const { url: T, load: E, restore: I, fetch: O } = r.options.server || {};
  p.load(n, ts(u === ie.INPUT ? de(n) && ds(n) && O ? Ft(T, O) : us : u === ie.LIMBO ? Ft(T, I) : Ft(T, E)), (b, D, C) => {
    ye("LOAD_FILE", b, { query: t }).then(D).catch(C);
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
  if (Ue(a) && i && kt(r, a), e("DID_LOAD_ITEM", { id: n.id, error: null, serverFileReference: n.origin === ie.INPUT ? null : i }), s(Ee(n)), n.origin === ie.LOCAL) {
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
    const u = r.processingQueue.shift();
    if (!u)
      return;
    const { id: p, success: m, failure: h } = u, T = Ve(r.items, p);
    if (!T || T.archived) {
      a();
      return;
    }
    e("PROCESS_ITEM", { query: p, success: m, failure: h }, !0);
  };
  n.onOnce("process-complete", () => {
    o(Ee(n)), a();
    const u = r.options.server;
    if (r.options.instantUpload && n.origin === ie.LOCAL && Ue(u.remove)) {
      const p = () => {
      };
      n.origin = ie.LIMBO, r.options.server.remove(n.source, p, p);
    }
    t("GET_ITEMS_BY_STATUS", U.PROCESSING_COMPLETE).length === r.items.length && e("DID_COMPLETE_ITEM_PROCESSING_ALL");
  }), n.onOnce("process-error", (u) => {
    s({ error: u, file: Ee(n) }), a();
  });
  const l = r.options;
  n.process(ss(os(l.server.url, l.server.process, l.name, { chunkTransferId: n.transferId, chunkServer: l.server.patch, chunkUploads: l.chunkUploads, chunkForce: l.chunkForce, chunkSize: l.chunkSize, chunkRetryDelays: l.chunkRetryDelays }), { allowMinimumUploadDuration: t("GET_ALLOW_MINIMUM_UPLOAD_DURATION") }), (u, p, m) => {
    ye("PREPARE_OUTPUT", u, { query: t, item: n }).then((h) => {
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
    const u = n.id;
    qr(r.items, u).archive(), e("DID_REMOVE_ITEM", { error: null, id: u, item: n }), xt(e, r), o(Ee(n));
  }, l = r.options.server;
  n.origin === ie.LOCAL && l && Ue(l.remove) && i.remove !== !1 ? (e("DID_START_ITEM_REMOVE", { id: n.id }), l.remove(n.source, () => a(), (u) => {
    e("DID_THROW_ITEM_REMOVE_ERROR", { id: n.id, error: J("error", 0, u, null), status: { main: ht(r.options.labelFileRemoveError)(u), sub: r.options.labelTapToRetry } });
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
    (r.options.instantUpload || ps(n)) && e("REMOVE_ITEM", { query: n.id });
  }).catch(() => {
  });
}), SET_OPTIONS: ({ options: n }) => {
  const o = Object.keys(n), s = Es.filter((i) => o.includes(i));
  [...s, ...Object.keys(n).filter((i) => !s.includes(i))].forEach((i) => {
    e(`SET_${Lt(i, "_").toUpperCase()}`, { value: n[i] });
  });
} }), Es = ["server"], nr = (e) => e, we = (e) => document.createElement(e), ee = (e, t) => {
  let r = e.childNodes[0];
  r ? t !== r.nodeValue && (r.nodeValue = t) : (r = document.createTextNode(t), e.appendChild(r));
}, Vr = (e, t, r, n) => {
  const o = (n % 360 - 90) * Math.PI / 180;
  return { x: e + r * Math.cos(o), y: t + r * Math.sin(o) };
}, hs = (e, t, r, n, o, s) => {
  const i = Vr(e, t, r, o), a = Vr(e, t, r, n);
  return ["M", i.x, i.y, "A", r, r, 0, s, 0, a.x, a.y].join(" ");
}, ms = (e, t, r, n, o) => {
  let s = 1;
  return o > n && o - n <= 0.5 && (s = 0), n > o && n - o >= 0.5 && (s = 0), hs(e, t, r, Math.min(0.9999, n) * 360, Math.min(0.9999, o) * 360, s);
}, Ts = ({ root: e, props: t }) => {
  t.spin = !1, t.progress = 0, t.opacity = 0;
  const r = St("svg");
  e.ref.path = St("path", { "stroke-width": 2, "stroke-linecap": "round" }), r.appendChild(e.ref.path), e.ref.svg = r, e.appendChild(r);
}, _s = ({ root: e, props: t }) => {
  if (t.opacity === 0)
    return;
  t.align && (e.element.dataset.align = t.align);
  const r = parseInt(ne(e.ref.path, "stroke-width"), 10), n = e.rect.element.width * 0.5;
  let o = 0, s = 0;
  t.spin ? (o = 0, s = 0.5) : (o = 0, s = t.progress);
  const i = ms(n, n, n - r, o, s);
  ne(e.ref.path, "d", i), ne(e.ref.path, "stroke-opacity", t.spin || t.progress > 0 ? 1 : 0);
}, Hr = oe({ tag: "div", name: "progress-indicator", ignoreRectUpdate: !0, ignoreRect: !0, create: Ts, write: _s, mixins: { apis: ["progress", "spin", "align"], styles: ["opacity"], animations: { opacity: { type: "tween", duration: 500 }, progress: { type: "spring", stiffness: 0.95, damping: 0.65, mass: 10 } } } }), Is = ({ root: e, props: t }) => {
  e.element.innerHTML = (t.icon || "") + `<span>${t.label}</span>`, t.isDisabled = !1;
}, gs = ({ root: e, props: t }) => {
  const { isDisabled: r } = t, n = e.query("GET_DISABLED") || t.opacity === 0;
  n && !r ? (t.isDisabled = !0, ne(e.element, "disabled", "disabled")) : !n && r && (t.isDisabled = !1, e.element.removeAttribute("disabled"));
}, Fn = oe({ tag: "button", attributes: { type: "button" }, ignoreRect: !0, ignoreRectUpdate: !0, name: "file-action-button", mixins: { apis: ["label"], styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"], animations: { scaleX: "spring", scaleY: "spring", translateX: "spring", translateY: "spring", opacity: { type: "tween", duration: 250 } }, listeners: !0 }, create: Is, write: gs }), xn = (e, t = ".", r = 1e3, n = {}) => {
  const { labelBytes: o = "bytes", labelKilobytes: s = "KB", labelMegabytes: i = "MB", labelGigabytes: a = "GB" } = n;
  e = Math.round(Math.abs(e));
  const l = r, u = r * r, p = r * r * r;
  return e < l ? `${e} ${o}` : e < u ? `${Math.floor(e / l)} ${s}` : e < p ? `${Yr(e / u, 1, t)} ${i}` : `${Yr(e / p, 2, t)} ${a}`;
}, Yr = (e, t, r) => e.toFixed(t).split(".").filter((n) => n !== "0").join(r), ys = ({ root: e, props: t }) => {
  const r = we("span");
  r.className = "filepond--file-info-main", ne(r, "aria-hidden", "true"), e.appendChild(r), e.ref.fileName = r;
  const n = we("span");
  n.className = "filepond--file-info-sub", e.appendChild(n), e.ref.fileSize = n, ee(n, e.query("GET_LABEL_FILE_WAITING_FOR_SIZE")), ee(r, nr(e.query("GET_ITEM_NAME", t.id)));
}, zt = ({ root: e, props: t }) => {
  ee(e.ref.fileSize, xn(e.query("GET_ITEM_SIZE", t.id), ".", e.query("GET_FILE_SIZE_BASE"), e.query("GET_FILE_SIZE_LABELS", e.query))), ee(e.ref.fileName, nr(e.query("GET_ITEM_NAME", t.id)));
}, zr = ({ root: e, props: t }) => {
  if (tt(e.query("GET_ITEM_SIZE", t.id))) {
    zt({ root: e, props: t });
    return;
  }
  ee(e.ref.fileSize, e.query("GET_LABEL_FILE_SIZE_NOT_AVAILABLE"));
}, Ss = oe({ name: "file-info", ignoreRect: !0, ignoreRectUpdate: !0, write: pe({ DID_LOAD_ITEM: zt, DID_UPDATE_ITEM_META: zt, DID_THROW_ITEM_LOAD_ERROR: zr, DID_THROW_ITEM_INVALID: zr }), didCreateView: (e) => {
  Xe("CREATE_VIEW", { ...e, view: e });
}, create: ys, mixins: { styles: ["translateX", "translateY"], animations: { translateX: "spring", translateY: "spring" } } }), kn = (e) => Math.round(e * 100), Rs = ({ root: e }) => {
  const t = we("span");
  t.className = "filepond--file-status-main", e.appendChild(t), e.ref.main = t;
  const r = we("span");
  r.className = "filepond--file-status-sub", e.appendChild(r), e.ref.sub = r, qn({ root: e, action: { progress: null } });
}, qn = ({ root: e, action: t }) => {
  const r = t.progress === null ? e.query("GET_LABEL_FILE_LOADING") : `${e.query("GET_LABEL_FILE_LOADING")} ${kn(t.progress)}%`;
  ee(e.ref.main, r), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, bs = ({ root: e, action: t }) => {
  const r = t.progress === null ? e.query("GET_LABEL_FILE_PROCESSING") : `${e.query("GET_LABEL_FILE_PROCESSING")} ${kn(t.progress)}%`;
  ee(e.ref.main, r), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, vs = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_CANCEL"));
}, Os = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_ABORTED")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_RETRY"));
}, Ds = ({ root: e }) => {
  ee(e.ref.main, e.query("GET_LABEL_FILE_PROCESSING_COMPLETE")), ee(e.ref.sub, e.query("GET_LABEL_TAP_TO_UNDO"));
}, Wr = ({ root: e }) => {
  ee(e.ref.main, ""), ee(e.ref.sub, "");
}, ct = ({ root: e, action: t }) => {
  ee(e.ref.main, t.status.main), ee(e.ref.sub, t.status.sub);
}, As = oe({ name: "file-status", ignoreRect: !0, ignoreRectUpdate: !0, write: pe({ DID_LOAD_ITEM: Wr, DID_REVERT_ITEM_PROCESSING: Wr, DID_REQUEST_ITEM_PROCESSING: vs, DID_ABORT_ITEM_PROCESSING: Os, DID_COMPLETE_ITEM_PROCESSING: Ds, DID_UPDATE_ITEM_PROCESS_PROGRESS: bs, DID_UPDATE_ITEM_LOAD_PROGRESS: qn, DID_THROW_ITEM_LOAD_ERROR: ct, DID_THROW_ITEM_INVALID: ct, DID_THROW_ITEM_PROCESSING_ERROR: ct, DID_THROW_ITEM_PROCESSING_REVERT_ERROR: ct, DID_THROW_ITEM_REMOVE_ERROR: ct }), didCreateView: (e) => {
  Xe("CREATE_VIEW", { ...e, view: e });
}, create: Rs, mixins: { styles: ["translateX", "translateY", "opacity"], animations: { opacity: { type: "tween", duration: 250 }, translateX: "spring", translateY: "spring" } } }), Wt = { AbortItemLoad: { label: "GET_LABEL_BUTTON_ABORT_ITEM_LOAD", action: "ABORT_ITEM_LOAD", className: "filepond--action-abort-item-load", align: "LOAD_INDICATOR_POSITION" }, RetryItemLoad: { label: "GET_LABEL_BUTTON_RETRY_ITEM_LOAD", action: "RETRY_ITEM_LOAD", icon: "GET_ICON_RETRY", className: "filepond--action-retry-item-load", align: "BUTTON_PROCESS_ITEM_POSITION" }, RemoveItem: { label: "GET_LABEL_BUTTON_REMOVE_ITEM", action: "REQUEST_REMOVE_ITEM", icon: "GET_ICON_REMOVE", className: "filepond--action-remove-item", align: "BUTTON_REMOVE_ITEM_POSITION" }, ProcessItem: { label: "GET_LABEL_BUTTON_PROCESS_ITEM", action: "REQUEST_ITEM_PROCESSING", icon: "GET_ICON_PROCESS", className: "filepond--action-process-item", align: "BUTTON_PROCESS_ITEM_POSITION" }, AbortItemProcessing: { label: "GET_LABEL_BUTTON_ABORT_ITEM_PROCESSING", action: "ABORT_ITEM_PROCESSING", className: "filepond--action-abort-item-processing", align: "BUTTON_PROCESS_ITEM_POSITION" }, RetryItemProcessing: { label: "GET_LABEL_BUTTON_RETRY_ITEM_PROCESSING", action: "RETRY_ITEM_PROCESSING", icon: "GET_ICON_RETRY", className: "filepond--action-retry-item-processing", align: "BUTTON_PROCESS_ITEM_POSITION" }, RevertItemProcessing: { label: "GET_LABEL_BUTTON_UNDO_ITEM_PROCESSING", action: "REQUEST_REVERT_ITEM_PROCESSING", icon: "GET_ICON_UNDO", className: "filepond--action-revert-item-processing", align: "BUTTON_PROCESS_ITEM_POSITION" } }, Xt = [];
K(Wt, (e) => {
  Xt.push(e);
});
const me = (e) => {
  if (jt(e) === "right")
    return 0;
  const t = e.ref.buttonRemoveItem.rect.element;
  return t.hidden ? null : t.width + t.left;
}, Ls = (e) => e.ref.buttonAbortItemLoad.rect.element.width, mt = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.height / 4), ws = (e) => Math.floor(e.ref.buttonRemoveItem.rect.element.left / 2), Ps = (e) => e.query("GET_STYLE_LOAD_INDICATOR_POSITION"), Ms = (e) => e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION"), jt = (e) => e.query("GET_STYLE_BUTTON_REMOVE_ITEM_POSITION"), Cs = { buttonAbortItemLoad: { opacity: 0 }, buttonRetryItemLoad: { opacity: 0 }, buttonRemoveItem: { opacity: 0 }, buttonProcessItem: { opacity: 0 }, buttonAbortItemProcessing: { opacity: 0 }, buttonRetryItemProcessing: { opacity: 0 }, buttonRevertItemProcessing: { opacity: 0 }, loadProgressIndicator: { opacity: 0, align: Ps }, processProgressIndicator: { opacity: 0, align: Ms }, processingCompleteIndicator: { opacity: 0, scaleX: 0.75, scaleY: 0.75 }, info: { translateX: 0, translateY: 0, opacity: 0 }, status: { translateX: 0, translateY: 0, opacity: 0 } }, Xr = { buttonRemoveItem: { opacity: 1 }, buttonProcessItem: { opacity: 1 }, info: { translateX: me }, status: { translateX: me } }, qt = { buttonAbortItemProcessing: { opacity: 1 }, processProgressIndicator: { opacity: 1 }, status: { opacity: 1 } }, Ze = { DID_THROW_ITEM_INVALID: { buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { translateX: me, opacity: 1 } }, DID_START_ITEM_LOAD: { buttonAbortItemLoad: { opacity: 1 }, loadProgressIndicator: { opacity: 1 }, status: { opacity: 1 } }, DID_THROW_ITEM_LOAD_ERROR: { buttonRetryItemLoad: { opacity: 1 }, buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { opacity: 1 } }, DID_START_ITEM_REMOVE: { processProgressIndicator: { opacity: 1, align: jt }, info: { translateX: me }, status: { opacity: 0 } }, DID_THROW_ITEM_REMOVE_ERROR: { processProgressIndicator: { opacity: 0, align: jt }, buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { opacity: 1, translateX: me } }, DID_LOAD_ITEM: Xr, DID_LOAD_LOCAL_ITEM: { buttonRemoveItem: { opacity: 1 }, info: { translateX: me }, status: { translateX: me } }, DID_START_ITEM_PROCESSING: qt, DID_REQUEST_ITEM_PROCESSING: qt, DID_UPDATE_ITEM_PROCESS_PROGRESS: qt, DID_COMPLETE_ITEM_PROCESSING: { buttonRevertItemProcessing: { opacity: 1 }, info: { opacity: 1 }, status: { opacity: 1 } }, DID_THROW_ITEM_PROCESSING_ERROR: { buttonRemoveItem: { opacity: 1 }, buttonRetryItemProcessing: { opacity: 1 }, status: { opacity: 1 }, info: { translateX: me } }, DID_THROW_ITEM_PROCESSING_REVERT_ERROR: { buttonRevertItemProcessing: { opacity: 1 }, status: { opacity: 1 }, info: { opacity: 1 } }, DID_ABORT_ITEM_PROCESSING: { buttonRemoveItem: { opacity: 1 }, buttonProcessItem: { opacity: 1 }, info: { translateX: me }, status: { opacity: 1 } }, DID_REVERT_ITEM_PROCESSING: Xr }, Ns = oe({ create: ({ root: e }) => {
  e.element.innerHTML = e.query("GET_ICON_DONE");
}, name: "processing-complete-indicator", ignoreRect: !0, mixins: { styles: ["scaleX", "scaleY", "opacity"], animations: { scaleX: "spring", scaleY: "spring", opacity: { type: "tween", duration: 250 } } } }), Gs = ({ root: e, props: t }) => {
  const r = Object.keys(Wt).reduce((E, I) => (E[I] = { ...Wt[I] }, E), {}), { id: n } = t, o = e.query("GET_ALLOW_REVERT"), s = e.query("GET_ALLOW_REMOVE"), i = e.query("GET_ALLOW_PROCESS"), a = e.query("GET_INSTANT_UPLOAD"), l = e.query("IS_ASYNC"), u = e.query("GET_STYLE_BUTTON_REMOVE_ITEM_ALIGN");
  let p;
  l ? i && !o ? p = (E) => !/RevertItemProcessing/.test(E) : !i && o ? p = (E) => !/ProcessItem|RetryItemProcessing|AbortItemProcessing/.test(E) : !i && !o && (p = (E) => !/Process/.test(E)) : p = (E) => !/Process/.test(E);
  const m = p ? Xt.filter(p) : Xt.concat();
  if (a && o && (r.RevertItemProcessing.label = "GET_LABEL_BUTTON_REMOVE_ITEM", r.RevertItemProcessing.icon = "GET_ICON_REMOVE"), l && !o) {
    const E = Ze.DID_COMPLETE_ITEM_PROCESSING;
    E.info.translateX = ws, E.info.translateY = mt, E.status.translateY = mt, E.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  if (l && !i && (["DID_START_ITEM_PROCESSING", "DID_REQUEST_ITEM_PROCESSING", "DID_UPDATE_ITEM_PROCESS_PROGRESS", "DID_THROW_ITEM_PROCESSING_ERROR"].forEach((E) => {
    Ze[E].status.translateY = mt;
  }), Ze.DID_THROW_ITEM_PROCESSING_ERROR.status.translateX = Ls), u && o) {
    r.RevertItemProcessing.align = "BUTTON_REMOVE_ITEM_POSITION";
    const E = Ze.DID_COMPLETE_ITEM_PROCESSING;
    E.info.translateX = me, E.status.translateY = mt, E.processingCompleteIndicator = { opacity: 1, scaleX: 1, scaleY: 1 };
  }
  s || (r.RemoveItem.disabled = !0), K(r, (E, I) => {
    const O = e.createChildView(Fn, { label: e.query(I.label), icon: e.query(I.icon), opacity: 0 });
    m.includes(E) && e.appendChildView(O), I.disabled && (O.element.setAttribute("disabled", "disabled"), O.element.setAttribute("hidden", "hidden")), O.element.dataset.align = e.query(`GET_STYLE_${I.align}`), O.element.classList.add(I.className), O.on("click", (b) => {
      b.stopPropagation(), !I.disabled && e.dispatch(I.action, { query: n });
    }), e.ref[`button${E}`] = O;
  }), e.ref.processingCompleteIndicator = e.appendChildView(e.createChildView(Ns)), e.ref.processingCompleteIndicator.element.dataset.align = e.query("GET_STYLE_BUTTON_PROCESS_ITEM_POSITION"), e.ref.info = e.appendChildView(e.createChildView(Ss, { id: n })), e.ref.status = e.appendChildView(e.createChildView(As, { id: n }));
  const h = e.appendChildView(e.createChildView(Hr, { opacity: 0, align: e.query("GET_STYLE_LOAD_INDICATOR_POSITION") }));
  h.element.classList.add("filepond--load-indicator"), e.ref.loadProgressIndicator = h;
  const T = e.appendChildView(e.createChildView(Hr, { opacity: 0, align: e.query("GET_STYLE_PROGRESS_INDICATOR_POSITION") }));
  T.element.classList.add("filepond--process-indicator"), e.ref.processProgressIndicator = T, e.ref.activeStyles = [];
}, Fs = ({ root: e, actions: t, props: r }) => {
  xs({ root: e, actions: t, props: r });
  let n = t.concat().filter((o) => /^DID_/.test(o.type)).reverse().find((o) => Ze[o.type]);
  if (n) {
    e.ref.activeStyles = [];
    const o = Ze[n.type];
    K(Cs, (s, i) => {
      const a = e.ref[s];
      K(i, (l, u) => {
        const p = o[s] && typeof o[s][l] < "u" ? o[s][l] : u;
        e.ref.activeStyles.push({ control: a, key: l, value: p });
      });
    });
  }
  e.ref.activeStyles.forEach(({ control: o, key: s, value: i }) => {
    o[s] = typeof i == "function" ? i(e) : i;
  });
}, xs = pe({ DID_SET_LABEL_BUTTON_ABORT_ITEM_PROCESSING: ({ root: e, action: t }) => {
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
} }), ks = oe({ create: Gs, write: Fs, didCreateView: (e) => {
  Xe("CREATE_VIEW", { ...e, view: e });
}, name: "file" }), qs = ({ root: e, props: t }) => {
  e.ref.fileName = we("legend"), e.appendChild(e.ref.fileName), e.ref.file = e.appendChildView(e.createChildView(ks, { id: t.id })), e.ref.data = !1;
}, Bs = ({ root: e, props: t }) => {
  ee(e.ref.fileName, nr(e.query("GET_ITEM_NAME", t.id)));
}, Us = oe({ create: qs, ignoreRect: !0, write: pe({ DID_LOAD_ITEM: Bs }), didCreateView: (e) => {
  Xe("CREATE_VIEW", { ...e, view: e });
}, tag: "fieldset", name: "file-wrapper" }), jr = { type: "spring", damping: 0.6, mass: 7 }, Vs = ({ root: e, props: t }) => {
  [{ name: "top" }, { name: "center", props: { translateY: null, scaleY: null }, mixins: { animations: { scaleY: jr }, styles: ["translateY", "scaleY"] } }, { name: "bottom", props: { translateY: null }, mixins: { animations: { translateY: jr }, styles: ["translateY"] } }].forEach((r) => {
    Hs(e, r, t.name);
  }), e.element.classList.add(`filepond--${t.name}`), e.ref.scalable = null;
}, Hs = (e, t, r) => {
  const n = oe({ name: `panel-${t.name} filepond--${r}`, mixins: t.mixins, ignoreRectUpdate: !0 }), o = e.createChildView(n, t.props);
  e.ref[t.name] = e.appendChildView(o);
}, Ys = ({ root: e, props: t }) => {
  if ((e.ref.scalable === null || t.scalable !== e.ref.scalable) && (e.ref.scalable = gn(t.scalable) ? t.scalable : !0, e.element.dataset.scalable = e.ref.scalable), !t.height)
    return;
  const r = e.ref.top.rect.element, n = e.ref.bottom.rect.element, o = Math.max(r.height + n.height, t.height);
  e.ref.center.translateY = r.height, e.ref.center.scaleY = (o - r.height - n.height) / 100, e.ref.bottom.translateY = o - n.height;
}, Bn = oe({ name: "panel", read: ({ root: e, props: t }) => t.heightCurrent = e.ref.bottom.translateY, write: Ys, create: Vs, ignoreRect: !0, mixins: { apis: ["height", "heightCurrent", "scalable"] } }), zs = (e) => {
  const t = e.map((n) => n.id);
  let r;
  return { setIndex: (n) => {
    r = n;
  }, getIndex: () => r, getItemIndex: (n) => t.indexOf(n.id) };
}, $r = { type: "spring", stiffness: 0.75, damping: 0.45, mass: 10 }, Qr = "spring", Zr = { DID_START_ITEM_LOAD: "busy", DID_UPDATE_ITEM_LOAD_PROGRESS: "loading", DID_THROW_ITEM_INVALID: "load-invalid", DID_THROW_ITEM_LOAD_ERROR: "load-error", DID_LOAD_ITEM: "idle", DID_THROW_ITEM_REMOVE_ERROR: "remove-error", DID_START_ITEM_REMOVE: "busy", DID_START_ITEM_PROCESSING: "busy processing", DID_REQUEST_ITEM_PROCESSING: "busy processing", DID_UPDATE_ITEM_PROCESS_PROGRESS: "processing", DID_COMPLETE_ITEM_PROCESSING: "processing-complete", DID_THROW_ITEM_PROCESSING_ERROR: "processing-error", DID_THROW_ITEM_PROCESSING_REVERT_ERROR: "processing-revert-error", DID_ABORT_ITEM_PROCESSING: "cancelled", DID_REVERT_ITEM_PROCESSING: "idle" }, Ws = ({ root: e, props: t }) => {
  if (e.ref.handleClick = (n) => e.dispatch("DID_ACTIVATE_ITEM", { id: t.id }), e.element.id = `filepond--item-${t.id}`, e.element.addEventListener("click", e.ref.handleClick), e.ref.container = e.appendChildView(e.createChildView(Us, { id: t.id })), e.ref.panel = e.appendChildView(e.createChildView(Bn, { name: "item-panel" })), e.ref.panel.height = null, t.markedForRemoval = !1, !e.query("GET_ALLOW_REORDER"))
    return;
  e.element.dataset.dragState = "idle";
  const r = (n) => {
    if (!n.isPrimary)
      return;
    let o = !1;
    const s = { x: n.pageX, y: n.pageY };
    t.dragOrigin = { x: e.translateX, y: e.translateY }, t.dragCenter = { x: n.offsetX, y: n.offsetY };
    const i = zs(e.query("GET_ACTIVE_ITEMS"));
    e.dispatch("DID_GRAB_ITEM", { id: t.id, dragState: i });
    const a = (u) => {
      u.isPrimary && (u.stopPropagation(), u.preventDefault(), t.dragOffset = { x: u.pageX - s.x, y: u.pageY - s.y }, t.dragOffset.x * t.dragOffset.x + t.dragOffset.y * t.dragOffset.y > 16 && !o && (o = !0, e.element.removeEventListener("click", e.ref.handleClick)), e.dispatch("DID_DRAG_ITEM", { id: t.id, dragState: i }));
    }, l = (u) => {
      u.isPrimary && (document.removeEventListener("pointermove", a), document.removeEventListener("pointerup", l), t.dragOffset = { x: u.pageX - s.x, y: u.pageY - s.y }, e.dispatch("DID_DROP_ITEM", { id: t.id, dragState: i }), o && setTimeout(() => e.element.addEventListener("click", e.ref.handleClick), 0));
    };
    document.addEventListener("pointermove", a), document.addEventListener("pointerup", l);
  };
  e.element.addEventListener("pointerdown", r);
}, Xs = pe({ DID_UPDATE_PANEL_HEIGHT: ({ root: e, action: t }) => {
  e.height = t.height;
} }), js = pe({ DID_GRAB_ITEM: ({ root: e, props: t }) => {
  t.dragOrigin = { x: e.translateX, y: e.translateY };
}, DID_DRAG_ITEM: ({ root: e }) => {
  e.element.dataset.dragState = "drag";
}, DID_DROP_ITEM: ({ root: e, props: t }) => {
  t.dragOffset = null, t.dragOrigin = null, e.element.dataset.dragState = "drop";
} }, ({ root: e, actions: t, props: r, shouldOptimize: n }) => {
  e.element.dataset.dragState === "drop" && e.scaleX <= 1 && (e.element.dataset.dragState = "idle");
  let o = t.concat().filter((i) => /^DID_/.test(i.type)).reverse().find((i) => Zr[i.type]);
  o && o.type !== r.currentState && (r.currentState = o.type, e.element.dataset.filepondItemState = Zr[r.currentState] || "");
  const s = e.query("GET_ITEM_PANEL_ASPECT_RATIO") || e.query("GET_PANEL_ASPECT_RATIO");
  s ? n || (e.height = e.rect.element.width * s) : (Xs({ root: e, actions: t, props: r }), !e.height && e.ref.container.rect.element.height > 0 && (e.height = e.ref.container.rect.element.height)), n && (e.ref.panel.height = null), e.ref.panel.height = e.height;
}), $s = oe({ create: Ws, write: js, destroy: ({ root: e, props: t }) => {
  e.element.removeEventListener("click", e.ref.handleClick), e.dispatch("RELEASE_ITEM", { query: t.id });
}, tag: "li", name: "item", mixins: { apis: ["id", "interactionMethod", "markedForRemoval", "spawnDate", "dragCenter", "dragOrigin", "dragOffset"], styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity", "height"], animations: { scaleX: Qr, scaleY: Qr, translateX: $r, translateY: $r, opacity: { type: "tween", duration: 150 } } } });
var or = (e, t) => Math.max(1, Math.floor((e + 1) / t));
const ir = (e, t, r) => {
  if (!r)
    return;
  const n = e.rect.element.width, o = t.length;
  let s = null;
  if (o === 0 || r.top < t[0].rect.element.top)
    return -1;
  const i = t[0].rect.element, a = i.marginLeft + i.marginRight, l = i.width + a, u = or(n, l);
  if (u === 1) {
    for (let h = 0; h < o; h++) {
      const T = t[h], E = T.rect.outer.top + T.rect.element.height * 0.5;
      if (r.top < E)
        return h;
    }
    return o;
  }
  const p = i.marginTop + i.marginBottom, m = i.height + p;
  for (let h = 0; h < o; h++) {
    const T = h % u, E = Math.floor(h / u), I = T * l, O = E * m, b = O - i.marginTop, D = I + l, C = O + m + i.marginBottom;
    if (r.top < C && r.top > b) {
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
} }, Qs = ({ root: e }) => {
  ne(e.element, "role", "list"), e.ref.lastItemSpanwDate = Date.now();
}, Zs = ({ root: e, action: t }) => {
  const { id: r, index: n, interactionMethod: o } = t;
  e.ref.addIndex = n;
  const s = Date.now();
  let i = s, a = 1;
  if (o !== Ie.NONE) {
    a = 0;
    const l = e.query("GET_ITEM_INSERT_INTERVAL"), u = s - e.ref.lastItemSpanwDate;
    i = u < l ? s + (l - u) : s;
  }
  e.ref.lastItemSpanwDate = i, e.appendChildView(e.createChildView($s, { spawnDate: i, id: r, opacity: a, interactionMethod: o }), n);
}, Kr = (e, t, r, n = 0, o = 1) => {
  e.dragOffset ? (e.translateX = null, e.translateY = null, e.translateX = e.dragOrigin.x + e.dragOffset.x, e.translateY = e.dragOrigin.y + e.dragOffset.y, e.scaleX = 1.025, e.scaleY = 1.025) : (e.translateX = t, e.translateY = r, Date.now() > e.spawnDate && (e.opacity === 0 && Ks(e, t, r, n, o), e.scaleX = 1, e.scaleY = 1, e.opacity = 1));
}, Ks = (e, t, r, n, o) => {
  e.interactionMethod === Ie.NONE ? (e.translateX = null, e.translateX = t, e.translateY = null, e.translateY = r) : e.interactionMethod === Ie.DROP ? (e.translateX = null, e.translateX = t - n * 20, e.translateY = null, e.translateY = r - o * 10, e.scaleX = 0.8, e.scaleY = 0.8) : e.interactionMethod === Ie.BROWSE ? (e.translateY = null, e.translateY = r - 30) : e.interactionMethod === Ie.API && (e.translateX = null, e.translateX = t - 30, e.translateY = null);
}, Js = ({ root: e, action: t }) => {
  const { id: r } = t, n = e.childViews.find((o) => o.id === r);
  n && (n.scaleX = 0.9, n.scaleY = 0.9, n.opacity = 0, n.markedForRemoval = !0);
}, Bt = (e) => e.rect.element.height + e.rect.element.marginBottom * 0.5 + e.rect.element.marginTop * 0.5, ea = (e) => e.rect.element.width + e.rect.element.marginLeft * 0.5 + e.rect.element.marginRight * 0.5, ta = ({ root: e, action: t }) => {
  const { id: r, dragState: n } = t, o = e.query("GET_ITEM", { id: r }), s = e.childViews.find((O) => O.id === r), i = e.childViews.length, a = n.getItemIndex(o);
  if (!s)
    return;
  const l = { x: s.dragOrigin.x + s.dragOffset.x + s.dragCenter.x, y: s.dragOrigin.y + s.dragOffset.y + s.dragCenter.y }, u = Bt(s), p = ea(s);
  let m = Math.floor(e.rect.outer.width / p);
  m > i && (m = i);
  const h = Math.floor(i / m + 1);
  Tt.setHeight = u * h, Tt.setWidth = p * m;
  var T = { y: Math.floor(l.y / u), x: Math.floor(l.x / p), getGridIndex: function() {
    return l.y > Tt.getHeight || l.y < 0 || l.x > Tt.getWidth || l.x < 0 ? a : this.y * m + this.x;
  }, getColIndex: function() {
    const O = e.query("GET_ACTIVE_ITEMS"), b = e.childViews.filter((P) => P.rect.element.height), D = O.map((P) => b.find((q) => q.id === P.id)), C = D.findIndex((P) => P === s), N = Bt(s), L = D.length;
    let F = L, A = 0, w = 0, z = 0;
    for (let P = 0; P < L; P++)
      if (A = Bt(D[P]), z = w, w = z + A, l.y < w) {
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
  const E = m > 1 ? T.getGridIndex() : T.getColIndex();
  e.dispatch("MOVE_ITEM", { query: s, index: E });
  const I = n.getIndex();
  if (I === void 0 || I !== E) {
    if (n.setIndex(E), I === void 0)
      return;
    e.dispatch("DID_REORDER_ITEMS", { items: e.query("GET_ACTIVE_ITEMS"), origin: a, target: E });
  }
}, ra = pe({ DID_ADD_ITEM: Zs, DID_REMOVE_ITEM: Js, DID_DRAG_ITEM: ta }), na = ({ root: e, props: t, actions: r, shouldOptimize: n }) => {
  ra({ root: e, props: t, actions: r });
  const { dragCoordinates: o } = t, s = e.rect.element.width, i = e.childViews.filter((C) => C.rect.element.height), a = e.query("GET_ACTIVE_ITEMS").map((C) => i.find((N) => N.id === C.id)).filter((C) => C), l = o ? ir(e, a, o) : null, u = e.ref.addIndex || null;
  e.ref.addIndex = null;
  let p = 0, m = 0, h = 0;
  if (a.length === 0)
    return;
  const T = a[0].rect.element, E = T.marginTop + T.marginBottom, I = T.marginLeft + T.marginRight, O = T.width + I, b = T.height + E, D = or(s, O);
  if (D === 1) {
    let C = 0, N = 0;
    a.forEach((L, F) => {
      if (l) {
        let w = F - l;
        w === -2 ? N = -E * 0.25 : w === -1 ? N = -E * 0.75 : w === 0 ? N = E * 0.75 : w === 1 ? N = E * 0.25 : N = 0;
      }
      n && (L.translateX = null, L.translateY = null), L.markedForRemoval || Kr(L, 0, C + N);
      let A = (L.rect.element.height + E) * (L.markedForRemoval ? L.opacity : 1);
      C += A;
    });
  } else {
    let C = 0, N = 0;
    a.forEach((L, F) => {
      F === l && (p = 1), F === u && (h += 1), L.markedForRemoval && L.opacity < 0.5 && (m -= 1);
      const A = F + h + p + m, w = A % D, z = Math.floor(A / D), P = w * O, q = z * b, Q = Math.sign(P - C), Z = Math.sign(q - N);
      C = P, N = q, !L.markedForRemoval && (n && (L.translateX = null, L.translateY = null), Kr(L, P, q, Q, Z));
    });
  }
}, oa = (e, t) => t.filter((r) => r.data && r.data.id ? e.id === r.data.id : !0), ia = oe({ create: Qs, write: na, tag: "ul", name: "list", didWriteView: ({ root: e }) => {
  e.childViews.filter((t) => t.markedForRemoval && t.opacity === 0 && t.resting).forEach((t) => {
    t._destroy(), e.removeChildView(t);
  });
}, filterFrameActionsForChild: oa, mixins: { apis: ["dragCoordinates"] } }), sa = ({ root: e, props: t }) => {
  e.ref.list = e.appendChildView(e.createChildView(ia)), t.dragCoordinates = null, t.overflowing = !1;
}, aa = ({ root: e, props: t, action: r }) => {
  e.query("GET_ITEM_INSERT_LOCATION_FREEDOM") && (t.dragCoordinates = { left: r.position.scopeLeft - e.ref.list.rect.element.left, top: r.position.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop) });
}, la = ({ props: e }) => {
  e.dragCoordinates = null;
}, ca = pe({ DID_DRAG: aa, DID_END_DRAG: la }), ua = ({ root: e, props: t, actions: r }) => {
  if (ca({ root: e, props: t, actions: r }), e.ref.list.dragCoordinates = t.dragCoordinates, t.overflowing && !t.overflow && (t.overflowing = !1, e.element.dataset.state = "", e.height = null), t.overflow) {
    const n = Math.round(t.overflow);
    n !== e.height && (t.overflowing = !0, e.element.dataset.state = "overflow", e.height = n);
  }
}, da = oe({ create: sa, write: ua, name: "list-scroller", mixins: { apis: ["overflow", "dragCoordinates"], styles: ["height", "translateY"], animations: { translateY: "spring" } } }), Re = (e, t, r, n = "") => {
  r ? ne(e, t, n) : e.removeAttribute(t);
}, pa = (e) => {
  if (!(!e || e.value === "")) {
    try {
      e.value = "";
    } catch {
    }
    if (e.value) {
      const t = we("form"), r = e.parentNode, n = e.nextSibling;
      t.appendChild(e), t.reset(), n ? r.insertBefore(e, n) : r.appendChild(e);
    }
  }
}, fa = ({ root: e, props: t }) => {
  e.element.id = `filepond--browser-${t.id}`, ne(e.element, "name", e.query("GET_NAME")), ne(e.element, "aria-controls", `filepond--assistant-${t.id}`), ne(e.element, "aria-labelledby", `filepond--drop-label-${t.id}`), Un({ root: e, action: { value: e.query("GET_ACCEPTED_FILE_TYPES") } }), Vn({ root: e, action: { value: e.query("GET_ALLOW_MULTIPLE") } }), Hn({ root: e, action: { value: e.query("GET_ALLOW_DIRECTORIES_ONLY") } }), $t({ root: e }), Yn({ root: e, action: { value: e.query("GET_REQUIRED") } }), zn({ root: e, action: { value: e.query("GET_CAPTURE_METHOD") } }), e.ref.handleChange = (r) => {
    if (!e.element.value)
      return;
    const n = Array.from(e.element.files).map((o) => (o._relativePath = o.webkitRelativePath, o));
    setTimeout(() => {
      t.onload(n), pa(e.element);
    }, 250);
  }, e.element.addEventListener("change", e.ref.handleChange);
}, Un = ({ root: e, action: t }) => {
  e.query("GET_ALLOW_SYNC_ACCEPT_ATTRIBUTE") && Re(e.element, "accept", !!t.value, t.value ? t.value.join(",") : "");
}, Vn = ({ root: e, action: t }) => {
  Re(e.element, "multiple", t.value);
}, Hn = ({ root: e, action: t }) => {
  Re(e.element, "webkitdirectory", t.value);
}, $t = ({ root: e }) => {
  const t = e.query("GET_DISABLED"), r = e.query("GET_ALLOW_BROWSE"), n = t || !r;
  Re(e.element, "disabled", n);
}, Yn = ({ root: e, action: t }) => {
  t.value ? e.query("GET_TOTAL_ITEMS") === 0 && Re(e.element, "required", !0) : Re(e.element, "required", !1);
}, zn = ({ root: e, action: t }) => {
  Re(e.element, "capture", !!t.value, t.value === !0 ? "" : t.value);
}, Jr = ({ root: e }) => {
  const { element: t } = e;
  e.query("GET_TOTAL_ITEMS") > 0 ? (Re(t, "required", !1), Re(t, "name", !1)) : (Re(t, "name", !0, e.query("GET_NAME")), e.query("GET_CHECK_VALIDITY") && t.setCustomValidity(""), e.query("GET_REQUIRED") && Re(t, "required", !0));
}, Ea = ({ root: e }) => {
  e.query("GET_CHECK_VALIDITY") && e.element.setCustomValidity(e.query("GET_LABEL_INVALID_FIELD"));
}, ha = oe({ tag: "input", name: "browser", ignoreRect: !0, ignoreRectUpdate: !0, attributes: { type: "file" }, create: fa, destroy: ({ root: e }) => {
  e.element.removeEventListener("change", e.ref.handleChange);
}, write: pe({ DID_LOAD_ITEM: Jr, DID_REMOVE_ITEM: Jr, DID_THROW_ITEM_INVALID: Ea, DID_SET_DISABLED: $t, DID_SET_ALLOW_BROWSE: $t, DID_SET_ALLOW_DIRECTORIES_ONLY: Hn, DID_SET_ALLOW_MULTIPLE: Vn, DID_SET_ACCEPTED_FILE_TYPES: Un, DID_SET_CAPTURE_METHOD: zn, DID_SET_REQUIRED: Yn }) }), en = { ENTER: 13, SPACE: 32 }, ma = ({ root: e, props: t }) => {
  const r = we("label");
  ne(r, "for", `filepond--browser-${t.id}`), ne(r, "id", `filepond--drop-label-${t.id}`), ne(r, "aria-hidden", "true"), e.ref.handleKeyDown = (n) => {
    (n.keyCode === en.ENTER || n.keyCode === en.SPACE) && (n.preventDefault(), e.ref.label.click());
  }, e.ref.handleClick = (n) => {
    n.target === r || r.contains(n.target) || e.ref.label.click();
  }, r.addEventListener("keydown", e.ref.handleKeyDown), e.element.addEventListener("click", e.ref.handleClick), Wn(r, t.caption), e.appendChild(r), e.ref.label = r;
}, Wn = (e, t) => {
  e.innerHTML = t;
  const r = e.querySelector(".filepond--label-action");
  return r && ne(r, "tabindex", "0"), t;
}, Ta = oe({ name: "drop-label", ignoreRect: !0, create: ma, destroy: ({ root: e }) => {
  e.ref.label.addEventListener("keydown", e.ref.handleKeyDown), e.element.removeEventListener("click", e.ref.handleClick);
}, write: pe({ DID_SET_LABEL_IDLE: ({ root: e, action: t }) => {
  Wn(e.ref.label, t.value);
} }), mixins: { styles: ["opacity", "translateX", "translateY"], animations: { opacity: { type: "tween", duration: 150 }, translateX: "spring", translateY: "spring" } } }), _a = oe({ name: "drip-blob", ignoreRect: !0, mixins: { styles: ["translateX", "translateY", "scaleX", "scaleY", "opacity"], animations: { scaleX: "spring", scaleY: "spring", translateX: "spring", translateY: "spring", opacity: { type: "tween", duration: 250 } } } }), Ia = ({ root: e }) => {
  const t = e.rect.element.width * 0.5, r = e.rect.element.height * 0.5;
  e.ref.blob = e.appendChildView(e.createChildView(_a, { opacity: 0, scaleX: 2.5, scaleY: 2.5, translateX: t, translateY: r }));
}, ga = ({ root: e, action: t }) => {
  if (!e.ref.blob) {
    Ia({ root: e });
    return;
  }
  e.ref.blob.translateX = t.position.scopeLeft, e.ref.blob.translateY = t.position.scopeTop, e.ref.blob.scaleX = 1, e.ref.blob.scaleY = 1, e.ref.blob.opacity = 1;
}, ya = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.opacity = 0);
}, Sa = ({ root: e }) => {
  e.ref.blob && (e.ref.blob.scaleX = 2.5, e.ref.blob.scaleY = 2.5, e.ref.blob.opacity = 0);
}, Ra = ({ root: e, props: t, actions: r }) => {
  ba({ root: e, props: t, actions: r });
  const { blob: n } = e.ref;
  r.length === 0 && n && n.opacity === 0 && (e.removeChildView(n), e.ref.blob = null);
}, ba = pe({ DID_DRAG: ga, DID_DROP: Sa, DID_END_DRAG: ya }), va = oe({ ignoreRect: !0, ignoreRectUpdate: !0, name: "drip", write: Ra }), Xn = (e, t) => {
  try {
    const r = new DataTransfer();
    t.forEach((n) => {
      n instanceof File ? r.items.add(n) : r.items.add(new File([n], n.name, { type: n.type }));
    }), e.files = r.files;
  } catch {
    return !1;
  }
  return !0;
}, Oa = ({ root: e }) => e.ref.fields = {}, Mt = (e, t) => e.ref.fields[t], sr = (e) => {
  e.query("GET_ACTIVE_ITEMS").forEach((t) => {
    e.ref.fields[t.id] && e.element.appendChild(e.ref.fields[t.id]);
  });
}, tn = ({ root: e }) => sr(e), Da = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).origin !== ie.LOCAL && e.query("SHOULD_UPDATE_FILE_INPUT"), n = we("input");
  n.type = r ? "file" : "hidden", n.name = e.query("GET_NAME"), n.disabled = e.query("GET_DISABLED"), e.ref.fields[t.id] = n, sr(e);
}, Aa = ({ root: e, action: t }) => {
  const r = Mt(e, t.id);
  if (!r || (t.serverFileReference !== null && (r.value = t.serverFileReference), !e.query("SHOULD_UPDATE_FILE_INPUT")))
    return;
  const n = e.query("GET_ITEM", t.id);
  Xn(r, [n.file]);
}, La = ({ root: e, action: t }) => {
  e.query("SHOULD_UPDATE_FILE_INPUT") && setTimeout(() => {
    const r = Mt(e, t.id);
    r && Xn(r, [t.file]);
  }, 0);
}, wa = ({ root: e }) => {
  e.element.disabled = e.query("GET_DISABLED");
}, Pa = ({ root: e, action: t }) => {
  const r = Mt(e, t.id);
  r && (r.parentNode && r.parentNode.removeChild(r), delete e.ref.fields[t.id]);
}, Ma = ({ root: e, action: t }) => {
  const r = Mt(e, t.id);
  r && (t.value === null ? r.removeAttribute("value") : r.type != "file" && (r.value = t.value), sr(e));
}, Ca = pe({ DID_SET_DISABLED: wa, DID_ADD_ITEM: Da, DID_LOAD_ITEM: Aa, DID_REMOVE_ITEM: Pa, DID_DEFINE_VALUE: Ma, DID_PREPARE_OUTPUT: La, DID_REORDER_ITEMS: tn, DID_SORT_ITEMS: tn }), Na = oe({ tag: "fieldset", name: "data", create: Oa, write: Ca, ignoreRect: !0 }), Ga = (e) => "getRootNode" in e ? e.getRootNode() : document, Fa = ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg", "tiff"], xa = ["css", "csv", "html", "txt"], ka = { zip: "zip|compressed", epub: "application/epub+zip" }, jn = (e = "") => (e = e.toLowerCase(), Fa.includes(e) ? "image/" + (e === "jpg" ? "jpeg" : e === "svg" ? "svg+xml" : e) : xa.includes(e) ? "text/" + e : ka[e] || ""), ar = (e) => new Promise((t, r) => {
  const n = Wa(e);
  if (n.length && !qa(e))
    return t(n);
  Ba(e).then(t);
}), qa = (e) => e.files ? e.files.length > 0 : !1, Ba = (e) => new Promise((t, r) => {
  const n = (e.items ? Array.from(e.items) : []).filter((o) => Ua(o)).map((o) => Va(o));
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
}), Ua = (e) => {
  if ($n(e)) {
    const t = lr(e);
    if (t)
      return t.isFile || t.isDirectory;
  }
  return e.kind === "file";
}, Va = (e) => new Promise((t, r) => {
  if (za(e)) {
    Ha(lr(e)).then(t).catch(r);
    return;
  }
  t([e.getAsFile()]);
}), Ha = (e) => new Promise((t, r) => {
  const n = [];
  let o = 0, s = 0;
  const i = () => {
    s === 0 && o === 0 && t(n);
  }, a = (l) => {
    o++;
    const u = l.createReader(), p = () => {
      u.readEntries((m) => {
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
  const t = e.lastModifiedDate, r = e.name, n = jn(Pt(e.name));
  return n.length && (e = e.slice(0, e.size, n), e.name = r, e.lastModifiedDate = t), e;
}, za = (e) => $n(e) && (lr(e) || {}).isDirectory, $n = (e) => "webkitGetAsEntry" in e, lr = (e) => e.webkitGetAsEntry(), Wa = (e) => {
  let t = [];
  try {
    if (t = ja(e), t.length)
      return t;
    t = Xa(e);
  } catch {
  }
  return t;
}, Xa = (e) => {
  let t = e.getData("url");
  return typeof t == "string" && t.length ? [t] : [];
}, ja = (e) => {
  let t = e.getData("text/html");
  if (typeof t == "string" && t.length) {
    const r = t.match(/src\s*=\s*"(.+?)"/);
    if (r)
      return [r[1]];
  }
  return [];
}, bt = [], ze = (e) => ({ pageLeft: e.pageX, pageTop: e.pageY, scopeLeft: e.offsetX || e.layerX, scopeTop: e.offsetY || e.layerY }), $a = (e, t, r) => {
  const n = Qa(t), o = { element: e, filterElement: r, state: null, ondrop: () => {
  }, onenter: () => {
  }, ondrag: () => {
  }, onexit: () => {
  }, onload: () => {
  }, allowdrop: () => {
  } };
  return o.destroy = n.addListener(o), o;
}, Qa = (e) => {
  const t = bt.find((n) => n.element === e);
  if (t)
    return t;
  const r = Za(e);
  return bt.push(r), r;
}, Za = (e) => {
  const t = [], r = { dragenter: Ja, dragover: el, dragleave: rl, drop: tl }, n = {};
  K(r, (s, i) => {
    n[s] = i(e, t), e.addEventListener(s, n[s], !1);
  });
  const o = { element: e, addListener: (s) => (t.push(s), () => {
    t.splice(t.indexOf(s), 1), t.length === 0 && (bt.splice(bt.indexOf(o), 1), K(r, (i) => {
      e.removeEventListener(i, n[i], !1);
    }));
  }) };
  return o;
}, Ka = (e, t) => ("elementFromPoint" in e || (e = document), e.elementFromPoint(t.x, t.y)), cr = (e, t) => {
  const r = Ga(t), n = Ka(r, { x: e.pageX - window.pageXOffset, y: e.pageY - window.pageYOffset });
  return n === t || t.contains(n);
};
let Qn = null;
const _t = (e, t) => {
  try {
    e.dropEffect = t;
  } catch {
  }
}, Ja = (e, t) => (r) => {
  r.preventDefault(), Qn = r.target, t.forEach((n) => {
    const { element: o, onenter: s } = n;
    cr(r, o) && (n.state = "enter", s(ze(r)));
  });
}, el = (e, t) => (r) => {
  r.preventDefault();
  const n = r.dataTransfer;
  ar(n).then((o) => {
    let s = !1;
    t.some((i) => {
      const { filterElement: a, element: l, onenter: u, onexit: p, ondrag: m, allowdrop: h } = i;
      _t(n, "copy");
      const T = h(o);
      if (!T) {
        _t(n, "none");
        return;
      }
      if (cr(r, l)) {
        if (s = !0, i.state === null) {
          i.state = "enter", u(ze(r));
          return;
        }
        if (i.state = "over", a && !T) {
          _t(n, "none");
          return;
        }
        m(ze(r));
      } else
        a && !s && _t(n, "none"), i.state && (i.state = null, p(ze(r)));
    });
  });
}, tl = (e, t) => (r) => {
  r.preventDefault();
  const n = r.dataTransfer;
  ar(n).then((o) => {
    t.forEach((s) => {
      const { filterElement: i, element: a, ondrop: l, onexit: u, allowdrop: p } = s;
      if (s.state = null, !(i && !cr(r, a))) {
        if (!p(o))
          return u(ze(r));
        l(ze(r), o);
      }
    });
  });
}, rl = (e, t) => (r) => {
  Qn === r.target && t.forEach((n) => {
    const { onexit: o } = n;
    n.state = null, o(ze(r));
  });
}, nl = (e, t, r) => {
  e.classList.add("filepond--hopper");
  const { catchesDropsOnPage: n, requiresDropOnElement: o, filterItems: s = (p) => p } = r, i = $a(e, n ? document.documentElement : e, o);
  let a = "", l = "";
  i.allowdrop = (p) => t(s(p)), i.ondrop = (p, m) => {
    const h = s(m);
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
    a !== l && (e.dataset.hopperState = l, a = l);
  }, onload: () => {
  }, ondragstart: () => {
  }, ondrag: () => {
  }, ondragend: () => {
  }, destroy: () => {
    i.destroy();
  } };
  return u;
};
let Qt = !1;
const Ke = [], Zn = (e) => {
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
    r.length && Ke.forEach((n) => n(r));
  });
}, ol = (e) => {
  Ke.includes(e) || (Ke.push(e), !Qt && (Qt = !0, document.addEventListener("paste", Zn)));
}, il = (e) => {
  er(Ke, Ke.indexOf(e)), Ke.length === 0 && (document.removeEventListener("paste", Zn), Qt = !1);
}, sl = () => {
  const e = (r) => {
    t.onload(r);
  }, t = { destroy: () => {
    il(e);
  }, onload: () => {
  } };
  return ol(e), t;
}, al = ({ root: e, props: t }) => {
  e.element.id = `filepond--assistant-${t.id}`, ne(e.element, "role", "status"), ne(e.element, "aria-live", "polite"), ne(e.element, "aria-relevant", "additions");
};
let rn = null, nn = null;
const Ut = [], Ct = (e, t) => {
  e.element.textContent = t;
}, ll = (e) => {
  e.element.textContent = "";
}, Kn = (e, t, r) => {
  const n = e.query("GET_TOTAL_ITEMS");
  Ct(e, `${r} ${t}, ${n} ${n === 1 ? e.query("GET_LABEL_FILE_COUNT_SINGULAR") : e.query("GET_LABEL_FILE_COUNT_PLURAL")}`), clearTimeout(nn), nn = setTimeout(() => {
    ll(e);
  }, 1500);
}, Jn = (e) => e.element.parentNode.contains(document.activeElement), cl = ({ root: e, action: t }) => {
  if (!Jn(e))
    return;
  e.element.textContent = "";
  const r = e.query("GET_ITEM", t.id);
  Ut.push(r.filename), clearTimeout(rn), rn = setTimeout(() => {
    Kn(e, Ut.join(", "), e.query("GET_LABEL_FILE_ADDED")), Ut.length = 0;
  }, 750);
}, ul = ({ root: e, action: t }) => {
  if (!Jn(e))
    return;
  const r = t.item;
  Kn(e, r.filename, e.query("GET_LABEL_FILE_REMOVED"));
}, dl = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, n = e.query("GET_LABEL_FILE_PROCESSING_COMPLETE");
  Ct(e, `${r} ${n}`);
}, on = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename, n = e.query("GET_LABEL_FILE_PROCESSING_ABORTED");
  Ct(e, `${r} ${n}`);
}, It = ({ root: e, action: t }) => {
  const r = e.query("GET_ITEM", t.id).filename;
  Ct(e, `${t.status.main} ${r} ${t.status.sub}`);
}, pl = oe({ create: al, ignoreRect: !0, ignoreRectUpdate: !0, write: pe({ DID_LOAD_ITEM: cl, DID_REMOVE_ITEM: ul, DID_COMPLETE_ITEM_PROCESSING: dl, DID_ABORT_ITEM_PROCESSING: on, DID_REVERT_ITEM_PROCESSING: on, DID_THROW_ITEM_REMOVE_ERROR: It, DID_THROW_ITEM_LOAD_ERROR: It, DID_THROW_ITEM_INVALID: It, DID_THROW_ITEM_PROCESSING_ERROR: It }), tag: "span", name: "assistant" }), eo = (e, t = "-") => e.replace(new RegExp(`${t}.`, "g"), (r) => r.charAt(1).toUpperCase()), to = (e, t = 16, r = !0) => {
  let n = Date.now(), o = null;
  return (...s) => {
    clearTimeout(o);
    const i = Date.now() - n, a = () => {
      n = Date.now(), e(...s);
    };
    i < t ? r || (o = setTimeout(a, t - i)) : a();
  };
}, fl = 1e6, vt = (e) => e.preventDefault(), El = ({ root: e, props: t }) => {
  const r = e.query("GET_ID");
  r && (e.element.id = r);
  const n = e.query("GET_CLASS_NAME");
  n && n.split(" ").filter((a) => a.length).forEach((a) => {
    e.element.classList.add(a);
  }), e.ref.label = e.appendChildView(e.createChildView(Ta, { ...t, translateY: null, caption: e.query("GET_LABEL_IDLE") })), e.ref.list = e.appendChildView(e.createChildView(da, { translateY: null })), e.ref.panel = e.appendChildView(e.createChildView(Bn, { name: "panel-root" })), e.ref.assistant = e.appendChildView(e.createChildView(pl, { ...t })), e.ref.data = e.appendChildView(e.createChildView(Na, { ...t })), e.ref.measure = we("div"), e.ref.measure.style.height = "100%", e.element.appendChild(e.ref.measure), e.ref.bounds = null, e.query("GET_STYLES").filter((a) => !Le(a.value)).map(({ name: a, value: l }) => {
    e.element.dataset[a] = l;
  }), e.ref.widthPrevious = null, e.ref.widthUpdated = to(() => {
    e.ref.updateHistory = [], e.dispatch("DID_RESIZE_ROOT");
  }, 250), e.ref.previousAspectRatio = null, e.ref.updateHistory = [];
  const o = window.matchMedia("(pointer: fine) and (hover: hover)").matches, s = "PointerEvent" in window;
  e.query("GET_ALLOW_REORDER") && s && !o && (e.element.addEventListener("touchmove", vt, { passive: !1 }), e.element.addEventListener("gesturestart", vt));
  const i = e.query("GET_CREDITS");
  if (i.length === 2) {
    const a = document.createElement("a");
    a.className = "filepond--credits", a.setAttribute("aria-hidden", "true"), a.href = i[0], a.tabindex = -1, a.target = "_blank", a.rel = "noopener noreferrer", a.textContent = i[1], e.element.appendChild(a), e.ref.credits = a;
  }
}, hl = ({ root: e, props: t, actions: r }) => {
  if (gl({ root: e, props: t, actions: r }), r.filter((F) => /^DID_SET_STYLE_/.test(F.type)).filter((F) => !Le(F.data.value)).map(({ type: F, data: A }) => {
    const w = eo(F.substring(8).toLowerCase(), "_");
    e.element.dataset[w] = A.value, e.invalidateLayout();
  }), e.rect.element.hidden)
    return;
  e.rect.element.width !== e.ref.widthPrevious && (e.ref.widthPrevious = e.rect.element.width, e.ref.widthUpdated());
  let n = e.ref.bounds;
  n || (n = e.ref.bounds = _l(e), e.element.removeChild(e.ref.measure), e.ref.measure = null);
  const { hopper: o, label: s, list: i, panel: a } = e.ref;
  o && o.updateHopperState();
  const l = e.query("GET_PANEL_ASPECT_RATIO"), u = e.query("GET_ALLOW_MULTIPLE"), p = e.query("GET_TOTAL_ITEMS"), m = u ? e.query("GET_MAX_FILES") || fl : 1, h = p === m, T = r.find((F) => F.type === "DID_ADD_ITEM");
  if (h && T) {
    const F = T.data.interactionMethod;
    s.opacity = 0, u ? s.translateY = -40 : F === Ie.API ? s.translateX = 40 : F === Ie.BROWSE ? s.translateY = 40 : s.translateY = 30;
  } else
    h || (s.opacity = 1, s.translateX = 0, s.translateY = 0);
  const E = ml(e), I = Tl(e), O = s.rect.element.height, b = !u || h ? 0 : O, D = h ? i.rect.element.marginTop : 0, C = p === 0 ? 0 : i.rect.element.marginBottom, N = b + D + I.visual + C, L = b + D + I.bounds + C;
  if (i.translateY = Math.max(0, b - i.rect.element.marginTop) - E.top, l) {
    const F = e.rect.element.width, A = F * l;
    l !== e.ref.previousAspectRatio && (e.ref.previousAspectRatio = l, e.ref.updateHistory = []);
    const w = e.ref.updateHistory;
    w.push(F);
    const z = 2;
    if (w.length > z * 2) {
      const q = w.length, Q = q - 10;
      let Z = 0;
      for (let v = q; v >= Q; v--)
        if (w[v] === w[v - 2] && Z++, Z >= z)
          return;
    }
    a.scalable = !1, a.height = A;
    const P = A - b - (C - E.bottom) - (h ? D : 0);
    I.visual > P ? i.overflow = P : i.overflow = null, e.height = A;
  } else if (n.fixedHeight) {
    a.scalable = !1;
    const F = n.fixedHeight - b - (C - E.bottom) - (h ? D : 0);
    I.visual > F ? i.overflow = F : i.overflow = null;
  } else if (n.cappedHeight) {
    const F = N >= n.cappedHeight, A = Math.min(n.cappedHeight, N);
    a.scalable = !0, a.height = F ? A : A - E.top - E.bottom;
    const w = A - b - (C - E.bottom) - (h ? D : 0);
    N > n.cappedHeight && I.visual > w ? i.overflow = w : i.overflow = null, e.height = Math.min(n.cappedHeight, L - E.top - E.bottom);
  } else {
    const F = p > 0 ? E.top + E.bottom : 0;
    a.scalable = !0, a.height = Math.max(O, N - F), e.height = Math.max(O, L - F);
  }
  e.ref.credits && a.heightCurrent && (e.ref.credits.style.transform = `translateY(${a.heightCurrent}px)`);
}, ml = (e) => {
  const t = e.ref.list.childViews[0].childViews[0];
  return t ? { top: t.rect.element.marginTop, bottom: t.rect.element.marginBottom } : { top: 0, bottom: 0 };
}, Tl = (e) => {
  let t = 0, r = 0;
  const n = e.ref.list, o = n.childViews[0], s = o.childViews.filter((D) => D.rect.element.height), i = e.query("GET_ACTIVE_ITEMS").map((D) => s.find((C) => C.id === D.id)).filter((D) => D);
  if (i.length === 0)
    return { visual: t, bounds: r };
  const a = o.rect.element.width, l = ir(o, i, n.dragCoordinates), u = i[0].rect.element, p = u.marginTop + u.marginBottom, m = u.marginLeft + u.marginRight, h = u.width + m, T = u.height + p, E = typeof l < "u" && l >= 0 ? 1 : 0, I = i.find((D) => D.markedForRemoval && D.opacity < 0.45) ? -1 : 0, O = i.length + E + I, b = or(a, h);
  return b === 1 ? i.forEach((D) => {
    const C = D.rect.element.height + p;
    r += C, t += C * D.opacity;
  }) : (r = Math.ceil(O / b) * T, t = r), { visual: t, bounds: r };
}, _l = (e) => {
  const t = e.ref.measureHeight || null;
  return { cappedHeight: parseInt(e.style.maxHeight, 10) || null, fixedHeight: t === 0 ? null : t };
}, ur = (e, t) => {
  const r = e.query("GET_ALLOW_REPLACE"), n = e.query("GET_ALLOW_MULTIPLE"), o = e.query("GET_TOTAL_ITEMS");
  let s = e.query("GET_MAX_FILES");
  const i = t.length;
  return !n && i > 1 ? (e.dispatch("DID_THROW_MAX_FILES", { source: t, error: J("warning", 0, "Max files") }), !0) : (s = n ? s : 1, !n && r ? !1 : tt(s) && o + i > s ? (e.dispatch("DID_THROW_MAX_FILES", { source: t, error: J("warning", 0, "Max files") }), !0) : !1);
}, Il = (e, t, r) => {
  const n = e.childViews[0];
  return ir(n, t, { left: r.scopeLeft - n.rect.element.left, top: r.scopeTop - (e.rect.outer.top + e.rect.element.marginTop + e.rect.element.scrollTop) });
}, sn = (e) => {
  const t = e.query("GET_ALLOW_DROP"), r = e.query("GET_DISABLED"), n = t && !r;
  if (n && !e.ref.hopper) {
    const o = nl(e.element, (s) => {
      const i = e.query("GET_BEFORE_DROP_FILE") || (() => !0);
      return e.query("GET_DROP_VALIDATION") ? s.every((a) => Xe("ALLOW_HOPPER_ITEM", a, { query: e.query }).every((l) => l === !0) && i(a)) : !0;
    }, { filterItems: (s) => {
      const i = e.query("GET_IGNORED_FILES");
      return s.filter((a) => et(a) ? !i.includes(a.name.toLowerCase()) : !0);
    }, catchesDropsOnPage: e.query("GET_DROP_ON_PAGE"), requiresDropOnElement: e.query("GET_DROP_ON_ELEMENT") });
    o.onload = (s, i) => {
      const a = e.ref.list.childViews[0].childViews.filter((u) => u.rect.element.height), l = e.query("GET_ACTIVE_ITEMS").map((u) => a.find((p) => p.id === u.id)).filter((u) => u);
      ye("ADD_ITEMS", s, { dispatch: e.dispatch }).then((u) => {
        if (ur(e, u))
          return !1;
        e.dispatch("ADD_ITEMS", { items: u, index: Il(e.ref.list, l, i), interactionMethod: Ie.DROP });
      }), e.dispatch("DID_DROP", { position: i }), e.dispatch("DID_END_DRAG", { position: i });
    }, o.ondragstart = (s) => {
      e.dispatch("DID_START_DRAG", { position: s });
    }, o.ondrag = to((s) => {
      e.dispatch("DID_DRAG", { position: s });
    }), o.ondragend = (s) => {
      e.dispatch("DID_END_DRAG", { position: s });
    }, e.ref.hopper = o, e.ref.drip = e.appendChildView(e.createChildView(va));
  } else
    !n && e.ref.hopper && (e.ref.hopper.destroy(), e.ref.hopper = null, e.removeChildView(e.ref.drip));
}, an = (e, t) => {
  const r = e.query("GET_ALLOW_BROWSE"), n = e.query("GET_DISABLED"), o = r && !n;
  o && !e.ref.browser ? e.ref.browser = e.appendChildView(e.createChildView(ha, { ...t, onload: (s) => {
    ye("ADD_ITEMS", s, { dispatch: e.dispatch }).then((i) => {
      if (ur(e, i))
        return !1;
      e.dispatch("ADD_ITEMS", { items: i, index: -1, interactionMethod: Ie.BROWSE });
    });
  } }), 0) : !o && e.ref.browser && (e.removeChildView(e.ref.browser), e.ref.browser = null);
}, ln = (e) => {
  const t = e.query("GET_ALLOW_PASTE"), r = e.query("GET_DISABLED"), n = t && !r;
  n && !e.ref.paster ? (e.ref.paster = sl(), e.ref.paster.onload = (o) => {
    ye("ADD_ITEMS", o, { dispatch: e.dispatch }).then((s) => {
      if (ur(e, s))
        return !1;
      e.dispatch("ADD_ITEMS", { items: s, index: -1, interactionMethod: Ie.PASTE });
    });
  }) : !n && e.ref.paster && (e.ref.paster.destroy(), e.ref.paster = null);
}, gl = pe({ DID_SET_ALLOW_BROWSE: ({ root: e, props: t }) => {
  an(e, t);
}, DID_SET_ALLOW_DROP: ({ root: e }) => {
  sn(e);
}, DID_SET_ALLOW_PASTE: ({ root: e }) => {
  ln(e);
}, DID_SET_DISABLED: ({ root: e, props: t }) => {
  sn(e), ln(e), an(e, t), e.query("GET_DISABLED") ? e.element.dataset.disabled = "disabled" : e.element.removeAttribute("data-disabled");
} }), yl = oe({ name: "root", read: ({ root: e }) => {
  e.ref.measure && (e.ref.measureHeight = e.ref.measure.offsetHeight);
}, create: El, write: hl, destroy: ({ root: e }) => {
  e.ref.paster && e.ref.paster.destroy(), e.ref.hopper && e.ref.hopper.destroy(), e.element.removeEventListener("touchmove", vt), e.element.removeEventListener("gesturestart", vt);
}, mixins: { styles: ["height"] } }), Sl = (e = {}) => {
  let t = null;
  const r = Rt(), n = ko(Ri(r), [Ui, Oi(r)], [fs, vi(r)]);
  n.dispatch("SET_OPTIONS", { options: e });
  const o = () => {
    document.hidden || n.dispatch("KICK");
  };
  document.addEventListener("visibilitychange", o);
  let s = null, i = !1, a = !1, l = null, u = null;
  const p = () => {
    i || (i = !0), clearTimeout(s), s = setTimeout(() => {
      i = !1, l = null, u = null, a && (a = !1, n.dispatch("DID_STOP_RESIZE"));
    }, 500);
  };
  window.addEventListener("resize", p);
  const m = yl(n, { id: Jt() });
  let h = !1, T = !1;
  const E = { _read: () => {
    i && (u = window.innerWidth, l || (l = u), !a && u !== l && (n.dispatch("DID_START_RESIZE"), a = !0)), T && h && (h = m.element.offsetParent === null), !h && (m._read(), T = m.rect.element.hidden);
  }, _write: (y) => {
    const R = n.processActionQueue().filter((M) => !/^SET_/.test(M.type));
    h && !R.length || (D(R), h = m._write(y, R, a), Li(n.query("GET_ITEMS")), h && n.processDispatchQueue());
  } }, I = (y) => (R) => {
    const M = { type: y };
    if (!R)
      return M;
    if (R.hasOwnProperty("error") && (M.error = R.error ? { ...R.error } : null), R.status && (M.status = { ...R.status }), R.file && (M.output = R.file), R.source)
      M.file = R.source;
    else if (R.item || R.id) {
      const x = R.item ? R.item : n.query("GET_ITEM", R.id);
      M.file = x ? Ee(x) : null;
    }
    return R.items && (M.items = R.items.map(Ee)), /progress/.test(y) && (M.progress = R.progress), R.hasOwnProperty("origin") && R.hasOwnProperty("target") && (M.origin = R.origin, M.target = R.target), M;
  }, O = { DID_DESTROY: I("destroy"), DID_INIT: I("init"), DID_THROW_MAX_FILES: I("warning"), DID_INIT_ITEM: I("initfile"), DID_START_ITEM_LOAD: I("addfilestart"), DID_UPDATE_ITEM_LOAD_PROGRESS: I("addfileprogress"), DID_LOAD_ITEM: I("addfile"), DID_THROW_ITEM_INVALID: [I("error"), I("addfile")], DID_THROW_ITEM_LOAD_ERROR: [I("error"), I("addfile")], DID_THROW_ITEM_REMOVE_ERROR: [I("error"), I("removefile")], DID_PREPARE_OUTPUT: I("preparefile"), DID_START_ITEM_PROCESSING: I("processfilestart"), DID_UPDATE_ITEM_PROCESS_PROGRESS: I("processfileprogress"), DID_ABORT_ITEM_PROCESSING: I("processfileabort"), DID_COMPLETE_ITEM_PROCESSING: I("processfile"), DID_COMPLETE_ITEM_PROCESSING_ALL: I("processfiles"), DID_REVERT_ITEM_PROCESSING: I("processfilerevert"), DID_THROW_ITEM_PROCESSING_ERROR: [I("error"), I("processfile")], DID_REMOVE_ITEM: I("removefile"), DID_UPDATE_ITEMS: I("updatefiles"), DID_ACTIVATE_ITEM: I("activatefile"), DID_REORDER_ITEMS: I("reorderfiles") }, b = (y) => {
    const R = { pond: W, ...y };
    delete R.type, m.element.dispatchEvent(new CustomEvent(`FilePond:${y.type}`, { detail: R, bubbles: !0, cancelable: !0, composed: !0 }));
    const M = [];
    y.hasOwnProperty("error") && M.push(y.error), y.hasOwnProperty("file") && M.push(y.file);
    const x = ["type", "error", "file"];
    Object.keys(y).filter((fe) => !x.includes(fe)).forEach((fe) => M.push(y[fe])), W.fire(y.type, ...M);
    const V = n.query(`GET_ON${y.type.toUpperCase()}`);
    V && V(...M);
  }, D = (y) => {
    y.length && y.filter((R) => O[R.type]).forEach((R) => {
      const M = O[R.type];
      (Array.isArray(M) ? M : [M]).forEach((x) => {
        R.type === "DID_INIT_ITEM" ? b(x(R.data)) : setTimeout(() => {
          b(x(R.data));
        }, 0);
      });
    });
  }, C = (y) => n.dispatch("SET_OPTIONS", { options: y }), N = (y) => n.query("GET_ACTIVE_ITEM", y), L = (y) => new Promise((R, M) => {
    n.dispatch("REQUEST_ITEM_PREPARE", { query: y, success: (x) => {
      R(x);
    }, failure: (x) => {
      M(x);
    } });
  }), F = (y, R = {}) => new Promise((M, x) => {
    z([{ source: y, options: R }], { index: R.index }).then((V) => M(V && V[0])).catch(x);
  }), A = (y) => y.file && y.id, w = (y, R) => (typeof y == "object" && !A(y) && !R && (R = y, y = void 0), n.dispatch("REMOVE_ITEM", { ...R, query: y }), n.query("GET_ACTIVE_ITEM", y) === null), z = (...y) => new Promise((R, M) => {
    const x = [], V = {};
    if (Dt(y[0]))
      x.push.apply(x, y[0]), Object.assign(V, y[1] || {});
    else {
      const fe = y[y.length - 1];
      typeof fe == "object" && !(fe instanceof Blob) && Object.assign(V, y.pop()), x.push(...y);
    }
    n.dispatch("ADD_ITEMS", { items: x, index: V.index, interactionMethod: Ie.API, success: R, failure: M });
  }), P = () => n.query("GET_ACTIVE_ITEMS"), q = (y) => new Promise((R, M) => {
    n.dispatch("REQUEST_ITEM_PROCESSING", { query: y, success: (x) => {
      R(x);
    }, failure: (x) => {
      M(x);
    } });
  }), Q = (...y) => {
    const R = Array.isArray(y[0]) ? y[0] : y, M = R.length ? R : P();
    return Promise.all(M.map(L));
  }, Z = (...y) => {
    const R = Array.isArray(y[0]) ? y[0] : y;
    if (!R.length) {
      const M = P().filter((x) => !(x.status === U.IDLE && x.origin === ie.LOCAL) && x.status !== U.PROCESSING && x.status !== U.PROCESSING_COMPLETE && x.status !== U.PROCESSING_REVERT_ERROR);
      return Promise.all(M.map(q));
    }
    return Promise.all(R.map(q));
  }, v = (...y) => {
    const R = Array.isArray(y[0]) ? y[0] : y;
    let M;
    typeof R[R.length - 1] == "object" ? M = R.pop() : Array.isArray(y[0]) && (M = y[1]);
    const x = P();
    return R.length ? R.map((V) => Be(V) ? x[V] ? x[V].id : null : V).filter((V) => V).map((V) => w(V, M)) : Promise.all(x.map((V) => w(V, M)));
  }, W = { ...wt(), ...E, ...bi(n, r), setOptions: C, addFile: F, addFiles: z, getFile: N, processFile: q, prepareFile: L, removeFile: w, moveFile: (y, R) => n.dispatch("MOVE_ITEM", { query: y, index: R }), getFiles: P, processFiles: Z, removeFiles: v, prepareFiles: Q, sort: (y) => n.dispatch("SORT", { compare: y }), browse: () => {
    var y = m.element.querySelector("input[type=file]");
    y && y.click();
  }, destroy: () => {
    W.fire("destroy", m.element), n.dispatch("ABORT_ALL"), m._destroy(), window.removeEventListener("resize", p), document.removeEventListener("visibilitychange", o), n.dispatch("DID_DESTROY");
  }, insertBefore: (y) => Pr(m.element, y), insertAfter: (y) => Mr(m.element, y), appendTo: (y) => y.appendChild(m.element), replaceElement: (y) => {
    Pr(m.element, y), y.parentNode.removeChild(y), t = y;
  }, restoreElement: () => {
    t && (Mr(t, m.element), m.element.parentNode.removeChild(m.element), t = null);
  }, isAttachedTo: (y) => m.element === y || t === y, element: { get: () => m.element }, status: { get: () => n.query("GET_STATUS") } };
  return n.dispatch("DID_INIT"), Fe(W);
}, ro = (e = {}) => {
  const t = {};
  return K(Rt(), (r, n) => {
    t[r] = n[0];
  }), Sl({ ...t, ...e });
}, Rl = (e) => e.charAt(0).toLowerCase() + e.slice(1), bl = (e) => eo(e.replace(/^data-/, "")), no = (e, t) => {
  K(t, (r, n) => {
    K(e, (o, s) => {
      const i = new RegExp(r);
      if (!i.test(o) || (delete e[o], n === !1))
        return;
      if (de(n)) {
        e[n] = s;
        return;
      }
      const a = n.group;
      se(n) && !e[a] && (e[a] = {}), e[a][Rl(o.replace(i, ""))] = s;
    }), n.mapping && no(e[n.group], n.mapping);
  });
}, vl = (e, t = {}) => {
  const r = [];
  K(e.attributes, (o) => {
    r.push(e.attributes[o]);
  });
  const n = r.filter((o) => o.name).reduce((o, s) => {
    const i = ne(e, s.name);
    return o[bl(s.name)] = i === s.name ? !0 : i, o;
  }, {});
  return no(n, t), n;
}, Ol = (e, t = {}) => {
  const r = { "^class$": "className", "^multiple$": "allowMultiple", "^capture$": "captureMethod", "^webkitdirectory$": "allowDirectoriesOnly", "^server": { group: "server", mapping: { "^process": { group: "process" }, "^revert": { group: "revert" }, "^fetch": { group: "fetch" }, "^restore": { group: "restore" }, "^load": { group: "load" } } }, "^type$": !1, "^files$": !1 };
  Xe("SET_ATTRIBUTE_TO_OPTION_MAP", r);
  const n = { ...t }, o = vl(e.nodeName === "FIELDSET" ? e.querySelector("input[type=file]") : e, r);
  Object.keys(o).forEach((i) => {
    se(o[i]) ? (se(n[i]) || (n[i] = {}), Object.assign(n[i], o[i])) : n[i] = o[i];
  }), n.files = (t.files || []).concat(Array.from(e.querySelectorAll("input:not([type=file])")).map((i) => ({ source: i.value, options: { type: i.dataset.type } })));
  const s = ro(n);
  return e.files && Array.from(e.files).forEach((i) => {
    s.addFile(i);
  }), s.replaceElement(e), s;
}, Dl = (...e) => xo(e[0]) ? Ol(...e) : ro(...e), Al = ["fire", "_read", "_write"], cn = (e) => {
  const t = {};
  return bn(e, t, Al), t;
}, Ll = (e, t) => e.replace(/(?:{([a-zA-Z]+)})/g, (r, n) => t[n]), wl = (e) => {
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
}, Pl = (e) => new Promise((t, r) => {
  const n = new Image();
  n.onload = () => {
    t(n);
  }, n.onerror = (o) => {
    r(o);
  }, n.src = e;
}), oo = (e, t) => {
  const r = e.slice(0, e.size, e.type);
  return r.lastModifiedDate = e.lastModifiedDate, r.name = t, r;
}, Ml = (e) => oo(e, e.name), un = [], Cl = (e) => {
  if (un.includes(e))
    return;
  un.push(e);
  const t = e({ addFilter: Pi, utils: { Type: g, forin: K, isString: de, isFile: et, toNaturalFileSize: xn, replaceInString: Ll, getExtensionFromFilename: Pt, getFilenameWithoutExtension: Nn, guesstimateMimeType: jn, getFileFromBlob: Je, getFilenameFromURL: dt, createRoute: pe, createWorker: wl, createView: oe, createItemAPI: Ee, loadImage: Pl, copyFile: Ml, renameFile: oo, createBlob: Pn, applyFilterChain: ye, text: ee, getNumericAspectRatioFromString: Dn }, views: { fileActionButton: Fn } });
  Mi(t.options);
}, Nl = () => Object.prototype.toString.call(window.operamini) === "[object OperaMini]", Gl = () => "Promise" in window, Fl = () => "slice" in Blob.prototype, xl = () => "URL" in window && "createObjectURL" in window.URL, kl = () => "visibilityState" in document, ql = () => "performance" in window, Bl = () => "supports" in (window.CSS || {}), Ul = () => /MSIE|Trident/.test(window.navigator.userAgent), dn = (() => {
  const e = _n() && !Nl() && kl() && Gl() && Fl() && xl() && ql() && (Bl() || Ul());
  return () => e;
})(), Ce = { apps: [] }, Vl = "filepond", je = () => {
};
let Zt = {}, pn = {}, yt = je, Vt = je, fn = je, En = je, Ot = je, hn = je, mn = je;
if (dn()) {
  ci(() => {
    Ce.apps.forEach((r) => r._read());
  }, (r) => {
    Ce.apps.forEach((n) => n._write(r));
  });
  const e = () => {
    document.dispatchEvent(new CustomEvent("FilePond:loaded", { detail: { supported: dn, create: yt, destroy: Vt, parse: fn, find: En, registerPlugin: Ot, setOptions: mn } })), document.removeEventListener("DOMContentLoaded", e);
  };
  document.readyState !== "loading" ? setTimeout(() => e(), 0) : document.addEventListener("DOMContentLoaded", e);
  const t = () => K(Rt(), (r, n) => {
    pn[r] = n[1];
  });
  Zt = { ...An }, pn = {}, t(), yt = (...r) => {
    const n = Dl(...r);
    return n.on("destroy", Vt), Ce.apps.push(n), cn(n);
  }, Vt = (r) => {
    const n = Ce.apps.findIndex((o) => o.isAttachedTo(r));
    return n >= 0 ? (Ce.apps.splice(n, 1)[0].restoreElement(), !0) : !1;
  }, fn = (r) => Array.from(r.querySelectorAll(`.${Vl}`)).filter((n) => !Ce.apps.find((o) => o.isAttachedTo(n))).map((n) => yt(n)), En = (r) => {
    const n = Ce.apps.find((o) => o.isAttachedTo(r));
    return n ? cn(n) : null;
  }, Ot = (...r) => {
    r.forEach(Cl), t();
  }, hn = () => {
    const r = {};
    return K(Rt(), (n, o) => {
      r[n] = o[0];
    }), r;
  }, mn = (r) => (se(r) && (Ce.apps.forEach((n) => {
    n.setOptions(r);
  }), Ci(r)), hn());
}
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
    const u = i("GET_FILE_VALIDATE_SIZE_FILTER");
    if (u && !u(s))
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
}, Hl = typeof window < "u" && typeof window.document < "u";
Hl && document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: io }));
/*!
* FilePondPluginFileValidateType 1.2.9
* Licensed under MIT, https://opensource.org/licenses/MIT/
* Please visit https://pqina.nl/filepond/ for details.
*/
const so = ({ addFilter: e, utils: t }) => {
  const { Type: r, isString: n, replaceInString: o, guesstimateMimeType: s, getExtensionFromFilename: i, getFilenameFromURL: a } = t, l = (T, E) => {
    const I = (/^[^/]+/.exec(T) || []).pop(), O = E.slice(0, -2);
    return I === O;
  }, u = (T, E) => T.some((I) => /\*$/.test(I) ? l(E, I) : I === E), p = (T) => {
    let E = "";
    if (n(T)) {
      const I = a(T), O = i(I);
      O && (E = s(O));
    } else
      E = T.type;
    return E;
  }, m = (T, E, I) => {
    if (E.length === 0)
      return !0;
    const O = p(T);
    return I ? new Promise((b, D) => {
      I(T, O).then((C) => {
        u(E, C) ? b() : D();
      }).catch(D);
    }) : u(E, O);
  }, h = (T) => (E) => T[E] === null ? !1 : T[E] || E;
  return e("SET_ATTRIBUTE_TO_OPTION_MAP", (T) => Object.assign(T, { accept: "acceptedFileTypes" })), e("ALLOW_HOPPER_ITEM", (T, { query: E }) => E("GET_ALLOW_FILE_TYPE_VALIDATION") ? m(T, E("GET_ACCEPTED_FILE_TYPES")) : !0), e("LOAD_FILE", (T, { query: E }) => new Promise((I, O) => {
    if (!E("GET_ALLOW_FILE_TYPE_VALIDATION")) {
      I(T);
      return;
    }
    const b = E("GET_ACCEPTED_FILE_TYPES"), D = E("GET_FILE_VALIDATE_TYPE_DETECT_TYPE"), C = m(T, b, D), N = () => {
      const L = b.map(h(E("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES_MAP"))).filter((A) => A !== !1), F = L.filter((A, w) => L.indexOf(A) === w);
      O({ status: { main: E("GET_LABEL_FILE_TYPE_NOT_ALLOWED"), sub: o(E("GET_FILE_VALIDATE_TYPE_LABEL_EXPECTED_TYPES"), { allTypes: F.join(", "), allButLastType: F.slice(0, -1).join(", "), lastType: F[F.length - 1] }) } });
    };
    if (typeof C == "boolean")
      return C ? I(T) : N();
    C.then(() => {
      I(T);
    }).catch(N);
  })), { options: { allowFileTypeValidation: [!0, r.BOOLEAN], acceptedFileTypes: [[], r.ARRAY], labelFileTypeNotAllowed: ["File is of invalid type", r.STRING], fileValidateTypeLabelExpectedTypes: ["Expects {allButLastType} or {lastType}", r.STRING], fileValidateTypeLabelExpectedTypesMap: [{}, r.OBJECT], fileValidateTypeDetectType: [null, r.FUNCTION] } };
}, Yl = typeof window < "u" && typeof window.document < "u";
Yl && document.dispatchEvent(new CustomEvent("FilePond:pluginloaded", { detail: so }));
class We {
  constructor(t) {
    if (t.dataset.refFileUpload)
      return We.refs[t.dataset.refFileUpload];
    this.ref = Math.random(), We.refs[this.ref] = this, t.dataset.refFileUpload = this.ref, this.inputs = t.querySelectorAll('input[type="file"]'), this.fileponds = {}, this.headers = { Authorization: "pFdRC99ihTG!C%BQB6EJKjc!n%" }, document.addEventListener("FilePond:loaded", () => this.onload());
    const r = new Ge(t.closest("[c-async-form]"));
    r.onBeforeSubmit = () => this.beforeSubmit(), r.onPayload = (n) => this.onPayload(n), r.onInput = async (n, o) => await this.inputHandler(n, o);
  }
  onload() {
    Ot(so), Ot(io);
    const t = { server: { url: "https://formupload.agentur-chapeau.de/", process: { url: "process", headers: this.headers }, revert: { url: "revert", headers: this.headers }, restore: null, load: null, fetch: null }, credits: !1, ...zl, ...window.c_fileupload_options };
    for (const r of this.inputs)
      this.fileponds[r.name] = yt(r, { ...t, maxFiles: r.dataset.maxFiles || null, maxFileSize: r.dataset.maxFileSize || null, maxTotalFileSize: r.dataset.maxTotalFileSize || null });
  }
  beforeSubmit() {
    for (const [t, r] of Object.entries(this.fileponds))
      if (!(r.status == Zt.EMPTY || r.status == Zt.READY))
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
    const n = this.fileponds[t.name], o = n.getFiles().find((u) => u.serverId === r), s = await fetch(`${n.server.url}finish`, { method: "POST", body: r, headers: this.headers });
    if (!s.ok)
      throw new Error("Upload could not finish ", s);
    const i = await s.text(), a = o.filename, l = o.fileSize;
    return { url: i, name: a, size: l };
  }
}
We.refs = {}, window.FileUpload = We, document.addEventListener("DOMContentLoaded", () => {
  Array.from(document.querySelectorAll("[c-file-upload]")).forEach((e) => new We(e));
});
const zl = { labelIdle: 'Dateien hierher ziehen oder <span class="filepond--label-action">auswählen</span>', labelInvalidField: "Feld enthält ungültige Dateien", labelFileWaitingForSize: "Auf Größe warten", labelFileSizeNotAvailable: "Größe nicht verfügbar", labelFileLoading: "Laden", labelFileLoadError: "Fehler beim Laden", labelFileProcessing: "Hochladen", labelFileProcessingComplete: "Hochgeladen", labelFileProcessingAborted: "Hochladen abgebrochen", labelFileProcessingError: "Fehler beim Hochladen", labelFileProcessingRevertError: "Fehler beim Entfernen", labelFileRemoveError: "Fehler beim Löschen", labelTapToCancel: "Tippen zum Abbrechen ", labelTapToRetry: "Tippen zum Wiederholen", labelTapToUndo: "Tippen zum Entfernen", labelButtonRemoveItem: "Entfernen", labelButtonAbortItemLoad: "Abbrechen", labelButtonRetryItemLoad: "Wiederholen", labelButtonAbortItemProcessing: "Abbrechen", labelButtonUndoItemProcessing: "Entfernen", labelButtonRetryItemProcessing: "Wiederholen", labelButtonProcessItem: "Hochladen", labelMaxFileSizeExceeded: "Datei ist zu groß", labelMaxFileSize: "Maximale Dateigröße beträgt {filesize}", labelMaxTotalFileSizeExceeded: "Maximale Gesamtgröße überschritten", labelMaxTotalFileSize: "Maximale Gesamtgröße beträgt {filesize}", labelFileTypeNotAllowed: "Ungültiger Dateityp", fileValidateTypeLabelExpectedTypes: "Gültige Dateitypen: {allButLastType} und {lastType}", fileValidateTypeLabelExpectedTypesMap: { "image/*": "Bilddateien", "image/png": ".png", "image/jpg": ".jpg", "image/jpeg": ".jpeg", "application/pdf": ".pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx" } };
var Ne = window.Webflow || [];
Ne.push(() => {
  Wl();
});
function Wl() {
  const e = document.querySelector('[c-chapeau-form="main"]'), t = e.querySelector('[c-chapeau-form="nav"]'), r = e.querySelector('[c-chapeau-form="total-steps"]'), n = e.querySelector('[c-chapeau-form="progress"]'), o = e.querySelector('[c-chapeau-form="slider"]'), s = e.querySelector('[c-chapeau-form="slides"]'), i = e.querySelector('[c-chapeau-form="not-qualified-message"]'), a = e.querySelector('[c-chapeau-form="buttons"]'), l = '[c-chapeau-form="form"]', u = '[c-chapeau-form="next"]', p = '[c-chapeau-form="back"]', m = '[c-chapeau-form="current-step"]';
  Xl(o, s);
  const h = new Fo.MSF({
    hiddeButtonsOnSubmit: !1,
    // Buttons will be manually hidden
    scrollTopOnStepChange: !1,
    formSelector: l,
    nextSelector: u,
    backSelector: p,
    currentStepSelector: m
  });
  Ql(h), jl(h, n), Zl(h), $l(h, i, t, a), Kl(h), Jl(h, e);
  const T = h.view.steps.length;
  r.textContent = T, window.msf = h, e.removeAttribute("c-cloak"), h.view.setMaskHeight(0);
}
function Xl(e, t) {
  const r = e.querySelector(":scope > .w-slider-mask"), n = Array.from(t.querySelectorAll(":scope > .w-dyn-items > .w-dyn-item"));
  Array.from(r.querySelectorAll(".w-slide")).forEach((o) => o.remove()), n.forEach((o) => {
    o.classList.add("w-slide"), r.appendChild(o);
  }), t.remove(), Ne.destroy(), Ne.ready(), Ne.require("ix2").init(), Ne.require("slider").redraw(), Ne.require("slider").ready();
}
function jl({ view: e, controller: t }, r) {
  e.next.addEventListener("click", n), e.back.addEventListener("click", n), n();
  function n() {
    const o = t.currentStep + 1, s = e.steps.length, i = Math.min(o / s * 100, 100);
    r.style.width = `${i}%`;
  }
}
function $l({ view: e, controller: t }, r, n, o) {
  e.form.addEventListener("change", s);
  function s() {
    var T;
    const p = e.getInputs(t.currentStep).some((E) => E.checked ? E.parentElement.querySelector('[c-chapeau-form="not-qualified"]') != null : !1), m = e.steps[t.currentStep], h = (T = m.nextSibling) == null ? void 0 : T.matches(
      '[c-chapeau-form="not-qualified-message"]'
    );
    p ? (e.next.dataset.trackDisabled = !0, h || (m.insertAdjacentHTML("afterend", r.outerHTML), m.nextElementSibling.querySelector('[c-chapeau-form="not-qualified-back"]').addEventListener("click", () => e.back.click()))) : (e.next.dataset.trackDisabled = !1, h && m.nextSibling.remove()), m.dataset.notQualified = p, Ne.require("slider").redraw(), Ne.require("slider").ready();
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
function Ql({ view: e }) {
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
function Kl(e) {
  const t = e.view, r = e.controller, n = t.form.closest("[c-async-form]"), o = t.back, s = t.next, i = new Ge(n);
  i.onState = (a) => {
    a === "success" && (t.hideElement(o), t.hideElement(s));
  }, r.observeSubmitText(), r.handleSubmit = () => {
    r.currentStep = Math.min(r.currentStep, t.steps.length - 1);
  };
}
function Jl(e, t) {
  new We(t);
  const r = e.view, n = e.controller;
  r.form.addEventListener("FilePond:updatefiles", () => {
    setTimeout(() => r.setMaskHeight(n.currentStep), 100);
  });
}
//# sourceMappingURL=chapeau-formular.js.map
