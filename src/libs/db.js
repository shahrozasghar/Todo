import mongoose from "mongoose";


const DBcon = async () => {

    try {
        mongoose.connect('mongodb+srv://mubasharbinafzal:gHh2wX4ZnpGaSnsT@cluster0.8qgpmof.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Mongo db is connect')

    } catch (error) {
        console.log('mongodb err', error)

    }
}

export default DBcon;