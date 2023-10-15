import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Layout from "../components/Layout";
import { TrackProvider } from "../hooks/trackContext";
import { ApolloProvider } from '@apollo/client';
import client from '../apollo/client';
import { MeshProvider } from "@meshsdk/react"


export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {

  return (    
    <MeshProvider>
      <ApolloProvider client={client}>
          <RecoilRoot>
            <TrackProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </TrackProvider>
          </RecoilRoot>
      </ApolloProvider>
    </MeshProvider>
  );
}
