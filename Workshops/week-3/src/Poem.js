const poem = {
  lines: [
    "I write, erase, rewrite",
    "Erase again, and then",
    "A poppy blooms.",
  ],
};

export default function Poem() {
  return (
    <article>
      {poem.lines.flatMap((line, index) =>
        index < poem.lines.length - 1
          ? [<p key={index}>{line}</p>, <hr key={"hr-" + index} />]
          : [<p key={index}>{line}</p>]
      )}
    </article>
  );
}
