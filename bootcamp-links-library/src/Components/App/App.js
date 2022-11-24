import React, { useState, useRef, useEffect } from "react";
import "./App.css";
// import Arrow from "../Arrow/Arrow";
import Banner from "../Banner/Banner";
import Button from "../Button/Button";
import Card from "../Card/Card";
import Dropdown from "../Dropdown/Dropdown";
import Header from "../Header/Header";
import Input from "../Input/Input";
import RadioButtons from "../RadioButtons/RadioButtons";

function App() {
  const [dropWeek, setDropWeek] = useState("");
  const [dropSubject, setDropSubject] = useState("");
  const [findBySection, setFindBySection] = useState("");
  const [selectRadio, setSelectRadio] = useState("");

  const [cardsArr, setCardsArr] = useState([]);

  const [dropInpWeek, setDropInpWeek] = useState("");
  const [dropInpLanguage, setDropInpLanguage] = useState("");
  const [inpTitle, setInpTitle] = useState("");
  const [inpLink, setInpLink] = useState("");
  const [inpDescription, setInpDescription] = useState("");
  const [inputSection, setInputSection] = useState([]);
  const [likes, setLikes] = useState([]);
  const [likesCount, setLikesCount] = useState(0);

  function dropWeekChange(e) {
    setDropWeek(e.target.value);
    console.log(dropWeek);
  }
  function dropSubjectChange(e) {
    setDropSubject(e.target.value);
  }
  function dropInpWeekChange(e) {
    setDropInpWeek(e.target.value);
  }

  function dropInpLanguageChange(e) {
    setDropInpLanguage(e.target.value);
  }
  function inpTitleChange(e) {
    setInpTitle(e.target.value);
  }
  function inpLinkChange(e) {
    setInpLink(e.target.value);
  }
  function inpDescriptionChange(e) {
    setInpDescription(e.target.value);
  }

  function selectRadioChange(e) {
    setSelectRadio(e.target.value);
  }

  // function findBySectionButton(){
  //   if(selectRadio==="week"){
  //     let findBySectionObj = {
  //       week: dropWeek
  //     }
  //     setFindBySection([...findBySection, findBySectionObj])

  //     }
  //     else{let findBySectionObj = {week: dropSubject}
  //     setFindBySection([...findBySection, findBySectionObj])
  //   }}
  //   console.log(findBySection)
  // useEffect(()=>{
  //   findBySection()

  // }, [()=>{likesHandler()}])

  function findBySectionButton() {
    if (selectRadio === "week") {
      console.log(dropWeek);
      weekFetch(dropWeek);
    } else {
      subjectFetch(dropSubject);
    }
  }

  async function weekFetch(week) {
    const response = await fetch(`http://localhost:3001/api/links/${week}`);
    const data = await response.json();
    setCardsArr(data.payload);
    setLikes([...data.payload]);
    // setLikesCount(data.payload.likes)
  }

  // function handleLike(buttonID){
  //   const correctRow = likes.filter((link)=> link.id===buttonID)
  //   const editedRow = {...correctRow, correctRow.likes + 1}
  //   setLikes
  // }
  async function subjectFetch(subject) {
    const response = await fetch(
      `http://localhost:3001/api/links?subject=${subject}`
    );
    const data = await response.json();
    setCardsArr(data.payload);
    // setLikesCount(data.payload.likes);
  }

  function inpSectionButton() {
    let inpSectionObj = {
      link: inpLink,
      title: inpTitle,
      description: inpDescription,
      week: dropInpWeek,
      subject: dropInpLanguage,
    };
    console.log(inpSectionObj);
    inputSectionPost(inpSectionObj);
  }

  async function inputSectionPost(data) {
    const response = await fetch("http://localhost:3001/api/links/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  }
  async function likesHandler(data, id) {
    const response = await fetch(`http://localhost:3001/api/links/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(likesCount);
    setTimeout(findBySectionButton, 1000);
  }

  // async function patchLike(id){
  //   if (like === false){
  //     const response = await fetch(`http://localhost:3001/api/links/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(likes: likesCount + 1 ),
  //   });
  //   const result = await response.json();
  //   console.log(result)
  //   setLike(true)
  //   if (like === true){
  //     const response = await fetch(`http://localhost:3001/api/links/${id}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(),
  //   });
  //   const result = await response.json();
  //   console.log(result)
  //   }
  //   }
  // }

  const ref = useRef(null);
  function scroll(scrollOffset) {
    ref.current.scrollLeft += scrollOffset;
  }
  return [
    <div className="app-container">
      <div className="header-container">
        <Header h1="BOOTCAMP LINKS LIBRARY" />
        <div className="dropdown-container">
          <Dropdown
            className="dropWeek"
            handleChange={dropWeekChange}
            placeholder="SEARCH BY WEEK"
            list="dropWeek"
            name="dropWeek"
            dataId="dropWeek"
            value1="1"
            text1="Week 1"
            value2="2"
            text2="Week 2"
            value3="3"
            text3="Week 3"
            value4="4"
            text4="Week 4"
            value5="5"
            text5="Week 5"
            value6="6"
            text6="Week 6"
            value7="7"
            text7="Week 7"
            value8="8"
            text8="Week 8"
          />
          <div className="radio-buttons-container">
            <RadioButtons handleChange={selectRadioChange} />
          </div>
          <Dropdown
            className="dropSubject"
            handleChange={dropSubjectChange}
            placeholder="SEARCH BY SUBJECT"
            list="dropSubject"
            name="dropSubject"
            dataId="dropSubject"
            value1="API"
            text1="API"
            value2="CSS"
            text2="CSS"
            value3="JavaScript"
            text3="JavaScript"
            value4="React"
            text4="React"
            value5="HTML"
            text5="HTML"
            value6="General Dev"
            text6="General Dev"
            value7="SQL"
            text7="SQL"
            value8="Git"
            text8="Git"
          />
        </div>
        <div className="button-go-container">
          <Button buttonText="GO" buttonClick={findBySectionButton} />
        </div>
      </div>
      <div ref={ref} className="cards-container">
        {cardsArr.map((card) => {
          return (
            <Card
              key={card.link_id}
              subjectIcon={card.icon}
              title={card.title}
              description={card.description}
              link={card.link}
              numLikes={card.likes}
              buttonID={card.link_id}
              buttonCopy={() => {
                navigator.clipboard.writeText(card.link);
              }}
              buttonLink={() => {
                window.open(card.link, "_blank").focus();
              }}
              handleLike={() =>
                likesHandler({ likes: card.likes + 1 }, card.link_id)
              }
            />
          );
        })}
      </div>
      <div className="scroll-buttons">
        <Button buttonClick={() => scroll(-500)} buttonText="<" />
        <Button buttonClick={() => scroll(500)} buttonText=">" />
      </div>
      <div className="footer-container">
        <div className="banner-container">
          <Banner />
        </div>
        <div className="input-section-container">
          <div className="input-section-top">
            <Dropdown
              handleChange={dropInpWeekChange}
              placeholder="CHOOSE WEEK"
              list="dropInpWeek"
              name="dropInpWeek"
              dataId="dropInpWeek"
              value1="1"
              text1="Week 1"
              value2="2"
              text2="Week 2"
              value3="3"
              text3="Week 3"
              value4="4"
              text4="Week 4"
              value5="5"
              text5="Week 5"
              value6="6"
              text6="Week 6"
              value7="7"
              text7="Week 7"
              value8="8"
              text8="Week 8"
            />
            <Input
              className="title-input"
              handleChange={inpTitleChange}
              placeholder="INSERT TITLE"
            />
            <Dropdown
              handleChange={dropInpLanguageChange}
              placeholder="CHOOSE SUBJECT"
              list="dropInpLanguage"
              name="dropInpLanguage"
              dataId="dropInpLanguage"
              value1="1"
              text1="API"
              value2="2"
              text2="CSS"
              value3="3"
              text3="JavaScript"
              value4="4"
              text4="React"
              value5="5"
              text5="HTML"
              value6="6"
              text6="General Dev"
              value7="7"
              text7="SQL"
              value8="8"
              text8="Git"
            />
          </div>
          <div className="input-section-middle">
            <Input handleChange={inpLinkChange} placeholder="PASTE LINK" />
          </div>
          <div className="input-section-bottom">
            <Input
              handleChange={inpDescriptionChange}
              placeholder="ADD DESCRIPTION"
            />
            <Button buttonText="Submit" buttonClick={inpSectionButton} />
          </div>
        </div>
      </div>
    </div>,
  ];
}

export default App;
