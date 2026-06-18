async function test() {
  console.log("Testing POST /api/admin/themes/generate");
  const res = await fetch("http://127.0.0.1:3000/api/admin/themes/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "neon cyberpunk" })
  });
  console.log("Status:", res.status);
  
  if (!res.ok) {
    const text = await res.text();
    console.log("Error Text Length:", text.length);
  } else {
    const data = await res.json();
    console.log("Data:", data);
  }
}
test();
