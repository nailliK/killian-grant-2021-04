<template>
  <div class="app">
    <page-header/>
    <router-view/>
    <page-footer/>
  </div>
</template>

<script lang="ts">
import PageHeader from "@/vue/components/PageHeader.vue";
import PageFooter from "@/vue/components/PageFooter.vue";
import LooseObject from "@/ts/lib/interfaces/LooseObject";
import {computed, ComputedRef, onMounted, SetupContext} from "vue";
import {RouteLocationNormalized, Router, useRoute, useRouter} from "vue-router";

export default {
  name: "App",
  components: {
    PageHeader,
    PageFooter
  },
  setup: function (props: LooseObject, context: SetupContext): LooseObject {
    const router: Router = useRouter();
    const route: RouteLocationNormalized = useRoute();
    const meta: ComputedRef = computed(() => route.meta);

    onMounted(() => {
    });

    return {
      meta
    };
  }
};
</script>

<style lang="scss"></style>
