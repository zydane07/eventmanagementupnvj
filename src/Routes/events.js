const express = require("express");
const eventController = require("../Controller/eventController");
const Identifikasi = require("./autentik");
const checkRole = require("./checkAccessType");
const checkRoleMhs = require("./checkAccessTypeMhs");
const Auth = require("./verifyToken");
const router = express.Router();

router.get("/tentang", (req, res) => {
    res.render("about", {
        layout: "layouts/about-layout",
        title: "Tentang Aplikasi",
        css: "styleHome",
    });
});

/**
 * @route /api/events
 */

router.get("/", Identifikasi, checkRoleMhs, eventController.getEvents);
router.get("/detail/:id_event", Identifikasi, checkRoleMhs, eventController.getEventsDetails);
router.post("/detail/:id_event", Auth, checkRoleMhs, eventController.daftarEvent);
router.post("/detail/:id_event/saved", Auth, checkRoleMhs, eventController.wishlistEvent);
router.delete("/detail/:id_event/saved", Auth, checkRoleMhs, eventController.wishlistDeleteEvent);
router.get("/search", Identifikasi, checkRoleMhs, eventController.getEventsSearch);
router.get("/:id_ormawa/events", Identifikasi, checkRoleMhs, eventController.getEventsOrmawa);
module.exports = router;
