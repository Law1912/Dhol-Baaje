import Head from "next/head";
import Subscription from "../components/Subscription";

export default function SubscriptionPage() {

    return (
        <>
            <Head>
                <title>Dhol Baaje - Subscribe </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Subscription />
        </>
    );
};