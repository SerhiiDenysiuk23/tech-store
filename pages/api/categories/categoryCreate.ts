import type {NextApiRequest, NextApiResponse} from 'next';
import Category from '../../../models/Category';
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();


  if (req.method !== 'POST')
    return res.status(405).json({message: 'Method Not Allowed'});


  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'Unauthorized'});
  }



  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY ?? "");

    const user = await User.findById(decoded.userId).select('-password')

    if (user && user.isAdmin) {

      const name = req.body;
      const newCategory = new Category({name});
      await newCategory.save();
      return res.status(201).json({category: newCategory});
    }
    return res.status(401).json({message: 'The user has no permissions'});
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({message: 'Invalid token'});
    } else {
      return res.status(500).json({message: 'Internal Server Error'});
    }
  }
}