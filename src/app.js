const express = require('express')

const app = express()
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const publicDirectoryPath = path.join(__dirname, '../public')
const viewDirectoryPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


// console.log(__dirname)
// //console.log(__filename)
// console.log(path.join(__dirname, '../public'))

app.set('view engine', 'hbs')
app.set('views', viewDirectoryPath)
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath)

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Vinayak'

    })
})

app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help',
        name: 'Vinayak',
        helpText: "This is the help page"

    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        title: 'About',
        name: 'Vinayak'

    })
})
// app.get('', (req, res)=>{
//     res.send('<h1>Hello express</h1>')
// })

// app.get('/help', (req, res)=>{
//     res.send({
//         name: 'Vinayak',
//         age: 29
//     })
// })

// app.get('/about', (req, res)=>{
//     res.send('<h1>About us</h1>')
// })

app.get('/weather', (req, res)=>{
    if(!req.query.address){
       return res.send({
            error: 'Please enter the address parameter'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        console.log()
        if(error){
            return res.send({error})

        }
        forecast(latitude, longitude, (error, forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'Today the temprature is 45 c',
    //     location: 'The location is mumbai',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
       return res.send({
            error: 'Please enter the search parameter'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res)=>{
   res.render('404', {
        title: 'About',
        name: 'Vinayak',
        error: 'Help article not found'

    })
})

app.get('*', (req, res)=>{
   res.render('404', {
        title: 'About',
        name: 'Vinayak',
        error: 'Page not found'


    })
})


app.listen(3000, ()=>{
    console.log('server is running at 3000')
})