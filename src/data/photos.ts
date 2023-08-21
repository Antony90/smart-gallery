/**
 * Test data
 */

import { PhotosMap } from "../models/Photo";

const createdAt = new Date().toISOString();

export const photosArr = [
  {
    src: "https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_640.jpg",
    name: "Lake storm",
    tags: ["Lake", "Forest"],
    createdAt, width: 640, height: 360
  },
  {
    src: "https://cdn.britannica.com/11/215011-050-3127A07E/American-actor-Keanu-Reeves-2014.jpg",
    name: "Keanu 1",
    tags: ["Portrait"],
    createdAt, width: 1056, height: 1456
  },
  {
    src: "https://cdn.vox-cdn.com/thumbor/ZT2UlNBiqCKJwFTxBdjazZ9Y-r4=/0x0:1920x1080/2000x1333/filters:focal(960x540:961x541)/cdn.vox-cdn.com/uploads/chorus_asset/file/23263763/ELDENRING_21_25120461292d8e6256c8.10110654.jpg",
    name: "Elden Dragon",
    tags: ["Sky", "Animals", "Nature"],
    createdAt, width: 1920, height: 1080
  },
  {
    src: "https://c4.wallpaperflare.com/wallpaper/644/921/196/elden-ring-from-software-artwork-hd-wallpaper-preview.jpg",
    name: "Elden Lord",
    tags: ["Warrior", "Animal", "Portrait"],
    createdAt, width: 728, height: 1020
  },
  {
    src: "https://assetsio.reedpopcdn.com/elden-ring-bosses-in-order-main-mandatory-8042-1647011924713.jpg",
    name: "Giant Golem",
    tags: ["Nature", "Forest"],
    createdAt, width: 1600, height: 900
  },
  {
    src: "https://akm-img-a-in.tosshub.com/businesstoday/images/story/202308/elon-11-sixteen_nine.jpg?size=948:533",
    name: "Musk twitter",
    tags: ["Portrait"],
    createdAt, width: 948, height: 533
  },
  {
    src: "https://imageio.forbes.com/specials-images/imageserve/5c76b7d331358e35dd2773a9/0x0.jpg?format=jpg&crop=4401,4401,x0,y0,safe&height=416&width=416&fit=bounds",
    name: "Mark 1",
    tags: ["Portrait"],
    createdAt, width: 416, height: 416
  },
  {
    src: "https://variety.com/wp-content/uploads/2020/04/Dwayne-Johnson.jpg?w=1000",
    name: "Rock 2",
    tags: ["Portrait"],
    createdAt, width: 1000, height: 563
  },
  {
    src: "https://i2-prod.dailystar.co.uk/incoming/article30670075.ece/ALTERNATES/s615/4_Facebook-CEO-Mark-Zuckerberg-And-News-Corp-CEO-Robert-Thomson-Debut-Facebook-News.jpg",
    name: "Mark 2",
    tags: ["Portrait"],
    createdAt, width: 615, height: 409
  },
  {
    src: "https://static01.nyt.com/images/2023/03/29/multimedia/29musk-ai1-bjhm/29musk-ai1-bjhm-mediumSquareAt3X.jpg",
    name: "Musk day",
    tags: ["Portrait"],
    createdAt, width: 1603, height: 1603
  },
  {
    src: "https://hollywoodlife.com/wp-content/uploads/2018/02/jim-carrey-11.jpg",
    name: "Jim 2",
    tags: ["Portrait"],
    createdAt, width: 1000, height: 1523
  },
  {
    src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80",
    name: "Car desert",
    tags: ["Car", "Desert"],
    createdAt, width: 1000, height: 667
  },
  {
    src: "https://hips.hearstapps.com/hmg-prod/images/dwayne-the-rock-johnson-gettyimages-1061959920.jpg?crop=0.5625xw:1xh;center,top&resize=1200:*",
    name: "Rock 1",
    tags: ["Portrait"],
    createdAt, width: 1080, height: 1080
  },
  {
    src: "https://hbmotivation.com/wp-content/uploads/2023/04/a_short_biography_of_jim_carrey.webp",
    name: "Jim 1",
    tags: ["Portrait"],
    createdAt, width: 916, height: 1338
  },
  {
    src: "https://w0.peakpx.com/wallpaper/192/766/HD-wallpaper-new-elden-ring-malenia.jpg",
    name: "Malenia",
    tags: ["Sunset", "War", "Painting"],
    createdAt, width: 1920, height: 1080
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOPDkWY831mAA12nU7vNdhRjtxdlmCjwFKWg&usqp=CAU",
    name: "Keanu 2",
    tags: ["Portrait"],
    createdAt, width: 2871, height: 1778
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8JLOBHjnZpC6-d7uVY-MBsHf27TqraJzZ4A&usqp=CAU",
    name: "Banner",
    tags: ["Painting", "Mountains"],
    createdAt, width: 920, height: 1457
  },
  {
    src: "https://image.cnbcfm.com/api/v1/image/107079366-1655929294345-gettyimages-1201476983-AFP_1P2546.jpeg?v=1682590363",
    name: "Mark 3",
    tags: ["Portrait"],
    createdAt, width: 5540, height: 3694
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBEkxop48qRYAhvb_bawvfLqZtvd72SvLbIA&usqp=CAU",
    name: "Keanu 3",
    tags: ["Portrait"],
    createdAt, width: 2048, height: 1152
  },
  {
    src: "https://sm.ign.com/t/ign_nordic/news/j/jim-carrey/jim-carrey-is-considering-retiring-from-acting-ive-done-enou_yth7.1200.jpg",
    name: "Jim 3",
    tags: ["Portrait"],
    createdAt, width: 1200, height: 675
  },
  {
    src: "data:image/jpeg;base64,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",
    name: "3 Cats",
    tags: ["Cats", "Cute"],
    createdAt, width: 1080, height: 2064
  },
  {
    src: "https://cdn.vox-cdn.com/thumbor/-yfxV5QZ_1DBRE7FJx8nj0ZYK2c=/0x0:2040x1360/2000x1333/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24085014/STK171_L_Allen_Musk_03.jpg",
    name: "Musk purple",
    tags: ["Portrait"],
    createdAt, width: 1000, height: 666
  },
  {
    src: "https://www.zdnet.com/a/img/resize/1d532265165cbcf860e6824608bfae69c98100aa/2021/04/03/3b57c47b-9d81-4c65-9a5a-9eeb10045425/mark-zuckerberg-profile.jpg?auto=webp&fit=crop&height=1200&width=1200",
    name: "Mark 4",
    tags: ["Portrait"],
    createdAt, width: 1200, height: 1200
  },
  {
    src: "https://images.unsplash.com/photo-1611068813580-b07ef920964b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyJTIwZm9yJTIwbW9iaWxlfGVufDB8fDB8fHww&w=1000&q=80",
    name: "Beach Sunset",
    tags: ["Beach", "Sunset"],
    createdAt, width: 1000, height: 1500
  },
  {
    src: "https://m.media-amazon.com/images/M/MV5BMTQwMjAwNzI0M15BMl5BanBnXkFtZTcwOTY1MTMyOQ@@._V1_.jpg",
    name: "Jim 4",
    tags: ["Portrait"],
    createdAt, width: 1665, height: 2048
  },
  
];

export const photos = photosArr.reduce((photosMap, photo, i) => {
  photosMap[photo.name] = photo;
  return photosMap;
}, {} as PhotosMap);

