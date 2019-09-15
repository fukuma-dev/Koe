<template>
  <div class="container">
    <div class="side-area">
      <p>side-area</p>
      <Sidebar />
    </div>
    <div class="post-area">
      <p>post-area</p>
      <Content />
      <Form />
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue'
import Form from '~/components/Form.vue'
import Content from '~/components/Content.vue'

export default {
  components: { Sidebar, Content, Form }
}
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
}

.side-area {
  width: 300px;
  position: sticky;
  top: 0;
}

.post-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-left: solid 1px rgba(255, 255, 255, 0.1);
  padding: 16px 16px 0;
}
</style>
