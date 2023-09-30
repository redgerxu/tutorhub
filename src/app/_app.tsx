import React from "react";
import { AppProps } from "next/app";
import Layout from "@/app/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TutorHub",
  description: "A community powered eduction platform",
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
