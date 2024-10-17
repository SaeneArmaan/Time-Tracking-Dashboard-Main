const Loading = document.querySelector(".loading");
const Tabs = document.querySelectorAll(".profileCard li");
const CardWrapper = document.querySelector(".cardWrapper");

const fetchData = async (Url) => {
  try {
    setLoading(true);

    const res = await fetch(Url);

    if (!res.ok) {
      throw new Error(`HTTP Error! : status ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    Loading.textContent = error.message;
  } finally {
    setLoading(false);
  }
};

const renderData = (data) => {
  const fragment = document.createDocumentFragment();
  let selectedTab = "Weekly";

  Tabs.forEach((li) => {
    li.addEventListener("click", (event) => {
      selectedTab = event.target.textContent;

      Tabs.forEach((li) => li.classList.remove("active"));
      li.classList.add("active");

      CardWrapper.innerHTML = "";

      if (selectedTab === "Weekly") {
        data.forEach((li) => {
          const div = document.createElement("div");
          div.classList.add("card", li.title.split(" ").join("").toLowerCase());

          div.innerHTML = `
             <img src="${li.image}"/>
            <div class='detailsWrapper'>
                <div>
                <p>${li.title}</p>
                <p>...</p>
                </div>

                <div>
                <span>${li.timeframes.weekly.current}hrs</span>
                <p>Last Week - ${li.timeframes.weekly.previous}hrs</p>
                </div>
             </div>
            `;

          fragment.appendChild(div);
        });

        CardWrapper.appendChild(fragment);
      } else if (selectedTab === "Daily") {
        data.forEach((li) => {
          const div = document.createElement("div");
          div.classList.add("card", li.title.split(" ").join("").toLowerCase());

          div.innerHTML = `
             <img src="${li.image}"/>
            <div class='detailsWrapper'>
                <div>
                <p>${li.title}</p>
                <p>...</p>
                </div>

                <div>
                <span>${li.timeframes.daily.current}hrs</span>
                <p>Last Week - ${li.timeframes.daily.previous}hrs</p>
                </div>
             </div>
            `;

          fragment.appendChild(div);
        });

        CardWrapper.appendChild(fragment);
      } else if (selectedTab === "Monthly") {
        data.forEach((li) => {
          const div = document.createElement("div");
          div.classList.add("card", li.title.split(" ").join("").toLowerCase());

          div.innerHTML = `
             <img src="${li.image}"/>
            <div class='detailsWrapper'>
                <div>
                <p>${li.title}</p>
                <p>...</p>
                </div>

                <div>
                <span>${li.timeframes.monthly.current}hrs</span>
                <p>Last Week - ${li.timeframes.monthly.previous}hrs</p>
                </div>
             </div>
            `;

          fragment.appendChild(div);
        });

        CardWrapper.appendChild(fragment);
      }
    });
  });

  if (selectedTab === "Weekly") {
    Tabs.forEach((li) => {
      if (li.textContent === selectedTab) {
        li.classList.add("active");
      }
    });

    data.forEach((li) => {
      const div = document.createElement("div");
      div.classList.add("card", li.title.split(" ").join("").toLowerCase());

      div.innerHTML = `
        <img src="${li.image}"/>
            <div class='detailsWrapper'>
                <div>
                <p>${li.title}</p>
                <p>...</p>
                </div>

                <div>
                <span>${li.timeframes.weekly.current}hrs</span>
                <p>Last Week - ${li.timeframes.weekly.previous}hrs</p>
                </div>
             </div>
        `;

      fragment.appendChild(div);
    });

    CardWrapper.appendChild(fragment);
  }
};

const loadData = async () => {
  const data = await fetchData("./data.json");

  if (data) {
    renderData(data);
  }
};

const setLoading = (isLoading) => {
  if (!isLoading) {
    Loading.classList.add("hidden");
  } else {
    Loading.classList.remove("hidden");
  }
};

window.addEventListener("DOMContentLoaded", loadData);
