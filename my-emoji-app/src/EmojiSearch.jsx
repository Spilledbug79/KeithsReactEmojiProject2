import React, { useEffect, useState } from 'react';


function EmojiSearch() {
  const [emojiList, setEmojiList] = useState([]);
  const [searchEmoji, setSearchEmoji] = useState('');
  const [error, setError] = useState(null);

  function handleChange(e) {
    setSearchEmoji(e.target.value)
  }

  const EmojiFetch = async () => {

    try {
      const response = await fetch('https://emoji-api.com/emojis?access_key=0037c9794745ff1ccdf7425677fa8925df9c51d6');

      if (!response.ok) {
        throw new Error('Failed to fetch Emoji')
      }

      const data = await response.json()

      return setEmojiList(data)

    } catch (err) {
      setError(err.message);

    }
  };

  useEffect(() => {
    EmojiFetch();
  }, [])

  if (error) return <p>Error: {error}</p>;

  const filteredEmojis = emojiList.filter(emoji => emoji.slug.toLowerCase().includes(searchEmoji.toLowerCase()) || emoji.unicodeName.toLowerCase().includes(searchEmoji.toLowerCase()) || emoji.codePoint.toUpperCase().includes(searchEmoji.toUpperCase())
  )


  return (

    <div className="emojiSearch">
      <h3 className='searchTitle'>Single Emoji Search:</h3>
      <p className='searchText'><strong>Type in an 'Emoji Name' below and immediately get the top 24 closest Emoji that matches your text.</strong></p>
      <input className='userInput1'
        type='text'
        placeholder="Type in Emoji Name"
        value={searchEmoji}
        onChange={handleChange} />
      <div className='characterList' style={{ display: searchEmoji === '' ? 'none' : 'flex', flexWrap: 'wrap' }}>

        {filteredEmojis.slice(0, 1000).map((emoji) =>
        (<span className='characters'>
          {emoji.character}
        </span>
        ))}
      </div>
    </div>
  );

}
export default EmojiSearch;