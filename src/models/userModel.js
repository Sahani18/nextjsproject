import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      unique: true,
    },
    isVerified: {
      default: false,
      type: Boolean,
    },
    isAdmin: {
      default: false,
      type: Boolean,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("User", userSchema);

export default User;
// * The above line means if the model is present then use it otherwise create a new one

// ! we can use users or "User" both are same coz in mongoDB it will be pluralised and stored as users ie, User will be created as users in DB, Product into products similarly others too
