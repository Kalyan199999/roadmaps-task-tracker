const fs = require('fs')
const path = require('path')

const getAll = async ( req , res )=>
{
    try 
    {
        const dir = path.join( __dirname, '/data', '/task.json' )

        const data = fs.readFileSync( dir , 'utf-8' );

         const tasks = JSON.parse( data ); 

         console.log( tasks );

         return res.status(200).json({ 
                    status: true,
                    tasks: tasks,
                });
        
    }
    catch (error) 
    {
        return  res.status(404).json(
            {
                status:false,
                message:error.message
            }
        )
    }
}

const getBystatus = async (req,res)=>
{
    try 
    {
        const { status }  = req.params;

        const dir = path.join( __dirname , 'data' , 'task.json' );

        const data = JSON.parse( fs.readFileSync( dir , 'utf-8' ) );
        
        const requiredData = data.filter( ( task  )=> task.status == status )
        
        return res.status(200).json({
            status:true,
            data:requiredData
        })
    } 
    catch (error) 
    {
        return res.status(500).json(
            {
                status:false,
                message:error.message
            }
        )
    }
}


const addtask = async (req,res)=>
{
    try 
    {
        const { description, status } = req.body;

        console.log(description );
        console.log(status);
        
        if( !description || !status )
        {
            return res.status(400).json({
                status:false,
                message:"fields are required!"
            })
        }
        

        // generate id
        const timeStamp = Date.now();

        let randomNumber = "";

        for(let i=0;i<5;i++)
        {
            randomNumber += Math.floor( Math.random()*10 );
        }

        const currTime = new Date();

        const createdAt = currTime.toISOString();
        
        const updatedAt = currTime.toISOString();

        const newTask = 
        {
            id:timeStamp+randomNumber,
            description:description,
            status:status,
            createdAt:createdAt,
            updatedAt:updatedAt
        }

        const dir = path.join( __dirname , 'data' , 'task.json' );

        const data = fs.readFileSync(dir , 'utf-8' );

        const tasks = JSON.parse( data );

        tasks.push( newTask )

        const taskString = JSON.stringify( tasks )

        fs.writeFileSync( dir ,  taskString )

        return res.status(200).json(
            {
                status:true,
                data:newTask
            }
        )

    } 
    catch (error) 
    {
        return res.status(404).json(
            {
                status:false,
                message:error.message
            }
        )
    }
}


const update = async (req,res)=>
{
    try 
    {
        const { id } = req.params

        const dir = path.join( __dirname , 'data' , 'task.json' );

        const data = JSON.parse( fs.readFileSync( dir , 'utf-8' ) );

        let idx = -1;

        for(let i=0;i<data.length;i++)
        {
            if( data[i].id === id )
            {
                idx = i;
                break;
            }
        }

        if( idx === -1 )
        {
            return res.status(200).json({
                status:true,
                data:"task not found!"
            })
        }

        const { description , status } = req.body;

        if( !description && !status )
        {

        }

        if( description )
        {
            data[idx].description = description;
        }

        if( status )
        {
            data[idx].status = status;
        }

        fs.writeFileSync( dir , JSON.stringify( data ))

        return res.status(200).json({
            status:true,
            data:data[idx]
        })


    } 
    catch (error) 
    {
        return res.status(500).json(
            {
                status:false,
                message:error.message
            }
        )
    }
}

const remove = async ( req,res )=>
{
    try 
    {
        const { id } = req.params;

        const dir = path.join( __dirname , 'data' , 'task.json' );

        const data = JSON.parse( fs.readFileSync( dir , 'utf-8' ) );

        const updated = data.filter( (task)=>task.id !== id );
        
        const removed = data.filter( (task)=>task.id === id );

        fs.writeFileSync( dir , JSON.stringify(updated) );

        return res.status(200).json({
            status:true,
            data:removed.length > 0 ? removed[0]:''
        })

    } 
    catch (error) 
    {
        return res.status(500).json({
            status:false,
            message:error.message
        })
    }
}

module.exports = {
    getAll,
    addtask,
    getBystatus,
    update,
    remove
}