export const state = () => ({
  courses: []
})

export const getters = {
  getList: (state) => {
    return state.courses
  }
}

export const mutations = {
  getList (state, courses) {
    state.courses.splice(0, state.courses.length, ...courses)
  }
}

export const actions = {
  getList ({ commit }, institute) {
    return this.$axios.$post('/api/course', institute).then((response) => {
      commit('getList', response)
    })
  }
}
