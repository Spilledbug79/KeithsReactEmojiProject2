import React, { useEffect, useState } from 'react';

function EmojiGroup() {
  const [emojiList, setEmojiList] = useState([]);
  const [searchEmoji, setSearchEmoji] = useState('');
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [emojiFilter, setEmojiFilter] = useState([])


  const handleInputChange = (event) => {
    setSearchEmoji(event.target.value);
    setShowFilter(false); // Hide the list while typing
  };


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



  const handleFilterClick = () => {
    const newFilteredGroupEmoji = emojiList.filter(emoji => emoji.group.toLowerCase().replace(/\s+/g, "-").trim('').includes(searchEmoji.toLowerCase().replace(/\s+/g, "-").trim('')) || emoji.subGroup.toLowerCase().replace(/\s+/g, "-").trim('').includes(searchEmoji.toLowerCase().replace(/\s+/g, "-").trim('')))

    setEmojiFilter(newFilteredGroupEmoji);
    setShowFilter(!showFilter);
  }


  return (
    <div className="groups">
      <h3 className="groupTitle">Emoji Group Search:</h3>
      <p className="groupText">
        <strong>type in Group or SubGroup to find Emojis that you want.</strong>
      </p>
      <input
        className="groupInput"
        type="text"
        placeholder="Type in a Category"
        value={searchEmoji}
        onChange={handleInputChange}
      />

      <button className="filterBtn" onClick={handleFilterClick}>
        Filter Button
      </button>

      {showFilter && (
        <div
          className="groupInfo"
          style={{
            display: searchEmoji === "" ? "none" : "flex",
            flexDirection: "column",
            height: "230px",
            overflowY: "auto",
            textAlign: 'center',
          }}
        >
          {emojiFilter.slice(0,).map((emoji, index) => (
            <ul className="groupList" key={index} title={emoji.unicodeName}>
              <div>
                <li className='groupedList'>
                  <p className='firstGroup'>{emoji.character}</p>
                  <p className='secondGroup'>group: {emoji.group}, </p>
                  <p className='thirdGroup'>subgroup: {emoji.subGroup} </p>
                </li>
              </div>
            </ul>
          ))}
        </div>
      )}
    </div>
  );

}
export default EmojiGroup;