const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');

const { Users } = require('./../assets/data/UserSchema');
const { ContactRequests } = require('./../assets/data/Schemas');
const { contentSecurityPolicy } = require('helmet');

exports.contactToUser = async () => {
    const imin = await Users.find();
    const userArray = Array.from(imin);
    // // ListArray.sort((a, b) => (a.email > b.email) ? 1 : -1);
    // // const setList = [];
    // // ListArray.map(item => {
    // //     let found = false;
    // //     userArray.map(user => user.email===item.email?found=true:'')
    // //     if (!found&&item.email==='willowkarlene@outlook.com') {
    // //         const userAdd = {
    // //             firstname: item.firstname,
    // //             lastname: item.lastname,
    // //             email: item.email,
    // //             emailverified: false,
    // //             password: null,
    // //             newsletter: true,
    // //             distanceunit: 'miles',
    // //             currency: 'USD',
    // //             role: 'user',
    // //             agreements: null
    // //         }
    // //         console.log('userAdd', userAdd)
    // //         Users.insertMany(userAdd);
    // //     };
    // })

    // const contactListSet = new Set(contactList)
    // console.log('set', contactListSet.length)
}
