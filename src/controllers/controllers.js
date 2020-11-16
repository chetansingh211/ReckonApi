const axios = require('axios');
const config = require('../config/config.json');

// declare a response interceptor
axios.interceptors.response.use(response => response, error => {
    const status = error.response ? error.response.status : null
    if (status !== 200) {
        return axios.request(error.config);
    }
    return Promise.reject(error);
});

async function getNumberRangeInfo(req, res) {
    try {
        const getUrlEndpoint1 = config.hostUrl+'test1/rangeInfo';
        const resultEndpoint1 = await axios.get(getUrlEndpoint1,  {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const getUrlEndpoint2 = config.hostUrl+'test1/divisorInfo';
        const resultEndpoint2 = await axios.get(getUrlEndpoint2,  {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if(resultEndpoint1.status === 200 && resultEndpoint2.status === 200) {

            const data1 = resultEndpoint1.data;
            const data2 = resultEndpoint2.data;
            
            const lowerRange = data1.lower;
            const upperRange = data1.upper;
            var i;
            const output=[];
            for (i = lowerRange; i <= upperRange; i++) {
                let lsOutput='';
                data2.outputDetails.forEach((item, index) => {
                    const reminder = i % item.divisor;
                    if (reminder === 0)  {
                        lsOutput += item.output
                    }
                });
                if (i>0) {
                    output.push(`${i} : ${lsOutput}`);
                }
              }
           // res.status(200).json(output);
            return res.render('homepage', {
                title: 'Reckon',
                header: "Sample Output",
                results: output
            });
        }
    } catch(error) {
        res.status(500).json(error);
    }
}

function containsString(string1, string2){
    var charArray1 = [...string1];
    var charArray2 = [...string2];
    var match = 0;
    const matchIndex =[];
  
    for(var i = 0; i < charArray1.length - charArray2.length + 1; i++){
      match = 0;
      for(var j = 0; j < charArray2.length; j++){
        if(charArray1[i+j].toUpperCase() == charArray2[j].toUpperCase()){
          match++;
        }
        if(match == charArray2.length){
            matchIndex.push(i+1);
        }
      }
    }
    return matchIndex;
}

async function textToSearch(req, res) {
    try {
        const getUrlEndpoint1 = config.hostUrl+'test2/textToSearch';
        const resultEndpoint1 = await axios.get(getUrlEndpoint1,  {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const getUrlEndpoint2 = config.hostUrl+'test2/subTexts';
        const resultEndpoint2 = await axios.get(getUrlEndpoint2,  {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(resultEndpoint1.status === 200 && resultEndpoint2.status === 200) {
            const results = [];
            resultEndpoint2.data.subTexts.map(item => {
                const findIndex = containsString(resultEndpoint1.data.text, item);
                if (findIndex.length > 0) {
                    results.push({
                        subtext: item,
                        result: findIndex.join()
                    });
                } else {
                    results.push({
                        subtext: item,
                        result: '<No Output>'
                    });
                }
            });
            const submitResult = {
                candidate: "Chetan Singh",
                text: resultEndpoint1.data.text,
                results: results
            };
            submitResultUrl = config.hostUrl+'test2/submitResults';
            const submitRes = await axios.post(submitResultUrl,  submitResult, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            let response;
            if (submitRes.status === 200) {
                response = {
                    status: 200,
                    message: "The result has been submited",
                    data: submitResult
                }
            }
            res.status(200).json(response);
        }
    } catch(error) {
        res.status(500).json(error);
    }
}

module.exports.getNumberRangeInfo = getNumberRangeInfo;
module.exports.textToSearch = textToSearch;