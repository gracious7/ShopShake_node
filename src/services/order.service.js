const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItem = require("../models/orderItems.js");
const cartService=require("../services/cart.service.js")


async function createOrder(user, shippAddress) {
  const address = new Address(shippAddress);
  address.user = user;
  await address.save();

  user.addresses.push(address);
  await user.save();

  const cart = await cartService.findUserCart(user._id);
  const orderItems = [];

  for (const item of cart.cartItems) {
    const orderItem = new OrderItem({
      price: item.price,
      product: item.product,
      quantity: item.quantity,
      size: item.size,
      userId: item.userId,
      discountedPrice: item.discountedPrice,
      
    });

    const createdOrderItem = await orderItem.save();
    orderItems.push(createdOrderItem);
  }

  const createdOrder = new Order({
    user,
    orderItems,
    totalPrice: cart.totalPrice,
    totalDiscountedPrice: cart.totalDiscountedPrice,
    discounte: cart.discounte,
    totalItem: cart.totalItem,
    shippingAddress: address,
    orderDate: new Date(),
    orderStatus: 'PENDING', // Assuming OrderStatus is a string enum or a valid string value
    'paymentDetails.status': 'PENDING', // Assuming PaymentStatus is nested under 'paymentDetails'
    createdAt: new Date(),
  });

  const savedOrder = await createdOrder.save();

  // for (const item of orderItems) {
  //   item.order = savedOrder;
  //   await item.save();
  // }

  return savedOrder;
}

async function placedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = 'PLACED'; // Assuming OrderStatus is a string enum or a valid string value
  order.paymentDetails.status = 'COMPLETED'; // Assuming PaymentStatus is nested under 'paymentDetails'
  return await order.save();
}

async function confirmedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = 'CONFIRMED'; // Assuming OrderStatus is a string enum or a valid string value
  return await order.save();
}

async function shippedOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = 'SHIPPED'; // Assuming OrderStatus is a string enum or a valid string value
  return await order.save();
}

async function deliveredOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = 'DELIVERED'; // Assuming OrderStatus is a string enum or a valid string value
  return await order.save();
}

async function cancelledOrder(orderId) {
  const order = await findOrderById(orderId);
  order.orderStatus = 'CANCELLED'; // Assuming OrderStatus is a string enum or a valid string value
  return await order.save();
}

async function findOrderById(orderId) {
  const order = await Order.findById(orderId).populate("user").populate("orderItems").populate("shippingAddress");
  const orderItems=[];
  for(itemId of order.orderItems){
    const orderItem=await OrderItem.findById(itemId).populate("product");
    orderItems.push(orderItem)
  }
  if (!order) {
    throw new Error(`Order not found with id ${orderId}`);
  }
  order.orderItems=orderItems;
  return order;
}

async function usersOrderHistory(userId) {
  return await Order.find({ user: userId });
}

async function getAllOrders() {
  return await Order.find();
}

async function deleteOrder(orderId) {
  const order = await findOrderById(orderId);
  await order.remove();
}

module.exports = {
  createOrder,
  placedOrder,
  confirmedOrder,
  shippedOrder,
  deliveredOrder,
  cancelledOrder,
  findOrderById,
  usersOrderHistory,
  getAllOrders,
  deleteOrder,
};
