var mongoose = require('mongoose');

var TaskModel;

var TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    
    dueDate: {
        type: Date,
    },
	
	important: {
		type: Boolean,
		default: false
	},
	
	parent: {
		type: String,
		ref: 'Task'
	},
    
    owner: 	{
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
    
    createdDate: {
        type: Date,
        default: Date.now
    }

});

TaskSchema.methods.toAPI = function() {
    return {
        title: this.title,
        dueDate: this.dueDate,
		important: this.important,
		parent: this.parent
    };
};

TaskSchema.statics.findByOwner = function(ownerId, callback) {

    var search = {
        owner: mongoose.Types.ObjectId(ownerId)
    };

    return TaskModel.find(search).select("title dueDate important parent").exec(callback);
};


TaskModel = mongoose.model('Task', TaskSchema);


module.exports.TaskModel = TaskModel;
module.exports.TaskSchema = TaskSchema;