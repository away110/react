import { createStore } from 'redux'

import reducer from './reducer'

import { persistReducer,persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'

//持久化reducer
var persistedReducer = persistReducer( { key:'redux',storage }, reducer )

//实例化仓库
var store = createStore(persistedReducer)

//持久化store
var persistor = persistStore( store )

export default store;
export { persistor }