import fetchServers from "../src/index";

const serverArray = [
  {
    url: "https://gitlab.com",
    priority: 1,
    active: "online",
  },
];

const serverArray2 = [
  {
    url: "https://does-not-work.perfume.new",
    priority: 1,
    active: "offline",
  },
];

const serverArray3: any = [];

//TEST CASE if server is ONLINE
test("To be server online", async () => {
  
    expect(await fetchServers(serverArray)).toStrictEqual({
      active: "online",
      priority: 1,
      url: "https://gitlab.com",
    });
 
});
//TEST CASE if server is OFFLINE
test("To be server offline", async () => {
 
    expect(await fetchServers(serverArray2)).toStrictEqual(undefined );

});

