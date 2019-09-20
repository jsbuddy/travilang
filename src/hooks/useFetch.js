export default async (url) => {
  const controller = new AbortController();
  const { signal } = controller;
  const res = await (await fetch(url, { method: 'GET', signal })).json();
  return [
    res,
    controller.abort.bind(controller),
  ];
};
