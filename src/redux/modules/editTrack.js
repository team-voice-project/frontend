import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

const GET_USER = 'GET_USER'

const initialState = {
  category: [],
  tags: [],
  title: '',
  script: '',
  voice_file: null,
  voice_url: '',
  cover_file: null,
  cover_url: ''
}

const getUser = createAction(GET_USER, () => ({}))

// reducer
export default handleActions({
  [GET_USER]: (state, action) => produce(state, (draft) => {
    console.log('[SET_USER]')
  }),


}, initialState)

const actionCreators = {
  getUser
}

export { actionCreators }