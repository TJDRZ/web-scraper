const main = document.querySelector("#main");

fetch("http://localhost:8000/")
  .then((res) => res.json())
  .then((data) =>
    data.forEach((repo) => {
      const section = document.createElement("section");
      const h2 = document.createElement("h2");
      const a = document.createElement("a");
      h2.textContent = repo.title;
      section.appendChild(h2);
      a.textContent = repo.url;
      a.href = repo.url;
      section.appendChild(a);
      main.appendChild(section);
    })
  )
  .catch((err) => console.log(err));
