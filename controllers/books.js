const express = require('express')
const router = express.Router()
const Book = require('../models/books.js')


// create new book
router.post('/index', (req, res)=>{
    Book.create(req.body, (err, newBook)=>{
        if (err) {
            console.log(err)
        } else {
            console.log("@@@@@@@@@ newbook",newBook)

            // after successfull creation of data, redirect to home page to view data.
            res.redirect('/home/index', {currentUser: req.session.currentUser})
        }
    })
})

// route to display the form for adding a new book and sends data to show page where one book is displayed
router.get('/index/new', (req, res)=>{
    res.render('newBook.ejs', {currentUser: req.session.currentUser})
})

//route to query the database for book by id and show it
router.get('/index/:id', (req, res)=>{
    Book.findById(req.params.id, (err, book)=>{
        console.log(data)
        //res.send("This is working")
        res.render('show.ejs', { book: book})
    })
})

// route to find and display all books
router.get('/index', (req, res)=>{
    Book.find({}, (err, allBooks, next)=>{
        console.log(Data)
        if (err) {
            console.log(err)
        } else {
            //console.log(data)
            res.render('index.ejs',
            { book: allBooks, currentUser:req.session.currentUser})
        }
    })
})

// // route to edit book at id and redirect to home page to show updated info
// router.put('/index', (req, res)=>{
//     console.log('pposting to home/index route')
//     Book.create(req.body, (err, created)=>{ // probably dont need this create.
//         if (err) {
//             console.log(err)
//         } else {
//             console.log(created + " this is the req.body")
//             res.redirect('/home/index')
//         }
//     })
// })

// delete-----------------------------------------------------------------------
router.delete('/index/:id', (req, res)=>{
    console.log('Delete route activated.')
    //res.send('Deleting')
    Book.findByIdAndRemove(req.params.id, (err, book)=>{
        if (err) {
            console.log(err)
        } else {
            console.log(book + " the book to be deleted.......")
            res.redirect('/home/index')
        }
    })
})

// // route to get and display one book
// router.get('/index/:id/show', (req, res)=>{
//     //console.log(req.params.id)
//     Book.findById(req.params.id, (err, book)=>{
//         if (err) {
//             console.log(err + ' error')
//             console.log(book + ' program')
//         } else {
//             //res.send(program)
//             res.render('show.ejs', {
//                 book: Book,
//                 currentUser: req.session.currentUser
//              })
//         }
//     })
// })

// edit route----1 0f 2---------------------------------------------------------
router.get('/index/:id/edit', (req, res)=>{
    //console.log(req.params.id, "here")
    Book.findById(req.params.id, (err, book)=>{
        if (err) {
            console.log(err + ' error')
            console.log(book + ' book')
        } else {
            //res.send(program)
            res.render('edit.ejs', {
                data: data,
                currentUser: req.session.currentUser
             })
        }
    })
})
// edit 2 0f 2
router.put('/index/:id', (req, res)=>{
    //console.log(req.params.id)
    //res.send("Checking to see if this works")  // working
    //console.log(req.body, " before");
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    //console.log(req.body, " after");
    Data.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true},
        (err, updates)=>{
            console.log(updates)
            //res.send(updates)
            res.redirect('/home/index')
    })
})
module.exports = router