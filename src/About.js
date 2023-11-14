import React, { useState, useEffect, useRef } from "react";

const About = () => {
  const [input, setInput] = useState("");

  /* FIBONACCI SEQUENCE */
  const [series, setSeries] = useState([0, 1]);

  const generateFibonacci = () => {
    const newSeries = [...series];
    const length = series.length;
    newSeries.push(newSeries[length - 1] + newSeries[length - 2]);
    setSeries(newSeries);
  };

  /* Count Vowels */

  const countVowels = (str) => {
    const vowelRegex = /[aeiouAEIOU]/g;
    const vowelsCount = str.match(vowelRegex);
    return vowelsCount ? vowelsCount.length : 0;
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  /* Highlight Vowels */
  const highlightVowels = (str) => {
    const vowelRegex = /[aeiouAEIOU]/g;
    return str.replace(
      vowelRegex,
      (match) => `<span style='color:red;'>${match}</span>`
    );
  };

  /* Remove Vowels */
  const removeVowels = (str) => {
    const vowelRegex = /[aeiouAEIOU]/g;
    return str.replace(vowelRegex, "");
  };

  /* Filter Vowels */
  const vow = /[aeiouAEIOU]/g;
  const array = ["ABHGFHREEEDKaeiLOJHBHGFCXZAAAIIOJ"];
  const stringElement = array[0];
  const filterVowels = stringElement.match(vow);

  /* Reverse Vowels */
  const reverseVowels = (str) => {
    const vowels = str.match(/[aeiouAEIOU]/g);
    if (!vowels) return str;
    return str.replace(/[aeiouAEIOU]/g, () => vowels.pop());
  };

  /* Longest string without Vowels */
  const findLongestSubstringWithoutVowels = (str) => {
    const substrings = str.split(/[aeiouAEIOU]+/);
    const longestSubstring = substrings.reduce(
      (a, b) => (a.length > b.length ? a : b),
      ""
    );
    return longestSubstring;
  };

  /* Remove Duplicates */

  const names = [
    "Daniel",
    "Lucas",
    "Gwen",
    "Henry",
    "Jasper",
    "Lucas",
    "Daniel",
  ];

  const uniqueNames = names.filter((val, id, array) => {
    return array.indexOf(val) === id;
  });

  const result = uniqueNames.join(", ");

  const num = [1, 2, 3, 4, 5, 2, 3, 1, 2, 3, 4];
  const dubNum = num.filter((val, id, array) => {
    return array.indexOf(val) === id;
  });
  const RESSS = dubNum.join(",");

  const AllLi = [{ name: "Something" }, { name: "Blob" }, { name: "suresh" }];
  const li = ["Something", "Blob"];

  const filteredLi = AllLi.filter((item) => li.includes(item.name));

  /* Using Reduce SUM of NUMS */

  const Redsum = num.reduce((item, curr) => item + curr, 0);

  /* Filter EVEN NUMS */
  const even = num.filter((item) => item % 2 == 0);

  /* Filter ODD NUMS */
  const odd = num.filter((item) => item % 2 == 1);

  /* SMall Vowels */
  const smallvow = /[aeiou]/g;
  const smallFil = array[0].match(smallvow);

  /* Caps vowels */
  const caps = /[AEIOU]/g;
  const CaptV = array[0].match(caps);

  /* SPLIt */
  const sentence = "Hello, world! Welcome to React.js";
  const words = sentence.split(",");

  /* FROM ARRAAY SPLIt */
  const SentArr = [
    "Hello, world! Welcome to React.js",
    "Hello, world! Welcome to React.js",
  ];

  const Arr = SentArr.map((item) => {
    return item.split(",");
  });

  /* Palindrom */

  const reversedWordString = input.split("").reverse().join("");

  return (
    <div>
      {/*Palindrome */}
      <b>Palindrome :</b>
      {reversedWordString === input ? "Palindrome" : "Not a palindrome"}
      <br />

      {/* Count Vowels */}
      <input type="text" value={input} onChange={handleInputChange} />
      <p>Number of vowels: {countVowels(input)}</p>

      {/* Small Vowels */}
      <b>Small :</b>
      <span>{smallFil}</span>
      <br />

      {/* Caps Vowels */}
      <b>Caps :</b>
      <span>{CaptV}</span>

      {/* Filter Vowels */}
      <div>stringElement : {stringElement}</div>
      <div>filterVowels : {filterVowels}</div>

      {/* Highlight Vowels */}
      <p dangerouslySetInnerHTML={{ __html: highlightVowels(input) }} />

      {/* Remove Vowels */}
      <p>ResultRemv: {removeVowels(input)}</p>
      <p>Result: {reverseVowels(input)}</p>

      {/* Longest String without Vowels */}
      <p>
        Longest substring without vowels:{" "}
        {findLongestSubstringWithoutVowels(input)}
      </p>

      {/* Fibonacci series */}
      <h2>Fibonacci Series:</h2>
      <ul>
        {series.map((number, index) => (
          <li key={index}>{number}</li>
        ))}
      </ul>
      <button onClick={generateFibonacci}>
        Generate Next Fibonacci Number
      </button>

      {/* Remove Duplicates */}
      <div>uniqueNames : {result}</div>
      <div>Num : {RESSS}</div>

      <ul>
        filteredName =
        {filteredLi.map((item, i) => (
          <li key={i}>{item?.name}</li>
        ))}
      </ul>

      {/* Using Reduce SUM */}
      <b>SUM OF NUM :</b>
      <span>{Redsum}</span>
      <br />

      {/*  Even num */}
      <b>EVEN NUM :</b>
      {even.map((item) => (
        <span>{item}</span>
      ))}
      <br />

      {/*  Odd num */}
      <b>ODD NUM :</b>
      {odd.map((item) => (
        <span>{item}</span>
      ))}
      <br />

      <b>Split by comma :</b>
      <ul>
        {words.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default About;
