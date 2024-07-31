import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { MessageContextProvider } from './MessageContext'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <MessageContextProvider>
  <QueryClientProvider client={queryClient}>
  <App />
  </QueryClientProvider>
  </MessageContextProvider>
)