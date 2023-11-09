import { Request, Response } from "express";
import { ProductModel } from "../models/product";
import { UserModel } from "../models/user";
import { ProductErrors, UserErrors } from "../errors";
import mongoose from "mongoose";

export const getProducts = async (_, res: Response) => {
  try {
    const products = await ProductModel.find({});
    res.status(200).json({ products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product = req.body;
  const newProduct = new ProductModel(product);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const checkout = async (req: Request, res: Response) => {
  const { customerID, cartItems } = req.body;

  try {
    const user = await UserModel.findById(customerID);
    const productsIDs = Object.keys(cartItems);
    const products = await ProductModel.find({ _id: { $in: productsIDs } });

    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    if (products.length !== productsIDs.length) {
      return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
    }

    let totalPrice = 0;
    for (const item in cartItems) {
      const product = products.find((product) => String(product._id) === item);

      if (!product) {
        return res.status(400).json({ type: ProductErrors.NO_PRODUCT_FOUND });
      }

      if (product.stockQuantity < cartItems[item]) {
        return res.status(400).json({ type: ProductErrors.NOT_ENOUGH_STOCK });
      }

      totalPrice += product.price * cartItems[item];
    }

    if (user.availableMoney < totalPrice) {
      return res.status(400).json({ type: ProductErrors.NO_AVAILABLE_MONEY });
    }

    user.availableMoney -= totalPrice;
    user.purchasedItems.push(...productsIDs);

    await user.save();
    await ProductModel.updateMany(
      { _id: { $in: productsIDs } },
      { $inc: { stockQuantity: -1 } }
    );

    res.json({ purchasedItems: user.purchasedItems });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const purchasedItemsOfACustomer = async (
  req: Request,
  res: Response
) => {
  const { customerID } = req.params;

  try {
    const user = await UserModel.findById(customerID);
    if (!user) {
      res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    }

    const products = await ProductModel.find({
      _id: { $in: user.purchasedItems },
    });

    res.json({ purchasedItems: products });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { productID } = req.params;
  const { productName, price, descripton, imageURL, stockQuantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return res
      .status(404)
      .json({ error: `No product found with id: ${productID}` });
  }

  const updateProduct = {
    productName,
    price,
    descripton,
    imageURL,
    stockQuantity,
    _id: productID,
  };

  await ProductModel.findByIdAndUpdate(productID, updateProduct, { new: true });

  res.json(updateProduct);
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { productID } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productID)) {
    return res
      .status(404)
      .json({ error: `No product found with id: ${productID}` });
  }

  await ProductModel.findByIdAndRemove(productID);

  res.json({ message: "Product deleted successfully." });
};
