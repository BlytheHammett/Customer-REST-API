const express = require('express')
const router = express.Router()
const Customer = require('../models/customer')

// getting all the customers
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find()
        res.json(customers)
    }
    catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// getting one customer
router.get('/:id', getCustomer, (req, res) => {
    res.json(res.customer)
})

// creating one customer
router.post('/', async(req, res) => {
    const customer = new Customer({
        name: req.body.name,
        productPurchased: req.body.productPurchased
    })

    try {
        const newCustomer = await customer.save()
        res.status(201).json(newCustomer)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// updating one customer
router.patch('/:id', getCustomer, async (req, res) => {
    if (req.body.name != null) {
        res.customer.name = req.body.name
    }
    if (req.body.productPurchased != null) {
        res.customer.productPurchased = req.body.productPurchased
    }

    try {
        const updatedCustomer = await res.customer.save()
        res.json(updatedCustomer)
    }
    catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// deleting one customer
router.delete('/:id', getCustomer, async (req, res) => {
    try {
        await res.customer.remove()
        res.json({ message: 'deleted customer' })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// middleware function that gets a specific customer
async function getCustomer(req, res, next) {
    let customer
    try {
        customer = await Customer.findById(req.params.id)
        if (customer == null) {
            return res.status(404).json({ message: 'cannot find customer' })
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.customer = customer
    next()
}

module.exports = router