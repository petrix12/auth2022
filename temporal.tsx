<div className="relative flex justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
    <h1>Login con redes sociales</h1>
    {/* Gooble Login */}
    <div className='contanier'>
        <h2>Login Google</h2>
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
</div>
