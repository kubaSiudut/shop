import { wrapper } from '../store/store'
import { store } from '../store/store'
import { Provider } from 'react-redux'

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  )
}

export default App