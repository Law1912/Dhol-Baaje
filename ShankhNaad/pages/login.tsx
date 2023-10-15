import Head from "next/head";
import Login from "../components/Login";
import React, { useState, useEffect } from 'react';
import CloudComponent from '../components/CloudComponent';  // Replace with the correct path

export default function LoginPage() {

    const [dashboardLoaded, setDashboardLoaded] = useState(false);
    useEffect(() => {
        const handleGlobalClick = () => {
            // Load the dashboard when any click occurs on the screen
            setDashboardLoaded(true);
        };

        // Attach the click event listener to the document
        document.addEventListener('click', handleGlobalClick);

        return () => {
            // Clean up the event listener when the component is unmounted
            document.removeEventListener('click', handleGlobalClick);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Dhol Baaje - Login </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {dashboardLoaded ? (
                <Login />
            ) : (
                <CloudComponent />
            )}
        </>
    );
};