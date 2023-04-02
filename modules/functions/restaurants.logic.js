
var chance = require('chance').Chance();
var { faker } = require('@faker-js/faker');
const RestaurantsNameList = require('../data/RestaurantsNameList.json');
const CuisinesNameList = require('../data/CuisinesNameList.json');


let RestaurantsDB = [];


exports.getRestaurantsList = (skip = 0, take = 10) => {
    if (RestaurantsDB.length === 0) {
        /* initlization of all restaurants */
        return new Promise(async (res, rej) => {
            await InitialiseRestaurantsDB();
        res(PaginationWrapper(RestaurantsDB.slice(skip, take),RestaurantsDB.length));
  });
    } else {
        return Promise.resolve(PaginationWrapper(RestaurantsDB.slice(skip, take),RestaurantsDB.length))
    }
};

const InitialiseRestaurantsDB = async () => {
    return new Promise(async (res,rej) => {
         let tmpRestaurantsList = [];
            /* here are 33 restaurants that will be generated */
        for (let i = 0; i < 143; i++){
            tmpRestaurantsList.push(await NewRestaurant());  
        }
        RestaurantsDB = tmpRestaurantsList;
        res(tmpRestaurantsList);
    })
}

const NewRestaurant = () => {
    return new Promise((res, rej) => {
        let tmpRestaurant = {
            id: chance.guid({ version: 5 }),
            restaurantName:faker.helpers.arrayElement(RestaurantsNameList),
            companyName: chance.company(),
            cuisine: faker.helpers.arrayElements(CuisinesNameList,chance.integer({min:1,max:5})),
            phone:faker.phone.number('+48 91 ### ## ##')
        };
        tmpRestaurant.email = chance.email({ domain: `${tmpRestaurant.companyName.replace(' ','')}.com` });
        res(tmpRestaurant)
    })
}

const PaginationWrapper = (array, totalCount) => {
    return {
        array,
        count:array.length,
        totalCount:Number(totalCount)
    }
}