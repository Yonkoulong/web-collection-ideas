const AccountModel = require("../models/account.model");
const cloudinary = require("../middleware/cloudinary.middleware")
const bcrypt = require("bcrypt");
const validator = require("email-validator");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

const postAccount = async (req, res) => {
    //long code
    
    try {
        let email = req.body.email
        let password = req.body.password
        let name = req.body.name
        let dob = req.body?.dob
        let role = req.body.role
        let departmentId = req.body?.departmentId
        let newAccount
        if(validator.validate(email)){return res.sendStatus(404);}
        const fileData = req.files.file
        const result = await cloudinary.uploader.upload(fileData.tempFilePath,{
            resource_type:"auto",
            folder:"web_collection_ideas",
          })
        
        let response
        if (!email || !password) return res.status(400).json({ 'message': 'Email and Password are required. ' })
        console.log(email, password, role)
        //check duplicate
        const duplicate = await AccountModel.findOne({
            email: email
        })
        if (duplicate) {
            response = {
                'status': 'duplicate email',
                'code': 103
            }
            return res.sendStatus(409).json(response);
        }
        // hash pasword
        let hashedPwd = await bcrypt.hash(password, 10,)
        //upload image
        
        //create account
        if(departmentId === null) {
            newAccount = await AccountModel.create({
                email: email,
                password: hashedPwd,
                name: name,
                dob: dob,
                role: role,
                publishId:result.public_id,
                avartarUrl:result.secure_url,
            })
        }
        else{
            newAccount = await AccountModel.create({
                email: email,
                password: hashedPwd,
                name: name,
                dob: dob,
                departmentId: departmentId,
                role: role,
                publishId:result.public_id,
                avartarUrl:result.secure_url,
            })
        }
        if (!newAccount) {
            if(fileData) cloudinary.uploader.destroy(fileData.filename)
            return res.sendStatus(404);
        }
        response = {
            'status': 'Register account success',
            'data': newAccount
        }
        console.log(response)
        res.status(201).json(response);
    } catch (error) {
        if(error) {
            res.status(500).json(error)
        }
    }
};
const postSearchAccount = async (req,res) =>{
    try {
    let filter = req.body?.filter
    let accountFilter = await AccountModel.find({ "email": { $regex: `${filter}` } })
    if (accountFilter) {
      response = {
        'status': `Get idea filter by ${filter} success`,
        'data': accountFilter
      }
      res.status(200).json(response)
    }
    } catch (error) {
        res.status(500).json(error.message)
    }
}
const getCurrentAccount = async (req, res) => {
    try {
        let id = req.id
        let account = await AccountModel.findOne({ _id: id });
        if (account) {
            response = {
                'status': 'Get account success',
                'data': account
            }
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getAccount = async (req, res) => {
    try {
        let accounts = await AccountModel.find({}).populate('departmentId');
        if (accounts) {
            response = {
                'status': 'Get all accounts success',
                'data': accounts
            }
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
};

const getAccountById = async (req, res) => {
    try {
        let id = req.params.id
        let account = await AccountModel.findOne({ _id: id });
        if (account) {
            response = {
                'status': 'Get account success',
                'data': account
            }
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }

};

const getAccountByDepartment = async (req, res) => {
    try {
        let departmentId = req.body.departmentId
        let accounts = await AccountModel.find({ departmentId: departmentId });
        if (accounts) {
            response = {
                'status': 'Get account by department success',
                'data': accounts
            }
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }

};

const putAccount = async (req, res) => {
    try {
        let id = req.params.id==null?req.id:req.params.id
        let name = req.body?.name
        let dob = req.body.dob
        let departmentId = req.body.departmentId
        const result = await cloudinary.uploader.upload(fileData.tempFilePath, {
            resource_type: "auto",
            folder: "web_collection_ideas",
        })
        let foundAccount = await AccountModel.findOne({ _id: id })
        if (foundAccount) {
            let updateAccount = await AccountModel.findByIdAndUpdate(id, {
                name: name == null ? foundAccount.name : name,
                dob: dob == null ? foundAccount.dob : dob,
                departmentId:departmentId,
                publishId: result.public_id,
                avartarUrl: result.secure_url == null ? foundAccount.avartarUrl : result.secure_url,
            });
            if (updateAccount) {
                response = {
                    'status': 'Update account success',
                    'data': updateAccount
                }
                res.status(200).json(response)
            }
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
};

const putPasswordForAccount = async (req, res)=>{
    try {
        let id = req.params?.id
        let oldPassWord = req.body.oldPassword
        let newPassword = req.body?.newPassword
        let foundAccount = await AccountModel.findOne({ _id: id })
        if (foundAccount) {
            let match = await bcrypt.compareSync(oldPassWord, foundAccount.password)
            if (match) {
                let updateAccount = await AccountModel.findByIdAndUpdate(id, {
                    password: newPassword,
                });
                if (updateAccount) {
                    response = {
                        'status': 'Update password for account success',
                        'data': updateAccount
                    }
                    res.status(200).json(response)
                }
            }
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const deleteAccount = async (req, res) => {
    try {
        let id = req.params.id
        let account = await AccountModel.findOneAndDelete({ _id:id });
        if (account) {
            response = {
                'status': 'Delete account success',
                'data': account
            }
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
};

module.exports = [
    {
        method: "post", //define method http
        controller: postAccount, //this is method handle when have request on server
        route: "/account", //define API
    },
    {
        method: "get", //define method http
        controller: getAccount, //this is method handle when have request on server
        route: "/account", //define API
    },
    {
        method: "get", //define method http
        controller: getAccountById, //this is method handle when have request on server
        route: "/account/:id", //define API
    },
    {
        method: "post", //define method http
        controller: postSearchAccount, //this is method handle when have request on server
        route: "/account/filter", //define API
    },
    {
        method: "get", //define method http
        controller: getAccountByDepartment, //this is method handle when have request on server
        route: "/account", //define API
    },
    {
        method: "put", //define method http
        controller: putAccount, //this is method handle when have request on server
        route: "/account", //define API
    },
    {
        method: "put", //define method http
        controller: putPasswordForAccount, //this is method handle when have request on server
        route: "/account/:id", //define API
    },
    {
        method: "delete", //define method http
        controller: deleteAccount, //this is method handle when have request on server
        route: "/account/:id", //define API
    },
]