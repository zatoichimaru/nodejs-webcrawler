const mongoose = require('../database');

const InstitutesSchema = new mongoose.Schema({
    institutesId:{
        type: Number,
        require: true,
    },
    name:{
        type: String,
        require: true,
    },
    course:{
        type: String,
        require: true,
    },
    OriginalURL:{
        type: String,
        require: true,
    },
    url:{
        type: String,
        require: true,
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
});

const Institutes = mongoose.models.Institutes || mongoose.model('Institutes', InstitutesSchema);

module.exports = Institutes;