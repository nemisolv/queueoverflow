import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/stores/slices/authSlice';
import userReducer from '@/stores/slices/userSlice';
import questionReducer from '@/stores/slices/questionSlice';
import tagReducer from '@/stores/slices/tagSlice';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    question: questionReducer,
    tag: tagReducer
  },
  middleware: (gDM) => gDM({
    serializableCheck: false
  }).concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch