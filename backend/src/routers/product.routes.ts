import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { isAdmin, isAuth } from '../utils';
import { Product, ProductModel } from '../models/product.model';
import { products, users } from '../sample-data';

export const productRouter = express.Router();

productRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const name = (req.query.name || '') as string;
    const category = (req.query.category || '') as string;
    const order = (req.query.order || '') as string;
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const products = await ProductModel.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    }).sort(sortOrder);
    res.send(products);
  })
);

productRouter.get(
  '/paged',
  asyncHandler(async (req: Request, res: Response) => {
    const pageSize = 3;
    const page = Number(req.query.pageNumber) || 1;
    const name = (req.query.name || '') as string;
    const category = (req.query.category || '') as string;
    const order = (req.query.order || '') as string;
    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;

    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};
    const categoryFilter = category ? { category } : {};
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };
    const count = await ProductModel.count({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    const products = await ProductModel.find({
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({ products, page, pages: Math.ceil(count / pageSize) });
  })
);

productRouter.get(
  '/categories',
  asyncHandler(async (req: Request, res: Response) => {
    const categories = await ProductModel.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/seed',
  asyncHandler(async (req: Request, res: Response) => {
    // await UserModel.remove();
    // await ProductModel.remove();
    const createdUsers = await UserModel.insertMany(users);
    const createdProducts = await ProductModel.insertMany(products);
    res.send({ createdUsers, createdProducts });
  })
);

productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.create({
      name: 'sample name ' + Date.now(),
      image: '../assets/images/p1.jpg',
      price: 0,
      slug: 'sample-slug-' + Date.now(),
      category: 'sample category',
      brand: 'sample brand',
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: 'sample description',
    } as Product);

    const createdProduct = await product.save();
    res.send(createdProduct);
  })
);
productRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  asyncHandler(async (req: Request, res: Response) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.post(
  '/:id/reviews',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: 'You already submitted a review' });
      }
      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      console.log(product.reviews);
      const updatedProduct = await product.save();
      res.status(201).send({
        message: 'Review Created',
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
