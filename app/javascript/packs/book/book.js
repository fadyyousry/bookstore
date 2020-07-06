$(function() {
    var mybook;

    document.addEventListener("click", function(e) {
        $(".autocomplete-items").remove();
    });

    $('#search_google_book_input').on('input', function() {
        var inp = this;
        var a, b, val = this.value;

        $(".autocomplete-items").remove();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);

        var $title = $(this).val().replace(/\s+/g, '+');

        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/books/v1/volumes',
            data: { "q": $title, "maxResults": "3" },
            success: function(books) {
                mybook = books.items[0];
                showBooksSearchResults(a, books, inp);
            },
            error: function() {}
        });
    });

    $('#search_google_book_submit').on('click', function() {
        autofillBookData(mybook.volumeInfo);
    });
    
    function autofillBookData(bookDataObject) {
        $('#book_title').val(bookDataObject.title);
        $('#book_description').val(bookDataObject.description);
        $('#book_isbn').val(bookDataObject.industryIdentifiers[1].identifier);
        $('#book_page_count').val(bookDataObject.pageCount);
        $('#book_image_link').val(bookDataObject.imageLinks.thumbnail);
        $('#book_language').val(bookDataObject.language);
    }

    function showBooksSearchResults(searchResults, books, inp) {
        $.each(books.items, function(i, book) {
            var bookTitle = book.volumeInfo.title;
            var bookResultsDiv = document.createElement("DIV");
            bookResultsDiv.innerHTML = "<p data-title=\"" + bookTitle + "\">" + bookTitle + "</p>";
            bookResultsDiv.innerHTML += "<input type='hidden' value='" + i + "'>";

            bookResultsDiv.addEventListener("click", function(e) {
                inp.value = $(this).find('p').data('title');
                mybook = books.items[Number($(this).find('input').val())];

                $(".autocomplete-items").remove();
            });
            searchResults.appendChild(bookResultsDiv);
        });
    }
});