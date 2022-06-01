const footer = document.createElement('template');

footer.innerHTML = `
	<div class="footer">
		<div class="tshadow copyright">
			<p>© 2022 Jurta</p>
		</div>
		<div id="footer-content"></div>
	</div>
`;

document.getElementById("container").appendChild(footer.content);

function registerButton(link, tooltip, image) {
	const aTag = document.createElement('a');
	aTag.href = link;
	aTag.target = "_blank";
	aTag.rel = "noopener noreferrer";
	aTag.className = "nopointer";

	const buttonTag = document.createElement('div');
	buttonTag.className = "tbbutton hover-reveal";
	buttonTag.dataset.tooltip = tooltip;

	const imgTag = document.createElement('img');
	imgTag.src = image;

	buttonTag.appendChild(imgTag);
	aTag.appendChild(buttonTag);
	document.getElementById("footer-content").appendChild(aTag);
};

function registerSeperator() {
	const seperate = document.createElement('div');
	seperate.className = "tbseperate";

	document.getElementById("footer-content").appendChild(seperate);
}

// miscellaneous (mostly discord embed tricks)
registerButton("/pride.mpeg4", "HAPPY PRIDE MONTH 2022 >:D", "/resources/img/icons/pride_month_2022.svg");
registerButton("/autism.gif", "discord embed trick thing :)", "/resources/img/autism.gif");
registerSeperator();
// social media links
registerButton("https://youtube.com/Jurta", "YouTube", "/resources/img/socials/youtube.svg");
registerButton("https://twitter.com/Jurta_", "Twitter", "/resources/img/socials/twitter.svg");
registerButton("https://github.com/Jurtaa", "GitHub", "/resources/img/socials/github.svg");