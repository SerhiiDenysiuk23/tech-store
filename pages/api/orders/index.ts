import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Order from "@/models/Order";
import {IOrderToCreate} from "@/types/IOrder";
import Product from "@/models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  let user


  try {


    if (req.method !== "POST") {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
      }

      const decoded: any = jwt.verify(token, process.env.SECRET_KEY ?? "");

      user = await User.findById(decoded.userId).select('-password')
    }


    switch (req.method) {
      case "POST": {
        const order = req.body as IOrderToCreate;
        const newProduct = new Order({...order});
        await newProduct.save();

        const updateStockPromises = order.products.map(async (product) => {
          await Product.findByIdAndUpdate(
            product.product._id,
            { $inc: { stock: -product.quantity } }
          );
        });

        await Promise.all(updateStockPromises);


        return res.status(201).json({isSuccess: true});
      }
      case "GET": {

        if (user && user.isAdmin) {
          const orders = await Order.find({}).populate("products.product").sort({ _id: -1 });
          return res.status(200).json({orders});
        } else {
          return res.status(403).json({message: 'User have not permission'});
        }
      }
      default: {
        return res.status(405).json({message: 'Method Not Allowed'});

      }

    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Internal Server Error'});
  }


};

export default handler;