import Profile1 from "./Profile1";

export default function Gallery() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <Profile1
        name="Maria Skłodowska-Curie"
        imageId="szV5sdG"
        profession="Physicist and Chemist"
        awards={{
          count: 4,
          names: [
            "Nobel Prize in Physics",
            "Nobel Prize in Chemistry",
            "Davy Medal",
            "Matteucci Medal",
          ],
        }}
        discovery="Polonium (chemical element)"
      />
      <Profile1
        name="Katsuko Saruhashi"
        imageId="YfeOqp2"
        profession="Geochemist"
        awards={{
          count: 2,
          names: ["Miyake Prize for Geochemistry", "Tanaka Prize"],
        }}
        discovery="A method for measuring carbon dioxide in seawater"
      />
    </div>
  );
}
