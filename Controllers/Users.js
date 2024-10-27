const db = require('../Utils/db');

exports.getAllUsers=async(req, res)=>{
    try{
        const [rows] = await db.query("SELECT * FROM stream_users");
        res.json(rows)
    }catch(ex){
        res.status(500).json({error: 'Error getting users'})
    }
}

exports.getUserByDataType=async(req, res)=>{
    const { type, value } = req.body;
    try{
        const [ result ] = await db.query(`SELECT * FROM stream_users WHERE ${type} = "${value}"`)
        if(result) res.status(200).json({ 
            data:result, 
            error: null,
            original:{
                type, value
            }
        });
        else res.status(204).json({
            data: null, 
            error: "No matching users found",
            original:{
                type, value 
            }
        })
    } catch (ex){
        res.status(500).json({data: null, error: "Error getting users"})
    }
}