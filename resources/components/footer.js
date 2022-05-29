const footer = document.createElement('template');

footer.innerHTML = `
	<div class="footer">
		<div class="tshadow copyright">
			<p>© Jurta 2022</p>
		</div>
		<div class="footer-content">
			<a href="https://youtube.com/Jurta" target="_blank" rel="noopener noreferrer">
				<div class="social-button">
					<img src="resources/img/socials/youtube.svg"></img>
				</div>
			</a>
			<a href="https://twitter.com/Jurta_" target="_blank" rel="noopener noreferrer">
				<div class="social-button">
					<img src="resources/img/socials/twitter.svg"></img>
				</div>
			</a>
			<a href="https://github.com/Jurtaa" target="_blank" rel="noopener noreferrer">
				<div class="social-button">
					<img src="resources/img/socials/github.svg"></img>
				</div>
			</a>
		</div>
	</div>
`;

document.getElementById("container").appendChild(footer.content);