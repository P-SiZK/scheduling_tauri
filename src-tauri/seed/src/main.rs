use app::db::{new_client, shift_type, user, PrismaClient};
use fake::faker::chrono::raw::DateTimeBetween;
use fake::faker::color::raw::HexColor;
use fake::faker::lorem::raw::Word;
use fake::faker::name::raw::Name;
use fake::locales::JA_JP;
use fake::Fake;
use prisma_client_rust::chrono::{DateTime, Datelike, Utc};
use rand::seq::SliceRandom;
use rand::SeedableRng;

#[tokio::main]
async fn main() {
    let client = new_client().await.unwrap();
    create_seed_data(&client).await;
}
async fn create_seed_data(client: &PrismaClient) {
    let seed = [
        11, 13, 101, 127, 9, 2, 4, 8, 4, 4, 0, 3, 3, 9, 9, 8, 2, 4, 4, 3, 5, 3, 1, 0, 0, 0, 0, 0,
        0, 0, 0, 7,
    ];
    let rng = &mut rand::rngs::StdRng::from_seed(seed);

    client
        .user()
        .create_many(
            fake::vec![String as Name(JA_JP); 20]
                .iter()
                .map(|name| user::create_unchecked(name.to_owned(), vec![]))
                .collect(),
        )
        .exec()
        .await
        .unwrap();
    let users = client.user().find_many(vec![]).exec().await.unwrap();

    client
        .shift_type()
        .create_many(
            fake::vec![(String, String) as (Word(JA_JP), HexColor(JA_JP)); 5]
                .iter()
                .map(|(name, color)| {
                    shift_type::create_unchecked(name.to_owned(), color.to_owned(), vec![])
                })
                .collect(),
        )
        .exec()
        .await
        .unwrap();
    let shift_types = client.shift_type().find_many(vec![]).exec().await.unwrap();

    let start_date = DateTime::parse_from_rfc3339("2023-11-01T00:00:00+09:00")
        .unwrap()
        .with_timezone(&Utc);
    let end_date = DateTime::parse_from_rfc3339("2023-11-14T00:00:00+09:00")
        .unwrap()
        .with_timezone(&Utc);
    for u in users {
        let date: DateTime<Utc> = DateTimeBetween(JA_JP, start_date, end_date).fake();
        client
            .shift_date()
            .create(
                date.year(),
                date.month() as i32,
                date.day() as i32,
                user::id::equals(u.id),
                shift_type::id::equals(shift_types.choose(rng).unwrap().id.clone()),
                vec![],
            )
            .exec()
            .await
            .unwrap();
    }
}
