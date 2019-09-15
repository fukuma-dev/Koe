import dayjs from 'dayjs'
import uuid from 'uuid/v4'

export const state = () => ({
  posts: [],
  isFetching: false
})

export const getters = {
  posts: state => state.posts,
  isFetching: state => state.isFetching
}

export const mutations = {
  setPosts(state, { posts }) {
    state.posts = [...posts]
  }
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const posts = []
    const [postsSnapshot] = await Promise.all([
      this.$firestore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(20)
        .get()
    ])
    postsSnapshot.forEach(postSnapshot => {
      const post = postSnapshot.data()
      posts.unshift(post)
    })
    commit('setPosts', { posts })
  },
  sendMessage({ commit, state }, { body }) {
    const id = `${3000000000 + dayjs().unix()}-${uuid().replace(/-g/, '')}`
    const from = 'fukuma'
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
