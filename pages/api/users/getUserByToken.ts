import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

const getUserByToken = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY ?? "");

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default getUserByToken;