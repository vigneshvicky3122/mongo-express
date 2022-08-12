var express = require('express');
var router = express.Router();
const {dbUrl,dbName,mongodb,MongoClint} = require('../dbConfig');

const clint = new MongoClint(dbUrl);
/* GET home page. */
router.get('/view-student', async(req, res)=> {
  await clint.connect();

  try {
    const  db = await clint.db(dbName);
let users = await db.collection('users').find().toArray();
res.send({
    statusCode: 200,
    users
})
  } catch (error) {
    console.log(error);
    res.send({ 
        statusCode: 500,
        message:"internal error occurred",
        error: error,
    });
  }
  finally { 
     clint.close();
  }
});
router.delete('/delete-student/:id', async(req, res)=> {
  await clint.connect();

  try {
    const  db = await clint.db(dbName);
await db.collection('users').deleteOne({_id : mongodb.ObjectId(req.params.id)});
let users = db.collection('users').find().toArray();
res.send({
    statusCode: 200,
    message: "student successfully deleted",
    users
})
  } catch (error) {
    console.log(error);
    res.send({ 
        statusCode: 500,
        message:"internal error occurred",
        error: error,
    });
  }
  finally { 
     clint.close();
  }
});

router.get('/:id', async(req, res)=> {
  await clint.connect();

  try {
    const  db = await clint.db(dbName);
let users = await db.collection('users').find({_id:mongodb.ObjectId(req.params.id)}).toArray();
res.send({
    statusCode: 200,
    users
})
  } catch (error) {
    console.log(error);
    res.send({ 
        statusCode: 500,
        message:"internal error occurred",
        error: error,
    });
  }
  finally { 
     clint.close();
  }
});

router.post('/create-student', async(req, res)=> {
  await clint.connect();

  try {
    const  db = await clint.db(dbName);
let users = await db.collection('users').insertOne(req.body);
res.send({
    statusCode: 201,
    message: "student successfully added",
    users
})
  } catch (error) {
    console.log(error);
    res.send({ 
        statusCode: 500,
        message:"internal error occurred",
        error: error,
    });
  }
  finally { 
     clint.close();
  }
});

router.put('/edit-email/:id', async(req, res)=> {
  await clint.connect();

  try 
{
    const  db = await clint.db(dbName);
    let mail = await db.collection('users').find({_id:mongodb.ObjectId(req.params.id)}).toArray();
  
  if(mail[0].email===req.body.oldEmail)
  {
    if(req.body.newEmail===req.body.confirmEmail)
    {
      let users = db.collection('users').updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:{email:req.body.newEmail}})
          res.send(
        {
          statusCode: 200,
          message: "email changed successfully"
        })
    }
    else 
    { 
      res.send(
      {
      statusCode: 400, 
      message: "newEmail and confirmEmail does not match "
      }) 
    }

  }
  else{
    res.send(
      {
      statusCode: 400, 
      message: "oldEmail does not match "
      }) 
  }
} 
catch (error) {
    console.log(error);
    res.send({ 
        statusCode: 500,
        message:"internal error occurred",
        error: error,
    });
  }
  finally { 
     clint.close();
  }
});

router.put('/edit-student/:id', async(req, res)=> {
  await clint.connect();

  try {
    const  db = await clint.db(dbName);
let users = await db.collection('users').updateOne({_id : mongodb.ObjectId(req.params.id)},{$set:req.body});
res.send({
    statusCode: 200,
    message: "student successfully updated",
    users
})
  } catch (error) {
    console.log(error);
    res.send({ 
        statusCode: 500,
        message:"internal error occurred",
        error: error,
    });
  }
  finally { 
     clint.close();
  }
});

module.exports = router;
