const {
  getAllCustomer,
  getAllShipper,
  lockUser,
  getAllOrder,
  unLockUser,
  createCommodities,
  updateCommodities,
  deleteCommodities,
  editReport,
  getAllReport,
  getUserReport,
  getReportId,
} = require("../controllers/admin");
const { verifyTokenAdmin } = require("../middleware/middleware");

const router = require("express").Router();
// in dach sach cac customer
router.get("/getallc", getAllCustomer);
// in danh sach cac shipper
router.get("/getalls", getAllShipper);
// in danh sach cac don hang
router.get("/getallorder", getAllOrder);
// khoa tai khoan
router.put("/lockuser/:id", verifyTokenAdmin, lockUser);
// mo khoa tai khoan
router.put("/unlockuser/:id", verifyTokenAdmin, unLockUser);
// them mot loai hang moi
router.post("/addcommodities", createCommodities);
// update mot loai hang
router.put("/updatecommodities/:id", updateCommodities);
// xoa mot loai hang hoa
router.delete("/delete/:id", deleteCommodities);
// xac nhan report
router.post("/report/:id", editReport);
// get user report
router.get("/getuserreport", getUserReport);
// get all report
router.get("/getreportid/:id", getReportId);

module.exports = router;
