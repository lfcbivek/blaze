// src/app/layout.tsx
import "./globals.scss";
import Loader from "@/components/Loader";

// app/layout.tsx
export const metadata = {
    title: 'My App',
    description: 'Start from scratch',
  };
  
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        
        <body>
          <Loader />
          {children}
        </body>
      </html>
    );
  }