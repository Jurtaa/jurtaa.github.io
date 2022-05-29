const footer = document.createElement('template');

footer.innerHTML = `
	<div class="footer">
		<div class="footer-content">
			<div class="textdrop">
				<div style="float: left;">
					<p>© Jurta 2022-2022</p>
				</div>
				<div style="float: right;">
					<p>
						<a href="https://youtube.com/Jurta">youtube</a>
						<a href="https://twitter.com/Jurta_">twitter</a>
						<a href="https://github.com/Jurtaa">github</a>
					</p>
				</div>
			</div>
		</div>
	</div>
`;

document.getElementById("container").appendChild(footer.content);