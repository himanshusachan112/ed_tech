const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
	email:{
		type:String,
		required:true,
	},
	course: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Course",
	},
	completedvideos: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subsection",
		},
	],
});

module.exports = mongoose.model("Courseprogress", courseProgress);
