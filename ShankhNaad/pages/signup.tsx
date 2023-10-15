import Head from "next/head";
import SignUp from "../components/SignUp";

export default function LoginPage() {

    return (
        <>
            <Head>
                <title>Dhol Baaje - Sign Up </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignUp />
        </>
    );
};