use crate::{db::shift_type, Ctx};
use rspc::{RouterBuilder, Type};
use serde::Deserialize;

pub fn shift_type_router() -> RouterBuilder<Ctx> {
    RouterBuilder::<Ctx>::new()
        .query("all", |t| {
            t(|ctx, _: ()| async move {
                let shift_types = ctx.shift_type().find_many(vec![]).exec().await?;

                Ok(shift_types)
            })
        })
        .mutation("create", |t| {
            #[derive(Deserialize, Type)]
            struct CreateShiftTypeData {
                name: String,
                color: String,
            }

            t(|ctx, new_shift_type: CreateShiftTypeData| async move {
                let st = ctx
                    .shift_type()
                    .create(new_shift_type.name, new_shift_type.color, vec![])
                    .exec()
                    .await?;

                Ok(st)
            })
        })
        .mutation("update", |t| {
            #[derive(Deserialize, Type)]
            struct UpdateShiftTypeData {
                id: String,
                name: String,
                color: String,
            }

            t(|ctx, new_shift_type: UpdateShiftTypeData| async move {
                let st = ctx
                    .shift_type()
                    .update(
                        shift_type::id::equals(new_shift_type.id),
                        vec![
                            shift_type::name::set(new_shift_type.name),
                            shift_type::color::set(new_shift_type.color),
                        ],
                    )
                    .exec()
                    .await?;

                Ok(st)
            })
        })
        .mutation("delete", |t| {
            #[derive(Deserialize, Type)]
            struct DeleteShiftTypeData {
                id: String,
            }

            t(|ctx, del_shift_type: DeleteShiftTypeData| async move {
                ctx.shift_type()
                    .delete(shift_type::id::equals(del_shift_type.id))
                    .exec()
                    .await?;

                Ok(())
            })
        })
}
