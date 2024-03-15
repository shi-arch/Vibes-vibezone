import { ChatProvider } from "../Context/ChatProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: "0px" }}>
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}
