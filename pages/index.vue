<template>
  <div>
    <div class="side-area">
      <p>side-area</p>
      <Sidebar />
    </div>
    <div class="post-area">
      <p>post-area</p>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
export default {
  components: { Sidebar }
}
</script>
