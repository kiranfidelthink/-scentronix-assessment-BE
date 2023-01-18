import axios from "axios";
import express, { response } from "express";
import { url } from "inspector";
const app = express();
const port = 3013;
app.use(express.json());

const serverArray = [
  {
    url: "https://does-not-work.perfume.new",
    priority: 1,
    active: "offline",
  },
  {
    url: "https://gitlab.com",
    priority: 4,
    active: "offline",
  },
  {
    url: "http://app.scnt.me",
    priority: 3,
    active: "offline",
  },
  {
    url: "https://offline.scentronix.com",
    priority: 2,
    active: "offline",
  },
  {
    url: "https://gitlab.com",
    priority: 1,
    active: "offline",
  },
];

async function fetchServers(arrayServer: any) {
  arrayServer.sort((a: any, b: any) => {
    return a.priority - b.priority;
  });

  const results = await Promise.allSettled(
    arrayServer.map((item: any) =>
      axios({ method: "get", url: item.url, timeout: 5000 })
    )
  );

  results.forEach((data, index) => {
    if (data.status === "fulfilled") {
      if (data.value.status > 199 && data.value.status < 299) {
        arrayServer[index].active = "online";
      } else {
        arrayServer[index].active = "offline";
      }
    }
  });

  if (
    arrayServer.some((data: any) => {
      data.active === "offline";
    })
  ) {
    return "All servers are offline";
  } else {
    //console.log(await arrayServer.find((data:any) => data.active ==='online'))
    return await arrayServer.find((data: any) => data.active === "online");
  }
}

app.listen(port, async () => {
  //console.log(`Express is listening at http://localhost:${port}`);
  await fetchServers(serverArray);
});

export default fetchServers;
