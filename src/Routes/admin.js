const express = require("express");
const adminController = require("../Controller/adminController");
const router = express.Router();

router.get("/login-admin", (req, res) => {
    res.render("login-admin", {
        layout: "layouts/loginadmin-layout",
        css: "login",
        title: "login admin",
    });
});

router.get("/dashboard-admin", (req, res) => {
    res.render("dashboard-admin", {
        layout: "layouts/dashboardadmin-layout",
        css: "admin",
        title: "dashboard admin",
    });
});

router.get("/pengguna-mahasiswa", (req, res) => {
    res.render("penggunaMahasiswa", {
        layout: "layouts/penggunaMahasiswa-layout",
        css: "admin",
        title: "Pengguna Mahasiswa",
    });
});

router.get("/pengguna-Ormawa", (req, res) => {
    res.render("penggunaOrmawa", {
        layout: "layouts/penggunaMahasiswa-layout",
        css: "admin",
        title: "Pengguna Mahasiswa",
    });
});

router.get("/event", (req, res) => {
    res.render("event-admin", {
        layout: "layouts/eventAdmin-layout",
        css: "admin",
        title: "Event",
    });
});

router.get("/event-details", (req, res) => {
    res.render("eventDetails-admin", {
        layout: "layouts/eventAdmin-layout",
        css: "admin",
        title: "Event Details",
    });
});

router.get("/lp-management", (req, res) => {
    res.render("lpManagemenet-admin", {
        layout: "layouts/eventAdmin-layout",
        css: "admin",
        title: "Landing Page Management",
    });
});

router.get("/tambah-ormawa", (req, res) => {
    res.render("tambahOrmawa-admin", {
        layout: "layouts/eventAdmin-layout",
        css: "admin",
        title: "Tambah Ormawa",
    });
});

router.post("/create", adminController.register);

module.exports = router;
