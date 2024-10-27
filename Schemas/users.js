knex.schema.hasTable('stream_users').then((exists)=>{
    if(!exists){
        return knex.schema.createTable('stream_users', (table)=>{
            table.increments('id').primary();
            table.string('twitch_name', 25);
            table.string('discord_name', 25);
            table.string('twitch_id', 25)
        })
    }
})