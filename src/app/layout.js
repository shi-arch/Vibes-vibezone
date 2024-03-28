import { ChatProvider } from "../Context/ChatProvider";

import { Providers } from "../Context/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: "0px", height: "100vh" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
