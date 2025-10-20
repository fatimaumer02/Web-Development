import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    class :String 
})
const students = mongoose.model('students', studentSchema)
export default students;   