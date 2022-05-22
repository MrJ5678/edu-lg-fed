<template>
  <div class="menu-create">
    <create-or-edit :isEdit="true"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from '@/views/menu/components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    CreateOrEdit
  },
  data() {
    return {}
  },
  methods: {}
})
</script>

<style scoped></style>
