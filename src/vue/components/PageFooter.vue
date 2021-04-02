<template>
  <footer class="page-footer">
    <p>© Killian Louis Grant |
      <a href="mailto:killian@killiangrant.com"
         target="_blank">killian@killiangrant.com
      </a>
    </p>
  </footer>
</template>

<style lang="scss">

</style>

<script lang="ts">
import {SetupContext} from "vue";
import LooseObject from "@/ts/lib/interfaces/LooseObject";

export default {
  name: "PageHeader",
  components: {},
  props: {},
  setup: function (props: LooseObject, context: SetupContext): LooseObject {

    return {};
  }
};
</script>
