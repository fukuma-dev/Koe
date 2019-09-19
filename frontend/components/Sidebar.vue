<template>
  <div
    :class="{
      'sidebar-sp': breakpoint.xsOnly,
      'sidebar-pc': !breakpoint.xsOnly
    }"
  >
    <h1 class="display-2 font-weight-light my-3">Koe</h1>
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
      isLoggedIn: false,
      isHydrated: false
    }
  },
  computed: {
    breakpoint() {
      return this.isHydrated ? this.$vuetify.breakpoint : {}
    }
  },
  async mounted() {
    this.isHydrated = true
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
.title {
  padding: 30px;
}

.sidebar-pc {
  padding: 16px;
}

.sidebar-sp {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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
