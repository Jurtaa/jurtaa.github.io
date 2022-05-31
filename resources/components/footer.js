const footer = document.createElement('template');

footer.innerHTML = `
	<div class="footer">
		<div class="tshadow copyright">
			<p>© 2022 Jurta</p>
		</div>
		<div class="footer-content">
			<a href="/autism.gif" target="_blank" rel="noopener noreferrer" class="nopointer">
				<div class="tbbutton hover-reveal" data-tooltip="discord gif trick thing :)">
					<img src="resources/img/autism.gif"></img>
				</div>
			</a>
			<div class="tbseperate"></div>
			<a href="https://youtube.com/Jurta" target="_blank" rel="noopener noreferrer" class="nopointer">
				<div class="tbbutton hover-reveal" data-tooltip="YouTube">
					<img src="resources/img/socials/youtube.svg"></img>
				</div>
			</a>
			<a href="https://twitter.com/Jurta_" target="_blank" rel="noopener noreferrer" class="nopointer">
				<div class="tbbutton hover-reveal" data-tooltip="Twitter">
					<img src="resources/img/socials/twitter.svg"></img>
				</div>
			</a>
			<a href="https://github.com/Jurtaa" target="_blank" rel="noopener noreferrer" class="nopointer">
				<div class="tbbutton hover-reveal" data-tooltip="GitHub">
					<img src="resources/img/socials/github.svg"></img>
				</div>
			</a>
		</div>
	</div>
`;

document.getElementById("container").appendChild(footer.content);