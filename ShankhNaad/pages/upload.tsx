import Head from "next/head";
import UploadForm from "../components/UploadForm";
import PrivateRoute from '../PrivateRoute';

const TrackForm = () => {

    return (
        <>
            <Head>
                <title>Dhol Baaje - Upload </title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <UploadForm />
        </>
    );
};

export default PrivateRoute(TrackForm);
