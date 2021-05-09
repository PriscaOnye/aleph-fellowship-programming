let blackBoardNumbersString = "1";

for (let i = 2; i <= 2021; i++) {
    blackBoardNumbersString += `, 1/${i}`;
}

document.querySelector('#blackboard_numbers').innerHTML = blackBoardNumbersString;
let blackBoardNumbersStringArray = blackBoardNumbersString.split(", ");
let boardOriginalLength = blackBoardNumbersStringArray.length;

i = 0;
while (i < boardOriginalLength) {

    if (blackBoardNumbersStringArray.length == 1) {
        document.querySelector('#final_answer').append(
            `${Math.ceil(blackBoardNumbersStringArray[0])}`
        );
        break;
    };

    let new_number = eval(blackBoardNumbersStringArray[0]) + eval(blackBoardNumbersStringArray[1]) + (eval(blackBoardNumbersStringArray[0]) * eval(blackBoardNumbersStringArray[1]));
    document.querySelector('#erasing_and_writing').append(
        `${blackBoardNumbersStringArray[0]} & ${blackBoardNumbersStringArray[1]} = (${blackBoardNumbersStringArray[0]} + ${blackBoardNumbersStringArray[1]} + ${eval(blackBoardNumbersStringArray[0]) * eval(blackBoardNumbersStringArray[1])}) = ${new_number}, `,
        document.createElement("br"),
        document.createElement("br")
    );

    blackBoardNumbersStringArray.splice(0, 2);
    blackBoardNumbersStringArray.push(new_number);
    blackBoardNumbersStringArray.sort();

    i++;
}
