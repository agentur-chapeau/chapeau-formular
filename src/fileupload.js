import * as FilePond from "filepond";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import "../styles/fileupload.css";

import { AsyncForm } from "./async_form.js";

export class FileUpload {
	constructor(el) {
		if (el.dataset.refFileUpload) {
			return FileUpload.refs[el.dataset.refFileUpload];
		}

		this.ref = Math.random();
		FileUpload.refs[this.ref] = this;
		el.dataset.refFileUpload = this.ref;

		this.inputs = el.querySelectorAll('input[type="file"]');

		this.fileponds = {};
		this.headers = {
			Authorization: "pFdRC99ihTG!C%BQB6EJKjc!n%",
		};

		document.addEventListener("FilePond:loaded", () => this.onload());
		const asyncForm = new AsyncForm(el.closest("[c-async-form]"));
		asyncForm.onBeforeSubmit = () => this.beforeSubmit();
		asyncForm.onPayload = (payload) => this.onPayload(payload);
		asyncForm.onInput = async (input, value) => await this.inputHandler(input, value);
	}

	onload() {
		FilePond.registerPlugin(FilePondPluginFileValidateType);
		FilePond.registerPlugin(FilePondPluginFileValidateSize);

		const options = {
			server: {
				url: "https://formupload.agentur-chapeau.de/",
				process: {
					url: "process",
					headers: this.headers,
				},
				revert: {
					url: "revert",
					headers: this.headers,
				},
				restore: null,
				load: null,
				fetch: null,
			},
			credits: false,
			...defaultLabels,
			...window.c_fileupload_options,
		};

		for (const input of this.inputs) {
			this.fileponds[input.name] = FilePond.create(input, {
				...options,
				maxFiles: input.dataset.maxFiles || null,
				maxFileSize: input.dataset.maxFileSize || null,
				maxTotalFileSize: input.dataset.maxTotalFileSize || null,
			});
		}
	}

	beforeSubmit() {
		for (const [_, filepond] of Object.entries(this.fileponds)) {
			if (!(filepond.status == FilePond.Status.EMPTY || filepond.status == FilePond.Status.READY)) {
				alert("Es sind noch nicht alle Dateien hochgeladen!");
				return false;
			}
		}

		return true;
	}

	onPayload(payload) {
		for (const input of this.inputs) {
			if (input.multiple) {
				payload[input.name] = [];
			}
		}

		return payload;
	}

	async inputHandler(input, value) {
		if (!input.closest(".filepond--root")) {
			return value;
		}

		if (!input.closest(".filepond--data")) {
			return null;
		}

		const filepond = this.fileponds[input.name];
		const fileObject = filepond.getFiles().find((f) => f.serverId === value);

		const res = await fetch(`${filepond.server.url}finish`, {
			method: "POST",
			body: value,
			headers: this.headers,
		});

		if (!res.ok) {
			throw new Error("Upload could not finish ", res);
		}

		const fileUrl = await res.text();
		const fileName = fileObject.filename;
		const fileSize = fileObject.fileSize;

		return {
			url: fileUrl,
			name: fileName,
			size: fileSize,
		};
	}
}

FileUpload.refs = {};

document.addEventListener("DOMContentLoaded", () => {
	Array.from(document.querySelectorAll("[c-file-upload]")).forEach((el) => new FileUpload(el));
});

const defaultLabels = {
	labelIdle: `Dateien hierher ziehen oder <span class="filepond--label-action">auswählen</span>`,
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
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
	},
};
