/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/game",
        permanent: true,
      },
    ];
  },
  images: {
    domains: [
      "lezetomedia.s3.us-east-2.amazonaws.com",
      "mmajunkie.usatoday.com",
      "cdn.cnn.com",
      "www.cheatsheet.com",
      // "cdni.russiatoday.com",
      "images.tapology.com",
      "sport.one",
      "cdn.givemesport.com",
      "mma.pl",
      "lezetomedia.s3.us-east-2.amazonaws.com",
    ],
  },
};

export default nextConfig;

// {
//   name: "Jake Paul",
//   src: "https://cdn.cnn.com/cnnnext/dam/assets/200131120529-jake-paul-logan-paul-super-tease.jpg",
//   num: 1,
// },
// {
//   name: "Mike Tyson",
//   src: "https://www.cheatsheet.com/wp-content/uploads/2021/04/mike-tyson-9.jpg",
//   num: 2,
// },
// ],
// [
// {
//   name: "Conor McGregor",
//   src: "https://lezetomedia.s3.us-east-2.amazonaws.com/wp-content/uploads/2020/05/09191713/Conor-McGregor-Net-Worth-scaled.jpg",
//   num: 3,
// },
// {
//   name: "Michael Chandler",
//   src: "https://mmajunkie.usatoday.com/wp-content/uploads/sites/91/2022/05/michael-chandler-ufc-274-ceremonial-weigh-ins.jpg",
//   num: 4,
// },
// ],
// [
// {
//   name: "Khamzat Chimaev",
//   src: "https://cdni.russiatoday.com/rbthmedia/images/2020.08/original/5f2d23ac15e9f907b655284a.jpg",
//   num: 5,
// },
// {
//   name: "Robert Whittaker",
//   src: "https://images.tapology.com/letterbox_images/17398/default/robert-whittaker-rising-to-the-top-interview-melbourne-112416_613229_OpenGraphImage.jpg",
//   num: 6,
// },
