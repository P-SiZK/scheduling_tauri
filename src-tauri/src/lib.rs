use std::sync::Arc;

#[allow(warnings)]
pub mod db;
pub mod menu;
pub mod router;

pub type Ctx = Arc<db::PrismaClient>;
