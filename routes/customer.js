const { createCustomer, updateCustomer, seeStatus, findOrder, updateCustomerSender, getAllCommodities, createReport, editReport, deleteReport, getAllReport } = require("../controllers/customer");
const { createOrder, getAllOrder, editOrderF, getAllOrderF, deleteOrder } = require("../controllers/order");

const router = require("express").Router();
const {verifyToken} = require("../middleware/middleware")
//tao thong tin tai khoan 8
router.post('/create',verifyToken,createCustomer)/
// cap nhat thong tin Customer 9
router.put('/update/:id',updateCustomer)
//xem trang thai don hang 6
router.get('/getstatus/:id',seeStatus)
// tim kiem don hang 4
router.get('/getorder/:id',findOrder)
//tao don hang moi 2
router.post('/createorder',verifyToken,createOrder)
// xem danh sach cac don hang chua nhan
router.get('/getall',verifyToken,getAllOrder)
// xem danh sach cac don hang chua duoc giao 
router.get('/getallf',verifyToken,getAllOrderF)
// xoa mot don hang 5
router.delete('/delete/:id',deleteOrder)
// chinh sua don hang chua duoc giao 3
router.put('/updateOrder/:id',editOrderF)
// add dia chi lay jhang va sdt
router.put('/updateOrderSender/:id',updateCustomerSender);
// lay ra danh sach cac loai hang hoa
router.get('/getallcommodities',getAllCommodities);
// tao mot report 
router.post('/createreport',verifyToken,createReport);
// update report
router.put('/updatereport/:id',verifyToken,editReport);
// delete report 
router.delete('/deletereport/:id',verifyToken,deleteReport);
// lay danh sach cac report
router.get('/getallreport',verifyToken,getAllReport);


module.exports = router;