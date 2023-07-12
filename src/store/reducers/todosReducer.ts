import { GET_TODOS, TODO_ERROR } from "@/store/types";

const initialState = {
  todos: [],
  loading: true,
};

const todoReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload.todos,
        loading: false,
      };
    case TODO_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default todoReducer