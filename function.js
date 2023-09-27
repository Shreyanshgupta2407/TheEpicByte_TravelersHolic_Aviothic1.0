const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');


if(bar){
    bar.addEventListener('click', () =>{
        nav.classList.add('active');
    })
}

if(close){
    close.addEventListener('click',() =>{
        nav.classList.remove('active');
    })
}


//CHAT BOARD


// MESSAGE INPUT
const textarea = document.querySelector('.chatbox-message-input')
const chatboxForm = document.querySelector('.chatbox-message-form')

textarea.addEventListener('input', function () {
	let line = textarea.value.split('\n').length

	if(textarea.rows < 6 || line < 6) {
		textarea.rows = line
	}

	if(textarea.rows > 1) {
		chatboxForm.style.alignItems = 'flex-end'
	} else {
		chatboxForm.style.alignItems = 'center'
	}
})



// TOGGLE CHATBOX
const chatboxToggle = document.querySelector('.chatbox-toggle')
const chatboxMessage = document.querySelector('.chatbox-message-wrapper')

chatboxToggle.addEventListener('click', function () {
	chatboxMessage.classList.toggle('show')
})



// DROPDOWN TOGGLE
const dropdownToggle = document.querySelector('.chatbox-message-dropdown-toggle')
const dropdownMenu = document.querySelector('.chatbox-message-dropdown-menu')

dropdownToggle.addEventListener('click', function () {
	dropdownMenu.classList.toggle('show')
})

document.addEventListener('click', function (e) {
	if(!e.target.matches('.chatbox-message-dropdown, .chatbox-message-dropdown *')) {
		dropdownMenu.classList.remove('show')
	}
})



// CHATBOX MESSAGE
const chatboxMessageWrapper = document.querySelector('.chatbox-message-content')
const chatboxNoMessage = document.querySelector('.chatbox-message-no-message')

chatboxForm.addEventListener('submit', function (e) {
	e.preventDefault()

	if(isValid(textarea.value)) {
		writeMessage()
		setTimeout(autoReply, 1000)
	}
})



function addZero(num) {
	return num < 10 ? '0'+num : num
}

function writeMessage() {
	const today = new Date()
	let message = `
		<div class="chatbox-message-item sent">
			<span class="chatbox-message-item-text">
				${textarea.value.trim().replace(/\n/g, '<br>\n')}
			</span>
			<span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
		</div>
	`
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', message)
	chatboxForm.style.alignItems = 'center'
	textarea.rows = 1
	textarea.focus()
	textarea.value = ''
	chatboxNoMessage.style.display = 'none'
	scrollBottom()
}

function autoReply() {
    const today = new Date();
    const userMessage = textarea.value.trim().toLowerCase();
	console.log(userMessage);


    let greet ;

	if(userMessage.includes('hi')){
			greet = "Nice to chat with you sir/ma'am ! Which city do You want to go ? ";
	}
	else{
		greet = "Good evening sir/maa'm ! How can i help you ! ";
	}

	let messagegreet = `
        <div class="chatbox-message-item received">
            <span class="chatbox-message-item-text">
               ${greet}
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;

	let response;

	if(userMessage.includes('Rajasthan')){
		response = "I am chat bot";

	}
	else{
		response = "Good evening sir/maa'm ! How can i help you !";
	}

	let messageresponse = `
        <div class="chatbox-message-item received">
            <span class="chatbox-message-item-text">
               ${response}
            </span>
            <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
        </div>
    `;
	
	
	



	// let reply;

    // if (userMessage.includes('tourist places') || userMessage.includes('jammu')) {
    //     reply = "Some popular tourist places in Jammu are Raghunath Temple, Bahu Fort, and Amar Mahal Palace.";
    // } else if (userMessage.includes('jammu')) {
    //     reply = "Jammu is known for its rich cultural heritage and beautiful landscapes.";
    // } else {
    //     reply = "Welcome to Make my trip! How can I assist you today?";
    // }

	// let message1 = `
    //     <div class="chatbox-message-item received">
    //         <span class="chatbox-message-item-text">
    //            ${reply}
    //         </span>
    //         <span class="chatbox-message-item-time">${addZero(today.getHours())}:${addZero(today.getMinutes())}</span>
    //     </div>
    // `;

    // chatboxMessageWrapper.insertAdjacentHTML('beforeend', messagegreet);
	chatboxMessageWrapper.insertAdjacentHTML('beforeend', messageresponse);

	scrollBottom();
   
}


function scrollBottom() {
	chatboxMessageWrapper.scrollTo(0, chatboxMessageWrapper.scrollHeight)
}

function isValid(value) {
	let text = value.replace(/\n/g, '')
	text = text.replace(/\s/g, '')

	return text.length > 0
}