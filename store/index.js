import dayjs from 'dayjs'
import uuid from 'uuid/v4'

export const state = () => ({
  user: null,
  users: [],
  posts: [],
  isFetching: false
})

export const actions = {
  sendMessage({ commit, state }, { body }) {
    const id = `${3000000000 + dayjs().unix()}-${uuid().replace(/-g/, '')}`
    // const from = state.user.email
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
