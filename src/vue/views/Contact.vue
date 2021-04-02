<template>
  <main id="contact">
    Contact Page
  </main>
</template>

<script lang="ts">
import {SetupContext} from "vue";
import LooseObject from "@/ts/lib/interfaces/LooseObject";
import {Router, useRouter} from "vue-router";

export default {
  props: {},
  setup: function (props: LooseObject, context: SetupContext): LooseObject {
    const router: Router = useRouter();

    return {};
  }
};

</script>
