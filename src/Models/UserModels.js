import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please enter your First name"],
        },
        lastName: {
            type: String,
            required: [true, "Please enter your Last name"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Please enter a password"],
            minlength: [6, "Please enter at least 6 characters"],
        },
        image: {
            type: String,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        likedArticles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Article",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", UserSchema);