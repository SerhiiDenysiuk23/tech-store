import Product from "@/models/Product";
import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import Category from "@/models/Category";
import Brand from "@/models/Brand";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const products = await Product.find({}).populate("category").populate("brand");
      return res.status(200).json({ products: products });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;