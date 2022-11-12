import React, { useEffect, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';

// Inicio Google Login
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
// Fin Google Login

export default function Welcome() {
    const page = useTypedPage();

    // Inicio Google Login
    const googleClientID = page.props.google_client_id;
    const [userGoogle, setUserGoogle] = useState({});

    useEffect(() => {
        const start = () => {
            gapi.auth2.init({
                clientId: googleClientID
            })
        }
        gapi.load("client:auth2", start)
    }, [])

    const onSuccessGoogle = (res?: any) => {
        console.log(res);
        setUserGoogle(res.profileObj)
    }
    const onFailureGoogle = () => {
        console.log("Error en auth Google");
    }
    // Fin Google Login

    return (
        <div className="relative flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
            {/* Gooble Login */}
            <div>
                <h1>Login Google</h1>
                <GoogleLogin
                    clientId={googleClientID}
                    buttonText="Login"
                    onSuccess={onSuccessGoogle}         // En caso de login exitosos
                    onFailure={onFailureGoogle}         // En caso de login fallido
                    cookiePolicy={'single_host_origin'}

                    autoLoad={false}
                />
                <div className={userGoogle.email? "profile":"hidden"}>
                    <img src={userGoogle.imageUrl} alt="Imagen del usuario de Google" />
                    <p>{userGoogle.name}</p>
                    <p>{userGoogle.email}</p>
                </div>
            </div>
            {/* Facebook Login */}
        </div>
    );
}
