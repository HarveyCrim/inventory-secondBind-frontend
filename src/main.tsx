import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './redux/store.tsx'
const client = new QueryClient({
  defaultOptions : {
    queries : {
      refetchOnWindowFocus : false
    }
  }
})
createRoot(document.getElementById('root')!).render(
  <Provider store = {store}>
    <QueryClientProvider client={client}>
      <App />
    </QueryClientProvider>
  </Provider> 
)
