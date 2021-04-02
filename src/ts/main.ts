import "@/scss/index.scss";

import "core-js/stable"; // only stable feature also is possible with only `core-js`
import "regenerator-runtime/runtime"; // To ensure that regeneratorRuntime is defined globally
import {createApp} from "vue";
import App from "@/vue/App.vue";
import router from "@/ts/lib/router/router";

createApp(App)
	.use(router)
	.mount("#app");


// Set style variables
router.afterEach((to, from) => {
	let styleTag: HTMLElement | null = document.getElementById("style-tag");
	if (styleTag === null) {
		styleTag = document.createElement("style");
		styleTag.id = "style-tag";
		document.head.appendChild(styleTag);
	}
	styleTag.innerText = `:root {
      --color--background: var(--${to.meta.backgroundColor}) !important;
      --color--primary: var(--${to.meta.primaryColor}) !important;
      --color--text: var(--${to.meta.textColor}) !important;
      --position--header: ${to.meta.headerPosition} !important;
      --position--footer: ${to.meta.footerPosition} !important;
		};`;

	document.body.classList.add("loaded");
});


