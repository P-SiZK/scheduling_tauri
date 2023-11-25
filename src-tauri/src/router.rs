mod shift_date;
mod shift_type;
mod user;

use crate::Ctx;
use rspc::Router;
use std::sync::Arc;

pub fn router() -> Arc<Router<Ctx>> {
    let config = rspc::Config::new()
        .set_ts_bindings_header("/* eslint-disable */")
        .export_ts_bindings(
            std::path::PathBuf::from(env!("CARGO_MANIFEST_DIR"))
                .join("../src/types/generated/bindings.ts"),
        );

    Router::<Ctx>::new()
        .config(config)
        .merge("user.", user::user_router())
        .merge("shift_type.", shift_type::shift_type_router())
        .merge("shift_date.", shift_date::shift_date_router())
        .build()
        .arced()
}
