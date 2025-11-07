"use client"

export default function AtProperties() {
	return (
		<style jsx global>
			{`
				.starting-hidden {
					@starting-style {
						opacity: 0;
						visibility: hidden;
					}
				}
				.starting-x-full {
					@starting-style {
						translate: 100%;
					}
				}
				.-starting-x-full {
					@starting-style {
						translate: -100%;
					}
				}
				@keyframes nextToCurrent {
					from {
						translate: 100%;
						opacity: 0;
						display: none;
						visibility: hidden;
					}
					to {
						translate: 0%;
						opacity: 1;
						display: block;
						visibility: visible;
					}
				}
				@keyframes previousToCurrent {
					from {
						translate: -100%;
						opacity: 0;
						display: none;
						visibility: hidden;
					}
					to {
						translate: 0%;
						opacity: 1;
						display: block;
						visibility: visible;
					}
				}
				@keyframes currentToNext {
					from {
						translate: 0%;
						opacity: 1;
						display: block;
						visibility: visible;
					}
					to {
						translate: 100%;
						opacity: 0;
						display: none;
						visibility: hidden;
					}
				}
				@keyframes currentToPrevious {
					from {
						translate: 0%;
						opacity: 1;
						display: block;
						visibility: visible;
					}
					to {
						translate: -100%;
						opacity: 0;
						display: none;
						visibility: hidden;
					}
				}
			`}
		</style>
	)
}
