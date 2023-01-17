import axios from "axios";
import express, { response } from "express";
import { url } from "inspector";
const app = express();
const port = 3000;
app.use(express.json());

async function fetchServers() {
  const serverArray = [
    {
      "url": "https://does-not-work.perfume.new",
      "priority": 1,
      "active": 'offline'
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

  serverArray.sort((a, b) => {
    return a.priority - b.priority;
  });

  const results = await Promise.allSettled(
    serverArray.map((item) =>
      axios({ method: "get", url: item.url, timeout: 5000 })
    )
  );
  
  results.forEach((data, index) => {
    if (data.status === "fulfilled") {
      if (data.value.status > 199 || data.value.status < 299) {
        serverArray[index].active = "online";
      } else {
        serverArray[index].active = "offline";
      }
    }
  });
  
if(!serverArray.some(data => data.active === 'online')) {
  throw new Error('All servers are offline')
} else {
  console.log(serverArray.find(data => data.active ==='online'))
}
}


app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`);
  fetchServers();
});
