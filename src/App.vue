<template>
  <div id="app">
    <PostalCodeSearch />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PostalCodeSearch from './components/PostalCodeSearch.vue';

@Component({
  components: {
    PostalCodeSearch,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
