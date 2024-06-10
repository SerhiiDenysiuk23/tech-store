import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import Order from "@/models/Order";
import {IOrderToCreate} from "@/types/IOrder";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  if (req.method !== 'POST')
    return res.status(405).json({message: 'Method Not Allowed'});


  try {

      const order = req.body as IOrderToCreate;
      console.log(order)
      const newProduct = new Order({...order});
      await newProduct.save();
      return res.status(201).json({isSuccess: true});

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default handler;