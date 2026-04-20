export const formatDate = (date: Date | string, hasISO: boolean = false) => {
	// HTML attribute
	const html = new Intl.DateTimeFormat("sv-SE")
		.format(new Date(date))
		.toString();

	// Formatted date
	const formatted = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	})
		.format(new Date(date))
		.toString();

	// Short date (e.g. 11 Oct)
	const short = new Intl.DateTimeFormat("en-GB", {
		day: "numeric",
		month: "short",
	})
		.format(new Date(date))
		.toString();

	// Datetime
	const datetime = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	})
		.format(new Date(date))
		.toString()
		.replace(" AM", " am")
		.replace(" PM", " pm");

	// ISO
	if (hasISO) {
		const iso = new Date(date).toISOString();
		const isoSplit = iso.split("T");
		const isoMini = `${isoSplit[0]} ${isoSplit[1].slice(0, 5)}`;

		return {
			html: html,
			formatted: formatted,
			datetime: datetime,
			short: short,
			iso: iso,
			isoMini: isoMini,
		};
	}

	return {
		html: html,
		formatted: formatted,
		datetime: datetime,
		short: short,
	};
};
