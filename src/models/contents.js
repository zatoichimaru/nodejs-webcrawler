const mongoose = require('../database');

const ContentsSchema = new mongoose.Schema({
    institutesId:{
        type: Number,
        require: false,
    },
    coursesId:{
        type: Number,
        require: false,
    },
    title:{
        type: String,
        require: false,
    },
    url:{
        type: String,
        require: false,
    },
    workload:{
        type: String,
        require: false,
    },
    accessTime:{
        type: String,
        require: false,
    },
    indicatedFor:{
        type: String,
        require: false,
    },
    coordinator:{
        type: String,
        require: false,
    },
    specialGuests:{
        type: String,
        require: false,
    },
    paymentFlag:{
        type: String,
        require: false,
    },
    paymentInstallments:{
        type: String,
        require: false,
    },
    price:{
        type: String,
        require: false,
    },
    city:{
        type: String,
        require: false,
    },
    state:{
        type: String,
        require: false,
    },
    district:{
        type: String,
        require: false,
    },
    street:{
        type: String,
        require: false,
    },
    zipcode:{
        type: String,
        require: false,
    },
    content:{
        type: String,
        require: false,
    },
});

const Contents = mongoose.models.Contents || mongoose.model('Contents', ContentsSchema);

module.exports = Contents;