export function glitchEffect(node) {
	const ctx = node.getContext('2d');
	let width, height;
	let animationId;
	let mouse = { x: 0, y: 0, active: false };
	let glitchIntensity = 0;
	let lastX = 0,
		lastY = 0;

	const img = new Image();
	img.src = '/two_tone_profile.jpg';

	function resize() {
		width = node.clientWidth;
		height = node.clientHeight;
		node.width = width * window.devicePixelRatio;
		node.height = height * window.devicePixelRatio;
		ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	}

	let currentZoom = 1.0;
	let currentFocus = { x: 0.5, y: 0.5 };

	function animate() {
		if (!img.complete) {
			animationId = requestAnimationFrame(animate);
			return;
		}

		ctx.clearRect(0, 0, width, height);

		// 1. Calculate Zoom and Focus based on mouse position
		let targetZoom = 1.0;
		let targetFocus = { x: 0.5, y: 0.5 };

		if (mouse.active) {
			const centerX = width / 2;
			const centerY = height / 2;
			const dx = mouse.x - centerX;
			const dy = mouse.y - centerY;
			const dist = Math.sqrt(dx * dx + dy * dy);
			const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

			// Keep the proximity zoom logic
			targetZoom = 1.0 + (1 - Math.min(1, dist / maxDist)) * 0.2;

			// Move focus towards the cursor
			targetFocus.x = mouse.x / width;
			targetFocus.y = mouse.y / height;
		}

		// Smooth transitions
		currentZoom += (targetZoom - currentZoom) * 0.1;
		currentFocus.x += (targetFocus.x - currentFocus.x) * 0.1;
		currentFocus.y += (targetFocus.y - currentFocus.y) * 0.1;

		// 2. Logic for "cover" behavior + Zoom Focus
		const imgRatio = img.width / img.height;
		const targetRatio = width / height;
		let sx, sy, sw, sh;

		if (imgRatio > targetRatio) {
			sh = img.height;
			sw = sh * targetRatio;
			sx = (img.width - sw) / 2;
			sy = 0;
		} else {
			sw = img.width;
			sh = sw / targetRatio;
			sx = 0;
			sy = (img.height - sh) / 2;
		}

		// Apply zoom and focus to source coordinates
		const swZ = sw / currentZoom;
		const shZ = sh / currentZoom;

		// Focus determines how the remaining space is distributed
		const sxZ = sx + (sw - swZ) * currentFocus.x;
		const syZ = sy + (sh - shZ) * currentFocus.y;

		const drawBase = (ox = 0, oy = 0) => {
			ctx.drawImage(img, sxZ, syZ, swZ, shZ, ox, oy, width, height);
		};

		// Base image
		ctx.globalAlpha = 1.0;
		drawBase();

		// Only glitch if the mouse is moving (intensity > threshold)
		if (mouse.active && glitchIntensity > 0.05) {
			const intensity = Math.min(1.0, glitchIntensity);

			// 1. RGB Split
			if (Math.random() < 0.6 * intensity) {
				ctx.save();
				ctx.globalCompositeOperation = 'screen';
				const offset = 15 * intensity;
				ctx.globalAlpha = 0.5 * intensity;
				drawBase((Math.random() - 0.5) * offset, (Math.random() - 0.5) * offset);
				ctx.restore();
			}

			// 2. Horizontal Slices
			const numSlices = Math.floor(20 * intensity);
			for (let i = 0; i < numSlices; i++) {
				if (Math.random() < 0.5 * intensity) {
					const sliceY = Math.random() * height;
					const sliceH = Math.random() * (50 * intensity) + 2;
					const sliceX = (Math.random() - 0.5) * (80 * intensity);

					// Calculate source slice coords using zoomed values
					const sSliceY = syZ + (sliceY / height) * shZ;
					const sSliceH = (sliceH / height) * shZ;

					ctx.drawImage(img, sxZ, sSliceY, swZ, sSliceH, sliceX, sliceY, width, sliceH);
				}
			}

			// 3. Noise Blocks
			if (Math.random() < 0.3 * intensity) {
				ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';
				ctx.fillRect(
					Math.random() * width,
					Math.random() * height,
					Math.random() * 200 * intensity,
					Math.random() * 40 * intensity
				);
			}

			// Quickly decay intensity so it stops when mouse stops
			glitchIntensity *= 0.9;
		} else {
			glitchIntensity = 0;
		}

		animationId = requestAnimationFrame(animate);
	}

	function onMouseMove(e) {
		const rect = node.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const dx = x - lastX;
		const dy = y - lastY;
		const dist = Math.sqrt(dx * dx + dy * dy);

		// Set glitch intensity based on movement speed
		glitchIntensity = Math.max(glitchIntensity, dist / 40);

		lastX = x;
		lastY = y;
		mouse.x = x;
		mouse.y = y;
	}

	window.addEventListener('resize', resize);
	node.addEventListener('mousemove', onMouseMove);
	node.addEventListener('mouseenter', () => (mouse.active = true));
	node.addEventListener('mouseleave', () => (mouse.active = false));

	resize();
	animate();

	return {
		destroy() {
			window.removeEventListener('resize', resize);
			cancelAnimationFrame(animationId);
		}
	};
}
