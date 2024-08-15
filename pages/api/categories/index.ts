import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Category from "@/models/Category";
import Product from "@/models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToDatabase();

  let user


  try {


    if (req.method !== "GET") {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({message: 'Unauthorized'});
      }

      const decoded: any = jwt.verify(token, process.env.SECRET_KEY ?? "");

      user = await User.findById(decoded.userId).select('-password')
    }


    switch (req.method) {
      case "GET": {
        const categories = await Category.find({ name: { $ne: 'No category' } });
        return res.status(200).json({categories});

      }
      case "POST": {

        if (user && user.isAdmin) {
          const name = req.body;
          const newCategory = new Category({name});
          await newCategory.save();
          return res.status(201).json({category: newCategory});
        } else {
          return res.status(403).json({message: 'User have not permission'});
        }

      }
      case "PUT": {
        if (user && user.isAdmin) {
          const {_id, name} = req.body;
          const updatedCategory = await Category.findByIdAndUpdate(_id, {name}, {new: true});
          if (!updatedCategory) {
            return res.status(404).json({message: 'Category not found'});
          }
          return res.status(200).json({category: updatedCategory});
        } else {
          return res.status(403).json({message: 'User have not permission'});
        }
      }
      case "DELETE": {
        if (user && user.isAdmin) {
          const _id = req.body as string;

          const updatedCategory = await Category.findByIdAndDelete(_id);
          if (!updatedCategory) {
            return res.status(404).json({message: 'Category not found'});
          }

          let noCategory = await Category.findOne({ name: 'No category' });
          if (!noCategory) {
            noCategory = new Category({ name: 'No category' });
            await noCategory.save();
          }
          await Product.updateMany({ category: _id }, { category: noCategory._id });

          return res.status(200).json({isDeleted: true});
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