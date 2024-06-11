import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import jwt from "jsonwebtoken";
import User from "@/models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'Unauthorized'});
  }


  if (req.method === 'GET') {
    try {
      const decoded: any = jwt.verify(token, process.env.SECRET_KEY ?? "");

      const user = await User.findById(decoded.userId).select('-password')
      if (user && user.isAdmin) {
        const orders = await Order.find({}).populate("products.product");
        return res.status(200).json({orders});
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;