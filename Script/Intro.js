// Intro.js

function LJCIsLocal()
{
  const isLocal = localStorage.getItem("isLocal");
  if (isLocal == "local")
  {
    home.href = "indexLocal.html";
  }
}