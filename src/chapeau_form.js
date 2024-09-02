import * as AWF from "advanced-webflow-forms/dist/awf.js";
import { AsyncForm, FileUpload } from "chapeaujs";
import "chapeaujs/dist/style.css";
import "../styles/chapeau_formular.css";

var Webflow = window.Webflow || [];
Webflow.push(() => {
  createChapeauFormular();
});

function createChapeauFormular() {
  const $main = document.querySelector('[c-chapeau-form="main"]');

  const $nav = $main.querySelector('[c-chapeau-form="nav"]');
  const $totalSteps = $main.querySelector('[c-chapeau-form="total-steps"]');
  const $progress = $main.querySelector('[c-chapeau-form="progress"]');

  const $slider = $main.querySelector('[c-chapeau-form="slider"]');
  const $slideList = $main.querySelector('[c-chapeau-form="slides"]');
  const $notQualifiedMsg = $main.querySelector(
    '[c-chapeau-form="not-qualified-message"]',
  );

  const $buttons = $main.querySelector('[c-chapeau-form="buttons"]');

  const formSelector = '[c-chapeau-form="form"]';
  const nextSelector = '[c-chapeau-form="next"]';
  const backSelector = '[c-chapeau-form="back"]';
  const currentStepSelector = '[c-chapeau-form="current-step"]';

  moveCmsSlidesToSlider($slider, $slideList);

  // Create MultiStepForm
  const msf = new AWF.MSF({
    hiddeButtonsOnSubmit: false, // Buttons will be manually hidden
    scrollTopOnStepChange: false,
    formSelector: formSelector,
    nextSelector: nextSelector,
    backSelector: backSelector,
    currentStepSelector: currentStepSelector,
  });

  useDisabledClass(msf);
  useProgressBar(msf, $progress);
  useBrowserValidation(msf);
  useNotQualified(msf, $notQualifiedMsg, $nav, $buttons);
  useConversion(msf);
  useAyncForm(msf, $main);
  useFileUpload(msf, $main);

  // Set total step count
  const totalSteps = msf.view.steps.length;
  $totalSteps.textContent = totalSteps;

  // Make msf available in console
  window.msf = msf;

  $main.removeAttribute("c-cloak");

  msf.view.setMaskHeight(0);
}

function moveCmsSlidesToSlider($slider, $slideList) {
  const sliderMask = $slider.querySelector(":scope > .w-slider-mask");
  const slides = Array.from(
    $slideList.querySelectorAll(":scope > .w-dyn-items > .w-dyn-item"),
  );

  Array.from(sliderMask.querySelectorAll(".w-slide")).forEach((el) =>
    el.remove(),
  );

  slides.forEach((slide) => {
    slide.classList.add("w-slide");
    sliderMask.appendChild(slide);
  });

  $slideList.remove();

  // Reset Webflow Slider
  Webflow.destroy();
  Webflow.ready();
  Webflow.require("ix2")?.init();
  Webflow.require("slider").redraw();
  Webflow.require("slider").ready();
}

function useProgressBar({ view, controller }, $progress) {
  view.next.addEventListener("click", updateProgressBar);
  view.back.addEventListener("click", updateProgressBar);
  updateProgressBar();

  function updateProgressBar() {
    const currentStep = controller.currentStep + 1; // 0-based
    const totalSteps = view.steps.length;
    const progress = Math.min((currentStep / totalSteps) * 100, 100);

    $progress.style.width = `${progress}%`;
  }
}

function useNotQualified({ view, controller }, notQualifiedMsg, nav, buttons) {
  view.form.addEventListener("change", checkQualified);
  function checkQualified() {
    const inputs = view.getInputs(controller.currentStep);

    const notQualified = inputs.some((input) => {
      if (input.checked) {
        return (
          input.parentElement.querySelector(
            '[c-chapeau-form="not-qualified"]',
          ) != null
        );
      } else {
        return false;
      }
    });

    const currentSlide = view.steps[controller.currentStep];
    const isNextSlideNotQualifiedMessage = currentSlide.nextSibling?.matches(
      '[c-chapeau-form="not-qualified-message"]',
    );
    if (notQualified) {
      if (!isNextSlideNotQualifiedMessage) {
        currentSlide.insertAdjacentHTML("afterend", notQualifiedMsg.outerHTML);
        currentSlide.nextElementSibling
          .querySelector('[c-chapeau-form="not-qualified-back"]')
          .addEventListener("click", () => view.back.click());
      }
    } else {
      if (isNextSlideNotQualifiedMessage) {
        currentSlide.nextSibling.remove();
      }
    }

    currentSlide.dataset.notQualified = notQualified;

    Webflow.require("slider").redraw();
    Webflow.require("slider").ready();
  }

  // Do not submit if not qualified
  const originalSubmitForm = view.submitForm.bind(view);
  view.submitForm = () => {
    const lastSlide = view.steps[view.steps.length - 1];
    if (lastSlide.dataset.notQualified === "true") {
      view.goNext();
      hideElements();
    } else {
      originalSubmitForm();
    }
  };

  view.next.addEventListener("click", () => {
    const lastSlide = view.steps[controller.currentStep - 1];
    if (lastSlide?.dataset.notQualified === "true") {
      hideElements();
    }
  });

  view.back.addEventListener("click", () => {
    showElements();
  });

  function hideElements() {
    view.hideElement(nav);
    view.hideElement(buttons);
  }

  function showElements() {
    view.showElement(nav);
    view.showElement(buttons);
  }
}

function useDisabledClass({ view }) {
  // Back Button is already disabled using built-in method. So redo that
  view.enableElement(view.back);

  view.disableElement = (el) => {
    if (!el) return;
    el.classList.add("disabled");
  };

  view.enableElement = (el) => {
    if (!el) return;
    el.classList.remove("disabled");
  };

  view.disableElement(view.back);
}

function useBrowserValidation(msf) {
  const view = msf.view;
  const controller = msf.controller;

  // Safe original implementation
  const originalCheckRequiredInputs =
    controller.checkRequiredInputs.bind(controller);

  function newCheckRequiredInputs() {
    this.inputsCurrentlyValid = true;

    const inputs = this.view.getInputs(this.currentStep);

    for (const input of inputs) {
      const isValid = input.reportValidity();
      // Short circuit and directly return false if one input is not valid
      if (!isValid) {
        this.inputsCurrentlyValid = false;
        return false;
      }
    }

    // Run original implementation (for warning classes, etc.)
    return originalCheckRequiredInputs();
  }

  // Monkeypatch `checkRequiredInputs` with custom function
  controller.checkRequiredInputs = newCheckRequiredInputs.bind(controller);
}

function useAyncForm({ view, controller }, $main) {
  // Get elements
  const $back = view.back;
  const $next = view.next;

  const asyncForm = new AsyncForm($main);
  asyncForm.onState = (state) => {
    // Hide Buttons on success
    if (state === "success") {
      view.hideElement($back);
      view.hideElement($next);
    }
  };

  // Next button text should always reflect submit button (e.g. loading text)
  controller.observeSubmitText();
  // Remove submit functionality by monkeypatching, because AsyncForm handles it
  controller.handleSubmit = () => {
    // Prevent currentStep from exceding the maximum
    controller.currentStep = Math.min(
      controller.currentStep,
      view.steps.length - 1,
    );
  };
}

function useFileUpload(msf, $main) {
  new FileUpload($main);

  const view = msf.view;
  const controller = msf.controller;

  // Update mask height if files are added or removed
  view.form.addEventListener("FilePond:updatefiles", () => {
    setTimeout(() => view.setMaskHeight(controller.currentStep), 100); // 100ms delay to let FilePond-Element update
  });
}

function useConversion({ view, controller }) {
  // Check validity of all inputs on each step
  // If not valid the conversion event should not fire
  // It should also not fire if the selection is not qualified
  view.form.addEventListener("change", checkValidity);
  view.next.addEventListener("click", checkValidity);
  view.back.addEventListener("click", checkValidity);
  checkValidity();

  function checkValidity() {
    const inputs = view.getInputs(controller.currentStep);
    const inputsNotValid = inputs.some((input) => !input.checkValidity());

    const currentSlide = view.steps[controller.currentStep];
    const currentSlideNotQualified =
      currentSlide.dataset.notQualified == "true";

    view.next.dataset.trackDisabled =
      inputsNotValid || currentSlideNotQualified;
  }
}
