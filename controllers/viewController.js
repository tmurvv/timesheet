// const BookingItems = require('../models/bookingItemModel');
// const User = require('./../models/userModel');
// const CompanyProfile = require('./../models/companyProfileModel');
// const catchAsync = require('../utils/catchAsync');
const usedHarps = require('../pl-scraper');

//NOT YET IMPLEMENTED refactor day, week month views to calendar data
exports.getUsedHarp = async (req, res) => {
    // send results
    res.status(200).json({
        //Does not work
        // title: 'OneStopHarpShop | Used Harps',
        // status: 'success',
        // data: usedHarps
        seller: "Tisha Murvihill",
        sellerCountry: "Canada",
        harpTitle: 'Sierra 36 by Triplett',
        harpShortDesc: 'Purchased 2011 Maple',
        harpPrice: '$4600',
        harpLongDesc: 'Excellent condition, lightly used, beautiful Triplett sound. This one is a winner!',
        harpPhotoUrl: 'photo goes here'
    });


    // //1) get booking data
    // const bookingItems = await BookingItems.find()
    //     .populate('rentalRoom')
    //     .populate({
    //         path: 'invoiceNumber',
    //         populate: { path: 'customer' }
    //     });
    // const companyProfile = await CompanyProfile.findOne();
    //2) Render it with tour data
    // res.status(200).render('dayCalendar', {
    //     title: 'OneStopHarpShop | Used Harps',
    //     bookingItems,
    //     bookingItemsJSON: JSON.stringify(bookingItems),
    //     daysInAdvance: companyProfile.daysInAdvance,
    //     companyProfile: JSON.stringify(companyProfile)
    // });
};
// exports.getWeekCalendar = catchAsync(async (req, res) => {
//     // 1) get booking data
//     const bookingItems = await BookingItems.find()
//         .populate('rentalRoom')
//         .populate({
//             path: 'invoiceNumber',
//             populate: { path: 'customer' }
//         });
//     const companyProfile = await CompanyProfile.findOne();
//     //2) Render it with tour data
//     res.status(200).render('weekCalendar', {
//         title: 'VCScheduler | Week Calendar',
//         bookingItems,
//         bookingItemsJSON: JSON.stringify(bookingItems),
//         daysInAdvance: companyProfile.daysInAdvance,
//         companyProfile: JSON.stringify(companyProfile)
//     });
// });
// exports.getMonthCalendar = catchAsync(async (req, res) => {
//     // 1) get booking data
//     const bookingItems = await BookingItems.find()
//         .populate('rentalRoom')
//         .populate({
//             path: 'invoiceNumber',
//             populate: { path: 'customer' }
//         });
//     const companyProfile = await CompanyProfile.findOne();
//     //2) Render it with tour data
//     res.status(200).render('monthCalendar', {
//         title: 'VCScheduler | Month Calendar',
//         bookingItems,
//         bookingItemsJSON: JSON.stringify(bookingItems),
//         daysInAdvance: companyProfile.daysInAdvance,
//         companyProfile: JSON.stringify(companyProfile)
//     });
// });
// exports.getYearCalendar = (req, res) => {
//     res.status(200).render('yearCalendar', {
//         title: 'VCScheduler | Year Calendar'
//     });
// };
// exports.viewRooms = (req, res) => {
//     res.status(200).render('viewRooms', {
//         title: 'VCScheduler | View Rooms'
//     });
// };
// exports.bookRooms = (req, res) => {
//     res.status(200).render('bookRooms', {
//         title: 'VCScheduler | Book Rooms'
//     });
// };
// exports.about = (req, res) => {
//     res.status(200).render('about', {
//         title: 'VCScheduler | About'
//     });
// };
// exports.contact = (req, res) => {
//     res.status(200).render('contact', {
//         title: 'VCScheduler | Contact'
//     });
// };
// exports.login = (req, res) => {
//     res.status(200).render('login', {
//         title: 'VCScheduler | Login'
//     });
// };
// exports.signup = (req, res) => {
//     res.status(200).render('signup', {
//         title: 'VCScheduler | Signup'
//     });
// };
// exports.admin = async (req, res) => {
//     // 1) get users
//     const users = await User.find();

//     // 2) get booking data
//     const bookingItems = await BookingItems.find()
//         .populate('rentalRoom')
//         .populate({
//             path: 'invoiceNumber',
//             populate: { path: 'customer' }
//         });
//     // 3) get company profile data
//     const companyProfile = await CompanyProfile.findOne();
//     // 3) Render it with booking data
//     res.status(200).render('admin', {
//         title: 'VCScheduler | Admin',
//         usersJSON: JSON.stringify(users),
//         names: users.fullName,
//         namesJSON: JSON.stringify(users.fullName),
//         bookingItems,
//         bookingItemsJSON: JSON.stringify(bookingItems),
//         daysInAdvance: companyProfile.daysInAdvance,
//         companyProfile: JSON.stringify(companyProfile)
//     });
// };
// exports.userProfile = (req, res) => {
//     res.status(200).render('userProfile', {
//         title: 'VCScheduler | User Profile'
//     });
// };
// exports.myBookings = (req, res) => {
//     res.status(200).render('myBookings', {
//         title: 'VCScheduler | My Bookings'
//     });
// };
// exports.resetPassword = (req, res) => {
//     res.status(200).render('resetPassword', {
//         title: 'VCScheduler | Reset Password'
//     });
// };
// exports.bookingStats = (req, res) => {
//     res.status(200).render('reports/bookingStats', {
//         title: 'VCScheduler | Booking Stats'
//     });
// };
