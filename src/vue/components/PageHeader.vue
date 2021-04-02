<template>
  <header class="page-header">
    <logo/>
    <logo-secondary/>
  </header>
</template>

<style lang="scss">

</style>

<script lang="ts">
import {SetupContext} from "vue";
import LooseObject from "@/ts/lib/interfaces/LooseObject";
import Logo from "@/vue/components/Logo.vue";
import LogoSecondary from "@/vue/components/LogoSecondary.vue";

export default {
  name: "PageHeader",
  components: {
    Logo,
    LogoSecondary
  },
  props: {},
  setup: function (props: LooseObject, context: SetupContext): LooseObject {
    return {};
  }
};
</script>
