const AccountModel = require("../models/account.model");
const cloudinary = require("../middleware/cloudinary.middleware")
const bcrypt = require("bcrypt");
const postAccount = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    let name = req.body.name
    let dob = req.body?.dob
    let role = req.body.role
    let departmentId = req.params.departmentId
    let response
    if (!email || !password) return res.status(400).json({ 'message': 'Email and Password are required. ' })
    console.log(email, password, role)
    //check duplicate
    const duplicate = UserModel.findOne({
        email: email
    })
        .then(data => {
            if (data) {
                response = {
                    'status': 'duplicate email',
                    'code': 103
                }
                return res.status(409).json(response);
            }
            else {
                // hash pasword
                let hashedPwd = '';
                bcrypt.hash(password, 10, function (err, hash) {
                    console.log('hash ', hash);
                    hashedPwd = hash;
                    //create account
                    UserModel.create({
                        email: email,
                        password: hashedPwd,
                        name: name,
                        dob: dob,
                        departmentId: departmentId,
                        role: role
                    })
                        .then(data => {
                            response = {
                                'status': 'Register account success',
                                'data': data
                            }
                            console.log(response)
                            res.status(201).json(response);
                        })
                        .catch(err => {
                            res.status(500).json({ 'message': err.message })
                        })
                })

            }
        })
        .catch(err => {
            res.status(500).json({ 'message': err.message })
        })
};
const getCurrentAccount = async(req, res) =>{
    try {
        let email = req.email
        let account = await AccountModel.findOne({ email: email });
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
        let id= req.params.id
        let name= req.body.name
        let dob = req.body.dob
        let accounts = await AccountModel.findByIdAndUpdate(id,{ 
            name: name,
            dob:dob
         });
        if (accounts) {
            response = {
                'status': 'Update account success',
                'data': accounts
            }
            res.status(200).json(response)
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
};
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
        route: "/department/:departmentId/account", //define API
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
        route: "/account/:id", //define API
    },
    {
        method: "delete", //define method http
        controller: deleteAccount, //this is method handle when have request on server
        route: "/account/:id", //define API
    },
]