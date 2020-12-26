export const state = () => ({
  groups: []
})

export const getters = {
  getList: (state) => {
    return state.groups
  }
}

export const mutations = {
  getList (state, groups) {
    state.groups.splice(0, state.groups.length, ...groups)
  }
}

export const actions = {
  getList ({ commit }, course) {
    return this.$axios.$post('/api/group', course).then((response) => {
      commit('getList', response)
    })
  }
}
