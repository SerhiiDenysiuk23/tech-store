import {NextApiRequest, NextApiResponse} from "next";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Product from "@/models/Product";
import Brand from "@/models/Brand";

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
        const brands = await Brand.find({ name: { $ne: 'No brand' } });
        return res.status(200).json({brands});

      }
      case "POST": {

        if (user && user.isAdmin) {
          const name = req.body;
          const newBrand = new Brand({name});
          await newBrand.save();
          return res.status(201).json({brand: newBrand});
        } else {
          return res.status(403).json({message: 'User have not permission'});
        }

      }


      case "PUT": {
        if (user && user.isAdmin) {
          const {_id, name} = req.body;
          const updatedBrand = await Brand.findByIdAndUpdate(_id, {name}, {new: true});
          if (!updatedBrand) {
            return res.status(404).json({message: 'Product not found'});
          }
          return res.status(200).json({brand: updatedBrand});
        } else {
          return res.status(403).json({message: 'User have not permission'});
        }
      }
      case "DELETE": {
        if (user && user.isAdmin) {
          const _id = req.body as string;

          const updatedBrand = await Brand.findByIdAndDelete(_id);
          if (!updatedBrand) {
            return res.status(404).json({message: 'Brand not found'});
          }

          let noBrand = await Brand.findOne({ name: 'No brand' });
          if (!noBrand) {
            noBrand = new Brand({ name: 'No brand' });
            await noBrand.save();
          }
          await Product.updateMany({ brand: _id }, { brand: noBrand._id });

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