import Video from "../models/Video";


//Video.find({}, (error,videos) => {}

export const home = async(req, res) => {
    const videos = await Video.find({})
    return res.render("home", { pageTitle: "Home", videos });
};

// render(파일명, 보내고자 하는 변수)
export const watch = (req, res) => {
  const { id } = req.params;
  return res.render("watch", { pageTitle: `Watching `});
};
export const getEdit = (req, res) => {
  const { id } = req.params;
  return res.render("edit", { pageTitle: `Editing:`});
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  return res.redirect(`/videos/${id}`);
};

export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle: "Upload Video"})
};

export const postUpload = (req, res) => {
  // req.body -> input에서 데이터를 받아오기 위해 사용
  const { title, description, hashtags } = req.body;
  const video = new Video({
    title:title,
    description:description,
    createdAt: Date.now(),
    hashtags: hashtags.split(",").map(word=> `#${word}`),
    meta: {
      views:0,
      rating:0,
    },
  });
  console.log(video);
  return res.redirect("/");
};