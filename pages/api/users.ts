import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';
import connectToDatabase from "@/lib/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      const users = await User.find({});
      res.status(200).json(users);
      break;
    case 'POST':
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
      break;
    default:
      res.status(405).end();
      break;
  }
}
