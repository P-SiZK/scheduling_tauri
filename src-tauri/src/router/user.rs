use crate::{db::user, Ctx};
use rspc::{RouterBuilder, Type};
use serde::Deserialize;

pub fn user_router() -> RouterBuilder<Ctx> {
    RouterBuilder::<Ctx>::new()
        .query("all", |t| {
            t(|ctx, _: ()| async move {
                let users = ctx.user().find_many(vec![]).exec().await?;

                Ok(users)
            })
        })
        .query("all_with_shift_date", |t| {
            t(|ctx, _: ()| async move {
                user::include!(user_with_shift_dates {
                    shift_dates: select {
                        id
                        year
                        month
                        day
                        shift_type_id
                    }
                });

                let users = ctx
                    .user()
                    .find_many(vec![])
                    .include(user_with_shift_dates::include())
                    .exec()
                    .await?;

                Ok(users)
            })
        })
        .mutation("create", |t| {
            #[derive(Deserialize, Type)]
            struct CreateUserData {
                name: String,
            }

            t(|ctx, new_user: CreateUserData| async move {
                let u = ctx.user().create(new_user.name, vec![]).exec().await?;

                Ok(u)
            })
        })
        .mutation("update", |t| {
            #[derive(Deserialize, Type)]
            struct UpdateUserData {
                id: String,
                name: String,
            }

            t(|ctx, new_user: UpdateUserData| async move {
                let u = ctx
                    .user()
                    .update(
                        user::id::equals(new_user.id),
                        vec![user::name::set(new_user.name)],
                    )
                    .exec()
                    .await?;

                Ok(u)
            })
        })
        .mutation("delete", |t| {
            #[derive(Deserialize, Type)]
            struct DeleteUserData {
                id: String,
            }

            t(|ctx, del_user: DeleteUserData| async move {
                ctx.user()
                    .delete(user::id::equals(del_user.id))
                    .exec()
                    .await?;

                Ok(())
            })
        })
}
