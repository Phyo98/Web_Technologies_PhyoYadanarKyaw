import Gallery from "./Gallery.js";
import Profile from "./Profile.js";
import TodoList from "./TodoList.js";
import Bio from "./Bio.js";
import Todo from "./Todo.js";
import Gallery1 from "./Gallery1.js";
import Profile2 from "./Profile2.js";
import PackingList from "./PackingList.js";
import DrinkList from "./DrinkList.js";
import List from "./List.js";
import RecipeList from "./RecipeList.js";
import Poem from "./Poem.js";
import Clock from "./Clock.js";
import Expand from "./Expand.js";
import StoryTray from "./StoryTray.js";
import FancyText from "./FancyText";
import InspirationGenerator from "./InspirationGenerator";
import Copyright from "./Copyright";
import { useState, useEffect } from "react";

function useTime() {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function App() {
  const time = useTime();
  const [stories] = useState([
    { id: 0, label: "Ankit's Story" },
    { id: 1, label: "Taylor's Story" },
  ]);
  return (
    <div>
      <Profile />
      <Todo />
      <Bio />
      <TodoList />
      <Gallery />
      <Gallery1 />
      <Profile2 />
      <PackingList />
      <DrinkList />
      <List />
      <RecipeList />
      <Poem />
      <Clock time={time} />
      <Expand
        person={{
          imageId: "lrWQx8l",
          name: "Subrahmanyan Chandrasekhar",
        }}
      />
      <Expand
        person={{
          imageId: "MK3eW3A",
          name: "Creola Katherine Johnson",
        }}
      />
      <section>
        <FancyText title text="Get Inspired App" />
        <InspirationGenerator>
          <Copyright year={2004} />
        </InspirationGenerator>
      </section>
      
      <section>
        <h2>It is {time.toLocaleTimeString()} now.</h2>
        <StoryTray stories={stories} />
      </section>
    </div>
  );
}
