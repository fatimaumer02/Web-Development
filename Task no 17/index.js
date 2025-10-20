import express from 'express'
import mongoose from 'mongoose';
import students from './models/studentsschema.js';
import dotenv from "dotenv";
dotenv.config();
const app = express()
const port = 4005;
// middle ware
app.use(express.json());

// get api(to get all students data)
app.get('/api/allstudents', async (req, res) => {
    try {
        const getStudents = await students.find({})
        res.json(getStudents)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
//get api (to get single student data)
app.get('/api/allsstudents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const studentId = await students.findById(id);
        if (!studentId) {
            return res.status(404).json({ message: `cannot find any student with ID ${id}` })
        }
        res.json(studentId)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})
// delete api
app.delete('/api/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteStudents = await students.findByIdAndDelete(id);
        res.json(deleteStudents)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//update api
// app.put('/api/students/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updateStudent = await students.findByIdAndUpdate(id, req.body)
//         if (!updateStudent) {
//             return res.status(404).json({ message: "Student not found" }) 
//         };
//         const update = await students.findById(id)
//         res.json(update);
//     }
//     catch (err) {
//         res.status(500).json({ message: err.message })
//     }
// })

app.patch("/api/students/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await students.findByIdAndUpdate(id, req.body,{
        new:true,
        runValidators:true
    });
    if (!updated) {
        return res.status(404).json({ message: "Student not found" });
    }
    // const updatedStudent = await students.findById(ld); // we check the updated document
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message}); // error handling is not in string form
  }
});




//post api (add a new student)
app.post('/api/students', async (req, res) => {
    try {
        const student = await students.create(req.body)
        res.json(student)
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

})

// connection of monogdb
mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Monogdb connected');
    }).catch((err) => {
        console.log("Monogdb is not connected");
    })
//api for check server is running or not
app.get('/', (req, res) => {
    res.json("heloo node js server")
})

// listening the server
app.listen(port, () => {
    console.log(`Server is running in ${port}`);
})
