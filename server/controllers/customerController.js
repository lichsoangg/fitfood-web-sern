const Customer = require("../models/Customer.model");

const customerController={
    updateCustomer:(req,res,next)=>{
        const data=req.body
        if(req.file){
            data["Avatar"] = req.file.filename
        }
        try {
            Customer.updateCustomer(data,req.user.Username,(err,data)=>{
                if(err) return res.status(400).json({message:"Yêu cầu không hợp lệ"});
                return res.status(203).json({data});
            })
        
        } catch (err) {
            next(err)
        }
    }
}

module.exports=customerController;