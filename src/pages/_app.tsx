import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import SSRProvider from "react-bootstrap/SSRProvider";
import { Store } from "@/reduxStore/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={Store}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </Provider>
  );
}
