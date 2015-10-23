/**
 * Created by aleksandragajda on 23.10.15.
 */


var addNewBook = function() {

    $("#new-book").submit(function(event) {


        var book = {};
        book.name =  $(this).parent().find("#name-input").val();
        book.autor = $(this).parent().find("#autor-input").val();
        book.description = $(this).parent().find("#desc-input").val();





            //'"name": "' + $(this).parent().find("#name-input").val() + '", '+
            //'"autor": "' + '$(this).parent().find("#autor-input").val() + '", '+
            //'"description": ' + '$(this).parent().find("#desc-input").val() '", '+
            //'}';

        event.preventDefault();

        console.log(JSON.stringify(book));

        $.ajax({
            url: "http://api.coderslab.pl/book",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(book)
            ,
            success: function (json) {
                console.log("udało się");
                loadAllBooks();

            },
            error: function (xhr, status, errorThrown) {
                console.log(xhr, status, errorThrown);
            },
            complete: function (xhr, status) {
            }

        })

    });

};


var addBookOnPage = function(bookData){



    var book = $("<div class='book' data-id='" + bookData.id + "'>" +
        "<h2>" + bookData.name + "</h2>" +
        "<p>" + bookData.autor + "</p>" +
        "<p>" + bookData.description + "</p>" +
        "<button>Usuń</button>" +
        "</div>");


    book.children().not("h2").hide();
    book.children("h2").click(function(event){

        $(this).siblings().not("h2").toggle();


    });


    book.children("button").click(function (event) {

        $.ajax ({

            url: "http://api.coderslab.pl/book/" + $(this).parent().data().id,
            type: "DELETE",
            dataType: "json",
            success: function(json){
                loadAllBooks();
            },
            error: function(xhr, status, errorThrown){

                console.log("nie udało się");

            }

        });


    });


    $("#all-books").append(book)
};

var loadAllBooks = function(){

    $.ajax({
        url: "http://api.coderslab.pl/book",
        type: "GET",
        dataType: "json",
        success: function(json) {

            $("#all-books").empty();


            json.forEach(function(element, index, array){

                addBookOnPage(element);

            });
        },
        error: function(xhr, status, errorThrown) {
            console.log("Nie udało się");
        }

    })
};





$(function(){



    loadAllBooks();

    addNewBook()






});





