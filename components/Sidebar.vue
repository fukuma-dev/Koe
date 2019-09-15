<template>
  <div class="sidebar">
    <div v-if="user" class="sidebar-user">
      <img :src="user.photoURL" width="32" alt="" />
      {{ user.displayName }}
    </div>
    <v-btn v-if="user === false" @click="handleSignin">Sign in</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      isLoggedIn: false
    }
  },
  async mounted() {
    const user = await this.auth()
    this.$store.commit('setUser', { user })
    this.user = user
    if (this.user && !this.isLoggedIn) {
      this.isLoggedIn = true
      this.$firestore
        .collection('users')
        .doc(user.email.replace('@', '_at_').replace(/\./g, '_dot_'))
        .set({
          name: user.displayName,
          email: user.email,
          icon: user.photoURL
        })
    }
  },
  methods: {
    auth() {
      return new Promise((resolve, reject) => {
        this.$auth.onAuthStateChanged(user => {
          resolve(user || false)
        })
      })
    },
    handleSignin() {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$firebase.auth().signInWithRedirect(provider)
    }
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

img {
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
}
</style>
