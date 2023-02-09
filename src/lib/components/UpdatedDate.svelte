<script>
	export let date;
	const newDate = new Date(date.replace(/\\/g, ''));
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	const day = newDate.getDate();
	const monthIndex = newDate.getMonth();
	const year = newDate.getFullYear();
	console.log(date);
	let prettyDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
</script>

<span>
	{prettyDate}
</span>
