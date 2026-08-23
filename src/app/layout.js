import "./globals.css";
import TopBar from "./Components/TopBar";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// export const metadata = {
//   title: "Blindfold Villa — India's First Blindfold Reality Show",
//   description: "8 Strangers. Aankhein Band. Ek Villa. The Ultimate Test of Love.",
//   icons: {
//     icon: [
//       { url: "/favicon.ico", sizes: "48x48" },
//       { url: "/blinfoldlogochat.svg", type: "image/svg+xml" },
//       { url: "/favicon.png", type: "image/png" },
//     ],
//     shortcut: "/favicon.ico",
//     apple: "/favicon.png",
//   },
// };


export const metadata = {
  title: "Blindfold Villa — India's First Blindfold Reality Show",
  description: "8 Strangers. Aankhein Band. Ek Villa. The Ultimate Test of Love.",
  icons: {
    icon: "/images/blindnewlogo.png"
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <TopBar />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}