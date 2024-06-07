import type { NextApiRequest, NextApiResponse } from 'next';
import Order from '../../models/Order';
import connectToDatabase from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      const orders = await Order.find({});
      res.status(200).json(orders);
      break;
    case 'POST':
      const order = new Order(req.body);
      await order.save();
      res.status(201).json(order);
      break;
    default:
      res.status(405).end();
      break;
  }
}
