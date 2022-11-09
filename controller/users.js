const router = require("express").Router();
const { User, validate } = require("../models/userModal");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(409).send({ message: "User with given email already Exist!" });
        }

        await new User({ ...req.body }).save();

        const newUserData = await User.findOne({ email: req.body.email });
        const token = newUserData.generateAuthToken();
        res.status(201).send({ data: { token, uuid: newUserData._id, userName: newUserData.userName, email: newUserData.email }, message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;