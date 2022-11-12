# Pruebas de autenticación con redes sociales

<span>
    <p align="center">
        <a href="https://laravel.com" target="_blank">
            <img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo">
        </a>
    </p>
    <p align="center">
        <a href="https://travis-ci.org/laravel/framework"><img src="https://travis-ci.org/laravel/framework.svg" alt="Build Status"></a>
        <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
        <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
        <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
    </p>
</span>


## Cración de repositorio en GitHub
1. Crear proyecto en la página de [GitHub](https://github.com) con el nombre: **auth2022**.
    + **Description**: Pruebas de autenticación con redes sociales con React.js.
    + **Public**.
2. En la ubicación raíz del proyecto en la terminal de la máquina local:
    + $ git init
    + $ git add .
    + $ git commit -m "Antes de iniciar"
    + $ git branch -M main
    + $ git remote add origin https://github.com/petrix12/auth2022.git
    + $ git push -u origin main


## Creación proyecto Laravel - Inertia - Voyager
1. Crear proyecto:
    + $ laravel new auth2022 --jet
    + Seleccionar: [1] inertia
    + Will your application use teams? (yes/no) [no]: no
2. Crear base de datos local **auth2022** en MySQL (Juego de carácteres: utf8_general_ci)
3. Cambiar Vue.js por React.js:
    + $ npx laravel-jetstream-react@latest install
    + **[Laravel Jetstream React CLI](https://github.com/ozziexsh/laravel-jetstream-react/tree/2e6a0a2793e9aa15bf763a6068c828c10d56f7f0)**
    + **[Página oficial de Inertia](https://inertiajs.com)**
4. Modificar provider **app\Providers\AppServiceProvider.php**:
    ```php{2,9}
    // ...
    use Illuminate\Support\Facades\Schema;

    class AppServiceProvider extends ServiceProvider
    {
        // ...
        public function boot()
        {
            Schema::defaultStringLength(191);
            // ...
        }
    }
    ```
5. Modificar configuración de base de datos en **config\database.php**:
    ```php{4,5,7}
    // ...
    'mysql' => [
        // ...
        'charset' => 'utf8',
        'collation' => 'utf8_general_ci',
        // ...
    ],
    // ...
    ```
6. Modificar **.env**:
    ```env
    # ...
    APP_URL=http://localhost:8032
    ```
7. Generar tablas en base de datos:
    + $ php artisan migrate
8. Para levantar la aplicación, ejecutar en terminales a parte:
    + $ npm run dev
    + $  php artisan serve --port=8032
9. Para generar el directorio **public\build**, ejecutar:
    + $ npm run bulid
10. Quitar de **.gitignore** la carpeta **/public/build**.




<!-- 11. Modificar el **Vite manifest** (public\build\manifest.json):
    + Reemplazar **resources/js/app.js** por **resources/js/app.tsx**
    + Reemplazar **.vue** por **.tsx**
    + Reemplazar **-vue_** por **-react_**
 -->



## Obtener ID de cliente de Google
1. Ir a la consola de [Google Cloud](https://console.cloud.google.com/projectselector2/apis/dashboard?pli=1&supportedpurview=project)
2. Crear proyecto.
3. Ir a **Pantalla de consentimiento de OAuth** y seleccionar **Externos**.
4. Clic en Crear.
5. Completar formulario:
    + Información de la aplicación:
        + Nombre: Aplicación Sefar
        + Correo: pedro.bazo@sefarvzla.com
        + Logotipo: campo opcional
    + Información de contacto del desarrollador:
        + Correos: pedro.bazo@sefarvzla.com
6. Clic en Guardar y continuar.
7. En la sección de Permisos dar clic en Guardar y continuar.
8. En la sección de Usuarios de prueba dar clic en Guardar y continuar.
9. En la sección de Resumen dar clic en Volver al panel.
10. Ir a **Credenciales** y clic en **CREAR CREDENCIALES** y seleccionar **ID de clientes OAuth**.
11. Completar formulario:
    + Tipo de aplicación: Aplicación web
    + Nombre: Aplicación web Sefar
    + Orígenes autorizados de JavaScript
        + Agrar URI:
            + http://localhost
            + http://localhost:8032
    + Clic en Crear
12. Respaldar credenciales: ID Cliente y Secret ID.
13. Modificar **.env**:
    ```env
    # ...
    GOOBLE_CLIENT_ID=(ID Cliente)
    GOOBLE_SECRET_ID=(Secret ID)
    ```


## Obtener ID de cliente de Facebook


## Obtener ID de cliente de Twitter
## Obtener ID de cliente de Instagram


## Obtener datos de redes sociales para login
+ **Referencias**:
    + https://www.youtube.com/watch?v=n31zT7DAsaM
    + https://github.com/spartacus20/google-autentication-react
1. Instalar dependencias:
    + $ npm install gapi-script (Para conectarse con las API's de Google)
    + $ npm install react-google-login --force
2. Modificar el archivo de configuración **config\services.php**:
    ```php
    //...
    return [
        // ...
        'google_client_id' => env('GOOBLE_CLIENT_ID'),
        'facebook_client_id' => env('FACEBOOK_CLIENT_ID')
    ];
    ```
3. Modificar el provider **app\Providers\AppServiceProvider.php**:
    ```php
    // ...
    class AppServiceProvider extends ServiceProvider
    {
        // ...
        use Inertia\Inertia;
        // ...
        public function register()
        {
            Inertia::share('google_client_id', config('services.google_client_id'));
            Inertia::share('facebook_client_id', config('services.facebook_client_id'));
        }
        // ...
    }
    ```
4. Modificar vista **resources\js\Pages\Welcome.tsx**:
    ```tsx
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
                    />
                    <div className={userGoogle.email? "profile":"hidden"}>
                        <img src={userGoogle.imageUrl} alt="Imagen del usuario de Google" />
                        <p>{userGoogle.name}</p>
                        <p>{userGoogle.email}</p>
                    </div>
                </div>
            </div>
        );
    }
    ```


## Deploy en cPanel corporacioncabv
::: tip Documentación
+ **[Clonado y deploy desde repositorio remoto privado](https://docs.hostsuar.com/guias/hosting/entorno/git-deploy-clonado-desde-repositorio-remoto-privado-github)**
<p></p>
:::

1. Subir proyecto a GitHub:
    + $ git add .
    + $ git commit -am "Creación proyecto Laravel - Jetstream - Voyager"
    + $ git push
2. Ingresar al **cPanel corporacioncabv**.
3. Crear sub dominio para pruebas:
    + Ir **Domains / Domains**.
    + Clic en **Create A New Domain**.
        + Domain: test.corporacioncabv.com
        + Document Root (File System Location): public_html/test.corporacioncabv.com/public
    + Borrar en hosting: public_html/test.corporacioncabv.com
        + **Nota**: esta acción es necesario para luego poder clonar el repositorio.
4. Generar acceso SSH:
    + Ir **Security / Access SSH**.
    + Clic en **Manage SSH Keys**.
    + Clic en **Generate a New Key**:
        + Key Name (This value defaults to “id_rsa”.): id_rsa
        + Ingresar password, dejar el resto como esta y presionar **Generate Key**.
5. Obtener **Public Key**:
    + Ir **Security / Access SSH**.
    + Clic en **Manage SSH Keys**.
    + En **Public Keys** presionar en **Manage**.
    + Clic en **Authorize**.
    + Clic en **Go back**.
    + En **Public Keys** presionar en **View/Download**.
    + Copiar en un lugar seguro el valor de **Public SSH Key “id_rsa” Open Key**.
6. Dar permiso desde GitHub:
    + Ir a **GitHub / Settings / SSH and GPG keys** (https://github.com/settings/keys).
    + Clic en **New SSH key**:
        + Title: key-corporacioncabv
        + Key: el valor obtenido en **Public SSH Key “id_rsa” Open Key** del paso anterior.
        + Clic en **Add SSH key**.
7. Clonar repositorio:
    + Ir **Advanced / Terminal**:
        + Verificar que todo esta correcto:
            + $ ssh -T git@github.com
                ::: warning Advertencia
                + Respuesta esperada: Hi petrix12! You've successfully authenticated, but GitHub does not provide shell access.
                + En caso de **Permission denied (publickey)** revisar procedimiento anterior.
                <p></p>
                :::
        + $ git clone git@github.com:petrix12/sefar2022.git ~/public_html/test.corporacioncabv.com
8. Crear base de datos **corporac_sefar2022** en **Database / MySQL® Database**.
9. Crear usuario **corporac_sefar2022** para la base de datos (otorgarle todos los permisos).
10. Crear archivo de variables de entorno **00soportes\credenciales\\.env**:
    ```env
    APP_NAME="Sefar Universal"
    APP_ENV=production
    APP_KEY=base64:NIjvSdjj0MQRvdsNPrv3v6lOnhY8+ajRuQH5czB8ss0=
    APP_DEBUG=false
    APP_URL=http://test.corporacioncabv.com
    # ...
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=corporac_sefar2022
    DB_USERNAME=corporac_sefar2022
    DB_PASSWORD=********
    # ...
    ```
    ::: danger Importante
    Por seguridad, este archivo debe ser ignorado por Git.
    <p></p>
    :::
11. Subir manualmente el archivo **00soportes\credenciales\\.env** a la raíz del proyecto en el hosting.
12. Instalar dependencias y crear tablas en base de datos:
    + Ir **Advanced / Terminal**:
    + $ cd public_html/test.corporacioncabv.com
    + $ composer install
    + $ php artisan voyager:install
    + $ php artisan db:seed
    + $ php artisan key:generate
13. Instalar dependencias de npm (**ejecutar solo en caso de problemas**):
    + Ir **Advanced / Terminal**:
    + $ wget https://raw.githubusercontent.com/wnpower/NodeJS-Install/master/linux_install_nodejs.sh -O linux_install_nodejs.sh && bash linux_install_nodejs.sh
    + $ cd public_html/test.corporacioncabv.com
    + $ npm install
14. Cambiar credenciales de administrador:
    + Ingresar en **https://test.corporacioncabv.com/admin** con las credenciales:
        + Email: admin@admin.com
        + Password: password
        + Cambiar credenciales
::: tip Nota
Para aplicar cambios en el repositorio:
+ En local:
    + $ npm run build
    + $ git add .
    + $ git commit -am "Cambios"
    + $ git push
+ Ir **Advanced / Terminal**:
+ $ cd public_html/test.corporacioncabv.com
+ $ git pull
+ Si es necesario, ejecutar:
    + $ composer update
    + $ php artisan migrate
    + $ php artisan db:seed
<p></p>
:::
