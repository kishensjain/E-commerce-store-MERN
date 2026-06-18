import Product from "../models/product.model.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category", "name");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name",
    );
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    let imageUrl = "";
    let imagePublicId = "";
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
      imagePublicId = result.public_id;
    } finally {
      try {
        await fs.promises.unlink(req.file.path);
      } catch (error) {
        console.error("Temp file cleanup failed:", error);
      }
    }

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      imageUrl,
      imagePublicId,
    });

    const createdProduct = await product.save();
    await createdProduct.populate("category", "name");
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name ?? product.name;
      product.description = description ?? product.description;
      product.price = price ?? product.price;
      product.category = category ?? product.category;
      product.stock = stock ?? product.stock;

      if (req.file) {
        // Delete old Cloudinary image
        await cloudinary.uploader.destroy(product.imagePublicId);

        // Upload new image
        try {
          const result = await cloudinary.uploader.upload(req.file.path);

          product.imageUrl = result.secure_url;
          product.imagePublicId = result.public_id;
        } finally {
          try {
            await fs.promises.unlink(req.file.path);
          } catch (error) {
            console.error("Temp file cleanup failed:", error);
          }
        }
      }

      const updatedProduct = await product.save();
      await updatedProduct.populate("category", "name");
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await cloudinary.uploader.destroy(product.imagePublicId);
      await product.deleteOne();

      res.json({
        message: "Product removed",
      });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
