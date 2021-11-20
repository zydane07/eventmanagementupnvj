/* 

Social Share Links:

WhatsApp:
https://wa.me/?text=[post-title] [post-url]

Facebook:
https://www.facebook.com/sharer.php?u=[post-url]

Twitter:
https://twitter.com/share?url=[post-url]&text=[post-title]

Pinterest:
https://pinterest.com/pin/create/bookmarklet/?media=[post-img]&url=[post-url]&is_video=[is_video]&description=[post-title]

LinkedIn:
https://www.linkedin.com/shareArticle?url=[post-url]&title=[post-title]

*/

const facebookBtn = document.querySelector(".facebook-btn");
const twitterBtn = document.querySelector(".twitter-btn");
// const pinterestBtn = document.querySelector(".pinterest-btn");
// const linkedinBtn = document.querySelector(".linkedin-btn");
const whatsappBtn = document.querySelector(".whatsapp-btn");
let postUrl = encodeURI(document.location.href);
let postTitle = encodeURI("Hi everyone, please check this out: ");

var params = "menubar=no,toolbar=no,status=no,width=570,height=570"; // for window

facebookBtn.addEventListener("click", function (ev) {
    console.log("hi");

    let shareUrl = `https://www.facebook.com/sharer.php?u=${postUrl}`;
    window.open(shareUrl, "NewWindow", params);
});

twitterBtn.addEventListener("click", function (ev) {
    let shareUrl = `https://twitter.com/share?url=${postUrl}&text=${postTitle}`;
    window.open(shareUrl, "NewWindow", params);
});

// linkedinBtn.addEventListener("click", function (ev) {
//     let shareUrl = `https://www.linkedin.com/shareArticle?url=${postUrl}`;
//     window.open(shareUrl, "NewWindow", params);
// });
whatsappBtn.addEventListener("click", function (ev) {
    let shareUrl = `https://wa.me/?text=${postTitle} ${postUrl}`;
    window.open(shareUrl, "NewWindow", params);
});
