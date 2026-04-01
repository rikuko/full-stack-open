import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import store from './store'

console.log('Storen tila: ', store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = { store }>
    <App />
  </Provider>
)