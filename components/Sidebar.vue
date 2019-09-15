<template>
  <div class="sidebar">
    <div v-if="user" class="sidebar-user">
      <p>user_image</p>
      <p>user_name</p>
    </div>
    <v-btn v-if="user === false" @click="handleSignin">Sign in</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: false // 本当はnullにする
    }
  },
  methods: {
    hadleSignin() {}
  }
}
</script>

<style scoped style="scss">
.sidebar {
  padding: 16px;
}

.sidebar-user {
  display: flex;
  font-size: 14px;
  font-weight: bold;
  align-items: center;
  justify-content: flex-start;
}
</style>
