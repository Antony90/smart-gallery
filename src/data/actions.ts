import {
  Action,
  ClassifyAction,
  NewPersonAction,
  AddPhotoToPersonAction,
  DetectFaceAction,
  ComputeError,
} from "../models/Action";

const date = new Date(new Date().getTime() - 1000 * 60 * 24 * 60); // 60 days ago

export const actions = [
  new ClassifyAction("beach.png", ["Sunset", "Family"], 291, date),
  new AddPhotoToPersonAction(
    "Nigel Yates",
    "2k3op43n6l",
    "20201283973_S.jpg",
    120,
    date
  ),
  new DetectFaceAction(
    "alguiqn395.jpg",
    [
      [213, 1923, 2340, 348],
      [289, 403, 1092, 324],
      [954, 23, 564, 304],
    ],
    354,
    date
  ),
  new NewPersonAction(
    "uK32n5pi3R8",
    ["alpha.jpg", "house.png", "screenshot_2022_09_21.png"],
    2473,
    date
  ),
  new ComputeError(
    "image-classification",
    "Class probability has low variance",
    109,
    date
  ),
  new ComputeError(
    "face-detection",
    "Too many faces in image (40)",
    2391,
    date
  ),
  new AddPhotoToPersonAction(
    "Johnson",
    "01l2lLksn2",
    "DCIM_20218489.png",
    631,
    date
  ),
  new ClassifyAction("beach.png", ["Sunset", "Family"], 291, date),
  new DetectFaceAction(
    "alguiqn395.jpg",
    [
      [25, 390, 400, 512],
      [1503, 820, 1874, 1043],
    ],
    2938,
    date
  ),
  new AddPhotoToPersonAction(
    "Anabelle Voan",
    "lasjr23n",
    "Photo23840242.png",
    869,
    date
  ),
  new ComputeError(
    "face-similarity",
    "Too many candidate clusters.",
    1803,
    date
  ),
] as Action[];
