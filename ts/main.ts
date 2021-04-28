
window.onload = function(){
    let formBtn = 
        <HTMLElement>document.querySelector("form > button");
    formBtn.onclick = main;
}

/**
 * Change heading to random color when it's clicked
 */
function changeHeading(){
    let heading = <HTMLElement>this;
    let red = Math.floor(Math.random() * 255 +1);
    let green = Math.floor(Math.random() * 255 +1);
    let blue = Math.floor(Math.random() * 255 +1);
    let color = "red(" + red + "," + green + "," + blue + ")";
    console.log(color);
    heading.style.color = color; //inline class
    console.log(heading.style.color);
}

function main():void{
    let msgHeading = document.createElement("h2"); // programatically create an h2
    msgHeading.innerText = "Processing form";
    msgHeading.setAttribute("class", "message");
    msgHeading.onclick = changeHeading;

    let h1 = document.querySelector("h1");
    h1.insertAdjacentElement("afterend", msgHeading);

    setTimeout(function(){ // h2 disappears after 5 seconds
        msgHeading.remove();
    }, 5000)

    resetErrorMessages();
    isTextPresent("first-name", "First name is required");
    isTextPresent("last-name", "Last name is required");
    // Validate date
    CheckValidDate();
}

function CheckValidDate() {
    let dobBox = <HTMLInputElement>document.getElementById("dob");
    let dob = dobBox.value;
    if (!isValidDate(dob)) {
        dobBox.nextElementSibling.innerHTML = "Format should be mm/dd/yyyy";

        //alternative way of doing it:
        // let errSpan = dobBox.nextElementSibling;
        // errSpan.innerHTML = "Format should be mm/dd/yyy"        
    }
}

function isValidDate(input:string):boolean{
    // validating  mm/dd/yyyy and m/d/yyy -- \d{1,2}\/\d{1,2}\/\d{4} --  (this is a regular expression)
    //https://regexr.com/ 
    let pattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/g
    return pattern.test(input);
}

/**
 * Resets all the spans back to the default text
 */
function resetErrorMessages():void{
    let allSpans = document.querySelectorAll("form span");
    for(let i = 0; i < allSpans.length; i++){
        let currSpan = <HTMLElement>allSpans[i];
        if(currSpan.hasAttribute("data-required")){
            currSpan.innerText = "*";
        }
        else{
            currSpan.innerText = "";
        }
    }
}

/**
 * Returns true if the textbox with the given id
 * has some text inside it.
 * @param id The id of the <input type="text"> to validate
 * @param errMsg The message to display in the sibling span of
 * the textbox.
 * @returns 
 */
function isTextPresent(id:string, errMsg:string):boolean {
    let txtBox = 
        <HTMLInputElement>document.getElementById(id);
    let txtBoxValue = txtBox.value;
    if (txtBoxValue == "") {
        let errSpan = 
            <HTMLElement>txtBox.nextElementSibling;
        errSpan.innerText = errMsg;
        return false;
    }
    return true;
}
