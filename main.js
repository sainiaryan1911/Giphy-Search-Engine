// Get Search Term.

// default search term
let searchTerm=document.querySelector("#searchbar").value;
    if (searchTerm==="trending"){
        search(searchTerm);
    }

document.querySelector("#go-button").addEventListener('click',function(){

    let searchTerm=document.querySelector("#searchbar").value;
    search(searchTerm);

});
document.querySelector("#searchbar").addEventListener('keyup',function(e){

    // if ENTER key is pressed...
    if(e.which===13){
        
        let searchTerm=document.querySelector("#searchbar").value;
        search(searchTerm);
    };

});


// Get JSON

function search(searchTerm){

    let url="https://api.giphy.com/v1/gifs/search?api_key=MsYE9AXfe1il4ioJACcd4RQEAnKAoocM&limit=100&offset=0&rating=g&lang=en&q="+searchTerm;

    // AJAX request
    let giphyAJAXCall = new XMLHttpRequest();
    giphyAJAXCall.open('GET',url);
    giphyAJAXCall.send();

    giphyAJAXCall.addEventListener('load',function(e){

        let data=e.target.response;
        pushToDOM(data);

});

};


// Display on DOM

function pushToDOM(input){

    // parse JSON
    let response=JSON.parse(input);

    // selecting all the gifs and their associated data
    let imageURLs = response.data;
    
    // Declaring gif container
    let container=document.querySelector("#gif-container");

    // clearing gif container for every new search term
    container.innerHTML="";

    // looping through every gif
    imageURLs.forEach(function(image){
        
        // selecting the url for the current gif
        let src= image.images.fixed_height.url;

        // output
        container.innerHTML+="<img src=\""+src+"\" id=\"gif\">";
        
    });

    // if no gif available for your search term
    if (imageURLs.length === 0){

        container.innerHTML="<p id=\"no-result\">No GIF found related to your search query!</p>";

    };

};
