<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  private mounted() {
    (document.getElementById('app') as HTMLElement).style.display = 'block';
    (document.getElementById('appLoading') as HTMLElement).style.display = 'none';
  }
}
</script>


<template>
  <div id="app">
    <router-view />
  </div>
</template>


<style lang="stylus">

</style>
