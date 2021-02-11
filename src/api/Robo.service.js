export async function get_all_robots() {
  const response = await fetch(
    `https://my.api.mockaroo.com/robots.json?key=c3d6dbf0`
  );
  if (!response.ok)
    throw new Error("Failed to fetch Robots - Network response was not ok.");
  return await response.json();
}
