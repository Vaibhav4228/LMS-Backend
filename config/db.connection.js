import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectionToDB = () => {
  try {
    const connection = mongoose.connect(
      process.env.MONGO_URI || `mongodb://localhost:27017/lms`
    );
    if (connection) {
      console.log(`connected to mongo db`);
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectionToDB;
