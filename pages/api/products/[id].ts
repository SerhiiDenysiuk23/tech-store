import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id).populate('category').populate('brand');
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ product });
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;