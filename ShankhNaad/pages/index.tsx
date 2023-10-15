import Head from "next/head";
import Dashboard from "../components/Dashboard";
import { LiveUser } from "../atoms/playerAtom";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";

export default function Home() {

  return (
    <>
      <Head>
        <title>Dhol Baaje Index</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard />
    </>
  );
}
