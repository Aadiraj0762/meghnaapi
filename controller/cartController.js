const Product = require("../models/Product"); // Import the Product model
const CartItem = require("../models/CartItem");
// const addItemToCart = async (req, res, next) => {
//   const { productId, quantity } = req.body;
//   try {
//     // Fetch the product details based on the productId
//     const product = await Product.findOne({ productId }); // Assuming Mongoose model is used
//     if (!product) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Product not found" });
//     }
//     const { title, name } = product;
//     // Check if the cart item with the same productId already exists
//     let existingCartItem = await CartItem.findOne({ productId });
//     let countDiff = 0;
//     if (existingCartItem) {
//       // If the cart item exists, update the quantity and calculate the count difference
//       countDiff = quantity - existingCartItem.quantity;
//       existingCartItem.quantity = quantity;
//       await existingCartItem.save();
//     } else {
//       // Otherwise, create a new cart item
//       existingCartItem = new CartItem({ productId, title, name, quantity });
//       await existingCartItem.save();
//       countDiff = quantity; // The count is incrementing since a new item is added
//     }
//     res.status(201).json({
//       success: true,
//       message: countDiff > 0 ?
//         `Item added to cart (${countDiff} items added)` :
//         `Item quantity updated in cart (${Math.abs(countDiff)} items ${
//           countDiff < 0 ? "removed" : "added"
//         })`,
//       cartItem: existingCartItem,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const addItemToCart = async (req, res, next) => {
  const { productId, quantity } = req.body;
  try {
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const { title, name } = product;

    let existingCartItem = await CartItem.findOne({ productId });
    let message;
    let cartItem;

    if (existingCartItem) {
      if (quantity === 0) {
        // If quantity is zero, remove the cart item
        await existingCartItem.remove();
        message = "Item removed from cart";
      } else {
        // Update quantity and calculate count difference
        const countDiff = quantity - existingCartItem.quantity;
        existingCartItem.quantity = quantity;
        await existingCartItem.save();
        
        message = `Item quantity updated in cart (${Math.abs(countDiff)} items ${countDiff < 0 ? "removed" : "added"})`;
      }
    } else {
      if (quantity > 0) {
        // Create a new cart item only if quantity is positive
        existingCartItem = new CartItem({ productId, title, name, quantity });
        await existingCartItem.save();
        
        message = `Item added to cart (${quantity} items added)`;
      } else {
        message = "Invalid quantity provided";
      }
    }

    res.status(201).json({
      success: true,
      message,
      cartItem: existingCartItem,
    });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  try {
    await CartItem.findByIdAndUpdate(itemId, { quantity });
    res.json({ success: true, message: "Cart item updated successfully" });
  } catch (error) {
    next(error);
  }
};
const deleteCartItem = async (req, res, next) => {
  const { itemId } = req.params;
  try {
    await CartItem.findByIdAndDelete(itemId);
    res.json({ success: true, message: "Cart item deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// Controller function to delete all cart items
const deleteAllCartItems = async (req, res, next) => {
  try {
    const cartItemsCount = await CartItem.countDocuments();
    if (cartItemsCount === 0) {
      return res.status(404).json({ success: false, message: "Cart is already empty" });
    }
    // Deleting all cart items if items exist
    await CartItem.deleteMany({});
    res.json({ success: true, message: "All cart items deleted successfully" });
  } catch (error) {
    next(error);
  }
};
// const getCartDetails = async (req, res, next) => {
//   try {
//     const cartItems = await CartItem.find();
//     const cartItemsWithProductNames = await Promise.all(cartItems.map(async (cartItem) => {
//       const product = await Product.findOne({ productId: cartItem.productId });
//       if (product) {
//         cartItem.title = product.title; // assuming 'title' is the field in Product model representing the name
//         cartItem.name = product.name;   // assuming 'name' is the field in Product model representing the name
//       }
//       return cartItem;
//     }));
//     res.json({ success: true, data: cartItemsWithProductNames });
//   } catch (error) {
//     next(error);
//   }
// };
const getCartDetails = async (req, res, next) => {
  try {
    const cartItems = await CartItem.find();
    const cartItemsWithProductNames = await Promise.all(cartItems.map(async (cartItem) => {
      const product = await Product.findOne({ productId: cartItem.productId });
      if (product) {
        cartItem.title = product.title; // assuming 'title' is the field in Product model representing the name
        cartItem.name = product.name;   // assuming 'name' is the field in Product model representing the name
      }
      return cartItem;
    }));

    // Calculate the total count of cart items
    const totalCount = cartItemsWithProductNames.reduce((acc, cur) => acc + cur.quantity, 0);

    res.json({
      success: true,
      data: cartItemsWithProductNames,
      totalCount: totalCount
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  deleteAllCartItems,
  getCartDetails,
};
