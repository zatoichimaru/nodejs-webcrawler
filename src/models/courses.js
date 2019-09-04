const mongoose = require('../database');

const CoursesSchema = new mongoose.Schema({
    institutesId:{
        type: Number,
        require: true,
    },
    coursesId:{
        type: Number,
        require: true,
    },
    url:{
        type: String,
        require: true,
    },
});

const Courses = mongoose.models.Courses || mongoose.model('Courses', CoursesSchema);

module.exports = Courses;