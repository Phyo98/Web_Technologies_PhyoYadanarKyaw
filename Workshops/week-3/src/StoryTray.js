const styles = {
  ul: {
    margin: 0,
    listStyleType: 'none',
  },
  li: {
    border: '1px solid #aaa',
    borderRadius: '6px',
    float: 'left',
    margin: '5px',
    marginBottom: '20px',
    padding: '5px',
    width: '70px',
    height: '100px',
  },
};

export default function StoryTray({ stories }) {
  const storiesWithCreateStory = [...stories]; 
  const createStory = { id: 'create', label: 'Create Story' };
  
  if (!storiesWithCreateStory.some(story => story.id === 'create')) {
    storiesWithCreateStory.push(createStory);
  }

  return (
    <ul style={styles.ul}>
      {storiesWithCreateStory.map(story => (
        <li key={story.id} style={styles.li}>
          {story.label}
        </li>
      ))}
    </ul>
  );
}
