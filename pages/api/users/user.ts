import {NextApiRequest, NextApiResponse} from "next";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import connectToDatabase from "@/lib/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'Unauthorized'});
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY ?? "");

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({message: 'User not found'});
    }

    if (req.method === "GET") {
      res.status(200).json({user});
    } else if (req.method === 'PUT') {

      const newUser = req.body;

      // _id: string;
      if (newUser._id != decoded.userId) {
        console.log({newUser: newUser._id, user: decoded.userId, isThisUser: newUser._id != decoded.userId})
        return res.status(401).json({message: 'Unauthorized'})
      }

      user.email = newUser.email ?? user.email
      user.name = newUser.name ?? user.name
      user.surname = newUser.surname ?? user.surname
      user.phoneNumber = newUser.phoneNumber ?? user.phoneNumber
      user.city = newUser.city ?? user.city
      user.street = newUser.street ?? user.street
      user.house = newUser.house ?? user.house
      user.apartment = newUser.apartment ?? user.apartment
      user.postalCode = newUser.postalCode ?? user.postalCode
      user.novaPoshtaBranch = newUser.novaPoshtaBranch ?? user.novaPoshtaBranch
      user.meestBranch = newUser.meestBranch ?? user.meestBranch
      await user.save();

      return res.status(200).json({ user });
    } else {
      return res.status(405).json({ message: 'Method Not Allowed' });
    }

  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({message: 'Unauthorized'});
  }
};

export default handler;