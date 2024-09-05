import Product from "@/models/Product";
import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import {IProductToCreate} from "@/types/IProduct";
import {ObjectId} from "mongodb";

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
        const products = await Product.find({}).populate("category").populate("brand");
        return res.status(200).json({products: products});

      }
      case "POST": {

        if (user && user.isAdmin) {
          const product = req.body as IProductToCreate;
          const newProduct = new Product({...product});
          await newProduct.save();
          const populatedProduct = await Product.findById(newProduct._id).populate("category").populate("brand");
          return res.status(201).json({product: populatedProduct});
        } else {
          return res.status(403).json({message: 'User have not permission'});
        }
      }
      case "PUT": {
        if (user && user.isAdmin) {
          const {_id, ...product} = req.body as IProductToCreate;
          const updatedProduct = await Product.findByIdAndUpdate(_id, {
            ...product,
            category: ObjectId.isValid(product.category) ? new ObjectId(product.category) : product.category,
            brand: ObjectId.isValid(product.brand) ? new ObjectId(product.brand) : product.brand,
          }, {new: true}).populate("category").populate("brand");
          if (!updatedProduct) {
            return res.status(404).json({message: 'Product not found'});
          }
          return res.status(200).json({product: updatedProduct});
        } else {
          return res.status(403).json({message: 'User have not permission'});
        }
      }
      case "DELETE": {
        if (user && user.isAdmin) {
          const _id = req.body as string;
          const updatedProduct = await Product.findByIdAndDelete(_id);
          if (!updatedProduct) {
            return res.status(404).json({message: 'Product not found'});
          }
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