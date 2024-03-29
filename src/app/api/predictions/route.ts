import { params } from "@ampt/sdk";
import _ from "lodash";
import Replicate from "replicate";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const replicate = new Replicate({
  //auth: process.env.REPLICATE_API_TOKEN,
  auth: params("REPLICATE_API_TOKEN"),
});

function generateMessageSid() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let result = "SM";
  for (let i = 0; i < 32; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// TODO: cleanup set to Twilio MediaUrl
const InputImage =
  "https://drive.google.com/uc?export=download&id=1wchwDIr4g9g4MYNVmC8MuG5TtKX0vsnr";
//"https://replicate.delivery/pbxt/KFkSv1oX0v3e7GnOrmzULGqCA8222pC6FI2EKcfuCZWxvHN3/newton_0.jpg";

const replicateModelVersion =
  "ddfc2b08d209f9fa8c1eca692712918bd449f695dabb4a958da31802a9570fe4";

const mockTwilioPayload = {
  MediaUrl0: InputImage,
  MessageSid: generateMessageSid(),
};

const replicateInput = (prompt: string) => ({
  prompt: prompt,
  num_steps: 50,
  style_name: "Photographic (Default)",
  input_image: InputImage,
  num_outputs: 1,
  guidance_scale: 5,
  negative_prompt:
    "nsfw, lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry",
  style_strength_ratio: 20,
});

export async function POST(req: Request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      "The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.",
    );
  }

  try {
    const predictions = await Promise.all([
      replicate.predictions.create({
        version: replicateModelVersion,
        input: replicateInput("A technologist img in a field"),
      }),
      replicate.predictions.create({
        version: replicateModelVersion,
        input: replicateInput("A technologist img in a building"),
      }),
      replicate.predictions.create({
        version: replicateModelVersion,
        input: replicateInput("A technologist img on a highway"),
      }),
    ]);

    console.log("Prediction info: ", predictions);

    const hasError = predictions.some((prediction) => prediction?.error);
    if (hasError) {
      return new Response(
        JSON.stringify({
          detail: predictions.filter((prediction) => prediction?.error)[0]
            .error,
        }),
        { status: 500 },
      );
    }

    let succeededPredictions = {};

    for (let i = 0; i < predictions.length; i++) {
      let prediction = predictions[i];

      while (
        prediction.status !== "succeeded" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const response = await fetch(
          "http://localhost:3001/api/predictions/" + prediction.id,
        );
        prediction = await response.json();

        if (response.status !== 200) {
          // @ts-ignore
          console.log("Error during prediction:", prediction.detail);
          break;
        }

        // @ts-ignore
        succeededPredictions[prediction.id] = prediction;
      }
    }

    // Call /api/stytch-together
    // await fetch("/api/stytch-together", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(succeededPredictions),
    // });

    console.log(
      "succeededPredictions length",
      Object.keys(succeededPredictions).length,
    );
    console.log("succeededPredictions", succeededPredictions);

    const allPhotos = [];

    allPhotos.push(mockTwilioPayload["MediaUrl0"]);

    _.mapValues(succeededPredictions, (pred) => {
      allPhotos.push(pred["output"][0]);
      return pred["output"][0];
    });

    // let finalPayload = _.mapValues(succeededPredictions, (pred) => {
    //   allPhotos.push(pred["output"][0]);
    //   return pred["output"][0];
    // });

    const finalPayload = {
      allPhotos,
      MessageSid: mockTwilioPayload["MessageSid"],
    };
    console.log("Final payload: ", finalPayload);

    return new Response(JSON.stringify(finalPayload), { status: 201 });
  } catch (error) {
    console.error("Error during predictions:", error);
  }
}
