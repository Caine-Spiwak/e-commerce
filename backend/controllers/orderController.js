import asyncHandler from "../middleware/asyncHandler.js"
import Order from '../models/orderModel.js'



// @desc    Create new Order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body 

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No Order Items')
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save();

    res.status(201).json(createdOrder)
  }
})

// @desc    Get User's Orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({user: req.user._id})

  res.status(200).json(orders)
})

// @desc    Get Order By Id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('User', 'name email')

  if (order) {
    res.status(200).json(order)
  } else {
    res.status(404);
    throw new Error('Order Not Found')
  }
})

// @desc    Update Order To Paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('Update Order To Paid')
})

// @desc    Update Order To Delivered
// @route   GET /api/orders/:id/deliver
// @access  Private / Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('Update Order To Delivered')
})

// @desc    Get ALL Orders
// @route   GET /api/orders
// @access  Private / Admin
const getOrders = asyncHandler(async (req, res) => {
  res.send('get all orders')
})

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrders
}