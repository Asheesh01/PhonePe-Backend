const User = require('../models/User')
const bcrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                messaege: "Please provide all required fields"
            });
        }
        const existUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existUser) {
            return res.json("user already exists")
        }
        const salt = await bcrpt.genSalt(10)
        const hashedPassword = await bcrpt.hash(password, salt);
        const senitizedname = email.toLowerCase();
        const upiId = `${senitizedname.split('@')[0]}@phonepe`;
        const CreateUser = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            upiId

        })
        const token = jwt.sign({ id: CreateUser._id }, process.env.SECRETKEY, { expiresIn: '1h' })
        if (CreateUser) {
            return res.status(200).json({
                id: CreateUser._id,
                name: CreateUser.name,
                email: CreateUser.email,
                phone: CreateUser.phone,
                upiId: CreateUser.upiId,
                balance: CreateUser.balance,
                mpin: false,
                token
            })
        }
        else {
            return res.status(400).json({
                messaege: "Invalid user data"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({
                message: "Invalid Credentials"
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                messaege: "User is not created"
            })
        }
        const compare = await bcrpt.compare(
            password, user.password
        )
        if (!compare) {
            return res.status(501).json({
                message: "Invalid password"
            })
        }
        const token = await jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: "1h" })
        return res.status(200).json({
            message: "user Login Successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                upiId: user.upiId,
                balance: user.balance
            }
        })

    } catch (error) {
        res.status(500).json({
            messaege: error.messaege
        })
    }
}

const setupMpin = async (req, res) => {
    const { mpin } = req.body;
    if (!mpin || mpin.length !== 4) {
        return res.status(400).json({
            messaege: "Please Provide a valid 4 digit MPIN"
        })
    }
    const salt = await bcrpt.genSalt(10);
    const hashMpin = await bcrpt.hash(mpin, salt);
    const user = await User.findByIdAndUpdate(req.user._id, { mpin: hashMpin }, { new: true });
    if (user) {
        return res.status(200).json({
            messaege: "Mpin has setup successfully"
        })
    }
    else {
        return res.status(400).json({
            messaege: "Failed to setup MPIN"
        })
    }
}

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id).select('-password -mpin');
    if (user) {
        return res.status(200).json({
            user
        })
    }
    else {
        return res.status(400).json({
            messaege: "Failed to find the profile"
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    setupMpin,
    getUserProfile
}