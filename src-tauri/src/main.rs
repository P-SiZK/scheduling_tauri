// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::sync::Arc;
#[cfg(debug_assertions)]
use tauri::Manager;

#[tokio::main]
async fn main() {
    #[cfg(debug_assertions)]
    dotenvy::from_filename(".env.dev").expect(".env.dev file not found");

    let database_url = if cfg!(debug_assertions) {
        std::env::var("DATABASE_URL").expect("environment variable DATABASE_URL is not set")
    } else {
        String::from(dotenvy_macro::dotenv!("DATABASE_URL"))
    };
    let client = Arc::new(app::db::new_client_with_url(&database_url).await.unwrap());

    #[cfg(debug_assertions)]
    client._db_push().await.unwrap();
    #[cfg(not(debug_assertions))]
    client._migrate_deploy().await.unwrap();

    app::menu::add_menu(tauri::Builder::default())
        .setup(
            |#[cfg_attr(not(debug_assertions), allow(unused_variables))] app| {
                #[cfg(debug_assertions)]
                app.get_window("main").unwrap().open_devtools();

                Ok(())
            },
        )
        .plugin(rspc::integrations::tauri::plugin(
            app::router::router(),
            move || Arc::clone(&client),
        ))
        .invoke_handler(tauri::generate_handler![])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
