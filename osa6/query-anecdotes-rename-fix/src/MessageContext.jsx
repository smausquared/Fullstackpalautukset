import { createContext, useReducer, useContext } from 'react'

const messageReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
        return action.payload
    default:
        return state
  }
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, 0)

  return (
    <MessageContext.Provider value={[message, messageDispatch] }>
      {props.children}
    </MessageContext.Provider>
  )
}

export const useMessageValue = () => {
  const MessageAndDispatch = useContext(MessageContext)
  return MessageAndDispatch[0]
}

export const useMessageDispatch = () => {
  const MessageAndDispatch = useContext(MessageContext)
  return MessageAndDispatch[1]
}

export default MessageContext