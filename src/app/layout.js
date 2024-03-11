import { ChatProvider } from '../Context/ChatProvider'

export default function RootLayout({
  children,
}) {
  return (
    <html lang='en'>
      <body>
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  )
}