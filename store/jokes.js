const getIndex = (arr, itemToFind) => {
  return arr.findIndex((item) => item.id === itemToFind.id)
}

export const state = () => ({
  list: [],
  isLoading: false,
  current: {},
})

export const getters = {
  saved: (state) => {
    return state.list.filter((item) => item.isSaved)
  },
  isCurrentSaved: (state) => {
    return state.list.find((item) => item.id === state.current.id).isSaved
  },
}

export const actions = {
  async load({ commit, state }) {
    if (!localStorage.jokeIDs) return
    const jokeIDs = JSON.parse(localStorage.jokeIDs)

    const promises = []
    let res

    for (const i in jokeIDs) {
      promises.push(
        this.$axios.$get(
          `https://sv443.net/jokeapi/v2/joke/Any?idRange=${jokeIDs[i]}`
        )
      )
    }

    try {
      res = await Promise.all(promises)

      for (const i in res) {
        commit('loadSaved', res[i])
      }
    } catch (e) {
      console.error(e)
    }
  },
  async request({ commit, state }) {
    if (state.isLoading) return
    commit('setLoading', true)

    let data

    try {
      data = await this.$axios.$get('https://sv443.net/jokeapi/v2/joke/Any')

      commit('setCurrent', data)
    } catch (e) {
      console.error(e)
    }

    commit('setLoading', false)
  },
}

export const mutations = {
  loadSaved(state, data) {
    const item = data
    item.isSaved = true
    state.list.splice(0, 0, item)
  },
  addToSaved(state, data) {
    const i = getIndex(state.list, data)
    if (i === -1) return

    const item = state.list[i]
    item.isSaved = true
    state.list.splice(i, 1, item)
  },
  removeFromSaved(state, data) {
    const i = getIndex(state.list, data)
    if (i === -1) return
    const item = state.list[i]
    item.isSaved = false
    state.list.splice(i, 1, item)
  },
  setLoading(state, status) {
    state.isLoading = status
  },
  setCurrent(state, data) {
    state.list.push(data)
    state.current = data
  },
}
