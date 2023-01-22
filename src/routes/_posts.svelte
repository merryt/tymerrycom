<script>
	export let title;
	export let date;
	export let mainImg;

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
	let updatedDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
</script>

{#if mainImg}
	<div class="hero">
		<img src={mainImg} />
	</div>
{/if}
<div class="article-page item-boxshadow">
	<div class="article-date">{updatedDate}</div>

	<h1>{title}</h1>
	<div class="content">
		<slot />
	</div>
</div>
