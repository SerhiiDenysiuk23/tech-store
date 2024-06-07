import Product from "@/models/Product";
import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import {IProductToCreate} from "@/types/IProduct";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

        const product = req.body as IProductToCreate;
        console.log(product)
        const newProduct = new Product({...product});
        await newProduct.save();
        return res.status(201).json({product: newProduct});
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export default handler;