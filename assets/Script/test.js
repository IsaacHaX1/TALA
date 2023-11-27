var arr = [
    { type: 2, value: 1 },
    { type: 3, value: 1 },
    { type: 3, value: 4 },
    { type: 3, value: 8 },
    { type: 3, value: 9 },
    { type: 4, value: 13 },
    { type: 2, value: 8 },
  ];
  const checkMatch = function (card, arr) {
    const checkByValue = function () {
      let newArr = [...arr];
      let sorted = newArr.sort((a, b) => a.value - b.value);
      sorted.push(card);
      let match = 0;
      let matchArr = [];
      for (let i = 0; i < sorted.length; i++) {
        if (sorted[i].value == card.value) {
          match += 1;
          matchArr.push(sorted[i]);
        }
      }
      if (match >= 3) {
        console.log("checkByValue passed");
        return {
          check: true,
          card: {
            type: card.type,
            value: card.value,
          },
          pair: matchArr,
        };
      } else {
        console.log("checkByValue failed");
        return {
          check: false,
          card: {
            type: card.type,
            value: card.value,
          },
          pair: matchArr,
        };
      }
    };
    const checkByType = function () {
      let newArr = [];
      const getArrByType = function () {
        let _newArr = [];
        for (var idx in arr) {
          if (arr[idx].type == card.type) {
            _newArr.push(arr[idx]);
          }
        }
        return _newArr;
      };
      newArr = getArrByType();
      newArr.push(card);
      let sorted = newArr.sort((a, b) => a.value - b.value);
      console.log(sorted);
      const getIndexOfCard = function () {
        let indexCard = -1;
        for (let idx in sorted) {
          if (sorted[idx].value == card.value) {
            indexCard = idx;
          }
        }
        return indexCard;
      };
      let matchArr = [];
      const indexCard = parseInt(getIndexOfCard());
      matchArr.push({ index: indexCard, type: card.type, value: card.value });
      const getPrev = function () {
        const lastOne = matchArr[0];
        console.log("lastOne ", lastOne);
        if (lastOne.index <= 0) {
          return;
        }
        const prevOne = sorted[lastOne.index - 1];
        if (prevOne.value == lastOne.value - 1) {
          matchArr.unshift({
            index: lastOne.index - 1,
            type: card.type,
            value: prevOne.value,
          });
          getPrev();
        }
      };
      const getNext = function () {
        const lastOne = matchArr[matchArr.length - 1];
        if (lastOne.index >= sorted.length - 1) {
          return;
        }
        const nextOne = sorted[lastOne.index + 1];
        if (nextOne.value == lastOne.value + 1) {
          matchArr.push({
            index: lastOne.index + 1,
            type: card.type,
            value: nextOne.value,
          });
          getNext();
        }
      };
      getNext();
      getPrev();
      console.log("matchArr ", matchArr);
      console.log("index ", indexCard);
      if (matchArr.length >= 3) {
        return {
          check: true,
          card: {
            type: card.type,
            value: card.value,
          },
          pair: matchArr,
        };
      } else {
        return {
          check: false,
          card: {
            type: card.type,
            value: card.value,
          },
          pair: matchArr,
        };
      }
    };
    const _checkbyValue = checkByValue();
    const _checkByType = checkByType();
    if (_checkbyValue.check) {
      return _checkbyValue;
    }
  
    if (_checkByType.check) {
      return _checkByType;
    }
  
    return {
      check: false,
      card: {
        type: card.type,
        value: card.value,
      },
      pair: [],
    };
  };
 // console.log(checkMatch({ type: 4, value: 1 },arr));