var dictTest = {
    value1 : [0,1],
    value2 : [2,3],
    value3 : [3,4],
    value4 : 0,
    value5 : function(){return this.value4}
};

console.log(dictTest.value1[0],dictTest.value2[1],dictTest.value3[1],dictTest.value5());
