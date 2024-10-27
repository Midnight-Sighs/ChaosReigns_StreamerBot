const db = require('../Utils/db');

exports.getAllTrackers= async(req, res)=>{
    try{
        const [rows] = await db.query("SELECT * FROM trackers");
        res.status(200).json(rows)
    }catch(ex){
        res.status(500).json({data: null, error: 'Error getting tracker stats'})
    }
}

exports.getTrackersByUser=async(req, res)=>{
    const {user_id, platform } = req.body;
    if(platform !== "twitch" && platform !== "discord"){
        res.status(204).json({
            data: null,
            error:""
        })
    }
    try{
        const [ result ] = await db.query(`
            SELECT trackers.*, stream_users.${platform}_name 
            FROM trackers  
            LEFT JOIN stream_users 
            ON trackers.user_id = stream_users.id 
            WHERE user_id = ${user_id}`
        );
        if(result) res.status(200).json({
            data: result,
            error: null,
            original:{
                user_id, platform
            }
        })
        else res.status(204).json({
            data: null,
            error: "No matching stats found",
            original:{
                user_id, platform
            }
        })
    }catch(ex){
        res.status(500).json({data: null, error: "Error getting user by id"})
    }
}

let singleTrackersQuery=`
        trackers.user_id, stream_users.twitch_name, stream_users.discord_name
        FROM trackers 
        LEFT JOIN stream_users
        ON trackers.user_id = stream_users.id
    `

exports.getSingleTrackersAllUsers=async(req, res)=>{
    const { tracker,  } = req.body;
    let query = `SELECT trackers.${tracker}, `+ singleTrackersQuery
    try{
        const [ result ] = await db.query(query);
        if(result) res.status(200).json({
            data: result,
            error: null, 
            original: { tracker}
        })
        else res.status(204).json({
            data: null,
            error: "No matching tracker found",
            original: { tracker}
        })
    }catch(ex){
        res.status(500).json({
            data: null,
            error: "There was an issue retrieving your stats",
        })
    }
}

exports.getSingleTrackerSingleUser=async(req, res)=>{
    const user_id = req.params.id
    const { tracker} = req.body;
    let query = `SELECT trackers.${tracker}, `+ singleTrackersQuery + `WHERE user_id = ${user_id}`;
    try{
        const [ result ] = await db.query(query);
        if(result) res.status(200).json({
            data: result,
            error: null, 
            original: { tracker, user_id}
        })
        else res.status(204).json({
            data: null,
            error: "No matching tracker found",
            original: { tracker, user_id}
        })
    }catch(ex){
        res.status(500).json({
            data: null,
            error: "There was an issue retrieving your stats",
            query: query
        })
    }
}
