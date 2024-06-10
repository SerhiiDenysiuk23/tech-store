import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();



  if (req.method === 'GET') {
    try {
      const orders = await Order.find({}).populate("products.product");
      return res.status(200).json({ orders });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;