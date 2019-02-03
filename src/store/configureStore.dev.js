import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers'
import logMiddleware from '../middleware/log';
import userMiddleware from '../middleware/user';
import loginMiddleware from '../middleware/login';
import localStorageMiddleware from '../middleware/system-local-storage'



const configureStore = preloadedState => {

  const store = createStore(rootReducer, applyMiddleware(
                                          logMiddleware, 
                                          userMiddleware, 
                                          loginMiddleware, 
                                          localStorageMiddleware));

  // const store = createStore(
  //   rootReducer,
  //   preloadedState,
  //   compose(
  //     applyMiddleware(thunk, api, createLogger()),
  //     DevTools.instrument()
  //   )
  // )

  if (module.hot) {

    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store;
}

export default configureStore
