import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      const products = await Product.find({});
      res.status(200).json(products);
      break;
    case 'POST':
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
      break;
    default:
      res.status(405).end();
      break;
  }
}