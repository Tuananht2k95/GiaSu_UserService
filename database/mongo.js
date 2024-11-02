import mongoose from "mongoose";

const connect = mongoose.connect(process.env.MONGODB, {
    autoIndex: true,
})

export default connect;