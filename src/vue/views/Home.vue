<template>
  <main id="home"
        class="main">
    <div class="main__content">
      <h1>Killian Louis Grant</h1>

      <section>
        <h3>Who I am</h3>
        <ul>
          <li>Husband and father</li>
          <li>Based out of Denver, Colorado, USA</li>
          <li>Loves
            <span class="emoji">{{ emoji }}</span>
          </li>
        </ul>
      </section>

      <section>
        <h3>What I do</h3>
        <ul>
          <Li>UX Design</Li>
          <li>Full-Stack JS/TS and PHP</li>
          <li>Engineering Management</li>
          <li>Currently working for
            <a href="https://www.intelivideo.com"
               target="_blank">Intelivideo
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h3>Things I made</h3>
        <ul class="cards">
          <li class="card">
            <icon icon="mstrblstr"></icon>

            <h4>MSTRBLSTR</h4>

            <p>This project pairs weird or funny stock video footage with an
               accompanying soundtrack. Video is provided by the Pexels API.
               Audio is provided by the SoundCloud API.
            </p>

            <router-link to="/projects/mstrblstr">View Project</router-link>
          </li>
          <li class="card">
            <icon icon="life-simulator"></icon>

            <h4>Life Simulator</h4>

            <p>The rules for
              <a href="https://wikipedia.org/wiki/Conway%27s_Game_of_Life">
                Conway's Game of Life
              </a>
               are simple; the chaos and fluid movement are beautiful to watch.
               This project allows a user to visualize and restart the
               simulation.
            </p>

            <router-link to="/projects/life-simulator">View Project
            </router-link>
          </li>
        </ul>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import {ref, Ref, SetupContext} from "vue";
import LooseObject from "@/ts/lib/interfaces/LooseObject";
import {Router, useRouter} from "vue-router";
import Icon from "@/vue/components/Icon.vue";

export default {
  props: {},
  components: {
    Icon
  },
  setup: function (props: LooseObject, context: SetupContext): LooseObject {
    const router: Router = useRouter();
    const emoji: Ref = ref("");

    const emojis: Array<string> = [
      "🎹",
      "🍕",
      "🤖",
      "🍣",
      "🐶",
      "🌭",
      "🕹",
      "🏍",
      "🌮",
      "🦕"
    ];

    emoji.value = emojis[Math.floor(Math.random() * emojis.length)];

    return {
      emoji
    };
  }
};

</script>
