class QASystem
{
    RaiseQuestion() 
    {
        let el = document.getElementById(nameInputField);
    	let text = el.value; 

        console.log("A new question is raised: " + text);
        return;

        // let IndexRelatedQuestions = new Array();
        let IndexAnswers = this.SelectAnswer(text);
        let msg_RightSide = text;
        let msg_LeftSide = undefined;
        if(0 < IndexAnswers.length)
        {
            msg_LeftSide = ListQuestions[IndexAnswers[0]] +"\n\n" + ListAnswers[IndexAnswers[0]];
            if(1 < IndexAnswers.length)
            {                
                for(let i = 1; i < IndexAnswers.length; i++)
                {
                    IndexRelatedQuestions.push(IndexAnswers[i]);
                }
            }
        }   
        this.ShowRelatedQuestions(IndexRelatedQuestions);                 
        this.Create2MsgAndShow(msg_LeftSide, msg_RightSide);
        el.value = "";
    }
}