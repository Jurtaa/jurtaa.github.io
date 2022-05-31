/* inserts div into html */
const tooltipDiv = document.createElement('template');

tooltipDiv.innerHTML = `<div class="tooltip"></div>`;
document.getElementById("container").appendChild(tooltipDiv.content);

/* actually makes the tooltip work */
let setupTooltip = function() {
	let tooltip = "",
		tooltipDiv = document.querySelector(".tooltip"),
		tooltipElements = Array.from(document.
			querySelectorAll(".hover-reveal")),
		timer;
	
	let positionTooltip = function(e) {
		var x = e.pageX,
			y = e.pageY,
			width = tooltipDiv.clientWidth,
			height = tooltipDiv.clientHeight;
		
		x = Math.max(0, Math.min(x - Math.floor(width / 2), x));
		y = Math.max(0, Math.min(y - Math.floor(height) - 8, y));
		
		tooltipDiv.style.left = x + "px";
		tooltipDiv.style.top = y + "px";
	}
	
	let setTooltip = function() {
		tooltip = this.dataset.tooltip;
		tooltipDiv.innerHTML = tooltip;
	};

	let fadeIn = function(element) {
		let op = 0;
		element.style.visibility = 'visible';
		let timer = setInterval(function() {
			op += 0.1;
			element.style.opacity = op;
			if (op >= 1) {
				clearInterval(timer);
				element.style.opacity = 1;
				return;
			};
		}, 10);
	};

	let fadeOut = function(element) {
		let op = element.style.opacity;
		if (!timer) {
			timer = setInterval(function() {
				op -= 0.1;
				element.style.opacity = op;
				if (op <= 0) {
					clearInterval(timer);
					timer = null;
					element.style.opacity = 0;
					element.style.visibility = 'hidden';
					return;
				};
			}, 10);
		};
	};

	let bindEvents = function(elem) {
		let timeout;
		elem.addEventListener("mouseenter", function(e) {
			//let that = this;
			timeout = setTimeout(function() {
				setTooltip.call(elem, e);
				fadeIn(tooltipDiv, e);
			}, 400);
		});
		elem.addEventListener("mouseleave", function() {
			clearTimeout(timeout);
			fadeOut(tooltipDiv);
		});
		elem.addEventListener("mousemove", positionTooltip);
	}

	tooltipElements.forEach(bindEvents);
};

setupTooltip();