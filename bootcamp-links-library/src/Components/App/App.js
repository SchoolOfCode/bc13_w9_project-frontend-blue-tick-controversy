import React, { useState } from "react";
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

  function dropWeekChange(e) {
    setDropWeek(e.target.value);
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
  }
  console.log(cardsArr);
  async function subjectFetch(subject) {
    const response = await fetch(
      `http://localhost:3001/api/links?subject=${subject}`
    );
    const data = await response.json();
    setCardsArr(data.payload);
  }

  function inpSectionButton() {
    let inpSectionObj = {
      link: inpLink,
      title: inpTitle,
      description: inpDescription,
      week: dropInpWeek,
      subject: dropInpLanguage,
    };
    setInputSection(inpSectionObj);
    inputSectionPost(inputSection);
    console.log(inputSection)
  }

  async function inputSectionPost(data){
    const response = await fetch("http://localhost:3001/api/links/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    return result
  }





  return [
    <Header h1="BOOTCAMP LINKS LIBRARY" />,
    <div className="dropdown-container">
      <Dropdown
        handleChange={dropWeekChange}
        placeholder="SEARCH BY WEEK"
        list="dropWeek"
        name="dropWeek"
        dataId="dropWeek"
        value1="1"
        value2="2"
      />
      <RadioButtons handleChange={selectRadioChange} />
      <Dropdown
        handleChange={dropSubjectChange}
        placeholder="SEARCH BY SUBJECT"
        list="dropSubject"
        name="dropSubject"
        dataId="dropSubject"
        value1="React"
        value2="CSS"
      />
    </div>,
    <div className="button-go-container">
      <Button buttonText="GO" buttonClick={findBySectionButton} />
    </div>,
    <div className="cards-container">
      {cardsArr.map((card) => {
        return (
          <Card key={card.link_id}
            subjectIcon={card.icon}
            title={card.title}
            description={card.description}
            link={card.link}
          />
        );
      })}
    </div>,
    <div className="banner-container">
      <Banner />
    </div>,
    <div className="input-section-container">
      <Dropdown
        handleChange={dropInpWeekChange}
        placeholder="CHOOSE WEEK"
        list="dropInpWeek"
        name="dropInpWeek"
        dataId="dropInpWeek"
        value1="Abdi"
        value2="Miko"
      />
      <Input handleChange={inpTitleChange} placeholder="INSERT TITLE" />
      <Dropdown
        handleChange={dropInpLanguageChange}
        placeholder="CHOOSE LANGUAGE"
        list="dropInpLanguage"
        name="dropInpLanguage"
        dataId="dropInpLanguage"
        value1="Api"
        key1="1"
      />
      <Input handleChange={inpLinkChange} placeholder="PASTE LINK" />
      <Input
        handleChange={inpDescriptionChange}
        placeholder="ADD DESCRIPTION"
      />
      <Button buttonText="Submit" buttonClick={inpSectionButton} />
    </div>,
  ];
}

export default App;