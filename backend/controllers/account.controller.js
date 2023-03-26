const AccountModel = require("../models/account.model");
const cloudinary = require("../middleware/cloudinary.middleware")
const bcrypt = require("bcrypt");
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
  });

const postAccount = async (req, res) => {
    console.log(req);
    try {
        let newReqBody = JSON.parse(JSON.stringify(req.body)); 
        let newReqFile = JSON.parse(JSON.stringify(req.files)); 
        let email = newReqBody.email
        let password = newReqBody.password
        let name = newReqBody.name
        let dob = newReqBody?.dob
        let role = newReqBody.role
        let departmentId = req.params.departmentId;
        const fileData = newReqFile?.file
        
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
        console.log('hash ', hash);
        //upload image
        
        //create account
        let newAccount = await AccountModel.create({
            email: email,
            password: hashedPwd,
            name: name,
            dob: dob,
            departmentId: departmentId,
            role: role,
            publishId:result.public_id,
            avartarUrl:result.secure_url,
        })
        if (newAccount) {
            response = {
                'status': 'Register account success',
                'data': data
            }
            console.log(response)
            res.status(201).json(response);
        }

    } catch (error) {
        res.status(500).json(error.message)
    }
};
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
        let accounts = await AccountModel.find({});
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
        let departmentId = req.params.departmentId
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
        let id = req.id
        let name = req.body?.name
        let dob = req.body.dob
        const result = await cloudinary.uploader.upload(fileData.tempFilePath, {
            resource_type: "auto",
            folder: "web_collection_ideas",
        })
        let foundAccount = await AccountModel.findOne({ _id: id })
        if (foundAccount) {
            let updateAccount = await AccountModel.findByIdAndUpdate(id, {
                name: name == null ? foundAccount.name : name,
                dob: dob == null ? foundAccount.dob : dob,
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
        let account = await AccountModel.findByIdAndDelete({ id });
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
        method: "get", //define method http
        controller: getAccountByDepartment, //this is method handle when have request on server
        route: "/department/:departmentId/account", //define API
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