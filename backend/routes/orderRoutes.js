import express from "express";
import { updateOrderToPaid, addOrderItems, getOrderbyId, getMyOrders, getOrders, updateOrderToDelivered } from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";


const router = express.Router();
router.use(express.json());

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
router.route('/:id').get(protect, getOrderbyId)
router.route('/myorder').get(protect, getMyOrders)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)



export default router;
