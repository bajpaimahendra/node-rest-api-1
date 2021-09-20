const UserModel = require('../models/user');
const RefreshToken = require('../models/refreshToken');
const {Person,Address} = require('../models/ref');

const jonDemo = async(req, res, next) => {
   // let result;
    // result= await UserModel.aggregate([{
    //     $lookup: {
    //         from: "refreshtokens", // collection name in db
    //         localField: "_id",
    //         foreignField: "userId",
    //         as: "UserResfresh"
    //     }
    // }]);

    // const person = new Person({
    //     name: 'Ian Fleming',
    //     age: 50
    //   });
      
    //   await person.save();
      
    //     const address = new Address({
    //       address: 'Delhi',
    //       personId: person._id    // assign the _id from the person
    //     });
      
    //    await address.save();

  //let userdata= await  Address.findOne({address:'Delhi'}).populate('personId')
  let userdata= await  Address.findOne({address:'Delhi'},{_id:0})
  .populate({path:'personId',select:{_id:0,__v:0}})
      console.log(userdata.personId[0].name);
     
    res.status(200).json({msg:userdata});


    //res.status(200);
   // res.json('hello');
//console.log('demo');
}

//https://mongoosejs.com/docs/populate.html

module.exports = { jonDemo }