import cloneDeep from 'lodash.clonedeep'
import dayjs from 'dayjs'
import uuid from 'uuid/v4'

export const state = () => ({
  user: null,
  users: [],
  posts: [],
  isFetching: false
})

export const getters = {
  user: state => state.user,
  posts: state => state.posts,
  isFetching: state => state.isFetching
}

export const mutations = {
  setUser(state, { user }) {
    state.user = cloneDeep(user)
  },
  setUsers(state, { users }) {
    state.users = users
  },
  setPosts(state, { posts }) {
    state.posts = [...posts]
  },
  addPost(state, { post }) {
    if (state.posts.find(p => p.id === post.id)) {
      return
    }
    post.user = state.users.find(user => user.email === post.from)
    state.posts = [...state.posts, post]
  }
}

export const actions = {
  async nuxtClientInit({ commit }) {
    const posts = []
    const users = []
    const [usersSnapshot, postsSnapshot] = await Promise.all([
      this.$firestore.collection('users').get(),
      this.$firestore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get()
    ])
    usersSnapshot.forEach(user => {
      users.push(user.data())
    })
    postsSnapshot.forEach(postSnapshot => {
      const post = postSnapshot.data()
      post.user = users.find(user => user.email === post.from)
      posts.unshift(post)
    })
    commit('setUsers', { users })
    commit('setPosts', { posts })
  },
  sendMessage({ commit, state }, { body }) {
    const id = `${3000000000 + dayjs().unix()}-${uuid().replace(/-g/, '')}`
    const from = state.user.email
    const createdAt = 3000000000 + dayjs().unix()
    this.$firestore
      .collection('posts')
      .doc(`${id}`)
      .set({
        id,
        from,
        body,
        createdAt
      })
  }
}
