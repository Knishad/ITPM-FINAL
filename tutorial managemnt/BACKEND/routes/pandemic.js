const router = require("express").Router();
let ETutor = require("../models/Book");
router.route("/add").post((req,res)=>{

    const Booktype = req.body.Booktype;
    const Name = req.body.Name;
    const type = req.body.type;
    const batchno = req.body.batchno;
    const quantity = req.body.quantity;
    const publisherNO = req.body.publisherNO;
    
 
    const newBook = new ETutor({

        Booktype,
        Name,
        type,
        batchno,
        quantity,
        publisherNO,
        

        
    })

    newBook.save().then(()=>{

        res.json("Book Added")

    }).catch((err)=>{

        console.log(err);
    })

})

router.route("/all").get((req,res)=>{

    ETutor.find().then((ETutor)=>{

        res.json(ETutor)

    }).catch((err)=>{
        console.log(err)
    })
})


router.route('/update/:id').post((req, res) => {
    ETutor.findById(req.params.id)
        .then(ETutor => {
            ETutor.Booktype = req.body.Booktype;
            ETutor.Name = req.body.Name;
            ETutor.type = req.body.type;
            ETutor.batchno = req.body.batchno;
            ETutor.quantity = req.body.quantity;
            ETutor.publisherNO = req.body.publisherNO;
            


            ETutor.save()
                .then(() => res.json('Book updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/delete/:id").delete(async(req,res) =>{
    let userId = req.params.id;

    await ETutor.findByIdAndDelete(userId).then(() => {
        res.status(200).send({status: "Book Deleted"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delelte", error: err.message});
    })
})
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
   const user =  await ETutor.findById(userId).then((ETutor)=>{
        res.status(200).send({status:"USer fetched", ETutor});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with user", error : err.message});
    })
})

module.exports = router;