// 1 shown in the conversation box, 3 in the related questions area
var MaxCntAnswers = 4;
var ListQuestions = undefined;
var ListAnswers = undefined;
var dct_synonym = { "bad": "side", "benefits": "good", "benefit": "good", "help": "good", "helps": "good", "popular": "good", "effects": "effect", "statins": "statin" }
var dct_useless = { "is": 0, "it": 0, "to": 0 , "the": 0, "a": 0, "and": 0, "me": 0, "you": 0};

class QATypeIn_System
{
    constructor(i_scene)
    {
        this.scene = i_scene;
        this.GetQAFromJSON();
    }

    GetQAFromJSON()
    {     
        let formatQA = 1;
        let pathJSON = undefined;

        // Get json from online resources
        // pathJSON = "https://amostlou.github.io/WebAppTest/data_V0.json";
        // Get json from files
        // pathJSON = "JSON/data_V0.json";
        pathJSON = "JSON/data_V1.json";

        $.ajaxSettings.async = false;
        if(formatQA == 0)
        {
            $.getJSON(pathJSON, function(json) 
            {
                // console.log(json);
                // console.log(json.name);                
            });
        }
        else if(formatQA == 1)
        {
            $.getJSON(pathJSON, function(json)
            {
                let Content_QuickQuestions = new Array();
                let Content_AnswersToQuickQuestions = new Array();
                for(let i = 0; i < json.QA.length; i++)
                {
                    Content_QuickQuestions.push(json.QA[i][0]);
                    Content_AnswersToQuickQuestions.push(json.QA[i][1]);
                }
                ListQuestions = Content_QuickQuestions;
                ListAnswers = Content_AnswersToQuickQuestions;
            });
        }       
        $.ajaxSettings.async = true;
        
    }

    RaiseQuestion() 
    {
        let el = document.getElementById(nameInputField);
    	let text = el.value; 
        if(text == "")
        {
            alert("Please type in the question!");
            return;
        }
        
        this.scene.consultationPage.dialogueManager.Push('r', text);

        // let IndexRelatedQuestions = new Array();
        let answer = "Sorry, we couldn't find an answer for your question."
        let IndexAnswers = this.SelectAnswer(text);
        if(0 < IndexAnswers.length)
        {
            answer = ListQuestions[IndexAnswers[0]] +"\n\n" + ListAnswers[IndexAnswers[0]];
            
            // if(1 < IndexAnswers.length)
            // {                
            //     for(let i = 1; i < IndexAnswers.length; i++)
            //     {
            //         IndexRelatedQuestions.push(IndexAnswers[i]);
            //     }
            // }
        }   
        this.scene.consultationPage.dialogueManager.Push('l', answer);

        // this.ShowRelatedQuestions(IndexRelatedQuestions);                 
        el.value = "";
        this.scene.consultationPage.dialogueManager.ResetDlgPos();
    }

    SelectAnswer(str_question)
    {        
        let dct = {};
        // let arrayWord = str_question.split(' ');
        let arrayWord = this.BreakSentenceIntoWords(str_question);
        for(let i = 0; i < arrayWord.length; i++)
        {                 
            let word = this.ConvertWordToStandardWord(arrayWord[i]);
            if(word.length <= 0)
                continue;
            // first appear
            if(dct[word] === undefined)
                dct[word] = 1;
            // appear again
            else
                dct[word]++;
        }
        
        let result = new Array();
        for(let k = 0; k < ListQuestions.length; k++)
        {
            let q = ListQuestions[k];
            // let arrayWord = q.split(' ');
            let arrayWord = this.BreakSentenceIntoWords(q);
            let matchScore = 0;
            for(let i = 0; i < arrayWord.length; i++)
            {
                let word = this.ConvertWordToStandardWord(arrayWord[i]);
                if(word.length <= 0)
                    continue;

                if(dct[word] === undefined)
                {
                    continue;
                }
                else
                {
                    matchScore += dct[word];
                }
            }

            if(matchScore <= 0)
                continue;
            if(result.length < MaxCntAnswers)
            {
                // k: index of the qustion, matchScore: matching score of this question
                result.push([k, matchScore]);
            }
            else if(result.length == MaxCntAnswers)
            {
                let minScore = 9999;
                let indReplaced = -1;
                for(let j = 0; j < MaxCntAnswers; j++)
                {
                    if(result[j][1] < minScore)
                    {
                        minScore = result[j][1];
                        indReplaced = j;
                    }
                }
                if(minScore < matchScore)
                {
                    result[indReplaced] = [k, matchScore];
                }
            }
            else
            {
                alert("something is wrong");
            }
        }   
        // if return value < 0, then a is in front of b. Otherwise, b is in front of a
        result.sort(function(a, b){return b[1] - a[1]});
        let ret = new Array();
        for(let i = 0; i < result.length; i++)
        {
            ret.push(result[i][0]);
            // console.log(result[i][1]);
        }
        return ret;
    }

    // Extract words out of sentence while removing any non-letter charcater
    // For instance, "Sta-q?!me how am I?" would become ["Sta", "q", "me", "how", "am", "I"]
    BreakSentenceIntoWords(str)
    {
        let arrayWord = str.split(' ');
        let ret = new Array();
        for(let i = 0; i < arrayWord.length; i++)
        {
            var isAllLetter = /^[a-zA-Z]+$/.test(arrayWord[i]);
            // This word only consists of letters, we can push it into ret directly.
            if(isAllLetter)
            {
                ret.push(arrayWord[i]);
                continue;
            }
            // This word contains non-letter characters, we need to extract all English words out.
            else
            {
                let w = "";
                let s = arrayWord[i];
                for(let j = 0; j < s.length; j++)
                {
                    if( ('a' <= s[j] && s[j] <='z') || ('A' <= s[j] && s[j] <='Z') )
                    {
                        w += s[j];
                        continue;
                    }
                    else
                    {
                        if(0 < w.length)
                        {
                            ret.push(w);
                            w = "";
                        }
                        continue;                            
                    }
                }
                if(0 < w.length)
                {
                    ret.push(w);
                    w = "";
                }
            }
        }
        return ret;
    }

    // to lowercase, no sign, no punctuation, to synonym, remove useless
    ConvertWordToStandardWord(word)
    {
         // Be sure the input word is all letter.
        var isAllLetter = /^[a-zA-Z]+$/.test(word);
        if(!isAllLetter)
            alert("Misusing the function ConvertWordToStandardWord!");

        // converts to lowercase at the first place
        word = word.toLowerCase();
        // exists in the dct_synonym
        if(dct_synonym[word] != undefined)
        {
            word = dct_synonym[word]
        }
        // exists in the dct_useless
        if(dct_useless[word] != undefined)
        {
            return "";
        }
        return word;
    }
}