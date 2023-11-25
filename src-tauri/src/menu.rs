use tauri::{CustomMenuItem, Menu, Submenu};

pub fn add_menu<R: tauri::Runtime>(builder: tauri::Builder<R>) -> tauri::Builder<R> {
    let schedule_page = CustomMenuItem::new("schedule", "Schedule");
    let calendar_page = CustomMenuItem::new("calendar", "Calendar");
    let users_page = CustomMenuItem::new("user", "User");
    let shift_type_page = CustomMenuItem::new("shift_type", "Shift Type");

    let menu = Menu::new().add_submenu(Submenu::new(
        "View",
        Menu::new()
            .add_item(schedule_page)
            .add_item(calendar_page)
            .add_item(users_page)
            .add_item(shift_type_page),
    ));

    builder
        .menu(menu)
        .on_menu_event(|event| match event.menu_item_id() {
            "schedule" => {
                event.window().emit("schedule", ()).unwrap();
            }
            "calendar" => {
                event.window().emit("calendar", ()).unwrap();
            }
            "user" => {
                event.window().emit("user", ()).unwrap();
            }
            "shift_type" => {
                event.window().emit("shift_type", ()).unwrap();
            }
            _ => {}
        })
}
