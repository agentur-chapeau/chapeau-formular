document.addEventListener("DOMContentLoaded", () => {
	if (window.location.search) {
		const params = new URLSearchParams(window.location.search);

		const gclid = params.get("gclid");
		if (gclid) {
			window.localStorage.setItem("gclid", gclid);
		}

		const fbclid = params.get("fbclid");
		if (fbclid) {
			const fbc = `fb.1.${Date.now()}.${fbclid}`;
			window.localStorage.setItem("fbc", fbc);
		}

		const ttclid = params.get("ttclid");
		if (ttclid) {
			window.localStorage.setItem("ttclid", ttclid);
		}
	}

	const forms = Array.from(document.querySelectorAll("[c-conversion] > form"));
	forms.forEach((form) => {
		// Create hidden input for each and store it in object
		const inputs = ["gclid", "fbc", "fbp", "user-agent", "ttclid", "url"].reduce((obj, name) => {
			const input = document.createElement("input");
			input.type = "hidden";
			input.name = name;
			form.appendChild(input);

			return {
				...obj,
				[name]: input,
			};
		}, {});

		form.addEventListener("submit", () => {
			const conversionIds = getConversionIDs();

			inputs.gclid.value = conversionIds.gclid;
			inputs.fbc.value = conversionIds.fbc;
			inputs.fbp.value = conversionIds.fbp;
			inputs["user-agent"].value = conversionIds.useragent;
			inputs.ttclid.value = conversionIds.ttclid;
			inputs.url.value = conversionIds.url;

			// Tracking Events
			if (window.fbq !== undefined) {
				fbq("track", "SubmitApplication", {}, { eventID: conversionIds.fbp });
			}
		});
	});

	const trackElements = Array.from(document.querySelectorAll("[data-fb-track]"));
	trackElements.forEach((el) => {
		el.addEventListener("click", () => {
			const isDisabled = el.dataset.trackDisabled === "true";
			if (isDisabled) return;

			const event = el.dataset.fbTrack;
			const conversionIds = getConversionIDs();
			const url = el.dataset.trackUrl;

			if (window.fbq !== undefined) {
				fbq("track", event, {}, { eventID: conversionIds.fbp });
			}

			fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					event,
					...conversionIds,
				}),
			});
		});
	});

	function getConversionIDs() {
		const gclid = window.localStorage.getItem("gclid");
		const fbc = window.localStorage.getItem("fbc");
		const fbp = getCookie("_fbp");
		const useragent = navigator.userAgent;
		const ttclid = window.localStorage.getItem("ttclid");
		const url = window.location.href;

		return {
			gclid,
			fbc,
			fbp,
			useragent,
			ttclid,
			url,
		};
	}

	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(";").shift();
		else return null;
	}
});
