import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";
import Home from "@/vue/views/Home.vue";
import Contact from "@/vue/views/Contact.vue";
import Projects from "@/vue/views/Projects.vue";
import MSTRBLSTR from "@/vue/views/projects/MSTRBLSTR.vue";
import LifeSimulator from "@/vue/views/projects/LifeSimulator.vue";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			backgroundColor: "off-white",
			textColor: "grey",
			primaryColor: "green",
			headerPosition: "relative",
			footerPosition: "relative"
		}
	},
	{
		path: "/contact",
		name: "Contact",
		component: Contact,
		meta: {
			backgroundColor: "off-white",
			textColor: "grey",
			primaryColor: "green",
			headerPosition: "relative",
			footerPosition: "relative"
		}
	},
	{
		path: "/projects",
		name: "Projects",
		component: Projects,
		children: [
			{
				path: "",
				redirect: "/"
			},
			{
				path: "mstrblstr",
				name: "MSTRBLSTR",
				component: MSTRBLSTR,
				meta: {
					backgroundColor: "grey",
					textColor: "off-white",
					primaryColor: "pink",
					headerPosition: "fixed",
					footerPosition: "fixed"
				}
			},
			{
				path: "life-simulator",
				name: "LifeSimulator",
				component: LifeSimulator,
				meta: {
					backgroundColor: "yellow",
					textColor: "grey",
					primaryColor: "off-white",
					headerPosition: "fixed",
					footerPosition: "fixed"
				}
			}
		]
	}
];

const router: Router = createRouter({
	history: createWebHistory(),
	routes
});

export default router;
