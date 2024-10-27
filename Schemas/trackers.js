knex.schema.hasTable('trackers').then((exists)=>{
    if(!exists){
        return knex.schema.createTable('trackers', (table)=>{
            table.increments('id').primary();
            table.integer('user_id').unsigned();
            table
                .foreign('id')
                .references('stream_users.id')
                .deferrable('deferred')
        })
    }
})