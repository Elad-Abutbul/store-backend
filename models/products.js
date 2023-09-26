// import mongoose
const db = require("mongoose");

// create a new schema for products
const productSchema = new db.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  choose: {
    type: Boolean,
  },
  type: {
    type: String,
  },
});

// create a model using the product schema
const Product = db.model("Product", productSchema);

// create some sample products using the Product model
// Product.create([
//   {
//     name: "Bracelet Shir",
//     description: "14 karat",
//     price: 1200,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/B20752W.jpg",
//     choose: false,
//     type: "bracelet",
//   },
//   {
//     name: "Bracelet Zoei",
//     description: "14 karat",
//     price: 1300,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/v1515w_optimized.jpg",
//     choose: false,
//     type: "bracelet",
//   },
//   {
//     name: "Bracelet wop",
//     description: "22 karat",
//     price: 2200,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/B22160.jpg",
//     choose: false,
//     type: "bracelet",
//   },
//   {
//     name: "Bracelet Valery",
//     description: "15 karat",
//     price: 1300,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/B21100.jpg",
//     choose: false,
//     type: "bracelet",
//   },
//   {
//     name: "Bracelet Rano",
//     description: "12 karat",
//     price: 1000,
//     image: "https://www.royalty.me/cache/w_544,h_544,mode_pad/b2249m_optimized%281%29.jpg",
//     choose: false,
//     type: "bracelet",
//   },
//   {
//     name: "Bracelet Maylee",
//     description: "17 karat",
//     price: 2250,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/B22440W.jpg",
//     choose: false,
//     type: "bracelet",
//   },{
//     name: "Bracelet Pou",
//     description: "17 karat",
//     price: 1450,
//     image: "https://www.royalty.me/cache/w_544,h_544,mode_pad/B20751.jpg",
//     choose: false,
//     type: "bracelet",
//   },
//   {
//     name: "Bracelet Bir",
//     description: "25 karat",
//     price: 4450,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/B22280.jpg",
//     choose: false,
//     type: "bracelet",
//   },
//   {
//     name: "Bracelet Loop",
//     description: "14 karat",
//     price: 1750,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/v1514w_optimized.jpg",
//     choose: false,
//     type: "bracelet",
//   },
//   {
//     name: "Bracelet Poz",
//     description: "13 karat",
//     price: 1250,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/B22600.jpg",
//     choose: false,
//     type: "bracelet",
//   },
//   {
//     name: "Ring Nona",
//     description: "32 karat",
//     price: 6500,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/r41390w_1.jpg",
//     choose: false,
//     type: "ring",
//   },
//   {
//     name: "Ring Mave",
//     description: "10 karat",
//     price: 2500,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/R41760.jpg",
//     choose: false,
//     type: "ring",
//   },

//   {
//     name: "Ring Noa",
//     description: "22 karat",
//     price: 4100,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/R41280.jpg",
//     choose: false,
//     type: "ring",
//   },
//   {
//     name: "Ring Heart",
//     description: "24 karat",
//     price: 5000,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/REL598.jpg",
//     choose: false,
//     type: "ring",
//   },
//   {
//     name: "Ring wong",
//     description: "20 karat",
//     price: 2700,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/R41740.jpg",
//     choose: false,
//     type: "ring",
//   }, {
//     name: "Ring Tal",
//     description: "15 karat",
//     price: 1700,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/R41270.jpg",
//     choose: false,
//     type: "ring",
//   },
//   {
//     name: "Ring Lir",
//     description: "17 karat",
//     price: 2500,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/R29990.jpg",
//     choose: false,
//     type: "ring",
//   },
//   {
//     name: "Ring Ana",
//     description: "14 karat",
//     price:2200,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/R42280.jpg",
//     choose: false,
//     type: "ring",
//   },
//   {
//     name: "Ring Pirana",
//     description: "22 karat",
//     price: 5500,
//     image:
//       "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-knotring-69526438_1029093_AV_1.jpg?&op_usm=1.75,1.0,6.0&defaultImage=NoImageAvailableInternal&&defaultImage=NoImageAvailableInternal&fmt=webp",
//     choose: false,
//     type: "ring",
//   },  {
//     name: "Necklace Sow",
//     description: "12 karat",
//     price: 400,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/AE613P.jpg",
//     choose: false,
//     type: "necklace",
//   },

//   {
//     name: "Necklace Pandor",
//     description: "14 karat",
//     price: 1850,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/P22860W.jpg",
//     choose: false,
//     type: "necklace",
//   },
//   {
//     name: "Necklace Eye",
//     description: "10 karat",
//     price: 850,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/P2983S.jpg",
//     choose: false,
//     type: "necklace",
//   },
//   {
//     name: "Necklace Tal",
//     description: "10 karat",
//     price: 850,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/P23070.jpg",
//     choose: false,
//     type: "necklace",
//   },
//   {
//     name: "Necklace Noa",
//     description: "15 karat",
//     price: 1550,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/P23840W%282%29.jpg",
//     choose: false,
//     type: "necklace",
//   },
//   {
//     name: "Necklace Ron",
//     description: "13 karat",
//     price: 1350,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/V2990P.jpg",
//     choose: false,
//     type: "necklace",
//   },
//   {
//     name: "Necklace Two",
//     description: "20 karat",
//     price: 2000,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/PD0029.jpg",
//     choose: false,
//     type: "necklace",
//   },
//   {
//     name: "Necklace Gift",
//     description: "17 karat",
//     price: 1890,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/V1019W.jpg",
//     choose: false,
//     type: "necklace",
//   },
//   {
//     name: "Necklace Infinity",
//     description: "17 karat",
//     price: 1500,
//     image: "https://d34qiagx43sg99.cloudfront.net/1725394-1490.webp",
//     choose: false,
//     type: "necklace",
//   },
//   {
//     name: "Necklace Pirana",
//     description: "10 karat",
//     price: 350,
//     image: "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-knotpendant-69525865_1055254_AV_2.jpg?&op_usm=1.0,1.0,6.0&defaultImage=NoImageAvailableInternal&&defaultImage=NoImageAvailableInternal&fmt=webp",
//     choose: false,
//     type: "necklace",
//   },
//   {
//     name: "Earring Kori",
//     description: "24 karat",
//     price: 1700,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/AE743E.jpg",
//     choose: false,
//     type: "earring",
//   },
//   {
//     name: "Earring Spiral",
//     description: "14 karat",
//     price: 1000,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/AE772E.jpg",
//     choose: false,
//     type: "earring",
//   },
//   {
//     name: "Earring Star",
//     description: "12 karat",
//     price: 800,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/AE768E.jpg",
//     choose: false,
//     type: "earring",
//   },
//   {
//     name: "Earring Suno",
//     description: "12 karat",
//     price: 800,
//     image: "https://www.royalty.me/cache/w_600,h_600,mode_pad/E20040.jpg",
//     choose: false,
//     type: "earring",
//   },
//   {
//     name: "Earring Tal",
//     description: "16 karat",
//     price: 1500,
//     image:
//       "https://www.royalty.me/cache/w_600,h_600,mode_pad/E22410.jpg",
//     choose: false,
//     type:'earring'
//   },
//   {
//     name: "Earring Dian",
//     description: "24 karat",
//     price: 1200,
//     image:
//       "https://media.tiffany.com/is/image/Tiffany/EcomItemL2/tiffany-solitaire-diamond-stud-earrings-14041419_1031002_ED.jpg?&op_usm=2.0,1.0,6.0&$cropN=0.1,0.1,0.8,0.8&defaultImage=NoImageAvailableInternal&&defaultImage=NoImageAvailableInternal&fmt=webp",
//     choose: false,
//     type:'earring'
//   }, {
//     name: "Earring Shira",
//     description: "34 karat",
//     price: 4200,
//     image:
//       "https://www.royalty.me/cache/w_600,h_600,mode_pad/E24410.jpg",
//     choose: false,
//     type:'earring'
//   }, {
//     name: "Earring Mudi",
//     description: "22 karat",
//     price: 2200,
//     image:
//       "https://www.royalty.me/cache/w_600,h_600,mode_pad/E41280.jpg",
//     choose: false,
//     type:'earring'
//   },
//   {
//     name: "Earring Or ",
//     description: "25 karat",
//     price: 2500,
//     image:
//       "https://www.royalty.me/cache/w_600,h_600,mode_pad/E23450W.jpg",
//     choose: false,
//     type:'earring'
//   },{
//     name: "Earring Leaves ",
//     description: "25 karat",
//     price: 4200,
//     image:
//       "https://www.royalty.me/cache/w_600,h_600,mode_pad/E23440.jpg",
//     choose: false,
//     type:'earring'
//   },
// ]);

// export the Product model
module.exports = Product;
