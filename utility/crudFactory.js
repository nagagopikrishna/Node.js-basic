
// closure in JS
const getAllFactory = function (ElementModel)
{
    return async function (req, res){
        try{
            console.log("i am in get method");
            const elementDetails = await ElementModel.find();
            if (elementDetails.length === 0) throw new Error("No Element Found");
            else 
            {
                res.status(200).json({
                    status: "success",
                    message: elementDetails
                })
            }
        }
    
        catch (error){
            res.status(404).json({
                status: "failure",
                message: error.message
            })
        }
    }
}


const createFactory = function(ElementModel){
    return async function (req,res){
        try{
         const elementDetails = req.body;
         console.log(elementDetails);
         //adding user to the DB
         const user = await ElementModel.create(elementDetails);
         res.status(200).json({
             status:"success",
             message:`added the Element`,
             user,
         })
        }catch(err){
         res.status(500).json({
             status:"failure",
             message:err.message
         })
        }
     }
}


const getByIdFactory = function(ElementModel){
    return async function (req, res){
        try{
            const id = req.params.id;
            const elementDetails = await ElementModel.findById(id);
            if (elementDetails.length === 0) throw new Error(`Element with ${id} not found`);
            else
            {
                res.status(200).json({
                    status: "success",
                    message: elementDetails
                })
            }
        }
    
        catch (error){
            res.status(404).json({
                status: "failure",
                message: error.message
            })
        }
}
}


const deleteByIdFactory = function(ElementModel){
    return async function(req, res){
        let {userId} = req.params;
        // console.log(userId)
        try{
            let elementDetails = await ElementModel.findByIdAndDelete(userId);
            res.status(200).json({
                status: "successfully deletion",
                message: elementDetails,
            })
        }
    
        catch (error){
            res.status(404).json({
                status: "failure",
                message: `Element with id: ${userId} not found to delete`
            })
        }
    }
}


module.exports = {getAllFactory, createFactory, getByIdFactory, deleteByIdFactory}