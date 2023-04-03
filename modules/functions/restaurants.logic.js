/** @format */

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
      res(PaginationWrapper(RestaurantsDB.slice(skip, take), RestaurantsDB.length));
    });
  } else {
    return Promise.resolve(PaginationWrapper(RestaurantsDB.slice(skip, take), RestaurantsDB.length));
  }
};

const InitialiseRestaurantsDB = async () => {
  return new Promise(async (res, rej) => {
    let tmpRestaurantsList = [];
    /* here are 33 restaurants that will be generated */
    for (let i = 0; i < 143; i++) {
      tmpRestaurantsList.push(await NewRestaurant());
    }
    RestaurantsDB = tmpRestaurantsList;
    res(tmpRestaurantsList);
  });
};

const NewRestaurant = () => {
  return new Promise((res, rej) => {
    let tmpRestaurant = {
      id: chance.guid({ version: 5 }),
      restaurantName: faker.helpers.arrayElement(RestaurantsNameList),
      companyName: chance.company(),
      cuisine: faker.helpers.arrayElements(CuisinesNameList, chance.integer({ min: 1, max: 5 })),
      phone: faker.phone.number('+48 91 ### ## ##'),
      priceRange: [faker.commerce.price(20, 100, 2, '$'), faker.commerce.price(100, 200, 0, '$')],
      geolocation: NewGeoLocation(),
      open: NewOpenTime(),
    };
    /* generating new sideProducts */
    const sideProducts = Array.apply(null, Array(chance.integer({ min: 0, max: 6 }))).map(NewSideProduct);
    tmpRestaurant.sideProducts = sideProducts;

    tmpRestaurant.email = chance.email({ domain: `${tmpRestaurant.companyName.replace(/[^\w\s]/gi, '')}.com` });
    res(tmpRestaurant);
  });
};

const NewSideProduct = () => {
  return {
    name: faker.commerce.product(),
    material: faker.commerce.productMaterial(),
    description: faker.commerce.productDescription(),
    adjectives: faker.commerce.productAdjective(),
    color: faker.color.human(),
  };
};

const NewGeoLocation = () => {
  return {
    country: faker.address.country(),
    city: faker.address.cityName(),
    address: faker.address.streetAddress(true),
  };
};

const NewOpenTime = () => {
  let workHours = [chance.integer({ min: 6, max: 12 }), chance.integer({ min: 12, max: 24 })].sort((a, b) => a - b);
  return {
    closedDay: chance.weekday(),
    workHours,
  };
};

const PaginationWrapper = (array, totalCount) => {
  return {
    array,
    count: array.length,
    totalCount: Number(totalCount),
  };
};
