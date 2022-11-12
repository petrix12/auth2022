import React, { useEffect, useState } from 'react';
import useTypedPage from '@/Hooks/useTypedPage';

// Para Login con Google
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

// Para Login con Facebook
import FacebookLogin from 'react-facebook-login';

export default function Welcome() {
    const page = useTypedPage();

    // Para Login con Google
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
        setUserGoogle(res.profileObj);
    }
    const onFailureGoogle = () => {
        console.log("Error en auth Google");
    }

    // Para Login con Facebook
    const facebookClientID = page.props.facebook_client_id;
    const [userFacebook, setUserFacebook] = useState({});

    const responseFacebook = (res?: any) => {
        console.log(res);
        console.log(`Nombre: ${res.name}`);
        console.log(`Correo: ${res.email}`);
        console.log(`Foto: ${res.picture.data.url}`);
        setUserFacebook(res);
    }

    const onClickFacebook = () => {
        alert('Evento onClickFacebook');
    }

    return (
        <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
            <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-center items-center pt-8 sm:justify-start sm:pt-0">
                    <h1 className="ml-4 text-xl leading-7 font-bold">Login con redes sociales</h1>
                </div>

                <div className="mt-8 bg-white dark:bg-gray-800 overflow-hidden shadow sm:rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Gooble Login */}
                        <div className="p-6">
                            <div className="flex items-center">
                                <div>
                                    <h2>Login con Google</h2>
                                    <GoogleLogin
                                        className="buttonSocialNetwork"
                                        clientId={googleClientID}
                                        buttonText="Iniciar con Google"
                                        onSuccess={onSuccessGoogle}         // En caso de login exitosos
                                        onFailure={onFailureGoogle}         // En caso de login fallido
                                        cookiePolicy={'single_host_origin'}
                                        autoLoad={false}
                                    />
                                    <div className={userGoogle.email? "profile":"hidden"}>
                                        {/* <img src={userGoogle.imageUrl} alt="Imagen del usuario de Google" /> */}
                                        <p>{userGoogle.name}</p>
                                        <p>{userGoogle.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Gooble Facebook */}
                        <div className="p-6">
                            <div className="flex items-center">
                                <div>
                                    <h2>Login con Facebook</h2>
                                    <FacebookLogin
                                        appId={facebookClientID}
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        /* onClick={onClickFacebook} */
                                        callback={responseFacebook}
                                        textButton=" Iniciar con Facebook"
                                        icon="fa-facebook"
                                        cssClass="buttonSocialNetwork"
                                    />
                                    <div className={userFacebook.email? "profile":"hidden"}>
                                        {/* <img src={userFacebook.picture} alt="Imagen del usuario de Facebook" /> */}
                                        <p>{userFacebook.name}</p>
                                        <p>{userFacebook.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center">
                                Login con Twitter
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex items-center">
                                Login con Instagram
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}
