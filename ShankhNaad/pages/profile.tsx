import Head from "next/head";
import Profile from "../components/Profile";
import PrivateRoute from '../PrivateRoute';

const ProfilePage = () => {

    return (
        <>
            <Head>
                <title>Dhol Baaje - Profile </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Profile />
        </>
    );
};

export default PrivateRoute(ProfilePage);