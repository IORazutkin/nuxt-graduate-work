export const state = () => ({
  institutes: []
})

export const getters = {
  getList: (state) => {
    return state.institutes
  }
}

export const mutations = {
  getList (state, institutes) {
    state.institutes.splice(0, state.institutes.length, ...institutes)
  }
}

export const actions = {
  getList ({ state, commit }) {
    if (state.institutes.length > 0) {
      return Promise.resolve()
    }

    return this.$axios.$get('/api/institute').then((response) => {
      commit('getList', response)
    })
  }
}
