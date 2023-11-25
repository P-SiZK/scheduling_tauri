use crate::{
    db::{shift_date, shift_type, user},
    Ctx,
};
use rspc::{RouterBuilder, Type};
use serde::Deserialize;

pub fn shift_date_router() -> RouterBuilder<Ctx> {
    RouterBuilder::<Ctx>::new()
        .query("all", |t| {
            t(|ctx, _: ()| async move {
                let shift_dates = ctx.shift_date().find_many(vec![]).exec().await?;

                Ok(shift_dates)
            })
        })
        .query("get_by_user_id", |t| {
            #[derive(Deserialize, Type)]
            struct GetUserShiftDateData {
                user_id: String,
            }

            t(|ctx, user_id: GetUserShiftDateData| async move {
                let shift_dates = ctx
                    .shift_date()
                    .find_many(vec![shift_date::user_id::equals(user_id.user_id)])
                    .exec()
                    .await?;

                Ok(shift_dates)
            })
        })
        .mutation("upsert", |t| {
            #[derive(Deserialize, Type)]
            struct UpsertShiftDateData {
                year: i32,
                month: i32,
                day: i32,
                user_id: String,
                shift_type_id: String,
            }

            t(|ctx, new_shift_date: UpsertShiftDateData| async move {
                let sd = ctx
                    .shift_date()
                    .upsert(
                        shift_date::UniqueWhereParam::YearMonthDayUserIdEquals(
                            new_shift_date.year,
                            new_shift_date.month,
                            new_shift_date.day,
                            new_shift_date.user_id.clone(),
                        ),
                        shift_date::create(
                            new_shift_date.year,
                            new_shift_date.month,
                            new_shift_date.day,
                            user::id::equals(new_shift_date.user_id),
                            shift_type::id::equals(new_shift_date.shift_type_id.clone()),
                            vec![],
                        ),
                        vec![shift_date::shift_type_id::set(new_shift_date.shift_type_id)],
                    )
                    .exec()
                    .await?;

                Ok(sd)
            })
        })
        .mutation("delete", |t| {
            #[derive(Deserialize, Type)]
            #[serde(untagged)]
            enum DeleteShiftDateData {
                Id {
                    id: String,
                },
                Date {
                    year: i32,
                    month: i32,
                    day: i32,
                    user_id: String,
                },
            }

            t(|ctx, del_shift_date: DeleteShiftDateData| async move {
                ctx.shift_date()
                    // .delete(shift_date::id::equals(del_shift_date.id))
                    .delete(match del_shift_date {
                        DeleteShiftDateData::Id { id } => shift_date::id::equals(id),
                        DeleteShiftDateData::Date {
                            year,
                            month,
                            day,
                            user_id,
                        } => shift_date::UniqueWhereParam::YearMonthDayUserIdEquals(
                            year, month, day, user_id,
                        ),
                    })
                    .exec()
                    .await?;

                Ok(())
            })
        })
}
