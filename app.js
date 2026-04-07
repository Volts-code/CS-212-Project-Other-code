let books=[

    {
    id:1,
    title:"Harry Potter",
    author:"J.K Rowling",
    genre:"Fantasy",
    image:"images/harrypotter.jpg",
    available:true,
    dueDate:null
    },

    {
    id:2,
    title:"The Hobbit",
    author:"Tolkien",
    genre:"Fantasy",
    image:"images/hobbit.jpg",
    available:true,
    dueDate:null
    },

    {
    id:3,
    title:"Atomic Habits",
    author:"James Clear",
    genre:"Self Help",
    image:"images/atomic.jpg",
    available:true,
    dueDate:null
    },

    {
    id:4,
    title:"Rich Dad Poor Dad",
    author:"Robert Kiyosaki",
    genre:"Finance",
    image:"images/richdad.jpg",
    available:true,
    dueDate:null
    }

]



function displayBooks(list){

    let bookList=document.getElementById("bookList")
    if(!bookList) return
    bookList.innerHTML=""
    list.forEach(book=>{
        let div=document.createElement("div")
        div.className="book"

        div.innerHTML=

        "<img src='"+book.image+"' class='book-img'>"+
        "<h3>"+book.title+"</h3>"+
        "<p>Author: "+book.author+"</p>"+
        "<p>Genre: "+book.genre+"</p>"+
        "<p>Status: "+(book.available?"Available":"Borrowed")+"</p>"


        if(book.available){

            let btn=document.createElement("button")
            btn.innerText="Borrow"
            btn.onclick=function(){

                borrowBook(book.id)
                
            }

            div.appendChild(btn)

        }

        bookList.appendChild(div)

    })

}



function borrowBook(id){

    books.forEach(book=>{

        if(book.id==id){

            book.available=false
            let date=new Date()
            date.setDate(date.getDate()+7)
            book.dueDate=date.toLocaleDateString()

        }

    })

    displayBooks(books)

    displayBorrowed()

    updateDashboard()

}



function returnBook(id){

    books.forEach(book=>{

        if(book.id==id){

            book.available=true
            book.dueDate=null

        }

    })

    displayBooks(books)

    displayBorrowed()

    updateDashboard()

}



function displayBorrowed(){

        let borrowed=document.getElementById("borrowedList")
        if(!borrowed) return
        borrowed.innerHTML=""
        books.forEach(book=>{

            if(!book.available){

                let div=document.createElement("div")
                div.className="book borrowed"
                let today=new Date()
                let due=new Date(book.dueDate)
                let overdue=today>due

                div.innerHTML=

                "<img src='"+book.image+"' class='book-img'>"+
                "<h3>"+book.title+"</h3>"+
                "<p>Due Date: "+book.dueDate+"</p>"

                if(overdue){

                    let p=document.createElement("p")
                    p.innerText="Overdue"
                    p.className="overdue"
                    div.appendChild(p)

                }

                let btn=document.createElement("button")
                btn.innerText="Return"

                btn.onclick=function(){
                    returnBook(book.id)
                }

                div.appendChild(btn)

                borrowed.appendChild(div)

            }

        })

}



let search=document.getElementById("search")

if(search){

    search.addEventListener("keyup",function(){

        let value=this.value.toLowerCase()

        let filtered=books.filter(book=>

        book.title.toLowerCase().includes(value)||

        book.author.toLowerCase().includes(value)||

        book.genre.toLowerCase().includes(value)

        )

        displayBooks(filtered)

    })

}



let sort=document.getElementById("sort")

if(sort){

    sort.addEventListener("change",function(){

        let sorted=[...books]

        if(this.value=="title"){
            sorted.sort((a,b)=>a.title.localeCompare(b.title))
        }

        if(this.value=="author"){
            sorted.sort((a,b)=>a.author.localeCompare(b.author))
        }

        displayBooks(sorted)

    })

}



function updateDashboard(){

    let total=document.getElementById("totalBooks")
    let borrowed=document.getElementById("borrowedBooks")
    let overdue=document.getElementById("overdueBooks")
    if(!total) return
    total.innerText=books.length
    let borrowedBooks=books.filter(book=>!book.available)
    borrowed.innerText=borrowedBooks.length
    let today=new Date()
    let overdueBooks=borrowedBooks.filter(book=>
    new Date(book.dueDate)<today)
    overdue.innerText=overdueBooks.length

}



displayBooks(books)

displayBorrowed()

updateDashboard()