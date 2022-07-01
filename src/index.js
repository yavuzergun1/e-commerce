import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./reset.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({ 
  defaultOptions:{
    queries:{
      refetchOnMount: false, /* başka bir sayfaya gidip tekrar geri geldiğimizde tekrar fetchlemez*/
      refetchOnWindowFocus: false, /* başka bir tab'e gidip geldiğinde tekrar fetchlemez */
    }
  }
});

root.render(
  <QueryClientProvider client={queryClient}> {/* REACT QUERY */}
    <ChakraProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ChakraProvider>
    <ReactQueryDevtools initialIsOpen={false} />  {/* REACT QUERY DEV TOOLS */}
  </QueryClientProvider> 
);

reportWebVitals();
