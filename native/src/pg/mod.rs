use postgres::{Connection};
use std::io::Read;

pub fn addrstream(conn: &Connection, mut data: impl Read) {
    let stmt = conn.prepare(format!("COPY address (name, number, source, props, geom) FROM STDIN").as_str()).unwrap();

    println!("STARTING");
    stmt.copy_in(&[], &mut data).unwrap();
    println!("COMPLETE");
}

pub struct Table ();

impl Table {
    pub fn address(conn: &Connection) {
        conn.execute(r#"
             CREATE EXTENSION IF NOT EXISTS POSTGIS
        "#, &[]).unwrap();

        conn.execute(r#"
            DROP TABLE IF EXISTS address;
        "#, &[]).unwrap();

        conn.execute(r#"
            CREATE UNLOGGED TABLE address (
                id SERIAL,
                name JSONB,
                number TEXT,
                source TEXT,
                geom GEOMETRY(POINT, 4326),
                props JSONB
            )
        "#, &[]).unwrap();
    }
}
