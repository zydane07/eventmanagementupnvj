/**
 * @global
 * @description Updating rules for Content-Security-Policy
 */
let sources = {
    "default-src": ["'self'"],
    "script-src": [
        "'self'",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.js",
        "https://code.jquery.com/jquery-3.5.1.js",
        "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote.min.js",
        "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
        "https://cdn.datatables.net/1.11.3/js/jquery.dataTables.min.js",
        "'unsafe-hashes'",
        "'unsafe-inline'",
    ],
    "frame-src": ["https://someexternalframesource.com"],
    "img-src": ["'self'", "https://www.upnvj.ac.id/id/files/large/09d66b5fab4ed182e93ae8bb276692c1.html", "data:", "https://cdn.datatables.net/1.11.3/images/sort_both.png", "https://cdn.datatables.net/1.11.3/images/sort_asc.png"],
    "style-src": ["'self'", "https:", "'unsafe-inline'"],
    "font-src": ["'self'", "https:"],
    "connect-src": ["'self'"],
};

let csp = Object.keys(sources).map(function (key) {
    return `${key} ${sources[key].join(" ")};`;
});

exports.csp = (req, res, next) => {
    res.setHeader("Content-Security-Policy", csp.join(" "));
    next();
};
