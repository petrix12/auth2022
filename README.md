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
    + $ laravel new sefar2022 --jet
    + Seleccionar: [1] inertia
    + Will your application use teams? (yes/no) [no]: no
2. Crear base de datos local **sefar2022** en MySQL (Juego de carácteres: utf8_general_ci)
3. Cambiar Vue.js por React.js:
    + $ npx laravel-jetstream-react@latest install
    ::: tip Documentación
    + **[Laravel Jetstream React CLI](https://github.com/ozziexsh/laravel-jetstream-react/tree/2e6a0a2793e9aa15bf763a6068c828c10d56f7f0)**
    + **[Página oficial de Inertia](https://inertiajs.com)**
    <p></p>
    :::
4. Instalar dependencias de Voyager:
    + $ composer require tcg/voyager
    ::: tip Documentación
    + **[Página oficial de Voyager](https://voyager-docs.devdojo.com)**  
    <p></p>
    :::
5. Verificar variables de entorno en **.env** (local):
    ```env
    APP_NAME="Sefar Universal"
    # ...
    APP_ENV=local
    # ...
    APP_DEBUG=true
    APP_URL=http://sefar2022.test
    # ...
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=sefar2022
    DB_USERNAME=root
    DB_PASSWORD=
    # ...
    ```
6. Instalar Voyager sin registros de prueba:
    + $ php artisan voyager:install
    + Esta acción ejecutará las migraciones  
    ::: warning Advertencia
    En caso de querer instalar Voyager con registros de prueba, ejecutar:
    + $ php artisan voyager:install --with-dummy
    <p></p>
    :::
7. Modificar provider **app\Providers\AppServiceProvider.php**:
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
8. Modificar configuración de base de datos en **config\database.php**:
    ```php{4,5,7}
    // ...
    'mysql' => [
        // ...
        'charset' => 'utf8',
        'collation' => 'utf8_general_ci',
        // ...
        'engine' => 'InnoDB',
        // ...
    ],
    // ...
    ```
9.  Programar seeder **database\seeders\DatabaseSeeder.php**:
    ```php
    // ...
    use Illuminate\Database\Seeder;
    use Illuminate\Support\Str;
    use TCG\Voyager\Models\Role;
    use TCG\Voyager\Models\User;

    class DatabaseSeeder extends Seeder
    {
        // ...
        public function run()
        {
            if (User::count() == 0) {
                $role = Role::where('name', 'admin')->firstOrFail();

                User::create([
                    'name'           => 'Admin',
                    'email'          => 'admin@admin.com',
                    'password'       => bcrypt('password'),
                    'remember_token' => Str::random(60),
                    'role_id'        => $role->id,
                ]);
            }
        }
    }
    ```
10. Ejecutar seeder:
    + $ php artisan db:seed
11. Ejecutar la aplicación:
    + $ npm run dev
12. Para generar el directorio **public\build**, ejecutar:
    + $ npm run bulid
13. Quitar de **.gitignore** la carpeta **/public/build**.
14. Modificar el **Vite manifest** (public\build\manifest.json):
    + Reemplazar **resources/js/app.js** por **resources/js/app.tsx**
    + Reemplazar **.vue** por **.tsx**
    + Reemplazar **-vue_** por **-react_**


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
            + http://localhost:8082
            + http://localhost:8000
            + https://test.corporacioncabv.com
    + Clic en Crear
12. Respaldar credenciales: ID Cliente y Secret ID.
13. Modificar **.env**:
    ```env
    # ...
    GOOBLE_CLIENT_ID=(ID Cliente)
    GOOBLE_SECRET_ID=(Secret ID)
    ```


## Obtener ID de cliente de Facebook


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
